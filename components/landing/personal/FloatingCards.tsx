"use client";

/**
 * FloatingCards — 5 cards that live in a fixed overlay and morph their
 * position + content as the user scrolls through each section.
 *
 * Stage 0 → Hero:       scattered expense receipt cards
 * Stage 1 → Download:   morphs into Android install / receipt cards
 * Stage 2 → Features:   morphs into the 3 feature-highlight cards (01/02/03)
 * Stage 3 → HowItWorks: morphs into the 3 step cards (Track / Split / Settle)
 * Stage 4 → UseCases+:  fade out
 *
 * Content cross-fades at the midpoint of each position tween so the
 * spatial movement and content change feel like one fluid morph.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────── Types ───────────────────────── */
type CardContent = {
  tag: string;
  headline: string;
  body: string;
  accent?: boolean; // green background highlight
};

type StageConfig = {
  cards: (CardContent | null)[]; // null = invisible at this stage
  positions: {
    x: string;
    y: string;
    rotate: number;
    scale: number;
    opacity: number;
    width: string;
  }[];
};

/* ─────────────────────── Stage data ──────────────────── */
const STAGES: StageConfig[] = [
  // ── Stage 0: Hero — scattered expense cards ────────────
  {
    cards: [
      { tag: "Dinner",    headline: "$112.40",   body: "Split 4 ways · paid by Alex" },
      { tag: "Airbnb",    headline: "$640.00",   body: "Split 6 ways · 3 owe you" },
      { tag: "Groceries", headline: "$38.75",    body: "Split 2 ways · settled" },
      { tag: "Petrol",    headline: "$54.20",    body: "3 ways · you owe €18" },
      { tag: "Flights",   headline: "$1,240.00", body: "Group trip · 5 people" },
    ],
    positions: [
      { x: "3vw",   y: "19vh", rotate: -4,   scale: 1,    opacity: 1, width: "160px" },
      { x: "77vw",  y: "16vh", rotate: 3.5,  scale: 1,    opacity: 1, width: "160px" },
      { x: "5vw",   y: "58vh", rotate: 2,    scale: 1,    opacity: 1, width: "160px" },
      { x: "76vw",  y: "55vh", rotate: -3,   scale: 1,    opacity: 1, width: "160px" },
      { x: "43vw",  y: "70vh", rotate: 1.5,  scale: 1,    opacity: 1, width: "160px" },
    ],
  },

  // ── Stage 1: Download — APK install receipt stack ──────
  {
    cards: [
      {
        tag: "Android · v0.0.1",
        headline: "Evven Beta",
        body: "Tap to download the APK",
        accent: true,
      },
      { tag: "Platform",  headline: "Android",      body: "Requires 8.0+" },
      { tag: "Size",      headline: "~12 MB",        body: "Direct APK install" },
      { tag: "iOS",       headline: "Coming soon",   body: "Sign up for early access" },
      null, // 5th card hidden
    ],
    positions: [
      { x: "5vw",  y: "34vh", rotate: -1.5, scale: 1.05, opacity: 1, width: "180px" },
      { x: "5vw",  y: "54vh", rotate: 0.5,  scale: 0.9,  opacity: 1, width: "150px" },
      { x: "5vw",  y: "68vh", rotate: -0.5, scale: 0.9,  opacity: 1, width: "150px" },
      { x: "5vw",  y: "82vh", rotate: 1,    scale: 0.9,  opacity: 1, width: "150px" },
      { x: "5vw",  y: "96vh", rotate: 0,    scale: 0,    opacity: 0, width: "150px" },
    ],
  },

  // ── Stage 2: Features — feature highlight cards ────────
  {
    cards: [
      {
        tag: "01",
        headline: "No more guessing who paid",
        body: "Every expense is instantly visible to everyone.",
      },
      {
        tag: "02",
        headline: "The math, done for you",
        body: "Split evenly, by percentage, or exact shares.",
      },
      {
        tag: "03",
        headline: "Settle up in seconds",
        body: "See who paid what and mark it settled.",
      },
      null,
      null,
    ],
    positions: [
      { x: "4vw",  y: "10vh",  rotate: -0.8, scale: 0.88, opacity: 1, width: "200px" },
      { x: "35vw", y: "10vh",  rotate: 0.4,  scale: 0.88, opacity: 1, width: "200px" },
      { x: "66vw", y: "10vh",  rotate: -0.5, scale: 0.88, opacity: 1, width: "200px" },
      { x: "20vw", y: "10vh",  rotate: 0,    scale: 0,    opacity: 0, width: "160px" },
      { x: "52vw", y: "10vh",  rotate: 0,    scale: 0,    opacity: 0, width: "160px" },
    ],
  },

  // ── Stage 3: HowItWorks — step cards on right ─────────
  {
    cards: [
      {
        tag: "Step 01 · Track",
        headline: "Capture every expense",
        body: "Snap a receipt or log it in seconds.",
      },
      {
        tag: "Step 02 · Split",
        headline: "Split it your way",
        body: "Even, by %, or custom shares.",
      },
      {
        tag: "Step 03 · Settle",
        headline: "Close the loop",
        body: "See balances and mark it paid.",
      },
      null,
      null,
    ],
    positions: [
      { x: "76vw", y: "24vh",  rotate: 0,  scale: 0.85, opacity: 1, width: "190px" },
      { x: "76vw", y: "46vh",  rotate: 0,  scale: 0.85, opacity: 1, width: "190px" },
      { x: "76vw", y: "68vh",  rotate: 0,  scale: 0.85, opacity: 1, width: "190px" },
      { x: "76vw", y: "90vh",  rotate: 0,  scale: 0,    opacity: 0, width: "160px" },
      { x: "76vw", y: "110vh", rotate: 0,  scale: 0,    opacity: 0, width: "160px" },
    ],
  },

  // ── Stage 4: UseCases+ — all cards fade out ────────────
  {
    cards: [null, null, null, null, null],
    positions: [
      { x: "50vw", y: "50vh", rotate: 0, scale: 0, opacity: 0, width: "160px" },
      { x: "50vw", y: "50vh", rotate: 0, scale: 0, opacity: 0, width: "160px" },
      { x: "50vw", y: "50vh", rotate: 0, scale: 0, opacity: 0, width: "160px" },
      { x: "50vw", y: "50vh", rotate: 0, scale: 0, opacity: 0, width: "160px" },
      { x: "50vw", y: "50vh", rotate: 0, scale: 0, opacity: 0, width: "160px" },
    ],
  },
];

/* ─────────────────────── Card component ──────────────── */
function Card({
  content,
  cardRef,
}: {
  content: CardContent;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className="absolute pointer-events-none"
      style={{ willChange: "transform, opacity, width" }}
    >
      {/* Outer shell — border always visible, background swaps */}
      <div
        className="rounded-2xl border border-[var(--evven-border)] backdrop-blur-md shadow-lg overflow-hidden"
        style={{
          background: content.accent
            ? "var(--evven-accent-primary)"
            : "var(--evven-card-background)",
          width: "100%",
          minWidth: 140,
        }}
      >
        {/* Mini barcode top strip */}
        <MiniBarcode accent={content.accent} />

        <div className="px-4 pb-4 pt-1">
          <p
            className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-1.5 leading-tight"
            style={{
              color: content.accent
                ? "rgba(255,255,255,0.65)"
                : "var(--evven-text-muted)",
            }}
          >
            {content.tag}
          </p>
          <p
            className="text-[15px] font-bold leading-tight mb-1"
            style={{
              color: content.accent ? "#ffffff" : "var(--evven-text-primary)",
            }}
          >
            {content.headline}
          </p>
          <p
            className="text-[11px] leading-snug"
            style={{
              color: content.accent
                ? "rgba(255,255,255,0.55)"
                : "var(--evven-text-muted)",
            }}
          >
            {content.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Thin animated barcode strip at top of every card */
function MiniBarcode({ seed = 0, accent }: { seed?: number; accent?: boolean }) {
  const bars = Array.from({ length: 22 });
  return (
    <div className="flex items-end gap-[1.5px] px-4 pt-3 pb-2" aria-hidden>
      {bars.map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 rounded-t-sm"
          style={{
            width: i % 5 === 0 ? "2.5px" : "1.2px",
            height: `${5 + Math.abs(Math.sin((i + seed) * 0.72)) * 12}px`,
            background: accent ? "rgba(255,255,255,0.35)" : "var(--evven-text-primary)",
            opacity: accent ? 1 : 0.11 + (i % 3) * 0.07,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────── Main overlay ────────────────── */
export function FloatingCards() {
  const shellRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const contentRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const currentStage = useRef(0);
  const idleTimelines = useRef<gsap.core.Tween[]>([]);

  // React state drives only the visible card content (cross-fade)
  const [contents, setContents] = useState<(CardContent | null)[]>(
    STAGES[0].cards as (CardContent | null)[]
  );

  /* ── Content cross-fade helper ── */
  const swapContent = useCallback((nextStage: number) => {
    const nextCards = STAGES[nextStage].cards;

    // Fade content out on each card that's changing
    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: 0, duration: 0.18, ease: "power1.in" });
    });

    gsap.delayedCall(0.22, () => {
      setContents(nextCards as (CardContent | null)[]);
      contentRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
      });
    });
  }, []);

  /* ── Position + size morph helper ── */
  const morphToStage = useCallback(
    (nextStage: number, dur = 1.05) => {
      if (nextStage === currentStage.current) return;
      const stageIdx = Math.max(0, Math.min(nextStage, STAGES.length - 1));
      const stage = STAGES[stageIdx];
      currentStage.current = stageIdx;

      // Trigger content swap at 50% of the movement tween
      gsap.delayedCall(dur * 0.5, () => swapContent(stageIdx));

      shellRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = stage.positions[i];
        gsap.to(el, {
          left:    pos.x,
          top:     pos.y,
          rotate:  pos.rotate,
          scale:   pos.scale,
          opacity: pos.opacity,
          width:   pos.width,
          duration: dur,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      });
    },
    [swapContent]
  );

  useEffect(() => {
    const shells = shellRefs.current.filter(Boolean) as HTMLDivElement[];
    if (shells.length < 5) return;

    /* ── Set initial state from Stage 0 ── */
    STAGES[0].positions.forEach((pos, i) => {
      gsap.set(shells[i], {
        left:    pos.x,
        top:     pos.y,
        rotate:  pos.rotate,
        scale:   pos.scale,
        opacity: 0,
        width:   pos.width,
        force3D: true,
      });
    });

    /* ── Stagger entrance after hero loads ── */
    gsap.to(shells, {
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      delay: 1.5,
    });

    /* ── Idle float per card (overwritten on morph, restored after) ── */
    const startIdle = () => {
      idleTimelines.current.forEach((t) => t.kill());
      idleTimelines.current = shells.map((el) =>
        gsap.to(el, {
          y: `+=${5 + Math.random() * 9}`,
          duration: 2.2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        })
      );
    };
    gsap.delayedCall(2.0, startIdle);

    /* ── ScrollTrigger per section ── */
    const milestones = [
      { selector: "#download",     stage: 1 },
      { selector: "#features",     stage: 2 },
      { selector: "#how-it-works", stage: 3 },
      { selector: "#use-cases",    stage: 4 },
    ];

    milestones.forEach(({ selector, stage }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 58%",
        end: "top 15%",
        onEnter:     () => morphToStage(stage),
        onLeaveBack: () => morphToStage(stage - 1),
      });
    });

    return () => {
      idleTimelines.current.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [morphToStage]);

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {contents.map((content, i) => {
        if (!content) {
          // Invisible placeholder that GSAP still animates to keep the index stable
          return (
            <div
              key={i}
              ref={(el) => { shellRefs.current[i] = el; }}
              className="absolute"
              style={{ opacity: 0, willChange: "transform, opacity" }}
            />
          );
        }

        return (
          <div
            key={i}
            ref={(el) => { shellRefs.current[i] = el; }}
            className="absolute"
            style={{ willChange: "transform, opacity, width" }}
          >
            {/* Content wrapper fades independently during content swaps */}
            <div
              ref={(el) => { contentRefs.current[i] = el; }}
            >
              <div
                className="rounded-2xl border border-[var(--evven-border)] backdrop-blur-md shadow-lg overflow-hidden"
                style={{
                  background: content.accent
                    ? "var(--evven-accent-primary)"
                    : "color-mix(in srgb, var(--evven-card-background) 92%, transparent)",
                }}
              >
                <MiniBarcode seed={i * 9} accent={content.accent} />
                <div className="px-4 pb-4 pt-0.5">
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-1.5 leading-tight"
                    style={{
                      color: content.accent
                        ? "rgba(255,255,255,0.6)"
                        : "var(--evven-accent-primary)",
                    }}
                  >
                    {content.tag}
                  </p>
                  <p
                    className="font-bold leading-tight mb-1.5"
                    style={{
                      fontSize: content.tag.startsWith("0") ? "13px" : "15px",
                      color: content.accent ? "#ffffff" : "var(--evven-text-primary)",
                    }}
                  >
                    {content.headline}
                  </p>
                  <p
                    className="text-[11px] leading-snug"
                    style={{
                      color: content.accent
                        ? "rgba(255,255,255,0.52)"
                        : "var(--evven-text-muted)",
                    }}
                  >
                    {content.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
