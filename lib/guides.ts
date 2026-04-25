import { CONTENT_FRESHNESS } from "@/lib/seo/content-freshness";

export type GuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideStep = {
  title: string;
  body: string;
};

export type GuideLink = {
  href: string;
  label: string;
  description: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideExample = {
  badVersion: string;
  improvedVersion: string;
  note: string;
};

export type GuideRiskyPhrase = {
  riskySentence: string;
  whyItsRisky: string;
  saferVersion: string;
};

export type GuidePageData = {
  slug:
    | "responding-to-angry-parents"
    | "what-teachers-should-not-say-to-parents"
    | "how-to-de-escalate-parent-conflict"
    | "writing-report-comments-professionally";
  path:
    | "/guides/responding-to-angry-parents"
    | "/guides/what-teachers-should-not-say-to-parents"
    | "/guides/how-to-de-escalate-parent-conflict"
    | "/guides/writing-report-comments-professionally";
  title: string;
  metaDescription: string;
  cardDescription: string;
  eyebrow: string;
  intro: string[];
  whoItsFor: string[];
  sections: GuideSection[];
  steps: GuideStep[];
  emotionalFraming?: string[];
  riskyPhrases?: GuideRiskyPhrase[];
  emitHowToSchema?: boolean;
  useZazaFramework?: boolean;
  frameworkTitle?: string;
  example?: GuideExample;
  summaryChecklist?: string[];
  faq?: GuideFaq[];
  nextMove: string;
  relatedLinks: GuideLink[];
  lastReviewed: string;
};

const START_LINK: GuideLink = {
  href: "/start",
  label: "Start with Zaza Draft",
  description:
    "Open the main workflow if you want help shaping a real draft from scratch.",
};

const CHECKER_LINK: GuideLink = {
  href: "/parent-email-risk-checker",
  label: "Parent Email Risk Checker",
  description:
    "Use the free checker if you already have a draft and want a quick tone-risk read first.",
};

const guides: GuidePageData[] = [
  {
    slug: "responding-to-angry-parents",
    path: "/guides/responding-to-angry-parents",
    title: "How to Respond to an Angry Parent (Without Making It Worse)",
    metaDescription:
      "A teacher-first practical guide to responding to an angry parent with calmer wording, less defensiveness, and a clearer next step.",
    cardDescription:
      "A practical framework for replying to an angry parent without making the situation worse.",
    eyebrow: "Teacher communication guide",
    intro: [
      "Angry parent emails are difficult because the teacher is often managing two risks at once: the factual issue itself and the risk that one badly phrased sentence makes the exchange more hostile than it already is.",
      "That is why these messages feel heavier than routine communication. The hard part is usually not knowing what happened. The hard part is replying in a way that stays calm, professional, and clear when the thread already feels loaded.",
    ],
    whoItsFor: [
      "Teachers replying to a parent whose email feels angry, accusatory, or emotionally loaded.",
      "School staff who want practical wording guidance rather than generic conflict advice.",
      "Anyone who needs a reply that still looks professional if it is forwarded to leaders or colleagues.",
    ],
    sections: [
      {
        title: "The problem",
        paragraphs: [
          "When a parent is angry, teachers are more likely to draft from self-protection than from clarity. That is understandable, but it often produces wording that sounds sharper, colder, or more defensive than intended.",
          "These emails are also difficult because parents do not read them in a neutral mood. A phrase that feels brief and efficient to the teacher can sound dismissive or patronising to the person receiving it.",
        ],
      },
      {
        title: "What goes wrong",
        paragraphs: [
          "The most common mistake is replying too quickly in the emotional register the email arrived in. Even when the facts are right, the reply can sound clipped, irritated, or quietly defensive.",
          "Another common mistake is trying to answer everything at once. That usually creates a long reactive message that feels more like self-defence than calm clarification.",
        ],
        bullets: [
          "Mirroring the parent’s tone instead of lowering it.",
          "Over-explaining because the teacher wants to defend themselves quickly.",
          "Using phrases that imply blame, correction, or impatience.",
          "Replying before deciding what the next step should be.",
        ],
      },
      {
        title: "What parents actually hear",
        paragraphs: [
          "Parents do not only hear the information in a reply. They also hear attitude. If a sentence sounds like correction, minimising, or blame, that is often what they react to first.",
          "This is where intention and perception split. The teacher may intend to sound efficient or factual, while the parent hears 'you are overreacting' or 'I have already dealt with this'. That gap is where many threads escalate.",
        ],
        bullets: [
          "Brief can sound cold if the parent already feels dismissed.",
          "Corrective language can sound blaming even when it is technically accurate.",
          "A defensive explanation can sound like the school is protecting itself rather than addressing the concern.",
        ],
      },
      {
        title: "When not to reply immediately",
        paragraphs: [
          "Do not reply immediately if you are still angry, if you are drafting to prove the parent wrong, or if you have not yet checked the basic facts you are about to refer to.",
          "A short delay is often safer than a fast reactive message. If needed, send a brief holding reply only after deciding what information still needs checking and who else should see the thread.",
        ],
      },
      {
        title: "When to escalate internally",
        paragraphs: [
          "Not every angry parent email should be handled alone. Escalate internally when the thread involves formal complaints, safeguarding concerns, repeated aggressive contact, legal language, or a situation where a leader should be aware before a reply goes out.",
          "Escalation is also sensible when the parent is challenging school policy rather than one classroom-level issue, or when the teacher no longer feels they can respond neutrally on their own.",
        ],
        bullets: [
          "Repeated aggressive or threatening language.",
          "Safeguarding, welfare, or legal concerns.",
          "A complaint that is likely to involve SLT or formal process.",
          "A situation where you need someone else to review the wording before it is sent.",
        ],
      },
    ],
    steps: [
      {
        title: "Acknowledge the concern",
        body: "Start by showing that you have heard the concern, without adopting every part of the parent’s framing.",
      },
      {
        title: "Remove blame from the wording",
        body: "Strip out phrases that imply the parent is overreacting, misunderstanding, or causing the problem.",
      },
      {
        title: "Stay neutral and factual",
        body: "Use calm factual language and keep the reply focused on what you can explain clearly right now.",
      },
      {
        title: "Clarify the next step",
        body: "End with what happens next, whether that is a call, a meeting, or a follow-up after checking further details.",
      },
    ],
    useZazaFramework: true,
    frameworkTitle: "A simple framework",
    example: {
      badVersion:
        "As I already said, your child was reminded several times and chose not to follow instructions. I do not think it is fair to suggest that I handled this badly. If you had read my previous email properly, you would see that the matter was already explained.",
      improvedVersion:
        "I can see why you are concerned, and I want to clarify what happened from the school’s perspective. Your child was reminded several times during the lesson, and I followed our usual classroom procedures at each stage. If it would help, I am happy to outline the sequence in more detail and agree the best next step together.",
      note: "The improved version still explains the facts, but it removes correction and blame. It sounds calmer, more professional, and gives the conversation somewhere constructive to go.",
    },
    summaryChecklist: [
      "Acknowledge the concern before explaining the facts.",
      "Remove phrases that sound blaming, corrective, or impatient.",
      "Keep the wording neutral rather than defensive.",
      "Focus on the issue you can address now.",
      "End with a clear next step.",
      "Escalate internally if the thread needs leader awareness or formal handling.",
    ],
    faq: [
      {
        question: "Should I always reply to an angry parent straight away?",
        answer:
          "No. If you are still emotionally reactive, missing key facts, or think the situation may need internal escalation, a slower reply is usually safer than a fast one.",
      },
      {
        question: "How do I sound calm without sounding weak?",
        answer:
          "Calm wording does not mean vague wording. You can still be clear about the facts and the school’s position without sounding sharp or defensive.",
      },
      {
        question: "What is the biggest mistake teachers make in these replies?",
        answer:
          "The most common mistake is replying in self-defence. That often creates a message that sounds more reactive than the teacher intends.",
      },
      {
        question: "Should I answer every accusation in the parent’s email?",
        answer:
          "Usually not in one message. It is often better to answer the central issue clearly and then set out the next step, rather than producing a long line-by-line rebuttal.",
      },
      {
        question: "When should I involve a line manager or SLT?",
        answer:
          "Involve them when the thread includes threats, safeguarding concerns, formal complaint language, legal references, repeated aggressive contact, or anything that should not sit with one teacher alone.",
      },
      {
        question: "Can I use AI to help me write these replies?",
        answer:
          "Yes, as long as the final judgement stays with the teacher and school processes are followed. The safest use is to reduce tone risk and improve clarity before anything is sent.",
      },
    ],
    nextMove:
      "If you already have a difficult draft, run it through the free Parent Email Risk Checker first. If you want help reshaping the whole reply from scratch, go to /start and build the next version in Zaza Draft.",
    relatedLinks: [
      START_LINK,
      CHECKER_LINK,
      {
        href: "/how-to-reply-to-an-angry-parent-email",
        label: "How to reply to an angry parent email",
        description:
          "A related page focused on calmer wording for emotionally loaded parent replies.",
      },
    ],
    lastReviewed: CONTENT_FRESHNESS.guidesPages.isoDate,
  },
  {
    slug: "what-teachers-should-not-say-to-parents",
    path: "/guides/what-teachers-should-not-say-to-parents",
    title:
      "7 Things Teachers Should Never Say to Parents (And What to Say Instead)",
    metaDescription:
      "A practical, teacher-first guide to seven risky parent-email phrases, why they backfire, and what to say instead.",
    cardDescription:
      "Seven realistic teacher phrases that often go wrong with parents, plus calmer safer versions.",
    eyebrow: "Teacher communication guide",
    intro: [
      "A lot of teachers know this feeling: it is late, the email thread is open, and you are rewriting the same sentence because every version sounds either too sharp, too soft, or too defensive.",
      "That stress usually comes from uncertainty, not incompetence. You know what happened. What you do not yet trust is how the parent will hear the wording once it lands in their inbox.",
    ],
    whoItsFor: [
      "Teachers rewriting difficult parent emails late in the day and second-guessing the tone.",
      "School staff who want realistic phrasing help rather than generic communication advice.",
      "Anyone who wants to know which familiar teacher phrases create avoidable friction with parents.",
    ],
    sections: [
      {
        title: "Why these phrases cause problems",
        paragraphs: [
          "Most risky parent-email phrases are not obviously rude. They are risky because they sound corrective, dismissive, or quietly irritated once a parent reads them without hearing the teacher’s tone of voice.",
          "That is why so many teachers end up rewriting emails late at night. The sentence may be technically true, but it still does not feel safe enough to send.",
        ],
      },
      {
        title: "What makes a phrase risky",
        paragraphs: [
          "The highest-risk phrases usually do one of three things: they imply blame, they make the parent feel corrected, or they make the teacher sound emotionally worn down.",
        ],
        bullets: [
          "They sound like the teacher is tired of explaining.",
          "They make the parent feel as if they are being told off.",
          "They close the conversation down before the parent feels heard.",
        ],
      },
    ],
    steps: [],
    useZazaFramework: true,
    emotionalFraming: [
      "Teachers rarely use these phrases because they want conflict. They use them because they are under pressure, they are tired, and they are trying to close the laptop after an already long day.",
      "That is exactly why this page focuses on realistic teacher phrasing. The goal is not to sound corporate. The goal is to keep the message calm enough that you do not regret pressing send tomorrow.",
    ],
    riskyPhrases: [
      {
        riskySentence: "As I already said in my previous email...",
        whyItsRisky:
          "This usually sounds impatient and corrective, even if the teacher only means to avoid repeating the full explanation.",
        saferVersion:
          "To clarify the point from my previous email, the concern I am addressing here is...",
      },
      {
        riskySentence: "You need to understand that...",
        whyItsRisky:
          "Parents often hear this as a telling-off. It can make them feel talked down to before the actual explanation has even started.",
        saferVersion:
          "I want to explain the school’s perspective on what happened.",
      },
      {
        riskySentence: "Your child chose to behave this way.",
        whyItsRisky:
          "Even if behaviour needs to be addressed, this wording can sound accusatory and can push the parent straight into defence mode.",
        saferVersion:
          "There were several moments in the lesson where your child did not follow the instructions that had been given.",
      },
      {
        riskySentence: "I do not think it is fair to say...",
        whyItsRisky:
          "This often sounds like the teacher is arguing with the parent rather than clarifying the issue calmly.",
        saferVersion:
          "I want to respond carefully to that concern and explain what I observed.",
      },
      {
        riskySentence: "If you had read my email properly...",
        whyItsRisky:
          "This immediately introduces blame and embarrassment. Even if the parent has misread something, this phrase makes the thread harder to recover.",
        saferVersion:
          "I may not have explained that clearly enough, so I will restate the key point here.",
      },
      {
        riskySentence: "We have done everything we can.",
        whyItsRisky:
          "Parents often hear this as a shutdown line. It can sound like the school is done listening rather than explaining what has already been tried.",
        saferVersion:
          "So far, the steps we have taken are... and the next step I suggest is...",
      },
      {
        riskySentence: "This matter is closed.",
        whyItsRisky:
          "Sometimes a teacher means there is a clear boundary, but this wording can sound abrupt and inflammatory unless the context truly requires a formal close.",
        saferVersion:
          "From here, the next appropriate step would be to speak with [role] if further discussion is needed.",
      },
    ],
    emitHowToSchema: false,
    summaryChecklist: [
      "Cut any phrase that sounds like correction or blame.",
      "Replace irritation with clarification.",
      "Describe what happened before you interpret it.",
      "Keep the wording calm enough to read again tomorrow without wincing.",
      "If the thread is too heated, pause before replying.",
    ],
    faq: [
      {
        question:
          "Why do normal teacher phrases sound rude to parents so easily?",
        answer:
          "Because parents read emails without tone of voice, often when they are already worried or upset. A phrase that feels efficient to the teacher can sound blunt or corrective to the parent.",
      },
      {
        question: "Should teachers avoid all direct language with parents?",
        answer:
          "No. The goal is not to become vague. It is to stay clear without sounding irritated, blaming, or dismissive.",
      },
      {
        question: "What if the parent is being unreasonable?",
        answer:
          "The reply still needs to stay measured. You can be clear about the facts and the next step without matching the parent’s tone.",
      },
      {
        question:
          "Is it okay to rewrite an email several times before sending it?",
        answer:
          "Yes. Many teachers do that because they are trying to avoid tone mistakes. The problem is when the rewriting happens without a clear sense of which phrases are creating the risk.",
      },
      {
        question:
          "What is the quickest way to make a parent email sound safer?",
        answer:
          "Look first for phrases that sound corrective or blaming, then replace them with clarification, neutral description, and a clear next step.",
      },
      {
        question: "Can Zaza Draft help with this kind of rewrite?",
        answer:
          "Yes. It is useful when you know the message you need to send but do not yet trust how the wording will land with the parent.",
      },
    ],
    nextMove:
      "If you already have a draft that feels wrong, open /start and reshape it while the context is still fresh. That is usually faster than rewriting the same risky sentence six more times on your own.",
    relatedLinks: [
      START_LINK,
      {
        href: "/teacher-email-tone-guide",
        label: "Teacher email tone guide",
        description:
          "A related guide focused on how tone choices change the way parent emails are read.",
      },
    ],
    lastReviewed: CONTENT_FRESHNESS.guidesPages.isoDate,
  },
  {
    slug: "how-to-de-escalate-parent-conflict",
    path: "/guides/how-to-de-escalate-parent-conflict",
    title: "How to De-Escalate Parent Conflict",
    metaDescription:
      "A practical teacher guide to de-escalating parent conflict with calmer wording, clear next steps, and stronger professional boundaries.",
    cardDescription:
      "How to lower tension in parent communication without becoming vague, defensive, or overly formal.",
    eyebrow: "Teacher communication guide",
    intro: [
      "Parent conflict rarely de-escalates because one perfect sentence fixes everything. It usually de-escalates because the teacher keeps the message clear, proportionate, and steady across the next exchange.",
      "That means de-escalation is less about sounding soft and more about removing unnecessary heat while keeping the structure of the conversation intact.",
    ],
    whoItsFor: [
      "Teachers managing a thread that feels tense, repetitive, or increasingly emotional.",
      "Middle leaders or pastoral staff supporting a difficult parent exchange.",
      "School teams that want practical communication habits for conflict reduction.",
    ],
    sections: [
      {
        title: "What de-escalation actually means",
        paragraphs: [
          "De-escalation does not mean agreeing with every criticism or removing all boundaries. It means replying in a way that lowers the chance of the exchange becoming harder to manage.",
          "That usually requires fewer emotional cues, fewer sweeping statements, and a stronger sense of what the next step is supposed to be.",
        ],
      },
      {
        title: "What tends to escalate conflict",
        paragraphs: [
          "Conflict escalates when the reply feels dismissive, over-defensive, or too broad. Parents often react strongly to tone before they react to content.",
        ],
        bullets: [
          "Long reactive explanations can sound like self-defence rather than clarification.",
          "Absolute phrases can make a parent feel cornered.",
          "Trying to solve every complaint in one email often makes the message harder to trust.",
        ],
      },
      {
        title: "How teachers can lower the temperature",
        paragraphs: [
          "Calm wording, clear scope, and a sensible next action usually do more to reduce conflict than trying to 'win' the email.",
        ],
        bullets: [
          "Acknowledge the concern without adopting the parent’s framing in full.",
          "Keep the reply focused on the issue you can address now.",
          "End with one practical next step instead of a broad closing defence.",
        ],
      },
    ],
    steps: [
      {
        title: "Acknowledge the concern",
        body: "Start by showing that you have heard the concern without sounding like you are agreeing with every accusation in the thread.",
      },
      {
        title: "Remove blame and emotion",
        body: "Cut the lines that sound annoyed, cornered, or corrective. They usually raise the temperature instead of lowering it.",
      },
      {
        title: "State facts clearly",
        body: "Keep the explanation specific and calm so the parent can follow what actually happened without wading through defensive detail.",
      },
      {
        title: "Offer next steps",
        body: "Give the exchange a constructive next move so the thread does not just loop into another angry reply.",
      },
    ],
    useZazaFramework: true,
    frameworkTitle: "A simple framework",
    nextMove:
      "If you already have a tense draft, the fastest step is to check its tone risk. If you want a fuller rewrite path, go to /start and shape the next reply there.",
    relatedLinks: [
      START_LINK,
      CHECKER_LINK,
      {
        href: "/how-to-de-escalate-a-parent-complaint-email",
        label: "How to de-escalate a parent complaint email",
        description:
          "A related page focused specifically on de-escalating complaint threads.",
      },
    ],
    lastReviewed: CONTENT_FRESHNESS.guidesPages.isoDate,
  },
  {
    slug: "writing-report-comments-professionally",
    path: "/guides/writing-report-comments-professionally",
    title: "Writing Report Comments Professionally",
    metaDescription:
      "A practical teacher guide to writing professional report comments that are clear, useful, balanced, and easier to stand behind.",
    cardDescription:
      "How to make report comments sound more professional, more useful, and less generic.",
    eyebrow: "Teacher communication guide",
    intro: [
      "Professional report comments do not need to sound cold or inflated. They need to sound measured, useful, and specific enough that a parent learns something real about the pupil.",
      "Teachers often get stuck because the comment has to do several jobs at once: reflect progress, stay balanced, fit school expectations, and still sound human. This guide is about handling that tension better.",
    ],
    whoItsFor: [
      "Teachers writing report comments at scale who still want the wording to sound individual and credible.",
      "School staff who want comments to be professional without sounding robotic.",
      "Educators who are tired of comments that feel bland, repetitive, or overly safe.",
    ],
    sections: [
      {
        title: "What professional report comments do well",
        paragraphs: [
          "A strong report comment helps a parent understand something meaningful about the pupil. It balances strengths, habits, and next steps without becoming too long or too vague.",
          "Professional comments usually sound calm and proportionate. They avoid both exaggerated praise and language that feels harsher than the teacher intends.",
        ],
      },
      {
        title: "What makes comments feel generic",
        paragraphs: [
          "Comments feel generic when they only repeat broad positive labels or obvious descriptors. Parents do not learn much from 'works hard' unless the comment says what that looks like in practice.",
        ],
        bullets: [
          "Avoid stacking praise words without evidence or detail.",
          "Avoid repeating the same sentence shape across multiple pupils.",
          "Avoid vague next steps that do not tell the parent anything actionable.",
        ],
      },
      {
        title: "How to make comments more professional and useful",
        paragraphs: [
          "Professional comments usually improve when the teacher names a real strength, grounds it in behaviour or learning habits, and then signals the next area for growth in measured language.",
        ],
        bullets: [
          "Anchor praise in something observable.",
          "Keep the tone balanced rather than exaggerated.",
          "Use next-step wording that sounds constructive, not punitive.",
        ],
      },
    ],
    steps: [
      {
        title: "Start with one real strength",
        body: "Pick a strength you can actually point to rather than beginning with generic praise that could fit anyone.",
      },
      {
        title: "Add the habit or learning behaviour underneath it",
        body: "This makes the comment feel more specific and gives the parent a clearer picture of how the pupil approaches learning.",
      },
      {
        title: "Add one proportionate next step",
        body: "The next step should sound constructive and measured, not like a warning or a vague filler sentence.",
      },
      {
        title: "Read it for usefulness",
        body: "Ask whether a parent would genuinely learn something from the comment beyond a broad positive impression.",
      },
    ],
    nextMove:
      "If report comments are the main challenge, start with /start for the full drafting workflow. If you want to test how tone and phrasing feel first, use the free checker on a draft school message.",
    relatedLinks: [
      START_LINK,
      CHECKER_LINK,
      {
        href: "/teacher-report-comment-ai",
        label: "Teacher report comment AI",
        description:
          "A category page on what report comment AI should actually improve for teachers.",
      },
      {
        href: "/report-comment-builder",
        label: "Report comment builder",
        description:
          "Explore the report comment workflow and example-led support paths.",
      },
    ],
    lastReviewed: CONTENT_FRESHNESS.guidesPages.isoDate,
  },
];

export const guideSlugs = guides.map((guide) => guide.slug);

export function getAllGuides() {
  return guides;
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getRelatedGuideLinks(currentSlug: GuidePageData["slug"]) {
  return guides
    .filter((guide) => guide.slug !== currentSlug)
    .map((guide) => ({
      href: guide.path,
      label: guide.title,
      description: guide.cardDescription,
    }));
}

export function getGuideSitemapEntries(fallbackLastModified = new Date()) {
  return guides.map((guide) => ({
    url: `https://zazadraft.com${guide.path}`,
    lastModified: guide.lastReviewed
      ? new Date(`${guide.lastReviewed}T00:00:00.000Z`)
      : fallbackLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.82,
  }));
}
