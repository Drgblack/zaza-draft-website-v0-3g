import type { Metadata } from "next"
import AIStudentReportsClient from "./ai-student-reports-client"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "AI for Student Reports & Report Cards: Complete Teacher Guide 2025",
  description:
    "Learn how to use AI to write better student reports and report cards in half the time. Includes templates, examples, and privacy guidelines for teachers.",
  keywords: "AI student reports, AI report cards, teacher AI tools, progress reports AI, student feedback AI",
  openGraph: {
    title: "AI for Student Reports & Report Cards: Complete Teacher Guide 2025",
    description:
      "Learn how to use AI to write better student reports and report cards in half the time. Includes templates, examples, and privacy guidelines.",
    type: "article",
    url: "https://zazadraft.com/ai-for-student-reports",
  },
  alternates: {
    canonical: "https://zazadraft.com/ai-for-student-reports",
  },
}

export default function AIStudentReportsPage() {
  return (
    <>
      <SetLanguage lang="de" />
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Learning Center", href: "/best-ai-tool-parent-emails" },
          { label: "AI for Student Reports", href: "/ai-for-student-reports" },
        ]}
      />
      <AIStudentReportsClient />
    </>
      </>
  )
}
import type { Metadata } from "next"
import { SetLanguage } from "@/components/set-language"


export const metadata_disabled_1: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/ai-for-student-reports",
    languages: {
      en: "https://zazadraft.com/ai-for-student-reports",
      de: "https://zazadraft.com/de/ai-for-student-reports",
    },
  },
}
