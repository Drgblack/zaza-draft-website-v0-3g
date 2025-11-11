"use client";

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, FileText, Star, Calendar, CheckCircle, ArrowLeft, Share2 } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

const resourceData: Record<string, any> = {
  "parent-email-templates": {
    title: "25 Parent Email Templates",
    description: "Ready-to-use email templates for common parent communication scenarios",
    longDescription:
      "This comprehensive collection includes 25 professionally written email templates covering the most common parent communication scenarios teachers face. Each template is customizable and includes guidance on tone, timing, and follow-up strategies.",
    category: "Parent Communication",
    format: "PDF",
    fileSize: "2.4 MB",
    pages: 32,
    downloads: 12453,
    rating: 4.9,
    reviews: 342,
    lastUpdated: "2025-01-15",
    whatInside: [
      "Progress update templates (positive and concerning)",
      "Behavior concern communication",
      "Meeting request templates",
      "Thank you and appreciation emails",
      "Homework and assignment reminders",
      "Event and field trip notifications",
      "End-of-year reflection templates",
    ],
    preview: `Subject: Quick Update on [Student Name]'s Progress

Dear [Parent Name],

I wanted to reach out with a quick update on [Student Name]'s progress in [Subject/Class]. Over the past few weeks, I've noticed [specific positive observation].

[Student Name] has been particularly strong in [specific skill/area], and I'm excited to see their continued growth. To support their learning at home, you might consider [specific suggestion].

Please don't hesitate to reach out if you have any questions or would like to discuss [Student Name]'s progress further.

Best regards,
[Your Name]`,
    relatedResources: [
      { title: "Parent Conference Scripts", slug: "parent-conference-scripts" },
      { title: "Behavior Intervention Plans", slug: "behavior-intervention-plans" },
    ],
  },
  "prompt-engineering-guide": {
    title: "Prompt Engineering for Teachers",
    description: "Complete guide to writing effective AI prompts for educational contexts",
    longDescription:
      "Master the art of prompt engineering with this comprehensive guide designed specifically for educators. Learn how to craft prompts that generate high-quality, relevant content for your classroom needs.",
    category: "Prompt Templates",
    format: "PDF",
    fileSize: "3.8 MB",
    pages: 48,
    downloads: 10892,
    rating: 4.8,
    reviews: 287,
    lastUpdated: "2025-01-10",
    whatInside: [
      "Fundamentals of prompt engineering",
      "50+ example prompts for common teaching tasks",
      "Prompt templates for differentiation",
      "Advanced techniques (chain-of-thought, few-shot learning)",
      "Troubleshooting common prompt issues",
      "Subject-specific prompt strategies",
      "Ethical considerations and best practices",
    ],
    preview: `Example Prompt Template:

"Create a [grade level] lesson plan on [topic] that:
- Aligns with [specific standard]
- Includes [number] differentiated activities
- Incorporates [specific teaching strategy]
- Takes approximately [time] to complete
- Includes formative assessment opportunities

Format the lesson plan with clear sections for objectives, materials, procedures, and assessment."`,
    relatedResources: [
      { title: "Differentiation Prompt Library", slug: "differentiation-prompts" },
      { title: "Lesson Plan Templates", slug: "lesson-plan-templates" },
    ],
  },
  "lesson-plan-templates": {
    title: "AI-Enhanced Lesson Plan Templates",
    description: "10 customizable lesson plan templates with AI integration points",
    longDescription:
      "Transform your lesson planning with these 10 professionally designed templates that seamlessly integrate AI assistance. Each template includes clear AI integration points and customization guidance.",
    category: "Lesson Planning",
    format: "DOCX",
    fileSize: "1.2 MB",
    pages: 24,
    downloads: 9234,
    rating: 4.7,
    reviews: 198,
    lastUpdated: "2025-01-08",
    whatInside: [
      "Standard lesson plan template",
      "Differentiated instruction template",
      "Project-based learning template",
      "Flipped classroom template",
      "Inquiry-based learning template",
      "Socratic seminar template",
      "Station rotation template",
      "Assessment-focused template",
      "Cross-curricular template",
      "Emergency sub plan template",
    ],
    preview: `Lesson Plan Template Structure:

1. Learning Objectives (AI can help: refine language, align to standards)
2. Materials & Resources (AI can help: suggest alternatives, find resources)
3. Anticipatory Set (AI can help: generate engaging hooks)
4. Direct Instruction (AI can help: create examples, explanations)
5. Guided Practice (AI can help: design scaffolded activities)
6. Independent Practice (AI can help: differentiate assignments)
7. Closure (AI can help: create reflection prompts)
8. Assessment (AI can help: generate rubrics, exit tickets)`,
    relatedResources: [
      { title: "Assessment Rubrics", slug: "assessment-rubrics" },
      { title: "Differentiation Prompts", slug: "differentiation-prompts" },
    ],
  },
}

export default function ResourceDetailClient({ slug }: { slug: string }) {
  const [email, setEmail] = useState("")
  const [downloaded, setDownloaded] = useState(false)

  const resource = resourceData[slug]

  if (!resource) {
    return <div>Resource not found</div>
  }

  const handleDownload = () => {
    trackEvent("resource_download", {
      resource_slug: slug,
      resource_title: resource.title,
      email,
    })
    setDownloaded(true)
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Breadcrumb */}
      <div className="border-b border-gray-800 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/ai-literacy/resources"
            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resource Library
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-sm text-purple-400 font-semibold">{resource.category}</span>
              <h1 className="text-4xl font-bold text-white mt-2 mb-4">{resource.title}</h1>
              <p className="text-xl text-gray-300">{resource.description}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                {resource.downloads.toLocaleString()} downloads
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                {resource.rating} ({resource.reviews} reviews)
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Updated {new Date(resource.lastUpdated).toLocaleDateString()}
              </span>
            </div>

            {/* Long Description */}
            <Card className="bg-[#1A1F35] border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About This Resource</h2>
              <p className="text-gray-300 leading-relaxed">{resource.longDescription}</p>
            </Card>

            {/* What's Inside */}
            <Card className="bg-[#1A1F35] border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What's Inside</h2>
              <ul className="space-y-3">
                {resource.whatInside.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Preview */}
            <Card className="bg-[#1A1F35] border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Preview</h2>
              <pre className="bg-[#0A0F1E] p-4 rounded-lg text-gray-300 text-sm overflow-x-auto whitespace-pre-wrap">
                {resource.preview}
              </pre>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#1A1F35] border-gray-700 p-6 sticky top-4">
              {!downloaded ? (
                <>
                  <h3 className="text-xl font-bold text-white mb-4">Download This Resource</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Format:</span>
                      <span className="text-white font-semibold">{resource.format}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">File Size:</span>
                      <span className="text-white font-semibold">{resource.fileSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Pages:</span>
                      <span className="text-white font-semibold">{resource.pages}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0A0F1E] border-gray-700 text-white"
                    />
                  </div>

                  <Button
                    onClick={handleDownload}
                    disabled={!email}
                    className="w-full bg-purple-600 hover:bg-purple-700 mb-4"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Free
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Free for all Zaza Draft users. No credit card required.
                  </p>
                </>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Download Started!</h3>
                  <p className="text-gray-400 mb-4">Check your email for the download link.</p>
                  <Button variant="outline" className="border-gray-600 text-white bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Resource
                  </Button>
                </div>
              )}

              {/* Related Resources */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-lg font-bold text-white mb-4">Related Resources</h4>
                <div className="space-y-3">
                  {resource.relatedResources.map((related: any) => (
                    <Link
                      key={related.slug}
                      href={`/ai-literacy/resources/${related.slug}`}
                      className="block p-3 bg-[#0A0F1E] rounded-lg hover:bg-[#252B45] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">{related.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
