/**
 * Zaza Draft — Creator Landing Layout
 *
 * Strips the global site chrome (header nav + global footer) for /c/[handle]
 * pages. Creator landings are single-purpose conversion funnels — no escape
 * routes, no nav distractions, no competing CTAs. The only path forward is
 * the in-page CTA buttons.
 *
 * The minimal top bar shows just the Zaza Draft brand (small, non-clickable)
 * to maintain trust signal without offering an exit. The bottom strip shows
 * legal links only — required for GDPR/Impressum compliance, kept tiny.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Tells search engines not to index creator landing variants — they're
  // promotional, not canonical. Prevents duplicate content issues.
  robots: { index: false, follow: false },
};

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Minimal brand strip — no nav, no CTAs, no escape routes.
          Renders as plain text so visitors can't click through to the
          home page and get distracted. */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center">
          <span className="text-base font-semibold text-slate-900 tracking-tight">
            Zaza Draft
          </span>
        </div>
      </div>

      {/* The page itself */}
      <main className="flex-1">{children}</main>

      {/* Minimal compliance footer — tiny, unobtrusive, legally required only.
          German Impressum and Privacy Policy are non-negotiable for EU users.
          Everything else (Products, Resources, etc.) is omitted intentionally. */}
      <footer className="border-t border-slate-100 bg-white py-6">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>© 2026 Zaza Technologies UG</div>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="hover:text-slate-600 transition">
              Impressum
            </Link>
            <Link href="/privacy" className="hover:text-slate-600 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-600 transition">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
