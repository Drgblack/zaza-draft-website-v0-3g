/**
 * Zaza Draft - Creator Partner Registry
 *
 * To add a new creator, append an entry to the CREATORS object below.
 * The handle is the URL slug (zazadraft.com/c/[handle]) and must be lowercase,
 * URL-safe, and unique.
 *
 * Required fields: name, displayName, quote, ctaLabel, segment
 * Optional fields: photoUrl, headline, useCase, couponCode, platforms
 *
 * Once added, the page is automatically generated at:
 *   https://zazadraft.com/c/[handle]
 *
 * The build will validate config at compile time. Missing required fields
 * will fail the build, which is by design - better to fail loudly than ship
 * a half-built creator page.
 */

export type CreatorSegment =
  | "frustrated" // Coach-style: comedy/relatability around teacher pain
  | "tech-curious" // Emily Karst-style: AI tool walkthroughs, productivity
  | "pedagogy" // Melissa Antinoff-style: communication craft, de-escalation
  | "practical" // Emily Espinosa-style: first-year teacher, resources
  | "general"; // Fallback for creators not matching above archetypes

export type Creator = {
  /** URL slug - lowercase, no spaces. e.g. 'coach', 'emily-karst' */
  handle: string;

  /** Full display name. e.g. 'Coach Anthony' */
  name: string;

  /** Short brand name as audience knows them. e.g. 'Coach', '@joyfulnoiseteaching' */
  displayName: string;

  /** Where the audience knows them from. e.g. 'TikTok', 'Instagram' */
  platforms: ("TikTok" | "Instagram" | "YouTube" | "X" | "LinkedIn")[];

  /** Personalised quote shown on landing page. Keep under 25 words. */
  quote: string;

  /** Tailored headline. If omitted, segment default is used. */
  headline?: string;

  /** Description of the specific use case the creator's content highlights. */
  useCase?: string;

  /** Custom CTA button text. e.g. "Try Coach's setup free for 14 days" */
  ctaLabel?: string;

  /** Path to creator headshot (in /public). Optional - page works without. */
  photoUrl?: string;

  /** Stripe promotion code. Auto-applied at checkout. e.g. 'COACH25' */
  couponCode?: string;

  /** Discount percentage to display in the badge. e.g. 25 for "25% off" */
  discountPercent?: number;

  /** Audience archetype for segmented copy. */
  segment: CreatorSegment;

  /** Whether this creator is currently active. Inactive = page returns 404. */
  active: boolean;
};

/**
 * The Creator Registry.
 *
 * Add new creators here. The build will fail if a creator is referenced
 * but not present.
 */
export const CREATORS: Record<string, Creator> = {
  // ============================================================
  // EXAMPLE - Coach (parent emails, comedy/relatability)
  // ============================================================
  coach: {
    handle: "coach",
    name: "Coach",
    displayName: "Coach",
    platforms: ["TikTok"],
    quote:
      "I read parent emails for a living. This is the tool I wish I had the first time I had to reply to one.",
    headline: "Stop letting parent emails ruin your Sunday.",
    useCase:
      "When the parent email lands, you write the honest version in your head. Zaza Draft turns that into the version you can actually send.",
    ctaLabel: "Try the tool Coach uses, free",
    photoUrl: "/creators/coach.jpg",
    couponCode: "COACH25",
    discountPercent: 25,
    segment: "frustrated",
    active: true,
  },

  // ============================================================
  // EXAMPLE - Emily Karst / Joyful Noise Teaching (AI tools)
  // ============================================================
  "emily-karst": {
    handle: "emily-karst",
    name: "Emily Karst",
    displayName: "Emily Karst",
    platforms: ["TikTok", "Instagram"],
    quote:
      "Most AI tools optimise for speed. This one optimises for the message you won't regret. Different beast.",
    headline:
      "The AI workflow Emily uses for high-stakes teacher communication.",
    useCase:
      "Same idea as the AI tools Emily reviews, but built specifically for the moments where the stakes are emotional, not just productivity.",
    ctaLabel: "Start with Emily's discount",
    photoUrl: "/creators/emily-karst.jpg",
    couponCode: "EMILY25",
    discountPercent: 25,
    segment: "tech-curious",
    active: true,
  },

  // ============================================================
  // EXAMPLE - Emily Espinosa / That One Teacher Gal (first-year)
  // ============================================================
  "emily-espinosa": {
    handle: "emily-espinosa",
    name: "Emily Espinosa",
    displayName: "Emily Espinosa",
    platforms: ["TikTok"],
    quote:
      "First-year teachers always ask me how to write the parent email. This is what I wish I'd had to point them to.",
    headline:
      "The parent-email tool every first-year teacher needs in their first week.",
    useCase:
      "Your toolkit teaches the framework. Zaza Draft applies it to the specific email staring at you right now at 9pm.",
    ctaLabel: "Get Emily's recommendation, free",
    photoUrl: "/creators/emily-espinosa.jpg",
    couponCode: "GAL25",
    discountPercent: 25,
    segment: "practical",
    active: true,
  },
};

/**
 * Helper: get a creator by handle, returns null if not found or inactive.
 */
export function getCreator(handle: string): Creator | null {
  const normalised = handle.toLowerCase();
  const creator = CREATORS[normalised];
  if (!creator || !creator.active) return null;
  return creator;
}

/**
 * Helper: list all active creator handles. Used by generateStaticParams
 * in the dynamic route to pre-render every active creator page at build time.
 */
export function getActiveHandles(): string[] {
  return Object.values(CREATORS)
    .filter((c) => c.active)
    .map((c) => c.handle);
}

/**
 * Segment-level fallback copy. Used when a creator has no custom headline
 * or useCase. This means even a barebones creator entry produces a coherent
 * page - you can flesh out the personalisation later.
 */
export const SEGMENT_DEFAULTS: Record<
  CreatorSegment,
  { headline: string; useCase: string }
> = {
  frustrated: {
    headline: "Stop letting parent emails ruin your Sunday.",
    useCase:
      "Paste the honest version of the email you want to send. Get back the version you can actually send. Calm, professional, still in your voice.",
  },
  "tech-curious": {
    headline:
      "The AI tool built for the teacher communication moments where the stakes are emotional.",
    useCase:
      "Most AI tools optimise for speed. Zaza Draft optimises for the message you won't regret tomorrow. Same workflow, different goal.",
  },
  pedagogy: {
    headline:
      "The de-escalation tool for the moments your craft prepared you for.",
    useCase:
      "You teach the principles. Zaza Draft applies them to the specific email in front of you, in real time, when it matters.",
  },
  practical: {
    headline: "The parent-email tool every teacher quietly wishes they had.",
    useCase:
      "When the email lands and you don't know where to start, paste your honest first draft. Get back the version that holds the line and stays warm.",
  },
  general: {
    headline: "The message you won't regret tomorrow.",
    useCase:
      "Paste the honest version. Get back the version you can actually send. Calm, professional, still in your voice.",
  },
};
