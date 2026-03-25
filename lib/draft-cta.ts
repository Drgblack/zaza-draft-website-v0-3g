export type DraftLocale = "en" | "de";

export function getDraftPricingHref(locale: DraftLocale) {
  return locale === "de" ? "/de/pricing" : "/pricing";
}

export function getDraftContactHref(locale: DraftLocale) {
  return locale === "de" ? "/de/contact" : "/contact";
}
