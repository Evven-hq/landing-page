"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do the other people in my group need to sign up too?",
    answer:
      "Nope — invite anyone to a group with a simple link. They can join in seconds and start tracking expenses right away, free.",
  },
  {
    question: "Can I use Evven for recurring expenses?",
    answer:
      "Yes. You can track subscriptions, monthly bills, and repeated payments with flexible split options.",
  },
  {
    question: "Is my data shared securely?",
    answer:
      "Your expense history is stored securely and only visible to the people in your group.",
  },
  {
    question: "Do I need to pay to start?",
    answer:
      "No. The basic plan is free forever for unlimited groups — upgrade only if your group needs advanced reporting.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-animate bg-background px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-6">FAQ</p>
        <h2 className="hero-main-text text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--evven-text-primary)] max-w-[16ch] mb-20">
          Got questions? We have answers.
        </h2>

        <div className="border-t border-[var(--evven-border)]">
          {faqs.map((faq, i) => (
            <div key={faq.question} className="border-b border-[var(--evven-border)]">
              <button
                className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-base sm:text-lg font-medium text-[var(--evven-text-primary)] leading-snug pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 mt-0.5 text-[var(--evven-text-muted)] group-hover:text-[var(--evven-text-primary)] transition-colors">
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${open === i ? "max-h-96 pb-7" : "max-h-0"}
                `}
              >
                <p className="text-[var(--evven-text-muted)] leading-relaxed text-[15px] max-w-2xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
