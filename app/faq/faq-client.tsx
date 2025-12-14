"use client";

import { Breadcrumbs } from "@/components/breadcrumbs"
import { FAQAccordion } from "@/components/faq-accordion"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

export function FAQPageClient() {
  const { t, language } = useLanguage()

  const categories = [
    {
      title: t("faq.category.about.title"),
      items: [
        { question: t("faq.about.q1"), answer: t("faq.about.a1") },
        { question: t("faq.about.q2"), answer: t("faq.about.a2") },
        { question: t("faq.about.q3"), answer: t("faq.about.a3") },
        { question: t("faq.about.q4"), answer: t("faq.about.a4") },
        { question: t("faq.about.q5"), answer: t("faq.about.a5") },
        { question: t("faq.about.q6"), answer: t("faq.about.a6") },
        { question: t("faq.about.q7"), answer: t("faq.about.a7") },
        { question: t("faq.about.q8"), answer: t("faq.about.a8") },
        { question: t("faq.about.q9"), answer: t("faq.about.a9") },
        { question: t("faq.about.q10"), answer: t("faq.about.a10") },
        { question: t("faq.about.q11"), answer: t("faq.about.a11") },
      ],
    },
    {
      title: t("faq.category.safety.title"),
      items: [
        { question: t("faq.safety.q1"), answer: t("faq.safety.a1") },
        { question: t("faq.safety.q2"), answer: t("faq.safety.a2") },
        { question: t("faq.safety.q3"), answer: t("faq.safety.a3") },
        { question: t("faq.safety.q4"), answer: t("faq.safety.a4") },
        { question: t("faq.safety.q5"), answer: t("faq.safety.a5") },
        { question: t("faq.safety.q6"), answer: t("faq.safety.a6") },
        { question: t("faq.safety.q7"), answer: t("faq.safety.a7") },
        { question: t("faq.safety.q8"), answer: t("faq.safety.a8") },
        { question: t("faq.safety.q9"), answer: t("faq.safety.a9") },
      ],
    },
    {
      title: t("faq.category.features.title"),
      items: [
        { question: t("faq.features.q1"), answer: t("faq.features.a1") },
        { question: t("faq.features.q2"), answer: t("faq.features.a2") },
        { question: t("faq.features.q3"), answer: t("faq.features.a3") },
        { question: t("faq.features.q4"), answer: t("faq.features.a4") },
        { question: t("faq.features.q5"), answer: t("faq.features.a5") },
        { question: t("faq.features.q6"), answer: t("faq.features.a6") },
        { question: t("faq.features.q7"), answer: t("faq.features.a7") },
        { question: t("faq.features.q8"), answer: t("faq.features.a8") },
        { question: t("faq.features.q9"), answer: t("faq.features.a9") },
        { question: t("faq.features.q10"), answer: t("faq.features.a10") },
      ],
    },
    {
      title: t("faq.category.pricing.title"),
      items: [
        { question: t("faq.pricing.q1"), answer: t("faq.pricing.a1") },
        { question: t("faq.pricing.q2"), answer: t("faq.pricing.a2") },
        { question: t("faq.pricing.q3"), answer: t("faq.pricing.a3") },
        { question: t("faq.pricing.q4"), answer: t("faq.pricing.a4") },
      ],
    },
    {
      title: t("faq.category.languages.title"),
      items: [
        { question: t("faq.languages.q1"), answer: t("faq.languages.a1") },
        { question: t("faq.languages.q2"), answer: t("faq.languages.a2") },
        { question: t("faq.languages.q3"), answer: t("faq.languages.a3") },
      ],
    },
    {
      title: t("faq.category.schools.title"),
      items: [
        { question: t("faq.schools.q1"), answer: t("faq.schools.a1") },
        { question: t("faq.schools.q2"), answer: t("faq.schools.a2") },
        { question: t("faq.schools.q3"), answer: t("faq.schools.a3") },
        { question: t("faq.schools.q4"), answer: t("faq.schools.a4") },
      ],
    },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-[#0A0F1E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-[max(1.25rem,env(safe-area-inset-top))] md:pt-10 lg:pt-12 pb-16 md:pb-24">
          <Breadcrumbs
            items={[
              { label: t("nav.home"), href: "/" },
              { label: t("nav.faq"), href: "/faq" },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 mb-12">
            <p className="text-sm font-medium text-purple-400 mb-3">{t("faq.hero.eyebrow")}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{t("faq.hero.title")}</h1>
            <p className="text-lg text-gray-300 text-pretty">{t("faq.hero.subtitle")}</p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {categories.map((category, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-white mb-6">{category.title}</h2>
                <FAQAccordion items={category.items} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-3">{t("faq.cta.title")}</h3>
            <p className="text-gray-300 mb-6">{t("faq.cta.subtitle")}</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              {t("faq.cta.button")}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
