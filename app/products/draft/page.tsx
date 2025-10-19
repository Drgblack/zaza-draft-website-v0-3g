import type { Metadata } from "next"
import DraftClient from "./draft-client"

export const metadata: Metadata = {
  title: "Zaza Draft | AI Parent Communication Tool for Teachers",
  description:
    "Write better parent emails in seconds with Zaza Draft. AI-powered tone guardrails, translation checks, and review steps. Free trial for teachers.",
  keywords: [
    "AI parent communication",
    "teacher productivity",
    "save time teaching",
    "Zaza Draft",
    "parent emails",
    "teacher communication",
    "KI Elternkommunikation",
    "Lehrer Produktivität",
  ],
  openGraph: {
    title: "Zaza Draft | AI Parent Communication Tool for Teachers",
    description:
      "Write better parent emails in seconds with Zaza Draft. AI-powered tone guardrails and translation checks.",
    type: "website",
    url: "https://zazadraft.com/products/draft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Draft | AI Parent Communication",
    description: "Write better parent emails in seconds with AI-powered tone guardrails and translation checks.",
  },
  alternates: {
    canonical: "https://zazadraft.com/products/draft",
    languages: {
      en: "https://zazadraft.com/products/draft",
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
