"use client";

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
  return (
    <section className="section-animate px-6 py-28 sm:py-36 bg-background">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-6">Use Cases</p>

        {/* DeepJudge-style: large statement left, grid right on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
          {/* Left: editorial heading */}
          <div className="lg:w-[38%] mb-14 lg:mb-0 lg:sticky lg:top-32">
            <h2 className="hero-main-text text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)]">
              Works for any group or occasion.
            </h2>
          </div>

          {/* Right: use case list */}
          <div className="flex-1 space-y-0">
            {useCases.map((uc, i) => (
              <div
                key={uc.title}
                className="
                  py-8
                  border-t border-[var(--evven-border)]
                  last:border-b
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
