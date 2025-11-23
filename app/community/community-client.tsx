"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Search,
  Award,
  Star,
  Trophy,
  Zap,
  Eye,
  ThumbsUp,
  MessageCircle,
  Flame,
  CheckCircle,
  Shield,
  Crown,
  GraduationCap,
  Video,
  BookOpen,
} from "lucide-react"
import { analytics } from "@/lib/analytics"
import { RelatedResources } from "@/components/related-resources"

export default function CommunityClient() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  // Determine language key (fallback to 'en')
  const lang = language === "de" ? "de" : "en";

  // --- LOCALIZED CONTENT ---
  const content = {
    en: {
      hero: {
        badge: "25,000+ Active Educators",
        title: "Join the Teacher Community",
        subtitle: "Connect with educators worldwide. Share strategies, ask questions, and learn from successful case studies on using AI in the classroom.",
        searchPlaceholder: "Search discussions...",
        stats: { members: "Members", discussions: "Discussions", posts: "Posts", active: "Active" }
      },
      main: {
        trendingTitle: "Trending Discussions",
        categoriesTitle: "Discussion Categories"
      },
      sidebar: {
        contributorsTitle: "Top Contributors",
        badgesTitle: "Earn Badges",
        guidelinesTitle: "Community Guidelines",
        guidelines: [
          "Be respectful and supportive",
          "Share practical, actionable tips",
          "Protect student privacy",
          "Acknowledge authorship"
        ],
        readGuidelines: "Read full guidelines",
        relatedTitle: "Expand Your Knowledge",
        relatedSubtitle: "Enhance your community experience with these learning resources"
      },
      cta: {
        title: "Ready to join the discussion?",
        subtitle: "Create your free account and start connecting with thousands of teachers using AI in their classrooms.",
        primary: "Create Free Account",
        secondary: "Browse as Guest"
      }
    },
    de: {
      hero: {
        badge: "25.000+ aktive Lehrkräfte",
        title: "Treten Sie der Lehrercommunity bei",
        subtitle: "Vernetzen Sie sich weltweit mit Lehrkräften. Teilen Sie Strategien, stellen Sie Fragen und lernen Sie von erfolgreichen Praxisbeispielen zum Einsatz von KI im Unterricht.",
        searchPlaceholder: "Diskussionen suchen...",
        stats: { members: "Mitglieder", discussions: "Diskussionen", posts: "Beiträge", active: "Aktiv" }
      },
      main: {
        trendingTitle: "Beliebte Diskussionen",
        categoriesTitle: "Diskussionskategorien"
      },
      sidebar: {
        contributorsTitle: "Top-Beitragende",
        badgesTitle: "Abzeichen verdienen",
        guidelinesTitle: "Community-Richtlinien",
        guidelines: [
          "Respektvoll und unterstützend sein",
          "Praktische, umsetzbare Tipps teilen",
          "Schülerdatenschutz wahren",
          "Urheberschaft anerkennen"
        ],
        readGuidelines: "Vollständige Richtlinien lesen",
        relatedTitle: "Wissen erweitern",
        relatedSubtitle: "Erweitern Sie Ihr Community-Erlebnis mit diesen Lernressourcen"
      },
      cta: {
        title: "Bereit, an der Diskussion teilzunehmen?",
        subtitle: "Erstellen Sie Ihr kostenloses Konto und vernetzen Sie sich mit tausenden Lehrkräften.",
        primary: "Kostenloses Konto erstellen",
        secondary: "Als Gast stöbern"
      }
    }
  };

  const text = content[lang];

  // --- DATA WITH TRANSLATIONS ---
  
  const categories = [
    {
      id: "getting-started",
      name: lang === 'de' ? "Erste Schritte mit KI" : "Getting Started with AI",
      description: lang === 'de' ? "Neu bei KI? Starten Sie hier mit einsteigerfreundlichen Tipps und Diskussionen." : "New to AI? Start here for beginner-friendly discussions and tips.",
      icon: Zap,
      threads: 1247,
      posts: 8934,
      color: "#8B5CF6",
    },
    {
      id: "prompt-engineering",
      name: lang === 'de' ? "Prompt-Engineering" : "Prompt Engineering",
      description: lang === 'de' ? "Teilen und diskutieren Sie wirksame Prompts für unterschiedliche Unterrichtsszenarien." : "Share and discuss effective prompts for different teaching scenarios.",
      icon: MessageSquare,
      threads: 2156,
      posts: 15678,
      color: "#A78BFA",
    },
    {
      id: "lesson-planning",
      name: lang === 'de' ? "Unterrichtsplanung" : "Lesson Planning",
      description: lang === 'de' ? "Gemeinsam KI-gestützte Unterrichts- und Einheitenplanung erarbeiten." : "Collaborate on AI-assisted lesson plans and unit designs.",
      icon: TrendingUp,
      threads: 1834,
      posts: 12456,
      color: "#8B5CF6",
    },
    {
      id: "parent-communication",
      name: lang === 'de' ? "Elternkommunikation" : "Parent Communication",
      description: lang === 'de' ? "Tipps für den KI-Einsatz zur Verbesserung der Eltern-Lehrer-Kommunikation." : "Tips for using AI to improve parent-teacher communication.",
      icon: Users,
      threads: 987,
      posts: 6543,
      color: "#A78BFA",
    },
    {
      id: "assessment-feedback",
      name: lang === 'de' ? "Bewertung & Feedback" : "Assessment & Feedback",
      description: lang === 'de' ? "KI-Tools für Korrektur, Feedback und formative Beurteilung diskutieren." : "Discuss AI tools for grading, feedback, and formative assessment.",
      icon: CheckCircle,
      threads: 1456,
      posts: 9876,
      color: "#8B5CF6",
    },
    {
      id: "differentiation",
      name: lang === 'de' ? "Differenzierung & Förderpläne" : "Differentiation & IEPs",
      description: lang === 'de' ? "Mit KI vielfältige Lernende unterstützen und Nachteilsausgleiche erstellen." : "Using AI to support diverse learners and create accommodations.",
      icon: Star,
      threads: 876,
      posts: 5432,
      color: "#A78BFA",
    },
    {
      id: "ethics-policy",
      name: lang === 'de' ? "Ethik & Richtlinien" : "Ethics & Policy",
      description: lang === 'de' ? "Ethische Aspekte, Policies und Best Practices diskutieren." : "Discuss ethical considerations, policies, and best practices.",
      icon: Shield,
      threads: 654,
      posts: 4321,
      color: "#8B5CF6",
    },
    {
      id: "tool-reviews",
      name: lang === 'de' ? "Tool-Reviews & Vergleiche" : "Tool Reviews & Comparisons",
      description: lang === 'de' ? "Erfahrungen mit verschiedenen KI-Tools und Plattformen teilen." : "Share experiences with different AI tools and platforms.",
      icon: Trophy,
      threads: 1123,
      posts: 7654,
      color: "#A78BFA",
    },
    {
      id: "success-stories",
      name: lang === 'de' ? "Erfolgsgeschichten" : "Success Stories",
      description: lang === 'de' ? "Erfolge feiern und funktionierende Praxis im Unterricht teilen." : "Celebrate wins and share what's working in your classroom.",
      icon: Flame,
      threads: 789,
      posts: 5678,
      color: "#8B5CF6",
    },
    {
      id: "troubleshooting",
      name: lang === 'de' ? "Fehlerbehebung" : "Troubleshooting",
      description: lang === 'de' ? "Hilfe bekommen, wenn etwas nicht wie erwartet funktioniert." : "Get help when things don't work as expected.",
      icon: MessageCircle,
      threads: 1345,
      posts: 8765,
      color: "#A78BFA",
    },
    {
      id: "subject-specific",
      name: lang === 'de' ? "Fachspezifisch" : "Subject-Specific",
      description: lang === 'de' ? "Diskussionen nach Fach (Mathematik, Deutsch, Naturwissenschaften usw.)." : "Discussions organized by subject area (Math, ELA, Science, etc.).",
      icon: Award,
      threads: 2345,
      posts: 16789,
      color: "#8B5CF6",
    },
    {
      id: "off-topic",
      name: lang === 'de' ? "Off-Topic-Lounge" : "Off-Topic Lounge",
      description: lang === 'de' ? "Austausch zu Themen außerhalb von KI." : "Connect with fellow educators on non-AI topics.",
      icon: Users,
      threads: 567,
      posts: 3456,
      color: "#A78BFA",
    },
  ];

  const trendingDiscussions = [
    {
      id: "1",
      title: lang === 'de' ? "Wie ich diese Woche 10 Stunden bei Eltern-E-Mails gespart habe" : "How I saved 10 hours this week using AI for parent emails",
      author: "Sarah Martinez",
      authorLevel: "Expert",
      authorBadge: "Ambassador",
      category: "parent-communication",
      replies: 87,
      views: 2345,
      likes: 156,
      timeAgo: lang === 'de' ? "vor 2 Std." : "2 hours ago",
      trending: true,
      excerpt: lang === 'de' ? "Ich nutze Zaza Draft für die Elternkommunikation und möchte meinen Workflow teilen..." : "I've been using Zaza Draft for parent communication and wanted to share my workflow that's been a game-changer...",
    },
    {
      id: "2",
      title: lang === 'de' ? "Beste Prompts für differenzierte Lesetexte?" : "Best prompts for differentiated reading passages?",
      author: "Michael Chen",
      authorLevel: "Advanced",
      authorBadge: null,
      category: "differentiation",
      replies: 64,
      views: 1876,
      likes: 98,
      timeAgo: lang === 'de' ? "vor 5 Std." : "5 hours ago",
      trending: true,
      excerpt: lang === 'de' ? "Ich suche effektive Prompts, um Lesetexte auf verschiedenen Niveaus zu erstellen. Was funktioniert bei euch?" : "I'm looking for effective prompts to create reading passages at different Lexile levels. What's working for you?",
    },
    {
      id: "3",
      title: lang === 'de' ? "KI-Ethik-Richtlinie - Kostenlose Vorlage!" : "AI Ethics Policy Template - Free to Use!",
      author: "Dr. Jennifer Wilson",
      authorLevel: "Expert",
      authorBadge: "Certified",
      category: "ethics-policy",
      replies: 123,
      views: 4567,
      likes: 234,
      timeAgo: lang === 'de' ? "vor 1 Tag" : "1 day ago",
      trending: true,
      excerpt: lang === 'de' ? "Nach monatelanger Arbeit teile ich unsere KI-Ethik-Richtlinie, die ihr anpassen könnt..." : "After months of work with our district, I'm sharing our AI ethics policy template that you can adapt for your school...",
    },
    {
      id: "4",
      title: lang === 'de' ? "Probleme mit der Qualität von KI-Feedback" : "Struggling with AI-generated feedback quality",
      author: "Rachel Thompson",
      authorLevel: "Intermediate",
      authorBadge: null,
      category: "troubleshooting",
      replies: 45,
      views: 987,
      likes: 67,
      timeAgo: lang === 'de' ? "vor 3 Std." : "3 hours ago",
      trending: false,
      excerpt: lang === 'de' ? "Das Feedback der KI fühlt sich zu allgemein an. Wie macht ihr es persönlicher?" : "The feedback I'm getting from AI feels too generic. How do you make it more personalized and specific?",
    },
    {
      id: "5",
      title: lang === 'de' ? "Meine Schüler bringen MIR jetzt KI bei!" : "My students are now teaching ME about AI!",
      author: "David Kim",
      authorLevel: "Beginner",
      authorBadge: null,
      category: "success-stories",
      replies: 56,
      views: 1543,
      likes: 189,
      timeAgo: lang === 'de' ? "vor 6 Std." : "6 hours ago",
      trending: false,
      excerpt: lang === 'de' ? "Habe eine KI-Einheit gestartet und die Schüler finden Anwendungsfälle, an die ich nie gedacht hätte..." : "Started an AI literacy unit with my 8th graders and they're coming up with use cases I never thought of...",
    },
  ];

  const topContributors = [
    { name: "Sarah Martinez", level: "Expert", badge: "Ambassador", posts: 1234, reputation: 8765, avatar: "SM" },
    { name: "Dr. Jennifer Wilson", level: "Expert", badge: "Certified", posts: 987, reputation: 7654, avatar: "JW" },
    { name: "Michael Chen", level: "Advanced", badge: null, posts: 876, reputation: 6543, avatar: "MC" },
    { name: "Rachel Thompson", level: "Intermediate", badge: null, posts: 654, reputation: 4321, avatar: "RT" },
  ];

  const badges = [
    { name: lang === 'de' ? "Erster Beitrag" : "First Post", icon: MessageSquare, description: lang === 'de' ? "Ersten Beitrag erstellt" : "Made your first post", color: "#8B5CF6" },
    { name: lang === 'de' ? "Hilfreich" : "Helpful", icon: ThumbsUp, description: lang === 'de' ? "50+ Likes erhalten" : "Received 50+ likes", color: "#A78BFA" },
    { name: lang === 'de' ? "Experte" : "Expert", icon: Star, description: lang === 'de' ? "Experten-Level erreicht" : "Reached Expert level", color: "#8B5CF6" },
    { name: lang === 'de' ? "Botschafter" : "Ambassador", icon: Crown, description: lang === 'de' ? "Offizieller Zaza Botschafter" : "Official Zaza Ambassador", color: "#A78BFA" },
  ];

  const resourcesData = [
    {
      title: lang === 'de' ? "KI-Kompetenzkurse" : "AI Literacy Courses",
      description: lang === 'de' ? "Grundlagen lernen, die in der Community diskutiert werden" : "Learn the basics discussed in the community",
      href: "/ai-literacy",
      icon: GraduationCap,
      color: "#8B5CF6",
    },
    {
      title: lang === 'de' ? "Experten-Webinare" : "Expert Webinars",
      description: lang === 'de' ? "Live-Sessions zu aktuellen Community-Themen" : "Live sessions on current community topics",
      href: "/webinars",
      icon: Video,
      color: "#A78BFA",
    },
    {
      title: lang === 'de' ? "KI-Glossar" : "AI Glossary",
      description: lang === 'de' ? "Begriffe aus den Diskussionen verstehen" : "Understand terms from the discussions",
      href: "/glossary",
      icon: BookOpen,
      color: "#8B5CF6",
    },
  ];

  useEffect(() => {
    analytics.community.viewHub()
  }, [])

  const handleCategoryClick = (category: (typeof categories)[0]) => {
    setSelectedCategory(category.id)
    analytics.community.viewCategory(category.name)
  }

  const handleDiscussionClick = (discussion: (typeof trendingDiscussions)[0]) => {
    analytics.community.viewDiscussion(discussion.id, discussion.title)
  }

  const filteredCategories = categories.filter((category) => {
    const q = searchQuery.toLowerCase()
    return (
      q === "" ||
      category.name.toLowerCase().includes(q) ||
      category.description.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Users className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">{text.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {text.hero.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{text.hero.subtitle}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={text.hero.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 bg-[#1E293B] border-white/10 text-white placeholder:text-gray-400 focus:border-[#8B5CF6] text-lg"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">25K+</div>
                <div className="text-gray-400 text-sm">{text.hero.stats.members}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">15K+</div>
                <div className="text-gray-400 text-sm">{text.hero.stats.discussions}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">98K+</div>
                <div className="text-gray-400 text-sm">{text.hero.stats.posts}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400 text-sm">{text.hero.stats.active}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column - Categories & Discussions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Trending Discussions */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Flame className="w-8 h-8 text-[#A78BFA]" />
                  <h2 className="text-3xl font-bold text-white">{text.main.trendingTitle}</h2>
                </div>
                <div className="space-y-4">
                  {trendingDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="bg-[#1E293B] border border-white/10 rounded-xl p-6 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 cursor-pointer"
                      onClick={() => handleDiscussionClick(discussion)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {discussion.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold text-white hover:text-[#A78BFA] transition-colors cursor-pointer">
                              {discussion.title}
                            </h3>
                            {discussion.trending && (
                              <span className="flex items-center gap-1 text-xs font-semibold text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full flex-shrink-0">
                                <Flame className="w-3 h-3" />
                                Hot
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                            <span className="font-medium text-[#A78BFA]">{discussion.author}</span>
                            <span className="text-xs bg-[#8B5CF6]/20 text-[#A78BFA] px-2 py-0.5 rounded">
                              {discussion.authorLevel}
                            </span>
                            {discussion.authorBadge && (
                              <span className="flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                                <Crown className="w-3 h-3" />
                                {discussion.authorBadge}
                              </span>
                            )}
                            <span>•</span>
                            <span>{discussion.timeAgo}</span>
                          </div>
                          <p className="text-gray-300 mb-4 leading-relaxed">{discussion.excerpt}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              <span>{discussion.views} views</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{discussion.likes} likes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-8 h-8 text-[#A78BFA]" />
                  <h2 className="text-3xl font-bold text-white">{text.main.categoriesTitle}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <div
                        key={category.id}
                        className="bg-[#1E293B] border border-white/10 rounded-xl p-6 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 cursor-pointer group"
                        onClick={() => handleCategoryClick(category)}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${category.color}20` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: category.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-300 mb-3 leading-relaxed">{category.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span>{category.threads.toLocaleString()} threads</span>
                              <span>•</span>
                              <span>{category.posts.toLocaleString()} posts</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Top Contributors */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-[#A78BFA]" />
                  <h3 className="text-xl font-bold text-white">{text.sidebar.contributorsTitle}</h3>
                </div>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-[#A78BFA] w-8">{index + 1}</div>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {contributor.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white text-sm truncate">{contributor.name}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{contributor.reputation.toLocaleString()} rep</span>
                          {contributor.badge && (
                            <>
                              <span>•</span>
                              <span className="text-[#A78BFA]">{contributor.badge}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-[#A78BFA]" />
                  <h3 className="text-xl font-bold text-white">{text.sidebar.badgesTitle}</h3>
                </div>
                <div className="space-y-4">
                  {badges.map((badge) => {
                    const Icon = badge.icon
                    return (
                      <div key={badge.name} className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${badge.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: badge.color }} />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm">{badge.name}</div>
                          <div className="text-xs text-gray-400">{badge.description}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-[#A78BFA]" />
                  <h3 className="text-xl font-bold text-white">{text.sidebar.guidelinesTitle}</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  {text.sidebar.guidelines.map((guideline, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="text-[#A78BFA] p-0 h-auto mt-4">
                  {text.sidebar.readGuidelines}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <RelatedResources
        title={text.sidebar.relatedTitle}
        description={text.sidebar.relatedSubtitle}
        resources={resourcesData}
      />

      {/* CTA Section */}
      <section className="py-20 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {text.cta.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {text.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6">{text.cta.primary}</Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent text-lg px-8 py-6"
            >{text.cta.secondary}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
