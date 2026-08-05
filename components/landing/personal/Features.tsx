"use client";

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
  return (
    <section id="features" className="section-animate px-6 py-28 sm:py-36 bg-background">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <p className="section-label mb-6">Core Features</p>

        {/* Editorial headline — large, left-aligned, serif like DeepJudge */}
        <h2 className="hero-main-text text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)] max-w-[16ch] mb-20">
          The only expense tracker your group will actually use.
        </h2>

        {/* Feature grid */}
        <div className="grid gap-0 lg:grid-cols-3 border-t border-[var(--evven-border)]">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="
                feature-card
                py-10 pr-10
                border-b lg:border-b-0
                lg:border-r
                border-[var(--evven-border)]
                last:border-r-0 last:border-b-0
                space-y-4
              "
            >
              <span className="inline-block text-xs font-semibold tracking-[0.15em] text-[var(--evven-accent-primary)] uppercase">
                0{idx + 1}
              </span>
              <h3 className="text-xl font-semibold text-[var(--evven-text-primary)] leading-snug">
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
