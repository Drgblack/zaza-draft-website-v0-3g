export type DraftLocale = "en" | "de";
export type SchoolSalesPlan = "department" | "enterprise" | "general";

export function getDraftPricingHref(locale: DraftLocale) {
  return locale === "de" ? "/de/pricing" : "/pricing";
}

export function getDraftSupportHref(locale: DraftLocale) {
  return locale === "de" ? "/de/contact" : "/contact";
}

export function parseSchoolSalesPlan(
  value: string | null | undefined,
): SchoolSalesPlan {
  if (value === "department" || value === "enterprise" || value === "general") {
    return value;
  }

  return "general";
}

export function sanitizeLeadSource(
  value: string | null | undefined,
  fallback = "pricing_page",
) {
  const normalized = value?.trim().toLowerCase() ?? "";

  if (/^[a-z0-9_-]{1,64}$/.test(normalized)) {
    return normalized;
  }

  return fallback;
}

export function getDraftSchoolSalesHref(
  locale: DraftLocale,
  plan: SchoolSalesPlan = "general",
  source = "pricing_page",
) {
  // Institutional enquiries have their own route so pricing CTAs cannot
  // fall back to the generic support form.
  const basePath = locale === "de" ? "/de/contact/schools" : "/contact/schools";
  const searchParams = new URLSearchParams({
    plan: parseSchoolSalesPlan(plan),
    source: sanitizeLeadSource(source),
  });

  return `${basePath}?${searchParams.toString()}`;
}

export function getDraftContactHref(locale: DraftLocale) {
  return getDraftSupportHref(locale);
}
