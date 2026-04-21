import Link from "next/link";
import Image from "next/image";
import { Linkedin, Github, MessageCircle } from "lucide-react";

const footerSections = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/investor", label: "Investors" },
      { href: "/blog", label: "Blog" },
      { href: "/community", label: "Community" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/products", label: "Products" },
      { href: "/pricing", label: "Pricing" },
      { href: "/payments", label: "Payments" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/refund", label: "Refund Policy" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
];

const socialLinks = [
  { href: "https://linkedin.com/company/dolphinsystems", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/dolphinsystems", icon: Github, label: "GitHub" },
  { href: "https://x.com/dolphinsystems", icon: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ), label: "X" },
  { href: "https://discord.gg/dolphinsystems", icon: MessageCircle, label: "Discord" },
  { href: "https://t.me/dolphinsystems", icon: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ), label: "Telegram" },
  { href: "https://youtube.com/@dolphinsystems", icon: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ), label: "YouTube" },
  { href: "https://facebook.com/dolphinsystems", icon: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ), label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="DolphinSystems"
                className="h-9 w-9"
              />
              <span className="text-lg font-bold text-white">
                Dolphin<span className="text-primary">Systems</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Specializing in B2B and B2C products with a focus on deploying Microservices as SaaS solutions for businesses and professional clients.
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <p>1209 Mountain Road PL NE, Ste N</p>
              <p>Albuquerque, NM 87110, USA</p>
              <p>
                <a href="mailto:contact@dolphinsystems.net" className="transition-colors hover:text-primary">
                  contact@dolphinsystems.net
                </a>
              </p>
              <p>
                <a href="tel:+19728127212" className="transition-colors hover:text-primary">
                  (972) 812-7212
                </a>
              </p>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DolphinSystems. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-primary/20 hover:text-primary"
                  aria-label={social.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
