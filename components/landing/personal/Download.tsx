"use client";

import { useRef } from "react";

const APK_URL =
  "https://github.com/Evven-hq/mobile-app/releases/download/v0.0.1/Evven-Beta.apk";

export function Download() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="download"
      ref={ref}
      className="section-animate relative w-full border-t border-[var(--evven-border)] bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Top label */}
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--evven-accent-primary)] mb-5">
          Beta Release
        </p>

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
          {/* Left — headline + description */}
          <div className="flex-1 min-w-0">
            <h2
              className="hero-main-text text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.03em] text-[var(--evven-text-primary)] text-balance"
            >
              Try Evven
              <br />
              on Android.
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.75] text-[var(--evven-text-muted)]">
              Download the beta APK directly to your Android device. No Play Store
              needed — just enable installs from unknown sources in your settings and
              you&apos;re good to go.
            </p>

            {/* Steps */}
            <ol className="mt-8 space-y-3">
              {[
                "Allow installs from unknown sources in Android Settings → Security.",
                'Download the APK using the button on the right.',
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
            <div
              className="rounded-2xl border border-[var(--evven-border)] bg-[var(--evven-card-background)] p-7 flex flex-col gap-5"
            >
              {/* Icon + version */}
              <div className="flex items-center justify-between">
                {/* Android robot icon (inline SVG) */}
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

              {/* Download button */}
              <a
                href={APK_URL}
                download
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

        {/* Bottom divider stat row */}
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
  );
}
