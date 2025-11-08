"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { QuickAnswerBox } from "@/components/quick-answer-box"
import { TableOfContents } from "@/components/table-of-contents"
import { FAQSection } from "@/components/faq-section"
import { Check, AlertTriangle, Shield, Clock, Star, Zap, FileText, Calendar } from "lucide-react"

export default function AIStudentReportsClient() {
  const { t } = useLanguage()

  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && (window as any).analytics) {
      ;(window as any).analytics.track("cornerstone_page_viewed", {
        page_slug: "ai-for-student-reports",
        locale: "en",
        referrer: document.referrer,
      })
    }
  }, [])

  const tocItems = [
    { id: "stress", title: "Why report writing causes stress", level: 1 },
    { id: "ai-helps", title: "How AI saves 60-70% of time", level: 1 },
    { id: "privacy", title: "Privacy & FERPA compliance", level: 1 },
    { id: "process", title: "Step-by-step process", level: 1 },
    { id: "templates", title: "Report templates by grade", level: 1 },
    { id: "examples", title: "Before & after examples", level: 1 },
    { id: "mistakes", title: "Common mistakes to avoid", level: 1 },
    { id: "testimonials", title: "Teacher results", level: 1 },
  ]

  const reportTypes = [
    {
      type: "Progress Reports",
      frequency: "Quarterly",
      timeWithoutAI: "15-20 min per student",
      timeWithAI: "5-7 min per student",
      savings: "60-70%",
      bestTool: "Zaza Draft",
    },
    {
      type: "Report Cards",
      frequency: "Semester/Trimester",
      timeWithoutAI: "20-30 min per student",
      timeWithAI: "8-12 min per student",
      savings: "60%",
      bestTool: "Claude Pro",
    },
    {
      type: "IEP Progress",
      frequency: "Monthly/Quarterly",
      timeWithoutAI: "30-45 min per student",
      timeWithAI: "12-18 min per student",
      savings: "60%",
      bestTool: "Zaza Draft",
    },
    {
      type: "Parent Conferences",
      frequency: "2x per year",
      timeWithoutAI: "10-15 min per student",
      timeWithAI: "3-5 min per student",
      savings: "70%",
      bestTool: "Zaza Draft",
    },
  ]

  const privacyRules = [
    {
      rule: "Never use student names",
      why: "Protects identity and FERPA compliance",
      instead: 'Use "the student" or initials only',
      icon: Shield,
    },
    {
      rule: "Anonymize specific details",
      why: "Prevents re-identification",
      instead: "Use general descriptions, not unique identifiers",
      icon: AlertTriangle,
    },
    {
      rule: "Use education-specific tools",
      why: "FERPA-compliant data handling",
      instead: "Zaza Draft, not generic ChatGPT",
      icon: Check,
    },
    {
      rule: "Review all AI output",
      why: "Ensure accuracy and appropriateness",
      instead: "Edit before sending to parents",
      icon: Check,
    },
  ]

  const templates = [
    {
      title: "Elementary Progress Report",
      grade: "K-5",
      prompt: `Write a progress report for a [grade] student showing [strength area] and needing support in [growth area]. Tone: encouraging and specific. Include: academic progress, social-emotional development, and next steps for parents.`,
      example:
        "Student shows strong reading comprehension skills and participates actively in class discussions. Working on math fact fluency - practice at home would help. Socially, student is kind and inclusive with peers.",
    },
    {
      title: "Middle School Report Card",
      grade: "6-8",
      prompt: `Write a report card comment for a [grade] [subject] student. Current grade: [letter]. Strengths: [list]. Areas for growth: [list]. Tone: balanced and constructive.`,
      example:
        "Student demonstrates solid understanding of core concepts and completes assignments on time. To reach the next level, focus on showing work in problem-solving and asking questions when stuck.",
    },
    {
      title: "High School Progress Report",
      grade: "9-12",
      prompt: `Write a progress report for a [grade] [subject] student. Current performance: [description]. College-readiness focus. Tone: professional and forward-looking.`,
      example:
        "Student exhibits strong analytical skills in essay writing and contributes thoughtful perspectives to class discussions. To strengthen college applications, consider taking on leadership roles in group projects.",
    },
    {
      title: "IEP Progress Report",
      grade: "All",
      prompt: `Write an IEP progress report for goal: [goal description]. Current level: [baseline]. Progress: [description]. Data: [specific metrics]. Tone: objective and data-driven.`,
      example:
        "Student has made measurable progress toward the goal of reading 80 words per minute. Current level: 65 wpm (up from 45 wpm baseline). Continues to benefit from small group instruction and visual supports.",
    },
  ]

  const beforeAfter = [
    {
      before: "Student is doing okay in math. Sometimes struggles with word problems. Needs to work harder.",
      after:
        "Student demonstrates solid computational skills and completes practice problems accurately. To build confidence with word problems, we're working on identifying key information and drawing visual representations. Practice at home with real-world math scenarios (cooking, shopping) would reinforce these strategies.",
      improvement: "More specific, actionable, and encouraging",
    },
    {
      before: "Good student. Participates in class. Keep up the good work.",
      after:
        "Student consistently contributes thoughtful ideas during class discussions and demonstrates strong critical thinking skills. Their recent project on ecosystems showed excellent research and presentation abilities. To continue growing, I encourage taking on more leadership roles in group work.",
      improvement: "Specific examples and clear next steps",
    },
  ]

  const mistakes = [
    {
      mistake: "Using student names in AI prompts",
      why: "FERPA violation and privacy risk",
      fix: 'Use "the student" or anonymous descriptors',
    },
    {
      mistake: "Copying AI output without editing",
      why: "May contain errors or inappropriate language",
      fix: "Always review, personalize, and verify accuracy",
    },
    {
      mistake: "Generic, vague comments",
      why: "Not helpful for parents or students",
      fix: "Add specific examples and actionable next steps",
    },
    {
      mistake: "Only focusing on negatives",
      why: "Discouraging and unbalanced",
      fix: "Start with strengths, then growth areas with support plan",
    },
    {
      mistake: "Using jargon or edu-speak",
      why: "Parents may not understand",
      fix: "Use plain language and explain technical terms",
    },
  ]

  const faqs = [
    {
      question: "Is it ethical to use AI for student reports?",
      answer:
        "Yes, when used properly. AI is a drafting tool that helps you write more efficiently and consistently. You still provide the observations, judgment, and personal touch. Think of it like spell-check - it assists, but you're still the author.",
    },
    {
      question: "How do I protect student privacy when using AI?",
      answer:
        "Never input student names or identifying information. Use education-specific tools like Zaza Draft that are FERPA-compliant. Anonymize all details and review output before sending. See our Privacy Guidelines section for complete rules.",
    },
    {
      question: "Will parents know I used AI?",
      answer:
        "Not if you edit and personalize the output. AI provides a strong first draft, but you add specific examples, adjust tone, and ensure accuracy. The final report should sound like you, not a robot.",
    },
    {
      question: "What if AI makes a mistake?",
      answer:
        "Always review AI output carefully. AI can hallucinate facts or miss context. You're the expert on your students - verify all claims, add missing details, and adjust anything that doesn't sound right.",
    },
    {
      question: "How much time can I really save?",
      answer:
        "Most teachers save 60-70% of report writing time. For a class of 25 students, that's 4-6 hours saved per reporting period. The key is using templates and reviewing efficiently rather than writing from scratch.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[{ label: "Learning Centre", href: "/learning-centre" }, { label: "AI for Student Reports" }]}
        />

        <QuickAnswerBox answer="Use AI to draft student reports by providing anonymous observations (no names), reviewing and personalizing the output, and adding specific examples. Use FERPA-compliant tools like Zaza Draft. Most teachers save 60-70% of report writing time while improving quality and consistency." />

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{t("aiStudentReports.title")}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last updated: October 15, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#A78BFA]" />
              <span className="text-[#A78BFA]">FERPA-Compliant Guide</span>
            </div>
          </div>
        </header>

        <TableOfContents items={tocItems} />

        <article className="prose prose-invert prose-lg max-w-none">
          {/* Why Report Writing Causes Stress */}
          <section id="stress" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-[#A78BFA]" />
              Why Report Writing Causes Teacher Stress
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Writing student reports is one of the most time-consuming tasks in teaching. For a class of 25 students,
                report cards can take <strong className="text-white">8-12 hours</strong> of focused writing time.
                Multiply that by 2-4 reporting periods per year, and you're spending{" "}
                <strong className="text-white">30-50 hours annually</strong> on reports alone.
              </p>
              <p>The pressure comes from multiple sources:</p>
              <ul className="space-y-2 ml-6 text-gray-300">
                <li>
                  <strong className="text-white">Writer's block:</strong> Staring at a blank page for each student
                </li>
                <li>
                  <strong className="text-white">Consistency challenges:</strong> Maintaining similar tone and structure
                  across 25+ reports
                </li>
                <li>
                  <strong className="text-white">Mental fatigue:</strong> By student #15, your brain is exhausted
                </li>
                <li>
                  <strong className="text-white">Professional pressure:</strong> Every word will be read by parents and
                  administrators
                </li>
              </ul>
            </div>
          </section>

          {/* How AI Saves 60-70% of Time */}
          <section id="ai-helps" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-[#A78BFA]" />
              How AI Saves 60-70% of Time
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                AI can reduce the time spent writing reports by up to 60-70%. For instance, writing a progress report
                for a student can take <strong className="text-white">5-7 minutes</strong> with AI, compared to{" "}
                <strong className="text-white">15-20 minutes</strong> without AI.
              </p>
              <p>Here's how AI can help:</p>
              <ul className="space-y-2 ml-6 text-gray-300">
                <li>
                  <strong className="text-white">Drafts Quickly:</strong> AI generates drafts in a fraction of the time
                  it takes to write manually.
                </li>
                <li>
                  <strong className="text-white">Consistent Language:</strong> Ensures that all reports maintain a
                  similar tone and structure.
                </li>
                <li>
                  <strong className="text-white">Professional Phrasing:</strong> Provides more specific, actionable, and
                  professional language.
                </li>
                <li>
                  <strong className="text-white">Reduces Mental Fatigue:</strong> Lessens the mental strain during
                  report writing season.
                </li>
              </ul>
            </div>
          </section>

          {/* Privacy & FERPA Compliance */}
          <section id="privacy" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#A78BFA]" />
              Privacy & FERPA Compliance
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Protecting student privacy is crucial when using AI for reports. Follow these guidelines to ensure
                compliance with FERPA:
              </p>
              <ul className="space-y-2 ml-6 text-gray-300">
                <li>
                  <strong className="text-white">Never Use Student Names:</strong> Use "the student" or initials only.
                </li>
                <li>
                  <strong className="text-white">Anonymize Specific Details:</strong> Avoid using unique identifiers.
                </li>
                <li>
                  <strong className="text-white">Use Education-Specific Tools:</strong> Opt for tools like Zaza Draft
                  that are FERPA-compliant.
                </li>
                <li>
                  <strong className="text-white">Review All AI Output:</strong> Always edit and verify the content
                  before finalizing it.
                </li>
              </ul>
            </div>
          </section>

          {/* Step-by-Step Process */}
          <section id="process" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Check className="w-8 h-8 text-[#A78BFA]" />
              Step-by-Step Process
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Gather Your Observations</h3>
                  <p className="mb-2">
                    Collect your notes on each student: strengths, growth areas, specific examples, and data points.
                    This is your expertise - AI can't replace it.
                  </p>
                  <div className="rounded-lg bg-muted p-4 text-sm text-gray-300">
                    <p className="font-medium mb-1">Example notes:</p>
                    <ul className="space-y-1">
                      <li>• Strong in reading comprehension (scored 85% on last assessment)</li>
                      <li>• Struggles with math fact fluency (still counting on fingers)</li>
                      <li>• Excellent class participation and peer collaboration</li>
                      <li>• Needs reminders to stay on task during independent work</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Use a Template Prompt</h3>
                  <p className="mb-2">
                    Input your observations into a structured prompt. Never use student names - use "the student" or
                    "this learner" instead.
                  </p>
                  <div className="rounded-lg bg-muted p-4 text-sm text-gray-300">
                    <p className="font-medium mb-1">Template:</p>
                    <p>
                      "Write a progress report for a 4th grade student. Strengths: [your observations]. Growth areas:
                      [your observations]. Tone: encouraging and specific. Include next steps for parents."
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Review & Personalize</h3>
                  <p>
                    Read the AI draft carefully. Add specific examples, adjust tone, verify accuracy, and ensure it
                    sounds like you. This step is crucial - never skip it.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Add Student Name & Send</h3>
                  <p>
                    Only after reviewing and editing, add the student's name to the final report. Copy into your
                    school's reporting system and submit.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Report Templates by Grade */}
          <section id="templates" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#A78BFA]" />
              Report Templates by Grade Level
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              {templates.map((template) => (
                <div key={template.title} className="rounded-lg border bg-card p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{template.title}</h3>
                      <p className="text-sm text-gray-400">Grade Level: {template.grade}</p>
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg bg-muted p-4 text-gray-300">
                    <p className="mb-1 text-sm font-medium">Prompt Template:</p>
                    <p className="text-sm">{template.prompt}</p>
                  </div>

                  <div className="rounded-lg bg-primary/5 p-4 text-gray-300">
                    <p className="mb-1 text-sm font-medium">Example Output:</p>
                    <p className="text-sm">{template.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Before & After Examples */}
          <section id="examples" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#A78BFA]" />
              Before & After Examples
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              {beforeAfter.map((example, index) => (
                <div key={index} className="rounded-lg border bg-card p-6">
                  <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
                    <p className="mb-1 text-sm font-medium text-red-900 dark:text-red-100">Before (Generic):</p>
                    <p className="text-sm text-red-800 dark:text-red-200">{example.before}</p>
                  </div>
                  <div className="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
                    <p className="mb-1 text-sm font-medium text-green-900 dark:text-green-100">After (AI-Enhanced):</p>
                    <p className="text-sm text-green-800 dark:text-green-200">{example.after}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{example.improvement}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes to Avoid */}
          <section id="mistakes" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-[#A78BFA]" />
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              {mistakes.map((mistake) => (
                <div key={mistake.mistake} className="flex gap-4 rounded-lg border bg-card p-6">
                  <AlertTriangle className="h-6 w-6 shrink-0 text-orange-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-orange-900 dark:text-orange-100">{mistake.mistake}</h3>
                    <p className="mb-2">{mistake.why}</p>
                    <p>
                      <span className="font-medium text-primary">Fix:</span> {mistake.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Teacher Results */}
          <section id="testimonials" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Star className="w-8 h-8 text-[#A78BFA]" />
              Teacher Results
            </h2>
            <div className="grid gap-6 md:grid-cols-2 text-gray-300 leading-relaxed">
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4">
                  "Report card season used to be my most dreaded time of year. With Zaza Draft, I finished 25 report
                  cards in 3 hours instead of 8. The quality actually improved because I had more energy to personalize
                  each one."
                </p>
                <p className="font-semibold text-white">Jennifer L.</p>
                <p className="text-sm text-gray-400">3rd Grade Teacher, Ohio</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4">
                  "As a special ed teacher, IEP progress reports were taking 30-45 minutes each. Now I can draft them in
                  12-15 minutes while maintaining the data-driven language required. Game changer."
                </p>
                <p className="font-semibold text-white">Marcus T.</p>
                <p className="text-sm text-gray-400">Special Education Teacher, Florida</p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <FAQSection
            id="faq"
            title="Frequently Asked Questions"
            faqs={faqs}
            schemaContext="AI for Student Reports"
            className="text-gray-300"
          />
        </article>
      </div>
    </div>
  )
}
