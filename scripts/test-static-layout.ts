import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Run against `next start` after a production build, or pass the deployed URL.
const baseUrl = process.argv[2] ?? "http://localhost:3100";
const cases: Array<{
  path: string;
  locale: "en" | "de";
  breadcrumb: boolean;
  canonical?: string;
}> = [
  { path: "/", locale: "en", breadcrumb: false },
  { path: "/pricing", locale: "en", breadcrumb: true },
  { path: "/privacy", locale: "en", breadcrumb: true },
  { path: "/de", locale: "de", breadcrumb: false },
  { path: "/de/pricing", locale: "de", breadcrumb: true },
  { path: "/de/privacy", locale: "de", breadcrumb: true },
  { path: "/de/support", locale: "de", breadcrumb: true },
  { path: "/about/company", locale: "en", breadcrumb: true },
  { path: "/c/coach", locale: "en", breadcrumb: false },
  {
    path: "/blog/ai-lesson-planning-guide-2025",
    locale: "en",
    breadcrumb: false,
  },
  { path: "/alternatives", locale: "en", breadcrumb: true },
  {
    path: "/alternatives/chatgpt/report-comments",
    locale: "en",
    breadcrumb: true,
    canonical: "/alternatives",
  },
  {
    path: "/how-to-reply/angry-parent-of-year-6-pupil",
    locale: "en",
    breadcrumb: true,
    canonical: "/how-to-reply",
  },
  {
    path: "/scenario/ks3/behaviour/year-8",
    locale: "en",
    breadcrumb: false,
  },
  {
    path: "/teacher-parent-communication-hub",
    locale: "en",
    breadcrumb: true,
  },
];

function summarize(html: string) {
  return {
    lang: html.match(/<html[^>]*lang="([^"]+)"/)?.[1],
    canonical: html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1],
    bodyClass: html.match(/<body[^>]*class="([^"]+)"/)?.[1],
    schemas: [
      ...html.matchAll(
        /<script[^>]*id="((?:site-|auto-breadcrumb-)[^"]+)"[^>]*>(.*?)<\/script>/gs,
      ),
    ].map((match) => ({ id: match[1], data: JSON.parse(match[2]) })),
    alternates: [
      ...html.matchAll(
        /<link[^>]*rel="alternate"[^>]*hrefLang="([^"]+)"[^>]*href="([^"]+)"/g,
      ),
    ].map((match) => [match[1], match[2]]),
  };
}

async function run() {
  if (new URL(baseUrl).hostname === "localhost") {
    const manifest = JSON.parse(
      readFileSync(".next/prerender-manifest.json", "utf8"),
    );
    for (const path of ["/pricing", "/privacy", "/de/pricing", "/de/privacy"]) {
      assert.ok(manifest.routes[path], `${path}: must be prerendered`);
      assert.notEqual(manifest.routes[path].initialRevalidateSeconds, 0);
    }
    assert.equal(
      manifest.routes["/alternatives"].initialRevalidateSeconds,
      604800,
    );
  }
  const baseline: Array<ReturnType<typeof summarize> & { path: string }> =
    process.argv[3] ? JSON.parse(readFileSync(process.argv[3], "utf8")) : [];

  for (const { path, locale, breadcrumb, canonical } of cases) {
    // An opposite-locale cookie must not affect route-derived HTML or metadata.
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { cookie: `lang=${locale === "de" ? "en" : "de"}` },
    });
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("set-cookie"), null, path);
    const html = await response.text();
    const actual = summarize(html);
    assert.equal(actual.lang, locale, `${path}: server-rendered html lang`);
    assert.equal(
      actual.canonical?.replace(/\/$/, ""),
      `https://www.zazadraft.com${canonical ?? (path === "/" ? "" : path)}`,
      `${path}: canonical`,
    );
    const schema = (id: string) =>
      actual.schemas.find((entry) => entry.id === id)?.data;
    assert.ok(schema("site-organization-schema"), `${path}: organization`);
    assert.equal(
      schema("site-website-schema").inLanguage,
      locale === "de" ? "de-DE" : "en-GB",
    );
    assert.equal(
      schema("site-person-schema").inLanguage,
      locale === "de" ? "de-DE" : "en-GB",
    );
    assert.equal(
      Boolean(schema("auto-breadcrumb-schema")),
      breadcrumb,
      `${path}: breadcrumbs`,
    );
    if (breadcrumb) {
      const items = schema("auto-breadcrumb-schema").itemListElement;
      assert.equal(items[0].name, locale === "de" ? "Startseite" : "Home");
      assert.equal(items.at(-1).item, `https://www.zazadraft.com${path}`);
    }
    const creator = path.startsWith("/c/");
    assert.equal(
      actual.bodyClass,
      creator ? "bg-white text-slate-900" : "bg-slate-950 text-slate-100",
    );
    assert.equal(/<header[\s>]/.test(html), !creator, `${path}: global header`);
    if (creator) {
      assert.match(html, /name="robots" content="noindex, nofollow"/);
      assert.match(
        html,
        /<footer class="border-t border-slate-100 bg-white py-6"/,
      );
      assert.doesNotMatch(
        html,
        /<footer class="border-t border-white\/10 bg-slate-950/,
      );
      assert.doesNotMatch(html, /pt-\[92px\]/);
    }
    const previous = baseline.find((entry) => entry.path === path);
    if (previous) {
      const { lang, canonical, bodyClass, schemas, alternates } = previous;
      assert.deepEqual(
        actual,
        { lang, canonical, bodyClass, schemas, alternates },
        `${path}: production baseline`,
      );
    }
    console.log(
      `PASS ${path}: locale, canonical, schemas, breadcrumbs, chrome`,
    );
  }

  for (const path of ["/pricing", "/de/pricing"]) {
    const response = await fetch(`${baseUrl}${path}`);
    assert.match(
      response.headers.get("set-cookie") ?? "",
      new RegExp(`^lang=${path.startsWith("/de/") ? "de" : "en"};`),
    );
    await response.body?.cancel();
  }
  console.log("Static layout checks passed.");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
