export interface Resource {
  slug: string
  title: string
  type: "Guide" | "Template" | "Checklist"
  excerpt: string
  body: string
  heroImage: string
  downloadUrl?: string
  language: "en" | "de"
  published?: string
  tags?: string[]
}

export const resources: Resource[] = [
  {
    slug: "parent-message-templates",
    title: "Parent Message Templates for Every Situation",
    type: "Template",
    excerpt:
      "Ready-to-use templates for common parent communication scenarios, from progress updates to behaviour concerns.",
    heroImage: "/document-templates.jpg",
    downloadUrl: undefined,
    body: "Full article coming soon",
    language: "en",
    published: "2025-03-10",
    tags: ["Parent Communication", "Templates"],
  },
  {
    slug: "professional-tone-checklist",
    title: "Professional Tone Checklist for Parent Messages",
    type: "Checklist",
    excerpt: "A concise checklist to keep every parent message clear, professional, and compassionate.",
    heroImage: "/checklist-clipboard.jpg",
    downloadUrl: undefined,
    body: "Full article coming soon",
    language: "en",
    published: "2025-03-08",
    tags: ["Tone", "Parent Communication"],
  },
  {
    slug: "end-of-term-comments-guide",
    title: "End-of-Term Comments Guide",
    type: "Guide",
    excerpt: "A complete guide to writing meaningful, balanced end-of-term comments that parents value.",
    heroImage: "/report-card-grades.jpg",
    downloadUrl: undefined,
    body: "Full article coming soon",
    language: "en",
    published: "2025-03-05",
    tags: ["Assessment", "Reports"],
  },
  {
    slug: "ai-prompt-templates-for-teachers",
    title: "AI Prompt Templates for Teachers",
    type: "Template",
    excerpt: "Reusable prompt patterns for parent messages, student feedback, and planning.",
    heroImage: "/ai-prompts-concept.jpg",
    downloadUrl: undefined,
    body: "Full article coming soon",
    language: "en",
    published: "2025-03-04",
    tags: ["Prompts", "Templates"],
  },
  {
    slug: "assessment-rubrics-and-templates",
    title: "Assessment Rubrics and Templates",
    type: "Template",
    excerpt: "Editable rubrics and templates to streamline consistent, fair assessment.",
    heroImage: "/assessment-rubrics.jpg",
    downloadUrl: undefined,
    body: "Full article coming soon",
    language: "en",
    published: "2025-03-02",
    tags: ["Assessment", "Rubrics"],
  },
  {
    slug: "classroom-management-guide",
    title: "Classroom Management Guide",
    type: "Guide",
    excerpt: "Practical strategies for calm, consistent classroom routines and expectations.",
    heroImage: "/classroom-management.jpg",
    downloadUrl: undefined,
    body: "Full article coming soon",
    language: "en",
    published: "2025-03-01",
    tags: ["Classroom", "Management"],
  },
  {
    slug: "lesson-planning-templates",
    title: "Lesson Planning Templates",
    type: "Template",
    excerpt: "Simple, reusable lesson planning formats aligned to learning objectives.",
    heroImage: "/lesson-planning.jpg",
    downloadUrl: undefined,
    body: "Full article coming soon",
    language: "en",
    published: "2025-02-28",
    tags: ["Lesson Planning", "Templates"],
  },
  {
    slug: "lesson-planning-templates-docx",
    title: "Lesson Planning Templates (DOCX)",
    type: "Template",
    excerpt: "Microsoft Word versions of lesson planning templates for offline editing.",
    heroImage: "/lesson-planning-docx.jpg",
    downloadUrl: "/downloads/Lesson_Planning_Templates.docx",
    body: "Full article coming soon",
    language: "en",
    published: "2025-02-28",
    tags: ["Lesson Planning", "Templates"],
  },
  {
    slug: "teacher-time-management-guide",
    title: "Teacher Time Management Guide",
    type: "Guide",
    excerpt: "Smart routines, batching, and AI assists to reclaim time each week.",
    heroImage: "/time-management.jpg",
    downloadUrl: "/downloads/Teacher_Time_Management_Guide.docx",
    body: "Full article coming soon",
    language: "en",
    published: "2025-02-26",
    tags: ["Productivity", "Wellbeing"],
  },
  {
    slug: "weekly-newsletter-bundle",
    title: "Weekly Teacher Newsletter Bundle",
    type: "Template",
    excerpt: "A starter pack for consistent weekly updates to parents and students.",
    heroImage: "/newsletter-bundle.jpg",
    downloadUrl: "/downloads/Weekly_Teacher_Newsletter_Info.docx",
    body: "Full article coming soon",
    language: "en",
    published: "2025-02-25",
    tags: ["Communication", "Templates"],
  },
]

export function getAllResources(): Resource[] {
  return resources.sort((a, b) => {
    if (!a.published || !b.published) return 0
    return new Date(b.published).getTime() - new Date(a.published).getTime()
  })
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug)
}

export function getResourcesByType(type: Resource["type"]): Resource[] {
  return resources.filter((resource) => resource.type === type)
}

