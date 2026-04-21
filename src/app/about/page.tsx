"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Lightbulb,
  Shield,
  Eye,
  Heart,
  MapPin,
  Calendar,
  Building2,
  ArrowRight,
  Target,
  Rocket,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We push boundaries with cutting-edge technology, constantly exploring new ways to solve complex business challenges.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description:
      "Our infrastructure and services are built for 99.99% uptime, because your business never sleeps.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Open communication, honest pricing, and clear documentation — no hidden fees or surprises.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every product decision starts with our customers. Your success is the metric we optimize for.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-navy pb-24 pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Story
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About{" "}
              <span className="text-gradient">DolphinSystems</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              DolphinSystems is a technology company specializing in B2B and B2C
              products with a core focus on deploying Microservices as SaaS
              solutions. We empower businesses and professional clients with
              enterprise-grade tools that are accessible, scalable, and
              affordable.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedSection>
              <div className="group relative h-full rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-xl lg:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-navy">Our Mission</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  To democratize enterprise-grade technology through accessible
                  SaaS microservices — enabling businesses of every size to
                  compete, innovate, and grow without the burden of building
                  complex infrastructure from scratch.
                </p>
                <div className="mt-6 h-1 w-16 rounded-full bg-primary" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="group relative h-full rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-xl lg:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                  <Rocket className="h-7 w-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-navy">Our Vision</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  To become the leading B2B and B2C product company in web and
                  IT, recognized globally for delivering reliable, innovative
                  SaaS solutions that transform the way organizations operate in
                  the digital era.
                </p>
                <div className="mt-6 h-1 w-16 rounded-full bg-accent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto mb-16 max-w-2xl text-center">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              What Drives Us
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-muted">
              These principles guide every decision we make and every product we
              build.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group h-full rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <value.icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Who We Are
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built in the Heart of{" "}
                <span className="text-gradient">New Mexico</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                Founded with the vision of making enterprise technology
                accessible to all, DolphinSystems is headquartered in
                Albuquerque, NM. From our home base in the Land of Enchantment,
                we serve clients across the globe with our suite of SaaS
                microservices and product solutions.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Learn More
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Calendar className="h-6 w-6 text-primary" />
                  <p className="mt-3 text-sm font-medium text-gray-400">
                    Founded
                  </p>
                  <p className="mt-1 text-xl font-bold text-white">2024</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Building2 className="h-6 w-6 text-accent" />
                  <p className="mt-3 text-sm font-medium text-gray-400">
                    Headquarters
                  </p>
                  <p className="mt-1 text-xl font-bold text-white">
                    Albuquerque, NM
                  </p>
                </div>
                <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6">
                  <MapPin className="h-6 w-6 text-primary" />
                  <p className="mt-3 text-sm font-medium text-gray-400">
                    Office Address
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-relaxed text-white">
                    1209 Mountain Road PL NE, Ste N
                    <br />
                    Albuquerque, NM 87110, USA
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-12 text-center lg:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/20 blur-2xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Work With Us?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
                Discover how DolphinSystems can help transform your business with
                scalable SaaS solutions.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary shadow-lg transition-all hover:shadow-xl"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View Products
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
