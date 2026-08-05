"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const APK_URL =
  "https://github.com/Evven-hq/mobile-app/releases/download/v0.0.1/Evven-Beta.apk";

/* ── Humorous Play Protect modal ── */
function PlayProtectModal({ onClose }: { onClose: () => void }) {
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 15, 100);
        if (next >= 100) {
          setScanComplete(true);
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 220);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-md w-full bg-white rounded-3xl border border-[var(--evven-border)] shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Shield icon */}
        <div className="flex justify-center mb-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "var(--evven-accent-primary)" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              {scanComplete && <path d="M9 12l2 2 4-4" />}
            </svg>
          </div>
        </div>

        {!scanComplete ? (
          <>
            <h3 className="text-xl font-bold text-center text-[var(--evven-text-primary)] mb-2">
              Play Protect is scanning...
            </h3>
            <p className="text-center text-sm text-[var(--evven-text-muted)] mb-6">
              Checking if your friend who owes you $20 hacked this APK to avoid paying.
            </p>

            {/* Progress bar */}
            <div className="relative h-2 bg-[var(--evven-surface)] rounded-full overflow-hidden mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "var(--evven-accent-primary)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <p className="text-xs text-center text-[var(--evven-text-muted)]">
              {Math.floor(progress)}% complete...
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-center text-[var(--evven-text-primary)] mb-2">
              All clear. Probably.
            </h3>
            <p className="text-center text-sm text-[var(--evven-text-muted)] mb-6">
              No harmful apps detected. We checked 47 things and found 0 issues. Your download
              should start now. If it doesn&apos;t, you might need to allow unknown sources in
              Settings.
            </p>
            <button
              onClick={onClose}
              className="
                w-full px-5 py-3 rounded-full
                bg-[var(--evven-accent-primary)] text-white
                text-sm font-semibold
                hover:bg-[var(--evven-accent-primary)]/90
                transition-all duration-200
              "
            >
              Got it
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Download ── */
export function Download() {
  const ref = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowModal(true);
    // Start actual download
    window.location.href = APK_URL;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [labelRef.current, headRef.current],
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="download"
        ref={ref}
        className="relative w-full border-t border-[var(--evven-border)] bg-background"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p ref={labelRef} className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--evven-accent-primary)] mb-5">
            Beta Release
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
            {/* Left */}
            <div className="flex-1 min-w-0">
              <h2
                ref={headRef}
                className="hero-main-text text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.03em] text-[var(--evven-text-primary)] text-balance"
              >
                Try Evven
                <br />
                on Android.
              </h2>
              <p className="mt-6 max-w-md text-base leading-[1.75] text-[var(--evven-text-muted)]">
                Download the beta APK directly to your Android device. No Play Store needed —
                just enable installs from unknown sources in your settings and you&apos;re good to
                go.
              </p>

              <ol className="mt-8 space-y-3">
                {[
                  "Allow installs from unknown sources in Android Settings → Security.",
                  "Download the APK using the button on the right.",
                  "Open the downloaded file and tap Install.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full border border-[var(--evven-accent-primary)] text-[var(--evven-accent-primary)] text-[10px] font-bold flex items-center justify-center mt-[2px]"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--evven-text-muted)] leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right — download card */}
            <div className="flex-shrink-0 w-full md:w-72">
              <div data-float-target="0" className="rounded-2xl border border-[var(--evven-border)] bg-[var(--evven-card-background)] p-7 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--evven-accent-primary)" }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M5 16v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4" />
                      <path d="M15 16v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4" />
                      <rect x="3" y="8" width="18" height="10" rx="3" />
                      <path d="M8 8V5a4 4 0 0 1 8 0v3" />
                      <circle cx="9.5" cy="13" r=".5" fill="white" stroke="none" />
                      <circle cx="14.5" cy="13" r=".5" fill="white" stroke="none" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[var(--evven-accent-primary)]/30 text-[var(--evven-accent-primary)]">
                    v0.0.1
                  </span>
                </div>

                <div>
                  <p className="text-base font-semibold text-[var(--evven-text-primary)]">
                    Evven Beta
                  </p>
                  <p className="text-xs text-[var(--evven-text-muted)] mt-0.5">
                    Android APK · ~12 MB
                  </p>
                </div>

                <a
                  href={APK_URL}
                  onClick={handleDownloadClick}
                  className="
                    w-full inline-flex items-center justify-center gap-2
                    px-5 py-3 rounded-full
                    bg-[var(--evven-accent-primary)] text-white
                    text-sm font-semibold
                    hover:bg-[var(--evven-accent-primary)]/90
                    active:scale-[0.98]
                    transition-all duration-200
                  "
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                  Download APK
                </a>

                <p className="text-[10px] text-center text-[var(--evven-text-muted)]/70 leading-relaxed">
                  Requires Android 8.0+. Enable{" "}
                  <span className="font-medium text-[var(--evven-text-muted)]">
                    Install unknown apps
                  </span>{" "}
                  in Settings before installing.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[var(--evven-border)] flex flex-wrap gap-10">
            {[
              { label: "Platform", value: "Android" },
              { label: "Version", value: "0.0.1 Beta" },
              { label: "Size", value: "~12 MB" },
              { label: "iOS", value: "Coming soon" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-[var(--evven-text-muted)]/60 font-medium">
                  {label}
                </span>
                <span className="text-sm font-semibold text-[var(--evven-text-primary)]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <PlayProtectModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}
