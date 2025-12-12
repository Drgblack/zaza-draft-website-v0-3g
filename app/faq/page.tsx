import type { Metadata } from "next"
import { FAQPageClient } from "./faq-client"

const pageUrl = "https://zazadraft.com/faq"

export const metadata: Metadata = {
  title: "FAQ | Zaza Draft",
  description:
    "Get answers to common questions about Zaza Draft, AI safety, privacy, pricing, and how it helps teachers save time.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      de: "https://zazadraft.com/de/faq",
    },
  },
  openGraph: {
    title: "FAQ | Zaza Draft",
    description:
      "Get answers to common questions about Zaza Draft, AI safety, privacy, pricing, and how it helps teachers save time.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Zaza Draft",
    description:
      "Get answers to common questions about Zaza Draft, AI safety, privacy, pricing, and how it helps teachers save time.",
  },
}

export default function FAQPage() {
  return <FAQPageClient />
}
