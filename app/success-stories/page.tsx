import type { Metadata } from "next"
import { SuccessStoriesClient } from "./success-stories-client"

export const metadata: Metadata = {
  title: "Teacher Success Stories: AI Communication Transformations | Zaza Draft",
  description:
    "See how teachers and schools save 70% of communication time with Zaza Draft. Real case studies with measurable results from elementary, middle, and high schools.",
  openGraph: {
    title: "Teacher Success Stories | Zaza Draft",
    description: "Real stories from educators who've saved hundreds of hours with Zaza Draft",
    type: "website",
  },
}

export default function SuccessStoriesPage() {
  return <SuccessStoriesClient />
}
import type { Metadata } from "next"


