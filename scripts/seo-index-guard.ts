import fs from "fs";
import path from "path";
import { getTieredSitemap } from "../app/sitemap";
import { getIndexControlDecision } from "../lib/index-control";
import { getReportPruneDecision } from "../lib/report-prune";
import { SEO_CANONICAL_EXAMPLES } from "../lib/seo";
import {
  normaliseCanonicalPath,
  resolveCanonicalPath,
} from "../lib/seo-canonical";

type SitemapTier = "main" | "longtail";
type GuardIssueType =
  | "missing-route"
  | "redirect-url-in-sitemap"
  | "non-canonical-url-in-sitemap"
  | "non-indexable-url-in-sitemap"
  | "canonical-target-invalid";

type GuardIssue = {
  tier: SitemapTier | "canonical-sample";
  path: string;
  type: GuardIssueType;
  detail: string;
};

type RoutePattern = {
  route: string;
  regex: RegExp;
};

const REPO_ROOT = process.cwd();
const APP_ROOT = path.join(REPO_ROOT, "app");
const NEXT_CONFIG_PATH = path.join(REPO_ROOT, "next.config.mjs");
const REPORT_PATH = path.join(REPO_ROOT, "docs", "seo", "seo-index-guard.json");
const SKIP_DIRECTORIES = new Set([
  ".git",
  ".next",
  "node_modules",
  "docs",
  "dist",
  "coverage",
]);

function toPosixPath(value: string) {
  return value.split(path.sep).join("/");
}

function ensureDirectory(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
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

      return [fullPath];
    });
}

function buildRoutePatterns(): RoutePattern[] {
  const pageFiles = walkFiles(APP_ROOT).filter((filePath) =>
    /[\\/]page\.(ts|tsx|js|jsx|mdx?)$/i.test(filePath),
  );

  return pageFiles.map((filePath) => {
    const relativePath = path.relative(APP_ROOT, filePath);
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

function routeExists(pathname: string, patterns: RoutePattern[]) {
  return patterns.some((pattern) => pattern.regex.test(pathname));
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

function buildRoutePathFromFile(filePath: string) {
  const relativePath = path.relative(APP_ROOT, filePath);
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
  const pageFiles = walkFiles(APP_ROOT).filter((filePath) =>
    /[\\/]page\.(ts|tsx|js|jsx|mdx?)$/i.test(filePath),
  );

  return pageFiles.reduce<Record<string, string>>((accumulator, filePath) => {
    const content = fs.readFileSync(filePath, "utf8");

    if (!/(permanentRedirect|redirect)\(/.test(content)) {
      return accumulator;
    }

    const routePath = buildRoutePathFromFile(filePath);
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
  };
}

function isSitemapIndexable(pathname: string) {
  if (pathname.startsWith("/report-comments/")) {
    return getReportPruneDecision(pathname).action === "keep";
  }

  return getIndexControlDecision(pathname).indexable;
}

async function main() {
  const routePatterns = buildRoutePatterns();
  const redirectMap = buildRedirectMap();
  const issues: GuardIssue[] = [];
  const tiers: SitemapTier[] = ["main", "longtail"];

  for (const tier of tiers) {
    const entries = await getTieredSitemap(tier);

    for (const entry of entries) {
      const pathname = new URL(entry.url).pathname;

      if (!routeExists(pathname, routePatterns)) {
        issues.push({
          tier,
          path: pathname,
          type: "missing-route",
          detail: "Sitemap URL does not match a current public route.",
        });
      }

      if (redirectMap[pathname]) {
        issues.push({
          tier,
          path: pathname,
          type: "redirect-url-in-sitemap",
          detail: `Sitemap URL redirects to ${redirectMap[pathname]}.`,
        });
      }

      const canonicalPath = resolveCanonicalPath(pathname);

      if (canonicalPath !== pathname) {
        issues.push({
          tier,
          path: pathname,
          type: "non-canonical-url-in-sitemap",
          detail: `Sitemap URL canonicalises to ${canonicalPath}.`,
        });
      }

      if (!isSitemapIndexable(pathname)) {
        issues.push({
          tier,
          path: pathname,
          type: "non-indexable-url-in-sitemap",
          detail:
            "Sitemap URL is outside the current indexable or keep thresholds.",
        });
      }
    }
  }

  for (const [samplePath, canonicalTarget] of Object.entries(
    SEO_CANONICAL_EXAMPLES,
  )) {
    const normalizedTarget = normaliseCanonicalPath(canonicalTarget);

    if (!routeExists(normalizedTarget, routePatterns)) {
      issues.push({
        tier: "canonical-sample",
        path: samplePath,
        type: "canonical-target-invalid",
        detail: `Canonical target ${normalizedTarget} does not match a current public route.`,
      });
      continue;
    }

    if (redirectMap[normalizedTarget]) {
      issues.push({
        tier: "canonical-sample",
        path: samplePath,
        type: "canonical-target-invalid",
        detail: `Canonical target ${normalizedTarget} redirects to ${redirectMap[normalizedTarget]}.`,
      });
      continue;
    }

    if (
      normalizedTarget.startsWith("/report-comments/") ||
      normalizedTarget.startsWith("/scenario/")
    ) {
      if (!isSitemapIndexable(normalizedTarget)) {
        issues.push({
          tier: "canonical-sample",
          path: samplePath,
          type: "canonical-target-invalid",
          detail: `Canonical target ${normalizedTarget} is not indexable under the current rules.`,
        });
      }
    }
  }

  ensureDirectory(REPORT_PATH);
  fs.writeFileSync(
    REPORT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        routePatterns: routePatterns.length,
        redirectSources: Object.keys(redirectMap).length,
        issues,
      },
      null,
      2,
    ),
  );

  if (issues.length > 0) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          issueCount: issues.length,
          report: toPosixPath(path.relative(REPO_ROOT, REPORT_PATH)),
        },
        null,
        2,
      ),
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        issueCount: 0,
        report: toPosixPath(path.relative(REPO_ROOT, REPORT_PATH)),
      },
      null,
      2,
    ),
  );
}

void main();
