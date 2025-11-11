"use client";

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"
import { RelatedResources } from "@/components/related-resources"

const categories = [
  { id: "all", name: "All Integrations", count: 52 },
  { id: "lms", name: "Learning Management", count: 8 },
  { id: "sis", name: "Student Information", count: 6 },
  { id: "communication", name: "Communication", count: 12 },
  { id: "productivity", name: "Productivity", count: 15 },
  { id: "assessment", name: "Assessment", count: 7 },
  { id: "storage", name: "Cloud Storage", count: 4 },
]

const integrations = [
  {
    id: "google-classroom",
    name: "Google Classroom",
    category: "lms",
    description: "Sync assignments, grades, and student rosters automatically",
    icon: "ðŸŽ“",
    color: "from-green-500 to-emerald-500",
    users: "28,450+",
    setupTime: "5 min",
    features: ["Auto-sync rosters", "Grade passback", "Assignment creation", "Announcement posting"],
    popular: true,
  },
  {
    id: "canvas",
    name: "Canvas LMS",
    category: "lms",
    description: "Seamlessly integrate with Canvas courses and gradebooks",
    icon: "ðŸ“š",
    color: "from-orange-500 to-red-500",
    users: "15,230+",
    setupTime: "8 min",
    features: ["Course sync", "Gradebook integration", "Assignment publishing", "Student data import"],
    popular: true,
  },
  {
    id: "schoology",
    name: "Schoology",
    category: "lms",
    description: "Connect your Schoology courses with Zaza Draft",
    icon: "ðŸ«",
    color: "from-blue-500 to-cyan-500",
    users: "12,890+",
    setupTime: "7 min",
    features: ["Course integration", "Grade sync", "Resource sharing", "Student roster import"],
    popular: true,
  },
  {
    id: "powerschool",
    name: "PowerSchool",
    category: "sis",
    description: "Import student data and sync grades with PowerSchool",
    icon: "âš¡",
    color: "from-purple-500 to-pink-500",
    users: "18,920+",
    setupTime: "10 min",
    features: ["Student data import", "Grade sync", "Attendance tracking", "Report card comments"],
    popular: true,
  },
  {
    id: "infinite-campus",
    name: "Infinite Campus",
    category: "sis",
    description: "Sync student information and grades with Infinite Campus",
    icon: "ðŸŽ¯",
    color: "from-indigo-500 to-purple-500",
    users: "14,560+",
    setupTime: "10 min",
    features: ["Student roster sync", "Grade passback", "Parent contact info", "IEP data access"],
    popular: false,
  },
  {
    id: "skyward",
    name: "Skyward",
    category: "sis",
    description: "Connect with Skyward for student data and grade management",
    icon: "â˜ï¸",
    color: "from-blue-400 to-blue-600",
    users: "11,340+",
    setupTime: "9 min",
    features: ["Student data sync", "Gradebook integration", "Attendance data", "Family contacts"],
    popular: false,
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "storage",
    description: "Save and organize all your AI-generated content in Google Drive",
    icon: "ðŸ“",
    color: "from-yellow-500 to-orange-500",
    users: "32,120+",
    setupTime: "3 min",
    features: ["Auto-save documents", "Folder organization", "Share with colleagues", "Version history"],
    popular: true,
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    category: "communication",
    description: "Share AI-generated content directly in Teams channels",
    icon: "ðŸ’¬",
    color: "from-blue-600 to-purple-600",
    users: "24,780+",
    setupTime: "5 min",
    features: ["Channel posting", "Direct messaging", "File sharing", "Meeting notes"],
    popular: true,
  },
  {
    id: "remind",
    name: "Remind",
    category: "communication",
    description: "Send AI-generated messages to parents via Remind",
    icon: "ðŸ“±",
    color: "from-blue-500 to-indigo-500",
    users: "19,450+",
    setupTime: "4 min",
    features: ["Bulk messaging", "Translation support", "Scheduled sends", "Parent responses"],
    popular: false,
  },
  {
    id: "classdojo",
    name: "ClassDojo",
    category: "communication",
    description: "Share updates and messages with ClassDojo families",
    icon: "ðŸ¾",
    color: "from-green-400 to-blue-500",
    users: "16,890+",
    setupTime: "5 min",
    features: ["Story posts", "Parent messages", "Behavior updates", "Photo sharing"],
    popular: false,
  },
  {
    id: "seesaw",
    name: "Seesaw",
    category: "communication",
    description: "Post AI-generated feedback to student Seesaw journals",
    icon: "ðŸŽ¨",
    color: "from-pink-500 to-rose-500",
    users: "13,670+",
    setupTime: "6 min",
    features: ["Journal comments", "Family updates", "Activity creation", "Portfolio feedback"],
    popular: false,
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "communication",
    description: "Send AI-generated emails directly from your Gmail account",
    icon: "âœ‰ï¸",
    color: "from-red-500 to-pink-500",
    users: "29,340+",
    setupTime: "3 min",
    features: ["Direct sending", "Draft saving", "Template library", "Signature integration"],
    popular: true,
  },
  {
    id: "outlook",
    name: "Outlook",
    category: "communication",
    description: "Integrate with Outlook for seamless email communication",
    icon: "ðŸ“§",
    color: "from-blue-600 to-blue-800",
    users: "21,560+",
    setupTime: "4 min",
    features: ["Email sending", "Calendar integration", "Contact sync", "Template management"],
    popular: false,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "productivity",
    description: "Schedule parent conferences and meetings automatically",
    icon: "ðŸ“…",
    color: "from-blue-500 to-cyan-500",
    users: "17,230+",
    setupTime: "4 min",
    features: ["Event creation", "Meeting scheduling", "Reminder setup", "Availability checking"],
    popular: false,
  },
  {
    id: "notion",
    name: "Notion",
    category: "productivity",
    description: "Export lesson plans and resources to Notion workspaces",
    icon: "ðŸ“",
    color: "from-gray-700 to-gray-900",
    users: "9,780+",
    setupTime: "6 min",
    features: ["Page creation", "Database integration", "Template export", "Collaboration"],
    popular: false,
  },
  {
    id: "trello",
    name: "Trello",
    category: "productivity",
    description: "Create lesson planning boards and task cards in Trello",
    icon: "ðŸ“Š",
    color: "from-blue-500 to-blue-700",
    users: "8,450+",
    setupTime: "5 min",
    features: ["Board creation", "Card generation", "Checklist sync", "Due date setting"],
    popular: false,
  },
]

export default function IntegrationsClient() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularIntegrations = integrations.filter((i) => i.popular)

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-5 h-5 text-[#A78BFA]" />
              <span className="text-[#A78BFA] font-medium text-sm">50+ Integrations Available</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connect Your <span className="gradient-text">Favorite Tools</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{t("integrations.subtitle")}</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 bg-[#1E293B] border-white/10 text-white placeholder:text-gray-400 focus:border-[#8B5CF6] text-lg"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">52</div>
                <div className="text-gray-400 text-sm">Integrations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">5 min</div>
                <div className="text-gray-400 text-sm">Avg Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime</div>
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
            <h2 className="text-4xl font-bold text-white">Most Popular</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularIntegrations.map((integration) => (
              <Link
                key={integration.id}
                href={`/integrations/${integration.id}`}
                className="bg-[#1E293B] border border-white/10 rounded-xl p-8 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`text-5xl bg-gradient-to-br ${integration.color} p-4 rounded-xl`}>
                    {integration.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                  {integration.name}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{integration.description}</p>
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
                  {integration.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#A78BFA]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#A78BFA] hover:text-white border border-[#8B5CF6]/30 group-hover:border-[#8B5CF6]">
                  View Integration
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
          <h2 className="text-4xl font-bold text-white mb-8">Browse by Category</h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
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
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
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
                  <div className={`text-5xl bg-gradient-to-br ${integration.color} p-4 rounded-xl`}>
                    {integration.icon}
                  </div>
                  {integration.popular && (
                    <span className="text-xs font-semibold text-[#A78BFA] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                  {integration.name}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{integration.description}</p>
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
                  View Integration
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ))}
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No integrations found matching your search.</p>
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
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
              <p className="text-gray-300 leading-relaxed">
                All integrations use OAuth 2.0 and are FERPA compliant. Your data is encrypted in transit and at rest.
              </p>
            </div>
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Step-by-Step Guides</h3>
              <p className="text-gray-300 leading-relaxed">
                Every integration includes detailed setup instructions with screenshots and video tutorials.
              </p>
            </div>
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">24/7 Support</h3>
              <p className="text-gray-300 leading-relaxed">
                Our integration support team is available around the clock to help you get connected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedResources
            title="Get the Most from Integrations"
            description="Learn how to maximize your integrated workflow"
            resources={[
              {
                title: "Integration Tutorials",
                description: "Watch step-by-step setup guides for each tool",
                href: "/webinars?category=integrations",
                icon: Video,
                color: "#8B5CF6",
              },
              {
                title: "AI Literacy Courses",
                description: "Learn best practices for AI tool selection",
                href: "/ai-literacy",
                icon: GraduationCap,
                color: "#A78BFA",
              },
              {
                title: "AI Glossary",
                description: "Understand integration terminology and concepts",
                href: "/glossary",
                icon: BookOpen,
                color: "#8B5CF6",
              },
            ]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Don't See Your <span className="gradient-text">Tool?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We're constantly adding new integrations. Request an integration and we'll prioritize it for development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6">
              <Link href="/integrations/request">Request Integration</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent text-lg px-8 py-6"
            >
              <Link href="/support">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
