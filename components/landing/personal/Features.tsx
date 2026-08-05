"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "No more guessing who paid",
    description:
      "Add anyone to a group and every expense logged is instantly visible to everyone. No spreadsheets, no screenshots, no guessing.",
  },
  {
    title: "The math, done for you",
    description:
      "Split evenly, by percentage, or by exact shares. Evven calculates real-time balances so nobody has to pull out a calculator.",
  },
  {
    title: "Settle up in seconds",
    description:
      "See exactly who paid what, mark it as settled, and move on. No more chasing people down for Venmo.",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline slides up on scroll entry
      gsap.fromTo(
        [labelRef.current, headlineRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Feature cards stagger in
      const cards = gridRef.current
        ? Array.from(gridRef.current.querySelectorAll<HTMLDivElement>(".feature-card"))
        : [];

      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="px-6 py-28 sm:py-36 bg-background"
    >
      <div className="mx-auto max-w-5xl">
        <p ref={labelRef} className="section-label mb-6">
          Core Features
        </p>

        <h2
          ref={headlineRef}
          className="hero-main-text text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)] max-w-[16ch] mb-20"
        >
          The only expense tracker your group will actually use.
        </h2>

        {/* Feature grid — hover reveals green left-border flash like DeepJudge row highlights */}
        <div ref={gridRef} className="grid gap-0 lg:grid-cols-3 border-t border-[var(--evven-border)]">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="
                feature-card relative
                py-10 pr-10
                border-b lg:border-b-0 lg:border-r
                border-[var(--evven-border)]
                last:border-r-0 last:border-b-0
                space-y-4
                cursor-default
                transition-colors duration-300
              "
              style={{
                background:
                  hovered === idx
                    ? "color-mix(in srgb, var(--evven-accent-primary) 5%, transparent)"
                    : "transparent",
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Animated green left border accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full transition-all duration-300 origin-top"
                style={{
                  background: "var(--evven-accent-primary)",
                  transform: hovered === idx ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                }}
                aria-hidden
              />

              <span className="inline-block text-xs font-semibold tracking-[0.15em] text-[var(--evven-accent-primary)] uppercase">
                0{idx + 1}
              </span>
              <h3
                className="text-xl font-semibold text-[var(--evven-text-primary)] leading-snug transition-colors duration-200"
                style={{ color: hovered === idx ? "var(--evven-accent-primary)" : undefined }}
              >
                {feature.title}
              </h3>
              <p className="text-[var(--evven-text-muted)] leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
