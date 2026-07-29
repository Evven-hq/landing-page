"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold tracking-tight text-white">404</h1>
        <p className="mt-4 text-lg text-white/70">Page not found</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
