import type { Metadata } from "next"
import ResourceLibraryClient from "./resource-library-client"

export const metadata: Metadata = {
  title: "AI Resource Library | Zaza Draft",
  description:
    "Download 50+ free templates, guides, and checklists for AI-powered teaching. Prompt templates, lesson plans, parent communication tools, and more.",
  openGraph: {
    title: "AI Resource Library | Zaza Draft",
    description: "Download 50+ free templates, guides, and checklists for AI-powered teaching.",
    type: "website",
  },
}

export default function ResourceLibraryPage() {
  return <ResourceLibraryClient />
}
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/ai-literacy/resources",
    languages: {
      en: "https://zazadraft.com/ai-literacy/resources",
      de: "https://zazadraft.com/de/ai-literacy/resources",
    },
  },
}
