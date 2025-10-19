"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items?: FAQItem[]
  faqs?: FAQItem[]
  pageSlug?: string
  id?: string
  title?: string
  schemaContext?: string
}

export function FAQSection({ items, faqs, pageSlug, id, title, schemaContext }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems = items || faqs || []

  // Generate FAQ JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <section id={id} className="scroll-mt-20">
      {title && <h2 className="mb-6 text-3xl font-bold">{title}</h2>}

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-white/10 rounded-xl bg-[#1E293B] overflow-hidden">
            <button
              onClick={() => {
                setOpenIndex(openIndex === index ? null : index)
                // Track FAQ expansion
                if (typeof window !== "undefined" && (window as any).analytics && pageSlug) {
                  ;(window as any).analytics.track("cornerstone_faq_expanded", {
                    page_slug: pageSlug,
                    question: item.question,
                  })
                }
              }}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] rounded-xl"
              aria-expanded={openIndex === index}
            >
              <span className="text-lg font-semibold text-white pr-4">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-6 pb-4 text-gray-300 leading-relaxed">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Schema */}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </section>
  )
}
