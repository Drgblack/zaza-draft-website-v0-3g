export const dynamic = 'force-dynamic';
export const metadata = {
  title: "Compare Zaza Draft with Other AI Tools | Feature Comparison",
  description:
    "Compare Zaza Draft with other AI tools for teachers. See detailed feature-by-feature comparisons to find the best tool for your needs.",
}

const comparisons = [
  {
    slug: "zaza-draft-vs-magicschool",
    title: "Zaza Draft vs MagicSchool",
    description: "Compare parent communication tools vs lesson planning focus",
    category: "AI Teaching Platforms",
  },
  {
    slug: "zaza-draft-vs-chatgpt",
    title: "Zaza Draft vs ChatGPT",
    description: "Teacher-specific AI vs general-purpose assistant",
    category: "AI Assistants",
  },
  {
    slug: "zaza-draft-vs-grammarly",
    title: "Zaza Draft vs Grammarly",
    description: "Content generation vs writing improvement",
    category: "Writing Tools",
  },
]

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#0F172A] py-20 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">Compare Zaza Draft with Other AI Tools</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Honest, detailed comparisons to help you choose the right AI tool for your teaching needs
          </p>
        </div>

        <div className="grid gap-6">
          {comparisons.map((comparison) => (
            <Link key={comparison.slug} href={`/compare/${comparison.slug}`}>
              <Card className="bg-[#1E293B] border-[#334155] p-6 hover:border-[#8B5CF6]/50 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-[#A78BFA] mb-2">{comparison.category}</div>
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                      {comparison.title}
                    </h2>
                    <p className="text-gray-400">{comparison.description}</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-500 group-hover:text-[#A78BFA] group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="bg-[#1E293B] border-[#334155] p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Don't See Your Tool?</h2>
          <p className="text-gray-400 mb-6">
            We're constantly adding new comparisons. Let us know which tools you'd like us to compare.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
          >
            Request a Comparison <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>
    </div>
  )
}

export const metadata_disabled_1: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/compare",
    languages: {
      en: "https://zazadraft.com/compare",
      de: "https://zazadraft.com/de/compare",
    },
  },
}






