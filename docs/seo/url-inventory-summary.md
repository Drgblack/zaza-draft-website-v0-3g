# URL Inventory Summary

## Snapshot

- Total unique sitemap URLs: 2138
- Base sitemap endpoint audited: https://zazadraft.com/sitemap.xml
- Distinct sitemap source groups: 20
- URLs emitted by more than one source group before dedupe: 20
- German localised URLs: 38
- UK or England regional URLs: 41

## Counts By Bucket

- programmatic_seo_pages: 2004
- learning_editorial_pages: 59
- core_commercial_pages: 27
- pricing_conversion_pages: 22
- utility_support_legal_pages: 16
- product_pages: 10

## Counts By Language

- en: 2100
- de: 38

## Counts By Route Type

- report_comment_matrix_page: 1060
- expanded_long_tail_page: 436
- scenario_matrix_page: 315
- static_page: 63
- comparison_page: 44
- blog_post: 42
- uk_regional_page: 40
- teacher_writing_page: 38
- localised_static_page: 22
- support_legal_page: 16
- topical_cluster_page: 10
- programmatic_hub_page: 10
- product_page: 8
- problem_programmatic_page: 8
- reply_programmatic_page: 8
- generated_markdown_page: 7
- conversion_page: 6
- homepage: 2
- how_to_keyword_page: 2
- england_regional_page: 1

## Counts By Canonical Risk

- medium: 1047
- high: 956
- low: 135

## Counts By Likely Indexability

- yes: 1122
- review: 1016

## Largest Sitemap Sources

- programmatic_entries: 923
- matrix_entries: 511
- expanded_page_entries: 436
- blog_entries: 42
- locale_and_legal_entries: 41
- teacher_writing_entries: 38
- comparison_entries: 36
- uk_cluster_entries: 31
- core_marketing_entries: 13
- content_hub_entries: 13
- topical_cluster_entries: 10
- campaign_and_tool_entries: 9

## Obvious Duplication Patterns

- German localised variants create a mirrored EN/DE route layer across 38 URLs. That is usually valid, but it increases crawl demand and needs consistent canonicals plus hreflang handling.
- The largest high-risk canonical clusters are expanded_pages (436), report_comment_matrix (304), scenario_matrix (207), generated_markdown_pages (7), how_to_keywords (2).
- Programmatic route families dominate the review set. 1016 URLs are marked for indexability review, mostly from matrix, expanded, generated, comparison, reply, problem, and how-to keyword families.
- 20 exact URLs are emitted by more than one sitemap source group before final dedupe. Review source overlap to keep ownership clear.

## Likely Areas Of Crawl Waste

- Matrix pages: 511 URLs across scenario and report-comment combinations. This is the biggest index-bloat candidate because many pages share a tight template and adjacent intent.
- Expanded and generated long-tail pages: 443 URLs. These are likely to overlap with hubs, teacher-writing pages, and keyword-led pages unless uniqueness is tightly controlled.
- How-to, reply, problem, and alternative permutations: 961 URLs. These often target similar commercial-intent queries with small angle changes, so canonicalisation and consolidation should be reviewed.

## Recommended Next Actions

- Split Search Console reporting by route family so matrix, generated, comparison, and editorial performance can be compared directly.
- Review the highest-risk clusters first for thin copy, internal-link weakness, and overlapping search intent before adding more programmatic pages.
- Confirm hreflang, self-canonical, and canonical-to-parent rules for EN/DE mirrors and regional UK/England variants.
- Consider excluding weak long-tail families from the sitemap until they have proven demand, uniqueness, and internal-link support.

## Notes On Method

- Inventory generated from the live sitemap emitter in `app/sitemap.ts`, not from `app/page.tsx` counts.
- Classification is deterministic from sitemap source group first, then URL pattern, with uncertain large-scale SEO families marked as `review` instead of guessed as safe.
