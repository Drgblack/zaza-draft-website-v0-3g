import type { Metadata } from "next"
import AILiteracyClient from "@/app/ai-literacy/ai-literacy-client"
import { CourseSchema, BreadcrumbSchema } from "@/lib/seo/schema"

const siteUrl = "https://zazadraft.com/de/ai-literacy"

export const metadata: Metadata = {
  title: "AI Literacy for Teachers | Free Courses & Certification | Zaza Draft",
  description:
    "Master AI tools for education with free courses, certification programs, and downloadable resources. Learn prompt engineering, ethical AI use, and practical classroom applications.",
  keywords:
    "AI literacy for teachers, AI education courses, teacher AI certification, prompt engineering for educators, AI tools training, FERPA compliance AI, ethical AI in education",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: "https://zazadraft.com/ai-literacy",
      de: siteUrl,
    },
  },
  openGraph: {
    title: "AI Literacy Resource Center for Teachers",
    description: "Free courses, certification, and resources to help teachers confidently use AI in the classroom",
    type: "website",
    url: siteUrl,
    siteName: "Zaza Draft",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Literacy Resource Center for Teachers",
    description: "Free courses, certification, and resources to help teachers confidently use AI in the classroom",
  },
}

export default function AILiteracyPage() {
  return (
    <>
      <CourseSchema
        name="AI Literacy for Teachers"
        description="Comprehensive AI education program with free courses, certification, and resources for teachers"
        provider="Zaza Draft"
        url="https://zazadraft.com/de/ai-literacy"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zazadraft.com/de" },
          { name: "AI Literacy", url: "https://zazadraft.com/de/ai-literacy" },
        ]}
      />
      <AILiteracyClient />
    </>
  )
}
