"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useLandingAnimations — thin global hook.
 * Each section now owns its own GSAP context; this hook only handles
 * legacy `.hero-heading / .hero-subheading / .hero-buttons / .stats-card`
 * selectors that may still exist in older components.
 * The `.section-animate` and `.feature-card` mass-animators have been
 * removed to prevent conflicts with per-section ScrollTrigger instances.
 */
export function useLandingAnimations() {
  useEffect(() => {
    const tl = gsap.timeline();

    const heading = document.querySelector(".hero-heading");
    if (heading) {
      tl.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
    }

    const subheading = document.querySelector(".hero-subheading");
    if (subheading) {
      tl.fromTo(subheading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);
    }

    const buttons = document.querySelector(".hero-buttons");
    if (buttons) {
      tl.fromTo(buttons, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);
    }

    const statsCard = document.querySelector(".stats-card");
    if (statsCard) {
      tl.fromTo(statsCard, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 0.6);
    }

    return () => {
      try { tl.kill(); } catch (_) { /* ignore */ }
    };
  }, []);
}
