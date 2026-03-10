import { normaliseCanonicalPath } from "@/lib/seo-canonical";

export type IndexControlDecision = {
  indexable: boolean;
  normalizedPath: string;
  family: "core" | "report-comments" | "other";
  reason: string;
  variationSignalCount?: number;
};

const CORE_INDEXABLE_PATHS = new Set([
  "/",
  "/features",
  "/pricing",
  "/products/draft",
  "/early-access",
  "/blog",
  "/resources",
  "/teacher-parent-communication-hub",
  "/uk/teacher-communication-resources",
  "/report-comment-builder",
  "/scenario-combinations",
  "/alternatives",
  "/diagnosis",
]);

const KEY_STAGE_SLUGS = new Set(["ks1", "ks2", "ks3", "ks4"]);
const BROAD_STAGE_SLUGS = new Set(["primary", "secondary", "fe"]);
const LOW_CONFIDENCE_REPORT_CELLS = new Set([
  "struggling:all-subjects:primary",
  "struggling:all-subjects:secondary",
  "struggling:all-subjects:fe",
  "anxious-eal:all-subjects:primary",
  "anxious-eal:all-subjects:secondary",
  "anxious-eal:all-subjects:fe",
  "sen-needs:all-subjects:primary",
  "sen-needs:all-subjects:secondary",
  "sen-needs:all-subjects:fe",
  "high-attaining-disorganised:all-subjects:primary",
  "high-attaining-disorganised:all-subjects:secondary",
  "high-attaining-disorganised:all-subjects:fe",
]);

function getStageSpecificityScore(stage: string) {
  if (stage.startsWith("year-") || stage === "post-16") {
    return 2;
  }

  if (KEY_STAGE_SLUGS.has(stage)) {
    return 1;
  }

  if (BROAD_STAGE_SLUGS.has(stage)) {
    return 0;
  }

  return 1;
}

function parseReportCommentsPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "report-comments" || segments.length !== 4) {
    return null;
  }

  const [, studentType, subject, stage] = segments;
  return { studentType, subject, stage };
}

function getReportCommentDecision(pathname: string): IndexControlDecision {
  const parsed = parseReportCommentsPath(pathname);

  if (!parsed) {
    return {
      indexable: true,
      normalizedPath: pathname,
      family: "other",
      reason: "No report-comments rule matched. Defaulting to indexable.",
    };
  }

  const subjectSpecificity = parsed.subject === "all-subjects" ? 0 : 1;
  const stageSpecificity = getStageSpecificityScore(parsed.stage);
  const variationSignalCount = 1 + subjectSpecificity + stageSpecificity;
  const lowConfidenceKey = `${parsed.studentType}:${parsed.subject}:${parsed.stage}`;

  if (LOW_CONFIDENCE_REPORT_CELLS.has(lowConfidenceKey)) {
    return {
      indexable: false,
      normalizedPath: pathname,
      family: "report-comments",
      reason:
        "Noindex: low-confidence report-comments matrix cell with broad stage and all-subjects overlap.",
      variationSignalCount,
    };
  }

  if (variationSignalCount < 3) {
    return {
      indexable: false,
      normalizedPath: pathname,
      family: "report-comments",
      reason:
        "Noindex: report-comments variant has fewer than 3 variation signals, so it is likely too broad or duplicative.",
      variationSignalCount,
    };
  }

  return {
    indexable: true,
    normalizedPath: pathname,
    family: "report-comments",
    reason:
      "Indexable: report-comments variant has enough subject and stage specificity for the current threshold.",
    variationSignalCount,
  };
}

export function getIndexControlDecision(slug: string): IndexControlDecision {
  const normalizedPath = normaliseCanonicalPath(slug);

  if (CORE_INDEXABLE_PATHS.has(normalizedPath)) {
    return {
      indexable: true,
      normalizedPath,
      family: "core",
      reason: "Indexable: core commercial or hub page.",
    };
  }

  if (normalizedPath.startsWith("/report-comments/")) {
    return getReportCommentDecision(normalizedPath);
  }

  return {
    indexable: true,
    normalizedPath,
    family: "other",
    reason:
      "Indexable by default. No low-confidence rule is active for this family yet.",
  };
}

export function isIndexable(slug: string): boolean {
  return getIndexControlDecision(slug).indexable;
}
