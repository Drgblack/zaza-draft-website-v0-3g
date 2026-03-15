import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/stripe/checkout/route";
import { pricingConfig } from "@/config/pricing";
import {
  getDraftTeachBundleHelperLine,
  getDraftTeachBundlePricingAction,
} from "@/lib/bundle-sales";

const originalBundleFlag = process.env.NEXT_PUBLIC_DRAFT_TEACH_BUNDLE_ENABLED;

afterEach(() => {
  if (originalBundleFlag === undefined) {
    delete process.env.NEXT_PUBLIC_DRAFT_TEACH_BUNDLE_ENABLED;
    return;
  }

  process.env.NEXT_PUBLIC_DRAFT_TEACH_BUNDLE_ENABLED = originalBundleFlag;
});

test("bundle flag false returns a waitlist CTA instead of checkout", () => {
  const action = getDraftTeachBundlePricingAction({
    language: "en",
    checkoutEnabled: false,
    checkoutHref: "/api/stripe/checkout?plan=bundle",
    waitlistHref: "/early-access?source=pricing_page&plan=bundle",
  });

  assert.equal(action.kind, "waitlist");
  assert.equal(action.href, "/early-access?source=pricing_page&plan=bundle");
  assert.equal(action.trackingId, "waitlist_bundle");
  assert.equal(action.helperText, getDraftTeachBundleHelperLine("en"));
});

test("bundle flag true keeps the Stripe checkout CTA", () => {
  const action = getDraftTeachBundlePricingAction({
    language: "en",
    checkoutEnabled: true,
    checkoutHref: "/api/stripe/checkout?plan=bundle",
    waitlistHref: "/early-access?source=pricing_page&plan=bundle",
  });

  assert.equal(action.kind, "checkout");
  assert.equal(action.href, "/api/stripe/checkout?plan=bundle");
  assert.equal(action.trackingId, "checkout_bundle");
  assert.equal(action.helperText, null);
});

test("server-side guard redirects bundle checkout requests to the waitlist when disabled", async () => {
  process.env.NEXT_PUBLIC_DRAFT_TEACH_BUNDLE_ENABLED = "false";

  const request = new NextRequest(
    "https://zazadraft.com/api/stripe/checkout?plan=bundle&interval=monthly&currency=EUR&returnPath=/pricing",
  );

  const response = await GET(request);

  assert.equal(response.status, 303);
  assert.equal(
    response.headers.get("location"),
    "https://zazadraft.com/early-access?source=bundle_checkout_guard&plan=bundle",
  );
});

test("server-side guard also blocks direct bundle price ID requests when disabled", async () => {
  process.env.NEXT_PUBLIC_DRAFT_TEACH_BUNDLE_ENABLED = "false";

  const request = new NextRequest(
    `https://zazadraft.com/api/stripe/checkout?priceId=${pricingConfig.bundle.stripePriceIds.monthly}&returnPath=/de/pricing`,
  );

  const response = await GET(request);

  assert.equal(response.status, 303);
  assert.equal(
    response.headers.get("location"),
    "https://zazadraft.com/de/early-access?source=bundle_checkout_guard&plan=bundle",
  );
});
