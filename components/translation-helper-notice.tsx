"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toLocalePath } from "@/lib/i18n/locale-routing";

const DISMISS_STORAGE_KEY = "zaza.translationHelper.dismissed.v1";

function hasSupportedBrowserLanguage() {
  if (typeof window === "undefined") {
    return true;
  }

  const preferredLanguage =
    window.navigator.languages?.[0] || window.navigator.language;

  if (!preferredLanguage) {
    return true;
  }

  const normalized = preferredLanguage.toLowerCase();
  return (
    normalized === "en" ||
    normalized.startsWith("en-") ||
    normalized === "de" ||
    normalized.startsWith("de-")
  );
}

export function TranslationHelperNotice() {
  const pathname = usePathname() || "/";
  const [isVisible, setIsVisible] = useState(false);

  const englishHref = useMemo(() => toLocalePath(pathname, "en"), [pathname]);
  const germanHref = useMemo(() => toLocalePath(pathname, "de"), [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isDismissed =
      window.localStorage.getItem(DISMISS_STORAGE_KEY) === "true";

    if (isDismissed || hasSupportedBrowserLanguage()) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
  }, []);

  const dismissNotice = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_STORAGE_KEY, "true");
    }

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-label="Language helper"
      className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-4 sm:w-full sm:max-w-md"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.92))] p-4 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)] ring-1 ring-white/5 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Prefer another language?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Zaza Draft is currently available in English and German. You can
              still view this page using your browser&apos;s built-in
              translation, or switch to one of our supported languages below.
            </p>
          </div>
          <button
            type="button"
            onClick={dismissNotice}
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Dismiss language helper"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            href={englishHref}
            onClick={dismissNotice}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            English
          </Link>
          <Link
            href={germanHref}
            onClick={dismissNotice}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Deutsch
          </Link>
          <button
            type="button"
            onClick={dismissNotice}
            className="inline-flex items-center justify-center rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Dismiss
          </button>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-400">
          Automatic browser translations may be useful for browsing, but English
          and German remain our fully supported versions.
        </p>
      </div>
    </section>
  );
}
