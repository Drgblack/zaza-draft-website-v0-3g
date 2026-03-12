import type { Metadata, MetadataRoute } from "next";
import { defaultMetadata } from "@/lib/metadata";

export const PROGRAMMATIC_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;
export const PROGRAMMATIC_REVALIDATE_TAG = "programmatic-seo";

export type SearchIntent =
  | "Tool intent"
  | "Alternative/comparison intent"
  | "How-to/problem intent"
  | "Template intent";

export type ProgrammaticKind =
  | "hub"
  | "scenario"
  | "how-to-reply"
  | "report-comments"
  | "alternative"
  | "single-slug"
  | "future-category";

export type LinkCard = {
  href: string;
  label: string;
  description: string;
};

export type ExampleBlock = {
  title: string;
  intro: string;
  example: string;
  note: string;
};

export type ContentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type TrustItem = {
  title: string;
  body: string;
};

export type TestimonialPlaceholder = {
  role: string;
  quotePrompt: string;
};

export type HowToStep = {
  name: string;
  text: string;
};

export type ComparisonRow = {
  label: string;
  zaza: string;
  alternative: string;
};

export type ComparisonMatrix = {
  title: string;
  intro: string;
  alternativeLabel: string;
  rows: ComparisonRow[];
  note: string;
};

export type KeywordTemplate = {
  keyword: string;
  path: string;
  intent: SearchIntent;
  priority: number;
  notes: string;
};

export type QualityGuardrail = {
  name: string;
  description: string;
};

export type RoadmapPhase = {
  phase: string;
  targetPages: number;
  priority: string[];
  focus: string;
};

export type ContentMatrixRow = {
  family: string;
  formula: string;
  pages: number;
  notes: string;
};

export type ProgrammaticPageData = {
  kind: ProgrammaticKind;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  keyword: string;
  intent: SearchIntent;
  heroEyebrow: string;
  heroDescription: string[];
  heroBullets: string[];
  featuredSnippet: string;
  sections: ContentSection[];
  examples: ExampleBlock[];
  faq: FAQItem[];
  internalLinks: LinkCard[];
  trustItems: TrustItem[];
  testimonialPlaceholders: TestimonialPlaceholder[];
  cta: {
    title: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  howToSteps: HowToStep[];
  articleSummary: string;
  comparisonMatrix?: ComparisonMatrix;
  breadcrumbOverrides?: Record<string, string>;
  estimatedWordCount: number;
};

type HubDefinition = {
  slug: string;
  h1: string;
  keyword: string;
  intent: SearchIntent;
  heroEyebrow: string;
  intro: string[];
  cards: LinkCard[];
};

type ScenarioType = {
  slug: string;
  label: string;
  pain: string;
  angle: string;
};

type ScenarioContext = {
  slug: string;
  label: string;
  phase: string;
  yearGroup: string;
  detail: string;
};

type ReplyTrigger = {
  slug: string;
  label: string;
  context: string;
  nextStep: string;
};

type StudentType = {
  slug: string;
  label: string;
  challenge: string;
  supportAngle: string;
};

type Subject = {
  slug: string;
  label: string;
  signal: string;
};

type YearGroup = {
  slug: string;
  label: string;
  phase: string;
  signal: string;
};

type Competitor = {
  slug: string;
  label: string;
  neutralSummary: string;
};

type AlternativeUseCase = {
  slug: string;
  label: string;
  audiencePain: string;
  betterFit: string;
};

type SingleSlugDefinition = {
  slug: string;
  keyword: string;
  h1: string;
  title: string;
  metaDescription: string;
  intent: SearchIntent;
  theme: string;
  audiencePain: string;
  exampleType: "email" | "report" | "documentation";
};

type FutureCategoryPage = {
  category: string;
  slugParts: string[];
  keyword: string;
  h1: string;
  title: string;
  metaDescription: string;
  intent: SearchIntent;
  theme: string;
  audiencePain: string;
  exampleType: "email" | "report" | "documentation";
};

const SCENARIO_HUB = "parent-email-scenarios";
const HOW_TO_REPLY_HUB = "how-to-reply";
const REPORT_COMMENTS_HUB = "report-comments";
const ALTERNATIVES_HUB = "alternatives";
const SCENARIO_BUILDER_HUB = "scenario-builder";

export const programmaticHubSlugs = [
  SCENARIO_HUB,
  HOW_TO_REPLY_HUB,
  REPORT_COMMENTS_HUB,
  ALTERNATIVES_HUB,
  SCENARIO_BUILDER_HUB,
] as const;

export const qualityGuardrails: QualityGuardrail[] = [
  {
    name: "Word count floor",
    description:
      "Every generated page should clear 900 useful words. The current templates target roughly 1,050 to 1,350 words.",
  },
  {
    name: "No thin combinations",
    description:
      "Only combinations with a distinct wording problem should be published. Token-swapped filler should not enter the sitemap.",
  },
  {
    name: "Teacher empathy",
    description:
      "The first screen must sound like it understands exhausted teachers, not SaaS marketers.",
  },
  {
    name: "Teacher control",
    description:
      "Every page must reinforce that Zaza Draft is a co-writer. Teachers edit and approve every final word.",
  },
  {
    name: "Hallucination-safe claims",
    description:
      "Never imply invented student facts, automatic sending, or unsupported school claims.",
  },
  {
    name: "UK English and school context",
    description:
      "Use behaviour, parents' evening, SEN, safeguarding, Ofsted, and SLT only where they fit naturally.",
  },
  {
    name: "Fair comparisons",
    description:
      "Alternative pages must stay factual and fit-based. Zaza Draft is more focused, not universally superior.",
  },
  {
    name: "Internal links on every page",
    description:
      "Each page should link to its hub and at least five relevant companion pages.",
  },
];

export const implementationRoadmap: RoadmapPhase[] = [
  {
    phase: "Month 1",
    targetPages: 200,
    priority: [
      "Highest-stress parent-email scenarios",
      "Core report-comment combinations",
      "The four main alternative pages",
      "Hub pages with internal linking",
    ],
    focus:
      "Launch the safest high-intent routes first, then watch which combinations earn impressions and trial clicks.",
  },
  {
    phase: "Month 3",
    targetPages: 800,
    priority: [
      "Expand subject and year-group report combinations",
      "Grow behaviour, homework, attendance, and SEND scenario depth",
      "Promote best-performing pages into stronger static seeds",
    ],
    focus:
      "Scale only the combinations that prove they solve a real teacher wording problem.",
  },
  {
    phase: "Month 6",
    targetPages: 2000,
    priority: [
      "Extend future categories",
      "Go deeper on UK-specific terminology clusters",
      "Refresh weak pages before shipping more",
    ],
    focus:
      "Grow breadth without losing quality by using evidence and strict copy review rules.",
  },
];

const hubs: Record<string, HubDefinition> = {
  [SCENARIO_HUB]: {
    slug: SCENARIO_HUB,
    h1: "Parent email scenarios for teachers",
    keyword: "parent email scenarios for teachers",
    intent: "How-to/problem intent",
    heroEyebrow: "Scenario lookup pages",
    intro: [
      "Parent email scenarios are rarely hard because the teacher lacks facts. They are hard because the tone has to carry behaviour, support, boundaries, and empathy in one calm message.",
      "This hub groups scenario pages around real tired-teacher searches so visitors can find a safer starting point fast, then move into Zaza Draft for a custom version.",
    ],
    cards: [
      {
        href: "/scenario/behaviour-issue/year-5-primary",
        label: "Behaviour issue in Year 5 primary",
        description:
          "Factual wording that still keeps the relationship with home workable.",
      },
      {
        href: "/scenario/angry-parent/maths-homework-secondary",
        label: "Angry parent about maths homework in secondary",
        description: "De-escalation wording for subject-specific frustration.",
      },
      {
        href: "/scenario/sen-child/not-engaging",
        label: "SEN pupil not engaging",
        description:
          "Support-focused communication around participation and confidence.",
      },
      {
        href: "/scenario/struggling-reader/ks2",
        label: "Struggling reader in KS2",
        description:
          "Honest, reassuring wording for upper-primary reading concerns.",
      },
      {
        href: "/teacher-parent-communication-hub",
        label: "Teacher parent communication hub",
        description:
          "The wider Zaza hub for difficult communication and school writing.",
      },
      {
        href: "/products/draft",
        label: "How Zaza Draft works",
        description: "See the calm co-writer behind this cluster.",
      },
    ],
  },
  [HOW_TO_REPLY_HUB]: {
    slug: HOW_TO_REPLY_HUB,
    h1: "How to reply to parents as a teacher",
    keyword: "how to reply to parents as a teacher",
    intent: "How-to/problem intent",
    heroEyebrow: "Reply pages",
    intro: [
      "How-to-reply searches usually appear when a teacher knows the issue but cannot find wording that feels calm enough, clear enough, and professionally safe enough to send.",
      "This hub groups high-intent reply pages for angry parents, no-response behaviour threads, grade complaints, homework disputes, and similar flashpoints.",
    ],
    cards: [
      {
        href: "/how-to-reply/angry-parent-of-year-6-pupil",
        label: "Reply to an angry parent of a Year 6 pupil",
        description:
          "A steadier framework for upper-primary replies under pressure.",
      },
      {
        href: "/how-to-reply/parents-dont-respond-to-behaviour-email",
        label: "Reply when parents do not respond to a behaviour email",
        description:
          "Measured follow-up wording when the issue has not gone away.",
      },
      {
        href: "/how-to-reply/grade-complaint-ks3",
        label: "Reply to a KS3 grade complaint",
        description:
          "Evidence-based wording for fairness, assessment, and next steps.",
      },
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "How to reply to an angry parent email",
        description:
          "The flagship difficult-reply page for calmer teacher wording.",
      },
      {
        href: "/reduce-stress-parent-messages",
        label: "Reduce stress from parent messages",
        description: "Broader advice for teachers drained by the inbox.",
      },
      {
        href: "/products/draft",
        label: "See the co-writer",
        description:
          "Explore the writing workflow behind these reply templates.",
      },
    ],
  },
  [REPORT_COMMENTS_HUB]: {
    slug: REPORT_COMMENTS_HUB,
    h1: "Report comments for specific student situations",
    keyword: "report comments for teachers",
    intent: "Template intent",
    heroEyebrow: "Student context pages",
    intro: [
      "Report comments become slow when the pupil situation is nuanced and the wording has to hold honesty, warmth, and professionalism together.",
      "This hub organises report-comment pages by pupil type, subject, and year group so teachers can start much closer to the real comment they are trying to write.",
    ],
    cards: [
      {
        href: "/report-comments/struggling/english/year-5",
        label: "Struggling student with behaviour concerns in English",
        description:
          "Balanced wording for progress, behaviour, and support in Year 5.",
      },
      {
        href: "/report-comments/anxious-eal/maths/year-4",
        label: "Anxious EAL pupil in maths",
        description:
          "Careful language for confidence, communication, and progress.",
      },
      {
        href: "/report-comments/struggling/science/year-8",
        label: "High attaining but disorganised in science",
        description:
          "Comments that praise attainment while staying honest about habits.",
      },
      {
        href: "/report-comments/sen-needs/maths/year-6",
        label: "Pupil on SEN support in maths",
        description:
          "Respectful report comments with clear next-step language.",
      },
      {
        href: "/ai-for-student-reports",
        label: "AI for student reports",
        description: "The broader report-writing page for workflow comparison.",
      },
      {
        href: "/products/draft",
        label: "Try Zaza Draft",
        description:
          "See how the report-writing co-writer keeps teachers in control.",
      },
    ],
  },
  [ALTERNATIVES_HUB]: {
    slug: ALTERNATIVES_HUB,
    h1: "Alternatives to generic AI for teacher writing",
    keyword: "alternatives to generic ai for teachers",
    intent: "Alternative/comparison intent",
    heroEyebrow: "Comparison pages",
    intro: [
      "Teachers looking for alternatives are often not looking for more features. They are looking for a calmer fit, less clutter, and more trust-first communication support.",
      "This hub groups fair comparison pages through the lens that matters most to Zaza Draft: teacher writing where tone matters.",
    ],
    cards: [
      {
        href: "/alternatives/magicschool-ai/parent-emails",
        label: "Alternative to MagicSchool AI for parent emails",
        description:
          "A fair comparison for teachers who mainly want calmer communication support.",
      },
      {
        href: "/alternatives/teachmate/report-comments",
        label: "Zaza Draft vs TeachMate for report comments",
        description:
          "A focused comparison for comment quality, tone, and speed.",
      },
      {
        href: "/alternatives/chatgpt/professional-teacher-tone",
        label: "Better than ChatGPT for professional teacher tone",
        description:
          "For teachers who want a more school-ready drafting workflow.",
      },
      {
        href: "/alternatives/generic-ai/angry-parent-replies",
        label: "Zaza Draft vs generic AI for angry parent replies",
        description:
          "A comparison for teachers who want lower-risk wording in difficult exchanges.",
      },
      {
        href: "/compare",
        label: "Compare pages",
        description:
          "The wider comparison centre for broader Zaza Draft positioning.",
      },
      {
        href: "/products/draft",
        label: "Try the writing co-pilot",
        description: "See the product behind the comparison pages.",
      },
    ],
  },
  [SCENARIO_BUILDER_HUB]: {
    slug: SCENARIO_BUILDER_HUB,
    h1: "Teacher scenario builder pages",
    keyword: "teacher communication scenario builder",
    intent: "How-to/problem intent",
    heroEyebrow: "Combination pages",
    intro: [
      "Scenario-builder pages are designed for whole-sentence searches where a teacher wants wording for one very specific combination of issue, pupil context, and school pressure.",
      "This hub gathers those calculator-style pages for parent communication, documentation, and report writing when a general guide is not close enough.",
    ],
    cards: [
      {
        href: "/what-to-say-to-parents-of-year-3-student-struggling-in-reading",
        label: "What to say to parents of a Year 3 pupil struggling in reading",
        description:
          "A combination page for progress concerns that need empathy and clarity.",
      },
      {
        href: "/how-to-document-parent-contact-for-slt-when-behaviour-is-escalating",
        label: "Document parent contact for SLT when behaviour is escalating",
        description: "A practical page for contact logs and follow-up wording.",
      },
      {
        href: "/positive-honest-report-comment-combinations-for-sen-pupils",
        label: "Positive honest report comment combinations for SEN pupils",
        description:
          "A report-writing combination page for respectful, specific wording.",
      },
      {
        href: "/parent-email-template-primary-school",
        label: "Parent email template for primary school",
        description:
          "A platform-style variation page for day-to-day school messaging.",
      },
      {
        href: "/products/draft",
        label: "Generate a custom version",
        description:
          "Move from the examples into a teacher-edited draft inside Zaza Draft.",
      },
      {
        href: "/teacher-parent-communication-hub",
        label: "Teacher parent communication hub",
        description:
          "The wider hub for difficult communication and calmer drafting.",
      },
    ],
  },
};

const scenarioTypes: Record<string, ScenarioType> = {
  "behaviour-issue": {
    slug: "behaviour-issue",
    label: "behaviour issue",
    pain: "the teacher needs to sound factual, calm, and clear about next steps without making the email feel like a verdict",
    angle: "a parent email about behaviour expectations and next steps",
  },
  "angry-parent": {
    slug: "angry-parent",
    label: "angry parent",
    pain: "the teacher is trying to de-escalate without sounding weak, defensive, or vague",
    angle: "a de-escalating reply that protects the relationship",
  },
  "sen-child": {
    slug: "sen-child",
    label: "SEN child",
    pain: "the teacher wants support-focused language that avoids reductive phrasing",
    angle: "support-focused communication that keeps dignity intact",
  },
  "struggling-reader": {
    slug: "struggling-reader",
    label: "struggling reader",
    pain: "the teacher is balancing honesty about literacy concerns with reassurance for home",
    angle: "an honest but reassuring progress update about reading",
  },
  "missing-homework": {
    slug: "missing-homework",
    label: "missing homework",
    pain: "the teacher wants accountability without making the message feel petty or repetitive",
    angle: "a practical homework email that keeps expectations clear and calm",
  },
  attendance: {
    slug: "attendance",
    label: "attendance concern",
    pain: "the wording has to stay supportive while being clear that learning time is being affected",
    angle: "a measured attendance concern email",
  },
  "friendship-fallout": {
    slug: "friendship-fallout",
    label: "friendship fallout",
    pain: "the teacher is trying to communicate pastoral detail without overstating playground conflict",
    angle: "a relationship-aware parent update after peer conflict",
  },
  "revision-stress": {
    slug: "revision-stress",
    label: "revision stress",
    pain: "the teacher wants to acknowledge pressure while keeping the message constructive",
    angle: "a supportive revision and wellbeing message",
  },
  "parents-evening-follow-up": {
    slug: "parents-evening-follow-up",
    label: "parents' evening follow-up",
    pain: "the teacher needs a cleaner written version of an awkward or emotional conversation",
    angle: "a concise parents' evening follow-up email",
  },
  "confidence-drop": {
    slug: "confidence-drop",
    label: "confidence drop",
    pain: "the concern is subtle and emotional, so the message has to sound observant rather than alarmist",
    angle: "a careful message about confidence and participation",
  },
  "low-level-disruption": {
    slug: "low-level-disruption",
    label: "low-level disruption",
    pain: "the behaviour is persistent enough to matter but easy to describe poorly",
    angle: "a behaviour email about repeated low-level disruption",
  },
  "return-from-absence": {
    slug: "return-from-absence",
    label: "return from absence",
    pain: "the teacher needs to welcome the pupil back while being honest about missed learning and support",
    angle: "a supportive return-to-school message",
  },
};

const scenarioContexts: Record<string, ScenarioContext> = {
  "year-1-primary": {
    slug: "year-1-primary",
    label: "Year 1 primary",
    phase: "primary school",
    yearGroup: "Year 1",
    detail:
      "families often need clearer explanation because routines are still being built and school language is new to them",
  },
  "year-3-primary": {
    slug: "year-3-primary",
    label: "Year 3 primary",
    phase: "primary school",
    yearGroup: "Year 3",
    detail:
      "parents are often adjusting to lower KS2 expectations and more formal feedback",
  },
  "year-5-primary": {
    slug: "year-5-primary",
    label: "Year 5 primary",
    phase: "primary school",
    yearGroup: "Year 5",
    detail:
      "the teacher is trying to protect clarity and trust at the same time in a busy upper-primary class",
  },
  ks2: {
    slug: "ks2",
    label: "KS2",
    phase: "primary school",
    yearGroup: "KS2",
    detail:
      "families often need both reassurance and realism, and the wording has to carry both",
  },
  "maths-homework-secondary": {
    slug: "maths-homework-secondary",
    label: "secondary maths homework",
    phase: "secondary school",
    yearGroup: "secondary",
    detail:
      "the issue is subject-specific and homework frustration is already feeding defensiveness",
  },
  "year-7-secondary": {
    slug: "year-7-secondary",
    label: "Year 7 secondary",
    phase: "secondary school",
    yearGroup: "Year 7",
    detail:
      "new routines, transition nerves, and multiple teachers make family communication especially sensitive",
  },
  "ks3-secondary": {
    slug: "ks3-secondary",
    label: "KS3 secondary",
    phase: "secondary school",
    yearGroup: "KS3",
    detail:
      "teachers often need a balance between subject evidence and wider school expectations",
  },
  "ks4-exam-season": {
    slug: "ks4-exam-season",
    label: "KS4 exam season",
    phase: "secondary school",
    yearGroup: "KS4",
    detail:
      "pressure is already high, so the wording needs to keep everyone steady rather than intensify anxiety",
  },
  "not-engaging": {
    slug: "not-engaging",
    label: "not engaging in lessons",
    phase: "whole-school",
    yearGroup: "mixed phase",
    detail:
      "the concern is participation, confidence, and support rather than one neat behaviour incident",
  },
};

const replyTriggers: Record<string, ReplyTrigger> = {
  "angry-parent-of-year-6-pupil": {
    slug: "angry-parent-of-year-6-pupil",
    label: "an angry parent of a Year 6 pupil",
    context:
      "SATs pressure, transition worry, and a parent who already feels on edge",
    nextStep:
      "offer a calm call or meeting after setting out the verified facts",
  },
  "parents-dont-respond-to-behaviour-email": {
    slug: "parents-dont-respond-to-behaviour-email",
    label: "parents who do not respond to a behaviour email",
    context: "a follow-up chain that feels one-sided and emotionally draining",
    nextStep:
      "send a concise follow-up that documents the attempt and invites one practical response",
  },
  "grade-complaint-ks3": {
    slug: "grade-complaint-ks3",
    label: "a KS3 grade complaint",
    context:
      "a dispute about fairness, evidence, and what the mark actually means",
    nextStep:
      "summarise the evidence and move the exchange towards a reviewable next step",
  },
  "homework-detention-complaint-ks4": {
    slug: "homework-detention-complaint-ks4",
    label: "a KS4 homework detention complaint",
    context: "an emotionally loaded email where policy and pressure collide",
    nextStep:
      "keep the reply short, policy-aware, and clear about what can happen next",
  },
  "parents-question-send-support": {
    slug: "parents-question-send-support",
    label: "parents questioning SEN support",
    context:
      "families want reassurance and clarity, but the wording needs dignity and accuracy",
    nextStep:
      "state observed support and suggest the most appropriate follow-up route",
  },
  "parents-upset-about-seating-plan": {
    slug: "parents-upset-about-seating-plan",
    label: "parents upset about a seating-plan decision",
    context:
      "a relatively small classroom issue has become emotionally loaded at home",
    nextStep:
      "acknowledge the concern, explain the rationale, and set a review point",
  },
  "parents-object-to-reading-intervention": {
    slug: "parents-object-to-reading-intervention",
    label: "parents objecting to a reading intervention",
    context:
      "the parent may hear support as a label, so the wording needs care and confidence",
    nextStep:
      "frame the intervention as support, not judgement, and explain the practical benefit",
  },
  "parent-disagrees-with-behaviour-sanction": {
    slug: "parent-disagrees-with-behaviour-sanction",
    label: "a parent who disagrees with a behaviour sanction",
    context:
      "policy, fairness, and relationship repair are all in the same email thread",
    nextStep: "keep the response factual and clear about the review process",
  },
  "parent-asks-why-report-comment-is-blunt": {
    slug: "parent-asks-why-report-comment-is-blunt",
    label: "a parent asking why a report comment feels blunt",
    context:
      "a short written comment has opened a larger conversation about tone and interpretation",
    nextStep:
      "clarify the intent of the comment and restate the practical next step",
  },
  "parent-complaint-about-homework-not-done": {
    slug: "parent-complaint-about-homework-not-done",
    label: "a complaint about homework not being done",
    context:
      "the family may feel blamed already, so the wording needs accountability and support together",
    nextStep:
      "set out the missing work clearly and offer one manageable support action",
  },
  "parents-ignore-parents-evening-reminder": {
    slug: "parents-ignore-parents-evening-reminder",
    label: "parents ignoring a parents' evening reminder",
    context:
      "the teacher needs a nudge that is professional rather than passive-aggressive",
    nextStep:
      "send a short reminder that respects family pressures and makes booking easy",
  },
  "parent-challenges-attendance-concern": {
    slug: "parent-challenges-attendance-concern",
    label: "a parent challenging an attendance concern",
    context:
      "attendance data may be clear, but the family situation may be sensitive",
    nextStep:
      "stay factual, explain the learning impact, and signpost the next conversation",
  },
};

const studentTypes: Record<string, StudentType> = {
  "struggling-student-behaviour": {
    slug: "struggling-student-behaviour",
    label: "a struggling student with behaviour concerns",
    challenge:
      "progress is inconsistent and behaviour is affecting classroom routines",
    supportAngle:
      "language needs to hold boundaries, support, and realistic next steps together",
  },
  "anxious-eal-pupil": {
    slug: "anxious-eal-pupil",
    label: "an anxious EAL pupil",
    challenge:
      "confidence, language load, and participation all need careful wording",
    supportAngle:
      "comments should highlight support and progress without overstating struggle",
  },
  "high-attaining-but-disorganised": {
    slug: "high-attaining-but-disorganised",
    label: "a high attaining but disorganised pupil",
    challenge:
      "achievement is strong but habits and independence still need honest attention",
    supportAngle:
      "the comment should preserve praise while still naming the organisational issue",
  },
  "sen-support-needs": {
    slug: "sen-support-needs",
    label: "a pupil on SEN support",
    challenge:
      "support, progress, and next steps need respectful language rather than generic praise",
    supportAngle:
      "dignity and clarity matter as much as precision in these comments",
  },
  "reluctant-writer": {
    slug: "reluctant-writer",
    label: "a reluctant writer",
    challenge:
      "effort, confidence, and small wins all need to be described without oversimplifying the difficulty",
    supportAngle:
      "comments work best when they recognise effort and give one practical next step",
  },
  "bright-but-inconsistent": {
    slug: "bright-but-inconsistent",
    label: "a bright but inconsistent pupil",
    challenge:
      "potential is obvious but the output and routines are still uneven",
    supportAngle: "the wording should sound honest rather than disappointed",
  },
  "quiet-but-capable": {
    slug: "quiet-but-capable",
    label: "a quiet but capable pupil",
    challenge:
      "the teacher wants to describe strength and participation without calling attention to personality in the wrong way",
    supportAngle:
      "comments should value contribution and confidence-building together",
  },
  "low-attainment-low-confidence": {
    slug: "low-attainment-low-confidence",
    label: "a pupil with low attainment and low confidence",
    challenge:
      "the comment needs to stay hopeful while acknowledging real gaps",
    supportAngle:
      "small, truthful progress markers often work better than inflated praise",
  },
  "attendance-concern": {
    slug: "attendance-concern",
    label: "a pupil with attendance concerns",
    challenge:
      "missed learning is affecting progress and the wording needs to stay factual and supportive",
    supportAngle:
      "attendance language should explain impact without sounding accusatory",
  },
  "behaviour-and-attention-needs": {
    slug: "behaviour-and-attention-needs",
    label: "a pupil with behaviour and attention needs",
    challenge:
      "the teacher is balancing regulation, routines, and academic progress in one short comment",
    supportAngle:
      "comments should focus on strategies, progress, and practical next steps",
  },
  "returning-after-absence": {
    slug: "returning-after-absence",
    label: "a pupil returning after absence",
    challenge:
      "reintegration, confidence, and catch-up all need proportionate wording",
    supportAngle:
      "the comment should sound welcoming and specific rather than vague",
  },
  "exam-anxious-pupil": {
    slug: "exam-anxious-pupil",
    label: "an exam-anxious pupil",
    challenge:
      "performance and wellbeing both matter, especially when pressure is high",
    supportAngle:
      "the comment should acknowledge effort, preparation, and calm next steps",
  },
};

const subjects: Record<string, Subject> = {
  english: {
    slug: "english",
    label: "English",
    signal: "writing quality, reading response, and spoken confidence",
  },
  maths: {
    slug: "maths",
    label: "maths",
    signal: "fluency, reasoning, and confidence with method",
  },
  science: {
    slug: "science",
    label: "science",
    signal: "practical work, explanation, and analytical thinking",
  },
  reading: {
    slug: "reading",
    label: "reading",
    signal: "fluency, comprehension, and reading stamina",
  },
  writing: {
    slug: "writing",
    label: "writing",
    signal: "independence, structure, and stamina for written work",
  },
  humanities: {
    slug: "humanities",
    label: "humanities",
    signal: "discussion, recall, and thoughtful written response",
  },
  art: {
    slug: "art",
    label: "art",
    signal: "creative risk-taking, craftsmanship, and reflection",
  },
  behaviour: {
    slug: "behaviour",
    label: "behaviour",
    signal: "routines, choices, and readiness to learn",
  },
  attendance: {
    slug: "attendance",
    label: "attendance",
    signal: "consistency, punctuality, and impact on progress",
  },
};

const yearGroups: Record<string, YearGroup> = {
  "year-1": {
    slug: "year-1",
    label: "Year 1",
    phase: "KS1",
    signal: "early routines and family reassurance matter a lot",
  },
  "year-2": {
    slug: "year-2",
    label: "Year 2",
    phase: "KS1",
    signal: "teachers often need clarity around phonics, fluency, and habits",
  },
  "year-3": {
    slug: "year-3",
    label: "Year 3",
    phase: "lower KS2",
    signal:
      "independence is growing and home-school wording often needs more explanation",
  },
  "year-4": {
    slug: "year-4",
    label: "Year 4",
    phase: "lower KS2",
    signal: "teachers want calm precision around progress and routines",
  },
  "year-5": {
    slug: "year-5",
    label: "Year 5",
    phase: "upper KS2",
    signal: "behaviour, expectations, and preparation often carry more weight",
  },
  "year-6": {
    slug: "year-6",
    label: "Year 6",
    phase: "upper KS2",
    signal: "SATs and transition pressure make tone especially important",
  },
  ks3: {
    slug: "ks3",
    label: "KS3",
    phase: "secondary",
    signal: "subject evidence and professional tone both need to be clear",
  },
};

const competitors: Record<string, Competitor> = {
  "magicschool-ai": {
    slug: "magicschool-ai",
    label: "MagicSchool AI",
    neutralSummary: "a broader teacher product with many workflows",
  },
  teachmate: {
    slug: "teachmate",
    label: "TeachMate",
    neutralSummary: "a broader teacher support product with multiple tools",
  },
  chatgpt: {
    slug: "chatgpt",
    label: "ChatGPT",
    neutralSummary:
      "a general-purpose AI assistant rather than a teacher-specific writing workflow",
  },
  "generic-ai": {
    slug: "generic-ai",
    label: "generic AI",
    neutralSummary:
      "broad AI tools that can produce text but are not built around school-writing tone",
  },
};

const alternativeUseCases: Record<string, AlternativeUseCase> = {
  "parent-emails": {
    slug: "parent-emails",
    label: "parent emails",
    audiencePain:
      "teachers mainly want calmer, more school-ready communication rather than a broad toolbox",
    betterFit:
      "a focused writing workflow can feel safer than a large multi-tool dashboard when one difficult message is the real issue",
  },
  "report-comments": {
    slug: "report-comments",
    label: "report comments",
    audiencePain:
      "teachers want faster report writing without flattening tone or honesty",
    betterFit:
      "a specialist co-writer is often easier to trust when one comment needs nuance, evidence, and restraint",
  },
  "professional-teacher-tone": {
    slug: "professional-teacher-tone",
    label: "professional teacher tone",
    audiencePain:
      "teachers care most about sounding measured, appropriate, and emotionally intelligent",
    betterFit:
      "a boutique workflow that keeps tone conservative is often a better fit than a blank general-purpose chat box",
  },
  "angry-parent-replies": {
    slug: "angry-parent-replies",
    label: "angry parent replies",
    audiencePain:
      "teachers are handling difficult replies where the wrong sentence can create next week's problem",
    betterFit:
      "a narrower product is often easier to trust when the task is emotionally difficult and low-risk wording matters most",
  },
};

export const programmaticSingleSlugPages: Record<string, SingleSlugDefinition> =
  {
    "parent-email-template-primary-school": {
      slug: "parent-email-template-primary-school",
      keyword: "parent email template primary school",
      h1: "Parent email template for primary school teachers",
      title: "Parent Email Template for Primary School Teachers | Zaza Draft",
      metaDescription:
        "Parent email template for primary school teachers with calm wording for behaviour, progress, parents' evening, and sensitive home-school communication.",
      intent: "Template intent",
      theme: "primary-school parent email templates",
      audiencePain:
        "teachers want a reliable structure for everyday parent emails without sounding abrupt or generic",
      exampleType: "email",
    },
    "report-writing-help-secondary-school-ks4": {
      slug: "report-writing-help-secondary-school-ks4",
      keyword: "report writing help secondary school ks4",
      h1: "Report writing help for secondary school KS4 teachers",
      title:
        "Report Writing Help for Secondary School KS4 Teachers | Zaza Draft",
      metaDescription:
        "Report writing help for secondary school KS4 teachers who need honest, professional comments under pressure without losing judgement.",
      intent: "Tool intent",
      theme: "secondary KS4 report writing",
      audiencePain:
        "teachers are carrying exam pressure and comments that feel high stakes",
      exampleType: "report",
    },
    "ofsted-friendly-parent-communication-ks1": {
      slug: "ofsted-friendly-parent-communication-ks1",
      keyword: "ofsted friendly parent communication ks1",
      h1: "Ofsted-friendly parent communication for KS1 teachers",
      title:
        "Ofsted-Friendly Parent Communication for KS1 Teachers | Zaza Draft",
      metaDescription:
        "Ofsted-friendly parent communication for KS1 teachers with calm, factual, school-ready wording for infant settings.",
      intent: "How-to/problem intent",
      theme: "KS1 parent communication",
      audiencePain:
        "teachers need warm communication that still feels factual and proportionate",
      exampleType: "email",
    },
    "parents-evening-email-template-primary-uk": {
      slug: "parents-evening-email-template-primary-uk",
      keyword: "parents evening email template primary uk",
      h1: "Parents' evening email template for primary schools in the UK",
      title:
        "Parents' Evening Email Template for Primary Schools in the UK | Zaza Draft",
      metaDescription:
        "Parents' evening email template for primary schools in the UK with calmer wording for invitations, reminders, and follow-up.",
      intent: "Template intent",
      theme: "parents' evening primary UK",
      audiencePain:
        "teachers are managing invitations and reminders when wording starts to blur together",
      exampleType: "email",
    },
    "how-to-write-behaviour-email-for-large-class": {
      slug: "how-to-write-behaviour-email-for-large-class",
      keyword: "how to write behaviour email for large class",
      h1: "How to write a behaviour email for a large class",
      title: "How to Write a Behaviour Email for a Large Class | Zaza Draft",
      metaDescription:
        "How to write a behaviour email for a large class without sounding vague, overwhelmed, or overly harsh.",
      intent: "How-to/problem intent",
      theme: "behaviour email in a large class",
      audiencePain:
        "teachers need wording that reflects repeated disruption without sounding chaotic or accusatory",
      exampleType: "email",
    },
    "positive-but-honest-report-comments-for-scanned-evidence": {
      slug: "positive-but-honest-report-comments-for-scanned-evidence",
      keyword: "positive but honest report comments for patchy evidence",
      h1: "Positive but honest report comments when the evidence is patchy",
      title:
        "Positive but Honest Report Comments When the Evidence Is Patchy | Zaza Draft",
      metaDescription:
        "Positive but honest report comments when the evidence is patchy, incomplete, or hard to summarise cleanly after a difficult term.",
      intent: "Template intent",
      theme: "report comments from patchy evidence",
      audiencePain:
        "teachers are trying to stay fair and professional when the evidence base is incomplete or inconsistent",
      exampleType: "report",
    },
    "parent-email-about-missing-homework-password-protected-portal": {
      slug: "parent-email-about-missing-homework-password-protected-portal",
      keyword: "parent email about missing homework portal",
      h1: "Parent email about missing homework on a school portal",
      title:
        "Parent Email About Missing Homework on a School Portal | Zaza Draft",
      metaDescription:
        "Parent email about missing homework on a school portal with calmer wording for login confusion, accountability, and support.",
      intent: "How-to/problem intent",
      theme: "missing homework and portal friction",
      audiencePain:
        "teachers need to explain missing homework clearly without turning a practical issue into a defensive exchange",
      exampleType: "email",
    },
    "report-comments-for-large-pdf-evidence-files": {
      slug: "report-comments-for-large-pdf-evidence-files",
      keyword: "report comments for large evidence files",
      h1: "Report comments when the evidence file is large and messy",
      title:
        "Report Comments When the Evidence File Is Large and Messy | Zaza Draft",
      metaDescription:
        "Report comments when the evidence base is large, messy, and hard to summarise. Keep the wording calm, specific, and professionally balanced.",
      intent: "Template intent",
      theme: "messy documentation and report comments",
      audiencePain:
        "teachers are staring at too much documentation and still need one clear parent-facing comment",
      exampleType: "report",
    },
    "what-to-say-to-parents-of-year-3-student-struggling-in-reading": {
      slug: "what-to-say-to-parents-of-year-3-student-struggling-in-reading",
      keyword: "what to say to parents of year 3 student struggling in reading",
      h1: "What to say to parents of a Year 3 pupil struggling in reading",
      title:
        "What to Say to Parents of a Year 3 Pupil Struggling in Reading | Zaza Draft",
      metaDescription:
        "What to say to parents of a Year 3 pupil struggling in reading with calm, specific wording that is honest, supportive, and clear about next steps.",
      intent: "How-to/problem intent",
      theme: "reading concern in Year 3",
      audiencePain:
        "teachers are trying to be truthful about reading concerns without making families feel blamed or shut out",
      exampleType: "email",
    },
    "how-to-document-parent-contact-for-slt-when-behaviour-is-escalating": {
      slug: "how-to-document-parent-contact-for-slt-when-behaviour-is-escalating",
      keyword:
        "how to document parent contact for slt when behaviour is escalating",
      h1: "How to document parent contact for SLT when behaviour is escalating",
      title:
        "How to Document Parent Contact for SLT When Behaviour Is Escalating | Zaza Draft",
      metaDescription:
        "How to document parent contact for SLT when behaviour is escalating with concise, factual wording that holds up later.",
      intent: "How-to/problem intent",
      theme: "SLT documentation for escalating behaviour",
      audiencePain:
        "teachers are already doing the communication and still need the contact log to be clean and usable later",
      exampleType: "documentation",
    },
    "positive-honest-report-comment-combinations-for-sen-pupils": {
      slug: "positive-honest-report-comment-combinations-for-sen-pupils",
      keyword: "positive honest report comment combinations for sen pupils",
      h1: "Positive honest report comment combinations for SEN pupils",
      title:
        "Positive Honest Report Comment Combinations for SEN Pupils | Zaza Draft",
      metaDescription:
        "Positive honest report comment combinations for SEN pupils with respectful, clear, and professionally useful wording for teachers.",
      intent: "Template intent",
      theme: "SEN report comment combinations",
      audiencePain:
        "teachers are trying to balance care, realism, support language, and dignity in a very small amount of space",
      exampleType: "report",
    },
    "better-than-chatgpt-for-professional-teacher-tone": {
      slug: "better-than-chatgpt-for-professional-teacher-tone",
      keyword: "better than chatgpt for professional teacher tone",
      h1: "A better alternative than ChatGPT for professional teacher tone",
      title:
        "A Better Alternative Than ChatGPT for Professional Teacher Tone | Zaza Draft",
      metaDescription:
        "A better alternative than ChatGPT for professional teacher tone if you want calmer, more school-ready parent emails and report comments.",
      intent: "Alternative/comparison intent",
      theme: "professional teacher tone comparison",
      audiencePain:
        "teachers want a more focused writing workflow than a generic chat tool when tone feels risky",
      exampleType: "email",
    },
  };

export const futureCategoryPages: FutureCategoryPage[] = [
  {
    category: "platform-variations",
    slugParts: ["primary-school", "parent-email-template"],
    keyword: "parent email template primary school platform variation",
    h1: "Primary school parent email template variation",
    title: "Primary School Parent Email Template Variation | Zaza Draft",
    metaDescription:
      "Primary school parent email template variation with calm wording and clear next-step phrasing for tired teachers.",
    intent: "Template intent",
    theme: "primary-school platform variation for parent email templates",
    audiencePain:
      "teachers want a version tuned to a specific school workflow without losing tone quality",
    exampleType: "email",
  },
  {
    category: "problem-variations",
    slugParts: ["large-class", "behaviour-email"],
    keyword: "behaviour email for a large class variation",
    h1: "Behaviour email variation for a large class",
    title: "Behaviour Email Variation for a Large Class | Zaza Draft",
    metaDescription:
      "Behaviour email variation for a large class with factual wording, calmer structure, and teacher-edited examples.",
    intent: "How-to/problem intent",
    theme: "problem variation for repeated behaviour emails",
    audiencePain:
      "teachers need a more specific starting point for repeated disruption and large-class context",
    exampleType: "email",
  },
];

export const programmaticSingleSlugSlugs = Object.keys(
  programmaticSingleSlugPages,
);

export const seedScenarioParams = [
  ["behaviour-issue", "year-5-primary"],
  ["angry-parent", "maths-homework-secondary"],
  ["sen-child", "not-engaging"],
  ["struggling-reader", "ks2"],
  ["missing-homework", "year-3-primary"],
  ["attendance", "year-7-secondary"],
] as const;

export const seedReplyParams = [
  "angry-parent-of-year-6-pupil",
  "parents-dont-respond-to-behaviour-email",
  "grade-complaint-ks3",
  "homework-detention-complaint-ks4",
  "parents-object-to-reading-intervention",
  "parent-disagrees-with-behaviour-sanction",
] as const;

export const seedReportParams = [
  ["struggling-student-behaviour", "english", "year-5"],
  ["anxious-eal-pupil", "maths", "year-4"],
  ["high-attaining-but-disorganised", "science", "ks3"],
  ["sen-support-needs", "maths", "year-6"],
  ["reluctant-writer", "writing", "year-3"],
  ["bright-but-inconsistent", "humanities", "year-5"],
] as const;

export const seedAlternativeParams = [
  ["magicschool-ai", "parent-emails"],
  ["teachmate", "report-comments"],
  ["chatgpt", "professional-teacher-tone"],
  ["generic-ai", "angry-parent-replies"],
] as const;

export const seedFutureCategoryParams = futureCategoryPages.map((page) => ({
  category: page.category,
  slug: page.slugParts,
}));

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function hyphenToWords(value: string) {
  return value.replace(/-/g, " ");
}

function formatSlugLabel(value: string) {
  return titleCase(hyphenToWords(value));
}

function normaliseSegments(input: string | string[]) {
  return (Array.isArray(input) ? input : input.split("/"))
    .map((segment) => segment.trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean);
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function withWordCount(
  page: Omit<ProgrammaticPageData, "estimatedWordCount">,
): ProgrammaticPageData {
  const wordCount = [
    page.h1,
    page.keyword,
    page.metaDescription,
    ...page.heroDescription,
    ...page.heroBullets,
    page.featuredSnippet,
    ...page.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...page.examples.flatMap((item) => [
      item.title,
      item.intro,
      item.example,
      item.note,
    ]),
    ...page.faq.flatMap((item) => [item.question, item.answer]),
    ...page.internalLinks.flatMap((item) => [item.label, item.description]),
    ...page.trustItems.flatMap((item) => [item.title, item.body]),
    ...page.testimonialPlaceholders.flatMap((item) => [
      item.role,
      item.quotePrompt,
    ]),
    page.cta.title,
    page.cta.body,
    ...page.howToSteps.flatMap((step) => [step.name, step.text]),
    page.articleSummary,
    ...(page.comparisonMatrix
      ? [
          page.comparisonMatrix.title,
          page.comparisonMatrix.intro,
          page.comparisonMatrix.note,
          ...page.comparisonMatrix.rows.flatMap((row) => [
            row.label,
            row.zaza,
            row.alternative,
          ]),
        ]
      : []),
  ].reduce((total, item) => total + countWords(item), 0);

  return { ...page, estimatedWordCount: wordCount };
}

function buildFaqBlock(theme: string, detail: string): FAQItem[] {
  return [
    {
      question: `Can Zaza Draft help with ${theme}?`,
      answer:
        "Yes. Zaza Draft is built for parent communication, report comments, and school writing where tone matters. Teachers still review and approve every final line.",
    },
    {
      question: `Why does ${theme} take so long to write well?`,
      answer: `Usually because the teacher is trying to sound clear, calm, and professionally appropriate while ${detail}.`,
    },
    {
      question: "Can I adapt the examples rather than use them as they are?",
      answer:
        "Yes. The examples are starting points. Teachers should always edit names, facts, tone, and emphasis so the final wording fits the real pupil and family.",
    },
    {
      question: "How do I keep the wording suitable for school records?",
      answer:
        "Use factual language, avoid sarcasm or speculation, and make the next step explicit. That usually makes the message easier to stand behind later.",
    },
    {
      question: "Is the copy written for UK teachers?",
      answer:
        "Yes. The language and school references are written in UK English for teachers working in British school contexts.",
    },
    {
      question: "Does Zaza Draft invent student facts?",
      answer:
        "No. The workflow is designed to stay close to teacher notes. Teachers stay in control of the facts and the final wording.",
    },
    {
      question:
        "Can I use these drafts for Ofsted-sensitive or SLT-reviewed writing?",
      answer:
        "Yes, as a starting point. The safest approach is still to review the wording against school policy and the exact facts you can stand behind.",
    },
  ];
}

function baseTrustItems(): TrustItem[] {
  return [
    {
      title: "Teacher-built and teacher-first",
      body: "Built for parent communication, report comments, and school writing where wording quality matters.",
    },
    {
      title: "Teachers stay in control",
      body: "Zaza Draft is a co-writer, not a replacement. Teachers edit and approve every final line before anything is used.",
    },
    {
      title: "Hallucination-safe workflow",
      body: "The workflow is designed to stay close to teacher notes rather than invent pupil facts or risky detail.",
    },
    {
      title: "GDPR-aware reassurance",
      body: "The positioning stays conservative and school-ready, with no promise of auto-send and no pressure to hand over judgement.",
    },
  ];
}

function baseTestimonials(theme: string): TestimonialPlaceholder[] {
  return [
    {
      role: "Class teacher placeholder",
      quotePrompt: `Add a verified teacher quote about using Zaza Draft for ${theme} without losing professional judgement.`,
    },
    {
      role: "Middle leader placeholder",
      quotePrompt: `Add a verified quote about getting to a calmer first draft faster for ${theme}.`,
    },
  ];
}

function baseCta(theme: string) {
  return {
    title: "Draft your next message calmly - start free trial",
    body: `If ${theme} is what keeps swallowing the evening, try Zaza Draft as a focused co-writer for parent emails, report comments, and school writing where tone matters. You keep full control of every final line.`,
    primaryLabel: "Start free trial",
    primaryHref: "/early-access",
    secondaryLabel: "See how Zaza Draft works",
    secondaryHref: "/products/draft",
  };
}

function baseHowToSteps(theme: string): HowToStep[] {
  return [
    {
      name: `Start from the real ${theme} issue`,
      text: "Keep the first draft close to the actual teacher situation rather than generic filler.",
    },
    {
      name: "Choose the clearest structure",
      text: "Lead with the main concern, keep the tone measured, and make the next step visible enough to reduce friction.",
    },
    {
      name: "Edit for accuracy and safeguarding",
      text: "Add only details you are comfortable sending, saving, or standing behind later.",
    },
    {
      name: "Review before using",
      text: "Keep the final judgement with the teacher. Zaza Draft supports the wording, not the decision.",
    },
  ];
}

function buildInternalLinks(primary: LinkCard, extras: LinkCard[]) {
  return Array.from(
    new Map([primary, ...extras].map((link) => [link.href, link])).values(),
  ).slice(0, 6);
}

function buildCommonSections(theme: string, detail: string): ContentSection[] {
  return [
    {
      title: `A calmer way to approach ${theme}`,
      paragraphs: [
        `The problem with ${theme} is rarely the number of words. It is the weight behind them. Teachers often know the facts but still reopen the draft because the message has to sound calm, specific, and professionally safe at the same time.`,
        `That means the real workload is usually tone, not typing. This page is written to reduce that tone friction in a way that still respects teacher judgement and the reality of ${detail}.`,
      ],
    },
    {
      title: `Common pitfalls when writing about ${theme}`,
      paragraphs: [
        "The most common mistake is trying to solve everything in one paragraph. That usually leads to wording that sounds defensive, vague, or emotionally overfilled even when the teacher is trying to be careful.",
        "Another common problem is over-softening the wording until the actual issue disappears. In school communication, a calm tone works best when it stays factual, proportionate, and clear about the next step.",
      ],
      bullets: [
        "Over-explaining the background instead of naming the issue",
        "Trying to sound warm but ending up unclear",
        "Leaving out the next step because the draft already feels heavy",
      ],
    },
    {
      title: `Teacher-editable examples for ${theme}`,
      paragraphs: [
        "The examples on this page are meant to shorten the distance between your notes and a usable first draft. They are not final copy to paste without thinking.",
        "Use them as a starting point, then edit the tone, facts, and emphasis so the final wording fits the pupil, family, school policy, and your own judgement.",
      ],
    },
    {
      title: "How Zaza Draft helps you stay in control",
      paragraphs: [
        "Zaza Draft is designed as a teacher-first co-writer, not a replacement. It helps teachers move from rough notes to a steadier first draft faster, especially when the emotional load of the message is what makes the task drag.",
        "The teacher still decides what happened, what should be emphasised, and whether the wording is right for the pupil, family, class, or school context. The workflow supports judgement. It does not replace it.",
      ],
      bullets: [
        "Generate custom version -> try free",
        "Review-led drafting, not auto-send",
        "School-ready tone with teacher control preserved",
      ],
    },
    {
      title: `A practical workflow for ${theme}`,
      paragraphs: [
        "Start with the facts you can stand behind. Then choose the version of the message that best fits the relationship, the seriousness of the issue, and what needs to happen next. This is usually faster than trying to invent a perfect paragraph from scratch.",
        "Before you send or save anything, read it once as a parent and once as a future record. If both readings still feel proportionate and clear, the wording is usually in a safer place.",
      ],
    },
  ];
}

function buildEmailExamples(theme: string, detail: string): ExampleBlock[] {
  return [
    {
      title: "Calm factual opener",
      intro: `Use this when ${theme} needs a clear opening line without heat or defensiveness.`,
      example: `Thank you for your message. I wanted to reply clearly about ${theme}. Based on what I have seen in class, the main concern is [insert factual concern]. I wanted to share that now so we can respond in a calm and practical way together.`,
      note: "This works because it moves straight to the verified issue instead of rehearsing emotion.",
    },
    {
      title: "Support-first version",
      intro: `Use this when ${detail} means the family may need reassurance as well as clarity.`,
      example: `I wanted to update you about [student name] because we have noticed [insert observed issue]. We are supporting this in school through [insert strategy], and I wanted to share that with you so home and school feel aligned rather than separate.`,
      note: "This version is useful when you need warmth and professional clarity in the same short message.",
    },
    {
      title: "Boundary with next step",
      intro: "Use this when the wording needs to stay firm but not sharp.",
      example: `I appreciate you taking the time to raise this. From our side, the key issue remains [insert fact]. The next step I suggest is [call, meeting, follow-up check] so we can respond constructively and make sure expectations are clear going forward.`,
      note: "The strength here is the next step. It gives the message direction and stops the draft drifting into argument.",
    },
    {
      title: "Parents' evening follow-up",
      intro:
        "Use this when you need a short written version of a conversation you have already had.",
      example: `Thank you for speaking with me today. To summarise, we discussed [insert main point], agreed that we would focus on [insert support or target], and will review how this is going after [insert timeframe]. Please do get in touch if a short follow-up call would help.`,
      note: "This keeps the paper trail tidy and avoids vague rehashing of the whole meeting.",
    },
    {
      title: "Shorter record-safe version",
      intro:
        "Use this when the wording may later be logged or reviewed by SLT.",
      example: `I am writing to confirm that I contacted home regarding [insert issue]. I outlined the concern, shared the school response so far, and invited a follow-up discussion so that next steps can be agreed clearly.`,
      note: "This version is cleaner for documentation and protects the teacher from adding more emotion than the record needs.",
    },
  ];
}

function buildReportExamples(
  studentType: StudentType,
  subject: Subject,
  yearGroup: YearGroup,
): ExampleBlock[] {
  return [
    {
      title: "Balanced progress comment",
      intro: `Use this as a starting point for ${studentType.label} in ${subject.label}.`,
      example: `[Student] has made steady progress in ${subject.label} this term. In ${yearGroup.label}, [student] is strongest when lessons provide clear structure and opportunities to revisit key ideas. The next step is to build confidence and consistency so that this progress becomes more secure across everyday classroom work.`,
      note: "This keeps the tone balanced and avoids empty praise while still sounding encouraging.",
    },
    {
      title: "Honest but warm comment",
      intro:
        "Use this when the pupil profile needs candour without sounding bleak.",
      example: `[Student] is capable of stronger outcomes in ${subject.label} and has shown this in moments of focused effort. At present, progress can still be uneven, particularly when routines or organisation slip. Continued support with clear expectations should help [student] make more consistent progress next term.`,
      note: "This works well for comments that need honesty about habits as well as attainment.",
    },
    {
      title: "Support-focused wording",
      intro: `Use this when ${studentType.supportAngle}.`,
      example: `[Student] responds positively to the support structures used in ${subject.label}, including clear modelling, staged tasks, and regular encouragement. With these in place, [student] is increasingly able to contribute with more confidence and sustain effort for longer.`,
      note: "This is especially helpful for SEN, EAL, attendance-return, and confidence-related profiles.",
    },
    {
      title: "Clear next-step comment",
      intro:
        "Use this when the report needs one realistic area for development.",
      example: `The main next step for [student] in ${subject.label} is to develop greater independence in routine tasks and to apply feedback more consistently. Doing this should help [student] build on the strengths already shown this year.`,
      note: "Keeping the next step singular often sounds more purposeful than listing three targets.",
    },
    {
      title: "Parents' evening friendly version",
      intro:
        "Use this when the comment is likely to feed a later conversation with home.",
      example: `[Student] has positive strengths in ${subject.label}, particularly in ${subject.signal}. Where progress is less secure, we will continue working on confidence, consistency, and independent application so that the gains made this term carry forward more strongly next term.`,
      note: "This version is easier to stand behind later because it stays measured and specific.",
    },
  ];
}

function buildDocumentationExamples(theme: string): ExampleBlock[] {
  return [
    {
      title: "Contact log entry",
      intro: `Use this when ${theme} needs to sit clearly in a school record.`,
      example: `Contacted parent on [date] regarding [issue]. Shared factual summary of concern, outlined actions already taken in school, and invited follow-up conversation regarding next steps.`,
      note: "This logs the communication without replaying the whole emotional thread.",
    },
    {
      title: "Escalation note for SLT",
      intro:
        "Use this when a pastoral or SLT colleague needs the situation in one glance.",
      example: `Home contact completed regarding [issue]. Parent response was [brief factual note]. Concern remains active due to [brief impact]. Recommend continued monitoring and agreed follow-up by [date].`,
      note: "This keeps the log factual, proportionate, and easy for colleagues to use.",
    },
    {
      title: "Neutral follow-up summary",
      intro: "Use this after a difficult call or meeting.",
      example: `Follow-up summary sent to parent after discussion. Confirmed main concern, restated school expectations, and noted agreed support actions. No additional claims or unverified details included.`,
      note: "This is safer than trying to recreate every line of the conversation.",
    },
    {
      title: "Behaviour chronology note",
      intro: "Use this when pattern matters more than one isolated incident.",
      example: `Pattern noted across [timeframe], including [brief factual examples]. Parent contact completed to share concern and request support with routines. Review point agreed for [date or period].`,
      note: "This helps when the problem is cumulative and the wording must show proportion without drama.",
    },
    {
      title: "Pastoral handover note",
      intro: "Use this when another colleague may need the record later.",
      example: `Handover note: parent contact completed regarding [issue]. Current school position and next steps explained. Further action requested only if concern continues or parent requests meeting.`,
      note: "This protects the teacher from writing a long, emotionally coloured note that is harder to reuse later.",
    },
  ];
}

function buildComparisonExamples(
  competitor: Competitor,
  useCase: AlternativeUseCase,
): ExampleBlock[] {
  return [
    {
      title: "When a focused product helps more",
      intro: `Use this lens when comparing ${competitor.label} with Zaza Draft for ${useCase.label}.`,
      example: `If the main task is one sensitive parent email, many teachers do not need a broad dashboard. They need a calmer first draft that is easier to trust, review, and send without extra emotional clean-up.`,
      note: "This frames the comparison around fit rather than broad superiority.",
    },
    {
      title: "What teachers often want from the draft",
      intro:
        "Use this as a comparison talking point in copy or sales conversations.",
      example: `Teachers often want wording that already feels school-ready, conservative, and easy to edit. They do not always want to prompt a general tool repeatedly just to reach a tone that feels safe.`,
      note: "This is fair because it describes a workflow preference, not a legal or performance claim.",
    },
    {
      title: "Parent-email example lens",
      intro:
        "Use this when the comparison centres on difficult parent communication.",
      example: `For angry-parent replies, the advantage of a more focused co-writer is the calmer starting tone, clearer structure, and stronger emphasis on teacher review before anything is used.`,
      note: "This keeps the value proposition aligned with Zaza Draft's teacher-first positioning.",
    },
    {
      title: "Report-comment example lens",
      intro:
        "Use this when the comparison is about report comments rather than broad teaching workflows.",
      example: `For report comments, a focused writing tool can help teachers move faster without flattening nuance. The real test is whether the draft still sounds like something the teacher would stand behind at parents' evening.`,
      note: "This comparison language stays factual and centred on teacher judgement.",
    },
    {
      title: "Calm CTA bridge",
      intro:
        "Use this as the softer conversion bridge at the end of a comparison page.",
      example: `If you want a dedicated writing co-pilot for parent emails, report comments, and other tone-sensitive school writing, try Zaza Draft and see whether the calmer workflow feels like a better fit.`,
      note: "This invites action without sounding pushy or legal-risky.",
    },
  ];
}

function buildExamplesByType(
  type: "email" | "report" | "documentation",
  theme: string,
  detail: string,
  studentType?: StudentType,
  subject?: Subject,
  yearGroup?: YearGroup,
) {
  if (type === "report" && studentType && subject && yearGroup) {
    return buildReportExamples(studentType, subject, yearGroup);
  }
  if (type === "documentation") {
    return buildDocumentationExamples(theme);
  }
  return buildEmailExamples(theme, detail);
}

function buildHubPage(hub: HubDefinition): ProgrammaticPageData {
  return withWordCount({
    kind: "hub",
    path: `/${hub.slug}`,
    title: `${hub.h1} | Zaza Draft`,
    metaDescription: `Explore ${hub.keyword} pages from Zaza Draft with calm, professional examples, FAQ, internal links, and teacher-first writing support.`,
    h1: hub.h1,
    keyword: hub.keyword,
    intent: hub.intent,
    heroEyebrow: hub.heroEyebrow,
    heroDescription: hub.intro,
    heroBullets: [
      "High-intent teacher pages organised by pain point",
      "Editable wording examples and FAQ on every page",
      "Calm CTA into Zaza Draft when you need a custom version",
    ],
    featuredSnippet: `${hub.keyword} pages work best when they solve a specific teacher writing problem, give a clear answer fast, and still leave judgement with the teacher. This cluster is built for that exact use case.`,
    sections: buildCommonSections(
      hub.keyword,
      "the wording itself has become the workload",
    ),
    examples: hub.cards.slice(0, 5).map((card) => ({
      title: card.label,
      intro:
        "Use this path when the search problem feels closest to this situation.",
      example: `${card.label}: ${card.description}`,
      note: `Open ${card.href} when you want a more specific page with editable examples and a calmer workflow.`,
    })),
    faq: buildFaqBlock(
      hub.keyword,
      "the wording itself has become the workload",
    ),
    internalLinks: hub.cards,
    trustItems: baseTrustItems(),
    testimonialPlaceholders: baseTestimonials(hub.keyword),
    cta: baseCta(hub.keyword),
    howToSteps: baseHowToSteps(hub.keyword),
    articleSummary: `${hub.h1} hub page with scenario-led internal links, editable examples, and a calm conversion path into Zaza Draft.`,
    breadcrumbOverrides: { [`/${hub.slug}`]: hub.h1 },
  });
}

function buildScenarioPage(
  type: ScenarioType,
  context: ScenarioContext,
): ProgrammaticPageData {
  const theme = `${type.label} communication for ${context.label}`;
  const path = `/scenario/${type.slug}/${context.slug}`;
  return withWordCount({
    kind: "scenario",
    path,
    title: `${formatSlugLabel(type.slug)} for ${context.label} | Zaza Draft`,
    metaDescription: `Get calmer teacher wording for ${type.label} in ${context.label}. Real examples, professional tone guidance, FAQ, and a teacher-first path into Zaza Draft.`,
    h1: `${formatSlugLabel(type.slug)} in ${context.label}`,
    keyword: `${type.label} ${context.label.toLowerCase()} teacher email`,
    intent: "How-to/problem intent",
    heroEyebrow: "Scenario lookup page",
    heroDescription: [
      `${formatSlugLabel(type.slug)} in ${context.label} is the kind of search teachers make when the facts are already clear but the wording still feels risky. In ${context.phase}, ${type.pain}.`,
      `This page gives a calmer structure for ${type.angle}, with examples and trust notes that fit ${context.yearGroup}. Zaza Draft can then help you generate a custom version, but the teacher keeps full control.`,
    ],
    heroBullets: [
      `Built for ${context.yearGroup} and ${context.phase}`,
      "Editable parent-email and school-record examples",
      "Professional tone with teacher control preserved",
    ],
    featuredSnippet: `For ${type.label} in ${context.label}, the safest approach is to keep the wording factual, proportionate, and clear about the next step. A teacher-first draft should explain the concern, avoid loaded assumptions, and still leave room for a workable relationship with home.`,
    sections: [
      ...buildCommonSections(theme, context.detail),
      {
        title: `What changes in ${context.label}`,
        paragraphs: [
          `${context.label} adds its own pressure to the wording. ${context.detail}. That means the draft needs to sound as if a thoughtful teacher wrote it, not as if a generic AI tool guessed the mood.`,
          "In practice, that often means shorter sentences, less speculation, and a more explicit next step. It also means keeping language suitable for parents' evening follow-up, safeguarding context, or a future SLT conversation if the issue grows.",
        ],
        bullets: [
          context.yearGroup,
          context.phase,
          "Keep emotional temperature low",
        ],
      },
    ],
    examples: buildEmailExamples(theme, context.detail),
    faq: buildFaqBlock(theme, context.detail),
    internalLinks: buildInternalLinks(
      {
        href: `/${SCENARIO_HUB}`,
        label: "Parent email scenarios hub",
        description:
          "Return to the hub to browse adjacent parent-email scenarios.",
      },
      [
        {
          href: "/how-to-reply/angry-parent-of-year-6-pupil",
          label: "How to reply to an angry parent",
          description:
            "Use this if the scenario has already turned into a difficult reply thread.",
        },
        {
          href: "/parent-email-template-primary-school",
          label: "Parent email template for primary school",
          description:
            "A broader template page for everyday school-home communication.",
        },
        {
          href: "/what-to-say-to-parents-of-year-3-student-struggling-in-reading",
          label: "What to say to parents about reading concerns",
          description:
            "A combination page for more supportive wording around progress.",
        },
        {
          href: "/teacher-parent-communication-hub",
          label: "Teacher parent communication hub",
          description:
            "The wider cluster for tone-sensitive parent communication.",
        },
        {
          href: "/products/draft",
          label: "Try Zaza Draft",
          description:
            "Generate a custom version in the teacher-first writing co-writer.",
        },
      ],
    ),
    trustItems: baseTrustItems(),
    testimonialPlaceholders: baseTestimonials(theme),
    cta: baseCta(theme),
    howToSteps: baseHowToSteps(theme),
    articleSummary: `Scenario page for ${type.label} in ${context.label}, with calmer teacher examples, FAQ, and a clear path into Zaza Draft.`,
    breadcrumbOverrides: {
      "/scenario": "Scenario pages",
      [path]: `${formatSlugLabel(type.slug)} in ${context.label}`,
    },
  });
}

function buildReplyPage(trigger: ReplyTrigger): ProgrammaticPageData {
  const theme = `replying to ${trigger.label}`;
  const path = `/how-to-reply/${trigger.slug}`;
  return withWordCount({
    kind: "how-to-reply",
    path,
    title: `How to Reply to ${formatSlugLabel(trigger.slug)} | Zaza Draft`,
    metaDescription: `How to reply to ${trigger.label} with calmer, professional teacher wording. Includes examples, FAQ, and a focused path into Zaza Draft.`,
    h1: `How to reply to ${trigger.label}`,
    keyword: `how to reply to ${trigger.slug.replace(/-/g, " ")}`,
    intent: "How-to/problem intent",
    heroEyebrow: "How-to reply page",
    heroDescription: [
      `Late-night dread of replying to ${trigger.label}? This is where tone becomes the real workload. ${trigger.context}.`,
      `This page gives you a calmer structure for the reply, sample wording you can edit, and reminders about boundaries, records, and next steps. Zaza Draft helps with the first draft, but the teacher stays in control.`,
    ],
    heroBullets: [
      "Direct answer in the first screen",
      "Editable de-escalation examples",
      "Designed for teachers, not generic chat prompts",
    ],
    featuredSnippet: `To reply to ${trigger.label} calmly, acknowledge the concern without mirroring the emotion, state only the key verified facts, and end with one practical next step. The aim is to lower the temperature while keeping professional clarity intact.`,
    sections: [
      ...buildCommonSections(theme, trigger.context),
      {
        title: `What a better reply looks like for ${trigger.label}`,
        paragraphs: [
          "A stronger reply is usually shorter than the draft teachers first write when they are upset. It does not rebut every accusation. Instead, it names the concern, clarifies the facts, and moves the conversation towards something useful.",
          `For this situation, the next step is usually to ${trigger.nextStep}. That makes the reply feel purposeful rather than emotionally unfinished.`,
        ],
        bullets: [
          "Acknowledge without over-apologising",
          "State the facts you can verify",
          "Offer one clear next step",
        ],
      },
    ],
    examples: buildEmailExamples(theme, trigger.context),
    faq: buildFaqBlock(theme, trigger.context),
    internalLinks: buildInternalLinks(
      {
        href: `/${HOW_TO_REPLY_HUB}`,
        label: "How-to-reply hub",
        description:
          "Return to the hub for more parent-reply scenarios and reply templates.",
      },
      [
        {
          href: "/how-to-reply-to-an-angry-parent-email",
          label: "How to reply to an angry parent email",
          description:
            "The flagship difficult-reply page with a four-step framework.",
        },
        {
          href: "/reduce-stress-parent-messages",
          label: "Reduce stress from parent messages",
          description:
            "Practical advice if the inbox is draining energy before the drafting starts.",
        },
        {
          href: "/alternatives/generic-ai/angry-parent-replies",
          label: "Zaza Draft vs generic AI for angry parent replies",
          description:
            "Compare why a focused workflow can feel safer than a broad AI tool.",
        },
        {
          href: "/how-to-document-parent-contact-for-slt-when-behaviour-is-escalating",
          label: "Document parent contact for SLT",
          description:
            "Helpful if the reply chain may need a record-safe follow-up note.",
        },
        {
          href: "/products/draft",
          label: "Try Zaza Draft",
          description:
            "Generate a custom version with teacher control preserved.",
        },
      ],
    ),
    trustItems: baseTrustItems(),
    testimonialPlaceholders: baseTestimonials(theme),
    cta: baseCta(theme),
    howToSteps: [
      {
        name: "Pause and separate fact from emotion",
        text: "Write down the verified issue before drafting anything.",
      },
      {
        name: "Choose the clearest opener",
        text: "Acknowledge the parent's concern without adopting the same tone.",
      },
      {
        name: "State the school-ready facts",
        text: "Keep the explanation concise and suitable for colleagues, SLT, or future follow-up.",
      },
      {
        name: "End with one practical next step",
        text: "Offer a call, meeting, review point, or agreed action so the thread moves somewhere useful.",
      },
    ],
    articleSummary: `How-to reply page for ${trigger.label}, with de-escalation wording, trust signals, FAQ, and a calm CTA into Zaza Draft.`,
    breadcrumbOverrides: {
      "/how-to-reply": "How to reply",
      [path]: `How to reply to ${trigger.label}`,
    },
  });
}

function buildReportPage(
  studentType: StudentType,
  subject: Subject,
  yearGroup: YearGroup,
): ProgrammaticPageData {
  const theme = `report comments for ${studentType.label} in ${subject.label} for ${yearGroup.label}`;
  const path = `/report-comments/${studentType.slug}/${subject.slug}/${yearGroup.slug}`;
  return withWordCount({
    kind: "report-comments",
    path,
    title: `Report Comments for ${formatSlugLabel(studentType.slug)} in ${subject.label} ${yearGroup.label} | Zaza Draft`,
    metaDescription: `Report comments for ${studentType.label} in ${subject.label} for ${yearGroup.label}. Calm, honest, UK-school-ready examples with FAQ and teacher-first guidance from Zaza Draft.`,
    h1: `Report comments for ${studentType.label} in ${subject.label} for ${yearGroup.label}`,
    keyword: `report comments ${studentType.label} ${subject.label} ${yearGroup.label}`,
    intent: "Template intent",
    heroEyebrow: "Student context page",
    heroDescription: [
      `Need report comments for ${studentType.label} in ${subject.label} for ${yearGroup.label} and want the wording to sound balanced rather than generic? This is the kind of search teachers make when one comment keeps taking twenty minutes because the tone has to carry honesty, warmth, and judgement together.`,
      `This page gives editable report-comment examples written with ${yearGroup.label} and ${subject.label} in mind. The examples stay calm, specific, and school-ready. Zaza Draft can then help you generate a custom version while you keep full control.`,
    ],
    heroBullets: [
      `${yearGroup.label} and ${subject.label} specific examples`,
      "Respectful wording with clear next steps",
      "Parents' evening and record-safe tone",
    ],
    featuredSnippet: `A strong report comment for ${studentType.label} in ${subject.label} for ${yearGroup.label} should name genuine strengths, describe the main barrier clearly, and offer one realistic next step in language that is respectful, specific, and easy to stand behind later.`,
    sections: [
      ...buildCommonSections(theme, studentType.challenge),
      {
        title: `What changes in ${subject.label} for ${yearGroup.label}`,
        paragraphs: [
          `${subject.label} brings its own signal here: ${subject.signal}. In ${yearGroup.label}, ${yearGroup.signal}. That makes it worth using wording that sounds grounded in actual classroom evidence rather than generic report filler.`,
          "A better report comment usually has one clear strength, one accurate concern, and one realistic next step. That is often enough to feel both helpful to parents and defensible for the teacher.",
        ],
        bullets: [
          studentType.supportAngle,
          subject.signal,
          `${yearGroup.label} - ${yearGroup.phase}`,
        ],
      },
    ],
    examples: buildExamplesByType(
      "report",
      theme,
      studentType.challenge,
      studentType,
      subject,
      yearGroup,
    ),
    faq: buildFaqBlock(theme, studentType.challenge),
    internalLinks: buildInternalLinks(
      {
        href: `/${REPORT_COMMENTS_HUB}`,
        label: "Report comments hub",
        description:
          "Return to the report-comments hub for related pupil profiles and subjects.",
      },
      [
        {
          href: "/ai-for-student-reports",
          label: "AI for student reports",
          description:
            "The broader Zaza page for report-writing workflows and teacher-first AI support.",
        },
        {
          href: "/positive-honest-report-comment-combinations-for-sen-pupils",
          label: "Positive honest report comment combinations for SEN pupils",
          description:
            "A combination page for more support-focused report wording.",
        },
        {
          href: "/report-writing-help-secondary-school-ks4",
          label: "Report writing help for secondary school KS4",
          description:
            "Useful if you want broader report-writing help beyond this specific profile.",
        },
        {
          href: "/alternatives/teachmate/report-comments",
          label: "Zaza Draft vs TeachMate for report comments",
          description:
            "Compare the report-writing fit if you are evaluating alternatives.",
        },
        {
          href: "/products/draft",
          label: "Try Zaza Draft",
          description:
            "Generate a custom report comment draft while keeping teacher control.",
        },
      ],
    ),
    trustItems: baseTrustItems(),
    testimonialPlaceholders: baseTestimonials(theme),
    cta: baseCta(theme),
    howToSteps: [
      {
        name: "Start from specific evidence",
        text: "Use notes you can stand behind rather than generic praise lines or inflated language.",
      },
      {
        name: "Balance strength and barrier",
        text: "Name one truthful strength and one genuine barrier so the comment feels fair rather than bland.",
      },
      {
        name: "Keep the next step realistic",
        text: "A single practical target often reads more professionally than a list of loose aspirations.",
      },
      {
        name: "Review as if it will be discussed later",
        text: "Read the comment once with parents' evening in mind and once as a formal school record.",
      },
    ],
    articleSummary: `Report-comment page for ${studentType.label} in ${subject.label} for ${yearGroup.label}, with editable examples, FAQ, and a teacher-first CTA into Zaza Draft.`,
    breadcrumbOverrides: {
      "/report-comments": "Report comments",
      [path]: `${studentType.label} in ${subject.label} for ${yearGroup.label}`,
    },
  });
}

function buildAlternativePage(
  competitor: Competitor,
  useCase: AlternativeUseCase,
): ProgrammaticPageData {
  const theme = `${competitor.label} comparison for ${useCase.label}`;
  const path = `/alternatives/${competitor.slug}/${useCase.slug}`;
  return withWordCount({
    kind: "alternative",
    path,
    title: `${competitor.label} Alternative for ${formatSlugLabel(useCase.slug)} | Zaza Draft`,
    metaDescription: `Fair comparison of ${competitor.label} and Zaza Draft for ${useCase.label}. See where a more focused, calmer teacher-writing workflow may fit better.`,
    h1: `${competitor.label} alternative for ${useCase.label}`,
    keyword: `${competitor.label.toLowerCase()} alternative for ${useCase.label}`,
    intent: "Alternative/comparison intent",
    heroEyebrow: "Alternative page",
    heroDescription: [
      `Looking for a ${competitor.label} alternative for ${useCase.label}? Most teachers searching this are not asking for more features. They are asking for a calmer fit, less clutter, and wording they can trust more quickly.`,
      `${competitor.label} is ${competitor.neutralSummary}. Zaza Draft is designed specifically for teacher writing tasks where tone matters. If your real pain point is ${useCase.audiencePain}, the narrower workflow may simply fit better.`,
    ],
    heroBullets: [
      "Fair, factual comparison language",
      "Focused on tone, safety, and teacher control",
      "Built around parent emails, report comments, and school writing",
    ],
    featuredSnippet: `If you want a ${competitor.label} alternative for ${useCase.label}, the main reason to choose Zaza Draft is focus. It is built for teachers who want a calmer, more writing-specific workflow rather than a broader platform experience.`,
    sections: [
      ...buildCommonSections(theme, useCase.audiencePain),
      {
        title: `${competitor.label} is broader. Zaza Draft is more focused.`,
        paragraphs: [
          `This is not a claim that one tool is universally better. ${competitor.label} can be useful for many teachers. The question here is fit. If the real issue is ${useCase.label}, a focused writing workflow can feel calmer and more trustworthy than a wider product.`,
          `That matters most when ${useCase.audiencePain}. In those moments, less clutter and more writing quality can be more useful than breadth.`,
        ],
      },
    ],
    examples: buildComparisonExamples(competitor, useCase),
    faq: [
      ...buildFaqBlock(theme, useCase.audiencePain),
      {
        question: `Is Zaza Draft better than ${competitor.label} for every teaching task?`,
        answer:
          "No. This page is about fit for writing-led tasks where tone matters most. A broader product may still suit teachers who want many tools in one place.",
      },
    ],
    internalLinks: buildInternalLinks(
      {
        href: `/${ALTERNATIVES_HUB}`,
        label: "Alternatives hub",
        description:
          "Browse more fair comparison pages for teacher writing workflows.",
      },
      [
        {
          href: "/best-ai-writing-tools-for-teachers-2025",
          label: "Best AI writing tools for teachers 2025",
          description:
            "See the broader landscape before deciding whether a focused tool fits you better.",
        },
        {
          href: "/products/draft",
          label: "How Zaza Draft works",
          description:
            "Explore the dedicated teacher-writing co-writer behind this comparison.",
        },
        {
          href: "/reduce-stress-parent-messages",
          label: "Reduce stress from parent messages",
          description:
            "Useful if the deeper pain is emotional drag from communication, not just tool comparison.",
        },
        {
          href: "/ai-for-student-reports",
          label: "AI for student reports",
          description:
            "Helpful if you are comparing report-writing workflows specifically.",
        },
        {
          href: "/teacher-parent-communication-hub",
          label: "Teacher parent communication hub",
          description:
            "The wider cluster for parent communication and tone-sensitive teacher writing.",
        },
      ],
    ),
    trustItems: baseTrustItems(),
    testimonialPlaceholders: baseTestimonials(theme),
    cta: baseCta(theme),
    howToSteps: [
      {
        name: "Start with the real pain point",
        text: "Decide whether you need a broad platform or a more focused writing co-pilot.",
      },
      {
        name: "Compare workflow fit",
        text: "Look at how quickly each tool helps you reach wording you would actually send.",
      },
      {
        name: "Check tone and control",
        text: "Prioritise tools that preserve teacher judgement and make review feel easier, not harder.",
      },
      {
        name: "Trial the narrowest relevant option",
        text: "If the pain point is mostly parent emails or report comments, a focused test often gives a cleaner answer.",
      },
    ],
    articleSummary: `Alternative page comparing ${competitor.label} with Zaza Draft for ${useCase.label}, with fair comparison language, examples, FAQ, and a calm CTA.`,
    comparisonMatrix: {
      title: `${competitor.label} and Zaza Draft for ${useCase.label}`,
      intro: `${competitor.label} is ${competitor.neutralSummary}. Zaza Draft is more focused on teacher writing tasks where tone matters.`,
      alternativeLabel: competitor.label,
      rows: [
        {
          label: "Scope",
          zaza: "Focused teacher writing co-writer",
          alternative: competitor.neutralSummary,
        },
        {
          label: "Parent communication sensitivity",
          zaza: "Built for calm, professional, school-ready wording",
          alternative:
            "Depends more on the wider product flow and teacher shaping",
        },
        {
          label: "Teacher control",
          zaza: "Review-led drafting with teacher approval kept central",
          alternative:
            "Teachers still review, but the workflow is not as narrowly writing-led",
        },
        {
          label: "Best fit",
          zaza: useCase.betterFit,
          alternative:
            "Better if you want a broader toolset beyond writing-first tasks",
        },
      ],
      note: "The fairest way to read this page is as a fit comparison. The right choice depends on whether you mainly need a focused writing workflow or a broader product.",
    },
    breadcrumbOverrides: {
      "/alternatives": "Alternatives",
      [path]: `${competitor.label} for ${useCase.label}`,
    },
  });
}

function buildSingleSlugPage(page: SingleSlugDefinition): ProgrammaticPageData {
  const path = `/${page.slug}`;
  return withWordCount({
    kind: "single-slug",
    path,
    title: page.title,
    metaDescription: page.metaDescription,
    h1: page.h1,
    keyword: page.keyword,
    intent: page.intent,
    heroEyebrow: "Programmatic landing page",
    heroDescription: [
      `${page.h1} is a high-intent teacher search because the wording itself has become the problem. The teacher usually already knows the issue but does not want to spend another twenty minutes trying to make the tone safe and professional.`,
      `This page gives a calmer structure for ${page.theme}, with editable examples, FAQ, trust signals, and a clean next step into Zaza Draft if you want a custom version without losing control.`,
    ],
    heroBullets: [
      "UK-school-ready wording",
      "Editable examples for tired teachers",
      "Calm conversion into Zaza Draft",
    ],
    featuredSnippet: `For ${page.theme}, the safest approach is to keep the wording factual, proportionate, and review-led. Start with the issue you can verify, keep the tone calm, and make the next step clear enough that the message feels useful rather than emotionally unfinished.`,
    sections: [
      ...buildCommonSections(page.theme, page.audiencePain),
      {
        title: `Why ${page.theme} needs more than a generic AI draft`,
        paragraphs: [
          `Teachers usually search for ${page.keyword} when they want a much closer starting point than a blank chat box can offer. ${page.audiencePain}.`,
          "That is why the page focuses on real school wording, teacher control, and the kinds of examples that can still hold up in parents' evening follow-up, behaviour logs, or report-season conversations.",
        ],
      },
    ],
    examples: buildExamplesByType(
      page.exampleType,
      page.theme,
      page.audiencePain,
    ),
    faq: buildFaqBlock(page.theme, page.audiencePain),
    internalLinks: buildInternalLinks(
      {
        href: "/scenario-builder",
        label: "Scenario builder hub",
        description:
          "Browse more combination pages for specific teacher writing problems.",
      },
      [
        {
          href: "/parent-email-scenarios",
          label: "Parent email scenarios",
          description:
            "The main scenario lookup hub for difficult parent communication.",
        },
        {
          href: "/report-comments",
          label: "Report comments hub",
          description:
            "Use this if the broader need is report-comment support across pupil profiles.",
        },
        {
          href: "/alternatives",
          label: "Alternatives hub",
          description:
            "Compare Zaza Draft with broader AI tools if you are evaluating options.",
        },
        {
          href: "/products/draft",
          label: "Try Zaza Draft",
          description:
            "Generate a custom version while keeping teacher control central.",
        },
        {
          href: "/teacher-parent-communication-hub",
          label: "Teacher parent communication hub",
          description:
            "The wider teacher-first cluster for parent messages and school writing.",
        },
      ],
    ),
    trustItems: baseTrustItems(),
    testimonialPlaceholders: baseTestimonials(page.theme),
    cta: baseCta(page.theme),
    howToSteps: baseHowToSteps(page.theme),
    articleSummary: `${page.h1} page with editable teacher examples, FAQ, internal links, and a calm CTA into Zaza Draft.`,
    breadcrumbOverrides: { [path]: page.h1 },
  });
}

function buildFutureCategoryPage(
  page: FutureCategoryPage,
): ProgrammaticPageData {
  const path = `/${page.category}/${page.slugParts.join("/")}`;
  return withWordCount({
    kind: "future-category",
    path,
    title: page.title,
    metaDescription: page.metaDescription,
    h1: page.h1,
    keyword: page.keyword,
    intent: page.intent,
    heroEyebrow: "Future expansion route",
    heroDescription: [
      `${page.h1} is part of the future expansion layer for Zaza Draft's programmatic SEO system. It is designed for more specific searches that emerge once the core hubs are established.`,
      `Even in future-expansion routes, the rules stay the same: calm teacher-first copy, useful examples, and clear teacher control over every final word.`,
    ],
    heroBullets: [
      "Future category architecture already wired",
      "Quality rules carried over from the main cluster",
      "Ready for long-tail expansion without thin content",
    ],
    featuredSnippet: `This future-category page exists to support deeper long-tail expansion only where the wording problem is genuinely distinct. Zaza Draft keeps the same teacher-first, review-led approach in every route family.`,
    sections: buildCommonSections(page.theme, page.audiencePain),
    examples: buildExamplesByType(
      page.exampleType,
      page.theme,
      page.audiencePain,
    ),
    faq: buildFaqBlock(page.theme, page.audiencePain),
    internalLinks: buildInternalLinks(
      {
        href: "/scenario-builder",
        label: "Scenario builder hub",
        description:
          "Use the main scenario-builder hub to navigate the most useful combination pages first.",
      },
      [
        {
          href: "/parent-email-scenarios",
          label: "Parent email scenarios",
          description:
            "Helpful if the problem is still best solved through the main scenario lookup system.",
        },
        {
          href: "/report-comments",
          label: "Report comments",
          description:
            "Useful when the future category overlaps more strongly with report writing.",
        },
        {
          href: "/alternatives",
          label: "Alternatives",
          description:
            "Helpful if the visitor is comparing workflow fit rather than reading examples.",
        },
        {
          href: "/products/draft",
          label: "Try Zaza Draft",
          description:
            "Move from the example page into a custom teacher-edited draft.",
        },
        {
          href: "/teacher-parent-communication-hub",
          label: "Teacher parent communication hub",
          description: "The wider cluster for tone-sensitive school writing.",
        },
      ],
    ),
    trustItems: baseTrustItems(),
    testimonialPlaceholders: baseTestimonials(page.theme),
    cta: baseCta(page.theme),
    howToSteps: baseHowToSteps(page.theme),
    articleSummary: `${page.h1} future-category page, kept within the same teacher-first quality rules as the main cluster.`,
    breadcrumbOverrides: {
      [`/${page.category}`]: formatSlugLabel(page.category),
      [path]: page.h1,
    },
  });
}

function prioritiseValues<T extends { slug: string }>(
  values: T[],
  prioritySlugs: readonly string[],
) {
  const order = new Map(prioritySlugs.map((slug, index) => [slug, index]));

  return [...values].sort((left, right) => {
    const leftOrder = order.get(left.slug) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = order.get(right.slug) ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.slug.localeCompare(right.slug);
  });
}

function createKeywordTemplate(
  keyword: string,
  path: string,
  intent: SearchIntent,
  notes: string,
): KeywordTemplate {
  return {
    keyword,
    path,
    intent,
    priority: 0,
    notes,
  };
}

function dedupeKeywordTemplates(templates: KeywordTemplate[]) {
  return Array.from(
    new Map(templates.map((template) => [template.path, template])).values(),
  );
}

function buildScenarioKeyword(type: ScenarioType, context: ScenarioContext) {
  const contextLabel = context.label.toLowerCase();

  switch (type.slug) {
    case "angry-parent":
      return `how to reply to an angry parent about ${contextLabel}`;
    case "behaviour-issue":
      return `parent email about behaviour issue in ${contextLabel}`;
    case "sen-child":
      return `parent email for SEN pupil ${contextLabel}`;
    case "struggling-reader":
      return `parent email about struggling reader in ${contextLabel}`;
    case "missing-homework":
      return `parent email about missing homework in ${contextLabel}`;
    case "attendance":
      return `attendance concern email for ${contextLabel}`;
    case "friendship-fallout":
      return `parent email about friendship issue in ${contextLabel}`;
    case "revision-stress":
      return `parent email about revision stress in ${contextLabel}`;
    case "parents-evening-follow-up":
      return `parents evening follow up email for ${contextLabel}`;
    case "confidence-drop":
      return `teacher email about confidence drop in ${contextLabel}`;
    case "low-level-disruption":
      return `parent email about low level disruption in ${contextLabel}`;
    case "return-from-absence":
      return `return to school email for ${contextLabel}`;
    default:
      return `parent email about ${type.label} in ${contextLabel}`;
  }
}

const prioritisedScenarioTypes = prioritiseValues(
  Object.values(scenarioTypes),
  [
    "angry-parent",
    "behaviour-issue",
    "sen-child",
    "struggling-reader",
    "missing-homework",
    "attendance",
  ],
);

const prioritisedScenarioContexts = prioritiseValues(
  Object.values(scenarioContexts),
  [
    "year-5-primary",
    "maths-homework-secondary",
    "not-engaging",
    "ks2",
    "year-3-primary",
    "year-7-secondary",
    "ks4-exam-season",
    "ks3-secondary",
    "year-1-primary",
  ],
);

const prioritisedStudentTypes = prioritiseValues(Object.values(studentTypes), [
  "sen-support-needs",
  "struggling-student-behaviour",
  "anxious-eal-pupil",
  "high-attaining-but-disorganised",
  "reluctant-writer",
  "bright-but-inconsistent",
  "attendance-concern",
  "exam-anxious-pupil",
  "behaviour-and-attention-needs",
  "low-attainment-low-confidence",
  "quiet-but-capable",
  "returning-after-absence",
]);

const prioritisedSubjects = prioritiseValues(Object.values(subjects), [
  "english",
  "maths",
  "reading",
  "writing",
  "science",
  "behaviour",
  "attendance",
  "humanities",
  "art",
]);

const prioritisedYearGroups = prioritiseValues(Object.values(yearGroups), [
  "year-6",
  "year-5",
  "year-4",
  "year-3",
  "ks3",
  "year-2",
  "year-1",
]);

const launchScenarioKeywordTemplates = prioritisedScenarioContexts
  .flatMap((context) =>
    prioritisedScenarioTypes.map((type) =>
      createKeywordTemplate(
        buildScenarioKeyword(type, context),
        `/scenario/${type.slug}/${context.slug}`,
        "How-to/problem intent",
        "Scenario lookup page for a specific communication flashpoint where tone and next steps matter.",
      ),
    ),
  )
  .slice(0, 28);

const launchReplyKeywordTemplates = prioritiseValues(
  Object.values(replyTriggers),
  [
    "angry-parent-of-year-6-pupil",
    "parents-dont-respond-to-behaviour-email",
    "grade-complaint-ks3",
    "parent-disagrees-with-behaviour-sanction",
    "homework-detention-complaint-ks4",
    "parents-object-to-reading-intervention",
  ],
).map((trigger) =>
  createKeywordTemplate(
    `how to reply to ${trigger.label}`,
    `/how-to-reply/${trigger.slug}`,
    "How-to/problem intent",
    "Reply page built for urgent parent-facing wording problems that often need a same-day answer.",
  ),
);

const launchReportKeywordTemplates = prioritisedStudentTypes
  .slice(0, 6)
  .flatMap((studentType) =>
    prioritisedSubjects
      .slice(0, 3)
      .flatMap((subject) =>
        prioritisedYearGroups
          .slice(0, 2)
          .map((yearGroup) =>
            createKeywordTemplate(
              `report comments for ${studentType.label} in ${subject.label} ${yearGroup.label}`,
              `/report-comments/${studentType.slug}/${subject.slug}/${yearGroup.slug}`,
              "Template intent",
              "Report-comment page aimed at a distinct pupil profile, subject, and year-group combination.",
            ),
          ),
      ),
  )
  .slice(0, 36);

const launchAlternativeKeywordTemplates = prioritiseValues(
  Object.values(competitors),
  ["chatgpt", "magicschool-ai", "teachmate", "generic-ai"],
).flatMap((competitor) =>
  prioritiseValues(Object.values(alternativeUseCases), [
    "parent-emails",
    "professional-teacher-tone",
    "report-comments",
    "angry-parent-replies",
  ]).map((useCase) =>
    createKeywordTemplate(
      `alternative to ${competitor.label} for ${useCase.label}`,
      `/alternatives/${competitor.slug}/${useCase.slug}`,
      "Alternative/comparison intent",
      "Fair comparison page for teachers evaluating whether a broader product or a focused writing co-writer fits better.",
    ),
  ),
);

const launchSingleSlugKeywordTemplates = Object.values(
  programmaticSingleSlugPages,
)
  .slice(0, 8)
  .map((page) =>
    createKeywordTemplate(
      page.keyword,
      `/${page.slug}`,
      page.intent,
      "Single-slug programmatic landing page for a high-intent teacher wording problem.",
    ),
  );

const launchFutureCategoryKeywordTemplates = futureCategoryPages.map((page) =>
  createKeywordTemplate(
    page.keyword,
    `/${page.category}/${page.slugParts.join("/")}`,
    page.intent,
    "Future expansion route reserved for combinations that prove distinct search demand and conversion value.",
  ),
);

export const first100KeywordTemplates: KeywordTemplate[] =
  dedupeKeywordTemplates([
    ...launchScenarioKeywordTemplates,
    ...launchReplyKeywordTemplates,
    ...launchReportKeywordTemplates,
    ...launchAlternativeKeywordTemplates,
    ...launchSingleSlugKeywordTemplates,
    ...launchFutureCategoryKeywordTemplates,
  ])
    .slice(0, 100)
    .map((template, index) => ({
      ...template,
      priority: 100 - index,
    }));

export function getProgrammaticSeedPaths() {
  return Array.from(
    new Set([
      ...programmaticHubSlugs.map((slug) => `/${slug}`),
      ...programmaticSingleSlugSlugs.map((slug) => `/${slug}`),
      ...seedScenarioParams.map(
        ([type, context]) => `/scenario/${type}/${context}`,
      ),
      ...seedReplyParams.map((trigger) => `/how-to-reply/${trigger}`),
      ...seedReportParams.map(
        ([studentType, subject, yearGroup]) =>
          `/report-comments/${studentType}/${subject}/${yearGroup}`,
      ),
      ...seedAlternativeParams.map(
        ([competitor, useCase]) => `/alternatives/${competitor}/${useCase}`,
      ),
      ...futureCategoryPages.map(
        (page) => `/${page.category}/${page.slugParts.join("/")}`,
      ),
    ]),
  );
}

export function getContentMatrix() {
  const scenarioPages =
    Object.keys(scenarioTypes).length * Object.keys(scenarioContexts).length;
  const reportPages =
    Object.keys(studentTypes).length *
    Object.keys(subjects).length *
    Object.keys(yearGroups).length;
  const alternativePages =
    Object.keys(competitors).length * Object.keys(alternativeUseCases).length;
  const reportMatrixPotential =
    Object.keys(studentTypes).length *
    Object.keys(subjects).length *
    Object.keys(yearGroups).length *
    3;
  const contentMatrixRows: ContentMatrixRow[] = [
    {
      family: "Scenario lookup pages",
      formula: `${Object.keys(scenarioTypes).length} scenario types x ${Object.keys(scenarioContexts).length} contexts`,
      pages: scenarioPages,
      notes:
        "Parent-email scenario pages for behaviour, angry-parent replies, SEN support, attendance, homework, and similar communication stress points.",
    },
    {
      family: "How-to-reply pages",
      formula: `${Object.keys(replyTriggers).length} triggers`,
      pages: Object.keys(replyTriggers).length,
      notes:
        "Urgent reply pages for angry parents, sanction disputes, grade complaints, and other live email chains.",
    },
    {
      family: "Report comments pages",
      formula: `${Object.keys(studentTypes).length} student types x ${Object.keys(subjects).length} subjects x ${Object.keys(yearGroups).length} year groups`,
      pages: reportPages,
      notes:
        "Student-profile report pages designed for honest, calm, school-ready comment writing.",
    },
    {
      family: "Platform and school-phase overlays",
      formula: `${Object.keys(studentTypes).length} x ${Object.keys(subjects).length} x ${Object.keys(yearGroups).length} x 3 school phases`,
      pages: reportMatrixPotential,
      notes:
        "Extended matrix when primary, secondary, and all-through overlays are added to the report-comment system.",
    },
    {
      family: "Alternative pages",
      formula: `${Object.keys(competitors).length} competitors x ${Object.keys(alternativeUseCases).length} use cases`,
      pages: alternativePages,
      notes:
        "Comparison pages for teachers evaluating Zaza Draft against broader or more generic AI tools.",
    },
    {
      family: "Standalone combination pages",
      formula: `${Object.keys(programmaticSingleSlugPages).length} single-slug pages`,
      pages: Object.keys(programmaticSingleSlugPages).length,
      notes:
        "Long-tail landing pages for UK-specific templates, documentation problems, and emotionally difficult writing jobs.",
    },
  ];

  return {
    schoolPhases: ["primary", "secondary", "all-through"],
    scenarioTypes: Object.values(scenarioTypes),
    scenarioContexts: Object.values(scenarioContexts),
    replyTriggers: Object.values(replyTriggers),
    studentTypes: Object.values(studentTypes),
    subjects: Object.values(subjects),
    yearGroups: Object.values(yearGroups),
    competitors: Object.values(competitors),
    alternativeUseCases: Object.values(alternativeUseCases),
    standalonePages: Object.values(programmaticSingleSlugPages),
    futureCategoryPages,
    contentMatrixRows,
    totals: {
      scenarioPages,
      replyPages: Object.keys(replyTriggers).length,
      reportPages,
      alternativePages,
      standalonePages: Object.keys(programmaticSingleSlugPages).length,
      futureCategoryPages: futureCategoryPages.length,
      totalImmediatePages:
        5 +
        scenarioPages +
        Object.keys(replyTriggers).length +
        reportPages +
        alternativePages +
        Object.keys(programmaticSingleSlugPages).length,
      reportMatrixPotential,
    },
  };
}

export function slugToProps(
  input: string | string[],
): ProgrammaticPageData | null {
  const segments = normaliseSegments(input);
  if (segments.length === 1 && hubs[segments[0]])
    return buildHubPage(hubs[segments[0]]);
  if (segments.length === 1 && programmaticSingleSlugPages[segments[0]])
    return buildSingleSlugPage(programmaticSingleSlugPages[segments[0]]);
  if (
    segments[0] === "scenario" &&
    segments.length === 3 &&
    scenarioTypes[segments[1]] &&
    scenarioContexts[segments[2]]
  )
    return buildScenarioPage(
      scenarioTypes[segments[1]],
      scenarioContexts[segments[2]],
    );
  if (
    segments[0] === "how-to-reply" &&
    segments.length === 2 &&
    replyTriggers[segments[1]]
  )
    return buildReplyPage(replyTriggers[segments[1]]);
  if (
    segments[0] === "report-comments" &&
    segments.length === 4 &&
    studentTypes[segments[1]] &&
    subjects[segments[2]] &&
    yearGroups[segments[3]]
  )
    return buildReportPage(
      studentTypes[segments[1]],
      subjects[segments[2]],
      yearGroups[segments[3]],
    );
  if (
    segments[0] === "alternatives" &&
    segments.length === 3 &&
    competitors[segments[1]] &&
    alternativeUseCases[segments[2]]
  )
    return buildAlternativePage(
      competitors[segments[1]],
      alternativeUseCases[segments[2]],
    );
  if (segments.length >= 2) {
    const futurePage = futureCategoryPages.find(
      (page) =>
        page.category === segments[0] &&
        page.slugParts.join("/") === segments.slice(1).join("/"),
    );
    if (futurePage) return buildFutureCategoryPage(futurePage);
  }
  return null;
}

export function generateMetadata(input: string | string[]): Metadata {
  const page = slugToProps(input);
  if (!page) {
    return defaultMetadata({
      title: "Page not found | Zaza Draft",
      description:
        "The requested Zaza Draft programmatic SEO page could not be found.",
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
      "Ofsted",
    ],
  });
}

export function getProgrammaticSitemapEntries(
  lastModified = new Date(),
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const push = (path: string, priority: number) => {
    entries.push({
      url: `https://zazadraft.com${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
    });
  };
  Object.keys(hubs).forEach((slug) => push(`/${slug}`, 0.92));
  Object.values(programmaticSingleSlugPages).forEach((page) =>
    push(`/${page.slug}`, 0.88),
  );
  Object.values(scenarioTypes).forEach((type) =>
    Object.values(scenarioContexts).forEach((context) =>
      push(`/scenario/${type.slug}/${context.slug}`, 0.78),
    ),
  );
  Object.values(replyTriggers).forEach((trigger) =>
    push(`/how-to-reply/${trigger.slug}`, 0.82),
  );
  Object.values(studentTypes).forEach((student) =>
    Object.values(subjects).forEach((subject) =>
      Object.values(yearGroups).forEach((year) =>
        push(
          `/report-comments/${student.slug}/${subject.slug}/${year.slug}`,
          0.76,
        ),
      ),
    ),
  );
  Object.values(competitors).forEach((competitor) =>
    Object.values(alternativeUseCases).forEach((useCase) =>
      push(`/alternatives/${competitor.slug}/${useCase.slug}`, 0.8),
    ),
  );
  futureCategoryPages.forEach((page) =>
    push(`/${page.category}/${page.slugParts.join("/")}`, 0.62),
  );
  return entries;
}
