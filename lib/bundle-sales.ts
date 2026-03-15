import { pricingConfig } from "@/config/pricing";

type BundleSalesLanguage = "en" | "de";

type DraftTeachBundlePricingAction = {
  kind: "checkout" | "waitlist";
  href: string;
  helperText: string | null;
  trackingId: "checkout_bundle" | "waitlist_bundle";
};

export function isDraftTeachBundleEnabled() {
  return process.env.NEXT_PUBLIC_DRAFT_TEACH_BUNDLE_ENABLED === "true";
}

export const DRAFT_TEACH_BUNDLE_ENABLED = isDraftTeachBundleEnabled();

export function getDraftTeachBundleWaitlistCtaLabel(
  language: BundleSalesLanguage,
) {
  return language === "de" ? "Zur Warteliste" : "Join the waitlist";
}

export function getDraftTeachBundleHelperLine(language: BundleSalesLanguage) {
  return language === "de"
    ? "Teach kommt bald. Trage dich in die Warteliste fuer Bundle-Zugang ein."
    : "Teach is coming soon. Join the waitlist for bundle access.";
}

export function getDraftTeachBundlePricingAction(params: {
  language: BundleSalesLanguage;
  checkoutHref: string;
  waitlistHref: string;
  checkoutEnabled?: boolean;
}): DraftTeachBundlePricingAction {
  if (params.checkoutEnabled ?? isDraftTeachBundleEnabled()) {
    return {
      kind: "checkout",
      href: params.checkoutHref,
      helperText: null,
      trackingId: "checkout_bundle",
    };
  }

  return {
    kind: "waitlist",
    href: params.waitlistHref,
    helperText: getDraftTeachBundleHelperLine(params.language),
    trackingId: "waitlist_bundle",
  };
}

export function isDraftTeachBundlePriceId(priceId: string | null) {
  if (!priceId) {
    return false;
  }

  return Object.values(pricingConfig.bundle.stripePriceIds).includes(priceId);
}

export function isDraftTeachBundleCheckoutRequest(
  plan: string | null,
  priceId: string | null,
) {
  return plan === "bundle" || isDraftTeachBundlePriceId(priceId);
}

export function buildDraftTeachBundleWaitlistPath(returnPath: string | null) {
  const basePath =
    returnPath === "/de/pricing" ? "/de/early-access" : "/early-access";

  return `${basePath}?source=bundle_checkout_guard&plan=bundle`;
}
