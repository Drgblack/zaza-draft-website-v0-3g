"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Download,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface YearReportClientProps {
  year: string
}

export default function YearReportClient({ year }: YearReportClientProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track download request
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "report_download_request", {
        event_category: "Lead Generation",
        event_label: `State of AI Report ${year}`,
      })
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  // Year-specific data
  const reportData: Record<string, any> = {
    "2024": {
      surveySize: "12,000+",
      pages: "98",
      downloads: "47,000+",
      keyFindings: [
        {
          stat: "34%",
          label: "of teachers use AI weekly",
          description: "Early adoption phase with significant growth potential",
          icon: TrendingUp,
        },
        {
          stat: "4.8 hrs",
          label: "saved per week per teacher",
          description: "Time savings for administrative tasks and communication",
          icon: Users,
        },
        {
          stat: "78%",
          label: "report improved efficiency",
          description: "Teachers using AI report better workflow management",
          icon: Award,
        },
        {
          stat: "82%",
          label: "want more AI training",
          description: "Strong demand for professional development",
          icon: BookOpen,
        },
      ],
      highlights: [
        "First comprehensive survey of AI adoption in K-12 education",
        "Identified key barriers to adoption: training, privacy concerns, and equity",
        "Documented early use cases in parent communication and lesson planning",
        "Established baseline metrics for future year-over-year comparisons",
      ],
    },
    "2023": {
      surveySize: "8,500+",
      pages: "76",
      downloads: "32,000+",
      keyFindings: [
        {
          stat: "18%",
          label: "of teachers use AI monthly",
          description: "Emerging awareness and experimentation phase",
          icon: TrendingUp,
        },
        {
          stat: "3.2 hrs",
          label: "saved per week per teacher",
          description: "Early time savings primarily in grading and feedback",
          icon: Users,
        },
        {
          stat: "62%",
          label: "are curious about AI",
          description: "High interest but limited practical experience",
          icon: Award,
        },
        {
          stat: "91%",
          label: "want AI training",
          description: "Nearly universal demand for professional development",
          icon: BookOpen,
        },
      ],
      highlights: [
        "Documented the initial wave of AI awareness in education",
        "Identified ChatGPT as the primary catalyst for teacher interest",
        "Highlighted significant knowledge gaps and training needs",
        "Revealed concerns about academic integrity and student misuse",
      ],
    },
    "2022": {
      surveySize: "5,200+",
      pages: "54",
      downloads: "18,000+",
      keyFindings: [
        {
          stat: "7%",
          label: "of teachers use AI tools",
          description: "Very early adoption by tech-forward educators",
          icon: TrendingUp,
        },
        {
          stat: "2.1 hrs",
          label: "saved per week per teacher",
          description: "Limited but promising time savings for early adopters",
          icon: Users,
        },
        {
          stat: "45%",
          label: "have heard of AI in education",
          description: "Low awareness but growing curiosity",
          icon: Award,
        },
        {
          stat: "88%",
          label: "want to learn more",
          description: "Strong interest in understanding AI potential",
          icon: BookOpen,
        },
      ],
      highlights: [
        "Established baseline data before widespread AI adoption",
        "Documented pre-ChatGPT landscape of educational AI tools",
        "Identified early adopters and their use cases",
        "Predicted rapid growth in AI adoption over next 3-5 years",
      ],
    },
  }

  const data = reportData[year]

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/state-of-ai-education"
          className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Current Report
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#A78BFA]/5" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full mb-6">
              <span className="text-[#A78BFA] text-sm font-medium">Historical Report</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              State of AI in Education
              <span className="block text-[#A78BFA] mt-2">{year} Report</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Historical analysis of AI adoption in K-12 education. {data.pages} pages of insights from{" "}
              {data.surveySize} teachers.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5 text-[#A78BFA]" />
                <span>{data.surveySize} Teachers Surveyed</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FileText className="w-5 h-5 text-[#A78BFA]" />
                <span>{data.pages} Pages</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Download className="w-5 h-5 text-[#A78BFA]" />
                <span>{data.downloads} Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Findings Section */}
      <section className="py-20 px-4 bg-[#1E293B]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{year} Key Findings</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Snapshot of AI adoption in education during {year}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.keyFindings.map((finding: any, index: number) => {
              const Icon = finding.icon
              return (
                <Card
                  key={index}
                  className="bg-[#1E293B] border-[#8B5CF6]/20 p-6 hover:border-[#8B5CF6]/40 transition-all"
                >
                  <Icon className="w-10 h-10 text-[#A78BFA] mb-4" />
                  <div className="text-5xl font-bold text-white mb-2">{finding.stat}</div>
                  <div className="text-lg font-semibold text-[#A78BFA] mb-3">{finding.label}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{finding.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Report Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Report Highlights</h2>
            <p className="text-xl text-gray-300">Key insights and findings from the {year} report</p>
          </div>

          <Card className="bg-[#1E293B] border-[#8B5CF6]/20 p-8">
            <ul className="space-y-4">
              {data.highlights.map((highlight: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#A78BFA] flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-lg leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Download Form Section */}
      <section className="py-20 px-4 bg-[#1E293B]/30">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#1E293B] border-[#8B5CF6]/20 p-8">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <Download className="w-16 h-16 text-[#A78BFA] mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-3">Download the {year} Report</h2>
                  <p className="text-gray-300">Get instant access to the full {data.pages}-page report</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your.email@school.edu"
                      className="bg-[#0F172A] border-[#8B5CF6]/30 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-white mb-2 block">
                      Your Role *
                    </Label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-[#0F172A] border border-[#8B5CF6]/30 rounded-md text-white"
                    >
                      <option value="">Select your role...</option>
                      <option value="teacher">Teacher</option>
                      <option value="administrator">Administrator</option>
                      <option value="instructional-coach">Instructional Coach</option>
                      <option value="curriculum-director">Curriculum Director</option>
                      <option value="technology-coordinator">Technology Coordinator</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  >
                    {isSubmitting ? (
                      "Sending Download Link..."
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Download {year} Report
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Check Your Email!</h3>
                <p className="text-gray-300 mb-6">
                  We've sent the download link to <strong className="text-[#A78BFA]">{email}</strong>
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Other Reports */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Explore Other Reports</h2>
            <p className="text-xl text-gray-300">View our complete archive of State of AI reports</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/10 bg-transparent"
            >
              <Link href="/state-of-ai-education">
                2025 Report (Current)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            {["2024", "2023", "2022"]
              .filter((y) => y !== year)
              .map((y) => (
                <Button
                  key={y}
                  asChild
                  variant="outline"
                  className="border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/10 bg-transparent"
                >
                  <Link href={`/state-of-ai-education/${y}`}>
                    {y} Report
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
