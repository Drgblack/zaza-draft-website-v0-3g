export type TeacherBillingInterval = "monthly" | "annual";

export const STRIPE_LINK_TEACHER = "/api/stripe/checkout?plan=teacher";
export const STRIPE_LINK_DEPARTMENT = "/api/stripe/checkout?plan=department";

export const teacherStripePriceIds: Record<TeacherBillingInterval, string> = {
  monthly: "price_1TA6ouHXkbT25qrKoapecaPz",
  annual: "price_1TA6ouHXkbT25qrKUW5KmHXr",
};

export const departmentPricing = {
  currency: "eur",
  annualSeatPriceCents: 9600,
  minimumSeats: 5,
  maximumSeats: 50,
  productName: "Zaza Draft Department",
} as const;

export const pricingConfig = {
  draft: {
    free: {
      monthly: "Free",
      yearly: "Free",
    },
    teacher: {
      monthly: 14.99,
      yearly: 149,
    },
    department: {
      monthly: 8,
      yearly: 96,
    },
    schools: {
      monthly: "Custom",
      yearly: "Custom",
    },
  },
} as const;

export const yearlyDiscount = "2 months free";

export function buildStripeCheckoutHref(
  baseHref: string,
  params: Record<string, string | undefined>,
) {
  const url = new URL(baseHref, "https://zazadraft.local");

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  return `${url.pathname}${url.search}`;
}
