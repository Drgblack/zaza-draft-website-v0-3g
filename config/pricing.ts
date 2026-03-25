export const SUPPORTED_CURRENCIES = ["EUR", "USD"] as const;
export const DEFAULT_PRICING_CURRENCY = "EUR" as const;
export const SELF_SERVE_INTERVALS = ["monthly", "annual"] as const;
export const SELF_SERVE_PLANS = ["draft", "bundle"] as const;

export type PricingCurrency = (typeof SUPPORTED_CURRENCIES)[number];
export type SelfServeInterval = (typeof SELF_SERVE_INTERVALS)[number];
export type SelfServePlan = (typeof SELF_SERVE_PLANS)[number];

type PriceDisplayMap = Record<PricingCurrency, number>;
type StripePriceIdMap = Record<PricingCurrency, string>;

type SelfServePlanConfig = {
  stripePriceIds: Record<SelfServeInterval, StripePriceIdMap>;
  displayAmounts: Record<SelfServeInterval, PriceDisplayMap>;
};

// The existing production price IDs are the only verified Stripe prices in-repo.
// The mapping is currency-aware so dedicated USD price IDs can be dropped in
// without changing CTA or checkout code paths.
export const pricingConfig: Record<SelfServePlan, SelfServePlanConfig> = {
  draft: {
    stripePriceIds: {
      monthly: {
        EUR: "price_1TA6ouHXkbT25qrKoapecaPz",
        USD: "price_1TA6ouHXkbT25qrKoapecaPz",
      },
      annual: {
        EUR: "price_1TA6ouHXkbT25qrKUW5KmHXr",
        USD: "price_1TA6ouHXkbT25qrKUW5KmHXr",
      },
    },
    displayAmounts: {
      monthly: {
        EUR: 14.99,
        USD: 16.99,
      },
      annual: {
        EUR: 149,
        USD: 169.99,
      },
    },
  },
  bundle: {
    stripePriceIds: {
      monthly: {
        EUR: "price_1TA6mFHXkbT25qrK40mdltez",
        USD: "price_1TA6mFHXkbT25qrK40mdltez",
      },
      annual: {
        EUR: "price_1TA6mFHXkbT25qrKzZq3qTtE",
        USD: "price_1TA6mFHXkbT25qrKzZq3qTtE",
      },
    },
    displayAmounts: {
      monthly: {
        EUR: 24.99,
        USD: 27,
      },
      annual: {
        EUR: 249,
        USD: 270,
      },
    },
  },
};

export const departmentDisplayAmounts = {
  monthly: {
    EUR: 8,
    USD: 9,
  },
} as const satisfies Record<"monthly", PriceDisplayMap>;

export function isPricingCurrency(
  value: string | null | undefined,
): value is PricingCurrency {
  return Boolean(
    value && SUPPORTED_CURRENCIES.includes(value as PricingCurrency),
  );
}

export function isSelfServeInterval(
  value: string | null,
): value is SelfServeInterval {
  return Boolean(
    value && SELF_SERVE_INTERVALS.includes(value as SelfServeInterval),
  );
}

export function isSelfServePlan(value: string | null): value is SelfServePlan {
  return Boolean(value && SELF_SERVE_PLANS.includes(value as SelfServePlan));
}

export function getStripePriceId(
  plan: SelfServePlan,
  interval: SelfServeInterval,
  currency: PricingCurrency,
) {
  return pricingConfig[plan].stripePriceIds[interval][currency];
}

export function getLocalizedPlanAmount(
  plan: SelfServePlan,
  interval: SelfServeInterval,
  currency: PricingCurrency,
) {
  return pricingConfig[plan].displayAmounts[interval][currency];
}

export function getLocalizedDepartmentAmount(currency: PricingCurrency) {
  return departmentDisplayAmounts.monthly[currency];
}

export function buildStripeCheckoutPath(params: {
  plan: SelfServePlan;
  interval: SelfServeInterval;
  currency: PricingCurrency;
  returnPath: string;
}) {
  const searchParams = new URLSearchParams({
    plan: params.plan,
    interval: params.interval,
    currency: params.currency,
    returnPath: params.returnPath,
  });

  return `/api/stripe/checkout?${searchParams.toString()}`;
}
