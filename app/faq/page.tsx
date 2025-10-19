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
