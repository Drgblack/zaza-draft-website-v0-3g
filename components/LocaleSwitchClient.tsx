"use client";

import { useEffect } from "react";

function computeNextUrl(current: URL, to: "en" | "de") {
  const isDe = current.pathname.startsWith("/de");
  if (to === "de") {
    if (!isDe) current.pathname = "/de" + (current.pathname === "/" ? "" : current.pathname);
    current.searchParams.set("lang", "de");
  } else {
    if (isDe) current.pathname = current.pathname.replace(/^\/de(\/|$)/, "/");
    current.searchParams.delete("lang");
  }
  return current.toString();
}

export default function LocaleSwitchClient() {
  useEffect(() => {
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest("a,button,[data-locale]") as HTMLElement | null;
      if (!el) return;

      const label = (el.textContent || "").trim().toLowerCase();
      const attr = (el.getAttribute("data-locale") || "").toLowerCase();
      const toDe = attr === "de" || label === "de";
      const toEn = attr === "en" || label === "en";
      if (!toDe && !toEn) return;

      e.preventDefault();

      const locale = toDe ? "de" : "en";
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60*60*24*365}`;

      const nextUrl = computeNextUrl(new URL(window.location.href), toDe ? "de" : "en");
      window.location.assign(nextUrl);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
