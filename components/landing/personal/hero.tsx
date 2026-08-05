"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated barcode strip ─────────────────────────── */
function BarcodeLines() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const lines = Array.from(el.querySelectorAll<HTMLDivElement>(".bar-line"));

    // Start collapsed, grow up
    gsap.fromTo(
      lines,
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 1.4,
        ease: "power3.out",
        stagger: { each: 0.008, from: "center" },
        delay: 0.6,
      }
    );

    // Scroll-driven height compression
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom top",
      onUpdate: (self) => {
        const prog = self.progress;
        lines.forEach((line, i) => {
          const natural = 0.55 + Math.abs(Math.sin(i * 0.4)) * 0.45;
          gsap.set(line, { scaleY: natural * (1 - prog * 0.6) });
        });
      },
    });

    // Idle pulse after entrance
    gsap.delayedCall(2.2, () => {
      lines.forEach((line, i) => {
        gsap.to(line, {
          scaleY: 0.4 + Math.random() * 0.6,
          duration: 1.8 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.022,
        });
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const BAR_COUNT = 90;
  const ACCENT = new Set([11, 12, 30, 31, 55, 56, 70, 71]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(130px, 22vw, 260px)" }}
      aria-hidden
    >
      <div className="flex items-end justify-center gap-[2.5px] h-full w-full px-4">
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const isAccent = ACCENT.has(i);
          const baseH = 22 + Math.abs(Math.sin(i * 0.4 + 1)) * 62 + Math.random() * 16;
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
                opacity: isAccent ? 0.9 : 0.13 + (i % 4) * 0.05,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────── */
export function Hero() {
  const annRef    = useRef<HTMLDivElement>(null);
  const h1Ref     = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const btnsRef   = useRef<HTMLDivElement>(null);
  const barcodeRef= useRef<HTMLDivElement>(null);
  const sectionRef= useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── fromTo: GSAP owns both start + end, no CSS conflict ──
      const tl = gsap.timeline({ delay: 0.05 });

      tl.fromTo(
        annRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
      )
      .fromTo(
        h1Ref.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.28"
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        btnsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.42"
      )
      .fromTo(
        barcodeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.45"
      );

      // ── Headline drifts up + fades as section leaves viewport ──
      gsap.to(h1Ref.current, {
        y: -70,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "55% top",
          scrub: 1.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background overflow-visible pt-28 pb-0 md:pt-36"
    >
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--evven-text-primary) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />

      {/* ── Main copy ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

        {/* Announcement pill */}
        <div ref={annRef} style={{ opacity: 0 }} className="flex justify-center mb-8 md:mb-10">
          <a
            href="https://github.com/Evven-hq"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              border border-[var(--evven-border)]
              bg-[var(--evven-card-background)] text-xs font-medium
              text-[var(--evven-text-muted)]
              hover:border-[var(--evven-accent-primary)]/50
              hover:text-[var(--evven-text-primary)]
              transition-all duration-200
            "
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--evven-accent-primary)]"
              aria-hidden
            />
            Open source — view on GitHub
            <span className="opacity-50" aria-hidden>→</span>
          </a>
        </div>

        {/* Headline */}
        <h1
          ref={h1Ref}
          style={{ opacity: 0 }}
          className="
            hero-main-text
            text-[clamp(3.8rem,9.5vw,8.5rem)]
            leading-[0.9]
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

        {/* Subheading */}
        <p
          ref={subRef}
          style={{ opacity: 0 }}
          className="mt-7 md:mt-9 mx-auto max-w-xl text-base md:text-lg leading-[1.72] text-[var(--evven-text-muted)]"
        >
          Stop doing math in the group chat. Evven tracks every shared expense
          automatically, settles balances instantly, and keeps the money
          conversations out of your friendships.
        </p>

        {/* CTA buttons */}
        <div
          ref={btnsRef}
          style={{ opacity: 0 }}
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
              hover:scale-[1.02] active:scale-[0.98]
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
              bg-[var(--evven-card-background)]
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

      {/* ── Barcode strip ── */}
      <div ref={barcodeRef} style={{ opacity: 0 }} className="relative z-10 mt-16 md:mt-22 w-full">
        <BarcodeLines />
      </div>
    </section>
  );
}
