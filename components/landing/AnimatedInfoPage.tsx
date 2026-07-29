"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type InfoSection = {
  id: string;
  label: string;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const targetY = el.getBoundingClientRect().top + window.scrollY - 96;
  animate(window.scrollY, targetY, {
    duration: 0.9,
    ease: EASE,
    onUpdate: (v) => window.scrollTo(0, v),
  });
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function AnimatedToc({ sections }: { sections: InfoSection[] }) {
  const activeId = useScrollSpy(sections.map((s) => s.id));

  return (
    <div className="relative space-y-0.5">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollToSection(s.id)}
          className={`relative block w-full rounded px-2 py-1.5 text-left text-sm transition-colors ${
            activeId === s.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeId === s.id && (
            <motion.span
              layoutId="toc-indicator"
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0 rounded bg-white/5"
            />
          )}
          <span className="relative">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

export function AnimatedSection({
  id,
  title,
  children,
  borderClassName = "border-border",
}: {
  id?: string;
  title?: string;
  children: React.ReactNode;
  borderClassName?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const items = Array.isArray(children) ? children : [children];

  return (
    <section
      id={id}
      ref={ref}
      className={`border-t ${borderClassName} py-12 first:border-none first:pt-0`}
    >
      {title && (
        <div className="mb-6 overflow-hidden">
          <motion.h2
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-xanh-mono)] text-2xl tracking-tight text-foreground"
          >
            {title}
          </motion.h2>
        </div>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        style={{ transformOrigin: "left" }}
        className="mb-6 h-px w-full bg-border/60"
      />

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
        }}
        className="space-y-4 text-[15px] leading-relaxed text-muted-foreground"
      >
        {items.map((child, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { y: 16 },
              show: { y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export function AnimatedStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="space-y-1 overflow-hidden">
      <motion.p
        initial={{ y: "100%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-[family-name:var(--font-xanh-mono)] text-4xl font-bold tracking-tight text-foreground"
      >
        {value}
      </motion.p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
