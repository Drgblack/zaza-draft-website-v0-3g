"use client";

import { useEffect } from "react";
import { trackAiReferralSession, trackUtmLanding } from "@/lib/analytics";

const AI_REFERRER_MAP: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "gemini.google.com": "gemini",
  "bard.google.com": "gemini",
  "claude.ai": "claude",
  "copilot.microsoft.com": "copilot",
  "bing.com": "copilot",
};

export function Analytics() {
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!measurementId) {
      console.log("[v0] GA4 measurement ID not configured");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      const dataLayer = window.dataLayer;
      if (!dataLayer) return;
      dataLayer.push(args);
    }

    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId, {
      send_page_view: true,
    });

    console.log("[v0] GA4 initialized with ID:", measurementId);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const source = url.searchParams.get("utm_source");
    const medium = url.searchParams.get("utm_medium");
    const campaign = url.searchParams.get("utm_campaign");
    const content = url.searchParams.get("utm_content");
    const term = url.searchParams.get("utm_term");

    if (
      (source || medium || campaign) &&
      !sessionStorage.getItem("utm-landing-tracked")
    ) {
      trackUtmLanding({
        source,
        medium,
        campaign,
        content,
        term,
        landingPath: window.location.pathname,
      });
      sessionStorage.setItem("utm-landing-tracked", "true");
    }

    if (!document.referrer || sessionStorage.getItem("ai-referral-tracked")) {
      return;
    }

    let referrerHost = "";

    try {
      referrerHost = new URL(document.referrer).hostname.replace(/^www\./, "");
    } catch {
      return;
    }

    const aiSource = AI_REFERRER_MAP[referrerHost];

    if (!aiSource) {
      return;
    }

    trackAiReferralSession({
      aiSource,
      referrerHost,
      landingPath: window.location.pathname,
    });
    sessionStorage.setItem("ai-referral-tracked", "true");
  }, []);

  return null;
}
