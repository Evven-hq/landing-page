"use client";

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
  return (
    <section
      id="how-it-works"
      className="section-animate bg-white px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-6">How It Works</p>

        {/* Big serif statement — center-aligned like DeepJudge's feature callouts */}
        <h2 className="hero-main-text text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)] max-w-[18ch] mb-24">
          Three steps to manage any group expense.
        </h2>

        {/* Step rows — each step is a wide row with step tag left, content right */}
        <div className="space-y-0">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="
                grid grid-cols-[1fr] sm:grid-cols-[200px_1fr]
                gap-6 sm:gap-16
                py-12
                border-t border-[var(--evven-border)]
                last:border-b
              "
            >
              {/* Left column */}
              <div className="flex sm:flex-col items-start gap-4 sm:gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] text-[var(--evven-accent-primary)] uppercase">
                  {item.tag}
                </span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--evven-border)] text-xs font-semibold text-[var(--evven-text-muted)]">
                  {idx + 1}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--evven-text-primary)] leading-tight">
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
    </section>
  );
}
