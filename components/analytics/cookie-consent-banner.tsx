"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackUtmLanding } from "@/lib/analytics";
import {
  type AnalyticsConsentState,
  applyAnalyticsConsent,
  readStoredAnalyticsConsent,
} from "@/lib/analytics-consent";
import {
  captureFirstTouchUtmFromLocation,
  clearStoredFirstTouchUtm,
} from "@/lib/utm-attribution";
import { useLanguage } from "@/lib/i18n/language-context";

type BannerCopy = {
  title: string;
  body: string;
  accept: string;
  decline: string;
  privacy: string;
};

const bannerCopy: Record<"en" | "de", BannerCopy> = {
  en: {
    title: "Privacy-friendly analytics",
    body: "We use privacy-friendly analytics to understand how the site is used and improve Zaza Draft. You can accept or decline analytics cookies.",
    accept: "Accept analytics",
    decline: "Decline analytics",
    privacy: "Privacy Policy",
  },
  de: {
    title: "Datenschutzfreundliche Analysen",
    body: "Wir nutzen datenschutzfreundliche Analysen, um die Nutzung der Website zu verstehen und Zaza Draft zu verbessern. Sie koennen Analyse-Cookies akzeptieren oder ablehnen.",
    accept: "Analysen akzeptieren",
    decline: "Analysen ablehnen",
    privacy: "Datenschutz",
  },
};

function trackCurrentLandingIfAvailable() {
  const result = captureFirstTouchUtmFromLocation(window.location);

  if (!result?.isNew) {
    return;
  }

  trackUtmLanding({
    source: result.value.source,
    medium: result.value.medium,
    campaign: result.value.campaign,
    landingPath: result.value.landingPath,
  });
}

function sendCurrentPageView() {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

export function CookieConsentBanner() {
  const { language } = useLanguage();
  const locale = language === "de" ? "de" : "en";
  const copy = bannerCopy[locale];
  const [consentState, setConsentState] = useState<
    AnalyticsConsentState | "pending"
  >("pending");

  useEffect(() => {
    const storedConsent = readStoredAnalyticsConsent();
    setConsentState(storedConsent ?? "pending");
  }, []);

  if (consentState !== "pending") {
    return null;
  }

  const privacyHref = locale === "de" ? "/de/privacy" : "/privacy";

  const handleChoice = (nextState: AnalyticsConsentState) => {
    applyAnalyticsConsent(nextState);

    if (nextState === "accepted") {
      trackCurrentLandingIfAvailable();
      sendCurrentPageView();
    } else {
      clearStoredFirstTouchUtm();
    }

    setConsentState(nextState);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.96))] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-[#C4B5FD] uppercase">
              {copy.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-[15px]">
              {copy.body}{" "}
              <Link
                href={privacyHref}
                className="text-slate-100 underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
              >
                {copy.privacy}
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:min-w-[220px]">
            <Button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-5 text-white hover:from-purple-700 hover:to-blue-700"
            >
              {copy.accept}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleChoice("declined")}
              className="rounded-full border-white/15 bg-white/5 px-5 text-slate-100 hover:bg-white/10 hover:text-white"
            >
              {copy.decline}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
