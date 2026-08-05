"use client";

const testimonials = [
  {
    quote:
      "Evven made our travel planning so much easier. No more calculating who paid for what — everything is clear and fair.",
    name: "Maya R.",
    role: "Travel group organizer",
  },
  {
    quote:
      "My roommates love it. We finally stayed on top of utilities and groceries without uncomfortable money talks.",
    name: "Jordan L.",
    role: "College student",
  },
  {
    quote:
      "We used to spend an hour every month reconciling who paid what. Now it takes two minutes.",
    name: "Priya S.",
    role: "Apartment co-lease, 4 roommates",
  },
];

export function Testimonials() {
  return (
    <section className="section-animate bg-white px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-6">Testimonials</p>

        {/* DeepJudge-style: large serif callout + cards below */}
        <h2 className="hero-main-text text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)] max-w-[18ch] mb-20">
          What people say about Evven.
        </h2>

        <div className="grid gap-0 lg:grid-cols-3 border-t border-[var(--evven-border)]">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="
                pt-10 pb-10 pr-10
                border-b lg:border-b-0 lg:border-r
                border-[var(--evven-border)]
                last:border-r-0 last:border-b-0
                space-y-6
              "
            >
              <p className="text-base sm:text-lg leading-relaxed text-[var(--evven-text-primary)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="space-y-0.5">
                <strong className="block text-sm font-semibold text-[var(--evven-text-primary)]">
                  {t.name}
                </strong>
                <p className="text-xs text-[var(--evven-text-muted)]">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
