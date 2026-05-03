"use client";

import { useEffect } from "react";
import {
  ATTRIBUTION_COOKIE_NAME,
  ATTRIBUTION_COUPON_COOKIE_NAME,
  ATTRIBUTION_TTL_DAYS,
} from "@/lib/attribution";

/**
 * Writes the attribution cookies on first visit.
 *
 * Why client-side?
 * Next.js 15 server components in page.tsx cannot write cookies - only
 * Server Actions and Route Handlers can. This tiny client component runs
 * once on mount, sets the cookies, and renders nothing.
 *
 * The first cookie write happens before any subsequent navigation, which
 * is what we need for attribution to survive into the checkout flow.
 *
 * If the visitor already has an attribution cookie from a different
 * creator, we OVERWRITE it. This implements the "last-touch wins"
 * attribution rule described in the LOI Section 4.2.
 */
export function AttributionSetter({
  handle,
  couponCode,
}: {
  handle: string;
  couponCode?: string;
}) {
  useEffect(() => {
    const maxAgeSeconds = ATTRIBUTION_TTL_DAYS * 24 * 60 * 60;
    const isProduction = window.location.protocol === "https:";
    const secureFlag = isProduction ? "; Secure" : "";

    document.cookie =
      `${ATTRIBUTION_COOKIE_NAME}=${encodeURIComponent(handle)}; ` +
      `Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secureFlag}`;

    if (couponCode) {
      document.cookie =
        `${ATTRIBUTION_COUPON_COOKIE_NAME}=${encodeURIComponent(couponCode)}; ` +
        `Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secureFlag}`;
    }
  }, [handle, couponCode]);

  return null;
}
