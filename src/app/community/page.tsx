"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Send,
  Github,
  Linkedin,
  ExternalLink,
  Shield,
  Heart,
  Lightbulb,
  Clock,
  ArrowRight,
  MessageCircle,
  Bug,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const categories = [
  "Bug Report",
  "Feature Request",
  "General Discussion",
  "Feedback",
];

const communityLinks = [
  {
    icon: MessageCircle,
    label: "Discord",
    desc: "Real-time chat & support",
    href: "https://discord.gg/dolphinsystems",
    color: "bg-[#5865F2]/10 text-[#5865F2]",
    hoverColor: "hover:border-[#5865F2]/30",
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    desc: "Updates & announcements",
    href: "https://t.me/dolphinsystems",
    color: "bg-[#229ED9]/10 text-[#229ED9]",
    hoverColor: "hover:border-[#229ED9]/30",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    desc: "Professional network",
    href: "https://linkedin.com/company/dolphinsystems",
    color: "bg-[#0077B5]/10 text-[#0077B5]",
    hoverColor: "hover:border-[#0077B5]/30",
  },
  {
    icon: Github,
    label: "GitHub",
    desc: "Open source projects",
    href: "https://github.com/dolphinsystems",
    color: "bg-gray-100 text-gray-800",
    hoverColor: "hover:border-gray-300",
  },
  {
    icon: XIcon,
    label: "X (Twitter)",
    desc: "News & conversations",
    href: "https://x.com/dolphinsystems",
    color: "bg-gray-100 text-gray-800",
    hoverColor: "hover:border-gray-300",
  },
];

const guidelines = [
  {
    icon: Heart,
    title: "Be Respectful",
    desc: "Treat all community members with kindness and respect. Harassment or discrimination of any kind will not be tolerated.",
  },
  {
    icon: Shield,
    title: "Stay On Topic",
    desc: "Keep discussions relevant to DolphinSystems products, technology, and related subjects. Off-topic posts may be removed.",
  },
  {
    icon: Lightbulb,
    title: "Share Knowledge",
    desc: "Help others by sharing your experience and expertise. Constructive feedback drives our products forward.",
  },
  {
    icon: HelpCircle,
    title: "Search Before Posting",
    desc: "Check existing discussions before creating a new one. You might find that your question has already been answered.",
  },
];

const categoryIcons: Record<string, typeof Bug> = {
  "Bug Report": Bug,
  "Feature Request": Sparkles,
  "General Discussion": MessageSquare,
  Feedback: Heart,
};

const recentTopics = [
  {
    title: "How to integrate DolphinAPI with existing microservices?",
    author: "Alex Chen",
    category: "General Discussion",
    replies: 12,
    time: "2 hours ago",
  },
  {
    title: "Feature Request: Dark mode for admin dashboard",
    author: "Sarah Kim",
    category: "Feature Request",
    replies: 8,
    time: "5 hours ago",
  },
  {
    title: "Bug: WebSocket connection drops on high load",
    author: "Mike Torres",
    category: "Bug Report",
    replies: 15,
    time: "1 day ago",
  },
  {
    title: "Best practices for scaling SaaS deployments",
    author: "Sofia Lindqvist",
    category: "General Discussion",
    replies: 23,
    time: "2 days ago",
  },
  {
    title: "Feedback on the new onboarding flow",
    author: "Jordan Lee",
    category: "Feedback",
    replies: 6,
    time: "3 days ago",
  },
];

export default function CommunityPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Your topic has been submitted! Our team will review it shortly.");
    setFormData({ name: "", email: "", topic: "", category: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Join Our <span className="text-gradient">Community</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              Be part of an open community where developers, users, and
              enthusiasts discuss ideas, report issues, and shape the future of
              DolphinSystems together.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://discord.gg/dolphinsystems"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#5865F2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5865F2]/25 transition-all hover:shadow-xl"
              >
                <MessageCircle className="h-4 w-4" />
                Join Our Discord
              </a>
              <a
                href="#discussion-form"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Start a Discussion
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Community Platforms */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold text-navy">Find Us Everywhere</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Connect with DolphinSystems on your favorite platform.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {communityLinks.map((platform, i) => {
              const Icon = platform.icon;
              return (
                <AnimatedSection key={platform.label} delay={i * 0.05}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md ${platform.hoverColor}`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${platform.color}`}
                    >
                      <Icon />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-navy">
                      {platform.label}
                    </p>
                    <p className="mt-1 text-xs text-muted">{platform.desc}</p>
                    <ExternalLink className="mt-3 h-3.5 w-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Topics */}
      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-navy">
                  Recent Discussions
                </h2>
                <p className="mt-2 text-muted">
                  See what the community is talking about.
                </p>
              </div>
              <MessageSquare className="hidden h-8 w-8 text-primary/30 sm:block" />
            </div>
          </AnimatedSection>

          <div className="mt-10 space-y-3">
            {recentTopics.map((topic, i) => {
              const CategoryIcon = categoryIcons[topic.category] || MessageSquare;
              return (
                <AnimatedSection key={topic.title} delay={i * 0.05}>
                  <div className="group flex items-center gap-4 rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-navy group-hover:text-primary">
                        {topic.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                        <span>{topic.author}</span>
                        <span className="rounded-full bg-surface px-2 py-0.5 font-medium">
                          {topic.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {topic.replies} replies
                        </span>
                      </div>
                    </div>
                    <div className="hidden shrink-0 items-center gap-1.5 text-xs text-muted sm:flex">
                      <Clock className="h-3 w-3" />
                      {topic.time}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Discussion Form */}
      <section id="discussion-form" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <AnimatedSection className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm sm:p-10">
                <h2 className="text-2xl font-bold text-navy">
                  Start a Discussion
                </h2>
                <p className="mt-2 text-muted">
                  Share your thoughts, report issues, or request features
                  publicly so others can join in.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="community-name"
                        className="mb-2 block text-sm font-medium text-navy"
                      >
                        Your Name
                      </label>
                      <input
                        id="community-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="community-email"
                        className="mb-2 block text-sm font-medium text-navy"
                      >
                        Email Address
                      </label>
                      <input
                        id="community-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="community-topic"
                        className="mb-2 block text-sm font-medium text-navy"
                      >
                        Topic
                      </label>
                      <input
                        id="community-topic"
                        type="text"
                        required
                        value={formData.topic}
                        onChange={(e) =>
                          setFormData({ ...formData, topic: e.target.value })
                        }
                        placeholder="Brief summary of your topic"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="community-category"
                        className="mb-2 block text-sm font-medium text-navy"
                      >
                        Category
                      </label>
                      <select
                        id="community-category"
                        required
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="community-message"
                      className="mb-2 block text-sm font-medium text-navy"
                    >
                      Message
                    </label>
                    <textarea
                      id="community-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describe your topic in detail..."
                      className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark"
                  >
                    Submit Topic
                    <Send className="h-4 w-4" />
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>

            {/* Guidelines */}
            <AnimatedSection delay={0.2} className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-navy">
                  Community Guidelines
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Help us keep DolphinSystems community a great place.
                </p>
                <div className="mt-6 space-y-5">
                  {guidelines.map((g) => (
                    <div key={g.title} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <g.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          {g.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {g.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Discord CTA */}
      <section className="border-t border-border bg-navy py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5865F2]/20">
              <MessageCircle className="h-7 w-7 text-[#5865F2]" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Join the Conversation on Discord
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Get real-time support, connect with other users, and be the first
              to hear about new features and releases.
            </p>
            <a
              href="https://discord.gg/dolphinsystems"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#5865F2] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5865F2]/25 transition-all hover:shadow-xl"
            >
              <MessageCircle className="h-4 w-4" />
              Open Discord
              <ArrowRight className="h-4 w-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
