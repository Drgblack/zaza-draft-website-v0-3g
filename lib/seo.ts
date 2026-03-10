import {
  CANONICAL_PATTERN_EXAMPLES,
  resolveCanonicalPath,
  resolveCanonicalUrl,
} from "@/lib/seo-canonical";
import {
  getIndexControlDecision as getPathIndexControlDecision,
  isIndexable as isPathIndexable,
} from "@/lib/index-control";

export function getIndexDecision(slug: string) {
  return getPathIndexControlDecision(slug);
}

export function isIndexable(slug: string): boolean {
  return isPathIndexable(slug);
}

export function getCanonicalPath(slug: string): string {
  return resolveCanonicalPath(slug);
}

export function getCanonical(slug: string): string {
  return resolveCanonicalUrl(slug);
}

// Keep a compact operator-facing sample close to the shared SEO surface.
export const SEO_CANONICAL_EXAMPLES: Record<string, string> = {
  "/report-comments/struggling/english/year-5":
    CANONICAL_PATTERN_EXAMPLES["/report-comments/struggling/english/year-5"],
  "/report-comments/struggling/english/primary":
    CANONICAL_PATTERN_EXAMPLES["/report-comments/struggling/english/primary"],
  "/report-comments/anxious-eal/science/year-11":
    CANONICAL_PATTERN_EXAMPLES["/report-comments/anxious-eal/science/year-11"],
  "/report-comments/sen-needs/all-subjects/ks4":
    CANONICAL_PATTERN_EXAMPLES["/report-comments/sen-needs/all-subjects/ks4"],
  "/scenario/primary/behaviour/year-5":
    CANONICAL_PATTERN_EXAMPLES["/scenario/primary/behaviour/year-5"],
  "/scenario/ks2/angry-parent/year-6":
    CANONICAL_PATTERN_EXAMPLES["/scenario/ks2/angry-parent/year-6"],
  "/scenario/primary/behaviour":
    CANONICAL_PATTERN_EXAMPLES["/scenario/primary/behaviour"],
  "/scenario/ks4/grade-complaint/year-11":
    CANONICAL_PATTERN_EXAMPLES["/scenario/ks4/grade-complaint/year-11"],
  "/alternatives/magicschool-ai/parent-emails":
    CANONICAL_PATTERN_EXAMPLES["/alternatives/magicschool-ai/parent-emails"],
  "/reply/angry-parent/year-6-sat-prep":
    CANONICAL_PATTERN_EXAMPLES["/reply/angry-parent/year-6-sat-prep"],
};
