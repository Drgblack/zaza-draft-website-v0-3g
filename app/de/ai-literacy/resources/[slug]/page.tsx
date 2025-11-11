import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ResourceDetailClient from "./resource-detail-client"

const resources = [
  {
    slug: "parent-email-templates",
    title: "25 Parent Email Templates",
    description:
      "Ready-to-use email templates for common parent communication scenarios including progress updates, behavior concerns, meeting requests, and positive feedback.",
  },
  {
    slug: "prompt-engineering-guide",
    title: "Prompt Engineering for Teachers",
    description:
      "Complete guide to writing effective AI prompts for educational contexts with examples and best practices.",
  },
  {
    slug: "lesson-plan-templates",
    title: "AI-Enhanced Lesson Plan Templates",
    description: "10 customizable lesson plan templates with AI integration points for differentiation and assessment.",
  },
]

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resource = resources.find((r) => r.slug === params.slug)

  if (!resource) {
    return {
      title: "Resource Not Found | Zaza Draft",
    }
  }

  return {
    title: `${resource.title} | Zaza Draft`,
    description: resource.description,
    openGraph: {
      title: `${resource.title} | Zaza Draft`,
      description: resource.description,
      type: "article",
    },
  }
}

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const resource = resources.find((r) => r.slug === params.slug)

  if (!resource) {
    notFound()
  }

  return <ResourceDetailClient slug={params.slug} />
}
