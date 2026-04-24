export type ToolLandingSlug =
  | "email-tone-checker-for-teachers"
  | "check-if-parent-email-sounds-rude"
  | "rewrite-parent-email-calmly"
  | "parent-email-risk-checker";

type ExampleScenario = {
  title: string;
  body: string;
};

type BeforeAfterExample = {
  label: string;
  before: string;
  after: string;
  whyItWorks: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type ToolLandingPage = {
  slug: ToolLandingSlug;
  path: `/tools/${ToolLandingSlug}`;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  voiceLine: string;
  checkerHref: string;
  checkerCta: string;
  checkerSupport: string;
  startHref: string;
  startCta: string;
  painTitle: string;
  painIntro: string;
  painPoints: string[];
  scenariosTitle: string;
  scenarios: ExampleScenario[];
  beforeAfterTitle: string;
  beforeAfterIntro: string;
  examples: BeforeAfterExample[];
  howItHelpsTitle: string;
  howItHelpsIntro: string;
  howItHelpsBullets: string[];
  faq: FaqItem[];
  relatedLinksTitle: string;
  relatedLinks: RelatedLink[];
  closingTitle: string;
  closingBody: string;
  keywords: string[];
};

const SHARED_RELATED_LINKS: RelatedLink[] = [
  {
    href: "/what-not-to-say-in-a-parent-email",
    label: "What not to say in a parent email",
    description:
      "See the phrases that often sound sharper or colder than teachers intend.",
  },
  {
    href: "/professional-teacher-email-tone-examples-for-parents",
    label: "Professional teacher email tone examples",
    description:
      "Useful if you want calmer wording patterns before you draft or send.",
  },
  {
    href: "/how-to-reply-to-an-angry-parent-email",
    label: "How to reply to an angry parent email",
    description:
      "A practical page for messages where the real risk is escalation.",
  },
  {
    href: "/teacher-parent-communication-hub",
    label: "Teacher parent communication hub",
    description:
      "Browse more teacher-specific pages for difficult parent communication.",
  },
];

const toolLandingPages: Record<ToolLandingSlug, ToolLandingPage> = {
  "email-tone-checker-for-teachers": {
    slug: "email-tone-checker-for-teachers",
    path: "/tools/email-tone-checker-for-teachers",
    title: "Email Tone Checker for Teachers",
    metaTitle:
      "Email Tone Checker for Teachers | Check Parent Email Tone Before Sending",
    metaDescription:
      "Free email tone checker for teachers. Check whether a parent email sounds too sharp, too cold, or likely to escalate before you send it.",
    h1: "Email tone checker for teachers",
    eyebrow: "Free teacher tool",
    heroTitle: "Check the tone before the email becomes tomorrow's problem",
    heroBody:
      "If you have rewritten the same parent email three times and still are not sure how it lands, this tool helps you check the tone before you send it.",
    voiceLine:
      '"I\'ve rewritten this three times." "I need this to stay calm and professional."',
    checkerHref: "/parent-email-risk-checker?src=tools-email-tone-checker",
    checkerCta: "Open the free checker",
    checkerSupport:
      "Use the existing Zaza Draft tone and risk checker on your draft now.",
    startHref: "/start?src=tools-email-tone-checker",
    startCta: "Start with Zaza Draft",
    painTitle: "The pain teachers are actually trying to solve",
    painIntro:
      "Most teachers are not looking for fancier wording. They are trying to avoid a message that sounds harsher, colder, or more defensive than they mean.",
    painPoints: [
      "You know what you need to say, but not how to say it without sounding rude.",
      "You do not want a tired end-of-day email to sound more emotional than it felt in your head.",
      "You want something that stays calm and professional if it is forwarded or read aloud later.",
    ],
    scenariosTitle: "Example teacher scenarios",
    scenarios: [
      {
        title: "Behaviour follow-up after a difficult lesson",
        body: "You need to be clear about what happened, but you do not want the parent to read the message as blame or irritation.",
      },
      {
        title: "Chasing missing homework for the third time",
        body: "The facts are straightforward. The risk is that your frustration leaks into the tone without you noticing.",
      },
      {
        title: "Replying late at night to a tense thread",
        body: "You want to acknowledge the issue and stay professional without making the exchange feel colder or sharper.",
      },
    ],
    beforeAfterTitle: "Before and after examples",
    beforeAfterIntro:
      "These are the kinds of shifts teachers usually want. The goal is not to become vague. The goal is to sound calmer while keeping the message clear.",
    examples: [
      {
        label: "Behaviour email",
        before:
          "This keeps happening and it is becoming unacceptable. You need to speak to him tonight.",
        after:
          "I wanted to let you know this has happened again today, and I would appreciate your support in discussing it with him this evening.",
        whyItWorks:
          "The calmer version keeps the issue clear but removes wording that can sound accusatory or abrupt.",
      },
      {
        label: "Homework follow-up",
        before:
          "I have already reminded her several times and I am concerned this is not being taken seriously.",
        after:
          "I have reminded her a few times now, so I wanted to check in with you and ask for your help in getting this back on track.",
        whyItWorks:
          "It turns frustration into collaboration without weakening the message.",
      },
    ],
    howItHelpsTitle: "How the checker helps",
    howItHelpsIntro:
      "The free checker is useful when the draft already exists but the tone still feels off.",
    howItHelpsBullets: [
      "Checks whether the wording may sound too blunt, too cold, or too escalatory",
      "Gives a safer rewrite you can work from",
      "Helps you pause before sending something you may regret later",
    ],
    faq: [
      {
        question: "Is this just a grammar checker for teachers?",
        answer:
          "No. The main purpose is tone and risk, not just grammar. It is built for the moments when the message could be read as rude, abrupt, or escalatory.",
      },
      {
        question: "Can I use it for report comments as well?",
        answer:
          "The main fit is parent emails and similar school communication. The same calm, professional tone principles can still be useful when you are checking sensitive report wording.",
      },
      {
        question: "Do I still need to review the final email myself?",
        answer:
          "Yes. The checker gives you a safer starting point, but teachers should still review every final message before sending.",
      },
    ],
    relatedLinksTitle: "Useful next pages",
    relatedLinks: SHARED_RELATED_LINKS,
    closingTitle:
      "Use the free checker, then move into Zaza Draft if you need more help",
    closingBody:
      "If the free checker gives you something closer to what you want to send, Zaza Draft is the next step for parent emails, report comments, and other high-stakes school communication.",
    keywords: [
      "email tone checker for teachers",
      "teacher email tone checker",
      "parent email tone checker",
      "check teacher email tone",
    ],
  },
  "check-if-parent-email-sounds-rude": {
    slug: "check-if-parent-email-sounds-rude",
    path: "/tools/check-if-parent-email-sounds-rude",
    title: "Check If Parent Email Sounds Rude",
    metaTitle:
      "Check If a Parent Email Sounds Rude | Free Teacher Email Checker",
    metaDescription:
      "Free tool for teachers to check if a parent email sounds rude, blunt, or more confrontational than intended before sending.",
    h1: "Check if a parent email sounds rude",
    eyebrow: "Free teacher tool",
    heroTitle:
      "You are not asking if the email is true. You are asking how it sounds.",
    heroBody:
      "Teachers often know the facts are right. The worry is that the wording may sound rude once a parent reads it without your tone of voice behind it.",
    voiceLine:
      '"I don\'t want this to sound rude." "I just need it to sound professional."',
    checkerHref: "/parent-email-risk-checker?src=tools-sounds-rude",
    checkerCta: "Check this draft now",
    checkerSupport:
      "Paste your email into the existing Zaza Draft checker and see where the wording may land badly.",
    startHref: "/start?src=tools-sounds-rude",
    startCta: "Open Zaza Draft",
    painTitle: "Why this feels risky for teachers",
    painIntro:
      "A message can sound rude even when the teacher did not mean it that way. That usually happens when stress, tiredness, or repeated reminders show up in the wording.",
    painPoints: [
      "Direct language can sound harsher in writing than it would in person.",
      "Repeated issues make it harder to write without frustration leaking through.",
      "Parents often read tone into short phrases more than teachers expect.",
    ],
    scenariosTitle: "Example teacher scenarios",
    scenarios: [
      {
        title: "A parent has ignored two earlier messages",
        body: "You want to be firmer, but not so firm that the parent reads the email as disrespectful.",
      },
      {
        title: "You need to mention behaviour that disrupted the class",
        body: "The issue matters, but the relationship with the family matters too. You need both honesty and restraint.",
      },
      {
        title: "You are sending a short reply between lessons",
        body: "Fast replies are where messages often become shorter and sharper than intended.",
      },
    ],
    beforeAfterTitle: "Before and after examples",
    beforeAfterIntro:
      "A rude-sounding email is often not aggressive on purpose. It is usually just too sharp, too absolute, or too cold. These are the kinds of changes teachers look for.",
    examples: [
      {
        label: "Firm but not rude",
        before:
          "You have not responded to my earlier messages, so I need this dealt with now.",
        after:
          "I have not heard back to my earlier messages, so I wanted to follow up and ask for your support with this now.",
        whyItWorks:
          "The rewritten version keeps urgency but removes the confrontational edge.",
      },
      {
        label: "Concern without accusation",
        before:
          "He is choosing not to follow instructions and it is affecting everyone else.",
        after:
          "He found it difficult to follow instructions today, and it had an impact on the rest of the class.",
        whyItWorks:
          "It sounds more factual and less like a judgement on the student or family.",
      },
    ],
    howItHelpsTitle: "What the checker is looking for",
    howItHelpsIntro:
      "The checker helps spot the parts of a draft that are most likely to sound rude even when the teacher's intention is professional.",
    howItHelpsBullets: [
      "Accusatory phrasing",
      "Emotionally cold wording",
      "Lines that may sound more escalatory than collaborative",
    ],
    faq: [
      {
        question: "Can a professional email still sound rude?",
        answer:
          "Yes. An email can be factually correct and still sound abrupt, dismissive, or more confrontational than intended. That is why a tone check is useful.",
      },
      {
        question: "Does this mean teachers should avoid being direct?",
        answer:
          "No. The goal is not to make the message vague. It is to keep the wording clear while removing phrasing that adds unnecessary heat.",
      },
      {
        question: "When is this most useful?",
        answer:
          "Usually when you have already drafted the email and are having the feeling that something about it may land badly.",
      },
    ],
    relatedLinksTitle: "Useful next pages",
    relatedLinks: SHARED_RELATED_LINKS,
    closingTitle: "Check the email first, then draft safely in Zaza Draft",
    closingBody:
      "If the checker helps you see why the message feels risky, Zaza Draft helps with the wider job of writing parent emails that stay calm and professional under pressure.",
    keywords: [
      "check if parent email sounds rude",
      "does my parent email sound rude",
      "teacher rude email checker",
      "parent email checker for teachers",
    ],
  },
  "rewrite-parent-email-calmly": {
    slug: "rewrite-parent-email-calmly",
    path: "/tools/rewrite-parent-email-calmly",
    title: "Rewrite Parent Email Calmly",
    metaTitle: "Rewrite a Parent Email Calmly | Free Tool for Teachers",
    metaDescription:
      "Free teacher tool to rewrite a parent email calmly. Turn a tense, rushed, or overly sharp draft into something clearer and more professional.",
    h1: "Rewrite a parent email calmly",
    eyebrow: "Free teacher tool",
    heroTitle: "When the message is right but the tone still feels too heated",
    heroBody:
      "This tool is for the moment when you have written the email, read it back, and thought: I need this to stay calm and professional.",
    voiceLine:
      '"I need this to stay calm and professional." "I cannot send it like this."',
    checkerHref: "/parent-email-risk-checker?src=tools-rewrite-calmly",
    checkerCta: "Rewrite this draft calmly",
    checkerSupport:
      "Use the existing checker to get a calmer version of the draft you already have.",
    startHref: "/start?src=tools-rewrite-calmly",
    startCta: "Continue in Zaza Draft",
    painTitle: "Why teachers look for a calmer rewrite",
    painIntro:
      "A rushed first draft often carries more heat than the teacher actually wants. Calm rewrites matter because once an email is sent, you cannot explain tone back into it.",
    painPoints: [
      "You want to keep your point, but lose the edge.",
      "You do not want the parent to focus on your tone instead of the issue.",
      "You need wording that still sounds like a professional teacher, not a generic script.",
    ],
    scenariosTitle: "Example teacher scenarios",
    scenarios: [
      {
        title: "A behaviour message written straight after the incident",
        body: "The facts are clear, but the first draft still carries the stress of the moment.",
      },
      {
        title: "A follow-up after a difficult parents' evening conversation",
        body: "You need to summarise what happened without reopening the conflict.",
      },
      {
        title: "A reply to a parent complaint",
        body: "You want to sound calm, measured, and professional rather than defensive.",
      },
    ],
    beforeAfterTitle: "Before and after examples",
    beforeAfterIntro:
      "A calm rewrite is not a softer rewrite in every case. It is a clearer, steadier version that reduces emotional charge while keeping the meaning.",
    examples: [
      {
        label: "After a complaint",
        before:
          "I think this email is unfair and it does not reflect what actually happened in class.",
        after:
          "I wanted to respond to your concerns and clarify what happened in class from my perspective.",
        whyItWorks:
          "The calmer version removes defensiveness and opens space for a professional reply.",
      },
      {
        label: "End-of-day frustration",
        before:
          "This has continued despite repeated reminders and I am very concerned by the lack of improvement.",
        after:
          "This has continued despite repeated reminders, so I wanted to update you and ask for your support in helping us improve things.",
        whyItWorks:
          "The rewrite keeps seriousness but sounds less emotionally loaded.",
      },
    ],
    howItHelpsTitle: "What a calm rewrite should actually do",
    howItHelpsIntro:
      "Teachers usually do not want a bland rewrite. They want something that still feels honest, but no longer sounds likely to trigger a defensive response.",
    howItHelpsBullets: [
      "Keeps the point clear while lowering the emotional temperature",
      "Makes the message easier for a parent to hear",
      "Helps the teacher send something they can stand behind later",
    ],
    faq: [
      {
        question: "Will a calmer rewrite make the message too weak?",
        answer:
          "Not if it is done well. The aim is to keep the substance while removing wording that makes the message harder to receive.",
      },
      {
        question: "Is this useful only for angry emails?",
        answer:
          "No. It is also useful for emails written when you are rushed, tired, or worried a parent may misread your tone.",
      },
      {
        question: "Can I still edit the calmer version myself?",
        answer:
          "Yes. The checker gives you a better starting point, and you can still adjust the final wording before sending.",
      },
    ],
    relatedLinksTitle: "Useful next pages",
    relatedLinks: SHARED_RELATED_LINKS,
    closingTitle:
      "Get the calmer rewrite first, then keep drafting in Zaza Draft",
    closingBody:
      "The free checker helps with one difficult draft. Zaza Draft is there for the wider pattern of messages that need calmer, teacher-specific wording.",
    keywords: [
      "rewrite parent email calmly",
      "calm parent email rewrite",
      "teacher email rewrite tool",
      "rewrite email professionally teacher",
    ],
  },
  "parent-email-risk-checker": {
    slug: "parent-email-risk-checker",
    path: "/tools/parent-email-risk-checker",
    title: "Parent Email Risk Checker",
    metaTitle:
      "Parent Email Risk Checker for Teachers | Check Tone Before Sending",
    metaDescription:
      "Free parent email risk checker for teachers. Check tone, escalation risk, and whether a difficult email may sound rude, cold, or too sharp before sending.",
    h1: "Parent email risk checker for teachers",
    eyebrow: "Free teacher tool",
    heroTitle:
      "Check the draft before it turns into a longer thread, a complaint, or regret",
    heroBody:
      "This free tool helps teachers check whether a parent email may sound rude, defensive, overly cold, or more escalatory than intended before it is sent.",
    voiceLine:
      '"I\'ve rewritten this three times." "I don\'t want this to sound rude."',
    checkerHref: "/parent-email-risk-checker?src=tools-parent-risk-checker",
    checkerCta: "Use the free parent email risk checker",
    checkerSupport:
      "Open the existing checker and paste the draft you are worried about.",
    startHref: "/start?src=tools-parent-risk-checker",
    startCta: "Start with Zaza Draft",
    painTitle: "What teachers mean by risk",
    painIntro:
      "In school communication, risk usually does not mean one dramatic phrase. It means a message that is technically fine but still sounds harsher, colder, or more defensive than the teacher intended.",
    painPoints: [
      "A parent reads accusation where you meant concern.",
      "A short email sounds abrupt because you wrote it between lessons.",
      "A tired rewrite still carries more frustration than you want attached to your name.",
    ],
    scenariosTitle: "Example teacher scenarios",
    scenarios: [
      {
        title: "You are emailing about behaviour for the second time this week",
        body: "You need to be clear, but you do not want the family to feel blamed before the conversation even starts.",
      },
      {
        title: "You are replying to a frustrated parent",
        body: "The facts need to stay accurate, but the tone needs to lower the temperature rather than raise it.",
      },
      {
        title: "You are drafting late at night",
        body: "This is when messages often become a little shorter, sharper, and riskier than they look in the moment.",
      },
    ],
    beforeAfterTitle: "Before and after examples",
    beforeAfterIntro:
      "Risk usually shows up as tone, not just wording. These examples show the kind of improvement teachers are usually looking for before they hit send.",
    examples: [
      {
        label: "Lowering escalation risk",
        before: "If this continues, we will have to take this further.",
        after:
          "If this continues, we may need to look at further support and next steps together.",
        whyItWorks:
          "The rewrite keeps the seriousness but sounds less like a threat.",
      },
      {
        label: "Reducing bluntness",
        before: "I need you to address this tonight.",
        after:
          "I would appreciate your support in discussing this with your child this evening.",
        whyItWorks:
          "It shifts from command language to collaborative language while staying clear.",
      },
    ],
    howItHelpsTitle: "What the checker is designed to catch",
    howItHelpsIntro:
      "The free checker is useful when you need a second set of eyes on tone before the message becomes part of a bigger issue.",
    howItHelpsBullets: [
      "Potential escalation triggers",
      "Phrasing that may sound ruder than intended",
      "Cold, abrupt, or overly prescriptive wording",
    ],
    faq: [
      {
        question: "What does email risk mean in this tool?",
        answer:
          "It means the risk that the wording could land badly with a parent because it sounds rude, cold, accusatory, defensive, or escalatory.",
      },
      {
        question: "Who is this for?",
        answer:
          "It is designed for teachers and school staff writing parent-facing communication where tone and professionalism matter.",
      },
      {
        question: "What happens after I use the free checker?",
        answer:
          "You can use the safer rewrite as a starting point, then move into Zaza Draft if you want ongoing help with parent emails, report comments, and other high-stakes school writing.",
      },
    ],
    relatedLinksTitle: "Useful next pages",
    relatedLinks: SHARED_RELATED_LINKS,
    closingTitle:
      "Check the risky draft now, then handle the rest of the week in Zaza Draft",
    closingBody:
      "The free checker is the fast first step. Zaza Draft is for the wider workload of messages that need to stay calm, clear, and professionally safe.",
    keywords: [
      "parent email risk checker",
      "teacher parent email checker",
      "check parent email before sending",
      "teacher tone risk checker",
    ],
  },
};

export function getToolLandingSlugs(): ToolLandingSlug[] {
  return Object.keys(toolLandingPages) as ToolLandingSlug[];
}

export function getToolLandingPages(): ToolLandingPage[] {
  return getToolLandingSlugs().map(
    (slug) => toolLandingPages[slug as ToolLandingSlug],
  );
}

export function getToolLandingPage(slug: string): ToolLandingPage | null {
  if (!(slug in toolLandingPages)) {
    return null;
  }

  return toolLandingPages[slug as ToolLandingSlug];
}
