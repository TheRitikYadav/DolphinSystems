"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { FileText, Shield, AlertCircle, Scale } from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using DolphinSystems services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.",
  },
  {
    id: "services",
    title: "2. Description of Services",
    content:
      "DolphinSystems provides B2B and B2C products including web development, IT solutions, automation services, and Microservices deployed as Software as a Service (SaaS). Our services include but are not limited to custom web applications, mobile applications, API development, cloud infrastructure, and ongoing technical support.",
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    content:
      "To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.",
  },
  {
    id: "payment",
    title: "4. Payment Terms",
    content:
      "Payments are processed through Stripe, PayPal, and Apple Pay. All fees are quoted in US Dollars unless otherwise stated. Payment is due upon invoice unless a different arrangement has been agreed upon in writing. Late payments may incur additional charges as outlined in your service agreement.",
  },
  {
    id: "ip",
    title: "5. Intellectual Property",
    content:
      "All content, code, designs, and materials created by DolphinSystems remain our intellectual property until full payment is received and ownership is explicitly transferred as outlined in your project agreement. You retain ownership of all content you provide to us.",
  },
  {
    id: "liability",
    title: "6. Limitation of Liability",
    content:
      "DolphinSystems shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.",
  },
  {
    id: "termination",
    title: "7. Termination",
    content:
      "Either party may terminate services with 30 days written notice. Upon termination, you will be billed for all work completed up to the termination date. Any pre-paid amounts for uncompleted work will be refunded per our refund policy.",
  },
  {
    id: "privacy",
    title: "8. Privacy & Data Protection",
    content:
      "We are committed to protecting your privacy and personal data. Our data handling practices comply with applicable laws and regulations. We do not sell or share your personal information with third parties except as necessary to provide our services.",
  },
  {
    id: "governing",
    title: "9. Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of the State of New Mexico, United States. Any disputes shall be resolved in the courts of Bernalillo County, New Mexico.",
  },
  {
    id: "contact",
    title: "10. Contact Information",
    content:
      "For questions about these Terms of Service, please contact us at contact@dolphinsystems.net or call (972) 812-7212. Our office is located at 1209 Mountain Road PL NE, Ste N, Albuquerque, NM 87110, USA.",
  },
];

export default function TermsPage() {
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Last updated: March 1, 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12 flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-navy">Important Notice</h3>
                <p className="mt-1 text-sm text-muted">
                  Please read these terms carefully before using our services. By using DolphinSystems,
                  you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="mb-12 flex flex-wrap gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary"
              >
                {section.title.replace(/^\d+\.\s/, "")}
              </a>
            ))}
          </div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <AnimatedSection key={section.id} delay={i * 0.05}>
                <div id={section.id} className="scroll-mt-24">
                  <h2 className="flex items-center gap-3 text-xl font-bold text-navy">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    {section.title.replace(/^\d+\.\s/, "")}
                  </h2>
                  <p className="mt-3 pl-11 leading-relaxed text-muted">
                    {section.content}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16">
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-surface p-8 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Scale className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy">Have Questions?</h3>
                <p className="mt-1 text-sm text-muted">
                  If you have any questions about our Terms of Service, don&apos;t hesitate to reach out.
                </p>
              </div>
              <div className="flex gap-3 sm:ml-auto">
                <Link
                  href="/contact"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Contact Us
                </Link>
                <Link
                  href="/refund"
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-surface"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
