"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  Users,
  Video,
  Play,
  Search,
  CheckCircle,
  Star,
  Award,
  Download,
  GraduationCap,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { analytics } from "@/lib/analytics";
import { RelatedResources } from "@/components/related-resources";

// Bilingual category structure
const categories = {
  en: [
    { id: "all", name: "All Webinars", count: 52 },
    { id: "getting-started", name: "Getting Started", count: 8 },
    { id: "advanced", name: "Advanced Techniques", count: 12 },
    { id: "best-practices", name: "Best Practices", count: 15 },
    { id: "case-studies", name: "Case Studies", count: 9 },
    { id: "product-updates", name: "Product Updates", count: 8 },
  ],
  de: [
    { id: "all", name: "Alle Webinare", count: 52 },
    { id: "getting-started", name: "Erste Schritte", count: 8 },
    { id: "advanced", name: "Fortgeschrittene Techniken", count: 12 },
    { id: "best-practices", name: "Best Practices", count: 15 },
    { id: "case-studies", name: "Fallstudien", count: 9 },
    { id: "product-updates", name: "Produkt-Updates", count: 8 },
  ],
};

// Bilingual upcoming webinars
const upcomingWebinars = {
  en: [
    {
      id: "prompt-engineering-mastery",
      title: "Prompt Engineering Mastery: Advanced Techniques for Teachers",
      date: "2025-01-25",
      time: "4:00 PM EST",
      duration: "60 min",
      category: "advanced",
      presenter: "Dr. Sarah Chen",
      presenterTitle: "AI Education Specialist",
      attendees: 847,
      maxAttendees: 1000,
      description:
        "Learn advanced prompt engineering techniques to get better results from AI tools. Includes live demonstrations and Q&A.",
      topics: [
        "Chain-of-thought prompting",
        "Few-shot learning examples",
        "Prompt templates for different subjects",
        "Troubleshooting common issues",
      ],
      certificateOffered: true,
      featured: true,
    },
    {
      id: "ai-differentiation",
      title: "Using AI for Differentiated Instruction",
      date: "2025-01-28",
      time: "7:00 PM EST",
      duration: "45 min",
      category: "best-practices",
      presenter: "Marcus Johnson",
      presenterTitle: "Special Education Teacher",
      attendees: 623,
      maxAttendees: 500,
      description:
        "Discover how to use AI tools to create differentiated materials for diverse learners, including students with IEPs and ELLs.",
      topics: [
        "Adapting reading levels",
        "Creating visual supports",
        "Scaffolding complex concepts",
        "Multilingual support strategies",
      ],
      certificateOffered: true,
      featured: true,
    },
    {
      id: "ai-assessment-feedback",
      title: "AI-Powered Assessment and Feedback Strategies",
      date: "2025-02-01",
      time: "3:30 PM EST",
      duration: "60 min",
      category: "best-practices",
      presenter: "Dr. Emily Rodriguez",
      presenterTitle: "Assessment Specialist",
      attendees: 512,
      maxAttendees: 750,
      description:
        "Learn how to use AI to create formative assessments and provide timely, personalized feedback to students.",
      topics: [
        "Creating rubrics with AI",
        "Generating assessment questions",
        "Personalized feedback at scale",
        "Data-driven instruction",
      ],
      certificateOffered: true,
      featured: false,
    },
  ],
  de: [
    {
      id: "prompt-engineering-mastery",
      title:
        "Prompt-Engineering-Meisterschaft: Fortgeschrittene Techniken für Lehrkräfte",
      date: "2025-01-25",
      time: "22:00 Uhr MEZ",
      duration: "60 Min",
      category: "advanced",
      presenter: "Dr. Sarah Chen",
      presenterTitle: "KI-Bildungsspezialistin",
      attendees: 847,
      maxAttendees: 1000,
      description:
        "Lernen Sie fortgeschrittene Prompt-Engineering-Techniken, um bessere Ergebnisse von KI-Tools zu erhalten. Mit Live-Demonstrationen und Fragerunde.",
      topics: [
        "Chain-of-Thought-Prompting",
        "Few-Shot-Learning-Beispiele",
        "Prompt-Vorlagen für verschiedene Fächer",
        "Fehlerbehebung bei häufigen Problemen",
      ],
      certificateOffered: true,
      featured: true,
    },
    {
      id: "ai-differentiation",
      title: "KI für differenzierten Unterricht nutzen",
      date: "2025-01-29",
      time: "01:00 Uhr MEZ",
      duration: "45 Min",
      category: "best-practices",
      presenter: "Marcus Johnson",
      presenterTitle: "Sonderpädagoge",
      attendees: 623,
      maxAttendees: 500,
      description:
        "Entdecken Sie, wie Sie KI-Tools nutzen können, um differenzierte Materialien für vielfältige Lernende zu erstellen.",
      topics: [
        "Anpassung von Lesestufen",
        "Erstellung visueller Unterstützung",
        "Gerüste für komplexe Konzepte",
        "Mehrsprachige Unterstützungsstrategien",
      ],
      certificateOffered: true,
      featured: true,
    },
    {
      id: "ai-assessment-feedback",
      title: "KI-gestützte Bewertungs- und Feedback-Strategien",
      date: "2025-02-01",
      time: "21:30 Uhr MEZ",
      duration: "60 Min",
      category: "best-practices",
      presenter: "Dr. Emily Rodriguez",
      presenterTitle: "Bewertungsspezialistin",
      attendees: 512,
      maxAttendees: 750,
      description:
        "Lernen Sie, wie Sie KI nutzen, um formative Bewertungen zu erstellen und zeitnahes, personalisiertes Feedback zu geben.",
      topics: [
        "Rubrik-Erstellung mit KI",
        "Generierung von Bewertungsfragen",
        "Personalisiertes Feedback im großen Maßstab",
        "Datengestützter Unterricht",
      ],
      certificateOffered: true,
      featured: false,
    },
  ],
};

// Bilingual on-demand webinars
const onDemandWebinars = {
  en: [
    {
      id: "ai-basics-teachers",
      title: "AI Basics for Teachers: Getting Started with Confidence",
      duration: "45 min",
      category: "getting-started",
      presenter: "Jennifer Martinez",
      presenterTitle: "EdTech Coach",
      views: 12450,
      rating: 4.9,
      description:
        "A beginner-friendly introduction to AI tools for education. No technical background required.",
      topics: [
        "What is AI?",
        "Common AI tools for teachers",
        "Getting started safely",
        "Addressing student concerns",
      ],
      certificateOffered: true,
      popular: true,
    },
    {
      id: "parent-communication-ai",
      title: "Transforming Parent Communication with AI",
      duration: "50 min",
      category: "best-practices",
      presenter: "David Thompson",
      presenterTitle: "Elementary Principal",
      views: 9870,
      rating: 4.8,
      description:
        "Learn how to use AI to write effective parent emails, newsletters, and conference notes in multiple languages.",
      topics: [
        "Email templates that work",
        "Translating for multilingual families",
        "Positive behavior communication",
        "Conference preparation",
      ],
      certificateOffered: true,
      popular: true,
    },
    {
      id: "lesson-planning-ai",
      title: "AI-Powered Lesson Planning: Save 5+ Hours Per Week",
      duration: "55 min",
      category: "best-practices",
      presenter: "Rachel Kim",
      presenterTitle: "High School Teacher",
      views: 11230,
      rating: 4.9,
      description:
        "Discover workflows to plan engaging, standards-aligned lessons in a fraction of the time.",
      topics: [
        "Unit planning with AI",
        "Creating engaging activities",
        "Aligning to standards",
        "Adapting for different grade levels",
      ],
      certificateOffered: true,
      popular: true,
    },
    {
      id: "ethical-ai-classroom",
      title: "Ethical AI Use in the Classroom",
      duration: "40 min",
      category: "best-practices",
      presenter: "Dr. James Wilson",
      presenterTitle: "Education Ethics Professor",
      views: 7650,
      rating: 4.7,
      description:
        "Navigate the ethical considerations of AI in education, including academic integrity and bias.",
      topics: [
        "Academic integrity policies",
        "Addressing AI bias",
        "Student privacy concerns",
        "Teaching AI literacy",
      ],
      certificateOffered: true,
      popular: false,
    },
    {
      id: "ai-special-education",
      title: "AI Tools for Special Education Teachers",
      duration: "60 min",
      category: "best-practices",
      presenter: "Lisa Anderson",
      presenterTitle: "SPED Coordinator",
      views: 6890,
      rating: 4.8,
      description:
        "Specialized strategies for using AI to support students with diverse learning needs.",
      topics: [
        "IEP goal writing",
        "Behavior intervention plans",
        "Progress monitoring",
        "Parent communication",
      ],
      certificateOffered: true,
      popular: false,
    },
    {
      id: "grading-feedback-ai",
      title: "Efficient Grading and Feedback with AI",
      duration: "50 min",
      category: "advanced",
      presenter: "Michael Brown",
      presenterTitle: "Middle School Teacher",
      views: 8920,
      rating: 4.6,
      description:
        "Learn how to provide meaningful feedback faster using AI-powered tools and workflows.",
      topics: [
        "Rubric-based grading",
        "Personalized feedback comments",
        "Common error patterns",
        "Growth mindset language",
      ],
      certificateOffered: true,
      popular: false,
    },
  ],
  de: [
    {
      id: "ai-basics-teachers",
      title: "KI-Grundlagen für Lehrkräfte: Selbstbewusst starten",
      duration: "45 Min",
      category: "getting-started",
      presenter: "Jennifer Martinez",
      presenterTitle: "EdTech-Coach",
      views: 12450,
      rating: 4.9,
      description:
        "Eine anfängerfreundliche Einführung in KI-Tools für die Bildung. Kein technischer Hintergrund erforderlich.",
      topics: [
        "Was ist KI?",
        "Gängige KI-Tools für Lehrkräfte",
        "Sicher starten",
        "Schülerbedenken ansprechen",
      ],
      certificateOffered: true,
      popular: true,
    },
    {
      id: "parent-communication-ai",
      title: "Elternkommunikation mit KI transformieren",
      duration: "50 Min",
      category: "best-practices",
      presenter: "David Thompson",
      presenterTitle: "Grundschulleiter",
      views: 9870,
      rating: 4.8,
      description:
        "Lernen Sie, wie Sie KI nutzen, um effektive Eltern-E-Mails, Newsletter und Konferenznotizen in mehreren Sprachen zu schreiben.",
      topics: [
        "E-Mail-Vorlagen, die funktionieren",
        "Übersetzen für mehrsprachige Familien",
        "Positive Verhaltenskommunikation",
        "Konferenzvorbereitung",
      ],
      certificateOffered: true,
      popular: true,
    },
    {
      id: "lesson-planning-ai",
      title: "KI-gestützte Unterrichtsplanung: Sparen Sie 5+ Stunden pro Woche",
      duration: "55 Min",
      category: "best-practices",
      presenter: "Rachel Kim",
      presenterTitle: "Gymnasiallehrerin",
      views: 11230,
      rating: 4.9,
      description:
        "Entdecken Sie Arbeitsabläufe zur Planung ansprechender, standardorientierter Lektionen in einem Bruchteil der Zeit.",
      topics: [
        "Einheitsplanung mit KI",
        "Ansprechende Aktivitäten erstellen",
        "An Standards ausrichten",
        "Für verschiedene Klassenstufen anpassen",
      ],
      certificateOffered: true,
      popular: true,
    },
    {
      id: "ethical-ai-classroom",
      title: "Ethischer KI-Einsatz im Klassenzimmer",
      duration: "40 Min",
      category: "best-practices",
      presenter: "Dr. James Wilson",
      presenterTitle: "Professor für Bildungsethik",
      views: 7650,
      rating: 4.7,
      description:
        "Navigieren Sie durch die ethischen Überlegungen zur KI in der Bildung, einschließlich akademischer Integrität und Voreingenommenheit.",
      topics: [
        "Akademische Integritätsrichtlinien",
        "KI-Bias ansprechen",
        "Datenschutzbedenken von Schülern",
        "KI-Kompetenz unterrichten",
      ],
      certificateOffered: true,
      popular: false,
    },
    {
      id: "ai-special-education",
      title: "KI-Tools für Sonderpädagogen",
      duration: "60 Min",
      category: "best-practices",
      presenter: "Lisa Anderson",
      presenterTitle: "Sonderpädagogik-Koordinatorin",
      views: 6890,
      rating: 4.8,
      description:
        "Spezialisierte Strategien zur Nutzung von KI zur Unterstützung von Schülern mit verschiedenen Lernbedürfnissen.",
      topics: [
        "IEP-Ziele schreiben",
        "Verhaltensinterventionspläne",
        "Fortschrittsüberwachung",
        "Elternkommunikation",
      ],
      certificateOffered: true,
      popular: false,
    },
    {
      id: "grading-feedback-ai",
      title: "Effiziente Bewertung und Feedback mit KI",
      duration: "50 Min",
      category: "advanced",
      presenter: "Michael Brown",
      presenterTitle: "Mittelschullehrer",
      views: 8920,
      rating: 4.6,
      description:
        "Lernen Sie, wie Sie mit KI-gestützten Tools und Arbeitsabläufen schneller sinnvolles Feedback geben können.",
      topics: [
        "Rubrik-basierte Bewertung",
        "Personalisierte Feedback-Kommentare",
        "Häufige Fehlermuster",
        "Wachstumsmentalitätssprache",
      ],
      certificateOffered: true,
      popular: false,
    },
  ],
};

export default function WebinarsClient() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const lang = language === "de" ? "de" : "en";
  const currentCategories = categories[lang];
  const currentUpcoming = upcomingWebinars[lang];
  const currentOnDemand = onDemandWebinars[lang];

  useEffect(() => {
    analytics.webinars.viewHub();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      analytics.webinars.filterByCategory(query);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== "all") {
      analytics.webinars.filterByCategory(category);
    }
  };

  const handleRegister = (webinar: (typeof currentUpcoming)[0]) => {
    analytics.webinars.registerWebinar(webinar.id, webinar.title);
  };

  const handleWatchRecording = (webinar: (typeof currentOnDemand)[0]) => {
    analytics.webinars.watchRecording(webinar.id, webinar.title);
  };

  const filteredOnDemand = currentOnDemand.filter((webinar) => {
    const matchesCategory =
      selectedCategory === "all" || webinar.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Video className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">
                {lang === "de"
                  ? "50+ Fortbildungssitzungen"
                  : "50+ Professional Development Sessions"}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {lang === "de"
                ? "Fortbildungs-Webinare"
                : "Professional Development Webinars"}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {lang === "de"
                ? "Nehmen Sie an Live-Sitzungen teil oder sehen Sie auf Abruf zu. Erwerben Sie Fortbildungszertifikate und lernen Sie von erfahrenen Pädagogen."
                : "Join live sessions or watch on-demand. Earn professional development certificates and learn from experienced educators."}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={
                    lang === "de"
                      ? "Webinare durchsuchen..."
                      : "Search webinars..."
                  }
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 pr-4 py-6 bg-[#1E293B] border-white/10 text-white placeholder:text-gray-400 focus:border-[#8B5CF6] text-lg"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">52</div>
                <div className="text-gray-400 text-sm">
                  {lang === "de" ? "Live Webinare" : "Live Webinars"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">15K+</div>
                <div className="text-gray-400 text-sm">
                  {lang === "de" ? "Geschulte Lehrkräfte" : "Expert Hours"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4.8</div>
                <div className="text-gray-400 text-sm">
                  {lang === "de" ? "Durchschn. Bewertung" : "Recordings"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Calendar className="w-8 h-8 text-[#A78BFA]" />
            <h2 className="text-4xl font-bold text-white">
              {lang === "de"
                ? "Bevorstehende Live-Webinare"
                : "Upcoming Live Webinars"}
            </h2>
          </div>

          <div className="space-y-6">
            {currentUpcoming.map((webinar) => (
              <div
                key={webinar.id}
                className={`bg-[#1E293B] border rounded-xl p-8 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 ${
                  webinar.featured ? "border-[#8B5CF6]" : "border-white/10"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {webinar.featured && (
                          <span className="inline-block text-xs font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-3 py-1 rounded-full mb-3">
                            {lang === "de" ? "Empfohlen" : "Featured"}
                          </span>
                        )}
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {webinar.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          {webinar.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-5 h-5 text-[#A78BFA]" />
                        <span>
                          {new Date(webinar.date).toLocaleDateString(
                            lang === "de" ? "de-DE" : "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Clock className="w-5 h-5 text-[#A78BFA]" />
                        <span>
                          {webinar.time} ({webinar.duration})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Users className="w-5 h-5 text-[#A78BFA]" />
                        <span>
                          {webinar.attendees}/{webinar.maxAttendees}{" "}
                          {lang === "de" ? "Teilnehmer" : "attendees"}
                        </span>
                      </div>
                      {webinar.certificateOffered && (
                        <div className="flex items-center gap-3 text-gray-300">
                          <Award className="w-5 h-5 text-[#A78BFA]" />
                          <span>
                            {lang === "de"
                              ? "Zertifikat enthalten"
                              : "Certificate included"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">
                        {lang === "de"
                          ? "Was Sie lernen werden:"
                          : "What You'll Learn:"}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {webinar.topics.map((topic) => (
                          <div
                            key={topic}
                            className="flex items-center gap-2 text-sm text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-[#A78BFA] flex-shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {webinar.presenter
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          {webinar.presenter}
                        </div>
                        <div className="text-sm text-gray-400">
                          {webinar.presenterTitle}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                      disabled={webinar.attendees >= webinar.maxAttendees}
                      onClick={() => handleRegister(webinar)}
                    >
                      {webinar.attendees >= webinar.maxAttendees
                        ? lang === "de"
                          ? "Warteliste voll"
                          : "Waitlist Full"
                        : lang === "de"
                          ? "Jetzt registrieren"
                          : "Register Now"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter & On-Demand */}
      <section className="py-20 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-8 h-8 text-[#A78BFA]" />
            <h2 className="text-4xl font-bold text-white">
              {lang === "de" ? "Mediathek (On-Demand)" : "On-Demand Library"}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {currentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-[#1E293B] text-gray-300 hover:bg-[#8B5CF6]/10 hover:text-[#A78BFA] border border-white/10"
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">
                  ({category.count})
                </span>
              </button>
            ))}
          </div>

          {/* On-Demand Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOnDemand.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group"
              >
                <div className="relative bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] h-48 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  {webinar.popular && (
                    <span className="absolute top-4 right-4 text-xs font-semibold text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {lang === "de" ? "Beliebt" : "Popular"}
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 text-sm font-semibold text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    {webinar.duration}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                    {webinar.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {webinar.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {webinar.views.toLocaleString()}{" "}
                        {lang === "de" ? "Aufrufe" : "views"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{webinar.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {webinar.presenter
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">
                        {webinar.presenter}
                      </div>
                      <div className="text-xs text-gray-400">
                        {webinar.presenterTitle}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#A78BFA] hover:text-white border border-[#8B5CF6]/30 group-hover:border-[#8B5CF6]"
                    onClick={() => handleWatchRecording(webinar)}
                  >
                    {lang === "de" ? "Jetzt ansehen" : "Watch Now"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredOnDemand.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                {lang === "de"
                  ? "Keine Webinare gefunden, die Ihrer Suche entsprechen."
                  : "No webinars found matching your search."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Resources Section */}
      <RelatedResources
        title={
          lang === "de" ? "Vertiefen Sie Ihr Lernen" : "Deepen Your Learning"
        }
        description={
          lang === "de"
            ? "Ergänzen Sie Ihr Webinar-Lernen mit diesen Ressourcen"
            : "Complement your webinar learning with these resources"
        }
        resources={[
          {
            title: lang === "de" ? "KI-Kompetenz-Kurse" : "AI Literacy Courses",
            description:
              lang === "de"
                ? "Selbstgesteuerte Kurse mit Zertifizierungsprogrammen"
                : "Self-paced courses with certification programs",
            href: "/ai-literacy",
            icon: GraduationCap,
            color: "#8B5CF6",
          },
          {
            title: lang === "de" ? "KI-Glossar" : "AI Glossary",
            description:
              lang === "de"
                ? "150+ KI-Begriffe für Lehrkräfte erklärt"
                : "150+ AI terms explained for teachers",
            href: "/glossary",
            icon: BookOpen,
            color: "#A78BFA",
          },
          {
            title: lang === "de" ? "Community-Forum" : "Community Forum",
            description:
              lang === "de"
                ? "Diskutieren Sie Webinar-Themen mit anderen Lehrkräften"
                : "Discuss webinar topics with fellow teachers",
            href: "/community",
            icon: MessageSquare,
            color: "#8B5CF6",
          },
        ]}
      />

      {/* Benefits Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            {lang === "de"
              ? "Warum unsere Webinare besuchen?"
              : "Why Attend Our Webinars?"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {lang === "de" ? "Fortbildungszertifikate" : "PD Certificates"}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === "de"
                  ? "Erwerben Sie Fortbildungszertifikate für jedes abgeschlossene Webinar."
                  : "Earn professional development certificates for every webinar you complete."}
              </p>
            </div>
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {lang === "de" ? "Experten-Referenten" : "Expert Presenters"}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === "de"
                  ? "Lernen Sie von erfahrenen Pädagogen und KI-Spezialisten, die Ihre Herausforderungen verstehen."
                  : "Learn from experienced educators and AI specialists who understand your challenges."}
              </p>
            </div>
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {lang === "de"
                  ? "Herunterladbare Ressourcen"
                  : "Downloadable Resources"}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === "de"
                  ? "Erhalten Sie Vorlagen, Anleitungen und Materialien, die Sie sofort in Ihrem Klassenzimmer verwenden können."
                  : "Get templates, guides, and materials you can use immediately in your classroom."}
              </p>
            </div>
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {lang === "de" ? "Lebenslanger Zugriff" : "Lifetime Access"}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === "de"
                  ? "Sehen Sie sich Aufzeichnungen jederzeit und überall an. Besuchen Sie Inhalte wieder, wann immer Sie eine Auffrischung benötigen."
                  : "Watch recordings anytime, anywhere. Revisit content whenever you need a refresher."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {lang === "de" ? (
              <>
                Bereit aufzusteigen?{" "}
                <span className="gradient-text">Nächstes Level!</span>
              </>
            ) : (
              <>
                Ready to <span className="gradient-text">Level Up?</span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {lang === "de"
              ? "Schließen Sie sich Tausenden von Lehrkräften an, die ihre Praxis mit KI transformieren. Registrieren Sie sich noch heute für Ihr erstes Webinar."
              : "Join thousands of teachers transforming their practice with AI. Register for your first webinar today."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6"
            >
              <Link href="#upcoming">
                {lang === "de"
                  ? "Bevorstehende Webinare ansehen"
                  : "Browse Upcoming Webinars"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent text-lg px-8 py-6"
            >
              <Link href="/ai-literacy">
                {lang === "de" ? "Kurse erkunden" : "Explore Courses"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
