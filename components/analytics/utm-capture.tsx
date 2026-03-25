"use client";

import { useEffect } from "react";
import { trackUtmLanding } from "@/lib/analytics";
import { captureFirstTouchUtmFromLocation } from "@/lib/utm-attribution";

export function UtmCapture() {
  useEffect(() => {
    if (typeof window === "undefined") {
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
  }, []);

  return null;
}
