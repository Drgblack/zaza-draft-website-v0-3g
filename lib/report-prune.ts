export type ReportPruneAction = "keep" | "noindex" | "redirect";

export type ReportPruneDecision = {
  action: ReportPruneAction;
  normalizedPath: string;
  redirectTo?: string;
  reason: string;
  keepSignalCount?: number;
  parsed?: {
    studentType: string;
    subject: string;
    stage: string;
  };
};

const REPORT_COMMENTS_HUB_PATH = "/report-comment-builder";
const HIGH_CONFIDENCE_STUDENT_TYPES = new Set([
  "struggling",
  "anxious-eal",
  "sen-needs",
]);
const COMMON_SUBJECTS = new Set(["english", "maths", "science"]);
const POPULAR_PHASE_STAGES = new Set(["primary", "ks2", "secondary"]);
const CORE_YEAR_GROUPS = new Set([
  "year-3",
  "year-4",
  "year-5",
  "year-6",
  "year-7",
  "year-8",
  "year-9",
  "year-10",
  "year-11",
]);
const ALWAYS_REDIRECT_SUBJECTS = new Set(["all-subjects"]);
const ALWAYS_REDIRECT_STAGES = new Set(["fe", "post-16"]);

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

function parseReportCommentsPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "report-comments" || segments.length !== 4) {
    return null;
  }

  const [, studentType, subject, stage] = segments;
  return { studentType, subject, stage };
}

export function getReportPruneDecision(pathname: string): ReportPruneDecision {
  const normalizedPath = normalisePath(pathname);
  const parsed = parseReportCommentsPath(normalizedPath);

  if (!parsed) {
    return {
      action: "keep",
      normalizedPath,
      reason: "Path does not match the report-comments family.",
    };
  }

  if (ALWAYS_REDIRECT_SUBJECTS.has(parsed.subject)) {
    return {
      action: "redirect",
      normalizedPath,
      redirectTo: REPORT_COMMENTS_HUB_PATH,
      parsed,
      reason:
        "Redirect: broad all-subjects variant overlaps the report-comments hub and should not stay live as a separate longtail URL.",
      keepSignalCount: 0,
    };
  }

  if (ALWAYS_REDIRECT_STAGES.has(parsed.stage)) {
    return {
      action: "redirect",
      normalizedPath,
      redirectTo: REPORT_COMMENTS_HUB_PATH,
      parsed,
      reason:
        "Redirect: further-education and post-16 report-comment variants are too deep in the tail for standalone indexing.",
      keepSignalCount: 0,
    };
  }

  const hasPreferredStudentType = HIGH_CONFIDENCE_STUDENT_TYPES.has(
    parsed.studentType,
  );
  const hasCommonSubject = COMMON_SUBJECTS.has(parsed.subject);
  const hasPopularPhase = POPULAR_PHASE_STAGES.has(parsed.stage);
  const hasCoreYearGroup = CORE_YEAR_GROUPS.has(parsed.stage);
  const keepSignalCount =
    Number(hasPreferredStudentType) +
    Number(hasCommonSubject) +
    Number(hasPopularPhase || hasCoreYearGroup);

  if (
    hasPreferredStudentType &&
    hasCommonSubject &&
    (hasPopularPhase || hasCoreYearGroup)
  ) {
    return {
      action: "keep",
      normalizedPath,
      parsed,
      reason:
        "Keep: report-comments variant matches the promoted student type, common subject, and core phase or year-group criteria.",
      keepSignalCount,
    };
  }

  return {
    action: "noindex",
    normalizedPath,
    redirectTo: REPORT_COMMENTS_HUB_PATH,
    parsed,
    reason:
      "Noindex: report-comments variant falls outside the promoted keep set and should remain accessible without competing for index coverage.",
    keepSignalCount,
  };
}

export function shouldKeepReportCommentsPath(pathname: string) {
  return getReportPruneDecision(pathname).action === "keep";
}
