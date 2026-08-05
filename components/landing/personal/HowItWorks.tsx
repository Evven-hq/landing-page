"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    tag: "Track",
    title: "Capture every expense",
    desc: "Snap a receipt or log it in seconds. Tag who paid and who's in — Evven remembers so you don't have to.",
  },
  {
    tag: "Split",
    title: "Split it your way",
    desc: "Even, by percentage, or custom shares — choose per expense. Evven calculates exact amounts so there's never a debate.",
  },
  {
    tag: "Settle",
    title: "Close the loop",
    desc: "See live balances, send a payment reminder, and mark it paid. Done in five minutes, not five arguments.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        [labelRef.current, headlineRef.current],
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Each step row slides up
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
              onEnter: () => setActiveStep((p) => Math.max(p, i)),
            },
          }
        );
      });

      // Scroll-driven vertical progress line fill
      if (progressFillRef.current && sectionRef.current) {
        gsap.fromTo(
          progressFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-background px-6 py-28 sm:py-36 border-t border-[var(--evven-border)]"
    >
      <div className="mx-auto max-w-5xl">
        <p ref={labelRef} className="section-label mb-6">
          How It Works
        </p>

        <h2
          ref={headlineRef}
          className="hero-main-text text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)] max-w-[18ch] mb-24"
        >
          Three steps to manage any group expense.
        </h2>

        {/* Step rows — left progress line */}
        <div className="relative flex gap-10">
          {/* Vertical progress line */}
          <div
            ref={progressLineRef}
            className="hidden sm:flex flex-col items-center flex-shrink-0 w-px relative"
            style={{ marginTop: 4 }}
            aria-hidden
          >
            <div className="absolute inset-0 bg-[var(--evven-border)]" />
            <div
              ref={progressFillRef}
              className="absolute inset-0 bg-[var(--evven-accent-primary)]"
              style={{ transformOrigin: "top", scaleY: 0 }}
            />
          </div>

          <div className="flex-1 space-y-0">
            {steps.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) stepRefs.current[idx] = el;
                }}
                className="
                  group grid grid-cols-1 sm:grid-cols-[180px_1fr]
                  gap-6 sm:gap-16
                  py-12
                  border-b border-[var(--evven-border)]
                  last:border-b-0
                  cursor-default
                "
              >
                {/* Left */}
                <div className="flex sm:flex-col items-start gap-4 sm:gap-3">
                  <span
                    className="text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300"
                    style={{
                      color:
                        activeStep >= idx
                          ? "var(--evven-accent-primary)"
                          : "var(--evven-text-muted)",
                    }}
                  >
                    {item.tag}
                  </span>
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold transition-all duration-400"
                    style={{
                      borderColor:
                        activeStep >= idx
                          ? "var(--evven-accent-primary)"
                          : "var(--evven-border)",
                      color:
                        activeStep >= idx
                          ? "var(--evven-text-inverse)"
                          : "var(--evven-text-muted)",
                      background:
                        activeStep >= idx ? "var(--evven-accent-primary)" : "transparent",
                    }}
                  >
                    {idx + 1}
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-3">
                  <h3
                    className="text-2xl sm:text-3xl font-semibold leading-tight transition-colors duration-300"
                    style={{
                      color:
                        activeStep >= idx
                          ? "var(--evven-text-primary)"
                          : "color-mix(in srgb, var(--evven-text-primary) 55%, transparent)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[var(--evven-text-muted)] leading-relaxed text-base sm:text-lg max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
