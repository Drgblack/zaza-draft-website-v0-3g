import type { Metadata } from "next"
import { notFound } from "next/navigation"
import WebinarDetailClient from "./webinar-detail-client"

// This would typically come from a database or CMS
const allWebinars = [
  {
    id: "prompt-engineering-mastery",
    title: "Prompt Engineering Mastery: Advanced Techniques for Teachers",
    date: "2025-01-25",
    time: "4:00 PM EST",
    duration: "60 min",
    category: "advanced",
    presenter: "Dr. Sarah Chen",
    presenterTitle: "AI Education Specialist",
    presenterBio:
      "Dr. Sarah Chen is an AI Education Specialist with over 15 years of experience in educational technology. She has trained over 10,000 teachers worldwide on effective AI integration strategies.",
    attendees: 847,
    maxAttendees: 1000,
    description:
      "Learn advanced prompt engineering techniques to get better results from AI tools. Includes live demonstrations and Q&A.",
    longDescription:
      "This comprehensive webinar will take your prompt engineering skills to the next level. You'll learn advanced techniques used by AI experts to get consistently better results from AI tools. Through live demonstrations and hands-on practice, you'll master chain-of-thought prompting, few-shot learning, and troubleshooting strategies that work across different AI platforms.",
    topics: [
      "Chain-of-thought prompting",
      "Few-shot learning examples",
      "Prompt templates for different subjects",
      "Troubleshooting common issues",
    ],
    agenda: [
      { time: "0:00-0:10", topic: "Introduction and Setup", description: "Overview of advanced prompting concepts" },
      {
        time: "0:10-0:25",
        topic: "Chain-of-Thought Prompting",
        description: "Breaking down complex tasks into steps",
      },
      { time: "0:25-0:40", topic: "Few-Shot Learning", description: "Using examples to guide AI responses" },
      {
        time: "0:40-0:50",
        topic: "Subject-Specific Templates",
        description: "Ready-to-use prompts for your classroom",
      },
      { time: "0:50-1:00", topic: "Q&A and Troubleshooting", description: "Live questions and problem-solving" },
    ],
    certificateOffered: true,
    featured: true,
    type: "upcoming",
    learningOutcomes: [
      "Master chain-of-thought prompting for complex tasks",
      "Create effective few-shot learning examples",
      "Build a library of subject-specific prompt templates",
      "Troubleshoot common AI response issues",
      "Adapt prompts for different AI platforms",
    ],
    prerequisites: ["Basic familiarity with AI tools", "Completed 'AI Basics for Teachers' or equivalent experience"],
    materials: [
      "Prompt template library (PDF)",
      "Chain-of-thought examples workbook",
      "Subject-specific prompt starters",
      "Troubleshooting guide",
    ],
  },
  {
    id: "ai-differentiation",
    title: "Using AI for Differentiated Instruction",
    date: "2025-01-28",
    time: "7:00 PM EST",
    duration: "45 min",
    category: "best-practices",
    presenter: "Marcus Johnson",
    presenterTitle: "Special Education Teacher",
    presenterBio:
      "Marcus Johnson is a Special Education Teacher with 12 years of experience supporting diverse learners. He specializes in using technology to create accessible, engaging learning experiences for all students.",
    attendees: 623,
    maxAttendees: 500,
    description:
      "Discover how to use AI tools to create differentiated materials for diverse learners, including students with IEPs and ELLs.",
    longDescription:
      "Every classroom has students with diverse learning needs. This webinar will show you how to leverage AI tools to create differentiated materials that meet each student where they are. You'll learn practical strategies for adapting reading levels, creating visual supports, scaffolding complex concepts, and providing multilingual support.",
    topics: [
      "Adapting reading levels",
      "Creating visual supports",
      "Scaffolding complex concepts",
      "Multilingual support strategies",
    ],
    agenda: [
      { time: "0:00-0:05", topic: "Welcome and Overview", description: "Understanding differentiation with AI" },
      { time: "0:05-0:15", topic: "Reading Level Adaptation", description: "Making texts accessible for all readers" },
      { time: "0:15-0:25", topic: "Visual Supports", description: "Creating graphics and organizers" },
      { time: "0:25-0:35", topic: "Scaffolding Strategies", description: "Breaking down complex concepts" },
      { time: "0:35-0:45", topic: "Multilingual Support", description: "Supporting ELL students effectively" },
    ],
    certificateOffered: true,
    featured: true,
    type: "upcoming",
    learningOutcomes: [
      "Adapt texts to multiple reading levels quickly",
      "Generate visual supports and graphic organizers",
      "Create scaffolded versions of complex content",
      "Provide multilingual materials for ELL students",
      "Develop differentiated assessments",
    ],
    prerequisites: ["Basic understanding of differentiated instruction", "Access to AI tools"],
    materials: [
      "Differentiation prompt templates",
      "Visual support examples",
      "Scaffolding strategies guide",
      "Multilingual resource list",
    ],
  },
  {
    id: "ai-basics-teachers",
    title: "AI Basics for Teachers: Getting Started with Confidence",
    duration: "45 min",
    category: "getting-started",
    presenter: "Jennifer Martinez",
    presenterTitle: "EdTech Coach",
    presenterBio:
      "Jennifer Martinez is an EdTech Coach who has helped hundreds of teachers integrate technology effectively. She specializes in making complex tech concepts accessible and practical for busy educators.",
    views: 12450,
    rating: 4.9,
    description: "A beginner-friendly introduction to AI tools for education. No technical background required.",
    longDescription:
      "New to AI? This webinar is your starting point. We'll demystify AI technology and show you practical, safe ways to use it in your teaching. You'll leave with confidence, clarity, and ready-to-use strategies for your classroom.",
    topics: ["What is AI?", "Common AI tools for teachers", "Getting started safely", "Addressing student concerns"],
    agenda: [
      { time: "0:00-0:10", topic: "What is AI?", description: "Understanding AI in simple terms" },
      { time: "0:10-0:25", topic: "AI Tools Overview", description: "Popular tools and their uses" },
      { time: "0:25-0:35", topic: "Safety and Ethics", description: "Using AI responsibly" },
      { time: "0:35-0:45", topic: "Getting Started", description: "Your first AI-powered lesson" },
    ],
    certificateOffered: true,
    popular: true,
    type: "on-demand",
    learningOutcomes: [
      "Understand what AI is and how it works",
      "Identify AI tools appropriate for your classroom",
      "Use AI safely and ethically",
      "Address common student questions about AI",
      "Create your first AI-assisted lesson",
    ],
    prerequisites: ["None - perfect for beginners!"],
    materials: [
      "AI tools comparison chart",
      "Safety checklist for teachers",
      "Student AI literacy handout",
      "Getting started guide",
    ],
  },
  {
    id: "parent-communication-ai",
    title: "Transforming Parent Communication with AI",
    duration: "50 min",
    category: "best-practices",
    presenter: "David Thompson",
    presenterTitle: "Elementary Principal",
    presenterBio:
      "David Thompson is an Elementary Principal with 18 years in education. He's passionate about building strong school-home partnerships and has helped his school achieve 95%+ parent engagement rates.",
    views: 9870,
    rating: 4.8,
    description:
      "Learn how to use AI to write effective parent emails, newsletters, and conference notes in multiple languages.",
    longDescription:
      "Strong parent communication is essential for student success, but it's time-consuming. This webinar will show you how to use AI to write clear, positive, culturally-sensitive communications that strengthen your relationships with families while saving you hours each week.",
    topics: [
      "Email templates that work",
      "Translating for multilingual families",
      "Positive behavior communication",
      "Conference preparation",
    ],
    agenda: [
      {
        time: "0:00-0:10",
        topic: "Communication Principles",
        description: "What makes parent communication effective",
      },
      { time: "0:10-0:25", topic: "Email Templates", description: "Creating reusable, personalized templates" },
      { time: "0:25-0:35", topic: "Multilingual Support", description: "Reaching all families in their language" },
      { time: "0:35-0:45", topic: "Positive Messaging", description: "Framing challenges constructively" },
      { time: "0:45-0:50", topic: "Conference Prep", description: "Preparing notes and talking points" },
    ],
    certificateOffered: true,
    popular: true,
    type: "on-demand",
    learningOutcomes: [
      "Write clear, positive parent emails in minutes",
      "Translate communications into multiple languages",
      "Frame behavioral concerns constructively",
      "Prepare comprehensive conference notes",
      "Build stronger relationships with families",
    ],
    prerequisites: ["None"],
    materials: [
      "Parent email template library",
      "Translation best practices guide",
      "Positive language phrase bank",
      "Conference preparation checklist",
    ],
  },
  {
    id: "lesson-planning-ai",
    title: "AI-Powered Lesson Planning: Save 5+ Hours Per Week",
    duration: "55 min",
    category: "best-practices",
    presenter: "Rachel Kim",
    presenterTitle: "High School Teacher",
    presenterBio:
      "Rachel Kim is a High School Teacher who has reduced her planning time by 60% using AI tools. She shares her proven workflows with teachers nationwide through workshops and online courses.",
    views: 11230,
    rating: 4.9,
    description: "Discover workflows to plan engaging, standards-aligned lessons in a fraction of the time.",
    longDescription:
      "Lesson planning doesn't have to consume your evenings and weekends. This webinar reveals the exact workflows used by thousands of teachers to create engaging, standards-aligned lessons in a fraction of the time. You'll learn how to plan units, create activities, and adapt materials for different grade levels efficiently.",
    topics: [
      "Unit planning with AI",
      "Creating engaging activities",
      "Aligning to standards",
      "Adapting for different grade levels",
    ],
    agenda: [
      { time: "0:00-0:10", topic: "Planning Workflow Overview", description: "The efficient planning process" },
      { time: "0:10-0:25", topic: "Unit Planning", description: "Creating comprehensive unit plans" },
      { time: "0:25-0:40", topic: "Activity Creation", description: "Designing engaging learning activities" },
      { time: "0:40-0:50", topic: "Standards Alignment", description: "Ensuring curriculum alignment" },
      { time: "0:50-0:55", topic: "Adaptation Strategies", description: "Modifying for different contexts" },
    ],
    certificateOffered: true,
    popular: true,
    type: "on-demand",
    learningOutcomes: [
      "Create complete unit plans in under an hour",
      "Design engaging activities aligned to standards",
      "Adapt lessons for different grade levels",
      "Build a library of reusable materials",
      "Save 5+ hours per week on planning",
    ],
    prerequisites: ["Basic familiarity with AI tools recommended"],
    materials: [
      "Unit planning template",
      "Activity design prompts",
      "Standards alignment checklist",
      "Adaptation strategies guide",
    ],
  },
]

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const webinar = allWebinars.find((w) => w.id === params.slug)

  if (!webinar) {
    return {
      title: "Webinar Not Found",
    }
  }

  return {
    title: `${webinar.title} | Zaza Draft Webinars`,
    description: webinar.description,
    openGraph: {
      title: webinar.title,
      description: webinar.description,
      type: "website",
      images: [
        {
          url: "/webinar-og-image.jpg",
          width: 1200,
          height: 630,
          alt: webinar.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: webinar.title,
      description: webinar.description,
      images: ["/webinar-og-image.jpg"],
    },
  }
}

export default function WebinarDetailPage({ params }: { params: { slug: string } }) {
  const webinar = allWebinars.find((w) => w.id === params.slug)

  if (!webinar) {
    notFound()
  }

  return <WebinarDetailClient webinar={webinar} />
}
