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

export function usePricingCurrency() {
  const [currency, setCurrencyState] = useState<PricingCurrency>(
    DEFAULT_PRICING_CURRENCY,
  );

  useEffect(() => {
    setCurrencyState(getPreferredCurrency());
  }, []);

  const setCurrency = (nextCurrency: PricingCurrency) => {
    persistPreferredCurrency(nextCurrency);
    setCurrencyState(nextCurrency);
  };

  return { currency, setCurrency };
}
