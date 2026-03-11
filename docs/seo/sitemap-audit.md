# Sitemap Audit

## Scope

This audit reviews the live sitemap strategy in the Zaza Draft codebase, with emphasis on discovery quality rather than simple coverage. The current public sitemap contains `2,138` unique URLs.

## Sitemap Files And Routes Found

Reviewed files:

- `app/sitemap.ts`
- `app/robots.txt`
- `lib/generated-pages.ts`
- `lib/programmatic.ts`
- `lib/programmatic-seo.ts`
- `lib/matrix.ts`
- `lib/comparison-matrix.ts`
- `lib/uk-matrix.ts`
- `lib/expanded-pages.ts`
- `lib/seo/teacher-writing-pages.ts`
- `lib/seo/teacher-safe-ai-cluster.ts`
- `lib/seo/regional-writing-pages.ts`
- `scripts/generate-pages.ts`

Live sitemap topology:

- Live sitemap endpoint: `/sitemap.xml` via `app/sitemap.ts`
- Sitemap index: none
- Child sitemap routes: none
- Robots reference: `https://zazadraft.com/sitemap.xml`

Important distinction:

- The code now exposes 20 internal sitemap source groups through `getSitemapSourceGroups()`.
- These are not child sitemap files. They are internal groupings that are flattened into one final sitemap.

## Total URL Counts By Sitemap Source

Current raw source-group counts before final dedupe:

| Source group                | Count |
| --------------------------- | ----: |
| `programmatic_entries`      |   932 |
| `matrix_entries`            |   511 |
| `expanded_page_entries`     |   436 |
| `blog_entries`              |    42 |
| `locale_and_legal_entries`  |    41 |
| `teacher_writing_entries`   |    40 |
| `comparison_entries`        |    36 |
| `uk_cluster_entries`        |    31 |
| `core_marketing_entries`    |    13 |
| `content_hub_entries`       |    13 |
| `programmatic_hub_entries`  |    10 |
| `topical_cluster_entries`   |    10 |
| `campaign_and_tool_entries` |     9 |
| `pain_entries`              |     9 |
| `uk_regional_entries`       |     8 |
| `generated_page_entries`    |     7 |
| `product_entries`           |     4 |
| `primary_entries`           |     3 |
| `how_to_keyword_entries`    |     2 |
| `england_regional_entries`  |     1 |

Totals:

- Raw URLs emitted across source groups: `2,158`
- Exact duplicate URLs across source groups before final dedupe: `20`
- Final unique URLs in sitemap: `2,138`

## Inclusion Logic Summary

### What the current sitemap does well

- Captures the main commercial and product pages.
- Includes the major programmatic page families.
- Includes English blog posts with file-based `lastModified`.
- Includes most German top-level commercial pages.

### How inclusion currently works

- Core marketing, product, legal, conversion, and hub URLs are manually enumerated inside `app/sitemap.ts`.
- English blog posts are discovered from `content/blog`.
- Generated markdown pages and expanded pages use file system discovery and file mtime.
- Programmatic families are pulled from helper modules and mostly default to `new Date()` for `lastModified`.

### Where inclusion is too broad

- Programmatic families are included wholesale, even when they represent matrix combinations or long-tail variants that have not clearly earned sitemap inclusion.
- Redirect routes are emitted as if they were canonical destination pages.
- The sitemap reflects mechanical URL capability more than strategic organic inventory.

## Language-Specific Sitemap Pattern Review

Current pattern:

- English is the default language and dominates the sitemap.
- German is handled by manually listed top-level routes in `locale_and_legal_entries`.
- There is no dedicated German content sitemap or German blog sitemap.

Key issue:

- German blog detail pages are public and canonical but are not included in the sitemap.
- Current German coverage is therefore inconsistent: top-level DE pages are present, but DE editorial detail pages are omitted.

Observed counts:

- German URLs currently in the sitemap: `38`
- Public German blog posts available: `43`

## Programmatic Page Sitemap Pattern Review

The sitemap currently includes these large scalable families:

- `programmatic_entries`: `932`
- `matrix_entries`: `511`
- `expanded_page_entries`: `436`
- `teacher_writing_entries`: `40`
- `comparison_entries`: `36`
- `uk_cluster_entries`: `31`
- `topical_cluster_entries`: `10`
- `generated_page_entries`: `7`
- `how_to_keyword_entries`: `2`

Strategic concern:

- The biggest families are the least selective families.
- The sitemap is acting as a full export of long-tail capability, not as a quality-filtered discovery document.

## Suspicious Inclusion Patterns

### 1. Redirect and non-canonical URLs are being emitted

These URLs are in the sitemap even though the route immediately redirects:

- `/learning-centre`
- `/behaviour-email-diagnosis`
- `/communication-diagnosis`
- `/how-to-reply-angry-parent`
- `/parent-ignores-email-help`
- `/report-writing-stress-help`
- `/slt-documentation-help`
- `/de/ambassadors`
- `/de/best-ai-writing-tools-for-teachers-2025`
- `/de/state-of-ai-education`

Assessment:

- These are not good sitemap candidates.
- They are not the canonical destination URLs.
- They create avoidable crawl waste and muddy indexation signals.

### 2. Large long-tail families are being included without a quality threshold

Most concerning families:

- `/expanded/[slug]/[variant]`: `436`
- `/report-comments/[student-type]/[subject]/[phase]`: `1,060`
- `/scenario/[phase]/[issue]` and `/scenario/[phase]/[issue]/[year-group]`: `315` combined in the inventory review
- `/alternatives/[competitor]/[useCase]`: `36`

Assessment:

- These families may contain genuine winners.
- As sitemap policy, they are still too broad because they are being included by default rather than by proven value.

### 3. Sitemap coverage is shallow for some richer detail pages

Important public detail families missing from the sitemap:

- German blog detail pages: `43`
- English compare detail pages: `3`
- German compare detail pages: `3`
- Success-story detail pages: `5`

Assessment:

- These are stronger sitemap candidates than many long-tail permutations currently included.
- This is the clearest sign that sitemap strategy is not prioritising the highest-value URLs first.

### 4. Support and legal pages are included, which is acceptable, but their prominence is higher than some stronger editorial and proof pages

Assessment:

- These pages are fine to keep crawlable and indexed.
- They do not need to compete for sitemap attention with stronger commercial, proof, and editorial URLs.

## Missing Strategic URLs

High-confidence missing candidates:

- `/de/blog/[slug]` detail pages
- `/compare/[slug]` detail pages
- `/de/compare/[slug]` detail pages
- `/success-stories/[slug]` detail pages

Secondary candidates to review before adding:

- `/resources/[slug]` detail pages
- `/webinars/[slug]` detail pages
- `/videos/[id]` detail pages

Reason for caution on the secondary group:

- Some of these pages are thin, placeholder-like, or operational rather than strong search assets.
- They should be added only if they are meant to rank and have stable canonical content.

## Duplicate Inclusion Issues

There are `20` exact URL overlaps across internal source groups before final dedupe.

Observed overlaps:

- `/alternatives`
- `/alternatives/chatgpt/parent-emails`
- `/alternatives/chatgpt/report-comments`
- `/alternatives/generic-ai/parent-emails`
- `/alternatives/generic-ai/report-comments`
- `/alternatives/magicschool-ai/parent-emails`
- `/alternatives/magicschool-ai/report-comments`
- `/alternatives/teachmate/parent-emails`
- `/alternatives/teachmate/report-comments`
- `/how-to-reply`
- `/how-to-reply-to-an-angry-parent-email`
- `/parent-communication-problems`
- `/parent-email-scenarios`
- `/reply-scenarios`
- `/report-comment-builder`
- `/report-comments`
- `/scenario-builder`
- `/scenario-combinations`
- `/teacher-parent-communication-hub`
- `/uk-school-communication`

Assessment:

- The final sitemap dedupes these correctly.
- The overlap still indicates unclear ownership between source groups and makes policy harder to reason about.

## Lastmod Review

Current state:

- English blog posts use file mtimes.
- Expanded pages use file mtimes.
- Generated markdown pages use file mtimes.
- Most other sitemap URLs use `new Date()` at generation time.

Approximate split:

- URLs with content-derived `lastModified`: about `485`
- URLs with synthetic build-time `lastModified`: about `1,653`

Assessment:

- Current `lastModified` is materially overstating freshness for most of the sitemap.
- This is especially weak for core marketing pages, product pages, and large programmatic families that do not actually change on every build.

## Non-Canonical URL Review

Good news:

- No query-string URLs are emitted directly.
- Legacy `/legal/privacy` style routes are not emitted; the cleaner canonical routes are.

Main issue:

- Redirect routes are emitted, which means non-canonical URL forms are still present in the sitemap.

## Recommended Sitemap Strategy Improvements

### 1. Introduce a sitemap index

Recommended structure:

- `/sitemap.xml` as index
- `/sitemaps/core.xml`
- `/sitemaps/products.xml`
- `/sitemaps/conversion.xml`
- `/sitemaps/editorial-en.xml`
- `/sitemaps/editorial-de.xml`
- `/sitemaps/proof-and-comparisons.xml`
- `/sitemaps/programmatic-hubs.xml`
- `/sitemaps/programmatic-qualified.xml`

Reason:

- This makes ownership explicit.
- It prevents the one-file sitemap from becoming an undifferentiated dump.
- It allows policy changes by section without rewriting the whole sitemap.

### 2. Split by language

Recommended:

- Separate EN and DE editorial sitemaps.
- Keep German URLs out of manual one-off lists where possible and generate from the real DE content source.

Reason:

- Current DE coverage is inconsistent.
- Language splits make missing-localisation problems easier to spot.

### 3. Apply qualification rules to long-tail programmatic pages

Recommended:

- Keep hubs in the sitemap by default.
- Require a quality signal before deep programmatic variants enter the sitemap.

Suggested qualification signals:

- Proven internal-link support
- Distinct target query class
- Minimum content completeness threshold
- Not a redirect
- Not a near-duplicate of an already indexed stronger parent page

### 4. Remove weak and non-canonical URLs from the sitemap first

Highest-priority removals:

- The 10 redirect URLs listed above
- The weakest expanded variants
- Any low-confidence long-tail families that have not proven distinct value

### 5. Add stronger omitted pages

Highest-priority additions:

- DE blog post detail URLs
- Compare detail URLs in EN and DE
- Success-story detail URLs

### 6. Improve `lastModified` accuracy

Recommended:

- Use real content timestamps where available.
- For manually enumerated static pages, store stable lastmod values in a config object rather than using build time.
- For programmatic pages, use source-data revision timestamps, not `new Date()`.

## Top Fixes Recommended

1. Stop emitting redirect URLs in the sitemap.
2. Create a sitemap index and split the sitemap by section and language.
3. Add missing high-value detail pages before adding more long-tail programmatic URLs.
4. Move from blanket programmatic inclusion to qualification-based inclusion.
5. Replace synthetic build-time `lastModified` with real revision dates.
6. Clean up duplicate ownership between source groups.

## Code Changes Needed To Implement The Improved Strategy

No sitemap strategy changes were implemented in this audit. The report only documents the current state.

To implement the improved strategy, the main code changes would be:

- Replace the single `app/sitemap.ts` output with a sitemap index plus child sitemap routes.
- Keep `getSitemapSourceGroups()` as the source registry, but filter each group through sitemap policy rules before emission.
- Add explicit exclusion logic for redirect routes and non-canonical aliases.
- Add sitemap emitters for missing strategic detail families such as DE blog posts, compare detail pages, and success stories.
- Move `lastModified` handling into source-aware helpers so it uses real revision timestamps where possible.
