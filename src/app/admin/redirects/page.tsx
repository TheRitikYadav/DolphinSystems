"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Link as LinkIcon,
  Share2,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Globe,
} from "lucide-react";
import type { Redirect, SocialLink } from "@/types/blog";

export default function RedirectsAdmin() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"redirects" | "social">("redirects");

  // Form states
  const [editingRedirect, setEditingRedirect] = useState<Partial<Redirect> | null>(null);
  const [editingSocial, setEditingSocial] = useState<Partial<SocialLink> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: rData }, { data: sData }] = await Promise.all([
      supabase.from("redirects").select("*").order("created_at", { ascending: false }),
      supabase.from("social_links").select("*").order("display_order", { ascending: true }),
    ]);
    setRedirects(rData ?? []);
    setSocialLinks(sData ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveRedirect = async () => {
    if (!editingRedirect?.from_path || !editingRedirect?.to_url) return;
    setSaving(true);
    if (editingRedirect.id) {
      const { id, ...rest } = editingRedirect;
      await supabase.from("redirects").update(rest).eq("id", id);
    } else {
      await supabase.from("redirects").insert(editingRedirect);
    }
    setEditingRedirect(null);
    setSaving(false);
    fetchData();
  };

  const handleSaveSocial = async () => {
    if (!editingSocial?.platform || !editingSocial?.url) return;
    setSaving(true);
    if (editingSocial.id) {
      const { id, ...rest } = editingSocial;
      await supabase.from("social_links").update(rest).eq("id", id);
    } else {
      await supabase.from("social_links").insert(editingSocial);
    }
    setEditingSocial(null);
    setSaving(false);
    fetchData();
  };

  const handleDelete = async (table: "redirects" | "social_links", id: string) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from(table).delete().eq("id", id);
    fetchData();
  };

  if (loading && redirects.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-muted hover:text-navy">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <RefreshCw className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-navy">Redirection &amp; Social</h1>
          </div>
          <button
            onClick={() => {
              if (activeTab === "redirects") setEditingRedirect({ from_path: "", to_url: "", status_code: 301, is_active: true });
              else setEditingSocial({ platform: "", url: "", icon: "Link", is_active: true, display_order: socialLinks.length + 1 });
            }}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Add {activeTab === "redirects" ? "Redirect" : "Social Link"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-1 rounded-xl bg-gray-100 p-1 max-w-md">
          <button
            onClick={() => setActiveTab("redirects")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "redirects" ? "bg-white text-navy shadow-sm" : "text-muted hover:text-navy"
            }`}
          >
            <Globe className="h-4 w-4" />
            URL Redirects
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === "social" ? "bg-white text-navy shadow-sm" : "text-muted hover:text-navy"
            }`}
          >
            <Share2 className="h-4 w-4" />
            Social Media
          </button>
        </div>

        {activeTab === "redirects" ? (
          <div>
            {editingRedirect && (
              <div className="mb-8 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy">
                    {editingRedirect.id ? "Edit Redirect" : "New Redirect"}
                  </h2>
                  <button onClick={() => setEditingRedirect(null)} className="text-muted hover:text-navy">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">From Path (e.g. /old-blog)</label>
                    <input
                      type="text"
                      value={editingRedirect.from_path ?? ""}
                      onChange={(e) => setEditingRedirect({ ...editingRedirect, from_path: e.target.value })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">To URL (Internal or External)</label>
                    <input
                      type="text"
                      value={editingRedirect.to_url ?? ""}
                      onChange={(e) => setEditingRedirect({ ...editingRedirect, to_url: e.target.value })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Status Code</label>
                    <select
                      value={editingRedirect.status_code ?? 301}
                      onChange={(e) => setEditingRedirect({ ...editingRedirect, status_code: parseInt(e.target.value) })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value={301}>301 (Permanent)</option>
                      <option value={302}>302 (Temporary)</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <input
                      type="checkbox"
                      checked={editingRedirect.is_active ?? true}
                      onChange={(e) => setEditingRedirect({ ...editingRedirect, is_active: e.target.checked })}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-navy">Active</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => setEditingRedirect(null)} className="px-4 py-2 text-sm text-muted hover:text-navy">Cancel</button>
                  <button onClick={handleSaveRedirect} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-50">
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Redirect"}
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {redirects.map((r) => (
                <div key={r.id} className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-navy">{r.from_path}</span>
                      <ChevronRight className="h-3 w-3 text-muted" />
                      <span className="text-sm text-primary truncate max-w-xs">{r.to_url}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                      <span className={`rounded-full px-2 py-0.5 font-medium ${r.is_active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                        {r.is_active ? "Active" : "Inactive"}
                      </span>
                      <span>{r.status_code} Redirect</span>
                      <span>{r.hits} Hits</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditingRedirect(r)} className="p-2 text-muted hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete("redirects", r.id)} className="p-2 text-muted hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
              {redirects.length === 0 && <div className="py-20 text-center text-muted">No redirects configured.</div>}
            </div>
          </div>
        ) : (
          <div>
            {editingSocial && (
              <div className="mb-8 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy">
                    {editingSocial.id ? "Edit Social Link" : "New Social Link"}
                  </h2>
                  <button onClick={() => setEditingSocial(null)} className="text-muted hover:text-navy">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Platform Name</label>
                    <input
                      type="text"
                      value={editingSocial.platform ?? ""}
                      onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">URL</label>
                    <input
                      type="text"
                      value={editingSocial.url ?? ""}
                      onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Display Order</label>
                    <input
                      type="number"
                      value={editingSocial.display_order ?? 0}
                      onChange={(e) => setEditingSocial({ ...editingSocial, display_order: parseInt(e.target.value) })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => setEditingSocial(null)} className="px-4 py-2 text-sm text-muted hover:text-navy">Cancel</button>
                  <button onClick={handleSaveSocial} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-50">
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Social Link"}
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {socialLinks.map((s) => (
                <div key={s.id} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
                      <Share2 className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingSocial(s)} className="p-2 text-muted hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete("social_links", s.id)} className="p-2 text-muted hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-navy">{s.platform}</h3>
                  <p className="mt-1 text-sm text-muted truncate">{s.url}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className={`text-xs font-semibold ${s.is_active ? "text-emerald-600" : "text-red-600"}`}>
                      {s.is_active ? "Active" : "Inactive"}
                    </span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                      Test Link <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
              {socialLinks.length === 0 && <div className="py-20 text-center text-muted col-span-full">No social links configured.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
