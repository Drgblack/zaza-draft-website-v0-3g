import type { Metadata } from "next"

const pageUrl = "https://zazadraft.com/support"

export const metadata: Metadata = {
  title: "Support | Zaza Draft",
  description: "Contact Zaza Draft for help with onboarding, reports, billing, or account questions.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      de: "https://zazadraft.com/de/support",
    },
  },
  openGraph: {
    title: "Support | Zaza Draft",
    description: "Contact Zaza Draft for help with onboarding, reports, billing, or account questions.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | Zaza Draft",
    description: "Contact Zaza Draft for help with onboarding, reports, billing, or account questions.",
  },
}
