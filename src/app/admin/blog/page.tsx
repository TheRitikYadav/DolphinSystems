"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  FileText,
  Eye,
  EyeOff,
  Star,
  Search as SearchIcon,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

const tagOptions = [
  "Technology",
  "SaaS",
  "Development",
  "Business",
  "Tutorial",
  "Updates",
];

const colorOptions = [
  "from-blue-600 to-cyan-500",
  "from-violet-600 to-purple-500",
  "from-pink-600 to-rose-500",
  "from-emerald-600 to-green-500",
  "from-amber-600 to-orange-500",
  "from-red-600 to-pink-500",
  "from-indigo-600 to-blue-500",
  "from-teal-600 to-cyan-500",
];

const emptyPost: Partial<BlogPost> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author: "",
  tags: [],
  read_time: "5 min read",
  featured: false,
  is_published: false,
  featured_image: "",
  color: colorOptions[0],
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  og_image: "",
  published_at: null,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <AdminBlogContent />
    </Suspense>
  );
}

function AdminBlogContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(
    searchParams.get("new") ? emptyPost : null
  );
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) return;
    setSaving(true);

    const payload = {
      ...editing,
      published_at:
        editing.is_published && !editing.published_at
          ? new Date().toISOString()
          : editing.published_at,
    };

    if (editing.id) {
      const { id, ...rest } = payload;
      await supabase.from("blog_posts").update(rest).eq("id", id);
    } else {
      await supabase.from("blog_posts").insert(payload);
    }

    setEditing(null);
    setSaving(false);
    setActiveTab("content");
    await fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    await fetchPosts();
  };

  const toggleTag = (tag: string) => {
    if (!editing) return;
    const arr = editing.tags ?? [];
    const next = arr.includes(tag)
      ? arr.filter((t) => t !== tag)
      : [...arr, tag];
    setEditing({ ...editing, tags: next });
  };

  const filteredPosts = posts.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

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
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-navy">Blog Posts</h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {posts.length}
            </span>
          </div>
          <button
            onClick={() => {
              setEditing(emptyPost);
              setActiveTab("content");
            }}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Edit/Create Form */}
        {editing && (
          <div className="mb-8 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy">
                {editing.id ? "Edit Post" : "New Post"}
              </h2>
              <button
                onClick={() => {
                  setEditing(null);
                  setActiveTab("content");
                }}
                className="text-muted hover:text-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("content")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "content"
                    ? "bg-white text-navy shadow-sm"
                    : "text-muted hover:text-navy"
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "seo"
                    ? "bg-white text-navy shadow-sm"
                    : "text-muted hover:text-navy"
                }`}
              >
                SEO & Meta
              </button>
            </div>

            {activeTab === "content" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={editing.title ?? ""}
                    onChange={(e) => {
                      const title = e.target.value;
                      const updates: Partial<BlogPost> = {
                        ...editing,
                        title,
                      };
                      if (!editing.id) {
                        updates.slug = slugify(title);
                      }
                      if (!editing.seo_title) {
                        updates.seo_title = title + " | DolphinSystems";
                      }
                      setEditing(updates);
                    }}
                    placeholder="Post title"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-navy">
                    <LinkIcon className="h-3.5 w-3.5" />
                    Permalink (slug) *
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted">/blog/</span>
                    <input
                      type="text"
                      value={editing.slug ?? ""}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          slug: slugify(e.target.value),
                        })
                      }
                      placeholder="my-post-slug"
                      className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editing.author ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, author: e.target.value })
                    }
                    placeholder="Author name"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    Excerpt
                  </label>
                  <textarea
                    value={editing.excerpt ?? ""}
                    onChange={(e) => {
                      const excerpt = e.target.value;
                      const updates: Partial<BlogPost> = {
                        ...editing,
                        excerpt,
                      };
                      if (!editing.seo_description) {
                        updates.seo_description = excerpt;
                      }
                      setEditing(updates);
                    }}
                    rows={2}
                    placeholder="Short summary of the post"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    Content (HTML)
                  </label>
                  <textarea
                    value={editing.content ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, content: e.target.value })
                    }
                    rows={10}
                    placeholder="<p>Write your blog post content here...</p>"
                    className="w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
                        onClick={() => toggleTag(tag)}
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
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editing.read_time ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, read_time: e.target.value })
                    }
                    placeholder="5 min read"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-navy">
                    <ImageIcon className="h-3.5 w-3.5" />
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={editing.featured_image ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        featured_image: e.target.value,
                      })
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    Fallback Color (if no image)
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

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editing.is_published ?? false}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          is_published: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="font-medium text-navy">Published</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editing.featured ?? false}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          featured: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="font-medium text-navy">Featured</span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={editing.seo_title ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, seo_title: e.target.value })
                    }
                    placeholder="Page title for search engines"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <p className="mt-1 text-xs text-muted">
                    {(editing.seo_title ?? "").length}/60 characters
                    recommended
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    SEO Description
                  </label>
                  <textarea
                    value={editing.seo_description ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        seo_description: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Description shown in search results"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <p className="mt-1 text-xs text-muted">
                    {(editing.seo_description ?? "").length}/160 characters
                    recommended
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    value={editing.seo_keywords ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        seo_keywords: e.target.value,
                      })
                    }
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    OG Image URL (for social sharing)
                  </label>
                  <input
                    type="text"
                    value={editing.og_image ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, og_image: e.target.value })
                    }
                    placeholder="https://example.com/og-image.jpg"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* SEO Preview */}
                <div className="sm:col-span-2">
                  <p className="mb-2 text-sm font-medium text-navy">
                    Search Preview
                  </p>
                  <div className="rounded-lg border border-border bg-gray-50 p-4">
                    <p className="text-sm text-blue-700 truncate">
                      {editing.seo_title ||
                        editing.title ||
                        "Page Title"}
                    </p>
                    <p className="mt-0.5 text-xs text-green-700">
                      dolphinsystems.net/blog/
                      {editing.slug || "post-slug"}
                    </p>
                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                      {editing.seo_description ||
                        editing.excerpt ||
                        "Page description will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditing(null);
                  setActiveTab("content");
                }}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editing.title || !editing.slug}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Post"}
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        {!editing && (
          <div className="relative mb-6 max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        {/* Post List */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-3 text-muted">No blog posts yet.</p>
            <button
              onClick={() => {
                setEditing(emptyPost);
                setActiveTab("content");
              }}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Write your first post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                {post.featured_image ? (
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featured_image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${post.color} text-white`}
                  >
                    <FileText className="h-6 w-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy truncate">
                      {post.title}
                    </h3>
                    {post.featured && (
                      <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      {post.is_published ? (
                        <>
                          <Eye className="h-3 w-3 text-emerald-500" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" />
                          Draft
                        </>
                      )}
                    </span>
                    <span>/blog/{post.slug}</span>
                    <span>{post.author}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
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
                  {post.is_published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                      title="View post"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setEditing(post);
                      setActiveTab("content");
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
