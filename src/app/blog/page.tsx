"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Tag,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";

const blogTags = [
  "All",
  "Technology",
  "SaaS",
  "Development",
  "Business",
  "Tutorial",
  "Updates",
] as const;

type BlogTag = (typeof blogTags)[number];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<Set<BlogTag>>(new Set(["All"]));
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const toggleTag = (tag: BlogTag) => {
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
    return posts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesTags =
        activeTags.has("All") || p.tags?.some((t) => activeTags.has(t as BlogTag));
      return matchesSearch && matchesTags;
    });
  }, [search, activeTags, posts]);

  const featuredPost = filtered.find((p) => p.featured);
  const regularPosts = filtered.filter((p) => !p.featured);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Blog &amp; <span className="text-gradient">Insights</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
          >
            Ideas, tutorials, and updates from the DolphinSystems team.
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
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-border bg-white py-3 pl-12 pr-4 text-sm text-navy outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {blogTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeTags.has(tag)
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "border border-border bg-white text-muted hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
              <AnimatedSection>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group grid overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-xl md:grid-cols-2"
                  >
                    {featuredPost.featured_image ? (
                      <div className="relative min-h-[280px] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={featuredPost.featured_image}
                          alt={featuredPost.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                          Featured
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`flex min-h-[280px] items-center justify-center bg-gradient-to-br ${featuredPost.color}`}
                      >
                        <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col justify-center p-8 lg:p-12">
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-4 text-2xl font-bold text-navy lg:text-3xl">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-muted">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-5 flex items-center gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </span>
                        {featuredPost.published_at && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatDate(featuredPost.published_at)}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {featuredPost.read_time}
                        </span>
                      </div>
                      <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-lg">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              </AnimatedSection>
            </section>
          )}

          {/* Post Grid */}
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-muted">
                  No articles match your search.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, i) => (
                  <AnimatedSection key={post.id} delay={i * 0.05}>
                    <Link href={`/blog/${post.slug}`}>
                      <motion.article
                        whileHover={{ y: -6 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-xl"
                      >
                        {post.featured_image ? (
                          <div className="h-48 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div
                            className={`flex h-48 items-end bg-gradient-to-br ${post.color} p-6`}
                          >
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-6">
                          {post.featured_image && (
                            <div className="mb-2 flex flex-wrap gap-1.5">
                              {post.tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <h3 className="text-lg font-bold leading-snug text-navy group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                            {post.excerpt}
                          </p>
                          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <User className="h-3.5 w-3.5" />
                                {post.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {post.read_time}
                              </span>
                            </div>
                            {post.published_at && (
                              <span>{formatDate(post.published_at)}</span>
                            )}
                          </div>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark">
                            Read More
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </motion.article>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
