"use client";

import { Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-black hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0077b5] hover:text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877f2] hover:text-white",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-muted">Share:</span>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:bg-primary hover:text-white ${
            copied ? "bg-primary text-white border-primary" : ""
          }`}
          aria-label="Copy link"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Check className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Link2 className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
