"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname() || "";

  const search = typeof window !== "undefined" ? window.location.search : "";
  const cookies = typeof document !== "undefined" ? document.cookie : "";
  const htmlLang =
    typeof document !== "undefined" ? document.documentElement.lang : "";

  const isDE =
    /(^|;\s*)NEXT_LOCALE=de(;|$)/i.test(cookies) ||
    /(^|;\s*)locale=de(;|$)/i.test(cookies) ||
    /[?&](lang|locale)=de\b/i.test(search) ||
    /^\/de(\/|$)/i.test(pathname) ||
    (htmlLang || "").toLowerCase().startsWith("de");
  const isDraftLanding = /^\/(de\/)?products\/draft\/?$/i.test(pathname);
  const localPath = (path: string) => (isDE ? `/de${path}` : path);

  const tagline = isDE
    ? "Ruhige, professionelle Schreibunterstützung für Lehrkräfte."
    : "Calm, professional writing support for teachers.";

  const productLinks = [
    { label: "Draft", href: localPath("/products/draft") },
    { label: isDE ? "Preise" : "Pricing", href: localPath("/pricing") },
    {
      label: isDE ? "Early Access" : "Join Early Access",
      href: localPath("/early-access"),
    },
    {
      label: isDE ? "Gründerstory" : "Founder story",
      href: localPath("/about/founder"),
    },
  ];

  const legalSupportLinks = [
    { label: isDE ? "Datenschutz" : "Privacy", href: localPath("/privacy") },
    {
      label: isDE ? "Nutzungsbedingungen" : "Terms",
      href: localPath("/terms"),
    },
    { label: "Impressum", href: localPath("/impressum") },
    {
      label: isDE ? "Support / Kontakt" : "Support / Contact",
      href: localPath("/contact"),
    },
  ];

  const moreToolsLine = isDE
    ? "Weitere Zaza Tools sind in Entwicklung."
    : "More Zaza tools are in development.";

  const moreToolsLabel = "zazatechnologies.com ->";

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div
          className={`grid gap-8 ${isDraftLanding ? "md:grid-cols-3" : "md:grid-cols-3"} md:items-start`}
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-violet-500 text-white grid place-items-center text-sm font-bold">
                Z
              </div>
              <span className="text-slate-50 font-semibold">Zaza Draft</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">{tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              {isDE ? "Produkt" : "Product"}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              {isDE ? "Rechtliches & Support" : "Legal & Support"}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {legalSupportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-slate-400 space-y-2">
          <p>
            {moreToolsLine}{" "}
            <a
              href="https://www.zazatechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-white"
            >
              {moreToolsLabel}
            </a>
          </p>
          <p>© 2026 Zaza Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
