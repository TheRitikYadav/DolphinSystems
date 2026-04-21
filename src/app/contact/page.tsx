"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Linkedin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const subjects = ["General Inquiry", "Sales", "Support", "Partnership"];

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "1209 Mountain Road PL NE, Ste N\nAlbuquerque, NM 87110, USA",
    href: "https://maps.google.com/?q=1209+Mountain+Road+PL+NE+Ste+N+Albuquerque+NM+87110",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@dolphinsystems.net",
    href: "mailto:contact@dolphinsystems.net",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(972) 812-7212",
    href: "tel:+19728127212",
  },
];

const socialPlatforms = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/dolphinsystems",
    color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5]",
  },
  {
    icon: XIcon,
    label: "X (Twitter)",
    href: "https://x.com/dolphinsystems",
    color: "hover:bg-navy/10 hover:text-navy",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    href: "https://discord.gg/dolphinsystems",
    color: "hover:bg-[#5865F2]/10 hover:text-[#5865F2]",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for reaching out! We'll get back to you within 24 hours."
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              We&apos;d Love to Hear From You
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              Whether you have a question about our products, pricing, or
              anything else — our team is ready to answer all your questions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form + Sidebar */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Form */}
            <AnimatedSection className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm sm:p-10">
                <h2 className="text-2xl font-bold text-navy">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-muted">
                  Fill out the form below and we&apos;ll respond within 24
                  hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-navy"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-navy"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-navy"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-navy"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark"
                  >
                    Send Message
                    <Send className="h-4 w-4" />
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection delay={0.2} className="space-y-8">
              {/* Contact Info */}
              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-navy">
                  Contact Information
                </h3>
                <div className="mt-6 space-y-6">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "Address" ? "_blank" : undefined}
                      rel={
                        item.label === "Address"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-start gap-4 transition-colors"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted">
                          {item.label}
                        </p>
                        <p className="mt-1 whitespace-pre-line text-sm font-medium text-navy group-hover:text-primary">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-navy">Follow Us</h3>
                <p className="mt-2 text-sm text-muted">
                  Stay connected on social media.
                </p>
                <div className="mt-5 flex gap-3">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <a
                        key={platform.label}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={platform.label}
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-all ${platform.color}`}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Map Placeholder */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-8">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
                <div className="relative text-center">
                  <MapPin className="mx-auto h-8 w-8 text-primary" />
                  <p className="mt-3 text-sm font-semibold text-navy">
                    Albuquerque, NM
                  </p>
                  <p className="mt-1 text-xs text-muted">United States</p>
                  <a
                    href="https://maps.google.com/?q=1209+Mountain+Road+PL+NE+Ste+N+Albuquerque+NM+87110"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    View on Google Maps
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold text-navy">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Explore our products and services, or join our community to stay
              updated on the latest from DolphinSystems.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl"
              >
                View Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-navy transition-all hover:border-primary hover:text-primary"
              >
                Join Community
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
