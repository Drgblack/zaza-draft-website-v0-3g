"use client";

import React from "react";
import Image from "next/image";
import { Check, X, Star, Shield, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQSection, type FAQItem } from "@/components/faq-section";
import { TableOfContents } from "@/components/table-of-contents";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- CONTENT DICTIONARY ---
const content = {
  en: {
    meta_updated: "Updated November 2025",
    hero_title: "Best AI Tool for Parent Emails in 2025",
    hero_subtitle:
      "Find the AI assistant purpose-built for teacher-parent communication, tone control, and FERPA/GDPR compliance.",
    cta_primary: "Try Zaza Draft Free",
    cta_secondary: "See Comparison",
    quick_answer:
      "Zaza Draft is the best tool, offering teacher-specific templates, FERPA compliance, and automated tone control. Generic tools like ChatGPT are too risky for sensitive communication.",
    why_stress_title: "Why Parent Emails Cause Teacher Stress",
    why_stress_points: [
      {
        title: "Finding the Right Words",
        description:
          "It’s hard to find the right words to be both honest and encouraging at the same time. The pressure to get the tone right causes major delays.",
        icon: "X",
      },
      {
        title: "Breaking Consistency",
        description:
          "Writing consistency across 40+ parents, 3 different contexts (email, report, message) while managing your time is near impossible.",
        icon: "X",
      },
      {
        title: "Time and Wellbeing",
        description:
          "Emails take up personal time on evenings and weekends. This ambiguity is a significant drain on teacher wellbeing.",
        icon: "X",
      },
    ],
    how_ai_helps_title: "How AI Helps Write Clear, Empathetic Messages",
    ai_features: [
      {
        title: "Instant Drafts",
        description:
          "Instantly drafts clear, professional emails from a few bullet points, saving 60-70% of the writing time.",
        icon: "Zap",
      },
      {
        title: "Tone Control",
        description:
          "Provides precise control over formality, warmth, and directness, ensuring the right message every time.",
        icon: "Shield",
      },
      {
        title: "Saves Time",
        description:
          "Saves 60-70% of the time usually spent drafting, reviewing, and worrying about parent communication.",
        icon: "TrendingUp",
      },
    ],
    comparison_title: "Comparison: Zaza Draft vs. other tools",
    comparison_features: [
      "Teacher Templates",
      "FERPA Compliant",
      "Tone Control",
      "Multi-language",
      "Free Tier",
      "Price (Premium)",
    ],
    comparison_tools: [
      {
        name: "Zaza Draft",
        template: "Check",
        ferpa: "Check",
        tone: "Check",
        multi: "Check",
        free: "Check",
        price: "$16/mo",
      },
      {
        name: "ChatGPT",
        template: "X",
        ferpa: "X",
        tone: "Manual",
        multi: "Check",
        free: "Check",
        price: "$20/mo",
      },
      {
        name: "Claude",
        template: "X",
        ferpa: "X",
        tone: "Manual",
        multi: "Check",
        free: "Check",
        price: "$20/mo",
      },
      {
        name: "Grammarly",
        template: "X",
        ferpa: "Check",
        tone: "Check",
        multi: "Limited",
        free: "Check",
        price: "$30/mo",
      },
    ],
    safeguards_title: "Safeguards for tone, clarity, and professionalism",
    safeguards_points: [
      "**Tone Calibration:** Automatically adjusts formality, warmth, and directness to ensure the email is received as intended.",
      "**Clarity & Structure:** Organises bullet points into clear, professional paragraphs with appropriate headings and closing remarks.",
      "**Multi-lingual Drafts:** Generate drafts in 10+ languages while maintaining the specified tone and structure.",
    ],
    testimonials_title: "Real teacher testimonials",
    testimonials: [
      {
        quote:
          "Zaza Draft cut my parent email time from 2 hours to 30 minutes per week. The templates understand teacher language and the tone control is perfect for sensitive situations.",
        name: "Sarah M.",
        role: "4th Grade Teacher, Texas",
        image: "/testimonials/sarah-teacher.jpg",
      },
      {
        quote:
          "I use Zaza Draft for parent communication and ChatGPT for lesson planning. Together they save me 6-7 hours per week. Game changer for work-life balance.",
        name: "Jessica T.",
        role: "High School English, California",
        image: "/testimonials/maria-teacher.jpg",
      },
    ],
    faq_title: "Frequently Asked Questions",
    faqs: [
      {
        question: "Is Zaza Draft FERPA compliant?",
        answer:
          "Yes. It does not require student names (initials or pseudonyms are used) and data is encrypted and never used for training. This makes it a safe option for educational use.",
      },
      {
        question: "How much time can I save?",
        answer:
          "Teachers typically report saving 5-8 hours per week on communication alone, depending on their existing workload.",
      },
      {
        question: "Does it work in my native language?",
        answer:
          "Yes, Zaza Draft supports drafting and translating communication in over 10 languages while preserving the intended tone.",
      },
      {
        question: "Can I use it for report cards?",
        answer:
          "Yes, while Zaza Draft excels at shorter communication, our GradeFlow product is specifically designed for long-form student reports.",
      },
    ],
    continue_learning_title: "Continue Learning",
    related_guides: [
      {
        title: "Reduce Stress with AI Messages",
        href: "/reduce-stress-parent-messages",
      },
      { title: "AI for Student Reports", href: "/ai-for-student-reports" },
    ],
    cta_final_title: "Write better parent emails in less time",
    cta_final_subtitle: "Start your free trial today. No credit card required.",
    cta_final_button: "Start Free Trial",
    breadcrumb_label: "Learning Centre",
    sidebar_cta_title: "Try Zaza Draft",
    sidebar_cta_subtitle:
      "Purpose-built for teachers. FERPA compliant. Free to start.",
    sidebar_cta_button: "Start Free",
    sidebar_resource_full: "Full Learning Centre",
  },
  de: {
    meta_updated: "Aktualisiert: November 2025",
    hero_title: "Das beste KI-Tool für Eltern-E-Mails 2025",
    hero_subtitle:
      "Finden Sie den KI-Assistenten, der speziell für die Lehrer-Eltern-Kommunikation, Tonfallkontrolle und DSGVO-Konformität entwickelt wurde.",
    cta_primary: "Zaza Draft kostenlos testen",
    cta_secondary: "Vergleich ansehen",
    quick_answer:
      "Zaza Draft ist das beste Tool, da es Lehrerspezifische Vorlagen, DSGVO-Konformität und automatische Tonfallkontrolle bietet. Generische Tools wie ChatGPT sind für sensible Kommunikation zu riskant.",
    why_stress_title: "Warum Eltern-E-Mails bei Lehrern Stress verursachen",
    why_stress_points: [
      {
        title: "Die richtigen Worte finden",
        description:
          "Es ist schwierig, die richtigen Worte zu finden, um gleichzeitig ehrlich und ermutigend zu sein. Der Druck, den richtigen Ton zu treffen, führt zu großen Verzögerungen.",
        icon: "X",
      },
      {
        title: "Konsistenz wahren",
        description:
          "Es ist nahezu unmöglich, die Konsistenz des Schreibens bei über 40 Eltern, 3 verschiedenen Kontexten (E-Mail, Bericht, Nachricht) und gleichzeitigem Zeitmanagement aufrechtzuerhalten.",
        icon: "X",
      },
      {
        title: "Zeit und Wohlbefinden",
        description:
          "E-Mails beanspruchen persönliche Zeit an Abenden und Wochenenden. Diese Unklarheit ist eine erhebliche Belastung für das Wohlbefinden der Lehrer.",
        icon: "X",
      },
    ],
    how_ai_helps_title:
      "Wie KI hilft, klare, empathische Nachrichten zu verfassen",
    ai_features: [
      {
        title: "Sofortige Entwürfe",
        description:
          "Erstellt sofort klare, professionelle E-Mail-Entwürfe aus wenigen Stichpunkten, wodurch 60-70 % der Schreibzeit eingespart werden.",
        icon: "Zap",
      },
      {
        title: "Tonfallkontrolle",
        description:
          "Bietet präzise Kontrolle über Formalität, Wärme und Direktheit, um sicherzustellen, dass die Nachricht jedes Mal richtig ankommt.",
        icon: "Shield",
      },
      {
        title: "Spart Zeit",
        description:
          "Spart 60-70 % der Zeit, die normalerweise für das Entwerfen, Überprüfen und Sorgenmachen über die Elternkommunikation aufgewendet wird.",
        icon: "TrendingUp",
      },
    ],
    comparison_title: "Vergleich: Zaza Draft vs. andere Tools",
    comparison_features: [
      "Lehrer-Vorlagen",
      "DSGVO-Konform",
      "Tonfallkontrolle",
      "Mehrsprachig",
      "Kostenlose Stufe",
      "Preis (Premium)",
    ],
    comparison_tools: [
      {
        name: "Zaza Draft",
        template: "Check",
        ferpa: "Check",
        tone: "Check",
        multi: "Check",
        free: "Check",
        price: "€14.99/Monat",
      },
      {
        name: "ChatGPT",
        template: "X",
        ferpa: "X",
        tone: "Manuell",
        multi: "Check",
        free: "Check",
        price: "€20/Monat",
      },
      {
        name: "Claude",
        template: "X",
        ferpa: "X",
        tone: "Manuell",
        multi: "Check",
        free: "Check",
        price: "€20/Monat",
      },
      {
        name: "Grammarly",
        template: "X",
        ferpa: "Check",
        tone: "Check",
        multi: "Begrenzt",
        free: "Check",
        price: "€30/Monat",
      },
    ],
    safeguards_title:
      "Schutzmaßnahmen für Tonfall, Klarheit und Professionalität",
    safeguards_points: [
      "**Tonfallkalibrierung:** Passt Formalität, Wärme und Direktheit automatisch an, um sicherzustellen, dass die E-Mail wie beabsichtigt empfangen wird.",
      "**Klarheit und Struktur:** Organisiert Stichpunkte in klare, professionelle Absätze mit angemessenen Überschriften und Abschlussbemerkungen.",
      "**Mehrsprachige Entwürfe:** Erstellt Entwürfe und Übersetzungen in über 10 Sprachen unter Beibehaltung des angegebenen Tonfalls und der Struktur.",
    ],
    testimonials_title: "Echte Lehrerstimmen",
    testimonials: [
      {
        quote:
          "Zaza Draft hat meine Zeit für Eltern-E-Mails von 2 Stunden auf 30 Minuten pro Woche reduziert. Die Vorlagen verstehen die Lehrersprache und die Tonfallkontrolle ist perfekt für sensible Situationen.",
        name: "Sarah M.",
        role: "Lehrerin 4. Klasse, Texas",
        image: "/testimonials/sarah-teacher.jpg",
      },
      {
        quote:
          "Ich nutze Zaza Draft für die Elternkommunikation und ChatGPT für die Unterrichtsplanung. Zusammen sparen sie mir 6-7 Stunden pro Woche. Eine Wende für die Work-Life-Balance.",
        name: "Jessica T.",
        role: "Englischlehrerin Oberstufe, Kalifornien",
        image: "/testimonials/maria-teacher.jpg",
      },
    ],
    faq_title: "Häufig gestellte Fragen",
    faqs: [
      {
        question: "Ist Zaza Draft DSGVO-konform?",
        answer:
          "Ja. Es erfordert keine Schülernamen (Initialen oder Pseudonyme werden verwendet) und Daten werden verschlüsselt und niemals zum Training verwendet. Dies macht es zu einer sicheren Option für den Bildungsbereich.",
      },
      {
        question: "Wie viel Zeit kann ich realistisch sparen?",
        answer:
          "Lehrer berichten in der Regel, dass sie allein bei der Kommunikation 5-8 Stunden pro Woche einsparen, je nach ihrem bestehenden Arbeitsaufwand.",
      },
      {
        question: "Funktioniert es in meiner Muttersprache?",
        answer:
          "Ja, Zaza Draft unterstützt das Entwerfen und Übersetzen von Kommunikation in über 10 Sprachen unter Beibehaltung des beabsichtigten Tonfalls.",
      },
      {
        question: "Kann ich es für Zeugnisse verwenden?",
        answer:
          "Ja, obwohl Zaza Draft sich hervorragend für kürzere Kommunikationen eignet, ist unser Produkt GradeFlow speziell für lange Schülerberichte konzipiert.",
      },
    ],
    continue_learning_title: "Weiter lernen",
    related_guides: [
      {
        title: "Stress mit KI-Nachrichten reduzieren",
        href: "/reduce-stress-parent-messages",
      },
      {
        title: "Das beste KI-Tool für Eltern-E-Mails",
        href: "/best-ai-tool-parent-emails",
      },
    ],
    cta_final_title: "Schreiben Sie bessere Eltern-E-Mails in kürzerer Zeit",
    cta_final_subtitle:
      "Starten Sie noch heute Ihre kostenlose Testversion. Keine Kreditkarte erforderlich.",
    cta_final_button: "Kostenlose Testversion starten",
    breadcrumb_label: "Lernzentrum",
    sidebar_cta_title: "Zaza Draft testen",
    sidebar_cta_subtitle:
      "Speziell für Lehrer entwickelt. DSGVO-konform. Kostenlos starten.",
    sidebar_cta_button: "Kostenlos starten",
    sidebar_resource_full: "Gesamtes Lernzentrum",
  },
};

const tocItems = [
  { id: "quick-answer", title: "Quick Answer", level: 2 },
  {
    id: "why-stress",
    title: "Why Parent Emails Cause Teacher Stress",
    level: 2,
  },
  {
    id: "how-ai-helps",
    title: "How AI Saves 60-70% of Writing Time",
    level: 2,
  },
  {
    id: "comparison",
    title: "Comparison: Zaza Draft vs. other tools",
    level: 2,
  },
  {
    id: "safeguards",
    title: "Safeguards for tone, clarity, and professionalism",
    level: 2,
  },
  { id: "testimonials", title: "Real teacher testimonials", level: 2 },
  { id: "faq", title: "Frequently Asked Questions", level: 2 },
];

const renderIcon = (type: string): JSX.Element | string => {
  if (type === "Check")
    return <Check className="mx-auto h-5 w-5 text-green-400" />;
  if (type === "X") return <X className="mx-auto h-5 w-5 text-red-400" />;
  return <span className="text-gray-500">-</span>;
};

const renderCellText = (content: string): JSX.Element | string => {
  if (content.startsWith("$") || content.startsWith("€"))
    return <span className="font-semibold text-white">{content}</span>;
  if (
    content === "Manual" ||
    content === "Manuell" ||
    content === "Limited" ||
    content === "Begrenzt"
  )
    return <span className="text-gray-400 text-sm">{content}</span>;
  return renderIcon(content);
};

export default function BestAIToolParentEmailsClient() {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith("/de") ?? false;
  const text = isGerman ? content.de : content.en;

  // Dynamically adjust TOC based on language
  const currentToc = [
    {
      id: "quick-answer",
      title: isGerman ? "Kurzantwort" : "Quick Answer",
      level: 2,
    },
    { id: "why-stress", title: text.why_stress_title, level: 2 },
    {
      id: "how-ai-helps",
      title: isGerman
        ? "Wie KI 60-70% der Schreibzeit spart"
        : "How AI Saves 60-70% of Writing Time",
      level: 2,
    },
    { id: "comparison", title: text.comparison_title, level: 2 },
    { id: "safeguards", title: text.safeguards_title, level: 2 },
    { id: "testimonials", title: text.testimonials_title, level: 2 },
    { id: "faq", title: text.faq_title, level: 2 },
  ];

  const breadcrumbItems = [
    { label: text.breadcrumb_label, href: "/learning-centre" },
    { label: text.hero_title },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1E293B] to-[#0F172A] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 px-4 py-1.5 text-sm font-medium text-[#A78BFA]">
              <Zap className="h-4 w-4" />
              {text.meta_updated}
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {text.hero_title}
            </h1>
            <p className="mb-8 text-balance text-lg text-gray-300 sm:text-xl leading-relaxed">
              {text.hero_subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                <Link href="/pricing">{text.cta_primary}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
              >
                <Link href="#comparison">{text.cta_secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="space-y-16">
            {/* Quick Answer */}
            <div
              id="quick-answer"
              className="scroll-mt-20 rounded-xl border border-[#8B5CF6]/30 bg-[#1E293B] p-6"
            >
              <h3 className="mb-3 text-xl font-bold text-white flex items-center gap-2">
                <Star className="h-5 w-5 fill-[#A78BFA] text-[#A78BFA]" />
                {isGerman
                  ? "Kurzantwort: Das beste KI-Tool"
                  : "Quick Answer: The Best AI Tool"}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {text.quick_answer}
              </p>
            </div>

            {/* Why Stress */}
            <section id="why-stress" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <X className="w-8 h-8 text-red-500" />
                {text.why_stress_title}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {text.why_stress_points.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-red-500/20 bg-[#1E293B] p-5"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {point.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{point.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How AI Helps */}
            <section id="how-ai-helps" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-400" />
                {text.how_ai_helps_title}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {text.ai_features.map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-green-500/20 bg-[#1E293B] p-5 text-center"
                  >
                    <div className="flex justify-center mb-3">
                      {React.createElement(
                        feature.icon === "Zap"
                          ? Zap
                          : feature.icon === "Shield"
                            ? Shield
                            : TrendingUp,
                        { className: "w-8 h-8 text-green-400" },
                      )}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">
                {text.comparison_title}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full">
                  <thead className="bg-[#1E293B]">
                    <tr>
                      <th className="p-4 text-left font-semibold text-white border-b border-white/10">
                        {isGerman ? "Merkmal" : "Feature"}
                      </th>
                      {text.comparison_tools.map((tool) => (
                        <th
                          key={tool.name}
                          className="p-4 text-center font-semibold text-white border-b border-white/10"
                        >
                          {tool.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 bg-[#0F172A]">
                    {/* Hardcoding rows to ensure feature rows match correctly */}
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {text.comparison_features[0]}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[0].template)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[1].template)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[2].template)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[3].template)}
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {text.comparison_features[1]}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[0].ferpa)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[1].ferpa)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[2].ferpa)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[3].ferpa)}
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {text.comparison_features[2]}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[0].tone)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[1].tone)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[2].tone)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[3].tone)}
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {text.comparison_features[3]}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[0].multi)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[1].multi)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[2].multi)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[3].multi)}
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {text.comparison_features[4]}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[0].free)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[1].free)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[2].free)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[3].free)}
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {text.comparison_features[5]}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[0].price)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[1].price)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[2].price)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCellText(text.comparison_tools[3].price)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Safeguards */}
            <section id="safeguards" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#A78BFA]" />
                {text.safeguards_title}
              </h2>
              <div className="space-y-4">
                {text.safeguards_points.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#8B5CF6]/20 bg-[#1E293B] p-4 text-gray-300 flex items-start gap-3"
                  >
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green-400" />
                    <p dangerouslySetInnerHTML={{ __html: point }}></p>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">
                {text.testimonials_title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {text.testimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 p-6"
                  >
                    <div className="mb-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-[#A78BFA] text-[#A78BFA]"
                        />
                      ))}
                    </div>
                    <p className="mb-4 text-gray-300 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <p className="font-semibold text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <FAQSection
              id="faq"
              title={text.faq_title}
              faqs={text.faqs as FAQItem[]}
              schemaContext={
                isGerman
                  ? "Beste KI-Tools für Eltern-E-Mails"
                  : "Best AI Tool for Parent Emails"
              }
            />

            {/* Final CTA */}
            <section className="rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/10 p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">
                {text.cta_final_title}
              </h2>
              <p className="mb-6 text-balance text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                {text.cta_final_subtitle}
              </p>
              <Button
                size="lg"
                asChild
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                <Link href="/pricing">{text.cta_final_button}</Link>
              </Button>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <TableOfContents items={currentToc} />

            {/* Related Resources */}
            <div className="rounded-xl border border-white/10 bg-[#1E293B] p-6">
              <h3 className="mb-4 font-semibold text-white">
                {text.continue_learning_title}
              </h3>
              <div className="space-y-3">
                {text.related_guides.map((guide, i) => (
                  <Link
                    key={i}
                    href={guide.href}
                    className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                  >
                    → {guide.title}
                  </Link>
                ))}
                <Link
                  href="/learning-centre"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  → {text.sidebar_resource_full}
                </Link>
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/10 p-6">
              <h3 className="mb-2 font-semibold text-white">
                {text.sidebar_cta_title}
              </h3>
              <p className="mb-4 text-sm text-gray-300">
                {text.sidebar_cta_subtitle}
              </p>
              <Button
                asChild
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                <Link href="/pricing">{text.sidebar_cta_button}</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
