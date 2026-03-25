import {
  DEFAULT_PRICING_CURRENCY,
  type PricingCurrency,
  type SelfServeInterval,
  isPricingCurrency,
} from "@/config/pricing";

export const PRICING_CURRENCY_STORAGE_KEY = "zaza:pricing-currency";

const USD_REGIONS = new Set(["AS", "GU", "MP", "PR", "UM", "US", "VI"]);

const CURRENCY_LOCALE_MAP: Record<PricingCurrency, string> = {
  EUR: "en-IE",
  USD: "en-US",
};

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;
type NavigatorLike = Pick<Navigator, "language" | "languages">;

function extractRegion(locale: string) {
  const normalized = locale.replace(/_/g, "-").trim();

  if (!normalized) {
    return null;
  }

  try {
    // `Intl.Locale` gives us a stable region when the browser supports it.
    if (typeof Intl !== "undefined" && "Locale" in Intl) {
      return new Intl.Locale(normalized).maximize().region ?? null;
    }
  } catch {
    // Fall back to a simple region parse below.
  }

  const parts = normalized.split("-");
  const region = parts.find((part) => /^[A-Za-z]{2}$/.test(part));

  return region?.toUpperCase() ?? null;
}

export function resolveCurrencyFromLocales(
  locales: readonly string[] | null | undefined,
): PricingCurrency {
  for (const locale of locales ?? []) {
    const region = extractRegion(locale);

    if (region && USD_REGIONS.has(region)) {
      return "USD";
    }
  }

  return DEFAULT_PRICING_CURRENCY;
}

export function getBrowserLocales(navigatorRef?: NavigatorLike | null) {
  if (!navigatorRef) {
    return [] as string[];
  }

  if (navigatorRef.languages?.length) {
    return [...navigatorRef.languages];
  }

  return navigatorRef.language ? [navigatorRef.language] : [];
}

export function getPreferredCurrency(options?: {
  storage?: StorageLike | null;
  locales?: readonly string[] | null;
  navigatorRef?: NavigatorLike | null;
}) {
  const storage =
    options?.storage ??
    (typeof window !== "undefined" ? window.localStorage : null);
  const storedValue = storage?.getItem(PRICING_CURRENCY_STORAGE_KEY);

  if (isPricingCurrency(storedValue)) {
    return storedValue;
  }

  const locales =
    options?.locales ??
    getBrowserLocales(
      options?.navigatorRef ??
        (typeof window !== "undefined" ? window.navigator : null),
    );

  return resolveCurrencyFromLocales(locales);
}

export function persistPreferredCurrency(
  currency: PricingCurrency,
  storage?: StorageLike | null,
) {
  const resolvedStorage =
    storage ?? (typeof window !== "undefined" ? window.localStorage : null);

  resolvedStorage?.setItem(PRICING_CURRENCY_STORAGE_KEY, currency);
}

export function clearPreferredCurrency(storage?: StorageLike | null) {
  const resolvedStorage =
    storage ?? (typeof window !== "undefined" ? window.localStorage : null);

  resolvedStorage?.removeItem(PRICING_CURRENCY_STORAGE_KEY);
}

export function formatLocalizedPrice(
  amount: number,
  currency: PricingCurrency,
  options?: Intl.NumberFormatOptions,
) {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;

  return new Intl.NumberFormat(CURRENCY_LOCALE_MAP[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    ...options,
  }).format(amount);
}

export function getBillingIntervalLabel(
  interval: SelfServeInterval,
  format: "short" | "long" = "short",
) {
  if (format === "long") {
    return interval === "monthly" ? "month" : "year";
  }

  return interval === "monthly" ? "mo" : "yr";
}

export function formatPriceWithInterval(
  amount: number,
  currency: PricingCurrency,
  interval: SelfServeInterval,
  format: "short" | "long" = "short",
) {
  return `${formatLocalizedPrice(amount, currency)}/${getBillingIntervalLabel(interval, format)}`;
}
