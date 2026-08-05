"use client";

import Link from "next/link";

export function CTA() {
  return (
    <section className="section-animate px-6 py-28 sm:py-36 bg-background">
      <div className="mx-auto max-w-5xl">
        {/* DeepJudge-style: huge statement text centered, CTA below */}
        <div className="text-center space-y-10">
          <h2
            className="
              hero-main-text
              text-[clamp(3rem,7vw,7rem)]
              leading-[0.92]
              tracking-[-0.04em]
              text-[var(--evven-text-primary)]
              mx-auto
              max-w-[14ch]
              text-balance
            "
          >
            Beyond splitting. Understanding.
          </h2>

          <p className="mx-auto max-w-lg text-[var(--evven-text-muted)] leading-relaxed text-base sm:text-lg">
            Join Evven free — no credit card, no spreadsheets, no more awkward money talks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://app.evven.xyz/signup"
              className="
                inline-flex items-center gap-2
                px-7 py-3.5 rounded-full
                bg-[var(--evven-accent-primary)] text-white
                text-sm font-semibold
                hover:bg-[var(--evven-accent-primary)]/90
                hover:scale-[1.02]
                transition-all duration-200
              "
            >
              Start for free
            </Link>
            <a
              href="https://github.com/Evven-hq"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-1.5
                text-sm font-medium
                text-[var(--evven-text-muted)]
                hover:text-[var(--evven-text-primary)]
                transition-colors
              "
            >
              View on GitHub
              <span className="opacity-60">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
