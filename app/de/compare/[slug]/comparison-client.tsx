"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, AlertCircle } from "lucide-react"
import { FAQSection } from "@/components/faq-section"
import Link from "next/link"

interface ComparisonProps {
  comparison: {
    title: string
    competitor: string
    lastUpdated: string
  }
  slug: string
}

export function ComparisonClient({ comparison, slug }: ComparisonProps) {
  const isMagicSchool = slug === "zaza-draft-vs-magicschool"
  const isChatGPT = slug === "zaza-draft-vs-chatgpt"
  const isGrammarly = slug === "zaza-draft-vs-grammarly"

  // Define comparison data based on competitor
  const getComparisonData = () => {
    if (isMagicSchool) {
      return {
        quickSummary: [
          "Best for parent communication & reports: Zaza Draft",
          "Best for lesson planning & classroom activities: MagicSchool",
          "Best for overall flexibility: Try both for different use cases",
        ],
        mainFeatures: [
          {
            feature: "Primary Focus",
            zaza: "Parent communication, reports",
            competitor: "Lesson plans, classroom tools",
          },
          {
            feature: "Parent Email Templates",
            zaza: { icon: "check", text: "50+ specialized" },
            competitor: { icon: "warning", text: "Basic (10-15)" },
          },
          {
            feature: "Report Card Comments",
            zaza: { icon: "check", text: "Advanced generation" },
            competitor: { icon: "check", text: "Good templates" },
          },
          {
            feature: "Lesson Planning",
            zaza: { icon: "warning", text: "Basic (see Zaza Teach)" },
            competitor: { icon: "check", text: "Extensive library" },
          },
          {
            feature: "Translation",
            zaza: { icon: "check", text: "40+ languages" },
            competitor: { icon: "warning", text: "Limited languages" },
          },
          {
            feature: "Tone Guidance",
            zaza: { icon: "check", text: "Advanced sensitivity" },
            competitor: { icon: "warning", text: "Basic" },
          },
          {
            feature: "FERPA Compliance",
            zaza: { icon: "check", text: "Built-in safeguards" },
            competitor: { icon: "check", text: "Compliant" },
          },
          {
            feature: "Pricing (Individual)",
            zaza: "$19/month",
            competitor: "$99/year",
          },
          {
            feature: "Free Trial",
            zaza: { icon: "check", text: "14 days" },
            competitor: { icon: "check", text: "Limited features" },
          },
          {
            feature: "Best For",
            zaza: "Communication-focused",
            competitor: "Lesson-focused",
          },
        ],
        faqs: [
          {
            question: "Can I use both Zaza Draft and MagicSchool together?",
            answer:
              "Many teachers use MagicSchool for lesson planning and Zaza Draft for parent communication. They serve different purposes and complement each other well.",
          },
          {
            question: "Which is better for new teachers?",
            answer:
              "Zaza Draft has a gentler learning curve for communication tasks. MagicSchool offers more tools but requires more time to explore. Both are beginner-friendly.",
          },
          {
            question: "Do both tools work on mobile devices?",
            answer:
              "Yes. Both have mobile-friendly web interfaces. Zaza Draft also offers dedicated iOS and Android apps.",
          },
          {
            question: "Which has better translation features?",
            answer:
              "Zaza Draft supports 40+ languages with high-quality translation for parent communication. MagicSchool offers 8-10 languages focused on instructional content.",
          },
        ],
      }
    } else if (isChatGPT) {
      return {
        quickSummary: [
          "Best for teacher-specific workflows: Zaza Draft",
          "Best for general AI assistance: ChatGPT",
          "Best for compliance & privacy: Zaza Draft with built-in safeguards",
        ],
        mainFeatures: [
          {
            feature: "Primary Focus",
            zaza: "Teacher communication & reports",
            competitor: "General AI assistant",
          },
          {
            feature: "Teacher Templates",
            zaza: { icon: "check", text: "50+ pre-built" },
            competitor: { icon: "warning", text: "Build your own" },
          },
          {
            feature: "Privacy Controls",
            zaza: { icon: "check", text: "FERPA-aware, PII redaction" },
            competitor: { icon: "warning", text: "General data policy" },
          },
          {
            feature: "Tone Guidance",
            zaza: { icon: "check", text: "Teacher-parent specific" },
            competitor: { icon: "warning", text: "General tone options" },
          },
          {
            feature: "Translation",
            zaza: { icon: "check", text: "40+ languages" },
            competitor: { icon: "check", text: "100+ languages" },
          },
          {
            feature: "Learning Curve",
            zaza: "15-20 minutes",
            competitor: "30-45 minutes",
          },
          {
            feature: "Pricing",
            zaza: "$19/month",
            competitor: "$20/month (Plus)",
          },
        ],
        faqs: [
          {
            question: "Is Zaza Draft just ChatGPT with templates?",
            answer:
              "No. While both use AI, Zaza Draft is purpose-built for teachers with FERPA-aware privacy controls, teacher-specific templates, tone guidance for parent communication, and built-in safeguards that ChatGPT doesn't have.",
          },
          {
            question: "Can I use ChatGPT for parent emails?",
            answer:
              "You can, but you'll need to craft prompts carefully each time and manually ensure FERPA compliance. Zaza Draft handles this automatically with pre-built templates and privacy controls.",
          },
          {
            question: "Which is better for lesson planning?",
            answer:
              "ChatGPT offers more flexibility for general lesson planning. For teacher-specific workflows, check out Zaza Teach, which is purpose-built for educators.",
          },
        ],
      }
    } else {
      // Grammarly
      return {
        quickSummary: [
          "Best for teacher communication: Zaza Draft",
          "Best for general writing improvement: Grammarly",
          "Best for education-specific content: Zaza Draft with templates",
        ],
        mainFeatures: [
          {
            feature: "Primary Focus",
            zaza: "Teacher communication & reports",
            competitor: "General writing assistant",
          },
          {
            feature: "Content Generation",
            zaza: { icon: "check", text: "Full drafts from scratch" },
            competitor: { icon: "warning", text: "Editing only" },
          },
          {
            feature: "Teacher Templates",
            zaza: { icon: "check", text: "50+ specialized" },
            competitor: { icon: "x", text: "None" },
          },
          {
            feature: "Tone Adjustment",
            zaza: { icon: "check", text: "Parent-specific guidance" },
            competitor: { icon: "check", text: "General tone detector" },
          },
          {
            feature: "Translation",
            zaza: { icon: "check", text: "40+ languages" },
            competitor: { icon: "x", text: "English only" },
          },
          {
            feature: "Grammar Checking",
            zaza: { icon: "warning", text: "Basic" },
            competitor: { icon: "check", text: "Advanced" },
          },
          {
            feature: "Pricing",
            zaza: "$19/month",
            competitor: "$12-30/month",
          },
        ],
        faqs: [
          {
            question: "Can I use both Zaza Draft and Grammarly together?",
            answer:
              "Yes! Many teachers use Zaza Draft to generate parent emails and reports, then run them through Grammarly for a final grammar check.",
          },
          {
            question: "Does Grammarly generate content like Zaza Draft?",
            answer:
              "No. Grammarly is an editing tool that improves existing text. Zaza Draft generates complete drafts from scratch based on your input.",
          },
          {
            question: "Which is better for report card comments?",
            answer:
              "Zaza Draft is purpose-built for this with specialized templates and personalization. Grammarly can only edit comments you've already written.",
          },
        ],
      }
    }
  }

  const data = getComparisonData()

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">{comparison.title}: Which is Better for Teachers?</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          An honest, feature-by-feature comparison to help you choose the right AI tool for your classroom.
        </p>
        <p className="text-sm text-gray-500">Last Updated: {comparison.lastUpdated}</p>

        {/* Quick Summary Box */}
        <Card className="bg-[#1E293B] border-[#334155] p-6 text-left">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-[#A78BFA]" />
            Quick Summary
          </h2>
          <ul className="space-y-2">
            {data.quickSummary.map((item, index) => (
              <li key={index} className="text-gray-300 flex items-start gap-2">
                <span className="text-[#A78BFA] mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-4 italic">
            We believe in honest comparisons. This page includes both our strengths and where competitors excel.
          </p>
        </Card>
      </div>

      {/* Quick Comparison Table */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Quick Comparison</h2>
        <Card className="bg-[#1E293B] border-[#334155] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0F172A]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Zaza Draft</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">{comparison.competitor}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {data.mainFeatures.map((row, index) => (
                  <tr key={index} className="hover:bg-[#334155]/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{row.feature}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {typeof row.zaza === "string" ? (
                        row.zaza
                      ) : (
                        <div className="flex items-center gap-2">
                          {row.zaza.icon === "check" && <Check className="h-4 w-4 text-green-500" />}
                          {row.zaza.icon === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                          {row.zaza.icon === "x" && <X className="h-4 w-4 text-red-500" />}
                          <span>{row.zaza.text}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {typeof row.competitor === "string" ? (
                        row.competitor
                      ) : (
                        <div className="flex items-center gap-2">
                          {row.competitor.icon === "check" && <Check className="h-4 w-4 text-green-500" />}
                          {row.competitor.icon === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                          {row.competitor.icon === "x" && <X className="h-4 w-4 text-red-500" />}
                          <span>{row.competitor.text}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            <span className="inline-flex items-center gap-1">
              <Check className="h-4 w-4 text-green-500" /> = Strong feature
            </span>
            {" • "}
            <span className="inline-flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-yellow-500" /> = Limited or basic feature
            </span>
            {" • "}
            <span className="inline-flex items-center gap-1">
              <X className="h-4 w-4 text-red-500" /> = Not available
            </span>
          </p>
        </div>
      </div>

      {/* The Verdict */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">So Which Should You Choose?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-[#1E293B] border-[#8B5CF6] p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Choose Zaza Draft if:</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                <span>Parent communication is your biggest time drain</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                <span>You write lots of report cards or student assessments</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                <span>You work with multilingual families</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A78BFA] flex-shrink-0 mt-0.5" />
                <span>Your district has strict compliance requirements</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-[#1E293B] border-[#334155] p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Choose {comparison.competitor} if:</h3>
            <ul className="space-y-3">
              {isMagicSchool && (
                <>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>Lesson planning takes most of your time</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>You need comprehensive classroom activity tools</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>You want one tool for many teaching tasks</span>
                  </li>
                </>
              )}
              {isChatGPT && (
                <>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>You need a general-purpose AI assistant</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>You're comfortable crafting your own prompts</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>You use AI for tasks beyond teaching</span>
                  </li>
                </>
              )}
              {isGrammarly && (
                <>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>You primarily need grammar and style checking</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>You already write your own content</span>
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <Check className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>You want advanced writing improvement suggestions</span>
                  </li>
                </>
              )}
            </ul>
          </Card>
        </div>

        <Card className="bg-[#1E293B] border-[#334155] p-6 mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Try Before You Buy</h3>
          <p className="text-gray-300">
            Both tools offer free trials. We recommend trying both to see which fits your workflow better. There's no
            wrong choice—just different tools for different needs.
          </p>
        </Card>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
        <FAQSection faqs={data.faqs} pageSlug={slug} />
      </div>

      {/* CTA Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] border-0 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Try Zaza Draft</h3>
          <p className="text-white/90 mb-6">14-day free trial, no credit card required</p>
          <Button asChild className="bg-white text-[#8B5CF6] hover:bg-gray-100 font-semibold">
            <Link href="/pricing">Start Free Trial</Link>
          </Button>
          <p className="text-sm text-white/70 mt-4">
            <Link href="/pricing" className="underline hover:text-white">
              See pricing
            </Link>
          </p>
        </Card>

        <Card className="bg-[#1E293B] border-[#334155] p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Need Help Deciding?</h3>
          <p className="text-gray-300 mb-6">Calculate your potential time and cost savings</p>
          <Button
            asChild
            variant="outline"
            className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
          >
            <Link href="/roi-calculator">Calculate Your ROI</Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            <Link href="/contact" className="underline hover:text-gray-300">
              Or talk to our team
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
