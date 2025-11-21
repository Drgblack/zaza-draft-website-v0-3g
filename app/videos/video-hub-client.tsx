"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Search,
  Clock,
  Eye,
  BookOpen,
  Zap,
  Users,
  GraduationCap,
  Settings,
  TrendingUp,
  Construction,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// --- CONTENT DICTIONARY ---
const content = {
  en: {
    banner: {
      label: "COMING SOON",
      message:
        "We are currently filming these tutorials! This page is a preview of our upcoming Video Academy.",
    },
    hero: {
      title: "Video Tutorials and Demos",
      description:
        "Watch step-by-step tutorials and product demos to master AI-powered parent communication.",
      badge: "24 Video Tutorials",
      search_placeholder: "Search videos or playlists...",
    },
    sections: {
      featured: "Featured Videos",
      curated: "Curated Playlists",
      all: "All Videos",
      views: "views",
    },
    categories: [
      { id: "all", name: "All Videos", icon: Play, count: 24 },
      {
        id: "getting-started",
        name: "Getting Started",
        icon: BookOpen,
        count: 6,
      },
      { id: "advanced", name: "Advanced Features", icon: Zap, count: 5 },
      { id: "use-cases", name: "Use Cases", icon: Users, count: 7 },
      {
        id: "best-practices",
        name: "Best Practices",
        icon: GraduationCap,
        count: 4,
      },
      { id: "tips-tricks", name: "Tips & Tricks", icon: Settings, count: 2 },
    ],
    playlists: [
      {
        id: "quick-start",
        title: "Quick Start Guide",
        description: "Get up and running with Zaza Draft in under 30 minutes",
        videoCount: 5,
        duration: "28 min",
        thumbnail: "/teacher-using-laptop-tutorial.jpg",
      },
      {
        id: "parent-communication",
        title: "Mastering Parent Communication",
        description: "Advanced techniques for effective parent engagement",
        videoCount: 8,
        duration: "1h 15min",
        thumbnail: "/parent-teacher-communication.jpg",
      },
      {
        id: "time-saving",
        title: "Time-Saving Workflows",
        description: "Automate repetitive tasks and reclaim your time",
        videoCount: 6,
        duration: "45 min",
        thumbnail: "/teacher-working-efficiently.jpg",
      },
    ],
    videos: [
      {
        id: "welcome-to-zaza-draft",
        title: "Welcome to Zaza Draft",
        description:
          "A quick introduction to Zaza Draft and what you can accomplish",
        category: "getting-started",
        duration: "3:24",
        views: 15420,
        thumbnail: "/welcome-introduction-video.jpg",
        featured: true,
      },
      {
        id: "first-parent-message",
        title: "Creating Your First Parent Message",
        description:
          "Step-by-step guide to writing your first AI-powered message",
        category: "getting-started",
        duration: "5:12",
        views: 12350,
        thumbnail: "/writing-message-tutorial.jpg",
        featured: true,
      },
      {
        id: "customizing-tone",
        title: "Customizing Message Tone & Style",
        description:
          "Learn how to adjust tone, formality, and language for different situations",
        category: "getting-started",
        duration: "4:45",
        views: 9870,
        thumbnail: "/customizing-settings.jpg",
      },
      {
        id: "multilingual-messages",
        title: "Writing Multilingual Messages",
        description: "Communicate with parents in their preferred language",
        category: "getting-started",
        duration: "6:18",
        views: 8920,
        thumbnail: "/multilingual-translation.jpg",
      },
      {
        id: "templates-library",
        title: "Using the Templates Library",
        description: "Save time with pre-built templates for common scenarios",
        category: "getting-started",
        duration: "4:30",
        views: 7650,
        thumbnail: "/templates-library.jpg",
      },
      {
        id: "keyboard-shortcuts",
        title: "Keyboard Shortcuts & Power User Tips",
        description: "Work faster with keyboard shortcuts and hidden features",
        category: "tips-tricks",
        duration: "3:55",
        views: 5420,
        thumbnail: "/keyboard-shortcuts.png",
      },
      {
        id: "advanced-prompts",
        title: "Advanced Prompt Engineering",
        description:
          "Master the art of crafting effective prompts for better results",
        category: "advanced",
        duration: "8:42",
        views: 6780,
        thumbnail: "/advanced-prompts.jpg",
        featured: true,
      },
      {
        id: "batch-processing",
        title: "Batch Processing Multiple Messages",
        description: "Generate multiple personalized messages at once",
        category: "advanced",
        duration: "7:15",
        views: 5230,
        thumbnail: "/batch-processing.jpg",
      },
      {
        id: "integration-google-classroom",
        title: "Google Classroom Integration",
        description:
          "Connect Zaza Draft with Google Classroom for seamless workflows",
        category: "advanced",
        duration: "6:50",
        views: 8940,
        thumbnail: "/google-classroom-integration.jpg",
      },
      {
        id: "difficult-conversations",
        title: "Handling Difficult Conversations",
        description:
          "Communicate sensitive topics with empathy and professionalism",
        category: "use-cases",
        duration: "9:20",
        views: 11250,
        thumbnail: "/difficult-conversation.jpg",
      },
      {
        id: "progress-reports",
        title: "Writing Progress Reports",
        description:
          "Create comprehensive, personalized progress reports efficiently",
        category: "use-cases",
        duration: "7:35",
        views: 9870,
        thumbnail: "/progress-report.jpg",
      },
      {
        id: "parent-teacher-conferences",
        title: "Preparing for Parent-Teacher Conferences",
        description: "Use AI to prepare talking points and follow-up messages",
        category: "use-cases",
        duration: "6:45",
        views: 7650,
        thumbnail: "/parent-teacher-conference.png",
      },
      {
        id: "behavior-updates",
        title: "Positive Behavior Updates",
        description:
          "Celebrate student successes with personalized positive messages",
        category: "use-cases",
        duration: "5:20",
        views: 6420,
        thumbnail: "/positive-behavior.jpg",
      },
      {
        id: "homework-reminders",
        title: "Homework Reminders & Assignments",
        description: "Keep parents informed about assignments and due dates",
        category: "use-cases",
        duration: "4:55",
        views: 5890,
        thumbnail: "/homework-reminder.jpg",
      },
      {
        id: "weekly-newsletters",
        title: "Creating Weekly Class Newsletters",
        description:
          "Generate engaging newsletters to keep parents in the loop",
        category: "use-cases",
        duration: "8:10",
        views: 7230,
        thumbnail: "/videos/weekly-newsletter.jpg",
      },
      {
        id: "special-education",
        title: "Special Education Communication",
        description:
          "Best practices for communicating with special education families",
        category: "use-cases",
        duration: "10:25",
        views: 6540,
        thumbnail: "/videos/special-education.jpg",
      },
      {
        id: "tone-consistency",
        title: "Maintaining Consistent Tone",
        description:
          "Ensure your communication style remains consistent across messages",
        category: "best-practices",
        duration: "5:40",
        views: 4320,
        thumbnail: "/videos/tone-consistency.jpg",
      },
      {
        id: "privacy-ferpa",
        title: "Privacy & FERPA Compliance",
        description: "Protect student data while using AI tools",
        category: "best-practices",
        duration: "7:55",
        views: 5670,
        thumbnail: "/videos/privacy-ferpa.jpg",
      },
      {
        id: "ai-ethics",
        title: "Ethical AI Use in Education",
        description:
          "Guidelines for responsible AI use in parent communication",
        category: "best-practices",
        duration: "9:10",
        views: 4890,
        thumbnail: "/videos/ai-ethics.jpg",
      },
      {
        id: "personalization-tips",
        title: "Personalization Best Practices",
        description: "Make every message feel personal and authentic",
        category: "best-practices",
        duration: "6:30",
        views: 5120,
        thumbnail: "/videos/personalization.jpg",
      },
    ],
  },
  de: {
    banner: {
      label: "DEMNÄCHST",
      message:
        "Wir zeichnen diese Tutorials gerade auf! Diese Seite ist eine Vorschau auf unsere kommende Video-Akademie.",
    },
    hero: {
      title: "Video-Tutorials und Demos",
      description:
        "Sehen Sie Schritt-für-Schritt-Anleitungen und Produktdemos, um die KI-gestützte Elternkommunikation zu meistern.",
      badge: "24 Video-Tutorials",
      search_placeholder: "Videos oder Playlists durchsuchen...",
    },
    sections: {
      featured: "Ausgewählte Videos",
      curated: "Kuratierte Playlists",
      all: "Alle Videos",
      views: "Aufrufe",
    },
    categories: [
      { id: "all", name: "Alle Videos", icon: Play, count: 24 },
      {
        id: "getting-started",
        name: "Erste Schritte",
        icon: BookOpen,
        count: 6,
      },
      { id: "advanced", name: "Erweiterte Funktionen", icon: Zap, count: 5 },
      { id: "use-cases", name: "Anwendungsfälle", icon: Users, count: 7 },
      {
        id: "best-practices",
        name: "Best Practices",
        icon: GraduationCap,
        count: 4,
      },
      { id: "tips-tricks", name: "Tipps & Tricks", icon: Settings, count: 2 },
    ],
    playlists: [
      {
        id: "quick-start",
        title: "Schnelleinstiegs-Anleitung",
        description: "Starten Sie Zaza Draft in unter 30 Minuten",
        videoCount: 5,
        duration: "28 Min.",
        thumbnail: "/teacher-using-laptop-tutorial.jpg",
      },
      {
        id: "parent-communication",
        title: "Elternkommunikation meistern",
        description: "Erweiterte Techniken für effektive Elternarbeit",
        videoCount: 8,
        duration: "1 Std. 15 Min.",
        thumbnail: "/parent-teacher-communication.jpg",
      },
      {
        id: "time-saving",
        title: "Zeitsparende Arbeitsabläufe",
        description:
          "Automatisieren Sie sich wiederholende Aufgaben und gewinnen Sie Zeit zurück",
        videoCount: 6,
        duration: "45 Min.",
        thumbnail: "/teacher-working-efficiently.jpg",
      },
    ],
    videos: [
      {
        id: "welcome-to-zaza-draft",
        title: "Willkommen bei Zaza Draft",
        description:
          "Eine kurze Einführung in Zaza Draft und was Sie erreichen können",
        category: "getting-started",
        duration: "3:24",
        views: 15420,
        thumbnail: "/welcome-introduction-video.jpg",
        featured: true,
      },
      {
        id: "first-parent-message",
        title: "Erste Elternnachricht erstellen",
        description:
          "Schritt-für-Schritt-Anleitung zum Verfassen Ihrer ersten KI-gestützten Nachricht",
        category: "getting-started",
        duration: "5:12",
        views: 12350,
        thumbnail: "/writing-message-tutorial.jpg",
        featured: true,
      },
      {
        id: "customizing-tone",
        title: "Ton & Stil der Nachricht anpassen",
        description:
          "Lernen Sie, Tonfall, Formalität und Sprache für verschiedene Situationen anzupassen",
        category: "getting-started",
        duration: "4:45",
        views: 9870,
        thumbnail: "/customizing-settings.jpg",
      },
      {
        id: "multilingual-messages",
        title: "Mehrsprachige Nachrichten verfassen",
        description:
          "Kommunizieren Sie mit Eltern in ihrer bevorzugten Sprache",
        category: "getting-started",
        duration: "6:18",
        views: 8920,
        thumbnail: "/multilingual-translation.jpg",
      },
      {
        id: "templates-library",
        title: "Die Vorlagenbibliothek nutzen",
        description:
          "Sparen Sie Zeit mit vorgefertigten Vorlagen für gängige Szenarien",
        category: "getting-started",
        duration: "4:30",
        views: 7650,
        thumbnail: "/templates-library.jpg",
      },
      {
        id: "keyboard-shortcuts",
        title: "Tastenkürzel & Profi-Tipps",
        description:
          "Arbeiten Sie schneller mit Tastenkürzeln und versteckten Funktionen",
        category: "tips-tricks",
        duration: "3:55",
        views: 5420,
        thumbnail: "/keyboard-shortcuts.png",
      },
      {
        id: "advanced-prompts",
        title: "Fortgeschrittenes Prompt-Engineering",
        description:
          "Meistern Sie die Kunst, effektive Prompts für bessere Ergebnisse zu erstellen",
        category: "advanced",
        duration: "8:42",
        views: 6780,
        thumbnail: "/advanced-prompts.jpg",
        featured: true,
      },
      {
        id: "batch-processing",
        title: "Mehrere Nachrichten gleichzeitig verarbeiten",
        description:
          "Generieren Sie mehrere personalisierte Nachrichten auf einmal",
        category: "advanced",
        duration: "7:15",
        views: 5230,
        thumbnail: "/batch-processing.jpg",
      },
      {
        id: "integration-google-classroom",
        title: "Google Classroom Integration",
        description:
          "Verbinden Sie Zaza Draft mit Google Classroom für nahtlose Arbeitsabläufe",
        category: "advanced",
        duration: "6:50",
        views: 8940,
        thumbnail: "/google-classroom-integration.jpg",
      },
      {
        id: "difficult-conversations",
        title: "Umgang mit schwierigen Gesprächen",
        description:
          "Kommunizieren Sie sensible Themen mit Empathie und Professionalität",
        category: "use-cases",
        duration: "9:20",
        views: 11250,
        thumbnail: "/difficult-conversation.jpg",
      },
      {
        id: "progress-reports",
        title: "Fortschrittsberichte verfassen",
        description:
          "Erstellen Sie effizient umfassende, personalisierte Fortschrittsberichte",
        category: "use-cases",
        duration: "7:35",
        views: 9870,
        thumbnail: "/progress-report.jpg",
      },
      {
        id: "parent-teacher-conferences",
        title: "Vorbereitung auf Elternsprechtage",
        description:
          "Nutzen Sie KI, um Gesprächsthemen und Follow-up-Nachrichten vorzubereiten",
        category: "use-cases",
        duration: "6:45",
        views: 7650,
        thumbnail: "/parent-teacher-conference.png",
      },
      {
        id: "behavior-updates",
        title: "Positive Verhaltens-Updates",
        description:
          "Feiern Sie Schülererfolge mit personalisierten positiven Nachrichten",
        category: "use-cases",
        duration: "5:20",
        views: 6420,
        thumbnail: "/positive-behavior.jpg",
      },
      {
        id: "homework-reminders",
        title: "Hausaufgaben-Erinnerungen",
        description:
          "Halten Sie Eltern über Aufgaben und Fälligkeiten auf dem Laufenden",
        category: "use-cases",
        duration: "4:55",
        views: 5890,
        thumbnail: "/homework-reminder.jpg",
      },
      {
        id: "weekly-newsletters",
        title: "Erstellung wöchentlicher Klassen-Newsletter",
        description:
          "Erstellen Sie ansprechende Newsletter, um Eltern auf dem Laufenden zu halten",
        category: "use-cases",
        duration: "8:10",
        views: 7230,
        thumbnail: "/videos/weekly-newsletter.jpg",
      },
      {
        id: "special-education",
        title: "Kommunikation in der Sonderpädagogik",
        description:
          "Best Practices für die Kommunikation mit Familien aus der Sonderpädagogik",
        category: "use-cases",
        duration: "10:25",
        views: 6540,
        thumbnail: "/videos/special-education.jpg",
      },
      {
        id: "tone-consistency",
        title: "Konsistenten Tonfall beibehalten",
        description:
          "Stellen Sie sicher, dass Ihr Kommunikationsstil in allen Nachrichten konsistent bleibt",
        category: "best-practices",
        duration: "5:40",
        views: 4320,
        thumbnail: "/videos/tone-consistency.jpg",
      },
      {
        id: "privacy-ferpa",
        title: "Datenschutz & DSGVO-Konformität",
        description: "Schützen Sie Schülerdaten bei der Nutzung von KI-Tools",
        category: "best-practices",
        duration: "7:55",
        views: 5670,
        thumbnail: "/videos/privacy-ferpa.jpg",
      },
      {
        id: "ai-ethics",
        title: "Ethischer KI-Einsatz in der Bildung",
        description:
          "Richtlinien für den verantwortungsvollen KI-Einsatz in der Elternkommunikation",
        category: "best-practices",
        duration: "9:10",
        views: 4890,
        thumbnail: "/videos/ai-ethics.jpg",
      },
      {
        id: "personalization-tips",
        title: "Best Practices zur Personalisierung",
        description: "Gestalten Sie jede Nachricht persönlich und authentisch",
        category: "best-practices",
        duration: "6:30",
        views: 5120,
        thumbnail: "/videos/personalization.jpg",
      },
    ],
  },
};

export function VideoHubClient() {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith("/de") ?? false;
  const text = isGerman ? content.de : content.en;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = text.videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "all" || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredVideos = text.videos.filter((v) => v.featured);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    trackEvent("video_category_selected", { category: categoryId });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      trackEvent("video_search", { query });
    }
  };

  const handleVideoClick = (videoId: string) => {
    trackEvent("video_clicked", { video_id: videoId });
  };

  const handlePlaylistClick = (playlistId: string) => {
    trackEvent("playlist_clicked", { playlist_id: playlistId });
  };

  const allCategories = text.categories;
  const allPlaylists = text.playlists;

  // Added pt-20 to the root container to push content below the fixed header
  return (
    <div className="min-h-screen bg-[#0A1628] pt-20">
      {/* COMING SOON BANNER */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-3 px-4 text-center shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3">
          <Badge className="bg-white text-purple-600 hover:bg-white/90 border-0 font-bold px-3 py-1 tracking-widest">
            {text.banner.label}
          </Badge>
          <p className="font-medium text-sm md:text-base drop-shadow-md">
            {text.banner.message}
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0A1628] to-[#0F1F3A]">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
            {text.hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {text.hero.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {text.hero.description}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder={text.hero.search_placeholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-white/10 bg-[#0F1F3A] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {allCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "ghost"
                  }
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Videos */}
        {selectedCategory === "all" && !searchQuery && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">
                {text.sections.featured}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredVideos.map((video) => (
                <Link
                  key={video.id}
                  href={`/videos/${video.id}`}
                  onClick={() => handleVideoClick(video.id)}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group overflow-hidden">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-black/60 text-white border-0">
                        {video.duration}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views.toLocaleString()} {text.sections.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {video.duration}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Playlists */}
        {selectedCategory === "all" && !searchQuery && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              {text.sections.curated}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {allPlaylists.map((playlist) => (
                <Link
                  key={playlist.id}
                  href={`/videos/playlists/${playlist.id}`}
                  onClick={() => handlePlaylistClick(playlist.id)}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group overflow-hidden">
                    <div className="relative">
                      <img
                        src={playlist.thumbnail || "/placeholder.svg"}
                        alt={playlist.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge className="bg-purple-600 text-white border-0 mb-2">
                          {playlist.videoCount} {isGerman ? "Videos" : "videos"}{" "}
                          · {playlist.duration}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {playlist.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {playlist.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Videos Grid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            {selectedCategory === "all"
              ? text.sections.all
              : allCategories.find((c) => c.id === selectedCategory)?.name ||
                text.sections.all}
            <span className="text-gray-400 text-lg ml-2">
              ({filteredVideos.length})
            </span>
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <Link
                key={video.id}
                href={`/videos/${video.id}`}
                onClick={() => handleVideoClick(video.id)}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group overflow-hidden">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white ml-0.5" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/60 text-white border-0 text-xs">
                      {video.duration}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {(video.views / 1000).toFixed(1)}K {text.sections.views}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
