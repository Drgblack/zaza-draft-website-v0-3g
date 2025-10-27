'use client';
import type { Metadata } from "next"
import AILiteracyClient from "./ai-literacy-client"
import { CourseSchema, BreadcrumbSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "AI Literacy for Teachers | Free Courses & Certification | Zaza Draft",
  description:
    "Master AI tools for education with free courses, certification programs, and downloadable resources. Learn prompt engineering, ethical AI use, and practical classroom applications.",
  keywords:
    "AI literacy for teachers, AI education courses, teacher AI certification, prompt engineering for educators, AI tools training, FERPA compliance AI, ethical AI in education",
  openGraph: {
    title: "AI Literacy Resource Center for Teachers",
    description: "Free courses, certification, and resources to help teachers confidently use AI in the classroom",
    type: "website",
    url: "https://zazadraft.com/ai-literacy",
  },
}

export default function AILiteracyPage() {
  return (
    <>
      <CourseSchema
        name="AI Literacy for Teachers"
        description="Comprehensive AI education program with free courses, certification, and resources for teachers"
        provider="Zaza Draft"
        url="https://zazadraft.com/ai-literacy"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zazadraft.com" },
          { name: "AI Literacy", url: "https://zazadraft.com/ai-literacy" },
        ]}
      />
      <AILiteracyClient />
    </>
  )
}
import type { Metadata } from "next"

export const metadata_disabled_1: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/ai-literacy",
    languages: {
      en: "https://zazadraft.com/ai-literacy",
      de: "https://zazadraft.com/de/ai-literacy",
    },
  },
}



