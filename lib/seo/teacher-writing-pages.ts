export type SearchIntent =
  | "Tool intent"
  | "Alternative/comparison intent"
  | "How-to/problem intent"
  | "Template intent";

export type StructuredDataType =
  | "WebPage"
  | "BreadcrumbList"
  | "FAQPage"
  | "SoftwareApplication"
  | "Article";

export interface LinkSuggestion {
  href: string;
  label: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageSection {
  id: string;
  title: string;
  body: string[];
  bullets?: string[];
  exampleLabel?: string;
  exampleBody?: string;
}

export interface ComparisonRow {
  label: string;
  zaza: string;
  alternative: string;
}

export interface ComparisonBlock {
  title: string;
  intro: string;
  alternativeLabel: string;
  rows: ComparisonRow[];
  note?: string;
}

export interface TrustItem {
  title: string;
  body: string;
}

export interface TestimonialPlaceholder {
  quotePrompt: string;
  attributionPrompt: string;
}

export interface CTAConfig {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface TeacherWritingPage {
  slug: string;
  shortTitle: string;
  keyword: string;
  intent: SearchIntent;
  title: string;
  metaDescription: string;
  h1: string;
  description: string;
  ogImage: string;
  heroEyebrow: string;
  heroDescription: string[];
  heroBullets: string[];
  featuredSnippet?: string;
  sections: PageSection[];
  comparisonBlock?: ComparisonBlock;
  trustBlock?: {
    title: string;
    items: TrustItem[];
  };
  faq: FAQItem[];
  internalLinks: LinkSuggestion[];
  relatedSlugs: string[];
  structuredDataTypes: StructuredDataType[];
  testimonials: TestimonialPlaceholder[];
  cta: CTAConfig;
}

const sharedFooterLinks = {
  product: {
    href: "/products/draft",
    label: "See how Zaza Draft works",
    description:
      "Visit the product page for the calmer, teacher-first writing workflow behind these pages.",
  },
  earlyAccess: {
    href: "/early-access",
    label: "Join the waitlist",
    description:
      "Get early access if you want a dedicated writing co-writer rather than another general AI tool.",
  },
  pricing: {
    href: "/pricing",
    label: "View pricing",
    description:
      "Review the current plans and decide whether Zaza Draft fits your school or personal workflow.",
  },
  parentStress: {
    href: "/reduce-stress-parent-messages",
    label: "Reduce stress with parent messages",
    description:
      "Read the existing Zaza page on calmer parent communication and message confidence.",
  },
  reports: {
    href: "/ai-for-student-reports",
    label: "Explore AI for student reports",
    description:
      "See the broader Zaza report-writing page if you are comparing workflows across school writing tasks.",
  },
};

const refreshedPainRelatedSlugs = [
  "how-to-reply-to-an-angry-parent-email",
  "how-to-write-a-behaviour-email-to-parents",
  "positive-but-honest-report-card-comments-for-struggling-students",
  "how-to-tell-parents-their-child-is-falling-behind",
  "parent-wont-respond-to-behaviour-email",
  "how-to-document-parent-contact-without-losing-your-mind",
];

const xPainParentSection: PageSection = {
  id: "x-style-parent-pressure",
  title: "Why this matters at 10pm and during parents' evening prep",
  body: [
    "Teachers on X keep describing the same moment: you sit down for what should be one quick message and realise the wording could shape the whole next day. The blank page feels heavier when the issue is already emotionally loaded.",
    "That is why parent communication takes longer than it looks from the outside. You are not just writing. You are trying to sound clear, school-appropriate, and calm enough that the relationship still feels workable tomorrow morning.",
  ],
  exampleLabel: "Real teacher pressure point",
  exampleBody:
    "Parents' evening prep at 10pm is rarely about slides or seating plans. It is often about the one email or follow-up you still have not phrased because you know the tone has to be right.",
};

const xPainAdminLogSection: PageSection = {
  id: "x-style-admin-logs",
  title: "When the message also becomes a record",
  body: [
    "Another theme in teacher posts is the admin layer that arrives after the email itself. You send the message, then someone asks whether you logged it, followed it up, or can show exactly what was said and when.",
    "That means the wording has to do two jobs at once. It needs to sound human enough for the parent and solid enough for school records, contact logs, and any later follow-up with pastoral teams or senior leaders.",
  ],
};

const xPainReportSeasonSection: PageSection = {
  id: "x-style-report-season",
  title: "Why report season collides with everything else",
  body: [
    "Teachers on X describe report season in the same late-night language every term: the comments are nearly done until you hit the pupils you care most about getting right. Then one sentence can swallow twenty minutes.",
    "That pressure gets worse when reports sit alongside parents' evening prep, behaviour follow-up, and normal classroom workload. A useful writing workflow has to save energy, not just output words faster.",
  ],
  exampleLabel: "Real report-season moment",
  exampleBody:
    "The report is nearly finished except for the five comments you keep reopening because you want them to be honest, kind, and impossible to misread at home.",
};

const xPainReportRecordSection: PageSection = {
  id: "x-style-report-follow-up",
  title: "Why report wording often feeds later parent conversations",
  body: [
    "Report comments do not live in isolation. They often become the language parents bring into meetings, emails, and follow-up questions about progress, behaviour, confidence, SEN support, or unmet expectations.",
    "That is why careful wording matters so much. A balanced comment saves time later because it is easier to stand behind in contact logs, parents' evening conversations, and difficult home-school follow-up.",
  ],
};

const xParentFaqAdditions: FAQItem[] = [
  {
    question:
      "What if I am drafting this after school and do not trust my tone any more?",
    answer:
      "That is exactly when a calmer structure helps. Start from the facts, keep the next step simple, and review the wording before sending rather than trying to force a perfect email out of a tired brain.",
  },
  {
    question:
      "How do I write something a parent can read and admin can still log safely?",
    answer:
      "Keep the wording factual, proportionate, and clear about the next step. Messages that may later be logged or reviewed should avoid sarcasm, speculation, and emotionally loaded phrasing.",
  },
];

const xReportFaqAdditions: FAQItem[] = [
  {
    question:
      "What if report writing is colliding with parents' evening prep and everything starts sounding generic?",
    answer:
      "That is usually a sign of cognitive overload rather than lack of care. Use a repeatable structure, start from real notes, and save your energy for the comments where the tone really needs more thought.",
  },
  {
    question:
      "Why does it matter if a report comment may lead to a later parent conversation?",
    answer:
      "Because many report comments are re-read in meetings, follow-up emails, and contact logs. Balanced wording is easier to stand behind later and less likely to create extra clarification work.",
  },
];

const xComparisonFaqAdditions: FAQItem[] = [
  {
    question:
      "Why does a more focused product matter when teachers are writing late at night?",
    answer:
      "When the real problem is one difficult email, report comment, or logged follow-up, a focused workflow can feel calmer and less cluttered than a broader product with many unrelated tools.",
  },
  {
    question:
      "What if my main pain point is parent communication rather than lots of different teaching workflows?",
    answer:
      "That is the clearest case for trying Zaza Draft. It is built around parent emails, report comments, and emotionally difficult school writing where wording quality matters more than breadth.",
  },
];

export const teacherWritingPages = {
  "ai-parent-email-generator-for-teachers": {
    slug: "ai-parent-email-generator-for-teachers",
    shortTitle: "AI Parent Email Generator",
    keyword: "ai parent email generator for teachers",
    intent: "Tool intent",
    title:
      "AI Parent Email Generator for Teachers | Calm, Professional Drafts | Zaza Draft",
    metaDescription:
      "AI parent email generator for teachers that helps you draft clear, school-appropriate parent emails faster. Keep tone professional, reduce stress, and stay in control with Zaza Draft.",
    h1: "AI Parent Email Generator for Teachers",
    description:
      "Teacher-first help for parent emails that need clear tone, safe wording, and professional judgement.",
    ogImage: "/teacher-writing-parent-email-on-laptop.jpg",
    heroEyebrow: "Tool intent",
    heroDescription: [
      "You open the laptop for one quick parent email and suddenly it is 10pm, because the wording feels risky and you know one clumsy line can create tomorrow's problem. An AI parent email generator for teachers should do more than fill a blank page. It should help you draft calm, school-appropriate parent emails quickly when the message is sensitive, awkward, or emotionally loaded.",
      "Zaza Draft is built as a teacher-first co-writer, not a replacement. You bring the judgement, context, and final decision. Zaza helps with structure, tone, and a safer first draft.",
    ],
    heroBullets: [
      "Draft from rough notes in minutes",
      "Use wording that feels professional and appropriate",
      "Review, edit, and send only what you are happy with",
    ],
    sections: [
      {
        id: "school-tone",
        title:
          "Why an AI parent email generator for teachers needs to understand school tone",
        body: [
          "Teacher email writing is not generic business writing. A parent message can shape trust, calm a situation down, or make a difficult conversation easier to manage. That means the quality of the wording matters as much as the speed.",
          "A teacher-first tool should help you sound clear, measured, and professional without flattening your voice. It should also support emotionally difficult messages where the wrong phrase can create more work, more stress, and more back-and-forth.",
        ],
        bullets: [
          "Parent communication often carries emotional weight",
          "Teachers need school-appropriate wording, not broad marketing copy",
          "A strong first draft saves time without taking away professional judgement",
        ],
      },
      {
        id: "why-emails-feel-heavy",
        title: "Why parent emails take longer than they should",
        body: [
          "Most teachers are not slow writers. The delay usually comes from second-guessing. You reread a sentence, soften it, tighten it, then worry that it still sounds cold, defensive, or too vague.",
          "That cognitive load is exactly where a focused co-writer helps. Instead of staring at the screen, you can start with a sensible draft and spend your energy on the part that actually needs you: checking accuracy and deciding what should be said.",
        ],
      },
      {
        id: "what-good-looks-like",
        title: "What teachers need from a writing co-writer",
        body: [
          "Useful teacher writing support should understand common school situations such as behaviour concerns, progress updates, meeting follow-ups, and difficult parent replies. It should make those messages easier to draft without turning them into generic, over-smoothed text.",
          "It should also keep the teacher in control. A calmer workflow is not about letting software speak for you. It is about getting to a professional draft faster and reviewing it with less friction.",
        ],
        bullets: [
          "Teacher-specific writing modes",
          "Safer wording for sensitive topics",
          "Clear structure that still feels human",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza Draft supports sensitive parent communication",
        body: [
          "Zaza Draft is designed around the kinds of writing teachers tend to postpone: messages about concerns, boundaries, progress, incidents, and next steps. The goal is not flashy output. The goal is to help you send a message that feels sound, calm, and fit for school use.",
          "Because it is a co-writer, you can adjust the draft, add missing context, remove anything that feels too strong, and keep your own professional voice. That makes it more useful than a generic AI writer when tone really matters.",
        ],
      },
      {
        id: "when-to-use",
        title: "When to use a co-writer instead of starting from scratch",
        body: [
          "A dedicated tool is especially useful when you know what needs to be said but do not want to waste twenty minutes finding the right phrasing. It is also useful when you are tired, emotionally affected, or writing outside the school day.",
          "Those are the moments when a careful first draft is genuinely helpful. You still decide the final wording. You simply begin from a stronger place.",
        ],
      },
      xPainParentSection,
      xPainAdminLogSection,
    ],
    comparisonBlock: {
      title: "Comparison block: Zaza Draft vs a generic AI writer",
      intro:
        "Many teachers can get words out of a broad AI tool. The difference is whether the tool is built for school writing where tone and sensitivity matter.",
      alternativeLabel: "Generic AI writer",
      rows: [
        {
          label: "Primary focus",
          zaza: "Teacher writing tasks where wording and tone matter",
          alternative: "Broad prompts across many use cases",
        },
        {
          label: "Parent communication sensitivity",
          zaza: "Designed for difficult school messages",
          alternative: "Depends on prompt quality and manual editing",
        },
        {
          label: "Teacher control",
          zaza: "Co-writer workflow with review built in",
          alternative: "Fast output, but more manual judgment needed",
        },
        {
          label: "Professional tone",
          zaza: "Conservative and school-appropriate by design",
          alternative: "Varies widely from draft to draft",
        },
      ],
      note: "If you want a calm, dedicated writing workflow, Zaza Draft is the more focused choice.",
    },
    trustBlock: {
      title:
        "Built for teachers who need calm wording and a cleaner paper trail",
      items: [
        {
          title: "Teacher-first writing support",
          body: "Built for parent communication, reports, and school writing rather than broad AI use cases or generic office messaging.",
        },
        {
          title: "Teachers stay in control",
          body: "You review and edit every draft. Zaza is there to support judgement, not replace it, even when the message may later sit in a contact log.",
        },
        {
          title: "Calm by design",
          body: "The writing style is intentionally measured, professional, and better suited to sensitive messages that could otherwise spiral.",
        },
      ],
    },
    faq: [
      {
        question:
          "Is this just another generic AI writer with a teacher label?",
        answer:
          "No. Zaza Draft is positioned as a teacher-first co-writer for parent communication, reports, and other school writing where tone matters. The focus is narrower and more practical than a broad AI writing tool.",
      },
      {
        question: "Can I still edit the draft before I send it?",
        answer:
          "Yes. Teachers stay in control of the final wording. The point is to start from a stronger first draft, then review and adjust it before sending.",
      },
      {
        question: "Is it useful for difficult parent emails?",
        answer:
          "That is one of the clearest use cases. Zaza Draft is designed to help with calm, professional wording when a message feels sensitive or emotionally difficult.",
      },
      {
        question: "Who is this page for?",
        answer:
          "It is for teachers, school staff, and educators who want quicker parent-email drafting without giving up professional judgement.",
      },
      ...xParentFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/teacher-email-writer",
        label: "Teacher Email Writer",
        description:
          "Link here when the user wants broader email help across parents, pupils, colleagues, and follow-up messages.",
      },
      {
        href: "/parent-email-template-for-teachers",
        label: "Parent Email Template for Teachers",
        description:
          "Link here for visitors who want reusable parent email structures and examples rather than a generator page.",
      },
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to Respond to an Angry Parent Email",
        description:
          "Link here for teachers dealing with emotionally difficult replies and de-escalation.",
      },
      {
        href: "/how-to-document-parent-contact-without-losing-your-mind",
        label: "How to Document Parent Contact Without Losing Your Mind",
        description:
          "Link here for the admin side of parent communication when the email also needs to stand up as a clear school record.",
      },
      sharedFooterLinks.product,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: [
      "WebPage",
      "BreadcrumbList",
      "SoftwareApplication",
      "FAQPage",
    ],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about saving time on difficult parent emails without sounding abrupt.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or head of year.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft to turn rough notes into a calm, professional message.",
        attributionPrompt:
          "Replace with a verified quote from a primary or secondary teacher.",
      },
    ],
    cta: {
      title:
        "Try a calmer way to draft parent emails when the wording feels risky",
      body: "If parent emails keep spilling into evenings, try Zaza Draft and start from a steadier first draft that still leaves every final decision with you.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "report-comment-generator-for-teachers": {
    slug: "report-comment-generator-for-teachers",
    shortTitle: "Report Comment Generator",
    keyword: "report comment generator for teachers",
    intent: "Tool intent",
    title:
      "Report Comment Generator for Teachers | Clear, Balanced School Comments | Zaza Draft",
    metaDescription:
      "Report comment generator for teachers that helps you write clear, balanced comments faster. Keep tone consistent, reduce repetition, and stay in control with Zaza Draft.",
    h1: "Report Comment Generator for Teachers",
    description:
      "Teacher-first help for report comments that need balance, consistency, and professional wording.",
    ogImage: "/report-card-grades.jpg",
    heroEyebrow: "Tool intent",
    heroDescription: [
      "Teachers on X keep describing the same report-season moment: the comments are nearly done until you hit the five pupils you most want to get right. A report comment generator for teachers only helps if the output sounds balanced, specific, and fit for school use. Speed matters, but so does professional judgement.",
      "Zaza Draft supports report writing as a co-writer. You bring the pupil knowledge and final decisions. Zaza helps you get to a cleaner first draft with less repetition and less fatigue.",
    ],
    heroBullets: [
      "Generate balanced report comments from short notes",
      "Keep tone consistent across a full class set",
      "Edit quickly before final submission",
    ],
    sections: [
      {
        id: "balanced-comments",
        title:
          "Why a report comment generator for teachers has to stay balanced",
        body: [
          "A good report comment has to do several jobs at once. It should reflect progress, sound professional, avoid careless repetition, and stay proportionate to the evidence you have.",
          "That is why generic writing tools often miss the mark. They can be fluent, but they do not naturally understand the careful middle ground teachers need when writing about attainment, effort, behaviour, and next steps.",
        ],
      },
      {
        id: "where-time-goes",
        title: "Where report-writing time really disappears",
        body: [
          "The hardest part is rarely typing. It is holding a consistent tone across dozens of pupils while still making each comment feel accurate and individual. Teachers often spend more time tweaking phrasing than writing the first version.",
          "A focused co-writer reduces that strain. Instead of building every sentence by hand, you can start with a sound draft and use your energy for review, nuance, and safeguarding your judgement.",
        ],
      },
      {
        id: "what-to-look-for",
        title: "What good report-writing support should actually do",
        body: [
          "Useful report support should help you produce comments that are concise, school-appropriate, and easy to adapt. It should help with language such as strengths, effort, progress, targets, and improvement points without becoming formulaic.",
          "It should also make it easier to stay consistent across a year group or class while leaving room for individual detail.",
        ],
        bullets: [
          "Consistent tone across many comments",
          "Better wording for strengths and next steps",
          "A workflow that supports review, not blind generation",
        ],
      },
      {
        id: "how-zaza-supports",
        title: "How Zaza Draft helps with report comments",
        body: [
          "Zaza Draft is designed to help teachers turn notes into cleaner comments faster. It is especially useful when you know the key points but do not want to spend another evening rewriting similar sentences into a more professional shape.",
          "Because it is a co-writer, you can adjust tone, trim vague wording, add specifics, and keep the final version aligned with your own judgement and school expectations.",
        ],
      },
      {
        id: "use-it-well",
        title: "How to use a generator without losing your professional voice",
        body: [
          "The best use of a comment generator is as a drafting partner, not a final authority. Start with your own notes, read the output critically, and make sure every comment still reflects the pupil you teach.",
          "That approach gives you the speed advantage of AI report writing without turning comments into something generic or over-produced.",
        ],
      },
      xPainReportSeasonSection,
      xPainReportRecordSection,
    ],
    comparisonBlock: {
      title:
        "Comparison block: dedicated report writing vs a generic comment bank",
      intro:
        "A static bank can save typing, but it does not help much with nuance, balance, or turning raw notes into polished wording.",
      alternativeLabel: "Generic comment bank",
      rows: [
        {
          label: "Source material",
          zaza: "Works from your notes and context",
          alternative: "Starts from fixed, reusable phrases",
        },
        {
          label: "Tone consistency",
          zaza: "Supports a controlled, professional style",
          alternative: "Often needs heavy manual editing",
        },
        {
          label: "Personalisation",
          zaza: "Easier to adapt to individual pupils",
          alternative: "Can sound repetitive across a class",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer workflow",
          alternative: "Copy, paste, then edit manually",
        },
      ],
    },
    trustBlock: {
      title: "Built for report season when honest wording still needs care",
      items: [
        {
          title: "Professional tone",
          body: "The output aims to sound measured and school-appropriate rather than exaggerated, generic, or hard to defend later.",
        },
        {
          title: "Judgement preserved",
          body: "Teachers still decide whether a comment is accurate, fair, and ready to submit or discuss with parents later.",
        },
        {
          title: "Built for teacher writing",
          body: "This is not a generic AI writer trying to cover everything. It is designed for the report-writing load teachers actually carry.",
        },
      ],
    },
    faq: [
      {
        question: "Can a report comment generator still sound personal?",
        answer:
          "Yes, if it starts from your own notes and you review the wording. The goal is not identical comments. The goal is faster drafting with enough control to keep each comment accurate.",
      },
      {
        question: "Will this replace my professional judgement?",
        answer:
          "No. Zaza Draft is positioned as a co-writer. You remain responsible for the final comment and whether it reflects the pupil fairly.",
      },
      {
        question: "Is this only for report cards?",
        answer:
          "No. The same workflow can help with progress reports, interim comments, and other school writing that needs a balanced summary.",
      },
      {
        question: "What makes this different from a comment bank?",
        answer:
          "A comment bank gives you fixed phrases. A co-writer helps turn your specific notes into a polished draft, which is more flexible when tone and accuracy matter.",
      },
      ...xReportFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/report-card-comment-generator",
        label: "Report Card Comment Generator",
        description:
          "Link here for teachers searching specifically for report card comment wording and class-set efficiency.",
      },
      {
        href: "/ai-report-writing-for-teachers",
        label: "AI Report Writing for Teachers",
        description:
          "Link here when the user wants the wider report-writing workflow rather than just comment generation.",
      },
      {
        href: "/positive-but-honest-report-card-comments-for-struggling-students",
        label:
          "Positive but Honest Report Card Comments for Struggling Students",
        description:
          "Link here for the hardest report-writing use case, where the issue is finding language that is honest without sounding bleak.",
      },
      sharedFooterLinks.reports,
      sharedFooterLinks.product,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: [
      "WebPage",
      "BreadcrumbList",
      "SoftwareApplication",
      "FAQPage",
    ],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about cutting report-writing time while keeping comments fair and individual.",
        attributionPrompt:
          "Replace with a verified quote from a primary or subject teacher.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about reducing repetitive phrasing across a full set of reports.",
        attributionPrompt:
          "Replace with a verified quote from a senior teacher or form tutor.",
      },
    ],
    cta: {
      title:
        "Write report comments with less repetition and less late-night second-guessing",
      body: "Try Zaza Draft if report comments are eating the last hours of term and you want a calmer way to draft balanced wording without giving up final control.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "alternative-to-magicschool-ai": {
    slug: "alternative-to-magicschool-ai",
    shortTitle: "Alternative to MagicSchool AI",
    keyword: "alternative to magicschool ai",
    intent: "Alternative/comparison intent",
    title:
      "Alternative to MagicSchool AI | A More Focused Writing Co-writer for Teachers | Zaza Draft",
    metaDescription:
      "Alternative to MagicSchool AI for teachers who want a more focused writing co-writer. Compare Zaza Draft and MagicSchool AI for tone-sensitive school writing and parent communication.",
    h1: "Alternative to MagicSchool AI",
    description:
      "A fair comparison page for teachers who want a more focused writing tool with calmer UX and stronger emphasis on wording.",
    ogImage: "/teacher-working-at-desk-with-laptop.jpg",
    heroEyebrow: "Alternative/comparison intent",
    heroDescription: [
      "Teachers often start looking for an alternative to MagicSchool AI at the exact moment a broad platform feels like too much and they still have one difficult email left at 10pm. The first question is not which product has more features. It is which product fits the work you actually need help with.",
      "MagicSchool is broader. Zaza Draft is more focused. If your priority is tone-sensitive writing such as parent emails, report comments, and difficult school communication, Zaza Draft is designed specifically for that narrower job.",
    ],
    heroBullets: [
      "Broader suite versus focused writing product",
      "Designed for parent communication and school writing",
      "Calm, boutique feel instead of a busy toolset",
    ],
    sections: [
      {
        id: "focused-choice",
        title:
          "Alternative to MagicSchool AI for teachers who want a more focused writing tool",
        body: [
          "MagicSchool covers a wide range of teaching workflows. That breadth is useful for teachers who want a single place for many classroom tasks.",
          "Zaza Draft takes a different approach. It concentrates on teacher writing where tone, clarity, and emotional sensitivity matter. For some teachers, that focus feels calmer and easier to trust.",
        ],
      },
      {
        id: "broader-vs-focused",
        title: "MagicSchool is broader. Zaza Draft is more focused.",
        body: [
          "That is the clearest honest distinction. MagicSchool can be the better fit if you want a broad toolkit with lesson and classroom support alongside writing help.",
          "Zaza Draft is likely to feel stronger if your main pain point is school writing itself, especially parent communication and report drafting where wording quality matters more than feature breadth.",
        ],
      },
      {
        id: "why-some-teachers-switch",
        title: "Why some teachers prefer a calmer writing workflow",
        body: [
          "A broad platform can be useful, but it can also feel cluttered when all you want is careful help with a difficult email or a clean set of report comments. Some teachers are not looking for more tools. They are looking for less friction.",
          "That is where a dedicated writing co-writer can feel better. The workflow is narrower, the purpose is clearer, and the product can be more conservative about tone.",
        ],
      },
      {
        id: "where-magicschool-may-win",
        title: "When MagicSchool AI may still be the better fit",
        body: [
          "If you want one product that reaches across multiple teaching workflows, MagicSchool may be the better choice. It is the broader product.",
          "This page is not claiming otherwise. Zaza Draft is the better fit for teachers who specifically want writing support where parent communication sensitivity and professional tone are the priority.",
        ],
      },
      {
        id: "why-zaza-for-writing",
        title: "Why Zaza Draft suits tone-sensitive writing",
        body: [
          "Zaza Draft is designed around the moments teachers hesitate to write: parent complaints, angry replies, report comments, progress updates, and other messages that need careful judgement.",
          "If that is the work you want help with, a dedicated writing co-writer makes sense. It keeps the product focused on better wording rather than broader workflow coverage.",
        ],
      },
      xPainParentSection,
      xPainAdminLogSection,
    ],
    comparisonBlock: {
      title: "Comparison block: MagicSchool AI and Zaza Draft",
      intro:
        "This comparison stays neutral. It is not about declaring a universal winner. It is about helping a teacher choose the product that matches the job.",
      alternativeLabel: "MagicSchool AI",
      rows: [
        {
          label: "Product scope",
          zaza: "Focused writing co-writer for teachers",
          alternative: "Broader teaching and classroom toolkit",
        },
        {
          label: "Parent communication support",
          zaza: "Core use case",
          alternative: "One part of a wider platform",
        },
        {
          label: "Report writing support",
          zaza: "Strong focus on wording and tone",
          alternative: "Available within a broader workflow set",
        },
        {
          label: "Best fit",
          zaza: "Teachers who want a calm, dedicated writing tool",
          alternative: "Teachers who want breadth across many workflows",
        },
      ],
      note: "If you want a dedicated writing co-pilot, Zaza Draft is the more focused option.",
    },
    trustBlock: {
      title:
        "Built for teachers who want less clutter and more trust in the wording",
      items: [
        {
          title: "Focused product",
          body: "Built for teacher writing tasks rather than trying to cover every teaching workflow at once.",
        },
        {
          title: "Tone-first design",
          body: "Useful when the wording itself is the risk, especially with parents, reports, and logged follow-up communication.",
        },
        {
          title: "Less clutter",
          body: "A calmer interface can matter when you are already tired and just need help drafting something properly before you shut the laptop.",
        },
      ],
    },
    faq: [
      {
        question: "Is Zaza Draft better than MagicSchool AI?",
        answer:
          "Not in every case. MagicSchool AI is broader. Zaza Draft is more focused. If you want a wider teaching toolkit, MagicSchool may suit you better. If you want dedicated writing help where tone matters, Zaza Draft may be the better fit.",
      },
      {
        question: "What makes Zaza Draft feel different?",
        answer:
          "The product emphasis is narrower. It is designed around teacher writing support, safer wording, parent communication sensitivity, and school-ready tone rather than a broad all-in-one workflow set.",
      },
      {
        question: "Who should stay with MagicSchool AI?",
        answer:
          "Teachers who want a broad platform for many classroom and teaching tasks may prefer to stay with MagicSchool AI.",
      },
      {
        question: "Who should try Zaza Draft?",
        answer:
          "Teachers who want a dedicated writing co-writer for parent emails, report comments, and other tone-sensitive school writing should try Zaza Draft.",
      },
      ...xComparisonFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/alternative-to-teachmate-ai",
        label: "Alternative to TeachMate AI",
        description:
          "Link here for teachers comparing Zaza Draft with another broad teaching workflow product.",
      },
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here to show where Zaza Draft is strongest as a focused parent communication product.",
      },
      {
        href: "/ai-report-writing-for-teachers",
        label: "AI Report Writing for Teachers",
        description:
          "Link here to show how the same focus carries into report writing and comments.",
      },
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "How to Reply to an Angry Parent Email",
        description:
          "Link here for the kind of high-stakes writing moment where a more focused product can feel more useful than a broader toolset.",
      },
      sharedFooterLinks.product,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about moving from a broad toolkit to a calmer writing-first workflow.",
        attributionPrompt:
          "Replace with a verified quote from a teacher who has tried both types of product.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about preferring Zaza Draft for parent communication because tone matters more than feature breadth.",
        attributionPrompt:
          "Replace with a verified quote from a pastoral or classroom teacher.",
      },
    ],
    cta: {
      title:
        "Try Zaza Draft if you want a calmer writing co-pilot, not more feature sprawl",
      body: "If the real problem is one difficult email, one careful report comment, or one message you still do not trust at 10pm, try the focused option built for teacher writing where tone matters most.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "alternative-to-teachmate-ai": {
    slug: "alternative-to-teachmate-ai",
    shortTitle: "Alternative to TeachMate AI",
    keyword: "alternative to teachmate ai",
    intent: "Alternative/comparison intent",
    title:
      "Alternative to TeachMate AI | Focused Teacher Writing Support | Zaza Draft",
    metaDescription:
      "Alternative to TeachMate AI for teachers who want a calmer, more focused writing co-writer. Compare Zaza Draft and TeachMate AI for parent communication, reports, and school writing.",
    h1: "Alternative to TeachMate AI",
    description:
      "A fair comparison page for teachers who want a dedicated writing product rather than a broader workflow tool.",
    ogImage: "/teacher-working-efficiently.jpg",
    heroEyebrow: "Alternative/comparison intent",
    heroDescription: [
      "Teachers looking for an alternative to TeachMate AI are often not asking for more AI in general. They are asking for better help with the one writing task still hanging over the evening, whether that is a parent reply, a logged follow-up, or a difficult report comment.",
      "TeachMate covers many teaching workflows. Zaza Draft is designed specifically for teacher writing tasks where tone matters, especially parent communication and report writing.",
    ],
    heroBullets: [
      "Broader workflow coverage versus focused writing support",
      "Stronger emphasis on calm UX and writing quality",
      "Designed for tone-sensitive teacher messages",
    ],
    sections: [
      {
        id: "focused-writing",
        title:
          "Alternative to TeachMate AI for teachers who need focused writing support",
        body: [
          "TeachMate serves a wide range of teacher workflows. That can be helpful when you want one tool to support many tasks across planning, feedback, and admin.",
          "Zaza Draft is different by design. It narrows the scope to writing where wording quality, tone, and professional appropriateness carry the most weight.",
        ],
      },
      {
        id: "breadth-vs-clarity",
        title:
          "TeachMate covers many teaching workflows. Zaza Draft is built for writing where tone matters.",
        body: [
          "That distinction matters because not every teacher wants the same kind of product. Some want a wide toolkit. Others want a dedicated co-writer that feels easier to trust in a difficult parent email or a careful report comment.",
          "If your main need is writing help rather than broader workflow coverage, a more focused product can feel more useful day to day.",
        ],
      },
      {
        id: "why-focus-helps",
        title: "Why focus can feel calmer and more practical",
        body: [
          "A narrow product has fewer distractions. You open it because you need help writing something properly, not because you want to browse a catalogue of tools.",
          "That calmer experience matters for exhausted teachers. When the product purpose is obvious, it is easier to get in, draft the message, and move on.",
        ],
      },
      {
        id: "where-teachmate-may-fit",
        title: "When TeachMate AI may still be the better fit",
        body: [
          "If you want one AI product covering a wider range of teaching tasks, TeachMate may fit your workflow well. It is the broader option.",
          "Zaza Draft is not trying to win on breadth. It is trying to be stronger on the specific writing jobs where careful tone and clearer wording matter most.",
        ],
      },
      {
        id: "why-zaza-stands-out",
        title: "Why some teachers may prefer Zaza Draft",
        body: [
          "Teachers who want boutique UX, less clutter, and more trust-first writing support may prefer Zaza Draft. The positioning is simple: help teachers write faster without making the product feel noisy or generic.",
          "If that sounds closer to what you need, it is worth trying the more focused option.",
        ],
      },
      xPainParentSection,
      xPainAdminLogSection,
    ],
    comparisonBlock: {
      title: "Comparison block: TeachMate AI and Zaza Draft",
      intro:
        "Both products support teachers. The difference is how broad the product is and how concentrated the writing experience feels.",
      alternativeLabel: "TeachMate AI",
      rows: [
        {
          label: "Product focus",
          zaza: "Dedicated writing co-writer for teachers",
          alternative: "Broader teacher workflow support",
        },
        {
          label: "Parent communication",
          zaza: "Core strength",
          alternative: "Part of a wider workflow set",
        },
        {
          label: "Report writing and comments",
          zaza: "Designed around writing quality and tone",
          alternative: "Handled within a broader toolset",
        },
        {
          label: "UX feel",
          zaza: "Calm and focused",
          alternative: "Broader and more feature-rich",
        },
      ],
      note: "Teachers who want a dedicated writing workflow may prefer Zaza Draft. Teachers who want more general coverage may prefer TeachMate AI.",
    },
    trustBlock: {
      title:
        "Built for teachers who want a calmer, more writing-first workflow",
      items: [
        {
          title: "More calm, less clutter",
          body: "A boutique writing workflow can be easier to use than a broad all-purpose teaching tool when the work is emotionally loaded.",
        },
        {
          title: "Writing quality comes first",
          body: "Parent communication, report language, and lower-risk wording are not side features. They are core use cases.",
        },
        {
          title: "Co-writer, not replacement",
          body: "The product supports professional judgement instead of trying to take it over, even when the message may become part of a school record.",
        },
      ],
    },
    faq: [
      {
        question: "Is Zaza Draft a full replacement for TeachMate AI?",
        answer:
          "Not if you want the broader workflow coverage TeachMate AI offers. Zaza Draft is the more focused product for teacher writing tasks where tone matters.",
      },
      {
        question: "What makes Zaza Draft a strong alternative?",
        answer:
          "It is a dedicated writing co-writer for teachers. The emphasis is on calmer UX, safer wording, parent communication sensitivity, and professional report writing.",
      },
      {
        question: "Who should stay with TeachMate AI?",
        answer:
          "Teachers who want wider teaching workflow support in one product may prefer to stay with TeachMate AI.",
      },
      {
        question: "Who should try Zaza Draft?",
        answer:
          "Teachers who mainly want help with parent emails, difficult replies, report comments, and other sensitive school writing should try Zaza Draft.",
      },
      ...xComparisonFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/alternative-to-magicschool-ai",
        label: "Alternative to MagicSchool AI",
        description:
          "Link here for another comparison page that highlights breadth versus focus in teacher AI tools.",
      },
      {
        href: "/teacher-email-writer",
        label: "Teacher Email Writer",
        description:
          "Link here to show the wider teacher-email use case beyond competitor comparisons.",
      },
      {
        href: "/report-comment-generator-for-teachers",
        label: "Report Comment Generator for Teachers",
        description:
          "Link here when the visitor is comparing tools for report comments specifically.",
      },
      {
        href: "/how-to-document-parent-contact-without-losing-your-mind",
        label: "How to Document Parent Contact Without Losing Your Mind",
        description:
          "Link here for the kind of admin-heavy communication work where a more focused writing product can save extra friction.",
      },
      sharedFooterLinks.product,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about choosing Zaza Draft because it feels calmer and more focused than broader teacher AI tools.",
        attributionPrompt:
          "Replace with a verified quote from a classroom or pastoral teacher.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about preferring a dedicated writing co-writer for parent communication.",
        attributionPrompt:
          "Replace with a verified quote from a teacher who trialled multiple products.",
      },
    ],
    cta: {
      title:
        "Try the focused writing option if broader tools still leave you doing the hard part",
      body: "If you want dedicated teacher writing support rather than a broader workflow tool, try Zaza Draft and see whether the calmer fit works better when the wording really matters.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-write-a-parent-complaint-email": {
    slug: "how-to-write-a-parent-complaint-email",
    shortTitle: "How to Write a Parent Complaint Email",
    keyword: "how to write a parent complaint email",
    intent: "How-to/problem intent",
    title:
      "How to Write a Parent Complaint Email | Calm, Professional Steps for Teachers | Zaza Draft",
    metaDescription:
      "How to write a parent complaint email in a calm, professional way. Use clear steps, avoid loaded language, and keep the message school-appropriate with help from Zaza Draft.",
    h1: "How to Write a Parent Complaint Email",
    description:
      "A practical, teacher-first guide to raising a concern with a parent without escalating the situation.",
    ogImage: "/difficult-conversation.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to write a parent complaint email often becomes a late-night problem because you know the issue is real but you do not want one badly phrased sentence to create a bigger one. Teachers need to raise concerns clearly without sounding reactive, vague, or accusatory.",
      "The safest approach is simple: state the concern factually, explain why it matters, and invite a constructive next step. A teacher-first co-writer can help with the wording, but the judgement still stays with you.",
    ],
    heroBullets: [
      "Lead with facts, not frustration",
      "Keep the email brief and school-appropriate",
      "End with a clear next step",
    ],
    featuredSnippet:
      "To write a parent complaint email, stick to observable facts, explain the concern calmly, state the impact on learning or safety, and invite a constructive next step. Avoid blame, loaded language, and long emotional explanations.",
    sections: [
      {
        id: "core-method",
        title:
          "How to write a parent complaint email without escalating the issue",
        body: [
          "The strongest complaint emails are calm and specific. They do not try to win an argument. They explain what happened, why it matters, and what needs to happen next.",
          "That usually means writing less than you first want to write. In most cases, a shorter email with clear facts is more professional and more effective than a long message full of backstory.",
        ],
      },
      {
        id: "start-with-facts",
        title: "Start with the concern, not the emotional backstory",
        body: [
          "Open by naming the issue in factual language. Mention the relevant incident, pattern, or concern without speculating about motives or character.",
          "Parents are far more likely to respond constructively when the message sounds grounded and measured. Observable facts keep the conversation anchored.",
        ],
        bullets: [
          "State what happened",
          "Name the impact on learning, safety, or classroom expectations",
          "Avoid emotionally loaded adjectives",
        ],
      },
      {
        id: "keep-body-tight",
        title: "Keep the body of the email factual, specific, and brief",
        body: [
          "Once the concern is stated, give just enough detail to make the point clear. Too much detail can make the email feel defensive or hostile, especially if the parent is already frustrated.",
          "If the matter is complex, the email should set up a conversation rather than try to resolve every detail in writing.",
        ],
      },
      {
        id: "invite-next-step",
        title: "Ask for partnership and give a clear next step",
        body: [
          "A complaint email works better when it points towards resolution. That might mean asking for support at home, suggesting a meeting, or explaining what school will do next.",
          "The tone can stay firm while still sounding collaborative. The message should feel like professional communication, not a personal rebuke.",
        ],
        exampleLabel: "Example closer",
        exampleBody:
          "Thank you for your support with this. I would appreciate your help in reinforcing this expectation at home, and I am happy to discuss the situation further if helpful.",
      },
      {
        id: "phrases-to-avoid",
        title: "Phrases that usually make a complaint email worse",
        body: [
          "Avoid language that sounds sarcastic, absolute, or moralising. Phrases like 'as you know', 'clearly unacceptable', or 'this must stop immediately' can harden the exchange before it has started.",
          "When you are frustrated, draft the email first, step away, then review it with fresh eyes. That pause often improves the wording more than another ten minutes of typing.",
        ],
      },
      {
        id: "co-writer-use",
        title: "When it helps to draft the email with a co-writer first",
        body: [
          "If the issue feels personal, repetitive, or emotionally draining, starting with a draft can help you avoid reactive phrasing. That is where a teacher-first tool is useful. It can give you a calmer first version to shape.",
          "The safest approach is still review-led. Use the draft to reduce friction, then make sure the final email reflects your professional judgement and school context.",
        ],
      },
      xPainParentSection,
      xPainAdminLogSection,
    ],
    trustBlock: {
      title:
        "Built for teachers who need to raise concerns without escalating them",
      items: [
        {
          title: "Use your own facts",
          body: "Start from accurate notes and your own professional context rather than asking a tool to invent details.",
        },
        {
          title: "Check tone carefully",
          body: "Sensitive messages should always be reviewed before sending, especially when a relationship is already strained.",
        },
        {
          title: "Keep the teacher in charge",
          body: "A co-writer can improve phrasing, but it should not decide what must be said or how strongly it should be said, especially if the email later becomes part of a school record.",
        },
      ],
    },
    faq: [
      {
        question: "Should a complaint email be direct or gentle?",
        answer:
          "It should be direct about the concern and gentle in tone. Teachers do not need to be vague, but the wording should remain measured and professional.",
      },
      {
        question: "What should I avoid in a parent complaint email?",
        answer:
          "Avoid blame, speculation, sarcasm, and emotionally loaded language. Stick to facts, explain the impact, and point towards a next step.",
      },
      {
        question: "When should I ask for a meeting instead of writing more?",
        answer:
          "If the issue is complex or emotionally charged, the email should often set up a conversation rather than try to solve everything in writing.",
      },
      {
        question: "Can Zaza Draft help with this kind of email?",
        answer:
          "Yes. Zaza Draft is designed for tone-sensitive teacher writing. It can help you produce a calmer first draft, but the final decision remains with the teacher.",
      },
      ...xParentFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to Respond to an Angry Parent Email",
        description:
          "Link here for the reverse situation when the parent message arrives angry and the teacher needs a calm reply.",
      },
      {
        href: "/parent-email-template-for-teachers",
        label: "Parent Email Template for Teachers",
        description:
          "Link here for reusable parent-email structures that can be adapted to concerns and follow-ups.",
      },
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here to show the tool page for teachers who want drafting support with sensitive messages.",
      },
      {
        href: "/how-to-document-parent-contact-without-losing-your-mind",
        label: "How to Document Parent Contact Without Losing Your Mind",
        description:
          "Link here when the concern email also needs to stand up later in logs, pastoral follow-up, or senior leader review.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft to make a difficult concern email sound calmer and more professional.",
        attributionPrompt:
          "Replace with a verified quote from a form tutor, head of year, or classroom teacher.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about avoiding reactive wording after a challenging day.",
        attributionPrompt:
          "Replace with a verified quote from a teacher dealing with regular parent communication.",
      },
    ],
    cta: {
      title:
        "Need help drafting the complaint email more calmly and with less risk?",
      body: "Try Zaza Draft if you want a teacher-first co-writer that helps you phrase sensitive parent concerns with more care, cleaner records, and less after-hours stress.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-respond-to-an-angry-parent-email": {
    slug: "how-to-respond-to-an-angry-parent-email",
    shortTitle: "How to Respond to an Angry Parent Email",
    keyword: "how to respond to an angry parent email",
    intent: "How-to/problem intent",
    title:
      "How to Respond to an Angry Parent Email | Calm Steps for Teachers | Zaza Draft",
    metaDescription:
      "How to respond to an angry parent email with calm, professional wording. Use a clear structure, lower the temperature, and keep boundaries intact with help from Zaza Draft.",
    h1: "How to Respond to an Angry Parent Email",
    description:
      "A practical guide for teachers who need to reply professionally when a parent email arrives hot, emotional, or accusatory.",
    ogImage: "/parent-teacher-communication.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "You open the email expecting a quick reply and instead get a novella of accusations. How to respond to an angry parent email is one of the hardest teacher writing tasks because the emotional temperature is already high. The aim is not to win the exchange. The aim is to lower the heat, protect the relationship, and keep your reply professional.",
      "A strong response acknowledges the concern, clarifies what can be clarified, and points towards a constructive next step. It should not mirror the anger in the original message.",
    ],
    heroBullets: [
      "Pause before replying",
      "Acknowledge the concern without escalating",
      "Set out facts and next steps clearly",
    ],
    featuredSnippet:
      "To respond to an angry parent email, pause before replying, acknowledge the concern without accepting inaccurate claims, restate the facts briefly, and propose a next step. The goal is to lower emotion, protect the relationship, and keep the reply professional.",
    sections: [
      {
        id: "core-approach",
        title:
          "How to respond to an angry parent email without matching the tone",
        body: [
          "The safest response is calm, brief, and purposeful. You do not need to answer every emotional line in the parent email. You need to respond to the underlying concern in a professional way.",
          "That means slowing the exchange down. The reply should sound steady even if the message you received did not.",
        ],
      },
      {
        id: "pause-first",
        title: "Pause first, especially if the email feels personal",
        body: [
          "When a message lands badly, the first draft in your head is usually not the one to send. A short pause helps you separate the parent's emotion from the practical issue that needs a response.",
          "Even ten minutes can help. If possible, draft privately first and review it before you hit send.",
        ],
      },
      {
        id: "acknowledge-carefully",
        title:
          "Acknowledge the concern without agreeing with everything in the email",
        body: [
          "Acknowledgement is not the same as accepting blame. A sentence such as 'Thank you for sharing your concerns' or 'I can see this issue is important to you' can lower tension without conceding points that are inaccurate.",
          "This is one of the most useful tone shifts a teacher can make. It shows professionalism and keeps the reply open rather than defensive.",
        ],
      },
      {
        id: "facts-and-boundaries",
        title: "Restate the facts and keep your boundaries intact",
        body: [
          "Once you have acknowledged the concern, explain the relevant facts clearly and briefly. If part of the issue needs a longer discussion, say so and move the conversation to a meeting or call.",
          "You can be calm and still be firm. A professional response does not need to accept unreasonable framing in order to sound courteous.",
        ],
        exampleLabel: "Example transition",
        exampleBody:
          "To clarify, the incident was addressed in line with our classroom expectations, and I would be happy to discuss the detail with you further by phone if that would be helpful.",
      },
      {
        id: "next-step",
        title: "Give the parent a clear next step",
        body: [
          "An angry exchange often settles faster when the reply points somewhere concrete. That might mean offering a meeting, confirming school actions, or explaining when you will follow up.",
          "Without a next step, the email can become another round of emotional back-and-forth.",
        ],
      },
      {
        id: "use-a-co-writer",
        title: "Use a co-writer when you need distance from the emotion",
        body: [
          "If you are upset, tired, or worried about sounding sharp, a teacher-first co-writer can help you get to a calmer first version faster. That is especially useful when you need a reply after a long day.",
          "The key is still review. Use the draft to reduce stress, then make sure the final response is accurate, proportionate, and right for the situation.",
        ],
      },
      xPainParentSection,
      xPainAdminLogSection,
    ],
    trustBlock: {
      title:
        "Built for teachers who need a reply they can still stand behind tomorrow",
      items: [
        {
          title: "A calm opening",
          body: "Acknowledgement lowers the temperature even when you disagree with parts of the message.",
        },
        {
          title: "Brief factual clarification",
          body: "A short explanation is usually more effective than a point-by-point defence.",
        },
        {
          title: "A constructive next step",
          body: "The reply should move the conversation towards resolution rather than another emotional round, and still read well if it is later shared or logged.",
        },
      ],
    },
    faq: [
      {
        question: "Should I reply straight away to an angry parent email?",
        answer:
          "Not usually. A short pause often leads to a better reply. Teachers are generally better served by a calm, reviewed response than an immediate emotional one.",
      },
      {
        question: "Do I need to answer every accusation in the email?",
        answer:
          "No. Focus on the real issue, clarify the essential facts, and propose the next step. A point-by-point argument often escalates the exchange.",
      },
      {
        question: "How do I stay polite without sounding weak?",
        answer:
          "Use calm acknowledgement, then be clear and concise about the facts and boundaries. Professional tone is not the same as giving in.",
      },
      {
        question: "Can Zaza Draft help with angry parent replies?",
        answer:
          "Yes. Zaza Draft is designed for difficult teacher writing tasks where tone matters. It can help with a calmer first draft, while the teacher keeps final control.",
      },
      ...xParentFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-parent-complaint-email",
        label: "How to Write a Parent Complaint Email",
        description:
          "Link here for the proactive side of difficult parent communication when the teacher needs to raise the concern first.",
      },
      {
        href: "/teacher-email-writer",
        label: "Teacher Email Writer",
        description:
          "Link here when the visitor wants broader teacher-email support beyond this specific angry-parent scenario.",
      },
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here when the visitor wants a drafting tool for sensitive parent communication.",
      },
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "How to Reply to an Angry Parent Email",
        description:
          "Link here for the newer pain-first page that reflects the exact late-night teacher search behind this kind of reply.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft to reply professionally after receiving an angry parent email.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using a calmer first draft to avoid sounding defensive.",
        attributionPrompt:
          "Replace with a verified quote from a teacher handling frequent parent communication.",
      },
    ],
    cta: {
      title:
        "Want a calmer first draft for the angry parent replies that spill into your evening?",
      body: "Try Zaza Draft if you want teacher-first writing support that helps you answer difficult parent emails with more care, cleaner wording, and less emotional spillover into the rest of the week.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "report-card-comment-generator": {
    slug: "report-card-comment-generator",
    shortTitle: "Report Card Comment Generator",
    keyword: "report card comment generator",
    intent: "Tool intent",
    title:
      "Report Card Comment Generator for Teachers | Faster, Balanced Comments | Zaza Draft",
    metaDescription:
      "Report card comment generator for teachers who need balanced, school-appropriate comments faster. Reduce repetition, keep tone consistent, and stay in control with Zaza Draft.",
    h1: "Report Card Comment Generator",
    description:
      "Teacher-first help for report card comments that need to be clear, consistent, and professionally worded.",
    ogImage: "/progress-report.jpg",
    heroEyebrow: "Tool intent",
    heroDescription: [
      "Report card comments are always quick until you reach the pupil you most want to be fair to. A report card comment generator should help teachers write faster without flattening everything into the same generic sentence. The best support keeps comments balanced, school-appropriate, and easier to personalise.",
      "Zaza Draft is built as a report-writing co-writer. It helps teachers start from a stronger draft, then review, refine, and keep their professional judgement in the final version.",
    ],
    heroBullets: [
      "Draft comments from your own notes",
      "Reduce repetitive phrasing across a full class set",
      "Keep comments balanced and professionally worded",
    ],
    sections: [
      {
        id: "what-good-looks-like",
        title:
          "Why a report card comment generator needs more than fluent wording",
        body: [
          "Report card comments need balance. They should reflect strengths, identify next steps, and stay proportionate to the evidence you have. That is a different job from generic content generation.",
          "Teachers also need comments that feel school-ready. Overblown praise, vague targets, or repetitive language can make the whole set feel weaker even when the grammar is fine.",
        ],
      },
      {
        id: "speed-without-generic",
        title: "How to save time without making every comment sound the same",
        body: [
          "The real challenge is maintaining consistency without sounding copy-and-paste. A useful generator helps you vary wording, preserve clarity, and still move faster through a full set of reports.",
          "That is especially valuable late in term when the mental load is high and the risk of repetitive phrasing increases.",
        ],
      },
      {
        id: "teacher-use-cases",
        title: "Where teachers usually need the most support",
        body: [
          "Teachers often need help phrasing progress, effort, attitude to learning, and next steps in a way that sounds fair and clear. Those are the parts that can become repetitive or awkward when you are writing at speed.",
          "A teacher-first co-writer helps by turning those rough points into a cleaner draft without pretending to know the pupil better than you do.",
        ],
        bullets: [
          "Progress summaries",
          "Strengths and achievements",
          "Targets and next-step language",
        ],
      },
      {
        id: "why-zaza",
        title: "How Zaza Draft supports report card writing",
        body: [
          "Zaza Draft is designed for teacher writing workflows. That includes report card comments, progress statements, and other school summaries where tone and consistency matter.",
          "Because the workflow is review-led, you can move faster while still checking whether each comment feels fair, specific, and ready for school use.",
        ],
      },
      {
        id: "best-practice",
        title: "Best practice for using AI on report cards",
        body: [
          "Start from real notes, not a blank generic prompt. Read each draft with the pupil in mind. Cut anything vague, remove anything too sweeping, and make sure the final version still sounds like something you would stand behind.",
          "That is the difference between responsible report support and blindly generated text.",
        ],
      },
      xPainReportSeasonSection,
      xPainReportRecordSection,
    ],
    comparisonBlock: {
      title:
        "Comparison block: dedicated report card support vs manual comment banks",
      intro:
        "A comment bank can save keystrokes. A teacher-first co-writer can save more time when you need tailored, better-phrased drafts.",
      alternativeLabel: "Manual comment bank",
      rows: [
        {
          label: "Personalisation",
          zaza: "Drafts from notes and teacher context",
          alternative: "Teacher adapts fixed phrases manually",
        },
        {
          label: "Tone consistency",
          zaza: "Built around school-ready wording",
          alternative: "Depends on manual editing and reuse",
        },
        {
          label: "Speed at scale",
          zaza: "Useful across a full class set",
          alternative: "Can still become repetitive and slow",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer",
          alternative: "Copy, paste, edit, repeat",
        },
      ],
    },
    trustBlock: {
      title:
        "Built for teachers who want comments they can defend and families can understand",
      items: [
        {
          title: "Consistency without sameness",
          body: "A good tool helps you keep a steady tone without turning every pupil into the same comment.",
        },
        {
          title: "Professional judgement preserved",
          body: "The teacher still decides whether the wording is fair, accurate, and ready for parents or reports.",
        },
        {
          title: "Designed for school writing",
          body: "The product emphasis is on teacher writing quality, not generic AI output for any audience or any context.",
        },
      ],
    },
    faq: [
      {
        question:
          "Can AI-generated report card comments still feel individual?",
        answer:
          "Yes, if they start from your notes and you review them carefully. The teacher still provides the context and decides the final wording.",
      },
      {
        question: "How is this different from a bank of report comments?",
        answer:
          "A bank gives you fixed text to reuse. A co-writer helps turn your own notes into cleaner, more flexible report card comments.",
      },
      {
        question: "Is this just for end-of-term reports?",
        answer:
          "No. The same workflow can help with interim reports, progress updates, and other structured school comments.",
      },
      {
        question: "Why would a teacher use Zaza Draft for this?",
        answer:
          "Because the product is focused on teacher writing tasks where tone and wording matter, including report comments and parent-facing school writing.",
      },
      ...xReportFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/report-comment-generator-for-teachers",
        label: "Report Comment Generator for Teachers",
        description:
          "Link here for the broader report-comment page covering non-report-card comment use cases as well.",
      },
      {
        href: "/ai-report-writing-for-teachers",
        label: "AI Report Writing for Teachers",
        description:
          "Link here when the visitor wants the full report-writing workflow rather than a single comment generator page.",
      },
      {
        href: "/positive-but-honest-report-card-comments-for-struggling-students",
        label:
          "Positive but Honest Report Card Comments for Struggling Students",
        description:
          "Link here for the hardest report-card wording case, where balanced language matters most.",
      },
      sharedFooterLinks.reports,
      sharedFooterLinks.product,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: [
      "WebPage",
      "BreadcrumbList",
      "SoftwareApplication",
      "FAQPage",
    ],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about producing report card comments faster without sounding repetitive.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or phase leader.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about keeping comments balanced and professional across an entire class.",
        attributionPrompt:
          "Replace with a verified quote from a primary or secondary teacher.",
      },
    ],
    cta: {
      title:
        "Make report card season feel more manageable when the hardest comments are still left",
      body: "Try Zaza Draft if you want a teacher-first way to draft balanced report card comments faster without losing control of the final wording or spending the evening rewriting one sentence.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "parent-email-template-for-teachers": {
    slug: "parent-email-template-for-teachers",
    shortTitle: "Parent Email Template",
    keyword: "parent email template for teachers",
    intent: "Template intent",
    title:
      "Parent Email Template for Teachers | Practical School Email Formats | Zaza Draft",
    metaDescription:
      "Parent email template for teachers with practical, school-appropriate formats for updates, concerns, and follow-ups. Adapt faster and keep tone professional with Zaza Draft.",
    h1: "Parent Email Template for Teachers",
    description:
      "Ready-to-adapt parent email structures for teachers who want a professional starting point without sounding stiff or generic.",
    ogImage: "/parent-teacher-communication-templates.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "Parents' evening prep at 10pm is rarely about the seating plan. It is usually the one email you still have not phrased. A parent email template for teachers is useful when you know the purpose of the message but do not want to build the structure from scratch every time.",
      "Zaza Draft goes one step further by helping you adapt the template into a message that fits the real situation. The teacher still decides the final wording.",
    ],
    heroBullets: [
      "Use a professional structure in minutes",
      "Adapt the template to concerns, updates, and follow-ups",
      "Keep your own judgement over the final message",
    ],
    sections: [
      {
        id: "why-templates-help",
        title: "Why a parent email template for teachers saves more than time",
        body: [
          "Templates reduce the mental work of starting. When you already have the basic structure, it is easier to focus on what matters: the tone, the facts, and the next step.",
          "That is especially useful for teachers who write many parent messages each week and want more consistency without sounding robotic.",
        ],
      },
      {
        id: "simple-structure",
        title: "A simple parent email structure teachers can reuse",
        body: [
          "Most teacher-parent emails work well with the same basic shape: greeting, purpose, brief context, key information, next step, and courteous close. That structure keeps the message clear without making it feel cold.",
          "You can adjust the middle of the email depending on whether the message is a positive update, a concern, a reminder, or a meeting follow-up.",
        ],
        bullets: [
          "Clear opening line",
          "Short factual middle section",
          "Specific next step or request",
        ],
      },
      {
        id: "usable-template",
        title: "Parent email template for teachers you can adapt quickly",
        body: [
          "The template below is intentionally simple. It gives you a professional structure without forcing the message into a fixed script.",
        ],
        exampleLabel: "Template",
        exampleBody:
          "Subject: Update regarding [student name]\n\nDear [parent or carer name],\n\nI am writing to update you about [brief topic]. Today / this week, [clear factual summary].\n\nI wanted to make you aware because [brief reason or impact]. To support [student name], I will [school action or next step]. It would be helpful if you could [specific request, if appropriate].\n\nPlease let me know if you would like to discuss this further.\n\nKind regards,\n[teacher name]",
      },
      {
        id: "adapt-for-purpose",
        title: "How to adapt the template for different parent emails",
        body: [
          "For a positive message, make the factual middle section specific about the achievement. For a concern, keep the wording calm and focused on observable behaviour or progress. For a follow-up, remind the parent of the agreed action and next step.",
          "The structure stays similar, but the tone and detail should change with the situation.",
        ],
      },
      {
        id: "from-template-to-draft",
        title: "Why a co-writer can be better than a fixed template alone",
        body: [
          "Templates are helpful, but they still need shaping. A teacher-first co-writer can turn your rough notes into a draft that fits the same structure while sounding more natural and situation-specific.",
          "That makes it easier to keep the efficiency of a template without sending something that feels too generic.",
        ],
      },
      xPainParentSection,
      xPainAdminLogSection,
    ],
    comparisonBlock: {
      title: "Comparison block: fixed template vs teacher-first co-writer",
      intro:
        "Templates are useful starting points. A dedicated co-writer helps you personalise the same structure with less effort.",
      alternativeLabel: "Fixed template only",
      rows: [
        {
          label: "Starting point",
          zaza: "Template plus drafted wording from your notes",
          alternative: "Blank spaces inside a fixed structure",
        },
        {
          label: "Tone adaptation",
          zaza: "Easier to shift from positive to sensitive messages",
          alternative: "Teacher rewrites the tone manually",
        },
        {
          label: "Personalisation",
          zaza: "Supports more natural situation-specific wording",
          alternative: "Risk of sounding formulaic",
        },
        {
          label: "Teacher control",
          zaza: "Review-led and editable",
          alternative: "Fully manual editing after the template",
        },
      ],
    },
    trustBlock: {
      title:
        "Built for teachers who want a starting point that still feels safe to send",
      items: [
        {
          title: "Professional structure",
          body: "A good template keeps the email clear without making it feel corporate or cold.",
        },
        {
          title: "Flexible tone",
          body: "Teachers need the same structure to work across good news, concerns, reminders, and follow-ups.",
        },
        {
          title: "Teacher judgement preserved",
          body: "The final message still needs the teacher's sense of context, proportion, and appropriateness, especially if it may lead to more contact later.",
        },
      ],
    },
    faq: [
      {
        question: "Should every parent email use the same structure?",
        answer:
          "Not exactly, but a shared structure helps. Most messages work well with a clear purpose, a short factual summary, and a practical next step.",
      },
      {
        question: "How do I stop a template sounding too generic?",
        answer:
          "Add specifics from the real situation and keep the wording proportionate. A template is there to reduce friction, not remove your professional voice.",
      },
      {
        question: "Can Zaza Draft help me adapt a template faster?",
        answer:
          "Yes. Zaza Draft can help turn your notes into a fuller draft that follows a sensible parent-email structure while keeping the teacher in control.",
      },
      {
        question: "Who is this page for?",
        answer:
          "It is for teachers and school staff who want reusable parent-email formats for routine updates, concerns, and follow-up communication.",
      },
      ...xParentFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here for visitors who want a tool-led page rather than a template-led page.",
      },
      {
        href: "/how-to-write-a-parent-complaint-email",
        label: "How to Write a Parent Complaint Email",
        description:
          "Link here for teachers adapting the template to a more difficult concern email.",
      },
      {
        href: "/teacher-email-writer",
        label: "Teacher Email Writer",
        description:
          "Link here for broader teacher-email support across parents and school communication.",
      },
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "How to Reply to an Angry Parent Email",
        description:
          "Link here for a pain-first page showing how these templates need to adapt when the tone of the incoming message is already difficult.",
      },
      sharedFooterLinks.product,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using the template structure to reply faster to routine parent messages.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or tutor.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about adapting the structure for both positive updates and concerns.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or school leader.",
      },
    ],
    cta: {
      title:
        "Turn the template into a calmer first draft when you do not want to start from nothing",
      body: "Try Zaza Draft if you want more than a fixed template and would rather start from a teacher-first draft you can quickly adapt without losing your own voice.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "teacher-email-writer": {
    slug: "teacher-email-writer",
    shortTitle: "Teacher Email Writer",
    keyword: "teacher email writer",
    intent: "Tool intent",
    title:
      "Teacher Email Writer | Professional School Emails, Faster | Zaza Draft",
    metaDescription:
      "Teacher email writer for parent updates, difficult messages, reminders, and school follow-ups. Draft faster, keep tone professional, and stay in control with Zaza Draft.",
    h1: "Teacher Email Writer",
    description:
      "A teacher-first writing page for educators who need help with parent emails, staff communication, and other school messages.",
    ogImage: "/teacher-writing-newsletter.jpg",
    heroEyebrow: "Tool intent",
    heroDescription: [
      "You sit down to send one quick school email and forty minutes later you are still trimming one sentence because it sounds too cold. A teacher email writer should make school communication easier without turning it into generic office language.",
      "Zaza Draft helps with that as a focused co-writer. It supports parent emails, reminders, follow-ups, sensitive replies, and other teacher writing where tone matters and time is short.",
    ],
    heroBullets: [
      "Write parent and school emails faster",
      "Keep tone professional across different situations",
      "Edit every draft before you send it",
    ],
    sections: [
      {
        id: "different-email-jobs",
        title:
          "Why a teacher email writer needs to handle more than one kind of message",
        body: [
          "Teacher email writing is varied. Some emails are warm and positive. Others need to be firm, factual, or carefully neutral. A useful writing tool should support that range without making every message sound the same.",
          "That is why teacher-specific support matters. The same tone does not work for a parent concern, a quick reminder, and a meeting follow-up.",
        ],
      },
      {
        id: "what-teachers-actually-write",
        title: "The messages teachers most often need help with",
        body: [
          "Many teachers want help with parent updates, reminders, difficult conversations, behaviour concerns, pastoral follow-ups, and progress emails. These messages are common, but they still take time because tone has to be handled carefully.",
          "A focused co-writer is useful because it reduces the blank-page problem while staying closer to the writing teachers actually do.",
        ],
        bullets: [
          "Parent updates and reminders",
          "Sensitive replies and complaints",
          "Meeting follow-ups and next-step emails",
        ],
      },
      {
        id: "why-broad-tools-miss",
        title: "Why generic writing tools often miss the mark for teachers",
        body: [
          "Generic AI tools are flexible, but they often need more prompting and more correction to sound right for school communication. The problem is not that they cannot produce sentences. The problem is that teachers still have to do more work to make those sentences feel safe and suitable.",
          "A teacher-first product narrows that gap by focusing on the kinds of communication teachers actually send.",
        ],
      },
      {
        id: "how-zaza-supports",
        title: "How Zaza Draft works as a teacher email writer",
        body: [
          "Zaza Draft helps turn notes, prompts, or rough sentences into cleaner email drafts for school use. It is especially helpful when you want the wording to be calm, concise, and professionally judged rather than generic or overly polished.",
          "Because the workflow is editable and review-led, you can use it across a range of email types while keeping control of the final message.",
        ],
      },
      {
        id: "best-fit",
        title: "Who this is best for",
        body: [
          "This kind of tool suits teachers and school staff who spend too much time shaping emails they could probably write, but do not want to write from nothing every time. It is also useful for educators who find difficult messages mentally draining.",
          "If you want a dedicated writing co-writer instead of a generic AI assistant, this is the better framing.",
        ],
      },
      xPainParentSection,
      xPainAdminLogSection,
    ],
    comparisonBlock: {
      title: "Comparison block: teacher email writer vs generic AI writer",
      intro:
        "The big difference is not whether the tool can write. It is whether it is tuned to the writing teachers actually need to send.",
      alternativeLabel: "Generic AI writer",
      rows: [
        {
          label: "Core use case",
          zaza: "Teacher emails and school writing",
          alternative: "Anything the user prompts for",
        },
        {
          label: "Tone handling",
          zaza: "Focused on professional school communication",
          alternative: "Depends heavily on the prompt",
        },
        {
          label: "Sensitive messages",
          zaza: "Built with parent communication in mind",
          alternative: "Requires more careful manual correction",
        },
        {
          label: "Workflow",
          zaza: "Co-writer that supports review and editing",
          alternative: "Broad output, broader variability",
        },
      ],
    },
    trustBlock: {
      title:
        "Built for teachers who need school-ready wording and fewer after-hours rewrites",
      items: [
        {
          title: "School-ready wording",
          body: "The aim is professional, conservative wording that suits teachers rather than sales, marketing, or office writing.",
        },
        {
          title: "Emotionally difficult messages included",
          body: "Parent complaints and tense replies are treated as real use cases, not awkward edge cases.",
        },
        {
          title: "Teacher stays in charge",
          body: "The tool helps with drafting. The teacher still decides what is right to send, save, log, or follow up on.",
        },
      ],
    },
    faq: [
      {
        question: "What kinds of emails can this help with?",
        answer:
          "It can help with parent updates, reminders, concerns, meeting follow-ups, and other school messages where clear, professional wording matters.",
      },
      {
        question: "Does it replace the teacher?",
        answer:
          "No. Zaza Draft is positioned as a co-writer. The teacher still reviews, edits, and decides the final wording.",
      },
      {
        question: "Is this only for parent emails?",
        answer:
          "No. Parent communication is a core use case, but the broader teacher-email workflow can also include reminders, follow-ups, and school communication tasks.",
      },
      {
        question: "Why not just use a general AI writer?",
        answer:
          "You can, but teachers often need more manual correction to get the tone right. Zaza Draft is more focused on teacher writing tasks where wording quality really matters.",
      },
      ...xParentFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here for teachers whose main email need is parent communication rather than broader school email writing.",
      },
      {
        href: "/parent-email-template-for-teachers",
        label: "Parent Email Template for Teachers",
        description:
          "Link here for visitors who want reusable email structures and examples.",
      },
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to Respond to an Angry Parent Email",
        description:
          "Link here for the most emotionally difficult email scenario teachers commonly search for.",
      },
      {
        href: "/how-to-document-parent-contact-without-losing-your-mind",
        label: "How to Document Parent Contact Without Losing Your Mind",
        description:
          "Link here for the admin-heavy follow-up side of school communication that often lands alongside difficult emails.",
      },
      sharedFooterLinks.product,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: [
      "WebPage",
      "BreadcrumbList",
      "SoftwareApplication",
      "FAQPage",
    ],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about cutting the time spent rewriting school emails after the school day.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or school leader.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft for parent updates and difficult replies in the same workflow.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or tutor.",
      },
    ],
    cta: {
      title:
        "Use a teacher email writer that stays calm under pressure and still sounds like you",
      body: "Try Zaza Draft if you want faster school-email drafting without falling back on generic wording, broader-tool clutter, or another evening lost to tone-checking.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "ai-report-writing-for-teachers": {
    slug: "ai-report-writing-for-teachers",
    shortTitle: "AI Report Writing for Teachers",
    keyword: "ai report writing for teachers",
    intent: "Tool intent",
    title:
      "AI Report Writing for Teachers | Faster Drafts, Professional Judgement Preserved | Zaza Draft",
    metaDescription:
      "AI report writing for teachers that helps you draft reports faster while keeping professional judgement in place. Improve tone, reduce repetition, and stay in control with Zaza Draft.",
    h1: "AI Report Writing for Teachers",
    description:
      "Teacher-first guidance and product positioning for report writing that needs speed, consistency, and professional judgement.",
    ogImage: "/report-card-grades.jpg",
    heroEyebrow: "Tool intent",
    heroDescription: [
      "Report writing always looks manageable until you reach the comments you most want to get right and the evening disappears with them. AI report writing for teachers only works well when the tool supports judgement instead of trying to replace it.",
      "Zaza Draft is built around that idea. It is a co-writer for reports and comments, helping teachers move faster while keeping the final decision with the person who knows the pupil.",
    ],
    heroBullets: [
      "Draft reports faster from real notes",
      "Reduce repetitive phrasing",
      "Keep accuracy and tone under teacher control",
    ],
    sections: [
      {
        id: "why-ai-needs-guardrails",
        title:
          "Why AI report writing for teachers needs strong professional guardrails",
        body: [
          "Reports are not casual content. They are formal school writing that may be read by parents, leaders, and sometimes pupils. That means speed alone is not enough.",
          "A useful AI report workflow should help teachers phrase what they already know more clearly. It should not encourage overclaiming, vague filler, or automatic language that has not been properly reviewed.",
        ],
      },
      {
        id: "where-ai-helps",
        title: "Where AI can genuinely help with teacher report writing",
        body: [
          "The biggest time savings usually come from structure and phrasing. Teachers often know the core points but lose time turning those notes into a polished, balanced report comment.",
          "That is where AI can be useful. It can provide a cleaner first version, reduce repetition, and make full sets of reports more manageable.",
        ],
      },
      {
        id: "where-teachers-stay-essential",
        title: "Where teacher judgement still matters most",
        body: [
          "The teacher remains essential for accuracy, nuance, and proportion. Only the teacher can decide whether a comment is fair, evidence-based, and suitable for that pupil and context.",
          "That is why the strongest use of AI is co-writing rather than delegation. The workflow should save time without weakening professional ownership.",
        ],
      },
      {
        id: "how-zaza-works",
        title: "How Zaza Draft approaches report writing",
        body: [
          "Zaza Draft focuses on teacher writing tasks such as report comments, parent communication, and school summaries. The output is designed to feel measured and school-appropriate rather than exaggerated or generic.",
          "Teachers can use it to shape raw notes into drafts, then edit for accuracy, emphasis, and final tone before anything is shared.",
        ],
      },
      {
        id: "safer-workflow",
        title: "A safer workflow for AI report writing",
        body: [
          "The safest workflow starts with your own notes, asks the tool for structure and wording help, and ends with careful teacher review. That approach lowers workload while preserving judgement.",
          "If a product encourages fast copy-and-paste without review, it is probably the wrong fit for report writing. Zaza Draft is built for a more careful process.",
        ],
      },
      xPainReportSeasonSection,
      xPainReportRecordSection,
    ],
    comparisonBlock: {
      title: "Comparison block: focused report co-writer vs broad AI tool",
      intro:
        "Teachers can use broad AI tools for reports, but the fit is different when the product is designed specifically around school writing.",
      alternativeLabel: "Broad AI tool",
      rows: [
        {
          label: "Report-writing focus",
          zaza: "Designed for report comments and school writing",
          alternative: "General output across any topic",
        },
        {
          label: "Tone",
          zaza: "Conservative, professional, teacher-first",
          alternative: "Varies more depending on prompt quality",
        },
        {
          label: "Workflow",
          zaza: "Co-writer with review in mind",
          alternative: "Flexible, but more manual judgment required",
        },
        {
          label: "Best fit",
          zaza: "Teachers who want focused writing help",
          alternative: "Users who need broad AI for many unrelated tasks",
        },
      ],
    },
    trustBlock: {
      title:
        "Built for teachers who need report support without losing professional ownership",
      items: [
        {
          title: "Accuracy",
          body: "Reports should begin from teacher knowledge and reviewed notes, not generated assumptions.",
        },
        {
          title: "Professional tone",
          body: "The wording should feel proportionate, balanced, and suitable for school reporting.",
        },
        {
          title: "Teacher ownership",
          body: "AI can help with drafting, but the teacher remains responsible for what is ultimately said and what may later be discussed with parents or leaders.",
        },
      ],
    },
    faq: [
      {
        question: "Is AI report writing appropriate for teachers?",
        answer:
          "It can be, when used as drafting support rather than a replacement for professional judgement. The teacher should still review every final report or comment.",
      },
      {
        question: "What part of report writing does AI help with most?",
        answer:
          "Usually the phrasing and structure. Teachers often know what they want to say, but AI can help them get to a polished draft more quickly.",
      },
      {
        question: "What should never be skipped?",
        answer:
          "Review for accuracy, tone, and appropriateness. Report writing is too important for blind copy-and-paste.",
      },
      {
        question: "Why is Zaza Draft relevant here?",
        answer:
          "Because it is designed for teacher writing tasks such as report comments and parent communication, with a calmer, more focused approach than a broad AI tool.",
      },
      ...xReportFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/report-comment-generator-for-teachers",
        label: "Report Comment Generator for Teachers",
        description:
          "Link here for the narrower report-comment use case when the user is not looking for the full report-writing workflow.",
      },
      {
        href: "/report-card-comment-generator",
        label: "Report Card Comment Generator",
        description:
          "Link here for report-card specific searches and comment-generation intent.",
      },
      {
        href: "/positive-but-honest-report-card-comments-for-struggling-students",
        label:
          "Positive but Honest Report Card Comments for Struggling Students",
        description:
          "Link here for the most emotionally difficult part of report writing, where balanced wording matters most.",
      },
      sharedFooterLinks.reports,
      sharedFooterLinks.product,
    ],
    relatedSlugs: refreshedPainRelatedSlugs,
    structuredDataTypes: [
      "WebPage",
      "BreadcrumbList",
      "SoftwareApplication",
      "FAQPage",
    ],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about reducing report-writing workload without sacrificing professional standards.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or middle leader.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft as a first-draft tool rather than a report replacement.",
        attributionPrompt:
          "Replace with a verified quote from a report-writing teacher user.",
      },
    ],
    cta: {
      title:
        "Use AI for report writing without giving up judgement or your weekend",
      body: "Try Zaza Draft if you want faster report drafting, more careful wording, and fewer late-night rewrites while keeping the teacher fully in charge of the final version.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-reply-to-a-difficult-parent-email": {
    slug: "how-to-reply-to-a-difficult-parent-email",
    shortTitle: "How to Reply to a Difficult Parent Email",
    keyword: "how to reply to a difficult parent email",
    intent: "How-to/problem intent",
    title:
      "How to Reply to a Difficult Parent Email | Calm Guidance for Teachers | Zaza Draft",
    metaDescription:
      "How to reply to a difficult parent email with calm, professional wording. Avoid escalation, protect relationships, and keep your judgement in control with help from Zaza Draft.",
    h1: "How to Reply to a Difficult Parent Email",
    description:
      "A practical late-night guide for teachers who need to answer a difficult parent email without making a hard situation worse.",
    ogImage: "/difficult-conversation.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to reply to a difficult parent email is a question many teachers end up searching for when the school day should already be over. If you are staring at a message that feels sharp, unfair, or exhausting, you are not alone in dreading the reply.",
      "The safest response is usually calm, short, and carefully structured. Zaza Draft can help with that first draft, but teachers stay in full control, edit every line, and decide what is actually sent.",
    ],
    heroBullets: [
      "Avoid accidental escalation",
      "Keep the reply professional and measured",
      "Save time while keeping your own voice",
    ],
    featuredSnippet:
      "To reply to a difficult parent email, pause first, acknowledge the concern without mirroring the tone, clarify the key facts briefly, and offer a clear next step. Keep the reply professional, avoid point-scoring, and review it before sending.",
    sections: [
      {
        id: "why-tone-matters",
        title: "Why tone matters when replying to a difficult parent email",
        body: [
          "A difficult parent email can tempt you into defending every detail. That is understandable, but it usually makes the exchange longer and harder. In school communication, the tone of your reply often shapes what happens next.",
          "A calm tone protects your professionalism, lowers the temperature, and gives you more room to hold clear boundaries. It also helps if the email is later shared with line managers, pastoral leads, or safeguarding staff.",
        ],
      },
      {
        id: "common-pitfalls",
        title: "Common pitfalls that make difficult parent emails worse",
        body: [
          "Teachers often get into trouble when they reply too quickly, explain too much, or sound sharper than they intend. Even a technically accurate reply can land badly if it sounds defensive, irritated, or dismissive.",
          "Another common mistake is trying to resolve a complicated issue fully by email. If the matter is emotional, safeguarding-related, SEN-related, or linked to behaviour patterns, it may need a more structured follow-up.",
        ],
        bullets: [
          "Replying while still annoyed",
          "Answering every accusation line by line",
          "Using wording that sounds cold or clipped",
        ],
      },
      {
        id: "safer-structure",
        title: "A safer structure for how to reply to a difficult parent email",
        body: [
          "A practical structure is: acknowledge, clarify, redirect, and close. Acknowledge the concern without agreeing with inaccurate claims. Clarify the key facts in a measured way. Redirect towards the next useful step. Then close professionally.",
          "This keeps the reply from becoming an argument. It also makes it easier to stay consistent with school expectations around behaviour communication, parents' evening follow-up, and pastoral concerns.",
        ],
        exampleLabel: "Example opener",
        exampleBody:
          "Thank you for your email. I can see that you are concerned about what happened today, and I appreciate you getting in touch.\n\nTo clarify, the incident was addressed in line with our classroom expectations. I am happy to outline the next steps and discuss the matter further if helpful.",
      },
      {
        id: "when-to-move-off-email",
        title: "When to move the conversation away from email",
        body: [
          "Some situations should not stay in an email thread. If the issue is complex, emotionally charged, safeguarding-related, or likely to continue, a phone call or meeting is often safer and more productive.",
          "Your email can simply set that up. It does not need to solve everything. A brief reply that invites a call is often more professional than a long written defence.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft is designed for difficult school writing where tone matters. It can help you turn a frustrated mental draft into calmer wording, especially when you are tired and do not trust your first instinct.",
          "The product is a co-writer, not a replacement. You stay in charge, review every word, and make sure the final response fits your school context, your evidence, and your professional judgement.",
        ],
      },
    ],
    trustBlock: {
      title: "Built for teachers who care about relationships",
      items: [
        {
          title: "Conservative wording",
          body: "Helpful when you need to sound professional, not reactive, in difficult parent communication.",
        },
        {
          title: "Teacher control",
          body: "You edit and approve every word, so the final reply still feels like yours.",
        },
        {
          title: "Designed for school context",
          body: "Useful for behaviour issues, SEN concerns, safeguarding sensitivity, and general parent communication pressure.",
        },
      ],
    },
    faq: [
      {
        question: "Should I reply immediately to a difficult parent email?",
        answer:
          "Usually not. A short pause often leads to a calmer, clearer reply. If possible, draft first and review before sending.",
      },
      {
        question: "How long should the reply be?",
        answer:
          "Shorter is usually safer. Cover the key concern, clarify essential facts, and set out the next step without over-explaining.",
      },
      {
        question: "What if the parent email feels rude or aggressive?",
        answer:
          "Keep your tone measured and professional. Do not mirror the style of the original message. If the issue is serious, involve the relevant line manager or pastoral lead.",
      },
      {
        question: "Should I answer every point they raised?",
        answer:
          "Not always. Focus on the core issue and what needs to happen next. A point-by-point defence often keeps the conflict going.",
      },
      {
        question: "Can Zaza Draft help me sound calmer?",
        answer:
          "Yes. Zaza Draft is designed to support teachers with sensitive writing, giving you a lower-risk first draft while leaving the final judgement with you.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to Respond to an Angry Parent Email",
        description:
          "Link here for the first-wave page focused specifically on angry-parent email replies.",
      },
      {
        href: "/how-to-respond-to-an-angry-parent",
        label: "How to Respond to an Angry Parent",
        description:
          "Link here for the broader version of this problem that includes non-email situations too.",
      },
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here for visitors who want drafting support rather than guidance alone.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-respond-to-an-angry-parent",
      "how-to-respond-to-an-angry-parent-email",
      "ai-parent-email-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft late at night to reply more calmly to a difficult parent email.",
        attributionPrompt:
          "Replace with a verified quote from a teacher, tutor, or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about saving time while avoiding defensive wording.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher.",
      },
    ],
    cta: {
      title: "Try drafting your next response calmly with Zaza Draft",
      body: "If you want help wording difficult parent replies without losing your professional voice, try Zaza Draft and start from a steadier first draft.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-respond-to-an-angry-parent": {
    slug: "how-to-respond-to-an-angry-parent",
    shortTitle: "How to Respond to an Angry Parent",
    keyword: "how to respond to an angry parent",
    intent: "How-to/problem intent",
    title:
      "How to Respond to an Angry Parent | Calm School Communication for Teachers | Zaza Draft",
    metaDescription:
      "How to respond to an angry parent with calm, professional communication. Lower the temperature, protect relationships, and keep boundaries clear with help from Zaza Draft.",
    h1: "How to Respond to an Angry Parent",
    description:
      "A practical guide for teachers dealing with angry parent communication by email, phone, or follow-up after school.",
    ogImage: "/parent-teacher-communication.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to respond to an angry parent is not just an email problem. Sometimes it starts in reception, after parents' evening, on the phone, or in a message that lands when you are already running on empty.",
      "The goal is not to win the exchange. It is to lower the temperature, stay professional, and move the conversation towards something more constructive. Zaza Draft can help with the wording when you need a calm script or follow-up email.",
    ],
    heroBullets: [
      "Stay calm without sounding passive",
      "Protect professional boundaries",
      "Follow up with clear written wording",
    ],
    featuredSnippet:
      "To respond to an angry parent, stay calm, acknowledge the concern without arguing, keep your explanation brief, and move quickly towards a clear next step such as a call, meeting, or written follow-up. Professional tone and steady boundaries matter more than winning the point.",
    sections: [
      {
        id: "emotional-reality",
        title: "Why angry parent situations feel so draining",
        body: [
          "An angry parent can trigger stress fast because the conversation rarely stays only about the issue. It can feel personal, public, or unfair, especially if behaviour, safeguarding, SEND support, or classroom decisions are involved.",
          "That is why teachers often need a script, not just confidence. A simple structure helps you keep your footing when the conversation starts to spiral.",
        ],
      },
      {
        id: "what-to-do-first",
        title: "What to do first when a parent is angry",
        body: [
          "Start by slowing the pace. Keep your voice or wording steady, avoid matching the emotion, and focus on what the parent is actually upset about. In many cases, they want to feel heard before they can hear anything back.",
          "Acknowledgement is useful here. It lowers tension without requiring you to agree with every claim or accept an unfair version of events.",
        ],
      },
      {
        id: "clear-boundaries",
        title: "How to keep boundaries clear without sounding confrontational",
        body: [
          "Professional boundaries matter most when the other person is upset. You can stay courteous while being clear about what you can explain, what needs follow-up, and what should happen next.",
          "This is especially important around repeated behaviour issues, complaints after parents' evening, or concerns that may need senior staff involvement.",
        ],
        bullets: [
          "Do not argue about every detail in the moment",
          "Keep to observable facts and school process",
          "Move towards a follow-up step when needed",
        ],
      },
      {
        id: "best-follow-up",
        title: "The follow-up matters as much as the live conversation",
        body: [
          "Even if the original interaction happens face to face or by phone, the follow-up email often becomes the record that sets the tone afterwards. It should be calm, concise, and clear about what was discussed and what happens next.",
          "That written follow-up can prevent misunderstandings and reduce the chance of the situation reopening later in a more difficult form.",
        ],
        exampleLabel: "Example follow-up line",
        exampleBody:
          "Thank you for speaking with me today. As discussed, we will continue to monitor the situation in school and I will update you again by the end of the week.",
      },
      {
        id: "how-zaza-supports",
        title: "How Zaza supports difficult parent communication",
        body: [
          "Zaza Draft helps with the written part of these situations - follow-up emails, clarification messages, and carefully worded responses when the relationship feels tense. It is designed to make wording safer and more emotionally intelligent without taking over the decision-making.",
          "Teachers stay in control. Zaza helps you sound clear and appropriate when you are tired, frustrated, or worried about making things worse.",
        ],
      },
    ],
    trustBlock: {
      title: "Built for teachers who need lower-risk wording under pressure",
      items: [
        {
          title: "Professional tone first",
          body: "Useful for difficult parent conversations where wording can easily escalate the issue.",
        },
        {
          title: "Suitable for school follow-up",
          body: "Supports emails and summaries that may later be shared with senior staff or families.",
        },
        {
          title: "Your judgement stays central",
          body: "Zaza helps draft and refine, but teachers decide what is accurate, proportionate, and right to send.",
        },
      ],
    },
    faq: [
      {
        question: "How do I stay calm when a parent is angry with me?",
        answer:
          "Use a simple structure: acknowledge, clarify briefly, and move to the next step. That helps you avoid reacting defensively in the moment.",
      },
      {
        question: "Should I apologise if the parent is angry?",
        answer:
          "You can acknowledge the concern without automatically accepting blame. The right wording depends on the situation and the facts.",
      },
      {
        question: "What if the parent wants to argue in detail?",
        answer:
          "Keep the conversation focused and professional. If needed, move the issue into a more structured meeting or involve the appropriate colleague.",
      },
      {
        question:
          "Do I need a written follow-up after a difficult conversation?",
        answer:
          "Often yes. A calm written summary can clarify next steps and reduce future misunderstanding.",
      },
      {
        question: "Can Zaza Draft help with the follow-up email?",
        answer:
          "Yes. Zaza Draft is designed for tone-sensitive teacher writing, including follow-up emails after difficult parent interactions.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-reply-to-a-difficult-parent-email",
        label: "How to Reply to a Difficult Parent Email",
        description:
          "Link here for the email-specific version of this problem and a more detailed written-response workflow.",
      },
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to Respond to an Angry Parent Email",
        description:
          "Link here for the first-wave page focused on written angry-parent replies.",
      },
      {
        href: "/teacher-email-writer",
        label: "Teacher Email Writer",
        description:
          "Link here for broader teacher-email help beyond this specific high-conflict moment.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-reply-to-a-difficult-parent-email",
      "how-to-respond-to-an-angry-parent-email",
      "teacher-email-writer",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about feeling less alone and more in control after a difficult parent interaction.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or head of year.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft to write a calm follow-up after an angry phone call.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or SENCO.",
      },
    ],
    cta: {
      title: "Need help wording the follow-up more calmly?",
      body: "Try Zaza Draft if you want a steadier first draft for difficult parent communication, without giving up control over the final message.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "Try the tool",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-write-a-behaviour-email-to-parents": {
    slug: "how-to-write-a-behaviour-email-to-parents",
    shortTitle: "How to Write a Behaviour Email to Parents",
    keyword: "how to write a behaviour email to parents",
    intent: "How-to/problem intent",
    title:
      "How to Write a Behaviour Email to Parents | Clear, Professional Guidance | Zaza Draft",
    metaDescription:
      "How to write a behaviour email to parents with calm, professional wording. Explain behaviour concerns clearly, avoid escalation, and keep the relationship workable with help from Zaza Draft.",
    h1: "How to Write a Behaviour Email to Parents",
    description:
      "A practical guide for teachers who need to email home about behaviour without sounding accusatory or vague.",
    ogImage: "/positive-behavior.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to write a behaviour email to parents often becomes a late-night task because the wording feels risky. You know what happened, but you also know one clumsy sentence can bring an angry reply before registration and create even more work tomorrow.",
      "A calmer structure helps you say what matters without making things worse. Zaza Draft supports that first draft so you do not have to start from a blank page at 10pm, and teachers still edit and approve every word.",
    ],
    heroBullets: [
      "Be clear about the behaviour concern",
      "Avoid blame and emotionally loaded phrasing",
      "Set out the next step professionally",
    ],
    featuredSnippet:
      "To write a behaviour email to parents, describe the behaviour factually, explain its impact on learning, safety, or classroom routines, state what action was taken in school, and set out one clear next step. Keep the tone calm and professional rather than moralising or emotional. Avoid sweeping phrases such as 'always disruptive' or guesses about motive because they are more likely to trigger defensiveness and harder to stand behind later in school records. A good behaviour email should be brief, specific, and easy to understand on a phone. Zaza Draft can suggest safer wording, while teachers still review, edit, and approve every line.",
    sections: [
      {
        id: "why-behaviour-emails-are-hard",
        title: "Why behaviour emails to parents feel high-risk",
        body: [
          "Behaviour emails are difficult because they sit right on the line between information and emotion. Teachers are often trying to communicate a real concern while also protecting the relationship with home, the classroom atmosphere, and their own energy.",
          "That is why the wording needs to be careful. The message should support accountability without reading like a reprimand, especially when behaviour, SEN support, pastoral context, or previous incidents are already in the background.",
        ],
      },
      {
        id: "what-to-include",
        title: "What to include in a behaviour email to parents",
        body: [
          "The safest behaviour email is factual, proportionate, and brief. Say what happened, when relevant, explain the impact, and outline what happened in school afterwards.",
          "Parents usually need clarity more than detail. The aim is not to relive the incident in writing. It is to communicate professionally and move towards support or follow-up.",
        ],
        bullets: [
          "Observable behaviour",
          "Impact on learning, safety, or classroom routines",
          "School response and next step",
        ],
      },
      {
        id: "phrasing-to-avoid",
        title: "Phrasing that often makes a behaviour email land badly",
        body: [
          "Teachers usually regret wording that sounds absolute, moralising, or emotionally charged. Phrases like 'constantly disruptive', 'completely unacceptable', or 'refused to behave' can be heard as judgement rather than information.",
          "More measured wording keeps the email stronger. It also helps when a message may later be read by senior leaders, pastoral teams, or used in wider behaviour communication.",
        ],
      },
      {
        id: "better-structure",
        title:
          "A better structure for how to write a behaviour email to parents",
        body: [
          "Start with the purpose of the email, then summarise the behaviour factually. Explain the impact in school terms, not personal frustration. Briefly note the school response and finish with the next step or request for support.",
          "This structure is especially useful when behaviour concerns are emerging and you want to communicate early rather than waiting for a larger issue.",
        ],
        exampleLabel: "Example structure",
        exampleBody:
          "I am writing to let you know about a behaviour concern that arose in lesson today. During independent work, [student name] repeatedly called out after reminders and disrupted the concentration of others.\n\nI addressed this in class and reminded them of our expectations. I wanted to make you aware so that we can work together to support improvement. Please let me know if you would like to discuss this further.",
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft can help you turn rough incident notes into calmer, more professional wording. That is useful when you need to write quickly but do not want the email to sound harsher than intended or open the door to another long back-and-forth.",
          "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most. You still decide what to include, how serious the tone should be, and whether the wording reflects the behaviour concern fairly. Zaza supports the drafting. It does not replace teacher judgement.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: focused behaviour-email support vs all-in-one AI platforms",
      intro:
        "A broad AI tool can generate an email. The harder job is producing wording that sounds measured, school-appropriate, and less likely to escalate a sensitive parent exchange.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "Behaviour communication focus",
          zaza: "Built for teacher emails where tone is high-stakes",
          alternative: "One use case among many",
        },
        {
          label: "Emotional safety",
          zaza: "More conservative, relationship-aware wording",
          alternative: "More variable depending on the prompt",
        },
        {
          label: "Professional voice",
          zaza: "Customised to your school context and tone",
          alternative: "Often needs heavier editing",
        },
        {
          label: "Teacher control",
          zaza: "Co-writer workflow with full review",
          alternative:
            "Teacher has to shape generic output into something safer",
        },
      ],
      note: "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
    },
    trustBlock: {
      title: "Built for teachers writing about behaviour with care",
      items: [
        {
          title: "Clear but not inflammatory",
          body: "Helpful when you need to address behaviour concerns without triggering unnecessary escalation.",
        },
        {
          title: "Appropriate for school records",
          body: "Useful for messages that may later be seen by form tutors, heads of year, SEN staff, or senior leaders.",
        },
        {
          title: "Teacher-first co-writing",
          body: "The draft supports your wording while keeping full control of the final email in teacher hands.",
        },
      ],
    },
    faq: [
      {
        question: "Should I email home about behaviour straight away or wait?",
        answer:
          "That depends on the severity and your school's behaviour systems. When you do email, calm and early communication is often better than writing only after frustration has built up.",
      },
      {
        question: "How much detail should I include in the behaviour email?",
        answer:
          "Enough to explain the concern clearly, but not so much that the email becomes a long incident report. Keep it factual and proportionate.",
      },
      {
        question: "How do I stop the email sounding accusatory?",
        answer:
          "Focus on observable behaviour, its impact, and the next step. Avoid loaded language, assumptions about motives, and sweeping statements.",
      },
      {
        question: "Should I mention what we already did in school?",
        answer:
          "Usually yes, briefly. Parents often want to know that the issue was addressed and what will happen next.",
      },
      {
        question:
          "What if I need the email to be suitable for SLT or pastoral records as well?",
        answer:
          "Use short factual sentences, avoid speculation, and explain the next step clearly. That makes the email easier to stand behind if it is later reviewed by colleagues.",
      },
      {
        question:
          "Should I copy in the head of year on the first behaviour email?",
        answer:
          "Follow your school's policy. If the concern is low-level and early, a direct email home may be enough. If the issue is repeated, serious, or already escalated, copying in the relevant colleague can make sense.",
      },
      {
        question: "Can Zaza Draft help with behaviour emails?",
        answer:
          "Yes. Zaza Draft is designed to help teachers phrase sensitive school communication more carefully while keeping the teacher in control of the final wording.",
      },
    ],
    internalLinks: [
      {
        href: "/parent-email-about-student-behaviour",
        label: "Parent Email About Student Behaviour",
        description:
          "Link here for a closely related page focused on behaviour-email wording and structure.",
      },
      {
        href: "/parent-wont-respond-to-behaviour-email",
        label: "Parent Wont Respond to Behaviour Email",
        description:
          "Link here for the next problem in the chain when behaviour emails go unanswered and you need calmer follow-up wording.",
      },
      {
        href: "/how-to-tell-parents-their-child-is-struggling-with-behaviour",
        label: "How to Tell Parents Their Child Is Struggling with Behaviour",
        description:
          "Link here for the more delicate version where the concern is ongoing rather than a single incident.",
      },
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here for visitors who want tool-based help drafting behaviour emails more calmly.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "parent-email-about-student-behaviour",
      "parent-wont-respond-to-behaviour-email",
      "how-to-tell-parents-their-child-is-struggling-with-behaviour",
      "ai-parent-email-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about writing clearer behaviour emails without sounding harsh.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or behaviour lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about saving evening time on difficult behaviour communication.",
        attributionPrompt:
          "Replace with a verified quote from a primary or secondary teacher.",
      },
    ],
    cta: {
      title: "Draft your next behaviour email more calmly",
      body: "Try Zaza Draft on zazadraft.com if you want help wording behaviour concerns clearly, professionally, and without accidental escalation.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "parent-email-about-student-behaviour": {
    slug: "parent-email-about-student-behaviour",
    shortTitle: "Parent Email About Student Behaviour",
    keyword: "parent email about student behaviour",
    intent: "How-to/problem intent",
    title:
      "Parent Email About Student Behaviour | Professional Wording for Teachers | Zaza Draft",
    metaDescription:
      "Parent email about student behaviour guidance for teachers who need clear, professional wording. Explain concerns calmly, avoid escalation, and keep control with Zaza Draft.",
    h1: "Parent Email About Student Behaviour",
    description:
      "Practical guidance for teachers who need to write home about behaviour in a way that is clear, fair, and professionally judged.",
    ogImage: "/parent-teacher-communication.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "A parent email about student behaviour can be harder to write than the incident itself. You want to be honest, but not inflammatory. You want to be clear, but not make the relationship with home harder than it needs to be.",
      "Zaza Draft helps teachers get to calmer wording faster. It is a co-writer for sensitive school communication, so the teacher still reviews, edits, and approves every word.",
    ],
    heroBullets: [
      "Communicate behaviour concerns clearly",
      "Keep the wording balanced and professional",
      "Avoid replies that create more heat than help",
    ],
    featuredSnippet:
      "A parent email about student behaviour should describe the behaviour factually, explain its impact on learning or classroom routines, note the school response, and set out the next step. The tone should stay calm, professional, and proportionate.",
    sections: [
      {
        id: "why-these-emails-matter",
        title:
          "Why a parent email about student behaviour needs careful wording",
        body: [
          "Behaviour emails shape more than a single incident. They affect trust, home-school communication, and whether parents feel invited into a constructive partnership or pushed into a defensive position.",
          "That is why careful wording matters. A strong email is clear enough to address the issue while still sounding fair and school-appropriate.",
        ],
      },
      {
        id: "what-parents-need",
        title: "What parents usually need from this kind of email",
        body: [
          "Most parents want to understand what happened, how serious it is, and what the school has already done. They do not usually need every detail. They need clarity, proportion, and a sense that the situation is being handled professionally.",
          "If you can give that without sounding irritated or vague, the email is already doing most of its job well.",
        ],
      },
      {
        id: "better-wording",
        title:
          "How to make a parent email about student behaviour sound clearer",
        body: [
          "Start with the purpose of the message. Then describe the behaviour in observable terms. Avoid labels and broad judgments. Explain the impact on learning, routines, or classroom safety, then outline the action already taken in school.",
          "This approach works well whether the issue is repeated low-level disruption, a more serious behaviour incident, or an emerging pattern that needs early intervention.",
        ],
        bullets: [
          "Describe the behaviour, not the child's character",
          "Keep the language proportionate",
          "End with a practical next step",
        ],
      },
      {
        id: "common-mistakes",
        title: "Common mistakes teachers want to avoid",
        body: [
          "It is easy to sound more frustrated in writing than you mean to. Teachers often regret phrases that feel moralising, sweeping, or too emotionally loaded once they reread them later.",
          "Another common mistake is trying to make the email do too much at once. In many cases, the message should inform and invite support, not resolve every aspect of the behaviour issue in writing.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without taking over your professional voice",
        body: [
          "Zaza Draft helps teachers shape more careful wording for difficult parent communication, including behaviour emails, report comments, and other school writing. It is especially useful when you know the facts but want help finding language that sounds measured and appropriate.",
          "Because it is a teacher-first co-writer, you remain in control. You decide what is fair to say, how direct to be, and whether the draft is right for the situation.",
        ],
        exampleLabel: "Example closing line",
        exampleBody:
          "I wanted to make you aware of this so that we can work together to support improvement. Please let me know if you would like to discuss the matter further.",
      },
    ],
    trustBlock: {
      title:
        "Built for teachers who want to protect the relationship as well as address the issue",
      items: [
        {
          title: "Behaviour wording with care",
          body: "Useful when you need to be clear about a problem without sounding accusatory.",
        },
        {
          title: "Appropriate for sensitive contexts",
          body: "Helpful for behaviour communication that may overlap with pastoral, SEN, or safeguarding concerns.",
        },
        {
          title: "Teacher judgement preserved",
          body: "The final message still depends on your own knowledge of the pupil, family, and school context.",
        },
      ],
    },
    faq: [
      {
        question: "Should a behaviour email be formal?",
        answer:
          "It should be professional and clear. Formality can vary by school context, but the wording should stay measured and appropriate.",
      },
      {
        question: "How do I describe repeated behaviour issues fairly?",
        answer:
          "Use specific patterns and observable examples rather than sweeping phrases. That keeps the email more accurate and less emotionally charged.",
      },
      {
        question: "What if I am worried the parent will react badly?",
        answer:
          "That is exactly when careful wording matters most. A short, factual, professional email is usually safer than a long or highly emotional one.",
      },
      {
        question: "Should I ask for parental support directly?",
        answer:
          "Yes, where appropriate. A calm invitation to work together can make the message more constructive.",
      },
      {
        question: "Can Zaza Draft help with this kind of behaviour email?",
        answer:
          "Yes. Zaza Draft is built for teacher writing tasks where tone matters, including difficult parent communication around behaviour.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to Write a Behaviour Email to Parents",
        description:
          "Link here for the direct how-to version of this behaviour-email search intent.",
      },
      {
        href: "/how-to-tell-parents-their-child-is-struggling-with-behaviour",
        label: "How to Tell Parents Their Child Is Struggling with Behaviour",
        description:
          "Link here for a more delicate, ongoing-behaviour conversation page.",
      },
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here for tool-based drafting help with sensitive parent messages.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-write-a-behaviour-email-to-parents",
      "how-to-tell-parents-their-child-is-struggling-with-behaviour",
      "ai-parent-email-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about feeling more confident sending behaviour emails home.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about avoiding wording that could have escalated a behaviour issue.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or SENCO.",
      },
    ],
    cta: {
      title: "Write home about behaviour with less second-guessing",
      body: "Try Zaza Draft if you want calmer behaviour-email wording that still sounds like you and respects your professional judgement.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-tell-parents-their-child-is-struggling-with-behaviour": {
    slug: "how-to-tell-parents-their-child-is-struggling-with-behaviour",
    shortTitle: "How to Tell Parents Their Child Is Struggling with Behaviour",
    keyword: "how to tell parents their child is struggling with behaviour",
    intent: "How-to/problem intent",
    title:
      "How to Tell Parents Their Child Is Struggling with Behaviour | Teacher Guidance | Zaza Draft",
    metaDescription:
      "How to tell parents their child is struggling with behaviour in a calm, professional way. Raise concerns early, avoid blame, and keep the relationship constructive with help from Zaza Draft.",
    h1: "How to Tell Parents Their Child Is Struggling with Behaviour",
    description:
      "A practical guide for teachers who need to raise an ongoing behaviour concern with care, clarity, and professional judgement.",
    ogImage: "/teacher-working-at-desk-with-laptop.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to tell parents their child is struggling with behaviour can feel especially hard because the issue is often bigger than one incident. You may be trying to communicate a pattern, not just a moment, and that makes tone even more important.",
      "Teachers often worry about sounding harsh, unfair, or alarmist. A calmer structure helps you raise the concern honestly while protecting the relationship and keeping next steps clear.",
    ],
    heroBullets: [
      "Raise an ongoing concern carefully",
      "Avoid blame while staying honest",
      "Keep the conversation constructive and school-focused",
    ],
    featuredSnippet:
      "To tell parents their child is struggling with behaviour, describe the pattern factually, explain the impact on learning or routines, outline what the school has already tried, and invite a constructive next step. Keep the tone calm, specific, and free from blame.",
    sections: [
      {
        id: "why-this-is-different",
        title:
          "Why telling parents their child is struggling with behaviour feels different from reporting one incident",
        body: [
          "This kind of message is more delicate because it points to an ongoing concern. Parents may hear it as a judgement about their child, their home, or their parenting, even when that is not the intention at all.",
          "That is why the language needs to be especially measured. Teachers need to communicate the seriousness of the pattern without sounding hopeless, critical, or overly dramatic.",
        ],
      },
      {
        id: "how-to-frame-it",
        title: "How to frame the concern so parents can hear it more clearly",
        body: [
          "Focus on the pattern you are seeing and the effect it is having in school. Keep the wording tied to observable behaviour, classroom routines, safety, or progress rather than assumptions about attitude or motives.",
          "This is also a good place to mention support already in place. That signals that the school is approaching the issue thoughtfully rather than simply passing the problem home.",
        ],
      },
      {
        id: "what-to-say",
        title:
          "A practical structure for how to tell parents their child is struggling with behaviour",
        body: [
          "Start by naming the purpose of the email or conversation. Then describe the concern as a pattern using concrete, school-based language. Explain the impact and note what has already been tried. Finish by inviting collaboration on next steps.",
          "That structure works well for classroom behaviour, repeated disruption, emotional regulation concerns, and situations that may sit alongside SEN or pastoral needs.",
        ],
        bullets: [
          "Name the pattern calmly",
          "Explain the school impact clearly",
          "Invite shared support rather than blame",
        ],
        exampleLabel: "Example wording",
        exampleBody:
          "I wanted to share a concern that we have noticed over recent weeks. [Student name] has been finding it difficult to meet our behaviour expectations consistently in class, particularly during independent work and transitions.\n\nWe have been using reminders and classroom support strategies in school, but I felt it would be helpful to let you know so that we can work together on the next steps.",
      },
      {
        id: "pitfalls",
        title: "Common pitfalls when raising an ongoing behaviour concern",
        body: [
          "Teachers often slip into broader labels when they are tired, such as saying a pupil is 'always disruptive' or 'struggling in every lesson'. Even when frustration is understandable, that kind of language can make the message harder for parents to hear.",
          "It is also easy to make the email too bleak. If there are strengths, improvements, or specific support steps, include them. That makes the concern easier to engage with constructively.",
        ],
      },
      {
        id: "how-zaza-supports",
        title: "How Zaza helps teachers phrase difficult behaviour concerns",
        body: [
          "Zaza Draft helps teachers shape lower-risk wording for difficult parent communication, including behaviour concerns that are ongoing or emotionally sensitive. It can help you move from rough notes to something more balanced and professionally expressed.",
          "Teachers still stay in control. You decide how direct the message should be, what context matters, and whether the final wording feels fair and appropriate for the child and family.",
        ],
      },
    ],
    trustBlock: {
      title: "Built for teachers raising concerns with care, not blame",
      items: [
        {
          title: "Sensitive wording support",
          body: "Useful when the issue is ongoing and the relationship with home matters as much as the message itself.",
        },
        {
          title: "Professional, school-ready tone",
          body: "Helpful for behaviour concerns that may overlap with pastoral work, SEND support, or senior-leadership follow-up.",
        },
        {
          title: "Teacher judgement remains central",
          body: "The tool supports careful drafting. It does not replace your knowledge of the child, context, or family.",
        },
      ],
    },
    faq: [
      {
        question:
          "How do I raise a behaviour concern without sounding negative?",
        answer:
          "Stay factual, describe the pattern, explain the impact, and include the next step. That keeps the message constructive rather than negative.",
      },
      {
        question: "Should I mention strategies already tried in school?",
        answer:
          "Yes. That helps parents see that the concern is being handled thoughtfully and that the school is already supporting the child.",
      },
      {
        question: "What if the child may need SEN or pastoral support?",
        answer:
          "Use clear, careful wording and involve the relevant colleagues where appropriate. The message should stay within your role and school process.",
      },
      {
        question: "Is this better handled in person than by email?",
        answer:
          "Sometimes yes. Email can still be useful to open the conversation, record the concern, or follow up after a meeting.",
      },
      {
        question: "Can Zaza Draft help with this sort of message?",
        answer:
          "Yes. Zaza Draft is built for sensitive teacher writing and can help you phrase an ongoing behaviour concern more carefully while you keep full control of the final wording.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to Write a Behaviour Email to Parents",
        description:
          "Link here for the more direct incident-focused behaviour-email page.",
      },
      {
        href: "/parent-email-about-student-behaviour",
        label: "Parent Email About Student Behaviour",
        description:
          "Link here for a related page focused on clear behaviour-email wording.",
      },
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here for visitors who want drafting support as well as guidance.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-write-a-behaviour-email-to-parents",
      "parent-email-about-student-behaviour",
      "ai-parent-email-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finally finding wording for an ongoing behaviour concern that felt fair and calm.",
        attributionPrompt:
          "Replace with a verified quote from a form tutor, SENCO, or classroom teacher.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about reducing stress before sending behaviour-related emails home.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or pastoral lead.",
      },
    ],
    cta: {
      title: "Raise behaviour concerns with more care and less stress",
      body: "Try Zaza Draft if you want help finding calmer wording for ongoing behaviour concerns while keeping your professional judgement fully intact.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "positive-but-honest-report-card-comments": {
    slug: "positive-but-honest-report-card-comments",
    shortTitle: "Positive but Honest Report Card Comments",
    keyword: "positive but honest report card comments",
    intent: "Template intent",
    title:
      "Positive but Honest Report Card Comments | Balanced UK Examples for Teachers | Zaza Draft",
    metaDescription:
      "Positive but honest report card comments for teachers who need balanced, kind, professional wording. Write clearly about progress and concerns without sounding harsh with help from Zaza Draft.",
    h1: "Positive but Honest Report Card Comments",
    description:
      "Balanced report card language for teachers who want to be truthful, encouraging, and professionally careful at the same time.",
    ogImage: "/progress-report.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "Positive but honest report card comments are one of the hardest parts of report season. Teachers want to be fair and encouraging, but not so softened that the real concern disappears.",
      "That tension is exactly why report writing takes so long. Zaza Draft helps teachers find balanced language faster, then customise it to their own voice rather than relying on generic phrases.",
    ],
    heroBullets: [
      "Write honestly without sounding harsh",
      "Keep comments balanced and school-appropriate",
      "Customised to your voice, not generic",
    ],
    featuredSnippet:
      "A balanced comment example: '[Student] has faced challenges with focus this term, but shows potential when supported one-to-one. With greater consistency and confidence, they should be able to make steadier progress next term.'",
    sections: [
      {
        id: "why-balance-is-hard",
        title: "Why positive but honest report card comments are so difficult",
        body: [
          "Teachers are often trying to do two things at once in the same sentence. You need to reflect the reality of the term, but you also want to avoid language that feels crushing, vague, or unfair to the pupil.",
          "That is why these comments take longer than expected. The difficulty is not only what to say. It is how to say it with enough care, clarity, and professional judgement.",
        ],
      },
      {
        id: "what-balanced-sounds-like",
        title:
          "What positive but honest report card comments usually sound like",
        body: [
          "Balanced comments tend to acknowledge strengths, effort, or potential while still naming the real area of concern. They avoid empty praise, but they also avoid language that sounds final or overly negative.",
          "In UK school contexts, that usually means measured wording around attainment, focus, resilience, independence, and progress rather than blunt labels.",
        ],
        bullets: [
          "Name a real strength or positive pattern",
          "State the concern clearly but proportionately",
          "Point towards realistic next steps",
        ],
      },
      {
        id: "example-snippets",
        title: "Example positive but honest report card comments",
        body: [
          "These are examples of the kind of language Zaza Draft can help generate. They should still be customised to your voice, subject, phase, and knowledge of the pupil.",
        ],
        exampleLabel: "Example comment snippets",
        exampleBody:
          "[Student] approaches lessons with a positive attitude and contributes well in discussion, but needs to apply the same care to independent written work.\n\n[Student] has made some progress this term, particularly when tasks are carefully scaffolded, and now needs to work on building greater confidence when attempting work independently.\n\n[Student] is polite and well liked by peers, though lapses in focus have affected the consistency of their work this term.\n\n[Student] shows clear potential and can produce good work when fully engaged, but would benefit from developing more resilient study habits and greater attention to detail.",
      },
      {
        id: "phrases-to-avoid",
        title: "Phrases that can make comments sound too soft or too harsh",
        body: [
          "Teachers often drift towards either vague praise or blunt criticism when tired. Comments such as 'is doing well' may say too little, while phrases such as 'does not try hard enough' can sound overly personal or judgmental.",
          "More useful language stays specific and professional. It describes what has been seen in school and what improvement could look like next.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft can help turn your rough notes into more balanced report wording, especially when you are trying to keep a comment honest without making it sound bleak. It is useful for report comments, low attainment wording, and comments about behaviour or social development.",
          "Teachers remain in full control. You edit, refine, and approve every comment so the final version still reflects your professional judgement and school expectations.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: balanced report wording vs generic comment banks",
      intro:
        "Static banks can provide phrases, but they often lean too broad or too bland. Teachers usually need wording that sounds more individual and better judged.",
      alternativeLabel: "Generic comment bank",
      rows: [
        {
          label: "Tone balance",
          zaza: "Helps you combine honesty with encouragement",
          alternative: "Often either too vague or too blunt",
        },
        {
          label: "Personalisation",
          zaza: "Built from your notes and wording preferences",
          alternative: "Fixed phrases that need heavy editing",
        },
        {
          label: "Professional voice",
          zaza: "Customised to your voice, not generic",
          alternative: "Can sound standardised across many pupils",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer workflow",
          alternative: "Manual copy, paste, and revise",
        },
      ],
    },
    trustBlock: {
      title: "Built for teachers who want to be truthful without sounding cold",
      items: [
        {
          title: "Balanced wording",
          body: "Useful when you want comments that are kind, accurate, and still professionally honest.",
        },
        {
          title: "Teacher-first report support",
          body: "Designed for report comments and school writing rather than broad generic AI output.",
        },
        {
          title: "Your final judgement stays central",
          body: "Zaza helps with phrasing, but teachers decide whether a comment is fair, proportionate, and ready to send.",
        },
      ],
    },
    faq: [
      {
        question:
          "How do I make a report comment positive without hiding the concern?",
        answer:
          "A balanced comment usually names a genuine strength or potential, then clearly explains the concern and the next step. The positive element should not erase the honest one.",
      },
      {
        question: "Should I always start with something positive?",
        answer:
          "Often yes, but it should be real and relevant. Empty praise can weaken the comment rather than improve it.",
      },
      {
        question: "What if the pupil has had a very difficult term?",
        answer:
          "Keep the wording measured and specific. Focus on what has been observed in school, any support given, and realistic steps forward.",
      },
      {
        question: "Can Zaza Draft make comments sound less generic?",
        answer:
          "Yes. Zaza Draft is designed to help teachers shape more tailored report comments from their own notes, rather than relying on one-size-fits-all phrasing.",
      },
      {
        question: "Is this suitable for UK school reports?",
        answer:
          "Yes. The wording style is aligned with UK English and school-appropriate professional communication.",
      },
    ],
    internalLinks: [
      {
        href: "/report-comments-for-struggling-students",
        label: "Report Comments for Struggling Students",
        description:
          "Link here for broader wording around pupils who are struggling academically, behaviourally, or socially.",
      },
      {
        href: "/report-card-comment-generator",
        label: "Report Card Comment Generator",
        description:
          "Link here for visitors who want a tool page as well as examples and guidance.",
      },
      {
        href: "/ai-report-writing-for-teachers",
        label: "AI Report Writing for Teachers",
        description:
          "Link here for the wider report-writing workflow and product positioning.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "report-comments-for-struggling-students",
      "report-card-comments-for-students-with-behaviour-issues",
      "report-card-comment-generator",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finding wording that was honest but still kind during report season.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or head of department.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about reducing the dread of writing difficult report comments.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher.",
      },
    ],
    cta: {
      title: "Write balanced report comments with less second-guessing",
      body: "Try Zaza Draft if you want help finding honest, professional wording for report comments without falling back on generic phrases.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "report-comments-for-struggling-students": {
    slug: "report-comments-for-struggling-students",
    shortTitle: "Report Comments for Struggling Students",
    keyword: "report comments for struggling students",
    intent: "Template intent",
    title:
      "Report Comments for Struggling Students | Balanced UK Examples for Teachers | Zaza Draft",
    metaDescription:
      "Report comments for struggling students with balanced, professional wording for teachers. Write honestly about academic, behavioural, or social challenges with help from Zaza Draft.",
    h1: "Report Comments for Struggling Students",
    description:
      "Careful report wording for teachers who need to describe struggle without sounding harsh, hopeless, or generic.",
    ogImage: "/report-card-grades.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "Report comments for struggling students are often the comments teachers agonise over most. You want to be accurate about the challenge, but you also want the language to stay respectful, constructive, and fair.",
      "Zaza Draft helps teachers shape balanced report comments more quickly, using wording that can be customised to your voice rather than copied from a generic bank.",
    ],
    heroBullets: [
      "Write with honesty and care",
      "Cover academic, behaviour, or social concerns",
      "Customised to your voice, not generic",
    ],
    featuredSnippet:
      "A balanced comment example: '[Student] has found some aspects of the curriculum challenging this term and still needs regular support to stay focused and complete tasks. With continued guidance and greater confidence, they should be able to make more secure progress.'",
    sections: [
      {
        id: "what-struggling-can-mean",
        title: "What report comments for struggling students need to capture",
        body: [
          "A pupil may be struggling academically, behaviourally, socially, or through a mix of factors. That is part of what makes the wording hard. A comment has to be truthful without flattening a complex picture into something simplistic.",
          "It also needs to sound fair to families reading it at home. The wording should signal concern without making the pupil sound defined by the difficulty.",
        ],
      },
      {
        id: "balancing-honesty-and-hope",
        title: "How to balance honesty and hope in report comments",
        body: [
          "The strongest comments describe the current challenge, then point towards the support, conditions, or habits that could help the pupil move forward. That keeps the tone realistic but not final.",
          "Teachers often find this balance easier when they focus on patterns and next steps rather than personal judgements.",
        ],
      },
      {
        id: "example-language",
        title: "Example report comments for struggling students",
        body: [
          "These examples show the kind of measured wording Zaza Draft can help generate. They work best when adapted to your subject, phase, and knowledge of the pupil.",
        ],
        exampleLabel: "Example comment snippets",
        exampleBody:
          "[Student] has found it difficult to maintain focus during lessons this term and often benefits from additional prompting to complete tasks.\n\n[Student] is still developing confidence in core skills and requires regular support to apply learning independently.\n\n[Student] has faced some social challenges this term, though there have been positive moments when supported carefully by adults and peers.\n\n[Student] has not yet met all expected standards, but shows encouraging signs of progress when tasks are broken into smaller steps and expectations are made clear.",
      },
      {
        id: "how-to-avoid-sounding-hopeless",
        title: "How to avoid sounding hopeless or overly soft",
        body: [
          "Teachers usually want to avoid two extremes. One is bleak wording that sounds as if nothing is working. The other is language so softened that it hides the real issue.",
          "A more useful middle ground is to describe what the pupil is finding difficult, then add where support, structure, or consistency has helped.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft is useful when you have the knowledge but are struggling to phrase it in a balanced way. It can help turn rough notes into more professional report wording, especially for comments about low attainment, behaviour, focus, or social development.",
          "You still decide the final language. The teacher remains responsible for making sure the comment is fair, accurate, and appropriate for the pupil and family.",
        ],
      },
    ],
    trustBlock: {
      title: "Built for teachers writing about struggle with care and clarity",
      items: [
        {
          title: "Measured language",
          body: "Useful when you need to write honestly about challenge without sounding severe or dismissive.",
        },
        {
          title: "Sensitive school context",
          body: "Helpful for report writing that may touch on attainment, behaviour, SEND support, or social development.",
        },
        {
          title: "Teachers stay in control",
          body: "Every comment stays editable, reviewable, and shaped by your own professional judgement.",
        },
      ],
    },
    faq: [
      {
        question:
          "How do I write about a student who is struggling without sounding negative?",
        answer:
          "Describe the challenge clearly, stay specific, and include the support or conditions that help the pupil make progress. That keeps the tone balanced.",
      },
      {
        question:
          "Should report comments mention social or behavioural difficulties?",
        answer:
          "If they are relevant to the pupil's school experience and progress, yes. The wording should remain careful, factual, and proportionate.",
      },
      {
        question: "What if the pupil is struggling across several areas?",
        answer:
          "Prioritise the most relevant issues and keep the comment manageable. A report comment does not need to cover everything to be truthful.",
      },
      {
        question: "Can Zaza Draft help with these more delicate comments?",
        answer:
          "Yes. Zaza Draft is built to help teachers phrase sensitive school writing more carefully while still keeping the teacher fully in charge.",
      },
      {
        question: "Will the examples sound generic?",
        answer:
          "They should not be used as copy-and-paste text. The aim is to customise the wording to your voice and context, not rely on generic report language.",
      },
    ],
    internalLinks: [
      {
        href: "/positive-but-honest-report-card-comments",
        label: "Positive but Honest Report Card Comments",
        description:
          "Link here for visitors who specifically want balanced, encouraging report language.",
      },
      {
        href: "/how-to-write-report-comments-for-low-attainment-pupils",
        label: "How to Write Report Comments for Low Attainment Pupils",
        description:
          "Link here for the more specific academic-attainment angle.",
      },
      {
        href: "/report-card-comment-generator",
        label: "Report Card Comment Generator",
        description:
          "Link here for a dedicated tool page that supports customised report-comment drafting.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "positive-but-honest-report-card-comments",
      "how-to-write-report-comments-for-low-attainment-pupils",
      "report-comments-when-a-student-isnt-meeting-expectations",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finding balanced wording for pupils who were struggling in different ways.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or phase leader.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft to reduce report-season stress.",
        attributionPrompt:
          "Replace with a verified quote from a class teacher or subject teacher.",
      },
    ],
    cta: {
      title: "Draft difficult report comments with more confidence",
      body: "Try Zaza Draft if you want help writing measured, honest report comments for struggling students without relying on generic wording.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "report-card-comments-for-students-with-behaviour-issues": {
    slug: "report-card-comments-for-students-with-behaviour-issues",
    shortTitle: "Report Card Comments for Students with Behaviour Issues",
    keyword: "report card comments for students with behaviour issues",
    intent: "Template intent",
    title:
      "Report Card Comments for Students with Behaviour Issues | Professional UK Examples | Zaza Draft",
    metaDescription:
      "Report card comments for students with behaviour issues with careful, professional wording for teachers. Write honestly about behaviour while keeping comments fair and constructive with Zaza Draft.",
    h1: "Report Card Comments for Students with Behaviour Issues",
    description:
      "Professional report-card wording for teachers who need to comment on behaviour clearly, fairly, and without inflaming the message.",
    ogImage: "/positive-behavior.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "Report card comments for students with behaviour issues are some of the hardest comments to write well. Teachers need to be clear about the concern, but they also need the language to stay measured, professional, and fair.",
      "Zaza Draft helps teachers shape calmer wording more quickly, with comments customised to your voice rather than lifted from a generic behaviour comment bank.",
    ],
    heroBullets: [
      "Address behaviour clearly and professionally",
      "Avoid wording that sounds personal or inflammatory",
      "Customised to your voice, not generic",
    ],
    featuredSnippet:
      "A balanced comment example: '[Student] has found it difficult to maintain consistent behaviour choices this term, particularly during less structured parts of the day. With clear routines and regular reminders, they are capable of making more positive choices.'",
    sections: [
      {
        id: "why-these-comments-are-sensitive",
        title: "Why behaviour report comments need especially careful wording",
        body: [
          "Behaviour comments often feel riskier than academic ones because they can be heard as judgments about character rather than descriptions of school patterns. That is why tired, rushed wording can cause real problems.",
          "A strong comment keeps the focus on behaviour in school, its impact, and the next step, rather than on labels or moral judgement.",
        ],
      },
      {
        id: "clearer-language",
        title: "What clearer behaviour report language tends to include",
        body: [
          "Useful behaviour comments normally describe consistency, focus, self-regulation, readiness to learn, or response to routines. They stay rooted in what staff have observed over time.",
          "In UK school contexts, that kind of language is usually more professional and more helpful than blunt wording such as 'poor behaviour' used on its own.",
        ],
        bullets: [
          "Observable patterns in class or around school",
          "Impact on learning, routines, or relationships",
          "Support, structure, or habits that would help",
        ],
      },
      {
        id: "example-snippets",
        title:
          "Example report card comments for students with behaviour issues",
        body: [
          "These snippets show the type of language Zaza Draft can help produce. They work best when adapted to your context, phase, and knowledge of the pupil.",
        ],
        exampleLabel: "Example comment snippets",
        exampleBody:
          "[Student] has not always made consistent behaviour choices in lessons this term and needs regular reminders to remain focused and respectful.\n\n[Student] can engage well when expectations are clear, but behaviour during transitions and less structured moments has sometimes affected their progress.\n\n[Student] is capable of contributing positively in class, though they need to show greater self-control and consistency in following classroom routines.\n\n[Student] would benefit from reflecting more carefully on how their behaviour affects both their own learning and the learning of others.",
      },
      {
        id: "what-to-avoid",
        title: "What to avoid when writing behaviour report comments",
        body: [
          "Avoid comments that sound absolute, personal, or punitive. Phrases such as 'is a disruptive pupil' or 'chooses to misbehave constantly' can sound inflammatory and are rarely the most useful professional wording.",
          "More effective comments describe the pattern and point towards what improvement would look like. That keeps the tone honest without becoming harsh.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft supports teachers with difficult report wording, including behaviour-related comments that need to be balanced, accurate, and professionally safe. It can help you move from rough notes to stronger phrasing much more quickly.",
          "Teachers remain fully in charge of the final report comment. You decide whether the wording is fair, proportionate, and right for that pupil and school context.",
        ],
      },
    ],
    trustBlock: {
      title:
        "Built for teachers writing about behaviour with professionalism and care",
      items: [
        {
          title: "Measured behaviour language",
          body: "Useful for report comments that need to stay factual and calm rather than punitive.",
        },
        {
          title: "School-appropriate tone",
          body: "Helpful for wording that may be read by families, pastoral staff, and senior leaders.",
        },
        {
          title: "Teacher judgement protected",
          body: "The final comment stays reviewable and editable, with the teacher deciding what is appropriate to say.",
        },
      ],
    },
    faq: [
      {
        question:
          "How do I write about behaviour issues without sounding harsh?",
        answer:
          "Focus on consistent patterns, their impact in school, and what support or improvement is needed. Avoid labels and emotionally loaded wording.",
      },
      {
        question:
          "Should a behaviour report comment mention the effect on others?",
        answer:
          "Where relevant, yes. It can be helpful to explain how behaviour affects learning, routines, or peers, as long as the wording stays measured.",
      },
      {
        question: "Can I still include positives in a behaviour comment?",
        answer:
          "Yes, if they are genuine. A balanced comment can acknowledge strengths or better moments while still being honest about the concern.",
      },
      {
        question: "Can Zaza Draft help with behaviour-related report wording?",
        answer:
          "Yes. Zaza Draft is designed to support teachers with sensitive school writing, including behaviour comments that need to sound clear and fair.",
      },
      {
        question: "Should I use fixed behaviour comment banks?",
        answer:
          "They can help with starting points, but they often sound generic. More tailored wording usually works better when it is based on your own notes and judgement.",
      },
    ],
    internalLinks: [
      {
        href: "/positive-but-honest-report-card-comments",
        label: "Positive but Honest Report Card Comments",
        description:
          "Link here for broader balanced-report language that combines encouragement with honesty.",
      },
      {
        href: "/report-comments-when-a-student-isnt-meeting-expectations",
        label: "Report Comments When a Student Isn't Meeting Expectations",
        description:
          "Link here for a wider expectations-focused report page that includes behaviour and academic concerns.",
      },
      {
        href: "/report-comment-generator-for-teachers",
        label: "Report Comment Generator for Teachers",
        description:
          "Link here for the tool page that helps teachers draft customised comments more quickly.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "positive-but-honest-report-card-comments",
      "report-comments-when-a-student-isnt-meeting-expectations",
      "report-comment-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finding professional wording for difficult behaviour report comments.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about cutting the time spent rewriting behaviour comments to sound less harsh.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or head of year.",
      },
    ],
    cta: {
      title: "Write behaviour report comments more carefully and more quickly",
      body: "Try Zaza Draft if you want help finding professional behaviour wording that stays fair, calm, and customised to your voice.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-write-report-comments-for-low-attainment-pupils": {
    slug: "how-to-write-report-comments-for-low-attainment-pupils",
    shortTitle: "How to Write Report Comments for Low Attainment Pupils",
    keyword: "how to write report comments for low attainment pupils",
    intent: "How-to/problem intent",
    title:
      "How to Write Report Comments for Low Attainment Pupils | UK Teacher Guidance | Zaza Draft",
    metaDescription:
      "How to write report comments for low attainment pupils with balanced, professional wording. Be honest about attainment, avoid harshness, and keep comments constructive with Zaza Draft.",
    h1: "How to Write Report Comments for Low Attainment Pupils",
    description:
      "Practical UK guidance for teachers who need to write honest, constructive report comments about low attainment without sounding bleak or generic.",
    ogImage: "/report-card-grades.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to write report comments for low attainment pupils is one of the most difficult report-season tasks because the wording has to carry honesty, professionalism, and care all at once. Teachers want to reflect the reality of attainment without making the comment sound final or discouraging.",
      "A calmer structure helps. So does a teacher-first co-writer that turns rough notes into more balanced wording while leaving the teacher in full control of every line.",
    ],
    heroBullets: [
      "Write honestly about attainment gaps",
      "Keep the tone constructive and professional",
      "Customised to your voice, not generic",
    ],
    featuredSnippet:
      "A balanced comment example: '[Student] is currently working below the expected standard in this subject and still requires regular support to apply key knowledge and skills independently. With continued practice and greater confidence, they should be able to make steadier progress.'",
    sections: [
      {
        id: "why-this-wording-is-hard",
        title: "Why low attainment wording is so hard to get right",
        body: [
          "Comments about low attainment can easily become too blunt, too vague, or too defensive. Teachers often know exactly what the attainment picture is, but not how to describe it in a way that sounds fair to families reading it at home.",
          "That is why careful phrasing matters. The comment should be clear about the attainment concern while still sounding professionally measured and constructive.",
        ],
      },
      {
        id: "what-to-focus-on",
        title:
          "What to focus on when writing report comments for low attainment pupils",
        body: [
          "Useful comments tend to focus on current attainment, confidence, independence, and next steps. They describe where the pupil is now and what support or habits would help them progress.",
          "This keeps the wording anchored in school evidence rather than broad personal judgements.",
        ],
        bullets: [
          "Current attainment position",
          "How independently the pupil can apply learning",
          "A realistic next step for progress",
        ],
      },
      {
        id: "example-comments",
        title: "Example comments for low attainment pupils",
        body: [
          "These examples show the kind of professional language Zaza Draft can help generate. They work best when adapted to your own subject, phase, and expectations.",
        ],
        exampleLabel: "Example comment snippets",
        exampleBody:
          "[Student] is working below the expected standard at present and needs continued support to apply key concepts with confidence.\n\n[Student] has not yet secured some of the core skills needed to work independently, though there are signs of progress when tasks are carefully structured.\n\n[Student] would benefit from greater consistency in practice and from approaching tasks with more confidence and resilience.\n\n[Student] still finds it difficult to recall and apply prior learning reliably, but should be able to make better progress with regular consolidation and focused support.",
      },
      {
        id: "avoid-common-traps",
        title: "Common traps to avoid in low attainment report comments",
        body: [
          "Teachers usually want to avoid language that sounds fixed or personal, such as implying a pupil is incapable or simply not trying. That kind of wording can close the comment down rather than make it useful.",
          "It is also worth avoiding comments that are so softened they give parents no clear picture. A balanced comment needs enough clarity to be meaningful.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft can help teachers phrase low attainment comments more carefully and consistently, especially across a full set of reports. It is useful when you know the attainment picture but want wording that sounds clearer and less generic.",
          "Teachers stay in full control. You review, edit, and approve every report comment so the final version matches your evidence, your school expectations, and your own professional judgement.",
        ],
      },
    ],
    trustBlock: {
      title:
        "Built for teachers who need honest attainment wording without unnecessary harshness",
      items: [
        {
          title: "Measured academic language",
          body: "Helpful for describing low attainment clearly without sounding fixed or discouraging.",
        },
        {
          title: "Suitable for UK school reporting",
          body: "Useful for report comments written in professional UK English and school-ready tone.",
        },
        {
          title: "Teacher control stays intact",
          body: "Zaza supports drafting, but teachers decide whether each comment is fair, accurate, and ready to send.",
        },
      ],
    },
    faq: [
      {
        question: "How do I write about low attainment without sounding harsh?",
        answer:
          "Describe the current attainment clearly, then point towards the support or next step that could help the pupil progress. That keeps the wording honest but constructive.",
      },
      {
        question: "Should I mention confidence as well as attainment?",
        answer:
          "If it is relevant, yes. Confidence and independence often help explain why attainment is where it is without turning the comment into a personal judgement.",
      },
      {
        question: "Is it better to use softer wording for parents?",
        answer:
          "The wording should be careful, but not vague. Families still need a clear picture of where the pupil is and what support would help.",
      },
      {
        question:
          "Can Zaza Draft help with attainment-related report comments?",
        answer:
          "Yes. Zaza Draft is designed to help teachers shape balanced report wording for low attainment, effort, progress, and next steps.",
      },
      {
        question: "Will these examples sound too generic?",
        answer:
          "They should be treated as starting points. The goal is to customise them to your voice and notes, not to paste the same wording across reports.",
      },
    ],
    internalLinks: [
      {
        href: "/report-comments-for-struggling-students",
        label: "Report Comments for Struggling Students",
        description:
          "Link here for the broader page covering struggle across academic, behavioural, and social areas.",
      },
      {
        href: "/report-comments-when-a-student-isnt-meeting-expectations",
        label: "Report Comments When a Student Isn't Meeting Expectations",
        description:
          "Link here for a related page focused on expectation-based report wording.",
      },
      {
        href: "/ai-report-writing-for-teachers",
        label: "AI Report Writing for Teachers",
        description:
          "Link here for the wider report-writing workflow and product page cluster.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "report-comments-for-struggling-students",
      "report-comments-when-a-student-isnt-meeting-expectations",
      "ai-report-writing-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finding less bleak wording for low attainment report comments.",
        attributionPrompt:
          "Replace with a verified quote from a primary or secondary teacher.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft to write more balanced academic comments more quickly.",
        attributionPrompt:
          "Replace with a verified quote from a subject teacher or phase leader.",
      },
    ],
    cta: {
      title: "Find calmer wording for low attainment comments",
      body: "Try Zaza Draft if you want help writing clear, constructive attainment comments without falling back on overly soft or overly harsh phrasing.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "report-comments-when-a-student-isnt-meeting-expectations": {
    slug: "report-comments-when-a-student-isnt-meeting-expectations",
    shortTitle: "Report Comments When a Student Isn't Meeting Expectations",
    keyword: "report comments when a student isnt meeting expectations",
    intent: "Template intent",
    title:
      "Report Comments When a Student Isn't Meeting Expectations | Balanced UK Examples | Zaza Draft",
    metaDescription:
      "Report comments when a student isn't meeting expectations with balanced, professional wording for teachers. Write honestly about progress, effort, or behaviour while staying constructive with Zaza Draft.",
    h1: "Report Comments When a Student Isn't Meeting Expectations",
    description:
      "Balanced report wording for teachers who need to describe unmet expectations clearly without sounding personal, harsh, or generic.",
    ogImage: "/progress-report.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "Report comments when a student isn't meeting expectations can feel particularly uncomfortable because the phrase covers so many situations - effort, attainment, homework, organisation, focus, behaviour, or classroom routines.",
      "Teachers need wording that is honest enough to matter and careful enough to stay professional. Zaza Draft helps produce that kind of balanced first draft, then leaves the teacher in control of the final comment.",
    ],
    heroBullets: [
      "Write clearly about unmet expectations",
      "Keep the tone measured and constructive",
      "Customised to your voice, not generic",
    ],
    featuredSnippet:
      "A balanced comment example: '[Student] is not yet meeting the expected standard in this area and would benefit from greater consistency in effort, focus, and independent practice. With a more sustained approach, they should be able to make stronger progress next term.'",
    sections: [
      {
        id: "what-expectations-language-needs",
        title:
          "What report comments need when a student isn't meeting expectations",
        body: [
          "Expectation-based comments need clarity. Families should understand that the current picture is below what is expected, but the wording also needs to stay measured and professionally useful.",
          "That is why terms like effort, independence, focus, completion, and consistency often work better than comments that sound overly personal or emotionally charged.",
        ],
      },
      {
        id: "different-kinds-of-expectations",
        title: "Different ways a student may not be meeting expectations",
        body: [
          "The issue may be academic attainment, classroom effort, homework routines, organisation, behaviour, or response to feedback. Good report wording should reflect the real issue rather than using one catch-all phrase for everything.",
          "That makes the comment more honest and more useful for the pupil and family.",
        ],
        bullets: [
          "Academic expectations",
          "Behaviour and classroom routines",
          "Effort, organisation, and independence",
        ],
      },
      {
        id: "example-phrases",
        title:
          "Example report comments when a student isn't meeting expectations",
        body: [
          "These examples show the kind of balanced wording Zaza Draft can help generate. They should be adapted to your own subject, phase, and professional voice.",
        ],
        exampleLabel: "Example comment snippets",
        exampleBody:
          "[Student] is not yet meeting the expected standard in this subject and needs to approach tasks with greater consistency and independence.\n\n[Student] would benefit from applying themselves more steadily in lessons, as current effort does not always reflect their potential.\n\n[Student] is still finding it difficult to meet classroom expectations consistently, which has affected both progress and concentration.\n\n[Student] has the capacity to produce stronger work, but must now show more sustained focus and responsibility in order to make secure progress.",
      },
      {
        id: "keep-it-constructive",
        title:
          "How to keep the comment constructive without softening the point",
        body: [
          "A useful comment names the concern, then points towards what would help. That might be greater consistency, improved organisation, more resilience, or better use of feedback.",
          "This makes the comment feel constructive instead of simply critical. It also avoids the opposite problem of wording that says very little.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft is designed for teacher writing tasks where nuance matters, including report comments about unmet expectations. It can help you shape more careful wording from notes and observations, especially when you are working through a large report set.",
          "The teacher still decides what is true, what is proportionate, and what fits the school's reporting style. Zaza supports the phrasing. It does not replace your judgement.",
        ],
      },
    ],
    comparisonBlock: {
      title: "Comparison block: tailored report wording vs broad AI output",
      intro:
        "Teachers can generate report comments in broad AI tools, but expectation-based wording often needs more careful tuning than generic output provides.",
      alternativeLabel: "Broad AI tool",
      rows: [
        {
          label: "Expectation-specific wording",
          zaza: "Focused on school-ready report language",
          alternative: "Broader and often more generic",
        },
        {
          label: "Tone control",
          zaza: "More conservative and teacher-first",
          alternative: "Depends heavily on prompt quality",
        },
        {
          label: "Comment examples",
          zaza: "Designed to be customised to your voice",
          alternative: "Can sound broad or over-polished",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer workflow",
          alternative: "Fast output with more manual shaping",
        },
      ],
    },
    trustBlock: {
      title:
        "Built for teachers who need to be honest without sounding personal",
      items: [
        {
          title: "Expectation-focused wording",
          body: "Helpful for comments about effort, attainment, organisation, behaviour, and progress.",
        },
        {
          title: "Professional school tone",
          body: "Useful when comments need to be clear, balanced, and suitable for formal reporting.",
        },
        {
          title: "Teacher-first control",
          body: "Every final comment still depends on the teacher's own evidence and professional judgement.",
        },
      ],
    },
    faq: [
      {
        question:
          "How do I say a student is not meeting expectations without sounding harsh?",
        answer:
          "Use clear, specific language about the area of concern and pair it with a realistic next step. That keeps the comment honest but constructive.",
      },
      {
        question: "Should I say 'not meeting expectations' directly?",
        answer:
          "If that fits your school reporting language, yes. It can be useful, provided the rest of the comment explains what that means in practical terms.",
      },
      {
        question:
          "Can unmet expectations cover behaviour as well as attainment?",
        answer:
          "Yes. Expectations may relate to learning, effort, routines, behaviour, independence, or organisation. The wording should reflect the actual issue clearly.",
      },
      {
        question: "Can Zaza Draft help make these comments more balanced?",
        answer:
          "Yes. Zaza Draft is designed to help teachers write more careful, professional report comments while preserving teacher control over the final version.",
      },
      {
        question: "Should I rely on fixed report banks for this?",
        answer:
          "They can help with starting points, but tailored wording based on your notes usually produces comments that sound more human and more professionally judged.",
      },
    ],
    internalLinks: [
      {
        href: "/positive-but-honest-report-card-comments",
        label: "Positive but Honest Report Card Comments",
        description:
          "Link here for visitors who want broader guidance on balanced report wording.",
      },
      {
        href: "/how-to-write-report-comments-for-low-attainment-pupils",
        label: "How to Write Report Comments for Low Attainment Pupils",
        description:
          "Link here for the more specific low-attainment page within the same cluster.",
      },
      {
        href: "/report-comment-generator-for-teachers",
        label: "Report Comment Generator for Teachers",
        description:
          "Link here for the product-driven page that supports customised comment drafting.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "positive-but-honest-report-card-comments",
      "how-to-write-report-comments-for-low-attainment-pupils",
      "report-comment-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finding wording for comments where pupils were not meeting expectations.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or department lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about writing reports faster without losing professional care.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher.",
      },
    ],
    cta: {
      title: "Write clearer expectation-based comments with less strain",
      body: "Try Zaza Draft if you want help turning difficult report wording into something honest, professional, and better tailored to your own voice.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-write-an-email-home-about-missing-homework": {
    slug: "how-to-write-an-email-home-about-missing-homework",
    shortTitle: "How to Write an Email Home About Missing Homework",
    keyword: "how to write an email home about missing homework",
    intent: "How-to/problem intent",
    title:
      "How to Write an Email Home About Missing Homework | Calm Teacher Guidance | Zaza Draft",
    metaDescription:
      "How to write an email home about missing homework with calm, professional wording. Raise concerns clearly, avoid friction, and keep parent relationships workable with help from Zaza Draft.",
    h1: "How to Write an Email Home About Missing Homework",
    description:
      "A practical guide for teachers who need to follow up missing homework without sounding accusatory, repetitive, or worn down.",
    ogImage: "/teacher-working-at-desk-with-laptop.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to write an email home about missing homework is the sort of task that often lands late in the evening, when patience is low and the wording suddenly feels harder than it should. You do not have to start from a blank page at 10pm.",
      "A calm structure can help you say what needs to be said without making the message sound sharper than intended. Zaza Draft supports that first draft, while teachers still edit and approve every word.",
    ],
    heroBullets: [
      "Raise the concern clearly and professionally",
      "Protect the relationship with home",
      "Use wording you can review with confidence",
    ],
    featuredSnippet:
      "To write an email home about missing homework, state the concern clearly, mention the missing work or pattern briefly, explain why it matters, and outline the next step. Keep the tone calm, factual, and supportive rather than accusatory.",
    sections: [
      {
        id: "why-this-feels-bigger-than-homework",
        title:
          "Why missing-homework emails often feel heavier than they should",
        body: [
          "A short email about missing homework can carry more tension than the issue itself. Teachers often worry that a simple reminder will sound nagging, trigger a defensive reply, or create more communication than the homework is worth.",
          "That is why the tone matters. The aim is not just to chase work. It is to communicate the concern professionally and keep the relationship with home workable.",
        ],
      },
      {
        id: "what-parents-need-to-hear",
        title:
          "What parents usually need in an email home about missing homework",
        body: [
          "Parents usually need a clear summary of what is missing, whether this is a one-off or a pattern, and what would help next. They do not usually need a long explanation or a frustrated tone.",
          "When the message is short, factual, and calm, it tends to be easier for families to respond usefully.",
        ],
        bullets: [
          "What work is missing",
          "Whether the issue is repeated",
          "What the pupil should do next",
        ],
      },
      {
        id: "safer-structure",
        title:
          "A safer structure for how to write an email home about missing homework",
        body: [
          "A helpful structure is: greeting, clear purpose, brief factual summary, impact, and next step. That gives the email enough substance to be useful without making it feel heavy-handed.",
          "This can work for occasional homework gaps, repeated non-completion, revision tasks, and concerns that may sit alongside organisation or low-level behaviour issues.",
        ],
        exampleLabel: "Example email snippet",
        exampleBody:
          "Dear [parent or carer name],\n\nI am writing to let you know that [student name] has not submitted the last two homework tasks in [subject]. I wanted to make you aware as this is starting to affect their ability to keep up with classwork.\n\nIt would be helpful if the missing work could be completed by [day], and please let me know if there is anything preventing this so that we can support appropriately.\n\nKind regards,\n[teacher name]",
      },
      {
        id: "pitfalls",
        title: "Common pitfalls that make a homework email land badly",
        body: [
          "Teachers often regret wording that sounds irritated, absolute, or overly moralising. Phrases such as 'still has not bothered' or 'continues to ignore homework expectations' may come from understandable frustration, but they usually make the email harder to receive.",
          "A calmer alternative is to describe the pattern and the impact, then ask for support or set a clear next step.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft can help teachers turn rough notes into calmer, lower-risk parent communication, including reminders about missing homework, revision tasks, organisation, and repeated follow-up emails. It is useful when you want professional wording quickly without sounding generic.",
          "Teachers stay in control throughout. The draft is there to reduce stress and save time, but every word is still reviewed and approved by the teacher before it is sent.",
        ],
      },
    ],
    trustBlock: {
      title: "Teacher-written prompts, not generic AI",
      items: [
        {
          title: "Built for school communication",
          body: "Helpful for missing homework emails, parent reminders, and other everyday school writing that still needs careful tone.",
        },
        {
          title: "Psychologically safer wording",
          body: "Suggestions are designed to preserve the relationship rather than sharpen the tension.",
        },
        {
          title: "Teachers stay in charge",
          body: "You edit and approve every word, so the final message still fits your judgement and your school context.",
        },
      ],
    },
    faq: [
      {
        question: "Should I email home after one piece of missing homework?",
        answer:
          "That depends on your school policy, the age of the pupil, and whether it looks like a pattern. When you do email, calm and clear wording usually works best.",
      },
      {
        question: "How do I stop the message sounding like a complaint?",
        answer:
          "Keep it factual, explain the impact briefly, and point towards the next step. Avoid loaded wording or assumptions about why the homework is missing.",
      },
      {
        question: "Should I ask if something is going on at home?",
        answer:
          "You can leave space for the parent to share relevant context, but the email itself should stay professional and proportionate rather than overly probing.",
      },
      {
        question: "What if missing homework is becoming a repeated issue?",
        answer:
          "Mention that it is becoming a pattern and explain why that matters. The email can also invite a conversation if more support is needed.",
      },
      {
        question: "Can Zaza Draft help with routine parent emails like this?",
        answer:
          "Yes. Zaza Draft is designed for teacher-first writing support, including the everyday messages that still take too much time and second-guessing.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-communicate-concerns-to-parents-professionally",
        label: "How to Communicate Concerns to Parents Professionally",
        description:
          "Link here for the broader parent-communication framework beyond missing homework alone.",
      },
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "Link here for visitors who want tool-based drafting help with routine parent emails.",
      },
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher Guide to Sensitive Parent Emails",
        description:
          "Link here for teachers dealing with more delicate communication than a straightforward homework follow-up.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-communicate-concerns-to-parents-professionally",
      "teacher-guide-to-sensitive-parent-emails",
      "ai-parent-email-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about writing routine homework emails faster without sounding abrupt.",
        attributionPrompt:
          "Replace with a verified quote from a classroom or subject teacher.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about no longer staring at a blank email late at night.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or tutor.",
      },
    ],
    cta: {
      title: "Draft the next homework email without starting from scratch",
      body: "Try Zaza Draft if you want calm, teacher-first parent-email wording that saves time and still sounds like you.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-tell-parents-their-child-is-falling-behind": {
    slug: "how-to-tell-parents-their-child-is-falling-behind",
    shortTitle: "How to Tell Parents Their Child Is Falling Behind",
    keyword: "how to tell parents their child is falling behind",
    intent: "How-to/problem intent",
    title:
      "How to Tell Parents Their Child Is Falling Behind | Calm Teacher Guidance | Zaza Draft",
    metaDescription:
      "How to tell parents their child is falling behind with calm, professional wording. Raise concerns early, avoid blame, and keep the conversation constructive with help from Zaza Draft.",
    h1: "How to Tell Parents Their Child Is Falling Behind",
    description:
      "A practical guide for teachers who need to raise an academic concern with honesty, care, and professional judgement.",
    ogImage: "/teacher-working-efficiently.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to tell parents their child is falling behind can feel deeply uncomfortable because you are trying to communicate something important without damaging trust. It is the kind of message teachers end up drafting during parents' evening prep at 10pm, trying to be honest without sounding bleak.",
      "A calm structure can help you say it clearly. Zaza Draft supports that first draft so you do not have to start from a blank page when you are already tired, and teachers still keep full control of the final wording.",
    ],
    heroBullets: [
      "Raise the concern early and clearly",
      "Avoid blame while staying honest",
      "Keep the tone constructive and school-appropriate",
    ],
    featuredSnippet:
      "To tell parents their child is falling behind, explain the concern clearly, describe what you have observed in school, state the impact on progress, and suggest a next step or support plan. Keep the tone factual, calm, and constructive rather than alarmist.",
    sections: [
      {
        id: "why-this-conversation-feels-so-hard",
        title: "Why this conversation feels so hard for teachers",
        body: [
          "Academic concerns can feel personal for everyone involved. Teachers often worry that the message will sound like criticism of the pupil or family, even when the goal is simply to communicate the concern early and honestly.",
          "That is why careful phrasing matters. The message should give families a clear picture without making the situation sound final or hopeless, and without creating a defensive email thread that drains more time than it saves.",
        ],
      },
      {
        id: "what-to-include",
        title:
          "What to include when telling parents their child is falling behind",
        body: [
          "Useful messages usually cover the current concern, what you have observed in class, and what support or action could help. They should be specific enough to be meaningful without becoming an overlong explanation.",
          "This kind of structure works well for concerns about attainment, homework, progress in core subjects, revision, or effort patterns that are beginning to affect learning.",
        ],
        bullets: [
          "What the concern is",
          "What you have seen in school",
          "What the next step could be",
        ],
      },
      {
        id: "clearer-wording",
        title: "How to make the wording honest without sounding discouraging",
        body: [
          "Comments such as 'is falling behind' can be helpful if they are explained properly. The problem usually comes when the rest of the message is vague, abrupt, or overly negative.",
          "A better approach is to explain the gap, note any strengths or positive response to support, and point towards what would help the pupil move forward.",
        ],
        exampleLabel: "Example email snippet",
        exampleBody:
          "I wanted to share a concern that [student name] is beginning to fall behind in [subject], particularly in [specific area]. In class, they often need additional support to apply recent learning independently.\n\nI wanted to make you aware of this now so that we can work together to support stronger progress over the coming weeks.",
      },
      {
        id: "pitfalls",
        title: "Common pitfalls when raising academic concerns",
        body: [
          "Teachers often worry about sounding too harsh, but the opposite problem can be just as unhelpful. If the concern is softened too much, parents may leave the email without a clear sense of what is actually wrong.",
          "At the same time, language that sounds fixed, personal, or fatalistic is rarely useful. The strongest wording is clear, proportionate, and future-facing.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft can help teachers phrase academic concerns more carefully, whether the issue is falling behind, low attainment, missed homework, or inconsistent effort. It is designed to support professional school writing where wording really matters.",
          "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most. You still decide the final message. Zaza offers suggestions that can preserve the relationship and save time, but teachers remain responsible for accuracy, tone, and final approval.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: focused academic-concern wording vs all-in-one AI platforms",
      intro:
        "Broad tools can help you produce a paragraph. A focused co-writer is more useful when the real challenge is saying something difficult with care, clarity, and professional judgement.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "Academic concern focus",
          zaza: "Built for teacher emails where tone needs care",
          alternative: "General drafting across many tasks",
        },
        {
          label: "Relationship-preserving wording",
          zaza: "More conservative and school-aware",
          alternative: "More prompt-dependent and uneven",
        },
        {
          label: "Customisation",
          zaza: "Fits your voice and school context",
          alternative: "Often needs more rewriting",
        },
        {
          label: "Teacher control",
          zaza: "Review and approve every word",
          alternative: "Teacher shapes a broader draft into final form",
        },
      ],
      note: "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
    },
    trustBlock: {
      title: "Suggestions that preserve your relationship with home",
      items: [
        {
          title: "Teacher-first prompts",
          body: "Built around school communication rather than generic AI writing tasks.",
        },
        {
          title: "Psychological safety",
          body: "Helpful when you need wording that protects trust while still communicating a concern.",
        },
        {
          title: "Teachers approve every word",
          body: "The draft supports you, but the final judgement and wording stay fully under your control.",
        },
      ],
    },
    faq: [
      {
        question: "When should I tell parents a child is falling behind?",
        answer:
          "Usually earlier than you think. A calm early message is often more useful than waiting until the concern has become much harder to address.",
      },
      {
        question: "How direct should I be?",
        answer:
          "Be clear enough that the concern is understood, but keep the wording calm and specific. Families need honesty, not bluntness.",
      },
      {
        question: "Should I say 'falling behind' directly in the email?",
        answer:
          "You can, if you explain what that means in concrete terms. The phrase works best when it is followed by a brief explanation of the learning gap and the next step.",
      },
      {
        question: "Should I offer support ideas in the email?",
        answer:
          "Yes, where appropriate. Even a simple next step can make the message feel more constructive and less bleak.",
      },
      {
        question: "What if there may be a wider issue affecting progress?",
        answer:
          "Keep the message within what you know and what you have observed. If more support is needed, invite a conversation or involve the relevant staff member.",
      },
      {
        question: "How do I avoid making parents feel blamed?",
        answer:
          "Focus on the pupil's current learning position, what you have observed in school, and what support may help next. Avoid implying that home is at fault unless you have a specific reason and school guidance for doing so.",
      },
      {
        question: "What if this email may lead to a difficult meeting later?",
        answer:
          "That is a reason to keep the email especially balanced and factual. Clear wording now is easier to stand behind later in parents' evening discussions or follow-up meetings.",
      },
      {
        question: "Can Zaza Draft help me phrase this more carefully?",
        answer:
          "Yes. Zaza Draft is built for teacher writing where tone matters, including messages about progress, attainment, and sensitive parent communication.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-report-comments-for-low-attainment-pupils",
        label: "How to Write Report Comments for Low Attainment Pupils",
        description:
          "Link here for the related report-writing version of the same academic concern.",
      },
      {
        href: "/positive-but-honest-report-card-comments-for-struggling-students",
        label:
          "Positive but Honest Report Card Comments for Struggling Students",
        description:
          "Link here for balanced report wording when the same concern needs to appear in formal written reports.",
      },
      {
        href: "/report-comments-for-struggling-students",
        label: "Report Comments for Struggling Students",
        description:
          "Link here for broader report wording when the concern moves into formal reporting.",
      },
      {
        href: "/how-to-write-an-email-home-about-missing-homework",
        label: "How to Write an Email Home About Missing Homework",
        description:
          "Link here when the academic concern includes missed homework or organisation patterns.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "positive-but-honest-report-card-comments-for-struggling-students",
      "how-to-write-report-comments-for-low-attainment-pupils",
      "report-comments-for-struggling-students",
      "how-to-write-an-email-home-about-missing-homework",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finally finding wording for an academic concern that sounded clear but kind.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or form tutor.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about saving time on difficult progress emails home.",
        attributionPrompt:
          "Replace with a verified quote from a class teacher or subject teacher.",
      },
    ],
    cta: {
      title: "Raise academic concerns more calmly and clearly",
      body: "Try Zaza Draft on zazadraft.com if you want help wording sensitive progress emails in a way that sounds professional, constructive, and still fully yours.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "difficult-conversation-with-parents-script-email": {
    slug: "difficult-conversation-with-parents-script-email",
    shortTitle: "Difficult Conversation with Parents Script Email",
    keyword: "difficult conversation with parents script email",
    intent: "Template intent",
    title:
      "Difficult Conversation with Parents Script Email | Calm Teacher Templates | Zaza Draft",
    metaDescription:
      "Difficult conversation with parents script email guidance for teachers. Use calm, professional wording for sensitive school conversations with help from Zaza Draft.",
    h1: "Difficult Conversation with Parents Script Email",
    description:
      "A practical script-style page for teachers who need careful wording before a difficult parent conversation or follow-up email.",
    ogImage: "/difficult-conversation.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "A difficult conversation with parents script email can be the difference between a manageable exchange and one that spirals. When you are carrying a sensitive issue, it helps to start with language that feels calm, professional, and lower-risk.",
      "Zaza Draft helps teachers create those first drafts more quickly. The wording is designed to support your judgement, not replace it, so you still edit and approve every word.",
    ],
    heroBullets: [
      "Start with a safer structure",
      "Use wording that protects the relationship",
      "Customised to your voice, not generic",
    ],
    sections: [
      {
        id: "why-a-script-helps",
        title:
          "Why a script helps before a difficult conversation with parents",
        body: [
          "Teachers often rehearse difficult conversations in their head long before they happen. A simple email script can reduce that mental load by giving you a professional starting point for the message, call summary, or meeting request.",
          "That does not mean sounding robotic. It means not having to invent the structure from scratch when you are already stressed.",
        ],
      },
      {
        id: "when-to-use-one",
        title:
          "When a difficult conversation with parents script email is useful",
        body: [
          "Script-style wording is especially useful when the topic is behaviour, progress, safeguarding sensitivity, repeated concerns, or a difficult parents' evening follow-up. These are moments where tone does a lot of hidden work.",
          "It can also help when you need to move a conversation from emotion towards clarity and next steps.",
        ],
      },
      {
        id: "example-scripts",
        title:
          "Example script email wording for difficult parent conversations",
        body: [
          "These examples show the type of calm, professional language Zaza Draft can help produce. They work best when adapted to your relationship with the family and the specific issue.",
        ],
        exampleLabel: "Example script snippets",
        exampleBody:
          "I wanted to get in touch about a concern that has arisen in school and to arrange a suitable time to discuss it with you further.\n\nThank you for sharing your concerns. I appreciate that this matter is important to you, and I would like to clarify the situation and discuss the next steps.\n\nI felt it would be helpful to make you aware of this now so that we can work together to support [student name] in a constructive way.",
      },
      {
        id: "what-keeps-it-safe",
        title: "What keeps a script email professional rather than formulaic",
        body: [
          "The safest scripts are simple. They acknowledge the issue, avoid emotionally loaded phrasing, and point clearly towards a next step. They do not try to say everything at once.",
          "What makes them feel human is not complexity. It is tone, accuracy, and your final review.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft is useful when you know the conversation will be difficult and want lower-risk wording to begin from. It can help with meeting requests, follow-up emails, clarification messages, and scripts for sensitive parent communication.",
          "Teachers still stay in full control. The tool suggests phrasing, but you decide what fits the situation, the family, and your school's expectations.",
        ],
      },
    ],
    trustBlock: {
      title: "Teacher-written prompts, not generic AI",
      items: [
        {
          title: "Sensitive conversation support",
          body: "Helpful for difficult parent conversations where wording needs extra care.",
        },
        {
          title: "Relationship-preserving suggestions",
          body: "Designed to lower the chance of accidental escalation while still keeping the message clear.",
        },
        {
          title: "Full teacher control",
          body: "You shape the final script or email so it still sounds professional and true to your judgement.",
        },
      ],
    },
    faq: [
      {
        question: "Should I script a difficult parent conversation in advance?",
        answer:
          "Often yes. A short script or email draft can reduce stress and help you stay clear and professional when the issue feels emotionally loaded.",
      },
      {
        question: "Will a script make the message sound too formal?",
        answer:
          "Not if it is used as a starting point rather than a final script. The aim is calm structure, not stiffness.",
      },
      {
        question: "Should I use email or ask for a meeting?",
        answer:
          "That depends on the issue. In many cases, email works best to open the conversation or confirm the next step rather than resolve everything in writing.",
      },
      {
        question: "What kinds of conversations is this useful for?",
        answer:
          "Behaviour concerns, progress issues, complaints, difficult follow-up after parents' evening, and other sensitive home-school communication.",
      },
      {
        question: "Can Zaza Draft help me write a script that sounds like me?",
        answer:
          "Yes. Zaza Draft is designed to help teachers create customised, lower-risk wording rather than pushing generic templates unchanged.",
      },
    ],
    internalLinks: [
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher Guide to Sensitive Parent Emails",
        description:
          "Link here for the broader guide to emotionally difficult parent-email situations.",
      },
      {
        href: "/how-to-reply-to-a-difficult-parent-email",
        label: "How to Reply to a Difficult Parent Email",
        description:
          "Link here for a more direct how-to page focused on written replies under pressure.",
      },
      {
        href: "/how-to-respond-to-an-angry-parent",
        label: "How to Respond to an Angry Parent",
        description:
          "Link here for the wider communication problem beyond email alone.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "teacher-guide-to-sensitive-parent-emails",
      "how-to-reply-to-a-difficult-parent-email",
      "how-to-respond-to-an-angry-parent",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft for a difficult parent-conversation script before sending the email.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about no longer overthinking every opening line before a sensitive parent conversation.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher.",
      },
    ],
    cta: {
      title: "Start the difficult conversation from a calmer draft",
      body: "Try Zaza Draft if you want help shaping sensitive parent emails and scripts without losing your own professional voice.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "teacher-guide-to-sensitive-parent-emails": {
    slug: "teacher-guide-to-sensitive-parent-emails",
    shortTitle: "Teacher Guide to Sensitive Parent Emails",
    keyword: "teacher guide to sensitive parent emails",
    intent: "How-to/problem intent",
    title:
      "Teacher Guide to Sensitive Parent Emails | Calm, Professional Wording | Zaza Draft",
    metaDescription:
      "Teacher guide to sensitive parent emails with calm, professional communication advice. Write lower-risk messages that protect relationships and keep teachers in control with Zaza Draft.",
    h1: "Teacher Guide to Sensitive Parent Emails",
    description:
      "A broader guide for teachers who regularly need careful wording for emotionally difficult parent communication.",
    ogImage: "/teacher-writing-parent-email-on-laptop.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "Sensitive parent emails can drain far more energy than the message itself should take. Whether the issue is behaviour, safeguarding sensitivity, attendance, homework, parents' evening follow-up, or a difficult complaint, the wording can feel high-stakes.",
      "This guide is designed for teachers who want lower-risk suggestions that preserve the relationship and still let them stay fully in control. You do not have to improvise these emails from a blank screen every time.",
    ],
    heroBullets: [
      "Lower-risk wording for high-stakes emails",
      "Suggestions that preserve the relationship",
      "Teachers edit and approve every word",
    ],
    featuredSnippet:
      "Sensitive parent emails work best when they are short, factual, and carefully toned. State the concern clearly, avoid emotionally loaded phrasing, explain the next step, and review the wording before sending so it sounds professional rather than reactive.",
    sections: [
      {
        id: "what-makes-an-email-sensitive",
        title: "What makes a parent email feel sensitive in the first place",
        body: [
          "An email becomes sensitive when the wording can easily affect trust. That may be because the topic is emotionally charged, because the relationship with home is already strained, or because the issue touches on behaviour, progress, SEN, attendance, or safeguarding concerns.",
          "In these moments, teachers are rarely just writing information. They are also trying to protect the relationship and avoid making a hard situation harder.",
        ],
      },
      {
        id: "common-feelings",
        title: "Why teachers often put these emails off",
        body: [
          "Many teachers delay sensitive emails because the message feels easy to get wrong. You may know exactly what needs to be communicated, but not how to phrase it in a way that sounds calm, honest, and professionally safe.",
          "That hesitation is normal. A more structured approach can reduce the emotional load and the time it takes to begin.",
        ],
      },
      {
        id: "safer-principles",
        title: "Safer principles for sensitive parent emails",
        body: [
          "Sensitive emails usually work better when they are factual, proportionate, and future-facing. They should describe the issue clearly, avoid dramatic phrasing, and point towards the next useful step rather than trying to resolve everything at once.",
          "This is especially important if the message may later be seen by senior leaders, tutors, safeguarding staff, or used to support a wider conversation.",
        ],
        bullets: [
          "Lead with clarity, not emotion",
          "Keep the wording proportionate",
          "End with a practical next step",
        ],
      },
      {
        id: "types-of-sensitive-emails",
        title: "Types of sensitive parent emails teachers often need help with",
        body: [
          "The same principles apply across many difficult messages: missing homework, falling behind, behaviour concerns, complaints, angry replies, or report-related follow-up. The detail changes, but the need for careful tone does not.",
          "A teacher-first writing tool is most useful when it treats these as real school use cases rather than one generic email category.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft helps teachers turn rough thoughts into calmer, more professional wording for sensitive parent communication. It is designed to support emotionally difficult messages where a generic AI writer may feel too broad or too risky.",
          "Teachers still stay in full control. The draft is there to save time, reduce stress, and improve tone, but you remain responsible for accuracy, context, and final approval.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: teacher-first sensitive email support vs broad AI writing",
      intro:
        "Broad AI tools can generate text, but sensitive school communication usually needs a calmer and more specialised starting point.",
      alternativeLabel: "Broad AI writer",
      rows: [
        {
          label: "Primary focus",
          zaza: "Teacher communication where tone matters",
          alternative: "General-purpose writing across many contexts",
        },
        {
          label: "Sensitive parent emails",
          zaza: "Core use case",
          alternative: "Depends more on prompt quality and editing",
        },
        {
          label: "Psychological safety",
          zaza: "Designed to feel more conservative and lower-risk",
          alternative: "Can produce wider tonal variation",
        },
        {
          label: "Teacher control",
          zaza: "Co-writer workflow with review built in",
          alternative: "Manual judgement carries more of the load",
        },
      ],
    },
    trustBlock: {
      title: "Teacher-written prompts, not generic AI",
      items: [
        {
          title: "Built for sensitive school communication",
          body: "Helpful for difficult parent emails where the relationship matters as much as the message.",
        },
        {
          title: "Conservative suggestions",
          body: "Wording is designed to be calmer and more emotionally intelligent rather than over-polished or overly casual.",
        },
        {
          title: "Teachers stay in control",
          body: "You review, edit, and approve every line before anything is sent to a parent or carer.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as a sensitive parent email?",
        answer:
          "Any message where wording could easily affect trust or increase tension, such as behaviour concerns, complaints, progress issues, attendance patterns, or follow-up after difficult conversations.",
      },
      {
        question: "Should sensitive emails be shorter?",
        answer:
          "Usually yes. Shorter, clearer messages are often easier to receive and less likely to escalate than long, emotionally loaded explanations.",
      },
      {
        question: "How do I keep the email honest but calm?",
        answer:
          "Use factual language, avoid assumptions, and keep the message focused on the concern and the next step. Review it before sending if the topic feels emotionally charged.",
      },
      {
        question:
          "Can I use the same structure for different sensitive topics?",
        answer:
          "Often yes. A simple structure of purpose, factual summary, impact, and next step works across many parent-email situations.",
      },
      {
        question: "Can Zaza Draft help with sensitive parent communication?",
        answer:
          "Yes. Zaza Draft is built for teacher writing where tone matters, including difficult parent emails and other school communication that feels high-stakes.",
      },
    ],
    internalLinks: [
      {
        href: "/difficult-conversation-with-parents-script-email",
        label: "Difficult Conversation with Parents Script Email",
        description:
          "Link here for script-style wording before or after a difficult conversation with parents.",
      },
      {
        href: "/how-to-communicate-concerns-to-parents-professionally",
        label: "How to Communicate Concerns to Parents Professionally",
        description:
          "Link here for the broader framework on professional concern-based communication.",
      },
      {
        href: "/how-to-reply-to-a-difficult-parent-email",
        label: "How to Reply to a Difficult Parent Email",
        description:
          "Link here for a more direct response-focused page inside the same cluster.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "difficult-conversation-with-parents-script-email",
      "how-to-communicate-concerns-to-parents-professionally",
      "how-to-reply-to-a-difficult-parent-email",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft for several different sensitive parent emails across the term.",
        attributionPrompt:
          "Replace with a verified quote from a teacher, tutor, or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about feeling safer with the wording before sending difficult emails home.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher.",
      },
    ],
    cta: {
      title: "Handle sensitive parent emails with a calmer first draft",
      body: "Try Zaza Draft if you want lower-risk, teacher-first wording for difficult parent communication while keeping every final decision in your own hands.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-communicate-concerns-to-parents-professionally": {
    slug: "how-to-communicate-concerns-to-parents-professionally",
    shortTitle: "How to Communicate Concerns to Parents Professionally",
    keyword: "how to communicate concerns to parents professionally",
    intent: "How-to/problem intent",
    title:
      "How to Communicate Concerns to Parents Professionally | Calm Teacher Guidance | Zaza Draft",
    metaDescription:
      "How to communicate concerns to parents professionally with calm, clear wording. Raise issues early, avoid escalation, and keep communication school-appropriate with help from Zaza Draft.",
    h1: "How to Communicate Concerns to Parents Professionally",
    description:
      "A broader teacher guide to raising concerns with parents clearly, early, and without unnecessary friction.",
    ogImage: "/teacher-writing-newsletter.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to communicate concerns to parents professionally is one of the core communication skills teachers are expected to have, but it rarely feels easy when you are tired, behind on everything else, and trying not to make the situation worse.",
      "A clear structure helps. So does a teacher-first co-writer that gives you suggestions designed for school communication rather than generic AI output. You still edit and approve every word.",
    ],
    heroBullets: [
      "Raise concerns early and clearly",
      "Keep the relationship with home workable",
      "Protect your professional voice under pressure",
    ],
    featuredSnippet:
      "To communicate concerns to parents professionally, state the issue clearly, describe what has been observed in school, explain the impact briefly, and outline the next step. Keep the tone factual, calm, and respectful, especially when the issue is sensitive or ongoing.",
    sections: [
      {
        id: "why-early-professional-communication-matters",
        title: "Why communicating concerns to parents professionally matters",
        body: [
          "Concerns are usually easier to manage when they are communicated early, clearly, and without emotional spillover. That gives parents a better chance to respond constructively and reduces the risk of surprises later in the term.",
          "Professional wording also protects teachers. It creates a clearer record and lowers the chance that a message will be read as personal, reactive, or unclear.",
        ],
      },
      {
        id: "what-professional-looks-like",
        title:
          "What professional concern-based communication usually looks like",
        body: [
          "Professional communication is not cold communication. It is clear, proportionate, and focused on what has been observed, why it matters, and what happens next.",
          "That works across a wide range of concerns, including behaviour, missing homework, falling behind, attendance patterns, social issues, SEN-related communication, and parents' evening follow-up.",
        ],
        bullets: [
          "State the concern plainly",
          "Keep the language factual",
          "Offer a practical next step",
        ],
      },
      {
        id: "common-mistakes",
        title: "Common mistakes when teachers try to communicate concerns",
        body: [
          "One common mistake is waiting too long, then writing from frustration. Another is over-explaining because the teacher wants to soften the message. Both can make the communication less effective.",
          "It is also easy to slip into language that sounds more emotional than intended. That is where a calmer drafting process can make a real difference.",
        ],
      },
      {
        id: "simple-framework",
        title:
          "A simple framework for how to communicate concerns to parents professionally",
        body: [
          "A useful framework is: purpose, observation, impact, next step. Start with why you are writing. Describe what has been observed in school. Briefly explain why it matters. Then say what should happen next.",
          "This structure works well across both routine and more sensitive parent communication.",
        ],
        exampleLabel: "Example framework line",
        exampleBody:
          "I wanted to get in touch to make you aware of a concern that has arisen in school. Over the past two weeks, [student name] has found it difficult to [specific issue]. I felt it was important to share this now so that we can support improvement together.",
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft helps teachers produce calmer, more professional concern-based messages more quickly. It is designed for parent communication where tone matters and where a broad AI writer may feel too generic or too variable.",
          "The tool stays in a co-writer role. Teachers remain in full control, reviewing every line and deciding whether the final message fits the concern, the family, and the school context.",
        ],
      },
    ],
    trustBlock: {
      title: "Suggestions that preserve your relationship and your judgement",
      items: [
        {
          title: "Teacher-first communication support",
          body: "Built for school concerns, not generic office email writing.",
        },
        {
          title: "Psychologically safer tone",
          body: "Helpful when you need to raise a concern without triggering unnecessary defensiveness.",
        },
        {
          title: "Teachers approve every word",
          body: "You keep full control over the final phrasing, level of directness, and what is actually sent home.",
        },
      ],
    },
    faq: [
      {
        question: "How early should I communicate a concern to parents?",
        answer:
          "Usually earlier rather than later. Clear early communication is often easier for families to receive and easier for schools to support.",
      },
      {
        question: "How do I sound professional without sounding distant?",
        answer:
          "Use calm, factual wording and keep the next step practical. Professional does not need to mean cold or impersonal.",
      },
      {
        question: "Should I always include a next step?",
        answer:
          "Usually yes. A next step makes the message more useful and reduces the chance of a vague or defensive response.",
      },
      {
        question:
          "Can this framework work for behaviour and academic concerns?",
        answer:
          "Yes. The same core structure works across many parent-communication situations, though the detail should be adapted to the specific issue.",
      },
      {
        question: "Can Zaza Draft help me write these messages more quickly?",
        answer:
          "Yes. Zaza Draft is built to help teachers draft calm, professional parent communication faster while keeping the teacher fully in control of the final version.",
      },
    ],
    internalLinks: [
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher Guide to Sensitive Parent Emails",
        description:
          "Link here for the broader guide to high-stakes or emotionally difficult parent-email situations.",
      },
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to Write a Behaviour Email to Parents",
        description:
          "Link here for the behaviour-specific version of professional concern-based parent communication.",
      },
      {
        href: "/how-to-tell-parents-their-child-is-falling-behind",
        label: "How to Tell Parents Their Child Is Falling Behind",
        description:
          "Link here for the academic-progress version of the same broader problem.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "teacher-guide-to-sensitive-parent-emails",
      "how-to-write-a-behaviour-email-to-parents",
      "how-to-tell-parents-their-child-is-falling-behind",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about feeling more confident raising concerns early with parents.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about saving time on difficult parent communication while keeping a professional tone.",
        attributionPrompt:
          "Replace with a verified quote from a class teacher or subject teacher.",
      },
    ],
    cta: {
      title: "Communicate concerns more clearly without losing your voice",
      body: "Try Zaza Draft if you want calm, teacher-first support for difficult parent communication that still leaves the final words with you.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-respond-to-parent-complaint-about-grades": {
    slug: "how-to-respond-to-parent-complaint-about-grades",
    shortTitle: "How to Respond to Parent Complaint About Grades",
    keyword: "how to respond to parent complaint about grades",
    intent: "How-to/problem intent",
    title:
      "How to Respond to Parent Complaint About Grades | Calm Teacher Guidance | Zaza Draft",
    metaDescription:
      "How to respond to parent complaint about grades with calm, professional wording. De-escalate, explain clearly, and protect the relationship with help from Zaza Draft.",
    h1: "How to Respond to Parent Complaint About Grades",
    description:
      "Practical guidance for teachers who need to reply professionally when a parent challenges a mark, report grade, or assessment judgement.",
    ogImage: "/report-card-grades.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to respond to parent complaint about grades is one of those messages teachers can end up rewriting three or four times because the stakes feel high. You want to be calm, fair, and clear, but you also need to protect your professional judgement and avoid a drawn-out argument.",
      "A calmer structure helps you do that. Zaza Draft supports the first draft so you do not have to start from scratch when the email already feels tense. Teachers still edit and approve every word.",
    ],
    heroBullets: [
      "Explain grading calmly and clearly",
      "Avoid defensive or reactive wording",
      "Keep your professional judgement central",
    ],
    featuredSnippet:
      "To respond to a parent complaint about grades, acknowledge the concern calmly, explain the basis for the grade briefly and factually, avoid arguing point by point, and offer a clear next step such as a call, meeting, or review of the work. Keep the tone professional and measured.",
    sections: [
      {
        id: "why-grade-emails-escalate",
        title: "Why complaints about grades can escalate quickly",
        body: [
          "Grade-related emails often carry more emotion than the words on screen show. Parents may feel worried, surprised, or protective. Teachers may feel their judgement is being challenged. That combination can make even a short reply feel loaded.",
          "A calm response helps slow the situation down. It keeps the focus on evidence, process, and the next step rather than slipping into a personal exchange.",
        ],
      },
      {
        id: "what-a-good-reply-does",
        title:
          "What a good response to a parent complaint about grades should do",
        body: [
          "A strong reply acknowledges the parent's concern, explains the grading context clearly, and keeps the tone steady. It does not need to defend every sentence of your assessment. It needs to show that the judgement was considered and professional.",
          "That is especially important if the issue relates to reports, predicted grades, mock exams, coursework, or parents' evening follow-up.",
        ],
        bullets: [
          "Acknowledge the concern without sounding defensive",
          "Briefly explain the assessment basis",
          "Offer a sensible next step",
        ],
      },
      {
        id: "safer-structure",
        title:
          "A safer structure for how to respond to parent complaint about grades",
        body: [
          "A practical structure is: acknowledgement, clarification, process, next step. Acknowledge the concern. Clarify what the grade reflects. Mention the process or evidence briefly. Then offer a next step if further discussion is needed.",
          "This structure is often more effective than a long point-by-point rebuttal, especially when the parent email is already emotional.",
        ],
        exampleLabel: "Example email snippet",
        exampleBody:
          "Thank you for your email. I understand your concern regarding [student name]'s grade and appreciate you getting in touch.\n\nThe grade was based on [brief assessment basis], alongside the standard criteria we are using in class. I would be happy to discuss the feedback in more detail and talk through the next steps that could help [student name] make progress from here.",
      },
      {
        id: "what-to-avoid",
        title: "What to avoid when a parent challenges a grade",
        body: [
          "Teachers often regret replies that sound clipped, over-explained, or slightly offended. Even if the grading is sound, a defensive tone can make the exchange harder to resolve.",
          "It is also worth avoiding overly broad claims such as 'the grade is final' unless that is strictly what school policy requires. A more constructive tone is usually to explain the decision and offer the next conversation point.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps when the wording needs to stay calm",
        body: [
          "Zaza Draft helps teachers shape lower-risk replies to complaints about grades, report comments, attainment concerns, and parent challenges that feel emotionally difficult. Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
          "Teachers stay fully in control. You decide how direct to be, what evidence to include, and whether the final wording reflects your professional judgement and school process.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: focused wording support vs all-in-one AI platforms",
      intro:
        "When a grade complaint arrives, breadth is not the main issue. Careful wording is. Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "Primary focus",
          zaza: "Teacher writing where tone and judgement matter",
          alternative: "Broad workflows across many tasks",
        },
        {
          label: "Parent grade complaints",
          zaza: "Treated as a core communication use case",
          alternative: "Handled more generally",
        },
        {
          label: "De-escalation tone",
          zaza: "Conservative and teacher-first",
          alternative: "More dependent on prompts and manual editing",
        },
        {
          label: "Teacher control",
          zaza: "Co-writer with review built in",
          alternative: "Broader output, broader variability",
        },
      ],
    },
    trustBlock: {
      title: "Teacher-written prompts, not generic AI",
      items: [
        {
          title: "Built for difficult school communication",
          body: "Helpful when assessment or report conversations feel sensitive and emotionally charged.",
        },
        {
          title: "De-escalation first",
          body: "Suggestions are designed to keep the tone professional, measured, and lower-risk.",
        },
        {
          title: "Teachers approve every word",
          body: "You remain fully responsible for the final message, evidence, and explanation.",
        },
      ],
    },
    faq: [
      {
        question: "Should I reply immediately to a complaint about grades?",
        answer:
          "Usually not. A short pause often helps you reply more clearly and professionally, especially if the email feels accusatory.",
      },
      {
        question: "Do I need to explain every detail of the mark?",
        answer:
          "Not always. A brief explanation of the basis for the grade is often enough, followed by a clear next step if the parent wants more detail.",
      },
      {
        question: "How do I avoid sounding defensive?",
        answer:
          "Acknowledge the concern, explain the context calmly, and keep the tone factual rather than argumentative.",
      },
      {
        question: "Should I offer a meeting?",
        answer:
          "If the concern is likely to continue or the parent wants more detail, a meeting or call can often be more productive than a long email exchange.",
      },
      {
        question: "Can Zaza Draft help with these replies?",
        answer:
          "Yes. Zaza Draft is built for tone-sensitive teacher writing, including complaints about grades, reports, and other emotionally difficult parent communication.",
      },
    ],
    internalLinks: [
      {
        href: "/report-comments-when-a-student-isnt-meeting-expectations",
        label: "Report Comments When a Student Isn't Meeting Expectations",
        description:
          "Link here for related report-writing language when grade concerns connect to formal reporting.",
      },
      {
        href: "/positive-but-honest-report-card-comments",
        label: "Positive but Honest Report Card Comments",
        description:
          "Link here for teachers wanting more balanced wording before complaints arise.",
      },
      {
        href: "/how-to-reply-to-a-difficult-parent-email",
        label: "How to Reply to a Difficult Parent Email",
        description:
          "Link here for a broader difficult-parent email response framework.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "report-comments-when-a-student-isnt-meeting-expectations",
      "positive-but-honest-report-card-comments",
      "how-to-reply-to-a-difficult-parent-email",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about replying more calmly to parent complaints about grades.",
        attributionPrompt:
          "Replace with a verified quote from a subject teacher or form tutor.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about avoiding long, stressful back-and-forth after a grading complaint.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher.",
      },
    ],
    cta: {
      title: "Reply to grade complaints from a calmer starting point",
      body: "Try Zaza Draft if you want lower-risk wording for difficult parent replies while keeping your professional judgement fully intact.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "behaviour-report-email-to-parents-template": {
    slug: "behaviour-report-email-to-parents-template",
    shortTitle: "Behaviour Report Email to Parents Template",
    keyword: "behaviour report email to parents template",
    intent: "Template intent",
    title:
      "Behaviour Report Email to Parents Template | Professional UK Wording | Zaza Draft",
    metaDescription:
      "Behaviour report email to parents template for teachers who need calm, professional wording. Explain incidents or patterns clearly and avoid unnecessary escalation with help from Zaza Draft.",
    h1: "Behaviour Report Email to Parents Template",
    description:
      "A practical template page for teachers who need a clear, school-appropriate way to email home about behaviour.",
    ogImage: "/positive-behavior.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "A behaviour report email to parents template can save more than time. It can stop a difficult message from sounding sharper, more emotional, or more accusatory than you intended.",
      "When behaviour communication starts to feel routine but still emotionally draining, it helps to have a professional structure you can adapt. Zaza Draft helps turn that structure into wording that still sounds like you, not generic AI text.",
    ],
    heroBullets: [
      "Use a professional structure quickly",
      "Keep behaviour wording factual and calm",
      "Customised to your voice, not generic",
    ],
    sections: [
      {
        id: "why-a-template-helps",
        title:
          "Why a behaviour report email template helps when you are already tired",
        body: [
          "Teachers often know what they need to communicate, but not how to phrase it in a way that feels both clear and relationship-safe. A template reduces that friction by giving you a sensible structure straight away.",
          "That matters even more when you are writing late in the day, after repeated incidents, or when the issue may already be sensitive with home.",
        ],
      },
      {
        id: "what-the-template-needs",
        title:
          "What a good behaviour report email to parents template should include",
        body: [
          "A useful behaviour template should name the concern, describe what happened in factual terms, explain the impact briefly, and set out the next step or request for support.",
          "It should not read like a punishment notice. It should sound like professional communication from school.",
        ],
        bullets: [
          "A clear purpose line",
          "Observable behaviour, not labels",
          "A practical next step",
        ],
      },
      {
        id: "template-example",
        title: "Behaviour report email to parents template",
        body: [
          "This is the type of structure Zaza Draft can help you turn into a more tailored message.",
        ],
        exampleLabel: "Template",
        exampleBody:
          "Dear [parent or carer name],\n\nI am writing to make you aware of a behaviour concern involving [student name] today / this week. During [lesson / time], [brief factual summary of behaviour].\n\nThis affected [learning / classroom routines / other pupils] and was addressed in school through [brief response]. I wanted to let you know so that we can work together to support improvement.\n\nPlease let me know if you would like to discuss this further.\n\nKind regards,\n[teacher name]",
      },
      {
        id: "how-to-adapt",
        title:
          "How to adapt the template for one incident or a repeated pattern",
        body: [
          "For a one-off incident, keep the wording brief and focused on the event. For a repeated pattern, mention that it has occurred more than once and explain why it is becoming a concern.",
          "That keeps the message proportionate. It also makes it easier to preserve trust while still being honest about the seriousness of the issue.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft can take a simple behaviour-email template and turn it into a more carefully worded draft that matches your tone, school context, and knowledge of the pupil. Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
          "Teachers remain fully in charge. You still review, refine, and approve every behaviour message before it is sent home.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: tailored behaviour-email wording vs all-in-one platforms",
      intro:
        "A broad platform can generate an email. A focused co-writer is more useful when behaviour wording needs to be careful, factual, and professionally safe.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "Behaviour communication focus",
          zaza: "Teacher-specific and tone-sensitive",
          alternative: "One use case among many",
        },
        {
          label: "Parent relationship sensitivity",
          zaza: "Core part of the writing approach",
          alternative: "More general communication output",
        },
        {
          label: "Template adaptation",
          zaza: "Customised to your voice",
          alternative: "Often broader and more generic",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer workflow",
          alternative: "Manual shaping does more of the work",
        },
      ],
    },
    trustBlock: {
      title: "Teacher-written prompts, not generic AI",
      items: [
        {
          title: "Factual behaviour wording",
          body: "Helpful when you need to describe behaviour clearly without sounding inflammatory.",
        },
        {
          title: "Relationship-preserving suggestions",
          body: "Designed to reduce the risk of accidental escalation in parent communication.",
        },
        {
          title: "Teachers approve every word",
          body: "The template and draft support your judgement, but you remain in charge of the final email.",
        },
      ],
    },
    faq: [
      {
        question: "Should a behaviour email template sound formal?",
        answer:
          "It should sound professional and school-appropriate. The exact level of formality depends on your context, but it should stay calm and factual.",
      },
      {
        question:
          "How much detail should I include in a behaviour report email?",
        answer:
          "Enough to explain the issue clearly, but not so much that the email becomes a long incident log. Focus on the key behaviour, impact, and next step.",
      },
      {
        question: "Can the same template work for repeated incidents?",
        answer:
          "Yes, as long as you adapt the wording to show that the issue is part of a pattern rather than a one-off event.",
      },
      {
        question: "How do I stop a behaviour template sounding generic?",
        answer:
          "Add the real context, keep the tone proportionate, and adjust the wording so it fits the pupil and situation. Templates are starting points, not finished emails.",
      },
      {
        question: "Can Zaza Draft help turn a template into a better email?",
        answer:
          "Yes. Zaza Draft is built to help teachers adapt templates into more tailored, lower-risk wording while keeping full control over the final message.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to Write a Behaviour Email to Parents",
        description:
          "Link here for the more direct how-to page on behaviour-email wording.",
      },
      {
        href: "/parent-email-about-student-behaviour",
        label: "Parent Email About Student Behaviour",
        description:
          "Link here for a related page focused on behaviour-email phrasing and structure.",
      },
      {
        href: "/how-to-email-parents-about-bullying-concerns",
        label: "How to Email Parents About Bullying Concerns",
        description:
          "Link here for a more sensitive safeguarding-adjacent behaviour communication page.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-write-a-behaviour-email-to-parents",
      "parent-email-about-student-behaviour",
      "how-to-email-parents-about-bullying-concerns",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using a calmer behaviour-email template instead of rewriting from scratch.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or behaviour lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about reducing stress around behaviour communication home.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or pastoral lead.",
      },
    ],
    cta: {
      title: "Turn the template into a calmer behaviour email",
      body: "Try Zaza Draft if you want help adapting behaviour-email templates into more careful, more professional parent communication.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "report-card-comments-for-anxious-students": {
    slug: "report-card-comments-for-anxious-students",
    shortTitle: "Report Card Comments for Anxious Students",
    keyword: "report card comments for anxious students",
    intent: "Template intent",
    title:
      "Report Card Comments for Anxious Students | Balanced UK Examples | Zaza Draft",
    metaDescription:
      "Report card comments for anxious students with thoughtful, professional wording for teachers. Write about confidence, participation, and support needs with care using Zaza Draft.",
    h1: "Report Card Comments for Anxious Students",
    description:
      "Careful report wording for teachers writing about anxiety, confidence, reassurance, and support needs in a balanced way.",
    ogImage: "/special-education-teacher.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "Report card comments for anxious students can feel especially delicate because the language needs to reflect the pupil's experience without reducing them to it. Teachers often want wording that is honest about confidence, participation, or worry, but still kind, respectful, and professionally safe.",
      "Zaza Draft helps teachers create balanced comment drafts more quickly, then customise them to their own voice rather than relying on generic report phrases.",
    ],
    heroBullets: [
      "Write with sensitivity and clarity",
      "Reflect confidence and support needs carefully",
      "Customised to your voice, not generic",
    ],
    featuredSnippet:
      "A balanced comment example: '[Student] has sometimes found new or less familiar tasks anxiety-inducing this term, but responds well to reassurance and structured support. With growing confidence, they are beginning to participate more steadily in class.'",
    sections: [
      {
        id: "why-this-wording-needs-care",
        title:
          "Why report card comments for anxious students need careful wording",
        body: [
          "Teachers often want to acknowledge emotional barriers honestly without making the report feel heavy or overly clinical. The wording needs to stay respectful, supportive, and proportionate to what has actually been observed in school.",
          "That matters even more when comments may sit alongside SEND support, pastoral concerns, or family worries already in the background.",
        ],
      },
      {
        id: "what-to-focus-on",
        title: "What to focus on in report comments for anxious students",
        body: [
          "Useful comments tend to describe confidence, participation, response to reassurance, willingness to try, and progress made with support. They stay close to school observations rather than making wider assumptions.",
          "This helps the comment feel professional and grounded while still showing care.",
        ],
        bullets: [
          "Confidence and participation",
          "Response to support and reassurance",
          "Small signs of progress or growing resilience",
        ],
      },
      {
        id: "example-comments",
        title: "Example report card comments for anxious students",
        body: [
          "These are examples of the kind of balanced language Zaza Draft can help produce. They should still be adapted to the pupil, subject, and support context.",
        ],
        exampleLabel: "Example comment snippets",
        exampleBody:
          "[Student] can approach new tasks cautiously, but responds positively to reassurance and is gradually becoming more willing to take part.\n\n[Student] has sometimes lacked confidence in sharing ideas, although they are beginning to contribute more when given encouragement and clear structure.\n\n[Student] benefits from a calm and predictable approach in class and is showing encouraging progress in managing anxiety around learning tasks.\n\n[Student] has made steady progress this term and is starting to show greater resilience when faced with challenge, particularly when support is clearly signposted.",
      },
      {
        id: "what-to-avoid",
        title: "What to avoid when writing about anxious students",
        body: [
          "It is usually better to avoid wording that sounds definitive, overly medical, or overly personal. Report comments should focus on observed impact in school rather than broad statements about the child's inner life.",
          "It is also helpful to avoid comments that make the pupil sound passive or fixed. A balanced comment can acknowledge challenge while still recognising growth and potential.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft helps teachers phrase delicate report comments more carefully, including wording around anxiety, confidence, participation, resilience, and support needs. Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
          "Teachers still make the final decision. You review, edit, and approve every comment so it remains accurate, appropriate, and aligned with your professional judgement.",
        ],
      },
    ],
    comparisonBlock: {
      title: "Comparison block: careful report wording vs broad AI output",
      intro:
        "Delicate pupil comments usually need more nuance than a broad AI writer gives by default. Focus matters when the wording has to stay sensitive and school-appropriate.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "Sensitive report language",
          zaza: "Teacher-first and more conservative",
          alternative: "Broader and less specialised",
        },
        {
          label: "Emotional nuance",
          zaza: "Built for delicate school writing",
          alternative: "More dependent on prompting and heavy editing",
        },
        {
          label: "Voice customisation",
          zaza: "Customised to your voice",
          alternative: "Can sound more generic or polished",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer workflow",
          alternative: "Manual shaping does more of the work",
        },
      ],
    },
    trustBlock: {
      title: "Built for teachers who want careful, respectful report wording",
      items: [
        {
          title: "Sensitive pupil language",
          body: "Helpful for writing about confidence, anxiety, reassurance, and support needs without sounding clumsy or cold.",
        },
        {
          title: "School-ready tone",
          body: "Useful for formal report comments that may also sit alongside pastoral or SEND support.",
        },
        {
          title: "Teachers approve every word",
          body: "The final report wording remains fully under teacher control and professional judgement.",
        },
      ],
    },
    faq: [
      {
        question: "How do I write about anxiety without labelling the student?",
        answer:
          "Focus on observable patterns in school, such as confidence, participation, or response to reassurance, rather than broad labels or assumptions.",
      },
      {
        question: "Should I mention support strategies in the comment?",
        answer:
          "Where relevant, yes. It can be helpful to explain what support helps the pupil engage or make progress.",
      },
      {
        question: "Can I still include positives?",
        answer:
          "Yes. In fact, balanced comments often work best when they recognise both the challenge and the signs of growth or potential.",
      },
      {
        question:
          "Can Zaza Draft help with this kind of delicate report wording?",
        answer:
          "Yes. Zaza Draft is designed for teacher writing where tone matters, including careful report comments about anxiety, confidence, and support needs.",
      },
      {
        question: "Will the wording sound generic?",
        answer:
          "It should not. The goal is to customise the draft to your own tone and knowledge of the pupil, not to use a generic comment unchanged.",
      },
    ],
    internalLinks: [
      {
        href: "/report-comments-for-struggling-students",
        label: "Report Comments for Struggling Students",
        description:
          "Link here for the broader cluster page on balanced wording for pupils facing different kinds of challenge.",
      },
      {
        href: "/positive-but-honest-report-card-comments",
        label: "Positive but Honest Report Card Comments",
        description:
          "Link here for broader guidance on balancing encouragement with honesty.",
      },
      {
        href: "/report-comment-generator-for-teachers",
        label: "Report Comment Generator for Teachers",
        description:
          "Link here for the tool page supporting customised report-comment drafting.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "report-comments-for-struggling-students",
      "positive-but-honest-report-card-comments",
      "report-comment-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finding more respectful wording for anxious pupils in reports.",
        attributionPrompt:
          "Replace with a verified quote from a teacher, SENCO, or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about reducing report-season stress for delicate pupil comments.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher.",
      },
    ],
    cta: {
      title: "Write delicate report comments more carefully and more quickly",
      body: "Try Zaza Draft if you want help finding calmer, more respectful wording for report comments where emotional nuance really matters.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-email-parents-about-bullying-concerns": {
    slug: "how-to-email-parents-about-bullying-concerns",
    shortTitle: "How to Email Parents About Bullying Concerns",
    keyword: "how to email parents about bullying concerns",
    intent: "How-to/problem intent",
    title:
      "How to Email Parents About Bullying Concerns | Calm Teacher Guidance | Zaza Draft",
    metaDescription:
      "How to email parents about bullying concerns with calm, professional wording. Communicate carefully, protect relationships, and keep messages school-appropriate with help from Zaza Draft.",
    h1: "How to Email Parents About Bullying Concerns",
    description:
      "A careful guide for teachers who need to write about bullying concerns in a way that is clear, sensitive, and professionally safe.",
    ogImage: "/difficult-conversation.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to email parents about bullying concerns is one of the highest-stakes parent communication tasks many teachers face. The wording needs to be careful, factual, and professionally safe because the issue is emotionally loaded from the start.",
      "A calmer structure helps you communicate clearly without causing unnecessary panic or inflaming the situation. Zaza Draft supports that first draft, but teachers stay in full control and approve every word.",
    ],
    heroBullets: [
      "Write with care and clarity",
      "Keep the wording factual and professionally safe",
      "Protect relationships while addressing the concern",
    ],
    featuredSnippet:
      "To email parents about bullying concerns, describe the concern carefully, explain what has been observed or reported in school, avoid speculative language, and outline the next step or school process. Keep the tone calm, factual, and professionally appropriate.",
    sections: [
      {
        id: "why-this-needs-extra-care",
        title: "Why bullying concerns need especially careful parent emails",
        body: [
          "Bullying-related communication can escalate very quickly because the concern is serious and emotionally charged. Teachers often need wording that is both sensitive and clear, especially if facts are still being established or the situation is actively being investigated.",
          "That is why professional tone matters so much. The email should communicate concern and process without drifting into assumption, blame, or alarmist language.",
        ],
      },
      {
        id: "what-the-email-should-do",
        title: "What a bullying-concern email should actually do",
        body: [
          "A strong email should make parents aware of the concern, explain what school is doing, and state what the next step will be. It should not try to resolve the whole issue in one message.",
          "This is particularly important where safeguarding, pastoral follow-up, witness accounts, or ongoing monitoring may be involved.",
        ],
        bullets: [
          "State the concern carefully",
          "Explain the school's immediate response",
          "Set out the next step or point of contact",
        ],
      },
      {
        id: "safer-wording",
        title:
          "A safer structure for how to email parents about bullying concerns",
        body: [
          "A useful structure is: purpose, concern, action taken, next step. That keeps the email grounded. If details are still emerging, say so clearly rather than implying certainty you do not have.",
          "This helps protect both the family relationship and the integrity of the school's handling of the issue.",
        ],
        exampleLabel: "Example email snippet",
        exampleBody:
          "I am writing to make you aware of a concern that has been raised in school regarding an interaction involving [student name]. We are currently looking into the matter and have already taken immediate steps to ensure the situation is being handled appropriately.\n\nI wanted to inform you at this stage and will update you again once we are in a position to share further detail.",
      },
      {
        id: "what-to-avoid",
        title: "What to avoid in emails about bullying concerns",
        body: [
          "Avoid speculative language, emotionally loaded phrases, or wording that sounds like a conclusion has been reached before the school process is complete. Even well-meant language can cause unnecessary alarm if it goes too far beyond what is known.",
          "It is also worth avoiding vague reassurance that tells parents very little. The message should be calm, but still clear about what happens next.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps when the wording needs to be especially careful",
        body: [
          "Zaza Draft helps teachers and school staff shape lower-risk wording for the most sensitive parent communication, including bullying concerns, behaviour issues, complaints, and difficult pastoral follow-up. Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
          "Teachers and school staff still remain fully in control. You decide what to include, what not to include, and whether the final message is accurate, appropriate, and professionally safe.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: careful school wording vs all-in-one AI platforms",
      intro:
        "In sensitive situations, careful wording matters more than feature breadth. Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "Sensitive parent communication",
          zaza: "Teacher-first and tone-sensitive",
          alternative: "Broader and less specialised",
        },
        {
          label: "Professional caution",
          zaza: "More conservative by design",
          alternative: "More dependent on prompt wording",
        },
        {
          label: "Safeguarding-adjacent scenarios",
          zaza: "Handled with clearer communication focus",
          alternative: "General output across many use cases",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer workflow",
          alternative: "Manual judgement must do more of the safety work",
        },
      ],
    },
    trustBlock: {
      title: "Teacher-written prompts, not generic AI",
      items: [
        {
          title: "Designed for sensitive school communication",
          body: "Helpful when the issue is serious and the wording needs extra care.",
        },
        {
          title: "Professional, lower-risk tone",
          body: "Suggestions are built to feel calmer and more conservative rather than speculative or overconfident.",
        },
        {
          title: "Teachers approve every word",
          body: "The final message remains fully under staff control, with full review before anything is sent home.",
        },
      ],
    },
    faq: [
      {
        question: "Should I email parents immediately about bullying concerns?",
        answer:
          "That depends on the situation and school process, but when you do communicate, the wording should stay calm, factual, and aligned with what is actually known at that stage.",
      },
      {
        question: "How much detail should I include?",
        answer:
          "Enough to explain the concern and the next step clearly, but not so much that the email goes beyond verified information or school process.",
      },
      {
        question: "Should the email use the word bullying directly?",
        answer:
          "That depends on the context and your school's approach. The wording should reflect the status of the concern accurately and professionally.",
      },
      {
        question: "What if the situation is still being investigated?",
        answer:
          "Say that clearly. It is better to explain that the matter is being looked into than to imply certainty too early.",
      },
      {
        question:
          "Can Zaza Draft help with safeguarding-adjacent parent emails?",
        answer:
          "Yes. Zaza Draft is designed for difficult school communication where tone, clarity, and caution matter, though staff remain fully responsible for final review and decision-making.",
      },
    ],
    internalLinks: [
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher Guide to Sensitive Parent Emails",
        description:
          "Link here for the broader guide to sensitive parent-email situations.",
      },
      {
        href: "/difficult-conversation-with-parents-script-email",
        label: "Difficult Conversation with Parents Script Email",
        description:
          "Link here for script-style wording before or after a sensitive parent conversation.",
      },
      {
        href: "/how-to-communicate-concerns-to-parents-professionally",
        label: "How to Communicate Concerns to Parents Professionally",
        description:
          "Link here for the wider framework on professional concern-based communication.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "teacher-guide-to-sensitive-parent-emails",
      "difficult-conversation-with-parents-script-email",
      "how-to-communicate-concerns-to-parents-professionally",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about feeling safer with the wording for a very sensitive parent email.",
        attributionPrompt:
          "Replace with a verified quote from a teacher, DSL, or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft to avoid speculative or reactive phrasing.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or school leader.",
      },
    ],
    cta: {
      title: "Use calmer wording for the messages that matter most",
      body: "Try Zaza Draft if you want lower-risk support for highly sensitive parent emails while keeping every final decision with school staff.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-reply-to-an-angry-parent-email": {
    slug: "how-to-reply-to-an-angry-parent-email",
    shortTitle: "How to Reply to an Angry Parent Email",
    keyword: "how to reply to an angry parent email",
    intent: "How-to/problem intent",
    title:
      "How to Reply to an Angry Parent Email | Calm Teacher Guidance | Zaza Draft",
    metaDescription:
      "How to reply to an angry parent email with calm, professional wording. De-escalate, protect your energy, and keep control of the message with help from Zaza Draft.",
    h1: "How to Reply to an Angry Parent Email",
    description:
      "A pain-first guide for teachers who need a steady reply when an inbox message lands hot, unfair, or exhausting.",
    ogImage: "/parent-teacher-communication.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to reply to an angry parent email is the sort of search teachers make when they should already be asleep. You open the email expecting a quick reply and instead get a novella of accusations, copied-in assumptions, and one line that makes your stomach drop.",
      "The goal is not to win the thread. It is to lower the temperature, protect your professional voice, and send something you would still stand behind tomorrow. Zaza Draft helps with that first draft, but teachers still edit and approve every word.",
    ],
    heroBullets: [
      "De-escalate without sounding weak",
      "Keep facts clear and tone measured",
      "Save your energy while staying in control",
    ],
    featuredSnippet:
      "To reply to an angry parent email calmly, pause before answering and separate the feeling from the facts. A strong teacher reply usually does four things: acknowledges the concern, states only the key verified facts, explains what has already happened in school, and offers one clear next step such as a call, meeting, or follow-up after checking with a colleague. Avoid matching the parent's tone, rebutting every accusation, or adding fresh emotional language. Keep it short enough to reread once before sending. Zaza Draft can suggest calmer wording for difficult parent communication, but teachers stay in control, edit the draft, and approve every word before it is used.",
    sections: [
      {
        id: "why-this-query-happens-late",
        title: "Why teachers search this late at night",
        body: [
          "Angry parent emails rarely arrive at a convenient moment. They show up between lessons, during parents' evening prep at 10pm, or just when you thought the day was done. The hardest part is not understanding the issue. It is finding wording that will not make tomorrow worse.",
          "That is why a calmer first draft matters. When your system is already overloaded, good structure can protect both your professionalism and your energy.",
        ],
      },
      {
        id: "what-not-to-do",
        title: "What usually makes an angry parent email reply worse",
        body: [
          "Teachers often get pulled into point-by-point rebuttals, over-explaining, or sounding sharper than intended. Even when the facts are on your side, a defensive email can keep the exchange going for days.",
          "The safer move is to answer the concern, not the whole performance. A short, steady reply usually lands better than a detailed defence.",
        ],
        bullets: [
          "Do not reply while still angry",
          "Do not answer every accusation line by line",
          "Do not let the parent's tone set your tone",
        ],
      },
      {
        id: "safer-reply-structure",
        title: "A safer structure for how to reply to an angry parent email",
        body: [
          "Start by acknowledging the concern. Then clarify the essential facts. After that, move quickly to what happens next. This keeps the reply professional and prevents the email from turning into a long emotional exchange.",
          "If the issue involves behaviour, grades, SEN provision, safeguarding sensitivity, or repeated complaints, a call or meeting is often the safer next step.",
        ],
        exampleLabel: "Example reply opening",
        exampleBody:
          "Thank you for your email. I can see that you are upset about what happened, and I appreciate you getting in touch.\n\nTo clarify, the matter was addressed in school today and I would be happy to discuss the next steps with you by phone if that would be helpful.",
      },
      {
        id: "protect-your-energy",
        title: "How to protect your energy and still stay professional",
        body: [
          "Some parent emails drain far more than the minutes it takes to answer them. The emotional after-effect is real. That is why it helps to use wording that is calm, bounded, and not trying to solve everything in one go.",
          "You do not need to absorb the full force of the message in order to reply professionally. A clear next step and a steady tone are often enough.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without taking over your judgement",
        body: [
          "Zaza Draft is built for moments like this, when the wording matters more than speed alone. It helps teachers turn a stressed mental draft into calmer, more school-appropriate language for angry parent replies, complaints, and emotionally loaded follow-up emails.",
          "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most. Teachers stay in full control, review every line, and decide what is accurate, fair, and ready to send.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: dedicated angry-parent reply support vs all-in-one AI platforms",
      intro:
        "When a parent is upset, fluent wording is not enough. The real need is calmer, lower-risk phrasing that protects the relationship and still keeps boundaries clear.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "High-conflict parent email focus",
          zaza: "Built for teacher replies where tone is high-stakes",
          alternative: "General drafting across many unrelated tasks",
        },
        {
          label: "De-escalation support",
          zaza: "More conservative and relationship-aware",
          alternative: "More dependent on prompt quality",
        },
        {
          label: "Professional voice",
          zaza: "Customised to your school context and role",
          alternative: "Often needs substantial editing",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer workflow",
          alternative: "Teacher has to reshape generic output",
        },
      ],
      note: "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
    },
    trustBlock: {
      title: "Built for teachers replying under pressure",
      items: [
        {
          title: "Teacher-written prompts",
          body: "Designed around real school communication pressure, not broad generic AI use cases.",
        },
        {
          title: "Psychological safety",
          body: "Helpful when you need to de-escalate without feeling like you are giving up your boundaries.",
        },
        {
          title: "Teachers approve every word",
          body: "You stay in full control of the final reply, the evidence, and the tone.",
        },
      ],
    },
    faq: [
      {
        question: "Should I reply immediately to an angry parent email?",
        answer:
          "Usually not. A short pause helps you avoid reactive wording and makes a calmer, clearer reply more likely.",
      },
      {
        question: "Do I need to answer every accusation in the email?",
        answer:
          "No. Focus on the core concern, clarify the facts that matter, and move towards the next professional step.",
      },
      {
        question: "What if the parent has copied in senior staff?",
        answer:
          "Keep the tone especially measured and factual. A concise, professional reply is usually safer than a long defence.",
      },
      {
        question: "When should I move the issue to a phone call or meeting?",
        answer:
          "If the issue is complex, emotionally charged, or likely to keep spiralling by email, suggest a call or meeting early.",
      },
      {
        question:
          "What if the parent is wrong and I want to correct every point?",
        answer:
          "Correct the key facts you can verify, but do not let the reply become a point-by-point argument. A short factual response with a next step is usually more effective than a detailed defence.",
      },
      {
        question:
          "How do I sound calm without sounding weak or apologising for the wrong thing?",
        answer:
          "Acknowledge the concern, not necessarily the parent's version of events. Calm wording can still be clear, bounded, and professionally firm.",
      },
      {
        question:
          "Can Zaza Draft help me sound calmer without sounding robotic?",
        answer:
          "Yes. Zaza Draft is designed to produce more careful first drafts that you then edit into your own voice, rather than generic copy-and-paste responses.",
      },
      {
        question:
          "What if I am replying late at night and do not trust my tone any more?",
        answer:
          "That is exactly when a short structure helps. Start from the core concern, keep the facts brief, and review the draft once before sending rather than trying to write the perfect reply from scratch.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-respond-to-an-angry-parent-email",
        label: "How to Respond to an Angry Parent Email",
        description:
          "Link here for a closely related guide with calmer response structure for angry-parent messages.",
      },
      {
        href: "/how-to-reply-to-a-difficult-parent-email",
        label: "How to Reply to a Difficult Parent Email",
        description:
          "Link here for the broader difficult-parent version of the same late-night writing problem.",
      },
      {
        href: "/how-to-respond-to-parent-complaint-about-grades",
        label: "How to Respond to Parent Complaint About Grades",
        description:
          "Link here when the angry email is specifically about marks, assessment, or reporting.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-respond-to-an-angry-parent-email",
      "how-to-reply-to-a-difficult-parent-email",
      "how-to-respond-to-parent-complaint-about-grades",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about getting an angry parent email at night and using Zaza Draft to reply more calmly.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or head of year.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about avoiding a defensive reply and protecting energy after a hard school day.",
        attributionPrompt:
          "Replace with a verified quote from a pastoral lead or form tutor.",
      },
    ],
    cta: {
      title: "Reply more calmly when the email in your inbox is already hot",
      body: "Try Zaza Draft on zazadraft.com if you want a calmer first draft for angry parent emails that still sounds professional, clear, and like you.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "positive-but-honest-report-card-comments-for-struggling-students": {
    slug: "positive-but-honest-report-card-comments-for-struggling-students",
    shortTitle:
      "Positive but Honest Report Card Comments for Struggling Students",
    keyword: "positive but honest report card comments for struggling students",
    intent: "How-to/problem intent",
    title:
      "Positive but Honest Report Card Comments for Struggling Students | Zaza Draft",
    metaDescription:
      "Positive but honest report card comments for struggling students with balanced UK examples for teachers. Write clearly, kindly, and professionally with help from Zaza Draft.",
    h1: "Positive but Honest Report Card Comments for Struggling Students",
    description:
      "Balanced report wording for teachers who need to name a real concern without sounding bleak, generic, or harsher than they intend.",
    ogImage: "/progress-report.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "Positive but honest report card comments for struggling students are the comments teachers leave until last because they carry the most weight. You are tired, reports are stacking up, and every sentence feels like it could sound too soft, too harsh, or copied from somewhere else.",
      "Zaza Draft helps you move faster without flattening everything into generic report language. It offers a calmer first draft that you can customise to your own voice, your school, and the pupil in front of you.",
    ],
    heroBullets: [
      "Stay honest without sounding bleak",
      "Write balanced comments faster during report season",
      "Customised to your voice, not generic",
    ],
    featuredSnippet:
      "To write positive but honest report card comments for struggling students, describe the real challenge clearly, add one genuine strength or positive response to support, and end with a practical next step. The aim is not to hide the struggle or soften it into vague praise. It is to write something accurate, balanced, and professionally kind. Strong comments stay specific about focus, confidence, progress, behaviour, or attainment rather than making sweeping statements about the child. They should also be safe to stand behind at parents' evening or in later follow-up. Zaza Draft helps teachers shape report comments faster, but the teacher still checks the facts, adjusts the tone, and approves the final wording.",
    sections: [
      {
        id: "why-this-is-so-hard",
        title:
          "Why positive but honest report card comments for struggling students take so long",
        body: [
          "These comments are hard because you are trying to do two jobs at once. You need to be truthful about the struggle, but you also want the language to sound respectful, professional, and fair to the pupil and family reading it at home.",
          "That is why teachers end up staring at the screen late at night. The problem is not a lack of insight. It is the pressure of getting the wording exactly right when your energy is already gone.",
        ],
      },
      {
        id: "what-balanced-comments-do",
        title: "What balanced comments do better than generic praise",
        body: [
          "A strong report comment acknowledges the real concern, mentions support, effort, or potential where appropriate, and points towards a credible next step. It does not hide the issue, but it also does not define the pupil by it.",
          "This is especially important for pupils who are struggling academically, with focus, with confidence, or with a mix of school-related challenges.",
        ],
        bullets: [
          "Name a real challenge clearly",
          "Include genuine strengths or positive response to support",
          "End in a way that feels constructive rather than final",
        ],
      },
      {
        id: "example-comment-snippets",
        title:
          "Example positive but honest report card comments for struggling students",
        body: [
          "These are examples of the kind of language Zaza Draft can help you generate. They work best when adapted to your own subject, year group, and professional voice rather than used unchanged.",
        ],
        exampleLabel: "Example comment snippets",
        exampleBody:
          "[Student] has found aspects of the curriculum challenging this term and still needs regular encouragement to complete tasks independently. With continued support and greater confidence, they should be able to make steadier progress.\n\n[Student] can produce thoughtful work when tasks are broken down clearly, but their progress has been uneven and they would benefit from more consistent engagement in lessons.\n\n[Student] has had a difficult term in terms of focus and confidence, though there have been positive signs when support is carefully targeted and routines are secure.",
      },
      {
        id: "what-to-avoid",
        title:
          "What usually makes report comments sound too harsh or too empty",
        body: [
          "Teachers often swing between two extremes when exhausted. One is vague praise that says very little. The other is blunt wording that sounds fixed, personal, or disheartening.",
          "A better middle ground is specific, measured, and future-facing. That usually sounds more professional and more useful to families.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps during report exhaustion",
        body: [
          "Zaza Draft helps teachers turn rough report notes into balanced wording more quickly, especially when you have thirty more comments to write and no mental energy left for sentence number thirty-one.",
          "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most. Teachers still review every comment, refine the tone, and make sure the final version is accurate and school-ready.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: balanced report wording vs generic report generators",
      intro:
        "Many tools can produce fluent comment text. The harder task is creating wording that feels fair, specific, and professionally judged for pupils who are genuinely struggling.",
      alternativeLabel: "Generic report generator",
      rows: [
        {
          label: "Handling sensitive struggle",
          zaza: "Built for balanced, teacher-reviewed wording",
          alternative: "Often broad or over-smoothed",
        },
        {
          label: "Voice and nuance",
          zaza: "Customised to your voice and notes",
          alternative: "Can sound generic across multiple pupils",
        },
        {
          label: "School-ready tone",
          zaza: "Conservative and parent-aware",
          alternative: "More variable and prompt-dependent",
        },
        {
          label: "Teacher control",
          zaza: "You review and approve every comment",
          alternative: "Teacher has to rescue weaker output",
        },
      ],
      note: "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
    },
    trustBlock: {
      title: "Built for report season when your patience is already spent",
      items: [
        {
          title: "Balanced example language",
          body: "Helpful when you need comments that are honest, kind, and still professionally clear.",
        },
        {
          title: "Teacher-first report support",
          body: "Designed around report comments and school writing, not broad AI marketing copy.",
        },
        {
          title: "Teachers stay in control",
          body: "Every comment stays editable, reviewable, and grounded in your own judgement.",
        },
      ],
    },
    faq: [
      {
        question: "How do I write positively without hiding the struggle?",
        answer:
          "Use a real strength, positive response to support, or potential as part of the comment, then state the concern clearly and proportionately.",
      },
      {
        question:
          "Can I mention low attainment and confidence in the same comment?",
        answer:
          "Yes, as long as the wording stays manageable and specific rather than trying to explain everything at once.",
      },
      {
        question:
          "What if I am writing dozens of difficult comments in one sitting?",
        answer:
          "That is exactly where a calmer first draft helps. It reduces repetition while still letting you review each comment properly.",
      },
      {
        question: "How do I say a pupil is behind without sounding cruel?",
        answer:
          "Describe the area of difficulty and the kind of support that helps rather than making the pupil sound fixed in that struggle. Specific wording usually feels fairer than blunt labels.",
      },
      {
        question:
          "Can I mention SEN, confidence, or emotional factors in a report comment?",
        answer:
          "Only if that fits your school's approach, your role, and what is appropriate to share in the report. Where needed, keep the wording proportionate and grounded in observed learning.",
      },
      {
        question: "Should these examples be copied directly?",
        answer:
          "No. They work best as models for customised wording that still sounds like you and fits the pupil accurately.",
      },
      {
        question: "What if there has been very little progress this term?",
        answer:
          "Be honest about that, but keep the wording measured and constructive. You can state that progress remains limited while still naming the support, routines, or next steps that may help.",
      },
      {
        question:
          "Can Zaza Draft help me keep the tone consistent across a whole class set?",
        answer:
          "Yes. Zaza Draft is designed to help teachers draft more balanced, school-ready comments faster while keeping final control in teacher hands.",
      },
    ],
    internalLinks: [
      {
        href: "/positive-but-honest-report-card-comments",
        label: "Positive but Honest Report Card Comments",
        description:
          "Link here for the broader parent page on balanced report wording and honest encouragement.",
      },
      {
        href: "/report-comments-for-struggling-students",
        label: "Report Comments for Struggling Students",
        description:
          "Link here for wider report-comment examples covering academic, behavioural, and social struggle.",
      },
      {
        href: "/report-card-comments-for-anxious-students",
        label: "Report Card Comments for Anxious Students",
        description:
          "Link here for the more specific emotional-wellbeing angle within the same report cluster.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "positive-but-honest-report-card-comments",
      "report-comments-for-struggling-students",
      "report-card-comments-for-anxious-students",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finding better report wording for pupils who were struggling without sounding negative.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or head of department.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about cutting report-writing time while keeping comments balanced and individual.",
        attributionPrompt:
          "Replace with a verified quote from a primary or secondary teacher.",
      },
    ],
    cta: {
      title: "Write the hardest report comments with less dread",
      body: "Try Zaza Draft on zazadraft.com if you want help drafting positive but honest report card comments for struggling students without falling back on generic phrases.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "parent-wont-respond-to-behaviour-email": {
    slug: "parent-wont-respond-to-behaviour-email",
    shortTitle: "Parent Wont Respond to Behaviour Email",
    keyword: "parent wont respond to behaviour email",
    intent: "How-to/problem intent",
    title:
      "Parent Wont Respond to Behaviour Email | Calm Follow-Up Guidance | Zaza Draft",
    metaDescription:
      "Parent wont respond to behaviour email guidance for teachers who need calm follow-up wording, clear documentation, and professional next steps with help from Zaza Draft.",
    h1: "Parent Wont Respond to Behaviour Email",
    description:
      "Practical guidance for teachers who have already emailed home and now need a calm, documented next step when there is still no reply.",
    ogImage: "/teacher-working-at-desk-with-laptop.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "Parent wont respond to behaviour email is the next problem after you finally send the carefully worded message. You have already written it, logged it, maybe sent a follow-up, and now admin asks for proof you contacted parents again.",
      "This is not just a wording issue. It is an energy issue. Zaza Draft helps teachers write calm follow-up emails and document contact attempts without having to reinvent the same message every time.",
    ],
    heroBullets: [
      "Follow up without sounding annoyed",
      "Keep a clear record of contact attempts",
      "Protect your time and your professionalism",
    ],
    featuredSnippet:
      "If a parent will not respond to a behaviour email, send one calm follow-up that briefly restates the concern, records your attempt to make contact, and offers a clear next step such as a call or meeting. Keep the wording factual and save a record for school documentation.",
    sections: [
      {
        id: "why-no-reply-feels-so-draining",
        title: "Why no reply can feel as stressful as a bad reply",
        body: [
          "Silence from home often leaves teachers in a difficult position. You still need to show that you communicated the concern, but the situation remains unresolved and the pupil is still in front of you every day.",
          "That is why follow-up wording matters. The email needs to be clear enough for records, calm enough not to sound irritated, and practical enough to move the situation forward if possible.",
        ],
      },
      {
        id: "what-to-send-next",
        title: "What to send when a parent wont respond to a behaviour email",
        body: [
          "A follow-up email should be brief and factual. Remind the parent of the earlier contact, state why you are getting back in touch, and offer a clear next step such as a call, meeting, or contact through the relevant pastoral channel.",
          "This is also the point where good documentation matters. You are not just trying to get a response. You are showing that communication has been attempted properly.",
        ],
        exampleLabel: "Example follow-up wording",
        exampleBody:
          "I am following up on my previous email regarding concerns about [student name]'s behaviour in school. I wanted to make sure the message reached you and to offer the opportunity to discuss the matter further if helpful.\n\nPlease let me know if you would prefer a phone call, or contact the school office if a meeting would be more suitable.",
      },
      {
        id: "how-to-stay-measured",
        title:
          "How to stay measured when you are doing the communication work twice",
        body: [
          "It is easy for follow-up messages to sound tired, clipped, or quietly frustrated. Teachers are often carrying the extra burden of repeating communication while also being asked for evidence that the communication happened.",
          "A more useful tone is calm and administrative. The email should read as a professional record and a reasonable invitation to engage, not as a rebuke for not replying.",
        ],
        bullets: [
          "Refer to the previous email factually",
          "Avoid phrases that imply blame or annoyance",
          "Make the next route of contact clear",
        ],
      },
      {
        id: "when-to-escalate",
        title: "When to escalate rather than sending another email",
        body: [
          "Sometimes the right next step is not a third carefully worded message. Depending on school policy, you may need to involve a tutor, head of year, behaviour lead, or pastoral team.",
          "Your written note can still help here. A clear record of dates, contact attempts, and next steps makes escalation simpler and more defensible.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps with follow-up wording and records",
        body: [
          "Zaza Draft helps teachers phrase follow-up emails, contact logs, and short communication summaries in a way that sounds steady and professional. That is particularly useful when you are repeating yourself and do not trust your tired brain to keep the tone right.",
          "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most. You stay in control of the timeline, the facts, and the final version saved for school records.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: behaviour follow-up support vs all-in-one AI platforms",
      intro:
        "Following up after no parent response is not just about generating another email. It is about producing wording that works as a communication record and still sounds measured.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "Follow-up documentation focus",
          zaza: "Built for school communication and records",
          alternative: "General drafting with less school context",
        },
        {
          label: "Tone under frustration",
          zaza: "More conservative and professional",
          alternative: "Can sound too polished or generic",
        },
        {
          label: "Escalation readiness",
          zaza: "Supports clearer logs and next-step wording",
          alternative: "Teacher has to adapt the output more heavily",
        },
        {
          label: "Teacher control",
          zaza: "Review-led workflow",
          alternative: "Manual reworking does more of the risk control",
        },
      ],
      note: "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
    },
    trustBlock: {
      title: "Built for teachers who need proof as well as wording",
      items: [
        {
          title: "Teacher-written prompts",
          body: "Useful when the real problem is not just the email but the follow-up trail around it.",
        },
        {
          title: "Relationship-preserving language",
          body: "Helps you chase a response without sounding irritated or escalating the issue.",
        },
        {
          title: "Teachers approve every line",
          body: "You decide what gets sent and what gets recorded, with full control over the final wording.",
        },
      ],
    },
    faq: [
      {
        question:
          "How long should I wait before following up on a behaviour email?",
        answer:
          "That depends on school policy and urgency, but a short, calm follow-up is often better than waiting so long that the issue becomes harder to address.",
      },
      {
        question: "Should I mention that the parent has not replied?",
        answer:
          "Yes, but do it neutrally. Refer to your previous message and the date rather than sounding annoyed about the lack of response.",
      },
      {
        question: "What should I record for school documentation?",
        answer:
          "Save dates, methods of contact, the core concern raised, and any next step offered. Keep it factual and concise.",
      },
      {
        question: "When should I involve pastoral or senior staff?",
        answer:
          "If repeated contact attempts go unanswered or the issue is serious, follow your school's escalation route rather than endlessly sending more emails.",
      },
      {
        question: "Can Zaza Draft help with the follow-up and the log entry?",
        answer:
          "Yes. Zaza Draft can help teachers draft calm follow-up emails and concise communication notes while keeping the final record fully under teacher control.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to Write a Behaviour Email to Parents",
        description:
          "Link here for the first behaviour-email page in the sequence before the follow-up problem begins.",
      },
      {
        href: "/parent-email-about-student-behaviour",
        label: "Parent Email About Student Behaviour",
        description:
          "Link here for broader behaviour-email wording when you need to refine the original message.",
      },
      {
        href: "/how-to-document-parent-contact-without-losing-your-mind",
        label: "How to Document Parent Contact Without Losing Your Mind",
        description:
          "Link here for the documentation workflow once communication starts becoming a record-keeping burden.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-write-a-behaviour-email-to-parents",
      "parent-email-about-student-behaviour",
      "how-to-document-parent-contact-without-losing-your-mind",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about following up on unanswered behaviour emails without sounding irritated.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or head of year.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about saving time when admin needed a clear record of parent contact attempts.",
        attributionPrompt:
          "Replace with a verified quote from a pastoral lead or behaviour lead.",
      },
    ],
    cta: {
      title: "Follow up calmly when the first behaviour email gets no reply",
      body: "Try Zaza Draft on zazadraft.com if you want calmer follow-up wording and cleaner parent-contact records without adding more stress to your evening.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "how-to-document-parent-contact-without-losing-your-mind": {
    slug: "how-to-document-parent-contact-without-losing-your-mind",
    shortTitle: "How to Document Parent Contact Without Losing Your Mind",
    keyword: "how to document parent contact without losing your mind",
    intent: "How-to/problem intent",
    title:
      "How to Document Parent Contact Without Losing Your Mind | Teacher Guide | Zaza Draft",
    metaDescription:
      "How to document parent contact without losing your mind. Write cleaner parent-contact notes, follow-ups, and records with calmer teacher-first wording from Zaza Draft.",
    h1: "How to Document Parent Contact Without Losing Your Mind",
    description:
      "A practical page for teachers who are tired of writing the same parent-contact notes, emails, and summaries over and over again.",
    ogImage: "/teacher-working-at-desk-with-laptop.jpg",
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      "How to document parent contact without losing your mind becomes very real when admin asks for proof you contacted parents again, the behaviour concern is still live, and your notes are scattered across email, SIMS, CPOMS, or whatever system your school uses.",
      "The task is not difficult because you do not know what happened. It is difficult because you are repeating yourself under pressure. Zaza Draft helps teachers write calmer summaries, follow-up records, and contact notes without starting from scratch every time.",
    ],
    heroBullets: [
      "Record parent contact clearly and quickly",
      "Keep notes factual, concise, and professional",
      "Reduce the drain of repeating the same wording",
    ],
    featuredSnippet:
      "To document parent contact efficiently, record the date, method of contact, key concern discussed, any response from home, and the agreed or proposed next step. Keep the note factual, concise, and suitable for later review by pastoral or senior staff.",
    sections: [
      {
        id: "why-documentation-feels-never-ending",
        title: "Why parent-contact documentation feels harder than it should",
        body: [
          "The content is usually simple. The frustration comes from repetition. You write the email, then the log entry, then the follow-up summary, then a note for pastoral or SLT. By the end, you have written the same story four times in four slightly different tones.",
          "That is why teachers start searching for shortcuts late at night. The challenge is not literacy. It is admin load layered on top of emotional school communication.",
        ],
      },
      {
        id: "what-good-records-include",
        title: "What good parent-contact records include",
        body: [
          "A useful record should say when contact happened, how it happened, what concern was raised, how the parent responded if relevant, and what the next step is. It should be factual enough for future review and brief enough that writing it does not become another half-hour job.",
          "This matters for behaviour incidents, academic concerns, safeguarding sensitivity, bullying follow-up, missed homework, and repeated attempts to reach home.",
        ],
        bullets: [
          "Date and method of contact",
          "Clear summary of the issue",
          "Response and next step",
        ],
      },
      {
        id: "note-examples",
        title: "Example parent-contact notes teachers can adapt",
        body: [
          "These examples show the kind of professional wording Zaza Draft can help produce. They work best when adapted to your school's system and your own evidence.",
        ],
        exampleLabel: "Example documentation snippets",
        exampleBody:
          "Email sent to parent on 9 March regarding repeated low-level disruption in maths. Explained incidents from the previous week, outlined action taken in class, and invited parent to discuss by phone if helpful.\n\nPhone call attempted on 9 March at 4.15pm. No answer. Follow-up email sent summarising concern and offering meeting with head of year if preferred.\n\nParent replied on 10 March acknowledging concerns. Agreed to discuss expectations with [student name] at home. Class teacher to monitor and review by end of week.",
      },
      {
        id: "how-to-keep-notes-professional",
        title: "How to keep notes professional when you are already fed up",
        body: [
          "Documentation can start sounding clipped or emotional when you are writing it at the end of a long day. The safest approach is short, factual sentences that separate observable events from your feelings about them.",
          "That matters because these notes may later be read by senior leaders, pastoral teams, safeguarding staff, or families if communication is reviewed.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps with repeat documentation work",
        body: [
          "Zaza Draft helps teachers turn rough notes into cleaner contact logs, follow-up summaries, and calm parent-email records. It is especially useful when you know exactly what happened but have no patience left for writing it out again in a professional tone.",
          "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most. Teachers still check the facts, edit the tone, and decide what belongs in the final record.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: parent-contact documentation support vs all-in-one AI platforms",
      intro:
        "Documentation support needs more than fluent prose. Teachers need concise, school-appropriate records that are clear enough for colleagues and calm enough for audit trails.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "School record focus",
          zaza: "Built for communication notes and logs",
          alternative: "General output not shaped for school records",
        },
        {
          label: "Tone discipline",
          zaza: "Factual and conservative by default",
          alternative: "Can sound too polished or over-written",
        },
        {
          label: "Repeat workflow support",
          zaza: "Helps with email, log, and follow-up versions",
          alternative: "Teacher has to re-prompt each format manually",
        },
        {
          label: "Teacher control",
          zaza: "Review-led, evidence-led workflow",
          alternative: "More editing needed to make records usable",
        },
      ],
      note: "Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
    },
    trustBlock: {
      title:
        "Built for teachers who are tired of writing the same note four times",
      items: [
        {
          title: "Teacher-first admin support",
          body: "Helpful when the communication burden is administrative as much as emotional.",
        },
        {
          title: "Professional, factual wording",
          body: "Designed for school records that may later be reviewed by colleagues or senior staff.",
        },
        {
          title: "Teachers stay in charge",
          body: "You approve every line, which matters when the record could affect next steps or escalation.",
        },
      ],
    },
    faq: [
      {
        question: "What should always be included in a parent-contact log?",
        answer:
          "Date, method of contact, the key concern raised, any response, and the next step. That is usually enough to create a clear professional record.",
      },
      {
        question: "How detailed should my documentation be?",
        answer:
          "Detailed enough to be useful later, but not so detailed that it becomes another essay. Focus on facts, not every emotional detail.",
      },
      {
        question:
          "What do I actually write after a missed phone call or no reply?",
        answer:
          "Record the date, time, method attempted, and what you did next. A simple factual note is enough, such as that a call was attempted and a follow-up email was sent.",
      },
      {
        question: "Should my contact notes sound formal?",
        answer:
          "They should sound professional and factual. Brevity is often more useful than heavy formal wording.",
      },
      {
        question: "Can the same note be adapted for email and school records?",
        answer:
          "Yes. A strong core summary can usually be reshaped into a parent email, internal log, and follow-up note with lighter editing.",
      },
      {
        question:
          "How do I keep my notes usable for SLT, safeguarding, or pastoral follow-up?",
        answer:
          "Stick to observable facts, the communication method, and the agreed next step. Notes are usually strongest when they avoid speculation and emotional commentary.",
      },
      {
        question: "How do I stop this admin work swallowing the whole evening?",
        answer:
          "Use a repeatable structure and keep the note short. The point is to create a usable record, not to rewrite the whole incident in full prose every time.",
      },
      {
        question:
          "Can Zaza Draft help with parent-contact records as well as the email itself?",
        answer:
          "Yes. Zaza Draft is designed to help teachers draft sensitive school writing across parent emails, follow-ups, and concise records while keeping the final wording under teacher control.",
      },
    ],
    internalLinks: [
      {
        href: "/parent-wont-respond-to-behaviour-email",
        label: "Parent Wont Respond to Behaviour Email",
        description:
          "Link here for the unanswered-follow-up scenario where documentation becomes especially important.",
      },
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher Guide to Sensitive Parent Emails",
        description:
          "Link here for the broader communication guide behind these record-keeping situations.",
      },
      {
        href: "/how-to-email-parents-about-bullying-concerns",
        label: "How to Email Parents About Bullying Concerns",
        description:
          "Link here for another case where careful wording and record-keeping often overlap.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "parent-wont-respond-to-behaviour-email",
      "teacher-guide-to-sensitive-parent-emails",
      "how-to-email-parents-about-bullying-concerns",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finally keeping parent-contact logs tidy without spending another hour after school.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher, tutor, or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using Zaza Draft for both the parent email and the internal note that followed it.",
        attributionPrompt:
          "Replace with a verified quote from a head of year or behaviour lead.",
      },
    ],
    cta: {
      title:
        "Document parent contact faster without losing the professional tone",
      body: "Try Zaza Draft on zazadraft.com if you want cleaner contact notes, calmer follow-up wording, and less repeated writing after a long school day.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "supportive-email-to-parents-of-struggling-learner": {
    slug: "supportive-email-to-parents-of-struggling-learner",
    shortTitle: "Supportive Email to Parents of Struggling Learner",
    keyword: "supportive email to parents of struggling learner",
    intent: "Template intent",
    title:
      "Supportive Email to Parents of Struggling Learner | Calm UK Teacher Wording | Zaza Draft",
    metaDescription:
      "Supportive email to parents of struggling learner guidance for teachers. Write with empathy, professionalism, and clarity while keeping the relationship constructive with help from Zaza Draft.",
    h1: "Supportive Email to Parents of Struggling Learner",
    description:
      "A practical page for teachers who need to email home with support, honesty, and care when a learner is struggling.",
    ogImage: "/teacher-working-at-desk-with-laptop.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "A supportive email to parents of struggling learner often carries more emotional weight than it first appears. Teachers want to be honest that a pupil is finding things difficult, but they also want the message to sound supportive rather than bleak or critical.",
      "That is exactly where a calmer first draft can help. Zaza Draft supports the wording so teachers can save time, reduce stress, and still edit and approve every line before it is sent.",
    ],
    heroBullets: [
      "Communicate support as well as concern",
      "Keep the tone warm, clear, and professional",
      "Customised to your voice, not generic",
    ],
    sections: [
      {
        id: "why-supportive-language-matters",
        title: "Why supportive language matters when a learner is struggling",
        body: [
          "When a pupil is struggling, parents often need both honesty and reassurance. If the message is too soft, the concern may not land. If it is too harsh, the family may feel blamed or discouraged.",
          "Supportive wording helps keep the conversation constructive. It also gives teachers a way to communicate concern without turning the email into something emotionally heavy or clinical.",
        ],
      },
      {
        id: "what-a-supportive-email-should-do",
        title:
          "What a supportive email to parents of a struggling learner should do",
        body: [
          "A strong email should explain the concern, acknowledge the learner's effort or potential where appropriate, and outline the support or next step. It should feel like an invitation to work together, not just a notification of a problem.",
          "This is especially useful when the issue involves low attainment, confidence, missed work, behaviour overlap, or a pupil who is finding progress harder than expected.",
        ],
        bullets: [
          "State the concern clearly",
          "Keep the tone constructive",
          "Offer a practical next step or support point",
        ],
      },
      {
        id: "example-snippets",
        title: "Example supportive email wording for a struggling learner",
        body: [
          "These are examples of the kind of language Zaza Draft can help generate. They should be adapted to your phase, subject, and relationship with the family.",
        ],
        exampleLabel: "Example email snippets",
        exampleBody:
          "I wanted to get in touch because [student name] is currently finding some aspects of [subject / school life] difficult, and I felt it would be helpful for us to work together to support them.\n\nThere have been some encouraging moments in class, particularly when tasks are carefully structured, and I think with the right support we can help [student name] build greater confidence and make steadier progress.\n\nPlease let me know if it would be helpful to discuss some practical next steps together.",
      },
      {
        id: "what-to-avoid",
        title: "What to avoid in supportive emails about struggling learners",
        body: [
          "Even supportive emails can go wrong if the language becomes vague, overly sentimental, or quietly discouraging. Phrases that sound fixed or hopeless can undermine the supportive intention.",
          "It is usually better to keep the wording specific, kind, and future-facing. The goal is honest support, not generic reassurance.",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your judgement",
        body: [
          "Zaza Draft helps teachers shape calmer, more supportive parent communication around pupils who are struggling with learning, confidence, attainment, behaviour, or organisation. Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
          "Teachers remain fully in control. You review every suggestion, adjust the tone, and decide whether the final email accurately reflects the learner and the support needed.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: teacher-first support wording vs all-in-one platforms",
      intro:
        "When the goal is careful, supportive communication, a focused writing tool can be more useful than a broad platform. Unlike all-in-one platforms, Zaza focuses solely on getting the wording right when it matters most.",
      alternativeLabel: "All-in-one AI platform",
      rows: [
        {
          label: "Supportive parent-email focus",
          zaza: "Built for teacher communication",
          alternative: "One broad use case among many",
        },
        {
          label: "Emotional nuance",
          zaza: "More conservative and relationship-aware",
          alternative: "More prompt-dependent and variable",
        },
        {
          label: "Voice customisation",
          zaza: "Customised to your voice",
          alternative: "Can sound more generic or polished",
        },
        {
          label: "Teacher control",
          zaza: "Review-led co-writer workflow",
          alternative: "Manual shaping does more of the work",
        },
      ],
    },
    trustBlock: {
      title: "Suggestions that preserve your relationship",
      items: [
        {
          title: "Teacher-first support prompts",
          body: "Built for school communication where empathy and professionalism need to work together.",
        },
        {
          title: "Psychologically safer wording",
          body: "Helpful when you need to communicate a concern while still sounding supportive and respectful.",
        },
        {
          title: "Teachers approve every word",
          body: "The final email stays fully under your control so it still reflects your judgement and your voice.",
        },
      ],
    },
    faq: [
      {
        question: "How do I write supportively without hiding the concern?",
        answer:
          "State the concern clearly, then add what support is in place or what could help next. That keeps the email honest as well as supportive.",
      },
      {
        question: "Should I mention positives in the same email?",
        answer:
          "If they are real and relevant, yes. Genuine positives can help the message feel balanced and future-facing.",
      },
      {
        question: "What if the learner is struggling in several areas?",
        answer:
          "Focus on the most important issue and keep the email manageable. The aim is to open a constructive conversation, not to list every concern at once.",
      },
      {
        question:
          "Can this kind of email work for both academic and emotional struggles?",
        answer:
          "Yes, as long as the wording stays within what you know and have observed in school, and the next step is clear.",
      },
      {
        question: "Can Zaza Draft help me write this more carefully?",
        answer:
          "Yes. Zaza Draft is designed to help teachers write calmer, more supportive messages for difficult school situations while keeping the teacher in full control.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-tell-parents-their-child-is-falling-behind",
        label: "How to Tell Parents Their Child Is Falling Behind",
        description:
          "Link here for a more direct academic-progress concern page within the same cluster.",
      },
      {
        href: "/report-comments-for-struggling-students",
        label: "Report Comments for Struggling Students",
        description:
          "Link here for the report-writing version of the same support-focused concern.",
      },
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher Guide to Sensitive Parent Emails",
        description:
          "Link here for the broader guide to emotionally difficult parent-email situations.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "how-to-tell-parents-their-child-is-falling-behind",
      "report-comments-for-struggling-students",
      "teacher-guide-to-sensitive-parent-emails",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about writing more supportive emails to families of struggling learners.",
        attributionPrompt:
          "Replace with a verified quote from a class teacher or SENCO.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about finding wording that felt warm but still professional.",
        attributionPrompt:
          "Replace with a verified quote from a teacher or pastoral lead.",
      },
    ],
    cta: {
      title: "Write supportive parent emails with less second-guessing",
      body: "Try Zaza Draft if you want help finding calmer, more supportive wording for difficult parent communication while keeping every final word under your control.",
      primaryLabel: "Start your free trial",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "teacher-parent-communication-hub": {
    slug: "teacher-parent-communication-hub",
    shortTitle: "Parent Communication Hub",
    keyword: "teacher parent communication hub",
    intent: "How-to/problem intent",
    title:
      "Teacher Parent Communication Hub | Calm Email Help for Teachers | Zaza Draft",
    metaDescription:
      "Teacher parent communication hub with practical help for angry parent replies, behaviour emails, contact logs, parents' evening follow-up, and sensitive school wording.",
    h1: "Teacher Parent Communication Hub",
    description:
      "A central hub for teachers who need calmer parent-email wording, clearer report language, and lower-stress school communication.",
    ogImage: "/parent-teacher-communication.jpg",
    heroEyebrow: "Hub page",
    heroDescription: [
      "Teacher parent communication hub pages only help if they reflect the real moments teachers are actually searching from. You are not looking for generic communication theory at 9.40pm. You are usually looking for the one line that keeps a difficult email professional, the one structure that makes a behaviour message feel safe to send, or the one report comment that does not sound harsh.",
      "This hub brings the strongest Zaza Draft parent-communication pages into one place so teachers can move quickly from the pain they are feeling to the wording help they actually need.",
    ],
    heroBullets: [
      "Find help by pain point, not by marketing category",
      "Move from angry replies to calmer follow-up and contact logs",
      "Keep teacher judgement and approval over every word",
    ],
    featuredSnippet:
      "A useful teacher parent communication hub should group support by the moments teachers actually face: angry parent emails, behaviour messages home, follow-up after parents' evening, contact logs, and balanced report wording that will still hold up later.",
    sections: [
      {
        id: "why-hub",
        title: "Why parent communication feels bigger than the message itself",
        body: [
          "Teachers rarely dread the email because typing is hard. They dread it because parent communication carries emotional labour, reputational risk, and admin follow-up all at once. One short message can affect the next conversation, the next log entry, and the next day in school.",
          "That is why this hub is organised around practical pain points. It is meant to help when you know the issue but need steadier wording, not when you need another vague article about communication being important.",
        ],
      },
      {
        id: "choose-by-pain",
        title: "Choose the page that matches the problem in front of you",
        body: [
          "If the issue is an upset parent, go straight to the angry-parent pages. If the issue is behaviour, use the behaviour email and follow-up pages. If the issue is progress or report wording, use the report cluster instead of trying to force one parent-email template to do every job.",
          "Teachers save more time when they start from the right page. That is often the difference between one clean draft and thirty minutes of rewriting.",
        ],
        bullets: [
          "Angry email from a parent: start with the reply pages",
          "No reply from home: use the follow-up and documentation pages",
          "Parents' evening aftermath: use the script and follow-up templates",
          "Report pressure: move into the balanced-comment pages",
        ],
      },
      xPainParentSection,
      xPainAdminLogSection,
      {
        id: "how-zaza-fits",
        title: "How Zaza Draft fits into the workflow",
        body: [
          "Zaza Draft is not there to replace the teacher's judgement. It is there to reduce the stress of starting from a blank page when the wording feels risky, repetitive, or emotionally loaded.",
          "That means calmer first drafts for parent emails, more balanced report language, and cleaner notes for follow-up. You still decide what is true, what matters, and what gets sent.",
        ],
      },
    ],
    trustBlock: {
      title:
        "Built for teachers who need calm wording across the whole home-school workflow",
      items: [
        {
          title: "Teacher-first pages",
          body: "This hub is organised around real teacher pain points such as angry replies, behaviour follow-up, contact logs, and report wording.",
        },
        {
          title: "Low-risk tone support",
          body: "The focus stays on measured, professional wording that preserves relationships and still reads appropriately in school context.",
        },
        {
          title: "Control stays with you",
          body: "Zaza Draft remains a co-writer. Teachers edit and approve every line before anything is sent or recorded.",
        },
      ],
    },
    faq: [
      {
        question: "Where should I start if the parent is already angry?",
        answer:
          "Start with the angry-parent reply pages first. They are designed for situations where the emotional temperature is already high and the wording needs to lower the risk, not add more detail for its own sake.",
      },
      {
        question:
          "What if the issue is behaviour and I also need a clean contact log?",
        answer:
          "Use the behaviour pages together with the documentation page. In many schools the email and the record are linked, so it helps to think about both at the same time.",
      },
      {
        question: "Can this hub help during report season as well?",
        answer:
          "Yes. The report cluster is linked throughout this hub because report wording often leads to later parent conversations and follow-up questions.",
      },
      {
        question: "Is this written for UK teachers only?",
        answer:
          "The hub is useful more broadly, but the tone and examples are especially aligned with UK school language and teacher pain points.",
      },
      {
        question: "How does Zaza Draft fit into these pages?",
        answer:
          "Each page is designed to help on its own, but Zaza Draft is the tool behind the calmer drafting workflow if you want help turning rough notes into more professional wording.",
      },
    ],
    internalLinks: [
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "Reply to an angry parent email",
        description:
          "Start here if the stress is coming from a hostile or escalating parent message.",
      },
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "Write a behaviour email to parents",
        description:
          "Use this for behaviour concerns that need factual wording and a workable tone.",
      },
      {
        href: "/how-to-document-parent-contact-without-losing-your-mind",
        label: "Document parent contact without losing your mind",
        description:
          "Go here when the admin log is becoming as stressful as the communication itself.",
      },
      {
        href: "/uk/how-to-reply-to-angry-parent-email",
        label: "UK guide to angry parent emails",
        description:
          "Use the UK-focused page if you want wording that leans more directly into British school context.",
      },
      sharedFooterLinks.product,
    ],
    relatedSlugs: [
      "how-to-reply-to-an-angry-parent-email",
      "how-to-write-a-behaviour-email-to-parents",
      "how-to-document-parent-contact-without-losing-your-mind",
      "positive-but-honest-report-card-comments-for-struggling-students",
      "teacher-guide-to-sensitive-parent-emails",
      "parents-evening-follow-up-email-template",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using the hub as a starting point for difficult parent communication.",
        attributionPrompt:
          "Replace with a verified quote from a class teacher or head of year.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about moving from one hub page to another instead of starting from a blank page each time.",
        attributionPrompt:
          "Replace with a verified quote from a pastoral lead or SENCO.",
      },
    ],
    cta: {
      title: "Start with the page that matches tonight's problem",
      body: "Use Zaza Draft if you want a calm co-writer behind these pages so you can move from rough notes to more professional wording without losing your voice.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See the product",
      secondaryHref: "/products/draft",
    },
  },
  "pastoral-email-to-parents-template": {
    slug: "pastoral-email-to-parents-template",
    shortTitle: "Pastoral Email Template",
    keyword: "pastoral email to parents template",
    intent: "Template intent",
    title:
      "Pastoral Email to Parents Template | Calm, Professional School Wording | Zaza Draft",
    metaDescription:
      "Pastoral email to parents template for teachers and school staff who need calm, professional wording for support concerns, follow-up, and sensitive home-school communication.",
    h1: "Pastoral Email to Parents Template",
    description:
      "A calm starting point for pastoral emails that need warmth, boundaries, and school-appropriate wording.",
    ogImage: "/parent-teacher-communication-templates.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "A pastoral email to parents template is usually searched when the issue feels delicate enough that you do not want to improvise. You need wording that sounds human, supportive, and professional without drifting into vagueness or accidental escalation.",
      "Zaza Draft helps teachers and pastoral staff start from a safer structure, then adapt the final message to the family, concern, and next step.",
    ],
    heroBullets: [
      "Start from a calm structure rather than a blank page",
      "Use wording that feels measured and respectful",
      "Edit every line so it still sounds like you",
    ],
    featuredSnippet:
      "A strong pastoral email to parents should explain why you are writing, stay factual about what has been noticed in school, show the support already in place, and offer one clear next step without sounding punitive or overly vague.",
    sections: [
      {
        id: "why-pastoral-emails-take-time",
        title: "Why pastoral emails take longer than they should",
        body: [
          "Pastoral messages often sit in the uncomfortable middle. They are not casual updates, but they may not be formal behaviour or safeguarding emails either. That makes tone harder because you are trying to sound caring without underplaying the concern.",
          "Teachers and pastoral staff often lose time rewriting these messages because each line has to carry empathy, professionalism, and clarity at the same time.",
        ],
      },
      {
        id: "template-structure",
        title:
          "A pastoral email to parents template that keeps the message steady",
        body: [
          "A useful structure is simple: explain why you are writing, describe what has been noticed, mention any support already in place, and give one realistic next step. That keeps the message manageable for families and easier for school staff to stand behind later.",
          "The best templates do not try to do all the emotional work for you. They give you a professional shape that you can then adapt with your own judgement.",
        ],
        exampleLabel: "Template example",
        exampleBody:
          "Dear [Parent/Carer],\n\nI wanted to get in touch to share a concern that has come up in school this week. We have noticed that [student] has been finding [issue] more difficult recently, and I wanted to make sure you were aware.\n\nIn school, we are supporting this by [support already in place]. I would value the chance to work together on the best next steps and would be happy to speak further if helpful.\n\nKind regards,\n[Name]",
      },
      xPainParentSection,
      {
        id: "common-mistakes",
        title: "Common mistakes in pastoral parent emails",
        body: [
          "Pastoral messages often become harder to read when they try to explain too much in one go. Long emotional paragraphs, over-reassuring language, or unclear next steps can leave parents more anxious rather than less.",
          "It is usually better to stay proportionate. Name the concern, keep the support visible, and let the next conversation do the deeper work if it needs to.",
        ],
        bullets: [
          "Do not soften the concern so much that the message becomes unclear",
          "Do not stack too many issues into one email",
          "Do not end without a next step",
          "Do not write in a tone you would not want quoted back later",
        ],
      },
      {
        id: "how-zaza-helps",
        title: "How Zaza helps without replacing your pastoral judgement",
        body: [
          "Zaza Draft is useful when you know what you need to communicate but want help finding calmer wording. It can turn rough pastoral notes into a more professional first draft that still leaves the teacher or pastoral lead in charge.",
          "That matters when the issue is emotionally difficult and the email may later lead to meetings, records, or ongoing support conversations.",
        ],
      },
    ],
    comparisonBlock: {
      title:
        "Comparison block: fixed pastoral templates vs teacher-first drafting support",
      intro:
        "A fixed template can help you start. A focused co-writer helps you adapt that structure to the student, family, and tone of the actual situation.",
      alternativeLabel: "Fixed template only",
      rows: [
        {
          label: "Starting point",
          zaza: "Template plus tailored wording support",
          alternative: "Static sample text",
        },
        {
          label: "Tone control",
          zaza: "Built for sensitive school communication",
          alternative: "Needs more manual reshaping",
        },
        {
          label: "Follow-up readiness",
          zaza: "Useful when the email may lead to later meetings or logs",
          alternative: "Less tailored to ongoing school context",
        },
      ],
      note: "If you want a calm starting point that still adapts to the real situation, Zaza Draft is the more useful option.",
    },
    trustBlock: {
      title:
        "Built for teachers and pastoral staff handling sensitive home-school messages",
      items: [
        {
          title: "Supportive tone",
          body: "Useful when the message needs warmth and professionalism at the same time.",
        },
        {
          title: "Teacher control",
          body: "You still choose the facts, the emphasis, and the final wording before anything is sent.",
        },
        {
          title: "School-ready language",
          body: "Designed for the kinds of pastoral messages that may later be revisited in meetings or records.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as a pastoral email to parents?",
        answer:
          "Usually it is a message about wellbeing, behaviour, emotional concerns, support needs, attendance patterns, or another issue where the tone needs to stay calm and relationship-focused.",
      },
      {
        question: "Should a pastoral email sound warm or formal?",
        answer:
          "Usually both. It should sound human and respectful, but still clear enough that the purpose and next step are obvious.",
      },
      {
        question: "Can I use the same template every time?",
        answer:
          "It is better to reuse a structure rather than the same exact wording. The message should still reflect the actual context, level of concern, and family relationship.",
      },
      {
        question: "What if the issue may become more serious later?",
        answer:
          "Keep the wording factual and proportionate so the message still works if it later becomes part of a wider record or follow-up conversation.",
      },
      {
        question:
          "Can Zaza Draft help me personalise this without sounding generic?",
        answer:
          "Yes. Zaza Draft is designed to help teachers and school staff turn rough notes into calmer, more tailored wording while they keep full editorial control.",
      },
    ],
    internalLinks: [
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher Guide to Sensitive Parent Emails",
        description:
          "Use the broader guide if the message feels emotionally difficult but does not fit one neat category.",
      },
      {
        href: "/difficult-conversation-with-parents-script-email",
        label: "Difficult Conversation With Parents Script Email",
        description:
          "Go here if the email is really a follow-up to an awkward meeting or conversation.",
      },
      {
        href: "/uk/parents-evening-email-templates",
        label: "UK Parents' Evening Email Template",
        description:
          "Use the UK page for a more British school context around meetings and follow-up wording.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "teacher-guide-to-sensitive-parent-emails",
      "difficult-conversation-with-parents-script-email",
      "how-to-communicate-concerns-to-parents-professionally",
      "parents-evening-follow-up-email-template",
      "supportive-email-to-parents-of-struggling-learner",
      "teacher-parent-communication-hub",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about using the pastoral template for calmer family communication.",
        attributionPrompt:
          "Replace with a verified quote from a pastoral lead or SENCO.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about reducing rewriting on emotionally difficult parent emails.",
        attributionPrompt:
          "Replace with a verified quote from a head of year or class teacher.",
      },
    ],
    cta: {
      title: "Draft pastoral emails more calmly",
      body: "Try Zaza Draft if you want a teacher-first co-writer that helps with supportive, professional parent emails while keeping every final word in your hands.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "parents-evening-follow-up-email-template": {
    slug: "parents-evening-follow-up-email-template",
    shortTitle: "Parents' Evening Follow-Up",
    keyword: "parents evening follow up email template",
    intent: "Template intent",
    title:
      "Parents' Evening Follow-Up Email Template for Teachers | Zaza Draft",
    metaDescription:
      "Parents' evening follow up email template for teachers with calm wording for difficult conversations, agreed next steps, and school-ready documentation.",
    h1: "Parents' Evening Follow-Up Email Template",
    description:
      "A calmer follow-up template for teachers who need to summarise parents' evening clearly and professionally.",
    ogImage: "/parent-teacher-communication-templates.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "A parents evening follow up email template becomes useful the moment the meeting is over and you realise the hard part is still ahead. You need to summarise the conversation, keep the relationship workable, and leave a clear school-ready record without reopening the whole meeting in writing.",
      "Zaza Draft helps teachers shape that follow-up more calmly, especially when the conversation was awkward, emotional, or likely to need another step afterwards.",
    ],
    heroBullets: [
      "Summarise the meeting without writing a transcript",
      "Confirm the next step clearly",
      "Keep a calmer tone even after a difficult conversation",
    ],
    featuredSnippet:
      "A strong parents' evening follow-up email should thank the parent for meeting, summarise the main concern or agreement briefly, confirm the next step, and keep the tone clear enough for school records without sounding cold.",
    sections: [
      {
        id: "why-follow-up-matters",
        title: "Why the follow-up often matters more than the meeting",
        body: [
          "Parents' evening conversations are often fast, emotional, and full of half-finished thoughts. The follow-up email is where the message becomes clearer, more stable, and easier for everyone to refer back to later.",
          "That is why the wording matters. A good follow-up lowers confusion, reduces later back-and-forth, and gives the teacher something more solid than memory alone.",
        ],
      },
      {
        id: "simple-structure",
        title:
          "A parents evening follow up email template that does not overdo it",
        body: [
          "The safest structure is brief. Thank them for attending. State the main point discussed. Confirm any agreed action or next step. Stop there unless something genuinely needs more explanation.",
          "Teachers often create more stress by trying to write everything that was said. A short, accurate follow-up is usually stronger than a long defensive one.",
        ],
        exampleLabel: "Follow-up template example",
        exampleBody:
          "Dear [Parent/Carer],\n\nThank you for meeting with me this evening. It was helpful to discuss [student] and the areas we talked about together.\n\nAs discussed, the main next step will be [next step]. In school, we will continue to support this through [brief support]. Please do let me know if a further conversation would be helpful.\n\nKind regards,\n[Name]",
      },
      xPainParentSection,
      {
        id: "difficult-conversation",
        title: "If the meeting felt tense, keep the email even calmer",
        body: [
          "After a difficult parents' evening conversation, the temptation is often to clarify every point by email. That usually makes the message heavier and can restart the tension.",
          "A better approach is to keep the email factual, proportionate, and forward-looking. Acknowledge the meeting, confirm what matters next, and let any larger disagreement move into the right school process if needed.",
        ],
      },
      xPainAdminLogSection,
    ],
    comparisonBlock: {
      title:
        "Comparison block: quick follow-up template vs calmer drafting support",
      intro:
        "A simple template is helpful. A teacher-first co-writer is more helpful when the conversation was difficult and the wording needs extra care.",
      alternativeLabel: "Template only",
      rows: [
        {
          label: "After a straightforward meeting",
          zaza: "Works quickly from rough notes",
          alternative: "Usually enough",
        },
        {
          label: "After a tense meeting",
          zaza: "More support with tone and structure",
          alternative: "Needs more manual rewriting",
        },
        {
          label: "School-record suitability",
          zaza: "Designed for wording you can stand behind later",
          alternative: "Depends more heavily on manual editing",
        },
      ],
    },
    trustBlock: {
      title:
        "Built for the part of parents' evening teachers still have to do at home",
      items: [
        {
          title: "Meeting-ready wording",
          body: "Useful when the follow-up needs to sound calm even if the meeting itself did not feel calm.",
        },
        {
          title: "Clear next steps",
          body: "Designed to make the action and support visible without turning the email into a transcript.",
        },
        {
          title: "Teachers stay in control",
          body: "You choose what to confirm, what to leave out, and what happens next.",
        },
      ],
    },
    faq: [
      {
        question: "Should I always send a parents' evening follow-up email?",
        answer:
          "Not always, but it is especially useful after difficult conversations, where there are agreed actions, or where you want a clear written summary for later reference.",
      },
      {
        question: "How long should the follow-up be?",
        answer:
          "Usually shorter than teachers think. Brief, accurate, and clear on the next step is usually more helpful than a long recap.",
      },
      {
        question: "What if the parent disagreed during the meeting?",
        answer:
          "Keep the email factual and forward-looking. Confirm what was discussed and the next step rather than trying to resolve the disagreement in writing.",
      },
      {
        question: "Can this email also help with school records?",
        answer:
          "Yes. A calm, concise follow-up often becomes a useful written record as well as a communication to the parent.",
      },
      {
        question:
          "Can Zaza Draft help with the wording after a difficult meeting?",
        answer:
          "Yes. Zaza Draft is designed to help teachers shape lower-stress, more professional follow-up messages while staying fully in control of the final draft.",
      },
    ],
    internalLinks: [
      {
        href: "/difficult-conversation-with-parents-script-email",
        label: "Difficult Conversation With Parents Script Email",
        description:
          "Use this if you need help with the conversation itself as well as the follow-up.",
      },
      {
        href: "/teacher-guide-to-sensitive-parent-emails",
        label: "Teacher Guide to Sensitive Parent Emails",
        description:
          "Go here for the broader cluster of emotionally difficult parent communication.",
      },
      {
        href: "/uk/parents-evening-email-templates",
        label: "UK Parents' Evening Email Template",
        description:
          "Use the UK-specific page if you want more British school-language context around parents' evening.",
      },
      sharedFooterLinks.parentStress,
    ],
    relatedSlugs: [
      "difficult-conversation-with-parents-script-email",
      "teacher-guide-to-sensitive-parent-emails",
      "parent-email-template-for-teachers",
      "pastoral-email-to-parents-template",
      "teacher-parent-communication-hub",
      "how-to-communicate-concerns-to-parents-professionally",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about writing calmer parents' evening follow-up emails.",
        attributionPrompt:
          "Replace with a verified quote from a class teacher or head of year.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about reducing after-hours rewriting after parent meetings.",
        attributionPrompt:
          "Replace with a verified quote from a subject teacher or pastoral lead.",
      },
    ],
    cta: {
      title:
        "Write the follow-up before the meeting starts living in your head all night",
      body: "Try Zaza Draft if you want calmer, clearer wording for parents' evening follow-up emails while keeping the final judgement and tone under your control.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See how it works",
      secondaryHref: "/products/draft",
    },
  },
  "year-6-report-comments-examples": {
    slug: "year-6-report-comments-examples",
    shortTitle: "Year 6 Report Comments",
    keyword: "year 6 report comments examples",
    intent: "Template intent",
    title:
      "Year 6 Report Comments Examples | Balanced UK School Wording | Zaza Draft",
    metaDescription:
      "Year 6 report comments examples for teachers who need balanced, professional wording on effort, attainment, confidence, readiness, and next steps.",
    h1: "Year 6 Report Comments Examples",
    description:
      "Balanced report-comment examples for Year 6 teachers who need honest wording that still feels fair and school-ready.",
    ogImage: "/report-card-grades.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "Year 6 report comments examples are usually searched when report season collides with SATs pressure, transition talk, and the strange feeling that every sentence now carries more weight. Teachers need wording that sounds balanced, specific, and kind without drifting into vague reassurance.",
      "Zaza Draft helps with that first draft so you can keep the honesty, context, and professional judgement while spending less time reopening the same sentence.",
    ],
    heroBullets: [
      "Examples for attainment, resilience, and readiness",
      "UK school tone without sounding formulaic",
      "Customise every comment to the pupil in front of you",
    ],
    featuredSnippet:
      "A balanced Year 6 report comment should describe current attainment or effort clearly, mention a genuine strength or response to support, and end with a realistic next step so the comment feels honest, useful, and fair.",
    sections: [
      {
        id: "why-year-6-is-different",
        title: "Why Year 6 comments feel heavier than other reports",
        body: [
          "Year 6 comments often sit alongside transition worries, SATs-related pressure, and wider conversations about readiness for secondary school. That gives the wording more emotional weight for both families and teachers.",
          "A generic comment bank can feel especially thin here. Teachers are often trying to write something that is accurate, hopeful, and robust enough to stand behind later.",
        ],
      },
      {
        id: "example-areas",
        title: "Useful Year 6 report comments examples by theme",
        body: [
          "The strongest examples are usually the ones that balance evidence with tone. They say what the pupil is doing now, recognise something real, and avoid making the child sound fixed in one difficulty.",
          "This is especially important for pupils whose confidence, independence, or consistency has fluctuated during the year.",
        ],
        bullets: [
          "Attainment and progress",
          "Resilience and response to challenge",
          "Independence and organisation",
          "Readiness for transition and next steps",
        ],
        exampleLabel: "Balanced Year 6 example",
        exampleBody:
          "[Student] has made steady progress this year and is increasingly able to apply taught strategies with more independence. At times, greater consistency is still needed, particularly when tasks feel unfamiliar, but [student] responds well to guidance and is well placed to continue building confidence in Year 7.",
      },
      xPainReportSeasonSection,
      {
        id: "avoid-common-problems",
        title: "What to avoid in Year 6 report wording",
        body: [
          "Comments become less useful when they lean too heavily on empty praise, overstate readiness, or sound harsher than the teacher really intends. Families often read Year 6 reports closely, so vague phrases can create as much stress as blunt ones.",
          "It usually helps to avoid generic lines such as 'needs to try harder' and replace them with more specific language about habits, confidence, or consistency.",
        ],
      },
      xPainReportRecordSection,
    ],
    trustBlock: {
      title:
        "Built for Year 6 teachers trying to sound fair under report pressure",
      items: [
        {
          title: "Balanced example language",
          body: "Useful when transition, attainment, and confidence all need to be reflected in one short comment.",
        },
        {
          title: "Professional UK tone",
          body: "Designed around report wording that sounds school-ready rather than generic or over-polished.",
        },
        {
          title: "Teacher judgement preserved",
          body: "You still choose the final message and make sure it fits the pupil, family, and school context.",
        },
      ],
    },
    faq: [
      {
        question:
          "Should Year 6 report comments mention readiness for secondary school?",
        answer:
          "Only when it is relevant and proportionate. It is usually better to describe habits, confidence, or independence clearly rather than making sweeping statements about transition.",
      },
      {
        question: "How do I stay honest without sounding bleak?",
        answer:
          "Name the real challenge, include a genuine response to support or strength, and make the next step realistic rather than dramatic.",
      },
      {
        question:
          "Can I use these examples for pupils who are still below expected standard?",
        answer:
          "Yes, but they should be customised. The structure is helpful, but the final wording needs to reflect the pupil's actual profile and support.",
      },
      {
        question: "Why do Year 6 comments seem to take longer?",
        answer:
          "Because the comments often carry more emotional and practical weight for families. Teachers also know these reports may shape later conversations more directly.",
      },
      {
        question: "Can Zaza Draft help me avoid repetitive Year 6 comments?",
        answer:
          "Yes. Zaza Draft helps teachers generate more balanced, varied starting points for report comments while keeping the final edit fully in teacher hands.",
      },
    ],
    internalLinks: [
      {
        href: "/positive-but-honest-report-card-comments-for-struggling-students",
        label:
          "Positive but Honest Report Card Comments for Struggling Students",
        description:
          "Use this if the main challenge is finding a balanced tone for pupils who have found the year hard.",
      },
      {
        href: "/how-to-write-report-comments-for-low-attainment-pupils",
        label: "How to Write Report Comments for Low Attainment Pupils",
        description:
          "Go here if the report challenge is mainly about lower attainment rather than transition wording.",
      },
      {
        href: "/uk/ofsted-friendly-report-comments",
        label: "UK Ofsted-Friendly Report Comments",
        description:
          "Use the UK page for more evidence-based, school-ready phrasing.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "positive-but-honest-report-card-comments-for-struggling-students",
      "report-comments-for-struggling-students",
      "how-to-write-report-comments-for-low-attainment-pupils",
      "report-card-comments-for-anxious-students",
      "sen-report-comments-examples",
      "teacher-parent-communication-hub",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about writing more balanced Year 6 comments under pressure.",
        attributionPrompt:
          "Replace with a verified quote from a Year 6 teacher or phase leader.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about reducing repetitive report wording while keeping comments personalised.",
        attributionPrompt:
          "Replace with a verified quote from a primary teacher.",
      },
    ],
    cta: {
      title: "Write Year 6 comments that feel fair, clear, and usable",
      body: "Try Zaza Draft if you want help shaping honest Year 6 report comments without losing your own voice or professional judgement.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See report-writing support",
      secondaryHref: "/ai-for-student-reports",
    },
  },
  "alternative-to-chatgpt-for-teachers": {
    slug: "alternative-to-chatgpt-for-teachers",
    shortTitle: "Alternative to ChatGPT",
    keyword: "alternative to chatgpt for teachers",
    intent: "Alternative/comparison intent",
    title:
      "Alternative to ChatGPT for Teachers | A More Focused Writing Co-Writer | Zaza Draft",
    metaDescription:
      "Looking for an alternative to ChatGPT for teachers? Zaza Draft is a more focused co-writer for parent emails, report comments, and sensitive school writing where tone matters.",
    h1: "Alternative to ChatGPT for Teachers",
    description:
      "A fair comparison for teachers who want calmer, more focused writing support than a broad general-purpose AI tool.",
    ogImage: "/teacher-working-at-desk-with-laptop.jpg",
    heroEyebrow: "Alternative/comparison intent",
    heroDescription: [
      "Teachers searching for an alternative to ChatGPT for teachers are often not looking for more power. They are looking for less risk, less clutter, and better wording for the small number of school tasks that keep swallowing their evenings. Parent emails, report comments, and difficult follow-up messages usually need a steadier workflow than a blank chat box.",
      "ChatGPT is broad. Zaza Draft is more focused. It is built for teacher writing tasks where tone, emotional intelligence, and professional judgement matter most.",
    ],
    heroBullets: [
      "More focused on parent communication and report writing",
      "Calmer workflow for teacher-specific wording tasks",
      "Teachers stay in control of every final line",
    ],
    featuredSnippet:
      "If you want an alternative to ChatGPT for teachers, the main reason to choose Zaza Draft is focus. ChatGPT is broad and flexible. Zaza Draft is designed specifically for teacher writing tasks where tone, sensitivity, and school-appropriate wording matter more than endless general-purpose options.",
    sections: [
      {
        id: "fair-comparison",
        title: "ChatGPT is broader. Zaza Draft is more focused.",
        body: [
          "This is not a claim that one tool is universally better. It is about fit. ChatGPT can help with many different kinds of work, including teaching tasks. Zaza Draft is designed specifically for the narrower set of writing moments where teachers most need safer, calmer, school-ready wording.",
          "If your pain point is parent communication, report comments, or emotionally difficult school messages, focus matters. The calmer the workflow, the easier it is to keep your judgement at the centre.",
        ],
      },
      {
        id: "where-zaza-fits-better",
        title: "Where a focused teacher writing tool can fit better",
        body: [
          "Broad AI chat tools are useful when you want open-ended ideation. A focused tool is often more useful when the job is highly repetitive, tone-sensitive, and professionally risky.",
          "That is why many teachers want something narrower for parent complaints, difficult replies, report comments, and contact logs.",
        ],
        bullets: [
          "Parent emails where one wrong sentence can escalate things",
          "Report comments that need balance rather than fluency alone",
          "Behaviour wording that must stay factual and relationship-aware",
          "School records and follow-up notes that need cleaner phrasing",
        ],
      },
      xPainParentSection,
      xPainReportSeasonSection,
      {
        id: "control-and-judgement",
        title: "Why teacher control still matters whichever tool you use",
        body: [
          "Teachers should stay fully in control of the final wording. That matters whether you use Zaza Draft, ChatGPT, or any other tool. The core question is whether the workflow helps you review more clearly or just generates more text to clean up.",
          "Zaza Draft is designed around review-led drafting rather than generic output. That is a better fit for teachers who want help with wording, not a replacement for professional judgement.",
        ],
      },
    ],
    comparisonBlock: {
      title: "Comparison block: ChatGPT and Zaza Draft",
      intro:
        "This comparison stays fair and factual. ChatGPT is a broad, flexible AI tool. Zaza Draft is a specialised writing co-writer for teachers.",
      alternativeLabel: "ChatGPT",
      rows: [
        {
          label: "Product scope",
          zaza: "Focused on teacher writing tasks where tone matters",
          alternative: "Broad general-purpose AI assistant",
        },
        {
          label: "Parent communication workflow",
          zaza: "Built around calmer, school-appropriate drafting",
          alternative: "Flexible but more open-ended",
        },
        {
          label: "Report comments",
          zaza: "Designed for balanced teacher-facing comment support",
          alternative: "Can help, but not specialised for this workflow",
        },
        {
          label: "Clarity of experience",
          zaza: "More boutique and writing-first",
          alternative: "Broader and more multi-purpose",
        },
      ],
      note: "If you want a dedicated writing co-pilot for parent emails and report comments, Zaza Draft is the more focused option.",
    },
    trustBlock: {
      title:
        "Built for teachers who want less clutter and more trust in the wording",
      items: [
        {
          title: "Teacher-specific support",
          body: "Designed around parent emails, report comments, and school writing rather than every possible AI task.",
        },
        {
          title: "Calm workflow",
          body: "Useful when the issue is not generating text but finding wording you are comfortable sending.",
        },
        {
          title: "Teacher judgement preserved",
          body: "Zaza Draft supports drafting. It does not remove your review or professional decision-making.",
        },
      ],
    },
    faq: [
      {
        question: "Is Zaza Draft better than ChatGPT for every teaching task?",
        answer:
          "No. ChatGPT is broader. Zaza Draft is better positioned for teachers who mainly want focused help with parent emails, report comments, and sensitive school writing.",
      },
      {
        question:
          "Why would a teacher choose a focused tool instead of a broad one?",
        answer:
          "Because broad flexibility can also mean more clutter and more manual shaping. A focused writing tool can feel calmer when the task is repetitive and tone-sensitive.",
      },
      {
        question: "Can ChatGPT still be useful for teachers?",
        answer:
          "Yes. Many teachers use it successfully. This page is for teachers who want something more tailored to emotionally difficult writing where wording quality matters a lot.",
      },
      {
        question: "Does Zaza Draft replace teacher judgement?",
        answer:
          "No. It is a co-writer, not a replacement. Teachers stay in control of the final content and approve every word.",
      },
      ...xComparisonFaqAdditions,
    ],
    internalLinks: [
      {
        href: "/ai-parent-email-generator-for-teachers",
        label: "AI Parent Email Generator for Teachers",
        description:
          "See the focused tool-intent page if parent communication is your main reason for looking beyond ChatGPT.",
      },
      {
        href: "/report-comment-generator-for-teachers",
        label: "Report Comment Generator for Teachers",
        description:
          "Use the report page if your pain point is report wording rather than general AI usage.",
      },
      {
        href: "/teacher-parent-communication-hub",
        label: "Teacher Parent Communication Hub",
        description:
          "Browse the wider parent-communication cluster if the real issue is a specific email situation rather than the platform comparison itself.",
      },
      sharedFooterLinks.product,
    ],
    relatedSlugs: [
      "alternative-to-magicschool-ai",
      "alternative-to-teachmate-ai",
      "ai-parent-email-generator-for-teachers",
      "report-comment-generator-for-teachers",
      "teacher-email-writer",
      "teacher-parent-communication-hub",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about preferring a more focused writing workflow than a broad AI chat tool.",
        attributionPrompt:
          "Replace with a verified quote from a classroom teacher or pastoral lead.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about calmer parent-email drafting compared with a more open-ended tool.",
        attributionPrompt:
          "Replace with a verified quote from a head of year or SENCO.",
      },
    ],
    cta: {
      title: "Try a more focused teacher writing workflow",
      body: "Try Zaza Draft if you want a dedicated writing co-pilot for parent emails, report comments, and sensitive teacher communication rather than a broad general-purpose AI experience.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "Compare the product",
      secondaryHref: "/products/draft",
    },
  },
  "sen-report-comments-examples": {
    slug: "sen-report-comments-examples",
    shortTitle: "SEN Report Comments",
    keyword: "sen report comments examples",
    intent: "Template intent",
    title:
      "SEN Report Comments Examples | Balanced, Respectful School Wording | Zaza Draft",
    metaDescription:
      "SEN report comments examples for teachers who need balanced, respectful wording about support, progress, confidence, and next steps without sounding vague or harsh.",
    h1: "SEN Report Comments Examples",
    description:
      "Respectful, balanced report-comment examples for teachers writing about pupils with SEN in a school-ready tone.",
    ogImage: "/report-card-grades.jpg",
    heroEyebrow: "Template intent",
    heroDescription: [
      "SEN report comments examples are usually needed when teachers want to be precise, respectful, and genuinely useful without letting the language become either too clinical or too vague. The wording has to recognise support, progress, and individual context without reducing the pupil to a label.",
      "Zaza Draft helps teachers shape calmer first drafts for SEN-related report comments while keeping the final judgement, language, and nuance in teacher hands.",
    ],
    heroBullets: [
      "Use respectful language around support and progress",
      "Keep comments balanced and evidence-based",
      "Adapt examples to the pupil rather than copying generic lines",
    ],
    featuredSnippet:
      "A strong SEN report comment should describe what the pupil is able to do, explain the support or structure that helps, and identify the next realistic area for development in language that stays respectful, specific, and proportionate.",
    sections: [
      {
        id: "why-sen-comments-are-hard",
        title: "Why SEN report comments need more care than generic examples",
        body: [
          "These comments often have to do several things at once. They need to describe progress honestly, reflect support appropriately, and avoid wording that sounds reductive, fixed, or overly clinical.",
          "Teachers often spend longer on these comments because they are trying to get the balance right. That is a sign of care, but it can also become a real workload drain.",
        ],
      },
      {
        id: "better-language",
        title: "What more respectful SEN report comment language sounds like",
        body: [
          "Better language usually focuses on observed learning, support that is helpful, and realistic next steps. It avoids framing the pupil as the problem and instead describes the learning profile more thoughtfully.",
          "That can make the comment more helpful for families and easier for staff to stand behind later.",
        ],
        exampleLabel: "Balanced SEN example",
        exampleBody:
          "[Student] continues to make progress when tasks are carefully structured and supported with clear routines. [Student] responds positively to encouragement and is becoming more confident in contributing ideas, particularly when given time to process and prepare. The next step is to continue building independence in familiar tasks while maintaining the support strategies that help [student] succeed.",
      },
      xPainReportSeasonSection,
      {
        id: "avoid-harmful-phrases",
        title: "What to avoid in SEN report wording",
        body: [
          "Avoid language that defines the pupil only by difficulty, sounds diagnostic when it is not your role to diagnose, or implies low expectations in a fixed way. Families notice those choices quickly, and they can undermine trust.",
          "It is usually better to stay with observed classroom learning, the support context, and the next step that feels proportionate and real.",
        ],
      },
      xPainReportRecordSection,
    ],
    trustBlock: {
      title:
        "Built for teachers who want respectful wording as well as clear reporting",
      items: [
        {
          title: "Respectful language",
          body: "Designed to help teachers describe progress and support without flattening the pupil into a label.",
        },
        {
          title: "School-ready tone",
          body: "Useful when the comment may later be revisited in meetings, records, or wider conversations with families.",
        },
        {
          title: "Teachers stay responsible for the final wording",
          body: "Zaza Draft supports the draft. It does not replace your judgement or knowledge of the pupil.",
        },
      ],
    },
    faq: [
      {
        question:
          "Should SEN report comments mention the support a pupil needs?",
        answer:
          "Yes, where it is relevant and helpful. Support context often makes the comment more accurate and more useful for families.",
      },
      {
        question: "How do I avoid sounding too clinical?",
        answer:
          "Stay with what you observe in learning and classroom participation rather than drifting into diagnostic or overly formal language.",
      },
      {
        question: "Can I still mention areas of difficulty clearly?",
        answer:
          "Yes. The key is to describe the difficulty proportionately and alongside support, progress, or realistic next steps rather than making the whole comment about deficit.",
      },
      {
        question: "Why do these comments take so long to write well?",
        answer:
          "Because the wording needs to be careful, respectful, and useful all at once. Many teachers are trying to protect both clarity and dignity in a small amount of space.",
      },
      {
        question: "Can Zaza Draft help me write more respectful SEN comments?",
        answer:
          "Yes. Zaza Draft is designed to help teachers draft more balanced, school-ready wording for report comments while keeping the teacher in full control of the final version.",
      },
    ],
    internalLinks: [
      {
        href: "/report-card-comments-for-anxious-students",
        label: "Report Card Comments for Anxious Students",
        description:
          "Use this page for wording around confidence, reassurance, and emotionally sensitive progress comments.",
      },
      {
        href: "/report-comments-for-struggling-students",
        label: "Report Comments for Struggling Students",
        description:
          "Go here if the issue is broader report tone for pupils who are finding learning difficult.",
      },
      {
        href: "/uk/ofsted-friendly-report-comments",
        label: "UK Ofsted-Friendly Report Comments",
        description:
          "Use the UK page for more evidence-based report phrasing that still sounds measured.",
      },
      sharedFooterLinks.reports,
    ],
    relatedSlugs: [
      "report-card-comments-for-anxious-students",
      "report-comments-for-struggling-students",
      "positive-but-honest-report-card-comments-for-struggling-students",
      "year-6-report-comments-examples",
      "teacher-parent-communication-hub",
      "report-comment-generator-for-teachers",
    ],
    structuredDataTypes: ["WebPage", "BreadcrumbList", "Article", "FAQPage"],
    testimonials: [
      {
        quotePrompt:
          "Placeholder testimonial about finding more respectful SEN report wording.",
        attributionPrompt:
          "Replace with a verified quote from a SENCO or class teacher.",
      },
      {
        quotePrompt:
          "Placeholder testimonial about using the examples as a safer starting point during report season.",
        attributionPrompt:
          "Replace with a verified quote from a primary or secondary teacher.",
      },
    ],
    cta: {
      title: "Write SEN report comments with more care and less rewriting",
      body: "Try Zaza Draft if you want help shaping respectful, balanced report comments while keeping every final line under your professional control.",
      primaryLabel: "Try Zaza Draft",
      primaryHref: "/early-access",
      secondaryLabel: "See report-writing support",
      secondaryHref: "/ai-for-student-reports",
    },
  },
} satisfies Record<string, TeacherWritingPage>;

export type TeacherWritingSlug = keyof typeof teacherWritingPages;

export const teacherWritingPageSlugs = Object.keys(
  teacherWritingPages,
) as TeacherWritingSlug[];

export function getTeacherWritingPage(slug: string) {
  return teacherWritingPages[slug as TeacherWritingSlug];
}

export function getTeacherWritingPageOrThrow(slug: string) {
  const page = getTeacherWritingPage(slug);

  if (!page) {
    throw new Error(`Unknown teacher writing page: ${slug}`);
  }

  return page;
}
