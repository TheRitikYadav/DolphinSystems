"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  FileText,
  Wallet,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const paymentMethods = [
  {
    name: "Stripe",
    description:
      "Pay securely with Visa, Mastercard, American Express, and other major credit and debit cards via Stripe.",
    icon: <CreditCard className="h-7 w-7" />,
    color: "from-indigo-500 to-purple-500",
    brands: ["Visa", "Mastercard", "Amex"],
  },
  {
    name: "PayPal",
    description:
      "Use your PayPal balance or linked bank account for fast, buyer-protected transactions worldwide.",
    icon: <Wallet className="h-7 w-7" />,
    color: "from-blue-500 to-cyan-400",
    brands: ["PayPal Balance", "Bank Transfer"],
  },
  {
    name: "Apple Pay",
    description:
      "One-tap checkout on supported Apple devices. Fast, private, and secured with Face ID or Touch ID.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="currentColor"
      >
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
    color: "from-gray-800 to-gray-600",
    brands: ["Face ID", "Touch ID"],
  },
];

const steps = [
  {
    step: 1,
    title: "Choose Your Plan",
    description:
      "Browse our pricing tiers and select the plan that matches your project scope and budget.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    step: 2,
    title: "Secure Checkout",
    description:
      "Pay using your preferred method — Stripe, PayPal, or Apple Pay. All transactions are encrypted end-to-end.",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    step: 3,
    title: "Get Started",
    description:
      "Receive instant confirmation and onboarding details. Your project kicks off within 24 hours.",
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
];

const securityBadges = [
  {
    title: "SSL Encrypted",
    description: "All data is transmitted over 256-bit SSL encryption.",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    title: "PCI Compliant",
    description: "We adhere to PCI DSS Level 1 standards for card security.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "Data Encrypted",
    description:
      "Payment information is tokenized — we never store raw card details.",
    icon: <BadgeCheck className="h-6 w-6" />,
  },
  {
    title: "Refund Policy",
    description:
      "Full refund within 14 days if the project hasn't entered development.",
    icon: <RefreshCw className="h-6 w-6" />,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Secure <span className="text-gradient">Payment</span> Options
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
          >
            We make it easy and safe to pay for your projects. Choose the method
            that works best for you.
          </motion.p>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-center text-3xl font-bold text-navy">
            Accepted Payment Methods
          </h2>
          <p className="mt-3 text-center text-muted">
            Fast, flexible, and secure — pay however you prefer.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {paymentMethods.map((method, i) => (
            <AnimatedSection key={method.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <div
                  className={`flex h-36 items-center justify-center bg-gradient-to-br ${method.color}`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                    {method.icon}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-navy">
                    {method.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {method.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {method.brands.map((brand) => (
                      <span
                        key={brand}
                        className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-navy-light"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold text-navy">
              How Payment Works
            </h2>
            <p className="mt-3 text-center text-muted">
              Three simple steps from plan selection to project kickoff.
            </p>
          </AnimatedSection>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={item}
                className="relative flex flex-col items-center text-center"
              >
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+2.5rem)] top-10 hidden h-0.5 w-[calc(100%-5rem)] bg-gradient-to-r from-primary/30 to-accent/30 md:block" />
                )}
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <div className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-center text-3xl font-bold text-navy">
            Your Security, Our Priority
          </h2>
          <p className="mt-3 text-center text-muted">
            Industry-leading security measures to protect every transaction.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityBadges.map((badge, i) => (
            <AnimatedSection key={badge.title} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {badge.icon}
                </div>
                <h3 className="mt-4 text-sm font-bold text-navy">
                  {badge.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {badge.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-navy">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Check our plans, pick your payment method, and let&apos;s build
              something great together.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl"
              >
                View Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
