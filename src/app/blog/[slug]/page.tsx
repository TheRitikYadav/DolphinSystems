import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { BlogPost } from "@/types/blog";
import type { Metadata } from "next";

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    keywords: post.seo_keywords || undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      authors: [post.author],
      images: post.og_image || post.featured_image
        ? [{ url: post.og_image || post.featured_image }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: post.og_image || post.featured_image
        ? [post.og_image || post.featured_image]
        : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      {post.featured_image ? (
        <section className="relative h-[400px] overflow-hidden sm:h-[500px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featured_image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-4xl px-4 pb-12 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              {post.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.read_time}
              </span>
            </div>
          </div>
        </section>
      ) : (
        <section
          className={`relative overflow-hidden bg-gradient-to-br ${post.color} pt-32 pb-16`}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              {post.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.read_time}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {post.excerpt && (
          <p className="mb-8 text-lg leading-relaxed text-muted italic border-l-4 border-primary/30 pl-4">
            {post.excerpt}
          </p>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:text-navy prose-headings:font-bold prose-p:text-muted prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-blockquote:border-primary/30 prose-blockquote:text-muted prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-navy prose-pre:text-gray-300 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
