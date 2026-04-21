"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Home,
  Info,
  Users,
  Mail,
  Package,
  CreditCard,
  DollarSign,
  BookOpen,
  TrendingUp,
  MessageSquare,
  FileText,
  RotateCcw,
  Map,
} from "lucide-react";

const sitemapSections = [
  {
    title: "Main",
    links: [
      { href: "/", label: "Home", icon: Home, description: "Landing page" },
      { href: "/about", label: "About", icon: Info, description: "Company information" },
      { href: "/contact", label: "Contact", icon: Mail, description: "Get in touch" },
    ],
  },
  {
    title: "Services & Products",
    links: [
      { href: "/products", label: "Products", icon: Package, description: "Browse our products" },
      { href: "/pricing", label: "Pricing", icon: DollarSign, description: "Service pricing" },
      { href: "/payments", label: "Payments", icon: CreditCard, description: "Payment options" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog", icon: BookOpen, description: "Articles & insights" },
      { href: "/investor", label: "Investors", icon: TrendingUp, description: "Investor relations" },
      { href: "/community", label: "Community", icon: MessageSquare, description: "Join discussions" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service", icon: FileText, description: "Our terms" },
      { href: "/refund", label: "Refund Policy", icon: RotateCcw, description: "Refund information" },
      { href: "/sitemap", label: "Sitemap", icon: Map, description: "You are here" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy py-24">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Map className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Site<span className="text-gradient">map</span>
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              A complete overview of all pages on DolphinSystems.net
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {sitemapSections.map((section, sectionIdx) => (
              <AnimatedSection key={section.title} delay={sectionIdx * 0.1}>
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-navy">{section.title}</h2>
                  <div className="space-y-2">
                    {section.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all hover:bg-surface"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-navy">{link.label}</span>
                            <p className="text-xs text-muted">{link.description}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12">
            <div className="rounded-2xl bg-surface p-6 text-center">
              <p className="text-sm text-muted">
                Can&apos;t find what you&apos;re looking for?{" "}
                <Link href="/contact" className="font-medium text-primary hover:underline">
                  Contact us
                </Link>{" "}
                and we&apos;ll help you out.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
