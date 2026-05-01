"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackCtaClick } from "@/lib/analytics";
import { getDraftPricingHref } from "@/lib/draft-cta";
import { getFooterContent } from "@/lib/footer-content";

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
  const locale = isDE ? "de" : "en";
  const localPath = (path: string) => (isDE ? `/de${path}` : path);
  const footerContent = getFooterContent(locale);
  const startNowLabel = isDE ? "Jetzt starten" : "Start now";
  const riskCheckerLabel = isDE
    ? "Kostenloser Risiko-Check für Elternmails"
    : "Free Parent Email Risk Checker";
  const schoolsLabel = isDE ? "Für Schulen" : "For Schools";
  const toolsLabel = isDE ? "Lehrkräfte-Tools" : "Teacher Tools";
  const getLinkKey = (label: string, href: string) => `${label}:${href}`;

  const productLinks = [
    { label: "Draft", href: localPath("/products/draft") },
    {
      label: schoolsLabel,
      href: localPath("/schools"),
      onClick: () =>
        trackCtaClick({
          ctaText: schoolsLabel,
          ctaLocation: "footer_schools",
        }),
    },
    {
      label: riskCheckerLabel,
      href: localPath("/parent-email-risk-checker"),
      onClick: () =>
        trackCtaClick({
          ctaText: riskCheckerLabel,
          ctaLocation: "footer_checker",
        }),
    },
    {
      label: toolsLabel,
      href: "/tools",
    },
    { label: isDE ? "Preise" : "Pricing", href: localPath("/pricing") },
    {
      label: startNowLabel,
      href: getDraftPricingHref(locale),
      onClick: () =>
        trackCtaClick({
          ctaText: startNowLabel,
          ctaLocation: "footer",
        }),
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
    { label: "Manifesto", href: localPath("/manifesto") },
    { label: "Impressum", href: localPath("/impressum") },
    {
      label: isDE ? "Support / Kontakt" : "Support / Contact",
      href: localPath("/contact"),
    },
    {
      label: "Data Processing Agreement (EN)",
      href: "/legal/zaza-draft-dpa-en.pdf",
      download: true,
    },
    {
      label: "Auftragsverarbeitungsvertrag (DE)",
      href: "/legal/zaza-draft-dpa-de.pdf",
      download: true,
    },
  ];

  const sisterProducts = [
    {
      label: "ZeroPaste - Invoice Extraction",
      href: "https://zeropaste.io",
      title: "ZeroPaste - Invoice data extraction tool",
    },
    {
      label: "Plainfigures - Specialised Calculators",
      href: "https://www.plainfigures.org/",
      title: "Plainfigures - Specialised Calculators",
    },
    {
      label: "Plain.Tools - Privacy-First Utility Tools",
      href: "https://www.plain.tools/",
      title: "Plain.Tools - Privacy-First Utility Tools",
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div
          className={`grid gap-8 ${isDraftLanding ? "md:grid-cols-4" : "md:grid-cols-4"} md:items-start`}
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-violet-500 text-white grid place-items-center text-sm font-bold">
                Z
              </div>
              <span className="text-slate-50 font-semibold">Zaza Draft</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {footerContent.tagline}
            </p>
            <p className="mt-3 max-w-md text-xs leading-6 text-slate-500">
              {footerContent.supportLine}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              {isDE ? "Produkt" : "Product"}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={getLinkKey(link.label, link.href)}>
                  <Link
                    href={link.href}
                    className="hover:text-white"
                    onClick={link.onClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-slate-200">
              {isDE ? "Auch von Zaza" : "Also from Zaza"}
            </p>
            <ul className="space-y-1 text-sm">
              {sisterProducts.map((product) => (
                <li key={product.href}>
                  <a
                    href={product.href}
                    title={product.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {product.label}
                  </a>
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
                <li key={getLinkKey(link.label, link.href)}>
                  {link.download ? (
                    <a href={link.href} download className="hover:text-white">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-slate-400 space-y-2">
          <p>
            {footerContent.moreToolsLine}{" "}
            <a
              href="https://www.zazatechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-white"
            >
              {footerContent.moreToolsLabel}
            </a>
          </p>
          <p>© 2026 Zaza Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
