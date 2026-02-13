"use client";

import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TableOfContents } from "@/components/table-of-contents";
import { useLanguage } from "../../src/contexts/LanguageContext";

// -------------------------------------------
// CONTENT DICTIONARY (EN + DE)
// -------------------------------------------

const content = {
  en: {
    // Hero
    updated_label: "Updated November 2025",
    hero_title: "Best AI Tool for Parent Emails in 2025",
    hero_subtitle:
      "Find the AI assistant purpose-built for teacher-parent communication, tone control, and FERPA/GDPR compliance.",
    hero_primary_cta: "Try Zaza Draft Free",
    hero_secondary_cta: "See Comparison",

    // Quick Answer
    quick_answer_label: "Quick Answer: The Best AI Tool",
    quick_answer_title: "Quick Answer: The Best AI Tool",
    quick_answer_body:
      "Zaza Draft is the best tool, offering teacher-specific templates, FERPA compliance, and automated tone control. Generic tools like ChatGPT are too risky for sensitive communications.",

    // Why Stress
    why_stress_title: "Why Parent Emails Cause Teacher Stress",
    why_stress_cards: [
      {
        title: "Finding the Right Words",
        body: "It’s hard to find the right words to be both honest and encouraging at the same time. The pressure to get the tone right causes major delays.",
      },
      {
        title: "Breaking Consistency",
        body: "Writing consistency across 40+ parents, 3 different contexts (email, report, message) while managing your time is near impossible.",
      },
      {
        title: "Time and Wellbeing",
        body: "Emails take up personal time on evenings and weekends. This ambiguity has a significant drain on teacher wellbeing.",
      },
    ],

    // How AI Helps
    how_ai_title: "How AI Helps Write Clear, Empathetic Messages",
    how_ai_cards: [
      {
        title: "Instant Drafts",
        body: "Instantly drafts clear, professional emails from a few bullet points, saving 60–70% of the writing time.",
      },
      {
        title: "Tone Control",
        body: "Provides precise control over formality, warmth, and directness, ensuring the right message every time.",
      },
      {
        title: "Saves Time",
        body: "Saves 60–70% of the time usually spent drafting, reviewing, and worrying about parent communication.",
      },
    ],

    // Comparison
    comparison_title: "Comparison: Zaza Draft vs. other tools",
    comparison_table: {
      feature_label: "Feature",
      tool_label: "Zaza Draft",
      chatgpt_label: "ChatGPT",
      claude_label: "Claude",
      grammarly_label: "Grammarly",
      rows: [
        {
          feature: "Teacher Templates",
          zaza: "✔",
          chatgpt: "✖",
          claude: "✖",
          grammarly: "✖",
        },
        {
          feature: "FERPA Compliant",
          zaza: "✔",
          chatgpt: "✖",
          claude: "✖",
          grammarly: "✖",
        },
        {
          feature: "Tone Control",
          zaza: "✔",
          chatgpt: "Manual",
          claude: "Manual",
          grammarly: "✔",
        },
        {
          feature: "Multi-language",
          zaza: "✔",
          chatgpt: "✔",
          claude: "✔",
          grammarly: "Limited",
        },
        {
          feature: "Free Tier",
          zaza: "✔",
          chatgpt: "✔",
          claude: "✔",
          grammarly: "✔",
        },
        {
          feature: "Price (Premium)",
          zaza: "$16/mo",
          chatgpt: "$20/mo",
          claude: "$20/mo",
          grammarly: "$30/mo",
        },
      ],
    },

    // Safeguards
    safeguards_title: "Safeguards for tone, clarity, and professionalism",
    safeguards_items: [
      {
        title: "Tone Calibration",
        body: "Automatically adjusts formality, warmth, and directness to ensure the email is received as intended.",
      },
      {
        title: "Clarity & Structure",
        body: "Organises bullet points into clear, professional paragraphs with appropriate headings and closing remarks.",
      },
      {
        title: "Multi-lingual Drafts",
        body: "Generate drafts in 10+ languages while maintaining the specified tone and structure.",
      },
    ],

    // Testimonials
    testimonials_title: "Real teacher testimonials",
    testimonials: [
      {
        quote:
          "Zaza Draft cut my parent email time from 2 hours to 30 minutes per week. The templates understand teacher language and the tone control is perfect for sensitive situations.",
        name: "Sarah M.",
        role: "4th Grade Teacher, Texas",
      },
      {
        quote:
          "I use Zaza Draft for parent communication and ChatGPT for lesson planning. Together they save me 6–7 hours per week. Game changer for work-life balance.",
        name: "Jessica T.",
        role: "High School English, California",
      },
    ],

    // FAQ
    faq_title: "Frequently Asked Questions",
    faq: [
      {
        question: "Is Zaza Draft FERPA-ready?",
        answer:
          "Yes. Zaza Draft is designed with FERPA-appropriate data handling for student information and sensitive communication contexts.",
      },
      {
        question: "How much time can I save?",
        answer:
          "Most teachers report saving 60–70% of the time they previously spent drafting, revising, and editing parent emails.",
      },
      {
        question: "Does it work in my native language?",
        answer:
          "Zaza Draft supports drafts in over 10 languages and can adapt tone and phrasing to different cultural expectations.",
      },
      {
        question: "Can I use it for report cards?",
        answer:
          "Yes. Many teachers use Zaza Draft to draft report comments first, then adapt them for parent emails or official reporting systems.",
      },
    ],

    // CTA
    cta_title: "Write better parent emails in less time",
    cta_subtitle: "Start your free trial today. No credit card required.",
    cta_button: "Start Free Trial",

    // Sidebar / Continued Learning
    sidebar_on_this_page: "On this page",
    sidebar_continue_learning: "Continue Learning",
    sidebar_quick_answer: "Quick Answer",
    sidebar_why_stress: "Why Parent Emails Cause Teacher Stress",
    sidebar_how_ai_saves: "How AI Saves 60–70% of Writing Time",
    sidebar_comparison: "Comparison: Zaza Draft vs. other tools",
    sidebar_safeguards: "Safeguards for tone, clarity, and professionalism",
    sidebar_testimonials: "Real teacher testimonials",
    sidebar_faq: "Frequently Asked Questions",
    sidebar_reduce_stress: "Reduce Stress with AI Messages",
    sidebar_student_reports: "AI for Student Reports",
    sidebar_learning_centre: "Full Learning Centre",

    // Breadcrumb
    breadcrumb_label: "Learning Centre",
  },

  de: {
    // Hero
    updated_label: "Aktualisiert: November 2025",
    hero_title: "Das beste KI-Tool für Eltern-E-Mails 2025",
    hero_subtitle:
      "Finden Sie den KI-Assistenten, der speziell für die Lehrer-Eltern-Kommunikation, Tonfallkontrolle und DSGVO-Konformität entwickelt wurde.",
    hero_primary_cta: "Zaza Draft kostenlos testen",
    hero_secondary_cta: "Vergleich ansehen",

    // Quick Answer
    quick_answer_label: "Kurzantwort: Das beste KI-Tool",
    quick_answer_title: "Kurzantwort: Das beste KI-Tool",
    quick_answer_body:
      "Zaza Draft ist das beste Tool, das lehrerspezifische Vorlagen, DSGVO-Konformität und automatische Tonfallkontrolle bietet. Generische Tools wie ChatGPT sind zu riskant für sensible Kommunikation.",

    // Why Stress
    why_stress_title: "Warum Eltern-E-Mails bei Lehrern Stress verursachen",
    why_stress_cards: [
      {
        title: "Die richtigen Worte finden",
        body: "Es ist schwierig, Worte zu finden, die gleichzeitig ehrlich und ermutigend sind. Der Druck, den Ton genau zu treffen, führt oft zu großer Verzögerung.",
      },
      {
        title: "Konsistent bleiben",
        body: "Konsequente Formulierungen für über 40 Eltern, 3 verschiedene Kontexte (E-Mail, Bericht, Nachricht) und ein voller Stundenplan – das ist kaum machbar.",
      },
      {
        title: "Zeit und Wohlbefinden",
        body: "E-Mails beanspruchen wertvolle Zeit an Abenden und Wochenenden. Diese zusätzliche Belastung wirkt sich direkt auf das Wohlbefinden der Lehrkräfte aus.",
      },
    ],

    // How AI Helps
    how_ai_title: "Wie KI hilft, klare, empathische Nachrichten zu verfassen",
    how_ai_cards: [
      {
        title: "Sofortige Entwürfe",
        body: "Erstellt sofort klare, professionelle E-Mail-Entwürfe aus wenigen Stichpunkten und spart so 60–70 % der Schreibzeit.",
      },
      {
        title: "Tonfallkontrolle",
        body: "Bietet exakte Kontrolle über Formalität, Wärme und Direktheit, damit die Nachricht so ankommt, wie Sie es meinen.",
      },
      {
        title: "Spart Zeit",
        body: "Spart 60–70 % der Zeit, die normalerweise für das Verfassen, Überarbeiten und Zweifeln an Elternkommunikation draufgeht.",
      },
    ],

    // Comparison
    comparison_title: "Vergleich: Zaza Draft vs. andere Tools",
    comparison_table: {
      feature_label: "Merkmal",
      tool_label: "Zaza Draft",
      chatgpt_label: "ChatGPT",
      claude_label: "Claude",
      grammarly_label: "Grammarly",
      rows: [
        {
          feature: "Lehrer-Vorlagen",
          zaza: "✔",
          chatgpt: "✖",
          claude: "✖",
          grammarly: "✖",
        },
        {
          feature: "DSGVO-konform",
          zaza: "✔",
          chatgpt: "✖",
          claude: "✖",
          grammarly: "✖",
        },
        {
          feature: "Tonfallkontrolle",
          zaza: "✔",
          chatgpt: "Manuell",
          claude: "Manuell",
          grammarly: "✔",
        },
        {
          feature: "Mehrsprachig",
          zaza: "✔",
          chatgpt: "✔",
          claude: "✔",
          grammarly: "Begrenzt",
        },
        {
          feature: "Kostenlose Stufe",
          zaza: "✔",
          chatgpt: "✔",
          claude: "✔",
          grammarly: "✔",
        },
        {
          feature: "Preis (Premium)",
          zaza: "≈ 14,99€/Monat",
          chatgpt: "≈ 20€/Monat",
          claude: "≈ 20€/Monat",
          grammarly: "≈ 30€/Monat",
        },
      ],
    },

    // Safeguards
    safeguards_title:
      "Schutzmaßnahmen für Tonfall, Klarheit und Professionalität",
    safeguards_items: [
      {
        title: "Tonfallkalibrierung",
        body: "Passt Formalität, Wärme und Direktheit automatisch an, um sicherzustellen, dass die E-Mail wie beabsichtigt ankommt.",
      },
      {
        title: "Klarheit und Struktur",
        body: "Strukturiert Stichpunkte in klare, professionelle Absätze mit passenden Zwischenüberschriften und Abschlussformeln.",
      },
      {
        title: "Mehrsprachige Entwürfe",
        body: "Erstellt Entwürfe und Antworten in über 10 Sprachen unter Beibehaltung des angegebenen Tons und der Struktur.",
      },
    ],

    // Testimonials
    testimonials_title: "Echte Lehrerstimmen",
    testimonials: [
      {
        quote:
          "Mit Zaza Draft habe ich meine Eltern-E-Mails von 2 Stunden auf 30 Minuten pro Woche reduziert. Die Vorlagen verstehen unsere Lehrersprache und die Tonfallkontrolle ist perfekt für sensible Situationen.",
        name: "Sarah M.",
        role: "Lehrerin 4. Klasse, Texas",
      },
      {
        quote:
          "Ich nutze Zaza Draft für die Elternkommunikation und ChatGPT für die Unterrichtsplanung. Zusammen sparen sie mir 6–7 Stunden pro Woche. Eine Wende für die Work-Life-Balance.",
        name: "Jessica T.",
        role: "Englischlehrerin Oberstufe, Kalifornien",
      },
    ],

    // FAQ
    faq_title: "Häufig gestellte Fragen",
    faq: [
      {
        question: "Ist Zaza Draft DSGVO-konform?",
        answer:
          "Ja. Zaza Draft ist für DSGVO-konforme Verarbeitung von Schülerdaten und sensibler Kommunikation ausgelegt.",
      },
      {
        question: "Wie viel Zeit kann ich realistisch sparen?",
        answer:
          "Die meisten Lehrkräfte berichten, dass sie 60–70 % der bisherigen Zeit für das Verfassen, Überarbeiten und Kontrolllesen von Eltern-E-Mails einsparen.",
      },
      {
        question: "Funktioniert es in meiner Muttersprache?",
        answer:
          "Zaza Draft unterstützt Entwürfe in über 10 Sprachen und kann Ton und Formulierungen an unterschiedliche kulturelle Erwartungen anpassen.",
      },
      {
        question: "Kann ich es für Zeugnisse verwenden?",
        answer:
          "Ja. Viele Lehrkräfte verfassen zuerst Berichtskommentare mit Zaza Draft und passen sie anschließend für Eltern-E-Mails oder offizielle Systeme an.",
      },
    ],

    // CTA
    cta_title: "Schreiben Sie bessere Eltern-E-Mails in kürzerer Zeit",
    cta_subtitle:
      "Starten Sie noch heute Ihre kostenlose Testversion. Keine Kreditkarte erforderlich.",
    cta_button: "Kostenlose Testversion starten",

    // Sidebar / Continued Learning
    sidebar_on_this_page: "Auf dieser Seite",
    sidebar_continue_learning: "Weiter lernen",
    sidebar_quick_answer: "Kurzantwort",
    sidebar_why_stress: "Warum Eltern-E-Mails Stress verursachen",
    sidebar_how_ai_saves: "Wie KI 60–70 % Schreibzeit spart",
    sidebar_comparison: "Vergleich: Zaza Draft vs. andere Tools",
    sidebar_safeguards:
      "Schutzmaßnahmen für Tonfall, Klarheit und Professionalität",
    sidebar_testimonials: "Echte Lehrerstimmen",
    sidebar_faq: "Häufig gestellte Fragen",
    sidebar_reduce_stress: "Stress mit KI-Nachrichten reduzieren",
    sidebar_student_reports: "KI für Schülerberichte",
    sidebar_learning_centre: "Gesamtes Lernzentrum",

    // Breadcrumb
    breadcrumb_label: "Lernzentrum",
  },
};

// -------------------------------------------
// COMPONENT
// -------------------------------------------

export default function BestAIToolParentEmailsClient() {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith("/de") ?? false;
  const language: "en" | "de" = isGerman ? "de" : "en";
  const text = content[language];

  const tocItems = [
    {
      id: "quick-answer",
      title: isGerman ? "Kurzantwort" : "Quick Answer",
      level: 2,
    },
    { id: "why-stress", title: text.why_stress_title, level: 2 },
    { id: "how-ai-helps", title: text.how_ai_title, level: 2 },
    { id: "comparison", title: text.comparison_title, level: 2 },
    { id: "safeguards", title: text.safeguards_title, level: 2 },
    { id: "testimonials", title: text.testimonials_title, level: 2 },
    { id: "faq", title: text.faq_title, level: 2 },
  ];

  const breadcrumbItems = [
    { label: text.breadcrumb_label, href: "/learning-centre" },
    {
      label: isGerman
        ? "Bestes KI-Tool für Eltern-E-Mails 2025"
        : "Best AI Tool for Parent Emails in 2025",
      href: "/best-ai-tool-parent-emails",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 text-slate-50">
      {/* Top section with hero + TOC sidebar */}
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-32 lg:flex-row lg:items-start lg:gap-16">
          {/* Main Hero */}
          <div className="flex-1 space-y-6">
            {/* Breadcrumb */}
            <nav className="mb-4 text-sm text-slate-400">
              <ol className="flex items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-slate-100 transition-colors duration-150"
                  >
                    {isGerman ? "Startseite" : "Home"}
                  </Link>
                </li>
                <li className="text-slate-500">/</li>
                <li>
                  <Link
                    href="/learning-centre"
                    className="hover:text-slate-100 transition-colors duration-150"
                  >
                    {text.breadcrumb_label}
                  </Link>
                </li>
                <li className="text-slate-500">/</li>
                <li className="text-slate-300">
                  {isGerman
                    ? "Bestes KI-Tool für Eltern-E-Mails 2025"
                    : "Best AI Tool for Parent Emails in 2025"}
                </li>
              </ol>
            </nav>

            {/* Updated badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1 text-sm text-purple-300 ring-1 ring-purple-500/40">
              <Sparkles className="h-4 w-4" />
              <span>{text.updated_label}</span>
            </div>

            {/* Hero Title */}
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              {text.hero_title}
            </h1>

            {/* Hero Subtitle */}
            <p className="max-w-2xl text-lg text-slate-300">
              {text.hero_subtitle}
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:scale-[1.02] hover:shadow-purple-500/60"
              >
                <Sparkles className="h-4 w-4" />
                <span>{text.hero_primary_cta}</span>
              </Link>

              <Link
                href="/compare-tools"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800/60"
              >
                <ArrowRight className="h-4 w-4" />
                <span>{text.hero_secondary_cta}</span>
              </Link>
            </div>
          </div>

          {/* On this page sidebar */}
          <aside className="mt-8 w-full max-w-xs rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-lg shadow-slate-900/40 lg:mt-0">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              {text.sidebar_on_this_page}
            </h2>
            <TableOfContents items={tocItems} />

            {/* Continue learning */}
            <div className="mt-6 space-y-2 rounded-xl bg-slate-900/70 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {text.sidebar_continue_learning}
              </h3>
              <div className="space-y-2 text-sm">
                <Link
                  href="/reduce-stress-parent-messages"
                  className="group flex items-center justify-between rounded-lg px-2 py-1 text-slate-200 hover:bg-slate-800/70"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-purple-300" />
                    <span>{text.sidebar_reduce_stress}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-purple-300" />
                </Link>

                <Link
                  href="/ai-for-student-reports"
                  className="group flex items-center justify-between rounded-lg px-2 py-1 text-slate-200 hover:bg-slate-800/70"
                >
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span>{text.sidebar_student_reports}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-purple-300" />
                </Link>

                <Link
                  href="/learning-centre"
                  className="group flex items-center justify-between rounded-lg px-2 py-1 text-slate-200 hover:bg-slate-800/70"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-300" />
                    <span>{text.sidebar_learning_centre}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-purple-300" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-6xl space-y-12 px-4 pb-24 pt-8">
        {/* Quick Answer */}
        <section
          id="quick-answer"
          className="grid gap-6 lg:grid-cols-[2fr,1fr]"
        >
          <div className="rounded-2xl bg-slate-900/80 p-6 shadow-xl shadow-slate-900/40">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200">
              <Star className="h-4 w-4 fill-purple-400 text-purple-400" />
              <span>{text.quick_answer_label}</span>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-slate-50">
              {text.quick_answer_title}
            </h2>
            <p className="text-slate-200">{text.quick_answer_body}</p>
          </div>

          {/* Key features summary card */}
          <div className="rounded-2xl border border-purple-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-6 shadow-xl shadow-purple-900/30">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-purple-200">
              {isGerman ? "Warum Zaza Draft?" : "Why Zaza Draft?"}
            </h3>
            <ul className="space-y-3 text-sm text-slate-100">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                <span>
                  {isGerman
                    ? "Vorlagen speziell für Lehrer-Eltern-Kommunikation, nicht für allgemeine E-Mails."
                    : "Templates purpose-built for teacher–parent communication, not generic email writing."}
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                <span>
                  {isGerman
                    ? "DSGVO-/FERPA-orientierte Behandlung sensibler Schülerdaten."
                    : "FERPA/GDPR-aware handling of sensitive student information."}
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                <span>
                  {isGerman
                    ? "Automatische Tonfallkontrolle, damit Nachrichten so ankommen, wie sie gemeint sind."
                    : "Automated tone control so messages are received as you intend."}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Why Stress */}
        <section id="why-stress" className="space-y-6">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-rose-400" />
            <h2 className="text-2xl font-bold text-slate-50">
              {text.why_stress_title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {text.why_stress_cards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 p-5 shadow-lg shadow-slate-900/40"
              >
                <h3 className="mb-2 text-base font-semibold text-slate-50">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-300">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How AI Helps */}
        <section id="how-ai-helps" className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-slate-50">
              {text.how_ai_title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {text.how_ai_cards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 p-5 shadow-lg shadow-slate-900/40"
              >
                <h3 className="mb-2 text-base font-semibold text-slate-50">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-300">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section id="comparison" className="space-y-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-slate-50">
              {text.comparison_title}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-xl shadow-slate-900/40">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-900/90">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {text.comparison_table.feature_label}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-fuchsia-300">
                    {text.comparison_table.tool_label}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {text.comparison_table.chatgpt_label}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {text.comparison_table.claude_label}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {text.comparison_table.grammarly_label}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                {text.comparison_table.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-slate-200">{row.feature}</td>
                    <td className="px-4 py-3 text-slate-100">{row.zaza}</td>
                    <td className="px-4 py-3 text-slate-300">{row.chatgpt}</td>
                    <td className="px-4 py-3 text-slate-300">{row.claude}</td>
                    <td className="px-4 py-3 text-slate-300">
                      {row.grammarly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Safeguards */}
        <section id="safeguards" className="space-y-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-slate-50">
              {text.safeguards_title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {text.safeguards_items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 p-5 shadow-lg shadow-slate-900/40"
              >
                <h3 className="mb-2 text-base font-semibold text-slate-50">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="space-y-6">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <h2 className="text-2xl font-bold text-slate-50">
              {text.testimonials_title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {text.testimonials.map((t, idx) => (
              <figure
                key={idx}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 p-6 shadow-xl shadow-slate-900/50"
              >
                <div className="mb-2 flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400" />
                </div>
                <blockquote className="mb-3 text-sm text-slate-100">
                  “{t.quote}”
                </blockquote>
                <figcaption className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{t.name}</span>
                  {" • "}
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-slate-50">
              {text.faq_title}
            </h2>
          </div>

          <div className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/80">
            {text.faq.map((item, idx) => (
              <details
                key={idx}
                className="group border-t border-slate-800 px-4 py-3 first:border-t-0"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm text-slate-100">
                  <span>{item.question}</span>
                  <span className="ml-4 text-xs text-slate-500 group-open:hidden">
                    +
                  </span>
                  <span className="ml-4 text-xs text-slate-500 hidden group-open:inline">
                    -
                  </span>
                </summary>
                <p className="mt-2 text-sm text-slate-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-12 rounded-3xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500 p-[1px] shadow-2xl shadow-purple-900/40">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] bg-slate-950/95 px-6 py-8 text-slate-50 md:flex-row md:items-center md:px-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{text.cta_title}</h2>
              <p className="max-w-xl text-sm text-slate-200">
                {text.cta_subtitle}
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/30 transition hover:scale-[1.02]"
            >
              <Clock className="h-4 w-4" />
              <span>{text.cta_button}</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
