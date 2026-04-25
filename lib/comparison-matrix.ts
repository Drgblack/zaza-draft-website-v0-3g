import {
  CONTENT_FRESHNESS,
  parseFreshnessDate,
} from "@/lib/seo/content-freshness";
import type { MetadataRoute } from "next";

export const competitors = [
  "magicschool-ai",
  "teachmate",
  "chatgpt",
  "gemini",
  "claude",
  "generic-ai",
] as const;

export const usecases = [
  "parent-emails",
  "report-comments",
  "behaviour-notes",
  "de-escalation",
  "parents-evening",
  "sen-support",
] as const;

export type Competitor = (typeof competitors)[number];
export type UseCase = (typeof usecases)[number];

export type ComparisonRow = {
  label: string;
  zaza: string;
  competitor: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type ComparisonPageData = {
  path: string;
  title: string;
  h1: string;
  metaDescription: string;
  keyword: string;
  eyebrow: string;
  hero: string[];
  quickAnswer: string;
  introTitle: string;
  intro: string[];
  comparisonTitle: string;
  comparisonIntro: string;
  whyTitle: string;
  whyParagraphs: string[];
  tableTitle: string;
  tableRows: ComparisonRow[];
  faq: FaqItem[];
  relatedLinks: RelatedLink[];
  ctaTitle: string;
  ctaBody: string;
  breadcrumbs: Record<string, string>;
  lastReviewed: string;
};

type CompetitorDefinition = {
  label: string;
  categoryLine: string;
  neutralSummary: string;
  focusLine: string;
  privacyLine: string;
  toneLine: string;
  hallucinationLine: string;
  bestFitLine: string;
  fairPositioning: string;
};

type UseCaseDefinition = {
  label: string;
  keyword: string;
  pain: string;
  toneNeed: string;
  relatedLinks: RelatedLink[];
};

const competitorDefinitions: Record<Competitor, CompetitorDefinition> = {
  "magicschool-ai": {
    label: "MagicSchool AI",
    categoryLine: "a broader teacher workflow product",
    neutralSummary: "MagicSchool AI is broader. Zaza Draft is more focused.",
    focusLine:
      "MagicSchool AI covers more teaching workflows, while Zaza Draft stays centred on teacher writing tasks where tone matters.",
    privacyLine:
      "Both products still need teacher judgement about what pupil information should be included in a draft.",
    toneLine:
      "MagicSchool AI can support drafting, but Zaza Draft puts more emphasis on calmer, trust-first writing for emotionally difficult communication.",
    hallucinationLine:
      "Any AI draft still needs review. Broader workflow tools usually require extra checking when the wording is sensitive.",
    bestFitLine:
      "MagicSchool AI may fit teachers who want one broad toolkit. Zaza Draft fits teachers who want a dedicated writing co-writer.",
    fairPositioning:
      "If you mainly want breadth, MagicSchool AI may suit you. If you mainly want writing quality and tone safety, Zaza Draft is the clearer fit.",
  },
  teachmate: {
    label: "TeachMate",
    categoryLine: "a broad teaching support tool",
    neutralSummary:
      "TeachMate covers many teaching workflows. Zaza Draft is designed specifically for teacher writing tasks where tone matters.",
    focusLine:
      "TeachMate is broader across classroom workflow. Zaza Draft is narrower and more writing-specific.",
    privacyLine:
      "Both need professional judgement on data handling. Zaza Draft frames that conversation more directly around sensitive school writing.",
    toneLine:
      "TeachMate can help with output speed, but Zaza Draft leans harder into calm, professional wording for difficult messages.",
    hallucinationLine:
      "Teacher review is needed either way. A more focused product can make that review simpler when the output is mainly about wording quality.",
    bestFitLine:
      "TeachMate may fit schools wanting a wider assistant. Zaza Draft fits teachers who want a calmer writing specialist.",
    fairPositioning:
      "Choose TeachMate for breadth. Choose Zaza Draft if the real pressure is parent communication, report comments, and emotionally sensitive tone.",
  },
  chatgpt: {
    label: "ChatGPT",
    categoryLine: "a general-purpose AI model",
    neutralSummary:
      "ChatGPT is flexible and broad. Zaza Draft is more focused on teacher writing and professional tone.",
    focusLine:
      "ChatGPT can do many things, but it is not built specifically around parent communication, report comments, or school-safe wording.",
    privacyLine:
      "General models give teachers more setup responsibility. Zaza Draft frames the workflow around calmer, school-appropriate writing tasks.",
    toneLine:
      "ChatGPT can produce strong drafts, but teachers often need to prompt carefully to avoid wording that feels too polished, too generic, or professionally off.",
    hallucinationLine:
      "General-purpose models usually need more teacher steering and checking when the wording is high-stakes.",
    bestFitLine:
      "ChatGPT may fit users who want maximum flexibility. Zaza Draft fits teachers who want less prompt work and more writing-specific guardrails.",
    fairPositioning:
      "If you want an all-purpose model, ChatGPT may fit. If you want a calmer teacher-first co-writer, Zaza Draft is the better fit.",
  },
  gemini: {
    label: "Gemini",
    categoryLine: "a general-purpose AI model",
    neutralSummary:
      "Gemini is broad and flexible. Zaza Draft is more focused on teacher writing and tone-sensitive school communication.",
    focusLine:
      "Gemini offers general AI capability, while Zaza Draft is built specifically for writing tasks teachers actually need to send or sign off.",
    privacyLine:
      "Teachers still need to control what information goes in. Zaza Draft keeps that conversation closer to practical school writing use cases.",
    toneLine:
      "Gemini can help with ideation and drafting, but Zaza Draft puts more emphasis on lower-risk, professional wording.",
    hallucinationLine:
      "Broader models usually need more careful review when the message could affect a parent relationship or a formal report.",
    bestFitLine:
      "Gemini may suit users already working in a broader Google workflow. Zaza Draft suits teachers who mainly want better writing support.",
    fairPositioning:
      "Gemini can be a broad assistant. Zaza Draft is the tighter fit when the task is sensitive teacher writing.",
  },
  claude: {
    label: "Claude",
    categoryLine: "a general-purpose AI model",
    neutralSummary:
      "Claude is broad and often strong on writing. Zaza Draft is more specifically tuned for teacher communication and report-writing pressure.",
    focusLine:
      "Claude can be a strong general writer, but it is not built around school communication workflows or teacher-specific judgement points.",
    privacyLine:
      "Teachers still need to manage what goes into any model. Zaza Draft keeps the use case narrower and more school-facing.",
    toneLine:
      "Claude may produce polished prose, but Zaza Draft aims for wording that feels calmer, more school-appropriate, and easier to approve quickly.",
    hallucinationLine:
      "Even good general writing models need careful review for accuracy, appropriateness, and context fit.",
    bestFitLine:
      "Claude may fit users wanting a broad writing model. Zaza Draft fits teachers who want a dedicated co-writer for school tasks.",
    fairPositioning:
      "Claude may feel strong on general writing. Zaza Draft is the more focused option for teacher-first tone and safer school communication.",
  },
  "generic-ai": {
    label: "generic AI tools",
    categoryLine: "broad AI writing tools",
    neutralSummary: "Generic AI tools are broader. Zaza Draft is more focused.",
    focusLine:
      "Generic AI tools usually aim to cover everything. Zaza Draft stays close to parent communication, report comments, behaviour notes, and school writing.",
    privacyLine:
      "Broader AI tools often leave more of the safety process to the user. Zaza Draft frames the workflow around teacher review and lower-risk drafting.",
    toneLine:
      "Generic AI can sound polished without sounding school-appropriate. Zaza Draft tries to reduce that mismatch.",
    hallucinationLine:
      "General tools usually need more careful checking for tone, invented detail, and professional fit.",
    bestFitLine:
      "Generic AI may fit broad experimentation. Zaza Draft fits teachers who want a calmer specialist.",
    fairPositioning:
      "If you want a broad AI workspace, generic tools may fit. If you want a dedicated writing co-pilot, Zaza Draft is more focused.",
  },
};

const useCaseDefinitions: Record<UseCase, UseCaseDefinition> = {
  "parent-emails": {
    label: "parent emails",
    keyword: "alternative to {competitor} for parent emails",
    pain: "Parent emails are one of the easiest places for tone mistakes to create more work. Teachers usually know the facts. The stress is finding wording that sounds calm, professional, and school-appropriate before the thread grows.",
    toneNeed:
      "For parent emails, teachers usually need more than speed. They need safer wording, emotional control, and language they can stand behind later.",
    relatedLinks: [
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "How to reply to an angry parent email",
        description:
          "A calmer framework for tense replies where tone matters immediately.",
      },
      {
        href: "/teacher-parent-communication-hub",
        label: "Teacher parent communication hub",
        description:
          "Browse parent communication pages for difficult messages, follow-up, and school-home tone.",
      },
      {
        href: "/best-ai-tool-parent-emails",
        label: "Best AI tool for parent emails",
        description:
          "A broader buying-intent page focused on teacher email support.",
      },
    ],
  },
  "report-comments": {
    label: "report comments",
    keyword: "alternative to {competitor} for report comments",
    pain: "Report comments are repetitive, emotionally tiring, and easy to over-polish into language that no longer sounds like a teacher. Exhausted teachers need help that is fast, but still accurate and grounded.",
    toneNeed:
      "For report comments, the real value is careful wording that stays honest, kind, and easy to approve quickly.",
    relatedLinks: [
      {
        href: "/report-comment-builder",
        label: "Report comment builder",
        description:
          "Browse more student-profile and subject-specific report comment pages.",
      },
      {
        href: "/positive-but-honest-report-card-comments-for-struggling-students",
        label: "Positive but honest report comments",
        description:
          "Useful if you want a practical example-led route into calmer report wording.",
      },
      {
        href: "/gdpr-compliant-ai-report-writer-uk-teachers",
        label: "GDPR compliant AI report writer",
        description:
          "A trust-first page for teachers comparing report-writing tools.",
      },
    ],
  },
  "behaviour-notes": {
    label: "behaviour notes",
    keyword: "alternative to {competitor} for behaviour notes",
    pain: "Behaviour notes need to be factual, proportionate, and professional. The risk is sounding more frustrated than intended or recording too little to be useful later.",
    toneNeed:
      "For behaviour notes, teachers usually want cleaner wording and a calmer record, not broad creative drafting.",
    relatedLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents",
        label: "How to write a behaviour email to parents",
        description:
          "Useful when the note also needs to become parent communication.",
      },
      {
        href: "/how-to-document-parent-contact-for-slt-without-stress",
        label: "How to document parent contact for SLT",
        description:
          "A calmer route for record-safe writing when behaviour is escalating.",
      },
      {
        href: "/scenario/behaviour-issue/year-5-primary",
        label: "Behaviour issue scenario",
        description:
          "See a concrete example where behaviour wording needs to stay measured.",
      },
    ],
  },
  "de-escalation": {
    label: "de-escalation",
    keyword: "alternative to {competitor} for de-escalation",
    pain: "De-escalation is where generic writing help often falls short. Teachers do not need louder wording or faster wording. They need calmer wording that lowers the temperature without sounding weak or evasive.",
    toneNeed:
      "For de-escalation, the best tool is usually the one that helps you sound measured, respectful, and still professionally firm.",
    relatedLinks: [
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "Angry parent reply guide",
        description:
          "A direct guide for calming difficult parent threads without escalating them further.",
      },
      {
        href: "/reduce-stress-parent-messages",
        label: "Reduce stress from parent messages",
        description:
          "A pain-first page for the emotional weight behind difficult school communication.",
      },
      {
        href: "/diagnosis",
        label: "Parent communication diagnosis",
        description:
          "Use the diagnosis tool if the wording pressure overlaps several issues at once.",
      },
    ],
  },
  "parents-evening": {
    label: "parents' evening",
    keyword: "alternative to {competitor} for parents evening communication",
    pain: "Parents' evening messages often need to summarise a difficult conversation without reopening it. The safest wording is short, warm, and precise enough to stand up later.",
    toneNeed:
      "For parents' evening communication, teachers usually need a calmer boutique fit rather than a broad AI tool.",
    relatedLinks: [
      {
        href: "/parents-evening-email-templates-uk",
        label: "Parents' evening email templates UK",
        description:
          "A practical page for reminders and follow-up wording around parents' evening.",
      },
      {
        href: "/uk-school-communication",
        label: "UK school communication templates",
        description:
          "Browse UK-specific pages for parent communication and professional tone.",
      },
      {
        href: "/ofsted-friendly-parent-email-examples",
        label: "Ofsted-friendly parent email examples",
        description:
          "Useful when the wording needs to feel calm, clear, and record-safe.",
      },
    ],
  },
  "sen-support": {
    label: "SEN support",
    keyword: "alternative to {competitor} for SEN support communication",
    pain: "SEN support communication needs extra care. Families are often already carrying stress, and teachers need wording that is specific, warm, and professionally grounded.",
    toneNeed:
      "For SEN-sensitive communication, the safest help is wording support that stays careful, emotionally intelligent, and easy to review.",
    relatedLinks: [
      {
        href: "/positive-honest-report-comments-sen-students",
        label: "Positive honest report comments for SEN students",
        description:
          "A report-writing route when SEND-sensitive wording overlaps with reports.",
      },
      {
        href: "/scenario/sen-child/not-engaging",
        label: "SEN communication scenario",
        description:
          "A scenario-led page for careful parent communication around SEN context.",
      },
      {
        href: "/diagnosis",
        label: "Parent communication and report diagnosis",
        description:
          "Use the diagnosis tool if SEN wording overlaps with behaviour, anxiety, or report-writing pressure.",
      },
    ],
  },
};

function titleCase(value: string) {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatUseCaseLabel(useCase: UseCase) {
  return useCaseDefinitions[useCase].label;
}

function buildKeyword(competitor: Competitor, useCase: UseCase) {
  return useCaseDefinitions[useCase].keyword.replace(
    "{competitor}",
    competitorDefinitions[competitor].label,
  );
}

function buildPath(competitor: Competitor, useCase: UseCase) {
  return `/alternatives/${competitor}/${useCase}`;
}

function buildFaq(competitor: Competitor, useCase: UseCase): FaqItem[] {
  const competitorData = competitorDefinitions[competitor];
  const useCaseData = useCaseDefinitions[useCase];

  return [
    {
      question: `Is Zaza Draft a better fit than ${competitorData.label} for ${useCaseData.label}?`,
      answer: `If your main concern is calmer wording, professional tone, and teacher control, Zaza Draft is usually the more focused fit. ${competitorData.label} may still fit better if you want a broader tool or a more general AI workspace.`,
    },
    {
      question: `How is this comparison being made?`,
      answer:
        "This page compares product focus, tone fit, teacher review burden, and practical use for sensitive school writing. It does not claim that one tool is universally better for every task.",
    },
    {
      question: "Does Zaza Draft replace teacher judgement?",
      answer:
        "No. Zaza Draft is a co-writer, not a replacement. Teachers edit and approve every final word before anything is used.",
    },
    {
      question: "What matters most for tone-sensitive school writing?",
      answer:
        "Usually three things: calm wording, low-risk phrasing, and a workflow that still keeps the teacher in control. That matters for parent communication, report comments, SEN support, and difficult follow-up.",
    },
    {
      question: "Do I still need to review AI output carefully?",
      answer:
        "Yes. Any AI draft still needs human review for accuracy, context, and school appropriateness. The main difference is how much prompting and editing that review tends to require.",
    },
    {
      question: `Who should choose ${competitorData.label} instead?`,
      answer: competitorData.bestFitLine,
    },
  ];
}

export function getComparisonParams() {
  return competitors.flatMap((competitor) =>
    usecases.map((usecase) => ({ competitor, usecase })),
  );
}

export function isValidComparisonParams(
  competitor: string,
  useCase: string,
): competitor is Competitor {
  return (
    competitors.includes(competitor as Competitor) &&
    usecases.includes(useCase as UseCase)
  );
}

export function buildComparisonPageData(
  competitor: Competitor,
  useCase: UseCase,
): ComparisonPageData | null {
  if (!isValidComparisonParams(competitor, useCase)) {
    return null;
  }

  const competitorData = competitorDefinitions[competitor];
  const useCaseData = useCaseDefinitions[useCase];
  const keyword = buildKeyword(competitor, useCase);
  const path = buildPath(competitor, useCase);
  const title = `Alternative to ${competitorData.label} for ${titleCase(useCaseData.label)} | Zaza Draft`;
  const h1 = `Alternative to ${competitorData.label} for ${useCaseData.label}`;

  return {
    path,
    title,
    h1,
    metaDescription: `${keyword} with a fair, factual comparison for teachers. See how Zaza Draft compares on tone safety, focus, privacy, and teacher review for ${useCaseData.label}.`,
    keyword,
    eyebrow: "Alternative/comparison intent",
    hero: [
      `${keyword} is usually not just a feature comparison. It is a stress comparison. Teachers looking at ${competitorData.label} for ${useCaseData.label} are often trying to reduce workload without creating tone mistakes, awkward phrasing, or more editing than they can manage at the end of the day.`,
      `${competitorData.neutralSummary} For ${useCaseData.label}, that difference matters because ${useCaseData.toneNeed.toLowerCase()}. Zaza Draft is built as a calm teacher-first co-writer, not a broad all-purpose AI tool.`,
    ],
    quickAnswer: `${competitorData.label} can still be a reasonable option, especially if you want ${competitorData.categoryLine}. Zaza Draft is the stronger fit when the real problem is tone-sensitive ${useCaseData.label}, emotionally difficult school writing, and the need for calmer wording that teachers can approve quickly.`,
    introTitle: `Alternative to ${competitorData.label} for ${useCaseData.label}: what teachers usually need`,
    intro: [
      useCaseData.pain,
      `${competitorData.label} is ${competitorData.categoryLine}. ${competitorData.focusLine} That does not make one approach universally right or wrong. It means the best fit depends on whether you want breadth or a narrower writing specialist.`,
    ],
    comparisonTitle: `Alternative to ${competitorData.label} for ${useCaseData.label}: fair comparison`,
    comparisonIntro: `${competitorData.fairPositioning} The table below focuses on the areas teachers usually care about most when the writing is sensitive: privacy awareness, workflow focus, tone safety, and how much review still tends to be needed.`,
    whyTitle: `Why Zaza Draft is often the better fit for tone-sensitive tasks`,
    whyParagraphs: [
      `Zaza Draft is usually stronger for tone-sensitive school writing because it stays close to the tasks teachers actually feel nervous about sending: parent emails, report comments, behaviour notes, parents' evening follow-up, and SEN-sensitive communication. That narrower focus helps reduce clutter and makes the drafting job feel more psychologically safe.`,
      `The other difference is editorial posture. Zaza Draft is positioned as a co-writer, not a replacement. That means the workflow keeps the teacher in control, expects review, and treats professional judgement as part of the product rather than an afterthought. For ${useCaseData.label}, that is often more useful than a tool that can do many things broadly but needs heavier prompting or heavier checking.`,
    ],
    tableTitle: `${competitorData.label} vs Zaza Draft for ${useCaseData.label}`,
    tableRows: [
      {
        label: "Workflow focus",
        zaza: "Dedicated teacher writing co-writer for parent communication, report comments, and school messages.",
        competitor: competitorData.focusLine,
      },
      {
        label: "Privacy and data awareness",
        zaza: "Teacher-first framing around school-safe writing and careful review before use.",
        competitor: competitorData.privacyLine,
      },
      {
        label: "Tone safety",
        zaza: "Built to help teachers sound calm, professional, and appropriate in sensitive situations.",
        competitor: competitorData.toneLine,
      },
      {
        label: "Hallucination risk and review burden",
        zaza: "Teacher review still required, but the narrower use case reduces prompt and edit friction.",
        competitor: competitorData.hallucinationLine,
      },
      {
        label: "Best fit",
        zaza: "Teachers who want a calmer, more focused product for tone-sensitive writing tasks.",
        competitor: competitorData.bestFitLine,
      },
    ],
    faq: buildFaq(competitor, useCase),
    relatedLinks: [
      ...useCaseData.relatedLinks,
      {
        href: "/products/draft",
        label: "Explore Zaza Draft",
        description:
          "See how the teacher-first writing co-writer works in practice.",
      },
    ],
    ctaTitle: "Try Zaza Draft if you want a calmer writing co-pilot",
    ctaBody:
      "If you want a more focused product for tone-sensitive teacher writing, Zaza Draft is built to help with parent communication, report comments, and professional school messages while keeping you in full control.",
    breadcrumbs: {
      "/alternatives": "Alternatives",
      [`/alternatives/${competitor}`]: competitorData.label,
      [path]: formatUseCaseLabel(useCase),
    },
    lastReviewed: CONTENT_FRESHNESS.comparisonPages.isoDate,
  };
}

export function getComparisonSitemapEntries(
  fallbackLastModified = new Date(),
): MetadataRoute.Sitemap {
  return getComparisonParams().flatMap(({ competitor, usecase }) => {
    const page = buildComparisonPageData(competitor, usecase);

    if (!page) {
      return [];
    }

    return [
      {
        url: `https://zazadraft.com${page.path}`,
        lastModified: page.lastReviewed
          ? parseFreshnessDate(page.lastReviewed)
          : fallbackLastModified,
        changeFrequency: "weekly" as const,
        priority: 0.79,
      },
    ];
  });
}

export const first20ComparisonPages = getComparisonParams()
  .slice(0, 20)
  .flatMap(({ competitor, usecase }) => {
    const page = buildComparisonPageData(competitor, usecase);

    return page
      ? [
          {
            slug: page.path.replace(/^\//, ""),
            title: page.title,
          },
        ]
      : [];
  });
