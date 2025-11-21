"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Check,
  X,
  Shield,
  Zap,
  AlertTriangle,
  FileText,
  Star,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQSection, type FAQItem } from "@/components/faq-section";
import { TableOfContents } from "@/components/table-of-contents";
import Link from "next/link";

// --- CONTENT DICTIONARY (Consolidated and Verified) ---
const content = {
  en: {
    meta_updated: "Updated October 2025",
    hero_title: "AI for Student Reports",
    hero_subtitle: "Turn observations into professional reports in seconds.",
    cta_primary: "Try GradeFlow Free",
    cta_secondary: "See Step-by-Step",
    example_notes_title: "Example notes:",
    example_notes: [
      "Strong in reading comprehension (85% on last assessment)",
      "Struggles with math fact fluency (counting on fingers)",
      "Excellent participation and collaboration",
      "Needs reminders to stay on task during independent work",
    ],
    tagline:
      "This tool helps teachers turn observations into professional reports.",
    why_stress_title: "Why Report Writing Causes Teacher Stress",
    why_stress_points: [
      {
        title: "Time and Wellbeing",
        description:
          "It costs hours of personal time on evenings and weekends.",
        icon: "AlertTriangle",
      },
      {
        title: "Tone and Honesty",
        description:
          "Finding the right words to balance honesty and encouragement is hard.",
        icon: "AlertTriangle",
      },
      {
        title: "Robotic Phrasing",
        description: "Repetitive phrasing makes reports sound robotic.",
        icon: "AlertTriangle",
      },
    ],
    ai_helps_title: "How AI Saves 10-20% of Time",
    ai_features: [
      "Instantly drafts paragraphs from bullet points.",
      "Suggests professional phrasing for difficult topics.",
      "Automates the formatting and proofreading process.",
    ],
    privacy_title: "Privacy & Compliance",
    privacy_points: [
      "No student names required (use initials).",
      "Data is encrypted and never used for training without permission.",
      "Compliant with DSGVO and FERPA standards.",
    ],
    steps_title: "Step-by-Step Process",
    steps: [
      {
        step: 1,
        title: "Enter Observations",
        description: "Paste your raw notes or assessment scores.",
      },
      {
        step: 2,
        title: "Select Tone",
        description:
          "Choose the tone you need (e.g., struggling, encouraging, or direct).",
      },
      {
        step: 3,
        title: "Generate Report",
        description: "AI instantly creates a polished paragraph.",
      },
      {
        step: 4,
        title: "Refine & Save",
        description: "Make quick edits and export.",
      },
    ],
    templates_title: "Report Templates by Grade Level",
    templates: [
      {
        level: "Elementary School",
        points: [
          "Early literacy progress",
          "Socio-emotional development",
          "Motor skills & play dynamics",
        ],
        recommended: "Zaza GradeFlow",
      },
      {
        level: "Middle School",
        points: [
          "Subject-specific attainment",
          "Organisation & executive function",
          "Peer collaboration skills",
        ],
        recommended: "Zaza GradeFlow",
      },
      {
        level: "High School",
        points: [
          "AP/IB performance",
          "College readiness skills",
          "Extracurriculars & leadership",
        ],
        recommended: "Zaza GradeFlow",
      },
    ],
    before_after_title: "Before & After Examples",
    before_title: "Original Teacher Note (2 min):",
    before_text: "Kid is bad at math facts. Needs to work harder.",
    after_title: "AI Drafted Report (2 min + AI):",
    after_text:
      "Although [Student Name] consistently demonstrates strong conceptual understanding in mathematics, current progress is hindered by difficulty with fact fluency (e.g., counting on fingers). Targeted practice in this area is recommended to support independent problem-solving.",
    mistakes_title: "Common Mistakes to Avoid",
    mistakes_points: [
      "Using overly complex jargon parents won't understand",
      "Focusing only on negatives without actionable steps.",
      "Copy-pasting the same comment for every student.",
    ],
    testimonials_title: "Teacher Results",
    testimonials: [
      {
        quote:
          "It cut my report writing time by 70%. I can now focus on personalising the narrative instead of just generating content.",
        name: "James R.",
        role: "Primary School Teacher, UK",
        image: "/testimonials/james-teacher.jpg",
      },
      {
        quote:
          "The tone control is a lifesaver. It ensures I deliver critical feedback in an encouraging, professional manner.",
        name: "Sarah L.",
        role: "High School History Teacher, USA",
        image: "/testimonials/sarah-teacher.jpg",
      },
    ],
    faq_title: "Frequently Asked Questions",
    faqs: [
      {
        question: "How long does it take to generate a report?",
        answer:
          "Drafting takes seconds. Reviewing and personalising adds 1-2 minutes, saving 60-70% of the time you would spend writing from scratch.",
      },
      {
        question: "Can I use it for IEPs and 504s?",
        answer:
          "Yes, Zaza GradeFlow (our dedicated reports tool) has specific templates and language support for IEP and 504 documentation.",
      },
      {
        question: "Is this safe for student data?",
        answer:
          "Yes, our tools are DSGVO and FERPA compliant. They require no student names and never train the model on your data.",
      },
      {
        question: "Does it work for all subjects?",
        answer:
          "Yes, the AI is trained to process observations and feedback across all subjects and grade levels.",
      },
    ],
    continue_learning_title: "Continue Learning",
    related_guides: [
      {
        title: "Reduce Stress with AI Messages",
        href: "/reduce-stress-parent-messages",
      },
      {
        title: "Best AI Tool for Parent Emails",
        href: "/best-ai-tool-parent-emails",
      },
    ],
    cta_final_title: "Ready to write reports faster?",
    cta_final_subtitle: "Create your first 5 reports for free today.",
    cta_final_button: "Start Free Trial",
    breadcrumb_label: "Learning Centre",
    sidebar_resource_full: "Full Learning Centre",
  },
  de: {
    meta_updated: "Aktualisiert: Oktober 2025",
    hero_title: "KI für Schülerberichte",
    hero_subtitle:
      "Verwandeln Sie Beobachtungen in Sekundenschnelle in professionelle Berichte.",
    cta_primary: "GradeFlow kostenlos testen",
    cta_secondary: "Schritt-für-Schritt ansehen",
    example_notes_title: "Beispielnotizen:",
    example_notes: [
      "Stark im Leseverständnis (85% bei der letzten Bewertung)",
      "Schwierigkeiten beim Rechnen (zählt noch mit den Fingern)",
      "Hervorragende Beteiligung und Zusammenarbeit",
      "Benötigt Erinnerungen, um bei selbstständiger Arbeit fokussiert zu bleiben",
    ],
    tagline:
      "Dieses Tool hilft Lehrern, Beobachtungen in professionelle Berichte zu verwandeln.",
    why_stress_title: "Warum das Schreiben von Berichten Stress verursacht",
    why_stress_points: [
      {
        title: "Zeit und Wohlbefinden",
        description:
          "Es kostet Stunden persönlicher Zeit an Abenden und Wochenenden.",
        icon: "AlertTriangle",
      },
      {
        title: "Tonfall und Ehrlichkeit",
        description:
          "Die richtigen Worte zu finden, um Ehrlichkeit und Ermutigung in Einklang zu bringen, ist schwer.",
        icon: "AlertTriangle",
      },
      {
        title: "Roboterhafte Formulierungen",
        description:
          "Wiederholende Formulierungen lassen Berichte roboterhaft klingen.",
        icon: "AlertTriangle",
      },
    ],
    ai_helps_title: "Wie KI 10-20% der Zeit spart",
    ai_features: [
      "Erstellt sofort Absätze aus Stichpunkten.",
      "Schlägt professionelle Formulierungen für schwierige Themen vor.",
      "Automatisiert die Formatierung und den Korrekturprozess.",
    ],
    privacy_title: "Datenschutz & Konformität",
    privacy_points: [
      "Keine Schülernamen erforderlich (nutzen Sie Initialen).",
      "Daten werden verschlüsselt und niemals ohne Erlaubnis zum Training genutzt.",
      "Konform mit DSGVO und FERPA Standards.",
    ],
    steps_title: "Schritt-für-Schritt-Prozess",
    steps: [
      {
        step: 1,
        title: "Beobachtungen eingeben",
        description: "Fügen Sie Ihre Notizen oder Bewertungsergebnisse ein.",
      },
      {
        step: 2,
        title: "Tonfall wählen",
        description:
          "Wählen Sie den Tonfall, den Sie benötigen (z. B. bemühend, ermutigend oder direkt).",
      },
      {
        step: 3,
        title: "Bericht erstellen",
        description: "Die KI erstellt sofort einen geschliffenen Absatz.",
      },
      {
        step: 4,
        title: "Verfeinern & Speichern",
        description: "Machen Sie schnelle Änderungen und exportieren Sie.",
      },
    ],
    templates_title: "Berichtsvorlagen nach Klassenstufe",
    templates: [
      {
        level: "Grundschule",
        points: [
          "Früher Lese- und Schreibfortschritt",
          "Sozial-emotionale Entwicklung",
          "Motorische Fähigkeiten & Spieldynamik",
        ],
        recommended: "Zaza GradeFlow",
      },
      {
        level: "Mittelschule",
        points: [
          "Fachspezifische Leistung",
          "Organisation & Exekutivfunktionen",
          "Zusammenarbeitsfähigkeiten mit Gleichaltrigen",
        ],
        recommended: "Zaza GradeFlow",
      },
      {
        level: "Oberstufe",
        points: [
          "AP/IB-Leistung",
          "Hochschulreife Fähigkeiten",
          "Außerschulische Aktivitäten & Führung",
        ],
        recommended: "Zaza GradeFlow",
      },
    ],
    before_after_title: "Vorher & Nachher Beispiele",
    before_title: "Ursprüngliche Lehrernotiz (2 Min.):",
    before_text: "Das Kind ist schlecht in Mathe-Fakten. Muss härter arbeiten.",
    after_title: "KI-Entworfener Bericht (2 Min. + KI):",
    after_text:
      "Obwohl [Schülername] durchweg ein starkes konzeptionelles Verständnis in Mathematik zeigt, wird der aktuelle Fortschritt durch Schwierigkeiten bei der Faktenflüssigkeit (z. B. das Zählen an den Fingern) behindert. Gezieltes Üben in diesem Bereich wird empfohlen, um das unabhängige Problemlösen zu unterstützen.",
    mistakes_title: "Häufige Fehler vermeiden",
    mistakes_points: [
      "Verwendung von zu komplexem Fachjargon, den Eltern nicht verstehen",
      "Fokus nur auf Negatives ohne umsetzbare Schritte.",
      "Kopieren und Einfügen desselben Kommentars für jeden Schüler.",
    ],
    testimonials_title: "Lehrer-Ergebnisse",
    testimonials: [
      {
        quote:
          "Es hat meine Zeit für das Schreiben von Berichten um 70 % reduziert. Ich kann mich jetzt darauf konzentrieren, die Erzählung zu personalisieren, anstatt nur Inhalt zu generieren.",
        name: "James R.",
        role: "Grundschullehrer, UK",
        image: "/testimonials/james-teacher.jpg",
      },
      {
        quote:
          "Die Tonfallkontrolle ist ein Lebensretter. Sie stellt sicher, dass ich kritisches Feedback auf ermutigende, professionelle Weise übermittle.",
        name: "Sarah L.",
        role: "Geschichtslehrerin Oberstufe, USA",
        image: "/testimonials/sarah-teacher.jpg",
      },
    ],
    faq_title: "Häufig gestellte Fragen",
    faqs: [
      {
        question: "Wie lange dauert es, einen Bericht zu erstellen?",
        answer:
          "Das Erstellen eines Entwurfs dauert Sekunden. Reviewing und Personalisieren fügt 1-2 Minuten hinzu und spart 60-70 % der Zeit, die Sie mit dem Schreiben von Grund auf verbringen würden.",
      },
      {
        question: "Kann ich es für IEPs und 504s verwenden?",
        answer:
          "Ja, Zaza GradeFlow (unser spezielles Berichtstool) hat spezifische Vorlagen und Sprachunterstützung für IEP und 504 Dokumentationen.",
      },
      {
        question: "Ist dies für Schülerdaten sicher?",
        answer:
          "Ja, unsere Tools sind DSGVO- und FERPA-konform. Sie benötigen keine Schülernamen und trainieren das Modell niemals mit Ihren Daten.",
      },
      {
        question: "Funktioniert es für alle Fächer?",
        answer:
          "Ja, die KI ist darauf trainiert, Beobachtungen und Feedback in allen Fächern und Klassenstufen zu verarbeiten.",
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
    cta_final_title: "Bereit, Berichte schneller zu schreiben?",
    cta_final_subtitle:
      "Erstellen Sie noch heute Ihre ersten 5 Berichte kostenlos.",
    cta_final_button: "Kostenlose Testversion starten",
    breadcrumb_label: "Lernzentrum",
    sidebar_resource_full: "Gesamtes Lernzentrum",
  },
};

const tocItems = [
  {
    id: "why-stress",
    title: "Why Report Writing Causes Teacher Stress",
    level: 2,
  },
  { id: "how-ai-helps", title: "How AI Saves 10-20% of Time", level: 2 },
  { id: "privacy", title: "Privacy & Compliance", level: 2 },
  { id: "steps", title: "Step-by-Step Process", level: 2 },
  { id: "templates", title: "Report Templates by Grade Level", level: 2 },
  { id: "before-after", title: "Before & After Examples", level: 2 },
  { id: "mistakes", title: "Common Mistakes to Avoid", level: 2 },
  { id: "testimonials", title: "Teacher Results", level: 2 },
  { id: "faq", title: "Frequently Asked Questions", level: 2 },
];

// Helper function with explicit type for 'isCheck'
const renderListIcon = (isCheck: boolean) => {
  const Icon = isCheck ? Check : X;
  const color = isCheck ? "text-green-400" : "text-red-400";
  return <Icon className={`mt-1 h-5 w-5 shrink-0 ${color}`} />;
};

export function AiForStudentReportsClient() {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith("/de") ?? false;
  const text = isGerman ? content.de : content.en;

  // Dynamically adjust TOC based on language
  const currentToc = [
    { id: "why-stress", title: text.why_stress_title, level: 2 },
    { id: "how-ai-helps", title: text.ai_helps_title, level: 2 },
    { id: "privacy", title: text.privacy_title, level: 2 },
    { id: "steps", title: text.steps_title, level: 2 },
    { id: "templates", title: text.templates_title, level: 2 },
    { id: "before-after", title: text.before_after_title, level: 2 },
    { id: "mistakes", title: text.mistakes_title, level: 2 },
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
                <Link href="#steps">{text.cta_secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="space-y-16">
            {/* Example Notes Header */}
            <div
              id="example-notes"
              className="scroll-mt-20 rounded-xl bg-[#1E293B] p-8 border border-white/10 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold text-white">
                {text.example_notes_title}
              </h3>
              <ul className="space-y-2 text-lg text-gray-300">
                {text.example_notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#A78BFA] mt-1">•</span>
                    {note}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-400 italic text-center border-t border-white/5 pt-4">
                {text.tagline}
              </p>
            </div>

            {/* Why Stress */}
            <section id="why-stress" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                {text.why_stress_title}
              </h2>
              <div className="space-y-4">
                {text.why_stress_points.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-red-500/20 bg-[#1E293B] p-4"
                  >
                    <h3 className="mb-1 text-xl font-semibold text-white">
                      {point.title}
                    </h3>
                    <p className="text-gray-300">{point.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How AI Helps */}
            <section id="how-ai-helps" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-400" />
                {text.ai_helps_title}
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {text.ai_features.map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-[#1E293B] p-5 text-center"
                  >
                    <p className="text-gray-300 font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy & FERPA Compliance */}
            <section id="privacy" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <Lock className="w-8 h-8 text-[#A78BFA]" />
                {text.privacy_title}
              </h2>
              <div className="space-y-4">
                {text.privacy_points.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-green-500/20 bg-[#1E293B] p-4 text-gray-300 flex items-start gap-3"
                  >
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green-400" />
                    <p className="font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Step-by-Step Process */}
            <section id="steps" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#A78BFA]" />
                {text.steps_title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {text.steps.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 bg-[#1E293B] rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] text-lg font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="mb-1 text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Templates by Grade Level */}
            <section id="templates" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white">
                {text.templates_title}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {text.templates.map((template, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-[#1E293B] p-6"
                  >
                    <h3 className="mb-4 text-xl font-bold text-white">
                      {template.level}
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm mb-6">
                      {template.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2">
                          − {point}
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 bg-[#8B5CF6]/10 rounded-lg text-center">
                      <p className="text-sm font-semibold text-[#A78BFA]">
                        Recommended Tool: {template.recommended}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Before & After Examples */}
            <section id="before-after" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white">
                {text.before_after_title}
              </h2>
              <div className="space-y-6">
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6">
                  <h3 className="mb-3 text-xl font-semibold text-red-400 flex items-center gap-2">
                    <X className="h-5 w-5" />
                    {text.before_title}
                  </h3>
                  <p className="text-gray-300 italic">"{text.before_text}"</p>
                </div>
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-6">
                  <h3 className="mb-3 text-xl font-semibold text-green-400 flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    {text.after_title}
                  </h3>
                  <p className="text-gray-300">"{text.after_text}"</p>
                </div>
              </div>
            </section>

            {/* Common Mistakes to Avoid */}
            <section id="mistakes" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white">
                {text.mistakes_title}
              </h2>
              <div className="rounded-xl border border-red-500/30 bg-[#1E293B] p-6">
                <ul className="space-y-3">
                  {text.mistakes_points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-lg text-gray-300"
                    >
                      <X className="mt-1 h-5 w-5 shrink-0 text-red-400" />
                      {point}
                    </li>
                  ))}
                </ul>
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
                isGerman ? "KI für Schülerberichte" : "AI for Student Reports"
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
                GradeFlow testen
              </h3>
              <p className="mb-4 text-sm text-gray-300">
                Speziell für Berichte und Zeugnisse entwickelt.
              </p>
              <Button
                asChild
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                <Link href="/pricing">Kostenlos starten</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
