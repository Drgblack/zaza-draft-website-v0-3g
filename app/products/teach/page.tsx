import type { Metadata } from "next"
import TeachClient from "./teach-client"

export const metadata: Metadata = {
  title: "Zaza Teach | AI Lesson Planning Tool for Teachers",
  description:
    "Save hours on lesson planning with Zaza Teach. AI-powered curriculum alignment, auto-planner, and gamified activities. Free trial for teachers.",
  keywords: [
    "AI lesson planning",
    "teacher productivity",
    "save time teaching",
    "Zaza Teach",
    "curriculum planning",
    "lesson planner",
    "KI Unterrichtsplanung",
    "Lehrer ProduktivitÃƒÂ¤t",
  ],
  openGraph: {
    title: "Zaza Teach | AI Lesson Planning Tool for Teachers",
    description:
      "Save hours on lesson planning with Zaza Teach. AI-powered curriculum alignment, auto-planner, and gamified activities.",
    type: "website",
    url: "https://zazadraft.com/products/teach",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Teach | AI Lesson Planning Tool",
    description: "Save hours on lesson planning with AI-powered curriculum alignment and auto-planner.",
  },
  alternates: {
    canonical: "https://zazadraft.com/products/teach",
    languages: {
      en: "https://zazadraft.com/products/teach",
      de: "https://zazadraft.com/de/products/teach",
    },
  },
}

export default function TeachPage() {
  return (
    <>
      <TeachClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Zaza Teach",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "9.99",
              priceCurrency: "GBP",
              availability: "https://schema.org/InStock",
            },
            description:
              "AI-powered lesson planning tool for teachers. Save hours with curriculum-aligned auto-planner and gamified activities.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "127",
            },
            featureList: [
              "AI-powered auto-planner",
              "Curriculum alignment",
              "Gamified activities",
              "Save hours on lesson planning",
            ],
          }),
        }}
      />
    </>
  )
}

