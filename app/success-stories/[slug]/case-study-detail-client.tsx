"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, TrendingUp, CheckCircle2, Quote, Calendar, MapPin, GraduationCap } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface CaseStudyData {
  slug: string
  title: string
  school: string
  location: string
  students: string
  category: string
  categoryLabel: string
  thumbnail: string
  teacherName: string
  teacherRole: string
  teacherPhoto: string
  challenge: {
    title: string
    description: string
    painPoints: string[]
  }
  solution: {
    title: string
    description: string
    implementation: {
      phase: string
      duration: string
      activities: string[]
    }[]
  }
  results: {
    title: string
    description: string
    metrics: {
      label: string
      value: string
      icon: string
    }[]
  }
  testimonial: {
    quote: string
    context: string
  }
  keyTakeaways: string[]
  relatedStories: string[]
}

const caseStudyData: Record<string, CaseStudyData> = {
  "lincoln-elementary-parent-communication": {
    slug: "lincoln-elementary-parent-communication",
    title: "How Lincoln Elementary Cut Parent Communication Time by 75%",
    school: "Lincoln Elementary",
    location: "Austin, TX",
    students: "450 students",
    category: "elementary",
    categoryLabel: "Elementary School",
    thumbnail: "/elementary-school-classroom-teacher.jpg",
    teacherName: "Sarah Martinez",
    teacherRole: "3rd Grade Teacher, 8 years experience",
    teacherPhoto: "/professional-teacher-headshot-woman-latina.jpg",
    challenge: {
      title: "The Communication Overwhelm",
      description:
        "Sarah was spending 15-20 hours per week on parent communication, often working late into the evening to respond to emails and write progress reports. With 24 students and diverse family needs, she felt constantly behind.",
      painPoints: [
        "Spending 2-3 hours every evening on parent emails",
        "Struggling to maintain consistent communication tone",
        "Missing important family updates due to email overload",
        "Feeling guilty about delayed responses to parents",
        "Sacrificing lesson planning time for communication tasks",
      ],
    },
    solution: {
      title: "A Systematic Approach to AI-Powered Communication",
      description:
        "Sarah started with Zaza Draft's parent email templates and gradually expanded to using AI for progress reports and behavior updates. The key was building confidence through small wins.",
      implementation: [
        {
          phase: "Week 1: Email Templates",
          duration: "5 days",
          activities: [
            "Set up Zaza Draft account and explored email templates",
            "Used AI to respond to 5 routine parent questions",
            "Customized templates for her classroom tone",
            "Saved 3 hours in the first week",
          ],
        },
        {
          phase: "Week 2-3: Progress Reports",
          duration: "2 weeks",
          activities: [
            "Used Zaza Draft for weekly progress updates",
            "Created personalized reports for each student in 30 minutes",
            "Parents responded positively to detailed, consistent updates",
            "Saved 8 hours over two weeks",
          ],
        },
        {
          phase: "Week 4+: Full Integration",
          duration: "Ongoing",
          activities: [
            "Integrated Zaza Draft into daily workflow",
            "Used AI for behavior updates, conference prep, and newsletters",
            "Trained 3 colleagues on the system",
            "Maintained 12 hours/week time savings",
          ],
        },
      ],
    },
    results: {
      title: "Transformative Results in 30 Days",
      description:
        "Within one month, Sarah reduced her communication time from 15 hours/week to just 3 hours/week, while actually improving the quality and consistency of her parent communication.",
      metrics: [
        { label: "Time Saved Per Week", value: "12 hours", icon: "clock" },
        { label: "Parent Satisfaction", value: "95%", icon: "trending-up" },
        { label: "Response Time", value: "Under 24 hours", icon: "check" },
        { label: "Emails Sent", value: "300+ per month", icon: "users" },
      ],
    },
    testimonial: {
      quote:
        "I actually look forward to parent communication now. It's no longer a source of stress. I can respond thoughtfully and quickly, and parents have noticed the difference. One parent told me I'm the most communicative teacher her child has ever had.",
      context: "After 30 days using Zaza Draft",
    },
    keyTakeaways: [
      "Start small with email templates before expanding to reports",
      "Consistency matters more than perfection in parent communication",
      "AI can help maintain your authentic voice while saving time",
      "Time saved on communication can be reinvested in lesson planning",
      "Parents appreciate quick, thoughtful responses over delayed perfection",
    ],
    relatedStories: [
      "jefferson-new-teacher-confidence",
      "washington-middle-language-barriers",
      "oakwood-special-education-reports",
    ],
  },
  // Add more case studies here...
}

export function CaseStudyDetailClient({ slug }: { slug: string }) {
  const study = caseStudyData[slug]
  const [activeTab, setActiveTab] = useState<"challenge" | "solution" | "results">("challenge")

  if (!study) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link href="/success-stories">Back to Success Stories</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Back Button */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Button
            asChild
            variant="ghost"
            className="text-gray-400 hover:text-white mb-8"
            onClick={() => trackEvent("case_study_back_clicked", { slug })}
          >
            <Link href="/success-stories">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Success Stories
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-6 bg-purple-500/10 text-purple-300 border-purple-500/20 px-4 py-1.5">
            {study.categoryLabel}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">{study.title}</h1>

          <div className="flex flex-wrap gap-6 text-gray-300 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>
                {study.school}, {study.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span>{study.students}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
            <Image src={study.thumbnail || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
          </div>

          {/* Teacher Profile */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={study.teacherPhoto || "/placeholder.svg"}
                  alt={study.teacherName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{study.teacherName}</h3>
                <p className="text-gray-400 mb-4">{study.teacherRole}</p>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                  <Quote className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-gray-300 italic">{study.testimonial.quote}</p>
                  <p className="text-sm text-gray-500 mt-2">{study.testimonial.context}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-y border-white/10 py-4 px-6 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4">
            {[
              { id: "challenge" as const, label: "The Challenge" },
              { id: "solution" as const, label: "The Solution" },
              { id: "results" as const, label: "The Results" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {activeTab === "challenge" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{study.challenge.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{study.challenge.description}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Key Pain Points</h3>
                <ul className="space-y-4">
                  {study.challenge.painPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                      </div>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "solution" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{study.solution.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{study.solution.description}</p>
              </div>

              <div className="space-y-6">
                {study.solution.implementation.map((phase, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{phase.phase}</h3>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 ml-14">
                      {phase.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{study.results.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{study.results.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {study.results.metrics.map((metric, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      {metric.icon === "clock" && <Clock className="w-8 h-8 text-purple-400" />}
                      {metric.icon === "trending-up" && <TrendingUp className="w-8 h-8 text-green-400" />}
                      {metric.icon === "check" && <CheckCircle2 className="w-8 h-8 text-blue-400" />}
                      {metric.icon === "users" && <Users className="w-8 h-8 text-orange-400" />}
                      <h3 className="text-lg font-medium text-gray-300">{metric.label}</h3>
                    </div>
                    <div className="text-4xl font-bold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Key Takeaways</h3>
                <ul className="space-y-4">
                  {study.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to transform your communication?</h2>
          <p className="text-xl text-gray-300 mb-8">Join {study.teacherName} and thousands of other teachers</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-6 rounded-full shadow-lg shadow-purple-500/25"
              onClick={() => trackEvent("case_study_cta_clicked", { slug, cta: "try_free" })}
            >
              <Link href="/signup">Try Zaza Draft Free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full bg-transparent"
              onClick={() => trackEvent("case_study_cta_clicked", { slug, cta: "view_more" })}
            >
              <Link href="/success-stories">View More Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: study.title,
            description: study.challenge.description,
            author: {
              "@type": "Person",
              name: study.teacherName,
              jobTitle: study.teacherRole,
            },
            publisher: {
              "@type": "Organization",
              name: "Zaza",
            },
            about: {
              "@type": "EducationalOrganization",
              name: study.school,
              address: {
                "@type": "PostalAddress",
                addressLocality: study.location,
              },
            },
          }),
        }}
      />
    </div>
  )
}
