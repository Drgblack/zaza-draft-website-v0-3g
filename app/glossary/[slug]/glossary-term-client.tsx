"use client"
import { useEffect } from "react";
import Link from "next/link"
import { BookOpen, ArrowLeft, ExternalLink, GraduationCap, Video, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { analytics } from "@/lib/analytics"

interface GlossaryTerm {
  id: string
  term: string
  definition: string
  example: string
  category: string
  relatedTerms?: string[]
}

interface GlossaryTermClientProps {
  term: GlossaryTerm
  allTerms: GlossaryTerm[]
}

export function GlossaryTermClient({ term, allTerms }: GlossaryTermClientProps) {
  useEffect(() => {
    analytics.glossary.viewTerm(term.id, term.term)
  }, [term.id, term.term])

  const relatedTermsData = term.relatedTerms
    ?.map((relatedId) => allTerms.find((t) => t.id === relatedId || t.term === relatedId))
    .filter(Boolean) as GlossaryTerm[]

  const sameCategoryTerms = allTerms.filter((t) => t.category === term.category && t.id !== term.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-[#0B1220]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/glossary" className="text-gray-400 hover:text-[#A78BFA] transition-colors">
              AI Glossary
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{term.term}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#A78BFA] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Glossary
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-[#A78BFA]/10 border border-[#A78BFA]/20">
              <BookOpen className="w-6 h-6 text-[#A78BFA]" />
            </div>
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-sm text-[#A78BFA] mb-3">
                {term.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{term.term}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Definition */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Definition</h2>
                <p className="text-lg text-gray-300 leading-relaxed">{term.definition}</p>
              </div>

              {/* Example in Education */}
              <div className="rounded-xl bg-[#A78BFA]/5 border border-[#A78BFA]/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Example in Education</h2>
                <p className="text-lg text-gray-300 leading-relaxed">{term.example}</p>
              </div>

              {/* Why It Matters */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Why It Matters for Teachers</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Understanding {term.term.toLowerCase()} helps you make informed decisions about using AI in your
                  classroom. This knowledge enables you to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">
                      Evaluate AI tools more effectively and choose the right solutions for your needs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">
                      Communicate confidently with administrators and colleagues about AI adoption
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">
                      Teach students about AI literacy and prepare them for an AI-powered future
                    </span>
                  </li>
                </ul>
              </div>

              {/* Related Terms */}
              {relatedTermsData && relatedTermsData.length > 0 && (
                <div className="rounded-xl bg-white/5 border border-white/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Related Terms</h2>
                  <div className="grid gap-4">
                    {relatedTermsData.map((relatedTerm) => (
                      <Link
                        key={relatedTerm.id}
                        href={`/glossary/${relatedTerm.id}`}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#A78BFA]/30 hover:bg-white/10 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                              {relatedTerm.term}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{relatedTerm.definition}</p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#A78BFA] transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Learn More</h3>
                <div className="space-y-3">
                  <Link
                    href="/ai-literacy"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A78BFA]/30 transition-all group"
                  >
                    <GraduationCap className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm text-gray-300 group-hover:text-white">Take a Course</span>
                  </Link>
                  <Link
                    href="/webinars"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A78BFA]/30 transition-all group"
                  >
                    <Video className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm text-gray-300 group-hover:text-white">Watch Webinar</span>
                  </Link>
                  <Link
                    href="/community"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A78BFA]/30 transition-all group"
                  >
                    <Users className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm text-gray-300 group-hover:text-white">Ask Community</span>
                  </Link>
                </div>
              </div>

              {/* More in This Category */}
              {sameCategoryTerms.length > 0 && (
                <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">More in {term.category}</h3>
                  <div className="space-y-3">
                    {sameCategoryTerms.map((categoryTerm) => (
                      <Link
                        key={categoryTerm.id}
                        href={`/glossary/${categoryTerm.id}`}
                        className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A78BFA]/30 transition-all"
                      >
                        <h4 className="text-sm font-medium text-white mb-1">{categoryTerm.term}</h4>
                        <p className="text-xs text-gray-400 line-clamp-2">{categoryTerm.definition}</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/glossary?category=${encodeURIComponent(term.category)}`}
                    className="block mt-4 text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                  >
                    View all {term.category} terms →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Apply This Knowledge?</h2>
          <p className="text-lg text-gray-300 mb-8">
            See how Zaza Draft makes AI practical for your daily teaching tasks.
          </p>
          <Button size="lg" className="bg-[#A78BFA] hover:bg-[#8B5CF6] text-white text-lg px-8 py-6">
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  )
}

interface GlossaryTerm {
  id: string
  term: string
  definition: string
  example: string
  category: string
  relatedTerms?: string[]
}

interface GlossaryTermClientProps {
  term: GlossaryTerm
  allTerms: GlossaryTerm[]
}




/* removed duplicate GlossaryTermClient */

/* removed duplicate */
: GlossaryTermClientProps) {
  const { language } = useLanguage()
  useEffect(() => {
    analytics.glossary.viewTerm(term.id, term.term)
  }, [term.id, term.term])

  const relatedTermsData = term.relatedTerms
    ?.map((relatedId) => allTerms.find((t) => t.id === relatedId || t.term === relatedId))
    .filter(Boolean) as GlossaryTerm[]

  const sameCategoryTerms = allTerms.filter((t) => t.category === term.category && t.id !== term.id).slice(0, 3)

  const L = {
    en: {
      breadcrumb: "AI Glossary",
      back: "Back to Glossary",
      definition: "Definition",
      example: "Example in Education",
      whyMatters: "Why It Matters for Teachers",
      whyP1:
        "Understanding {term} helps you make informed decisions about using AI in your classroom. This knowledge enables you to:",
      whyLi1: "Evaluate AI tools more effectively and choose the right solutions for your needs",
      whyLi2: "Communicate confidently with administrators and colleagues about AI adoption",
      whyLi3: "Teach students about AI literacy and prepare them for an AI-powered future",
      related: "Related Terms",
      learnMore: "Learn More",
      takeCourse: "Take a Course",
      watchWebinar: "Watch Webinar",
      askCommunity: "Ask Community",
      moreIn: "More in",
      viewAll: "View all {category} terms",
      ctaTitle: "Ready to Apply This Knowledge?",
      ctaBody: "See how Zaza Draft makes AI practical for your daily teaching tasks.",
      ctaPrimary: "Start Free Trial",
    },
    de: {
      breadcrumb: "KI‑Glossar",
      back: "Zurück zum Glossar",
      definition: "Definition",
      example: "Beispiel aus der Bildung",
      whyMatters: "Warum es für Lehrkräfte wichtig ist",
      whyP1:
        "Mit dem Verständnis von {term} triffst du bessere Entscheidungen zum Einsatz von KI im Unterricht. Dieses Wissen hilft dir:",
      whyLi1: "KI‑Werkzeuge gezielter zu bewerten und passende Lösungen auszuwählen",
      whyLi2: "Sicher mit Schulleitung und Kollegium über KI‑Einführung zu kommunizieren",
      whyLi3: "Schülerinnen und Schüler in KI‑Kompetenz zu fördern",
      related: "Verwandte Begriffe",
      learnMore: "Mehr erfahren",
      takeCourse: "Kurs belegen",
      watchWebinar: "Webinar ansehen",
      askCommunity: "Community fragen",
      moreIn: "Mehr in",
      viewAll: "Alle Begriffe in {category} anzeigen",
      ctaTitle: "Bereit, dieses Wissen anzuwenden?",
      ctaBody: "Erlebe, wie Zaza Draft KI für deinen Unterricht konkret nutzbar macht.",
      ctaPrimary: "Kostenlos starten",
    },
  } as const

  const t = L[language]

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-[#0B1220]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/glossary" className="text-gray-400 hover:text-[#A78BFA] transition-colors">
              {t.breadcrumb}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{term.term}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#A78BFA] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-[#A78BFA]/10 border border-[#A78BFA]/20">
              <BookOpen className="w-6 h-6 text-[#A78BFA]" />
            </div>
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-sm text-[#A78BFA] mb-3">
                {term.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{term.term}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Definition */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t.definition}</h2>
                <p className="text-lg text-gray-300 leading-relaxed">{term.definition}</p>
              </div>

              {/* Example in Education */}
              <div className="rounded-xl bg-[#A78BFA]/5 border border-[#A78BFA]/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t.example}</h2>
                <p className="text-lg text-gray-300 leading-relaxed">{term.example}</p>
              </div>

              {/* Why It Matters */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t.whyMatters}</h2>
                <p className="text-gray-300 leading-relaxed mb-4">{t.whyP1.replace("{term}", term.term.toLowerCase())}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{t.whyLi1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{t.whyLi2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{t.whyLi3}</span>
                  </li>
                </ul>
              </div>

              {/* Related Terms */}
              {relatedTermsData && relatedTermsData.length > 0 && (
                <div className="rounded-xl bg-white/5 border border-white/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">{t.related}</h2>
                  <div className="grid gap-4">
                    {relatedTermsData.map((relatedTerm) => (
                      <Link
                        key={relatedTerm.id}
                        href={`/glossary/${relatedTerm.id}`}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#A78BFA]/30 hover:bg-white/10 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                              {relatedTerm.term}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{relatedTerm.definition}</p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#A78BFA] transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t.learnMore}</h3>
                <div className="space-y-3">
                  <Link
                    href="/ai-literacy"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A78BFA]/30 transition-all group"
                  >
                    <GraduationCap className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm text-gray-300 group-hover:text-white">{t.takeCourse}</span>
                  </Link>
                  <Link
                    href="/webinars"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A78BFA]/30 transition-all group"
                  >
                    <Video className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm text-gray-300 group-hover:text-white">{t.watchWebinar}</span>
                  </Link>
                  <Link
                    href="/community"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A78BFA]/30 transition-all group"
                  >
                    <Users className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm text-gray-300 group-hover:text-white">{t.askCommunity}</span>
                  </Link>
                </div>
              </div>

              {/* More in This Category */}
              {sameCategoryTerms.length > 0 && (
                <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">{t.moreIn} {term.category}</h3>
                  <div className="space-y-3">
                    {sameCategoryTerms.map((categoryTerm) => (
                      <Link
                        key={categoryTerm.id}
                        href={`/glossary/${categoryTerm.id}`}
                        className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A78BFA]/30 transition-all"
                      >
                        <h4 className="text-sm font-medium text-white mb-1">{categoryTerm.term}</h4>
                        <p className="text-xs text-gray-400 line-clamp-2">{categoryTerm.definition}</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/glossary?category=${encodeURIComponent(term.category)}`}
                    className="block mt-4 text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                  >
                    {t.viewAll.replace("{category}", term.category)}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-lg text-gray-300 mb-8">{t.ctaBody}</p>
          <Button size="lg" className="bg-[#A78BFA] hover:bg-[#8B5CF6] text-white text-lg px-8 py-6">
            {t.ctaPrimary}
          </Button>
        </div>
      </section>
    </div>
  )
}