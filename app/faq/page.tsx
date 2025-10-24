import type { Metadata } from "next"
import { FAQPageClient } from "./faq-client"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Zaza Draft",
  description:
    "Get answers to common questions about Zaza Draft, AI safety, privacy, pricing, and how it helps teachers save time.",
}

export default function FAQPage() {
  return <FAQPageClient />
}
import type { Metadata } from "next"

export const metadata_disabled_1: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/faq",
    languages: {
      en: "https://zazadraft.com/faq",
      de: "https://zazadraft.com/de/faq",
    },
  },
}
