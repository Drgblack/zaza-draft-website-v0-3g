import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GlossaryTermClient from "./glossary-term-client"

// This would normally come from a database or CMS
const glossaryTerms = [
  {
    id: "artificial-intelligence",
    term: "Artificial Intelligence (AI)",
    definition:
      "Computer systems designed to perform tasks that typically require human intelligence, such as learning, problem-solving, pattern recognition, and decision-making.",
    example:
      "When Zaza Draft suggests improvements to your parent email, it's using AI to understand context and generate helpful recommendations.",
    category: "AI Fundamentals",
    relatedTerms: ["machine-learning", "deep-learning", "neural-network"],
  },
  // Add all other terms here...
]

export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    slug: term.id,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const term = glossaryTerms.find((t) => t.id === params.slug)

  if (!term) {
    return {
      title: "Term Not Found",
    }
  }

  return {
    title: `${term.term} - AI Glossary | Zaza Draft`,
    description: term.definition,
    openGraph: {
      title: `${term.term} - AI Glossary for Teachers`,
      description: term.definition,
      type: "article",
    },
  }
}

export default function GlossaryTermPage({ params }: { params: { slug: string } }) {
  const term = glossaryTerms.find((t) => t.id === params.slug)

  if (!term) {
    notFound()
  }

  return <GlossaryTermClient term={term} allTerms={glossaryTerms} />
}
