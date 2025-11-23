"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Calendar,
  BookOpen,
  Trophy,
  Search,
  Plus,
  Users,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Shield,
  Star
} from "lucide-react";

// --- UI Translations ---
const uiContent = {
  en: {
    hero: {
      title: "Join the Zaza Draft Community",
      subtitle: "Connect with other educators, share resources, and shape the future of AI in education.",
      joinBtn: "Join Community",
      startBtn: "Start a Discussion"
    },
    tabs: {
      discussion: "Discussion",
      events: "Events",
      resources: "Resources",
      showcase: "Showcase"
    },
    filters: {
      searchPlaceholder: "Search discussions...",
      allTopics: "All Topics",
      announcements: "Announcements",
      general: "General",
      ideas: "Ideas",
      qa: "Q&A"
    },
    sidebar: {
      guidelinesTitle: "Community Guidelines",
      guidelinesDesc: "Please be respectful and supportive. Read our full code of conduct.",
      contributorsTitle: "Top Contributors",
      trendingTitle: "Trending Tags",
      readMore: "Read More"
    },
    posts: {
      postedBy: "Posted by",
      comments: "comments",
      likes: "likes",
      pinned: "Pinned",
      teacher: "Teacher",
      admin: "Admin"
    },
    mockData: {
        post1: {
            title: "Welcome to the new Zaza Draft Community!",
            desc: "We're excited to launch this space for educators to connect. Start here by introducing yourself.",
            author: "Zaza Team",
            time: "2h",
            tag: "Announcements"
        },
        post2: {
            title: "How are you using AI for lesson planning?",
            desc: "I've been experimenting with the new GradeFlow features. Has anyone found a good workflow for...",
            author: "Sarah Meyer",
            role: "Teacher",
            time: "4h",
            tag: "General"
        },
        post3: {
            title: "Feature Request: Export to PDF",
            desc: "It would be great if we could export the student reports directly to PDF with school branding.",
            author: "Marcus Weber",
            role: "Admin",
            time: "6h",
            tag: "Ideas"
        }
    },
    tags: ["#AIWriting", "#LessonPlans", "#GradeFlow", "#EdTech", "#Tips"]
  },
  de: {
    hero: {
      title: "Treten Sie der Lehrercommunity bei", // RESTORED: Matches your preferred build
      subtitle: "Vernetzen Sie sich mit anderen Pädagogen, teilen Sie Ressourcen und gestalten Sie die Zukunft der KI im Bildungswesen.",
      joinBtn: "Community beitreten",
      startBtn: "Diskussion starten"
    },
    tabs: {
      discussion: "Diskussion",
      events: "Events",
      resources: "Ressourcen",
      showcase: "Showcase"
    },
    filters: {
      searchPlaceholder: "Diskussionen suchen...",
      allTopics: "Alle Themen",
      announcements: "Ankündigungen",
      general: "Allgemein",
      ideas: "Ideen",
      qa: "Fragen & Antworten"
    },
    sidebar: {
      guidelinesTitle: "Community-Richtlinien",
      guidelinesDesc: "Bitte seien Sie respektvoll und unterstützend. Lesen Sie unseren Verhaltenskodex.",
      contributorsTitle: "Top-Beitragende",
      trendingTitle: "Beliebte Tags",
      readMore: "Mehr lesen"
    },
    posts: {
      postedBy: "Gepostet von",
      comments: "Kommentare",
      likes: "Likes",
      pinned: "Angepinnt",
      teacher: "Lehrer",
      admin: "Admin"
    },
    mockData: {
        post1: {
            title: "Willkommen in der neuen Zaza Draft Community!",
            desc: "Wir freuen uns, diesen Raum für den Austausch von Pädagogen zu starten. Stellen Sie sich hier kurz vor.",
            author: "Zaza Team",
            time: "2 Std.",
            tag: "Ankündigungen"
        },
        post2: {
            title: "Wie nutzen Sie KI für die Unterrichtsplanung?",
            desc: "Ich experimentiere mit den neuen GradeFlow-Funktionen. Hat jemand einen guten Workflow für...",
            author: "Sarah Meyer",
            role: "Lehrerin",
            time: "4 Std.",
            tag: "Allgemein"
        },
        post3: {
            title: "Feature-Wunsch: Export als PDF",
            desc: "Es wäre toll, wenn wir die Schülerberichte direkt als PDF mit Schullogo exportieren könnten.",
            author: "Marcus Weber",
            role: "Admin",
            time: "6 Std.",
            tag: "Ideen"
        }
    },
    tags: ["#KISchreiben", "#Unterrichtsplanung", "#GradeFlow", "#EdTech", "#Tipps"]
  }
};

export default function CommunityPage() {
  const pathname = usePathname();
  const context = useLanguage();
  
  // Robust detection: Checks URL path OR Context state
  const isGerman = pathname?.includes("/de") || context?.language === "de";
  const langKey = isGerman ? "de" : "en";
  const text = uiContent[langKey];

  const [activeTab, setActiveTab] = useState("discussion");

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {text.hero.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {text.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
              <Plus className="mr-2 h-5 w-5" />
              {text.hero.startBtn}
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 bg-transparent">
              <Users className="mr-2 h-5 w-5" />
              {text.hero.joinBtn}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8 border-b border-white/10 pb-4">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {[
              { id: "discussion", label: text.tabs.discussion, icon: MessageSquare },
              { id: "events", label: text.tabs.events, icon: Calendar },
              { id: "resources", label: text.tabs.resources, icon: BookOpen },
              { id: "showcase", label: text.tabs.showcase, icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#8B5CF6] text-white font-medium"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={text.filters.searchPlaceholder}
              className="pl-10 bg-[#1E293B] border-white/10 text-white focus:border-[#8B5CF6]"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[text.filters.allTopics, text.filters.announcements, text.filters.general, text.filters.ideas, text.filters.qa].map((filter, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className={`cursor-pointer border-white/10 px-3 py-1 ${
                    i === 0 ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {filter}
                </Badge>
              ))}
            </div>

            {/* Pinned Post */}
            <Card className="bg-[#1E293B] border-[#8B5CF6]/30 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]">{text.posts.pinned}</Badge>
                  <span className="text-sm text-gray-400">{text.posts.postedBy} {text.mockData.post1.author} • {text.mockData.post1.time}</span>
                </div>
                <Share2 className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 hover:text-[#8B5CF6] cursor-pointer transition-colors">
                {text.mockData.post1.title}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {text.mockData.post1.desc}
              </p>
              <div className="flex gap-4 text-sm text-gray-400">
                <button className="flex items-center gap-1 hover:text-white">
                  <MessageCircle className="h-4 w-4" /> 24 {text.posts.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                  <Heart className="h-4 w-4" /> 156 {text.posts.likes}
                </button>
              </div>
            </Card>

            {/* Regular Post 1 */}
            <Card className="bg-[#1E293B] border-white/10 p-6 hover:border-[#8B5CF6]/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300" />
                  <div>
                    <div className="text-sm font-medium text-white">{text.mockData.post2.author}</div>
                    <div className="text-xs text-gray-400">{text.mockData.post2.role} • {text.mockData.post2.time}</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-white/10 text-gray-400">{text.filters.general}</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2 hover:text-[#8B5CF6] cursor-pointer transition-colors">
                {text.mockData.post2.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {text.mockData.post2.desc}
              </p>
              <div className="flex gap-4 text-sm text-gray-400">
                <button className="flex items-center gap-1 hover:text-white">
                  <MessageCircle className="h-4 w-4" /> 12 {text.posts.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-pink-400">
                  <Heart className="h-4 w-4" /> 45 {text.posts.likes}
                </button>
              </div>
            </Card>

             {/* Regular Post 2 */}
             <Card className="bg-[#1E293B] border-white/10 p-6 hover:border-[#8B5CF6]/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-300" />
                  <div>
                    <div className="text-sm font-medium text-white">{text.mockData.post3.author}</div>
                    <div className="text-xs text-gray-400">{text.mockData.post3.role} • {text.mockData.post3.time}</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-white/10 text-gray-400">{text.filters.ideas}</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2 hover:text-[#8B5CF6] cursor-pointer transition-colors">
                {text.mockData.post3.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {text.mockData.post3.desc}
              </p>
              <div className="flex gap-4 text-sm text-gray-400">
                <button className="flex items-center gap-1 hover:text-white">
                  <MessageCircle className="h-4 w-4" /> 8 {text.posts.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-pink-400">
                  <Heart className="h-4 w-4" /> 92 {text.posts.likes}
                </button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guidelines */}
            <Card className="bg-[#1E293B] border-white/10 p-6">
              <div className="flex items-center gap-2 mb-4 text-[#A78BFA]">
                <Shield className="h-5 w-5" />
                <h3 className="font-semibold">{text.sidebar.guidelinesTitle}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {text.sidebar.guidelinesDesc}
              </p>
              <Button variant="outline" className="w-full border-white/20 text-white bg-transparent hover:bg-white/5">
                {text.sidebar.readMore}
              </Button>
            </Card>

            {/* Trending Tags */}
            <Card className="bg-[#1E293B] border-white/10 p-6">
              <div className="flex items-center gap-2 mb-4 text-pink-400">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-semibold">{text.sidebar.trendingTitle}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {text.tags.map(tag => (
                    <Badge key={tag} className="bg-white/5 hover:bg-white/10 text-gray-300 cursor-pointer border-transparent">
                        {tag}
                    </Badge>
                ))}
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-[#1E293B] border-white/10 p-6">
              <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <Star className="h-5 w-5" />
                <h3 className="font-semibold">{text.sidebar.contributorsTitle}</h3>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold ${i===1 ? "text-yellow-400 border border-yellow-400/50" : "text-gray-400"}`}>
                            {i}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-white">User {i}</div>
                            <div className="text-xs text-gray-500">1.2k points</div>
                        </div>
                    </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
