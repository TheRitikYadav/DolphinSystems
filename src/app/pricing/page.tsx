"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Star,
  ChevronDown,
  Monitor,
  Smartphone,
  Laptop,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Headphones,
  RefreshCw,
  BarChart3,
  Code2,
  Settings,
  Globe,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const deviceTypes = ["Web", "Mobile", "Desktop"] as const;
type DeviceType = (typeof deviceTypes)[number];

const deviceIcons: Record<DeviceType, React.ReactNode> = {
  Web: <Globe className="h-4 w-4" />,
  Mobile: <Smartphone className="h-4 w-4" />,
  Desktop: <Laptop className="h-4 w-4" />,
};

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  featureIcons: React.ReactNode[];
  cta: string;
  popular?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$300 – $1,000",
    description: "For small businesses and startups getting online.",
    features: [
      "Basic website",
      "Responsive design",
      "SEO setup",
      "3 revisions",
      "Email support",
    ],
    featureIcons: [
      <Globe key="g" className="h-4 w-4" />,
      <Monitor key="m" className="h-4 w-4" />,
      <BarChart3 key="b" className="h-4 w-4" />,
      <RefreshCw key="r" className="h-4 w-4" />,
      <Headphones key="h" className="h-4 w-4" />,
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$1,000 – $2,000",
    description: "For growing businesses that need custom solutions.",
    features: [
      "Custom web app",
      "CMS integration",
      "API development",
      "Unlimited revisions",
      "Priority support",
      "Analytics dashboard",
    ],
    featureIcons: [
      <Code2 key="c" className="h-4 w-4" />,
      <Settings key="s" className="h-4 w-4" />,
      <Zap key="z" className="h-4 w-4" />,
      <RefreshCw key="r" className="h-4 w-4" />,
      <Headphones key="h" className="h-4 w-4" />,
      <BarChart3 key="b" className="h-4 w-4" />,
    ],
    cta: "Go Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with complex requirements.",
    features: [
      "Full-stack development",
      "Microservices architecture",
      "Dedicated team",
      "24/7 support",
      "SLA guarantee",
      "Custom integrations",
    ],
    featureIcons: [
      <Code2 key="c" className="h-4 w-4" />,
      <Shield key="s" className="h-4 w-4" />,
      <Users key="u" className="h-4 w-4" />,
      <Headphones key="h" className="h-4 w-4" />,
      <Star key="st" className="h-4 w-4" />,
      <Settings key="se" className="h-4 w-4" />,
    ],
    cta: "Contact Sales",
  },
];

const comparisonFeatures = [
  { feature: "Custom Design", starter: true, pro: true, enterprise: true },
  { feature: "Responsive Layout", starter: true, pro: true, enterprise: true },
  { feature: "SEO Optimization", starter: true, pro: true, enterprise: true },
  { feature: "CMS Integration", starter: false, pro: true, enterprise: true },
  { feature: "API Development", starter: false, pro: true, enterprise: true },
  { feature: "Analytics Dashboard", starter: false, pro: true, enterprise: true },
  { feature: "Microservices", starter: false, pro: false, enterprise: true },
  { feature: "Dedicated Team", starter: false, pro: false, enterprise: true },
  { feature: "SLA Guarantee", starter: false, pro: false, enterprise: true },
  { feature: "24/7 Support", starter: false, pro: false, enterprise: true },
  { feature: "Unlimited Revisions", starter: false, pro: true, enterprise: true },
  { feature: "Custom Integrations", starter: false, pro: false, enterprise: true },
];

const faqs = [
  {
    q: "How does pricing vary by device type?",
    a: "Pricing depends on the complexity of the platform. Web apps generally fall at the lower end of each tier, while mobile (iOS/Android) and desktop apps require additional development and tend to be at the higher end. Multi-platform projects are quoted individually.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. After launch, we offer monthly maintenance plans starting at $50/month for Starter, $150/month for Professional, and custom rates for Enterprise clients — covering updates, security patches, and minor feature additions.",
  },
  {
    q: "What's included in the revision process?",
    a: "Each revision cycle includes design feedback, content adjustments, and layout changes. Starter includes 3 revision rounds, while Professional and Enterprise include unlimited revisions until you're fully satisfied.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. You can upgrade at any time and we'll credit the difference. Many clients start with Starter and scale to Professional as their needs grow.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept credit/debit cards via Stripe, PayPal, and Apple Pay. Enterprise clients can also pay by invoice with NET-30 terms. Visit our Payments page for details.",
  },
];

export default function PricingPage() {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("Web");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
          >
            Choose the plan that fits your business. No hidden fees, no
            surprises — just great software at fair prices.
          </motion.p>
        </div>
      </section>

      {/* Device Type Toggle */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <span className="mr-2 text-sm font-medium text-muted">
              Platform:
            </span>
            {deviceTypes.map((device) => (
              <button
                key={device}
                onClick={() => setActiveDevice(device)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeDevice === device
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "border border-border bg-white text-muted hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {deviceIcons[device]}
                {device}
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Pricing varies by platform complexity. Ranges shown reflect typical
            {" "}{activeDevice.toLowerCase()} projects.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-xl ${
                  tier.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                {tier.popular && (
                  <div className="flex items-center justify-center gap-1.5 bg-primary py-2 text-sm font-semibold text-white">
                    <Star className="h-4 w-4 fill-white" />
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-navy">{tier.name}</h3>
                  <p className="mt-2 text-sm text-muted">{tier.description}</p>
                  <div className="mt-6">
                    <span className="text-3xl font-extrabold text-navy">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="ml-1 text-sm text-muted">
                        / project
                      </span>
                    )}
                  </div>
                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feat, j) => (
                      <li key={feat} className="flex items-center gap-3">
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full ${
                            tier.popular
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm text-navy-light">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all ${
                      tier.popular
                        ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl"
                        : "border border-border text-navy hover:border-primary hover:text-primary"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold text-navy">
              Feature Comparison
            </h2>
            <p className="mt-3 text-center text-muted">
              A detailed look at what each plan includes.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="px-6 py-4 font-semibold text-navy">
                        Feature
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-navy">
                        Starter
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-primary">
                        Professional
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-navy">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={i % 2 === 0 ? "" : "bg-surface/50"}
                      >
                        <td className="px-6 py-3.5 text-navy-light">
                          {row.feature}
                        </td>
                        {[row.starter, row.pro, row.enterprise].map(
                          (val, j) => (
                            <td key={j} className="px-6 py-3.5 text-center">
                              {val ? (
                                <Check className="mx-auto h-5 w-5 text-accent" />
                              ) : (
                                <span className="text-border">—</span>
                              )}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-center text-3xl font-bold text-navy">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-center text-muted">
            Everything you need to know about our pricing.
          </p>
        </AnimatedSection>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="overflow-hidden rounded-xl border border-border bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-navy transition-colors hover:text-primary"
                >
                  {faq.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              Need a Custom Quote?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Every project is unique. Let&apos;s discuss your requirements and
              craft a solution that fits your budget and goals.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
