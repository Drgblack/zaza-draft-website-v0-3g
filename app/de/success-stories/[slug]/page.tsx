import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyDetailClient } from "./case-study-detail-client"

const caseStudies = [
  {
    slug: "lincoln-elementary-parent-communication",
    title: "How Lincoln Elementary Cut Parent Communication Time by 75%",
    school: "Lincoln Elementary",
    location: "Austin, TX",
    students: "450 students",
    category: "elementary",
  },
  {
    slug: "riverside-unified-district-rollout",
    title: "District-Wide AI Rollout: How Riverside Unified Trained 200 Teachers",
    school: "Riverside Unified",
    location: "California",
    students: "15,000 students",
    category: "district",
  },
  {
    slug: "washington-middle-language-barriers",
    title: "Breaking Language Barriers: ESL Success at Washington Middle",
    school: "Washington Middle",
    location: "New York, NY",
    students: "800 students",
    category: "multilingual",
  },
  {
    slug: "oakwood-special-education-reports",
    title: "Special Education Reports: Compliance Meets Compassion",
    school: "Oakwood High School",
    location: "Chicago, IL",
    students: "1,200 students",
    category: "special-ed",
  },
  {
    slug: "jefferson-new-teacher-confidence",
    title: "New Teacher Confidence: From Anxious to Assured in 30 Days",
    school: "Jefferson Elementary",
    location: "Seattle, WA",
    students: "600 students",
    category: "elementary",
  },
]

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = caseStudies.find((s) => s.slug === params.slug)

  if (!study) {
    return {
      title: "Case Study Not Found | Zaza Draft",
    }
  }

  return {
    title: `${study.title} | Zaza Draft Success Stories`,
    description: `See how ${study.school} in ${study.location} transformed their communication with Zaza Draft. Real results from ${study.students}.`,
    openGraph: {
      title: study.title,
      description: `Success story from ${study.school}`,
      type: "article",
    },
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug)

  if (!study) {
    notFound()
  }

  return <CaseStudyDetailClient slug={params.slug} />
}
