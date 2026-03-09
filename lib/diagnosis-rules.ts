export type SchoolPhase =
  | "primary"
  | "secondary"
  | "ks1"
  | "ks2"
  | "ks3"
  | "ks4"
  | "fe"
  | "other";

export type MainIssue =
  | "angry-parent-email"
  | "parent-ignores-email"
  | "behaviour-concern"
  | "missing-homework"
  | "low-attainment"
  | "sen-support"
  | "grade-complaint"
  | "report-writing-stress"
  | "tone-anxiety"
  | "parents-evening"
  | "documentation-for-slt"
  | "other";

export type StudentContext =
  | "struggling-academically"
  | "behaviour-issues"
  | "anxious-eal"
  | "high-attaining-disorganised"
  | "sen-needs"
  | "other";

export type ToneNeed =
  | "de-escalate"
  | "be-honest-but-kind"
  | "professional-but-empathetic"
  | "quick-reply"
  | "detailed-report"
  | "other";

export type Recommendation = {
  pageSlug: string;
  title: string;
  description: string;
  url: string;
  why: string[];
};

export type DiagnosisInputs = {
  phase: SchoolPhase | "";
  issue: MainIssue | "";
  studentContexts: StudentContext[];
  toneNeeds: ToneNeed[];
  freeText: string;
};

type RecommendationKey =
  | "angry-parent-guide"
  | "angry-parent-scenario-secondary"
  | "angry-parent-reply-year-6"
  | "behaviour-email-guide"
  | "behaviour-scenario-primary"
  | "document-parent-contact-guide"
  | "gdpr-report-writer"
  | "ofsted-friendly-parent-email"
  | "parent-ignore-reply"
  | "parents-evening-templates"
  | "positive-honest-sen-comments"
  | "homework-complaint-reply"
  | "grade-complaint-reply"
  | "slt-documentation-reply"
  | "report-comments-struggling"
  | "report-comments-struggling-behaviour"
  | "report-comments-anxious-eal"
  | "report-comments-high-attaining"
  | "report-comments-sen-maths"
  | "sen-scenario"
  | "struggling-reader-scenario"
  | "teacher-hub"
  | "reply-hub"
  | "report-hub"
  | "parent-email-scenarios-hub"
  | "communication-problems-hub"
  | "report-builder-hub"
  | "uk-communication-hub"
  | "reduce-stress-parent-messages"
  | "scenario-combinations"
  | "draft-product"
  | "best-ai-parent-emails";

type RecommendationTemplate = Omit<Recommendation, "why">;

type DiagnosisRule = {
  id: string;
  priority: number;
  matches: (input: DiagnosisInputs, freeText: string) => boolean;
  recommendations: Array<{
    key: RecommendationKey;
    why: string[];
    score?: number;
  }>;
};

const recommendationLibrary: Record<RecommendationKey, RecommendationTemplate> =
  {
    "angry-parent-guide": {
      pageSlug: "how-to-reply-to-an-angry-parent-email",
      title: "How to Reply to an Angry Parent Email - Calm and Professional",
      description:
        "A practical Zaza Draft guide for teachers who need calm wording when a parent email feels confrontational. It focuses on de-escalation, professional tone, and protecting the relationship without sounding weak or defensive.",
      url: "/how-to-reply-to-an-angry-parent-email",
    },
    "angry-parent-scenario-secondary": {
      pageSlug: "scenario/angry-parent/maths-homework-secondary",
      title: "Angry Parent Scenario - Maths Homework in Secondary",
      description:
        "A focused scenario page for teachers handling secondary parent frustration around homework, tone, and follow-up. Useful when the message needs to stay factual, measured, and school-ready.",
      url: "/scenario/angry-parent/maths-homework-secondary",
    },
    "angry-parent-reply-year-6": {
      pageSlug: "how-to-reply/angry-parent-of-year-6-pupil",
      title: "How to Reply to an Angry Parent of a Year 6 Pupil",
      description:
        "A reply-focused page for emotionally charged parent communication in upper primary, especially where pressure, assessment, or SATs context is part of the situation.",
      url: "/how-to-reply/angry-parent-of-year-6-pupil",
    },
    "behaviour-email-guide": {
      pageSlug: "how-to-write-a-behaviour-email-to-parents",
      title: "How to Write a Behaviour Email to Parents",
      description:
        "A teacher-first guide to writing behaviour emails that sound clear, fair, and professional. Especially useful when you need to explain the issue without sounding harsh, vague, or emotionally drained.",
      url: "/how-to-write-a-behaviour-email-to-parents",
    },
    "behaviour-scenario-primary": {
      pageSlug: "scenario/behaviour-issue/year-5-primary",
      title: "Behaviour Issue Scenario - Year 5 Primary",
      description:
        "A concrete behaviour scenario page for primary teachers who need wording that is calm, proportionate, and easy for parents to understand and respond to constructively.",
      url: "/scenario/behaviour-issue/year-5-primary",
    },
    "document-parent-contact-guide": {
      pageSlug: "how-to-document-parent-contact-for-slt-without-stress",
      title: "How to Document Parent Contact for SLT Without Stress",
      description:
        "A calmer guide for teachers who need factual, professional documentation without spending too long trying to sound precise. Useful when behaviour, safeguarding, or repeated parent contact needs a clear written record.",
      url: "/how-to-document-parent-contact-for-slt-without-stress",
    },
    "gdpr-report-writer": {
      pageSlug: "gdpr-compliant-ai-report-writer-uk-teachers",
      title: "GDPR Compliant AI Report Writer for UK Teachers",
      description:
        "A trust-first page for teachers who need report-writing help that still feels school-safe. It focuses on careful wording, teacher control, and a lower-risk drafting workflow for UK school contexts.",
      url: "/gdpr-compliant-ai-report-writer-uk-teachers",
    },
    "ofsted-friendly-parent-email": {
      pageSlug: "ofsted-friendly-parent-email-examples",
      title: "Ofsted-Friendly Parent Email Examples for Teachers",
      description:
        "Helpful when the wording needs to feel calm, professional, and record-safe. This page is useful for teachers who want examples that sound appropriate in a UK school context without becoming stiff or impersonal.",
      url: "/ofsted-friendly-parent-email-examples",
    },
    "parent-ignore-reply": {
      pageSlug: "how-to-reply/parents-dont-respond-to-behaviour-email",
      title: "How to Reply When Parents Do Not Respond to a Behaviour Email",
      description:
        "Useful when the first message has gone quiet and you need a measured follow-up that keeps the tone professional, reduces friction, and creates a clear next step.",
      url: "/how-to-reply/parents-dont-respond-to-behaviour-email",
    },
    "parents-evening-templates": {
      pageSlug: "parents-evening-email-templates-uk",
      title: "Parents' Evening Email Templates UK",
      description:
        "A practical page for teachers who need calm, professional wording before or after parents' evening. Useful for reminders, follow-up messages, and conversations where tone matters as much as the information itself.",
      url: "/parents-evening-email-templates-uk",
    },
    "positive-honest-sen-comments": {
      pageSlug: "positive-honest-report-comments-sen-students",
      title: "Positive Honest Report Comments for SEN Students",
      description:
        "A report-writing page for teachers who need supportive but accurate wording around SEN needs, classroom progress, and next steps. Useful when the tone needs to stay careful, clear, and grounded.",
      url: "/positive-honest-report-comments-sen-students",
    },
    "homework-complaint-reply": {
      pageSlug: "reply/parent-complaint/homework-not-done",
      title: "How to Respond to a Parent Complaint About Homework Not Done",
      description:
        "A calm reply page for teachers handling homework-related complaints. It helps you acknowledge concern, state the facts, and avoid an email thread that drifts into tension.",
      url: "/reply/parent-complaint/homework-not-done",
    },
    "grade-complaint-reply": {
      pageSlug: "how-to-reply/grade-complaint-ks3",
      title: "How to Reply to a Grade Complaint in KS3",
      description:
        "A practical page for teachers who need to explain marking or outcomes without sounding defensive. Useful when clarity, fairness, and professional tone all matter at once.",
      url: "/how-to-reply/grade-complaint-ks3",
    },
    "slt-documentation-reply": {
      pageSlug: "reply/document-parent-contact/slt-escalating-behaviour",
      title:
        "How to Document Parent Contact for SLT When Behaviour Is Escalating",
      description:
        "For teachers who need clear, factual documentation for SLT while still keeping the wording proportionate. Especially useful when behaviour concerns are becoming a pattern rather than a single incident.",
      url: "/reply/document-parent-contact/slt-escalating-behaviour",
    },
    "report-comments-struggling": {
      pageSlug:
        "positive-but-honest-report-card-comments-for-struggling-students",
      title: "Positive but Honest Report Card Comments for Struggling Students",
      description:
        "A teacher-first report writing page that helps you sound balanced, accurate, and kind when a pupil is finding learning difficult. Useful when honesty matters but you do not want the wording to land badly.",
      url: "/positive-but-honest-report-card-comments-for-struggling-students",
    },
    "report-comments-struggling-behaviour": {
      pageSlug: "report-comments/struggling-student-behaviour/english/year-5",
      title: "Report Comments for a Struggling Student with Behaviour Concerns",
      description:
        "A more specific report-comment page for teachers who need wording that covers both academic struggle and behaviour concerns without sounding punitive or vague. Useful when the comment has to stay honest, professional, and kind.",
      url: "/report-comments/struggling-student-behaviour/english/year-5",
    },
    "report-comments-anxious-eal": {
      pageSlug: "report-comments/anxious-eal-pupil/maths/year-4",
      title: "Report Comments for an Anxious EAL Pupil in Maths",
      description:
        "A more specific report-comment page for teachers who need wording around anxiety, language, progress, and support needs without overreaching or sounding generic.",
      url: "/report-comments/anxious-eal-pupil/maths/year-4",
    },
    "report-comments-high-attaining": {
      pageSlug: "report-comments/high-attaining-but-disorganised/science/ks3",
      title: "Report Comments for a High-Attaining but Disorganised Student",
      description:
        "Helpful when a pupil is capable but inconsistent. This page gives balanced wording for report comments that acknowledge strengths while still naming what needs to improve.",
      url: "/report-comments/high-attaining-but-disorganised/science/ks3",
    },
    "report-comments-sen-maths": {
      pageSlug: "report-comments/sen-support-needs/maths/year-6",
      title: "Report Comments for SEN Support Needs in Maths",
      description:
        "A specific report-writing page for teachers who need wording that is professional, supportive, and careful around SEN needs, progress, and classroom barriers.",
      url: "/report-comments/sen-support-needs/maths/year-6",
    },
    "sen-scenario": {
      pageSlug: "scenario/sen-child/not-engaging",
      title: "SEN Child Not Engaging - Parent Communication Scenario",
      description:
        "A scenario page for sensitive school-home communication when a pupil is not engaging as hoped and the wording needs to stay gentle, factual, and teacher-led.",
      url: "/scenario/sen-child/not-engaging",
    },
    "struggling-reader-scenario": {
      pageSlug: "scenario/struggling-reader/ks2",
      title: "Struggling Reader in KS2 - Parent Communication Scenario",
      description:
        "A reading-focused parent communication page for KS2 teachers who need supportive language around progress concerns without sounding alarming or vague.",
      url: "/scenario/struggling-reader/ks2",
    },
    "teacher-hub": {
      pageSlug: "teacher-parent-communication-hub",
      title: "Teacher Parent Communication Hub",
      description:
        "The main Zaza Draft hub for difficult parent emails, school-home tone problems, and practical teacher wording support. Best when the issue is broad or still unfolding.",
      url: "/teacher-parent-communication-hub",
    },
    "reply-hub": {
      pageSlug: "reply-scenarios",
      title: "Reply Scenarios for Teachers",
      description:
        "A hub for teachers dealing with difficult replies, follow-ups, and behaviour communication that has become tense or time-consuming.",
      url: "/reply-scenarios",
    },
    "report-hub": {
      pageSlug: "report-comments",
      title: "Report Comments Hub",
      description:
        "A broader route into Zaza Draft's report-comment support if your need is wider than one pupil profile or one subject.",
      url: "/report-comments",
    },
    "parent-email-scenarios-hub": {
      pageSlug: "parent-email-scenarios",
      title: "Parent Email Scenarios Hub",
      description:
        "Useful when you want to browse scenario-led parent communication pages before choosing the most accurate fit for your situation.",
      url: "/parent-email-scenarios",
    },
    "communication-problems-hub": {
      pageSlug: "parent-communication-problems",
      title: "Parent Communication Problems for Teachers",
      description:
        "A high-level hub for common parent communication problems, including tone anxiety, behaviour wording, and difficult email follow-up.",
      url: "/parent-communication-problems",
    },
    "report-builder-hub": {
      pageSlug: "report-comment-builder",
      title: "Report Comment Builder for Teachers",
      description:
        "A focused route into report-comment combinations by pupil profile, subject, and year group when the report-writing problem is more specific.",
      url: "/report-comment-builder",
    },
    "uk-communication-hub": {
      pageSlug: "uk-school-communication",
      title: "UK School Communication Templates and Examples",
      description:
        "A useful hub when you need wording that feels appropriate for UK school communication, including parents' evening, Ofsted-conscious tone, and professional documentation.",
      url: "/uk-school-communication",
    },
    "reduce-stress-parent-messages": {
      pageSlug: "reduce-stress-parent-messages",
      title: "Reduce Stress from Parent Messages",
      description:
        "A pain-first page for teachers who are emotionally drained by school-home communication and need calmer routines, wording, and boundaries around parent emails.",
      url: "/reduce-stress-parent-messages",
    },
    "scenario-combinations": {
      pageSlug: "scenario-combinations",
      title: "Scenario Combinations for Teachers",
      description:
        "Helpful when the problem is not one neat category and several concerns overlap, such as behaviour, homework, anxiety, SEN, or tone pressure.",
      url: "/scenario-combinations",
    },
    "draft-product": {
      pageSlug: "products/draft",
      title: "Zaza Draft - Calm Teacher Writing Co-Writer",
      description:
        "The product page for teachers who are ready to move from examples into a custom draft. It explains how Zaza Draft helps with wording while keeping the teacher fully in control.",
      url: "/products/draft",
    },
    "best-ai-parent-emails": {
      pageSlug: "best-ai-tool-parent-emails",
      title: "Best AI Tool for Parent Emails",
      description:
        "Useful when the teacher is comparing options and wants a calmer, more focused parent communication tool rather than a broad generic AI workflow.",
      url: "/best-ai-tool-parent-emails",
    },
  };

export const schoolPhaseOptions: Array<{ value: SchoolPhase; label: string }> =
  [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "ks1", label: "KS1" },
    { value: "ks2", label: "KS2" },
    { value: "ks3", label: "KS3" },
    { value: "ks4", label: "KS4" },
    { value: "fe", label: "FE" },
    { value: "other", label: "Other" },
  ];

export const mainIssueOptions: Array<{ value: MainIssue; label: string }> = [
  { value: "angry-parent-email", label: "Angry parent email" },
  { value: "parent-ignores-email", label: "Parent ignores email" },
  { value: "behaviour-concern", label: "Behaviour concern" },
  { value: "missing-homework", label: "Missing homework" },
  { value: "low-attainment", label: "Low attainment" },
  { value: "sen-support", label: "SEN support" },
  { value: "grade-complaint", label: "Grade complaint" },
  { value: "report-writing-stress", label: "Report writing stress" },
  { value: "tone-anxiety", label: "Tone anxiety" },
  { value: "parents-evening", label: "Parents' evening" },
  { value: "documentation-for-slt", label: "Documentation for SLT" },
  { value: "other", label: "Other" },
];

export const studentContextOptions: Array<{
  value: StudentContext;
  label: string;
}> = [
  { value: "struggling-academically", label: "Struggling academically" },
  { value: "behaviour-issues", label: "Behaviour issues" },
  { value: "anxious-eal", label: "Anxious or EAL" },
  {
    value: "high-attaining-disorganised",
    label: "High attaining but disorganised",
  },
  { value: "sen-needs", label: "SEN needs" },
  { value: "other", label: "Other" },
];

export const toneNeedOptions: Array<{ value: ToneNeed; label: string }> = [
  { value: "de-escalate", label: "De-escalate" },
  { value: "be-honest-but-kind", label: "Be honest but kind" },
  {
    value: "professional-but-empathetic",
    label: "Professional but empathetic",
  },
  { value: "quick-reply", label: "Quick reply" },
  { value: "detailed-report", label: "Detailed report" },
  { value: "other", label: "Other" },
];

export const diagnosisFaqs = [
  {
    question:
      "How do I reply to an angry parent without escalating the situation?",
    answer:
      "Start with the concern they have raised, move to the facts, and finish with the next step. Keep the wording calm, specific, and proportionate. Zaza Draft is designed to help you find that tone while you still edit and approve every word.",
  },
  {
    question: "What if a parent ignores my first behaviour email?",
    answer:
      "A short follow-up that is factual and clear usually works better than a longer second email. If the lack of response affects pupil support, make the next step explicit and document the contact properly.",
  },
  {
    question:
      "Can this diagnosis tool help with report comments as well as parent emails?",
    answer:
      "Yes. It is designed for parent communication, report comments, behaviour notes, and documentation situations where tone and professional judgement matter.",
  },
  {
    question: "Is Zaza Draft a generic AI writer?",
    answer:
      "No. Zaza Draft is a specialised teacher-first co-writer built around school communication, report wording, and safer drafting support. It is not positioned as a broad all-purpose AI platform.",
  },
  {
    question: "Do teachers stay in control of the final message?",
    answer:
      "Always. Zaza Draft helps with a first draft, but teachers review, edit, and approve every final word before anything is used.",
  },
  {
    question: "Can I use this for SEN-sensitive communication?",
    answer:
      "Yes, as a starting point for careful wording. The final message should still reflect your own knowledge of the pupil, school policy, and any required safeguarding or SEND processes.",
  },
  {
    question: "Will the tool recommend UK-relevant pages?",
    answer:
      "Yes. The recommendations prioritise pages that reflect UK school wording, including behaviour communication, parents' evening, and report language that feels professional in a school context.",
  },
  {
    question: "What if my issue does not fit one neat category?",
    answer:
      "That is common. Use the free-text box and choose the closest categories. The diagnosis engine falls back to broader hubs and combination pages when your situation overlaps several pressures at once.",
  },
  {
    question: "Can I use it if I just need help sounding professional?",
    answer:
      "Yes. Tone anxiety is one of the main use cases. The tool can point you to calmer examples and teacher-safe guidance even if the underlying issue is still broad.",
  },
];

export const diagnosisInternalLinks: Recommendation[] = [
  {
    ...recommendationLibrary["teacher-hub"],
    why: ["Broad hub for parent communication pressure"],
  },
  {
    ...recommendationLibrary["communication-problems-hub"],
    why: ["Useful if the issue is still taking shape"],
  },
  {
    ...recommendationLibrary["reply-hub"],
    why: ["Helpful for follow-up replies and tricky threads"],
  },
  {
    ...recommendationLibrary["parent-email-scenarios-hub"],
    why: ["Scenario-led routes for common parent-email situations"],
  },
  {
    ...recommendationLibrary["report-hub"],
    why: ["Broader report support when the diagnosis is still vague"],
  },
  {
    ...recommendationLibrary["report-builder-hub"],
    why: ["More specific combinations by pupil profile and subject"],
  },
  {
    ...recommendationLibrary["behaviour-email-guide"],
    why: ["Strong fit for behaviour wording"],
  },
  {
    ...recommendationLibrary["angry-parent-guide"],
    why: ["De-escalation and tone support"],
  },
  {
    ...recommendationLibrary["report-comments-struggling"],
    why: ["Balanced report wording for lower attainment"],
  },
  {
    ...recommendationLibrary["report-comments-struggling-behaviour"],
    why: ["Specific support when reports also need behaviour wording"],
  },
  {
    ...recommendationLibrary["behaviour-scenario-primary"],
    why: ["Primary behaviour scenario support"],
  },
  {
    ...recommendationLibrary["sen-scenario"],
    why: ["Sensitive communication for SEN context"],
  },
  {
    ...recommendationLibrary["uk-communication-hub"],
    why: ["UK-specific communication templates and examples"],
  },
  {
    ...recommendationLibrary["parents-evening-templates"],
    why: ["Useful for parents' evening reminders and follow-up"],
  },
  {
    ...recommendationLibrary["document-parent-contact-guide"],
    why: ["Good fit for SLT documentation pressure"],
  },
];

export const broadDiagnosisPageSlugs = [
  recommendationLibrary["teacher-hub"].pageSlug,
  recommendationLibrary["communication-problems-hub"].pageSlug,
  recommendationLibrary["reply-hub"].pageSlug,
  recommendationLibrary["report-hub"].pageSlug,
  recommendationLibrary["report-builder-hub"].pageSlug,
  recommendationLibrary["parent-email-scenarios-hub"].pageSlug,
  recommendationLibrary["scenario-combinations"].pageSlug,
  recommendationLibrary["draft-product"].pageSlug,
];

const hasPhase = (input: DiagnosisInputs, ...phases: SchoolPhase[]) =>
  phases.includes(input.phase as SchoolPhase);

const hasIssue = (input: DiagnosisInputs, ...issues: MainIssue[]) =>
  issues.includes(input.issue as MainIssue);

const hasTone = (input: DiagnosisInputs, ...tones: ToneNeed[]) =>
  tones.some((tone) => input.toneNeeds.includes(tone));

const hasContext = (input: DiagnosisInputs, ...contexts: StudentContext[]) =>
  contexts.some((context) => input.studentContexts.includes(context));

const textHas = (freeText: string, ...terms: string[]) =>
  terms.some((term) => freeText.includes(term));

const diagnosisRules: DiagnosisRule[] = [
  {
    id: "angry-parent-core",
    priority: 100,
    matches: (input) => hasIssue(input, "angry-parent-email"),
    recommendations: [
      {
        key: "angry-parent-guide",
        why: ["Directly addresses angry parent replies with calmer wording"],
      },
      {
        key: "reply-hub",
        why: ["Gives you adjacent reply scenarios if the exact case shifts"],
      },
    ],
  },
  {
    id: "angry-parent-de-escalate",
    priority: 98,
    matches: (input) =>
      hasIssue(input, "angry-parent-email") && hasTone(input, "de-escalate"),
    recommendations: [
      {
        key: "angry-parent-guide",
        why: ["Built for de-escalation rather than sounding defensive"],
      },
      {
        key: "reduce-stress-parent-messages",
        why: [
          "Useful if the emotional drag of the thread is part of the problem",
        ],
      },
    ],
  },
  {
    id: "angry-parent-secondary",
    priority: 94,
    matches: (input) =>
      hasIssue(input, "angry-parent-email") &&
      hasPhase(input, "secondary", "ks3", "ks4"),
    recommendations: [
      {
        key: "angry-parent-scenario-secondary",
        why: ["Matches a secondary homework-style parent scenario"],
      },
      {
        key: "best-ai-parent-emails",
        why: ["Useful if you are also comparing tools for this workload"],
      },
    ],
  },
  {
    id: "angry-parent-upper-primary",
    priority: 93,
    matches: (input, freeText) =>
      hasIssue(input, "angry-parent-email") &&
      (hasPhase(input, "primary", "ks2") ||
        textHas(freeText, "year 6", "sats", "sat prep")),
    recommendations: [
      {
        key: "angry-parent-reply-year-6",
        why: ["Closer fit for upper-primary pressure and parent sensitivity"],
      },
    ],
  },
  {
    id: "parent-ignores-email-core",
    priority: 96,
    matches: (input) => hasIssue(input, "parent-ignores-email"),
    recommendations: [
      {
        key: "parent-ignore-reply",
        why: [
          "Focused on follow-up wording when the first email gets no reply",
        ],
      },
      {
        key: "reply-hub",
        why: [
          "Lets you widen the search if the silence is part of a bigger issue",
        ],
      },
    ],
  },
  {
    id: "parent-ignore-behaviour",
    priority: 95,
    matches: (input) =>
      hasIssue(input, "parent-ignores-email") &&
      hasContext(input, "behaviour-issues"),
    recommendations: [
      {
        key: "behaviour-email-guide",
        why: ["Useful if the original message still needs strengthening"],
      },
      {
        key: "behaviour-scenario-primary",
        why: ["Gives a more concrete behaviour example to compare against"],
      },
    ],
  },
  {
    id: "parent-ignore-behaviour-primary",
    priority: 94,
    matches: (input) =>
      hasIssue(input, "parent-ignores-email") &&
      hasContext(input, "behaviour-issues") &&
      hasPhase(input, "primary", "ks1", "ks2"),
    recommendations: [
      {
        key: "behaviour-email-guide",
        why: [
          "Useful for UK primary behaviour wording when follow-up is needed",
        ],
      },
      {
        key: "behaviour-scenario-primary",
        why: ["Closer fit for a primary parent follow-up about behaviour"],
      },
    ],
  },
  {
    id: "behaviour-primary",
    priority: 97,
    matches: (input) =>
      hasIssue(input, "behaviour-concern") &&
      hasPhase(input, "primary", "ks1", "ks2"),
    recommendations: [
      {
        key: "behaviour-email-guide",
        why: ["Direct fit for writing about behaviour to parents"],
      },
      {
        key: "behaviour-scenario-primary",
        why: ["Primary-specific scenario language for a behaviour concern"],
      },
      {
        key: "ofsted-friendly-parent-email",
        why: ["Useful when the wording needs to feel record-safe and measured"],
      },
    ],
  },
  {
    id: "behaviour-secondary",
    priority: 89,
    matches: (input) =>
      hasIssue(input, "behaviour-concern") &&
      hasPhase(input, "secondary", "ks3", "ks4"),
    recommendations: [
      {
        key: "communication-problems-hub",
        why: [
          "Broader parent communication support for harder secondary contexts",
        ],
      },
      {
        key: "slt-documentation-reply",
        why: ["Useful if behaviour communication is edging into documentation"],
      },
      {
        key: "document-parent-contact-guide",
        why: ["Supports clearer records when the thread keeps escalating"],
      },
    ],
  },
  {
    id: "behaviour-documentation",
    priority: 98,
    matches: (input) =>
      hasIssue(input, "documentation-for-slt", "behaviour-concern") &&
      hasContext(input, "behaviour-issues"),
    recommendations: [
      {
        key: "slt-documentation-reply",
        why: [
          "Designed for factual documentation when behaviour is escalating",
        ],
      },
      {
        key: "behaviour-email-guide",
        why: [
          "Helpful if the documentation needs to be paired with parent wording",
        ],
      },
      {
        key: "document-parent-contact-guide",
        why: ["Useful when you need a calmer record before escalating further"],
      },
    ],
  },
  {
    id: "missing-homework-core",
    priority: 92,
    matches: (input) => hasIssue(input, "missing-homework"),
    recommendations: [
      {
        key: "homework-complaint-reply",
        why: ["Gives a calm route through homework-related parent friction"],
      },
      {
        key: "parent-email-scenarios-hub",
        why: [
          "Opens up adjacent school-home scenarios when homework is part of a bigger pattern",
        ],
      },
    ],
  },
  {
    id: "missing-homework-primary-quick",
    priority: 90,
    matches: (input) =>
      hasIssue(input, "missing-homework") &&
      hasPhase(input, "primary", "ks1", "ks2") &&
      hasTone(input, "quick-reply"),
    recommendations: [
      {
        key: "homework-complaint-reply",
        why: ["Useful when you need a concise school-home follow-up quickly"],
      },
      {
        key: "behaviour-scenario-primary",
        why: ["Helpful if homework and behaviour expectations overlap"],
      },
    ],
  },
  {
    id: "low-attainment-report",
    priority: 97,
    matches: (input) =>
      hasIssue(input, "low-attainment", "report-writing-stress") &&
      hasContext(input, "struggling-academically"),
    recommendations: [
      {
        key: "report-comments-struggling",
        why: ["Directly addresses honest but supportive report wording"],
      },
      {
        key: "report-comments-sen-maths",
        why: [
          "Useful comparison point if support needs are also part of the picture",
        ],
      },
      {
        key: "report-comments-struggling-behaviour",
        why: ["Helpful when academic struggle overlaps with conduct concerns"],
      },
    ],
  },
  {
    id: "report-stress-ks2",
    priority: 91,
    matches: (input) =>
      hasIssue(input, "report-writing-stress") &&
      hasPhase(input, "primary", "ks2"),
    recommendations: [
      {
        key: "report-comments-struggling",
        why: ["A strong KS2-style fit when report comments feel draining"],
      },
      {
        key: "struggling-reader-scenario",
        why: ["Useful if reading progress is part of the report concern"],
      },
    ],
  },
  {
    id: "report-stress-ks2-struggling",
    priority: 96,
    matches: (input) =>
      hasIssue(input, "report-writing-stress") &&
      hasPhase(input, "primary", "ks2") &&
      hasContext(input, "struggling-academically"),
    recommendations: [
      {
        key: "report-comments-struggling",
        why: ["Direct fit for KS2 report writing about low attainment"],
      },
      {
        key: "report-comments-struggling-behaviour",
        why: [
          "Useful if the report also needs a behaviour note handled gently",
        ],
      },
    ],
  },
  {
    id: "report-stress-behaviour-context",
    priority: 92,
    matches: (input) =>
      hasIssue(input, "report-writing-stress") &&
      hasContext(input, "behaviour-issues"),
    recommendations: [
      {
        key: "report-comments-struggling-behaviour",
        why: ["Closest match when report fatigue includes behaviour wording"],
      },
      {
        key: "report-builder-hub",
        why: ["Useful if you need a more exact student-profile combination"],
      },
    ],
  },
  {
    id: "tone-anxiety-core",
    priority: 90,
    matches: (input) => hasIssue(input, "tone-anxiety"),
    recommendations: [
      {
        key: "teacher-hub",
        why: [
          "Good starting point when the main problem is tone rather than content",
        ],
      },
      {
        key: "reduce-stress-parent-messages",
        why: ["Addresses the emotional weight behind tone anxiety"],
      },
    ],
  },
  {
    id: "tone-anxiety-empathetic",
    priority: 92,
    matches: (input) =>
      hasIssue(input, "tone-anxiety") &&
      hasTone(input, "professional-but-empathetic", "be-honest-but-kind"),
    recommendations: [
      {
        key: "angry-parent-guide",
        why: [
          "Helpful model for calm, careful phrasing even beyond angry-parent cases",
        ],
      },
      {
        key: "behaviour-email-guide",
        why: ["Shows how to stay clear without sounding abrupt"],
      },
    ],
  },
  {
    id: "sen-support-core",
    priority: 97,
    matches: (input) =>
      hasIssue(input, "sen-support") || hasContext(input, "sen-needs"),
    recommendations: [
      {
        key: "sen-scenario",
        why: ["Sensitive fit for school-home communication around SEN support"],
      },
      {
        key: "report-comments-sen-maths",
        why: ["Useful if the SEN wording problem is more report-focused"],
      },
      {
        key: "positive-honest-sen-comments",
        why: [
          "Helpful when the SEN wording needs to stay balanced and careful",
        ],
      },
    ],
  },
  {
    id: "sen-support-kind-tone",
    priority: 88,
    matches: (input) =>
      (hasIssue(input, "sen-support") || hasContext(input, "sen-needs")) &&
      hasTone(input, "be-honest-but-kind", "professional-but-empathetic"),
    recommendations: [
      {
        key: "teacher-hub",
        why: [
          "Broader support if you need to check tone before sending anything",
        ],
      },
    ],
  },
  {
    id: "anxious-eal-report",
    priority: 95,
    matches: (input) =>
      hasContext(input, "anxious-eal") &&
      (hasIssue(
        input,
        "report-writing-stress",
        "low-attainment",
        "sen-support",
      ) ||
        hasTone(input, "detailed-report")),
    recommendations: [
      {
        key: "report-comments-anxious-eal",
        why: ["Closest match for anxiety and EAL-related report wording"],
      },
      {
        key: "sen-scenario",
        why: ["Useful if the issue is more communication-led than report-led"],
      },
    ],
  },
  {
    id: "high-attaining-disorganised-report",
    priority: 94,
    matches: (input) =>
      hasContext(input, "high-attaining-disorganised") &&
      hasIssue(
        input,
        "report-writing-stress",
        "low-attainment",
        "tone-anxiety",
      ),
    recommendations: [
      {
        key: "report-comments-high-attaining",
        why: [
          "Specific fit for capable pupils who still need clear next-step wording",
        ],
      },
      {
        key: "report-builder-hub",
        why: ["Lets you widen to other report-comment combinations"],
      },
    ],
  },
  {
    id: "grade-complaint-core",
    priority: 98,
    matches: (input) => hasIssue(input, "grade-complaint"),
    recommendations: [
      {
        key: "grade-complaint-reply",
        why: ["Direct fit for grade complaints and marking explanations"],
      },
      {
        key: "reply-hub",
        why: [
          "Useful if the complaint is becoming a wider parent communication issue",
        ],
      },
    ],
  },
  {
    id: "grade-complaint-secondary",
    priority: 91,
    matches: (input) =>
      hasIssue(input, "grade-complaint") &&
      hasPhase(input, "secondary", "ks3", "ks4"),
    recommendations: [
      {
        key: "angry-parent-scenario-secondary",
        why: [
          "Helpful if homework, assessment pressure, or subject tension overlap",
        ],
      },
      {
        key: "ofsted-friendly-parent-email",
        why: ["Useful when you want a professional tone before replying"],
      },
    ],
  },
  {
    id: "parents-evening-core",
    priority: 85,
    matches: (input) => hasIssue(input, "parents-evening"),
    recommendations: [
      {
        key: "uk-communication-hub",
        why: [
          "UK-specific examples are often more useful for parents' evening wording",
        ],
      },
      {
        key: "reply-hub",
        why: [
          "Helpful if the parents' evening issue is really a difficult follow-up",
        ],
      },
    ],
  },
  {
    id: "parents-evening-primary",
    priority: 92,
    matches: (input) =>
      hasIssue(input, "parents-evening") &&
      hasPhase(input, "primary", "ks1", "ks2"),
    recommendations: [
      {
        key: "parents-evening-templates",
        why: ["Direct fit for UK primary parents' evening wording"],
      },
      {
        key: "uk-communication-hub",
        why: ["Useful if you need broader UK school communication examples"],
      },
    ],
  },
  {
    id: "parents-evening-follow-up-tone",
    priority: 89,
    matches: (input) =>
      hasIssue(input, "parents-evening") &&
      hasTone(input, "professional-but-empathetic", "quick-reply"),
    recommendations: [
      {
        key: "parents-evening-templates",
        why: ["Useful for calm follow-up after a difficult or rushed meeting"],
      },
      {
        key: "ofsted-friendly-parent-email",
        why: ["Helpful if the message needs to read cleanly on record"],
      },
    ],
  },
  {
    id: "documentation-slt-core",
    priority: 96,
    matches: (input) => hasIssue(input, "documentation-for-slt"),
    recommendations: [
      {
        key: "slt-documentation-reply",
        why: ["Best fit for documenting behaviour contact clearly and calmly"],
      },
      {
        key: "scenario-combinations",
        why: [
          "Useful when documentation overlaps with parent communication and behaviour",
        ],
      },
    ],
  },
  {
    id: "documentation-slt-professional-tone",
    priority: 95,
    matches: (input) =>
      hasIssue(input, "documentation-for-slt") &&
      hasTone(input, "professional-but-empathetic", "quick-reply"),
    recommendations: [
      {
        key: "document-parent-contact-guide",
        why: [
          "Best fit when you want a record-safe summary without sounding cold",
        ],
      },
      {
        key: "slt-documentation-reply",
        why: ["Useful when the next step may be an escalation summary for SLT"],
      },
    ],
  },
  {
    id: "report-detailed-tone",
    priority: 89,
    matches: (input) =>
      hasTone(input, "detailed-report") &&
      hasIssue(input, "report-writing-stress", "low-attainment", "sen-support"),
    recommendations: [
      {
        key: "report-builder-hub",
        why: ["Better if you need a more tailored report-comment angle"],
      },
      {
        key: "report-hub",
        why: ["A broad route into report comment support"],
      },
    ],
  },
  {
    id: "report-trust-gdpr-keywords",
    priority: 88,
    matches: (input, freeText) =>
      hasIssue(input, "report-writing-stress", "documentation-for-slt") &&
      textHas(freeText, "gdpr", "data", "ofsted", "privacy", "safeguarding"),
    recommendations: [
      {
        key: "gdpr-report-writer",
        why: ["Matches trust and compliance concerns around report wording"],
      },
      {
        key: "document-parent-contact-guide",
        why: ["Helpful if the pressure is partly about safer written records"],
      },
    ],
  },
  {
    id: "weekend-drain-keywords",
    priority: 84,
    matches: (_input, freeText) =>
      textHas(freeText, "weekend", "sunday", "late night", "drain", "drained"),
    recommendations: [
      {
        key: "reduce-stress-parent-messages",
        why: [
          "Matches the emotional side of the workload, not just the wording task",
        ],
      },
      {
        key: "draft-product",
        why: [
          "Useful if the goal is to shorten drafting time without losing control",
        ],
      },
    ],
  },
  {
    id: "free-text-ignored-parent",
    priority: 86,
    matches: (_input, freeText) =>
      textHas(
        freeText,
        "ignored",
        "no response",
        "no reply",
        "not replying",
        "never replied",
      ),
    recommendations: [
      {
        key: "parent-ignore-reply",
        why: [
          "The free-text sounds like a follow-up problem, not a first email",
        ],
      },
      {
        key: "reply-hub",
        why: ["Useful if the silence is part of a wider communication issue"],
      },
    ],
  },
  {
    id: "free-text-angry-parent",
    priority: 86,
    matches: (_input, freeText) =>
      textHas(freeText, "angry parent", "complaint", "furious", "upset email"),
    recommendations: [
      {
        key: "angry-parent-guide",
        why: ["The free-text sounds like a de-escalation problem"],
      },
    ],
  },
  {
    id: "free-text-report-exhaustion",
    priority: 85,
    matches: (_input, freeText) =>
      textHas(
        freeText,
        "report",
        "comments",
        "reports",
        "end of term",
        "exhausted",
      ),
    recommendations: [
      {
        key: "report-comments-struggling",
        why: [
          "The wording suggests report-writing fatigue or comment drafting pressure",
        ],
      },
      {
        key: "report-builder-hub",
        why: [
          "Lets you narrow by pupil context once you need something more specific",
        ],
      },
    ],
  },
  {
    id: "free-text-parents-evening",
    priority: 87,
    matches: (_input, freeText) =>
      textHas(
        freeText,
        "parents' evening",
        "parents evening",
        "meeting tonight",
        "follow up after meeting",
      ),
    recommendations: [
      {
        key: "parents-evening-templates",
        why: [
          "The free-text sounds like a parents' evening follow-up or reminder",
        ],
      },
      {
        key: "uk-communication-hub",
        why: ["Useful if you want more UK-specific school wording options"],
      },
    ],
  },
];

export function emptyDiagnosisInputs(): DiagnosisInputs {
  return {
    phase: "",
    issue: "",
    studentContexts: [],
    toneNeeds: [],
    freeText: "",
  };
}

export function normaliseDiagnosisInputs(
  raw: Partial<DiagnosisInputs>,
): DiagnosisInputs {
  return {
    phase: (raw.phase ?? "") as DiagnosisInputs["phase"],
    issue: (raw.issue ?? "") as DiagnosisInputs["issue"],
    studentContexts: Array.from(new Set(raw.studentContexts ?? [])),
    toneNeeds: Array.from(new Set(raw.toneNeeds ?? [])),
    freeText: (raw.freeText ?? "").trim(),
  };
}

export function diagnose(raw: Partial<DiagnosisInputs>): Recommendation[] {
  const input = normaliseDiagnosisInputs(raw);
  const freeText = input.freeText.toLowerCase();
  const matches = diagnosisRules.filter((rule) =>
    rule.matches(input, freeText),
  );
  const scored = new Map<
    RecommendationKey,
    { score: number; why: Set<string> }
  >();

  for (const rule of matches) {
    for (const recommendation of rule.recommendations) {
      const existing = scored.get(recommendation.key) ?? {
        score: 0,
        why: new Set<string>(),
      };

      existing.score += recommendation.score ?? rule.priority;
      recommendation.why.forEach((item) => existing.why.add(item));
      scored.set(recommendation.key, existing);
    }
  }

  const fallbackKeys: RecommendationKey[] = [
    "teacher-hub",
    "communication-problems-hub",
    "draft-product",
    "report-builder-hub",
    "reply-hub",
  ];

  for (const key of fallbackKeys) {
    if (!scored.has(key)) {
      scored.set(key, {
        score: key === "teacher-hub" ? 30 : 10,
        why: new Set([
          key === "teacher-hub"
            ? "Useful starting point if your situation overlaps several concerns. Try describing more for a tighter match."
            : "Helpful fallback if you want to keep exploring from a broader page",
        ]),
      });
    }
  }

  return [...scored.entries()]
    .sort((left, right) => right[1].score - left[1].score)
    .slice(0, 6)
    .map(([key, value]) => ({
      ...recommendationLibrary[key],
      why: Array.from(value.why).slice(0, 4),
    }));
}
