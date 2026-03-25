import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import {
  getStripePriceId,
  isPricingCurrency,
  isSelfServeInterval,
  isSelfServePlan,
} from "@/config/pricing";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
type StripeCheckoutCurrency = "eur" | "usd" | "gbp";

function buildReturnUrl(
  request: NextRequest,
  returnPath: string | null,
  checkoutState: "success" | "cancelled",
) {
  const safePath =
    returnPath === "/de/pricing" || returnPath === "/pricing"
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

  if (!stripeSecretKey) {
    console.error("[stripe-checkout] Missing STRIPE_SECRET_KEY");
    return NextResponse.json(
      { error: "Stripe checkout is not configured." },
      { status: 500 },
    );
  }

  try {
    const stripe = new Stripe(stripeSecretKey);
    const priceId = getStripePriceId(plan, interval);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      currency: currency.toLowerCase() as StripeCheckoutCurrency,
      success_url: buildReturnUrl(request, returnPath, "success"),
      cancel_url: buildReturnUrl(request, returnPath, "cancelled"),
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        plan,
        interval,
        currency,
        priceId,
      },
    });

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
