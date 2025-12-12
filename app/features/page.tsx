import type { Metadata } from "next"
import FeaturesClient from "./FeaturesClient"

const pageUrl = "https://zazadraft.com/features"

export const metadata: Metadata = {
  title: "Features | Zaza Draft",
  description:
    "Explore the teacher-first AI features that help educators write clearer parent messages, contextual feedback, and polished materials with sensible guardrails.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      de: "https://zazadraft.com/de/features",
    },
  },
  openGraph: {
    title: "Features | Zaza Draft",
    description:
      "Explore the teacher-first AI features that help educators write clearer parent messages, contextual feedback, and polished materials with sensible guardrails.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features | Zaza Draft",
    description:
      "Explore the teacher-first AI features that help educators write clearer parent messages, contextual feedback, and polished materials with sensible guardrails.",
  },
}

export default function FeaturesPage() {
  return <FeaturesClient />
}
