"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  LogOut,
  Package,
  Wrench,
  Plus,
  LayoutDashboard,
  User,
  FileText,
} from "lucide-react";

interface Counts {
  products: number;
  services: number;
  blog_posts: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [counts, setCounts] = useState<Counts>({ products: 0, services: 0, blog_posts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      const [{ count: pCount }, { count: sCount }, { count: bCount }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      ]);

      setCounts({
        products: pCount ?? 0,
        services: sCount ?? 0,
        blog_posts: bCount ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
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
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-navy">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <User className="h-4 w-4" />
              {user?.email}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy">Welcome back</h2>
          <p className="mt-1 text-muted">
            Manage your products and services from here.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Products</p>
                <p className="text-2xl font-bold text-navy">{counts.products}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <Wrench className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Services</p>
                <p className="text-2xl font-bold text-navy">{counts.services}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">
                <FileText className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Blog Posts</p>
                <p className="text-2xl font-bold text-navy">{counts.blog_posts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="mb-4 text-lg font-semibold text-navy">Manage</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/products"
            className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <Package className="h-8 w-8 text-primary" />
            <h4 className="mt-3 font-semibold text-navy">View Products</h4>
            <p className="mt-1 text-sm text-muted">
              Manage all your products
            </p>
          </Link>
          <Link
            href="/admin/products?new=true"
            className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <Plus className="h-8 w-8 text-emerald-600" />
            <h4 className="mt-3 font-semibold text-navy">Add Product</h4>
            <p className="mt-1 text-sm text-muted">
              Create a new product listing
            </p>
          </Link>
          <Link
            href="/admin/services"
            className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <Wrench className="h-8 w-8 text-primary" />
            <h4 className="mt-3 font-semibold text-navy">View Services</h4>
            <p className="mt-1 text-sm text-muted">
              Manage all your services
            </p>
          </Link>
          <Link
            href="/admin/services?new=true"
            className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <Plus className="h-8 w-8 text-emerald-600" />
            <h4 className="mt-3 font-semibold text-navy">Add Service</h4>
            <p className="mt-1 text-sm text-muted">
              Create a new service listing
            </p>
          </Link>
          <Link
            href="/admin/blog"
            className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <FileText className="h-8 w-8 text-violet-600" />
            <h4 className="mt-3 font-semibold text-navy">View Blog Posts</h4>
            <p className="mt-1 text-sm text-muted">
              Manage all your blog posts
            </p>
          </Link>
          <Link
            href="/admin/blog?new=true"
            className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <Plus className="h-8 w-8 text-violet-600" />
            <h4 className="mt-3 font-semibold text-navy">New Blog Post</h4>
            <p className="mt-1 text-sm text-muted">
              Write and publish a new post
            </p>
          </Link>
        </div>

        {/* Back to site */}
        <div className="mt-10 border-t border-border pt-6">
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
