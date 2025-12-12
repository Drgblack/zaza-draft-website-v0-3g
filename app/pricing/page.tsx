import type { Metadata } from "next"
import PricingClient from "./PricingClient"

const ogImage = "/professional-female-teacher-in-modern-classroom.jpg"
const siteUrl = "https://zazadraft.com/pricing"

export const metadata: Metadata = {
  title: "Pricing | Zaza Draft teacher plans",
  description: "Transparent pricing for Zaza Draft and the Zaza Suite. Start free, then upgrade when you're ready.",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      de: "https://zazadraft.com/de/pricing",
    },
  },
  openGraph: {
    title: "Pricing | Zaza Draft teacher plans",
    description: "Start free. Unlock faster parent messages, calmer replies, and trusted guardrails when you upgrade.",
    url: siteUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [{ url: ogImage, alt: "Teacher reviewing pricing options for Zaza Draft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Zaza Draft teacher plans",
    description: "Transparent plans for teacher-first AI writing support. Start free, upgrade anytime.",
    images: [ogImage],
  },
}

export default function PricingPage() {
  return <PricingClient />
}
