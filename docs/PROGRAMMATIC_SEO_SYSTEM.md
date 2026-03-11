# Programmatic SEO System

## Overview

This system gives Zaza Draft a scalable App Router foundation for high-intent teacher searches without drifting into thin or generic SEO pages. The copy model stays teacher-first, UK-English, emotionally calm, and conversion-aware.

The public route families are:

- `/parent-communication-problems`
- `/reply-scenarios`
- `/report-comment-builder`
- `/uk-school-communication`
- `/alternatives`
- `/scenario-combinations`
- `/problems/[phase]/[issue]`
- `/reply/[trigger]/[context]`
- `/report-comments/[student-type]/[subject]/[group]`
- `/alternatives/[tool]/[usecase]`

## Key implementation files

- `components/ProgrammaticTemplate.tsx`
  Shared template component for programmatic pages
- `components/ProgrammaticPage.tsx`
  Current concrete renderer used by the shared template wrapper
- `lib/programmatic.ts`
  Public helper layer for metadata, matrix data, sitemap generation, route seeds, and keyword lists
- `lib/programmatic-seo.ts`
  Lower-level content engine retained for compatibility and content generation
- `app/api/revalidate-programmatic/route.ts`
  On-demand revalidation endpoint
- `app/sitemap.ts`
  Main sitemap integration point

## Route architecture note

The requested fallback route `app/[category]/[slug]/page.tsx` cannot coexist with the repo's existing `app/[slug]/page.tsx` because Next.js treats sibling root dynamic segments with different names as a conflict.

Build-safe equivalent used here:

- `app/[slug]/[...segments]/page.tsx`

That keeps future expansion possible for paths such as `/platform-variations/primary-school/parent-email-template`.

## Dynamic route files in use

- `app/problems/[phase]/[issue]/page.tsx`
- `app/reply/[trigger]/[context]/page.tsx`
- `app/report-comments/[studentType]/[subject]/[yearGroup]/page.tsx`
- `app/alternatives/[competitor]/[useCase]/page.tsx`

Public hub pages added:

- `app/parent-communication-problems/page.tsx`
- `app/reply-scenarios/page.tsx`
- `app/report-comment-builder/page.tsx`
- `app/uk-school-communication/page.tsx`
- `app/scenario-combinations/page.tsx`

## Content matrix

Launch family model exported by `getContentMatrix()` in `lib/programmatic.ts`:

- Problem + phase variations: `8 phases x 12 issues = 96 pages`
- Reply scenarios: `8 triggers x 8 contexts = 64 pages`
- Student context report comments: `12 student types x 9 subjects x 7 groups = 756 pages`
- Comparison pages: `4 tools x 4 use cases = 16 pages`
- UK-specific templates and scenario combinations: `12 standalone pages + expandable future categories`

This comfortably supports a first 500+ pages and scales to 2,000+ once stronger combinations prove demand.

## Metadata and structured data

Every resolved programmatic page includes:

- front-loaded title
- front-loaded meta description
- H1 aligned with teacher pain and query intent
- `Article` JSON-LD
- `HowTo` JSON-LD
- `FAQPage` JSON-LD
- `BreadcrumbList` JSON-LD

The rendering is handled through `components/ProgrammaticTemplate.tsx`, which passes structured page data into the existing template renderer.

## Sitemap integration

`app/sitemap.ts` now imports `getProgrammaticSitemapEntries()` from `lib/programmatic.ts`.

That helper includes:

- the new public hub pages
- seed `problems` pages
- seed `reply` pages
- existing report-comment and alternative routes
- standalone single-slug programmatic pages

## Revalidation strategy

Programmatic pages now use:

- `revalidate = 604800`
- weekly ISR across hubs, dynamic route families, and single-slug programmatic pages
- on-demand refresh via `POST /api/revalidate-programmatic?secret=...`

Default revalidation payload:

- new public hubs
- new `problems` seeds
- new `reply` seeds
- legacy seed paths still supported by the content engine

## Roadmap

### Month 1

- Launch hubs plus the safest 200 pages
- Prioritise behaviour, angry-parent, SEN, homework, attendance, and Year 6 / KS2 pressure points
- Publish the strongest report-comment combinations for SEN, EAL, low confidence, behaviour, and disorganisation

### Month 3

- Expand to 800+ pages
- Add deeper subject and year-group coverage where search-console data and trial-start data justify it
- Promote top performers into stronger editorial companion pages

### Month 6

- Scale to 2,000+ pages
- Extend future categories and UK-specific variations only where uniqueness and conversion quality stay high
- Refresh weak or duplicative pages before adding more volume

## Supporting docs

- `docs/PROGRAMMATIC_SEO_GUARDRAILS.md`
- `docs/PROGRAMMATIC_QUALITY_CHECKLIST.md`
- `docs/PROGRAMMATIC_KEYWORDS_FIRST_150.md`
