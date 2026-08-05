"use client";

/**
 * FloatingCards
 *
 * 5 cards in a fixed overlay. Each stage transition:
 *  1. Measures actual DOM elements via data-float-target="N" inside the
 *     target section to get exact pixel position + width.
 *  2. Flies the floating cards to those coordinates via GSAP.
 *  3. Cross-fades content at the midpoint of the tween.
 *
 * All 5 shells stay mounted forever so GSAP never loses its target.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────── Types ────────────────── */
type CardContent = {
  tag: string;
  headline: string;
  body: string;
  accent?: boolean;
};

/* ──────────────── Content banks ─────────── */
const HERO_CONTENT: CardContent[] = [
  { tag: "Dinner",    headline: "$112.40",   body: "Split 4 ways · paid by Alex" },
  { tag: "Airbnb",    headline: "$640.00",   body: "Split 6 ways · 3 owe you" },
  { tag: "Groceries", headline: "$38.75",    body: "Split 2 ways · settled" },
  { tag: "Petrol",    headline: "$54.20",    body: "3 ways · you owe €18" },
  { tag: "Flights",   headline: "$1,240.00", body: "Group trip · 5 people" },
];

const DOWNLOAD_CONTENT: (CardContent | null)[] = [
  { tag: "Android · v0.0.1", headline: "Evven Beta",  body: "Tap to download the APK", accent: true },
  { tag: "Platform",          headline: "Android",     body: "Requires 8.0+" },
  { tag: "Size",              headline: "~12 MB",      body: "Direct APK install" },
  { tag: "iOS",               headline: "Coming soon", body: "Sign up for early access" },
  null,
];

const FEATURES_CONTENT: (CardContent | null)[] = [
  { tag: "01", headline: "No more guessing who paid",  body: "Every expense instantly visible to everyone." },
  { tag: "02", headline: "The math, done for you",     body: "Split evenly, by %, or by exact shares." },
  { tag: "03", headline: "Settle up in seconds",       body: "See who paid what and mark it settled." },
  null,
  null,
];

const HIW_CONTENT: (CardContent | null)[] = [
  { tag: "Step 01 · Track",  headline: "Capture every expense",  body: "Snap a receipt or log it in seconds." },
  { tag: "Step 02 · Split",  headline: "Split it your way",      body: "Even, by %, or custom shares per expense." },
  { tag: "Step 03 · Settle", headline: "Close the loop",         body: "See balances and mark it paid." },
  null,
  null,
];

/* Hero starting positions — scattered (vw/vh strings, set once) */
const HERO_POS = [
  { x: "3vw",  y: "19vh", r: -4,   w: "160px" },
  { x: "77vw", y: "16vh", r: 3.5,  w: "160px" },
  { x: "5vw",  y: "57vh", r: 2,    w: "160px" },
  { x: "76vw", y: "55vh", r: -3,   w: "160px" },
  { x: "43vw", y: "70vh", r: 1.5,  w: "160px" },
];

/* ──────────────── Sub-components ─────────── */
function MiniBarcode({ seed = 0, accent }: { seed?: number; accent?: boolean }) {
  return (
    <div className="flex items-end gap-[1.5px] px-4 pt-3 pb-2" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 rounded-t-sm"
          style={{
            width:      i % 5 === 0 ? "2.5px" : "1.2px",
            height:     `${5 + Math.abs(Math.sin((i + seed) * 0.72)) * 12}px`,
            background: accent ? "rgba(255,255,255,0.35)" : "var(--evven-text-primary)",
            opacity:    accent ? 1 : 0.11 + (i % 3) * 0.07,
          }}
        />
      ))}
    </div>
  );
}

function CardInner({ content, seed }: { content: CardContent; seed: number }) {
  return (
    <div
      className="rounded-2xl border border-[var(--evven-border)] backdrop-blur-md shadow-lg overflow-hidden"
      style={{
        background: content.accent
          ? "var(--evven-accent-primary)"
          : "color-mix(in srgb, var(--evven-card-background) 94%, transparent)",
        width: "100%",
      }}
    >
      <MiniBarcode seed={seed} accent={content.accent} />
      <div className="px-4 pb-4 pt-0.5">
        <p
          className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-1.5 leading-tight"
          style={{ color: content.accent ? "rgba(255,255,255,0.6)" : "var(--evven-accent-primary)" }}
        >
          {content.tag}
        </p>
        <p
          className="font-bold leading-tight mb-1.5"
          style={{
            fontSize: content.tag.startsWith("0") || content.tag.startsWith("S") ? "13px" : "15px",
            color:    content.accent ? "#ffffff" : "var(--evven-text-primary)",
          }}
        >
          {content.headline}
        </p>
        <p
          className="text-[11px] leading-snug"
          style={{ color: content.accent ? "rgba(255,255,255,0.52)" : "var(--evven-text-muted)" }}
        >
          {content.body}
        </p>
      </div>
    </div>
  );
}

/* ──────────────── Main component ─────────── */
export function FloatingCards() {
  const shellRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const innerRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const [contents, setContents]       = useState<(CardContent | null)[]>([...HERO_CONTENT]);
  const currentStage                  = useRef(-1);
  const idleTweens                    = useRef<gsap.core.Tween[]>([]);

  /* Kill + restart idle bob */
  const startIdleFloat = useCallback(() => {
    idleTweens.current.forEach((t) => t.kill());
    idleTweens.current = (shellRefs.current.filter(Boolean) as HTMLDivElement[]).map((el, i) =>
      gsap.to(el, {
        y:        `+=${4 + i * 1.5}`,
        duration: 2.4 + i * 0.35,
        repeat:   -1,
        yoyo:     true,
        ease:     "sine.inOut",
        delay:    i * 0.38,
      })
    );
  }, []);

  /* Measure data-float-target elements inside a section */
  const measure = useCallback((sectionId: string, count: number): (DOMRect | null)[] => {
    const section = document.getElementById(sectionId);
    if (!section) return Array(count).fill(null);
    return Array.from({ length: count }, (_, i) => {
      const el = section.querySelector<HTMLElement>(`[data-float-target="${i}"]`);
      return el ? el.getBoundingClientRect() : null;
    });
  }, []);

  /* Cross-fade content at midpoint */
  const swapContent = useCallback(
    (next: (CardContent | null)[], delay: number) => {
      gsap.delayedCall(delay, () => {
        innerRefs.current.forEach((el) => {
          if (el) gsap.to(el, { opacity: 0, duration: 0.16, ease: "power1.in" });
        });
      });
      gsap.delayedCall(delay + 0.2, () => {
        setContents(next);
      });
      gsap.delayedCall(delay + 0.24, () => {
        innerRefs.current.forEach((el) => {
          if (el) gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
        });
      });
    },
    []
  );

  /* Fly cards to measured pixel rects */
  const flyToRects = useCallback(
    (
      rects: (DOMRect | null)[],
      contents: (CardContent | null)[],
      opts: { rotate?: number }[] = [],
      dur = 1.0
    ) => {
      swapContent(contents, dur * 0.45);

      rects.forEach((rect, i) => {
        const el = shellRefs.current[i];
        if (!el) return;

        if (!rect || contents[i] === null) {
          gsap.to(el, { opacity: 0, scale: 0.75, duration: 0.45, ease: "power2.in", overwrite: "auto" });
          return;
        }

        // Cards are `absolute` inside a `fixed` container — use viewport coords directly
        gsap.to(el, {
          left:     rect.left,
          top:      rect.top,
          width:    rect.width,
          rotate:   opts[i]?.rotate ?? 0,
          scale:    1,
          opacity:  1,
          duration: dur,
          ease:     "power3.inOut",
          overwrite: "auto",
        });
      });

      gsap.delayedCall(dur + 0.1, startIdleFloat);
    },
    [swapContent, startIdleFloat]
  );

  /* Stage machine */
  const morphToStage = useCallback(
    (stage: number) => {
      if (stage === currentStage.current) return;
      currentStage.current = stage;
      idleTweens.current.forEach((t) => t.kill());

      if (stage === 0) {
        // Back to hero scatter
        HERO_POS.forEach((pos, i) => {
          const el = shellRefs.current[i];
          if (!el) return;
          gsap.to(el, { left: pos.x, top: pos.y, width: pos.w, rotate: pos.r, scale: 1, opacity: 1, duration: 1.0, ease: "power3.inOut", overwrite: "auto" });
        });
        swapContent([...HERO_CONTENT], 0.45);
        gsap.delayedCall(1.1, startIdleFloat);
        return;
      }

      if (stage === 1) {
        // Download: main card snaps to the download card, others fan out as receipt stack offset below it
        const [mainRect] = measure("download", 1);
        const rects: (DOMRect | null)[] = [mainRect];
        if (mainRect) {
          // Fan 3 receipt cards stacked behind and above the main card
          const h = mainRect.height;
          const makeRect = (dl: number, dt: number, dw: number): DOMRect =>
            ({ ...mainRect, left: mainRect.left + dl, top: mainRect.top + dt, width: mainRect.width * dw, height: h, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => ({}) } as DOMRect);
          rects.push(
            makeRect(-14, -h * 0.18, 0.76),
            makeRect(-26, -h * 0.33, 0.66),
            makeRect(-36, -h * 0.46, 0.58),
          );
        } else {
          rects.push(null, null, null);
        }
        rects.push(null);
        flyToRects(rects, DOWNLOAD_CONTENT, [{ rotate: 0 }, { rotate: -4 }, { rotate: 2.5 }, { rotate: -2 }]);
        return;
      }

      if (stage === 2) {
        const rects = measure("features", 3);
        flyToRects([...rects, null, null], FEATURES_CONTENT, [{ rotate: -0.6 }, { rotate: 0.4 }, { rotate: -0.5 }]);
        return;
      }

      if (stage === 3) {
        const rects = measure("how-it-works", 3);
        // Offset floating card to the right portion of each step row, same size
        const adjusted = rects.map((r): DOMRect | null => {
          if (!r) return null;
          const w = Math.min(280, r.width * 0.38);
          return { ...r, left: r.right - w - 16, width: w, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => ({}) } as DOMRect;
        });
        flyToRects([...adjusted, null, null], HIW_CONTENT, [{ rotate: 0 }, { rotate: 0.4 }, { rotate: -0.4 }]);
        return;
      }

      // Stage 4+: fade all out
      shellRefs.current.forEach((el) => {
        if (el) gsap.to(el, { opacity: 0, scale: 0.8, duration: 0.55, ease: "power2.in", overwrite: "auto" });
      });
    },
    [measure, flyToRects, swapContent, startIdleFloat]
  );

  useEffect(() => {
    const shells = shellRefs.current.filter(Boolean) as HTMLDivElement[];
    if (shells.length < 5) return;

    // Set Stage 0 positions
    HERO_POS.forEach((pos, i) => {
      gsap.set(shells[i], { left: pos.x, top: pos.y, width: pos.w, rotate: pos.r, scale: 1, opacity: 0, force3D: true });
    });

    // Stagger entrance
    gsap.to(shells, { opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out", delay: 1.4, onComplete: startIdleFloat });
    currentStage.current = 0;

    // ScrollTrigger per section
    ([
      { id: "download",     stage: 1, delay: 0 },
      { id: "features",     stage: 2, delay: 0.55 },
      { id: "how-it-works", stage: 3, delay: 0.6  },
      { id: "use-cases",    stage: 4, delay: 0 },
    ] as { id: string; stage: number; delay: number }[]).forEach(({ id, stage, delay }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger:     el,
        start:       "top 55%",
        end:         "top 10%",
        onEnter:     () => delay > 0 ? gsap.delayedCall(delay, () => morphToStage(stage)) : morphToStage(stage),
        onLeaveBack: () => morphToStage(stage - 1),
      });
    });

    return () => {
      idleTweens.current.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [morphToStage, startIdleFloat]);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none overflow-visible" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const content = contents[i] ?? { tag: "", headline: "", body: "" };
        return (
          <div
            key={i}
            ref={(el) => { shellRefs.current[i] = el; }}
            className="absolute"
            style={{ willChange: "transform, opacity, width, left, top" }}
          >
            <div ref={(el) => { innerRefs.current[i] = el; }}>
              <CardInner content={content} seed={i * 9} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
