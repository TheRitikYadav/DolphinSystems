"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Wrench,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  is_active: boolean;
}

const iconOptions = [
  "Globe", "Smartphone", "Cloud", "Code2", "Workflow", "MessageCircle",
  "Shield", "Database", "Zap", "Lock", "Cpu", "BarChart3",
];

const colorOptions = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-green-400",
  "from-orange-500 to-amber-400",
  "from-pink-500 to-rose-400",
  "from-indigo-500 to-blue-400",
  "from-teal-500 to-cyan-400",
  "from-slate-600 to-gray-400",
  "from-red-500 to-rose-400",
  "from-amber-500 to-yellow-400",
];

const emptyService = {
  name: "",
  description: "",
  icon: "Globe",
  color: colorOptions[0],
  features: [] as string[],
  is_active: true,
};

export default function AdminServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <AdminServicesContent />
    </Suspense>
  );
}

function AdminServicesContent() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(
    searchParams.get("new") ? emptyService : null
  );
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async () => {
    if (!editing?.name || !editing?.description) return;
    setSaving(true);

    if (editing.id) {
      const { id, ...rest } = editing;
      await supabase.from("services").update(rest).eq("id", id);
    } else {
      await supabase.from("services").insert(editing);
    }

    setEditing(null);
    setSaving(false);
    await fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    await fetchServices();
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editing) return;
    setEditing({
      ...editing,
      features: [...(editing.features ?? []), featureInput.trim()],
    });
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    if (!editing) return;
    const next = [...(editing.features ?? [])];
    next.splice(index, 1);
    setEditing({ ...editing, features: next });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted hover:text-navy">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Wrench className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-navy">Services</h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {services.length}
            </span>
          </div>
          <button
            onClick={() => setEditing(emptyService)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Edit/Create Form */}
        {editing && (
          <div className="mb-8 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy">
                {editing.id ? "Edit Service" : "New Service"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="text-muted hover:text-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Name *
                </label>
                <input
                  type="text"
                  value={editing.name ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  placeholder="Service name"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Icon
                </label>
                <select
                  value={editing.icon ?? "Globe"}
                  onChange={(e) =>
                    setEditing({ ...editing, icon: e.target.value })
                  }
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Description *
                </label>
                <textarea
                  value={editing.description ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Service description"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Color Gradient
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setEditing({ ...editing, color: c })}
                      className={`h-8 w-8 rounded-full bg-gradient-to-br ${c} transition-all ${
                        editing.color === c
                          ? "ring-2 ring-primary ring-offset-2"
                          : "hover:scale-110"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.is_active ?? true}
                    onChange={(e) =>
                      setEditing({ ...editing, is_active: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="font-medium text-navy">Active</span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Features
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="Add a feature and press Enter"
                    className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-navy hover:bg-gray-200"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(editing.features ?? []).map((f, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {f}
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editing.name || !editing.description}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Service"}
              </button>
            </div>
          </div>
        )}

        {/* Service List */}
        {services.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
            <Wrench className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-3 text-muted">No services yet.</p>
            <button
              onClick={() => setEditing(emptyService)}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Add your first service
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white text-sm font-bold`}
                >
                  {service.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy truncate">
                      {service.name}
                    </h3>
                    {!service.is_active && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-muted">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted truncate">
                    {service.description}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {service.features?.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-primary/5 px-2 py-0.5 text-xs text-primary"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => {
                      setEditing(service);
                      setFeatureInput("");
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
