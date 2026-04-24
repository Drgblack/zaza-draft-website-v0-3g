export type CompareDetailSlug =
  | "zaza-draft-vs-chatgpt"
  | "zaza-draft-vs-grammarly"
  | "best-ai-parent-email-tool-for-teachers";

type ComparisonTable = {
  columns: string[];
  rows: Array<{
    label: string;
    values: string[];
  }>;
  note: string;
};

type BestForCard = {
  tool: string;
  items: string[];
};

type ContentCard = {
  title: string;
  body: string;
};

type InternalLink = {
  href: string;
  label: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export type CompareDetailPage = {
  slug: CompareDetailSlug;
  path: `/compare/${CompareDetailSlug}`;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  quickAnswer: string;
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonTable: ComparisonTable;
  bestForTitle: string;
  bestForCards: BestForCard[];
  otherToolsUsefulTitle: string;
  otherToolsUsefulIntro: string;
  otherToolsUsefulCards: ContentCard[];
  zazaDifferentTitle: string;
  zazaDifferentIntro: string;
  zazaDifferentCards: ContentCard[];
  internalLinksTitle: string;
  internalLinks: InternalLink[];
  faq: FaqItem[];
  ctaTitle: string;
  ctaBody: string;
  checkerCtaTitle: string;
  checkerCtaBody: string;
  keywords: string[];
  alternates: Record<string, string>;
};

const compareDetailPages: Record<CompareDetailSlug, CompareDetailPage> = {
  "zaza-draft-vs-chatgpt": {
    slug: "zaza-draft-vs-chatgpt",
    path: "/compare/zaza-draft-vs-chatgpt",
    title: "Zaza Draft vs ChatGPT",
    metaTitle:
      "Zaza Draft vs ChatGPT for Teachers | Parent Emails and Report Comments",
    metaDescription:
      "Honest teacher-first comparison of Zaza Draft vs ChatGPT for parent emails, report comments, and high-stakes school communication.",
    h1: "Zaza Draft vs ChatGPT for teachers",
    eyebrow: "Teacher AI comparison",
    intro: [
      "Teachers do not usually need more words. They need wording they will still be comfortable with if a parent forwards it, an admin reads it, or the thread escalates.",
      "ChatGPT is useful because it is broad and flexible. Zaza Draft is different because it is built around sensitive teacher writing such as parent emails, report comments, and follow-up after difficult conversations.",
    ],
    quickAnswer:
      "ChatGPT is the better fit when you want a general-purpose AI assistant. Zaza Draft is the safer fit when the draft is going to a parent, a report, or any school communication where tone mistakes can create more work later.",
    comparisonTitle: "Honest comparison table",
    comparisonIntro:
      "This is not a claim that one tool is better at everything. It is a comparison of which tool is more helpful when the real problem is tone, escalation risk, and writing something you may need to stand behind later.",
    comparisonTable: {
      columns: ["Zaza Draft", "ChatGPT"],
      rows: [
        {
          label: "Core job",
          values: [
            "Teacher-specific writing support for parent emails, report comments, and school communication.",
            "General-purpose AI assistant for a very wide range of tasks.",
          ],
        },
        {
          label: "Starting point",
          values: [
            "Built around common teacher situations where wording needs to be calm and school-appropriate.",
            "Usually starts from a blank prompt, so the teacher does more setup work.",
          ],
        },
        {
          label: "Sensitive parent emails",
          values: [
            "Stronger fit when you need to lower the temperature without sounding cold, vague, or defensive.",
            "Can work well, but the teacher has to steer tone more actively to avoid escalation or over-polished wording.",
          ],
        },
        {
          label: "Report comments",
          values: [
            "Better fit when comments need to stay honest, measured, and easy to approve quickly.",
            "Useful for drafting, but often needs more prompt iteration to sound like a teacher rather than a generic assistant.",
          ],
        },
        {
          label: "Review burden",
          values: [
            "Teacher review still matters, but the workflow starts closer to the final tone most schools need.",
            "Review burden is usually higher because flexibility also means more room for phrasing that does not fit the context.",
          ],
        },
        {
          label: "Best fit",
          values: [
            "Teachers handling high-stakes school communication and wanting fewer tone mistakes.",
            "Teachers who want one AI assistant for many different tasks beyond school communication.",
          ],
        },
      ],
      note: "Both tools still require teacher review. The practical difference is how much prompt work and tone correction usually happens before the draft feels safe to send.",
    },
    bestForTitle: "Best for",
    bestForCards: [
      {
        tool: "Zaza Draft",
        items: [
          "Parent emails where the tone needs to stay calm under pressure",
          "Report comments that need to be honest without sounding harsh",
          "High-stakes follow-up after behaviour concerns, meetings, or complaints",
        ],
      },
      {
        tool: "ChatGPT",
        items: [
          "General brainstorming and broad drafting support",
          "Lesson ideas, summaries, and one-off admin tasks",
          "Teachers who are comfortable building their own prompts from scratch",
        ],
      },
    ],
    otherToolsUsefulTitle: "Where ChatGPT is useful",
    otherToolsUsefulIntro:
      "An honest comparison should say this clearly: ChatGPT is genuinely useful in schools. It is especially strong when the task is open-ended and the consequences of imperfect wording are low.",
    otherToolsUsefulCards: [
      {
        title: "Brainstorming and rough thinking",
        body: "ChatGPT is useful for idea generation, summarising notes, and helping a teacher get unstuck quickly.",
      },
      {
        title: "Low-stakes drafting",
        body: "It can be a good fit for rough internal notes or early first drafts that will be heavily rewritten anyway.",
      },
      {
        title: "Broader non-teaching tasks",
        body: "If you want one assistant for many workflows outside parent communication, ChatGPT gives you that breadth.",
      },
    ],
    zazaDifferentTitle: "Where Zaza Draft is different",
    zazaDifferentIntro:
      "Zaza Draft is not just about writing faster. The point is reducing the chance of sending something that creates regret, confusion, or a harder conversation tomorrow.",
    zazaDifferentCards: [
      {
        title: "Teacher-first starting points",
        body: "The workflow begins with situations teachers actually face, not a blank prompt and a hope that the wording lands well.",
      },
      {
        title: "Tone before speed",
        body: "The focus is on helping teachers avoid sounding sharp, dismissive, over-formal, or accidentally escalatory in sensitive communication.",
      },
      {
        title: "Better fit for approval pressure",
        body: "Parent emails and report comments often need to feel safe enough to send after one careful review, not five rounds of prompt tuning.",
      },
    ],
    internalLinksTitle: "Useful next pages for teachers",
    internalLinks: [
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "How to reply to an angry parent email",
        description:
          "A practical page for when the risk is escalation, not just awkward wording.",
      },
      {
        href: "/what-not-to-say-in-a-parent-email",
        label: "What not to say in a parent email",
        description:
          "Examples of phrases that often create defensiveness or regret later.",
      },
      {
        href: "/professional-teacher-email-tone-examples-for-parents",
        label: "Professional teacher email tone examples",
        description:
          "See how calm wording changes the feel of difficult parent communication.",
      },
      {
        href: "/report-comment-builder",
        label: "Report comment builder",
        description:
          "Explore teacher-specific report writing help when the workload shifts from emails to comments.",
      },
    ],
    faq: [
      {
        question: "Is Zaza Draft just ChatGPT with teacher prompts?",
        answer:
          "No. The main difference is not the existence of prompts. It is the workflow. Zaza Draft starts from teacher-specific high-stakes writing where tone, professionalism, and review burden matter more than raw flexibility.",
      },
      {
        question: "Can teachers still use ChatGPT for school work?",
        answer:
          "Yes. ChatGPT can be very useful for brainstorming, summaries, and low-stakes drafting. The comparison is mainly about whether it is the best fit for sensitive communication that could escalate.",
      },
      {
        question: "What if I already drafted something in ChatGPT?",
        answer:
          "That is a reasonable workflow. Many teachers first generate ideas broadly, then use a safer, more teacher-specific review step before sending the final message.",
      },
      {
        question: "Does Zaza Draft remove the need for teacher judgement?",
        answer:
          "No. Teachers still review every final word. The aim is to reduce tone mistakes and editing friction, not replace professional judgement.",
      },
    ],
    ctaTitle: "Start with the draft you are nervous about sending",
    ctaBody:
      "Zaza Draft is built for the moments when a parent email, report comment, or follow-up message needs to sound calm, clear, and professionally safe the first time.",
    checkerCtaTitle: "Prefer to test a draft first?",
    checkerCtaBody:
      "Use the free parent email tone and risk checker to spot wording that may sound sharper, colder, or more escalatory than you intended.",
    keywords: [
      "zaza draft vs chatgpt",
      "chatgpt for parent emails",
      "teacher ai comparison",
      "ai tool for report comments",
      "parent email tone checker",
    ],
    alternates: {
      en: "https://zazadraft.com/compare/zaza-draft-vs-chatgpt",
      de: "https://zazadraft.com/de/compare/zaza-draft-vs-chatgpt",
    },
  },
  "zaza-draft-vs-grammarly": {
    slug: "zaza-draft-vs-grammarly",
    path: "/compare/zaza-draft-vs-grammarly",
    title: "Zaza Draft vs Grammarly",
    metaTitle:
      "Zaza Draft vs Grammarly for Teachers | Parent Emails and School Writing",
    metaDescription:
      "Honest comparison of Zaza Draft vs Grammarly for teachers choosing a safer tool for parent emails, report comments, and sensitive school communication.",
    h1: "Zaza Draft vs Grammarly for teachers",
    eyebrow: "Teacher writing comparison",
    intro: [
      "Grammarly is helpful when you already know what you want to say and mainly want cleaner writing. The teacher problem is often earlier than that.",
      "In parent communication and report comments, the real pressure is finding wording that is accurate, calm, and unlikely to create new tension. That is the gap Zaza Draft is built around.",
    ],
    quickAnswer:
      "Grammarly is strong for polishing a draft you already trust. Zaza Draft is the better fit when you need help deciding what to say, how to say it, and how to avoid tone mistakes in sensitive school communication.",
    comparisonTitle: "Honest comparison table",
    comparisonIntro:
      "This table focuses on the practical difference between a polishing tool and a teacher-specific drafting tool. Both can be useful. They solve different parts of the problem.",
    comparisonTable: {
      columns: ["Zaza Draft", "Grammarly"],
      rows: [
        {
          label: "Core job",
          values: [
            "Teacher-specific drafting support for parent emails, report comments, and difficult school messages.",
            "Editing and rewriting support for writing you have already started.",
          ],
        },
        {
          label: "When it helps most",
          values: [
            "When you are unsure how to phrase a message without sounding too sharp, too vague, or too defensive.",
            "When the message is mostly written and you want grammar, clarity, and fluency improvements.",
          ],
        },
        {
          label: "Sensitive parent emails",
          values: [
            "Better fit when the challenge is emotional tone and escalation risk before the draft is finished.",
            "Useful for cleanup, but it does not replace teacher-specific judgement about what should be said in the first place.",
          ],
        },
        {
          label: "Report comments",
          values: [
            "Stronger fit for building measured first drafts that still sound like a teacher.",
            "More useful once you already have comments and want line-level polish.",
          ],
        },
        {
          label: "Grammar and sentence polish",
          values: [
            "Helpful, but not the main reason teachers choose it.",
            "This is Grammarly's strongest area.",
          ],
        },
        {
          label: "Best fit",
          values: [
            "Teachers who need support with judgement-heavy wording, not just sentence correction.",
            "Writers who already have a draft and mainly want editing support.",
          ],
        },
      ],
      note: "Many teachers can use both. The difference is sequence: Zaza Draft helps with the draft you are not sure how to write, while Grammarly helps improve a draft you already trust.",
    },
    bestForTitle: "Best for",
    bestForCards: [
      {
        tool: "Zaza Draft",
        items: [
          "Parent emails where tone could easily go wrong",
          "Report comments that need to stay balanced and professionally safe",
          "Situations where you want fewer wording regrets after you hit send",
        ],
      },
      {
        tool: "Grammarly",
        items: [
          "Proofreading and final sentence cleanup",
          "Teachers who already write their own first drafts confidently",
          "General grammar and style improvement across many types of writing",
        ],
      },
    ],
    otherToolsUsefulTitle: "Where Grammarly is useful",
    otherToolsUsefulIntro:
      "Grammarly has a clear role. It can improve readability and catch small issues quickly, especially when the content itself is already sound.",
    otherToolsUsefulCards: [
      {
        title: "Final proofreading",
        body: "Grammarly is very useful for catching typos, awkward phrasing, and sentence-level clarity issues before sending.",
      },
      {
        title: "General writing cleanup",
        body: "If you write your own drafts confidently, Grammarly can be a strong second pass across emails, documents, and everyday admin writing.",
      },
      {
        title: "Consistency on polished drafts",
        body: "It is useful when the meaning is settled and you mainly want the writing to read more smoothly.",
      },
    ],
    zazaDifferentTitle: "Where Zaza Draft is different",
    zazaDifferentIntro:
      "The biggest difference is that Zaza Draft helps before the proofreading stage. It helps at the point where teachers are still weighing tone, directness, and professional risk.",
    zazaDifferentCards: [
      {
        title: "Built for teacher situations",
        body: "The starting point is school communication and report writing, not generic writing improvement.",
      },
      {
        title: "Designed to reduce escalation risk",
        body: "The goal is calmer wording that lowers the chance of sounding abrupt, accusatory, or emotionally loaded.",
      },
      {
        title: "Supports judgement-heavy drafting",
        body: "Teachers often need help deciding what a message should sound like before they need help cleaning up commas.",
      },
    ],
    internalLinksTitle: "Useful next pages for teachers",
    internalLinks: [
      {
        href: "/how-to-write-a-behaviour-email-to-parents-without-conflict",
        label: "How to write a behaviour email without conflict",
        description:
          "A relevant page when the message has to stay firm without sounding inflamed.",
      },
      {
        href: "/professional-teacher-email-tone-examples-for-parents",
        label: "Professional teacher email tone examples",
        description:
          "See concrete tone shifts for messages that need to feel measured and humane.",
      },
      {
        href: "/teacher-parent-communication-hub",
        label: "Teacher parent communication hub",
        description:
          "Browse more teacher-first pages for difficult parent communication scenarios.",
      },
      {
        href: "/report-comment-builder",
        label: "Report comment builder",
        description:
          "Move from email wording to report comment support with a teacher-specific workflow.",
      },
    ],
    faq: [
      {
        question: "Can teachers use Zaza Draft and Grammarly together?",
        answer:
          "Yes. That can be a sensible workflow. Zaza Draft can help with the first draft and tone, then Grammarly can help with final proofreading.",
      },
      {
        question: "Is Grammarly enough for difficult parent emails?",
        answer:
          "Usually not on its own. Grammarly can improve phrasing, but it is not built around teacher-specific escalation risk, parent relationships, or report-comment judgement.",
      },
      {
        question: "Which is better for report comments?",
        answer:
          "Zaza Draft is usually the better first-step tool because it helps build the comment itself. Grammarly is more useful later for polishing wording you already approve of.",
      },
      {
        question: "Does Zaza Draft still need a final review?",
        answer:
          "Yes. Teachers should still review every message or comment. The benefit is that the starting draft is usually closer to the right tone and structure.",
      },
    ],
    ctaTitle: "Use the tool that helps before the draft becomes a problem",
    ctaBody:
      "If the hardest part is not grammar but getting the tone right in parent emails and report comments, Zaza Draft is built for that earlier, higher-stakes moment.",
    checkerCtaTitle: "Want a quick second opinion on tone?",
    checkerCtaBody:
      "Paste a draft into the free parent email tone and risk checker to see whether the wording may land harsher, colder, or more defensive than you mean.",
    keywords: [
      "zaza draft vs grammarly",
      "grammarly for teachers",
      "best writing tool for parent emails",
      "teacher report comment tool",
      "teacher email tone help",
    ],
    alternates: {
      en: "https://zazadraft.com/compare/zaza-draft-vs-grammarly",
      de: "https://zazadraft.com/de/compare/zaza-draft-vs-grammarly",
    },
  },
  "best-ai-parent-email-tool-for-teachers": {
    slug: "best-ai-parent-email-tool-for-teachers",
    path: "/compare/best-ai-parent-email-tool-for-teachers",
    title: "Best AI Parent Email Tool for Teachers",
    metaTitle:
      "Best AI Parent Email Tool for Teachers | Zaza Draft vs ChatGPT vs Grammarly",
    metaDescription:
      "Compare Zaza Draft, ChatGPT, and Grammarly for parent emails, report comments, and high-stakes teacher communication.",
    h1: "Best AI parent email tool for teachers",
    eyebrow: "Bottom-of-funnel teacher guide",
    intro: [
      "The best tool for parent emails is not automatically the tool that writes the fastest. In schools, the harder problem is sending something clear and professional without creating extra tension, extra back-and-forth, or a message you later wish you had softened.",
      "That is why this comparison focuses on tone mistakes, escalation risk, and teacher judgement. ChatGPT, Grammarly, and Zaza Draft can all help. They just help at different stages of the writing problem.",
    ],
    quickAnswer:
      "If you mainly need help with sensitive parent emails and report comments, Zaza Draft is usually the best fit. ChatGPT is broader. Grammarly is strongest for final polish. The safer teacher-specific choice is the tool designed around high-stakes school communication.",
    comparisonTitle: "Honest comparison table",
    comparisonIntro:
      "This comparison is deliberately narrow: parent emails, report comments, and communication that may be saved, forwarded, or used in follow-up conversations. That is where tool differences matter most for teachers.",
    comparisonTable: {
      columns: ["Zaza Draft", "ChatGPT", "Grammarly"],
      rows: [
        {
          label: "Best starting point",
          values: [
            "Teacher-specific drafting support for sensitive school communication.",
            "Flexible blank-page assistant for many kinds of tasks.",
            "Editing support for a draft that already exists.",
          ],
        },
        {
          label: "Parent email tone control",
          values: [
            "Strongest fit when the teacher wants calmer wording with less risk of escalation.",
            "Possible, but usually needs more prompt steering and more careful checking.",
            "Useful for cleanup, but not designed to guide teacher judgement on what to say.",
          ],
        },
        {
          label: "Report comments",
          values: [
            "Strong fit for honest, measured, teacher-appropriate first drafts.",
            "Useful for drafting, though it often takes more iteration to sound school-appropriate.",
            "Most useful after the comment already exists and needs polish.",
          ],
        },
        {
          label: "Prompting burden",
          values: [
            "Lower, because the workflow begins with teacher use cases.",
            "Higher, because the teacher has to frame the task and tune the tone more manually.",
            "Lower for editing, but it does not solve the blank-page problem.",
          ],
        },
        {
          label: "Best use case",
          values: [
            "High-stakes parent communication and report writing.",
            "Broad general AI support across many tasks.",
            "Grammar, clarity, and sentence-level cleanup.",
          ],
        },
      ],
      note: "A realistic workflow can combine tools. The key question is which tool you trust most at the moment when tone, school context, and professional risk matter most.",
    },
    bestForTitle: "Best for",
    bestForCards: [
      {
        tool: "Zaza Draft",
        items: [
          "Teachers who worry most about tone mistakes and escalation risk",
          "Parent emails that need to sound calm, clear, and firm",
          "Report comments and sensitive follow-up that need teacher-first wording",
        ],
      },
      {
        tool: "ChatGPT",
        items: [
          "Teachers who want one broad AI assistant for many workflows",
          "Brainstorming, summaries, and low-stakes drafting",
          "Users comfortable doing more of the prompt design themselves",
        ],
      },
      {
        tool: "Grammarly",
        items: [
          "Teachers who already have a draft and want cleaner writing",
          "Grammar, sentence flow, and proofing support",
          "A final check after the main drafting decisions are already made",
        ],
      },
    ],
    otherToolsUsefulTitle: "Where ChatGPT and Grammarly are useful",
    otherToolsUsefulIntro:
      "Both tools have real value. The question is not whether they are useful. The question is whether they are the best primary tool for communication where regret and escalation are expensive.",
    otherToolsUsefulCards: [
      {
        title: "ChatGPT for broad support",
        body: "ChatGPT is very useful when you need one assistant for idea generation, rough drafting, summaries, and general admin support beyond parent communication.",
      },
      {
        title: "Grammarly for final polish",
        body: "Grammarly is useful when you already trust the message and want help with grammar, clarity, or sentence-level refinement before sending.",
      },
      {
        title: "A combined workflow",
        body: "Some teachers use a broad assistant for rough thinking and a polishing tool at the end. The gap that often remains is teacher-specific tone safety in the middle.",
      },
    ],
    zazaDifferentTitle: "Where Zaza Draft is different",
    zazaDifferentIntro:
      "Zaza Draft is positioned around a narrower but more stressful problem: writing things teachers may later need to defend, explain, or revisit.",
    zazaDifferentCards: [
      {
        title: "Built around sensitive school communication",
        body: "The product focus is parent emails, report comments, and similar messages where the wrong tone can create more work or more conflict.",
      },
      {
        title: "Designed to reduce regret",
        body: "The aim is not just speed. It is helping teachers avoid the version of a message that felt fine late at night but feels risky the next morning.",
      },
      {
        title: "Teacher-specific approval pressure",
        body: "A good teacher tool should make the final review easier by starting closer to the tone and structure schools actually need.",
      },
    ],
    internalLinksTitle: "Useful next pages for teachers",
    internalLinks: [
      {
        href: "/compare/zaza-draft-vs-chatgpt",
        label: "Zaza Draft vs ChatGPT",
        description:
          "Go deeper on the difference between a teacher-specific workflow and a general AI assistant.",
      },
      {
        href: "/compare/zaza-draft-vs-grammarly",
        label: "Zaza Draft vs Grammarly",
        description:
          "See the difference between teacher-first drafting support and post-draft proofreading.",
      },
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "How to reply to an angry parent email",
        description:
          "A relevant scenario page when calm wording matters more than speed.",
      },
      {
        href: "/teacher-parent-communication-hub",
        label: "Teacher parent communication hub",
        description:
          "Browse more pages on parent communication, behaviour emails, and difficult follow-up.",
      },
    ],
    faq: [
      {
        question: "What is the best AI tool if I worry about tone mistakes?",
        answer:
          "A teacher-specific tool is usually the better fit. If tone, escalation risk, and school context are your biggest concerns, Zaza Draft is the strongest option of these three.",
      },
      {
        question: "Can teachers use more than one tool?",
        answer:
          "Yes. Some teachers use ChatGPT for broad thinking, Zaza Draft for sensitive drafts, and Grammarly for final cleanup. The most important thing is choosing the right tool for the highest-risk step.",
      },
      {
        question: "What if I mostly need help with report comments?",
        answer:
          "Zaza Draft is still usually the best fit because it helps shape the comment itself, not just polish wording after the fact.",
      },
      {
        question:
          "Do AI tools remove the need for review in school communication?",
        answer:
          "No. Teachers should still review every message and comment carefully. The goal is to lower editing strain and reduce tone risk, not remove professional judgement.",
      },
    ],
    ctaTitle:
      "Choose the tool built for the message you cannot afford to get wrong",
    ctaBody:
      "If the hardest writing in your week is parent emails, report comments, and sensitive school communication, start with the tool designed around that pressure.",
    checkerCtaTitle: "Need a no-risk first step?",
    checkerCtaBody:
      "Use the free parent email tone and risk checker before sending a difficult draft. It is a simple way to catch wording that may create unnecessary heat.",
    keywords: [
      "best ai parent email tool for teachers",
      "teacher parent email tool",
      "ai tool for teacher communication",
      "best ai for report comments",
      "teacher email risk checker",
    ],
    alternates: {
      en: "https://zazadraft.com/compare/best-ai-parent-email-tool-for-teachers",
    },
  },
};

export function getCompareDetailSlugs(): CompareDetailSlug[] {
  return Object.keys(compareDetailPages) as CompareDetailSlug[];
}

export function getCompareDetailPage(slug: string): CompareDetailPage | null {
  if (!(slug in compareDetailPages)) {
    return null;
  }

  return compareDetailPages[slug as CompareDetailSlug];
}
