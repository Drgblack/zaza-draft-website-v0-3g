import fs from "fs";
import path from "path";
import { getIndexControlDecision } from "../lib/index-control";
import {
  normaliseCanonicalPath,
  resolveCanonicalPath,
} from "../lib/seo-canonical";

type FindingType =
  | "redirect-target"
  | "missing-route"
  | "low-confidence-programmatic";

type LinkMatch = {
  rawTarget: string;
  line: number;
  column: number;
};

type AuditFinding = {
  file: string;
  line: number;
  column: number;
  rawTarget: string;
  normalizedTarget: string;
  type: FindingType;
  suggestedReplacement?: string;
  autoFixable: boolean;
  reason: string;
};

type AuditReport = {
  generatedAt: string;
  scannedFiles: number;
  findings: AuditFinding[];
  totals: Record<FindingType, number>;
};

type RoutePattern = {
  route: string;
  regex: RegExp;
};

const REPO_ROOT = process.cwd();
const SOURCE_ROOTS = ["app", "components", "content"] as const;
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".mdx"]);
const AUTO_FIX_EXTENSIONS = new Set([".md", ".mdx"]);
const SKIP_DIRECTORIES = new Set([
  ".git",
  ".next",
  "node_modules",
  "docs",
  "dist",
  "coverage",
]);
const REPORT_JSON_PATH = path.join(
  REPO_ROOT,
  "docs",
  "seo",
  "link-audit-report.json",
);
const REPORT_MD_PATH = path.join(
  REPO_ROOT,
  "docs",
  "seo",
  "link-audit-report.md",
);
const NEXT_CONFIG_PATH = path.join(REPO_ROOT, "next.config.mjs");

const KNOWN_STALE_REPLACEMENTS: Record<string, string> = {
  "/learning-centre": "/ai-literacy",
  "/de/learning-centre": "/de/ai-literacy",
  "/communication-diagnosis": "/diagnosis",
  "/how-to-reply-angry-parent": "/diagnosis",
  "/compare-tools": "/compare",
  "/privacy-policy": "/privacy",
  "/terms-of-service": "/terms",
  "/free-guide": "/free-resources",
  "/de/ambassadors": "/ambassadors",
  "/de/state-of-ai-education": "/state-of-ai-education",
  "/de/best-ai-writing-tools-for-teachers-2025":
    "/best-ai-writing-tools-for-teachers-2025",
  "/uk/parents-evening-email-template-for-teachers":
    "/uk/parents-evening-email-templates",
};

const LINK_PATTERNS = [
  /href\s*=\s*["'](\/[^"'#)]*)["']/g,
  /href\s*:\s*["'](\/[^"'#)]*)["']/g,
  /link\s*:\s*["'](\/[^"'#)]*)["']/g,
  /\]\((\/[^)\s]+)\)/g,
];

function toPosixPath(value: string) {
  return value.split(path.sep).join("/");
}

function ensureDirectory(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function walkFiles(directoryPath: string): string[] {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        if (SKIP_DIRECTORIES.has(entry.name)) {
          return [];
        }

        return walkFiles(fullPath);
      }

      if (!entry.isFile()) {
        return [];
      }

      if (!SCAN_EXTENSIONS.has(path.extname(entry.name))) {
        return [];
      }

      return [fullPath];
    });
}

function buildRoutePatterns(): RoutePattern[] {
  const appRoot = path.join(REPO_ROOT, "app");
  const pageFiles = walkFiles(appRoot).filter((filePath) =>
    /[\\/]page\.(ts|tsx|js|jsx|mdx?)$/i.test(filePath),
  );

  return pageFiles.map((filePath) => {
    const relativePath = path.relative(appRoot, filePath);
    const segments = relativePath
      .split(path.sep)
      .slice(0, -1)
      .filter((segment) => !/^\(.+\)$/.test(segment));

    const route =
      segments.length === 0
        ? "/"
        : `/${segments
            .map((segment) => {
              if (/^\[\.\.\..+\]$/.test(segment)) {
                return "__CATCH_ALL__";
              }

              if (/^\[.+\]$/.test(segment)) {
                return "__DYNAMIC__";
              }

              return segment;
            })
            .join("/")}`;

    const pattern = route
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/__CATCH_ALL__/g, ".+")
      .replace(/__DYNAMIC__/g, "[^/]+");

    return {
      route,
      regex: new RegExp(`^${pattern}$`),
    };
  });
}

function extractStaticRedirectsFromNextConfig() {
  if (!fs.existsSync(NEXT_CONFIG_PATH)) {
    return {};
  }

  const content = fs.readFileSync(NEXT_CONFIG_PATH, "utf8");
  const redirectPairs = [
    ...content.matchAll(
      /source:\s*["'](\/[^"']+)["'][\s\S]*?destination:\s*["'](\/[^"']+)["']/g,
    ),
  ];

  return redirectPairs.reduce<Record<string, string>>((accumulator, match) => {
    const source = normaliseCanonicalPath(match[1] ?? "");
    const destination = normaliseCanonicalPath(match[2] ?? "");

    if (source && destination) {
      accumulator[source] = destination;
    }

    return accumulator;
  }, {});
}

function buildRoutePathFromFile(appRoot: string, filePath: string) {
  const relativePath = path.relative(appRoot, filePath);
  const segments = relativePath
    .split(path.sep)
    .slice(0, -1)
    .filter((segment) => !/^\(.+\)$/.test(segment));

  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

function extractRedirectTarget(content: string, routePath: string) {
  const directMatch = content.match(
    /(permanentRedirect|redirect)\(\s*["'`](\/[^"'`]+)["'`]\s*\)/,
  );

  if (directMatch?.[2]) {
    return normaliseCanonicalPath(directMatch[2]);
  }

  const literalMatches = [...content.matchAll(/["'`](\/[^"'`$]+)["'`]/g)]
    .map((match) => normaliseCanonicalPath(match[1] ?? ""))
    .filter(Boolean)
    .filter((candidate) => candidate !== routePath);

  return literalMatches[0];
}

function extractRedirectRoutesFromApp() {
  const appRoot = path.join(REPO_ROOT, "app");
  const pageFiles = walkFiles(appRoot).filter((filePath) =>
    /[\\/]page\.(ts|tsx|js|jsx|mdx?)$/i.test(filePath),
  );

  return pageFiles.reduce<Record<string, string>>((accumulator, filePath) => {
    const content = fs.readFileSync(filePath, "utf8");

    if (!/(permanentRedirect|redirect)\(/.test(content)) {
      return accumulator;
    }

    const routePath = buildRoutePathFromFile(appRoot, filePath);
    const redirectTarget = extractRedirectTarget(content, routePath);

    if (redirectTarget) {
      accumulator[normaliseCanonicalPath(routePath)] = redirectTarget;
    }

    return accumulator;
  }, {});
}

function buildRedirectMap() {
  return {
    ...extractStaticRedirectsFromNextConfig(),
    ...extractRedirectRoutesFromApp(),
    ...KNOWN_STALE_REPLACEMENTS,
  };
}

function routeExists(pathname: string, patterns: RoutePattern[]) {
  return patterns.some((pattern) => pattern.regex.test(pathname));
}

function getLineAndColumn(content: string, matchIndex: number) {
  const before = content.slice(0, matchIndex);
  const lines = before.split(/\r?\n/);
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return { line, column };
}

function collectLinkMatches(content: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  for (const pattern of LINK_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null = null;

    while ((match = pattern.exec(content)) !== null) {
      const rawTarget = match[1]?.trim();

      if (!rawTarget || rawTarget.startsWith("//")) {
        continue;
      }

      const position = getLineAndColumn(content, match.index);

      matches.push({
        rawTarget,
        line: position.line,
        column: position.column,
      });
    }
  }

  return matches;
}

function canAutoFix(filePath: string) {
  return AUTO_FIX_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function classifyTarget(
  target: string,
  routePatterns: RoutePattern[],
  redirectMap: Record<string, string>,
): Pick<
  AuditFinding,
  | "type"
  | "reason"
  | "suggestedReplacement"
  | "autoFixable"
  | "normalizedTarget"
> | null {
  const normalizedTarget = normaliseCanonicalPath(target);
  const suggestedReplacement =
    redirectMap[normalizedTarget] ??
    (resolveCanonicalPath(normalizedTarget) !== normalizedTarget
      ? resolveCanonicalPath(normalizedTarget)
      : undefined);

  if (redirectMap[normalizedTarget]) {
    return {
      type: "redirect-target",
      normalizedTarget,
      suggestedReplacement,
      autoFixable: Boolean(suggestedReplacement),
      reason:
        "Known stale internal link that now redirects or should point to a stronger destination.",
    };
  }

  if (!routeExists(normalizedTarget, routePatterns)) {
    return {
      type: "missing-route",
      normalizedTarget,
      suggestedReplacement,
      autoFixable: Boolean(suggestedReplacement),
      reason: "Internal link target does not match a current public route.",
    };
  }

  const indexDecision = getIndexControlDecision(normalizedTarget);

  if (!indexDecision.indexable) {
    return {
      type: "low-confidence-programmatic",
      normalizedTarget,
      suggestedReplacement:
        suggestedReplacement ?? resolveCanonicalPath(normalizedTarget),
      autoFixable: true,
      reason: indexDecision.reason,
    };
  }

  return null;
}

function buildMarkdownReport(report: AuditReport) {
  const lines = [
    "# Link Audit Report",
    "",
    `Generated: ${report.generatedAt}`,
    `Scanned files: ${report.scannedFiles}`,
    `Findings: ${report.findings.length}`,
    "",
    "## Totals",
    "",
    `- Redirect targets: ${report.totals["redirect-target"]}`,
    `- Missing routes: ${report.totals["missing-route"]}`,
    `- Low-confidence programmatic: ${report.totals["low-confidence-programmatic"]}`,
    "",
  ];

  if (report.findings.length === 0) {
    lines.push("No stale internal links found.");
    return lines.join("\n");
  }

  lines.push(
    "## Findings",
    "",
    "| Type | File | Line | Target | Suggested replacement | Reason |",
    "| --- | --- | ---: | --- | --- | --- |",
  );

  for (const finding of report.findings) {
    lines.push(
      `| ${finding.type} | ${finding.file} | ${finding.line} | \`${finding.rawTarget}\` | ${
        finding.suggestedReplacement
          ? `\`${finding.suggestedReplacement}\``
          : "-"
      } | ${finding.reason} |`,
    );
  }

  return lines.join("\n");
}

function applyAutoFixes(findings: AuditFinding[]) {
  const writableFindings = findings.filter(
    (finding) =>
      finding.autoFixable &&
      finding.suggestedReplacement &&
      canAutoFix(path.join(REPO_ROOT, finding.file)),
  );

  const byFile = writableFindings.reduce<Record<string, AuditFinding[]>>(
    (accumulator, finding) => {
      accumulator[finding.file] ??= [];
      accumulator[finding.file].push(finding);
      return accumulator;
    },
    {},
  );

  for (const [relativeFilePath, fileFindings] of Object.entries(byFile)) {
    const absolutePath = path.join(REPO_ROOT, relativeFilePath);
    let content = fs.readFileSync(absolutePath, "utf8");

    const replacements = new Map<string, string>();

    for (const finding of fileFindings) {
      if (!finding.suggestedReplacement) {
        continue;
      }

      replacements.set(finding.rawTarget, finding.suggestedReplacement);
    }

    for (const [rawTarget, replacement] of replacements.entries()) {
      content = content.split(rawTarget).join(replacement);
    }

    fs.writeFileSync(absolutePath, content, "utf8");
  }
}

function parseArgs() {
  return {
    write: process.argv.includes("--write"),
  };
}

function main() {
  const { write } = parseArgs();
  const routePatterns = buildRoutePatterns();
  const redirectMap = buildRedirectMap();
  const files = SOURCE_ROOTS.flatMap((root) =>
    walkFiles(path.join(REPO_ROOT, root)),
  );

  const findings: AuditFinding[] = [];

  for (const absolutePath of files) {
    const relativePath = toPosixPath(path.relative(REPO_ROOT, absolutePath));
    const content = fs.readFileSync(absolutePath, "utf8");
    const linkMatches = collectLinkMatches(content);

    for (const match of linkMatches) {
      const classification = classifyTarget(
        match.rawTarget,
        routePatterns,
        redirectMap,
      );

      if (!classification) {
        continue;
      }

      findings.push({
        file: relativePath,
        line: match.line,
        column: match.column,
        rawTarget: match.rawTarget,
        normalizedTarget: classification.normalizedTarget,
        type: classification.type,
        suggestedReplacement: classification.suggestedReplacement,
        autoFixable: classification.autoFixable && canAutoFix(absolutePath),
        reason: classification.reason,
      });
    }
  }

  findings.sort((left, right) => {
    if (left.file !== right.file) {
      return left.file.localeCompare(right.file);
    }

    if (left.line !== right.line) {
      return left.line - right.line;
    }

    return left.column - right.column;
  });

  if (write) {
    applyAutoFixes(findings);
  }

  const report: AuditReport = {
    generatedAt: new Date().toISOString(),
    scannedFiles: files.length,
    findings,
    totals: {
      "redirect-target": findings.filter(
        (item) => item.type === "redirect-target",
      ).length,
      "missing-route": findings.filter((item) => item.type === "missing-route")
        .length,
      "low-confidence-programmatic": findings.filter(
        (item) => item.type === "low-confidence-programmatic",
      ).length,
    },
  };

  ensureDirectory(REPORT_JSON_PATH);
  fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(report, null, 2));
  fs.writeFileSync(REPORT_MD_PATH, buildMarkdownReport(report));

  console.log(
    JSON.stringify(
      {
        scannedFiles: report.scannedFiles,
        findings: report.findings.length,
        reportJson: path.relative(REPO_ROOT, REPORT_JSON_PATH),
        reportMarkdown: path.relative(REPO_ROOT, REPORT_MD_PATH),
        writeMode: write,
      },
      null,
      2,
    ),
  );
}

main();
