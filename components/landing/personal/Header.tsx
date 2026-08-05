"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Personal" },
    { href: "/teams", label: "Teams" },
    { href: "/enterprise", label: "Enterprise" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      {/* Desktop pill navbar */}
      <header
        className={`
          fixed top-5 left-1/2 -translate-x-1/2 z-50
          hidden md:flex items-center gap-6
          transition-all duration-500
          px-3 py-2
          rounded-full
          border
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-md border-[var(--evven-border)] shadow-sm"
              : "bg-white/70 backdrop-blur-sm border-[var(--evven-border)]/60"
          }
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center pl-2 pr-1 flex-shrink-0">
          <Image
            src="/Evven-black.svg"
            alt="Evven"
            width={80}
            height={28}
            className="h-6 w-auto"
          />
        </Link>

        {/* Divider */}
        <div className="h-4 w-px bg-[var(--evven-border)]" />

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="
                px-3.5 py-1.5 rounded-full
                text-sm font-medium text-[var(--evven-text-muted)]
                hover:text-[var(--evven-text-primary)] hover:bg-[var(--evven-surface)]
                transition-all duration-200
              "
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-4 w-px bg-[var(--evven-border)]" />

        {/* CTA */}
        <div className="flex items-center gap-2 pr-1">
          <Link
            href="https://app.evven.xyz/login"
            className="
              px-3.5 py-1.5 rounded-full
              text-sm font-medium text-[var(--evven-text-muted)]
              hover:text-[var(--evven-text-primary)] hover:bg-[var(--evven-surface)]
              transition-all duration-200
            "
          >
            Login
          </Link>
          <Link
            href="https://app.evven.xyz/signup"
            className="
              px-4 py-2 rounded-full
              text-sm font-medium
              bg-[var(--evven-accent-primary)] text-white
              hover:bg-[var(--evven-accent-primary)]/90
              transition-all duration-200
            "
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5 py-4">
        <Link href="/">
          <Image
            src="/Evven-black.svg"
            alt="Evven"
            width={72}
            height={24}
            className="h-5 w-auto"
            style={{ mixBlendMode: "multiply" }}
          />
        </Link>
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="p-2 rounded-full bg-white/80 border border-[var(--evven-border)] backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="
              fixed inset-x-4 top-16 z-50 md:hidden
              bg-white rounded-[24px] border border-[var(--evven-border)]
              shadow-xl p-6
            "
          >
            <nav className="flex flex-col gap-1 mb-5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="
                    px-4 py-3 rounded-xl text-base font-medium
                    text-[var(--evven-text-primary)]
                    hover:bg-[var(--evven-surface)]
                    transition-colors
                  "
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="h-px bg-[var(--evven-border)] mb-5" />
            <div className="flex gap-3">
              <Link
                href="https://app.evven.xyz/login"
                className="flex-1 text-center py-2.5 rounded-full border border-[var(--evven-border)] text-sm font-medium hover:bg-[var(--evven-surface)] transition-colors"
              >
                Login
              </Link>
              <Link
                href="https://app.evven.xyz/signup"
                className="flex-1 text-center py-2.5 rounded-full bg-[var(--evven-accent-primary)] text-white text-sm font-medium hover:bg-[var(--evven-accent-primary)]/90 transition-colors"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
