"use client";

/**
 * FloatingCards — persistent expense cards that live in a fixed overlay
 * and morph their content / position as the user scrolls through sections.
 *
 * Scroll milestones:
 *  0      → Hero:        scattered floating cards (original positions)
 *  1      → Download:    cards cluster bottom-left like an install receipt
 *  2      → Features:    cards expand into a 3-column feature grid row
 *  3      → HowItWorks:  cards stack vertically on the right as step markers
 *  4+     → hide cleanly
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Card data at each scroll milestone ── */
const STAGES: {
  label: string;
  amount: string;
  sub: string;
  // vw/vh percentages for each of the 5 cards at this stage
  positions: { x: string; y: string; rotate: number; scale: number }[];
}[] = [
  {
    // ── Stage 0: Hero — scattered
    label: "",
    amount: "",
    sub: "",
    positions: [
      { x: "4vw",   y: "18vh",  rotate: -4,   scale: 1 },
      { x: "76vw",  y: "22vh",  rotate: 3.5,  scale: 1 },
      { x: "6vw",   y: "56vh",  rotate: 2,    scale: 1 },
      { x: "76vw",  y: "52vh",  rotate: -3,   scale: 1 },
      { x: "44vw",  y: "78vh",  rotate: 1.5,  scale: 1 },
    ],
  },
  {
    // ── Stage 1: Download — tight cluster, bottom-left receipt stack
    label: "",
    amount: "",
    sub: "",
    positions: [
      { x: "3vw",   y: "62vh",  rotate: -2,   scale: 0.88 },
      { x: "3vw",   y: "68vh",  rotate: 1,    scale: 0.88 },
      { x: "3vw",   y: "74vh",  rotate: -1,   scale: 0.88 },
      { x: "3vw",   y: "80vh",  rotate: 2,    scale: 0.88 },
      { x: "3vw",   y: "86vh",  rotate: -0.5, scale: 0.88 },
    ],
  },
  {
    // ── Stage 2: Features — spread horizontally across top
    label: "",
    amount: "",
    sub: "",
    positions: [
      { x: "5vw",   y: "14vh",  rotate: -1.5, scale: 0.82 },
      { x: "25vw",  y: "12vh",  rotate: 1,    scale: 0.82 },
      { x: "45vw",  y: "14vh",  rotate: -0.5, scale: 0.82 },
      { x: "65vw",  y: "12vh",  rotate: 1.5,  scale: 0.82 },
      { x: "80vw",  y: "14vh",  rotate: -1,   scale: 0.82 },
    ],
  },
  {
    // ── Stage 3: HowItWorks — stack on right edge, step markers
    label: "",
    amount: "",
    sub: "",
    positions: [
      { x: "80vw",  y: "22vh",  rotate: 0,    scale: 0.78 },
      { x: "82vw",  y: "38vh",  rotate: 0,    scale: 0.78 },
      { x: "80vw",  y: "54vh",  rotate: 0,    scale: 0.78 },
      { x: "82vw",  y: "70vh",  rotate: 0,    scale: 0.78 },
      { x: "80vw",  y: "82vh",  rotate: 0,    scale: 0.78 },
    ],
  },
];

const CARD_DATA = [
  { label: "Dinner",    amount: "$112.40",   sub: "Split 4 ways · paid by Alex" },
  { label: "Airbnb",   amount: "$640.00",   sub: "Split 6 ways · 3 owe you" },
  { label: "Groceries",amount: "$38.75",    sub: "Split 2 ways · settled" },
  { label: "Petrol",   amount: "$54.20",    sub: "3 ways · you owe €18" },
  { label: "Flights",  amount: "$1,240.00", sub: "Group trip · 5 people" },
];

/* ── Mini barcode sparkline ── */
function Barcode({ seed = 0 }: { seed?: number }) {
  return (
    <div className="flex items-end gap-[2px] mb-2" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="rounded-t-sm"
          style={{
            width: i % 4 === 0 ? "3px" : "1.5px",
            height: `${8 + Math.abs(Math.sin((i + seed) * 0.7)) * 14}px`,
            background: "var(--evven-text-primary)",
            opacity: 0.14 + (i % 3) * 0.07,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length < 5) return;

    /* ── Set initial hero positions ── */
    const stage0 = STAGES[0].positions;
    cards.forEach((card, i) => {
      gsap.set(card, {
        left: stage0[i].x,
        top: stage0[i].y,
        rotate: stage0[i].rotate,
        scale: stage0[i].scale,
        opacity: 0,
        force3D: true,
      });
    });

    /* ── Entrance: stagger in after hero loads ── */
    gsap.to(cards, {
      opacity: 1,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.1,
      delay: 1.4,
    });

    /* ── Helper: animate all cards to a given stage ── */
    const morphToStage = (stageIdx: number, duration = 1.1) => {
      const stage = STAGES[Math.min(stageIdx, STAGES.length - 1)];
      cards.forEach((card, i) => {
        const pos = stage.positions[i];
        gsap.to(card, {
          left: pos.x,
          top: pos.y,
          rotate: pos.rotate,
          scale: pos.scale,
          opacity: stageIdx >= STAGES.length ? 0 : 1,
          duration,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      });
    };

    /* ── ScrollTrigger for each section ── */
    const sections = [
      { id: "#download",      stage: 1 },
      { id: "#features",      stage: 2 },
      { id: "#how-it-works",  stage: 3 },
      { id: "#use-cases",     stage: 4 }, // hide
    ];

    sections.forEach(({ id, stage }) => {
      const el = document.querySelector(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "top 20%",
        onEnter:  () => morphToStage(stage),
        onLeaveBack: () => morphToStage(stage - 1),
      });
    });

    /* ── Subtle idle float per card ── */
    cards.forEach((card) => {
      gsap.to(card, {
        y: `+=${6 + Math.random() * 8}`,
        duration: 2.4 + Math.random() * 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    /* Fixed overlay — sits above everything, pointer-events none */
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {CARD_DATA.map((card, i) => (
        <div
          key={card.label}
          ref={(el) => { if (el) cardRefs.current[i] = el; }}
          className="absolute"
          style={{ willChange: "transform, opacity" }}
        >
          <div
            className="rounded-2xl border border-[var(--evven-border)] bg-[var(--evven-card-background)]/90 backdrop-blur-md px-4 py-3 shadow-md"
            style={{ minWidth: 148, maxWidth: 176 }}
          >
            <Barcode seed={i * 7} />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--evven-text-muted)]">
              {card.label}
            </p>
            <p className="text-base font-bold text-[var(--evven-text-primary)] leading-tight mt-0.5">
              {card.amount}
            </p>
            <p className="text-[10px] text-[var(--evven-text-muted)] mt-0.5 leading-snug">
              {card.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
