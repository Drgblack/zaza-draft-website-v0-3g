import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GlossaryTermClient from "@/app/glossary/[slug]/glossary-term-client"
import { SetLanguage } from "@/components/set-language"

// Minimal placeholder dataset (same as EN stub) â€” IDs must match
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
]

export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    slug: term.id,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const term = glossaryTerms.find((t) => t.id === params.slug)

  if (!term) {
    return { title: "Begriff nicht gefunden" }
  }

  return {
    title: `${term.term} â€“ KIâ€‘Glossar | Zaza Draft`,
    description: term.definition,
    openGraph: {
      title: `${term.term} â€“ KIâ€‘Glossar fÃ¼r LehrkrÃ¤fte`,
      description: term.definition,
      type: "article",
    },
    alternates: {
      canonical: `https://zazadraft.com/de/glossary/${params.slug}`,
      languages: {
        en: `https://zazadraft.com/glossary/${params.slug}`,
        de: `https://zazadraft.com/de/glossary/${params.slug}`,
      },
    },
  }
}

export default function GlossaryTermPageDe({ params }: { params: { slug: string } }) {
  const term = glossaryTerms.find((t) => t.id === params.slug)
  if (!term) notFound()
  return (
    <>
      <SetLanguage lang="de" />
      <GlossaryTermClient term={term!} allTerms={glossaryTerms} />
    </>
  )
}


