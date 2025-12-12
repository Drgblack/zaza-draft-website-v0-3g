import type { Metadata } from "next"
import { TermsClient } from "./terms-client"

const ogImage = "/professional-headshot.png"
const canonicalUrl = "https://zazadraft.com/terms"

export const metadata: Metadata = {
  title: "Terms of Service | Zaza Draft",
  description:
    "Terms of Service for Zaza Draft, Zaza Teach, GradeFlow, and Shield. Understand accounts, subscriptions, IP, and acceptable use.",
  openGraph: {
    title: "Terms of Service | Zaza Draft",
    description: "Terms covering accounts, subscriptions, acceptable use, and intellectual property.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [{ url: ogImage, alt: "Zaza Draft brand graphic" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Zaza Draft",
    description: "Terms for Zaza Draft and the Zaza Suite apps.",
    images: [ogImage],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/terms",
    },
  },
}

export default function TermsPage() {
  return <TermsClient />
}
