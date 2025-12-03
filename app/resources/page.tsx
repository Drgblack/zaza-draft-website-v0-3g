import type { Metadata } from "next"
import ResourcesClient from "./ResourcesClient"

const ogImage = "/advanced-prompts.jpg"

export const metadata: Metadata = {
  title: "Resources | Zaza Draft",
  description:
    "Free guides, templates, and AI safety tips for teachers. Download resources that make parent communication and lesson work easier.",
  openGraph: {
    title: "Resources | Zaza Draft",
    description: "Guides, templates, and AI safety resources created for teachers.",
    url: "https://zazadraft.com/resources",
    type: "website",
    images: [{ url: ogImage, alt: "Zaza Draft resources overview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Zaza Draft",
    description: "Download teacher-friendly guides, templates, and AI safety checklists.",
    images: [ogImage],
  },
  alternates: {
    canonical: "https://zazadraft.com/resources",
    languages: {
      en: "https://zazadraft.com/resources",
      de: "https://zazadraft.com/de/resources",
    },
  },
}

export default function ResourcesPage() {
  return <ResourcesClient />
}
