"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FixedLocaleToggle() {
  const pathname = usePathname() || "/";
  const toDE = pathname.startsWith("/de") ? pathname : `/de${pathname === "/" ? "" : pathname}`;
  const toEN = pathname.startsWith("/de") ? pathname.replace(/^\/de(\/|$)/, "/") || "/" : pathname;

  return (
    <div className="fixed right-3 top-3 z-[9999] flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-2 py-1 text-xs shadow-sm backdrop-blur">
      <Link href={toEN} className="rounded px-2 py-1 hover:underline" aria-label="Switch to English">
        EN
      </Link>
      <span className="text-muted-foreground">|</span>
      <Link href={toDE} className="rounded px-2 py-1 hover:underline" aria-label="Auf Deutsch umschalten">
        DE
      </Link>
    </div>
  );
}
