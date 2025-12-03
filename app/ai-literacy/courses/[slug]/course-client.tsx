"use client";

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, CheckCircle2, Download, Play, Lock, Users, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

interface CourseProps {
  slug: string
  course: {
    title: string
    description: string
    level: string
    duration: string
    lessons: number
  }
}

const courseContent: Record<string, any> = {
  "ai-basics-for-teachers": {
    instructor: "Dr. Sarah Chen",
    instructorBio: "Former high school teacher with 15 years of experience, now leading AI education initiatives.",
    enrolled: 12847,
    rating: 4.9,
    reviews: 2341,
    learningOutcomes: [
      "Understand what AI is and how it works at a fundamental level",
      "Identify practical AI applications in education",
      "Evaluate AI tools for classroom use",
      "Address common misconceptions about AI",
      "Explain AI capabilities and limitations to students and parents",
    ],
    curriculum: [
      {
        module: "Module 1: What is AI?",
        lessons: [
          { title: "Introduction to Artificial Intelligence", duration: "12 min", type: "video", locked: false },
          { title: "Machine Learning vs. Traditional Programming", duration: "15 min", type: "video", locked: false },
          { title: "Quiz: AI Fundamentals", duration: "5 min", type: "quiz", locked: false },
        ],
      },
      {
        module: "Module 2: AI in Education",
        lessons: [
          { title: "Current AI Applications in Schools", duration: "18 min", type: "video", locked: true },
          { title: "Benefits and Challenges", duration: "14 min", type: "video", locked: true },
          { title: "Case Study: AI Success Stories", duration: "10 min", type: "reading", locked: true },
        ],
      },
      {
        module: "Module 3: Hands-On Practice",
        lessons: [
          { title: "Trying Your First AI Tool", duration: "20 min", type: "interactive", locked: true },
          { title: "Final Project: AI Integration Plan", duration: "30 min", type: "project", locked: true },
        ],
      },
    ],
    prerequisites: "None - this course is designed for complete beginners",
    certificate: true,
    downloadableResources: [
      "AI Terminology Cheat Sheet (PDF)",
      "AI Tools Comparison Matrix (Excel)",
      "Parent Communication Templates (Word)",
      "Lesson Plan Integration Guide (PDF)",
    ],
  },
  "prompt-engineering-fundamentals": {
    instructor: "Michael Rodriguez",
    instructorBio: "AI prompt engineer and former middle school teacher specializing in practical AI applications.",
    enrolled: 15234,
    rating: 4.8,
    reviews: 3102,
    learningOutcomes: [
      "Write clear, effective prompts that get better AI responses",
      "Use the CRAFT framework for prompt engineering",
      "Apply prompt patterns for common teaching tasks",
      "Troubleshoot and refine prompts that aren't working",
      "Create reusable prompt templates for your workflow",
    ],
    curriculum: [
      {
        module: "Module 1: Prompt Basics",
        lessons: [
          { title: "What Makes a Good Prompt?", duration: "10 min", type: "video", locked: false },
          { title: "The CRAFT Framework", duration: "15 min", type: "video", locked: false },
          { title: "Practice: Writing Your First Prompts", duration: "20 min", type: "interactive", locked: false },
        ],
      },
      {
        module: "Module 2: Prompt Patterns",
        lessons: [
          { title: "Role-Based Prompts", duration: "12 min", type: "video", locked: true },
          { title: "Few-Shot Learning", duration: "14 min", type: "video", locked: true },
          { title: "Chain-of-Thought Prompting", duration: "16 min", type: "video", locked: true },
          { title: "Quiz: Prompt Patterns", duration: "8 min", type: "quiz", locked: true },
        ],
      },
      {
        module: "Module 3: Advanced Techniques",
        lessons: [
          { title: "Prompt Chaining for Complex Tasks", duration: "18 min", type: "video", locked: true },
          { title: "Debugging Bad Prompts", duration: "15 min", type: "video", locked: true },
          { title: "Final Project: Build Your Prompt Library", duration: "45 min", type: "project", locked: true },
        ],
      },
    ],
    prerequisites: "AI Basics for Teachers (recommended but not required)",
    certificate: true,
    downloadableResources: [
      "CRAFT Framework Template (PDF)",
      "50 Prompt Templates for Teachers (Word)",
      "Prompt Troubleshooting Checklist (PDF)",
      "Prompt Pattern Library (PDF)",
    ],
  },
  "ai-for-parent-communication": {
    instructor: "Jennifer Martinez",
    instructorBio: "Elementary school principal and parent communication expert with 20 years in education.",
    enrolled: 9876,
    rating: 4.9,
    reviews: 1823,
    learningOutcomes: [
      "Write empathetic, clear parent emails in minutes instead of hours",
      "Adapt communication style for different situations and audiences",
      "Handle sensitive topics with AI assistance while maintaining authenticity",
      "Create templates for common parent communication scenarios",
      "Maintain your personal voice while using AI tools",
    ],
    curriculum: [
      {
        module: "Module 1: Parent Communication Fundamentals",
        lessons: [
          { title: "Why Parent Communication Matters", duration: "10 min", type: "video", locked: false },
          { title: "Common Communication Challenges", duration: "12 min", type: "video", locked: false },
          { title: "How AI Can Help (and Where It Can't)", duration: "14 min", type: "video", locked: false },
        ],
      },
      {
        module: "Module 2: AI-Assisted Email Writing",
        lessons: [
          { title: "Positive Updates and Celebrations", duration: "15 min", type: "video", locked: true },
          { title: "Addressing Concerns and Challenges", duration: "18 min", type: "video", locked: true },
          { title: "Progress Reports and Check-Ins", duration: "16 min", type: "video", locked: true },
          { title: "Practice: Write 3 Parent Emails", duration: "30 min", type: "interactive", locked: true },
        ],
      },
      {
        module: "Module 3: Advanced Scenarios",
        lessons: [
          { title: "Difficult Conversations", duration: "20 min", type: "video", locked: true },
          { title: "Cultural Sensitivity and Inclusivity", duration: "15 min", type: "video", locked: true },
          {
            title: "Final Project: Your Communication Template Library",
            duration: "40 min",
            type: "project",
            locked: true,
          },
        ],
      },
    ],
    prerequisites: "Prompt Engineering Fundamentals (recommended)",
    certificate: true,
    downloadableResources: [
      "25 Parent Email Templates (Word)",
      "Tone and Style Guide (PDF)",
      "Difficult Conversation Framework (PDF)",
      "Multilingual Communication Tips (PDF)",
    ],
  },
}

export default function CourseClient({ slug, course }: CourseProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "reviews">("overview")
  const content = courseContent[slug] || courseContent["ai-basics-for-teachers"]

  const handleEnroll = () => {
    trackEvent("course_enroll_clicked", {
      course_slug: slug,
      course_title: course.title,
      course_level: course.level,
    })
    // Trigger signup modal
    window.dispatchEvent(new CustomEvent("openSignupModal"))
  }

  const handleStartFreeLessons = () => {
    trackEvent("free_lessons_started", {
      course_slug: slug,
      course_title: course.title,
    })
  }

  const handleDownloadResource = (resource: string) => {
    trackEvent("course_resource_downloaded", {
      course_slug: slug,
      resource_name: resource,
    })
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Breadcrumbs */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#A78BFA] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/ai-literacy" className="hover:text-[#A78BFA] transition-colors">
              AI Literacy
            </Link>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/ai-literacy"
            className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-[#8B5CF6] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AI Literacy
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="inline-block px-3 py-1 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full text-[#A78BFA] text-sm font-medium mb-4">
                {course.level}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#A78BFA]" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#A78BFA]" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#A78BFA]" />
                  <span>{content.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#A78BFA]" />
                  <span>Certificate included</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-semibold">{content.rating}</span>
                  <span className="text-gray-400">({content.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-white mb-2">Free</div>
                  <p className="text-gray-400">with Zaza Draft account</p>
                </div>

                <Button
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white font-semibold py-6 text-lg mb-3"
                >
                  Enroll Now
                </Button>

                <Button
                  onClick={handleStartFreeLessons}
                  variant="outline"
                  className="w-full border-[#A78BFA]/30 text-[#A78BFA] hover:bg-[#A78BFA]/10 bg-transparent"
                >
                  Start Free Lessons
                </Button>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Community forum access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-[#A78BFA] text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === "curriculum"
                  ? "border-[#A78BFA] text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-[#A78BFA] text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Learning Outcomes */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
                  <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                    <ul className="space-y-3">
                      {content.learningOutcomes.map((outcome: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Prerequisites</h2>
                  <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300">{content.prerequisites}</p>
                  </div>
                </div>

                {/* Downloadable Resources */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Downloadable Resources</h2>
                  <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                    <ul className="space-y-3">
                      {content.downloadableResources.map((resource: string, index: number) => (
                        <li key={index} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-[#A78BFA]" />
                            <span className="text-gray-300">{resource}</span>
                          </div>
                          <button
                            onClick={() => handleDownloadResource(resource)}
                            className="text-[#A78BFA] hover:text-[#8B5CF6] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Download
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instructor */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Your Instructor</h2>
                  <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        {content.instructor.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{content.instructor}</h3>
                        <p className="text-gray-300">{content.instructorBio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Course Curriculum</h2>
                {content.curriculum.map((module: any, moduleIndex: number) => (
                  <div key={moduleIndex} className="bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                      <h3 className="text-xl font-semibold text-white">{module.module}</h3>
                      <p className="text-gray-400 text-sm mt-1">{module.lessons.length} lessons</p>
                    </div>
                    <div className="divide-y divide-white/10">
                      {module.lessons.map((lesson: any, lessonIndex: number) => (
                        <div
                          key={lessonIndex}
                          className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.locked ? (
                              <Lock className="w-5 h-5 text-gray-500" />
                            ) : (
                              <Play className="w-5 h-5 text-[#A78BFA]" />
                            )}
                            <div>
                              <div className="text-white font-medium">{lesson.title}</div>
                              <div className="text-gray-400 text-sm flex items-center gap-2">
                                <span className="capitalize">{lesson.type}</span>
                                <span>•</span>
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                          {!lesson.locked && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[#A78BFA] hover:text-[#8B5CF6] hover:bg-[#A78BFA]/10"
                            >
                              Preview
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Student Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white font-semibold">{content.rating}</span>
                    <span className="text-gray-400">({content.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Emily Thompson",
                      role: "5th Grade Teacher",
                      rating: 5,
                      date: "2 weeks ago",
                      review:
                        "This course completely changed how I approach AI in my classroom. The practical examples and templates saved me hours of work immediately.",
                    },
                    {
                      name: "Marcus Johnson",
                      role: "High School English",
                      rating: 5,
                      date: "1 month ago",
                      review:
                        "Clear, concise, and immediately applicable. I started using the techniques from lesson 1 the very next day.",
                    },
                    {
                      name: "Lisa Chen",
                      role: "Middle School Science",
                      rating: 4,
                      date: "1 month ago",
                      review:
                        "Great course! Would love to see more subject-specific examples, but the fundamentals are solid.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-white font-semibold">{review.name}</div>
                          <div className="text-gray-400 text-sm">{review.role}</div>
                        </div>
                        <div className="text-gray-400 text-sm">{review.date}</div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-600"} fill-current`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-300">{review.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Related Courses */}
              <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Related Courses</h3>
                <div className="space-y-3">
                  <Link
                    href="/ai-literacy/courses/prompt-engineering-fundamentals"
                    className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="text-white font-medium text-sm mb-1">Prompt Engineering Fundamentals</div>
                    <div className="text-gray-400 text-xs">3 hours • Beginner</div>
                  </Link>
                  <Link
                    href="/ai-literacy/courses/ai-for-lesson-planning"
                    className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="text-white font-medium text-sm mb-1">AI for Lesson Planning</div>
                    <div className="text-gray-400 text-xs">3 hours • Intermediate</div>
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#A78BFA]/10 to-[#8B5CF6]/10 border border-[#A78BFA]/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Ready to get started?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Join {content.enrolled.toLocaleString()}+ teachers already learning with this course.
                </p>
                <Button
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white font-semibold"
                >
                  Enroll Now - Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
