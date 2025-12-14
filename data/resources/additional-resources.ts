export type ExtendedResource = {
  slug: string
  title: string
  description: string
  category: "Communication" | "Reporting" | "Classroom" | "Planning" | "Assessment"
  tags: string[]
  language: "EN"
  fileUrl: string
  fileType: "PDF"
  featured?: boolean
  releasedAt?: string
  popularity?: number
}

export const additionalResources: ExtendedResource[] = [
  {
    slug: "parent-email-checklist",
    title: "Parent Email Checklist",
    description:
      "Ensure every parent message includes a clear purpose, key details, and a respectful tone before you hit send.",
    category: "Communication",
    tags: ["parent-communication", "checklist", "tone"],
    language: "EN",
    fileUrl: "/resources/pdf/parent-email-checklist-en.pdf",
    fileType: "PDF",
    featured: true,
    releasedAt: "2025-12-01",
    popularity: 95,
  },
  {
    slug: "parent-email-playbook",
    title: "Parent Email Playbook",
    description:
      "Step-by-step guidance for handling common parent scenarios, from praise to concern, with ready-to-use phrases.",
    category: "Communication",
    tags: ["parent-communication", "playbook", "phrases"],
    language: "EN",
    fileUrl: "/resources/pdf/parent-email-playbook-en.pdf",
    fileType: "PDF",
    featured: true,
    releasedAt: "2025-11-15",
    popularity: 92,
  },
  {
    slug: "phone-call-scripts-to-parents",
    title: "Phone Call Scripts to Parents",
    description:
      "Calm, structured scripts to guide important phone conversations and keep everyone aligned on next steps.",
    category: "Communication",
    tags: ["parent-communication", "scripts", "phone"],
    language: "EN",
    fileUrl: "/resources/pdf/phone-call-scripts-parents-en.pdf",
    fileType: "PDF",
    featured: true,
    releasedAt: "2025-10-30",
    popularity: 90,
  },
  {
    slug: "translation-helpers-pack",
    title: "Translation Helpers Pack",
    description:
      "Phrase banks, quick glossaries, and respectful wording alternatives for translating family communications.",
    category: "Communication",
    tags: ["communication", "translation", "wording"],
    language: "EN",
    fileUrl: "/resources/pdf/translation-helpers-pack-en.pdf",
    fileType: "PDF",
    featured: true,
    releasedAt: "2025-10-01",
    popularity: 88,
  },
  {
    slug: "report-comment-bank",
    title: "Report Comment Bank",
    description:
      "A wide range of professional comments organised by subject, skill, and mindset to speed up report writing.",
    category: "Reporting",
    tags: ["reports", "comments", "assessment"],
    language: "EN",
    fileUrl: "/resources/pdf/report-comment-bank-en.pdf",
    fileType: "PDF",
    releasedAt: "2025-09-15",
    popularity: 85,
  },
  {
    slug: "report-writing-starters-closers",
    title: "Report Writing Starters & Closers",
    description:
      "Powerful sentence starters and thoughtful closers to frame academic growth or next steps with clarity.",
    category: "Reporting",
    tags: ["reports", "writing", "templates"],
    language: "EN",
    fileUrl: "/resources/pdf/report-writing-starters-closers-en.pdf",
    fileType: "PDF",
    releasedAt: "2025-08-01",
    popularity: 82,
  },
  {
    slug: "report-writing-framework",
    title: "Report Writing Framework",
    description:
      "A structured approach that helps you balance strengths, growth areas, and evidence in every report.",
    category: "Reporting",
    tags: ["reports", "framework", "structure"],
    language: "EN",
    fileUrl: "/resources/pdf/report-writing-framework-en.pdf",
    fileType: "PDF",
    releasedAt: "2025-07-10",
    popularity: 78,
  },
  {
    slug: "behavior-redirection-scripts",
    title: "Behavior Redirection Scripts",
    description:
      "Calm, respectful dialogues that guide students back on track while preserving relationships.",
    category: "Classroom",
    tags: ["behavior", "scripts", "classroom"],
    language: "EN",
    fileUrl: "/resources/pdf/behavior-redirection-scripts-en.pdf",
    fileType: "PDF",
    releasedAt: "2025-06-25",
    popularity: 80,
  },
]
