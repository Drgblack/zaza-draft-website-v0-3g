"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth } from "@/lib/analytics";
import {
  ANALYTICS_CONSENT_EVENT,
  readStoredAnalyticsConsent,
} from "@/lib/analytics-consent";

const THRESHOLDS = [50, 90] as const;

export function ScrollDepthTracker() {
  const pathname = usePathname();
  const firedThresholdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    firedThresholdsRef.current = new Set();

    let ticking = false;

    const measureScrollDepth = () => {
      ticking = false;

      if (readStoredAnalyticsConsent() !== "accepted") {
        return;
      }

      const root = document.documentElement;
      const scrollableHeight = root.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const percentScrolled = Math.round(
        (window.scrollY / scrollableHeight) * 100,
      );

      for (const threshold of THRESHOLDS) {
        if (
          percentScrolled >= threshold &&
          !firedThresholdsRef.current.has(threshold)
        ) {
          firedThresholdsRef.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    };

    const requestMeasure = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(measureScrollDepth);
    };

    measureScrollDepth();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, measureScrollDepth);

    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, measureScrollDepth);
    };
  }, [pathname]);

  return null;
}
