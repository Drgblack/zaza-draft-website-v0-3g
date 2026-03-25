"use client";

import { useEffect } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  readStoredAnalyticsConsent,
} from "@/lib/analytics-consent";

const PLAUSIBLE_SCRIPT_ID = "plausible-analytics-script";

function ensurePlausibleScript() {
  if (
    typeof document === "undefined" ||
    document.getElementById(PLAUSIBLE_SCRIPT_ID)
  ) {
    return;
  }

  const script = document.createElement("script");
  script.id = PLAUSIBLE_SCRIPT_ID;
  script.src = "https://plausible.io/js/script.js";
  script.defer = true;
  script.setAttribute("data-domain", "zazadraft.com");
  document.head.appendChild(script);
}

function removePlausibleScript() {
  if (typeof document === "undefined") {
    return;
  }

  document.getElementById(PLAUSIBLE_SCRIPT_ID)?.remove();
}

export function PlausibleAnalytics() {
  useEffect(() => {
    const syncPlausibleScript = () => {
      if (readStoredAnalyticsConsent() === "accepted") {
        ensurePlausibleScript();
        return;
      }

      removePlausibleScript();
    };

    syncPlausibleScript();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, syncPlausibleScript);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, syncPlausibleScript);
    };
  }, []);

  return null;
}
