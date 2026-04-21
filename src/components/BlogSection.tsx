"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Clock, Tag } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";
import AnimatedSection from "./AnimatedSection";

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      setPosts(data ?? []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section className="bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between gap-6">
          <AnimatedSection className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Latest from <span className="text-gradient">our Blog</span>
            </h2>
            <p className="mt-4 text-muted">
              Stay updated with the latest trends in SaaS, microservices, and digital transformation.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Link
              href="/blog"
              className="group hidden items-center gap-2 text-sm font-semibold text-primary sm:flex"
            >
              View all posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-xl"
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
                    <div className={`flex h-48 items-end bg-gradient-to-br ${post.color} p-6`}>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags?.slice(0, 2).map((tag) => (
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
                    <div className="mb-3 flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.published_at ? formatDate(post.published_at) : "Coming soon"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.read_time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-navy group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium text-navy">{post.author}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
