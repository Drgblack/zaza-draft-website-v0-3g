"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PRICING_CURRENCY,
  type PricingCurrency,
} from "@/config/pricing";
import {
  getPreferredCurrency,
  persistPreferredCurrency,
} from "@/lib/pricing-currency";

type UsePricingCurrencyOptions = {
  locales?: readonly string[] | null;
};

export function usePricingCurrency(options?: UsePricingCurrencyOptions) {
  const [currency, setCurrencyState] = useState<PricingCurrency>(
    DEFAULT_PRICING_CURRENCY,
  );
  const resolvedLocales = options?.locales;
  const localeKey = options?.locales?.join(",") ?? "";

  useEffect(() => {
    setCurrencyState(getPreferredCurrency({ locales: resolvedLocales }));
  }, [localeKey]);

  const setCurrency = (nextCurrency: PricingCurrency) => {
    persistPreferredCurrency(nextCurrency);
    setCurrencyState(nextCurrency);
  };

  return { currency, setCurrency };
}
