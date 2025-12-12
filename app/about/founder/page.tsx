import type { Metadata } from "next"
import FounderPageClient from "./founder-client"

const ogImage = "/greg-blackburn-headshot.jpg"
const canonicalUrl = "https://zazadraft.com/about/founder"

export const metadata: Metadata = {
  title: "Founder | Zaza Draft",
  description:
    "Meet Dr. Greg Blackburn, learning scientist and founder of Zaza Draft. Twenty years in L&D, building safer AI writing support for teachers.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/about/founder",
    },
  },
  openGraph: {
    title: "Founder | Zaza Draft",
    description:
      "Learn why Dr. Greg Blackburn built Zaza Draft to give teachers calmer parent communication and trusted AI guardrails.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    images: [{ url: ogImage, alt: "Dr. Greg Blackburn, Founder of Zaza Draft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder | Zaza Draft",
    description: "Learning scientist building teacher-first AI writing support.",
    images: [ogImage],
  },
}

export default function FounderPage() {
  return <FounderPageClient />
}
