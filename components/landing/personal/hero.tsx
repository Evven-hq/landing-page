"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Floating expense card ─────────────────────────── */
function ExpenseCard({
  label,
  amount,
  sub,
  style,
}: {
  label: string;
  amount: string;
  sub: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="floating-card absolute pointer-events-none select-none"
      style={style}
    >
      <div
        className="rounded-2xl border border-[var(--evven-border)] bg-white/80 backdrop-blur-sm px-4 py-3 shadow-sm"
        style={{ minWidth: 140 }}
      >
        {/* mini barcode lines */}
        <div className="flex items-end gap-[2px] mb-2.5" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="rounded-t-sm"
              style={{
                width: i % 4 === 0 ? "3px" : "1.5px",
                height: `${8 + Math.abs(Math.sin(i * 0.7)) * 14}px`,
                background: "var(--evven-text-primary)",
                opacity: 0.15 + (i % 3) * 0.08,
              }}
            />
          ))}
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--evven-text-muted)]">
          {label}
        </p>
        <p className="text-base font-bold text-[var(--evven-text-primary)] leading-tight mt-0.5">
          {amount}
        </p>
        <p className="text-[10px] text-[var(--evven-text-muted)] mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

/* ─── Animated barcode ──────────────────────────────── */
function BarcodeLines() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const lines = Array.from(el.querySelectorAll<HTMLDivElement>(".bar-line"));

    gsap.set(lines, { scaleY: 0, transformOrigin: "bottom" });
    gsap.to(lines, {
      scaleY: 1,
      duration: 1.4,
      ease: "power3.out",
      stagger: { each: 0.01, from: "center" },
      delay: 0.5,
    });

    // Scroll-driven barcode height compression
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom top",
      onUpdate: (self) => {
        const prog = self.progress;
        lines.forEach((line, i) => {
          const natural = 0.55 + Math.abs(Math.sin(i * 0.4)) * 0.45;
          gsap.set(line, { scaleY: natural * (1 - prog * 0.55) });
        });
      },
    });

    // idle pulse
    lines.forEach((line, i) => {
      gsap.to(line, {
        scaleY: 0.5 + Math.random() * 0.5,
        duration: 1.6 + Math.random() * 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.025,
      });
    });
  }, []);

  const BAR_COUNT = 90;
  const ACCENT_INDICES = new Set([11, 12, 30, 31, 55, 56, 70, 71]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(130px, 24vw, 280px)" }}
      aria-hidden
    >
      <div className="flex items-end justify-center gap-[2px] h-full w-full px-2">
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const isAccent = ACCENT_INDICES.has(i);
          const baseH = 20 + Math.abs(Math.sin(i * 0.4 + 1)) * 65 + Math.random() * 18;
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
                opacity: isAccent ? 0.85 : 0.14 + (i % 4) * 0.05,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────── */
export function Hero() {
  const annRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial stagger reveal ──
      gsap.set(
        [annRef.current, headRef.current, subRef.current, btnsRef.current, barcodeRef.current],
        { opacity: 0, y: 30 }
      );

      const tl = gsap.timeline({ delay: 0.08 });
      tl.to(annRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" })
        .to(headRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.45")
        .to(btnsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
        .to(barcodeRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");

      // ── Floating cards scroll parallax ──
      const cards = cardsRef.current
        ? Array.from(cardsRef.current.querySelectorAll<HTMLDivElement>(".floating-card"))
        : [];

      // Stagger cards in after hero loads
      gsap.set(cards, { opacity: 0, scale: 0.88, y: 20 });
      gsap.to(cards, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        delay: 1.2,
      });

      // Parallax drift on scroll
      const speeds = [0.12, -0.18, 0.22, -0.14, 0.16];
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: () => ScrollTrigger.getById("hero-scroll")?.progress! * speeds[i] * -400,
          ease: "none",
          scrollTrigger: {
            id: `card-${i}`,
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      // ── Hero section itself fades / scales slightly on scroll ──
      gsap.to(headRef.current, {
        y: -60,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background overflow-hidden pt-28 pb-0 md:pt-36"
    >
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

      {/* ── Floating expense cards (like DeepJudge's floating source cards) ── */}
      <div ref={cardsRef} className="pointer-events-none absolute inset-0" aria-hidden>
        <ExpenseCard
          label="Dinner"
          amount="$112.40"
          sub="Split 4 ways · paid by Alex"
          style={{ top: "18%", left: "4%", transform: "rotate(-4deg)" }}
        />
        <ExpenseCard
          label="Airbnb"
          amount="$640.00"
          sub="Split 6 ways · 3 owe you"
          style={{ top: "26%", right: "5%", transform: "rotate(3.5deg)" }}
        />
        <ExpenseCard
          label="Groceries"
          amount="$38.75"
          sub="Split 2 ways · settled"
          style={{ top: "55%", left: "7%", transform: "rotate(2deg)" }}
        />
        <ExpenseCard
          label="Petrol"
          amount="$54.20"
          sub="Split 3 ways · you owe €18"
          style={{ top: "50%", right: "4%", transform: "rotate(-3deg)" }}
        />
        <ExpenseCard
          label="Flights"
          amount="$1,240.00"
          sub="Group trip · 5 people"
          style={{ top: "78%", left: "50%", transform: "translateX(-50%) rotate(1.5deg)" }}
        />
      </div>

      {/* ── Main content ── */}
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

        {/* Subheading */}
        <p
          ref={subRef}
          className="mt-7 md:mt-9 mx-auto max-w-xl text-base md:text-lg leading-[1.7] text-[var(--evven-text-muted)]"
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
              active:scale-[0.98]
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

      {/* ── Barcode visual ── */}
      <div ref={barcodeRef} className="relative z-10 mt-16 md:mt-20 w-full">
        <BarcodeLines />
      </div>
    </section>
  );
}
