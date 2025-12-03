"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-white/10 rounded-xl bg-[#111827] overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="text-lg font-medium text-white pr-4">{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && <div className="px-6 pb-4 text-gray-300 leading-relaxed">{item.answer}</div>}
        </div>
      ))}
    </div>
  )
}

