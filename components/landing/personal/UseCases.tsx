"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    title: "Roommates",
    description:
      "Rent, wifi, groceries, and that one person who always 'forgets' their share — Evven keeps it all visible and fair.",
  },
  {
    title: "Trips",
    description:
      "Flights, hotels, that 2am taco run — track it as it happens so settling up after the trip takes minutes, not arguments.",
  },
  {
    title: "Couples",
    description:
      "Shared rent, date nights, joint savings goals — keep your finances transparent without turning every dinner into a budget meeting.",
  },
  {
    title: "Events",
    description:
      "Wedding gifts, group dinners, shared Airbnbs — keep every contribution clear without a single awkward follow-up.",
  },
];

export function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const rowRefs    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [labelRef.current, headRef.current],
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      rowRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="use-cases"
      ref={sectionRef}
      className="px-6 py-28 sm:py-36 bg-background"
    >
      <div className="mx-auto max-w-5xl">
        <p ref={labelRef} className="section-label mb-6" style={{ opacity: 0 }}>
          Use Cases
        </p>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
          {/* Left sticky heading */}
          <div className="lg:w-[38%] mb-14 lg:mb-0 lg:sticky lg:top-32">
            <h2
              ref={headRef}
              style={{ opacity: 0 }}
              className="hero-main-text text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)]"
            >
              Works for any group or occasion.
            </h2>
          </div>

          {/* Right: use case rows */}
          <div className="flex-1 space-y-0">
            {useCases.map((uc, i) => (
              <div
                key={uc.title}
                ref={(el) => { if (el) rowRefs.current[i] = el; }}
                style={{ opacity: 0 }}
                className="
                  py-8 border-t border-[var(--evven-border)] last:border-b
                  flex flex-col sm:flex-row sm:items-start sm:gap-10
                "
              >
                <span className="text-xs font-semibold tracking-[0.15em] text-[var(--evven-accent-primary)] uppercase w-20 flex-shrink-0 mb-3 sm:mb-0 sm:pt-0.5">
                  0{i + 1}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[var(--evven-text-primary)]">
                    {uc.title}
                  </h3>
                  <p className="text-[var(--evven-text-muted)] leading-relaxed text-[15px] max-w-md">
                    {uc.description}
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
