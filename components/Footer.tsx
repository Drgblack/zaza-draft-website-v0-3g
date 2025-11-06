"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function SocialIcon({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const pathname = usePathname() || "";

  // Gather all possible locale signals (no errors server-side)
  const search = typeof window !== "undefined" ? window.location.search : "";
  const cookies = typeof document !== "undefined" ? document.cookie : "";
  const htmlLang = typeof document !== "undefined" ? document.documentElement.lang : "";

  const isDE =
    // Cookie used by many i18n setups (next-intl / v0)
    /(^|;\s*)NEXT_LOCALE=de(;|$)/i.test(cookies) ||
    /(^|;\s*)locale=de(;|$)/i.test(cookies) ||
    // Querystring fallback
    /[?&](lang|locale)=de\b/i.test(search) ||
    // Route prefix fallback
    /^\/de(\/|$)/i.test(pathname) ||
    // <html lang="de">
    (htmlLang || "").toLowerCase().startsWith("de");

  const tagline = "The writing partner for teachers. Save hours. Protect wellbeing. Bring joy back to teaching.";

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-violet-500 text-white grid place-items-center text-sm font-bold">Z</div>
              <span className="text-slate-50 font-semibold">Zaza Draft</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">{tagline}</p>
            <div className="mt-4 flex items-center gap-3">
              <SocialIcon label="TikTok" href="https://www.tiktok.com/@zazateach">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M16.7 2c.3 2 1.6 3.6 3.3 4.5v3.1c-1.3-.1-2.6-.5-3.8-1.2v6.6a6.1 6.1 0 1 1-6.1-6.1h.6v3.2h-.6a2.9 2.9 0 1 0 2.9 2.9V2h3.7z"/></svg>
              </SocialIcon>
              <SocialIcon label="X" href="https://twitter.com/zazateach">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.9 3h3.1l-7 8.1 8 9.9h-6.2l-4.8-6-5.5 6H3.4l7.5-8.4L3 3h6.4l4.3 5.5L18.9 3z"/></svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn" href="https://www.linkedin.com/company/zazatechnologies/">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.98h4v12H3v-12zM14.5 8.8c3 0 5.5 2.4 5.5 6.3v5.9h-4v-5.5c0-1.6-.6-2.8-2-2.8-1.1 0-1.8.7-2.1 1.5-.1.3-.1.7-.1 1.1v5.7h-4s.1-9.2 0-10.2h4v1.5c.5-.9 1.6-2.1 3.8-2.1z"/></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Products</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="https://www.zazadraft.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Zaza Draft â€“ opens in new tab">Zaza Draft</a></li>
              <li><a href="https://www.zazateach.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Zaza Teach â€“ opens in new tab">Zaza Teach</a></li>
              <li><a href="https://www.zazashield.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Zaza Shield â€“ opens in new tab">Zaza Shield</a></li>
              <li><a href="https://www.zazagradeflow.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="GradeFlow â€“ opens in new tab">GradeFlow</a></li>
              <li><a href="https://www.zazatechnologies.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Zaza Technologies â€“ opens in new tab">Zaza Technologies</a></li>
            </ul>
          </div>

          {/* Learn & Support */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Learn &amp; Support</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/support" className="hover:text-white">Help Centre</Link></li>
              <li><Link href="/resources" className="hover:text-white">Teacher Resources</Link></li>
              <li><Link href="/webinars" className="hover:text-white">Webinars</Link></li>
              <li><Link href="/glossary" className="hover:text-white">Glossary</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row">
          <p>{'\u00A9'} {new Date().getFullYear()} Zaza Technologies. All rights reserved.</p>
          <div className="text-slate-300">Helping teachers thrive.</div>
        </div>
      </div>
    </footer>
  );
}