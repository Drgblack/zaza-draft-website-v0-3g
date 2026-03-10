import { getReportPruneDecision } from "@/lib/report-prune";

export type IndexControlDecision = {
  indexable: boolean;
  normalizedPath: string;
  family: "core" | "report-comments" | "scenario" | "other";
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
const HIGH_CONFIDENCE_SCENARIO_ISSUES = new Set([
  "behaviour",
  "angry-parent",
  "missing-homework",
  "parents-evening",
  "sen-support",
]);
const HIGH_CONFIDENCE_SCENARIO_PHASE_YEAR_PAIRS = new Set([
  "primary:year-5",
  "primary:year-6",
  "ks1:year-2",
  "ks2:year-5",
  "ks2:year-6",
  "ks3:year-8",
  "ks3:year-9",
  "ks4:year-10",
  "ks4:year-11",
]);

function normalisePath(input = "/") {
  if (!input) {
    return "/";
  }

  let pathname = input.trim();

  if (/^https?:\/\//i.test(pathname)) {
    pathname = new URL(pathname).pathname;
  }

  const [pathOnly] = pathname.split(/[?#]/, 1);
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");

  if (collapsed === "/") {
    return collapsed;
  }

  return collapsed.replace(/\/+$/, "");
}

function getReportCommentDecision(pathname: string): IndexControlDecision {
  const pruneDecision = getReportPruneDecision(pathname);

  return {
    indexable: pruneDecision.action === "keep",
    normalizedPath: pruneDecision.normalizedPath,
    family: "report-comments",
    reason: pruneDecision.reason,
    variationSignalCount: pruneDecision.keepSignalCount,
  };
}

function parseScenarioPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "scenario" || segments.length !== 4) {
    return null;
  }

  const [, phase, issue, yearGroup] = segments;
  return { phase, issue, yearGroup };
}

function getScenarioDecision(pathname: string): IndexControlDecision {
  const parsed = parseScenarioPath(pathname);

  if (!parsed) {
    return {
      indexable: true,
      normalizedPath: pathname,
      family: "other",
      reason: "No scenario rule matched. Defaulting to indexable.",
    };
  }

  const issueSpecificity = HIGH_CONFIDENCE_SCENARIO_ISSUES.has(parsed.issue)
    ? 2
    : 0;
  const phaseYearSpecificity = HIGH_CONFIDENCE_SCENARIO_PHASE_YEAR_PAIRS.has(
    `${parsed.phase}:${parsed.yearGroup}`,
  )
    ? 2
    : 0;
  const variationSignalCount = issueSpecificity + phaseYearSpecificity;

  if (variationSignalCount < 4) {
    return {
      indexable: false,
      normalizedPath: pathname,
      family: "scenario",
      reason:
        "Noindex: scenario variant sits in the deeper tail and does not match the promoted phase, issue, and year-group combinations.",
      variationSignalCount,
    };
  }

  return {
    indexable: true,
    normalizedPath: pathname,
    family: "scenario",
    reason:
      "Indexable: scenario variant matches the promoted teacher-facing combinations for the current threshold.",
    variationSignalCount,
  };
}

export function getIndexControlDecision(slug: string): IndexControlDecision {
  const normalizedPath = normalisePath(slug);

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

  if (normalizedPath.startsWith("/scenario/")) {
    return getScenarioDecision(normalizedPath);
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
