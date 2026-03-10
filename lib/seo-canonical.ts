import { absoluteUrl } from "@/lib/seo/site-config";
import { getIndexControlDecision } from "@/lib/index-control";

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
    canonical: (pathname: string) =>
      getIndexControlDecision(pathname).indexable
        ? pathname
        : "/report-comment-builder",
  },
  {
    pattern: /^\/scenario\/[^/]+\/[^/]+(?:\/[^/]+)?$/i,
    canonical: (pathname: string) =>
      getIndexControlDecision(pathname).indexable
        ? pathname
        : "/scenario-combinations",
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
  "/report-comments/struggling/english/year-5":
    "/report-comments/struggling/english/year-5",
  "/report-comments/struggling/english/year-6":
    "/report-comments/struggling/english/year-6",
  "/report-comments/struggling/english/ks2":
    "/report-comments/struggling/english/ks2",
  "/report-comments/struggling/maths/year-10":
    "/report-comments/struggling/maths/year-10",
  "/report-comments/struggling/science/year-11":
    "/report-comments/struggling/science/year-11",
  "/report-comments/anxious-eal/maths/ks3":
    "/report-comments/anxious-eal/maths/ks3",
  "/report-comments/anxious-eal/science/year-11":
    "/report-comments/anxious-eal/science/year-11",
  "/report-comments/sen-needs/english/year-6":
    "/report-comments/sen-needs/english/year-6",
  "/report-comments/sen-needs/maths/ks4":
    "/report-comments/sen-needs/maths/ks4",
  "/report-comments/sen-needs/science/year-10":
    "/report-comments/sen-needs/science/year-10",
  "/report-comments/struggling/english/primary": "/report-comment-builder",
  "/report-comments/struggling/maths/year-6": "/report-comment-builder",
  "/report-comments/anxious-eal/science/ks3": "/report-comment-builder",
  "/report-comments/sen-needs/all-subjects/ks4": "/report-comment-builder",
  "/report-comments/high-attaining-disorganised/english/year-11":
    "/report-comment-builder",
  "/report-comments/anxious-eal/maths/ks2": "/report-comment-builder",
  "/report-comments/struggling/science/ks4": "/report-comment-builder",
  "/report-comments/high-attaining-disorganised/maths/primary":
    "/report-comment-builder",
  "/report-comments/high-attaining-disorganised/all-subjects/secondary":
    "/report-comment-builder",
  "/report-comments/anxious-eal/all-subjects/primary":
    "/report-comment-builder",
  "/report-comments/struggling/all-subjects/fe": "/report-comment-builder",
  "/report-comments/sen-needs/all-subjects/secondary":
    "/report-comment-builder",
  "/scenario/primary/behaviour/year-5": "/scenario/primary/behaviour/year-5",
  "/scenario/primary/parents-evening/year-6":
    "/scenario/primary/parents-evening/year-6",
  "/scenario/ks1/missing-homework/year-2":
    "/scenario/ks1/missing-homework/year-2",
  "/scenario/ks2/sen-support/year-5": "/scenario/ks2/sen-support/year-5",
  "/scenario/ks2/angry-parent/year-6": "/scenario/ks2/angry-parent/year-6",
  "/scenario/ks3/behaviour/year-8": "/scenario/ks3/behaviour/year-8",
  "/scenario/ks3/parents-evening/year-9":
    "/scenario/ks3/parents-evening/year-9",
  "/scenario/ks4/missing-homework/year-10":
    "/scenario/ks4/missing-homework/year-10",
  "/scenario/ks4/angry-parent/year-11": "/scenario/ks4/angry-parent/year-11",
  "/scenario/primary/behaviour": "/scenario-combinations",
  "/scenario/secondary/angry-parent": "/scenario-combinations",
  "/scenario/ks2/sen-support/year-4": "/scenario-combinations",
  "/scenario/ks3/missing-homework/year-7": "/scenario-combinations",
  "/scenario/ks4/grade-complaint/year-11": "/scenario-combinations",
  "/scenario/fe/anxiety/post-16": "/scenario-combinations",
  "/scenario/primary/parents-evening/year-3": "/scenario-combinations",
  "/scenario/secondary/low-attainment/year-9": "/scenario-combinations",
  "/scenario/secondary/behaviour/year-7": "/scenario-combinations",
  "/scenario/primary/anxiety/year-1": "/scenario-combinations",
  "/scenario/ks1/parents-evening/year-1": "/scenario-combinations",
  "/alternatives/magicschool-ai/parent-emails": "/alternatives",
  "/alternatives/chatgpt/report-comments": "/alternatives",
  "/alternatives/claude/de-escalation": "/alternatives",
  "/alternatives/gemini/parents-evening": "/alternatives",
  "/alternatives/teachmate/sen-support": "/alternatives",
  "/reply/angry-parent/year-6-sat-prep": "/reply-scenarios",
  "/reply/parent-complaint/homework-not-done": "/reply-scenarios",
  "/problems/ks2/sen-parent-email": "/parent-communication-problems",
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
