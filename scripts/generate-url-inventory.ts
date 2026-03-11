import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { getSitemapSourceGroups } from "../app/sitemap";

type InventoryRow = {
  url: string;
  path: string;
  sitemap_source: string;
  all_sitemap_sources: string[];
  source_count: number;
  route_type: string;
  route_family: string;
  language: string;
  is_localised_variant: "yes" | "no";
  content_bucket: string;
  likely_indexable: "yes" | "no" | "review";
  canonical_risk: "low" | "medium" | "high";
  canonical_cluster: string;
  notes: string;
};

type CountRecord = Record<string, number>;

const BASE_URL = "https://zazadraft.com";

const conversionPaths = new Set([
  "/pricing",
  "/early-access",
  "/roi-calculator",
  "/diagnosis",
  "/communication-diagnosis",
  "/how-to-reply-to-an-angry-parent-email",
  "/reduce-stress-parent-messages",
  "/how-to-reply-angry-parent",
  "/parent-ignores-email-help",
  "/report-writing-stress-help",
  "/behaviour-email-diagnosis",
  "/slt-documentation-help",
  "/best-ai-tool-parent-emails",
  "/best-ai-writing-tools-for-teachers-2025",
  "/ai-for-student-reports",
]);

const supportLegalPaths = new Set([
  "/privacy",
  "/terms",
  "/impressum",
  "/support",
  "/contact",
  "/faq",
  "/manifesto",
  "/ambassadors",
]);

const editorialPrefixes = [
  "/blog",
  "/resources",
  "/free-resources",
  "/learning-centre",
  "/videos",
  "/webinars",
  "/success-stories",
  "/teacher-stories",
  "/ai-literacy",
  "/state-of-ai-education",
];

const programmaticPrefixes = [
  "/how-to/",
  "/scenario/",
  "/report-comments/",
  "/reply/",
  "/problems/",
  "/alternatives/",
  "/expanded/",
];

function normalisePathname(url: string) {
  const pathname = new URL(url).pathname;
  return pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
}

function removeLanguagePrefix(pathname: string) {
  if (pathname === "/de") {
    return "/";
  }

  return pathname.replace(/^\/de(?=\/|$)/, "") || "/";
}

function removeRegionalPrefix(pathname: string) {
  if (pathname === "/uk" || pathname === "/england") {
    return "/";
  }

  return pathname.replace(/^\/(uk|england)(?=\/|$)/, "") || "/";
}

function increment(record: CountRecord, key: string) {
  record[key] = (record[key] ?? 0) + 1;
}

function sortCounts(record: CountRecord) {
  return Object.entries(record).sort((left, right) => right[1] - left[1]);
}

function escapeCsv(value: unknown) {
  const stringValue =
    typeof value === "string" ? value : JSON.stringify(value ?? "");

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function getLanguage(pathname: string) {
  return pathname === "/de" || pathname.startsWith("/de/") ? "de" : "en";
}

function getRouteFamily(pathname: string, source: string) {
  if (pathname === "/" || pathname === "/de") {
    return "homepage";
  }

  if (
    pathname === "/how-to-reply" ||
    pathname === "/reply-scenarios" ||
    pathname === "/parent-email-scenarios" ||
    pathname === "/parent-communication-problems" ||
    pathname === "/report-comments" ||
    pathname === "/report-comment-builder" ||
    pathname === "/scenario-builder" ||
    pathname === "/scenario-combinations" ||
    pathname === "/uk-school-communication" ||
    pathname === "/how-to"
  ) {
    return "programmatic_hub_page";
  }

  if (pathname.startsWith("/blog/")) {
    return "blog_post";
  }

  if (pathname.startsWith("/how-to/")) {
    return "how_to_keyword_page";
  }

  if (pathname.startsWith("/scenario/")) {
    return "scenario_matrix_page";
  }

  if (pathname.startsWith("/report-comments/")) {
    return "report_comment_matrix_page";
  }

  if (pathname.startsWith("/reply/")) {
    return "reply_programmatic_page";
  }

  if (pathname.startsWith("/problems/")) {
    return "problem_programmatic_page";
  }

  if (pathname.startsWith("/alternatives/")) {
    return "comparison_page";
  }

  if (pathname.startsWith("/expanded/")) {
    return "expanded_long_tail_page";
  }

  if (pathname.startsWith("/uk/")) {
    return "uk_regional_page";
  }

  if (pathname.startsWith("/england/")) {
    return "england_regional_page";
  }

  if (
    pathname.startsWith("/products/") ||
    pathname.startsWith("/de/products/")
  ) {
    return "product_page";
  }

  if (
    pathname === "/suite" ||
    pathname === "/de/suite" ||
    pathname === "/pricing" ||
    pathname === "/de/pricing" ||
    pathname === "/early-access" ||
    pathname === "/de/early-access"
  ) {
    return "conversion_page";
  }

  if (source === "teacher_writing_entries") {
    return "teacher_writing_page";
  }

  if (source === "topical_cluster_entries") {
    return "topical_cluster_page";
  }

  if (source === "generated_page_entries") {
    return "generated_markdown_page";
  }

  if (source === "blog_entries") {
    return "blog_post";
  }

  if (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/impressum" ||
    pathname === "/contact" ||
    pathname === "/support" ||
    pathname === "/faq" ||
    pathname === "/manifesto" ||
    pathname === "/ambassadors" ||
    pathname === "/de/privacy" ||
    pathname === "/de/terms" ||
    pathname === "/de/impressum" ||
    pathname === "/de/contact" ||
    pathname === "/de/support" ||
    pathname === "/de/faq" ||
    pathname === "/de/manifesto" ||
    pathname === "/de/ambassadors"
  ) {
    return "support_legal_page";
  }

  if (pathname.startsWith("/de/")) {
    return "localised_static_page";
  }

  return "static_page";
}

function getContentBucket(pathname: string, source: string) {
  const basePath = removeLanguagePrefix(pathname);

  if (basePath.startsWith("/products/") || basePath === "/suite") {
    return "product_pages";
  }

  if (
    conversionPaths.has(basePath) ||
    pathname === "/pricing" ||
    pathname === "/de/pricing"
  ) {
    return "pricing_conversion_pages";
  }

  if (supportLegalPaths.has(basePath)) {
    return "utility_support_legal_pages";
  }

  if (
    editorialPrefixes.some(
      (prefix) => basePath === prefix || basePath.startsWith(`${prefix}/`),
    ) ||
    source === "blog_entries"
  ) {
    return "learning_editorial_pages";
  }

  if (
    source.endsWith("_entries") &&
    [
      "teacher_writing_entries",
      "topical_cluster_entries",
      "uk_regional_entries",
      "england_regional_entries",
      "uk_cluster_entries",
      "expanded_page_entries",
      "comparison_entries",
      "matrix_entries",
      "programmatic_entries",
      "generated_page_entries",
      "how_to_keyword_entries",
    ].includes(source)
  ) {
    return "programmatic_seo_pages";
  }

  if (
    basePath === "/how-to-reply" ||
    basePath === "/reply-scenarios" ||
    basePath === "/parent-email-scenarios" ||
    basePath === "/parent-communication-problems" ||
    basePath === "/report-comments" ||
    basePath === "/report-comment-builder" ||
    basePath === "/scenario-builder" ||
    basePath === "/scenario-combinations" ||
    basePath === "/uk-school-communication" ||
    basePath === "/how-to" ||
    programmaticPrefixes.some((prefix) => basePath.startsWith(prefix))
  ) {
    return "programmatic_seo_pages";
  }

  return "core_commercial_pages";
}

function getCanonicalCluster(pathname: string, source: string) {
  if (source === "teacher_writing_entries") {
    return "teacher_writing_cluster";
  }

  if (source === "topical_cluster_entries") {
    return "topical_cluster";
  }

  if (source === "generated_page_entries") {
    return "generated_markdown_pages";
  }

  if (source === "how_to_keyword_entries") {
    return "how_to_keywords";
  }

  if (source === "uk_cluster_entries") {
    return "uk_cluster_pages";
  }

  if (source === "uk_regional_entries") {
    return "uk_regional_pages";
  }

  if (source === "england_regional_entries") {
    return "england_regional_pages";
  }

  const basePath = removeRegionalPrefix(removeLanguagePrefix(pathname));

  if (basePath === "/") {
    return "root";
  }

  if (basePath.startsWith("/blog/")) {
    return "blog";
  }

  if (basePath.startsWith("/how-to/")) {
    return "how_to_keywords";
  }

  if (basePath.startsWith("/scenario/")) {
    return "scenario_matrix";
  }

  if (basePath.startsWith("/report-comments/")) {
    return "report_comment_matrix";
  }

  if (basePath.startsWith("/reply/")) {
    return "reply_programmatic";
  }

  if (basePath.startsWith("/problems/")) {
    return "problem_programmatic";
  }

  if (basePath.startsWith("/alternatives/")) {
    return "comparison_matrix";
  }

  if (basePath.startsWith("/expanded/")) {
    return "expanded_pages";
  }

  if (basePath.startsWith("/products/")) {
    return "products";
  }

  if (basePath.startsWith("/resources")) {
    return "resources";
  }

  return basePath.replace(/^\//, "").split("/")[0] ?? "misc";
}

function getLikelyIndexable(
  pathname: string,
  contentBucket: string,
  source: string,
): "yes" | "no" | "review" {
  if (contentBucket !== "programmatic_seo_pages") {
    return "yes";
  }

  if (
    source === "matrix_entries" ||
    source === "expanded_page_entries" ||
    source === "how_to_keyword_entries" ||
    source === "generated_page_entries"
  ) {
    return "review";
  }

  if (
    pathname.startsWith("/alternatives/") ||
    pathname.startsWith("/reply/") ||
    pathname.startsWith("/problems/")
  ) {
    return "review";
  }

  return "yes";
}

function getCanonicalRisk(
  pathname: string,
  source: string,
): "low" | "medium" | "high" {
  if (
    source === "matrix_entries" ||
    source === "expanded_page_entries" ||
    source === "how_to_keyword_entries" ||
    source === "generated_page_entries"
  ) {
    return "high";
  }

  if (
    source === "comparison_entries" ||
    source === "programmatic_entries" ||
    source === "teacher_writing_entries" ||
    source === "topical_cluster_entries" ||
    source === "uk_cluster_entries" ||
    source === "uk_regional_entries" ||
    source === "england_regional_entries" ||
    pathname.startsWith("/alternatives/") ||
    pathname.startsWith("/reply/") ||
    pathname.startsWith("/problems/")
  ) {
    return "medium";
  }

  return "low";
}

function getNotes(
  pathname: string,
  source: string,
  routeFamily: string,
  contentBucket: string,
  sourceCount: number,
) {
  const notes: string[] = [];
  const basePath = removeLanguagePrefix(pathname);

  if (sourceCount > 1) {
    notes.push(
      `Exact URL emitted by ${sourceCount} sitemap groups before dedupe.`,
    );
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    notes.push("German localised variant of an English route family.");
  }

  if (pathname.startsWith("/uk/") || pathname.startsWith("/england/")) {
    notes.push(
      "Regional English variant intended for UK-specific search demand.",
    );
  }

  if (contentBucket === "programmatic_seo_pages") {
    if (source === "matrix_entries") {
      notes.push(
        "Large matrix family. Review uniqueness, internal linking, and canonical strategy.",
      );
    } else if (source === "expanded_page_entries") {
      notes.push(
        "Expanded long-tail page. Review for overlap with adjacent templates and hubs.",
      );
    } else if (source === "how_to_keyword_entries") {
      notes.push(
        "Keyword-led how-to page. Review search demand, uniqueness, and consolidation opportunities.",
      );
    } else if (source === "generated_page_entries") {
      notes.push(
        "Markdown-generated SEO page. Review editorial quality and duplication against programmatic families.",
      );
    } else if (
      pathname.startsWith("/reply/") ||
      pathname.startsWith("/problems/") ||
      pathname.startsWith("/alternatives/")
    ) {
      notes.push(
        "Template-led commercial SEO page. Review canonical targets and thin-page risk.",
      );
    } else {
      notes.push(
        "Programmatic or cluster page. Confirm distinct intent before scaling further.",
      );
    }
  }

  if (supportLegalPaths.has(basePath)) {
    notes.push(
      "Utility or compliance page. Useful to index, but not a traffic-growth driver.",
    );
  }

  if (conversionPaths.has(basePath)) {
    notes.push("High-intent conversion or problem-solution landing page.");
  }

  if (routeFamily === "blog_post") {
    notes.push("Editorial article sourced from content/blog.");
  }

  return notes.join(" ");
}

async function main() {
  const sourceGroups = await getSitemapSourceGroups();
  const urlMap = new Map<
    string,
    {
      entry: { url: string };
      sources: Set<string>;
    }
  >();

  for (const group of sourceGroups) {
    for (const entry of group.entries) {
      const existing = urlMap.get(entry.url);

      if (existing) {
        existing.sources.add(group.source);
        continue;
      }

      urlMap.set(entry.url, {
        entry: { url: entry.url },
        sources: new Set([group.source]),
      });
    }
  }

  const inventory: InventoryRow[] = Array.from(urlMap.values())
    .map(({ entry, sources }) => {
      const pathname = normalisePathname(entry.url);
      const sitemapSources = Array.from(sources).sort();
      const primarySource = sitemapSources[0] ?? "unknown";
      const routeFamily = getRouteFamily(pathname, primarySource);
      const contentBucket = getContentBucket(pathname, primarySource);
      const isLocalisedVariant: InventoryRow["is_localised_variant"] =
        pathname === "/de" || pathname.startsWith("/de/") ? "yes" : "no";

      return {
        url: entry.url,
        path: pathname,
        sitemap_source: primarySource,
        all_sitemap_sources: sitemapSources,
        source_count: sitemapSources.length,
        route_type: routeFamily.includes("page")
          ? routeFamily
          : getRouteFamily(pathname, primarySource),
        route_family: routeFamily,
        language: getLanguage(pathname),
        is_localised_variant: isLocalisedVariant,
        content_bucket: contentBucket,
        likely_indexable: getLikelyIndexable(
          pathname,
          contentBucket,
          primarySource,
        ),
        canonical_risk: getCanonicalRisk(pathname, primarySource),
        canonical_cluster: getCanonicalCluster(pathname, primarySource),
        notes: getNotes(
          pathname,
          primarySource,
          routeFamily,
          contentBucket,
          sitemapSources.length,
        ),
      };
    })
    .sort((left, right) => left.url.localeCompare(right.url));

  const bucketCounts: CountRecord = {};
  const languageCounts: CountRecord = {};
  const routeTypeCounts: CountRecord = {};
  const sourceCounts: CountRecord = {};
  const canonicalRiskCounts: CountRecord = {};
  const indexableCounts: CountRecord = {};
  const clusterCounts: CountRecord = {};
  const multiSourceRows = inventory.filter((row) => row.source_count > 1);
  const reviewRows = inventory.filter(
    (row) => row.likely_indexable === "review",
  );
  const highRiskRows = inventory.filter((row) => row.canonical_risk === "high");
  const germanRows = inventory.filter((row) => row.language === "de");
  const regionalRows = inventory.filter(
    (row) => row.path.startsWith("/uk/") || row.path.startsWith("/england/"),
  );

  for (const row of inventory) {
    increment(bucketCounts, row.content_bucket);
    increment(languageCounts, row.language);
    increment(routeTypeCounts, row.route_type);
    increment(sourceCounts, row.sitemap_source);
    increment(canonicalRiskCounts, row.canonical_risk);
    increment(indexableCounts, row.likely_indexable);
    increment(clusterCounts, row.canonical_cluster);
  }

  const highRiskClusterCounts: CountRecord = {};

  for (const row of highRiskRows) {
    increment(highRiskClusterCounts, row.canonical_cluster);
  }

  const highRiskClusters = sortCounts(highRiskClusterCounts).slice(0, 8);

  const outputDir = path.join(process.cwd(), "docs", "seo");
  mkdirSync(outputDir, { recursive: true });

  writeFileSync(
    path.join(outputDir, "url-inventory.json"),
    `${JSON.stringify(inventory, null, 2)}\n`,
    "utf8",
  );

  const csvHeaders = [
    "url",
    "path",
    "sitemap_source",
    "all_sitemap_sources",
    "source_count",
    "route_type",
    "route_family",
    "language",
    "is_localised_variant",
    "content_bucket",
    "likely_indexable",
    "canonical_risk",
    "canonical_cluster",
    "notes",
  ];
  const csvRows = [
    csvHeaders.join(","),
    ...inventory.map((row) =>
      csvHeaders
        .map((header) =>
          escapeCsv(
            header === "all_sitemap_sources"
              ? row.all_sitemap_sources.join("|")
              : row[header as keyof InventoryRow],
          ),
        )
        .join(","),
    ),
  ];

  writeFileSync(
    path.join(outputDir, "url-inventory.csv"),
    `${csvRows.join("\n")}\n`,
    "utf8",
  );

  const summary = [
    "# URL Inventory Summary",
    "",
    "## Snapshot",
    "",
    `- Total unique sitemap URLs: ${inventory.length}`,
    `- Base sitemap endpoint audited: ${BASE_URL}/sitemap.xml`,
    `- Distinct sitemap source groups: ${sourceGroups.length}`,
    `- URLs emitted by more than one source group before dedupe: ${multiSourceRows.length}`,
    `- German localised URLs: ${germanRows.length}`,
    `- UK or England regional URLs: ${regionalRows.length}`,
    "",
    "## Counts By Bucket",
    "",
    ...sortCounts(bucketCounts).map(
      ([bucket, count]) => `- ${bucket}: ${count}`,
    ),
    "",
    "## Counts By Language",
    "",
    ...sortCounts(languageCounts).map(
      ([language, count]) => `- ${language}: ${count}`,
    ),
    "",
    "## Counts By Route Type",
    "",
    ...sortCounts(routeTypeCounts).map(
      ([routeType, count]) => `- ${routeType}: ${count}`,
    ),
    "",
    "## Counts By Canonical Risk",
    "",
    ...sortCounts(canonicalRiskCounts).map(
      ([risk, count]) => `- ${risk}: ${count}`,
    ),
    "",
    "## Counts By Likely Indexability",
    "",
    ...sortCounts(indexableCounts).map(
      ([status, count]) => `- ${status}: ${count}`,
    ),
    "",
    "## Largest Sitemap Sources",
    "",
    ...sortCounts(sourceCounts)
      .slice(0, 12)
      .map(([source, count]) => `- ${source}: ${count}`),
    "",
    "## Obvious Duplication Patterns",
    "",
    `- German localised variants create a mirrored EN/DE route layer across ${germanRows.length} URLs. That is usually valid, but it increases crawl demand and needs consistent canonicals plus hreflang handling.`,
    `- The largest high-risk canonical clusters are ${highRiskClusters
      .map(([cluster, count]) => `${cluster} (${count})`)
      .join(", ")}.`,
    `- Programmatic route families dominate the review set. ${reviewRows.length} URLs are marked for indexability review, mostly from matrix, expanded, generated, comparison, reply, problem, and how-to keyword families.`,
    multiSourceRows.length
      ? `- ${multiSourceRows.length} exact URLs are emitted by more than one sitemap source group before final dedupe. Review source overlap to keep ownership clear.`
      : "- No exact multi-source overlaps were found before final sitemap dedupe.",
    "",
    "## Likely Areas Of Crawl Waste",
    "",
    `- Matrix pages: ${inventory.filter((row) => row.sitemap_source === "matrix_entries").length} URLs across scenario and report-comment combinations. This is the biggest index-bloat candidate because many pages share a tight template and adjacent intent.`,
    `- Expanded and generated long-tail pages: ${inventory.filter((row) => row.sitemap_source === "expanded_page_entries").length + inventory.filter((row) => row.sitemap_source === "generated_page_entries").length} URLs. These are likely to overlap with hubs, teacher-writing pages, and keyword-led pages unless uniqueness is tightly controlled.`,
    `- How-to, reply, problem, and alternative permutations: ${inventory.filter((row) => ["how_to_keyword_entries", "programmatic_entries", "comparison_entries"].includes(row.sitemap_source)).length} URLs. These often target similar commercial-intent queries with small angle changes, so canonicalisation and consolidation should be reviewed.`,
    "",
    "## Recommended Next Actions",
    "",
    "- Split Search Console reporting by route family so matrix, generated, comparison, and editorial performance can be compared directly.",
    "- Review the highest-risk clusters first for thin copy, internal-link weakness, and overlapping search intent before adding more programmatic pages.",
    "- Confirm hreflang, self-canonical, and canonical-to-parent rules for EN/DE mirrors and regional UK/England variants.",
    "- Consider excluding weak long-tail families from the sitemap until they have proven demand, uniqueness, and internal-link support.",
    "",
    "## Notes On Method",
    "",
    "- Inventory generated from the live sitemap emitter in `app/sitemap.ts`, not from `app/page.tsx` counts.",
    "- Classification is deterministic from sitemap source group first, then URL pattern, with uncertain large-scale SEO families marked as `review` instead of guessed as safe.",
  ].join("\n");

  writeFileSync(
    path.join(outputDir, "url-inventory-summary.md"),
    `${summary}\n`,
    "utf8",
  );

  console.log(`inventory=${inventory.length}`);
  console.log(`review=${reviewRows.length}`);
  console.log(`high_risk=${highRiskRows.length}`);
}

void main();
