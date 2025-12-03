"use client";

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Search,
  Download,
  FileText,
  BookOpen,
  MessageSquare,
  ClipboardCheck,
  Users,
  GraduationCap,
  Filter,
  Star,
} from "lucide-react"
import { trackEvent } from "@/lib/analytics"

const categories = [
  { id: "all", name: "All Resources", icon: FileText, count: 52 },
  { id: "prompts", name: "Prompt Templates", icon: MessageSquare, count: 15 },
  { id: "lessons", name: "Lesson Planning", icon: BookOpen, count: 12 },
  { id: "communication", name: "Parent Communication", icon: Users, count: 10 },
  { id: "assessment", name: "Assessment", icon: ClipboardCheck, count: 8 },
  { id: "management", name: "Classroom Management", icon: GraduationCap, count: 4 },
  { id: "professional", name: "Professional Development", icon: Star, count: 3 },
]

const resources = [
  {
    id: "parent-email-templates",
    slug: "parent-email-templates",
    title: "25 Parent Email Templates",
    description: "Ready-to-use email templates for common parent communication scenarios",
    category: "communication",
    format: "PDF",
    downloads: 12453,
    rating: 4.9,
    featured: true,
  },
  {
    id: "prompt-engineering-guide",
    slug: "prompt-engineering-guide",
    title: "Prompt Engineering for Teachers",
    description: "Complete guide to writing effective AI prompts for educational contexts",
    category: "prompts",
    format: "PDF",
    downloads: 10892,
    rating: 4.8,
    featured: true,
  },
  {
    id: "lesson-plan-templates",
    slug: "lesson-plan-templates",
    title: "AI-Enhanced Lesson Plan Templates",
    description: "10 customizable lesson plan templates with AI integration points",
    category: "lessons",
    format: "DOCX",
    downloads: 9234,
    rating: 4.7,
    featured: true,
  },
  {
    id: "differentiation-prompts",
    slug: "differentiation-prompts",
    title: "Differentiation Prompt Library",
    description: "50+ prompts for adapting content to different learning levels",
    category: "prompts",
    format: "PDF",
    downloads: 8765,
    rating: 4.9,
  },
  {
    id: "assessment-rubrics",
    slug: "assessment-rubrics",
    title: "AI-Assisted Assessment Rubrics",
    description: "Rubric templates with AI feedback integration",
    category: "assessment",
    format: "XLSX",
    downloads: 7543,
    rating: 4.6,
  },
  {
    id: "iep-meeting-prep",
    slug: "iep-meeting-prep",
    title: "IEP Meeting Preparation Checklist",
    description: "Comprehensive checklist for preparing IEP documentation with AI",
    category: "professional",
    format: "PDF",
    downloads: 6892,
    rating: 4.8,
  },
  {
    id: "behavior-intervention-plans",
    slug: "behavior-intervention-plans",
    title: "Behavior Intervention Plan Templates",
    description: "Structured templates for documenting and tracking behavior interventions",
    category: "management",
    format: "DOCX",
    downloads: 6234,
    rating: 4.7,
  },
  {
    id: "parent-conference-scripts",
    slug: "parent-conference-scripts",
    title: "Parent Conference Conversation Scripts",
    description: "Frameworks for difficult conversations with parents",
    category: "communication",
    format: "PDF",
    downloads: 5987,
    rating: 4.8,
  },
]

export default function ResourceLibraryClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    trackEvent("resource_library_category_filter", {
      category: categoryId,
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      trackEvent("resource_library_search", {
        query,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">AI Resource Library</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Download 50+ free templates, guides, and checklists to accelerate your AI-powered teaching journey
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-[#1A1F35] border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-[#1A1F35] border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">52</div>
              <div className="text-gray-300">Total Resources</div>
            </Card>
            <Card className="bg-[#1A1F35] border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">62K+</div>
              <div className="text-gray-300">Total Downloads</div>
            </Card>
            <Card className="bg-[#1A1F35] border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">4.8</div>
              <div className="text-gray-300">Average Rating</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="text-gray-400 w-5 h-5 flex-shrink-0" />
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white"
                      : "bg-[#1A1F35] text-gray-300 hover:bg-[#252B45]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span className="text-sm opacity-75">({category.count})</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No resources found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Link key={resource.id} href={`/ai-literacy/resources/${resource.slug}`}>
                  <Card className="bg-[#1A1F35] border-gray-700 p-6 hover:border-purple-500 transition-all h-full cursor-pointer group">
                    {resource.featured && (
                      <div className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded mb-3">
                        Featured
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {resource.title}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-2">{resource.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {resource.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {resource.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-[#252B45] text-purple-400 px-2 py-1 rounded">{resource.format}</span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Download
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want More Resources?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our AI Literacy courses to get exclusive templates and advanced guides
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/ai-literacy">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Kurse durchsuchen
              </Button>
            </Link>
            <Link href="/community">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-[#1A1F35] bg-transparent"
              >
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


