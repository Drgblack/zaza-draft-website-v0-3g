import fs from "node:fs";
import path from "node:path";
import { getTieredSitemap } from "../app/sitemap";
import {
  buildAutomaticBreadcrumbItems,
  shouldRenderAutomaticBreadcrumb,
} from "../lib/seo/breadcrumbs";
import { normaliseLanguageAlternates } from "../lib/seo-canonical";

const repoRoot = process.cwd();
let hasFailure = false;

function pass(message: string) {
  console.log(`PASS ${message}`);
}

function fail(message: string) {
  console.error(`FAIL ${message}`);
  hasFailure = true;
}

function expect(condition: boolean, message: string) {
  if (condition) {
    pass(message);
    return;
  }

  fail(message);
}

function walkFiles(
  directory: string,
  extension: string,
  results: string[] = [],
) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") {
        continue;
      }

      walkFiles(absolutePath, extension, results);
      continue;
    }

    if (absolutePath.endsWith(extension)) {
      results.push(absolutePath);
    }
  }

  return results;
}

function read(relativePath: string) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function scanForMissingImageAlt(relativeDirectory: string) {
  const files = walkFiles(path.join(repoRoot, relativeDirectory), ".tsx");
  const violations: string[] = [];

  for (const filePath of files) {
    const relativePath = path.relative(repoRoot, filePath);
    const source = fs.readFileSync(filePath, "utf8");
    const matches = source.match(/<(?:Image|img)\b[\s\S]*?>/g) ?? [];

    for (const match of matches) {
      if (!/\balt\s*=/.test(match)) {
        violations.push(relativePath);
        break;
      }
    }
  }

  return violations;
}

async function main() {
  const alternates = normaliseLanguageAlternates({
    en: "https://zazadraft.com/pricing",
    de: "https://zazadraft.com/de/pricing",
  });

  expect(
    alternates?.["en-GB"] === "https://zazadraft.com/pricing" &&
      alternates?.["de-DE"] === "https://zazadraft.com/de/pricing" &&
      alternates?.["x-default"] === "https://zazadraft.com/pricing",
    "normaliseLanguageAlternates adds en-GB, de-DE, and x-default",
  );

  const breadcrumbItems = buildAutomaticBreadcrumbItems("/de/about/founder");

  expect(
    shouldRenderAutomaticBreadcrumb("/about/founder") &&
      breadcrumbItems[0]?.path === "/de" &&
      breadcrumbItems[1]?.path === "/de/about" &&
      breadcrumbItems[2]?.path === "/de/about/founder",
    "automatic breadcrumbs build locale-aware paths",
  );

  const layoutSource = read("app/layout.tsx");
  expect(
    layoutSource.includes("<html lang={locale} suppressHydrationWarning>"),
    "root layout uses a dynamic html lang attribute",
  );

  const headerSource = read("components/header.tsx");
  expect(
    headerSource.includes('alt="Zaza Draft"'),
    "header logo alt text is descriptive",
  );

  const appFilesWithAlternates = walkFiles(path.join(repoRoot, "app"), ".tsx")
    .concat(walkFiles(path.join(repoRoot, "app"), ".ts"))
    .filter((filePath) =>
      fs.readFileSync(filePath, "utf8").includes("languages:"),
    );

  const missingXDefault = appFilesWithAlternates.filter((filePath) => {
    const source = fs.readFileSync(filePath, "utf8");
    return source.includes("languages:") && !source.includes('"x-default"');
  });

  expect(
    missingXDefault.length === 0,
    `all app metadata language blocks include x-default (${missingXDefault.length} missing)`,
  );

  const mainSitemap = await getTieredSitemap("main");
  const byPath = new Map(
    mainSitemap.map((entry) => [new URL(entry.url).pathname, entry]),
  );

  const homeEntry = byPath.get("/");
  const deHomeEntry = byPath.get("/de");
  const checkerEntry = byPath.get("/parent-email-risk-checker");
  const deCheckerEntry = byPath.get("/de/parent-email-risk-checker");

  expect(
    homeEntry?.alternates?.languages?.["en-GB"] === "https://zazadraft.com/" &&
      homeEntry?.alternates?.languages?.["de-DE"] ===
        "https://zazadraft.com/de" &&
      homeEntry?.alternates?.languages?.["x-default"] ===
        "https://zazadraft.com/",
    "homepage sitemap entry includes bilingual alternates",
  );

  expect(
    deHomeEntry?.alternates?.languages?.["en-GB"] ===
      "https://zazadraft.com/" &&
      deHomeEntry?.alternates?.languages?.["de-DE"] ===
        "https://zazadraft.com/de" &&
      deHomeEntry?.alternates?.languages?.["x-default"] ===
        "https://zazadraft.com/",
    "German homepage sitemap entry includes bilingual alternates",
  );

  expect(
    checkerEntry?.alternates?.languages?.["de-DE"] ===
      "https://zazadraft.com/de/parent-email-risk-checker" &&
      deCheckerEntry?.alternates?.languages?.["en-GB"] ===
        "https://zazadraft.com/parent-email-risk-checker",
    "Parent Email Risk Checker sitemap entries include cross-language alternates",
  );

  const noindexSourceChecks = [
    "app/early-access/page.tsx",
    "app/de/early-access/page.tsx",
    "app/founding/page.tsx",
    "app/de/founding/page.tsx",
  ];

  for (const relativePath of noindexSourceChecks) {
    const source = read(relativePath);
    expect(
      source.includes("index: false") && source.includes("follow: false"),
      `${relativePath} is explicitly noindex`,
    );
  }

  const imageAltViolations = [
    ...scanForMissingImageAlt("app"),
    ...scanForMissingImageAlt("components"),
  ].filter((relativePath) => !relativePath.endsWith(".backup.tsx"));

  expect(
    imageAltViolations.length === 0,
    `marketing TSX files do not contain Image or img tags without alt (${imageAltViolations.length} missing)`,
  );

  if (hasFailure) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
