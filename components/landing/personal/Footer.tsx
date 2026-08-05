"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Security", href: "/security" },
  ],
  Resources: [
    { label: "Guides", href: "/guides" },
    { label: "Support", href: "/support" },
    { label: "Status", href: "/status" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "mailto:hello@evven.xyz" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Social: [
    { label: "GitHub", href: "https://github.com/Evven-hq" },
    { label: "LinkedIn", href: "https://linkedin.com/company/evven-hq" },
  ],
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`
        relative overflow-hidden
        bg-[var(--evven-text-primary)]
        text-white
        transition-all duration-1000
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* Very subtle grid lines (like DeepJudge dark footer) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "8.333% 80px",
        }}
        aria-hidden
      />

      <div className="relative z-10">
        {/* Top: big statement */}
        <div className="px-6 md:px-10 lg:px-14 pt-20 md:pt-28 pb-10">
          <h2
            className="
              hero-main-text
              text-[clamp(2.8rem,6vw,6rem)]
              leading-[0.92]
              tracking-[-0.05em]
              text-white
            "
          >
            Split fairly.
            <br />
            Stay friends.
          </h2>
        </div>

        {/* Center: massive wordmark */}
        <div className="flex items-center justify-center py-8 overflow-hidden">
          <span
            className="
              select-none font-heading font-bold leading-none
              tracking-[-0.06em]
              text-white/10
              text-[clamp(7rem,20vw,19rem)]
              whitespace-nowrap
            "
            aria-hidden
          >
            EVVEN
          </span>
        </div>

        {/* Bottom: links + legal */}
        <div className="border-t border-white/10 px-6 md:px-10 lg:px-14 pt-12 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {group}
                </p>
                <div className="flex flex-col gap-3">
                  {links.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/Evven-white.svg"
                alt="Evven"
                width={60}
                height={20}
                className="h-4 w-auto opacity-60"
              />
            </div>
            <p className="text-[11px] tracking-[0.15em] text-white/35">
              © {year} EVVEN — Less time settling bills. More time making memories.
            </p>
          </div>
        </div>
      </div>

      {/* Character illustration */}
      <div
        className="
          pointer-events-none
          absolute right-[-2rem] bottom-0 z-20
          w-[34vw] h-[34vw]
          min-w-[280px] min-h-[280px]
          max-w-[560px] max-h-[560px]
          select-none
        "
      >
        <Image
          src="/footer-img.png"
          alt=""
          fill
          className="object-contain object-bottom-right"
        />
      </div>
    </footer>
  );
}
