import fs from "fs";
import path from "path";
import { getIndexControlDecision } from "../lib/index-control";
import {
  normaliseCanonicalPath,
  resolveCanonicalPath,
} from "../lib/seo-canonical";

type FindingType =
  | "removed-helper-route"
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
  scannedRoots: string[];
  scannedFiles: number;
  findings: AuditFinding[];
  totals: Record<FindingType, number>;
  dryRun: boolean;
  writeMode: boolean;
  backupsCreated: string[];
};

type RoutePattern = {
  route: string;
  regex: RegExp;
};

const REPO_ROOT = process.cwd();
const SOURCE_ROOTS = ["app", "components", "content"] as const;
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".mdx"]);
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
const BACKUP_SUFFIX = ".link-audit.bak";
const REMOVED_HELPER_ROUTES = new Set([
  "/communication-diagnosis",
  "/how-to-reply-angry-parent",
  "/behaviour-email-diagnosis",
  "/parent-ignores-email-help",
  "/report-writing-stress-help",
  "/slt-documentation-help",
]);

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

function resolveCliPath(inputPath: string) {
  const absolutePath = path.isAbsolute(inputPath)
    ? inputPath
    : path.join(REPO_ROOT, inputPath);

  return path.normalize(absolutePath);
}

function walkFiles(directoryPath: string): string[] {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

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
  const extension = path.extname(filePath).toLowerCase();
  return SCAN_EXTENSIONS.has(extension);
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

  if (REMOVED_HELPER_ROUTES.has(normalizedTarget)) {
    return {
      type: "removed-helper-route",
      normalizedTarget,
      suggestedReplacement,
      autoFixable: Boolean(suggestedReplacement),
      reason:
        "Removed helper route. Update the link to the diagnosis target or a stronger canonical hub instead.",
    };
  }

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
    `Scanned roots: ${report.scannedRoots.join(", ")}`,
    `Scanned files: ${report.scannedFiles}`,
    `Findings: ${report.findings.length}`,
    `Dry run: ${report.dryRun ? "yes" : "no"}`,
    `Write mode: ${report.writeMode ? "yes" : "no"}`,
    "",
    "## Totals",
    "",
    `- Removed helper routes: ${report.totals["removed-helper-route"]}`,
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

  if (report.backupsCreated.length > 0) {
    lines.push("", "## Backups", "");
    for (const backup of report.backupsCreated) {
      lines.push(`- \`${backup}\``);
    }
  }

  return lines.join("\n");
}

function createBackup(filePath: string) {
  const backupPath = `${filePath}${BACKUP_SUFFIX}`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }
  return backupPath;
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

  const backupsCreated: string[] = [];

  for (const [relativeFilePath, fileFindings] of Object.entries(byFile)) {
    const absolutePath = path.join(REPO_ROOT, relativeFilePath);
    backupsCreated.push(
      toPosixPath(path.relative(REPO_ROOT, createBackup(absolutePath))),
    );
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

  return backupsCreated;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const paths: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--path") {
      const nextValue = args[index + 1];
      if (nextValue) {
        paths.push(nextValue);
        index += 1;
      }
    }
  }

  return {
    dryRun: args.includes("--dry-run"),
    write: args.includes("--write"),
    paths,
  };
}

function main() {
  const { dryRun, write, paths } = parseArgs();
  const routePatterns = buildRoutePatterns();
  const redirectMap = buildRedirectMap();
  const scanRoots =
    paths.length > 0
      ? paths.map(resolveCliPath)
      : SOURCE_ROOTS.map(resolveCliPath);
  const files = scanRoots.flatMap((root) => {
    if (!fs.existsSync(root)) {
      return [];
    }

    if (fs.statSync(root).isFile()) {
      return SCAN_EXTENSIONS.has(path.extname(root).toLowerCase())
        ? [root]
        : [];
    }

    return walkFiles(root);
  });

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

  const backupsCreated = write && !dryRun ? applyAutoFixes(findings) : [];

  const report: AuditReport = {
    generatedAt: new Date().toISOString(),
    scannedRoots: scanRoots.map((root) =>
      toPosixPath(path.relative(REPO_ROOT, root) || "."),
    ),
    scannedFiles: files.length,
    findings,
    totals: {
      "removed-helper-route": findings.filter(
        (item) => item.type === "removed-helper-route",
      ).length,
      "redirect-target": findings.filter(
        (item) => item.type === "redirect-target",
      ).length,
      "missing-route": findings.filter((item) => item.type === "missing-route")
        .length,
      "low-confidence-programmatic": findings.filter(
        (item) => item.type === "low-confidence-programmatic",
      ).length,
    },
    dryRun,
    writeMode: write,
    backupsCreated,
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
        dryRun,
        writeMode: write,
        backupsCreated: report.backupsCreated.length,
      },
      null,
      2,
    ),
  );
}

main();
