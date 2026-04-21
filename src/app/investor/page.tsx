"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Globe,
  ShieldCheck,
  Layers,
  Repeat,
  BarChart3,
  ArrowRight,
  Mail,
  Building2,
  Target,
  Zap,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const keyMetrics = [
  {
    icon: TrendingUp,
    label: "Revenue Growth",
    value: "Steady",
    detail: "Growing year-over-year",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    label: "Active Customers",
    value: "50+",
    detail: "And growing",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Package,
    label: "Product Portfolio",
    value: "10+",
    detail: "SaaS microservices",
    color: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  },
  {
    icon: DollarSign,
    label: "Revenue Model",
    value: "SaaS",
    detail: "Subscription-based recurring",
    color: "bg-[#F59E0B]/10 text-[#F59E0B]",
  },
];

const highlights = [
  {
    icon: Layers,
    title: "Scalable Platform",
    desc: "Our microservices architecture enables rapid deployment and seamless horizontal scaling to meet enterprise demand.",
  },
  {
    icon: Globe,
    title: "Growing Market",
    desc: "The global SaaS market continues to grow rapidly. DolphinSystems is building its presence in B2B microservices.",
  },
  {
    icon: ShieldCheck,
    title: "Strong Team",
    desc: "A dedicated team with hands-on experience in cloud infrastructure, SaaS development, and customer success.",
  },
  {
    icon: Repeat,
    title: "Recurring Revenue",
    desc: "Subscription-based model with healthy retention delivers predictable, recurring revenue.",
  },
  {
    icon: Target,
    title: "Product-Market Fit",
    desc: "Growing demand across multiple verticals with organic growth driven by customer satisfaction and referrals.",
  },
  {
    icon: Zap,
    title: "Rapid Innovation",
    desc: "Agile development cycle ships new features regularly, keeping pace with evolving customer needs.",
  },
];

export default function InvestorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-28 sm:py-36">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy opacity-90" />
          <div className="absolute -left-60 -top-60 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-60 -right-60 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Invest in the{" "}
              <span className="text-gradient">Future</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              DolphinSystems is building the next generation of B2B and B2C SaaS
              microservices — scalable, reliable, and designed for the modern
              enterprise.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact-investors"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl"
              >
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                About the Company
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="relative -mt-16 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyMetrics.map((metric, i) => (
              <AnimatedSection key={metric.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-border bg-white p-6 shadow-lg"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.color}`}
                  >
                    <metric.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-navy">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{metric.detail}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <AnimatedSection>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Company Overview
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Building the Infrastructure for Modern SaaS
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted">
                DolphinSystems specializes in creating robust B2B and B2C
                products, deploying microservices as SaaS solutions for
                businesses and professional clients worldwide. Our platform
                empowers companies to scale efficiently without the overhead of
                building complex infrastructure from scratch.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                With a growing portfolio of microservices spanning
                authentication, payments, analytics, and communications, we
                serve businesses looking for reliable SaaS infrastructure.
              </p>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-navy">
                    Albuquerque, NM
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-navy">
                    Growing Team
                  </span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="relative rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-white to-accent/5 p-8 sm:p-10">
                <h3 className="text-lg font-bold text-navy">
                  Market Opportunity
                </h3>
                <div className="mt-6 space-y-5">
                  {[
                    {
                      label: "Global SaaS Market (2030)",
                      value: "$908B",
                    },
                    {
                      label: "Microservices Adoption Rate",
                      value: "85%",
                    },
                    {
                      label: "Cloud Migration Spend (2027)",
                      value: "$1.3T",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-muted">{stat.label}</span>
                      <span className="text-lg font-bold text-navy">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Invest
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
              Investment Highlights
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              Key reasons DolphinSystems represents a compelling investment
              opportunity in the fast-growing SaaS market.
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <AnimatedSection key={h.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group h-full rounded-2xl border border-border bg-white p-7 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <h.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {h.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Contact */}
      <section id="contact-investors" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-navy">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 sm:p-14">
                <AnimatedSection>
                  <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                    Investor Relations
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                    Let&apos;s Talk About the Future
                  </h2>
                  <p className="mt-4 leading-relaxed text-gray-400">
                    Interested in learning more about DolphinSystems&apos;
                    growth story and investment opportunity? We&apos;d love to
                    connect with you.
                  </p>

                  <div className="mt-8 space-y-4">
                    <a
                      href="mailto:investors@dolphinsystems.net"
                      className="flex items-center gap-3 text-gray-300 transition-colors hover:text-primary"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                          Investor Inquiries
                        </p>
                        <p className="text-sm font-medium">
                          investors@dolphinsystems.net
                        </p>
                      </div>
                    </a>
                    <a
                      href="tel:+19728127212"
                      className="flex items-center gap-3 text-gray-300 transition-colors hover:text-primary"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                          Corporate Office
                        </p>
                        <p className="text-sm font-medium">(972) 812-7212</p>
                      </div>
                    </a>
                  </div>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="mailto:investors@dolphinsystems.net?subject=Investment%20Inquiry%20-%20Schedule%20a%20Call"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl"
                    >
                      Schedule a Call
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
                    >
                      Learn More About Us
                    </Link>
                  </div>
                </AnimatedSection>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-6 text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      <TrendingUp className="h-12 w-12 text-accent" />
                    </motion.div>
                    <div>
                      <p className="text-3xl font-bold text-white">Growing</p>
                      <p className="text-sm text-gray-400">
                        Year-over-Year
                      </p>
                    </div>
                    <div className="mx-auto flex max-w-xs justify-center gap-2">
                      {[40, 55, 45, 65, 50, 80, 70, 90, 85, 100].map(
                        (h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="w-3 rounded-full bg-gradient-to-t from-primary to-accent"
                            style={{ maxHeight: `${h}px` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h3 className="text-xl font-bold text-navy">
                Want to learn more about DolphinSystems?
              </h3>
              <p className="mt-1 text-sm text-muted">
                Visit our About page for our full company story, mission, and
                vision.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-light"
            >
              About DolphinSystems
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
