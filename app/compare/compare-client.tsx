"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useLanguage } from "../../src/contexts/LanguageContext";

const content = {
  en: {
    breadcrumbs: "Compare",
    title: "Compare Zaza Draft with Other AI Tools",
    subtitle:
      "Honest, detailed comparisons to help you choose the right AI tool for your teaching needs",
    items: [
      {
        slug: "zaza-draft-vs-magicschool",
        title: "Zaza Draft vs MagicSchool",
        description:
          "Compare parent communication tools vs lesson planning focus",
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
    ],
    missing_tool: {
      title: "Don't See Your Tool?",
      description:
        "We're constantly adding new comparisons. Let us know which tools you'd like us to compare.",
      cta: "Request a Comparison",
    },
  },
  de: {
    breadcrumbs: "Vergleich",
    title: "Zaza Draft im Vergleich zu anderen KI-Tools",
    subtitle:
      "Ehrliche, detaillierte Vergleiche, die Ihnen helfen, das richtige KI-Tool für Ihren Unterricht zu wählen",
    items: [
      {
        slug: "zaza-draft-vs-magicschool",
        title: "Zaza Draft vs. MagicSchool",
        description:
          "Vergleich: Elternkommunikation vs. Fokus auf Unterrichtsplanung",
        category: "KI-Lehrplattformen",
      },
      {
        slug: "zaza-draft-vs-chatgpt",
        title: "Zaza Draft vs. ChatGPT",
        description: "Lehrerspezifische KI vs. allgemeiner Assistent",
        category: "KI-Assistenten",
      },
      {
        slug: "zaza-draft-vs-grammarly",
        title: "Zaza Draft vs. Grammarly",
        description: "Inhaltserstellung vs. Textverbesserung",
        category: "Schreibtools",
      },
    ],
    missing_tool: {
      title: "Ihr Tool ist nicht dabei?",
      description:
        "Wir fügen ständig neue Vergleiche hinzu. Lassen Sie uns wissen, welche Tools wir vergleichen sollen.",
      cta: "Vergleich anfragen",
    },
  },
};

export function CompareClient() {
  const { language } = useLanguage();
  const isGerman = language === "de";
  const text = isGerman ? content.de : content.en;

  return (
    <div className="min-h-screen bg-[#0F172A] py-20 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Breadcrumbs
          items={[
            {
              label: isGerman ? "Startseite" : "Home",
              href: isGerman ? "/de" : "/",
            },
            { label: text.breadcrumbs },
          ]}
        />

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            {text.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid gap-6">
          {text.items.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`${isGerman ? "/de" : ""}/compare/${comparison.slug}`}
            >
              <Card className="bg-[#1E293B] border-[#334155] p-6 hover:border-[#8B5CF6]/50 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-[#A78BFA] mb-2">
                      {comparison.category}
                    </div>
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
          <h2 className="text-2xl font-bold text-white mb-4">
            {text.missing_tool.title}
          </h2>
          <p className="text-gray-400 mb-6">{text.missing_tool.description}</p>
          <Link
            href={isGerman ? "/de/contact" : "/contact"}
            className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
          >
            {text.missing_tool.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>
    </div>
  );
}

