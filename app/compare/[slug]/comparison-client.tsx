"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle } from "lucide-react";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ComparisonProps {
  comparison: {
    title: string;
    competitor: string;
    lastUpdated: string;
  };
  slug: string;
}

const content = {
  en: {
    ui: {
      hero_suffix: ": Which is Better for Teachers?",
      hero_sub:
        "An honest, feature-by-feature comparison to help you choose the right AI tool for your classroom.",
      last_updated: "Last Updated:",
      quick_summary_title: "Quick Summary",
      disclaimer:
        "We believe in honest comparisons. This page includes both our strengths and where competitors excel.",
      table_title: "Quick Comparison",
      feature_header: "Feature",
      legend: {
        strong: "Strong feature",
        limited: "Limited or basic feature",
        none: "Not available",
      },
      verdict_title: "So Which Should You Choose?",
      choose_zaza: "Choose Zaza Draft if:",
      choose_competitor: "Choose {competitor} if:",
      try_before_buy_title: "Try Before You Buy",
      try_before_buy_text:
        "Both tools offer free trials. We recommend trying both to see which fits your workflow better. There's no wrong choice - just different tools for different needs.",
      faq_title: "Frequently Asked Questions",
      cta_try_title: "Try Zaza Draft",
      cta_try_sub: "14-day free trial, no credit card required",
      cta_button: "Start Free Trial",
      cta_pricing: "See pricing",
      cta_help_title: "Need Help Deciding?",
      cta_help_sub: "Calculate your potential time and cost savings",
      cta_roi: "Calculate Your ROI",
      cta_contact: "Or talk to our team",
    },
    verdict_zaza: [
      "Parent communication is your biggest time drain",
      "You write lots of report cards or student assessments",
      "You work with multilingual families",
      "Your district has strict compliance requirements",
    ],
    comparisons: {
      "zaza-draft-vs-magicschool": {
        quickSummary: [
          "Best for parent communication & reports: Zaza Draft",
          "Best for lesson planning & classroom activities: MagicSchool",
          "Best for overall flexibility: Try both for different use cases",
        ],
        mainFeatures: [
          {
            feature: "Primary Focus",
            zaza: "Parent communication, reports",
            competitor: "Lesson plans, classroom tools",
          },
          {
            feature: "Parent Email Templates",
            zaza: { icon: "check", text: "50+ specialized" },
            competitor: { icon: "warning", text: "Basic (10-15)" },
          },
          {
            feature: "Report Card Comments",
            zaza: { icon: "check", text: "Advanced generation" },
            competitor: { icon: "check", text: "Good templates" },
          },
          {
            feature: "Lesson Planning",
            zaza: { icon: "warning", text: "Basic (see Zaza Teach)" },
            competitor: { icon: "check", text: "Extensive library" },
          },
          {
            feature: "Translation",
            zaza: { icon: "check", text: "40+ languages" },
            competitor: { icon: "warning", text: "Limited languages" },
          },
          {
            feature: "Tone Guidance",
            zaza: { icon: "check", text: "Advanced sensitivity" },
            competitor: { icon: "warning", text: "Basic" },
          },
          {
            feature: "FERPA Compliance",
            zaza: { icon: "check", text: "Built-in safeguards" },
            competitor: { icon: "check", text: "Compliant" },
          },
          {
            feature: "Pricing (Individual)",
            zaza: "$19/month",
            competitor: "$99/year",
          },
          {
            feature: "Free Trial",
            zaza: { icon: "check", text: "14 days" },
            competitor: { icon: "check", text: "Limited features" },
          },
          {
            feature: "Best For",
            zaza: "Communication-focused",
            competitor: "Lesson-focused",
          },
        ],
        faqs: [
          {
            question: "Can I use both Zaza Draft and MagicSchool together?",
            answer:
              "Many teachers use MagicSchool for lesson planning and Zaza Draft for parent communication. They serve different purposes and complement each other well.",
          },
          {
            question: "Which is better for new teachers?",
            answer:
              "Zaza Draft has a gentler learning curve for communication tasks. MagicSchool offers more tools but requires more time to explore. Both are beginner-friendly.",
          },
          {
            question: "Do both tools work on mobile devices?",
            answer:
              "Yes. Both have mobile-friendly web interfaces. Zaza Draft also offers dedicated iOS and Android apps.",
          },
          {
            question: "Which has better translation features?",
            answer:
              "Zaza Draft supports 40+ languages with high-quality translation for parent communication. MagicSchool offers 8-10 languages focused on instructional content.",
          },
        ],
        verdict_competitor: [
          "Lesson planning takes most of your time",
          "You need comprehensive classroom activity tools",
          "You want one tool for many teaching tasks",
        ],
      },
      "zaza-draft-vs-chatgpt": {
        quickSummary: [
          "Best for teacher-specific workflows: Zaza Draft",
          "Best for general AI assistance: ChatGPT",
          "Best for compliance & privacy: Zaza Draft with built-in safeguards",
        ],
        mainFeatures: [
          {
            feature: "Primary Focus",
            zaza: "Teacher communication & reports",
            competitor: "General AI assistant",
          },
          {
            feature: "Teacher Templates",
            zaza: { icon: "check", text: "50+ pre-built" },
            competitor: { icon: "warning", text: "Build your own" },
          },
          {
            feature: "Privacy Controls",
            zaza: { icon: "check", text: "FERPA-aware, PII redaction" },
            competitor: { icon: "warning", text: "General data policy" },
          },
          {
            feature: "Tone Guidance",
            zaza: { icon: "check", text: "Teacher-parent specific" },
            competitor: { icon: "warning", text: "General tone options" },
          },
          {
            feature: "Translation",
            zaza: { icon: "check", text: "40+ languages" },
            competitor: { icon: "check", text: "100+ languages" },
          },
          {
            feature: "Learning Curve",
            zaza: "15-20 minutes",
            competitor: "30-45 minutes",
          },
          {
            feature: "Pricing",
            zaza: "$19/month",
            competitor: "$20/month (Plus)",
          },
        ],
        faqs: [
          {
            question: "Is Zaza Draft just ChatGPT with templates?",
            answer:
              "No. While both use AI, Zaza Draft is purpose-built for teachers with FERPA-aware privacy controls, teacher-specific templates, tone guidance for parent communication, and built-in safeguards that ChatGPT doesn't have.",
          },
          {
            question: "Can I use ChatGPT for parent emails?",
            answer:
              "You can, but you'll need to craft prompts carefully each time and manually ensure FERPA compliance. Zaza Draft handles this automatically with pre-built templates and privacy controls.",
          },
          {
            question: "Which is better for lesson planning?",
            answer:
              "ChatGPT offers more flexibility for general lesson planning. For teacher-specific workflows, check out Zaza Teach, which is purpose-built for educators.",
          },
        ],
        verdict_competitor: [
          "You need a general-purpose AI assistant",
          "You're comfortable crafting your own prompts",
          "You use AI for tasks beyond teaching",
        ],
      },
      "zaza-draft-vs-grammarly": {
        quickSummary: [
          "Best for teacher communication: Zaza Draft",
          "Best for general writing improvement: Grammarly",
          "Best for education-specific content: Zaza Draft with templates",
        ],
        mainFeatures: [
          {
            feature: "Primary Focus",
            zaza: "Teacher communication & reports",
            competitor: "General writing assistant",
          },
          {
            feature: "Content Generation",
            zaza: { icon: "check", text: "Full drafts from scratch" },
            competitor: { icon: "warning", text: "Editing only" },
          },
          {
            feature: "Teacher Templates",
            zaza: { icon: "check", text: "50+ specialized" },
            competitor: { icon: "x", text: "None" },
          },
          {
            feature: "Tone Adjustment",
            zaza: { icon: "check", text: "Parent-specific guidance" },
            competitor: { icon: "check", text: "General tone detector" },
          },
          {
            feature: "Translation",
            zaza: { icon: "check", text: "40+ languages" },
            competitor: { icon: "x", text: "English only" },
          },
          {
            feature: "Grammar Checking",
            zaza: { icon: "warning", text: "Basic" },
            competitor: { icon: "check", text: "Advanced" },
          },
          { feature: "Pricing", zaza: "$19/month", competitor: "$12-30/month" },
        ],
        faqs: [
          {
            question: "Can I use both Zaza Draft and Grammarly together?",
            answer:
              "Yes! Many teachers use Zaza Draft to generate parent emails and reports, then run them through Grammarly for a final grammar check.",
          },
          {
            question: "Does Grammarly generate content like Zaza Draft?",
            answer:
              "No. Grammarly is an editing tool that improves existing text. Zaza Draft generates complete drafts from scratch based on your input.",
          },
          {
            question: "Which is better for report card comments?",
            answer:
              "Zaza Draft is purpose-built for this with specialized templates and personalization. Grammarly can only edit comments you've already written.",
          },
        ],
        verdict_competitor: [
          "You primarily need grammar and style checking",
          "You already write your own content",
          "You want advanced writing improvement suggestions",
        ],
      },
    },
  },
  de: {
    ui: {
      hero_suffix: ": Welches ist besser für Lehrer?",
      hero_sub:
        "Ein ehrlicher Funktionsvergleich, der Ihnen hilft, das richtige KI-Tool für Ihr Klassenzimmer auszuwählen.",
      last_updated: "Zuletzt aktualisiert:",
      quick_summary_title: "Zusammenfassung",
      disclaimer:
        "Wir glauben an ehrliche Vergleiche. Diese Seite enthält sowohl unsere Stärken als auch die Bereiche, in denen Wettbewerber glänzen.",
      table_title: "Schnellvergleich",
      feature_header: "Funktion",
      legend: {
        strong: "Starke Funktion",
        limited: "Eingeschränkte oder grundlegende Funktion",
        none: "Nicht verfügbar",
      },
      verdict_title: "Welches sollten Sie wählen?",
      choose_zaza: "Wählen Sie Zaza Draft, wenn:",
      choose_competitor: "Wählen Sie {competitor}, wenn:",
      try_before_buy_title: "Erst testen, dann kaufen",
      try_before_buy_text:
        "Beide Tools bieten kostenlose Testphasen. Wir empfehlen, beide auszuprobieren, um zu sehen, welches besser zu Ihrem Arbeitsablauf passt.",
      faq_title: "Häufig gestellte Fragen",
      cta_try_title: "Zaza Draft testen",
      cta_try_sub: "14 Tage kostenlos testen, keine Kreditkarte erforderlich",
      cta_button: "Kostenlos starten",
      cta_pricing: "Preise ansehen",
      cta_help_title: "Entscheidungshilfe benötigt?",
      cta_help_sub: "Berechnen Sie Ihre mögliche Zeit- und Kostenersparnis",
      cta_roi: "ROI berechnen",
      cta_contact: "Oder kontaktieren Sie unser Team",
    },
    verdict_zaza: [
      "Elternkommunikation Ihr größter Zeitfresser ist",
      "Sie viele Zeugnisse oder Schülerbewertungen schreiben",
      "Sie mit mehrsprachigen Familien arbeiten",
      "Ihr Bezirk strenge Compliance-Anforderungen hat",
    ],
    comparisons: {
      "zaza-draft-vs-magicschool": {
        quickSummary: [
          "Beste für Elternkommunikation & Berichte: Zaza Draft",
          "Beste für Unterrichtsplanung & Aktivitäten: MagicSchool",
          "Beste für Gesamtflexibilität: Probieren Sie beide für verschiedene Zwecke",
        ],
        mainFeatures: [
          {
            feature: "Hauptfokus",
            zaza: "Elternkommunikation, Berichte",
            competitor: "Unterrichtspläne, Klassenzimmer-Tools",
          },
          {
            feature: "Eltern-E-Mail-Vorlagen",
            zaza: { icon: "check", text: "50+ spezialisiert" },
            competitor: { icon: "warning", text: "Basis (10-15)" },
          },
          {
            feature: "Zeugniskommentare",
            zaza: { icon: "check", text: "Fortgeschrittene Generierung" },
            competitor: { icon: "check", text: "Gute Vorlagen" },
          },
          {
            feature: "Unterrichtsplanung",
            zaza: { icon: "warning", text: "Basis (siehe Zaza Teach)" },
            competitor: { icon: "check", text: "Umfangreiche Bibliothek" },
          },
          {
            feature: "Übersetzung",
            zaza: { icon: "check", text: "40+ Sprachen" },
            competitor: { icon: "warning", text: "Begrenzte Sprachen" },
          },
          {
            feature: "Tonfall-Anleitung",
            zaza: { icon: "check", text: "Fortgeschrittene Sensibilität" },
            competitor: { icon: "warning", text: "Basis" },
          },
          {
            feature: "Datenschutz (FERPA/DSGVO)",
            zaza: { icon: "check", text: "Eingebaute Schutzmaßnahmen" },
            competitor: { icon: "check", text: "Konform" },
          },
          {
            feature: "Preis (Einzelperson)",
            zaza: "19€/Monat",
            competitor: "99€/Jahr",
          },
          {
            feature: "Kostenlose Testphase",
            zaza: { icon: "check", text: "14 Tage" },
            competitor: { icon: "check", text: "Eingeschränkte Funktionen" },
          },
          {
            feature: "Am besten für",
            zaza: "Kommunikationsfokus",
            competitor: "Unterrichtsfokus",
          },
        ],
        faqs: [
          {
            question: "Kann ich Zaza Draft und MagicSchool zusammen verwenden?",
            answer:
              "Viele Lehrer nutzen MagicSchool für die Unterrichtsplanung und Zaza Draft für die Elternkommunikation. Sie dienen unterschiedlichen Zwecken und ergänzen sich gut.",
          },
          {
            question: "Welches ist besser für neue Lehrer?",
            answer:
              "Zaza Draft hat eine flachere Lernkurve für Kommunikationsaufgaben. MagicSchool bietet mehr Tools, erfordert aber mehr Zeit zum Erkunden. Beide sind einsteigerfreundlich.",
          },
          {
            question: "Funktionieren beide Tools auf Mobilgeräten?",
            answer:
              "Ja. Beide haben mobilfreundliche Webinterfaces. Zaza Draft bietet auch spezielle iOS- und Android-Apps.",
          },
          {
            question: "Wer hat bessere Übersetzungsfunktionen?",
            answer:
              "Zaza Draft unterstützt 40+ Sprachen mit hochwertiger Übersetzung für die Elternkommunikation. MagicSchool bietet 8-10 Sprachen mit Fokus auf Unterrichtsinhalte.",
          },
        ],
        verdict_competitor: [
          "Unterrichtsplanung den Großteil Ihrer Zeit in Anspruch nimmt",
          "Sie umfassende Tools für Klassenaktivitäten benötigen",
          "Sie ein Tool für viele verschiedene Lehraufgaben wünschen",
        ],
      },
      "zaza-draft-vs-chatgpt": {
        quickSummary: [
          "Beste für lehrerspezifische Abläufe: Zaza Draft",
          "Beste für allgemeine KI-Assistenz: ChatGPT",
          "Beste für Compliance & Datenschutz: Zaza Draft mit eingebauten Schutzmaßnahmen",
        ],
        mainFeatures: [
          {
            feature: "Hauptfokus",
            zaza: "Lehrerkommunikation & Berichte",
            competitor: "Allgemeiner KI-Assistent",
          },
          {
            feature: "Lehrer-Vorlagen",
            zaza: { icon: "check", text: "50+ vorgefertigt" },
            competitor: { icon: "warning", text: "Selbst erstellen" },
          },
          {
            feature: "Datenschutzkontrollen",
            zaza: { icon: "check", text: "FERPA-ready, PII-Redaktion" },
            competitor: { icon: "warning", text: "Allgemeine Datenrichtlinie" },
          },
          {
            feature: "Tonfall-Anleitung",
            zaza: { icon: "check", text: "Lehrer-Eltern-spezifisch" },
            competitor: { icon: "warning", text: "Allgemeine Tonoptionen" },
          },
          {
            feature: "Übersetzung",
            zaza: { icon: "check", text: "40+ Sprachen" },
            competitor: { icon: "check", text: "100+ Sprachen" },
          },
          {
            feature: "Lernkurve",
            zaza: "15-20 Minuten",
            competitor: "30-45 Minuten",
          },
          {
            feature: "Preis",
            zaza: "19€/Monat",
            competitor: "20€/Monat (Plus)",
          },
        ],
        faqs: [
          {
            question: "Ist Zaza Draft einfach nur ChatGPT mit Vorlagen?",
            answer:
              "Nein. Waehrend beide KI nutzen, ist Zaza Draft speziell fuer Lehrer entwickelt, mit FERPA-ready Datenschutzkontrollen, lehrerspezifischen Vorlagen, Tonfall-Anleitung fuer Elternkommunikation und eingebauten Schutzmassnahmen, die ChatGPT nicht hat.",
          },
          {
            question: "Kann ich ChatGPT für Eltern-E-Mails verwenden?",
            answer:
              "Sie können, aber Sie müssen die Prompts jedes Mal sorgfältig erstellen und manuell die FERPA-Konformität sicherstellen. Zaza Draft erledigt dies automatisch mit vorgefertigten Vorlagen und Datenschutzkontrollen.",
          },
          {
            question: "Welches ist besser für die Unterrichtsplanung?",
            answer:
              "ChatGPT bietet mehr Flexibilität für allgemeine Unterrichtsplanung. Für lehrerspezifische Arbeitsabläufe schauen Sie sich Zaza Teach an, das speziell für Pädagogen entwickelt wurde.",
          },
        ],
        verdict_competitor: [
          "Sie einen allgemeinen KI-Assistenten benötigen",
          "Sie gerne eigene Prompts erstellen",
          "Sie KI für Aufgaben außerhalb des Unterrichts nutzen",
        ],
      },
      "zaza-draft-vs-grammarly": {
        quickSummary: [
          "Beste für Lehrerkommunikation: Zaza Draft",
          "Beste für allgemeine Textverbesserung: Grammarly",
          "Beste für bildungsspezifische Inhalte: Zaza Draft mit Vorlagen",
        ],
        mainFeatures: [
          {
            feature: "Hauptfokus",
            zaza: "Lehrerkommunikation & Berichte",
            competitor: "Allgemeiner Schreibassistent",
          },
          {
            feature: "Inhaltserstellung",
            zaza: { icon: "check", text: "Komplette Entwürfe von Grund auf" },
            competitor: { icon: "warning", text: "Nur Bearbeitung" },
          },
          {
            feature: "Lehrer-Vorlagen",
            zaza: { icon: "check", text: "50+ spezialisiert" },
            competitor: { icon: "x", text: "Keine" },
          },
          {
            feature: "Tonfall-Anpassung",
            zaza: { icon: "check", text: "Elternspezifische Anleitung" },
            competitor: { icon: "check", text: "Allgemeiner Ton-Detektor" },
          },
          {
            feature: "Übersetzung",
            zaza: { icon: "check", text: "40+ Sprachen" },
            competitor: { icon: "x", text: "Nur Englisch" },
          },
          {
            feature: "Grammatikprüfung",
            zaza: { icon: "warning", text: "Basis" },
            competitor: { icon: "check", text: "Fortgeschritten" },
          },
          { feature: "Preis", zaza: "19€/Monat", competitor: "12-30€/Monat" },
        ],
        faqs: [
          {
            question: "Kann ich Zaza Draft und Grammarly zusammen verwenden?",
            answer:
              "Ja! Viele Lehrer nutzen Zaza Draft, um Eltern-E-Mails und Berichte zu erstellen, und lassen sie dann für eine letzte Prüfung durch Grammarly laufen.",
          },
          {
            question: "Erstellt Grammarly Inhalte wie Zaza Draft?",
            answer:
              "Nein. Grammarly ist ein Bearbeitungstool, das bestehenden Text verbessert. Zaza Draft erstellt vollständige Entwürfe von Grund auf basierend auf Ihren Eingaben.",
          },
          {
            question: "Welches ist besser für Zeugniskommentare?",
            answer:
              "Zaza Draft ist dafür konzipiert, mit spezialisierten Vorlagen und Personalisierung. Grammarly kann nur Kommentare bearbeiten, die Sie bereits geschrieben haben.",
          },
        ],
        verdict_competitor: [
          "Sie primär Grammatik- und Stilprüfung benötigen",
          "Sie Ihre Inhalte bereits selbst schreiben",
          "Sie fortgeschrittene Verbesserungsvorschläge wünschen",
        ],
      },
    },
  },
};

export function ComparisonClient({ comparison, slug }: ComparisonProps) {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith("/de") ?? false;
  const text = isGerman ? content.de : content.en;

  const isMagicSchool = slug === "zaza-draft-vs-magicschool";
  const isChatGPT = slug === "zaza-draft-vs-chatgpt";
  const isGrammarly = slug === "zaza-draft-vs-grammarly";

  // Retrieve the specific comparison data based on the slug
  // Use keyof cast to safely access the object
  const comparisonData =
    text.comparisons[slug as keyof typeof text.comparisons];

  if (!comparisonData) return null;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          {comparison.title} {text.ui.hero_suffix}
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          {text.ui.hero_sub}
        </p>
        <p className="text-sm text-gray-500">
          {text.ui.last_updated} {comparison.lastUpdated}
        </p>

        {/* Quick Summary Box */}
        <Card className="bg-[#1E293B] border-[#334155] p-6 text-left">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-[#A78BFA]" />
            {text.ui.quick_summary_title}
          </h2>
          <ul className="space-y-2">
            {comparisonData.quickSummary.map((item, index) => (
              <li key={index} className="text-gray-300 flex items-start gap-2">
                <span className="text-[#A78BFA] mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-4 italic">
            {text.ui.disclaimer}
          </p>
        </Card>
      </div>

      {/* Quick Comparison Table */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">
          {text.ui.table_title}
        </h2>
        <Card className="bg-[#1E293B] border-[#334155] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0F172A]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    {text.ui.feature_header}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Zaza Draft
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    {comparison.competitor}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {comparisonData.mainFeatures.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#334155]/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {typeof row.zaza === "string" ? (
                        row.zaza
                      ) : (
                        <div className="flex items-center gap-2">
                          {row.zaza.icon === "check" && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                          {row.zaza.icon === "warning" && (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          {row.zaza.icon === "x" && (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                          <span>{row.zaza.text}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {typeof row.competitor === "string" ? (
                        row.competitor
                      ) : (
                        <div className="flex items-center gap-2">
                          {row.competitor.icon === "check" && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                          {row.competitor.icon === "warning" && (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          {row.competitor.icon === "x" && (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                          <span>{row.competitor.text}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            <span className="inline-flex items-center gap-1">
              <Check className="h-4 w-4 text-green-500" /> ={" "}
              {text.ui.legend.strong}
            </span>
            {" • "}
            <span className="inline-flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-yellow-500" /> ={" "}
              {text.ui.legend.limited}
            </span>
            {" • "}
            <span className="inline-flex items-center gap-1">
              <X className="h-4 w-4 text-red-500" /> = {text.ui.legend.none}
            </span>
          </p>
        </div>
      </div>

      {/* The Verdict */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">
          {text.ui.verdict_title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-[#1E293B] border-[#8B5CF6] p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {text.ui.choose_zaza}
            </h3>
            <ul className="space-y-3">
              {text.verdict_zaza.map((item, i) => (
                <li key={i} className="text-gray-300 flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-[#1E293B] border-[#334155] p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {text.ui.choose_competitor.replace(
                "{competitor}",
                comparison.competitor,
              )}
            </h3>
            <ul className="space-y-3">
              {comparisonData.verdict_competitor.map((item, i) => (
                <li key={i} className="text-gray-300 flex items-start gap-2">
                  <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="bg-[#1E293B] border-[#334155] p-6 mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            {text.ui.try_before_buy_title}
          </h3>
          <p className="text-gray-300">{text.ui.try_before_buy_text}</p>
        </Card>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">
          {text.ui.faq_title}
        </h2>
        <FAQSection faqs={comparisonData.faqs} pageSlug={slug} />
      </div>

      {/* CTA Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] border-0 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            {text.ui.cta_try_title}
          </h3>
          <p className="text-white/90 mb-6">{text.ui.cta_try_sub}</p>
          <Button
            asChild
            className="bg-white text-[#8B5CF6] hover:bg-gray-100 font-semibold"
          >
            <Link href="/pricing">{text.ui.cta_button}</Link>
          </Button>
          <p className="text-sm text-white/70 mt-4">
            <Link href="/pricing" className="underline hover:text-white">
              {text.ui.cta_pricing}
            </Link>
          </p>
        </Card>

        <Card className="bg-[#1E293B] border-[#334155] p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            {text.ui.cta_help_title}
          </h3>
          <p className="text-gray-300 mb-6">{text.ui.cta_help_sub}</p>
          <Button
            asChild
            variant="outline"
            className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
          >
            <Link href="/roi-calculator">{text.ui.cta_roi}</Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            <Link href="/contact" className="underline hover:text-gray-300">
              {text.ui.cta_contact}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
