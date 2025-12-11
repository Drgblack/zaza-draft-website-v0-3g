"use client";

import React from "react";
import { useLanguage } from "../../src/contexts/LanguageContext";
import Image from "next/image";
import { Check, Shield, Zap, Volume2, X, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQSection } from "@/components/faq-section";
import { TableOfContents } from "@/components/table-of-contents";
import Link from "next/link";

export default function ReduceStressClient() {
  const { language } = useLanguage();
  const isGerman = language === "de";

  const IconMap = {
    Check: Check,
    X: X,
    Zap: Zap,
    Volume2: Volume2,
    Shield: Shield,
    TrendingUp: TrendingUp,
  };

  const RenderIcon = ({ iconName, className }: { iconName: keyof typeof IconMap; className?: string }) => {
    const IconComponent = IconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  // --- CONTENT DICTIONARY (Dual-Language) ---
  const content = {
    en: {
      meta_updated: "Updated October 2025",
      hero_title:
        "How to Reduce Stress from Parent Messages (Without Ignoring Them)",
      hero_subtitle:
        "Messages that usually take 10+ hours per week can be drafted in minutes.",
      cta_primary: "Try Zaza Shield Free",
      cta_secondary: "See 5 Strategies",

      quick_answer_title: "Quick Answer",
      quick_answer_answer:
        "The stress from parent messages comes from three sources: unpredictable timing, emotional weight, and the pressure to respond perfectly. The solution isn't to ignore messages or work longer hours - it's to implement systems that reduce the mental load while maintaining (or improving) relationship quality.",

      why_title: "Why Parent Messages Feel So Stressful",
      real_problem:
        "The Real Problem: It's not that you're bad at communication. It's that you're trying to maintain professional-level communication standards while juggling 30 other responsibilities, with no administrative support, and no clear end to your workday.",
      why_points: [
        {
          title: "Unpredictable Timing",
          description:
            "Messages arrive at 6 AM, during lunch, at 9 PM. You never know when you'll need to shift from teacher mode to diplomat mode.",
          icon: "X",
        },
        {
          title: "Emotional Weight",
          description:
            "Every message carries potential conflict. Even simple questions feel loaded when you're already stretched thin.",
          icon: "X",
        },
        {
          title: "Perfectionism Pressure",
          description:
            "You know your response will be screenshot, forwarded, or discussed. The stakes feel high for every word.",
          icon: "X",
        },
        {
          title: "No Clear Boundaries",
          description:
            "When does your workday end? When should you respond? The lines are blurry, and that ambiguity creates constant low-level anxiety.",
          icon: "X",
        },
      ],

      cost_title: "The Hidden Cost of Communication Stress",
      cost_points: [
        {
          title: "Reduced Classroom Presence",
          description:
            "When you're mentally rehearsing email responses during class, you're not fully present with students. That mental split-screen drains your energy and effectiveness.",
          icon: "TrendingUp",
        },
        {
          title: "Time Displacement",
          description:
            "Every hour spent on parent communication is an hour not spent on lesson planning, grading, or professional development. The opportunity cost is real.",
          icon: "TrendingUp",
        },
        {
          title: "Emotional Exhaustion",
          description:
            "Constant vigilance about parent communication creates a baseline level of anxiety that contributes to burnout. It's death by a thousand paper cuts.",
          icon: "TrendingUp",
        },
      ],
      research_stats: [
        "Teachers spend an average of 7-10 hours per week on parent communication.",
        "67% of teachers report parent communication as a top source of job stress.",
        "Communication stress is a leading factor in teacher attrition.",
      ],

      strategies_title: "5 Strategies That Actually Work",
      strategies: [
        {
          step: 1,
          title: "Set Clear Communication Windows",
          description:
            "Establish specific times when you check and respond to messages. Communicate these boundaries clearly to parents at the start of the year.",
          example:
            '"I check parent messages twice daily: once at 7:30 AM and once at 4:00 PM. I aim to respond within 24 hours during the school week. For urgent matters, please contact the main office."',
        },
        {
          step: 2,
          title: "Build a Template Library",
          description:
            "Create templates for the 10-15 most common message types. Personalize each one, but start from a proven structure.",
          categories: [
            "Absence follow-up",
            "Homework concerns",
            "Behavior updates (positive and corrective)",
            "Grade explanations",
            "Conference scheduling",
            "Weekly class updates",
          ],
        },
        {
          step: 3,
          title: "Use AI for First Drafts",
          description:
            "Let AI tools like Zaza Draft handle the initial heavy lifting. You review, personalize, and send. This cuts drafting time by 70% while maintaining quality.",
          workflow: [
            "Input the context (student name, situation, tone needed)",
            "AI generates a draft in 10 seconds",
            "You review and add personal touches (30 seconds)",
            "Send with confidence",
          ],
        },
        {
          step: 4,
          title: "Batch Your Responses",
          description:
            "Instead of responding to messages as they arrive (constant interruption), batch them into your designated communication windows. This protects your focus and reduces context-switching fatigue.",
        },
        {
          step: 5,
          title: "Track Patterns and Prevent Issues",
          description:
            "Keep a simple log of recurring parent concerns. When you see patterns, address them proactively through class newsletters or policy updates. Prevention is easier than reaction.",
        },
      ],

      ai_load_title: "How AI Reduces the Mental Load",
      ai_load_subtitle:
        "AI tools like Zaza Shield don't replace your judgment - they reduce the cognitive burden of drafting responses so you can focus on the relationship, not the wording.",

      comparison: {
        without_title: "Without AI",
        without_points: [
          "Stare at blank screen for 5 minutes",
          "Draft, delete, redraft multiple times",
          "Worry about tone and wording",
          "Second-guess yourself after sending",
          "Total time: 15-20 minutes per message",
        ],
        with_title: "With AI (Zaza Shield)",
        with_points: [
          "Input context in 30 seconds",
          "AI generates professional draft instantly",
          "Review and personalize (1-2 minutes)",
          "Send with confidence",
          "Total time: 3-4 minutes per message",
        ],
      },

      features_title: "What Zaza Shield Does:",
      features: [
        "Tone Calibration: Automatically adjusts formality, warmth, and directness based on the situation",
        "Structure Optimization: Organizes your thoughts into clear, professional paragraphs",
        "Diplomatic Language: Handles sensitive topics with appropriate professional language",
        "Personalization Prompts: Suggests where to add personal touches for authenticity",
      ],

      guide_title: "Implementation Guide: Your First Week",
      guide_steps: [
        {
          week: 1,
          title: "Set Boundaries",
          points: [
            "Decide on your communication windows (e.g., 7:30 AM and 4:00 PM)",
            "Draft a boundary statement for your email signature and class newsletter",
            "Turn off email notifications outside your communication windows",
            "Communicate boundaries to parents (they'll respect them if you're clear)",
          ],
        },
        {
          week: 2,
          title: "Build Templates",
          points: [
            "Review your last 20 parent messages - identify the 5 most common types",
            "Create templates for those 5 message types",
            "Save templates in a easily accessible document or tool",
            "Use templates for at least 50% of your responses this week",
          ],
        },
        {
          week: 3,
          title: "Add AI",
          points: [
            "Sign up for Zaza Shield (free trial, no credit card)",
            "Start with ONE message type (e.g., absence follow-ups)",
            "Use AI for drafts, review and personalize before sending",
            "Track time saved (you'll be amazed)",
          ],
        },
        {
          week: 4,
          title: "Optimize and Expand",
          points: [
            "Review what's working - adjust boundaries or templates as needed",
            "Expand AI use to 2-3 more message types",
            "Start tracking patterns for proactive prevention",
            "Celebrate your reduced stress and reclaimed time!",
          ],
        },
      ],

      testimonials: [
        {
          quote:
            "I was spending 2 hours every evening on parent emails. Now it's 20 minutes. The AI drafts are so good that I barely need to edit them. My stress level has dropped dramatically.",
          name: "Sarah M.",
          role: "4th Grade, Texas",
          stats: ["90%", "Time Saved"],
          image: "/testimonials/sarah-teacher.jpg",
        },
        {
          quote:
            "Setting communication boundaries was scary at first, but parents actually appreciated the clarity. Combined with AI drafts, I've cut my communication time in half while improving response quality.",
          name: "Marcus T.",
          role: "High School English, California",
          stats: ["50%", "Time Saved", "Better Quality"],
          image: "/testimonials/james-teacher.jpg",
        },
      ],

      cta_final_title: "Ready to Reduce Your Communication Stress?",
      cta_final_subtitle:
        "Join 10,000+ teachers who've reclaimed their time and peace of mind",

      faqs: [
        {
          question: "Won't parents notice if I use AI to respond?",
          answer:
            "AI generates the first draft; you add personalization. This ensures authenticity while improving clarity and professionalism. They will notice the improved communication, not the AI.",
        },
        {
          question: "How much time can I realistically save?",
          answer:
            "Teachers typically save 60-70% of drafting time. This translates to 5-8 hours per week of reclaimed time.",
        },
        {
          question: "What if a parent message requires a sensitive response?",
          answer:
            "Zaza Shield's tone control is designed for sensitive topics, ensuring diplomatic, professional language. You always review the draft before sending.",
        },
        {
          question: "Will using AI make me less connected to parents?",
          answer:
            "No. By reducing the mental burden of drafting, you can focus on the actual relationship and context, making your communication more intentional and effective.",
        },
        {
          question: "How do I get started without feeling overwhelmed?",
          answer:
            "Follow the 4-week Implementation Guide on this page. Start small by setting boundaries and then gradually integrating AI into one message type at a time.",
        },
      ],
    },

    // --- GERMAN TRANSLATIONS ---
    de: {
      meta_updated: "Aktualisiert: Oktober 2025",
      hero_title:
        "So reduzieren Sie Stress durch Elternnachrichten (Ohne sie zu ignorieren)",
      hero_subtitle:
        "Nachrichten, die normalerweise über 10 Stunden pro Woche in Anspruch nehmen, können in wenigen Minuten entworfen werden.",
      cta_primary: "Zaza Shield kostenlos testen",
      cta_secondary: "5 Strategien ansehen",

      quick_answer_title: "Kurzantwort",
      quick_answer_answer:
        "Der Stress durch Elternnachrichten entsteht aus drei Quellen: unvorhersehbarem Timing, emotionaler Belastung und dem Druck, perfekt zu antworten. Die Lösung besteht nicht darin, Nachrichten zu ignorieren oder länger zu arbeiten, sondern Systeme zu implementieren, die die mentale Belastung reduzieren und gleichzeitig die Beziehungsqualität aufrechterhalten (oder verbessern).",

      why_title: "Warum Elternnachrichten so stressig sind",
      real_problem:
        "Das eigentliche Problem: Es liegt nicht daran, dass Ihre Kommunikation schlecht ist. Es liegt daran, dass Sie versuchen, professionelle Kommunikationsstandards aufrechtzuerhalten, während Sie 30 andere Aufgaben jonglieren, ohne administrative Unterstützung und ohne klares Ende Ihres Arbeitstages.",
      why_points: [
        {
          title: "Unvorhersehbares Timing",
          description:
            "Nachrichten kommen um 6 Uhr morgens, während der Mittagspause oder um 21 Uhr an. Sie wissen nie, wann Sie vom Lehrer- in den Diplomatenmodus wechseln müssen.",
          icon: "X",
        },
        {
          title: "Emotionale Belastung",
          description:
            "Jede Nachricht birgt potenziellen Konflikt. Sogar einfache Fragen fühlen sich belastend an, wenn Sie bereits überlastet sind.",
          icon: "X",
        },
        {
          title: "Perfektionismus-Druck",
          description:
            "Sie wissen, dass Ihre Antwort als Screenshot geteilt oder diskutiert wird. Der Einsatz fühlt sich für jedes Wort hoch an.",
          icon: "X",
        },
        {
          title: "Keine klaren Grenzen",
          description:
            "Wann endet Ihr Arbeitstag? Wann sollten Sie antworten? Die Grenzen sind verschwommen, und diese Unklarheit erzeugt ständige geringe Angstzustände.",
          icon: "X",
        },
      ],

      cost_title: "Die versteckten Kosten des Kommunikationsstresses",
      cost_points: [
        {
          title: "Reduzierte Präsenz im Klassenzimmer",
          description:
            "Wenn Sie im Unterricht mental E-Mail-Antworten proben, sind Sie nicht vollständig bei den Schülern. Diese mentale Aufteilung kostet Energie und Effektivität.",
          icon: "TrendingUp",
        },
        {
          title: "Zeitliche Verschiebung",
          description:
            "Jede Stunde, die für die Elternkommunikation aufgewendet wird, ist eine Stunde, die nicht für die Unterrichtsplanung, Benotung oder berufliche Weiterentwicklung genutzt wird. Die Opportunitätskosten sind real.",
          icon: "TrendingUp",
        },
        {
          title: "Emotionale Erschöpfung",
          description:
            "Ständige Wachsamkeit bezüglich der Elternkommunikation erzeugt ein Grundniveau an Angst, das zum Burnout beiträgt. Es ist der Tod durch tausend kleine Schnitte.",
          icon: "TrendingUp",
        },
      ],
      research_stats: [
        "Lehrer verbringen durchschnittlich 7–10 Stunden pro Woche mit Elternkommunikation.",
        "67 % der Lehrer geben an, dass die Elternkommunikation eine der größten Stressquellen im Job ist.",
        "Kommunikationsstress ist ein Hauptfaktor für die Fluktuation von Lehrern.",
      ],

      strategies_title: "5 Strategien, die tatsächlich funktionieren",
      strategies: [
        {
          step: 1,
          title: "Legen Sie klare Kommunikationsfenster fest",
          description:
            "Legen Sie bestimmte Zeiten fest, zu denen Sie Nachrichten überprüfen und beantworten. Kommunizieren Sie diese Grenzen den Eltern zu Beginn des Jahres klar.",
          example:
            '"Ich überprüfe Elternnachrichten zweimal täglich: einmal um 7:30 Uhr und einmal um 16:00 Uhr. Ich bemühe mich, während der Schulwoche innerhalb von 24 Stunden zu antworten. Bei dringenden Angelegenheiten wenden Sie sich bitte an das Hauptbüro."',
        },
        {
          step: 2,
          title: "Erstellen Sie eine Vorlagenbibliothek",
          description:
            "Erstellen Sie Vorlagen für die 10–15 häufigsten Nachrichtentypen. Personalisieren Sie jede, beginnen Sie jedoch mit einer bewährten Struktur.",
          categories: [
            "Abwesenheits-Follow-up",
            "Hausaufgaben-Bedenken",
            "Verhaltens-Updates (positiv und korrigierend)",
            "Notenerklärungen",
            "Konferenzplanung",
            "Wöchentliche Klassen-Updates",
          ],
        },
        {
          step: 3,
          title: "KI für erste Entwürfe nutzen",
          description:
            "Überlassen Sie KI-Tools wie Zaza Draft die anfängliche Schwerarbeit. Sie überprüfen, personalisieren und senden. Dies reduziert die Entwurfszeit um 70 %, während die Qualität erhalten bleibt.",
          workflow: [
            "Kontext eingeben (Name des Schülers, Situation, benötigter Tonfall)",
            "KI erstellt in 10 Sekunden einen Entwurf",
            "Sie überprüfen und fügen persönliche Details hinzu (30 Sekunden)",
            "Mit Zuversicht senden",
          ],
        },
        {
          step: 4,
          title: "Antworten bündeln (Batching)",
          description:
            "Anstatt Nachrichten bei deren Eintreffen zu beantworten (ständige Unterbrechung), bündeln Sie sie in Ihren festgelegten Kommunikationsfenstern. Dies schützt Ihren Fokus und reduziert die Ermüdung durch Kontextwechsel.",
        },
        {
          step: 5,
          title: "Muster verfolgen und Probleme verhindern",
          description:
            "Führen Sie ein einfaches Protokoll wiederkehrender Bedenken von Eltern. Wenn Sie Muster erkennen, sprechen Sie diese proaktiv über Klassen-Newsletter oder Richtlinien-Updates an. Vorbeugung ist einfacher als Reaktion.",
        },
      ],

      ai_load_title: "Wie KI die mentale Belastung reduziert",
      ai_load_subtitle:
        "KI-Tools wie Zaza Shield ersetzen nicht Ihr Urteilsvermögen – sie reduzieren die kognitive Belastung beim Verfassen von Antworten, sodass Sie sich auf die Beziehung und nicht auf die Formulierung konzentrieren können.",

      comparison: {
        without_title: "Ohne KI",
        without_points: [
          "5 Minuten lang auf den leeren Bildschirm starren",
          "Mehrfach entwerfen, löschen, neu entwerfen",
          "Sich um Tonfall und Formulierung sorgen",
          "Sich nach dem Senden selbst in Frage stellen",
          "Gesamtzeit: 15–20 Minuten pro Nachricht",
        ],
        with_title: "Mit KI (Zaza Shield)",
        with_points: [
          "Kontext in 30 Sekunden eingeben",
          "KI generiert sofort einen professionellen Entwurf",
          "Überprüfen und personalisieren (1–2 Minuten)",
          "Mit Zuversicht senden",
          "Gesamtzeit: 3–4 Minuten pro Nachricht",
        ],
      },

      features_title: "Was Zaza Shield leistet:",
      features: [
        "Tonfallkalibrierung: Passt Formalität, Wärme und Direktheit automatisch an die Situation an",
        "Struktur-Optimierung: Organisiert Ihre Gedanken in klare, professionelle Absätze",
        "Diplomatische Sprache: Behandelt sensible Themen mit angemessener professioneller Sprache",
        "Personalization Prompts: Schlägt vor, wo persönliche Akzente für Authentizität hinzugefügt werden können",
      ],

      guide_title: "Implementierungsleitfaden: Ihre erste Woche",
      guide_steps: [
        {
          week: 1,
          title: "Grenzen setzen",
          points: [
            "Entscheiden Sie sich für Ihre Kommunikationsfenster (z. B. 7:30 Uhr und 16:00 Uhr)",
            "Entwerfen Sie eine Grenzfestlegung für Ihre E-Mail-Signatur und den Klassen-Newsletter",
            "Deaktivieren Sie E-Mail-Benachrichtigungen außerhalb Ihrer Kommunikationsfenster",
            "Kommunizieren Sie die Grenzen an die Eltern (sie werden sie respektieren, wenn Sie klar sind)",
          ],
        },
        {
          week: 2,
          title: "Vorlagen erstellen",
          points: [
            "Überprüfen Sie Ihre letzten 20 Elternnachrichten – identifizieren Sie die 5 häufigsten Typen",
            "Erstellen Sie Vorlagen für diese 5 Nachrichtentypen",
            "Speichern Sie Vorlagen in einem leicht zugänglichen Dokument oder Tool",
            "Verwenden Sie diese Woche Vorlagen für mindestens 50 % Ihrer Antworten",
          ],
        },
        {
          week: 3,
          title: "KI hinzufügen",
          points: [
            "Melden Sie sich für Zaza Shield an (kostenlose Testversion, keine Kreditkarte)",
            "Beginnen Sie mit EINEM Nachrichtentyp (z. B. Abwesenheits-Follow-ups)",
            "Verwenden Sie KI für Entwürfe, überprüfen und personalisieren Sie diese vor dem Senden",
            "Verfolgen Sie die gesparte Zeit (Sie werden erstaunt sein)",
          ],
        },
        {
          week: 4,
          title: "Optimieren und erweitern",
          points: [
            "Überprüfen Sie, was funktioniert – passen Sie Grenzen oder Vorlagen nach Bedarf an",
            "Erweitern Sie die KI-Nutzung auf 2–3 weitere Nachrichtentypen",
            "Starten Sie das Verfolgen von Mustern zur proaktiven Vorbeugung",
            "Feiern Sie Ihren reduzierten Stress und Ihre wiedergewonnene Zeit!",
          ],
        },
      ],

      testimonials: [
        {
          quote:
            "Ich habe jeden Abend 2 Stunden für Eltern-E-Mails aufgewendet. Jetzt sind es 20 Minuten. Die KI-Entwürfe sind so gut, dass ich sie kaum bearbeiten muss. Mein Stresslevel ist drastisch gesunken.",
          name: "Sarah M.",
          role: "Grundschule, Texas",
          stats: ["90%", "Zeit gespart"],
          image: "/testimonials/sarah-teacher.jpg",
        },
        {
          quote:
            "Das Festlegen von Kommunikationsgrenzen war zuerst beängstigend, aber die Eltern schätzten die Klarheit tatsächlich. In Kombination mit KI-Entwürfen habe ich meine Kommunikationszeit halbiert und gleichzeitig die Antwortqualität verbessert.",
          name: "Marcus T.",
          role: "Englischlehrer an der Oberstufe, Kalifornien",
          stats: ["50%", "Zeit gespart", "Bessere Qualität"],
          image: "/testimonials/james-teacher.jpg",
        },
      ],

      cta_final_title: "Bereit, Ihren Kommunikationsstress zu reduzieren?",
      cta_final_subtitle:
        "Schließen Sie sich über 10.000 Lehrern an, die ihre Zeit und ihre innere Ruhe zurückgewonnen haben",

      faqs: [
        {
          question:
            "Werden Eltern nicht merken, wenn ich KI zum Antworten verwende?",
          answer:
            "KI generiert den ersten Entwurf; Sie fügen die Personalisierung hinzu. Dies gewährleistet Authentizität und verbessert gleichzeitig Klarheit und Professionalität. Sie werden die verbesserte Kommunikation bemerken, nicht die KI.",
        },
        {
          question: "How much time can I realistically save?",
          answer:
            "Teachers typically save 60-70% of drafting time. This translates to 5-8 hours per week of reclaimed time.",
        },
        {
          question: "What if a parent message requires a sensitive response?",
          answer:
            "Zaza Shield's tone control is designed for sensitive topics, ensuring diplomatic, professional language. You always review the draft before sending.",
        },
        {
          question: "Will using AI make me less connected to parents?",
          answer:
            "No. By reducing the mental burden of drafting, you can focus on the actual relationship and context, making your communication more intentional and effective.",
        },
        {
          question: "How do I get started without feeling overwhelmed?",
          answer:
            "Follow the 4-week Implementation Guide on this page. Start small by setting boundaries and then gradually integrating AI into one message type at a time.",
        },
      ],
    },
  };

  const text = isGerman ? content.de : content.en;

  const breadcrumbItems = [
    {
      label: isGerman ? "Lernzentrum" : "Learning Centre",
      href: "/learning-centre",
    },
    { label: text.hero_title },
  ];

  // Table of Contents for the full page structure
  const tocItems = [
    { id: "quick-answer", title: text.quick_answer_title, level: 2 },
    { id: "why-stress", title: text.why_title, level: 2 },
    { id: "cost", title: text.cost_title, level: 2 },
    { id: "strategies", title: text.strategies_title, level: 2 },
    { id: "how-ai-helps", title: text.ai_load_title, level: 2 },
    { id: "guide", title: text.guide_title, level: 2 },
    {
      id: "results",
      title: isGerman ? "Echte Lehrer-Ergebnisse" : "Real Teacher Results",
      level: 2,
    },
    {
      id: "faq",
      title: isGerman
        ? "Häufig gestellte Fragen"
        : "Frequently Asked Questions",
      level: 2,
    },
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
                <Link href="/products/draft">{text.cta_primary}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
              >
                <Link href="#strategies">{text.cta_secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="space-y-16">
            {/* Quick Answer (Simulating QuickAnswerBox structure) */}
            <div
              id="quick-answer"
              className="scroll-mt-20 rounded-xl border border-[#8B5CF6]/30 bg-[#1E293B] p-6"
            >
              <h3 className="mb-3 text-xl font-bold text-white flex items-center gap-2">
                <Star className="h-5 w-5 fill-[#A78BFA] text-[#A78BFA]" />
                {text.quick_answer_title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {text.quick_answer_answer}
              </p>
            </div>

            {/* Why Messages Cause Stress */}
            <section id="why-stress" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <X className="w-8 h-8 text-red-500" />
                {text.why_title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {text.why_points.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-red-500/20 bg-[#1E293B] p-5"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {point.title}
                    </h3>
                    <p className="text-gray-300">{point.description}</p>
                  </div>
                ))}
              </div>
              <blockquote className="mt-8 border-l-4 border-[#A78BFA] pl-4 text-gray-300 italic text-lg">
                {text.real_problem}
              </blockquote>
            </section>

            {/* Hidden Cost */}
            <section id="cost" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-red-500" />
                {text.cost_title}
              </h2>
              <div className="space-y-6">
                {text.cost_points.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-[#1E293B] p-5"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {point.title}
                    </h3>
                    <p className="text-gray-300">{point.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-5 rounded-xl bg-red-500/10 border border-red-500/20">
                <h4 className="mb-3 text-lg font-semibold text-red-400">
                  {isGerman ? "Studien zeigen:" : "Research shows:"}
                </h4>
                <ul className="space-y-2 text-gray-300">
                  {text.research_stats.map((stat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Star className="mt-1 h-4 w-4 shrink-0 fill-red-400 text-red-400" />
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 5 Strategies That Actually Work */}
            <section id="strategies" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <Check className="w-8 h-8 text-green-400" />
                {text.strategies_title}
              </h2>
              <div className="space-y-10">
                {text.strategies.map((strategy) => (
                  <div
                    key={strategy.step}
                    className="border-l-4 border-[#8B5CF6] pl-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B5CF6] text-sm font-bold text-white shrink-0">
                        {strategy.step}
                      </span>
                      <h3 className="text-2xl font-bold text-white">
                        {strategy.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-4">{strategy.description}</p>

                    {strategy.example && (
                      <blockquote className="p-4 bg-[#1E293B] border border-white/10 rounded-lg text-sm italic text-gray-400">
                        {isGerman
                          ? "Beispiel-Grenzfestlegung:"
                          : "Example boundary statement:"}{" "}
                        "{strategy.example}"
                      </blockquote>
                    )}
                    {strategy.categories && (
                      <div className="p-4 bg-[#1E293B] border border-white/10 rounded-lg">
                        <h4 className="mb-2 text-sm font-semibold text-gray-400">
                          {isGerman
                            ? "Häufige Vorlagenkategorien:"
                            : "Common template categories:"}
                        </h4>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                          {strategy.categories.map((cat, i) => (
                            <li key={i} className="flex items-start gap-2">
                              − {cat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {strategy.workflow && (
                      <div className="p-4 bg-[#1E293B] border border-white/10 rounded-lg">
                        <h4 className="mb-2 text-sm font-semibold text-gray-400">
                          {isGerman ? "Der KI-Workflow:" : "The AI workflow:"}
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                          {strategy.workflow.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* How AI Reduces the Mental Load (Comparison) */}
            <section id="how-ai-helps" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white flex items-center gap-3">
                <Zap className="w-8 h-8 text-[#A78BFA]" />
                {text.ai_load_title}
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                {text.ai_load_subtitle}
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Comparison Card: Without AI */}
                <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-[#1E293B] p-6">
                  <h3 className="mb-4 text-2xl font-bold text-red-400">
                    {text.comparison.without_title}
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    {text.comparison.without_points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <X className="mt-1 h-5 w-5 shrink-0 text-red-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Comparison Card: With AI */}
                <div className="rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-[#1E293B] p-6">
                  <h3 className="mb-4 text-2xl font-bold text-green-400">
                    {text.comparison.with_title}
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    {text.comparison.with_points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-green-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Feature Callout */}
              <div className="mt-8 rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/10 to-[#1E293B] p-6">
                <h4 className="mb-4 text-xl font-bold text-[#A78BFA] flex items-center gap-3">
                  <Shield className="h-6 w-6" />
                  {text.features_title}
                </h4>
                <ul className="space-y-3 text-gray-300">
                  {text.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-[#A78BFA]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Implementation Guide */}
            <section id="guide" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <Volume2 className="w-8 h-8 text-[#A78BFA]" />
                {text.guide_title}
              </h2>
              <div className="space-y-6">
                {text.guide_steps.map((item) => (
                  <div
                    key={item.week}
                    className="flex gap-4 bg-[#1E293B] rounded-xl p-6 border border-white/10 hover:border-[#8B5CF6]/50 transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] text-xl font-bold text-white">
                      {/* FIX: Only display the number in the circle */}
                      {item.week}
                    </div>
                    <div>
                      <h3 className="mb-2 text-2xl font-semibold text-white">
                        {/* Include "Week"/"Woche" and number in the main heading */}
                        {isGerman
                          ? `Woche ${item.week}: ${item.title}`
                          : `Week ${item.week}: ${item.title}`}
                      </h3>
                      <ul className="space-y-1 text-gray-300 leading-relaxed">
                        {item.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            − {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Real Teacher Results (Testimonials) */}
            <section id="results" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">
                {isGerman ? "Echte Lehrer-Ergebnisse" : "Real Teacher Results"}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {text.testimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 p-6"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={72}
                        height={72}
                        className="rounded-full object-cover border-2 border-[#A78BFA]"
                      />
                      <div>
                        <p className="font-semibold text-white text-xl">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <p className="mb-4 text-gray-300 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 mt-4">
                      {testimonial.stats.map((stat, j) => (
                        <div key={j} className="text-center">
                          <p className="text-3xl font-bold text-[#A78BFA]">
                            {stat.split(" ")[0]}
                          </p>
                          <p className="text-sm text-gray-400 leading-none">
                            {stat.split(" ").slice(1).join(" ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <FAQSection
              id="faq"
              title={
                isGerman
                  ? "Häufig gestellte Fragen"
                  : "Frequently Asked Questions"
              }
              faqs={text.faqs}
              schemaContext={
                isGerman
                  ? "Stressreduzierung bei Elternnachrichten"
                  : "Reducing Parent Communication Stress"
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
                <Link href="/products/draft">{text.cta_primary}</Link>
              </Button>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <TableOfContents items={tocItems} />

            {/* Related Resources */}
            <div className="rounded-xl border border-white/10 bg-[#1E293B] p-6">
              <h3 className="mb-4 font-semibold text-white">
                {isGerman ? "Verwandte Ressourcen" : "Related Resources"}
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
                  href="/ai-for-student-reports"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  →{" "}
                  {isGerman
                    ? "KI für Schülerberichte"
                    : "AI for Student Reports"}
                </Link>
                <Link
                  href="/teacher-blog"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  → {isGerman ? "Lehrer-Blog" : "Teacher Blog"}
                </Link>
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/10 p-6">
              <h3 className="mb-2 font-semibold text-white">
                {isGerman
                  ? "Zaza Shield kostenlos testen"
                  : "Try Zaza Shield Free"}
              </h3>
              <p className="mb-4 text-sm text-gray-300">
                {isGerman
                  ? "KI-gestützter Assistent für die Elternkommunikation."
                  : "AI-powered parent communication assistant."}
              </p>
              <Button
                asChild
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                <Link href="/products/shield">
                  {isGerman ? "Kostenlos starten" : "Start Free"}
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}



