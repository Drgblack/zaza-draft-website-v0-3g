import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getAllPostsByLanguage, type BlogPost } from "../lib/cms/posts";

type ExpansionFamilyId =
  | "parent-communication"
  | "report-comments"
  | "safe-ai"
  | "workload-reduction";

type VariantDefinition = {
  slug: string;
  title: string;
  keyword: string;
  searchIntent: string;
  hubPath: string;
  examples: string[];
  pitfalls: string[];
  steps: string[];
  relatedLinks: Array<{ label: string; href: string }>;
};

type ExpansionFamily = {
  id: ExpansionFamilyId;
  matches: string[];
  hubPath: string;
  variants: VariantDefinition[];
};

type GeneratedVariant = {
  seedSlug: string;
  sourceBlogTitle: string;
  sourceBlogSlug: string;
  variant: string;
  title: string;
  description: string;
  path: string;
  filePath: string;
  family: ExpansionFamilyId;
  wordCount: number;
};

type Manifest = {
  generatedAt: string;
  totalSeeds: number;
  totalPages: number;
  first50: string[];
  pages: GeneratedVariant[];
};

const OUTPUT_DIR = path.join(process.cwd(), "expanded-pages");
const META_DIR = path.join(OUTPUT_DIR, "_meta");
const MANIFEST_PATH = path.join(META_DIR, "manifest.json");
const FIRST50_PATH = path.join(META_DIR, "first-50.txt");

const families: ExpansionFamily[] = [
  {
    id: "parent-communication",
    matches: [
      "parent",
      "parents",
      "communication",
      "angry parent",
      "de-escalation",
      "behavior",
      "behaviour",
      "email",
    ],
    hubPath: "/teacher-parent-communication-hub",
    variants: [
      variant(
        "angry-parent-email-primary",
        "How to Reply to an Angry Parent Email in Primary",
        "angry parent email primary teacher",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "angry-parent-email-secondary",
        "How to Reply to an Angry Parent Email in Secondary",
        "angry parent email secondary teacher",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "parents-evening-follow-up-ks2",
        "Parents' Evening Follow-Up Email for KS2",
        "parents' evening follow-up email ks2",
        "Template intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "parents-evening-follow-up-secondary",
        "Parents' Evening Follow-Up Email for Secondary",
        "parents' evening follow-up email secondary",
        "Template intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "behaviour-letter-home-year-5",
        "Behaviour Letter Home for Year 5",
        "behaviour letter home year 5",
        "Template intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "homework-follow-up-ks3",
        "Homework Follow-Up Email for KS3",
        "missing homework email ks3 teacher",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "attendance-concern-primary",
        "Attendance Concern Email for Primary",
        "attendance concern email primary school",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "sen-parent-update-primary",
        "SEN Parent Update Email for Primary",
        "sen parent update email primary",
        "Template intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "positive-update-ks1",
        "Positive Parent Update Email for KS1",
        "positive parent email ks1",
        "Template intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "parent-ignores-email-ks4",
        "What to Send When a Parent Ignores Your Email in KS4",
        "parent ignores email ks4",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "phone-call-summary-secondary",
        "Phone Call Summary Email for Secondary",
        "phone call summary email to parents secondary",
        "Template intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "safeguarding-sensitive-update-fe",
        "Safeguarding-Sensitive Parent Update for FE",
        "safeguarding sensitive parent update fe",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
    ],
  },
  {
    id: "report-comments",
    matches: ["report", "comment", "comments", "report card", "grading"],
    hubPath: "/report-comments",
    variants: [
      variant(
        "struggling-english-ks2",
        "Report Comments for a Struggling Pupil in English KS2",
        "report comments struggling pupil english ks2",
        "Template intent",
        "/report-comments",
      ),
      variant(
        "struggling-maths-ks3",
        "Report Comments for a Struggling Pupil in Maths KS3",
        "report comments struggling pupil maths ks3",
        "Template intent",
        "/report-comments",
      ),
      variant(
        "sen-all-subjects-primary",
        "SEN Report Comments for Primary All Subjects",
        "sen report comments primary all subjects",
        "Template intent",
        "/report-comments",
      ),
      variant(
        "anxious-eal-all-subjects-ks2",
        "Report Comments for an Anxious EAL Pupil in KS2",
        "report comments anxious eal ks2",
        "Template intent",
        "/report-comments",
      ),
      variant(
        "high-attaining-disorganised-science-ks4",
        "Report Comments for a High-Attaining but Disorganised Pupil in KS4 Science",
        "high attaining disorganised report comments ks4 science",
        "Template intent",
        "/report-comments",
      ),
      variant(
        "positive-end-of-term-primary",
        "Positive End-of-Term Report Comments for Primary",
        "positive end of term report comments primary",
        "Template intent",
        "/report-comments",
      ),
      variant(
        "honest-but-kind-secondary",
        "Honest but Kind Report Comments for Secondary",
        "honest but kind report comments secondary",
        "Template intent",
        "/report-comments",
      ),
      variant(
        "effort-vs-attainment-ks4",
        "Report Comments on Effort Versus Attainment in KS4",
        "effort vs attainment report comments ks4",
        "How-to/problem intent",
        "/report-comments",
      ),
      variant(
        "parents-evening-aligned-primary",
        "Report Comments That Match Parents' Evening Conversations in Primary",
        "report comments parents' evening primary",
        "How-to/problem intent",
        "/report-comments",
      ),
      variant(
        "form-tutor-fe",
        "Form Tutor Report Comments for FE",
        "form tutor report comments fe",
        "Template intent",
        "/report-comments",
      ),
      variant(
        "ofsted-friendly-secondary",
        "Ofsted-Friendly Report Comments for Secondary",
        "ofsted-friendly report comments secondary",
        "How-to/problem intent",
        "/report-comments",
      ),
      variant(
        "quick-bank-ks1",
        "Quick Report Comment Bank for KS1",
        "quick report comment bank ks1",
        "Tool intent",
        "/report-comments",
      ),
    ],
  },
  {
    id: "safe-ai",
    matches: [
      "safe ai",
      "hallucination",
      "gdpr",
      "privacy",
      "risk",
      "responsible",
      "trust",
    ],
    hubPath: "/teacher-parent-communication-hub",
    variants: [
      variant(
        "parent-emails-no-invented-facts",
        "Safe AI for Parent Emails Without Invented Facts",
        "safe ai parent emails no invented facts",
        "Tool intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "report-comments-gdpr-safe",
        "GDPR-Safe AI Help for Report Comments",
        "gdpr safe ai report comments",
        "Tool intent",
        "/report-comments",
      ),
      variant(
        "behaviour-notes-professional-tone",
        "Safe AI for Behaviour Notes with a Professional Tone",
        "safe ai behaviour notes professional tone",
        "Tool intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "slt-documentation-uk-schools",
        "Safe AI for SLT Documentation in UK Schools",
        "safe ai slt documentation uk schools",
        "Tool intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "sen-support-person-centred-language",
        "Safe AI for SEN Support Writing with Person-Centred Language",
        "safe ai sen support writing person centred language",
        "Tool intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "parents-evening-follow-up-low-risk",
        "Low-Risk AI Help for Parents' Evening Follow-Up Emails",
        "safe ai parents' evening follow-up email",
        "Tool intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "difficult-parent-replies-de-escalation",
        "Safe AI for Difficult Parent Replies and De-Escalation",
        "safe ai difficult parent reply de-escalation",
        "Tool intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "safeguarding-sensitive-drafting",
        "Safeguarding-Sensitive AI Drafting for Teachers",
        "safeguarding sensitive ai drafting teachers",
        "Tool intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "evidence-based-report-comments",
        "Evidence-Based AI Help for Report Comments",
        "evidence based ai report comments teachers",
        "Tool intent",
        "/report-comments",
      ),
      variant(
        "teacher-review-workflow",
        "Safe AI Workflow Where Teachers Review Every Word",
        "teacher review every word ai workflow",
        "Tool intent",
        "/teacher-parent-communication-hub",
      ),
    ],
  },
  {
    id: "workload-reduction",
    matches: [
      "workload",
      "save time",
      "stress",
      "burnout",
      "reduce workload",
      "weekend",
      "faster",
    ],
    hubPath: "/teacher-parent-communication-hub",
    variants: [
      variant(
        "parent-emails-primary",
        "Workload Reduction for Parent Emails in Primary",
        "reduce teacher workload parent emails primary",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "report-comments-ks2",
        "Workload Reduction for Report Comments in KS2",
        "reduce teacher workload report comments ks2",
        "How-to/problem intent",
        "/report-comments",
      ),
      variant(
        "behaviour-notes-secondary",
        "Workload Reduction for Behaviour Notes in Secondary",
        "reduce teacher workload behaviour notes secondary",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "slt-documentation-ks4",
        "Workload Reduction for SLT Documentation in KS4",
        "reduce teacher workload slt documentation ks4",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "parents-evening-follow-up-primary",
        "Workload Reduction for Parents' Evening Follow-Up in Primary",
        "reduce teacher workload parents' evening follow-up primary",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "end-of-term-comments-ks1",
        "Workload Reduction for End-of-Term Comments in KS1",
        "reduce teacher workload end of term comments ks1",
        "How-to/problem intent",
        "/report-comments",
      ),
      variant(
        "quick-replies-angry-parent-secondary",
        "Workload Reduction for Difficult Parent Replies in Secondary",
        "reduce workload angry parent reply secondary",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "sen-update-templates-primary",
        "Workload Reduction for SEN Update Templates in Primary",
        "reduce workload sen update templates primary",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "homework-follow-up-ks3",
        "Workload Reduction for Homework Follow-Up in KS3",
        "reduce workload homework follow up ks3",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
      variant(
        "pastoral-logging-fe",
        "Workload Reduction for Pastoral Logging in FE",
        "reduce workload pastoral logging fe",
        "How-to/problem intent",
        "/teacher-parent-communication-hub",
      ),
    ],
  },
];

function variant(
  slug: string,
  title: string,
  keyword: string,
  searchIntent: string,
  hubPath: string,
): VariantDefinition {
  return {
    slug,
    title,
    keyword,
    searchIntent,
    hubPath,
    examples: [
      "A short version for a tired Friday afternoon when the message still needs to sound professional.",
      "A fuller version that explains the concern clearly without overloading the parent or carer.",
      "A more measured version for emotionally sensitive situations where tone is the main risk.",
      "A quick version you can adapt when the facts are straightforward but the wording still matters.",
    ],
    pitfalls: [
      "Writing too much detail before you are clear about the single next step.",
      "Sounding colder than you intend because you are trying to be efficient.",
      "Letting generic AI wording flatten the school context or the emotional reality of the message.",
      "Forgetting that the safest draft still needs a final teacher review before it is used.",
    ],
    steps: [
      "Start with the core fact or purpose of the message.",
      "Choose the calmest wording that still feels honest.",
      "Add one practical next step instead of several competing requests.",
      "Trim anything that sounds legalistic, defensive, or overly vague.",
      "Review the draft as the parent, carer, or colleague will read it on a phone.",
    ],
    relatedLinks: [
      {
        label: "Parent Communication Diagnosis",
        href: "/diagnosis",
      },
      {
        label: "Zaza Draft for Teachers",
        href: "/products/draft",
      },
    ],
  };
}

function normaliseText(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9\s-]+/g, " ");
}

function ensureDirectory(directoryPath: string) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function removeDirectoryContents(directoryPath: string) {
  if (!fs.existsSync(directoryPath)) {
    return;
  }

  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    const resolvedPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      fs.rmSync(resolvedPath, { recursive: true, force: true });
      continue;
    }

    fs.rmSync(resolvedPath, { force: true });
  }
}

function detectFamily(post: BlogPost) {
  const haystack = normaliseText(
    [post.slug, post.title, post.excerpt, post.category, ...post.tags]
      .filter(Boolean)
      .join(" "),
  );

  const scored = families
    .map((family) => ({
      family,
      score: family.matches.filter((token) => haystack.includes(token)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

  return scored[0]?.family ?? null;
}

function qualifyPost(post: BlogPost) {
  const family = detectFamily(post);

  if (!family) {
    return null;
  }

  return {
    post,
    family,
  };
}

function buildDescription(post: BlogPost, variant: VariantDefinition) {
  return `${variant.keyword} help for teachers, with calm examples, safer wording, and a clear route back to ${post.title} and Zaza Draft.`;
}

function buildMarkdown(
  post: BlogPost,
  family: ExpansionFamily,
  variant: VariantDefinition,
) {
  const description = buildDescription(post, variant);
  const sourceBlogPath = `/blog/${post.slug}`;
  const compactExcerpt = post.excerpt.trim().replace(/\s+/g, " ");
  const title = `${variant.title} | Zaza Draft`;

  const lines = [
    `# ${variant.title}`,
    "",
    `${variant.title} is one of the specific writing jobs teachers often end up doing late, quickly, and with more emotional weight than anyone outside school realises. ${variant.keyword} searches usually happen because the draft matters, the tone feels risky, and the teacher wants something professional without sounding blunt, vague, or generic.`,
    "",
    `This page expands on [${post.title}](${sourceBlogPath}) and turns that broader idea into a narrower landing page with concrete wording, cleaner structure, and a calmer route into action. The aim is not to replace teacher judgement. It is to reduce blank-page stress while keeping the teacher fully in control.`,
    "",
    `If you are tired, under time pressure, or trying to avoid a tone mistake, start simple. Use the examples as a first draft, keep only the details that genuinely belong in the message, and make sure the final version still sounds like something you would stand behind in a school context.`,
    "",
    "## Quick Answer",
    "",
    `${variant.title} works best when the message does three things clearly: states the purpose or concern, keeps the wording proportionate, and ends with one practical next step. That is the safest route for parent communication, report writing, and other school messages where professional tone matters.`,
    "",
    "## Why This Task Quietly Becomes Heavy",
    "",
    `${compactExcerpt} The issue is rarely just the words on screen. It is the uncertainty around how the message will be received, whether it could escalate things, and whether it will create more follow-up work next week.`,
    "",
    "Teachers often know the facts already. The harder part is finding wording that is honest without sounding sharp, clear without sounding cold, and efficient without sounding careless. Generic AI tools can produce polished sentences, but tone-sensitive school writing usually needs more restraint and more context than a broad assistant naturally gives you.",
    "",
    `That is where a focused page like this helps. Instead of leaving you with a broad blog post and a blank draft, it narrows the task down to ${variant.keyword}, gives you language you can adapt, and links you back to the wider hub when you need a broader framework.`,
    "",
    "## Four Calm Examples You Can Adapt",
    "",
    ...variant.examples.flatMap((example, index) => [
      `### Example ${index + 1}`,
      "",
      `${example} Start with a simple opener, keep the main point factual, and close with one next step. For many teachers, that alone reduces most of the tone risk.`,
      "",
      `Draft line: "I wanted to share a brief update so that we can move forward clearly and calmly together. At the moment, the main issue is [insert verified point], and the next helpful step would be [insert one action]."`,
      "",
      "Why it works: the wording is measured, parent-facing, and does not try to say everything at once.",
      "",
    ]),
    "## A Practical Teacher-First Structure",
    "",
    ...variant.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "## Common Mistakes",
    "",
    ...variant.pitfalls.map((pitfall) => `- ${pitfall}`),
    "",
    "## How Zaza Draft Helps Safely",
    "",
    `Zaza Draft is designed for the kind of writing this page is about: parent emails, report comments, behaviour notes, and professional school communication where the teacher needs help with wording, not a replacement for judgement. If you already know the essentials but do not want to start from scratch, it gives you a calmer first draft that still stays open to revision.`,
    "",
    "That matters because school writing is rarely just about speed. It is about avoiding avoidable mistakes. A fast draft is only helpful if it still sounds appropriate, proportionate, and human. Zaza Draft is built around that constraint. It aims to reduce stress and save time without pushing teachers into overconfident wording.",
    "",
    "In practice, that means teacher-specific phrasing, emotionally safer wording for difficult communication, and a workflow where every final line is still checked, edited, and approved by the teacher. It is a co-writer, not an auto-sender.",
    "",
    "## What To Do Next",
    "",
    `If you need the broader context first, go back to [${post.title}](${sourceBlogPath}). If you need a wider cluster of parent communication pages, open [the hub](${family.hubPath}). If you already know the task and want a calmer first draft, try [Zaza Draft](/early-access).`,
    "",
    "## FAQ",
    "",
    `### Is this page different from ${post.title}?`,
    "",
    `Yes. The blog post is the broader seed. This page narrows that topic into one specific search intent around ${variant.keyword} so the advice is easier to use quickly.`,
    "",
    "### Can I use the examples exactly as written?",
    "",
    "They are starting points, not final messages. Adapt the wording to the pupil, family, school context, and policy before you send or save anything.",
    "",
    "### Is this written for UK schools?",
    "",
    "Yes. The copy uses UK English and is written around British school communication where behaviour, parents' evening, SEN, Ofsted-aware tone, and professional caution all matter.",
    "",
    "### Why not just use a generic AI tool?",
    "",
    "You can, but broad tools often need more correction in tone-sensitive school writing. Zaza Draft is more focused on teacher communication where wording needs to be calm, safe, and practical.",
    "",
    "### How does this help with workload?",
    "",
    "It reduces blank-page stress and gives you an editable first draft faster. The gain is not just speed. It is getting to a usable professional message with less emotional effort.",
    "",
    "### What should I check before using a draft?",
    "",
    "Check names, facts, tone, and whether the message says only what genuinely needs to be there. The safest workflow is always teacher review before use.",
    "",
    "## Related Pages",
    "",
    `- [Read the source blog: ${post.title}](${sourceBlogPath})`,
    `- [Open the hub](${family.hubPath})`,
    ...variant.relatedLinks.map((link) => `- [${link.label}](${link.href})`),
  ];

  const content = `${lines.join("\n")}\n`;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const frontmatter = {
    title,
    description,
    seedSlug: post.slug,
    variant: variant.slug,
    sourceBlogTitle: post.title,
    sourceBlogSlug: post.slug,
    hubPath: family.hubPath,
    keywords: [
      variant.keyword,
      post.title,
      "teacher writing help",
      "parent communication",
      "report comments",
      "professional communication",
      "teacher-first AI",
    ],
    category: "expanded-blog",
    searchIntent: variant.searchIntent,
    wordCount,
  };

  return {
    title,
    description,
    content: matter.stringify(content, frontmatter),
    wordCount,
  };
}

function buildGeneratedVariant(
  post: BlogPost,
  family: ExpansionFamily,
  variant: VariantDefinition,
) {
  const pagePath = `/expanded/${post.slug}/${variant.slug}`;
  const filePath = path.join(OUTPUT_DIR, post.slug, `${variant.slug}.md`);
  const markdown = buildMarkdown(post, family, variant);

  return {
    pagePath,
    filePath,
    markdown,
    manifestEntry: {
      seedSlug: post.slug,
      sourceBlogTitle: post.title,
      sourceBlogSlug: post.slug,
      variant: variant.slug,
      title: markdown.title,
      description: markdown.description,
      path: pagePath,
      filePath,
      family: family.id,
      wordCount: markdown.wordCount,
    } satisfies GeneratedVariant,
  };
}

function parseArgs() {
  const args = new Set(process.argv.slice(2));

  return {
    dryRun: args.has("--dry-run"),
    clean: args.has("--clean"),
    printFirst50: args.has("--print-first-50"),
  };
}

function main() {
  const { dryRun, clean, printFirst50 } = parseArgs();
  const posts = getAllPostsByLanguage("en");
  const qualifying = posts
    .map((post) => qualifyPost(post))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (clean) {
    removeDirectoryContents(OUTPUT_DIR);
  }

  ensureDirectory(OUTPUT_DIR);
  ensureDirectory(META_DIR);

  const generated: GeneratedVariant[] = [];

  for (const { post, family } of qualifying) {
    for (const variant of family.variants) {
      const output = buildGeneratedVariant(post, family, variant);
      generated.push(output.manifestEntry);

      if (dryRun) {
        continue;
      }

      ensureDirectory(path.dirname(output.filePath));
      fs.writeFileSync(output.filePath, output.markdown.content, "utf8");
    }
  }

  const manifest: Manifest = {
    generatedAt: new Date().toISOString(),
    totalSeeds: qualifying.length,
    totalPages: generated.length,
    first50: generated.slice(0, 50).map((item) => item.path),
    pages: generated,
  };

  if (!dryRun) {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
    fs.writeFileSync(FIRST50_PATH, `${manifest.first50.join("\n")}\n`, "utf8");
  }

  console.log(
    JSON.stringify(
      {
        totalSeeds: manifest.totalSeeds,
        totalPages: manifest.totalPages,
        first50: manifest.first50,
      },
      null,
      2,
    ),
  );

  if (printFirst50 && manifest.first50.length > 0) {
    console.log("\nFirst 50 generated slugs:");
    for (const item of manifest.first50) {
      console.log(item);
    }
  }
}

main();
