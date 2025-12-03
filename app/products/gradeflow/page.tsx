import type { Metadata } from "next"
import GradeFlowClient from "./gradeflow-client"

export const metadata: Metadata = {
  title: "GradeFlow | AI Grading Assistant for Teachers",
  description:
    "Save hours grading with GradeFlow. AI-powered rubric alignment, faster feedback, and audit trails. Free trial for teachers.",
  keywords: [
    "AI grading tool",
    "teacher productivity",
    "save time grading",
    "Zaza GradeFlow",
    "rubric alignment",
    "automated grading",
    "KI Bewertungstool",
    "Lehrer ProduktivitÃƒÂ¤t",
  ],
  openGraph: {
    title: "GradeFlow | AI Grading Assistant for Teachers",
    description: "Save hours grading with GradeFlow. AI-powered rubric alignment, faster feedback, and audit trails.",
    type: "website",
    url: "https://zazadraft.com/products/gradeflow",
  },
  twitter: {
    card: "summary_large_image",
    title: "GradeFlow | AI Grading Assistant",
    description: "Save hours grading with AI-powered rubric alignment and faster feedback.",
  },
  alternates: {
    canonical: "https://zazadraft.com/products/gradeflow",
    languages: {
      en: "https://zazadraft.com/products/gradeflow",
      de: "https://zazadraft.com/de/products/gradeflow",
    },
  },
}

export default function GradeFlowPage() {
  return (
    <>
      <GradeFlowClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "GradeFlow",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "9.99",
              priceCurrency: "GBP",
              availability: "https://schema.org/InStock",
            },
            description:
              "AI-powered grading assistant for teachers. Save hours with rubric alignment, faster feedback, and audit trails.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.7",
              ratingCount: "89",
            },
            featureList: [
              "AI-powered rubric alignment",
              "Faster feedback generation",
              "Fair and consistent grading",
              "Complete audit trails",
            ],
          }),
        }}
      />
    </>
  )
}

