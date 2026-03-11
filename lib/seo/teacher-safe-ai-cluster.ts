import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export type ClusterIntent =
  | "Tool intent"
  | "Alternative/comparison intent"
  | "How-to/problem intent"
  | "Template intent";

export interface ClusterOutlineSection {
  title: string;
  bullets: string[];
}

export interface ClusterSpokePage {
  slug: string;
  keyword: string;
  intent: ClusterIntent;
  title: string;
  metaDescription: string;
  h1: string;
  hero: string[];
  featuredSnippet: string;
  outline: ClusterOutlineSection[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export const teacherPainPages = [
  {
    href: "/reduce-stress-parent-messages",
    label: "Reduce stress from parent messages",
    description:
      "A calmer guide for teachers carrying the emotional weight of parent communication.",
  },
  {
    href: "/how-to-reply-to-an-angry-parent-email",
    label: "How to reply to an angry parent email",
    description:
      "A practical framework for de-escalating difficult email threads without losing professional clarity.",
  },
  {
    href: "/best-ai-tool-parent-emails",
    label: "Best AI tool for parent emails",
    description:
      "A comparison page for teachers who want focused help with sensitive parent communication.",
  },
  {
    href: "/best-ai-writing-tools-for-teachers-2025",
    label: "Best AI writing tools for teachers",
    description:
      "A broader comparison for teachers evaluating writing support across several tools.",
  },
  {
    href: "/blog",
    label: "Teacher writing blog",
    description:
      "Guides on parent emails, report comments, school writing, and safe AI use in education.",
  },
  {
    href: "/products/draft",
    label: "Explore Zaza Draft",
    description:
      "Learn how the teacher-first co-writer supports parent communication, reports, and school writing.",
  },
  {
    href: "/ai-for-student-reports",
    label: "AI for student reports",
    description:
      "A dedicated page for teachers who want safer help with report writing and comment generation.",
  },
] as const;

export const clusterSpokes: ClusterSpokePage[] = [
  {
    slug: "hallucination-safe-ai-for-teachers",
    keyword: "hallucination safe AI for teachers",
    intent: "Tool intent",
    title: "Hallucination Safe AI for Teachers | Zaza Draft",
    metaDescription:
      "Looking for hallucination safe AI for teachers? Explore what safer teacher AI should do for parent emails, report comments, and professional school writing.",
    h1: "Hallucination safe AI for teachers",
    hero: [
      "Teachers searching for hallucination safe AI for teachers are usually not looking for novelty. They are looking for peace of mind. A parent email, safeguarding note, behaviour letter, or report comment can create real professional risk if a tool invents facts, adds details that were never provided, or turns a rough note into something that sounds more certain than it should.",
      "Safer teacher AI should work like a co-writer, not a guesser. It should stay close to the information the teacher provides, help soften tone where needed, and make it easier to review wording before anything is sent. Zaza Draft is built for teacher communication tasks where emotional tone, factual caution, and professional judgement matter. You stay in full control and approve every line.",
    ],
    featuredSnippet:
      "Hallucination safe AI for teachers means a tool that stays close to teacher-provided facts, avoids inventing student details, and supports review before anything is sent or shared.",
    outline: [
      {
        title: "Why hallucination safe AI for teachers matters",
        bullets: [
          "Parent communication can escalate quickly if a draft introduces facts that were never confirmed.",
          "School reports and behaviour records need careful wording because they can be revisited later.",
          "Teachers need support that lowers stress without creating new tone or accuracy risks.",
        ],
      },
      {
        title: "What safer teacher AI should do",
        bullets: [
          "Rewrite only from teacher-provided notes and evidence.",
          "Make cautious wording easier in emotionally difficult messages.",
          "Preserve room for professional judgement, edits, and approval.",
        ],
      },
    ],
    faq: [
      {
        question: "What does hallucination safe AI mean for teachers?",
        answer:
          "It means the tool should not invent student facts, behaviour incidents, or pastoral details that were never supplied by the teacher.",
      },
      {
        question: "Can teachers still edit the output?",
        answer:
          "Yes. Teachers should always review, edit, and approve the final wording before anything is sent.",
      },
    ],
  },
  {
    slug: "gdpr-compliant-ai-report-writer-uk-teachers",
    keyword: "GDPR compliant AI report writer UK teachers",
    intent: "Tool intent",
    title: "GDPR Compliant AI Report Writer for UK Teachers | Zaza Draft",
    metaDescription:
      "Need a GDPR compliant AI report writer for UK teachers? Learn what to look for in safer report writing support for schools, comments, and professional records.",
    h1: "GDPR compliant AI report writer for UK teachers",
    hero: [
      "If you are searching for a GDPR compliant AI report writer for UK teachers, the real question is usually about trust. Teachers and school leaders do not just want faster report comments. They want to know that any AI support fits a cautious school workflow, respects professional standards, and does not encourage risky handling of pupil information.",
      "A safer report writing tool for UK teachers should support drafting without pushing staff into oversharing data or accepting wording they would not stand behind. Zaza Draft is designed around that reality. It is a teacher-first co-writer for school writing tasks where wording matters. Teachers stay in control of every sentence, review the final draft themselves, and use the tool to reduce workload while keeping professional judgement intact.",
    ],
    featuredSnippet:
      "A GDPR compliant AI report writer for UK teachers should support cautious drafting, minimise unnecessary personal data use, and leave final judgement with the teacher.",
    outline: [
      {
        title: "What UK teachers actually need from AI report writing",
        bullets: [
          "Support for repetitive report comments without losing individual nuance.",
          "Professional wording that still feels school-appropriate and evidence-based.",
          "A workflow that works with cautious UK school expectations around privacy and records.",
        ],
      },
      {
        title: "Questions to ask before using an AI report writer",
        bullets: [
          "Does the tool encourage minimal data entry?",
          "Is the output conservative enough for report season and Ofsted-sensitive contexts?",
          "Can teachers easily edit and approve every comment themselves?",
        ],
      },
    ],
    faq: [
      {
        question:
          "Can AI help with school reports without replacing teacher judgement?",
        answer:
          "Yes. The safest use is as a drafting assistant that reduces repetition and helps wording, while teachers still review every comment.",
      },
      {
        question: "Why does GDPR matter for report writing tools?",
        answer:
          "Because report comments can involve personal data and sensitive school records, so the workflow needs to stay cautious and professionally governed.",
      },
    ],
  },
  {
    slug: "ofsted-friendly-parent-email-examples",
    keyword: "Ofsted friendly parent email examples",
    intent: "Template intent",
    title: "Ofsted Friendly Parent Email Examples for Teachers | Zaza Draft",
    metaDescription:
      "Find Ofsted friendly parent email examples with calm, professional wording for attendance, behaviour, support, and follow-up communication.",
    h1: "Ofsted friendly parent email examples",
    hero: [
      "Teachers looking for Ofsted friendly parent email examples are usually trying to strike a careful balance. They want their communication to feel warm, clear, and human, but also professionally defensible if reviewed later by senior leaders, governors, or inspectors. That is especially true when emails touch on attendance, behaviour, safeguarding follow-up, support plans, or concerns raised before parents’ evening.",
      "Ofsted-friendly school communication does not mean stiff or robotic language. It means wording that reflects professional judgement, keeps the focus on the pupil, and avoids loose claims or emotionally loaded phrases. Zaza Draft helps teachers draft messages in that tone. It is built for school writing where clarity matters and where a rushed sentence can create unnecessary worry.",
    ],
    featuredSnippet:
      "Ofsted friendly parent email examples use calm, factual language, focus on the pupil rather than emotion, and make the next step clear.",
    outline: [
      {
        title: "What makes a parent email feel Ofsted-friendly",
        bullets: [
          "Clear factual language rather than emotionally loaded phrasing.",
          "A constructive focus on support, behaviour, attendance, or progress.",
          "Professional next steps that show consistency and good school practice.",
        ],
      },
      {
        title: "Useful parent email scenarios",
        bullets: [
          "Attendance concerns and follow-up.",
          "Behaviour updates that need a calm home-school tone.",
          "Parents’ evening reminders or support summaries.",
        ],
      },
    ],
    faq: [
      {
        question: "What should teachers avoid in parent emails?",
        answer:
          "Avoid emotionally loaded language, unverified claims, sarcasm, or wording that sounds more certain than the evidence allows.",
      },
      {
        question: "Can an email be warm and still professionally safe?",
        answer:
          "Yes. Calm, respectful wording can still feel human while remaining clear and appropriate for school communication.",
      },
    ],
  },
  {
    slug: "how-to-document-parent-contact-for-slt-without-stress",
    keyword: "how to document parent contact for SLT without stress",
    intent: "How-to/problem intent",
    title: "How to Document Parent Contact for SLT Without Stress | Zaza Draft",
    metaDescription:
      "Learn how to document parent contact for SLT without stress using clear, factual notes that support behaviour records, safeguarding, and professional communication.",
    h1: "How to document parent contact for SLT without stress",
    hero: [
      "If you are searching for how to document parent contact for SLT without stress, you are probably not asking for a perfect template. You are trying to keep up with the emotional admin that sits underneath school communication. A phone call, parent email, behaviour concern, or follow-up after parents’ evening can all end with the same problem: now you need to log it clearly for senior leaders, and you are tired.",
      "The safest approach is simple and factual. Document what prompted the contact, what was communicated, what the parent said, and what the agreed next step is. Avoid adding emotion, assumptions, or extra interpretation that you would not want revisited later. Zaza Draft helps teachers turn rough notes into clearer professional records without removing human judgement.",
    ],
    featuredSnippet:
      "To document parent contact for SLT without stress, write a short factual note covering the date, purpose of contact, key information shared, parent response, and next step.",
    outline: [
      {
        title: "What SLT usually needs in a parent contact note",
        bullets: [
          "Date and method of contact.",
          "The issue discussed, such as behaviour, attendance, or support.",
          "A neutral summary of what was said and what happens next.",
        ],
      },
      {
        title: "What increases stress and risk",
        bullets: [
          "Writing notes from memory too late.",
          "Mixing facts with frustration.",
          "Recording more than the school needs for the issue at hand.",
        ],
      },
    ],
    faq: [
      {
        question: "What should teachers include in a parent contact log?",
        answer:
          "Include the date, type of contact, reason for the communication, key points discussed, and the agreed follow-up or action.",
      },
      {
        question: "Should teachers record emotions or assumptions?",
        answer:
          "No. Keep the note factual and neutral so it is useful for SLT, safeguarding, or future follow-up.",
      },
    ],
  },
  {
    slug: "ai-tone-tutor-for-difficult-teacher-emails",
    keyword: "AI tone tutor for difficult teacher emails",
    intent: "Tool intent",
    title: "AI Tone Tutor for Difficult Teacher Emails | Zaza Draft",
    metaDescription:
      "Need an AI tone tutor for difficult teacher emails? Explore safer help for parent complaints, colleague emails, and school communication where wording matters.",
    h1: "AI tone tutor for difficult teacher emails",
    hero: [
      "Teachers often do not need a full draft. They need a second pair of eyes on tone. That is why searches for an AI tone tutor for difficult teacher emails make sense. A message to a parent, colleague, line manager, or external professional can be factually correct and still feel too abrupt, too defensive, or too vague.",
      "A useful tone tutor should not flatten every message into bland corporate language. It should help teachers sound calm, direct, and appropriate for the situation. Zaza Draft is built for that type of school writing. It supports emotionally intelligent phrasing, parent communication sensitivity, and teacher control over the final wording.",
    ],
    featuredSnippet:
      "An AI tone tutor for difficult teacher emails should help teachers review warmth, clarity, and directness before sending.",
    outline: [
      {
        title: "When teachers need tone support most",
        bullets: [
          "Parent complaints or emotionally charged replies.",
          "Messages to SLT that need clarity without friction.",
          "Behaviour and pastoral follow-up where wording can shift the whole conversation.",
        ],
      },
      {
        title: "What a tone tutor should improve",
        bullets: [
          "Overly sharp phrasing.",
          "Ambiguous next steps.",
          "Language that may sound colder or harsher than intended.",
        ],
      },
    ],
    faq: [
      {
        question: "Can AI help a teacher sound less defensive in email?",
        answer:
          "Yes. A focused co-writer can suggest calmer phrasing, clearer structure, and a more measured tone while leaving the teacher in control.",
      },
      {
        question: "Is tone support useful for colleague emails too?",
        answer:
          "Yes. Teachers often need help with difficult messages to SLT, external agencies, and internal staff as well as parents.",
      },
    ],
  },
  {
    slug: "safe-ai-alternatives-to-chatgpt-for-school-reports",
    keyword: "safe AI alternatives to ChatGPT for school reports",
    intent: "Alternative/comparison intent",
    title: "Safe AI Alternatives to ChatGPT for School Reports | Zaza Draft",
    metaDescription:
      "Compare safe AI alternatives to ChatGPT for school reports. See what UK teachers should look for when writing report comments and pupil summaries.",
    h1: "Safe AI alternatives to ChatGPT for school reports",
    hero: [
      "Teachers looking for safe AI alternatives to ChatGPT for school reports are often reacting to a familiar concern. Generic AI can be impressive, but school reports are not the place to take chances with tone, invented details, or wording that sounds polished but professionally off. Report season already brings pressure, repetition, and second-guessing.",
      "A safer alternative for school reports should help with comment generation, phrasing, and consistency while staying close to the teacher’s notes. That is where Zaza Draft is more focused than generic AI. ChatGPT is broader. Zaza Draft is designed specifically for teacher writing tasks where tone matters. It helps with report comments, parent communication, and school messages in a calmer workflow that keeps teachers in control.",
    ],
    featuredSnippet:
      "Safe AI alternatives to ChatGPT for school reports should give teachers more focused help with comment writing, tone, and professional review.",
    outline: [
      {
        title: "Why teachers look beyond ChatGPT for reports",
        bullets: [
          "Generic AI can feel too broad for school-specific writing.",
          "Report comments need careful professional tone and consistency.",
          "Teachers want help that reduces stress without adding new risks.",
        ],
      },
      {
        title: "Neutral comparison",
        bullets: [
          "ChatGPT is broader. Zaza Draft is more focused.",
          "Zaza Draft is designed specifically for teacher writing tasks where tone matters.",
          "Teachers who want less clutter and more report-writing support may prefer a specialist tool.",
        ],
      },
    ],
    faq: [
      {
        question:
          "Why might teachers want an alternative to ChatGPT for reports?",
        answer:
          "Because report comments need more cautious, school-appropriate wording than a general AI tool is always optimised to produce.",
      },
      {
        question: "Is Zaza Draft a replacement for teacher judgement?",
        answer:
          "No. It is a co-writer that supports drafting while teachers still review and approve every word.",
      },
    ],
  },
  {
    slug: "reduce-sunday-night-report-stress-with-ai",
    keyword: "reduce Sunday night report stress with AI",
    intent: "How-to/problem intent",
    title: "Reduce Sunday Night Report Stress with AI | Zaza Draft",
    metaDescription:
      "Learn how to reduce Sunday night report stress with AI using calmer drafting routines, better comment structure, and teacher-first review control.",
    h1: "Reduce Sunday night report stress with AI",
    hero: [
      "Sunday night report stress is not just about workload. It is about the emotional drag of opening the laptop, seeing unfinished comments, and knowing you still need to sound thoughtful, fair, and precise for every pupil. Teachers searching for how to reduce Sunday night report stress with AI are usually looking for relief that still feels responsible.",
      "The safest way to use AI for report season is as a drafting partner. It should help turn notes into cleaner first drafts, support more consistent tone across classes, and reduce the mental friction of beginning each comment from scratch. Zaza Draft is built around that kind of school writing help. Teachers stay in control, review everything, and use the tool to reduce workload without handing over the final voice.",
    ],
    featuredSnippet:
      "To reduce Sunday night report stress with AI, use the tool for first drafts, repeated phrasing, and tone consistency while keeping final review with the teacher.",
    outline: [
      {
        title: "Why report stress peaks on Sunday night",
        bullets: [
          "Teachers delay starting because each comment feels mentally expensive.",
          "Repeated phrasing can make report writing feel endless.",
          "Tiredness makes tone and clarity harder to judge.",
        ],
      },
      {
        title: "A safer AI workflow for report season",
        bullets: [
          "Use teacher notes as the source, not vague prompts.",
          "Generate calm first drafts and edit them class by class.",
          "Review comments for accuracy, tone, and consistency before submission.",
        ],
      },
    ],
    faq: [
      {
        question: "Can AI really reduce report writing stress?",
        answer:
          "Yes, if it is used to reduce repetition and help with first drafts rather than replace the teacher’s professional judgement.",
      },
      {
        question: "What is the safest way to use AI during report season?",
        answer:
          "Keep the source notes teacher-led, use AI for drafting support, and review every comment carefully before it is finalised.",
      },
    ],
  },
  {
    slug: "parents-evening-email-templates-uk",
    keyword: "parents evening email templates UK",
    intent: "Template intent",
    title: "Parents’ Evening Email Templates UK Teachers Can Use | Zaza Draft",
    metaDescription:
      "Parents’ evening email templates for UK teachers, with calm wording for booking reminders, follow-up messages, and difficult conversations.",
    h1: "Parents’ evening email templates UK teachers can actually use",
    hero: [
      "Teachers searching for parents’ evening email templates UK are usually trying to save time without sounding impersonal. A booking reminder, schedule update, follow-up message, or difficult conversation after the evening itself all need slightly different wording, and most teachers end up rewriting the same message far too many times.",
      "Good parents’ evening emails should feel clear, respectful, and easy to act on. They should tell parents what they need to know without sounding abrupt or overloaded. Zaza Draft helps teachers shape those messages faster. It is a specialist co-writer for parent communication, report comments, and school writing where tone matters.",
    ],
    featuredSnippet:
      "Parents’ evening email templates for UK teachers should be short, clear, and easy for parents to act on.",
    outline: [
      {
        title: "Useful parents’ evening email types",
        bullets: [
          "Booking invitation and reminder emails.",
          "Follow-up messages after the meeting.",
          "Sensitive emails where behaviour, support, or progress concerns need careful wording.",
        ],
      },
      {
        title: "What good templates should include",
        bullets: [
          "A clear reason for writing.",
          "Specific action or timing details.",
          "Warm but professional tone that works across families.",
        ],
      },
    ],
    faq: [
      {
        question: "What should a parents’ evening reminder email include?",
        answer:
          "Include the date, time, booking details or slot reminder, and a short line explaining what the meeting will cover if that is useful.",
      },
      {
        question: "Can one template work for every family?",
        answer:
          "Not always. A strong base template helps, but sensitive cases still need teacher review and personal judgement.",
      },
    ],
  },
  {
    slug: "behaviour-letter-home-primary-school-ai-help",
    keyword: "behaviour letter home primary school AI help",
    intent: "Template intent",
    title: "Behaviour Letter Home Primary School AI Help | Zaza Draft",
    metaDescription:
      "Need behaviour letter home primary school AI help? Explore calmer wording for behaviour updates, next steps, and home-school communication.",
    h1: "Behaviour letter home primary school AI help",
    hero: [
      "Primary teachers looking for behaviour letter home primary school AI help are usually trying to do something delicate. They need to address behaviour clearly enough for home to understand the concern, but gently enough to avoid sounding shaming, accusatory, or overly formal for a younger pupil. That is difficult when the day has already been full.",
      "A useful AI co-writer should help teachers keep the wording calm, specific, and age-appropriate. It should support consistent behaviour communication while leaving room for teacher judgement and school policy. Zaza Draft is designed for that sort of writing. It helps teachers draft parent-facing messages, behaviour updates, and school communication where tone matters.",
    ],
    featuredSnippet:
      "Behaviour letter home primary school AI help is most useful when it keeps the tone calm, specific, and age-appropriate.",
    outline: [
      {
        title: "What a primary behaviour letter should do",
        bullets: [
          "Explain the concern clearly without shaming the child.",
          "Describe support, boundaries, and next steps.",
          "Keep the tone professional and constructive for home-school trust.",
        ],
      },
      {
        title: "Where teachers get stuck",
        bullets: [
          "Trying to sound honest without sounding harsh.",
          "Balancing behaviour expectations with pastoral sensitivity.",
          "Writing the same type of message repeatedly after a tiring day.",
        ],
      },
    ],
    faq: [
      {
        question: "Should a behaviour letter home sound formal?",
        answer:
          "It should sound professional and clear, but still human and supportive, especially in primary school contexts.",
      },
      {
        question: "Can AI help with behaviour communication?",
        answer:
          "Yes, if it is used to improve clarity and tone while the teacher still checks every final sentence.",
      },
    ],
  },
  {
    slug: "positive-honest-report-comments-sen-students",
    keyword: "positive honest report comments SEN students",
    intent: "Template intent",
    title: "Positive Honest Report Comments for SEN Students | Zaza Draft",
    metaDescription:
      "Find positive honest report comments for SEN students with careful wording that stays clear, respectful, and professionally useful.",
    h1: "Positive honest report comments for SEN students",
    hero: [
      "Teachers looking for positive honest report comments for SEN students are often holding two responsibilities at once. They want to describe progress and need accurately, but they also want to avoid language that feels reductive, vague, or unintentionally insensitive. SEN report writing can be emotionally demanding because the wording has to carry warmth, realism, and professional care at the same time.",
      "The most useful comments are not exaggeratedly positive and not bleakly clinical. They are specific, respectful, and focused on the pupil as a learner. Zaza Draft helps teachers work towards that balance. It is built for school writing where tone matters, including report comments, parent communication, and other professional messages.",
    ],
    featuredSnippet:
      "Positive honest report comments for SEN students should be specific, respectful, and grounded in real progress, support needs, and next steps.",
    outline: [
      {
        title: "What strong SEN report comments sound like",
        bullets: [
          "Specific observations instead of generic praise.",
          "Respectful reference to strengths, barriers, and support.",
          "A professional tone that is honest and constructive.",
        ],
      },
      {
        title: "Common pitfalls to avoid",
        bullets: [
          "Over-softening until the comment says very little.",
          "Using deficit-heavy wording that feels impersonal.",
          "Repeating phrases that do not reflect the individual pupil.",
        ],
      },
    ],
    faq: [
      {
        question: "How can report comments be both positive and honest?",
        answer:
          "By focusing on specific strengths, real progress, support needs, and next steps without exaggeration or overly clinical phrasing.",
      },
      {
        question: "Should SEN report comments be personalised?",
        answer:
          "Yes. Personalised wording is important because generic comments often miss the nuance that families and schools need.",
      },
    ],
  },
];

export function getClusterSpoke(slug: string) {
  const page = clusterSpokes.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`Unknown teacher safe AI cluster slug: ${slug}`);
  }

  return page;
}

export function buildClusterSpokeMetadata(slug: string): Metadata {
  const page = getClusterSpoke(slug);

  return buildPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/${page.slug}`,
    type: "article",
    keywords: [page.keyword, "teacher-first AI", "parent communication AI"],
  });
}

export const freeResourceIdeas = [
  {
    title: "10 Calm Parent Email Templates",
    description:
      "A downloadable PDF pack with calmer wording for complaints, follow-up, attendance, and behaviour communication.",
  },
  {
    title: "Report Comment Phrase Bank",
    description:
      "A phrase bank for honest, supportive report comments across attainment, effort, behaviour, and next steps.",
  },
  {
    title: "Parents’ Evening Follow-Up Pack",
    description:
      "Short email templates for post-meeting summaries, next actions, and support conversations.",
  },
  {
    title: "Difficult Email Tone Checklist",
    description:
      "A one-page checklist teachers can use before sending emotionally difficult emails to parents or SLT.",
  },
] as const;
