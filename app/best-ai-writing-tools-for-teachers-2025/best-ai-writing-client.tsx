"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuickAnswerBox } from "@/components/quick-answer-box";
import { TableOfContents } from "@/components/table-of-contents";
import { FAQSection } from "@/components/faq-section";
import { Check, Star, TrendingUp, X, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function BestAIWritingClient() {
  const pathname = usePathname();
  const isGerman = pathname?.includes("/de") ?? false;

  // --- CONTENT DICTIONARY (Dual-Language) ---
  const content = {
    en: {
      meta_updated: "Updated January 2025",
      hero_title: "10 Best AI Writing Tools for Teachers in 2025",
      hero_subtitle:
        "Tested by 10,000+ educators. Compare features, pricing, and real classroom results to find the perfect AI writing assistant for your teaching workflow.",
      cta_draft_free: "Try Zaza Draft Free",
      cta_compare: "Compare Tools",

      quick_answer_title: "Quick Answer: Best AI Writing Tool for Teachers",
      quick_answer_answer:
        "Zaza Draft is the best AI writing tool for teachers in 2025 because it's purpose-built for education with teacher-specific templates, FERPA compliance, and tone control. For general writing, ChatGPT Plus offers the most versatility. Claude Pro excels at long documents like report cards.",

      why_title: "Why AI Writing Tools Matter in 2025",
      why_p1:
        "Teachers spend an average of 11 hours per week on written communication - parent emails, feedback, reports, and documentation. AI writing tools can reduce this by 60-70% while improving quality and consistency.",
      why_p2:
        "But not all AI tools are created equal. Generic tools like ChatGPT lack teacher-specific features. Marketing tools like Jasper are overkill. And many tools raise privacy concerns with student data.",
      why_p3:
        "This guide compares 10 AI writing tools based on real teacher feedback, focusing on what matters most: ease of use, education-specific features, privacy compliance, and value for money.",

      top_tools_title: "Top 10 AI Writing Tools for Teachers",
      feature_comparison_title: "Feature Comparison",
      use_cases_title: "Use Cases by Subject & Grade Level",
      get_started_title: "Getting Started: 5-Minute Setup Guide",
      testimonials_title: "Teacher Success Stories",
      faq_title: "Frequently Asked Questions",
      cta_final_title: "Ready to Save 5+ Hours Per Week?",
      cta_final_subtitle:
        "Join 10,000+ teachers using Zaza Draft to write better parent emails, feedback, and reports in half the time.",
      cta_start_trial: "Start Free Trial",
      cta_email_guide: "See Parent Email Guide",

      // Sidebar
      related_guides_title: "Related Guides",
      sidebar_cta_title: "Try Zaza Draft",
      sidebar_cta_text:
        "Purpose-built for teachers. FERPA compliant. Free to start.",
      sidebar_cta_button: "Start Free",

      // Tool Data
      tools: [
        {
          rank: 1,
          name: "Zaza Draft",
          tagline: "Purpose-built for teachers",
          rating: 4.9,
          price: "Free - $16/mo",
          bestFor: "Parent emails, feedback, IEPs",
          pros: [
            "Teacher-specific templates",
            "FERPA compliant",
            "Tone control",
            "Multi-language",
          ],
          cons: ["Newer platform"],
          link: "/products/draft",
        },
        {
          rank: 2,
          name: "ChatGPT Plus",
          tagline: "Most versatile",
          rating: 4.7,
          price: "$20/mo",
          bestFor: "Lesson planning, creative writing",
          pros: ["Powerful", "Flexible", "Large context"],
          cons: ["Generic", "No templates", "Privacy concerns"],
        },
        {
          rank: 3,
          name: "Claude Pro",
          tagline: "Best for long documents",
          rating: 4.6,
          price: "$20/mo",
          bestFor: "Report cards, curriculum design",
          pros: ["200K context", "Thoughtful", "Safe"],
          cons: ["Slower", "Limited availability"],
        },
        {
          rank: 4,
          name: "Grammarly",
          tagline: "Polish existing writing",
          rating: 4.5,
          price: "Free - $30/mo",
          bestFor: "Editing, grammar checking",
          pros: ["Easy to use", "Browser extension", "Tone detector"],
          cons: ["Not generative", "Expensive premium"],
        },
        {
          rank: 5,
          name: "Jasper",
          tagline: "Marketing-focused",
          rating: 4.3,
          price: "$49/mo",
          bestFor: "Newsletter, announcements",
          pros: ["Templates", "Brand voice", "SEO tools"],
          cons: ["Expensive", "Overkill for teachers"],
        },
      ],

      // Use Cases Data
      useCases: [
        {
          subject: "Elementary",
          tasks: [
            "Parent newsletters",
            "Behavior notes",
            "Progress reports",
            "Class announcements",
          ],
          recommendedTool: "Zaza Draft",
          why: "Pre-built templates for common elementary scenarios",
        },
        {
          subject: "Middle School",
          tasks: [
            "Assignment feedback",
            "Conference prep",
            "Differentiation plans",
            "Team emails",
          ],
          recommendedTool: "Zaza Draft + ChatGPT",
          why: "Draft for communication, ChatGPT for lesson planning",
        },
        {
          subject: "High School",
          tasks: [
            "College rec letters",
            "Essay feedback",
            "Curriculum design",
            "AP prep",
          ],
          recommendedTool: "Claude Pro",
          why: "Handles long documents and nuanced writing",
        },
        {
          subject: "Special Education",
          tasks: [
            "IEP goals",
            "Accommodation letters",
            "Progress monitoring",
            "Parent communication",
          ],
          recommendedTool: "Zaza Draft",
          why: "FERPA-compliant with special ed templates",
        },
      ],

      // Testimonial Data (ENGLISH) - ADDED MISSING ARRAY
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
            "I use ChatGPT for lesson planning and Zaza Draft for parent communication. Together they save me 6-7 hours per week. Game changer for work-life balance.",
          name: "Michael T.",
          role: "High School English, California",
          image: "/testimonials/james-teacher.jpg",
        },
      ],

      // FAQ Data
      faqs: [
        {
          question: "Are AI writing tools allowed in schools?",
          answer:
            "Yes, but policies vary. Most districts allow teachers to use AI for administrative tasks (emails, reports) but have guidelines for student use. Always check your district policy and ensure student data privacy.",
        },
        {
          question: "Will AI replace teacher writing?",
          answer:
            "No. AI is a drafting tool, not a replacement. Teachers still provide the expertise, judgment, and personal touch. Think of it like spell-check - it helps, but you're still the writer.",
        },
        {
          question: "How do I ensure AI-generated content is accurate?",
          answer:
            "Always review and edit AI output. Use it as a first draft, not a final product. Verify facts, adjust tone, and add personal details. AI can hallucinate or miss context.",
        },
        {
          question: "What about student data privacy?",
          answer:
            "Never input student names, IDs, or sensitive information into generic AI tools. Use education-specific tools like Zaza Draft that are FERPA-compliant and designed for teacher use.",
        },
        {
          question: "Which tool is best for beginners?",
          answer:
            "Start with Zaza Draft if you need teacher-specific templates, or ChatGPT free tier for general writing. Both have gentle learning curves and don't require technical expertise.",
        },
      ],
    },

    // --- GERMAN TRANSLATIONS ---
    de: {
      meta_updated: "Aktualisiert: Januar 2025",
      hero_title: "Die 10 besten KI-Schreibwerkzeuge für Lehrer im Jahr 2025",
      hero_subtitle:
        "Von über 10.000 Pädagogen getestet. Vergleichen Sie Funktionen, Preise und Ergebnisse aus dem echten Klassenzimmer, um den perfekten KI-Schreibassistenten für Ihren Unterrichtsalltag zu finden.",
      cta_draft_free: "Zaza Draft kostenlos testen",
      cta_compare: "Werkzeuge vergleichen",

      quick_answer_title:
        "Kurzantwort: Das beste KI-Schreibwerkzeug für Lehrer",
      quick_answer_answer:
        "Zaza Draft ist das beste KI-Schreibwerkzeug für Lehrer im Jahr 2025, da es speziell für den Bildungsbereich entwickelt wurde und lehrerspezifische Vorlagen, DSGVO-Konformität und Tonfallkontrolle bietet. Für allgemeine Texte bietet ChatGPT Plus die größte Vielseitigkeit. Claude Pro eignet sich hervorragend für lange Dokumente wie Zeugnisse.",

      why_title: "Warum KI-Schreibwerkzeuge im Jahr 2025 wichtig sind",
      why_p1:
        "Lehrer verbringen durchschnittlich 11 Stunden pro Woche mit schriftlicher Kommunikation – Eltern-E-Mails, Feedback, Berichten und Dokumentation. KI-Schreibwerkzeuge können dies um 60–70 % reduzieren und gleichzeitig Qualität und Konsistenz verbessern.",
      why_p2:
        "Aber nicht alle KI-Werkzeuge sind gleich. Generischen Tools wie ChatGPT fehlt es an lehrerspezifischen Funktionen. Marketing-Tools wie Jasper sind überdimensioniert. Und viele Tools werfen Datenschutzbedenken hinsichtlich Schülerdaten auf.",
      why_p3:
        "Dieser Leitfaden vergleicht 10 KI-Schreibwerkzeuge basierend auf echtem Lehrer-Feedback, wobei der Schwerpunkt auf den wichtigsten Aspekten liegt: Benutzerfreundlichkeit, bildungsspezifische Funktionen, Datenschutzkonformität und Preis-Leistungs-Verhältnis.",

      top_tools_title: "Die 10 besten KI-Schreibwerkzeuge für Lehrer",
      feature_comparison_title: "Funktionsvergleich",
      use_cases_title: "Anwendungsfälle nach Fach und Klassenstufe",
      get_started_title: "Erste Schritte: 5-Minuten-Einrichtungsanleitung",
      testimonials_title: "Erfolgsgeschichten von Lehrern",
      faq_title: "Häufig gestellte Fragen",
      cta_final_title: "Bereit, 5+ Stunden pro Woche zu sparen?",
      cta_final_subtitle:
        "Schließen Sie sich über 10.000 Lehrern an, die Zaza Draft nutzen, um bessere Eltern-E-Mails, Feedback und Berichte in der Hälfte der Zeit zu schreiben.",
      cta_start_trial: "Kostenlose Testversion starten",
      cta_email_guide: "Leitfaden für Eltern-E-Mails ansehen",

      // Sidebar
      related_guides_title: "Verwandte Leitfäden",
      sidebar_cta_title: "Zaza Draft testen",
      sidebar_cta_text:
        "Speziell für Lehrer entwickelt. DSGVO-konform. Kostenlos starten.",
      sidebar_cta_button: "Kostenlos starten",

      // Tool Data
      tools: [
        {
          rank: 1,
          name: "Zaza Draft",
          tagline: "Speziell für Lehrer entwickelt",
          rating: 4.9,
          price: "Kostenlos - 14.99 €/Monat",
          bestFor: "Eltern-E-Mails, Feedback, IEPs",
          pros: [
            "Lehrerspezifische Vorlagen",
            "DSGVO-konform",
            "Tonfallkontrolle",
            "Mehrsprachig",
          ],
          cons: ["Neuere Plattform"],
          link: "/products/draft",
        },
        {
          rank: 2,
          name: "ChatGPT Plus",
          tagline: "Am vielseitigsten",
          rating: 4.7,
          price: "20 €/Monat",
          bestFor: "Unterrichtsplanung, kreatives Schreiben",
          pros: ["Leistungsstark", "Flexibel", "Großer Kontext"],
          cons: ["Generisch", "Keine Vorlagen", "Datenschutzbedenken"],
        },
        {
          rank: 3,
          name: "Claude Pro",
          tagline: "Am besten für lange Dokumente",
          rating: 4.6,
          price: "20 €/Monat",
          bestFor: "Zeugnisse, Lehrplangestaltung",
          pros: ["200K Kontext", "Durchdacht", "Sicher"],
          cons: ["Langsamer", "Begrenzte Verfügbarkeit"],
        },
        {
          rank: 4,
          name: "Grammarly",
          tagline: "Bestehende Texte optimieren",
          rating: 4.5,
          price: "Kostenlos - 30 €/Monat",
          bestFor: "Bearbeitung, Grammatikprüfung",
          pros: [
            "Einfach zu bedienen",
            "Browser-Erweiterung",
            "Tonfall-Erkennung",
          ],
          cons: ["Nicht generativ", "Teure Premium-Version"],
        },
        {
          rank: 5,
          name: "Jasper",
          tagline: "Marketing-fokussiert",
          rating: 4.3,
          price: "49 €/Monat",
          bestFor: "Newsletter, Ankündigungen",
          pros: ["Vorlagen", "Markenstimme", "SEO-Tools"],
          cons: ["Teuer", "Überdimensioniert für Lehrer"],
        },
      ],

      // Use Cases Data
      useCases: [
        {
          subject: "Grundschule",
          tasks: [
            "Eltern-Newsletter",
            "Verhaltensnotizen",
            "Fortschrittsberichte",
            "Klassenmitteilungen",
          ],
          recommendedTool: "Zaza Draft",
          why: "Vorgefertigte Vorlagen für gängige Szenarien der Grundschule",
        },
        {
          subject: "Mittelstufe",
          tasks: [
            "Feedback zu Aufgaben",
            "Konferenzvorbereitung",
            "Differenzierungspläne",
            "Team-E-Mails",
          ],
          recommendedTool: "Zaza Draft + ChatGPT",
          why: "Draft für Kommunikation, ChatGPT für Unterrichtsplanung",
        },
        {
          subject: "Oberstufe",
          tasks: [
            "Empfehlungsschreiben für Hochschulen",
            "Essay-Feedback",
            "Lehrplangestaltung",
            "AP-Vorbereitung",
          ],
          recommendedTool: "Claude Pro",
          why: "Bewältigt lange Dokumente und nuancierte Texte",
        },
        {
          subject: "Sonderpädagogik",
          tasks: [
            "IEP-Ziele",
            "Akkommodationsschreiben",
            "Fortschrittsüberwachung",
            "Elternkommunikation",
          ],
          recommendedTool: "Zaza Draft",
          why: "DSGVO-konform mit sonderpädagogischen Vorlagen",
        },
      ],

      // Testimonial Data (GERMAN) - Renamed to 'testimonials'
      testimonials: [
        {
          quote:
            "Zaza Draft hat meine Zeit für Eltern-E-Mails von 2 Stunden auf 30 Minuten pro Woche reduziert. Die Vorlagen verstehen die Sprache der Lehrer und die Tonfallkontrolle ist perfekt für sensible Situationen.",
          name: "Sarah M.",
          role: "Grundschullehrerin, Texas",
          image: "/testimonials/sarah-teacher.jpg",
        },
        {
          quote:
            "Ich nutze ChatGPT für die Unterrichtsplanung und Zaza Draft für die Elternkommunikation. Zusammen sparen sie mir 6–7 Stunden pro Woche. Ein Wendepunkt für die Work-Life-Balance.",
          name: "Michael T.",
          role: "Englischlehrer an der Oberstufe, Kalifornien",
          image: "/testimonials/james-teacher.jpg",
        },
      ],

      // FAQ Data
      faqs: [
        {
          question: "Sind KI-Schreibwerkzeuge in Schulen erlaubt?",
          answer:
            "Ja, aber die Richtlinien sind unterschiedlich. Die meisten Bezirke erlauben Lehrern, KI für Verwaltungsaufgaben (E-Mails, Berichte) zu nutzen, haben jedoch Richtlinien für die Schülernutzung. Überprüfen Sie immer die Richtlinien Ihres Bezirks und stellen Sie den Datenschutz sicher.",
        },
        {
          question: "Wird KI das Schreiben von Lehrern ersetzen?",
          answer:
            "Nein. KI ist ein Entwurfswerkzeug, kein Ersatz. Lehrer liefern weiterhin das Fachwissen, das Urteilsvermögen und die persönliche Note. Betrachten Sie es als Rechtschreibprüfung – es hilft, aber Sie sind immer noch der Verfasser.",
        },
        {
          question:
            "Wie stelle ich sicher, dass KI-generierte Inhalte korrekt sind?",
          answer:
            "Überprüfen und bearbeiten Sie immer die KI-Ausgabe. Verwenden Sie sie als ersten Entwurf, nicht als Endprodukt. Überprüfen Sie Fakten, passen Sie den Tonfall an und fügen Sie persönliche Details hinzu. KI kann halluzinieren oder den Kontext verfehlen.",
        },
        {
          question: "Wie steht es um den Datenschutz der Schülerdaten?",
          answer:
            "Geben Sie niemals Schülernamen, IDs oder sensible Informationen in generische KI-Tools ein. Verwenden Sie bildungsspezifische Tools wie Zaza Draft, die DSGVO-konform und für die Lehrernutzung konzipiert sind.",
        },
        {
          question: "Welches Tool ist am besten für Anfänger geeignet?",
          answer:
            "Beginnen Sie mit Zaza Draft, wenn Sie lehrerspezifische Vorlagen benötigen, oder der kostenlosen ChatGPT-Version für allgemeine Texte. Beide haben eine sanfte Lernkurve und erfordern keine technischen Kenntnisse.",
        },
      ],
    },
  };

  const text = isGerman ? content.de : content.en;

  // Use the tools data from the selected language
  const tools = text.tools;
  const useCases = text.useCases;
  const faqs = text.faqs;
  // SIMPLIFIED ARRAY SELECTION: Now correctly points to the 'testimonials' key in the selected language object
  const testimonials = text.testimonials;

  const tocItems = [
    {
      id: "quick-answer",
      title: isGerman ? "Kurzantwort" : "Quick Answer",
      level: 2,
    },
    { id: "why-ai-writing", title: text.why_title, level: 2 },
    { id: "top-tools", title: text.top_tools_title, level: 2 },
    { id: "comparison", title: text.feature_comparison_title, level: 2 },
    { id: "use-cases", title: text.use_cases_title, level: 2 },
    {
      id: "getting-started",
      title: isGerman ? "Erste Schritte" : "Getting Started Guide",
      level: 2,
    },
    { id: "testimonials", title: text.testimonials_title, level: 2 },
    { id: "faq", title: text.faq_title, level: 2 },
  ];

  const breadcrumbItems = [
    {
      label: isGerman ? "Lernzentrum" : "Learning Centre",
      href: "/learning-centre",
    },
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
              <TrendingUp className="h-4 w-4" />
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
                <Link href="/products/draft">{text.cta_draft_free}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
              >
                <Link href="#comparison">{text.cta_compare}</Link>
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
            <QuickAnswerBox
              id="quick-answer"
              title={text.quick_answer_title}
              answer={text.quick_answer_answer}
              cta={{
                text: text.cta_draft_free,
                href: "/products/draft",
              }}
            />

            {/* Why AI Writing Tools Matter */}
            <section id="why-ai-writing" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-[#A78BFA]" />
                {text.why_title}
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>{text.why_p1}</p>
                <p>{text.why_p2}</p>
                <p>{text.why_p3}</p>
              </div>
            </section>

            {/* Top 10 Tools */}
            <section id="top-tools" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white">
                {text.top_tools_title}
              </h2>
              <div className="space-y-6">
                {tools.map((tool) => (
                  <div
                    key={tool.rank}
                    className="rounded-xl border border-white/10 bg-[#1E293B] p-6 hover:border-[#8B5CF6]/50 transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/20"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6] text-base font-bold text-white">
                            {tool.rank}
                          </span>
                          <h3 className="text-2xl font-bold text-white">
                            {tool.name}
                          </h3>
                        </div>
                        <p className="text-base text-gray-400">
                          {tool.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-[#8B5CF6]/10 px-3 py-1.5 rounded-full">
                        <Star className="h-4 w-4 fill-[#A78BFA] text-[#A78BFA]" />
                        <span className="font-semibold text-white">
                          {tool.rating}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <div className="bg-[#0F172A]/50 rounded-lg p-4 border border-white/5">
                        <p className="mb-1 text-sm font-medium text-gray-400">
                          {isGerman ? "Preis" : "Price"}
                        </p>
                        <p className="text-white font-semibold">{tool.price}</p>
                      </div>
                      <div className="bg-[#0F172A]/50 rounded-lg p-4 border border-white/5">
                        <p className="mb-1 text-sm font-medium text-gray-400">
                          {isGerman ? "Am besten geeignet für" : "Best For"}
                        </p>
                        <p className="text-white font-semibold">
                          {tool.bestFor}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-3 text-sm font-semibold text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          {isGerman ? "Vorteile" : "Pros"}
                        </p>
                        <ul className="space-y-2">
                          {tool.pros.map((pro, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-300"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-semibold text-orange-400 flex items-center gap-2">
                          <X className="w-4 h-4" />
                          {isGerman ? "Nachteile" : "Cons"}
                        </p>
                        <ul className="space-y-2">
                          {tool.cons.map((con, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-300"
                            >
                              {/* FIX: Replaced Ã¢â‚¬Â¢ with a standard hyphen/dash or nothing if not needed */}
                              <span className="text-orange-400">−</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {tool.link && (
                      <Button
                        asChild
                        className="w-full sm:w-auto bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                      >
                        <Link href={tool.link}>
                          {isGerman ? "Mehr erfahren" : "Learn More"}
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">
                {text.feature_comparison_title}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full">
                  <thead className="bg-[#1E293B]">
                    <tr>
                      <th className="p-4 text-left font-semibold text-white border-b border-white/10">
                        {isGerman ? "Funktion" : "Feature"}
                      </th>
                      <th className="p-4 text-center font-semibold text-white border-b border-white/10">
                        Zaza Draft
                      </th>
                      <th className="p-4 text-center font-semibold text-white border-b border-white/10">
                        ChatGPT
                      </th>
                      <th className="p-4 text-center font-semibold text-white border-b border-white/10">
                        Claude
                      </th>
                      <th className="p-4 text-center font-semibold text-white border-b border-white/10">
                        Grammarly
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 bg-[#0F172A]">
                    {/* Teacher Templates */}
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {isGerman ? "Lehrervorlagen" : "Teacher Templates"}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center text-gray-500">-</td>
                      <td className="p-4 text-center text-gray-500">-</td>
                      <td className="p-4 text-center text-gray-500">-</td>
                    </tr>
                    {/* FERPA Compliant / GDPR-konform */}
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {isGerman ? "DSGVO-konform" : "FERPA Compliant"}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center text-gray-500">-</td>
                      <td className="p-4 text-center text-gray-500">-</td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                    </tr>
                    {/* Tone Control */}
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {isGerman ? "Tonfallkontrolle" : "Tone Control"}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center text-gray-400 text-sm">
                        {isGerman ? "Manuell" : "Manual"}
                      </td>
                      <td className="p-4 text-center text-gray-400 text-sm">
                        {isGerman ? "Manuell" : "Manual"}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                    </tr>
                    {/* Multi-language */}
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {isGerman ? "Mehrsprachig" : "Multi-language"}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center text-gray-400 text-sm">
                        {isGerman ? "Begrenzt" : "Limited"}
                      </td>
                    </tr>
                    {/* Free Tier */}
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {isGerman ? "Kostenlose Version" : "Free Tier"}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                    </tr>
                    {/* Price (Premium) - UPDATED PRICE */}
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">
                        {isGerman ? "Preis (Premium)" : "Price (Premium)"}
                      </td>
                      {/* Zaza Draft: $16/mo or 14.99 €/Monat */}
                      <td className="p-4 text-center text-white font-semibold">
                        {isGerman ? "14.99 €/Monat" : "$16/mo"}
                      </td>
                      <td className="p-4 text-center text-white font-semibold">
                        {isGerman ? "20 €/Monat" : "$20/mo"}
                      </td>
                      <td className="p-4 text-center text-white font-semibold">
                        {isGerman ? "20 €/Monat" : "$20/mo"}
                      </td>
                      <td className="p-4 text-center text-white font-semibold">
                        {isGerman ? "30 €/Monat" : "$30/mo"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Use Cases */}
            <section id="use-cases" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">
                {text.use_cases_title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.subject}
                    className="rounded-xl border border-white/10 bg-[#1E293B] p-6 hover:border-[#8B5CF6]/50 transition-all"
                  >
                    <h3 className="mb-4 text-xl font-bold text-white">
                      {useCase.subject}
                    </h3>
                    <div className="mb-4 space-y-3">
                      <p className="text-sm font-medium text-gray-400">
                        {isGerman ? "Häufige Aufgaben:" : "Common Tasks:"}
                      </p>
                      <ul className="space-y-2">
                        {useCase.tasks.map((task, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-4">
                      <p className="mb-1 text-sm font-medium text-gray-400">
                        {isGerman
                          ? "Empfohlenes Werkzeug:"
                          : "Recommended Tool:"}
                      </p>
                      <p className="mb-2 font-semibold text-[#A78BFA] text-lg">
                        {useCase.recommendedTool}
                      </p>
                      <p className="text-sm text-gray-300">{useCase.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <Zap className="w-8 h-8 text-[#A78BFA]" />
                {text.get_started_title}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: isGerman
                      ? "Wählen Sie Ihr Werkzeug"
                      : "Choose Your Tool",
                    description: isGerman
                      ? "Beginnen Sie mit Zaza Draft, wenn Sie lehrerspezifische Vorlagen benötigen. Testen Sie ChatGPT (kostenlose Version) für allgemeine Texte. Für beide ist keine Kreditkarte erforderlich."
                      : "Start with Zaza Draft if you need teacher-specific templates. Try ChatGPT free tier for general writing. Both have no credit card required.",
                  },
                  {
                    step: 2,
                    title: isGerman
                      ? "Beginnen Sie mit einer Aufgabe"
                      : "Start with One Task",
                    description: isGerman
                      ? "Versuchen Sie nicht, alles auf einmal zu automatisieren. Wählen Sie eine sich wiederholende Aufgabe (wie Eltern-E-Mails) und meistern Sie diese zuerst."
                      : "Don't try to automate everything at once. Pick one repetitive task (like parent emails) and master it first.",
                  },
                  {
                    step: 3,
                    title: isGerman
                      ? "Überprüfen & Bearbeiten"
                      : "Review & Edit",
                    description: isGerman
                      ? "Überprüfen Sie immer die KI-Ausgabe. Fügen Sie persönliche Details hinzu, überprüfen Sie Fakten und passen Sie den Tonfall an. KI ist ein erster Entwurf, kein Endprodukt."
                      : "Always review AI output. Add personal details, verify facts, and adjust tone. AI is a first draft, not a final product.",
                  },
                  {
                    step: 4,
                    title: isGerman
                      ? "Schützen Sie die Privatsphäre der Schüler"
                      : "Protect Student Privacy",
                    description: isGerman
                      ? "Geben Sie niemals Schülernamen oder sensible Daten in generische KI-Tools ein. Verwenden Sie bildungsspezifische Tools oder anonymisieren Sie Informationen."
                      : "Never input student names or sensitive data into generic AI tools. Use education-specific tools or anonymize information.",
                  },
                  {
                    step: 5,
                    title: isGerman
                      ? "Schrittweise erweitern"
                      : "Expand Gradually",
                    description: isGerman
                      ? "Sobald Sie sich wohl fühlen, fügen Sie weitere Anwendungsfälle hinzu. Die meisten Lehrer sparen innerhalb eines Monats konstanter Nutzung 5–8 Stunden pro Woche."
                      : "Once comfortable, add more use cases. Most teachers save 5-8 hours per week within a month of consistent use.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 bg-[#1E293B] rounded-xl p-6 border border-white/10 hover:border-[#8B5CF6]/50 transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] text-xl font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
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
                {testimonials.map(
                  (
                    testimonial,
                    i, // Using the correctly selected 'testimonials' array
                  ) => (
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

                      {/* Teacher Profile Section */}
                      <div className="flex items-center gap-4 mt-6">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="rounded-full object-cover border-2 border-[#A78BFA]"
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
                  ),
                )}
              </div>
            </section>

            {/* FAQ */}
            <FAQSection
              id="faq"
              title={text.faq_title}
              faqs={faqs}
              schemaContext={
                isGerman
                  ? "KI-Schreibwerkzeuge für Lehrer"
                  : "AI Writing Tools for Teachers"
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
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                >
                  <Link href="/pricing">{text.cta_start_trial}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
                >
                  <Link href="/best-ai-tool-parent-emails">
                    {text.cta_email_guide}
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <TableOfContents items={tocItems} />

            {/* Related Resources */}
            <div className="rounded-xl border border-white/10 bg-[#1E293B] p-6">
              <h3 className="mb-4 font-semibold text-white">
                {text.related_guides_title}
              </h3>
              <div className="space-y-3">
                <Link
                  href="/best-ai-tool-parent-emails"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  →{" "}
                  {isGerman
                    ? "Bestes KI-Werkzeug für Eltern-E-Mails"
                    : "Best AI Tool for Parent Emails"}
                </Link>
                <Link
                  href="/reduce-stress-parent-messages"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  →{" "}
                  {isGerman
                    ? "Stress mit KI-Nachrichten reduzieren"
                    : "Reduce Stress with AI Messages"}
                </Link>
                <Link
                  href="/ai-for-student-reports"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  →{" "}
                  {isGerman
                    ? "KI für Schülerberichte"
                    : "AI for Student Reports"}
                </Link>
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/10 p-6">
              <h3 className="mb-2 font-semibold text-white">
                {text.sidebar_cta_title}
              </h3>
              <p className="mb-4 text-sm text-gray-300">
                {text.sidebar_cta_text}
              </p>
              <Button
                asChild
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                <Link href="/products/draft">{text.sidebar_cta_button}</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
