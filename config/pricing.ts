export const SUPPORTED_CURRENCIES = ["EUR", "USD"] as const;
export const DEFAULT_PRICING_CURRENCY = "EUR" as const;
export const SELF_SERVE_INTERVALS = ["monthly", "annual"] as const;
export const SELF_SERVE_PLANS = ["draft", "bundle"] as const;

export type PricingCurrency = (typeof SUPPORTED_CURRENCIES)[number];
export type SelfServeInterval = (typeof SELF_SERVE_INTERVALS)[number];
export type SelfServePlan = (typeof SELF_SERVE_PLANS)[number];

type PriceDisplayMap = Record<PricingCurrency, number>;
type StripePriceId = string | null;
type StripePriceIdMap = Record<PricingCurrency, StripePriceId>;

type SelfServePlanConfig = {
  stripePriceIds: Record<SelfServeInterval, StripePriceIdMap>;
  displayAmounts: Record<SelfServeInterval, PriceDisplayMap>;
};

export type SelfServeCheckoutState = {
  href: string;
  priceId: StripePriceId;
  isAvailable: boolean;
  displayAmount: number;
};

// The existing EUR production price IDs are the only verified live self-serve
// Stripe prices in-repo. USD display pricing is live in the marketing layer,
// but checkout must stay fail-closed until dedicated USD price IDs are added.
export const pricingConfig: Record<SelfServePlan, SelfServePlanConfig> = {
  draft: {
    stripePriceIds: {
      monthly: {
        EUR: "price_1TA6ouHXkbT25qrKoapecaPz",
        USD: null,
      },
      annual: {
        EUR: "price_1TA6ouHXkbT25qrKUW5KmHXr",
        USD: null,
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
        USD: null,
      },
      annual: {
        EUR: "price_1TA6mFHXkbT25qrKzZq3qTtE",
        USD: null,
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

export function hasStripePriceId(
  plan: SelfServePlan,
  interval: SelfServeInterval,
  currency: PricingCurrency,
) {
  return Boolean(getStripePriceId(plan, interval, currency));
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

export function resolveSelfServeCheckout(params: {
  plan: SelfServePlan;
  interval: SelfServeInterval;
  currency: PricingCurrency;
  returnPath: string;
}): SelfServeCheckoutState {
  const priceId = getStripePriceId(
    params.plan,
    params.interval,
    params.currency,
  );

  return {
    href: buildStripeCheckoutPath(params),
    priceId,
    isAvailable: Boolean(priceId),
    displayAmount: getLocalizedPlanAmount(
      params.plan,
      params.interval,
      params.currency,
    ),
  };
}
