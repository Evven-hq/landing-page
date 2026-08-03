import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/support", label: "Support" },
  { href: "/status", label: "Status" },
  { href: "/security", label: "Security" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function InfoFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10 text-white md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/"
            className="font-[family-name:var(--font-xanh-mono)] text-2xl font-bold tracking-tight transition-opacity hover:opacity-70"
          >
            Evven
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            Shared costs, settled clearly.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/35 hover:bg-white hover:text-black"
            >
              Home
            </Link>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/55">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="text-xs text-white/40">
            © {year} Evven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
