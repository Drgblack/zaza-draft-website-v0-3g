/**
 * Zaza Draft — Creator Attribution (server-only)
 *
 * This file uses next/headers, which is App Router server-only.
 * Only import this from:
 *   - App Router server components (app/**\/page.tsx, layout.tsx, etc.)
 *   - App Router route handlers (app/api/**\/route.ts)
 *   - Server Actions
 *
 * Do NOT import from Pages Router files (pages/**\/*.tsx).
 * Do NOT import from client components ('use client').
 */

import "server-only";
import { cookies } from "next/headers";
import {
  ATTRIBUTION_COOKIE_NAME,
  ATTRIBUTION_COUPON_COOKIE_NAME,
} from "./attribution";

/**
 * Read the current attribution from cookies (server-side only).
 */
export async function readAttribution(): Promise<{
  handle: string | null;
  coupon: string | null;
}> {
  const cookieStore = await cookies();
  const handle = cookieStore.get(ATTRIBUTION_COOKIE_NAME)?.value ?? null;
  const coupon = cookieStore.get(ATTRIBUTION_COUPON_COOKIE_NAME)?.value ?? null;
  return { handle, coupon };
}

/**
 * Build the Stripe Checkout Session metadata + discounts payload from
 * current attribution. Use this in your existing Stripe Checkout creation
 * code (in an App Router route handler at app/api/checkout/route.ts):
 *
 *   import { getStripeCheckoutAttribution } from '@/lib/attribution.server';
 *
 *   const { metadata, discounts } = await getStripeCheckoutAttribution();
 *
 *   const session = await stripe.checkout.sessions.create({
 *     metadata,
 *     discounts,
 *     // ...your existing params...
 *   });
 */
export async function getStripeCheckoutAttribution(): Promise<{
  metadata: Record<string, string>;
  discounts: { promotion_code: string }[] | undefined;
}> {
  const { handle, coupon } = await readAttribution();

  const metadata: Record<string, string> = {};
  if (handle) {
    metadata.creator_attribution = handle;
    metadata.attribution_source = "creator_partner";
    metadata.attribution_set_at = new Date().toISOString();
  }

  let discounts: { promotion_code: string }[] | undefined;
  if (coupon) {
    const promoId = await resolveStripePromotionCodeId(coupon);
    if (promoId) {
      discounts = [{ promotion_code: promoId }];
    }
  }

  return { metadata, discounts };
}

/**
 * Resolve a creator coupon code (e.g. 'COACH25') to a Stripe promotion_code ID.
 * Update this map when you create the corresponding promotion codes in Stripe.
 */
async function resolveStripePromotionCodeId(
  code: string,
): Promise<string | null> {
  const COUPON_MAP: Record<string, string> = {
    COACH25: "promo_1TReraHXkbT25qrKzjrhlc3s",
    // EMILY25: 'promo_1XXXXXXXXXXXXX',
    // GAL25: 'promo_1XXXXXXXXXXXXX',
  };
  return COUPON_MAP[code.toUpperCase()] ?? null;
}
