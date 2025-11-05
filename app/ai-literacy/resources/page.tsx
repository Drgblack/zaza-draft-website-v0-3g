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

