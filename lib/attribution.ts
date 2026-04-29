/**
 * Zaza Draft — Creator Attribution (constants and types)
 *
 * Safe to import from anywhere — App Router, Pages Router, client, server.
 * The server-only logic that uses next/headers lives in attribution.server.ts
 * and must only be imported from App Router server components or route handlers.
 */

export const ATTRIBUTION_COOKIE_NAME = "zaza_attr";
export const ATTRIBUTION_COUPON_COOKIE_NAME = "zaza_attr_coupon";
export const ATTRIBUTION_TTL_DAYS = 60;

export function getAttributionCookieOptions() {
  return {
    name: ATTRIBUTION_COOKIE_NAME,
    maxAge: ATTRIBUTION_TTL_DAYS * 24 * 60 * 60,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  };
}

export function getCouponCookieOptions() {
  return {
    name: ATTRIBUTION_COUPON_COOKIE_NAME,
    maxAge: ATTRIBUTION_TTL_DAYS * 24 * 60 * 60,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  };
}
