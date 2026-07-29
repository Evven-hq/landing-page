"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLandingAnimations() {
  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline();

    // Animate hero heading if present
    const heading = document.querySelector('.hero-heading');
    if (heading) {
      tl.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
    }

    // Animate hero subheading if present
    const subheading = document.querySelector('.hero-subheading');
    if (subheading) {
      tl.fromTo(subheading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2);
    }

    // Animate hero buttons if present
    const buttons = document.querySelector('.hero-buttons');
    if (buttons) {
      tl.fromTo(buttons, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.4);
    }

    // Animate stats card if present
    const statsCard = document.querySelector('.stats-card');
    if (statsCard) {
      tl.fromTo(statsCard, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 0.6);
    }

    // Scroll trigger animations for sections
    const sections = document.querySelectorAll(".section-animate");
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      // kill timeline and ScrollTrigger instances on unmount
      try {
        tl.kill();
      } catch (e) {
        // ignore if already killed
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
