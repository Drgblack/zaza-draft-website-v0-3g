"use client";
import Link from "next/link";

import { track } from "@/lib/analytics";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Zaza <span className="text-pink-400">Draft</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/features">Features</Link>
          <Link
            href="/pricing"
            onClick={() =>
              track("cta_click", { location: "site_header", id: "pricing" })
            }
          >
            Pricing
          </Link>
          <Link href="/about/company">About</Link>
          <Link href="/support">Support</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className="px-3 py-1 rounded-xl border"
            href="/products/teach"
            onClick={() =>
              track("cta_click", {
                location: "site_header",
                id: "try_zaza_teach",
              })
            }
          >
            Try Zaza Teach
          </Link>
          <Link
            className="px-3 py-1 rounded-xl bg-pink-500 text-white"
            href="/contact"
            onClick={() =>
              track("cta_click", {
                location: "site_header",
                id: "join_waitlist",
              })
            }
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}
