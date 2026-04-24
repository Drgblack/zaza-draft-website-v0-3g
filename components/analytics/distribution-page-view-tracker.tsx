"use client";

import { useEffect } from "react";
import {
  trackComparisonPageView,
  trackFreeToolPageView,
} from "@/lib/analytics";
import type { DistributionAnalyticsMeta } from "@/lib/distribution-analytics";

export function DistributionPageViewTracker({
  meta,
}: {
  meta: DistributionAnalyticsMeta;
}) {
  useEffect(() => {
    if (meta.pageType === "comparison") {
      trackComparisonPageView(meta);
    }

    if (meta.pageType === "free_tool") {
      trackFreeToolPageView(meta);
    }
  }, [meta.pageType, meta.product, meta.slug]);

  return null;
}
