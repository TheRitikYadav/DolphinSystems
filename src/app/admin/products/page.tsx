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
  Package,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  tags: string[];
  platforms: string[];
  color: string;
  icon: string;
  is_active: boolean;
}

const iconOptions = [
  "Users", "BarChart3", "Shield", "Rocket", "MessageCircle",
  "ShoppingCart", "Workflow", "Code2", "Globe", "Smartphone",
  "Database", "Zap", "Lock", "Cloud", "Cpu",
];

const colorOptions = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-green-400",
  "from-orange-500 to-amber-400",
  "from-pink-500 to-rose-400",
  "from-teal-500 to-cyan-400",
  "from-indigo-500 to-blue-400",
  "from-slate-600 to-gray-400",
  "from-red-500 to-rose-400",
  "from-amber-500 to-yellow-400",
];

const tagOptions = ["Web Apps", "Mobile Apps", "SaaS", "APIs", "Automation", "Analytics"];
const platformOptions = ["Web", "iOS", "Android"];

const emptyProduct = {
  name: "",
  description: "",
  tags: [] as string[],
  platforms: [] as string[],
  color: colorOptions[0],
  icon: "Code2",
  is_active: true,
};

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <AdminProductsContent />
    </Suspense>
  );
}

function AdminProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Product> | null>(
    searchParams.get("new") ? emptyProduct : null
  );
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async () => {
    if (!editing?.name || !editing?.description) return;
    setSaving(true);

    if (editing.id) {
      const { id, ...rest } = editing;
      await supabase.from("products").update(rest).eq("id", id);
    } else {
      await supabase.from("products").insert(editing);
    }

    setEditing(null);
    setSaving(false);
    await fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    await fetchProducts();
  };

  const toggleArrayItem = (
    field: "tags" | "platforms",
    item: string
  ) => {
    if (!editing) return;
    const arr = (editing[field] as string[]) ?? [];
    const next = arr.includes(item)
      ? arr.filter((i) => i !== item)
      : [...arr, item];
    setEditing({ ...editing, [field]: next });
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
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-navy">Products</h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {products.length}
            </span>
          </div>
          <button
            onClick={() => setEditing(emptyProduct)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Edit/Create Form */}
        {editing && (
          <div className="mb-8 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy">
                {editing.id ? "Edit Product" : "New Product"}
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
                  placeholder="Product name"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Icon
                </label>
                <select
                  value={editing.icon ?? "Code2"}
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
                  placeholder="Product description"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleArrayItem("tags", tag)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        (editing.tags ?? []).includes(tag)
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-muted hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {platformOptions.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleArrayItem("platforms", p)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        (editing.platforms ?? []).includes(p)
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-muted hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
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
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        )}

        {/* Product List */}
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
            <Package className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-3 text-muted">No products yet.</p>
            <button
              onClick={() => setEditing(emptyProduct)}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${product.color} text-white text-sm font-bold`}
                >
                  {product.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy truncate">
                      {product.name}
                    </h3>
                    {!product.is_active && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-muted">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted truncate">
                    {product.description}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {product.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/5 px-2 py-0.5 text-xs text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => setEditing(product)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
