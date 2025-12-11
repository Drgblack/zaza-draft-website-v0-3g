"use client";

import { useState } from "react";
import { useLanguage } from "../../src/contexts/LanguageContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  Video,
} from "lucide-react";
import { RelatedResources } from "@/components/related-resources";

const content = {
  en: {
    hero: {
      badge: "50+ Integrations Available",
      title_prefix: "Connect Your",
      title_gradient: "Favorite Tools",
      subtitle:
        "Seamlessly connect Zaza Draft with the tools you use every day. Sync rosters, publish assignments, and streamline your workflow.",
      search_placeholder: "Search integrations...",
      stats: {
        integrations: "Integrations",
        setup: "Avg Setup Time",
        uptime: "Uptime",
      },
    },
    sections: {
      popular: "Most Popular",
      browse: "Browse by Category",
      no_results: "No integrations found matching your search.",
      view_integration: "View Integration",
      popular_badge: "Popular",
    },
    features: {
      security: {
        title: "Enterprise Security",
        desc: "All integrations use OAuth 2.0 and are FERPA compliant. Your data is encrypted in transit and at rest.",
      },
      guides: {
        title: "Step-by-Step Guides",
        desc: "Every integration includes detailed setup instructions with screenshots and video tutorials.",
      },
      support: {
        title: "24/7 Support",
        desc: "Our integration support team is available around the clock to help you get connected.",
      },
    },
    cta: {
      title_prefix: "Don't See Your",
      title_gradient: "Tool?",
      desc: "We're constantly adding new integrations. Request an integration and we'll prioritize it for development.",
      btn_request: "Request Integration",
      btn_contact: "Contact Support",
    },
    related: {
      title: "Get the Most from Integrations",
      desc: "Learn how to maximize your integrated workflow",
      items: [
        {
          title: "Integration Tutorials",
          desc: "Watch step-by-step setup guides",
        },
        {
          title: "AI Literacy Courses",
          desc: "Best practices for AI tool selection",
        },
        { title: "AI Glossary", desc: "Understand integration terminology" },
      ],
    },
    categories: [
      { id: "all", name: "All Integrations" },
      { id: "lms", name: "Learning Management" },
      { id: "sis", name: "Student Information" },
      { id: "communication", name: "Communication" },
      { id: "productivity", name: "Productivity" },
      { id: "assessment", name: "Assessment" },
      { id: "storage", name: "Cloud Storage" },
    ],
    integrations: [
      {
        id: "google-classroom",
        name: "Google Classroom",
        category: "lms",
        description:
          "Sync assignments, grades, and student rosters automatically",
        features: [
          "Auto-sync rosters",
          "Grade passback",
          "Assignment creation",
          "Announcement posting",
        ],
      },
      {
        id: "canvas",
        name: "Canvas LMS",
        category: "lms",
        description: "Seamlessly integrate with Canvas courses and gradebooks",
        features: [
          "Course sync",
          "Gradebook integration",
          "Assignment publishing",
          "Student data import",
        ],
      },
      {
        id: "schoology",
        name: "Schoology",
        category: "lms",
        description: "Connect your Schoology courses with Zaza Draft",
        features: [
          "Course integration",
          "Grade sync",
          "Resource sharing",
          "Student roster import",
        ],
      },
      {
        id: "powerschool",
        name: "PowerSchool",
        category: "sis",
        description: "Import student data and sync grades with PowerSchool",
        features: [
          "Student data import",
          "Grade sync",
          "Attendance tracking",
          "Report card comments",
        ],
      },
      {
        id: "infinite-campus",
        name: "Infinite Campus",
        category: "sis",
        description: "Sync student information and grades with Infinite Campus",
        features: [
          "Student roster sync",
          "Grade passback",
          "Parent contact info",
          "IEP data access",
        ],
      },
      {
        id: "skyward",
        name: "Skyward",
        category: "sis",
        description:
          "Connect with Skyward for student data and grade management",
        features: [
          "Student data sync",
          "Gradebook integration",
          "Attendance data",
          "Family contacts",
        ],
      },
      {
        id: "google-drive",
        name: "Google Drive",
        category: "storage",
        description:
          "Save and organize all your AI-generated content in Google Drive",
        features: [
          "Auto-save documents",
          "Folder organization",
          "Share with colleagues",
          "Version history",
        ],
      },
      {
        id: "microsoft-teams",
        name: "Microsoft Teams",
        category: "communication",
        description: "Share AI-generated content directly in Teams channels",
        features: [
          "Channel posting",
          "Direct messaging",
          "File sharing",
          "Meeting notes",
        ],
      },
      {
        id: "remind",
        name: "Remind",
        category: "communication",
        description: "Send AI-generated messages to parents via Remind",
        features: [
          "Bulk messaging",
          "Translation support",
          "Scheduled sends",
          "Parent responses",
        ],
      },
      {
        id: "classdojo",
        name: "ClassDojo",
        category: "communication",
        description: "Share updates and messages with ClassDojo families",
        features: [
          "Story posts",
          "Parent messages",
          "Behavior updates",
          "Photo sharing",
        ],
      },
      {
        id: "seesaw",
        name: "Seesaw",
        category: "communication",
        description: "Post AI-generated feedback to student Seesaw journals",
        features: [
          "Journal comments",
          "Family updates",
          "Activity creation",
          "Portfolio feedback",
        ],
      },
      {
        id: "gmail",
        name: "Gmail",
        category: "communication",
        description:
          "Send AI-generated emails directly from your Gmail account",
        features: [
          "Direct sending",
          "Draft saving",
          "Template library",
          "Signature integration",
        ],
      },
      {
        id: "outlook",
        name: "Outlook",
        category: "communication",
        description: "Integrate with Outlook for seamless email communication",
        features: [
          "Email sending",
          "Calendar integration",
          "Contact sync",
          "Template management",
        ],
      },
      {
        id: "google-calendar",
        name: "Google Calendar",
        category: "productivity",
        description: "Schedule parent conferences and meetings automatically",
        features: [
          "Event creation",
          "Meeting scheduling",
          "Reminder setup",
          "Availability checking",
        ],
      },
      {
        id: "notion",
        name: "Notion",
        category: "productivity",
        description: "Export lesson plans and resources to Notion workspaces",
        features: [
          "Page creation",
          "Database integration",
          "Template export",
          "Collaboration",
        ],
      },
      {
        id: "trello",
        name: "Trello",
        category: "productivity",
        description: "Create lesson planning boards and task cards in Trello",
        features: [
          "Board creation",
          "Card generation",
          "Checklist sync",
          "Due date setting",
        ],
      },
    ],
  },
  de: {
    hero: {
      badge: "50+ Integrationen verfügbar",
      title_prefix: "Verbinden Sie Ihre",
      title_gradient: "Lieblingstools",
      subtitle:
        "Verbinden Sie Zaza Draft nahtlos mit den Tools, die Sie täglich nutzen. Synchronisieren Sie Klassenlisten, veröffentlichen Sie Aufgaben und optimieren Sie Ihren Arbeitsablauf.",
      search_placeholder: "Integrationen suchen...",
      stats: {
        integrations: "Integrationen",
        setup: "Ø Einrichtung",
        uptime: "Verfügbarkeit",
      },
    },
    sections: {
      popular: "Am beliebtesten",
      browse: "Nach Kategorie durchsuchen",
      no_results: "Keine Integrationen gefunden.",
      view_integration: "Integration ansehen",
      popular_badge: "Beliebt",
    },
    features: {
      security: {
        title: "Unternehmenssicherheit",
        desc: "Alle Integrationen nutzen OAuth 2.0 und sind DSGVO/FERPA-konform. Ihre Daten werden bei der Übertragung und im Ruhezustand verschlüsselt.",
      },
      guides: {
        title: "Schritt-für-Schritt-Anleitungen",
        desc: "Jede Integration enthält detaillierte Einrichtungsanweisungen mit Screenshots und Video-Tutorials.",
      },
      support: {
        title: "24/7 Support",
        desc: "Unser Integrations-Support-Team steht Ihnen rund um die Uhr zur Verfügung, um Ihnen bei der Verbindung zu helfen.",
      },
    },
    cta: {
      title_prefix: "Ihr Tool ist",
      title_gradient: "nicht dabei?",
      desc: "Wir fügen ständig neue Integrationen hinzu. Fordern Sie eine Integration an und wir priorisieren sie für die Entwicklung.",
      btn_request: "Integration anfragen",
      btn_contact: "Support kontaktieren",
    },
    related: {
      title: "Holen Sie das Beste aus Integrationen heraus",
      desc: "Erfahren Sie, wie Sie Ihren integrierten Arbeitsablauf maximieren",
      items: [
        {
          title: "Integrations-Tutorials",
          desc: "Schritt-für-Schritt-Anleitungen ansehen",
        },
        {
          title: "KI-Kompetenzkurse",
          desc: "Best Practices für die Tool-Auswahl",
        },
        { title: "KI-Glossar", desc: "Integrationsbegriffe verstehen" },
      ],
    },
    categories: [
      { id: "all", name: "Alle Integrationen" },
      { id: "lms", name: "Lernmanagement" },
      { id: "sis", name: "Schülerinformationen" },
      { id: "communication", name: "Kommunikation" },
      { id: "productivity", name: "Produktivität" },
      { id: "assessment", name: "Bewertung" },
      { id: "storage", name: "Cloud-Speicher" },
    ],
    integrations: [
      {
        id: "google-classroom",
        name: "Google Classroom",
        category: "lms",
        description:
          "Synchronisieren Sie Aufgaben, Noten und Klassenlisten automatisch",
        features: [
          "Listen automatisch synchronisieren",
          "Notenrückgabe",
          "Aufgabenerstellung",
          "Ankündigungen posten",
        ],
      },
      {
        id: "canvas",
        name: "Canvas LMS",
        category: "lms",
        description: "Nahtlose Integration mit Canvas-Kursen und Notenbüchern",
        features: [
          "Kurssynchronisierung",
          "Notenbuch-Integration",
          "Aufgabenveröffentlichung",
          "Schülerdatenimport",
        ],
      },
      {
        id: "schoology",
        name: "Schoology",
        category: "lms",
        description: "Verbinden Sie Ihre Schoology-Kurse mit Zaza Draft",
        features: [
          "Kursintegration",
          "Notensynchronisierung",
          "Ressourcenteilung",
          "Klassenlistenimport",
        ],
      },
      {
        id: "powerschool",
        name: "PowerSchool",
        category: "sis",
        description:
          "Schülerdaten importieren und Noten mit PowerSchool synchronisieren",
        features: [
          "Schülerdatenimport",
          "Notensynchronisierung",
          "Anwesenheitsverfolgung",
          "Zeugniskommentare",
        ],
      },
      {
        id: "infinite-campus",
        name: "Infinite Campus",
        category: "sis",
        description:
          "Schülerinformationen und Noten mit Infinite Campus synchronisieren",
        features: [
          "Klassenlistensynchronisierung",
          "Notenrückgabe",
          "Elternkontaktinfos",
          "Zugriff auf Förderpläne",
        ],
      },
      {
        id: "skyward",
        name: "Skyward",
        category: "sis",
        description:
          "Verbinden Sie sich mit Skyward für Schülerdaten- und Notenmanagement",
        features: [
          "Schülerdatensynchronisierung",
          "Notenbuch-Integration",
          "Anwesenheitsdaten",
          "Familienkontakte",
        ],
      },
      {
        id: "google-drive",
        name: "Google Drive",
        category: "storage",
        description:
          "Speichern und organisieren Sie alle KI-generierten Inhalte in Google Drive",
        features: [
          "Dokumente automatisch speichern",
          "Ordnerorganisation",
          "Mit Kollegen teilen",
          "Versionsverlauf",
        ],
      },
      {
        id: "microsoft-teams",
        name: "Microsoft Teams",
        category: "communication",
        description: "Teilen Sie KI-generierte Inhalte direkt in Teams-Kanälen",
        features: [
          "Kanal-Posting",
          "Direktnachrichten",
          "Dateifreigabe",
          "Besprechungsnotizen",
        ],
      },
      {
        id: "remind",
        name: "Remind",
        category: "communication",
        description:
          "Senden Sie KI-generierte Nachrichten über Remind an Eltern",
        features: [
          "Massennachrichten",
          "Übersetzungsunterstützung",
          "Geplantes Senden",
          "Elternantworten",
        ],
      },
      {
        id: "classdojo",
        name: "ClassDojo",
        category: "communication",
        description:
          "Teilen Sie Updates und Nachrichten mit ClassDojo-Familien",
        features: [
          "Story-Posts",
          "Elternnachrichten",
          "Verhaltens-Updates",
          "Fotofreigabe",
        ],
      },
      {
        id: "seesaw",
        name: "Seesaw",
        category: "communication",
        description:
          "Posten Sie KI-generiertes Feedback in Seesaw-Schülerjournalen",
        features: [
          "Journalkommentare",
          "Familien-Updates",
          "Aktivitätserstellung",
          "Portfolio-Feedback",
        ],
      },
      {
        id: "gmail",
        name: "Gmail",
        category: "communication",
        description:
          "Senden Sie KI-generierte E-Mails direkt von Ihrem Gmail-Konto",
        features: [
          "Direktes Senden",
          "Entwurf speichern",
          "Vorlagenbibliothek",
          "Signaturintegration",
        ],
      },
      {
        id: "outlook",
        name: "Outlook",
        category: "communication",
        description:
          "Integrieren Sie Outlook für nahtlose E-Mail-Kommunikation",
        features: [
          "E-Mail-Versand",
          "Kalenderintegration",
          "Kontaktsynchronisierung",
          "Vorlagenverwaltung",
        ],
      },
      {
        id: "google-calendar",
        name: "Google Calendar",
        category: "productivity",
        description:
          "Planen Sie Elternkonferenzen und Besprechungen automatisch",
        features: [
          "Terminerstellung",
          "Besprechungsplanung",
          "Erinnerungseinrichtung",
          "Verfügbarkeitsprüfung",
        ],
      },
      {
        id: "notion",
        name: "Notion",
        category: "productivity",
        description:
          "Exportieren Sie Unterrichtspläne und Ressourcen in Notion-Workspaces",
        features: [
          "Seitenerstellung",
          "Datenbankintegration",
          "Vorlagenexport",
          "Zusammenarbeit",
        ],
      },
      {
        id: "trello",
        name: "Trello",
        category: "productivity",
        description:
          "Erstellen Sie Unterrichtsplanungs-Boards und Aufgabenkarten in Trello",
        features: [
          "Board-Erstellung",
          "Kartengenerierung",
          "Checklisten-Sync",
          "Fälligkeitsdatumseinstellung",
        ],
      },
    ],
  },
};

// Static data for visual properties that don't need translation
const integrationMeta = {
  "google-classroom": {
    icon: "🎓",
    color: "from-green-500 to-emerald-500",
    users: "28,450+",
    setupTime: "5 min",
    popular: true,
  },
  canvas: {
    icon: "📚",
    color: "from-orange-500 to-red-500",
    users: "15,230+",
    setupTime: "8 min",
    popular: true,
  },
  schoology: {
    icon: "🏫",
    color: "from-blue-500 to-cyan-500",
    users: "12,890+",
    setupTime: "7 min",
    popular: true,
  },
  powerschool: {
    icon: "⚡",
    color: "from-purple-500 to-pink-500",
    users: "18,920+",
    setupTime: "10 min",
    popular: true,
  },
  "infinite-campus": {
    icon: "🏢",
    color: "from-indigo-500 to-purple-500",
    users: "14,560+",
    setupTime: "10 min",
    popular: false,
  },
  skyward: {
    icon: "☁️",
    color: "from-blue-400 to-blue-600",
    users: "11,340+",
    setupTime: "9 min",
    popular: false,
  },
  "google-drive": {
    icon: "📁",
    color: "from-yellow-500 to-orange-500",
    users: "32,120+",
    setupTime: "3 min",
    popular: true,
  },
  "microsoft-teams": {
    icon: "💬",
    color: "from-blue-600 to-purple-600",
    users: "24,780+",
    setupTime: "5 min",
    popular: true,
  },
  remind: {
    icon: "📱",
    color: "from-blue-500 to-indigo-500",
    users: "19,450+",
    setupTime: "4 min",
    popular: false,
  },
  classdojo: {
    icon: "👾",
    color: "from-green-400 to-blue-500",
    users: "16,890+",
    setupTime: "5 min",
    popular: false,
  },
  seesaw: {
    icon: "🎨",
    color: "from-pink-500 to-rose-500",
    users: "13,670+",
    setupTime: "6 min",
    popular: false,
  },
  gmail: {
    icon: "📧",
    color: "from-red-500 to-pink-500",
    users: "29,340+",
    setupTime: "3 min",
    popular: true,
  },
  outlook: {
    icon: "📅",
    color: "from-blue-600 to-blue-800",
    users: "21,560+",
    setupTime: "4 min",
    popular: false,
  },
  "google-calendar": {
    icon: "📅",
    color: "from-blue-500 to-cyan-500",
    users: "17,230+",
    setupTime: "4 min",
    popular: false,
  },
  notion: {
    icon: "📝",
    color: "from-gray-700 to-gray-900",
    users: "9,780+",
    setupTime: "6 min",
    popular: false,
  },
  trello: {
    icon: "📋",
    color: "from-blue-500 to-blue-700",
    users: "8,450+",
    setupTime: "5 min",
    popular: false,
  },
};

export default function IntegrationsClient() {
  const { language } = useLanguage();
  const isGerman = language === "de";
  const text = isGerman ? content.de : content.en;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Merge static meta data with translated text
  const fullIntegrations = text.integrations.map((item) => ({
    ...item,
    // @ts-ignore - we know the ID exists in meta
    ...integrationMeta[item.id],
  }));

  // Calculate counts for categories based on current data
  const categoriesWithCounts = text.categories.map((cat) => {
    const count =
      cat.id === "all"
        ? fullIntegrations.length
        : fullIntegrations.filter((i) => i.category === cat.id).length;
    return { ...cat, count };
  });

  const filteredIntegrations = fullIntegrations.filter((integration) => {
    const matchesCategory =
      selectedCategory === "all" || integration.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularIntegrations = fullIntegrations.filter((i) => i.popular);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">
                {text.hero.badge}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {text.hero.title_prefix}{" "}
              <span className="gradient-text">{text.hero.title_gradient}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {text.hero.subtitle}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={text.hero.search_placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 bg-[#1E293B] border-white/10 text-white placeholder:text-gray-400 focus:border-[#8B5CF6] text-lg"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {fullIntegrations.length}
                </div>
                <div className="text-gray-400 text-sm">
                  {text.hero.stats.integrations}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">5 min</div>
                <div className="text-gray-400 text-sm">
                  {text.hero.stats.setup}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-400 text-sm">
                  {text.hero.stats.uptime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Integrations */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Zap className="w-8 h-8 text-[#A78BFA]" />
            <h2 className="text-4xl font-bold text-white">
              {text.sections.popular}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularIntegrations.map((integration) => (
              <Link
                key={integration.id}
                href={`/integrations/${integration.id}`}
                className="bg-[#1E293B] border border-white/10 rounded-xl p-8 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`text-5xl bg-gradient-to-br ${integration.color} p-4 rounded-xl`}
                  >
                    {integration.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
                    {text.sections.popular_badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                  {integration.name}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {integration.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{integration.users}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{integration.setupTime}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {integration.features.slice(0, 3).map((feature: any) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-[#A78BFA]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#A78BFA] hover:text-white border border-[#8B5CF6]/30 group-hover:border-[#8B5CF6]">
                  {text.sections.view_integration}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-20 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8">
            {text.sections.browse}
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categoriesWithCounts.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
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

          {/* Integration Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIntegrations.map((integration) => (
              <Link
                key={integration.id}
                href={`/integrations/${integration.id}`}
                className="bg-[#1E293B] border border-white/10 rounded-xl p-8 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`text-5xl bg-gradient-to-br ${integration.color} p-4 rounded-xl`}
                  >
                    {integration.icon}
                  </div>
                  {integration.popular && (
                    <span className="text-xs font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
                      {text.sections.popular_badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                  {integration.name}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {integration.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{integration.users}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{integration.setupTime}</span>
                  </div>
                </div>
                <Button className="w-full bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#A78BFA] hover:text-white border border-[#8B5CF6]/30 group-hover:border-[#8B5CF6]">
                  {text.sections.view_integration}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ))}
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                {text.sections.no_results}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Security & Support */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {text.features.security.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {text.features.security.desc}
              </p>
            </div>
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {text.features.guides.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {text.features.guides.desc}
              </p>
            </div>
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {text.features.support.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {text.features.support.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedResources
            title={text.related.title}
            description={text.related.desc}
            resources={text.related.items.map((item, index) => ({
              title: item.title,
              description: item.desc,
              // Maintain icons and links from original code
              href:
                index === 0
                  ? "/webinars?category=integrations"
                  : index === 1
                    ? "/ai-literacy"
                    : "/glossary",
              icon:
                index === 0 ? Video : index === 1 ? GraduationCap : BookOpen,
              color: index === 1 ? "#A78BFA" : "#8B5CF6",
            }))}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {text.cta.title_prefix}{" "}
            <span className="gradient-text">{text.cta.title_gradient}</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">{text.cta.desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6"
            >
              <Link href="/integrations/request">{text.cta.btn_request}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent text-lg px-8 py-6"
            >
              <Link href="/support">{text.cta.btn_contact}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


