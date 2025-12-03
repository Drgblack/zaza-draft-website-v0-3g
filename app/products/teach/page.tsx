import type { Metadata } from "next"
import TeachClient from "./teach-client"

const ogImage = "/fast-lesson-planning-workflow.jpg"
const canonicalUrl = "https://zazadraft.com/products/teach"

export const metadata: Metadata = {
  title: "Zaza Teach | AI lesson planning that respects your craft",
  description:
    "Build lessons faster with curriculum-aware AI, differentiation ideas, and ready-to-use activities. Save hours while keeping your voice as a teacher.",
  openGraph: {
    title: "Zaza Teach | AI lesson planning that respects your craft",
    description:
      "Draft lessons, activities, and differentiation ideas in minutes. Keep control of your pedagogy with explainable guardrails.",
    url: canonicalUrl,
    type: "website",
    images: [{ url: ogImage, alt: "Teacher planning lessons with Zaza Teach" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Teach | Faster, safer lesson planning",
    description: "Curriculum-aware AI that helps you plan lessons quickly without losing your teaching voice.",
    images: [ogImage],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
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
