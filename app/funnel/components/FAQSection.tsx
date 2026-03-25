"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { FunnelCopy } from "../content";

type FAQSectionProps = {
  copy: FunnelCopy["faq"];
};

export default function FAQSection({ copy }: FAQSectionProps) {
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
            {copy.title}
          </h2>
          <p className="mt-4 text-lg text-calm-600">{copy.subtitle}</p>
        </div>

        <div className="space-y-4">
          {copy.items.map((faq, index) => {
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
