"use client";

import Link from "next/link";

const plans = [
  {
    name: "Personal",
    price: "Free",
    period: "forever",
    desc: "Everything you need to split expenses with friends, roommates, and trips.",
    features: [
      "Unlimited personal expenses",
      "Up to 3 groups",
      "Automatic balances",
    ],
    featured: true,
    cta: "Get started free",
    href: "https://app.evven.xyz/signup",
  },
  {
    name: "Teams",
    price: "$9",
    period: "per month",
    desc: "For active groups that manage expenses together regularly.",
    features: [
      "Unlimited groups",
      "Recurring expenses",
      "Expense exports",
    ],
    featured: false,
    cta: "Get started",
    href: "https://app.evven.xyz/signup",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    desc: "For organizations that need advanced controls and support.",
    features: [
      "SSO & SCIM",
      "Audit logs",
      "Dedicated support",
    ],
    featured: false,
    cta: "Contact sales",
    href: "mailto:hello@evven.xyz",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="section-animate px-6 py-28 sm:py-36 bg-white"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-6">Pricing</p>
        <h2 className="hero-main-text text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)] max-w-[14ch] mb-20">
          Free to start. Scale when you need it.
        </h2>

        {/* Pricing table — horizontal row layout like editorial grids */}
        <div className="border-t border-[var(--evven-border)]">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="
                grid grid-cols-1 sm:grid-cols-[200px_1fr_auto]
                items-start gap-6 sm:gap-12
                py-10
                border-b border-[var(--evven-border)]
                group
              "
            >
              {/* Plan name + featured badge */}
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.15em] text-[var(--evven-text-muted)] uppercase">
                  {plan.name}
                </p>
                <div className="flex items-end gap-1.5">
                  <span className="text-3xl sm:text-4xl font-semibold text-[var(--evven-text-primary)] leading-none">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[var(--evven-text-muted)] pb-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Description + features */}
              <div className="space-y-4">
                <p className="text-[var(--evven-text-muted)] leading-relaxed text-[15px] max-w-sm">
                  {plan.desc}
                </p>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--evven-text-muted)]">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--evven-accent-primary)] flex-shrink-0"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex items-start sm:pt-1">
                <Link
                  href={plan.href}
                  className="
                    inline-flex items-center gap-2
                    px-5 py-2.5 rounded-full
                    text-sm font-semibold
                    border border-[var(--evven-border)]
                    hover:border-[var(--evven-accent-primary)]/60
                    hover:bg-[var(--evven-accent-primary)] hover:text-white
                    text-[var(--evven-text-primary)]
                    transition-all duration-200
                    whitespace-nowrap
                  "
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
