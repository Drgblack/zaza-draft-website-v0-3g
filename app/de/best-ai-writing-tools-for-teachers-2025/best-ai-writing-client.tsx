"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { QuickAnswerBox } from "@/components/quick-answer-box"
import { TableOfContents } from "@/components/table-of-contents"
import { FAQSection } from "@/components/faq-section"
import { Check, Star, TrendingUp, X, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function BestAIWritingClient() {
  const { t } = useLanguage()

  const tocItems = [
    { id: "quick-answer", title: "Quick Answer", level: 2 },
    { id: "why-ai-writing", title: "Why AI Writing Tools Matter in 2025", level: 2 },
    { id: "top-tools", title: "Top 10 AI Writing Tools", level: 2 },
    { id: "comparison", title: "Feature Comparison", level: 2 },
    { id: "use-cases", title: "Use Cases by Subject", level: 2 },
    { id: "getting-started", title: "Getting Started Guide", level: 2 },
    { id: "testimonials", title: "Teacher Success Stories", level: 2 },
    { id: "faq", title: "FAQ", level: 2 },
  ]

  const tools = [
    {
      rank: 1,
      name: "Zaza Draft",
      tagline: "Purpose-built for teachers",
      rating: 4.9,
      price: "Free - $12/mo",
      bestFor: "Parent emails, feedback, IEPs",
      pros: ["Teacher-specific templates", "FERPA compliant", "Tone control", "Multi-language"],
      cons: ["Newer platform"],
      link: "/products/draft",
    },
    {
      rank: 2,
      name: "ChatGPT Plus",
      tagline: "Most versatile",
      rating: 4.7,
      price: "$20/mo",
      bestFor: "Lesson planning, creative writing",
      pros: ["Powerful", "Flexible", "Large context"],
      cons: ["Generic", "No templates", "Privacy concerns"],
    },
    {
      rank: 3,
      name: "Claude Pro",
      tagline: "Best for long documents",
      rating: 4.6,
      price: "$20/mo",
      bestFor: "Report cards, curriculum design",
      pros: ["200K context", "Thoughtful", "Safe"],
      cons: ["Slower", "Limited availability"],
    },
    {
      rank: 4,
      name: "Grammarly",
      tagline: "Polish existing writing",
      rating: 4.5,
      price: "Free - $30/mo",
      bestFor: "Editing, grammar checking",
      pros: ["Easy to use", "Browser extension", "Tone detector"],
      cons: ["Not generative", "Expensive premium"],
    },
    {
      rank: 5,
      name: "Jasper",
      tagline: "Marketing-focused",
      rating: 4.3,
      price: "$49/mo",
      bestFor: "Newsletter, announcements",
      pros: ["Templates", "Brand voice", "SEO tools"],
      cons: ["Expensive", "Overkill for teachers"],
    },
  ]

  const useCases = [
    {
      subject: "Elementary",
      tasks: ["Parent newsletters", "Behavior notes", "Progress reports", "Class announcements"],
      recommendedTool: "Zaza Draft",
      why: "Pre-built templates for common elementary scenarios",
    },
    {
      subject: "Middle School",
      tasks: ["Assignment feedback", "Conference prep", "Differentiation plans", "Team emails"],
      recommendedTool: "Zaza Draft + ChatGPT",
      why: "Draft for communication, ChatGPT for lesson planning",
    },
    {
      subject: "High School",
      tasks: ["College rec letters", "Essay feedback", "Curriculum design", "AP prep"],
      recommendedTool: "Claude Pro",
      why: "Handles long documents and nuanced writing",
    },
    {
      subject: "Special Education",
      tasks: ["IEP goals", "Accommodation letters", "Progress monitoring", "Parent communication"],
      recommendedTool: "Zaza Draft",
      why: "FERPA-compliant with special ed templates",
    },
  ]

  const faqs = [
    {
      question: "Are AI writing tools allowed in schools?",
      answer:
        "Yes, but policies vary. Most districts allow teachers to use AI for administrative tasks (emails, reports) but have guidelines for student use. Always check your district policy and ensure student data privacy.",
    },
    {
      question: "Will AI replace teacher writing?",
      answer:
        "No. AI is a drafting tool, not a replacement. Teachers still provide the expertise, judgment, and personal touch. Think of it like spell-check - it helps, but you're still the writer.",
    },
    {
      question: "How do I ensure AI-generated content is accurate?",
      answer:
        "Always review and edit AI output. Use it as a first draft, not a final product. Verify facts, adjust tone, and add personal details. AI can hallucinate or miss context.",
    },
    {
      question: "What about student data privacy?",
      answer:
        "Never input student names, IDs, or sensitive information into generic AI tools. Use education-specific tools like Zaza Draft that are FERPA-compliant and designed for teacher use.",
    },
    {
      question: "Which tool is best for beginners?",
      answer:
        "Start with Zaza Draft if you need teacher-specific templates, or ChatGPT free tier for general writing. Both have gentle learning curves and don't require technical expertise.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#1E293B] to-[#0F172A] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Learning Centre", href: "/learning-centre" },
                { label: "Best AI Writing Tools for Teachers 2025" },
              ]}
            />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 px-4 py-1.5 text-sm font-medium text-[#A78BFA]">
              <TrendingUp className="h-4 w-4" />
              Updated January 2025
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              10 Best AI Writing Tools for Teachers in 2025
            </h1>
            <p className="mb-8 text-balance text-lg text-gray-300 sm:text-xl leading-relaxed">
              Tested by 10,000+ educators. Compare features, pricing, and real classroom results to find the perfect AI
              writing assistant for your teaching workflow.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                <Link href="/products/draft">Try Zaza Draft Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
              >
                <Link href="#comparison">Compare Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="space-y-16">
            {/* Quick Answer */}
            <QuickAnswerBox
              id="quick-answer"
              title="Quick Answer: Best AI Writing Tool for Teachers"
              answer="Zaza Draft is the best AI writing tool for teachers in 2025 because it's purpose-built for education with teacher-specific templates, FERPA compliance, and tone control. For general writing, ChatGPT Plus offers the most versatility. Claude Pro excels at long documents like report cards."
              cta={{
                text: "Try Zaza Draft Free",
                href: "/products/draft",
              }}
            />

            {/* Why AI Writing Tools Matter */}
            <section id="why-ai-writing" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-[#A78BFA]" />
                Why AI Writing Tools Matter in 2025
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                  Teachers spend an average of <strong className="text-white">11 hours per week</strong> on written
                  communication - parent emails, feedback, reports, and documentation. AI writing tools can reduce this
                  by 60-70% while improving quality and consistency.
                </p>
                <p>
                  But not all AI tools are created equal. Generic tools like ChatGPT lack teacher-specific features.
                  Marketing tools like Jasper are overkill. And many tools raise privacy concerns with student data.
                </p>
                <p>
                  This guide compares 10 AI writing tools based on real teacher feedback, focusing on what matters most:
                  ease of use, education-specific features, privacy compliance, and value for money.
                </p>
              </div>
            </section>

            {/* Top 10 Tools */}
            <section id="top-tools" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white">Top 10 AI Writing Tools for Teachers</h2>
              <div className="space-y-6">
                {tools.map((tool) => (
                  <div
                    key={tool.rank}
                    className="rounded-xl border border-white/10 bg-[#1E293B] p-6 hover:border-[#8B5CF6]/50 transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/20"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6] text-base font-bold text-white">
                            {tool.rank}
                          </span>
                          <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
                        </div>
                        <p className="text-base text-gray-400">{tool.tagline}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-[#8B5CF6]/10 px-3 py-1.5 rounded-full">
                        <Star className="h-4 w-4 fill-[#A78BFA] text-[#A78BFA]" />
                        <span className="font-semibold text-white">{tool.rating}</span>
                      </div>
                    </div>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <div className="bg-[#0F172A]/50 rounded-lg p-4 border border-white/5">
                        <p className="mb-1 text-sm font-medium text-gray-400">Price</p>
                        <p className="text-white font-semibold">{tool.price}</p>
                      </div>
                      <div className="bg-[#0F172A]/50 rounded-lg p-4 border border-white/5">
                        <p className="mb-1 text-sm font-medium text-gray-400">Best For</p>
                        <p className="text-white font-semibold">{tool.bestFor}</p>
                      </div>
                    </div>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-3 text-sm font-semibold text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Pros
                        </p>
                        <ul className="space-y-2">
                          {tool.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-semibold text-orange-400 flex items-center gap-2">
                          <X className="w-4 h-4" />
                          Cons
                        </p>
                        <ul className="space-y-2">
                          {tool.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="text-orange-400">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {tool.link && (
                      <Button asChild className="w-full sm:w-auto bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                        <Link href={tool.link}>Learn More</Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">Feature Comparison</h2>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full">
                  <thead className="bg-[#1E293B]">
                    <tr>
                      <th className="p-4 text-left font-semibold text-white border-b border-white/10">Feature</th>
                      <th className="p-4 text-center font-semibold text-white border-b border-white/10">Zaza Draft</th>
                      <th className="p-4 text-center font-semibold text-white border-b border-white/10">ChatGPT</th>
                      <th className="p-4 text-center font-semibold text-white border-b border-white/10">Claude</th>
                      <th className="p-4 text-center font-semibold text-white border-b border-white/10">Grammarly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 bg-[#0F172A]">
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">Teacher Templates</td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center text-gray-500">-</td>
                      <td className="p-4 text-center text-gray-500">-</td>
                      <td className="p-4 text-center text-gray-500">-</td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">FERPA Compliant</td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center text-gray-500">-</td>
                      <td className="p-4 text-center text-gray-500">-</td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">Tone Control</td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center text-gray-400 text-sm">Manual</td>
                      <td className="p-4 text-center text-gray-400 text-sm">Manual</td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">Multi-language</td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center text-gray-400 text-sm">Limited</td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">Free Tier</td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                      <td className="p-4 text-center">
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1E293B]/50 transition-colors">
                      <td className="p-4 font-medium text-gray-300">Price (Premium)</td>
                      <td className="p-4 text-center text-white font-semibold">$12/mo</td>
                      <td className="p-4 text-center text-white font-semibold">$20/mo</td>
                      <td className="p-4 text-center text-white font-semibold">$20/mo</td>
                      <td className="p-4 text-center text-white font-semibold">$30/mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Use Cases */}
            <section id="use-cases" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">Use Cases by Subject & Grade Level</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.subject}
                    className="rounded-xl border border-white/10 bg-[#1E293B] p-6 hover:border-[#8B5CF6]/50 transition-all"
                  >
                    <h3 className="mb-4 text-xl font-bold text-white">{useCase.subject}</h3>
                    <div className="mb-4 space-y-3">
                      <p className="text-sm font-medium text-gray-400">Common Tasks:</p>
                      <ul className="space-y-2">
                        {useCase.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-4">
                      <p className="mb-1 text-sm font-medium text-gray-400">Recommended Tool:</p>
                      <p className="mb-2 font-semibold text-[#A78BFA] text-lg">{useCase.recommendedTool}</p>
                      <p className="text-sm text-gray-300">{useCase.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="scroll-mt-20">
              <h2 className="mb-8 text-3xl font-bold text-white flex items-center gap-3">
                <Zap className="w-8 h-8 text-[#A78BFA]" />
                Getting Started: 5-Minute Setup Guide
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Choose Your Tool",
                    description:
                      "Start with Zaza Draft if you need teacher-specific templates. Try ChatGPT free tier for general writing. Both have no credit card required.",
                  },
                  {
                    step: 2,
                    title: "Start with One Task",
                    description:
                      "Don't try to automate everything at once. Pick one repetitive task (like parent emails) and master it first.",
                  },
                  {
                    step: 3,
                    title: "Review & Edit",
                    description:
                      "Always review AI output. Add personal details, verify facts, and adjust tone. AI is a first draft, not a final product.",
                  },
                  {
                    step: 4,
                    title: "Protect Student Privacy",
                    description:
                      "Never input student names or sensitive data into generic AI tools. Use education-specific tools or anonymize information.",
                  },
                  {
                    step: 5,
                    title: "Expand Gradually",
                    description:
                      "Once comfortable, add more use cases. Most teachers save 5-8 hours per week within a month of consistent use.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 bg-[#1E293B] rounded-xl p-6 border border-white/10 hover:border-[#8B5CF6]/50 transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] text-xl font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="scroll-mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">Teacher Success Stories</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    quote:
                      "Zaza Draft cut my parent email time from 2 hours to 30 minutes per week. The templates understand teacher language and the tone control is perfect for sensitive situations.",
                    name: "Sarah M.",
                    role: "4th Grade Teacher, Texas",
                  },
                  {
                    quote:
                      "I use ChatGPT for lesson planning and Zaza Draft for parent communication. Together they save me 6-7 hours per week. Game changer for work-life balance.",
                    name: "Michael T.",
                    role: "High School English, California",
                  },
                ].map((testimonial, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 p-6"
                  >
                    <div className="mb-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#A78BFA] text-[#A78BFA]" />
                      ))}
                    </div>
                    <p className="mb-4 text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <FAQSection
              id="faq"
              title="Frequently Asked Questions"
              faqs={faqs}
              schemaContext="AI Writing Tools for Teachers"
            />

            {/* Final CTA */}
            <section className="rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/10 p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">Ready to Save 5+ Hours Per Week?</h2>
              <p className="mb-6 text-balance text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Join 10,000+ teachers using Zaza Draft to write better parent emails, feedback, and reports in half the
                time.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                  <Link href="/products/draft">Start Free Trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-[#8B5CF6] text-[#A78BFA] hover:bg-[#8B5CF6]/10 bg-transparent"
                >
                  <Link href="/best-ai-tool-parent-emails">See Parent Email Guide</Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <TableOfContents items={tocItems} />

            {/* Related Resources */}
            <div className="rounded-xl border border-white/10 bg-[#1E293B] p-6">
              <h3 className="mb-4 font-semibold text-white">Related Guides</h3>
              <div className="space-y-3">
                <Link
                  href="/best-ai-tool-parent-emails"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  → Best AI Tool for Parent Emails
                </Link>
                <Link
                  href="/reduce-stress-parent-messages"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  → Reduce Stress with AI Messages
                </Link>
                <Link
                  href="/ai-for-student-reports"
                  className="block text-sm text-[#A78BFA] hover:text-[#8B5CF6] transition-colors"
                >
                  → AI for Student Reports
                </Link>
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/20 to-[#A78BFA]/10 p-6">
              <h3 className="mb-2 font-semibold text-white">Try Zaza Draft</h3>
              <p className="mb-4 text-sm text-gray-300">Purpose-built for teachers. FERPA compliant. Free to start.</p>
              <Button asChild className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                <Link href="/products/draft">Start Free</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
