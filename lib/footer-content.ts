import type { DraftLocale } from "@/lib/draft-cta";

type FooterContent = {
  tagline: string;
  supportLine: string;
  moreToolsLine: string;
  moreToolsLabel: string;
};

// Keep footer copy separate from SEO entity descriptions so metadata edits
// cannot silently restore long-form footer text.
const footerContentByLocale: Record<DraftLocale, FooterContent> = {
  en: {
    tagline: "Calm, professional writing support for teachers.",
    supportLine: "Teacher-built for calm, professional school communication.",
    moreToolsLine: "More Zaza tools are in development.",
    moreToolsLabel: "zazatechnologies.com ->",
  },
  de: {
    tagline: "Ruhige, professionelle Schreibunterstützung für Lehrkräfte.",
    supportLine:
      "Von Lehrkräften mitgedacht für ruhige, professionelle Schulkommunikation.",
    moreToolsLine: "Weitere Zaza Tools sind in Entwicklung.",
    moreToolsLabel: "zazatechnologies.com ->",
  },
};

export function getFooterContent(locale: DraftLocale): FooterContent {
  return footerContentByLocale[locale];
}
