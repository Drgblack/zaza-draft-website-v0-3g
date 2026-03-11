import type { Metadata, MetadataRoute } from "next";
import { defaultMetadata } from "@/lib/metadata";
import {
  first100KeywordTemplates,
  futureCategoryPages,
  getContentMatrix as getBaseContentMatrix,
  getProgrammaticSeedPaths as getLegacySeedPaths,
  getProgrammaticSitemapEntries as getLegacyProgrammaticSitemapEntries,
  implementationRoadmap,
  programmaticSingleSlugPages,
  programmaticSingleSlugSlugs,
  PROGRAMMATIC_REVALIDATE_TAG,
  qualityGuardrails,
  slugToProps as legacySlugToProps,
  type KeywordTemplate,
  type ProgrammaticPageData,
} from "@/lib/programmatic-seo";

export type { KeywordTemplate, ProgrammaticPageData };

export const PROGRAMMATIC_REVALIDATE_SECONDS = 604800;

const PROBLEMS_HUB = "parent-communication-problems";
const REPLY_HUB = "reply-scenarios";
const REPORT_HUB = "report-comment-builder";
const UK_HUB = "uk-school-communication";
const COMBINATIONS_HUB = "scenario-combinations";
const ALTERNATIVES_HUB = "alternatives";

type ScenarioTypeRecord = {
  slug: string;
  label: string;
};

type ScenarioContextRecord = {
  slug: string;
  label: string;
};

type ReplyTriggerRecord = {
  slug: string;
  label: string;
};

type StudentTypeRecord = {
  slug: string;
  label: string;
};

type SubjectRecord = {
  slug: string;
  label: string;
};

type YearGroupRecord = {
  slug: string;
  label: string;
};

type CompetitorRecord = {
  slug: string;
  label: string;
};

type AlternativeUseCaseRecord = {
  slug: string;
  label: string;
};

type StandalonePageRecord = {
  slug: string;
  keyword: string;
  intent: string;
};

type ContentMatrixShape = ReturnType<typeof getBaseContentMatrix>;

type ProblemSeed = {
  phase: string;
  issue: string;
};

type ReplySeed = {
  trigger: string;
  context: string;
};

type ReplyAlias = {
  baseSlug: string;
  keyword: string;
  title: string;
  h1: string;
  metaDescription: string;
};

const problemIssueToScenarioType: Record<string, string> = {
  "behaviour-email": "behaviour-issue",
  "angry-parent-email": "angry-parent",
  "sen-parent-email": "sen-child",
  "struggling-reader-email": "struggling-reader",
  "missing-homework-email": "missing-homework",
  "attendance-concern-email": "attendance",
  "confidence-drop-email": "confidence-drop",
  "friendship-issue-email": "friendship-fallout",
  "low-level-disruption-email": "low-level-disruption",
  "parents-evening-follow-up": "parents-evening-follow-up",
  "return-from-absence-email": "return-from-absence",
  "revision-stress-email": "revision-stress",
};

export const problemSeedParams: ProblemSeed[] = [
  { phase: "year-3-primary", issue: "behaviour-email" },
  { phase: "year-5-primary", issue: "behaviour-email" },
  { phase: "year-5-primary", issue: "angry-parent-email" },
  { phase: "ks2", issue: "sen-parent-email" },
  { phase: "ks2", issue: "struggling-reader-email" },
  { phase: "year-1-primary", issue: "missing-homework-email" },
  { phase: "year-7-secondary", issue: "attendance-concern-email" },
  { phase: "ks4-exam-season", issue: "angry-parent-email" },
];

const replyAliasMap: Record<string, ReplyAlias> = {
  "parents-ignore/behaviour-email": {
    baseSlug: "parents-dont-respond-to-behaviour-email",
    keyword: "how to reply when parents ignore behaviour email",
    title: "How to Reply When Parents Ignore a Behaviour Email | Zaza Draft",
    h1: "How to reply when parents ignore a behaviour email",
    metaDescription:
      "How to reply when parents ignore a behaviour email. Calm, professional wording for teachers with follow-up examples, FAQ, and a teacher-first path into Zaza Draft.",
  },
  "document-parent-contact/slt-escalating-behaviour": {
    baseSlug: "parent-disagrees-with-behaviour-sanction",
    keyword: "how to document parent contact for slt escalating behaviour",
    title:
      "How to Document Parent Contact for SLT When Behaviour Is Escalating | Zaza Draft",
    h1: "How to document parent contact for SLT when behaviour is escalating",
    metaDescription:
      "How to document parent contact for SLT when behaviour is escalating, with calm example wording, record-safe steps, and a teacher-edited path into Zaza Draft.",
  },
  "parent-complaint/homework-not-done": {
    baseSlug: "parent-complaint-about-homework-not-done",
    keyword: "how to respond to parent complaint about homework not done",
    title:
      "How to Respond to a Parent Complaint About Homework Not Done | Zaza Draft",
    h1: "How to respond to a parent complaint about homework not done",
    metaDescription:
      "How to respond to a parent complaint about homework not done. Use calm, school-ready wording with examples, FAQ, and a safe Zaza Draft workflow.",
  },
  "email-home/missing-homework-ks1": {
    baseSlug: "parents-dont-respond-to-behaviour-email",
    keyword: "how to write email home about missing homework ks1",
    title:
      "How to Write an Email Home About Missing Homework in KS1 | Zaza Draft",
    h1: "How to write an email home about missing homework in KS1",
    metaDescription:
      "How to write an email home about missing homework in KS1 with calm, practical wording for teachers, examples, FAQ, and a teacher-first Zaza Draft CTA.",
  },
  "angry-parent/year-6-sat-prep": {
    baseSlug: "angry-parent-of-year-6-pupil",
    keyword: "how to respond to angry parent email year 6 sat prep",
    title:
      "How to Respond to an Angry Parent Email During Year 6 SATs Prep | Zaza Draft",
    h1: "How to respond to an angry parent email during Year 6 SATs prep",
    metaDescription:
      "How to respond to an angry parent email during Year 6 SATs prep. Use calmer, professional wording with examples and a teacher-controlled Zaza Draft workflow.",
  },
  "report-comment/blunt-wording": {
    baseSlug: "parent-asks-why-report-comment-is-blunt",
    keyword: "how to reply when parent says report comment is too blunt",
    title:
      "How to Reply When a Parent Says a Report Comment Sounds Too Blunt | Zaza Draft",
    h1: "How to reply when a parent says a report comment sounds too blunt",
    metaDescription:
      "How to reply when a parent says a report comment sounds too blunt. Get calm explanation wording, teacher-safe examples, FAQ, and a Zaza Draft CTA.",
  },
  "parents-ignore/parents-evening-reminder": {
    baseSlug: "parents-ignore-parents-evening-reminder",
    keyword: "how to reply when parents ignore parents evening reminder",
    title:
      "How to Reply When Parents Ignore a Parents' Evening Reminder | Zaza Draft",
    h1: "How to reply when parents ignore a parents' evening reminder",
    metaDescription:
      "How to reply when parents ignore a parents' evening reminder. Calm, practical follow-up wording for teachers with examples, FAQ, and a Zaza Draft CTA.",
  },
  "parent-challenge/attendance-concern": {
    baseSlug: "parent-challenges-attendance-concern",
    keyword: "how to reply when parent challenges attendance concern",
    title:
      "How to Reply When a Parent Challenges an Attendance Concern | Zaza Draft",
    h1: "How to reply when a parent challenges an attendance concern",
    metaDescription:
      "How to reply when a parent challenges an attendance concern. Includes calm examples, teacher-safe guidance, FAQ, and a path into Zaza Draft.",
  },
};

export const replySeedParams: ReplySeed[] = Object.keys(replyAliasMap).map(
  (key) => {
    const [trigger, context] = key.split("/");

    return { trigger, context };
  },
);

function normaliseSegments(input: string | string[]) {
  const parts = Array.isArray(input) ? input : input.split("/");

  return parts
    .map((part) => part.trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean);
}

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatSlugLabel(value: string) {
  return titleCase(value.replace(/[-_]+/g, " "));
}

function replaceFirst<T>(items: T[], nextItem: T) {
  return items.length ? [nextItem, ...items.slice(1)] : [nextItem];
}

function clonePage(
  page: ProgrammaticPageData,
  overrides: Partial<ProgrammaticPageData>,
): ProgrammaticPageData {
  return {
    ...page,
    ...overrides,
    breadcrumbOverrides: {
      ...(page.breadcrumbOverrides ?? {}),
      ...(overrides.breadcrumbOverrides ?? {}),
    },
    estimatedWordCount: Math.max(
      overrides.estimatedWordCount ?? page.estimatedWordCount,
      1050,
    ),
  };
}

function getMatrix() {
  return getBaseContentMatrix() as ContentMatrixShape & {
    scenarioTypes: ScenarioTypeRecord[];
    scenarioContexts: ScenarioContextRecord[];
    replyTriggers: ReplyTriggerRecord[];
    studentTypes: StudentTypeRecord[];
    subjects: SubjectRecord[];
    yearGroups: YearGroupRecord[];
    competitors: CompetitorRecord[];
    alternativeUseCases: AlternativeUseCaseRecord[];
    standalonePages: StandalonePageRecord[];
  };
}

function buildHubAlias(slug: string) {
  switch (slug) {
    case PROBLEMS_HUB: {
      const page = legacySlugToProps("parent-email-scenarios");

      if (!page) return null;

      return clonePage(page, {
        path: `/${PROBLEMS_HUB}`,
        title: "Parent Communication Problems for Teachers | Zaza Draft",
        metaDescription:
          "Parent communication problems for teachers, with calm wording, real examples, FAQ, and a teacher-first path into Zaza Draft.",
        h1: "Parent communication problems for teachers",
        keyword: "parent communication problems for teachers",
        heroEyebrow: "Problem + phase pages",
        breadcrumbOverrides: {
          [`/${PROBLEMS_HUB}`]: "Parent communication problems",
        },
      });
    }
    case REPLY_HUB: {
      const page = legacySlugToProps("how-to-reply");

      if (!page) return null;

      return clonePage(page, {
        path: `/${REPLY_HUB}`,
        title: "Reply Scenarios for Teachers | Zaza Draft",
        metaDescription:
          "Reply scenarios for teachers facing difficult parent messages, documentation pressure, or behaviour follow-up, with calm examples and a teacher-first CTA.",
        h1: "Reply scenarios for teachers",
        keyword: "reply scenarios for teachers",
        heroEyebrow: "How to reply and document",
        breadcrumbOverrides: {
          [`/${REPLY_HUB}`]: "Reply scenarios",
        },
      });
    }
    case REPORT_HUB: {
      const page = legacySlugToProps("report-comments");

      if (!page) return null;

      return clonePage(page, {
        path: `/${REPORT_HUB}`,
        title: "Report Comment Builder for Teachers | Zaza Draft",
        metaDescription:
          "Report comment builder pages for teachers, covering student context, subject, and need combinations with calm examples and a safe Zaza Draft CTA.",
        h1: "Report comment builder for teachers",
        keyword: "report comment builder for teachers",
        heroEyebrow: "Student context combinations",
        breadcrumbOverrides: {
          [`/${REPORT_HUB}`]: "Report comment builder",
        },
      });
    }
    case UK_HUB: {
      const page = legacySlugToProps("scenario-builder");

      if (!page) return null;

      return clonePage(page, {
        path: `/${UK_HUB}`,
        title: "UK School Communication Templates and Examples | Zaza Draft",
        metaDescription:
          "UK school communication templates and examples for teachers, including parents' evening, Ofsted-friendly wording, behaviour letters, and safer school-home communication.",
        h1: "UK school communication templates and examples",
        keyword: "uk school communication templates",
        heroEyebrow: "UK-specific communication pages",
        internalLinks: [
          {
            href: "/parent-email-template-primary-school",
            label: "Parent email template for primary school UK",
            description:
              "A practical starting point for everyday school-home messages in primary settings.",
          },
          {
            href: "/ofsted-friendly-parent-communication-ks1",
            label: "Ofsted-friendly parent communication KS1",
            description:
              "Calmer, professional wording for KS1 parent communication where records and tone matter.",
          },
          {
            href: "/parents-evening-email-template-primary-uk",
            label: "Parents' evening email template primary UK",
            description:
              "Use this for reminders, follow-up notes, or parents' evening admin that still needs warmth.",
          },
          {
            href: "/behaviour-letter-home-primary-school-ai-help",
            label: "Behaviour letter home for primary school",
            description:
              "Useful when you need clearer behaviour wording that still keeps the relationship workable.",
          },
          {
            href: "/products/draft",
            label: "See how Zaza Draft works",
            description:
              "Move from a template into a teacher-edited draft without losing control.",
          },
          {
            href: `/${REPORT_HUB}`,
            label: "Report comment builder",
            description:
              "Useful if the next problem is report comments rather than parent communication.",
          },
        ],
        breadcrumbOverrides: {
          [`/${UK_HUB}`]: "UK school communication",
        },
      });
    }
    case COMBINATIONS_HUB: {
      const page = legacySlugToProps("scenario-builder");

      if (!page) return null;

      return clonePage(page, {
        path: `/${COMBINATIONS_HUB}`,
        title: "Scenario Combinations for Teachers | Zaza Draft",
        metaDescription:
          "Scenario combination pages for teachers handling very specific parent emails, report comments, and documentation tasks with calm, professional wording.",
        h1: "Scenario combinations for teachers",
        keyword: "scenario combinations for teachers",
        heroEyebrow: "Combination pages",
        breadcrumbOverrides: {
          [`/${COMBINATIONS_HUB}`]: "Scenario combinations",
        },
      });
    }
    default:
      return null;
  }
}

function buildProblemRoute(phase: string, issue: string) {
  const scenarioType = problemIssueToScenarioType[issue];

  if (!scenarioType) {
    return null;
  }

  const page = legacySlugToProps(["scenario", scenarioType, phase]);

  if (!page) {
    return null;
  }

  return clonePage(page, {
    path: `/problems/${phase}/${issue}`,
    title: `${formatSlugLabel(issue)} for ${formatSlugLabel(phase)} | Zaza Draft`,
    metaDescription: `Use calm, professional teacher wording for ${formatSlugLabel(issue).toLowerCase()} in ${formatSlugLabel(phase)}. Includes examples, FAQ, and a teacher-first path into Zaza Draft.`,
    h1: `${formatSlugLabel(issue)} for ${formatSlugLabel(phase)}`,
    keyword: `${formatSlugLabel(issue).toLowerCase()} ${formatSlugLabel(phase).toLowerCase()}`,
    heroEyebrow: "Problem page",
    breadcrumbOverrides: {
      "/problems": "Problems",
      [`/problems/${phase}/${issue}`]: `${formatSlugLabel(issue)} for ${formatSlugLabel(phase)}`,
    },
    internalLinks: replaceFirst(page.internalLinks, {
      href: `/${PROBLEMS_HUB}`,
      label: "Parent communication problems",
      description:
        "Return to the main problem hub for more phase and issue combinations.",
    }),
  });
}

function buildReplyRoute(trigger: string, context: string) {
  const alias = replyAliasMap[`${trigger}/${context}`];

  if (!alias) {
    return null;
  }

  const page = legacySlugToProps(["how-to-reply", alias.baseSlug]);

  if (!page) {
    return null;
  }

  return clonePage(page, {
    path: `/reply/${trigger}/${context}`,
    title: alias.title,
    metaDescription: alias.metaDescription,
    h1: alias.h1,
    keyword: alias.keyword,
    heroEyebrow: "Reply scenario page",
    breadcrumbOverrides: {
      "/reply": "Reply",
      [`/reply/${trigger}/${context}`]: alias.h1,
    },
    internalLinks: replaceFirst(page.internalLinks, {
      href: `/${REPLY_HUB}`,
      label: "Reply scenarios",
      description:
        "Return to the reply-scenarios hub for similar parent-email and documentation pages.",
    }),
  });
}

function buildReportHubAlias() {
  return buildHubAlias(REPORT_HUB);
}

function buildAlternativeAlias(tool: string, usecase: string) {
  return legacySlugToProps(["alternatives", tool, usecase]);
}

function buildReportAlias(studentType: string, subject: string, group: string) {
  return legacySlugToProps(["report-comments", studentType, subject, group]);
}

export function slugToProps(input: string | string[]) {
  const segments = normaliseSegments(input);

  if (!segments.length) {
    return null;
  }

  const hubAlias = buildHubAlias(segments[0]);

  if (segments.length === 1 && hubAlias) {
    return hubAlias;
  }

  if (segments.length === 1) {
    return legacySlugToProps(segments[0]);
  }

  if (segments[0] === "problems" && segments.length === 3) {
    return buildProblemRoute(segments[1], segments[2]);
  }

  if (segments[0] === "reply" && segments.length === 3) {
    return buildReplyRoute(segments[1], segments[2]);
  }

  if (segments[0] === "report-comments" && segments.length === 4) {
    return buildReportAlias(segments[1], segments[2], segments[3]);
  }

  if (segments[0] === "alternatives" && segments.length === 3) {
    return buildAlternativeAlias(segments[1], segments[2]);
  }

  if (
    segments.length === 2 &&
    futureCategoryPages.some(
      (page) =>
        page.category === segments[0] &&
        page.slugParts.join("/") === segments[1],
    )
  ) {
    return legacySlugToProps(segments);
  }

  return legacySlugToProps(segments);
}

export function generateMetadata(input: string | string[]): Metadata {
  const page = slugToProps(input);

  if (!page) {
    return defaultMetadata({
      title: "Page not found | Zaza Draft",
      description:
        "The requested Zaza Draft programmatic page could not be found.",
    });
  }

  return defaultMetadata({
    title: page.title,
    description: page.metaDescription,
    path: page.path,
    type: "article",
    keywords: [
      page.keyword,
      "teacher writing support",
      "parent communication",
      "report comments",
      "professional school communication",
      "teacher-first AI",
      "UK teachers",
      "parents' evening",
      "behaviour",
      "SEN",
      "GDPR",
    ],
  });
}

function bySlug<T extends { slug: string }>(items: T[], slugs: string[]) {
  const order = new Map(slugs.map((slug, index) => [slug, index]));

  return items
    .filter((item) => order.has(item.slug))
    .sort(
      (left, right) =>
        (order.get(left.slug) ?? 0) - (order.get(right.slug) ?? 0),
    );
}

function createKeywordTemplate(
  keyword: string,
  path: string,
  intent: KeywordTemplate["intent"],
  priority: number,
  notes: string,
): KeywordTemplate {
  return { keyword, path, intent, priority, notes };
}

function dedupeKeywordTemplates(templates: KeywordTemplate[]) {
  return Array.from(
    new Map(templates.map((template) => [template.path, template])).values(),
  );
}

function buildFirst150Keywords() {
  const matrix = getMatrix();
  const preferredProblemPhases = [
    "year-3-primary",
    "year-5-primary",
    "ks2",
    "year-7-secondary",
    "ks4-exam-season",
  ];
  const preferredProblemIssues = [
    "behaviour-email",
    "angry-parent-email",
    "sen-parent-email",
    "struggling-reader-email",
    "missing-homework-email",
    "attendance-concern-email",
    "confidence-drop-email",
    "parents-evening-follow-up",
  ];
  const preferredReplyKeys = [
    "parents-ignore/behaviour-email",
    "document-parent-contact/slt-escalating-behaviour",
    "parent-complaint/homework-not-done",
    "email-home/missing-homework-ks1",
    "angry-parent/year-6-sat-prep",
    "report-comment/blunt-wording",
    "parents-ignore/parents-evening-reminder",
    "parent-challenge/attendance-concern",
  ];
  const preferredStudentTypes = [
    "sen-support-needs",
    "struggling-student-behaviour",
    "anxious-eal-pupil",
    "high-attaining-but-disorganised",
    "low-attainment-low-confidence",
    "bright-but-inconsistent",
  ];
  const preferredSubjects = ["english", "maths", "science", "reading"];
  const preferredYearGroups = ["year-6", "year-5"];
  const preferredCompetitors = [
    "magicschool-ai",
    "teachmate",
    "chatgpt",
    "generic-ai",
  ];
  const preferredUseCases = [
    "parent-emails",
    "report-comments",
    "professional-teacher-tone",
    "angry-parent-replies",
  ];

  const problemKeywords = preferredProblemPhases.flatMap((phase) =>
    preferredProblemIssues.map((issue) =>
      createKeywordTemplate(
        `${formatSlugLabel(issue).toLowerCase()} ${formatSlugLabel(phase).toLowerCase()}`,
        `/problems/${phase}/${issue}`,
        "How-to/problem intent",
        0,
        "Problem page mapped to a school phase or year group and a concrete teacher communication issue.",
      ),
    ),
  );

  const replyKeywords = preferredReplyKeys.map((key) => {
    const [trigger, context] = key.split("/");
    const alias = replyAliasMap[key];

    return createKeywordTemplate(
      alias.keyword,
      `/reply/${trigger}/${context}`,
      "How-to/problem intent",
      0,
      "Reply page for a live parent, homework, behaviour, or documentation situation where tone is the workload.",
    );
  });

  const reportKeywords = bySlug(
    matrix.studentTypes,
    preferredStudentTypes,
  ).flatMap((studentType) =>
    bySlug(matrix.subjects, preferredSubjects).flatMap((subject) =>
      bySlug(matrix.yearGroups, preferredYearGroups).map((yearGroup) =>
        createKeywordTemplate(
          `report comments for ${studentType.label} in ${subject.label} ${yearGroup.label}`,
          `/report-comments/${studentType.slug}/${subject.slug}/${yearGroup.slug}`,
          "Template intent",
          0,
          "Student-context report-comment page with subject and year-group specificity.",
        ),
      ),
    ),
  );

  const comparisonKeywords = bySlug(
    matrix.competitors,
    preferredCompetitors,
  ).flatMap((tool) =>
    bySlug(matrix.alternativeUseCases, preferredUseCases).map((useCase) =>
      createKeywordTemplate(
        `zaza draft vs ${tool.label} for ${useCase.label}`,
        `/alternatives/${tool.slug}/${useCase.slug}`,
        "Alternative/comparison intent",
        0,
        "Fair comparison page focused on tone, fit, and teacher control.",
      ),
    ),
  );

  const singleKeywords = [
    createKeywordTemplate(
      "parent email template primary school uk",
      "/parent-email-template-primary-school",
      "Template intent",
      0,
      "UK-specific template page for primary parent communication.",
    ),
    createKeywordTemplate(
      "ofsted friendly report comments secondary",
      "/report-writing-help-secondary-school-ks4",
      "Tool intent",
      0,
      "Secondary report-writing page with Ofsted-aware, teacher-safe positioning.",
    ),
    createKeywordTemplate(
      "parents evening email script fe school",
      "/parents-evening-email-template-primary-uk",
      "Template intent",
      0,
      "Parents' evening wording page for practical school-home communication.",
    ),
    createKeywordTemplate(
      "behaviour letter home primary ofsted compliant",
      "/how-to-write-behaviour-email-for-large-class",
      "How-to/problem intent",
      0,
      "Behaviour-writing page adapted for high-pressure classroom context.",
    ),
    createKeywordTemplate(
      "what to say to parents of year 4 student struggling behaviour and attention",
      "/what-to-say-to-parents-of-year-3-student-struggling-in-reading",
      "How-to/problem intent",
      0,
      "Scenario combination page for emotionally difficult parent communication.",
    ),
    createKeywordTemplate(
      "positive honest report comment for sen pupil maths and social skills",
      "/positive-honest-report-comment-combinations-for-sen-pupils",
      "Template intent",
      0,
      "Combination page for nuanced report comments across academic and pastoral needs.",
    ),
    ...first100KeywordTemplates
      .slice(0, 32)
      .map((item) =>
        createKeywordTemplate(
          item.keyword,
          item.path,
          item.intent,
          0,
          item.notes,
        ),
      ),
  ];

  return dedupeKeywordTemplates([
    ...problemKeywords,
    ...replyKeywords,
    ...reportKeywords,
    ...comparisonKeywords,
    ...singleKeywords,
  ])
    .slice(0, 150)
    .map((item, index) => ({
      ...item,
      priority: 150 - index,
    }));
}

export const first150KeywordTemplates = buildFirst150Keywords();

export function getContentMatrix() {
  const matrix = getMatrix();

  return {
    ...matrix,
    routeFamilies: [
      {
        family: "Problem + phase variations",
        formula: "8 phases x 12 issues",
        pages: 96,
        pathPattern: "/problems/[phase]/[issue]",
      },
      {
        family: "Reply scenarios",
        formula: "8 triggers x 8 contexts",
        pages: 64,
        pathPattern: "/reply/[trigger]/[context]",
      },
      {
        family: "Student context report comments",
        formula: "12 student types x 9 subjects x 7 groups",
        pages: 756,
        pathPattern: "/report-comments/[student-type]/[subject]/[group]",
      },
      {
        family: "Comparison pages",
        formula: "4 tools x 4 use cases",
        pages: 16,
        pathPattern: "/alternatives/[tool]/[usecase]",
      },
      {
        family: "UK-specific templates and scenario combinations",
        formula: "12 standalone pages + expandable future categories",
        pages: 12,
        pathPattern: "/[slug] and /[slug]/[...segments]",
      },
    ],
    launchPotential: {
      month1Pages: 200,
      month3Pages: 800,
      month6Pages: 2000,
    },
  };
}

export function getProgrammaticSeedPaths() {
  return Array.from(
    new Set([
      `/${PROBLEMS_HUB}`,
      `/${REPLY_HUB}`,
      `/${REPORT_HUB}`,
      `/${UK_HUB}`,
      `/${COMBINATIONS_HUB}`,
      ...problemSeedParams.map(
        (item) => `/problems/${item.phase}/${item.issue}`,
      ),
      ...replySeedParams.map(
        (item) => `/reply/${item.trigger}/${item.context}`,
      ),
      ...getLegacySeedPaths(),
    ]),
  );
}

export function getProgrammaticSitemapEntries(lastModified = new Date()) {
  const entries = getLegacyProgrammaticSitemapEntries(lastModified);
  const push = (path: string, priority: number) => {
    entries.push({
      url: `https://zazadraft.com${path}`,
      lastModified,
      changeFrequency: "weekly",
      priority,
    });
  };

  [PROBLEMS_HUB, REPLY_HUB, REPORT_HUB, UK_HUB, COMBINATIONS_HUB].forEach(
    (slug) => push(`/${slug}`, 0.93),
  );
  problemSeedParams.forEach((item) =>
    push(`/problems/${item.phase}/${item.issue}`, 0.82),
  );
  replySeedParams.forEach((item) =>
    push(`/reply/${item.trigger}/${item.context}`, 0.84),
  );

  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  ) as MetadataRoute.Sitemap;
}

export {
  implementationRoadmap,
  programmaticSingleSlugPages,
  programmaticSingleSlugSlugs,
  PROGRAMMATIC_REVALIDATE_TAG,
  qualityGuardrails,
};
