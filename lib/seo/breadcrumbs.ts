import type { BreadcrumbItemInput } from "@/lib/seo/schema";
import {
  getPathLocale,
  normaliseCanonicalPath,
  stripLocalePrefix,
} from "@/lib/seo-canonical";

const SEGMENT_LABELS = {
  en: {
    about: "About",
    founder: "Founder",
    "founder-story": "Founder story",
    company: "Company",
    privacy: "Privacy",
    terms: "Terms",
    pricing: "Pricing",
    schools: "For Schools",
    support: "Support",
    features: "Features",
    manifesto: "Manifesto",
    contact: "Contact",
    resources: "Resources",
    legal: "Legal",
    faq: "FAQ",
    videos: "Videos",
    webinars: "Webinars",
    suite: "Suite",
  },
  de: {
    about: "Über uns",
    founder: "Gründer",
    "founder-story": "Gründerstory",
    company: "Unternehmen",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    pricing: "Preise",
    schools: "Für Schulen",
    support: "Support",
    features: "Funktionen",
    manifesto: "Manifest",
    contact: "Kontakt",
    resources: "Ressourcen",
    legal: "Rechtliches",
    faq: "FAQ",
    videos: "Videos",
    webinars: "Webinare",
    suite: "Suite",
  },
} as const;

const AUTO_BREADCRUMB_SKIP_PATTERNS = [
  /^\/$/,
  /^\/de$/,
  /^\/c\//,
  /^\/internal\//,
  /^\/blog\//,
  /^\/de\/blog\//,
  /^\/guides\//,
  /^\/compare\//,
  /^\/de\/compare\//,
  /^\/success-stories\//,
  /^\/resources\//,
  /^\/videos\//,
  /^\/tools\//,
  /^\/scenario\//,
  /^\/report-comments\//,
  /^\/reply\//,
  /^\/problems\//,
  /^\/how-to\//,
  /^\/expanded\//,
  /^\/uk\//,
  /^\/england\//,
  /^\/integrations\//,
  /^\/ambassadors\//,
  /^\/state-of-ai-education\//,
] as const;

function titleCaseSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function shouldRenderAutomaticBreadcrumb(pathname: string) {
  const path = normaliseCanonicalPath(pathname);
  return !AUTO_BREADCRUMB_SKIP_PATTERNS.some((pattern) => pattern.test(path));
}

export function buildAutomaticBreadcrumbItems(
  pathname: string,
): BreadcrumbItemInput[] {
  const locale = getPathLocale(pathname);
  const path = normaliseCanonicalPath(pathname);
  const localeAwareHomePath = locale === "de" ? "/de" : "/";
  const rawPath = stripLocalePrefix(path);
  const segments = rawPath.split("/").filter(Boolean);

  const items: BreadcrumbItemInput[] = [
    {
      name: locale === "de" ? "Startseite" : "Home",
      path: localeAwareHomePath,
    },
  ];

  let currentPath = localeAwareHomePath === "/" ? "" : localeAwareHomePath;

  for (const segment of segments) {
    currentPath = `${currentPath}/${segment}`.replace(/\/{2,}/g, "/");
    const labelMap = SEGMENT_LABELS[locale];

    items.push({
      name:
        labelMap[segment as keyof typeof labelMap] ?? titleCaseSegment(segment),
      path: currentPath,
    });
  }

  return items;
}
