import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import {
  departmentPricing,
  teacherStripePriceIds,
  type TeacherBillingInterval,
} from "@/config/pricing";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

type CheckoutPlan = "teacher" | "department";

function isCheckoutPlan(value: string | null): value is CheckoutPlan {
  return value === "teacher" || value === "department";
}

function isTeacherBillingInterval(
  value: string | null,
): value is TeacherBillingInterval {
  return value === "monthly" || value === "annual";
}

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
  const returnPath = request.nextUrl.searchParams.get("returnPath");

  if (!isCheckoutPlan(plan)) {
    return NextResponse.json(
      { error: "Invalid checkout plan." },
      { status: 400 },
    );
  }

  if (!stripe) {
    console.error("[stripe-checkout] Missing STRIPE_SECRET_KEY");
    return NextResponse.json(
      { error: "Stripe checkout is not configured." },
      { status: 500 },
    );
  }

  try {
    const session =
      plan === "teacher"
        ? await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
              {
                price:
                  teacherStripePriceIds[
                    isTeacherBillingInterval(interval) ? interval : "monthly"
                  ],
                quantity: 1,
              },
            ],
            allow_promotion_codes: true,
            billing_address_collection: "auto",
            success_url: buildReturnUrl(request, returnPath, "success"),
            cancel_url: buildReturnUrl(request, returnPath, "cancelled"),
            metadata: {
              plan,
              interval: isTeacherBillingInterval(interval)
                ? interval
                : "monthly",
            },
          })
        : await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
              {
                price_data: {
                  currency: departmentPricing.currency,
                  product_data: {
                    name: departmentPricing.productName,
                  },
                  recurring: {
                    interval: "year",
                  },
                  unit_amount: departmentPricing.annualSeatPriceCents,
                },
                quantity: departmentPricing.minimumSeats,
              },
            ],
            allow_promotion_codes: true,
            billing_address_collection: "auto",
            success_url: buildReturnUrl(request, returnPath, "success"),
            cancel_url: buildReturnUrl(request, returnPath, "cancelled"),
            metadata: {
              plan,
              billing: "annual",
              seats: String(departmentPricing.minimumSeats),
            },
          });

    if (!session.url) {
      console.error(
        "[stripe-checkout] Session created without a redirect URL",
        {
          plan,
        },
      );
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
