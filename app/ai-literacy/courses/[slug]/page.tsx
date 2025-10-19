import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CourseClient from "./course-client"

const courses = {
  "ai-basics-for-teachers": {
    title: "AI Basics for Teachers",
    description:
      "Master the fundamentals of artificial intelligence and understand how AI can transform your teaching practice.",
    level: "Beginner",
    duration: "2 hours",
    lessons: 8,
  },
  "prompt-engineering-fundamentals": {
    title: "Prompt Engineering Fundamentals",
    description: "Learn to write effective prompts that get better results from AI tools like ChatGPT and Zaza Draft.",
    level: "Beginner",
    duration: "3 hours",
    lessons: 10,
  },
  "ai-for-parent-communication": {
    title: "AI for Parent Communication",
    description:
      "Use AI to write clear, empathetic parent emails and messages that strengthen home-school partnerships.",
    level: "Intermediate",
    duration: "2.5 hours",
    lessons: 9,
  },
  "ai-for-lesson-planning": {
    title: "AI for Lesson Planning",
    description: "Design engaging, standards-aligned lessons faster with AI-powered planning tools and techniques.",
    level: "Intermediate",
    duration: "3 hours",
    lessons: 11,
  },
  "ai-for-assessment-feedback": {
    title: "AI for Assessment & Feedback",
    description: "Provide personalized, actionable feedback to students efficiently using AI assistance.",
    level: "Intermediate",
    duration: "2.5 hours",
    lessons: 10,
  },
  "ethical-ai-use-in-education": {
    title: "Ethical AI Use in Education",
    description: "Navigate the ethical considerations of AI in the classroom with confidence and integrity.",
    level: "Beginner",
    duration: "2 hours",
    lessons: 7,
  },
  "data-privacy-ferpa-compliance": {
    title: "Data Privacy & FERPA Compliance",
    description: "Protect student data and maintain FERPA compliance when using AI tools in education.",
    level: "Intermediate",
    duration: "2 hours",
    lessons: 8,
  },
  "ai-tools-comparison-selection": {
    title: "AI Tools Comparison & Selection",
    description: "Evaluate and choose the right AI tools for your specific teaching needs and context.",
    level: "Intermediate",
    duration: "2.5 hours",
    lessons: 9,
  },
  "advanced-prompt-techniques": {
    title: "Advanced Prompt Techniques",
    description:
      "Master sophisticated prompting strategies including chain-of-thought, few-shot learning, and role-based prompts.",
    level: "Advanced",
    duration: "3 hours",
    lessons: 12,
  },
  "building-ai-workflows": {
    title: "Building AI Workflows",
    description: "Create efficient, repeatable AI workflows that save hours every week on routine teaching tasks.",
    level: "Advanced",
    duration: "3.5 hours",
    lessons: 13,
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = courses[params.slug as keyof typeof courses]

  if (!course) {
    return {
      title: "Course Not Found",
    }
  }

  return {
    title: `${course.title} | AI Literacy | Zaza Draft`,
    description: course.description,
    openGraph: {
      title: `${course.title} | AI Literacy`,
      description: course.description,
      type: "website",
    },
  }
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courses[params.slug as keyof typeof courses]

  if (!course) {
    notFound()
  }

  return <CourseClient slug={params.slug} course={course} />
}
