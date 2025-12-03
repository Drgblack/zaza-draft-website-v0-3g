import type { Metadata } from "next"
import DraftClient from "./draft-client"

const ogImage = "/teacher-writing-parent-email-on-laptop.jpg"
const canonicalUrl = "https://zazadraft.com/products/draft"

export const metadata: Metadata = {
  title: "Zaza Draft | AI parent communication built for teachers",
  description:
    "Write calmer parent emails, protect your tone, and save hours each week. Zaza Draft keeps your voice, adds safety checks, and speeds up every message.",
  openGraph: {
    title: "Zaza Draft | AI parent communication built for teachers",
    description:
      "Draft parent emails in minutes with tone guardrails and safety checks. Save time without losing your voice or credibility.",
    url: canonicalUrl,
    type: "website",
    images: [{ url: ogImage, alt: "Teacher composing a parent email with Zaza Draft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft | Teacher-first parent messaging",
    description: "Faster parent emails with calm tone and safety guardrails teachers can trust.",
    images: [ogImage],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/products/draft",
    },
  },
}

export default function DraftPage() {
  return (
    <>
      <DraftClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Zaza Draft",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "9.99",
              priceCurrency: "GBP",
              availability: "https://schema.org/InStock",
            },
            description:
              "AI-powered parent communication tool for teachers. Write better emails with tone guardrails and translation checks.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "203",
            },
            featureList: [
              "AI-powered tone guardrails",
              "Translation checks for 50+ languages",
              "Review steps before sending",
              "Save hours on parent communication",
            ],
          }),
        }}
      />
    </>
  )
}
