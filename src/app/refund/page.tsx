"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  HeartHandshake,
  MessageSquare,
} from "lucide-react";

const refundSteps = [
  {
    step: 1,
    title: "Submit a Request",
    description:
      "Contact our support team via email at contact@dolphinsystems.net or through the contact form. Include your order number and reason for the refund.",
    icon: MessageSquare,
  },
  {
    step: 2,
    title: "Review Process",
    description:
      "Our team will review your request within 2 business days. We may reach out for additional information if needed.",
    icon: Clock,
  },
  {
    step: 3,
    title: "Resolution",
    description:
      "Once approved, refunds are processed within 5-7 business days to your original payment method (Stripe, PayPal, or Apple Pay).",
    icon: CheckCircle,
  },
];

const eligibility = [
  {
    title: "Full Refund",
    description: "Available within 14 days of purchase if no work has commenced on your project.",
    eligible: true,
  },
  {
    title: "Partial Refund",
    description:
      "If work has begun, a prorated refund will be issued for the uncompleted portion of the project.",
    eligible: true,
  },
  {
    title: "Service Credits",
    description:
      "In some cases, we may offer service credits for future projects instead of a monetary refund.",
    eligible: true,
  },
  {
    title: "Non-Refundable",
    description:
      "Completed projects that have been delivered and approved are not eligible for refunds.",
    eligible: false,
  },
  {
    title: "Third-Party Costs",
    description:
      "Domain registrations, hosting fees, and other third-party costs incurred on your behalf are non-refundable.",
    eligible: false,
  },
];

export default function RefundPage() {
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
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
              <ShieldCheck className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Refund <span className="text-gradient">Policy</span>
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Your satisfaction is our priority. We believe in fair and transparent refund practices.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-16 rounded-2xl border border-green-100 bg-green-50 p-8 text-center">
              <HeartHandshake className="mx-auto h-10 w-10 text-green-600" />
              <h2 className="mt-4 text-2xl font-bold text-navy">
                Our Commitment to You
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted">
                At DolphinSystems, we strive to ensure every customer is completely satisfied.
                Our refund policy is designed to be fair, transparent, and hassle-free.
                We never want you to feel stuck — if something isn&apos;t right, we&apos;ll make it right.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="mb-8 text-2xl font-bold text-navy">How Refunds Work</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {refundSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="relative rounded-2xl border border-border bg-white p-6"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                        {step.step}
                      </span>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                    {i < refundSteps.length - 1 && (
                      <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-border md:block" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-navy">Refund Eligibility</h2>
            <div className="space-y-4">
              {eligibility.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4 rounded-xl border border-border bg-white p-5"
                >
                  {item.eligible ? (
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  )}
                  <div>
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </div>
                  <span
                    className={`ml-auto shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      item.eligible
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {item.eligible ? "Eligible" : "Not Eligible"}
                  </span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-16">
            <div className="rounded-2xl bg-navy p-8 text-center">
              <h2 className="text-2xl font-bold text-white">Need a Refund?</h2>
              <p className="mx-auto mt-3 max-w-lg text-gray-400">
                Our support team is here to help. Reach out and we&apos;ll resolve your
                concern quickly and fairly.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Contact Support
                </Link>
                <Link
                  href="/terms"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View Terms
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
