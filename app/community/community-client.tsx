"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"`nimport { useLanguage } from "@/lib/i18n/language-context"
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

const categories = [
  {
    id: "getting-started",
    name: "Getting Started with AI",
    description: "New to AI? Start here for beginner-friendly discussions and tips.",
    icon: Zap,
    threads: 1247,
    posts: 8934,
    color: "#8B5CF6",
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    description: "Share and discuss effective prompts for different teaching scenarios.",
    icon: MessageSquare,
    threads: 2156,
    posts: 15678,
    color: "#A78BFA",
  },
  {
    id: "lesson-planning",
    name: "Lesson Planning",
    description: "Collaborate on AI-assisted lesson plans and unit designs.",
    icon: TrendingUp,
    threads: 1834,
    posts: 12456,
    color: "#8B5CF6",
  },
  {
    id: "parent-communication",
    name: "Parent Communication",
    description: "Tips for using AI to improve parent-teacher communication.",
    icon: Users,
    threads: 987,
    posts: 6543,
    color: "#A78BFA",
  },
  {
    id: "assessment-feedback",
    name: "Assessment & Feedback",
    description: "Discuss AI tools for grading, feedback, and formative assessment.",
    icon: CheckCircle,
    threads: 1456,
    posts: 9876,
    color: "#8B5CF6",
  },
  {
    id: "differentiation",
    name: "Differentiation & IEPs",
    description: "Using AI to support diverse learners and create accommodations.",
    icon: Star,
    threads: 876,
    posts: 5432,
    color: "#A78BFA",
  },
  {
    id: "ethics-policy",
    name: "Ethics & Policy",
    description: "Discuss ethical considerations, policies, and best practices.",
    icon: Shield,
    threads: 654,
    posts: 4321,
    color: "#8B5CF6",
  },
  {
    id: "tool-reviews",
    name: "Tool Reviews & Comparisons",
    description: "Share experiences with different AI tools and platforms.",
    icon: Trophy,
    threads: 1123,
    posts: 7654,
    color: "#A78BFA",
  },
  {
    id: "success-stories",
    nameKey: "community.categories.success-stories.name",
    description: "Celebrate wins and share what's working in your classroom.",
    icon: Flame,
    threads: 789,
    posts: 5678,
    color: "#8B5CF6",
  },
  {
    id: "troubleshooting",
    name: "Troubleshooting",
    description: "Get help when things don't work as expected.",
    icon: MessageCircle,
    threads: 1345,
    posts: 8765,
    color: "#A78BFA",
  },
  {
    id: "subject-specific",
    name: "Subject-Specific",
    description: "Discussions organized by subject area (Math, ELA, Science, etc.).",
    icon: Award,
    threads: 2345,
    posts: 16789,
    color: "#8B5CF6",
  },
  {
    id: "off-topic",
    name: "Off-Topic Lounge",
    description: "Connect with fellow educators on non-AI topics.",
    icon: Users,
    threads: 567,
    posts: 3456,
    color: "#A78BFA",
  },
]

const trendingDiscussions = [
  {
    id: "1",
    title: "How I saved 10 hours this week using AI for parent emails",
    author: "Sarah Martinez",
    authorLevel: "Expert",
    authorBadge: "Ambassador",
    category: "parent-communication",
    replies: 87,
    views: 2345,
    likes: 156,
    timeAgo: "2 hours ago",
    trending: true,
    excerpt:
      "I've been using Zaza Draft for parent communication and wanted to share my workflow that's been a game-changer...",
  },
  {
    id: "2",
    title: "Best prompts for differentiated reading passages?",
    author: "Michael Chen",
    authorLevel: "Advanced",
    authorBadge: null,
    category: "differentiation",
    replies: 64,
    views: 1876,
    likes: 98,
    timeAgo: "5 hours ago",
    trending: true,
    excerpt:
      "I'm looking for effective prompts to create reading passages at different Lexile levels. What's working for you?",
  },
  {
    id: "3",
    title: "AI Ethics Policy Template - Free to Use!",
    author: "Dr. Jennifer Wilson",
    authorLevel: "Expert",
    authorBadge: "Certified",
    category: "ethics-policy",
    replies: 123,
    views: 4567,
    likes: 234,
    timeAgo: "1 day ago",
    trending: true,
    excerpt:
      "After months of work with our district, I'm sharing our AI ethics policy template that you can adapt for your school...",
  },
  {
    id: "4",
    title: "Struggling with AI-generated feedback quality",
    author: "Rachel Thompson",
    authorLevel: "Intermediate",
    authorBadge: null,
    category: "troubleshooting",
    replies: 45,
    views: 987,
    likes: 67,
    timeAgo: "3 hours ago",
    trending: false,
    excerpt: "The feedback I'm getting from AI feels too generic. How do you make it more personalized and specific?",
  },
  {
    id: "5",
    title: "My students are now teaching ME about AI!",
    author: "David Kim",
    authorLevel: "Beginner",
    authorBadge: null,
    category: "success-stories",
    replies: 56,
    views: 1543,
    likes: 189,
    timeAgo: "6 hours ago",
    trending: false,
    excerpt:
      "Started an AI literacy unit with my 8th graders and they're coming up with use cases I never thought of...",
  },
]

const topContributors = [
  {
    name: "Sarah Martinez",
    level: "Expert",
    badge: "Ambassador",
    posts: 1234,
    reputation: 8765,
    avatar: "SM",
  },
  {
    name: "Dr. Jennifer Wilson",
    level: "Expert",
    badge: "Certified",
    posts: 987,
    reputation: 7654,
    avatar: "JW",
  },
  {
    name: "Michael Chen",
    level: "Advanced",
    badge: null,
    posts: 876,
    reputation: 6543,
    avatar: "MC",
  },
  {
    name: "Rachel Thompson",
    level: "Intermediate",
    badge: null,
    posts: 654,
    reputation: 4321,
    avatar: "RT",
  },
]

const badges = [
  { name: "First Post", icon: MessageSquare, description: "Made your first post", color: "#8B5CF6" },
  { name: "Helpful", icon: ThumbsUp, description: "Received 50+ likes", color: "#A78BFA" },
  { name: "Expert", icon: Star, description: "Reached Expert level", color: "#8B5CF6" },
  { name: "Ambassador", icon: Crown, description: "Official Zaza Ambassador", color: "#A78BFA" },
]

export default function CommunityClient() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const nameKeyFor = (category: (typeof categories)[0]) => `community.categories.${category.id}.name`
  const descKeyFor = (category: (typeof categories)[0]) => `community.categories.${category.id}.desc`

  useEffect(() => {
    analytics.community.viewHub()
  }, [])

  const handleCategoryClick = (category: (typeof categories)[0]) => {
    setSelectedCategory(category.id)
    analytics.community.viewCategory(t(nameKeyFor(category)))
  }

  const handleDiscussionClick = (discussion: (typeof trendingDiscussions)[0]) => {
    analytics.community.viewDiscussion(discussion.id, discussion.title)
  }

  const filteredCategories = categories.filter((category) => {
    const q = searchQuery.toLowerCase()
    return (
      q === "" ||
      t(nameKeyFor(category)).toLowerCase().includes(q) ||
      t(descKeyFor(category)).toLowerCase().includes(q)
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
              <span className="text-[#A78BFA] font-medium text-sm">{t("community.hero.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t("community.hero.titlePrefix")} <span className="gradient-text">{t("community.hero.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{t("community.hero.subtitle")}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t("community.search.placeholder")}
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
                <div className="text-gray-400 text-sm">{t("community.stats.members")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">15K+</div>
                <div className="text-gray-400 text-sm">{t("community.stats.discussions")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">98K+</div>
                <div className="text-gray-400 text-sm">{t("community.stats.posts")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400 text-sm">{t("community.stats.active")}</div>
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
                  <h2 className="text-3xl font-bold text-white">Trending Discussions</h2>
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
                  <h2 className="text-3xl font-bold text-white">Discussion Categories</h2>
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
                              {t(nameKeyFor(category))}
                            </h3>
                            <p className="text-sm text-gray-300 mb-3 leading-relaxed">{t(descKeyFor(category))}</p>
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
                  <h3 className="text-xl font-bold text-white">Top Contributors</h3>
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
                  <h3 className="text-xl font-bold text-white">Earn Badges</h3>
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
                  <h3 className="text-xl font-bold text-white">{t("community.guidelines.title")}</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                    <span>{t("community.guidelines.li1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                    <span>{t("community.guidelines.li2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                    <span>{t("community.guidelines.li3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                    <span>{t("community.guidelines.li4")}</span>
                  </li>
                </ul>
                <Button variant="link" className="text-[#A78BFA] p-0 h-auto mt-4">
                  {t("community.guidelines.read")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <RelatedResources
        title={t("community.related.title")}
        description="Enhance your community experience with these learning resources"
        resources={[
          {
            title: t("community.related.aiLiteracy.title"),
            description: t("community.related.aiLiteracy.desc"),
            href: "/ai-literacy",
            icon: GraduationCap,
            color: "#8B5CF6",
          },
          {
            title: t("community.related.webinars.title"),
            description: t("community.related.webinars.desc"),
            href: "/webinars",
            icon: Video,
            color: "#A78BFA",
          },
          {
            title: t("community.related.glossary.title"),
            description: t("community.related.glossary.desc"),
            href: "/glossary",
            icon: BookOpen,
            color: "#8B5CF6",
          },
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("community.cta.titlePrefix")} <span className="gradient-text">{t("community.cta.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Create your free account and start connecting with thousands of teachers using AI in their classrooms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6">{t("community.cta.primary")}</Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent text-lg px-8 py-6"
            >{t("community.cta.secondary")}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}



