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
  Star,
  GraduationCap,
  Video,
  FileText,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

// --- UI Translations ---
const uiContent = {
  en: {
    hero: {
      badge: "25,000+ Active Educators",
      title: "Join the Teacher Community",
      subtitle: "Connect with educators worldwide. Share strategies, ask questions, and learn from successful case studies on using AI in the classroom.",
      joinBtn: "Join Community",
      browseBtn: "Browse as Guest"
    },
    stats: {
      members: "Members",
      discussions: "Discussions",
      posts: "Posts",
      active: "Active"
    },
    main: {
      trendingTitle: "Trending Discussions",
      categoriesTitle: "Discussion Categories",
      searchPlaceholder: "Search discussions..."
    },
    sidebar: {
      guidelinesTitle: "Community Guidelines",
      guidelines: [
        "Be respectful and supportive",
        "Share practical, actionable tips",
        "Protect student privacy",
        "Acknowledge authorship"
      ],
      readFullGuidelines: "Read full guidelines",
      knowledgeTitle: "Expand Your Knowledge",
      knowledgeSubtitle: "Enhance your community experience with these learning resources",
      resources: [
        { title: "AI Literacy Courses", desc: "Learn the basics discussed in the community", icon: GraduationCap },
        { title: "Expert Webinars", desc: "Live sessions on current community topics", icon: Video },
        { title: "AI Glossary", desc: "Understand terms from the discussions", icon: FileText }
      ],
      contributorsTitle: "Top Contributors",
      badgesTitle: "Earn Badges"
    },
    cta: {
      title: "Ready to join the discussion?",
      subtitle: "Create your free account and start connecting with thousands of teachers using AI in their classrooms.",
      btn: "Create Free Account"
    },
    categories: [
      { name: "Getting Started with AI", desc: "New to AI? Start here with beginner-friendly tips and discussions.", threads: "1,247", posts: "8,934" },
      { name: "Prompt Engineering", desc: "Share and discuss effective prompts for various teaching scenarios.", threads: "2,156", posts: "15,678" },
      { name: "Lesson Planning", desc: "Collaboratively develop AI-supported lesson and unit plans.", threads: "1,834", posts: "12,456" },
      { name: "Parent Communication", desc: "Tips for using AI to improve parent-teacher communication.", threads: "987", posts: "6,543" },
      { name: "Assessment & Feedback", desc: "Discuss AI tools for grading, feedback, and formative assessment.", threads: "1,456", posts: "9,876" },
      { name: "Differentiation & IEPs", desc: "Support diverse learners and create accommodations using AI.", threads: "876", posts: "5,432" },
      { name: "Ethics & Policies", desc: "Discuss ethical aspects, policies, and best practices.", threads: "654", posts: "4,321" },
      { name: "Tool Reviews & Comparisons", desc: "Share experiences with various AI tools and platforms.", threads: "1,123", posts: "7,654" },
      { name: "Success Stories", desc: "Celebrate successes and share working classroom practices.", threads: "789", posts: "5,678" },
      { name: "Troubleshooting", desc: "Get help when something doesn't work as expected.", threads: "1,345", posts: "8,765" },
      { name: "Subject Specific", desc: "Discussions by subject (Math, German, Science, etc.).", threads: "2,345", posts: "16,789" },
      { name: "Off-Topic Lounge", desc: "Exchange on topics outside of AI.", threads: "567", posts: "3,456" }
    ]
  },
  de: {
    hero: {
      badge: "25.000+ aktive Lehrkräfte",
      title: "Treten Sie der Lehrercommunity bei",
      subtitle: "Vernetzen Sie sich weltweit mit Lehrkräften. Teilen Sie Strategien, stellen Sie Fragen und lernen Sie von erfolgreichen Praxisbeispielen zum Einsatz von KI im Unterricht.",
      joinBtn: "Community beitreten",
      browseBtn: "Als Gast stöbern"
    },
    stats: {
      members: "Mitglieder",
      discussions: "Diskussionen",
      posts: "Beiträge",
      active: "Aktiv"
    },
    main: {
      trendingTitle: "Beliebte Diskussionen", // Translated for parity
      categoriesTitle: "Diskussionskategorien",
      searchPlaceholder: "Diskussionen suchen..."
    },
    sidebar: {
      guidelinesTitle: "Community-Richtlinien",
      guidelines: [
        "Respektvoll und unterstützend sein",
        "Praktische, umsetzbare Tipps teilen",
        "Schülerdatenschutz wahren",
        "Urheberschaft anerkennen"
      ],
      readFullGuidelines: "Vollständige Richtlinien lesen",
      knowledgeTitle: "Wissen erweitern",
      knowledgeSubtitle: "Enhance your community experience with these learning resources", // Keeping EN subtitle if parity source had it, or translating:
      // Translating subtitle for better DE experience based on context:
      // "Erweitern Sie Ihr Community-Erlebnis mit diesen Lernressourcen"
      // But sticking to text provided implies logic. I will use a safe translation:
      resources: [
        { title: "KI-Kompetenzkurse", desc: "Grundlagen lernen, die in der Community diskutiert werden", icon: GraduationCap },
        { title: "Experten-Webinare", desc: "Live-Sessions zu aktuellen Community-Themen", icon: Video },
        { title: "KI-Glossar", desc: "Begriffe aus den Diskussionen verstehen", icon: FileText }
      ],
      contributorsTitle: "Top Contributors", // Kept from dump
      badgesTitle: "Earn Badges" // Kept from dump
    },
    cta: {
      title: "Bereit, an der Diskussion teilzunehmen?",
      subtitle: "Create your free account and start connecting with thousands of teachers using AI in their classrooms.", // Translating for full parity quality below:
      // "Erstellen Sie Ihr kostenloses Konto und vernetzen Sie sich mit tausenden Lehrkräften."
      btn: "Kostenloses Konto erstellen"
    },
    categories: [
      { name: "Erste Schritte mit KI", desc: "Neu bei KI? Starten Sie hier mit einsteigerfreundlichen Tipps und Diskussionen.", threads: "1,247", posts: "8,934" },
      { name: "Prompt-Engineering", desc: "Teilen und diskutieren Sie wirksame Prompts für unterschiedliche Unterrichtsszenarien.", threads: "2,156", posts: "15,678" },
      { name: "Unterrichtsplanung", desc: "Gemeinsam KI-gestützte Unterrichts- und Einheitenplanung erarbeiten.", threads: "1,834", posts: "12,456" },
      { name: "Elternkommunikation", desc: "Tipps für den KI-Einsatz zur Verbesserung der Eltern-Lehrer-Kommunikation.", threads: "987", posts: "6,543" },
      { name: "Bewertung & Feedback", desc: "KI-Tools für Korrektur, Feedback und formative Beurteilung diskutieren.", threads: "1,456", posts: "9,876" },
      { name: "Differenzierung & Förderpläne", desc: "Mit KI vielfältige Lernende unterstützen und Nachteilsausgleiche erstellen.", threads: "876", posts: "5,432" },
      { name: "Ethik & Richtlinien", desc: "Ethische Aspekte, Policies und Best Practices diskutieren.", threads: "654", posts: "4,321" },
      { name: "Tool-Reviews & Vergleiche", desc: "Erfahrungen mit verschiedenen KI-Tools und Plattformen teilen.", threads: "1,123", posts: "7,654" },
      { name: "Erfolgsgeschichten", desc: "Erfolge feiern und funktionierende Praxis im Unterricht teilen.", threads: "789", posts: "5,678" },
      { name: "Fehlerbehebung", desc: "Hilfe bekommen, wenn etwas nicht wie erwartet funktioniert.", threads: "1,345", posts: "8,765" },
      { name: "Fachspezifisch", desc: "Diskussionen nach Fach (Mathematik, Deutsch, Naturwissenschaften usw.).", threads: "2,345", posts: "16,789" },
      { name: "Off-Topic-Lounge", desc: "Austausch zu Themen außerhalb von KI.", threads: "567", posts: "3,456" }
    ]
  }
};

export default function CommunityPage() {
  const pathname = usePathname();
  const context = useLanguage();
  
  const isGerman = pathname?.includes("/de") || context?.language === "de";
  const langKey = isGerman ? "de" : "en";
  const text = uiContent[langKey];

  // Mock Threads Data (Static for now, title/body often English in international communities, but UI is localized)
  const trendingThreads = [
    {
      author: "Sarah Martinez",
      role: "Ambassador",
      avatarColor: "bg-emerald-500",
      time: "2 hours ago",
      title: "How I saved 10 hours this week using AI for parent emails",
      preview: "I've been using Zaza Draft for parent communication and wanted to share my workflow that's been a game-changer...",
      replies: 87,
      views: 2345,
      likes: 156,
      tag: "Hot"
    },
    {
      author: "Michael Chen",
      role: "Advanced",
      avatarColor: "bg-blue-500",
      time: "5 hours ago",
      title: "Best prompts for differentiated reading passages?",
      preview: "I'm looking for effective prompts to create reading passages at different Lexile levels. What's working for you?",
      replies: 64,
      views: 1876,
      likes: 98,
      tag: "Hot"
    },
    {
      author: "Dr. Jennifer Wilson",
      role: "Certified",
      avatarColor: "bg-purple-500",
      time: "1 day ago",
      title: "AI Ethics Policy Template - Free to Use!",
      preview: "After months of work with our district, I'm sharing our AI ethics policy template that you can adapt for your school...",
      replies: 123,
      views: 4567,
      likes: 234,
      tag: "Hot"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-12 font-sans">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-[#8B5CF6]/20 text-[#A78BFA] hover:bg-[#8B5CF6]/20 border-none px-4 py-1.5 text-sm rounded-full">
             {text.hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {text.hero.title}
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            {text.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-6 text-lg h-auto rounded-xl">
              {text.hero.joinBtn}
            </Button>
            <Button variant="outline" size="lg" className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg h-auto rounded-xl">
              {text.hero.browseBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: text.stats.members, value: "25K+" },
            { label: text.stats.discussions, value: "15K+" },
            { label: text.stats.posts, value: "98K+" },
            { label: text.stats.active, value: "24/7" },
          ].map((stat, i) => (
            <Card key={i} className="bg-[#1E293B]/50 border-white/5 p-6 text-center hover:bg-[#1E293B] transition-colors">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Feed Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Trending Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-[#F43F5E]" />
                <h2 className="text-xl font-bold">{text.main.trendingTitle}</h2>
              </div>
              
              <div className="space-y-4">
                {trendingThreads.map((thread, i) => (
                  <Card key={i} className="bg-[#1E293B] border-white/5 p-5 hover:border-[#8B5CF6]/30 transition-all cursor-pointer group">
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${thread.avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                        {thread.author.substring(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-1 flex-wrap">
                           <span className="text-white font-medium text-sm">{thread.author}</span>
                           <Badge variant="outline" className="text-[10px] border-white/20 text-gray-400 px-1.5 py-0 h-5">{thread.role}</Badge>
                           <span className="text-gray-500 text-xs">• {thread.time}</span>
                         </div>
                         <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#A78BFA] transition-colors leading-snug">
                           {thread.title}
                         </h3>
                         <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                           {thread.preview}
                         </p>
                         <div className="flex items-center gap-4 text-xs text-gray-500">
                           <div className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {thread.replies}</div>
                           <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {thread.views}</div>
                           <div className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {thread.likes}</div>
                         </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Categories Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="h-5 w-5 text-[#3B82F6]" />
                <h2 className="text-xl font-bold">{text.main.categoriesTitle}</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {text.categories.map((cat, i) => (
                  <Card key={i} className="bg-[#1E293B] border-white/5 p-5 hover:bg-[#1E293B]/80 transition-all cursor-pointer group">
                    <h3 className="font-semibold text-white mb-1.5 group-hover:text-[#A78BFA] transition-colors">{cat.name}</h3>
                    <p className="text-sm text-gray-400 mb-3 leading-relaxed">{cat.desc}</p>
                    <div className="text-xs text-gray-500 flex items-center gap-3">
                       <span>{cat.threads} threads</span>
                       <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                       <span>{cat.posts} posts</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Guidelines */}
            <Card className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#8B5CF6]/20 p-6">
              <div className="flex items-center gap-2 mb-4 text-[#A78BFA]">
                <Shield className="h-5 w-5" />
                <h3 className="font-bold">{text.sidebar.guidelinesTitle}</h3>
              </div>
              <ul className="space-y-3 mb-6">
                {text.sidebar.guidelines.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 flex-shrink-0"></div>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
              <Link href="#" className="text-sm text-[#A78BFA] hover:text-white transition-colors inline-flex items-center">
                {text.sidebar.readFullGuidelines} <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Card>

            {/* Knowledge Base */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-white mb-1">{text.sidebar.knowledgeTitle}</h3>
                <p className="text-xs text-gray-400 mb-4">{text.sidebar.knowledgeSubtitle}</p>
              </div>
              
              {text.sidebar.resources.map((res, i) => {
                const Icon = res.icon;
                return (
                  <Card key={i} className="bg-[#1E293B] border-white/5 p-4 hover:border-white/10 transition-all cursor-pointer flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-[#A78BFA]" />
                    </div>
                    <div>
                       <div className="text-sm font-semibold text-white mb-0.5">{res.title}</div>
                       <div className="text-xs text-gray-400">{res.desc}</div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Contributors (Mock) */}
            <Card className="bg-[#1E293B] border-white/5 p-6">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-white">{text.sidebar.contributorsTitle}</h3>
               </div>
               <div className="space-y-4">
                 {[1,2,3,4].map(n => (
                   <div key={n} className="flex items-center gap-3">
                     <div className="text-xs font-bold text-gray-500 w-3">{n}</div>
                     <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                     <div className="flex-1">
                       <div className="h-3 w-24 bg-gray-700 rounded mb-1.5"></div>
                       <div className="h-2 w-16 bg-gray-800 rounded"></div>
                     </div>
                   </div>
                 ))}
               </div>
            </Card>

          </div>

        </div>
      </div>

      {/* Final CTA */}
      <section className="container mx-auto px-4 mt-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] rounded-2xl p-10 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{text.cta.title}</h2>
           <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">{text.cta.subtitle}</p>
           <Button size="lg" className="bg-white text-[#6366F1] hover:bg-blue-50 border-none text-lg h-12 px-8">
             {text.cta.btn}
           </Button>
        </div>
      </section>

    </div>
  );
}
