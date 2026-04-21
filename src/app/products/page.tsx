"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Globe,
  Apple,
  Play,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/lib/supabase";
import { getIcon } from "@/lib/icons";

const categories = [
  "All",
  "Web Apps",
  "Mobile Apps",
  "SaaS",
  "APIs",
  "Automation",
  "Analytics",
] as const;

type Category = (typeof categories)[number];

interface Product {
  id: string;
  name: string;
  description: string;
  tags: string[];
  platforms: string[];
  color: string;
  icon: string;
}

const platformIcons: Record<string, { icon: React.ReactNode; label: string }> = {
  Web: { icon: <Globe className="h-3.5 w-3.5" />, label: "Web" },
  iOS: { icon: <Apple className="h-3.5 w-3.5" />, label: "App Store" },
  Android: { icon: <Play className="h-3.5 w-3.5" />, label: "Play Store" },
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<Set<Category>>(new Set(["All"]));
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at");
      setProducts(data ?? []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const toggleTag = (tag: Category) => {
    if (tag === "All") {
      setActiveTags(new Set(["All"]));
      return;
    }
    const next = new Set(activeTags);
    next.delete("All");
    if (next.has(tag)) {
      next.delete(tag);
      if (next.size === 0) next.add("All");
    } else {
      next.add(tag);
    }
    setActiveTags(next);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesTags =
        activeTags.has("All") || p.tags?.some((t) => activeTags.has(t as Category));
      return matchesSearch && matchesTags;
    });
  }, [search, activeTags, products]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Our <span className="text-gradient">Products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
          >
            Powerful tools built for modern teams. From CRM to deployment
            pipelines, we&apos;ve got your stack covered.
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative mx-auto mb-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-border bg-white py-3 pl-12 pr-4 text-sm text-navy outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleTag(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeTags.has(cat)
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-white text-muted hover:bg-primary/5 hover:text-primary border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted">
              No products match your filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div
                    className={`flex h-40 items-center justify-center bg-gradient-to-br ${product.color}`}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                      {getIcon(product.icon)}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-navy">
                      {product.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {product.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      {product.platforms?.map((platform) => {
                        const p = platformIcons[platform];
                        if (!p) return null;
                        return (
                          <Link
                            key={platform}
                            href="#"
                            className="flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-xs text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                          >
                            {p.icon}
                            {p.label}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                      <Link
                        href="#"
                        className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-lg"
                      >
                        Try Free
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-primary hover:text-primary"
                      >
                        Learn More
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
