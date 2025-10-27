export const dynamic = 'force-dynamic';
const comparisons = {
  "zaza-draft-vs-magicschool": {
    title: "Zaza Draft vs MagicSchool",
    metaTitle: "Zaza Draft vs MagicSchool: Which AI Tool for Teachers? (2025 Comparison)",
    metaDescription:
      "Honest comparison of Zaza Draft vs MagicSchool for teachers. Compare features, pricing, ease of use, and find the best AI tool for your needs.",
    competitor: "MagicSchool",
    lastUpdated: "October 2025",
  },
  "zaza-draft-vs-chatgpt": {
    title: "Zaza Draft vs ChatGPT",
    metaTitle: "Zaza Draft vs ChatGPT: Best AI for Teacher Communication (2025)",
    metaDescription:
      "Compare Zaza Draft and ChatGPT for teacher use. Learn which tool is better for parent emails, report cards, and classroom communication.",
    competitor: "ChatGPT",
    lastUpdated: "October 2025",
  },
  "zaza-draft-vs-grammarly": {
    title: "Zaza Draft vs Grammarly",
    metaTitle: "Zaza Draft vs Grammarly: Which Writing Tool for Teachers? (2025)",
    metaDescription:
      "Detailed comparison of Zaza Draft vs Grammarly for teachers. Compare features, pricing, and find the best writing assistant for education.",
    competitor: "Grammarly",
    lastUpdated: "October 2025",
  },
}

export async function generateStaticParams() {
  return Object.keys(comparisons).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const comparison = comparisons[params.slug as keyof typeof comparisons]

  if (!comparison) {
    return {
      title: "Comparison Not Found",
    }
  }

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
  }
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const comparison = comparisons[params.slug as keyof typeof comparisons]

  if (!comparison) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-20 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: comparison.title }]}
        />

        <ComparisonClient comparison={comparison} slug={params.slug} />
      </div>
    </div>
  )
}



