import type { MetadataRoute } from "next";

export const phases = [
  "primary",
  "ks1",
  "ks2",
  "secondary",
  "ks3",
  "ks4",
  "fe",
] as const;

export const issues = [
  "behaviour",
  "missing-homework",
  "angry-parent",
  "sen-support",
  "low-attainment",
  "anxiety",
  "grade-complaint",
  "disorganisation",
  "parents-evening",
] as const;

export const yearGroups = [
  "year-1",
  "year-2",
  "year-3",
  "year-4",
  "year-5",
  "year-6",
  "year-7",
  "year-8",
  "year-9",
  "year-10",
  "year-11",
  "post-16",
] as const;

export const subjects = [
  "english",
  "maths",
  "science",
  "all-subjects",
] as const;

export const studentTypes = [
  "struggling",
  "anxious-eal",
  "high-attaining-disorganised",
  "sen-needs",
] as const;

const reportStageSlugs = [...phases, ...yearGroups] as const;

export type Phase = (typeof phases)[number];
export type Issue = (typeof issues)[number];
export type YearGroup = (typeof yearGroups)[number];
export type Subject = (typeof subjects)[number];
export type StudentType = (typeof studentTypes)[number];
export type ReportStage = (typeof reportStageSlugs)[number];

export type FaqItem = {
  question: string;
  answer: string;
};

export type HowToStep = {
  name: string;
  text: string;
};

export type ExampleBlock = {
  title: string;
  intro: string;
  example: string;
  note: string;
};

export type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type TrustItem = {
  title: string;
  body: string;
};

export type ContentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type MatrixPageData = {
  kind: "scenario" | "report-comments";
  path: string;
  title: string;
  h1: string;
  metaDescription: string;
  keyword: string;
  heroEyebrow: string;
  heroDescription: string[];
  featuredSnippet: string;
  sections: ContentSection[];
  examples: ExampleBlock[];
  howToSteps: HowToStep[];
  faq: FaqItem[];
  relatedLinks: RelatedLink[];
  trustItems: TrustItem[];
  ctaTitle: string;
  ctaBody: string;
  estimatedWordCount: number;
  breadcrumbs: Record<string, string>;
};

export type ScenarioCombination = {
  phase: Phase;
  issue: Issue;
  yearGroup: YearGroup;
  path: string;
  title: string;
};

export type ReportCombination = {
  studentType: StudentType;
  subject: Subject;
  phase: ReportStage;
  path: string;
  title: string;
};

type IssueDefinition = {
  label: string;
  searchPhrase: string;
  parentConcern: string;
  whyHard: string;
  toneGoal: string;
  safeClose: string;
  pitfalls: string[];
  relatedPrimaryHref: string;
  relatedPrimaryLabel: string;
  relatedPrimaryDescription: string;
};

type StudentTypeDefinition = {
  label: string;
  searchPhrase: string;
  focus: string;
  concern: string;
  nextStep: string;
  pitfalls: string[];
  relatedPrimaryHref: string;
  relatedPrimaryLabel: string;
  relatedPrimaryDescription: string;
};

const phaseLabels: Record<Phase, string> = {
  primary: "Primary",
  ks1: "KS1",
  ks2: "KS2",
  secondary: "Secondary",
  ks3: "KS3",
  ks4: "KS4",
  fe: "FE",
};

const phaseContexts: Record<
  Phase,
  {
    schoolLabel: string;
    teacherContext: string;
    reportContext: string;
  }
> = {
  primary: {
    schoolLabel: "primary school",
    teacherContext:
      "where teachers often know families closely and every message can shape the home-school relationship quickly",
    reportContext:
      "where report comments often need to feel warm, clear, and easy for families to act on",
  },
  ks1: {
    schoolLabel: "KS1",
    teacherContext:
      "where messages need to stay gentle, plain, and reassuring for younger pupils and their families",
    reportContext:
      "where short, concrete wording usually lands better than broad educational jargon",
  },
  ks2: {
    schoolLabel: "KS2",
    teacherContext:
      "where teachers are often balancing growing independence, parent anxiety, and accountability pressure",
    reportContext:
      "where parents usually want honest detail without losing sight of encouragement or next steps",
  },
  secondary: {
    schoolLabel: "secondary school",
    teacherContext:
      "where communication can become more formal, more sensitive, and more likely to involve line managers or heads of year",
    reportContext:
      "where subject specialists often need sharper, more concise wording that still sounds humane",
  },
  ks3: {
    schoolLabel: "KS3",
    teacherContext:
      "where behaviour, homework, and tone concerns can escalate quickly if the wording feels defensive or vague",
    reportContext:
      "where comments need to be professional, proportionate, and realistic about next steps",
  },
  ks4: {
    schoolLabel: "KS4",
    teacherContext:
      "where grades, evidence, exams, and parent pressure can all sit behind one difficult message",
    reportContext:
      "where teachers need precision, care, and language that will still read well at parents' evening or in an Ofsted-conscious context",
  },
  fe: {
    schoolLabel: "further education",
    teacherContext:
      "where the tone still needs to feel respectful and professional, but the learner context is usually more adult and more complex",
    reportContext:
      "where comments need to balance independence, accountability, and supportive next steps without sounding generic",
  },
};

const yearGroupLabels: Record<YearGroup, string> = {
  "year-1": "Year 1",
  "year-2": "Year 2",
  "year-3": "Year 3",
  "year-4": "Year 4",
  "year-5": "Year 5",
  "year-6": "Year 6",
  "year-7": "Year 7",
  "year-8": "Year 8",
  "year-9": "Year 9",
  "year-10": "Year 10",
  "year-11": "Year 11",
  "post-16": "Post-16",
};

const subjectLabels: Record<Subject, string> = {
  english: "English",
  maths: "Maths",
  science: "Science",
  "all-subjects": "all subjects",
};

const subjectContexts: Record<
  Subject,
  { noun: string; sentence: string; evidence: string }
> = {
  english: {
    noun: "English",
    sentence:
      "The wording needs to sound precise enough for exercise books, assessments, and parents' evening follow-up.",
    evidence: "reading, writing, and verbal response",
  },
  maths: {
    noun: "Maths",
    sentence:
      "The wording often needs to balance confidence, fluency, and accuracy without sounding colder than intended.",
    evidence: "fluency, reasoning, and confidence with methods",
  },
  science: {
    noun: "Science",
    sentence:
      "The wording works best when it stays factual about effort, understanding, and practical application.",
    evidence: "scientific vocabulary, explanation, and practical thinking",
  },
  "all-subjects": {
    noun: "all subjects",
    sentence:
      "The wording needs to feel broad enough to fit a whole-school or tutor-style comment without becoming vague.",
    evidence: "habits, consistency, and overall classroom engagement",
  },
};

const issueDefinitions: Record<Issue, IssueDefinition> = {
  behaviour: {
    label: "Behaviour email help",
    searchPhrase: "behaviour email help",
    parentConcern:
      "a behaviour pattern that now needs calm, professional parent communication",
    whyHard:
      "behaviour messages can sound either too soft to be useful or too sharp to keep the relationship workable",
    toneGoal:
      "state what happened, protect the pupil's dignity, and give parents a sensible next step",
    safeClose:
      "a short next step that keeps the door open without turning the email into a debate",
    pitfalls: [
      "Using loaded language that sounds like frustration rather than evidence",
      "Naming too many incidents at once and making the email feel punitive",
      "Forgetting to say what support or follow-up will happen in school",
      "Writing a behaviour letter that would not read well later to SLT or at parents' evening",
    ],
    relatedPrimaryHref: "/how-to-write-a-behaviour-email-to-parents",
    relatedPrimaryLabel: "How to write a behaviour email to parents",
    relatedPrimaryDescription:
      "A calmer guide for teachers who need direct behaviour wording without sounding harsh.",
  },
  "missing-homework": {
    label: "Missing homework email help",
    searchPhrase: "missing homework email help",
    parentConcern:
      "missing homework that now needs a clear follow-up without creating a defensive thread",
    whyHard:
      "teachers often need to stay firm while avoiding a message that sounds accusatory or tired",
    toneGoal:
      "name the pattern, keep the expectation clear, and explain the next support or consequence calmly",
    safeClose:
      "one practical next step that protects the relationship and the learning routine",
    pitfalls: [
      "Sounding irritated about repeated homework misses instead of focusing on the pattern",
      "Writing too broadly instead of saying exactly what was missed",
      "Adding multiple separate concerns into one already difficult message",
      "Leaving the parent unsure whether you want action, acknowledgement, or a meeting",
    ],
    relatedPrimaryHref: "/reply/parent-complaint/homework-not-done",
    relatedPrimaryLabel:
      "How to respond to a parent complaint about homework not done",
    relatedPrimaryDescription:
      "Useful if homework concern has already become a complaint or tense reply.",
  },
  "angry-parent": {
    label: "Angry parent email reply help",
    searchPhrase: "angry parent email reply help",
    parentConcern:
      "an emotionally charged parent email where the next reply needs to de-escalate, not inflame",
    whyHard:
      "even when the facts are clear, tone mistakes can turn one awkward message into a long weekend thread",
    toneGoal:
      "slow the tone down, answer the core concern, and move the conversation towards a practical next step",
    safeClose:
      "a calm invitation to continue the conversation professionally, often by call or meeting",
    pitfalls: [
      "Replying point by point to every accusation and keeping the conflict alive",
      "Matching the parent's tone even slightly",
      "Writing when you are still emotionally flooded",
      "Sending a message that would look defensive if forwarded to SLT or governors",
    ],
    relatedPrimaryHref: "/how-to-reply-to-an-angry-parent-email",
    relatedPrimaryLabel: "How to reply to an angry parent email",
    relatedPrimaryDescription:
      "A teacher-first framework for calmer replies when a parent email is already tense.",
  },
  "sen-support": {
    label: "SEN support email help",
    searchPhrase: "SEN support email help",
    parentConcern:
      "SEN support wording that needs to stay careful, factual, and emotionally intelligent",
    whyHard:
      "messages about additional needs can feel especially risky because parents are often already carrying stress or frustration",
    toneGoal:
      "show care, stay specific about support, and avoid wording that sounds dismissive or overconfident",
    safeClose:
      "a next step that centres collaboration and keeps the teacher in a professional lane",
    pitfalls: [
      "Overpromising support that depends on wider school processes",
      "Using vague reassurance without concrete information",
      "Writing in a way that sounds clinical rather than human",
      "Forgetting that the email may later sit alongside SEND or safeguarding records",
    ],
    relatedPrimaryHref: "/positive-honest-report-comments-sen-students",
    relatedPrimaryLabel: "Positive honest report comments for SEN students",
    relatedPrimaryDescription:
      "Useful when SEN-sensitive wording also needs to feed into report comments.",
  },
  "low-attainment": {
    label: "Low attainment message help",
    searchPhrase: "low attainment message help",
    parentConcern:
      "low attainment that needs honest wording without taking hope away",
    whyHard:
      "teachers often need to be clear about the gap while still sounding constructive and supportive",
    toneGoal:
      "describe the current picture honestly, explain support, and keep the next step specific",
    safeClose:
      "a practical, collaborative close that keeps standards clear and avoids false reassurance",
    pitfalls: [
      "Softening the point so much that the message becomes unclear",
      "Sounding final or pessimistic instead of evidence-based",
      "Using generic report language that could apply to any pupil",
      "Leaving out what the parent or pupil can actually do next",
    ],
    relatedPrimaryHref:
      "/positive-but-honest-report-card-comments-for-struggling-students",
    relatedPrimaryLabel:
      "Positive but honest report comments for struggling students",
    relatedPrimaryDescription:
      "A practical route into kinder, clearer wording when attainment is the pressure point.",
  },
  anxiety: {
    label: "Anxiety-sensitive email help",
    searchPhrase: "anxiety-sensitive email help",
    parentConcern:
      "an anxious pupil or anxious family context that needs very careful wording",
    whyHard:
      "messages that are factually correct can still land badly if they sound brisk, vague, or too school-centred",
    toneGoal:
      "keep the language calm, avoid alarm, and describe support without slipping into speculation",
    safeClose:
      "a collaborative next step that reassures without promising what cannot be guaranteed",
    pitfalls: [
      "Overexplaining and accidentally increasing concern",
      "Using language that feels cold when the family is already worried",
      "Confusing classroom observation with a formal judgement",
      "Forgetting the email may sit alongside safeguarding or pastoral notes later",
    ],
    relatedPrimaryHref: "/scenario/sen-child/not-engaging",
    relatedPrimaryLabel: "SEN child not engaging scenario",
    relatedPrimaryDescription:
      "Helpful when anxiety, engagement, and sensitive wording overlap.",
  },
  "grade-complaint": {
    label: "Grade complaint reply help",
    searchPhrase: "grade complaint reply help",
    parentConcern:
      "a challenge about grades or marking that needs a factual and calm teacher reply",
    whyHard:
      "assessment conversations can become personal quickly, especially in KS4 or other high-stakes moments",
    toneGoal:
      "stay evidence-based, professional, and open to discussion without sounding defensive",
    safeClose:
      "a clear next step around evidence, moderation, or follow-up conversation",
    pitfalls: [
      "Turning the email into a full marking defence",
      "Relying on jargon without explaining the practical next step",
      "Sounding dismissive because you are trying to be concise",
      "Ignoring the emotional pressure that often sits behind grade complaints",
    ],
    relatedPrimaryHref: "/how-to-reply/grade-complaint-ks3",
    relatedPrimaryLabel: "How to reply to a grade complaint in KS3",
    relatedPrimaryDescription:
      "A focused guide for calmer assessment replies where tone and evidence both matter.",
  },
  disorganisation: {
    label: "Disorganisation message help",
    searchPhrase: "disorganisation message help",
    parentConcern:
      "a pupil who is capable but inconsistent, disorganised, or regularly missing routines",
    whyHard:
      "teachers need to sound honest about the pattern without making the pupil sound careless or written off",
    toneGoal:
      "balance strengths with the practical routines that need to improve",
    safeClose:
      "a short next step that makes the routine improvement feel manageable",
    pitfalls: [
      "Writing as if the issue is effort alone when routines may be the real barrier",
      "Listing every missed item instead of naming the pattern cleanly",
      "Forgetting to acknowledge strengths or effort where they are real",
      "Using report wording that sounds copied rather than pupil-specific",
    ],
    relatedPrimaryHref:
      "/report-comments/high-attaining-but-disorganised/science/ks3",
    relatedPrimaryLabel:
      "Report comments for a high-attaining but disorganised student",
    relatedPrimaryDescription:
      "Useful when the wording needs to balance strengths with better routines.",
  },
  "parents-evening": {
    label: "Parents' evening follow-up help",
    searchPhrase: "parents' evening follow-up help",
    parentConcern:
      "parents' evening communication that still needs calm follow-up or clearer wording",
    whyHard:
      "a short follow-up can carry a lot of emotional meaning when the meeting itself felt difficult, rushed, or unresolved",
    toneGoal:
      "keep the summary accurate, warm, and practical without reopening the whole conversation",
    safeClose: "one clear next step or shared understanding after the meeting",
    pitfalls: [
      "Rewriting the whole meeting instead of summarising the useful outcome",
      "Sounding colder on email than you sounded in person",
      "Leaving out the action or timeline you agreed",
      "Writing a follow-up that would not read well as professional communication later",
    ],
    relatedPrimaryHref: "/parents-evening-email-templates-uk",
    relatedPrimaryLabel: "Parents' evening email templates UK",
    relatedPrimaryDescription:
      "Useful for reminders, follow-up wording, and school-home communication around parents' evening.",
  },
};

const studentTypeDefinitions: Record<StudentType, StudentTypeDefinition> = {
  struggling: {
    label: "struggling student",
    searchPhrase: "report comments for a struggling student",
    focus:
      "steady support, realistic progress language, and next steps that families can understand",
    concern:
      "report comments can easily sound either too bleak or too vague when a pupil is struggling",
    nextStep:
      "a short, specific improvement focus that still sounds kind and professional",
    pitfalls: [
      "Softening the point so much that the family cannot tell what needs attention",
      "Writing comments that sound generic or copied from a bank",
      "Using blunt language that creates extra worry before parents' evening",
      "Forgetting to link current attainment with support already in place",
    ],
    relatedPrimaryHref:
      "/positive-but-honest-report-card-comments-for-struggling-students",
    relatedPrimaryLabel:
      "Positive but honest report comments for struggling students",
    relatedPrimaryDescription:
      "A dedicated guide for kinder, clearer wording when attainment is below where it needs to be.",
  },
  "anxious-eal": {
    label: "anxious EAL student",
    searchPhrase: "report comments for an anxious EAL student",
    focus:
      "confidence, participation, language development, and careful professional judgement",
    concern:
      "teachers often need to describe progress without overexplaining anxiety or simplifying the pupil's strengths",
    nextStep:
      "language that is specific about support while staying warm and proportionate",
    pitfalls: [
      "Writing as if anxiety is the whole story",
      "Using vague praise instead of concrete classroom evidence",
      "Making language development sound static rather than progressing",
      "Forgetting that the comment may be discussed later in a sensitive parent meeting",
    ],
    relatedPrimaryHref: "/report-comments/anxious-eal-pupil/maths/year-4",
    relatedPrimaryLabel: "Report comments for an anxious EAL pupil in maths",
    relatedPrimaryDescription:
      "A more specific example when anxiety and language development overlap.",
  },
  "high-attaining-disorganised": {
    label: "high-attaining but disorganised student",
    searchPhrase:
      "report comments for a high-attaining but disorganised student",
    focus: "strong attainment, uneven routines, and precise next-step wording",
    concern:
      "these comments can sound unfairly critical if they focus only on organisation and ignore genuine strength",
    nextStep:
      "language that keeps the praise credible while naming the routine that needs to improve",
    pitfalls: [
      "Writing only about potential instead of current evidence",
      "Making the comment sound like a character judgement",
      "Ignoring the student's real strengths in the subject",
      "Leaving the family unclear about what better organisation would look like in practice",
    ],
    relatedPrimaryHref:
      "/report-comments/high-attaining-but-disorganised/science/ks3",
    relatedPrimaryLabel:
      "Report comments for a high-attaining but disorganised student",
    relatedPrimaryDescription:
      "A useful model when strong outcomes and uneven routines sit together.",
  },
  "sen-needs": {
    label: "student with SEN needs",
    searchPhrase: "report comments for a student with SEN needs",
    focus: "careful tone, concrete support language, and realistic next steps",
    concern:
      "comments need to be honest and useful without sounding clinical, dismissive, or overconfident",
    nextStep:
      "one grounded point about support, progress, or focus that parents can recognise as real",
    pitfalls: [
      "Overpromising progress or provision in a way that goes beyond the report",
      "Using generic SEND language that does not sound like the pupil",
      "Writing as if the pupil's needs remove the need for ambition",
      "Forgetting that reports may sit alongside wider SEND, safeguarding, or review conversations",
    ],
    relatedPrimaryHref: "/positive-honest-report-comments-sen-students",
    relatedPrimaryLabel: "Positive honest report comments for SEN students",
    relatedPrimaryDescription:
      "Useful when the wording needs to stay balanced, specific, and kind.",
  },
};

const validYearGroupsByPhase: Record<Phase, readonly YearGroup[]> = {
  primary: ["year-1", "year-2", "year-3", "year-4", "year-5", "year-6"],
  ks1: ["year-1", "year-2"],
  ks2: ["year-3", "year-4", "year-5", "year-6"],
  secondary: ["year-7", "year-8", "year-9", "year-10", "year-11"],
  ks3: ["year-7", "year-8", "year-9"],
  ks4: ["year-10", "year-11"],
  fe: ["post-16"],
};

function titleCase(value: string) {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatPhaseLabel(phase: Phase | ReportStage) {
  return phase in phaseLabels
    ? phaseLabels[phase as Phase]
    : yearGroupLabels[phase as YearGroup];
}

function formatIssueLabel(issue: Issue) {
  return issueDefinitions[issue].label;
}

function formatStudentTypeLabel(studentType: StudentType) {
  return studentTypeDefinitions[studentType].label;
}

export function isValidScenarioCombination(
  phase: string,
  issue: string,
  yearGroup: string,
): phase is Phase {
  return (
    phases.includes(phase as Phase) &&
    issues.includes(issue as Issue) &&
    yearGroups.includes(yearGroup as YearGroup) &&
    validYearGroupsByPhase[phase as Phase].includes(yearGroup as YearGroup)
  );
}

export function isValidReportCombination(
  studentType: string,
  subject: string,
  phase: string,
): studentType is StudentType {
  return (
    studentTypes.includes(studentType as StudentType) &&
    subjects.includes(subject as Subject) &&
    reportStageSlugs.includes(phase as ReportStage)
  );
}

function buildScenarioKeyword(
  phase: Phase,
  issue: Issue,
  yearGroup: YearGroup,
) {
  return `${formatIssueLabel(issue)} for ${yearGroupLabels[yearGroup]} ${phaseLabels[phase]} teachers`;
}

function buildReportKeyword(
  studentType: StudentType,
  subject: Subject,
  phase: ReportStage,
) {
  return `Report comments for ${formatStudentTypeLabel(studentType)} in ${subjectLabels[subject]} ${formatPhaseLabel(phase)}`;
}

function buildScenarioPath(phase: Phase, issue: Issue, yearGroup: YearGroup) {
  return `/scenario/${phase}/${issue}/${yearGroup}`;
}

function buildReportPath(
  studentType: StudentType,
  subject: Subject,
  phase: ReportStage,
) {
  return `/report-comments/${studentType}/${subject}/${phase}`;
}

export function getScenarioCombinations(): ScenarioCombination[] {
  return phases.flatMap((phase) =>
    validYearGroupsByPhase[phase].flatMap((yearGroup) =>
      issues.map((issue) => {
        const path = buildScenarioPath(phase, issue, yearGroup);

        return {
          phase,
          issue,
          yearGroup,
          path,
          title: `${buildScenarioKeyword(phase, issue, yearGroup)} | Zaza Draft`,
        };
      }),
    ),
  );
}

export function getReportCombinations(): ReportCombination[] {
  return studentTypes.flatMap((studentType) =>
    subjects.flatMap((subject) =>
      reportStageSlugs.map((phase) => {
        const path = buildReportPath(studentType, subject, phase);

        return {
          studentType,
          subject,
          phase,
          path,
          title: `${buildReportKeyword(studentType, subject, phase)} | Zaza Draft`,
        };
      }),
    ),
  );
}

export function getAllMatrixCombinations() {
  return [...getScenarioCombinations(), ...getReportCombinations()];
}

function buildScenarioExamples(
  phase: Phase,
  issue: Issue,
  yearGroup: YearGroup,
): ExampleBlock[] {
  const issueData = issueDefinitions[issue];
  const phaseData = phaseContexts[phase];
  const yearLabel = yearGroupLabels[yearGroup];

  return [
    {
      title: "Calm opening email",
      intro:
        "Use this when you need to start the message professionally without sounding cold or flustered.",
      example: `Dear Parent/Carer,\n\nThank you for taking the time to read this. I wanted to get in touch about ${issueData.parentConcern} for ${yearLabel}. My aim is to explain the situation clearly, keep the tone calm, and make sure we are working together in the pupil's best interests.\n\nFrom school, we have noticed [brief factual point]. I wanted to share this early so that the next step feels manageable rather than rushed.\n\nKind regards,\n[Teacher Name]`,
      note: `This opener works well in ${phaseData.schoolLabel} because it slows the tone down before you move into specifics.`,
    },
    {
      title: "Clear factual middle paragraph",
      intro:
        "Use this when the main risk is sounding emotional instead of evidence-based.",
      example: `To keep the message clear, I want to focus on what we have seen in school. Over the last [time period], the pattern has been [brief evidence]. In class, we have already responded by [support already given]. I am sharing this now so that there is a calm, accurate record and so that home and school can respond consistently.`,
      note: "This is especially useful if the email may later be read alongside behaviour notes, safeguarding records, or professional communication to SLT.",
    },
    {
      title: "Professional but empathetic close",
      intro:
        "Use this when you want the email to end with a workable next step, not a dead end.",
      example: `I appreciate that messages like this are not always easy to receive. My goal is to keep communication clear and supportive, while also being honest about what needs to improve. If it would help, I am happy to follow up by phone or speak further at parents' evening so that we can agree the most helpful next step together.`,
      note: "This close keeps teacher authority intact while still sounding human.",
    },
    {
      title: "Shorter version for a busy week",
      intro:
        "Use this when you need a professional short email that still sounds thoughtful.",
      example: `I wanted to flag a concern about ${issueData.parentConcern} for ${yearLabel}. We have noticed a clear pattern in school and have already started support on our side. I would value your support in reinforcing the same expectation at home. Please let me know if a short follow-up conversation would be helpful.`,
      note: "Short is often safer than long when workload is high and tone anxiety is the real problem.",
    },
    {
      title: "When the issue overlaps with SEN, anxiety, or wider support",
      intro:
        "Use this version when the message needs more care because the pupil context is sensitive.",
      example: `I also want to say that I am aware this sits alongside the wider picture for ${yearLabel}. I am not writing to label the pupil negatively, but to share what we are seeing in school and to keep support consistent. I will continue to monitor the situation carefully and make sure any next step stays proportionate, supportive, and appropriate for the context.`,
      note: "This wording helps when the teacher needs to sound careful without stepping beyond what is known.",
    },
  ];
}

function buildReportExamples(
  studentType: StudentType,
  subject: Subject,
  phase: ReportStage,
): ExampleBlock[] {
  const studentTypeData = studentTypeDefinitions[studentType];
  const subjectData = subjectContexts[subject];
  const phaseLabel = formatPhaseLabel(phase);

  return [
    {
      title: "Balanced report comment",
      intro:
        "Use this when you want the comment to sound honest, calm, and professional from the first sentence.",
      example: `${titleCase(studentTypeData.label)} in ${subjectData.noun} at ${phaseLabel} is beginning to show more confidence with ${subjectData.evidence}, although progress is still uneven. With continued encouragement and regular practice, there is a clear foundation to build on.`,
      note: "This keeps the tone measured while still giving families a realistic picture.",
    },
    {
      title: "Comment with clear next step",
      intro:
        "Use this when the report needs to point helpfully to what improvement looks like.",
      example: `In ${subjectData.noun}, the pupil has shown positive effort, but would benefit from greater consistency with ${subjectData.evidence}. The most useful next step is to strengthen routine, confidence, and independent follow-through so that progress becomes more secure over time.`,
      note: "A clear next step often reduces confusion later at parents' evening.",
    },
    {
      title: "Shorter version for report-writing fatigue",
      intro:
        "Use this when you need a concise comment that still sounds tailored.",
      example: `The pupil approaches ${subjectData.noun} with growing confidence, but still needs support with ${subjectData.evidence}. Continued practice and steady routines should help progress become more consistent.`,
      note: "Useful when you need to protect tone and clarity without writing an overlong paragraph.",
    },
    {
      title: "Kind but direct concern wording",
      intro:
        "Use this when the report needs to be slightly firmer without sounding blunt.",
      example: `Although there are positive signs in ${subjectData.noun}, progress is currently limited by ${studentTypeData.focus}. The pupil will benefit from a more consistent approach so that strengths can show more clearly across the year.`,
      note: "This keeps professional judgement intact while avoiding harsh language.",
    },
    {
      title: "Comment that bridges into future conversation",
      intro:
        "Use this when you know the wording may be discussed later with parents or tutors.",
      example: `This comment reflects the pupil's current picture in ${subjectData.noun}. There are encouraging strengths to build on, alongside clear areas for continued support. I would expect the most progress where routines, confidence, and teacher guidance continue to work together.`,
      note: "A bridge comment is especially useful when reports feed into parents' evening, SEN review conversations, or wider professional communication.",
    },
  ];
}

function buildScenarioFaq(
  phase: Phase,
  issue: Issue,
  yearGroup: YearGroup,
): FaqItem[] {
  const issueData = issueDefinitions[issue];
  const yearLabel = yearGroupLabels[yearGroup];

  return [
    {
      question: `How should I handle ${issueData.searchPhrase} for ${yearLabel}?`,
      answer:
        "Start by separating feeling from fact. A calmer teacher message usually acknowledges the concern, explains the specific school picture, and ends with one clear next step rather than several competing points.",
    },
    {
      question: "Should I send the email straight away?",
      answer:
        "Only if you can reread it calmly first. Fast can help, but a measured tone matters more than speed when the wording feels risky.",
    },
    {
      question:
        "Can I use this wording for Ofsted-conscious or record-safe communication?",
      answer:
        "Yes, that is part of the point. The examples are designed to sound professional, factual, and proportionate if they are later read by SLT or revisited at parents' evening.",
    },
    {
      question:
        "What if SEN or safeguarding context also sits behind the message?",
      answer:
        "Keep the wording especially careful. Use only what you can verify, follow school policy, and make sure the final version still reflects your own professional judgement before sending.",
    },
    {
      question: "Can Zaza Draft send the message for me?",
      answer:
        "No. Zaza Draft helps you draft and refine the wording, but teachers stay in full control and approve every final word.",
    },
    {
      question: `Is this page relevant for ${phaseLabels[phase]} teachers only?`,
      answer: `The examples are tailored to ${phaseLabels[phase]} and ${yearLabel}, but the structure still helps if you need a calmer starting point for a similar school context.`,
    },
  ];
}

function buildReportFaq(
  studentType: StudentType,
  subject: Subject,
  phase: ReportStage,
): FaqItem[] {
  const studentTypeData = studentTypeDefinitions[studentType];
  const phaseLabel = formatPhaseLabel(phase);
  const subjectLabel = subjectLabels[subject];

  return [
    {
      question: `How do I write report comments for ${studentTypeData.label} in ${subjectLabel} ${phaseLabel}?`,
      answer:
        "Start with what is true, specific, and useful. A strong report comment usually names a real strength, explains the current barrier clearly, and adds one manageable next step.",
    },
    {
      question: "How honest should report comments be?",
      answer:
        "Honest enough to be useful, but calm enough to be professional. Families need clarity, not bluntness, and teachers need language they can stand behind later.",
    },
    {
      question: "Should I mention support already in place?",
      answer:
        "Usually yes, if it helps the family understand the full picture. A short mention of current support often makes the comment feel fairer and more grounded.",
    },
    {
      question: "Can I use this wording before parents' evening?",
      answer:
        "Yes. These examples are written to read well both in a report and in later parent conversations where tone still matters.",
    },
    {
      question: "Is this safe for UK school communication?",
      answer:
        "The language is written for UK teachers and aims to sound calm, professional, and appropriate for report comments, parents' evening follow-up, and wider school writing.",
    },
    {
      question: "Does Zaza Draft replace my judgement on report comments?",
      answer:
        "No. Zaza Draft is a teacher-first co-writer. It can speed up drafting and help with tone, but you still edit and approve the final wording yourself.",
    },
  ];
}

function buildScenarioSteps(
  phase: Phase,
  issue: Issue,
  yearGroup: YearGroup,
): HowToStep[] {
  const issueData = issueDefinitions[issue];

  return [
    {
      name: "Name the issue cleanly",
      text: `Start with the specific concern for ${yearGroupLabels[yearGroup]} rather than everything that has been frustrating. Clear focus makes calmer professional communication easier.`,
    },
    {
      name: "Keep the middle factual",
      text: `Describe what has happened in school, what has already been tried, and why you are writing now. This matters especially for ${issueData.searchPhrase}.`,
    },
    {
      name: "Choose the safest tone",
      text: issueData.toneGoal,
    },
    {
      name: "Close with one next step",
      text: issueData.safeClose,
    },
    {
      name: "Edit before sending",
      text: "Use Zaza Draft to test calmer wording if you need it, then approve the final version yourself so the message still reflects your judgement and school context.",
    },
  ];
}

function buildReportSteps(
  studentType: StudentType,
  subject: Subject,
  _phase: ReportStage,
): HowToStep[] {
  const studentTypeData = studentTypeDefinitions[studentType];
  const subjectData = subjectContexts[subject];

  return [
    {
      name: "Start with real evidence",
      text: `Ground the comment in ${subjectData.evidence} rather than general impressions. That makes the tone feel fairer and more useful.`,
    },
    {
      name: "Balance strength and concern",
      text: `For ${studentTypeData.label}, the strongest comments usually recognise something real before naming the main barrier clearly.`,
    },
    {
      name: "Avoid vague reassurance",
      text: "Say what progress looks like now, not what you hope it might become. Clear language reduces confusion later for families and tutors.",
    },
    {
      name: "Add one next step",
      text: studentTypeData.nextStep,
    },
    {
      name: "Use the co-writer carefully",
      text: "If you use Zaza Draft, treat it as a careful first draft. You still decide what stays, what changes, and what is appropriate for the final report.",
    },
  ];
}

function buildScenarioSections(
  phase: Phase,
  issue: Issue,
  yearGroup: YearGroup,
): ContentSection[] {
  const issueData = issueDefinitions[issue];
  const phaseData = phaseContexts[phase];
  const yearLabel = yearGroupLabels[yearGroup];

  return [
    {
      title: `How to handle ${buildScenarioKeyword(phase, issue, yearGroup)}`,
      paragraphs: [
        `If you are looking for ${buildScenarioKeyword(phase, issue, yearGroup).toLowerCase()}, the safest starting point is usually a short, factual message that sounds calmer than you feel. Teachers often know what they need to say, but the hard part is saying it in a way that sounds professional, clear, and proportionate.`,
        `That is especially true in ${phaseData.schoolLabel}, ${phaseData.teacherContext}. One rushed sentence can sound sharper than intended. One vague sentence can sound evasive. A good message keeps the facts stable, the tone measured, and the next step easy to recognise.`,
      ],
      bullets: [
        `Keep the focus on ${issueData.parentConcern}`,
        "Write as if the message could later be revisited by SLT or at parents' evening",
        "Protect the teacher-parent relationship without watering down the issue",
      ],
    },
    {
      title: "Why this wording feels harder than it should",
      paragraphs: [
        `Teachers rarely need help identifying the problem. The real strain sits in the wording. With ${issueData.parentConcern}, the challenge is that ${issueData.whyHard}. That is why so many teachers draft the same paragraph three or four times before sending it.`,
        `For ${yearLabel}, families may already be carrying other pressures around behaviour, SEN, low attainment, safeguarding concerns, or upcoming parents' evening conversations. Even when those issues are not the main point, they change how an email lands. Calm professional communication matters because it protects both clarity and trust.`,
      ],
    },
    {
      title: "What a safer message usually includes",
      paragraphs: [
        `A safer teacher email usually opens by naming the concern in neutral language, then moves quickly into what has been observed or recorded in school. After that, the strongest middle section explains what has already been tried or what support is already in place. The close should make the next step obvious without sounding like an escalation threat.`,
        `This structure works because it does not leave parents guessing. It also helps the message read well later if it connects with a behaviour letter, an SEN review, professional communication with SLT, or a more formal Ofsted-conscious record.`,
      ],
      bullets: [
        "One clear concern",
        "Specific evidence",
        "A proportionate next step",
        "Language you would still be comfortable reading aloud later",
      ],
    },
    {
      title: "Common pitfalls to avoid",
      paragraphs: [
        "Most tone mistakes come from understandable pressure. Teachers are often writing late, carrying several problems at once, or trying to avoid another long reply chain. The result is usually a message that is either too blunt, too vague, or too long.",
      ],
      bullets: issueData.pitfalls,
    },
    {
      title: "How Zaza Draft helps safely",
      paragraphs: [
        "Zaza Draft is not a generic AI writer. It is a teacher-first co-writer designed for parent communication, report comments, and school writing where tone matters. The goal is not to replace your judgement. The goal is to reduce the stress and time cost of drafting something professional when the words feel risky.",
        `That matters here because ${issueData.searchPhrase} often needs emotionally intelligent wording, not just faster typing. You can use Zaza Draft to test a calmer opening, tighten a middle paragraph, or soften a close that currently sounds abrupt. Then you edit and approve every final word yourself.`,
      ],
      bullets: [
        "Teacher-specific writing support",
        "Safer, more emotionally intelligent wording",
        "Useful for parent communication, behaviour notes, and report-adjacent school writing",
        "No auto-send and no loss of teacher control",
      ],
    },
  ];
}

function buildReportSections(
  studentType: StudentType,
  subject: Subject,
  phase: ReportStage,
): ContentSection[] {
  const studentTypeData = studentTypeDefinitions[studentType];
  const subjectData = subjectContexts[subject];
  const phaseContext =
    phase in phaseContexts ? phaseContexts[phase as Phase] : undefined;

  return [
    {
      title: `How to write ${buildReportKeyword(studentType, subject, phase).toLowerCase()}`,
      paragraphs: [
        `If you are searching for ${buildReportKeyword(studentType, subject, phase).toLowerCase()}, the safest approach is to keep the comment specific, balanced, and professional from the first sentence. Families need clarity. Teachers need wording they can still stand behind later at parents' evening, in tutor review, or in other professional communication.`,
        `This is especially important in ${subjectData.noun}. ${subjectData.sentence} Strong report comments are rarely dramatic. They are calm, accurate, and careful about what is known.`,
      ],
      bullets: [
        studentTypeData.focus,
        "A tone that stays honest without sounding heavy",
        "Language that still reads well later in a school context",
      ],
    },
    {
      title: "Why report comments become draining",
      paragraphs: [
        `Report writing is tiring because the judgement is both academic and relational. For ${studentTypeData.label}, ${studentTypeData.concern}. Teachers often want to avoid tone mistakes, but they also know that comments need to be useful, not padded.`,
        phaseContext
          ? `The challenge can feel sharper in ${phaseContext.schoolLabel}, ${phaseContext.reportContext}. Families often read nuance into small phrases, so each sentence has to do more work than it should.`
          : `The challenge can feel sharper when the final stage label is year-specific. Families often read nuance into small phrases, so each sentence has to do more work than it should.`,
      ],
    },
    {
      title: "What stronger report comments include",
      paragraphs: [
        "The strongest report comments usually do three things. They recognise a real strength or positive habit, they explain the main current barrier without hiding it, and they point to one useful next step. That keeps the comment calm and informative rather than vague or punitive.",
        "It also makes the wording easier to use elsewhere. A strong report sentence can often be adapted later for parents' evening notes, a tutor summary, or a more formal update without needing a total rewrite.",
      ],
      bullets: [
        "Specific evidence instead of generic praise",
        "Professional tone that respects the pupil and the family",
        "One next step that sounds grounded and realistic",
      ],
    },
    {
      title: "Common pitfalls to avoid",
      paragraphs: [
        "Most weak report comments are not careless. They are tired. When time is short, comments can become either too formulaic or too blunt. The safest middle path is brief specificity.",
      ],
      bullets: studentTypeData.pitfalls,
    },
    {
      title: "How Zaza Draft helps with report comments",
      paragraphs: [
        "Zaza Draft helps teachers draft report comments faster without turning the process into generic AI output. It is designed as a calm co-writer for teacher writing tasks where tone matters, including parent communication, report comments, behaviour notes, and other school writing.",
        `That matters for ${buildReportKeyword(studentType, subject, phase).toLowerCase()} because the task is not just finding words. It is finding words that sound fair, professional, and emotionally intelligent. You still review and approve every line before anything is used.`,
      ],
      bullets: [
        "Teacher-first report drafting support",
        "Safer wording around SEN, low attainment, anxiety, and professional judgement",
        "Helpful when report comments and parent communication connect",
        "You keep full editorial control",
      ],
    },
  ];
}

function buildScenarioRelatedLinks(
  phase: Phase,
  issue: Issue,
  yearGroup: YearGroup,
): RelatedLink[] {
  const issueData = issueDefinitions[issue];
  const samePhaseYearLinks = validYearGroupsByPhase[phase]
    .filter((group) => group !== yearGroup)
    .slice(0, 2)
    .map((group) => ({
      href: buildScenarioPath(phase, issue, group),
      label: `${formatIssueLabel(issue)} for ${yearGroupLabels[group]} ${phaseLabels[phase]}`,
      description:
        "Open a nearby version if you want a similar school context with a different year-group emphasis.",
    }));

  return [
    {
      href: issueData.relatedPrimaryHref,
      label: issueData.relatedPrimaryLabel,
      description: issueData.relatedPrimaryDescription,
    },
    {
      href: "/teacher-parent-communication-hub",
      label: "Teacher parent communication hub",
      description:
        "Browse calmer pages for difficult parent emails, behaviour concerns, and follow-up wording.",
    },
    {
      href: "/diagnosis",
      label: "Parent communication diagnosis",
      description:
        "Use the diagnosis tool if the issue overlaps tone anxiety, report pressure, or SLT documentation.",
    },
    {
      href: "/products/draft",
      label: "Zaza Draft product page",
      description:
        "See how the teacher-first co-writer helps with parent emails and school writing without taking control away.",
    },
    ...samePhaseYearLinks,
  ];
}

function buildReportRelatedLinks(
  studentType: StudentType,
  subject: Subject,
  phase: ReportStage,
): RelatedLink[] {
  const studentTypeData = studentTypeDefinitions[studentType];
  const alternateStage =
    phase === "year-5" ? "ks2" : phase === "ks2" ? "year-5" : "primary";

  return [
    {
      href: studentTypeData.relatedPrimaryHref,
      label: studentTypeData.relatedPrimaryLabel,
      description: studentTypeData.relatedPrimaryDescription,
    },
    {
      href: buildReportPath(
        studentType,
        subject,
        alternateStage as ReportStage,
      ),
      label: buildReportKeyword(
        studentType,
        subject,
        alternateStage as ReportStage,
      ),
      description:
        "Open a nearby version if you want the same student profile with a broader or narrower stage.",
    },
    {
      href: "/report-comment-builder",
      label: "Report comment builder",
      description:
        "Browse more report-comment combinations by student profile, subject, and school stage.",
    },
    {
      href: "/diagnosis",
      label: "Parent communication and report diagnosis",
      description:
        "Use the diagnosis tool if report comments overlap with parent communication, tone anxiety, or SLT documentation.",
    },
    {
      href: "/products/draft",
      label: "Zaza Draft product page",
      description:
        "See how Zaza Draft helps teachers draft report comments more calmly while keeping final control.",
    },
  ];
}

function buildTrustItems(kind: "scenario" | "report-comments"): TrustItem[] {
  return [
    {
      title: "Hallucination-safe workflow",
      body: "Zaza Draft is designed for careful teacher writing support, not invented pupil facts or automatic sending.",
    },
    {
      title: "GDPR-aware",
      body: "Use school-safe judgement on what information belongs in the draft, then approve the final wording yourself.",
    },
    {
      title: "Teacher stays in control",
      body: "The product is a co-writer, not a replacement. You edit and approve every word.",
    },
    {
      title:
        kind === "scenario"
          ? "Professional communication support"
          : "Report-writing support",
      body: "The help is tuned for school writing where tone matters, including parent communication, report comments, behaviour notes, and documentation.",
    },
  ];
}

export function buildScenarioPageData(
  phase: Phase,
  issue: Issue,
  yearGroup: YearGroup,
): MatrixPageData | null {
  if (!isValidScenarioCombination(phase, issue, yearGroup)) {
    return null;
  }

  const issueData = issueDefinitions[issue];
  const keyword = buildScenarioKeyword(phase, issue, yearGroup);
  const path = buildScenarioPath(phase, issue, yearGroup);
  const yearLabel = yearGroupLabels[yearGroup];
  const phaseData = phaseContexts[phase];

  return {
    kind: "scenario",
    path,
    title: `${keyword} | Zaza Draft`,
    h1: keyword,
    metaDescription: `${keyword} with calm, professional examples for teachers. Get safer wording, practical steps, FAQs, and a teacher-first route into Zaza Draft for parent communication and school writing.`,
    keyword,
    heroEyebrow: "How-to/problem intent",
    heroDescription: [
      `${keyword} is rarely hard because teachers do not know the issue. It is hard because the wording needs to be calm, professional, and proportionate at the exact moment you are already tired. This page gives you a teacher-first structure, editable examples, and safer language for ${issueData.parentConcern}.`,
      `The aim is to help you sound clear and appropriate in ${phaseData.schoolLabel}, whether the message sits near behaviour records, parents' evening follow-up, SEN support, safeguarding awareness, or broader professional communication. Zaza Draft can help you draft faster, but you stay in full control and approve every final word.`,
    ],
    featuredSnippet: `For ${keyword.toLowerCase()}, start with a calm factual opener, explain the specific school picture, and end with one clear next step. Avoid matching a parent's tone, writing an overlong defence, or sending a message you would not want revisited later in professional communication. Zaza Draft helps teachers test safer wording quickly, but every final line still stays under teacher control.`,
    sections: buildScenarioSections(phase, issue, yearGroup),
    examples: buildScenarioExamples(phase, issue, yearGroup),
    howToSteps: buildScenarioSteps(phase, issue, yearGroup),
    faq: buildScenarioFaq(phase, issue, yearGroup),
    relatedLinks: buildScenarioRelatedLinks(phase, issue, yearGroup),
    trustItems: buildTrustItems("scenario"),
    ctaTitle: "Ready to draft more calmly?",
    ctaBody:
      "Use Zaza Draft if you want a teacher-first writing co-writer for parent emails, difficult follow-up, and other school messages where tone feels risky. It helps you move faster, but the final message still stays yours.",
    estimatedWordCount: 1180,
    breadcrumbs: {
      "/scenario": "Scenario",
      [`/scenario/${phase}`]: phaseLabels[phase],
      [`/scenario/${phase}/${issue}`]: titleCase(issue),
      [path]: `${titleCase(issue)} for ${yearLabel}`,
    },
  };
}

export function buildReportPageData(
  studentType: StudentType,
  subject: Subject,
  phase: ReportStage,
): MatrixPageData | null {
  if (!isValidReportCombination(studentType, subject, phase)) {
    return null;
  }

  const keyword = buildReportKeyword(studentType, subject, phase);
  const path = buildReportPath(studentType, subject, phase);

  return {
    kind: "report-comments",
    path,
    title: `${keyword} | Zaza Draft`,
    h1: keyword,
    metaDescription: `${keyword} with calmer examples for teachers. Get professional report comment wording, FAQs, related links, and a teacher-first route into Zaza Draft for report writing.`,
    keyword,
    heroEyebrow: "Template intent",
    heroDescription: [
      `${keyword} can feel deceptively hard. Teachers usually know the pupil well enough. The stress comes from finding wording that is honest, kind, specific, and still professional enough to stand up later at parents' evening or in wider school communication. This page gives you editable report comments, safer phrasing, and a clearer structure.`,
      `Zaza Draft is built as a specialised teacher-first co-writer, not a generic AI writer. It helps you draft report comments with more confidence, but you stay in control and approve every final sentence before it is used.`,
    ],
    featuredSnippet: `For ${keyword.toLowerCase()}, start with a real strength, name the main barrier clearly, and end with one practical next step. Avoid vague praise, blunt judgement, or comment-bank wording that could fit any pupil. Zaza Draft helps teachers refine report comments faster, while keeping final editorial control with the teacher.`,
    sections: buildReportSections(studentType, subject, phase),
    examples: buildReportExamples(studentType, subject, phase),
    howToSteps: buildReportSteps(studentType, subject, phase),
    faq: buildReportFaq(studentType, subject, phase),
    relatedLinks: buildReportRelatedLinks(studentType, subject, phase),
    trustItems: buildTrustItems("report-comments"),
    ctaTitle: "Need a calmer first draft for report comments?",
    ctaBody:
      "Try Zaza Draft if you want report-writing support that stays teacher-first, careful on tone, and useful for UK school contexts. You still review, edit, and approve every final word.",
    estimatedWordCount: 1140,
    breadcrumbs: {
      "/report-comments": "Report comments",
      [`/report-comments/${studentType}`]: titleCase(studentType),
      [`/report-comments/${studentType}/${subject}`]: titleCase(subject),
      [path]: formatPhaseLabel(phase),
    },
  };
}

export function getMatrixSitemapEntries(
  lastModified = new Date(),
): MetadataRoute.Sitemap {
  const scenarioEntries = getScenarioCombinations().map((item) => ({
    url: `https://zazadraft.com${item.path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.78,
  }));

  const reportEntries = getReportCombinations().map((item) => ({
    url: `https://zazadraft.com${item.path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...scenarioEntries, ...reportEntries];
}

export const first50ExamplePages = getAllMatrixCombinations()
  .slice(0, 50)
  .map((item) => ({
    slug: item.path.replace(/^\//, ""),
    title: item.title,
  }));
