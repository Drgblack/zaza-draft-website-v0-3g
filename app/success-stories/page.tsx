import type { Metadata } from "next"
import { SuccessStoriesClient } from "./success-stories-client"

const pageUrl = "https://zazadraft.com/success-stories"

export const metadata: Metadata = {
  title: "Teacher Success Stories | Zaza Draft",
  description:
    "See how teachers and schools save communication time with Zaza Draft. Real case studies highlight measurable improvements across classrooms.",
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      de: "https://zazadraft.com/de/success-stories",
    },
  },
  openGraph: {
    title: "Teacher Success Stories | Zaza Draft",
    description: "Real stories from educators who've saved hours with Zaza Draft.",
    url: pageUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teacher Success Stories | Zaza Draft",
    description: "Real stories from educators who've saved hours with Zaza Draft.",
  },
}

export default function SuccessStoriesPage() {
  return <SuccessStoriesClient />
}
