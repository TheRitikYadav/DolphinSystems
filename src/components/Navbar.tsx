"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  {
    label: "Services",
    children: [
      { href: "/products", label: "Products" },
      { href: "/pricing", label: "Pricing" },
      { href: "/payments", label: "Payments" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/investor", label: "Investors" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="DolphinSystems"
              width={36}
              height={36}
              className="h-9 w-9"
              priority
            />
            <span className="text-lg font-bold text-navy">
              Dolphin<span className="text-primary">Systems</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-navy-light transition-colors hover:bg-primary/5 hover:text-primary">
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-1 w-48 overflow-hidden rounded-xl border border-border bg-white p-1 shadow-lg"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-navy-light transition-colors hover:bg-primary/5 hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-navy-light transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
            >
              Get Started
            </Link>
          </div>

          <button
            className="lg:hidden rounded-lg p-2 text-navy-light hover:bg-primary/5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) =>
                link.children ? (
                  link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy-light hover:bg-primary/5 hover:text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy-light hover:bg-primary/5 hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/contact"
                className="mt-2 block rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
