"use client";

import dynamic from "next/dynamic";
import Header from "@/components/landing/personal/Header";
import { Hero } from "@/components/landing/personal/hero";
import { useLandingAnimations } from "@/components/landing/useLandingAnimations";

const Features = dynamic(() => import("@/components/landing/personal/Features").then((m) => m.Features), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/landing/personal/HowItWorks").then((m) => m.HowItWorks), { ssr: false });
const UseCases = dynamic(() => import("@/components/landing/personal/UseCases").then((m) => m.UseCases), { ssr: false });
const Testimonials = dynamic(() => import("@/components/landing/personal/Testimonials").then((m) => m.Testimonials), { ssr: false });
const Pricing = dynamic(() => import("@/components/landing/personal/Pricing").then((m) => m.Pricing), { ssr: false });
const FAQ = dynamic(() => import("@/components/landing/personal/FAQ").then((m) => m.FAQ), { ssr: false });
const CTA = dynamic(() => import("@/components/landing/personal/CTA").then((m) => m.CTA), { ssr: false });
const Footer = dynamic(() => import("@/components/landing/personal/Footer").then((m) => m.Footer), { ssr: false });

export default function HomePage() {
  useLandingAnimations();

  return (
    <main className="relative">
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      <Footer />
    </main>
  );
}
