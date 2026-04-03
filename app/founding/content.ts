import type { FunnelCopy } from "../funnel/content";

type SharedFunnelSections = Pick<
  FunnelCopy,
  "hero" | "pain" | "solution" | "howItWorks" | "faq"
>;

export type FoundingOfferCard = {
  interval: "annual" | "monthly";
  title: string;
  badge?: string;
  description: string;
  features: string[];
  note: string;
};

export type FoundingFunnelCopy = SharedFunnelSections & {
  heroCtaLabel: string;
  offer: {
    eyebrow: string;
    heading: string;
    subheading: string;
    lockedPricingNote: string;
    pricingReassurance?: string;
    cards: [FoundingOfferCard, FoundingOfferCard];
    reassurance: string;
    supportItems: [string, string, string, string];
    unavailableNote: string;
  };
};

export const foundingFunnelCopy: FoundingFunnelCopy = {
  heroCtaLabel: "Join as a founding teacher",
  hero: {
    preheadline: "Founding Teachers",
    headingLines: [
      "It is 9:47pm.",
      "This parent email could",
      "go very differently.",
    ],
    subheadingTop:
      "The version in your head and the version you can safely send are often very different.",
    subheadingBottom: "Zaza Draft helps close that gap before you press send.",
    reassurance:
      "Founding pricing stays with you while your subscription remains active.",
    footer:
      "Early access for teachers who want the message they won't regret tomorrow.",
    imageAlt:
      "Teacher reviewing a difficult email late in the evening and finding a calmer way to respond",
    bubble: "A supportive co-writer for the version you actually send.",
  },
  pain: {
    heading: "You already know",
    headingAccent: "this could go badly.",
    subheading:
      "The hard part is not only the email itself. It is the gap between what you want to say in the moment and what you can safely send without making things worse.",
    cards: [
      {
        title: "Late-night pressure",
        body: '"It is 9:47pm, this parent email has just ruined my night, and I still need to reply carefully."',
      },
      {
        title: "The version in your head",
        body: '"I rewrite the same reply several times because I cannot tell whether it sounds too harsh, too cold, or too emotional."',
      },
      {
        title: "Professional risk",
        body: '"One tired sentence can escalate things, cost me sleep, and become tomorrow morning\'s problem."',
      },
    ],
    quote:
      "Sometimes the hardest part is not knowing the facts. It is finding words that are clear, calm, and safe enough to send.",
    note: "Zaza Draft is built for that moment between raw reaction and professional reply.",
    imageAlt:
      "Teacher at a desk late at night, carefully reviewing a message before sending",
  },
  solution: {
    heading: "Zaza Draft helps move a message",
    headingAccent: "from raw reaction to calm language.",
    subheading:
      "It works as a supportive co-writer for difficult parent emails, sensitive updates, and other moments where you need a safer version before you press send.",
    generatedHeading: "Drafted reply:",
    generatedBody:
      '"Thank you for getting in touch and for sharing your concern. I can understand why this felt upsetting. I wanted to reply carefully and give you a clear picture of what happened today. I have already followed this up in school, and I am happy to keep you updated so we can move forward calmly together."',
    generatedMeta:
      "Drafted in seconds. Fully editable before you send anything.",
    generatedVoiceNote: "A safer version before send - still in your voice.",
    points: [
      {
        title: "Safer before send",
        body: "Helps you soften the risky edges of a message before it goes out, without losing the point you need to make.",
      },
      {
        title: "A supportive co-writer",
        body: "Built to support teacher judgement, not replace it. You stay responsible for the final wording.",
      },
      {
        title: "Less rewrite, less second-guessing",
        body: "Gives you a thoughtful starting point so you are not trapped in the same cycle of drafting, softening, and deleting when you are already tired.",
      },
      {
        title: "Built for real teacher pressure",
        body: "Made for parent communication, sensitive follow-ups, and the moments where tone and professionalism matter most.",
      },
    ],
    imageAlt:
      "Teacher working with more confidence on a laptop in a calm classroom setting",
    quote:
      "The point is not to replace the teacher. It is to help the teacher respond with more calm, more clarity, and less risk.",
    note: "Zaza Draft is being shaped around the moments where communication carries emotional weight and professional risk.",
    proofLine:
      "Built for parent emails, sensitive updates, and the replies teachers most often rewrite three times.",
  },
  howItWorks: {
    heading: "A calmer system for",
    headingAccent: "difficult replies",
    subheading:
      "For the parent email that lands late, the sensitive update that could escalate, and the message you cannot afford to get wrong.",
    steps: [
      {
        number: "1",
        title: "Share the situation",
        body: "Paste the email, outline what happened, or describe the tone you need to hold.",
        preview: '"Parent upset about a homework issue"',
      },
      {
        number: "2",
        title: "Get a calmer draft",
        body: "Zaza Draft turns the raw moment into a more measured reply you can read and assess.",
        preview: '"Drafting a measured response..."',
      },
      {
        number: "3",
        title: "Review before you send",
        body: "Adjust the wording, keep what fits, and send a message that feels more considered and more like you.",
        preview: '"Ready for your final edit"',
      },
    ],
    badge: "Safer before send",
    proofHeading: "The version in your head and the version you send",
    beforeLabel: "In your head",
    beforeValue: "Too sharp",
    afterLabel: "What you send",
    afterValue: "Clear, calm",
    proofBody:
      "Zaza Draft helps bridge the gap between the reply you feel like sending and the one you can stand behind tomorrow.",
    proofMicrocopy:
      "Read the draft, adjust the tone, send only what still feels like you.",
    proofBullets: [
      "Safer before send",
      "Your voice still present",
      "Built for sensitive moments",
    ],
    imageAlt:
      "Teacher using a laptop to refine a parent email with a clear, calm workflow",
  },
  faq: {
    title: "Questions teachers may still have",
    subtitle:
      "Clear answers for teachers considering early access to a calmer, safer way to write under pressure.",
    items: [
      {
        question: "Who is the Founding Teachers offer for?",
        answer:
          "It is for teachers who regularly handle emotionally difficult parent communication or other high-stakes school messages and want a calmer, lower-risk way to draft them.",
      },
      {
        question: "Does Zaza Draft replace teacher judgement?",
        answer:
          "No. Zaza Draft is designed as a supportive co-writer. Teachers review, edit, and decide what actually gets sent.",
      },
      {
        question: "Why a founding group?",
        answer:
          "This early group helps shape the product around real teacher pressure, real school workflows, and the moments where tone matters most.",
      },
      {
        question: "What does locked pricing for life mean?",
        answer:
          "If you join during this founding window, your founding price stays the same for as long as your subscription remains active.",
      },
      {
        question: "Is this only for difficult parent emails?",
        answer:
          "No. Difficult parent emails are a major use case, but the same support is useful for follow-ups, sensitive updates, and other moments where careful wording matters.",
      },
      {
        question: "Will the product keep evolving after I join?",
        answer:
          "Yes. Founding Teachers are joining early, which means the product will keep improving through feedback from real communication needs in schools.",
      },
    ],
  },
  offer: {
    eyebrow: "Founding Teachers",
    heading: "Join the first group shaping Zaza Draft",
    subheading:
      "Join early, lock in founding pricing, and help shape the product while it is still being built around real teacher pressure.",
    lockedPricingNote:
      "Founding pricing stays with you while your subscription remains active.",
    pricingReassurance: "You are joining early, not buying blind.",
    cards: [
      {
        interval: "annual",
        title: "Founding Annual",
        badge: "Best value",
        description:
          "Best for teachers who already know this is the kind of support they want close by all year.",
        features: [
          "Locked founding pricing",
          "Early access from the start",
          "Help shape the product",
          "A steady choice for the year",
        ],
        note: "A thoughtful choice if you already know you want this support close at hand.",
      },
      {
        interval: "monthly",
        title: "Founding Monthly",
        description:
          "Flexible access for teachers who want to join early and start more gradually.",
        features: [
          "Locked founding pricing",
          "Early access from the start",
          "Help shape the product",
          "More flexible month to month",
        ],
        note: "A simpler entry point if you prefer more flexibility.",
      },
    ],
    reassurance:
      "Built for teachers who want a safer version before they press send - without losing their own judgement.",
    supportItems: [
      "Built for real teacher pressure",
      "Safer before send",
      "Thoughtful AI support",
      "Your judgement stays central",
    ],
    unavailableNote:
      "Founding checkout is temporarily unavailable. Please try again shortly.",
  },
};
