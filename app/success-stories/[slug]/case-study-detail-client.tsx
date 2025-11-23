"use client";

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, TrendingUp, CheckCircle2, Quote, Calendar, MapPin, GraduationCap, Globe, FileText, Sparkles } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface CaseStudyContent {
  slug: string
  title: string
  school: string
  location: string
  students: string
  category: string
  categoryLabel: string
  thumbnail: string
  teacherName: string
  teacherRole: string
  teacherPhoto: string
  challenge: {
    title: string
    description: string
    painPoints: string[]
  }
  solution: {
    title: string
    description: string
    implementation: {
      phase: string
      duration: string
      activities: string[]
    }[]
  }
  results: {
    title: string
    description: string
    metrics: {
      label: string
      value: string
      icon: string
    }[]
  }
  testimonial: {
    quote: string
    context: string
  }
  keyTakeaways: string[]
  ui: {
    backButton: string
    challengeTab: string
    solutionTab: string
    resultsTab: string
    painPointsTitle: string
    keyTakeawaysTitle: string
    ctaTitle: string
    ctaSubtitle: string
    ctaPrimary: string
    ctaSecondary: string
    notFound: string
  }
}

const caseStudyData: Record<string, { en: CaseStudyContent; de: CaseStudyContent }> = {
  "lincoln-elementary-parent-communication": {
    en: {
      slug: "lincoln-elementary-parent-communication",
      title: "How Lincoln Elementary Cut Parent Communication Time by 75%",
      school: "Lincoln Elementary",
      location: "Austin, TX",
      students: "450 students",
      category: "elementary",
      categoryLabel: "Elementary School",
      thumbnail: "/elementary-school-classroom-teacher.jpg",
      teacherName: "Sarah Martinez",
      teacherRole: "3rd Grade Teacher, 8 years experience",
      teacherPhoto: "/professional-teacher-headshot-woman-latina.jpg",
      challenge: {
        title: "The Communication Overwhelm",
        description: "Sarah was spending 15-20 hours per week on parent communication, often working late into the evening to respond to emails and write progress reports. With 24 students and diverse family needs, she felt constantly behind.",
        painPoints: [
          "Spending 2-3 hours every evening on parent emails",
          "Struggling to maintain consistent communication tone",
          "Missing important family updates due to email overload",
          "Feeling guilty about delayed responses to parents",
          "Sacrificing lesson planning time for communication tasks"
        ]
      },
      solution: {
        title: "A Systematic Approach to AI-Powered Communication",
        description: "Sarah started with Zaza Draft's parent email templates and gradually expanded to using AI for progress reports and behavior updates. The key was building confidence through small wins.",
        implementation: [
          {
            phase: "Week 1: Email Templates",
            duration: "5 days",
            activities: [
              "Set up Zaza Draft account and explored email templates",
              "Used AI to respond to 5 routine parent questions",
              "Customized templates for her classroom tone",
              "Saved 3 hours in the first week"
            ]
          },
          {
            phase: "Week 2-3: Progress Reports",
            duration: "2 weeks",
            activities: [
              "Used Zaza Draft for weekly progress updates",
              "Created personalized reports for each student in 30 minutes",
              "Parents responded positively to detailed, consistent updates",
              "Saved 8 hours over two weeks"
            ]
          },
          {
            phase: "Week 4+: Full Integration",
            duration: "Ongoing",
            activities: [
              "Integrated Zaza Draft into daily workflow",
              "Used AI for behavior updates, conference prep, and newsletters",
              "Trained 3 colleagues on the system",
              "Maintained 12 hours/week time savings"
            ]
          }
        ]
      },
      results: {
        title: "Transformative Results in 30 Days",
        description: "Within one month, Sarah reduced her communication time from 15 hours/week to just 3 hours/week, while actually improving the quality and consistency of her parent communication.",
        metrics: [
          { label: "Time Saved Per Week", value: "12 hours", icon: "clock" },
          { label: "Parent Satisfaction", value: "95%", icon: "trending-up" },
          { label: "Response Time", value: "< 24 hours", icon: "check" },
          { label: "Emails Sent", value: "300+ / month", icon: "users" }
        ]
      },
      testimonial: {
        quote: "I actually look forward to parent communication now. It's no longer a source of stress. I can respond thoughtfully and quickly, and parents have noticed the difference.",
        context: "After 30 days using Zaza Draft"
      },
      keyTakeaways: [
        "Start small with email templates before expanding to reports",
        "Consistency matters more than perfection in parent communication",
        "AI can help maintain your authentic voice while saving time",
        "Time saved on communication can be reinvested in lesson planning",
        "Parents appreciate quick, thoughtful responses over delayed perfection"
      ],
      ui: {
        backButton: "Back to Success Stories",
        challengeTab: "The Challenge",
        solutionTab: "The Solution",
        resultsTab: "The Results",
        painPointsTitle: "Key Pain Points",
        keyTakeawaysTitle: "Key Takeaways",
        ctaTitle: "Ready to transform your communication?",
        ctaSubtitle: "Join Sarah and thousands of other teachers",
        ctaPrimary: "Try Zaza Draft Free",
        ctaSecondary: "View More Success Stories",
        notFound: "Case Study Not Found"
      }
    },
    de: {
      slug: "lincoln-elementary-parent-communication",
      title: "Wie die Lincoln Elementary die Zeit für Elternkommunikation um 75% reduzierte",
      school: "Lincoln Elementary",
      location: "Austin, TX",
      students: "450 Schüler",
      category: "elementary",
      categoryLabel: "Grundschule",
      thumbnail: "/elementary-school-classroom-teacher.jpg",
      teacherName: "Sarah Martinez",
      teacherRole: "Lehrerin 3. Klasse, 8 Jahre Erfahrung",
      teacherPhoto: "/professional-teacher-headshot-woman-latina.jpg",
      challenge: {
        title: "Die Kommunikationsüberlastung",
        description: "Sarah verbrachte 15-20 Stunden pro Woche mit Elternkommunikation und arbeitete oft bis spät in den Abend, um auf E-Mails zu antworten. Bei 24 Schülern und unterschiedlichen Familienbedürfnissen fühlte sie sich ständig im Rückstand.",
        painPoints: [
          "Jeden Abend 2-3 Stunden für Eltern-E-Mails",
          "Schwierigkeiten, einen konsistenten Tonfall zu wahren",
          "Verpasste wichtige Updates aufgrund von E-Mail-Flut",
          "Schuldgefühle wegen verspäteter Antworten",
          "Unterrichtsplanung litt unter Kommunikationsaufgaben"
        ]
      },
      solution: {
        title: "Ein systematischer Ansatz für KI-gestützte Kommunikation",
        description: "Sarah begann mit den E-Mail-Vorlagen von Zaza Draft und erweiterte die Nutzung schrittweise auf Fortschrittsberichte. Der Schlüssel war der Aufbau von Vertrauen durch kleine Erfolge.",
        implementation: [
          {
            phase: "Woche 1: E-Mail-Vorlagen",
            duration: "5 Tage",
            activities: [
              "Zaza Draft Konto eingerichtet und Vorlagen erkundet",
              "KI genutzt, um 5 Routinefragen von Eltern zu beantworten",
              "Vorlagen an ihren eigenen Tonfall angepasst",
              "3 Stunden in der ersten Woche gespart"
            ]
          },
          {
            phase: "Woche 2-3: Fortschrittsberichte",
            duration: "2 Wochen",
            activities: [
              "Zaza Draft für wöchentliche Updates genutzt",
              "Personalisierte Berichte für jeden Schüler in 30 Minuten erstellt",
              "Eltern reagierten positiv auf detaillierte Updates",
              "8 Stunden über zwei Wochen gespart"
            ]
          },
          {
            phase: "Woche 4+: Volle Integration",
            duration: "Laufend",
            activities: [
              "Zaza Draft in den täglichen Workflow integriert",
              "KI für Verhaltensupdates und Konferenzvorbereitung genutzt",
              "3 Kollegen im System geschult",
              "Behält Zeitersparnis von 12 Std./Woche bei"
            ]
          }
        ]
      },
      results: {
        title: "Transformative Ergebnisse in 30 Tagen",
        description: "Innerhalb eines Monats reduzierte Sarah ihre Kommunikationszeit von 15 auf nur 3 Stunden pro Woche, während sich Qualität und Konsistenz tatsächlich verbesserten.",
        metrics: [
          { label: "Zeitersparnis pro Woche", value: "12 Stunden", icon: "clock" },
          { label: "Elternzufriedenheit", value: "95%", icon: "trending-up" },
          { label: "Antwortzeit", value: "< 24 Std.", icon: "check" },
          { label: "Gesendete E-Mails", value: "300+ / Monat", icon: "users" }
        ]
      },
      testimonial: {
        quote: "Ich freue mich jetzt tatsächlich auf die Elternkommunikation. Es ist kein Stressfaktor mehr. Ich kann durchdacht und schnell antworten, und die Eltern haben den Unterschied bemerkt.",
        context: "Nach 30 Tagen mit Zaza Draft"
      },
      keyTakeaways: [
        "Klein anfangen mit E-Mail-Vorlagen",
        "Konsistenz ist wichtiger als Perfektion",
        "KI hilft, den authentischen Ton zu wahren",
        "Gesparte Zeit kann in die Unterrichtsplanung fließen",
        "Eltern schätzen schnelle, durchdachte Antworten"
      ],
      ui: {
        backButton: "Zurück zu den Erfolgsgeschichten",
        challengeTab: "Die Herausforderung",
        solutionTab: "Die Lösung",
        resultsTab: "Die Ergebnisse",
        painPointsTitle: "Hauptprobleme",
        keyTakeawaysTitle: "Wichtige Erkenntnisse",
        ctaTitle: "Bereit, Ihre Kommunikation zu transformieren?",
        ctaSubtitle: "Schließen Sie sich Sarah und tausenden anderen Lehrkräften an",
        ctaPrimary: "Zaza Draft kostenlos testen",
        ctaSecondary: "Mehr Erfolgsgeschichten ansehen",
        notFound: "Fallstudie nicht gefunden"
      }
    }
  },
  "riverside-unified-district-rollout": {
    en: {
      slug: "riverside-unified-district-rollout",
      title: "District-Wide AI Rollout: How Riverside Unified Trained 200 Teachers",
      school: "Riverside Unified",
      location: "California",
      students: "15,000 students",
      category: "district",
      categoryLabel: "District-Wide",
      thumbnail: "/school-district-meeting-teachers.jpg",
      teacherName: "Dr. James Wilson",
      teacherRole: "Director of Technology",
      teacherPhoto: "/male-principal-portrait.jpg",
      challenge: {
        title: "Scaling Innovation Without Burnout",
        description: "Riverside Unified wanted to implement AI to reduce teacher workload, but feared inconsistent adoption and privacy concerns. With 200 teachers varying in tech-savviness, a unified approach was critical.",
        painPoints: [
          "Inconsistent communication standards across schools",
          "High teacher burnout rates due to administrative load",
          "Data privacy concerns with free AI tools",
          "Resistance to new technology from veteran teachers"
        ]
      },
      solution: {
        title: "A Strategic, Phased Rollout",
        description: "Using Zaza Draft's enterprise features, the district implemented a 'train the trainer' model, focusing on privacy-first AI tools that integrated with existing LMS.",
        implementation: [
          { phase: "Phase 1: Pilot Group", duration: "1 Month", activities: ["Selected 20 tech-forward teachers", "Established usage guidelines", "Gathered initial feedback"] },
          { phase: "Phase 2: District Training", duration: "2 Days", activities: ["Hands-on workshops for all staff", "Focus on privacy (FERPA compliance)", "Live demos of report writing"] },
          { phase: "Phase 3: Full Adoption", duration: "Ongoing", activities: ["District-wide license activation", "Monthly best-practice sharing sessions", "Integration with Schoology"] }
        ]
      },
      results: {
        title: "System-Wide Efficiency",
        description: "The district saw a 90% adoption rate within 3 months. Teachers reported saving an average of 5 hours per week, leading to improved morale.",
        metrics: [
          { label: "Adoption Rate", value: "90%", icon: "trending-up" },
          { label: "Hours Saved District-wide", value: "2000+ / mo", icon: "clock" },
          { label: "Teacher Retention", value: "+15%", icon: "users" },
          { label: "Security Incidents", value: "0", icon: "check" }
        ]
      },
      testimonial: {
        quote: "The professional development was seamless. Teachers were confident within days. Zaza Draft isn't just a tool; it's a retention strategy.",
        context: "Dr. Wilson on the rollout success"
      },
      keyTakeaways: [
        "Privacy-first tools lower resistance to adoption",
        "Pilot programs build internal champions",
        "Focus on time-saving benefits wins over skeptics",
        "Standardized tools ensure equitable communication"
      ],
      ui: { backButton: "Back to Success Stories", challengeTab: "The Challenge", solutionTab: "The Solution", resultsTab: "The Results", painPointsTitle: "Key Pain Points", keyTakeawaysTitle: "Key Takeaways", ctaTitle: "Empower your district", ctaSubtitle: "Get an enterprise quote today", ctaPrimary: "Contact Sales", ctaSecondary: "View More Stories", notFound: "Case Study Not Found" }
    },
    de: {
      slug: "riverside-unified-district-rollout",
      title: "Distriktweite KI-Einführung: Wie Riverside Unified 200 Lehrkräfte schulte",
      school: "Riverside Unified",
      location: "Kalifornien",
      students: "15.000 Schüler",
      category: "district",
      categoryLabel: "Distriktweit",
      thumbnail: "/school-district-meeting-teachers.jpg",
      teacherName: "Dr. James Wilson",
      teacherRole: "Technologie-Direktor",
      teacherPhoto: "/male-principal-portrait.jpg",
      challenge: {
        title: "Innovation skalieren ohne Burnout",
        description: "Riverside Unified wollte KI einführen, um die Arbeitsbelastung der Lehrer zu verringern, befürchtete aber inkonsistente Nutzung und Datenschutzprobleme. Bei 200 Lehrkräften mit unterschiedlichen Technikkenntnissen war ein einheitlicher Ansatz entscheidend.",
        painPoints: [
          "Inkonsistente Kommunikationsstandards an den Schulen",
          "Hohe Burnout-Raten durch Verwaltungsaufwand",
          "Datenschutzbedenken bei kostenlosen KI-Tools",
          "Widerstand gegen neue Technologien bei erfahrenen Lehrkräften"
        ]
      },
      solution: {
        title: "Ein strategischer, phasenweiser Rollout",
        description: "Mit den Enterprise-Funktionen von Zaza Draft implementierte der Bezirk ein 'Train-the-Trainer'-Modell, das sich auf datenschutzkonforme KI-Tools konzentrierte.",
        implementation: [
          { phase: "Phase 1: Pilotgruppe", duration: "1 Monat", activities: ["20 technikaffine Lehrer ausgewählt", "Nutzungsrichtlinien erstellt", "Erstes Feedback gesammelt"] },
          { phase: "Phase 2: Distrikt-Schulung", duration: "2 Tage", activities: ["Praxis-Workshops für alle Mitarbeiter", "Fokus auf Datenschutz (FERPA)", "Live-Demos zum Berichteschreiben"] },
          { phase: "Phase 3: Volle Übernahme", duration: "Laufend", activities: ["Aktivierung der Distriktlizenzen", "Monatlicher Austausch von Best Practices", "Integration mit Schoology"] }
        ]
      },
      results: {
        title: "Systemweite Effizienz",
        description: "Der Bezirk verzeichnete innerhalb von 3 Monaten eine Adoptionsrate von 90%. Lehrer berichteten von einer durchschnittlichen Zeitersparnis von 5 Stunden pro Woche.",
        metrics: [
          { label: "Adoptionsrate", value: "90%", icon: "trending-up" },
          { label: "Gesparte Std. (Distrikt)", value: "2000+ / Mo", icon: "clock" },
          { label: "Lehrerbindung", value: "+15%", icon: "users" },
          { label: "Sicherheitsvorfälle", value: "0", icon: "check" }
        ]
      },
      testimonial: {
        quote: "Die Fortbildung war nahtlos. Die Lehrkräfte waren innerhalb weniger Tage sicher im Umgang. Zaza Draft ist nicht nur ein Werkzeug, es ist eine Strategie zur Mitarbeiterbindung.",
        context: "Dr. Wilson über den Erfolg"
      },
      keyTakeaways: [
        "Datenschutzorientierte Tools senken den Widerstand",
        "Pilotprogramme schaffen interne Fürsprecher",
        "Fokus auf Zeitersparnis überzeugt Skeptiker",
        "Standardisierte Tools sorgen für gerechte Kommunikation"
      ],
      ui: { backButton: "Zurück zu den Erfolgsgeschichten", challengeTab: "Die Herausforderung", solutionTab: "Die Lösung", resultsTab: "Die Ergebnisse", painPointsTitle: "Hauptprobleme", keyTakeawaysTitle: "Wichtige Erkenntnisse", ctaTitle: "Stärken Sie Ihren Distrikt", ctaSubtitle: "Holen Sie noch heute ein Angebot ein", ctaPrimary: "Vertrieb kontaktieren", ctaSecondary: "Mehr Geschichten", notFound: "Fallstudie nicht gefunden" }
    }
  },
  "washington-middle-language-barriers": {
    en: {
      slug: "washington-middle-language-barriers",
      title: "Breaking Language Barriers: ESL Success at Washington Middle",
      school: "Washington Middle",
      location: "New York, NY",
      students: "800 students",
      category: "multilingual",
      categoryLabel: "Multilingual",
      thumbnail: "/diverse-multilingual-classroom.jpg",
      teacherName: "Maria Gonzalez",
      teacherRole: "ESL Coordinator",
      teacherPhoto: "/teacher-female-glasses.jpg",
      challenge: {
        title: "Disconnect with Non-English Speaking Families",
        description: "With over 15 languages spoken at home, teachers struggled to communicate effectively. Google Translate was often inaccurate, leading to misunderstandings and low parent engagement.",
        painPoints: [
          "Inaccurate automated translations causing confusion",
          "Low attendance at parent-teacher conferences",
          "Teachers relying on students to translate (privacy risk)",
          "Disconnect between school and home"
        ]
      },
      solution: {
        title: "Nuanced, Context-Aware Translation",
        description: "Washington Middle adopted Zaza Draft specifically for its ability to generate culturally nuanced communications in multiple languages, ensuring clarity and tone were preserved.",
        implementation: [
          { phase: "Step 1: Setup", duration: "1 Week", activities: ["Identified top 5 languages needed", "Configured language presets in Zaza Draft"] },
          { phase: "Step 2: Outreach", duration: "2 Weeks", activities: ["Sent introductory newsletters in native languages", "Used 'Simplify' feature before translating"] },
          { phase: "Step 3: Routine", duration: "Ongoing", activities: ["Weekly updates sent in 15 languages", "Two-way communication enabled via translated replies"] }
        ]
      },
      results: {
        title: "Bridging the Gap",
        description: "Parent engagement scores doubled. Families reported feeling 'finally seen and understood' by the school administration.",
        metrics: [
          { label: "Languages Supported", value: "15", icon: "globe" },
          { label: "Event Attendance", value: "+60%", icon: "users" },
          { label: "Read Rate", value: "98%", icon: "check" },
          { label: "Translation Errors", value: "~0%", icon: "check" }
        ]
      },
      testimonial: {
        quote: "For the first time, every family gets messages in their language. It's not just translation; it's connection. The impact on our community trust has been profound.",
        context: "Maria on community impact"
      },
      keyTakeaways: [
        "Language access is an equity issue",
        "Automated tools must understand context to be effective",
        "Communicating in native languages builds immense trust",
        "Removing language barriers increases student support at home"
      ],
      ui: { backButton: "Back to Success Stories", challengeTab: "The Challenge", solutionTab: "The Solution", resultsTab: "The Results", painPointsTitle: "Key Pain Points", keyTakeawaysTitle: "Key Takeaways", ctaTitle: "Connect with every family", ctaSubtitle: "Try Zaza Draft's multilingual features", ctaPrimary: "Start Free Trial", ctaSecondary: "View More Stories", notFound: "Case Study Not Found" }
    },
    de: {
      slug: "washington-middle-language-barriers",
      title: "Sprachbarrieren überwinden: ESL-Erfolg an der Washington Middle",
      school: "Washington Middle",
      location: "New York, NY",
      students: "800 Schüler",
      category: "multilingual",
      categoryLabel: "Mehrsprachig",
      thumbnail: "/diverse-multilingual-classroom.jpg",
      teacherName: "Maria Gonzalez",
      teacherRole: "ESL-Koordinatorin",
      teacherPhoto: "/teacher-female-glasses.jpg",
      challenge: {
        title: "Verbindungsverlust zu nicht-englischsprachigen Familien",
        description: "Da zu Hause über 15 Sprachen gesprochen wurden, hatten die Lehrer Schwierigkeiten, effektiv zu kommunizieren. Google Translate war oft ungenau, was zu Missverständnissen führte.",
        painPoints: [
          "Ungenaue automatische Übersetzungen verursachten Verwirrung",
          "Geringe Teilnahme an Elternsprechtagen",
          "Lehrer verließen sich auf Schüler als Übersetzer (Datenschutzrisiko)",
          "Kluft zwischen Schule und Elternhaus"
        ]
      },
      solution: {
        title: "Nuancierte, kontextbezogene Übersetzung",
        description: "Washington Middle führte Zaza Draft speziell wegen seiner Fähigkeit ein, kulturell nuancierte Kommunikation in mehreren Sprachen zu erstellen.",
        implementation: [
          { phase: "Schritt 1: Einrichtung", duration: "1 Woche", activities: ["Top 5 benötigte Sprachen identifiziert", "Sprachvoreinstellungen konfiguriert"] },
          { phase: "Schritt 2: Kontaktaufnahme", duration: "2 Wochen", activities: ["Einführungs-Newsletter in Muttersprachen", "Nutzung der 'Vereinfachen'-Funktion vor der Übersetzung"] },
          { phase: "Schritt 3: Routine", duration: "Laufend", activities: ["Wöchentliche Updates in 15 Sprachen", "Zwei-Wege-Kommunikation durch übersetzte Antworten"] }
        ]
      },
      results: {
        title: "Die Lücke schließen",
        description: "Die Elternbeteiligung verdoppelte sich. Familien berichteten, dass sie sich von der Schulverwaltung 'endlich gesehen und verstanden' fühlten.",
        metrics: [
          { label: "Unterstützte Sprachen", value: "15", icon: "globe" },
          { label: "Veranstaltungsbesuche", value: "+60%", icon: "users" },
          { label: "Leserate", value: "98%", icon: "check" },
          { label: "Übersetzungsfehler", value: "~0%", icon: "check" }
        ]
      },
      testimonial: {
        quote: "Zum ersten Mal erhält jede Familie Nachrichten in ihrer Sprache. Das ist nicht nur Übersetzung, das ist Verbindung. Der Einfluss auf das Vertrauen der Gemeinschaft ist enorm.",
        context: "Maria über den Einfluss"
      },
      keyTakeaways: [
        "Sprachzugang ist eine Frage der Gerechtigkeit",
        "Tools müssen den Kontext verstehen, um effektiv zu sein",
        "Kommunikation in der Muttersprache schafft Vertrauen",
        "Abbau von Sprachbarrieren erhöht die Unterstützung zu Hause"
      ],
      ui: { backButton: "Zurück zu den Erfolgsgeschichten", challengeTab: "Die Herausforderung", solutionTab: "Die Lösung", resultsTab: "Die Ergebnisse", painPointsTitle: "Hauptprobleme", keyTakeawaysTitle: "Wichtige Erkenntnisse", ctaTitle: "Erreichen Sie jede Familie", ctaSubtitle: "Testen Sie die mehrsprachigen Funktionen", ctaPrimary: "Kostenlos starten", ctaSecondary: "Mehr Geschichten", notFound: "Fallstudie nicht gefunden" }
    }
  },
  "oakwood-special-education-reports": {
    en: {
      slug: "oakwood-special-education-reports",
      title: "Special Education Reports: Compliance Meets Compassion",
      school: "Oakwood High School",
      location: "Chicago, IL",
      students: "1,200 students",
      category: "special-ed",
      categoryLabel: "Special Education",
      thumbnail: "/special-education-teacher.jpg",
      teacherName: "David Chen",
      teacherRole: "Special Education Teacher",
      teacherPhoto: "/teacher-man-asian.jpg",
      challenge: {
        title: "Buried in Paperwork",
        description: "David loved working with his students but dreaded the reporting. Creating comprehensive IEP reports that met legal standards while remaining accessible to parents was taking 40% of his time.",
        painPoints: [
          "Hours spent formatting IEP updates",
          "Difficulty balancing clinical language with empathy",
          "Risk of burnout from administrative load",
          "Less time for direct student support"
        ]
      },
      solution: {
        title: "Streamlined Reporting with Zaza Shield",
        description: "Using Zaza Draft's specialized IEP templates and 'Zaza Shield' for privacy, David could input observational notes and generate structured, compliant, and warm reports instantly.",
        implementation: [
          { phase: "Phase 1: Input", duration: "Daily", activities: ["Logged bullet-point observations in secure app", "Tagged notes by IEP goal category"] },
          { phase: "Phase 2: Generation", duration: "Reporting Period", activities: ["Used 'IEP Progress Report' generator", "Refined tone to be 'Professional yet Warm'"] },
          { phase: "Phase 3: Review", duration: "1 Hour", activities: ["Final review of 40 reports", "Minor personalization tweaks"] }
        ]
      },
      results: {
        title: "Focus Back on Students",
        description: "David completed his entire caseload's reporting in a single day, a task that used to take a week. The reports were praised by administration for their thoroughness.",
        metrics: [
          { label: "Reports / Day", value: "40", icon: "file-text" },
          { label: "Time Saved", value: "20 Hrs", icon: "clock" },
          { label: "Compliance Score", value: "100%", icon: "shield" },
          { label: "Parent Feedback", value: "Positive", icon: "check" }
        ]
      },
      testimonial: {
        quote: "I can focus on the kids, not just the paperwork. Zaza Shield ensures compliance, and the writing quality is better than when I was exhausted doing it manually.",
        context: "David on workload management"
      },
      keyTakeaways: [
        "Compliance doesn't have to come at the cost of empathy",
        "Structured input leads to better quality output",
        "Reducing admin load prevents special ed teacher burnout",
        "Privacy features are non-negotiable for IEPs"
      ],
      ui: { backButton: "Back to Success Stories", challengeTab: "The Challenge", solutionTab: "The Solution", resultsTab: "The Results", painPointsTitle: "Key Pain Points", keyTakeawaysTitle: "Key Takeaways", ctaTitle: "Simplify your paperwork", ctaSubtitle: "Try Zaza Draft for Special Education", ctaPrimary: "Start Free Trial", ctaSecondary: "View More Stories", notFound: "Case Study Not Found" }
    },
    de: {
      slug: "oakwood-special-education-reports",
      title: "Sonderpädagogische Berichte: Compliance trifft auf Mitgefühl",
      school: "Oakwood High School",
      location: "Chicago, IL",
      students: "1.200 Schüler",
      category: "special-ed",
      categoryLabel: "Sonderpädagogik",
      thumbnail: "/special-education-teacher.jpg",
      teacherName: "David Chen",
      teacherRole: "Sonderpädagoge",
      teacherPhoto: "/teacher-man-asian.jpg",
      challenge: {
        title: "Im Papierkram ertrunken",
        description: "David liebte die Arbeit mit seinen Schülern, fürchtete aber die Berichte. Die Erstellung umfassender Förderpläne, die rechtlichen Standards entsprachen und dennoch für Eltern verständlich waren, nahm 40% seiner Zeit in Anspruch.",
        painPoints: [
          "Stundenlanges Formatieren von Förderplan-Updates",
          "Schwierigkeit, Fachsprache mit Empathie zu balancieren",
          "Burnout-Risiko durch Verwaltungslast",
          "Weniger Zeit für direkte Schülerförderung"
        ]
      },
      solution: {
        title: "Optimierte Berichterstattung mit Zaza Shield",
        description: "Mit den spezialisierten Vorlagen von Zaza Draft und 'Zaza Shield' für Datenschutz konnte David Beobachtungsnotizen eingeben und sofort strukturierte, konforme und herzliche Berichte erstellen.",
        implementation: [
          { phase: "Phase 1: Eingabe", duration: "Täglich", activities: ["Beobachtungen stichpunktartig in sicherer App notiert", "Notizen nach Förderzielen kategorisiert"] },
          { phase: "Phase 2: Erstellung", duration: "Berichtszeitraum", activities: ["Generator für 'Fortschrittsberichte' genutzt", "Tonfall auf 'Professionell aber herzlich' eingestellt"] },
          { phase: "Phase 3: Überprüfung", duration: "1 Stunde", activities: ["Abschließende Prüfung von 40 Berichten", "Kleine Anpassungen"] }
        ]
      },
      results: {
        title: "Fokus zurück auf die Schüler",
        description: "David erledigte die Berichte für alle seine Fälle an einem einzigen Tag – eine Aufgabe, die früher eine Woche dauerte. Die Berichte wurden von der Verwaltung für ihre Gründlichkeit gelobt.",
        metrics: [
          { label: "Berichte / Tag", value: "40", icon: "file-text" },
          { label: "Gesparte Zeit", value: "20 Std.", icon: "clock" },
          { label: "Compliance-Score", value: "100%", icon: "shield" },
          { label: "Eltern-Feedback", value: "Positiv", icon: "check" }
        ]
      },
      testimonial: {
        quote: "Ich kann mich auf die Kinder konzentrieren, nicht nur auf den Papierkram. Zaza Shield sichert die Compliance, und die Schreibqualität ist besser, als wenn ich es erschöpft manuell mache.",
        context: "David über Arbeitsbelastung"
      },
      keyTakeaways: [
        "Compliance muss nicht auf Kosten der Empathie gehen",
        "Strukturierte Eingabe führt zu besserer Ausgabequalität",
        "Reduzierung der Admin-Last verhindert Burnout",
        "Datenschutzfunktionen sind für Förderpläne unverzichtbar"
      ],
      ui: { backButton: "Zurück zu den Erfolgsgeschichten", challengeTab: "Die Herausforderung", solutionTab: "Die Lösung", resultsTab: "Die Ergebnisse", painPointsTitle: "Hauptprobleme", keyTakeawaysTitle: "Wichtige Erkenntnisse", ctaTitle: "Vereinfachen Sie Ihren Papierkram", ctaSubtitle: "Testen Sie Zaza Draft für Sonderpädagogik", ctaPrimary: "Kostenlos starten", ctaSecondary: "Mehr Geschichten", notFound: "Fallstudie nicht gefunden" }
    }
  },
  "jefferson-new-teacher-confidence": {
    en: {
      slug: "jefferson-new-teacher-confidence",
      title: "New Teacher Confidence: From Anxious to Assured in 30 Days",
      school: "Jefferson Elementary",
      location: "Seattle, WA",
      students: "600 students",
      category: "elementary",
      categoryLabel: "New Teacher",
      thumbnail: "/young-teacher-confident-classroom.jpg",
      teacherName: "Emily Parker",
      teacherRole: "1st Year Teacher",
      teacherPhoto: "/young-female-teacher.jpg",
      challenge: {
        title: "Imposter Syndrome & Email Anxiety",
        description: "As a first-year teacher, Emily spent 45 minutes drafting a single email, terrified of saying the wrong thing. She lacked the experience to handle difficult parent conversations confidently.",
        painPoints: [
          "Extreme anxiety hitting 'send' on emails",
          "Spending hours rewriting simple messages",
          "Fear of conflict with parents",
          "Overwhelmed by administrative expectations"
        ]
      },
      solution: {
        title: "An AI Mentor in Your Pocket",
        description: "Emily used Zaza Draft as a confidence booster. She would draft her rough thoughts, let the AI polish them into professional communication, and learn from the suggestions.",
        implementation: [
          { phase: "Phase 1: Drafting", duration: "Week 1-2", activities: ["Typed anxious/rough drafts into Zaza", "Used 'Make Professional' filter"] },
          { phase: "Phase 2: Learning", duration: "Month 1", activities: ["Studied how the AI phrased difficult news", "Adopted successful phrases into her own vocabulary"] },
          { phase: "Phase 3: Independence", duration: "Month 2", activities: ["Wrote drafts confidently", "Used Zaza only for final polish/check"] }
        ]
      },
      results: {
        title: "Accelerated Professional Growth",
        description: "Emily's mentor teacher noted she communicated like a 5-year veteran. Her anxiety decreased significantly, allowing her to enjoy her first year.",
        metrics: [
          { label: "Confidence Level", value: "High", icon: "sparkles" },
          { label: "Drafting Time", value: "5 mins", icon: "clock" },
          { label: "Parent Complaints", value: "0", icon: "check" },
          { label: "Mentorship Rating", value: "Exemplary", icon: "star" }
        ]
      },
      testimonial: {
        quote: "My mentor teacher was impressed by my communication. Zaza gave me the confidence I needed to sound like a pro, even when I was shaking inside.",
        context: "Emily on her first year"
      },
      keyTakeaways: [
        "AI tools can serve as real-time professional development",
        "Seeing professional examples reduces anxiety",
        "Confidence in communication leads to better classroom management",
        "Technology can bridge the experience gap for new teachers"
      ],
      ui: { backButton: "Back to Success Stories", challengeTab: "The Challenge", solutionTab: "The Solution", resultsTab: "The Results", painPointsTitle: "Key Pain Points", keyTakeawaysTitle: "Key Takeaways", ctaTitle: "Start your career with confidence", ctaSubtitle: "Get your free account today", ctaPrimary: "Sign Up Free", ctaSecondary: "View More Stories", notFound: "Case Study Not Found" }
    },
    de: {
      slug: "jefferson-new-teacher-confidence",
      title: "Selbstvertrauen neuer Lehrkräfte: Von ängstlich zu sicher in 30 Tagen",
      school: "Jefferson Elementary",
      location: "Seattle, WA",
      students: "600 Schüler",
      category: "elementary",
      categoryLabel: "Berufseinsteiger",
      thumbnail: "/young-teacher-confident-classroom.jpg",
      teacherName: "Emily Parker",
      teacherRole: "Lehrerin im 1. Jahr",
      teacherPhoto: "/young-female-teacher.jpg",
      challenge: {
        title: "Hochstapler-Syndrom & E-Mail-Angst",
        description: "Als Berufseinsteigerin verbrachte Emily 45 Minuten damit, eine einzige E-Mail zu entwerfen, aus Angst, das Falsche zu sagen. Ihr fehlte die Erfahrung, um schwierige Elterngespräche sicher zu führen.",
        painPoints: [
          "Extreme Angst vor dem Absenden von E-Mails",
          "Stundenlanges Umschreiben einfacher Nachrichten",
          "Angst vor Konflikten mit Eltern",
          "Überfordert von administrativen Erwartungen"
        ]
      },
      solution: {
        title: "Ein KI-Mentor in der Tasche",
        description: "Emily nutzte Zaza Draft zur Stärkung ihres Selbstvertrauens. Sie entwarf ihre groben Gedanken, ließ sie von der KI polieren und lernte aus den Vorschlägen.",
        implementation: [
          { phase: "Phase 1: Entwurf", duration: "Woche 1-2", activities: ["Gab ängstliche/grobe Entwürfe in Zaza ein", "Nutzte den Filter 'Professionell formulieren'"] },
          { phase: "Phase 2: Lernen", duration: "Monat 1", activities: ["Studierte, wie die KI schwierige Nachrichten formulierte", "Übernahm erfolgreiche Phrasen in ihren Wortschatz"] },
          { phase: "Phase 3: Unabhängigkeit", duration: "Monat 2", activities: ["Schrieb Entwürfe selbstbewusst", "Nutzte Zaza nur noch für den Feinschliff"] }
        ]
      },
      results: {
        title: "Beschleunigtes professionelles Wachstum",
        description: "Ihr Mentor bemerkte, dass sie kommunizierte wie eine Lehrerin mit 5 Jahren Erfahrung. Ihre Angst nahm deutlich ab, sodass sie ihr erstes Jahr genießen konnte.",
        metrics: [
          { label: "Selbstvertrauen", value: "Hoch", icon: "sparkles" },
          { label: "Entwurfszeit", value: "5 Min.", icon: "clock" },
          { label: "Elternbeschwerden", value: "0", icon: "check" },
          { label: "Mentoren-Bewertung", value: "Vorbildlich", icon: "star" }
        ]
      },
      testimonial: {
        quote: "Mein Mentor war beeindruckt von meiner Kommunikation. Zaza gab mir das nötige Selbstvertrauen, um professionell zu klingen, auch wenn ich innerlich zitterte.",
        context: "Emily über ihr erstes Jahr"
      },
      keyTakeaways: [
        "KI-Tools können als Echtzeit-Fortbildung dienen",
        "Professionelle Beispiele reduzieren Ängste",
        "Sicherheit in der Kommunikation führt zu besserem Klassenmanagement",
        "Technologie kann die Erfahrungslücke schließen"
      ],
      ui: { backButton: "Zurück zu den Erfolgsgeschichten", challengeTab: "Die Herausforderung", solutionTab: "Die Lösung", resultsTab: "Die Ergebnisse", painPointsTitle: "Hauptprobleme", keyTakeawaysTitle: "Wichtige Erkenntnisse", ctaTitle: "Starten Sie sicher in den Beruf", ctaSubtitle: "Erstellen Sie noch heute Ihr kostenloses Konto", ctaPrimary: "Kostenlos anmelden", ctaSecondary: "Mehr Geschichten", notFound: "Fallstudie nicht gefunden" }
    }
  }
}

export function CaseStudyDetailClient({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const lang = language === "de" ? "de" : "en"
  
  const studyData = caseStudyData[slug]
  const study = studyData ? studyData[lang] : null

  const [activeTab, setActiveTab] = useState<"challenge" | "solution" | "results">("challenge")

  // Icon mapping helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "clock": return <Clock className="w-8 h-8 text-purple-400" />
      case "trending-up": return <TrendingUp className="w-8 h-8 text-green-400" />
      case "check": return <CheckCircle2 className="w-8 h-8 text-blue-400" />
      case "users": return <Users className="w-8 h-8 text-orange-400" />
      case "globe": return <Globe className="w-8 h-8 text-cyan-400" />
      case "file-text": return <FileText className="w-8 h-8 text-pink-400" />
      case "shield": return <CheckCircle2 className="w-8 h-8 text-emerald-400" />
      case "sparkles": return <Sparkles className="w-8 h-8 text-yellow-400" />
      case "star": return <CheckCircle2 className="w-8 h-8 text-yellow-400" />
      default: return <CheckCircle2 className="w-8 h-8 text-gray-400" />
    }
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link href="/success-stories">Back to Success Stories</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Back Button */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Button
            asChild
            variant="ghost"
            className="text-gray-400 hover:text-white mb-8"
            onClick={() => trackEvent("case_study_back_clicked", { slug })}
          >
            <Link href="/success-stories">
              <ArrowLeft className="mr-2 w-4 h-4" />
              {study.ui.backButton}
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-6 bg-purple-500/10 text-purple-300 border-purple-500/20 px-4 py-1.5">
            {study.categoryLabel}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">{study.title}</h1>

          <div className="flex flex-wrap gap-6 text-gray-300 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>
                {study.school}, {study.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span>{study.students}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
            <Image src={study.thumbnail || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
          </div>

          {/* Teacher Profile */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={study.teacherPhoto || "/placeholder.svg"}
                  alt={study.teacherName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{study.teacherName}</h3>
                <p className="text-gray-400 mb-4">{study.teacherRole}</p>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                  <Quote className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-gray-300 italic">"{study.testimonial.quote}"</p>
                  <p className="text-sm text-gray-500 mt-2">{study.testimonial.context}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-y border-white/10 py-4 px-6 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: "challenge" as const, label: study.ui.challengeTab },
              { id: "solution" as const, label: study.ui.solutionTab },
              { id: "results" as const, label: study.ui.resultsTab },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {activeTab === "challenge" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{study.challenge.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{study.challenge.description}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">{study.ui.painPointsTitle}</h3>
                <ul className="space-y-4">
                  {study.challenge.painPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                      </div>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "solution" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{study.solution.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{study.solution.description}</p>
              </div>

              <div className="space-y-6">
                {study.solution.implementation.map((phase, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{phase.phase}</h3>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 ml-14">
                      {phase.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{study.results.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{study.results.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {study.results.metrics.map((metric, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      {getIcon(metric.icon)}
                      <h3 className="text-lg font-medium text-gray-300">{metric.label}</h3>
                    </div>
                    <div className="text-4xl font-bold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">{study.ui.keyTakeawaysTitle}</h3>
                <ul className="space-y-4">
                  {study.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{study.ui.ctaTitle}</h2>
          <p className="text-xl text-gray-300 mb-8">{study.ui.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-6 rounded-full shadow-lg shadow-purple-500/25"
              onClick={() => trackEvent("case_study_cta_clicked", { slug, cta: "try_free" })}
            >
              <Link href="/pricing">{study.ui.ctaPrimary}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full bg-transparent"
              onClick={() => trackEvent("case_study_cta_clicked", { slug, cta: "view_more" })}
            >
              <Link href="/success-stories">{study.ui.ctaSecondary}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: study.title,
            description: study.challenge.description,
            author: {
              "@type": "Person",
              name: study.teacherName,
              jobTitle: study.teacherRole,
            },
            publisher: {
              "@type": "Organization",
              name: "Zaza",
            },
            about: {
              "@type": "EducationalOrganization",
              name: study.school,
              address: {
                "@type": "PostalAddress",
                addressLocality: study.location,
              },
            },
          }),
        }}
      />
    </div>
  )
}
