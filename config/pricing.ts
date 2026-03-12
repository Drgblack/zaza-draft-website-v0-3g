export const SUPPORTED_CURRENCIES = ["EUR", "USD", "GBP"] as const;
export const SELF_SERVE_INTERVALS = ["monthly", "yearly"] as const;
export const SELF_SERVE_PLANS = ["draft", "bundle"] as const;

export type PricingCurrency = (typeof SUPPORTED_CURRENCIES)[number];
export type SelfServeInterval = (typeof SELF_SERVE_INTERVALS)[number];
export type SelfServePlan = (typeof SELF_SERVE_PLANS)[number];

type PriceDisplayMap = Record<PricingCurrency, string>;

type SelfServePlanConfig = {
  stripePriceIds: Record<SelfServeInterval, string>;
  displayAmounts: Record<SelfServeInterval, PriceDisplayMap>;
};

export const pricingConfig: Record<SelfServePlan, SelfServePlanConfig> = {
  draft: {
    stripePriceIds: {
      monthly: "price_1TA6ouHXkbT25qrKoapecaPz",
      yearly: "price_1TA6ouHXkbT25qrKUW5KmHXr",
    },
    displayAmounts: {
      monthly: {
        EUR: "14.99",
        USD: "16.00",
        GBP: "13.00",
      },
      yearly: {
        EUR: "149.00",
        USD: "160.00",
        GBP: "130.00",
      },
    },
  },
  bundle: {
    stripePriceIds: {
      monthly: "price_1TA6mFHXkbT25qrK40mdltez",
      yearly: "price_1TA6mFHXkbT25qrKzZq3qTtE",
    },
    displayAmounts: {
      monthly: {
        EUR: "24.99",
        USD: "27.00",
        GBP: "22.00",
      },
      yearly: {
        EUR: "249.00",
        USD: "270.00",
        GBP: "220.00",
      },
    },
  },
};

export const departmentDisplayAmounts = {
  monthly: {
    EUR: "8",
    USD: "9",
    GBP: "7",
  },
} as const satisfies Record<"monthly", PriceDisplayMap>;

export function isPricingCurrency(
  value: string | null,
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
) {
  return pricingConfig[plan].stripePriceIds[interval];
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
