"use client";

import { useEffect } from "react";
import { trackUtmLanding } from "@/lib/analytics";
import {
  ANALYTICS_CONSENT_EVENT,
  readStoredAnalyticsConsent,
} from "@/lib/analytics-consent";
import { captureFirstTouchUtmFromLocation } from "@/lib/utm-attribution";

export function UtmCapture() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const captureLanding = () => {
      if (readStoredAnalyticsConsent() !== "accepted") {
        return;
      }

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
    };

    captureLanding();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, captureLanding);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, captureLanding);
    };
  }, []);

  return null;
}
