"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Download, GraduationCap, Clock, Users, Star, Target, TrendingUp, Video, MessageSquare, Puzzle, ArrowRight } from "lucide-react"
import { RelatedResources } from "@/components/related-resources"
import { InlineCTA } from "@/components/conversion/inline-cta"
import { TrustBadges } from "@/components/conversion/trust-badges"
import { LeadMagnet } from "@/components/conversion/lead-magnet"

const learningPaths = [
  { id: "beginner", title: "Beginner Path", description: "New to AI? Start here to build foundational knowledge", duration: "8-12 hours", courses: 5, icon: BookOpen, color: "from-blue-500 to-cyan-500" },
  { id: "intermediate", title: "Intermediate Path", description: "Ready to apply AI to your daily teaching workflows", duration: "12-16 hours", courses: 7, icon: Target, color: "from-purple-500 to-pink-500" },
  { id: "advanced", title: "Advanced Path", description: "Become an AI leader in your school or district", duration: "16-20 hours", courses: 8, icon: TrendingUp, color: "from-orange-500 to-red-500" },
]

const featuredCourses = [
  { id: "ai-basics", title: "AI Basics for Teachers", description: "Understand how AI works and why it matters for education", duration: "45 min", enrolled: "12,450+", rating: 4.9, path: "beginner" },
  { id: "prompt-engineering", title: "Prompt Engineering Fundamentals", description: "Master effective AI prompts", duration: "1.5 hours", enrolled: "10,230+", rating: 4.8, path: "beginner" },
  { id: "parent-communication", title: "AI for Parent Communication", description: "Write professional parent emails faster", duration: "1 hour", enrolled: "8,920+", rating: 4.9, path: "intermediate" },
]

const resources = [
  { category: "Templates", items: [ { name: "Parent Email Templates", downloads: "15,230" }, { name: "Lesson Plan Templates", downloads: "12,450" } ] },
  { category: "Guides", items: [ { name: "Getting Started with AI Guide", downloads: "14,560" }, { name: "Prompt Engineering Handbook", downloads: "10,340" } ] },
]

const certificationLevels = [
  { level: "AI-Ready Teacher", description: "Foundational AI literacy certification", holders: "8,450+" },
  { level: "AI-Confident Educator", description: "Intermediate AI application certification", holders: "3,920+" },
  { level: "AI Education Leader", description: "Advanced AI leadership certification", holders: "1,240+" },
]

export default function AILiteracyClient() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).analytics) {
      ;(window as any).analytics.track("ai_literacy_hub_viewed")
    }
  }, [])

  const filtered = selectedPath && selectedPath !== "all" ? featuredCourses.filter((c) => c.path === selectedPath) : featuredCourses

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 mb-6">
            <GraduationCap className="w-4 h-4 text-[#A78BFA]" />
            <span className="text-sm font-medium text-[#A78BFA]">AI Literacy Center</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">AI Literacy for Teachers</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Free courses, certification, and resources to help teachers use AI confidently and safely.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Choose Your Path</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPath(p.id)}
                className="text-left p-6 rounded-xl border bg-white/5 border-white/10 hover:border-[#A78BFA]/30"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center mb-3`}>
                  <p.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-white font-semibold mb-1">{p.title}</div>
                <div className="text-sm text-gray-400">{p.description}</div>
                <div className="mt-3 text-xs text-gray-500 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {p.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {p.courses} courses
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Featured Courses</h2>
            <div className="flex gap-2">
              {['all','beginner','intermediate','advanced'].map((k) => (
                <Button key={k} variant={selectedPath===k? 'default':'outline'} className={selectedPath===k? 'bg-[#8B5CF6] text-white':'bg-white/5 text-white border-white/10'} onClick={() => setSelectedPath(k)}>{k}</Button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <div key={c.id} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#A78BFA]/30">
                <div className="text-white font-semibold text-lg mb-2">{c.title}</div>
                <p className="text-sm text-gray-400 mb-3">{c.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{c.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{c.enrolled}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4" />{c.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Downloadable Resource Library</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((cat) => (
              <div key={cat.category} className="p-6 rounded-xl bg-[#0F172A] border border-white/10">
                <div className="text-white font-semibold mb-4">{cat.category}</div>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <Link
                      key={item.name}
                      href={`/ai-literacy/resources`}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#A78BFA]/30 hover:bg-white/10"
                    >
                      <span className="text-gray-200">{item.name}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {item.downloads}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certification" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">AI Education Certification</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certificationLevels.map((cert) => (
              <div key={cert.level} className="p-6 rounded-xl border bg-white/5 border-white/10 hover:border-[#A78BFA]/30">
                <div className="text-xl font-semibold text-white mb-2">{cert.level}</div>
                <p className="text-sm text-gray-300 mb-4">{cert.description}</p>
                <div className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {cert.holders} certified teachers
                </div>
                <Button asChild className="w-full">
                  <Link href="#certification">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>
      <RelatedResources
        title="Continue Your AI Journey"
        description="Explore more resources to enhance your AI teaching skills"
        resources={[
          { title: "Live Webinars", description: "Join expert-led sessions and earn PD certificates", href: "/webinars", icon: Video, color: "#8B5CF6" },
          { title: "Teacher Community", description: "Connect with educators using AI", href: "/community", icon: MessageSquare, color: "#A78BFA" },
          { title: "Tool Integrations", description: "Connect Zaza Draft with your favorite tools", href: "/integrations", icon: Puzzle, color: "#8B5CF6" },
        ]}
      />

      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InlineCTA
            title="Start Your AI Learning Journey"
            description="Join teachers who are confidently using AI to enhance their teaching"
            primaryCTA={{ text: "Browse Courses", href: "#courses" }}
            secondaryCTA={{ text: "Try Zaza Draft Free", href: "/signup" }}
            variant="gradient"
          />
        </div>
      </section>
    </div>
  )
}
