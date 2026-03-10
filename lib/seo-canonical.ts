import { absoluteUrl } from "@/lib/seo/site-config";

type CanonicalRule = {
  pattern: RegExp;
  canonical: string | ((pathname: string) => string);
};

const REDIRECT_AND_ALIAS_CANONICALS: Record<string, string> = {
  "/learning-centre": "/ai-literacy",
  "/de/learning-centre": "/de/ai-literacy",
  "/communication-diagnosis": "/diagnosis",
  "/how-to-reply-angry-parent": "/diagnosis",
  "/de/ambassadors": "/ambassadors",
  "/de/state-of-ai-education": "/state-of-ai-education",
  "/de/best-ai-writing-tools-for-teachers-2025":
    "/best-ai-writing-tools-for-teachers-2025",
};

const OVERLAPPING_INTENT_RULES: CanonicalRule[] = [
  {
    pattern: /^\/diagnosis(?:\?.*)?$/i,
    canonical: "/diagnosis",
  },
  {
    pattern: /^\/report-comments\/[^/]+\/[^/]+\/[^/]+$/i,
    canonical: "/report-comment-builder",
  },
  {
    pattern: /^\/scenario\/[^/]+\/[^/]+(?:\/[^/]+)?$/i,
    canonical: "/scenario-combinations",
  },
  {
    pattern: /^\/alternatives\/[^/]+\/[^/]+$/i,
    canonical: "/alternatives",
  },
  {
    pattern: /^\/reply\/[^/]+\/[^/]+$/i,
    canonical: "/reply-scenarios",
  },
  {
    pattern: /^\/problems\/[^/]+\/[^/]+$/i,
    canonical: "/parent-communication-problems",
  },
  {
    pattern: /^\/how-to-reply\/[^/]+$/i,
    canonical: "/how-to-reply",
  },
];

// Operator-facing examples for the main overlapping families.
export const CANONICAL_PATTERN_EXAMPLES: Record<string, string> = {
  "/report-comments/struggling/english/ks2": "/report-comment-builder",
  "/report-comments/struggling/maths/year-6": "/report-comment-builder",
  "/report-comments/anxious-eal/science/ks3": "/report-comment-builder",
  "/report-comments/sen-needs/all-subjects/ks4": "/report-comment-builder",
  "/report-comments/high-attaining-disorganised/english/year-11":
    "/report-comment-builder",
  "/report-comments/anxious-eal/maths/ks2": "/report-comment-builder",
  "/report-comments/struggling/science/ks4": "/report-comment-builder",
  "/report-comments/sen-needs/english/year-6": "/report-comment-builder",
  "/scenario/primary/behaviour": "/scenario-combinations",
  "/scenario/secondary/angry-parent": "/scenario-combinations",
  "/scenario/ks2/sen-support/year-6": "/scenario-combinations",
  "/scenario/ks3/missing-homework/year-8": "/scenario-combinations",
  "/scenario/ks4/grade-complaint/year-11": "/scenario-combinations",
  "/scenario/fe/anxiety/post-16": "/scenario-combinations",
  "/scenario/primary/parents-evening/year-5": "/scenario-combinations",
  "/scenario/secondary/low-attainment/year-9": "/scenario-combinations",
  "/alternatives/magicschool-ai/parent-emails": "/alternatives",
  "/alternatives/chatgpt/report-comments": "/alternatives",
  "/alternatives/claude/de-escalation": "/alternatives",
  "/alternatives/gemini/parents-evening": "/alternatives",
  "/alternatives/teachmate/sen-support": "/alternatives",
  "/alternatives/generic-ai/behaviour-notes": "/alternatives",
  "/reply/angry-parent/year-6-sat-prep": "/reply-scenarios",
  "/reply/parent-complaint/homework-not-done": "/reply-scenarios",
  "/problems/ks2/sen-parent-email": "/parent-communication-problems",
  "/problems/year-7-secondary/attendance-concern-email":
    "/parent-communication-problems",
  "/how-to-reply/angry-parent": "/how-to-reply",
  "/communication-diagnosis": "/diagnosis",
  "/learning-centre": "/ai-literacy",
};

function normaliseSlashes(pathname: string) {
  const collapsed = pathname.replace(/\/{2,}/g, "/");
  if (collapsed === "/") {
    return collapsed;
  }

  return collapsed.replace(/\/+$/, "");
}

export function normaliseCanonicalPath(input = "/") {
  if (!input) {
    return "/";
  }

  let pathname = input.trim();

  if (/^https?:\/\//i.test(pathname)) {
    pathname = new URL(pathname).pathname;
  }

  const [pathOnly] = pathname.split(/[?#]/, 1);
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;

  return normaliseSlashes(withLeadingSlash || "/");
}

export function resolveCanonicalPath(input = "/") {
  const pathname = normaliseCanonicalPath(input);

  if (REDIRECT_AND_ALIAS_CANONICALS[pathname]) {
    return REDIRECT_AND_ALIAS_CANONICALS[pathname];
  }

  for (const rule of OVERLAPPING_INTENT_RULES) {
    if (rule.pattern.test(pathname)) {
      return typeof rule.canonical === "function"
        ? rule.canonical(pathname)
        : rule.canonical;
    }
  }

  return pathname;
}

export function resolveCanonicalUrl(input = "/") {
  return absoluteUrl(resolveCanonicalPath(input));
}

export function buildCanonicalAlternates(input = "/") {
  return {
    canonical: resolveCanonicalUrl(input),
  };
}
