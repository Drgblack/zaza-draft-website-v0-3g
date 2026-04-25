# Zaza Draft - Agent Readiness Report

## Overall Score (0-10)

**7.8/10**

Zaza Draft has a stronger-than-average foundation for SEO, AEO, and early agent discovery: centralized JSON-LD utilities, strong metadata/canonical handling, visible agent-readable summaries, machine-readable public endpoints, `llms.txt`, structured pricing, freshness signals, and a large content footprint. The score is held back by a few important inconsistencies: public agent endpoints are blocked by `robots.txt`, `/start` and `/de/start` are not in the sitemap, schema rendering is still fragmented across multiple components, freshness dates are heavily manual and uniform, and some templates still have semantic issues like nested `<main>` landmarks.

## Strengths

- Central schema utility exists in `lib/seo/schema.ts` and covers the right core types: `Organization`, `WebSite`, `SoftwareApplication`, `WebPage`, `FAQPage`, `HowTo`, `BreadcrumbList`, and `Offer`.
- Page-level JSON-LD is present on key commercial and product-intent pages such as the homepage, `/start`, `/de/start`, pricing, and the Parent Email Risk Checker.
- Visible content now explains the product clearly. Agent-readable summary blocks make it easier to extract what Zaza Draft is, who it is for, how it works, pricing context, and the next step.
- Pricing is significantly more machine-readable than a typical marketing page. Plans visibly expose plan name, audience, included features, monthly and yearly pricing where available, terms, and CTA.
- Public machine-readable endpoints exist at `/api/public/product-info` and `/api/public/site-capabilities`, and they return useful, public-only JSON without exposing write or rewrite actions.
- `llms.txt` and `llms-full.txt` exist, are useful, and point agents to the main product, pricing, free tool, and public API endpoints.
- Technical discovery basics are strong: canonical metadata patterns, Open Graph, root `Organization` and `WebSite` schema, `sitemap.xml`, `sitemap-longtail.xml`, and broad internal linking across hubs, comparisons, guides, and programmatic pages.
- Programmatic and comparison templates are not thin by default. They include internal links, FAQs, examples, how-to steps, and clear product framing.
- Freshness is visible on important pages via `LastUpdated`, and `dateModified` is being added to `WebPage` schema for updated families.
- Category clarity is strong. The repo consistently positions Zaza Draft as a teacher-first, risk-aware communication support tool rather than generic AI writing software.

## Weaknesses

- `robots.txt` disallows `/api/`, which likely blocks the new public agent endpoints from crawler discovery even though `llms.txt` points to them.
- `/start` and `/de/start` appear to be important conversion pages but are not included in `app/sitemap.ts`.
- Schema implementation is still fragmented. There is a central schema utility, but JSON-LD is emitted through multiple wrappers and patterns (`StructuredData`, `JsonLdCollection`, and component-level scripts), which increases drift risk.
- There is still duplicate-schema risk around FAQs because some components emit FAQ JSON-LD directly while pages can also emit page-level FAQ schema.
- Freshness is mostly driven by central manual config, and many page families currently share the same review date. That is workable, but it is only as credible as the editorial discipline behind it.
- Some templates still render nested `<main>` landmarks under the root layout, which weakens semantics and accessibility quality.
- Public machine-readable endpoints are helpful but still thin. They are not versioned, do not expose a richer capability model, and do not yet describe content inventory beyond a small set of public facts.
- Sitemap freshness is mixed. Some entries use explicit reviewed dates, but many major groups still use build-time `now`, which is noisy and less trustworthy than content-linked freshness.

## Critical Gaps (Top 5)

- **Unblock public agent endpoints from crawl policy.** `robots.txt` currently disallows `/api/`, which undercuts `/api/public/product-info` and `/api/public/site-capabilities`.
- **Add `/start` and `/de/start` to the sitemap.** These are key product-intent pages and should be discoverable as first-class landing pages.
- **Consolidate schema output paths.** Keep one rendering path for JSON-LD to reduce duplicate FAQ/schema emissions and maintenance drift.
- **Tighten freshness governance.** Shared family-wide dates are better than nothing, but they need a reliable review workflow or they risk becoming decorative rather than trustworthy.
- **Fix nested landmark structure.** Several templates still render a child `<main>` inside the root layout’s `<main>`, which is a semantic/accessibility regression.

## Quick Wins (Can be done in <1 day)

- Remove or narrow the `/api/` disallow rule in `robots.txt` so the public `/api/public/*` endpoints are discoverable.
- Add `/start` and `/de/start` to `app/sitemap.ts`.
- Add a short version field or schema version field to both public JSON endpoints.
- Standardize FAQ schema emission so only one layer is responsible on any given page.
- Replace nested child `<main>` elements in shared templates with `<div>` or `<section>`.
- Add a short machine-readable note in the public endpoints clarifying that `/pricing` is the live source of truth for exact checkout availability.

## Strategic Improvements (High impact)

- Create a single agent-facing contract layer for public discovery: `llms.txt`, public endpoints, schema, and key summary blocks should all derive from the same canonical product facts.
- Expand public capability metadata so agents can understand the difference between the free checker, the product app, and broader product surfaces without scraping multiple pages.
- Add a formal editorial review workflow for freshness so `Last updated`, `dateModified`, and sitemap `lastmod` are all backed by actual page review state rather than broad family resets.
- Continue deepening category pages, comparisons, and teacher workflow guides around the owned category: risk-aware parent communication AI for teachers.
- Add stronger structured content around plan eligibility, team buying paths, and limits so pricing extraction does not rely on interpretation.

## Risks / Warnings

- Public agent endpoints are currently useful but partially self-defeating because crawl policy appears to hide all `/api/` routes.
- Manual freshness dates across broad page families can become misleading if the team does not actually review those families on the recorded date.
- Fragmented schema rendering raises the chance of duplicate FAQ or page schema as more templates are added.
- The repo is strong on owned-site signals, but this report does not assume backlinks, reviews, or off-site authority. External authority should not be inferred from internal implementation quality.
- Comparison and category content is generally fair in tone, but it should continue avoiding unsupported claims against generic AI tools or named competitors.
