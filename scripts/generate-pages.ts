import { promises as fs } from "node:fs";
import path from "node:path";

type PageCategory =
  | "problems"
  | "reply"
  | "report-comments"
  | "alternatives"
  | "scenario-combinations"
  | "uk-school-communication";

type CliOptions = {
  dryRun: boolean;
  limit: number | null;
  outputDir: string;
  matrixPath: string | null;
  overwrite: boolean;
};

type MatrixInput = {
  schoolPhases?: string[];
  issues?: string[];
  yearGroups?: string[];
  subjects?: string[];
  triggers?: string[];
  replyContexts?: string[];
  studentTypes?: string[];
  comparisonTools?: string[];
  comparisonUseCases?: string[];
  schoolTypes?: string[];
  csvRows?: CsvRow[];
};

type CsvRow = {
  category: PageCategory;
  slug?: string;
  phase?: string;
  issue?: string;
  yearGroup?: string;
  subject?: string;
  trigger?: string;
  context?: string;
  studentType?: string;
  tool?: string;
  useCase?: string;
  schoolType?: string;
};

type LoadedMatrix = Required<Omit<MatrixInput, "csvRows">> & {
  csvRows: CsvRow[];
};

type RelatedLink = {
  title: string;
  href: string;
};

type PageSeed = {
  category: PageCategory;
  slug: string;
  phase?: string;
  issue?: string;
  yearGroup?: string;
  subject?: string;
  trigger?: string;
  context?: string;
  studentType?: string;
  tool?: string;
  useCase?: string;
  schoolType?: string;
  searchIntent: "tool" | "alternative" | "how-to" | "template";
};

type GeneratedPage = {
  frontmatter: Record<string, string>;
  markdown: string;
  wordCount: number;
  keywords: string[];
  relatedLinks: RelatedLink[];
};

type GenerationStats = {
  attempted: number;
  generated: number;
  skippedDuplicates: number;
  skippedQuality: number;
  totalWords: number;
  minWords: number;
  maxWords: number;
  sampleSlugs: string[];
};

const DEFAULT_OUTPUT_DIR = "./generated-pages";
const DEFAULT_LIMIT = 220;
const MIN_WORD_COUNT = 900;
const MAX_RELATED_LINKS = 6;
const CTA_LABEL = "Start free trial";

const BANNED_TERMS = [
  "revolutionary",
  "game-changing",
  "magic",
  "transform",
  "transforms",
  "all-in-one ai platform",
];

const UK_SPELLING_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bbehavior\b/gi, "behaviour"],
  [/\bbehavioral\b/gi, "behavioural"],
  [/\bpersonalized\b/gi, "personalised"],
  [/\borganizing\b/gi, "organising"],
  [/\borganization\b/gi, "organisation"],
  [/\brealize\b/gi, "realise"],
  [/\bcolor\b/gi, "colour"],
  [/\bapologize\b/gi, "apologise"],
];

const defaultMatrix: LoadedMatrix = {
  schoolPhases: ["primary", "secondary", "ks1", "ks2", "ks3", "ks4", "fe"],
  issues: [
    "behaviour",
    "missing-homework",
    "low-attainment",
    "anxiety",
    "disorganisation",
    "sen-support",
    "angry-parent-reply",
    "grade-complaint",
  ],
  yearGroups: [
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
  ],
  subjects: ["english", "maths", "science", "history", "all-subjects"],
  triggers: [
    "ignore-email",
    "escalating-behaviour",
    "sat-prep",
    "parents-evening",
    "homework-complaint",
    "attendance-concern",
  ],
  replyContexts: [
    "year-6-sat-prep",
    "missing-homework",
    "behaviour-follow-up",
    "report-card-concern",
    "sen-review",
    "parents-evening-delay",
  ],
  studentTypes: [
    "anxious-eal-pupil",
    "high-attaining-but-disorganised",
    "low-attainment-with-behaviour-issues",
    "sen-pupil",
    "quiet-but-capable",
    "inconsistent-homework",
  ],
  comparisonTools: ["chatgpt", "magicschool-ai", "teachmate", "generic-ai"],
  comparisonUseCases: [
    "parent-emails",
    "report-comments",
    "teacher-professional-tone",
    "angry-parent-replies",
  ],
  schoolTypes: ["primary-school-uk", "secondary-school", "fe-college"],
  csvRows: [],
};

function parseArgs(argv: string[]): CliOptions {
  const args = [...argv];
  let dryRun = false;
  let overwrite = false;
  let limit: number | null = DEFAULT_LIMIT;
  let outputDir = DEFAULT_OUTPUT_DIR;
  let matrixPath: string | null = null;

  while (args.length > 0) {
    const current = args.shift();
    if (!current) {
      continue;
    }

    if (current === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (current === "--overwrite") {
      overwrite = true;
      continue;
    }

    if (current === "--limit") {
      const raw = args.shift();
      limit = raw ? Number.parseInt(raw, 10) : DEFAULT_LIMIT;
      continue;
    }

    if (current.startsWith("--limit=")) {
      limit = Number.parseInt(current.split("=")[1] ?? "", 10);
      continue;
    }

    if (current === "--output") {
      outputDir = args.shift() ?? DEFAULT_OUTPUT_DIR;
      continue;
    }

    if (current.startsWith("--output=")) {
      outputDir = current.split("=")[1] ?? DEFAULT_OUTPUT_DIR;
      continue;
    }

    if (current === "--matrix") {
      matrixPath = args.shift() ?? null;
      continue;
    }

    if (current.startsWith("--matrix=")) {
      matrixPath = current.split("=")[1] ?? null;
      continue;
    }
  }

  return {
    dryRun,
    limit: Number.isFinite(limit) ? limit : DEFAULT_LIMIT,
    outputDir,
    matrixPath,
    overwrite,
  };
}

function titleCase(value: string): string {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function labelFromSlug(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((segment) => {
      if (
        segment === "ks1" ||
        segment === "ks2" ||
        segment === "ks3" ||
        segment === "ks4"
      ) {
        return segment.toUpperCase();
      }

      if (segment === "fe") {
        return "FE";
      }

      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join(" ");
}

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function csvSplit(line: string): string[] {
  const output: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      const next = line[index + 1];
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      output.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  output.push(current.trim());
  return output;
}

async function loadMatrix(matrixPath: string | null): Promise<LoadedMatrix> {
  if (!matrixPath) {
    return defaultMatrix;
  }

  const resolvedPath = path.resolve(process.cwd(), matrixPath);
  const contents = await fs.readFile(resolvedPath, "utf8");

  if (resolvedPath.endsWith(".json")) {
    const parsed = JSON.parse(contents) as MatrixInput;
    return {
      ...defaultMatrix,
      ...parsed,
      csvRows: parsed.csvRows ?? [],
    };
  }

  if (resolvedPath.endsWith(".csv")) {
    const [headerLine, ...lines] = contents.split(/\r?\n/).filter(Boolean);
    const headers = csvSplit(headerLine);
    const csvRows: CsvRow[] = lines.map((line) => {
      const values = csvSplit(line);
      const entry: Record<string, string> = {};
      headers.forEach((header, index) => {
        entry[header] = values[index] ?? "";
      });
      return entry as CsvRow;
    });

    return {
      ...defaultMatrix,
      csvRows,
    };
  }

  throw new Error(`Unsupported matrix file type: ${resolvedPath}`);
}

function yearLabel(yearGroup?: string): string {
  if (!yearGroup) {
    return "";
  }

  if (yearGroup === "post-16") {
    return "Post-16";
  }

  return yearGroup.replace("year-", "Year ");
}

function phaseForYearGroup(yearGroup?: string): string {
  if (!yearGroup) {
    return "primary";
  }

  if (yearGroup === "post-16") {
    return "fe";
  }

  const yearNumber = Number.parseInt(yearGroup.replace("year-", ""), 10);

  if (yearNumber <= 2) {
    return "ks1";
  }

  if (yearNumber <= 6) {
    return "ks2";
  }

  if (yearNumber <= 9) {
    return "ks3";
  }

  return "ks4";
}

function phaseLabel(phase?: string): string {
  if (!phase) {
    return "";
  }

  if (phase.startsWith("ks")) {
    return phase.toUpperCase();
  }

  if (phase === "fe") {
    return "FE";
  }

  return titleCase(phase);
}

function issueLabel(issue?: string): string {
  if (!issue) {
    return "";
  }

  const explicitLabels: Record<string, string> = {
    "missing-homework": "missing homework",
    "low-attainment": "low attainment",
    "sen-support": "SEN support",
    "angry-parent-reply": "an angry parent reply",
    "grade-complaint": "a grade complaint",
  };

  return explicitLabels[issue] ?? issue.replace(/-/g, " ");
}

function issueKeyword(issue?: string): string {
  if (!issue) {
    return "teacher writing support";
  }

  const keywords: Record<string, string> = {
    behaviour: "behaviour email to parents",
    "missing-homework": "missing homework email home",
    "low-attainment": "low attainment report comments",
    anxiety: "anxious pupil email wording",
    disorganisation: "disorganised student report comments",
    "sen-support": "SEN parent communication",
    "angry-parent-reply": "reply to angry parent email",
    "grade-complaint": "grade complaint reply for teachers",
  };

  return keywords[issue] ?? issue.replace(/-/g, " ");
}

function subjectLabel(subject?: string): string {
  if (!subject) {
    return "";
  }

  if (subject === "all-subjects") {
    return "all subjects";
  }

  return subject === "maths" ? "maths" : subject.replace(/-/g, " ");
}

function useCaseLabel(useCase?: string): string {
  if (!useCase) {
    return "";
  }

  const labels: Record<string, string> = {
    "parent-emails": "parent emails",
    "report-comments": "report comments",
    "teacher-professional-tone": "teacher professional tone",
    "angry-parent-replies": "angry parent replies",
  };

  return labels[useCase] ?? useCase.replace(/-/g, " ");
}

function toolLabel(tool?: string): string {
  if (!tool) {
    return "";
  }

  if (tool === "chatgpt") {
    return "ChatGPT";
  }

  if (tool === "generic-ai") {
    return "generic AI";
  }

  if (tool === "magicschool-ai") {
    return "MagicSchool AI";
  }

  return titleCase(tool.replace(/-/g, " "));
}

function schoolTypeLabel(schoolType?: string): string {
  if (!schoolType) {
    return "";
  }

  const labels: Record<string, string> = {
    "primary-school-uk": "primary school UK",
    "secondary-school": "secondary school",
    "fe-college": "FE college",
  };

  return labels[schoolType] ?? schoolType.replace(/-/g, " ");
}

function studentTypeLabel(studentType?: string): string {
  if (!studentType) {
    return "";
  }

  const labels: Record<string, string> = {
    "anxious-eal-pupil": "an anxious EAL pupil",
    "high-attaining-but-disorganised":
      "a high attaining but disorganised student",
    "low-attainment-with-behaviour-issues":
      "a student with low attainment and behaviour issues",
    "sen-pupil": "a pupil with SEN support needs",
    "quiet-but-capable": "a quiet but capable student",
    "inconsistent-homework": "a student with inconsistent homework habits",
  };

  return labels[studentType] ?? studentType.replace(/-/g, " ");
}

function keywordsToString(keywords: string[]): string {
  return keywords.join(", ");
}

function yamlEscape(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`;
}

function frontmatterBlock(frontmatter: Record<string, string>): string {
  const lines = Object.entries(frontmatter).map(
    ([key, value]) => `${key}: ${yamlEscape(value)}`,
  );
  return ["---", ...lines, "---"].join("\n");
}

function featuredSnippet(seed: PageSeed): string {
  switch (seed.category) {
    case "reply":
      return `To reply ${seed.trigger ? seed.trigger.replace(/-/g, " ") : "to a difficult parent situation"} calmly, acknowledge the concern, state the facts clearly, avoid defensive language, and end with the next sensible step. Keep the wording professional, specific, and easy for parents or SLT to act on.`;
    case "report-comments":
      return `Strong report comments for ${studentTypeLabel(seed.studentType)} in ${subjectLabel(seed.subject)} should be specific, balanced, and easy to evidence. Start with what the pupil can do, name the current barrier with professional care, and finish with the next realistic step.`;
    default:
      return `A strong teacher message in this situation is calm, specific, and proportionate. State what has happened, explain why it matters, and give parents or colleagues one clear next step without sounding abrupt or overworked.`;
  }
}

function heroParagraph(seed: PageSeed): string {
  const phaseText = seed.phase ? `${phaseLabel(seed.phase)} ` : "";
  const yearText = seed.yearGroup ? `${yearLabel(seed.yearGroup)} ` : "";
  const issueText = issueLabel(seed.issue);

  switch (seed.category) {
    case "problems":
      return `Late-night dread around writing a ${issueText} message is common, especially when you are trying to sound calm, fair, and professional after a long school day. This guide gives you wording for ${yearText}${phaseText}teachers who need to write clearly without sounding harsh, vague, or overly formal. Every example is written as a starting point, not a final answer. You stay in control, you edit what matters, and you approve every word before anything is sent.`;
    case "reply":
      return `Replying when ${seed.trigger?.replace(/-/g, " ")} can feel heavier than the message itself. You are often trying to protect relationships, stay factual, and avoid escalation at the same time. This page gives you calm, professional wording for ${seed.context?.replace(/-/g, " ")} scenarios so you can respond with confidence, keep the tone measured, and still sound like yourself.`;
    case "report-comments":
      return `Writing report comments for ${studentTypeLabel(seed.studentType)} in ${subjectLabel(seed.subject)} can take far longer than it should when you are trying to be positive, accurate, and honest at once. The examples below are designed for real school reporting pressure. They help you find professional wording quickly while keeping your judgement fully in place.`;
    case "alternatives":
      return `${toolLabel(seed.tool)} may be useful in broader teaching workflows, but many teachers want calmer support when the wording itself matters. This comparison looks specifically at ${useCaseLabel(seed.useCase)} so you can judge whether a dedicated co-writer such as Zaza Draft is the better fit for your tone, workload, and professional risk.`;
    case "scenario-combinations":
      return `When several concerns overlap, the wording gets harder. A teacher trying to write about ${issueText}, ${subjectLabel(seed.subject)}, and ${studentTypeLabel(seed.studentType)} needs language that stays clear without becoming cold. This page gives you a practical structure, editable examples, and a safer starting point for a message you still control.`;
    case "uk-school-communication":
      return `School communication in the UK often needs to sound warm, professional, and evidence-aware all at once. If you are writing for ${schoolTypeLabel(seed.schoolType)}, the examples on this page help you handle the tone carefully, keep the wording proportionate, and avoid phrases that can read badly to parents, Ofsted, or internal leaders.`;
  }
}

function commonPitfalls(seed: PageSeed): string[] {
  const issue = issueLabel(seed.issue);
  return [
    `Writing too quickly and sounding sharper than you intended when discussing ${issue || "a sensitive concern"}.`,
    "Including too much background before the main point, which makes the message harder to follow.",
    "Using vague phrases such as 'ongoing concerns' without one concrete example or next step.",
    "Trying to sound formal by using stiff wording that can feel distant or defensive.",
    "Sending a message before checking whether the tone still feels fair if read aloud.",
  ];
}

function exampleDrafts(seed: PageSeed): string[] {
  const yearText = seed.yearGroup ? yearLabel(seed.yearGroup) : "this class";
  const subjectText = subjectLabel(seed.subject) || "class work";
  const issueText = issueLabel(seed.issue) || "the concern";
  const studentText = studentTypeLabel(seed.studentType) || "the pupil";
  const contextText = seed.context?.replace(/-/g, " ") || "the situation";

  return [
    `Dear Parent/Carer,\n\nI wanted to share a brief update about ${issueText} in ${yearText}. Today I noticed that ${studentText === "the pupil" ? "your child" : "the student"} found it difficult to stay focused during ${subjectText}, which affected the amount of work completed. We have already used the usual classroom reminders and I will continue to support this carefully in school.\n\nIf you are able to reinforce the same expectations at home, that consistency would help. Please let me know if there is anything relevant I should be aware of.\n\nKind regards,\n[Teacher Name]`,
    `Hello,\n\nThank you for your message about ${contextText}. I understand why you wanted clarification. My aim is to keep communication clear and fair, so I have summarised the situation below. In class, the concern has been ${issueText}, and the main impact has been on ${subjectText} and confidence.\n\nThe next step from school is [insert action]. If it would be helpful, I am happy to arrange a short follow-up conversation.\n\nBest wishes,\n[Teacher Name]`,
    `Dear Parent/Carer,\n\nI am writing to keep you informed about a pattern I have seen over the past two weeks. During ${subjectText}, there have been repeated occasions where expectations have not been met, particularly around ${issueText}. I wanted to let you know early so we can address this supportively rather than waiting until it becomes a bigger issue.\n\nWe will continue to encourage, remind, and monitor closely in school. Thank you for your support.\n\nKind regards,\n[Teacher Name]`,
    `Hello,\n\nThere is plenty to be positive about with ${studentText}, and I want to keep that balanced in this message. At the same time, I need to be honest that ${issueText} has begun to affect progress. My intention is not to alarm you, but to make sure we are working together with a shared understanding.\n\nI will keep you updated and will review the impact of the current support by [timeframe].\n\nBest wishes,\n[Teacher Name]`,
  ];
}

function faqItems(seed: PageSeed): Array<{ question: string; answer: string }> {
  const keyword = issueKeyword(seed.issue);
  const phase = phaseLabel(seed.phase) || "school";
  const year = yearLabel(seed.yearGroup) || "this year group";

  return [
    {
      question: `How do I write a ${keyword} message without sounding harsh?`,
      answer:
        "Keep the wording factual, short, and specific. Name the concern, give one example, and finish with the next step rather than extended justification.",
    },
    {
      question: `Should I mention previous incidents in a ${phase} message?`,
      answer:
        "Only if it helps explain a current pattern and is relevant to the action you are taking now. Avoid listing old issues that do not move the conversation forward.",
    },
    {
      question: `How can I sound professional in ${year}?`,
      answer:
        "Use plain language, avoid emotionally loaded phrases, and read the draft aloud once before sending. If it sounds sharper aloud, soften the sentence structure rather than the core fact.",
    },
    {
      question: "Can I use AI to draft parent communication safely?",
      answer:
        "It can help as a starting point if the tool is conservative, teacher-focused, and designed for editing. You should always check tone, accuracy, and context before using any draft.",
    },
    {
      question: "What should I avoid in a difficult parent email?",
      answer:
        "Avoid blame, sarcasm, vague references, or absolute statements. These tend to raise tension and create more follow-up work.",
    },
    {
      question: "How does Zaza Draft fit into this process?",
      answer:
        "Zaza Draft helps you generate teacher-first wording quickly, then lets you edit and approve every word. It is a co-writer, not a replacement for your judgement.",
    },
    {
      question:
        "Can these examples work for safeguarding-sensitive situations?",
      answer:
        "They can help with structure and tone, but safeguarding concerns should always follow your school policy, DSL guidance, and approved reporting processes.",
    },
  ];
}

function stepByStepItems(seed: PageSeed): string[] {
  return [
    `Write the core fact in one sentence. For this page, that means naming ${issueLabel(seed.issue) || "the concern"} without extra emotion.`,
    "Add one specific example or timeframe so the message sounds grounded rather than vague.",
    "State the action already taken in school or the purpose of the message.",
    "End with one next step, invitation, or request so the reader knows what happens now.",
    "Read the draft aloud once. If it sounds defensive, tighten the wording rather than adding more explanation.",
  ];
}

function relatedPagesBlock(links: RelatedLink[]): string {
  const lines = links.map((link) => `- [${link.title}](${link.href})`);
  return ["## Related Pages", ...lines].join("\n");
}

function trustBlock(): string {
  return [
    "## Why Teachers Use Zaza Draft Carefully",
    "Zaza Draft is built as a teacher-first co-writer for parent communication, report comments, and tone-sensitive school writing.",
    "",
    "- You stay in full control and approve every word before it is used.",
    "- It is designed for calm, professional wording rather than generic AI output.",
    "- It helps reduce drafting time without asking you to hand over professional judgement.",
    "- It is shaped around real school communication needs, including SEN, behaviour, parents' evening, and report comments.",
    "- It supports safer drafting habits, including factual wording and GDPR-aware caution around personal detail.",
  ].join("\n");
}

function ctaBlock(): string {
  return [
    "## Ready to Draft Calmly?",
    "If you want a calmer first draft for your next email, report comment, or difficult reply, Zaza Draft gives you a professional starting point that you can adapt quickly. It is designed to reduce stress, protect tone, and keep you in control of every final decision.",
    "",
    `**${CTA_LABEL}**`,
  ].join("\n");
}

function faqBlock(items: Array<{ question: string; answer: string }>): string {
  const lines = items.flatMap((item) => [
    `### ${item.question}`,
    item.answer,
    "",
  ]);
  return ["## FAQ", ...lines].join("\n").trim();
}

function stepByStepBlock(items: string[]): string {
  const lines = items.map((item, index) => `${index + 1}. ${item}`);
  return ["## Step-by-Step Guidance", ...lines].join("\n");
}

function renderExamples(seed: PageSeed): string {
  const examples = exampleDrafts(seed);
  const blocks = examples.map((example, index) => {
    return [`### Example ${index + 1}`, example].join("\n\n");
  });

  return ["## Example Drafts You Can Edit", ...blocks].join("\n\n");
}

function renderPitfalls(seed: PageSeed): string {
  const lines = commonPitfalls(seed).map((item) => `- ${item}`);
  return ["## Common Pitfalls to Avoid", ...lines].join("\n");
}

function renderControlSection(seed: PageSeed): string {
  const useCase =
    seed.category === "report-comments"
      ? "report comment wording"
      : seed.category === "alternatives"
        ? "teacher writing tasks where tone matters"
        : "parent communication and school writing";

  return [
    "## How Zaza Draft Helps You Stay in Control",
    `Zaza Draft is designed for ${useCase}. It gives you a faster first draft, but it does not replace your judgement. You review and edit everything before it is used.`,
    "",
    "This matters in schools because tone carries professional risk. A message can be factually right and still feel wrong when a parent, colleague, or senior leader reads it. Zaza Draft helps you begin with calmer wording, but the final decision remains yours.",
    "",
    "Use it to test phrasing, soften a sentence without losing clarity, or turn a rough note into a more professional draft. Keep identifying details to the minimum needed, follow school policy, and make the final call yourself.",
  ].join("\n");
}

function renderProblemBody(seed: PageSeed): string {
  return [
    `## Why Tone Matters in ${yearLabel(seed.yearGroup) || phaseLabel(seed.phase)} ${issueLabel(seed.issue)} Emails`,
    featuredSnippet(seed),
    "",
    `Teachers often search for help with ${issueKeyword(seed.issue)} because the hard part is not only what to say. It is how to say it without creating more tension, more emails, or more emotional labour for yourself tomorrow. In ${yearLabel(seed.yearGroup) || phaseLabel(seed.phase)} settings, families are reading your wording through their own stress as well. Clear, proportionate language usually works better than lengthy explanation.`,
    "",
    "A strong message does three things at once. It keeps the concern factual, it protects the relationship, and it leaves a clear next step. That is the balance the examples on this page are trying to support.",
  ].join("\n");
}

function renderReplyBody(seed: PageSeed): string {
  return [
    `## How to Reply When ${seed.trigger?.replace(/-/g, " ") || "communication becomes difficult"}`,
    featuredSnippet(seed),
    "",
    `When you need to reply around ${seed.context?.replace(/-/g, " ") || "a sensitive issue"}, speed can work against you. The more pressured the situation feels, the easier it is to over-explain, sound clipped, or leave out the one sentence that would have made the message feel fair. A useful reply acknowledges the concern, names the current position, and keeps the door open for appropriate next steps.`,
    "",
    "If the matter could escalate, draft slowly, keep to observable facts, and avoid guessing at motive. That reduces risk and tends to reduce the amount of follow-up you have to manage later.",
  ].join("\n");
}

function renderReportBody(seed: PageSeed): string {
  return [
    `## Report Comments for ${studentTypeLabel(seed.studentType)} in ${subjectLabel(seed.subject)} ${yearLabel(seed.yearGroup)}`,
    featuredSnippet(seed),
    "",
    "Good report comments are concise, evidence-aware, and humane. They should help families understand progress without sounding inflated or overly negative. For teachers, the challenge is often finding wording that remains honest about the barrier while still sounding respectful and constructive.",
    "",
    `For ${studentTypeLabel(seed.studentType)}, the tone often matters as much as the content. Small wording choices can affect whether a comment reads as supportive, evasive, or unfair. The samples below are built to preserve balance while saving you time.`,
  ].join("\n");
}

function renderAlternativeBody(seed: PageSeed): string {
  return [
    `## Zaza Draft vs ${toolLabel(seed.tool)} for ${useCaseLabel(seed.useCase)}`,
    featuredSnippet(seed),
    "",
    `${toolLabel(seed.tool)} is broader. Zaza Draft is more focused. That distinction matters if you want help with wording that will be read by parents, colleagues, or senior leaders. Teachers often do not need more features. They need calmer drafting for messages where tone can easily be misread.`,
    "",
    "A fair comparison should look at the actual task. If you are writing a quick worksheet prompt, a generic tool may be enough. If you are drafting a difficult parent reply or a report comment that needs to sound professional and measured, a dedicated writing co-pilot is often a better fit.",
  ].join("\n");
}

function renderCombinationBody(seed: PageSeed): string {
  return [
    `## What to Say About ${issueLabel(seed.issue)} in ${subjectLabel(seed.subject)} for ${studentTypeLabel(seed.studentType)}`,
    featuredSnippet(seed),
    "",
    "Combination scenarios are where teachers often lose the most time. A student may be trying hard but still struggling with attention, social confidence, or homework consistency. That makes the wording harder because a one-note message can sound unfair. The goal here is to help you write with nuance without losing clarity.",
    "",
    "Use the examples below as a base. Keep what fits, remove what does not, and ground the final version in what you have genuinely seen and recorded.",
  ].join("\n");
}

function renderUkVariationBody(seed: PageSeed): string {
  return [
    `## ${titleCase(seed.slug.replace(/-/g, " "))}`,
    featuredSnippet(seed),
    "",
    `UK school communication is shaped by context. Messages for ${schoolTypeLabel(seed.schoolType)} may need to align with parents' evening routines, behaviour policy wording, pastoral expectations, or Ofsted-conscious professionalism. In practice, that means writing with more care than a generic template usually offers.`,
    "",
    "The sections below give you teacher-friendly wording that feels professional and measured, while still leaving room for your own school systems and judgement.",
  ].join("\n");
}

function appendWordCountPadding(content: string, seed: PageSeed): string {
  let nextContent = content;
  let safetyCounter = 0;

  while (countWords(nextContent) < MIN_WORD_COUNT && safetyCounter < 6) {
    nextContent += `\n\n## Practical Note ${safetyCounter + 1}\nIn real school life, wording needs to match the context, not just the category. If you are adapting this draft for ${yearLabel(seed.yearGroup) || phaseLabel(seed.phase) || "your class"}, keep the strongest sentence simple, remove anything that sounds defensive, and check whether the final version would still feel proportionate if read by a parent, form tutor, head of year, or SLT colleague. Teachers usually save the most time when they start with a calm draft, trim what they do not need, and keep one clear action at the end. That approach helps the message stay professional without becoming cold or over-written.`;
    safetyCounter += 1;
  }

  return nextContent;
}

function applyHouseStyle(content: string): string {
  let nextContent = content;

  for (const [pattern, replacement] of UK_SPELLING_REPLACEMENTS) {
    nextContent = nextContent.replace(pattern, replacement);
  }

  nextContent = nextContent.replace(/—/g, "-");
  return nextContent;
}

function enforceGuardrails(content: string): string {
  const lowered = content.toLowerCase();
  for (const bannedTerm of BANNED_TERMS) {
    if (lowered.includes(bannedTerm)) {
      throw new Error(`Generated content contains banned term: ${bannedTerm}`);
    }
  }

  if (
    !lowered.includes("you stay in control") &&
    !lowered.includes("approve every word")
  ) {
    throw new Error("Generated content must emphasise teacher control.");
  }

  if (!lowered.includes("gdpr")) {
    throw new Error("Generated content must mention GDPR-aware caution.");
  }

  return content;
}

function buildRelatedLinks(seed: PageSeed): RelatedLink[] {
  const links: RelatedLink[] = [];

  links.push({
    title: "Parent communication problems hub",
    href: "/parent-communication-problems",
  });
  links.push({
    title: "Reply scenarios hub",
    href: "/reply-scenarios",
  });
  links.push({
    title: "Report comment builder",
    href: "/report-comment-builder",
  });
  links.push({
    title: "UK school communication",
    href: "/uk-school-communication",
  });
  links.push({
    title: "Alternatives for teacher writing tools",
    href: "/alternatives",
  });

  if (seed.category !== "problems" && seed.phase && seed.issue) {
    links.push({
      title: `How to handle ${issueLabel(seed.issue)} in ${phaseLabel(seed.phase)}`,
      href: `/problems/${seed.phase}/${seed.issue}`,
    });
  }

  return links.slice(0, MAX_RELATED_LINKS);
}

function renderBody(seed: PageSeed): string {
  switch (seed.category) {
    case "problems":
      return renderProblemBody(seed);
    case "reply":
      return renderReplyBody(seed);
    case "report-comments":
      return renderReportBody(seed);
    case "alternatives":
      return renderAlternativeBody(seed);
    case "scenario-combinations":
      return renderCombinationBody(seed);
    case "uk-school-communication":
      return renderUkVariationBody(seed);
  }
}

function renderPage(seed: PageSeed): GeneratedPage {
  const title = buildTitle(seed);
  const description = buildDescription(seed);
  const keywords = buildKeywords(seed);
  const relatedLinks = buildRelatedLinks(seed);
  const bodyParts = [
    `# ${title}`,
    heroParagraph(seed),
    renderBody(seed),
    renderPitfalls(seed),
    renderExamples(seed),
    renderControlSection(seed),
    stepByStepBlock(stepByStepItems(seed)),
    faqBlock(faqItems(seed)),
    relatedPagesBlock(relatedLinks),
    trustBlock(),
    ctaBlock(),
  ];

  let markdown = bodyParts.join("\n\n");
  markdown = appendWordCountPadding(markdown, seed);
  markdown = applyHouseStyle(markdown);
  markdown = enforceGuardrails(markdown);

  const wordCount = countWords(markdown);
  if (wordCount < MIN_WORD_COUNT) {
    throw new Error(`Generated page under minimum word count: ${wordCount}`);
  }

  const frontmatter: Record<string, string> = {
    title,
    description,
    slug: seed.slug,
    keywords: keywordsToString(keywords),
    category: seed.category,
    searchIntent: seed.searchIntent,
    phase: seed.phase ?? "",
    issue: seed.issue ?? "",
    yearGroup: seed.yearGroup ?? "",
    subject: seed.subject ?? "",
    trigger: seed.trigger ?? "",
    context: seed.context ?? "",
    studentType: seed.studentType ?? "",
    tool: seed.tool ?? "",
    useCase: seed.useCase ?? "",
    schoolType: seed.schoolType ?? "",
    wordCount: String(wordCount),
  };

  return {
    frontmatter,
    markdown: `${frontmatterBlock(frontmatter)}\n\n${markdown}\n`,
    wordCount,
    keywords,
    relatedLinks,
  };
}

function buildTitle(seed: PageSeed): string {
  switch (seed.category) {
    case "problems":
      return `How to Write ${issueLabel(seed.issue)} Emails to Parents - ${yearLabel(seed.yearGroup) || phaseLabel(seed.phase)}`;
    case "reply":
      return `How to Reply When ${seed.trigger?.replace(/-/g, " ")} - ${labelFromSlug(seed.context ?? "school-context")}`;
    case "report-comments":
      return `Report Comments for ${labelFromSlug(seed.studentType ?? "student")} - ${subjectLabel(seed.subject)} ${yearLabel(seed.yearGroup)}`;
    case "alternatives":
      return `Zaza Draft vs ${toolLabel(seed.tool)} for ${useCaseLabel(seed.useCase)}`;
    case "scenario-combinations":
      return `What to Say About ${issueLabel(seed.issue)} - ${labelFromSlug(seed.studentType ?? "student")} ${subjectLabel(seed.subject)}`;
    case "uk-school-communication":
      return `${titleCase(seed.slug.replace(/-/g, " "))}`;
  }
}

function buildDescription(seed: PageSeed): string {
  switch (seed.category) {
    case "problems":
      return `Calm, professional wording for ${issueLabel(seed.issue)} in ${yearLabel(seed.yearGroup) || phaseLabel(seed.phase)}. Save time and reduce stress with teacher-first suggestions you fully control.`;
    case "reply":
      return `Clear, professional guidance for teachers replying when ${seed.trigger?.replace(/-/g, " ")}. Use safer wording, avoid tone mistakes, and keep full control of every message.`;
    case "report-comments":
      return `Balanced ${subjectLabel(seed.subject)} report comments for ${studentTypeLabel(seed.studentType)} in ${yearLabel(seed.yearGroup)}. Honest, calm examples that teachers can edit and approve.`;
    case "alternatives":
      return `Fair comparison of Zaza Draft and ${toolLabel(seed.tool)} for ${useCaseLabel(seed.useCase)}. See which tool is better for calm, professional teacher wording.`;
    case "scenario-combinations":
      return `Teacher-first wording for overlapping school concerns, including ${issueLabel(seed.issue)} and ${subjectLabel(seed.subject)}. Practical examples, FAQ, and calmer drafts you control.`;
    case "uk-school-communication":
      return `UK-specific school communication guidance with calm, professional examples for teachers. Reduce drafting stress and keep control of every final message.`;
  }
}

function buildKeywords(seed: PageSeed): string[] {
  const keywords = new Set<string>();

  keywords.add(issueKeyword(seed.issue));
  keywords.add("teacher parent communication");
  keywords.add("professional teacher tone");
  keywords.add("UK school communication");

  if (seed.yearGroup) {
    keywords.add(`${yearLabel(seed.yearGroup).toLowerCase()} parent email`);
  }

  if (seed.phase) {
    keywords.add(
      `${phaseLabel(seed.phase).toLowerCase()} teacher communication`,
    );
  }

  if (seed.subject) {
    keywords.add(`${subjectLabel(seed.subject)} report comments`);
  }

  if (seed.tool) {
    keywords.add(`alternative to ${toolLabel(seed.tool).toLowerCase()}`);
  }

  if (seed.useCase) {
    keywords.add(useCaseLabel(seed.useCase));
  }

  return [...keywords].filter(Boolean);
}

function makeProblemSeeds(matrix: LoadedMatrix): PageSeed[] {
  const issuePool = [
    "behaviour",
    "missing-homework",
    "angry-parent-reply",
    "grade-complaint",
  ];
  const seeds: PageSeed[] = [];

  for (const yearGroup of matrix.yearGroups) {
    const phase = phaseForYearGroup(yearGroup);
    for (const issue of issuePool) {
      seeds.push({
        category: "problems",
        slug: slugify(
          `how-to-write-${issue}-email-to-parents-${yearGroup}-${phase}`,
        ),
        phase,
        issue,
        yearGroup,
        searchIntent: "how-to",
      });
    }
  }

  return seeds;
}

function makeReplySeeds(matrix: LoadedMatrix): PageSeed[] {
  const seeds: PageSeed[] = [];

  for (const trigger of matrix.triggers) {
    for (const context of matrix.replyContexts) {
      seeds.push({
        category: "reply",
        slug: slugify(`how-to-reply-when-${trigger}-${context}`),
        trigger,
        context,
        searchIntent: "how-to",
      });
    }
  }

  return seeds;
}

function makeReportSeeds(matrix: LoadedMatrix): PageSeed[] {
  const seeds: PageSeed[] = [];
  const reportYears = matrix.yearGroups.filter((entry) => entry !== "year-1");

  for (const studentType of matrix.studentTypes) {
    for (const subject of matrix.subjects) {
      for (const yearGroup of reportYears.slice(0, 8)) {
        seeds.push({
          category: "report-comments",
          slug: slugify(
            `report-comments-${studentType}-${subject}-${yearGroup}`,
          ),
          studentType,
          subject,
          yearGroup,
          searchIntent: "tool",
        });
      }
    }
  }

  return seeds;
}

function makeAlternativeSeeds(matrix: LoadedMatrix): PageSeed[] {
  const seeds: PageSeed[] = [];

  for (const tool of matrix.comparisonTools) {
    for (const useCase of matrix.comparisonUseCases) {
      seeds.push({
        category: "alternatives",
        slug: slugify(`zaza-draft-vs-${tool}-${useCase}`),
        tool,
        useCase,
        searchIntent: "alternative",
      });
    }
  }

  return seeds;
}

function makeCombinationSeeds(matrix: LoadedMatrix): PageSeed[] {
  const seeds: PageSeed[] = [];
  const issuePool = ["behaviour", "low-attainment", "sen-support", "anxiety"];

  for (const studentType of matrix.studentTypes.slice(0, 4)) {
    for (const subject of matrix.subjects.slice(0, 3)) {
      for (const issue of issuePool) {
        seeds.push({
          category: "scenario-combinations",
          slug: slugify(`what-to-say-${issue}-${studentType}-${subject}`),
          issue,
          studentType,
          subject,
          searchIntent: "how-to",
        });
      }
    }
  }

  return seeds;
}

function makeUkVariationSeeds(matrix: LoadedMatrix): PageSeed[] {
  const templates = [
    "parent-email-template",
    "parents-evening-email-script",
    "ofsted-friendly-report-comments",
    "behaviour-letter-home",
  ];
  const seeds: PageSeed[] = [];

  for (const schoolType of matrix.schoolTypes) {
    for (const template of templates) {
      seeds.push({
        category: "uk-school-communication",
        slug: slugify(`${template}-${schoolType}`),
        schoolType,
        searchIntent: "template",
      });
    }
  }

  return seeds;
}

function makeSeedsFromCsvRows(rows: CsvRow[]): PageSeed[] {
  return rows
    .filter((row): row is CsvRow & { category: PageCategory } =>
      Boolean(row.category),
    )
    .map((row) => ({
      category: row.category,
      slug: row.slug ?? slugify(Object.values(row).filter(Boolean).join("-")),
      phase: row.phase,
      issue: row.issue,
      yearGroup: row.yearGroup,
      subject: row.subject,
      trigger: row.trigger,
      context: row.context,
      studentType: row.studentType,
      tool: row.tool,
      useCase: row.useCase,
      schoolType: row.schoolType,
      searchIntent:
        row.category === "alternatives"
          ? "alternative"
          : row.category === "uk-school-communication"
            ? "template"
            : "how-to",
    }));
}

function uniqueSeeds(seeds: PageSeed[]): PageSeed[] {
  const seen = new Set<string>();
  return seeds.filter((seed) => {
    if (seen.has(seed.slug)) {
      return false;
    }
    seen.add(seed.slug);
    return true;
  });
}

function buildSeedSet(matrix: LoadedMatrix, limit: number | null): PageSeed[] {
  const seeds = uniqueSeeds([
    ...makeProblemSeeds(matrix),
    ...makeReplySeeds(matrix),
    ...makeReportSeeds(matrix),
    ...makeAlternativeSeeds(matrix),
    ...makeCombinationSeeds(matrix),
    ...makeUkVariationSeeds(matrix),
    ...makeSeedsFromCsvRows(matrix.csvRows),
  ]);

  if (!limit || limit <= 0) {
    return seeds;
  }

  return seeds.slice(0, limit);
}

async function writeIfNeeded(
  filePath: string,
  contents: string,
  overwrite: boolean,
  dryRun: boolean,
): Promise<"written" | "skipped"> {
  try {
    await fs.access(filePath);
    if (!overwrite) {
      return "skipped";
    }
  } catch {
    // File does not exist yet.
  }

  if (dryRun) {
    console.log(`[dry-run] write ${filePath}`);
    return "written";
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents, "utf8");
  return "written";
}

function sitemapSnippet(slugs: string[]): string {
  const lines = slugs.map(
    (slug) =>
      `  { url: \`${"${siteUrl}"}/${slug}\`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },`,
  );

  return [
    'import type { MetadataRoute } from "next";',
    "",
    'const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zazadraft.com";',
    "",
    "export function generatedProgrammaticEntries(): MetadataRoute.Sitemap {",
    "  return [",
    ...lines,
    "  ];",
    "}",
    "",
    "// In app/sitemap.ts:",
    "// return [...staticRoutes, ...generatedProgrammaticEntries()];",
  ].join("\n");
}

function staticParamsSnippet(slugs: string[]): string {
  const lines = slugs.map((slug) => `  "${slug}",`);
  return [
    'import { promises as fs } from "node:fs";',
    'import path from "node:path";',
    "",
    "export async function generateStaticParams() {",
    '  const directory = path.join(process.cwd(), "generated-pages");',
    "  const files = await fs.readdir(directory);",
    "  return files",
    '    .filter((file) => file.endsWith(".md"))',
    '    .map((file) => ({ slug: file.replace(/\\.md$/, "") }));',
    "}",
    "",
    "export const generatedSeedSlugs = [",
    ...lines,
    "] as const;",
  ].join("\n");
}

async function writeRunArtifacts(
  outputDir: string,
  stats: GenerationStats,
  slugs: string[],
  dryRun: boolean,
): Promise<void> {
  const metaDir = path.join(outputDir, "_meta");
  const summary = JSON.stringify(
    {
      ...stats,
      averageWords:
        stats.generated > 0
          ? Math.round(stats.totalWords / stats.generated)
          : 0,
      createdAt: new Date().toISOString(),
    },
    null,
    2,
  );
  const matrixExample = JSON.stringify(defaultMatrix, null, 2);
  const files: Array<[string, string]> = [
    [path.join(metaDir, "run-summary.json"), summary],
    [path.join(metaDir, "sitemap-snippet.ts"), sitemapSnippet(slugs)],
    [
      path.join(metaDir, "generate-static-params-snippet.ts"),
      staticParamsSnippet(slugs),
    ],
    [path.join(metaDir, "matrix-example.json"), matrixExample],
  ];

  for (const [filePath, contents] of files) {
    if (dryRun) {
      console.log(`[dry-run] write ${filePath}`);
      continue;
    }

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, contents, "utf8");
  }
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const matrix = await loadMatrix(options.matrixPath);
  const seeds = buildSeedSet(matrix, options.limit);
  const stats: GenerationStats = {
    attempted: seeds.length,
    generated: 0,
    skippedDuplicates: 0,
    skippedQuality: 0,
    totalWords: 0,
    minWords: Number.POSITIVE_INFINITY,
    maxWords: 0,
    sampleSlugs: [],
  };
  const createdSlugs: string[] = [];

  console.log(
    `Generating up to ${seeds.length} programmatic pages into ${options.outputDir}`,
  );

  for (const [index, seed] of seeds.entries()) {
    const filePath = path.join(options.outputDir, `${seed.slug}.md`);

    try {
      const page = renderPage(seed);
      const result = await writeIfNeeded(
        filePath,
        page.markdown,
        options.overwrite,
        options.dryRun,
      );

      if (result === "skipped") {
        stats.skippedDuplicates += 1;
        console.log(
          `[${index + 1}/${seeds.length}] skipped duplicate ${seed.slug}`,
        );
        continue;
      }

      stats.generated += 1;
      stats.totalWords += page.wordCount;
      stats.minWords = Math.min(stats.minWords, page.wordCount);
      stats.maxWords = Math.max(stats.maxWords, page.wordCount);
      if (stats.sampleSlugs.length < 10) {
        stats.sampleSlugs.push(seed.slug);
      }
      createdSlugs.push(seed.slug);
      console.log(
        `[${index + 1}/${seeds.length}] generated ${seed.slug} (${page.wordCount} words)`,
      );
    } catch (error) {
      stats.skippedQuality += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.warn(
        `[${index + 1}/${seeds.length}] skipped ${seed.slug}: ${message}`,
      );
    }
  }

  if (stats.minWords === Number.POSITIVE_INFINITY) {
    stats.minWords = 0;
  }

  await writeRunArtifacts(
    options.outputDir,
    stats,
    createdSlugs,
    options.dryRun,
  );

  const averageWords =
    stats.generated > 0 ? Math.round(stats.totalWords / stats.generated) : 0;
  console.log("");
  console.log("Summary");
  console.log(`- Attempted: ${stats.attempted}`);
  console.log(`- Generated: ${stats.generated}`);
  console.log(`- Skipped duplicates: ${stats.skippedDuplicates}`);
  console.log(`- Skipped quality: ${stats.skippedQuality}`);
  console.log(`- Word count range: ${stats.minWords} to ${stats.maxWords}`);
  console.log(`- Average words: ${averageWords}`);
  console.log(`- Sample slugs: ${stats.sampleSlugs.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
