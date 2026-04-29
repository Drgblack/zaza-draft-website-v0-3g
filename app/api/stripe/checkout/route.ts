import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import {
  getStripePriceId,
  isPricingCurrency,
  isSelfServeInterval,
  isSelfServePlan,
} from "@/config/pricing";
import { getStripeCheckoutAttribution } from "@/lib/attribution.server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
type StripeCheckoutCurrency = "eur" | "usd";
const SAFE_CHECKOUT_RETURN_PATHS = new Set([
  "/pricing",
  "/de/pricing",
  "/start",
  "/founding",
]);

function buildReturnUrl(
  request: NextRequest,
  returnPath: string | null,
  checkoutState: "success" | "cancelled",
) {
  const safePath =
    returnPath && SAFE_CHECKOUT_RETURN_PATHS.has(returnPath)
      ? returnPath
      : "/pricing";
  const url = new URL(safePath, request.nextUrl.origin);
  url.searchParams.set("checkout", checkoutState);
  if (checkoutState === "success") {
    url.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
  }
  return url.toString();
}

export async function GET(request: NextRequest) {
  const plan = request.nextUrl.searchParams.get("plan");
  const interval = request.nextUrl.searchParams.get("interval");
  const currency = request.nextUrl.searchParams.get("currency");
  const returnPath = request.nextUrl.searchParams.get("returnPath");

  if (
    !isSelfServePlan(plan) ||
    !isSelfServeInterval(interval) ||
    !isPricingCurrency(currency)
  ) {
    return NextResponse.json(
      { error: "Invalid checkout selection." },
      { status: 400 },
    );
  }

  const priceId = getStripePriceId(plan, interval, currency);
  if (!priceId) {
    return NextResponse.json(
      { error: "Checkout is not available for the selected currency." },
      { status: 400 },
    );
  }

  if (!stripeSecretKey) {
    console.error("[stripe-checkout] Missing STRIPE_SECRET_KEY");
    return NextResponse.json(
      { error: "Stripe checkout is not configured." },
      { status: 500 },
    );
  }

  // Read creator attribution from cookies (set on /c/[handle] visits).
  // Returns metadata to attach to the Stripe Customer and a discount
  // configuration if the visitor is associated with a creator coupon.
  const { metadata: attributionMetadata, discounts: attributionDiscounts } =
    await getStripeCheckoutAttribution();

  try {
    const stripe = new Stripe(stripeSecretKey);

    // Build the session config. If the visitor came from a creator with a
    // valid coupon, apply the discount automatically and disable the manual
    // promotion code field (Stripe doesn't allow both at once).
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      currency: currency.toLowerCase() as StripeCheckoutCurrency,
      success_url: buildReturnUrl(request, returnPath, "success"),
      cancel_url: buildReturnUrl(request, returnPath, "cancelled"),
      billing_address_collection: "auto",
      metadata: {
        plan,
        interval,
        currency,
        priceId,
        ...attributionMetadata,
      },
    };

    if (attributionDiscounts) {
      sessionConfig.discounts = attributionDiscounts;
    } else {
      sessionConfig.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    if (!session.url) {
      return NextResponse.json(
        { error: "Unable to start checkout." },
        { status: 500 },
      );
    }
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error) {
    console.error("[stripe-checkout] Failed to create checkout session", error);
    return NextResponse.json(
      { error: "Unable to start checkout." },
      { status: 500 },
    );
  }
}
