"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code,
  Server,
  Zap,
  ArrowRight,
  Layers,
  Shield,
  Headphones,
  Settings,
  Rocket,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BlogSection from "@/components/BlogSection";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Modern, responsive web applications built with cutting-edge frameworks. From MVPs to enterprise platforms — pixel-perfect and performant.",
  },
  {
    icon: Server,
    title: "IT Solutions",
    description:
      "Infrastructure management, cloud setup, and DevOps pipelines to keep your systems running smoothly.",
  },
  {
    icon: Zap,
    title: "Automation",
    description:
      "Workflow automation that reduces manual effort and helps your team focus on what matters.",
  },
];

const stats = [
  { value: "10+", label: "Products Deployed" },
  { value: "99.9%", label: "Uptime Target" },
  { value: "50+", label: "Clients Served" },
  { value: "24/7", label: "Support Available" },
];

const features = [
  {
    icon: Layers,
    title: "Microservices Architecture",
    description: "Decoupled, independently deployable services that scale with your demand.",
  },
  {
    icon: Rocket,
    title: "Scalable SaaS",
    description: "Multi-tenant platforms built to grow from day one without re-architecture.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Security best practices, encryption at rest & in transit, and access controls.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Monitoring and an engineering team ready to help when you need it.",
  },
  {
    icon: Settings,
    title: "Custom Solutions",
    description: "Tailored software that fits your exact workflow — no compromises, no bloat.",
  },
  {
    icon: Zap,
    title: "Fast Deployment",
    description: "CI/CD pipelines and containerized delivery for rapid, reliable releases.",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-navy min-h-[92vh] flex items-center">
        {/* animated grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* radial glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-primary/20 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 text-center lg:py-40">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-8"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-sm font-medium text-accent backdrop-blur-sm"
            >
              Microservices · SaaS · Cloud-Native
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-gradient max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Building the Future of Digital Infrastructure
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
            >
              We build and deploy microservices as SaaS solutions — helping businesses
              and professionals with reliable, secure digital products.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-primary/40"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="bg-surface py-28">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              What We Do
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              From concept to deployment, we deliver end-to-end digital solutions that drive
              real business outcomes.
            </p>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="group relative rounded-2xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-navy">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="text-center"
              >
                <span className="text-gradient text-5xl font-extrabold">{s.value}</span>
                <p className="mt-2 text-sm font-medium tracking-wide text-white/60 uppercase">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Why DolphinSystems ─── */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Why DolphinSystems
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              We combine solid engineering with product thinking to deliver
              infrastructure you can rely on.
            </p>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-2.5 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Blog ─── */}
      <BlogSection />

      {/* ─── CTA Banner ─── */}
      <section className="py-24">
        <AnimatedSection className="mx-auto max-w-7xl px-6">
          <div className="gradient-animate relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-navy px-8 py-20 text-center shadow-2xl sm:px-16">
            <div className="pointer-events-none absolute inset-0 opacity-10" style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to Build Something&nbsp;Great?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
                Let&rsquo;s turn your vision into production-grade software.
                Get started with a free consultation today.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-navy shadow-lg transition-all hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
