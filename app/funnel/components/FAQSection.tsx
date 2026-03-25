"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "What is Zaza Draft?",
    answer:
      "Zaza Draft is a teacher-first AI writing assistant designed to help with high-stakes school communication like parent emails, sensitive replies, and report comments.",
  },
  {
    question: "Who is this for?",
    answer:
      "It is built for teachers who are under pressure and want support writing clear, calm, professional messages they will not regret sending later.",
  },
  {
    question: "Does it replace my judgement?",
    answer:
      "No. Zaza Draft is designed as a co-writer, not a replacement. It helps you reduce risk, improve tone, and communicate more safely.",
  },
  {
    question: "Can I use it for parent communication?",
    answer:
      "Yes. That is one of its main use cases. It is especially helpful when emotions are high, stakes are high, or wording needs to be careful.",
  },
  {
    question: "Is this only for burnt-out teachers?",
    answer:
      "No. But it is especially relevant for teachers who feel stretched, tired, or anxious about getting the wording wrong in difficult situations.",
  },
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  return (
    <section className="w-full px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-calm-800">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-calm-600">
            Clear answers for teachers who want the calmest way to write under
            pressure.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);

            return (
              <Card
                key={faq.question}
                className="glass overflow-hidden rounded-[1.5rem]"
              >
                <CardContent className="p-0">
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-medium text-calm-800"
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 text-2xl leading-none text-zaza-600">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-0 text-sm leading-7 text-calm-600">
                      {faq.answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
