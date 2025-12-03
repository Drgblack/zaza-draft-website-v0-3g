import type { Metadata } from "next"
import GradeFlowClient from "./gradeflow-client"

const ogImage = "/assessment-rubrics-feedback.jpg"
const canonicalUrl = "https://zazadraft.com/products/gradeflow"

export const metadata: Metadata = {
  title: "GradeFlow | AI grading that saves hours, keeps fairness",
  description:
    "Speed up grading with rubric-aware AI, meaningful feedback, and clear audit trails. Designed to protect your judgment and save weekends.",
  openGraph: {
    title: "GradeFlow | AI grading that saves hours, keeps fairness",
    description:
      "Rubric-aware grading assistance with feedback you can trust and audit trails for peace of mind.",
    url: canonicalUrl,
    type: "website",
    images: [{ url: ogImage, alt: "Teacher reviewing rubric-aligned feedback with GradeFlow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GradeFlow | Faster, fairer grading",
    description: "Generate rubric-aligned feedback quickly while keeping transparency and control.",
    images: [ogImage],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
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
