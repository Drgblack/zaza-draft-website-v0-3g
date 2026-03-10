# Index Quality Review

## Scope

This review is based on the live sitemap output documented in `docs/seo/url-inventory.json` and on representative route templates inspected in:

- `app/sitemap.ts`
- `app/[slug]/page.tsx`
- `app/[slug]/[...segments]/page.tsx`
- `app/report-comments/[student-type]/[subject]/[phase]/page.tsx`
- `app/scenario/[phase]/[issue]/page.tsx`
- `app/scenario/[phase]/[issue]/[year-group]/page.tsx`
- `app/expanded/[slug]/[variant]/page.tsx`
- `app/alternatives/[competitor]/[useCase]/page.tsx`
- `app/problems/[phase]/[issue]/page.tsx`
- `app/reply/[trigger]/[context]/page.tsx`
- `components/ScenarioPage.tsx`
- `components/ProgrammaticTemplate.tsx`

The goal is not to cut URLs for vanity reasons. The goal is to identify routes that are most likely to weaken crawl efficiency, create duplication, or dilute perceived site quality.

## Executive View

- Strongest immediate cleanup: remove redirect-only URLs from the sitemap.
- Biggest crawl-risk families: `/expanded/*`, `/report-comments/*`, and deep `/scenario/*` combinations.
- Biggest structural quality risk: large template families that all render through the same reusable page scaffold with parameter swaps rather than meaningfully distinct page architecture.
- No tag, faceted search, or on-site search-result pages were found in the sitemap.

## Flagged URL Groups

| URL pattern                                                                                                        | Approx. count | Why it may be weak                                                                                                                                                                                                                  | Recommended action  | Confidence | Crawl / quality effect                                 |
| ------------------------------------------------------------------------------------------------------------------ | ------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------- | ------------------------------------------------------ |
| `/de/ambassadors`, `/de/best-ai-writing-tools-for-teachers-2025`, `/de/state-of-ai-education`                      |             3 | These are redirect shims, not destination content. Redirect URLs should not sit in the sitemap because they waste crawl and send mixed indexing signals.                                                                            | remove from sitemap | High       | High crawl-efficiency gain, medium quality-signal gain |
| `/expanded/[seedSlug]/[variant]`                                                                                   |           436 | This family is file-driven from `expanded-pages/` and appears to create 12 variants for many seed topics. The structure strongly suggests near-duplicate long-tail coverage around the same source article or hub.                  | remove from sitemap | High       | High crawl-efficiency gain, high quality-signal gain   |
| `/report-comments/[student-type]/[subject]/[phase]`                                                                |         1,060 | These pages all route through the same `ScenarioPage` scaffold and are generated from a large matrix. Many combinations are likely too close in intent, especially where only student profile, subject, or stage changes.           | review manually     | High       | High crawl-efficiency risk, high content-quality risk  |
| `/scenario/[phase]/[issue]/[year-group]`                                                                           |           207 | This is another matrix family rendered through the same `ScenarioPage` component. It targets specific combinations, but the depth of permutation makes overlap and thin differentiation likely.                                     | review manually     | High       | High crawl-efficiency risk, medium-high quality risk   |
| `/scenario/[phase]/[issue]`                                                                                        |           108 | These broader scenario pages may overlap both the hub pages and the deeper year-group scenario pages. The intent can be valid, but the family is close enough to adjacent routes that cannibalisation is plausible.                 | review manually     | Medium     | Medium crawl-efficiency risk, medium quality risk      |
| `/alternatives/[competitor]/[useCase]`                                                                             |            36 | The comparison family is structurally repetitive. Competitor and use-case swaps are meaningful, but the copy model and table structure are highly standardised, which raises similarity risk.                                       | merge / consolidate | Medium     | Medium crawl-efficiency risk, medium quality risk      |
| `/uk/*` and `/england/*` regional English variants                                                                 |            41 | Some regional pages likely serve real UK-specific intent, but this family overlaps with root English teacher-writing pages and can become a second English layer with limited differentiation.                                      | review manually     | Medium     | Medium crawl-efficiency risk, medium quality risk      |
| Root-level generated markdown SEO pages such as `/how-to-write-behaviour-email-to-parents-year-1-ks1`              |             7 | These pages are hand-authored markdown, but they overlap closely with the scenario, problem, and report-comment families. Because the count is small, consolidation is more attractive than maintaining another parallel SEO layer. | merge / consolidate | Medium     | Low-medium crawl-efficiency risk, medium quality risk  |
| Legacy one-off SEO routes such as `/platform-variations/*`, `/problem-variations/*`, and `/how-to-reply/*`         |            15 | These look like an older programmatic layer that overlaps with newer hubs and matrix routes. They may still serve intent, but they should be checked against stronger parent pages before being allowed to persist by default.      | review manually     | Medium     | Medium crawl-efficiency risk, medium quality risk      |
| Utility, support, and legal pages such as `/privacy`, `/terms`, `/contact`, `/support`, `/faq`, and DE equivalents |            16 | These are not low-quality pages, but they are low-priority index assets relative to commercial and editorial content. They should be crawlable, but they do not need aggressive sitemap prominence.                                 | keep indexed        | High       | Low crawl-efficiency risk, low quality risk            |

## Highest-Priority Cleanup Opportunities

1. Remove the three redirect shims from the sitemap immediately.
2. Remove the entire `/expanded/[seedSlug]/[variant]` family from the sitemap until individual winners prove distinct demand and quality.
3. Audit the `1,060` `/report-comments/*` matrix URLs and define a strict indexable subset instead of assuming the whole matrix deserves indexation.
4. Audit the `207` deep `/scenario/[phase]/[issue]/[year-group]` URLs for uniqueness and performance before keeping them broadly indexed.
5. Review the `108` broader `/scenario/[phase]/[issue]` URLs against both the scenario hubs and the deeper year-group pages to reduce overlap.
6. Consolidate the `/alternatives/[competitor]/[useCase]` family around the strongest buyer-intent combinations rather than indexing every permutation equally.
7. Review regional English variants under `/uk/*` and `/england/*` against root English pages to confirm they are materially localised, not just lightly reframed.
8. Merge the seven root-level generated markdown SEO pages into the strongest existing parent guides where intent overlap is obvious.
9. Review older one-off SEO routes under `/how-to-reply/*`, `/platform-variations/*`, and `/problem-variations/*` for overlap with newer hubs and templates.
10. Clean up source-level sitemap duplication for the 20 URLs emitted by more than one sitemap source group before final dedupe.

## Notes On Specific Patterns

### 1. Redirect shims in the sitemap

Representative URLs:

- `/de/ambassadors`
- `/de/best-ai-writing-tools-for-teachers-2025`
- `/de/state-of-ai-education`

These pages are implemented as redirects rather than true localised destinations. Sitemap inclusion here is a straight technical SEO hygiene issue, not a content judgement call.

### 2. Report-comment matrix pages

Representative URLs:

- `/report-comments/anxious-eal-pupil/art/ks3`
- `/report-comments/anxious-eal-pupil/art/year-1`
- `/report-comments/high-attaining-but-disorganised/science/year-6`

Why this needs restraint:

- The route uses one shared `ScenarioPage` scaffold.
- The family size is very large.
- The query space is highly adjacent, especially when only one variable changes.

This does not mean the family should be noindexed wholesale. It means performance and uniqueness should decide which combinations stay in the sitemap and which should be pruned or folded into stronger parent pages.

### 3. Deep scenario combinations

Representative URLs:

- `/scenario/fe/angry-parent/post-16`
- `/scenario/fe/behaviour/post-16`
- `/scenario/primary/missing-homework/year-3`

Why this needs restraint:

- The route also renders through a shared scaffold.
- It competes with broader scenario pages, problem pages, and reply pages.
- Many permutations are likely to be semantically very close.

### 4. Expanded variants

Representative URLs:

- `/expanded/5-ai-report-writing-hacks/anxious-eal-all-subjects-ks2`
- `/expanded/5-ai-report-writing-hacks/effort-vs-attainment-ks4`
- `/expanded/5-calm-ways-to-reply-to-an-angry-parent-email/parents-evening-aligned-primary`

Observed pattern:

- Many seed folders appear to produce 12 variants each.
- The family is built from markdown files, but the structure still looks strongly templated.
- This is the cleanest family to remove from the sitemap first because it is high-volume and easy to revisit later.

### 5. Comparison pages

Representative URLs:

- `/alternatives/chatgpt/parent-emails`
- `/alternatives/claude/de-escalation`
- `/alternatives/magicschool-ai/report-comments`

These pages can serve real commercial intent. The concern is not that they exist. The concern is whether every competitor and every use-case permutation is differentiated enough to justify indexation at equal priority.

### 6. Regional English variants

Representative URLs:

- `/uk/behaviour-letter-home-primary-school`
- `/uk/how-to-reply-to-angry-parent-email`
- `/england/...`

These can be valuable when they are genuinely localised for UK-specific search language and school context. They become risky when they only restate a root English page with light wording changes.

### 7. Generated markdown pages

Representative URLs:

- `/how-to-write-behaviour-email-to-parents-year-1-ks1`
- `/how-to-write-report-comments`
- `/how-to-write-year-4-maths-report-comments-for-reluctant-writer`

The count is small enough that consolidation is a practical option. These should earn their place only if they outperform or materially extend the stronger scenario, problem, or report-comment pages.

## Patterns That Look Safe And Should Remain Indexed

- Core commercial pages such as `/`, `/features`, `/about`, `/pricing`, `/products/*`, `/suite`, and the main conversion pages.
- Programmatic hub pages such as `/how-to-reply`, `/reply-scenarios`, `/parent-communication-problems`, `/report-comment-builder`, and `/uk-school-communication`, because they serve broader parent intent and can consolidate weaker long-tail demand.
- Editorial content under `/blog/*`, `/resources/*`, `/videos/*`, `/webinars/*`, and related learning-centre content, assuming normal editorial quality standards are maintained.
- Genuine German localised pages and German blog posts that are true destination pages rather than redirect shims.
- Utility and legal pages should remain crawlable and indexable, even though they should not be treated as growth assets.

## Conservative Recommendation Summary

- Do not noindex large families blindly.
- Use sitemap pruning as the first lever where uncertainty is high.
- Use consolidation where two families target the same intent with different URL shapes.
- Keep broad hubs, core commercial pages, and genuine editorial or localised destinations indexed.
