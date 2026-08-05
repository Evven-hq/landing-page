"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

/* ── Barcode visual (animated thin vertical lines like DeepJudge) ── */
function BarcodeLines() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const lines = Array.from(el.querySelectorAll<HTMLDivElement>(".bar-line"));

    // stagger in
    gsap.set(lines, { scaleY: 0, transformOrigin: "bottom" });
    gsap.to(lines, {
      scaleY: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: { each: 0.012, from: "center" },
      delay: 0.6,
    });

    // subtle idle pulse
    lines.forEach((line, i) => {
      gsap.to(line, {
        scaleY: 0.55 + Math.random() * 0.45,
        duration: 1.8 + Math.random() * 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.03,
      });
    });
  }, []);

  const BAR_COUNT = 80;
  const ACCENT_INDICES = new Set([12, 13, 31, 32, 58, 59, 72]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(120px, 22vw, 260px)" }}
      aria-hidden
    >
      <div className="flex items-end justify-center gap-[2px] h-full w-full px-4">
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const isAccent = ACCENT_INDICES.has(i);
          const baseH = 20 + Math.abs(Math.sin(i * 0.4 + 1)) * 65 + Math.random() * 20;
          return (
            <div
              key={i}
              className="bar-line flex-shrink-0 rounded-t-sm"
              style={{
                width: i % 5 === 0 ? "3px" : "1.5px",
                height: `${baseH}%`,
                background: isAccent
                  ? "var(--evven-accent-primary)"
                  : "var(--evven-text-primary)",
                opacity: isAccent ? 0.9 : 0.18 + (i % 3) * 0.06,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── Hero ── */
export function Hero() {
  const annRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([annRef.current, headRef.current, subRef.current, btnsRef.current, barcodeRef.current], {
        opacity: 0,
        y: 28,
      });

      const tl = gsap.timeline({ delay: 0.05 });
      tl.to(annRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(headRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.45")
        .to(btnsRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.4")
        .to(barcodeRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-background overflow-hidden pt-28 pb-0 md:pt-36">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--evven-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--evven-text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Announcement pill */}
        <div ref={annRef} className="flex justify-center mb-8 md:mb-10">
          <a
            href="https://github.com/Evven-hq"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              border border-[var(--evven-border)]
              bg-white text-xs font-medium
              text-[var(--evven-text-muted)]
              hover:border-[var(--evven-accent-primary)]/40
              hover:text-[var(--evven-text-primary)]
              transition-all duration-200
            "
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--evven-accent-primary)]"
              aria-hidden
            />
            Open source — view on GitHub
            <span className="opacity-60" aria-hidden>→</span>
          </a>
        </div>

        {/* Headline */}
        <h1
          ref={headRef}
          className="
            hero-main-text
            text-[clamp(3.6rem,9vw,8rem)]
            leading-[0.92]
            tracking-[-0.04em]
            text-[var(--evven-text-primary)]
            text-balance
            mx-auto
            max-w-[14ch]
          "
        >
          Split bills.
          <br />
          Not&nbsp;friendships.
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="
            mt-7 md:mt-9
            mx-auto max-w-xl
            text-base md:text-lg
            leading-[1.7]
            text-[var(--evven-text-muted)]
          "
        >
          Stop doing math in the group chat. Evven tracks every shared expense
          automatically, settles balances instantly, and keeps the money
          conversations out of your friendships.
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className="mt-9 md:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="https://app.evven.xyz/signup"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-full
              bg-[var(--evven-accent-primary)] text-white
              text-sm font-semibold
              hover:bg-[var(--evven-accent-primary)]/90
              transition-all duration-200
              hover:scale-[1.02]
            "
          >
            Start splitting for free
          </Link>
          <a
            href="#how-it-works"
            className="
              inline-flex items-center gap-1.5
              px-6 py-3 rounded-full
              border border-[var(--evven-border)]
              bg-white
              text-sm font-medium text-[var(--evven-text-muted)]
              hover:text-[var(--evven-text-primary)]
              hover:border-[var(--evven-text-primary)]/30
              transition-all duration-200
            "
          >
            See how it works
          </a>
        </div>
      </div>

      {/* Barcode visual — spans full width below content */}
      <div ref={barcodeRef} className="relative z-10 mt-16 md:mt-20 w-full">
        <BarcodeLines />
      </div>
    </section>
  );
}
