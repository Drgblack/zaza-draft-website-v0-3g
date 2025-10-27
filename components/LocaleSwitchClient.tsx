"use client";

import { useEffect } from "react";

function computeNextUrl(current: URL, to: "en" | "de") {
  const isDe = current.pathname.startsWith("/de");
  if (to === "de") {
    if (isDe) return current.toString();
    current.pathname = "/de" + (current.pathname === "/" ? "" : current.pathname);
    current.searchParams.set("lang", "de");
  } else {
    if (isDe) current.pathname = current.pathname.replace(/^\/de(\/|$)/, "/");
    current.searchParams.delete("lang");
  }
  return current.toString().replace(/\/+$/, (m) => (m === "/" ? "/" : "")); // tidy trailing slashes
}

export default function LocaleSwitchClient() {
  useEffect(() => {
    const onClick = (e: Event) => {
      const tgt = e.target as HTMLElement | null;
      if (!tgt) return;

      // find the nearest clickable element (a or button)
      const el = tgt.closest("a,button") as HTMLElement | null;
      if (!el) return;

      const text = (el.textContent || "").trim().toLowerCase();

      // Accept either text content "EN"/"DE" or data-locale attributes
      const attrLocale = (el.getAttribute("data-locale") || "").toLowerCase();
      const toDe = attrLocale === "de" || text === "de";
      const toEn = attrLocale === "en" || text === "en";

      if (!toDe && !toEn) return;

      e.preventDefault();

      // set the NEXT_LOCALE cookie for middleware compatibility
      const locale = toDe ? "de" : "en";
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;

      const nextUrl = computeNextUrl(new URL(window.location.href), toDe ? "de" : "en");
      window.location.assign(nextUrl);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
