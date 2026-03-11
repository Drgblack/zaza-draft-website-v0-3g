# Crawl And Linking Report

## Scope

This review focuses on public URLs emitted into the live sitemap set and on the internal-linking systems that feed them:

- global navigation and footer
- homepage and conversion surfaces
- editorial and hub pages
- programmatic templates
- detail-page templates for glossary, resources, integrations, community, and success stories

It is not a full crawl simulation. The goal is to identify likely crawl waste, weak link pathways, near-orphan sections, and clusters that look structurally overproduced relative to their internal-link support.

## Executive Summary

- Internal authority is concentrated in a small set of top-level pages such as the homepage, header navigation, footer links, pricing, product pages, blog, resources, compare, integrations, community, and a few hub pages.
- The biggest URL families are much larger than the linking system supporting them. The `report-comments`, `scenario`, and `expanded` families account for `1,811` sitemap URLs and mostly rely on template-level lateral links rather than repeated links from strong commercial or editorial hubs.
- Several secondary sections appear weakly integrated into the main funnel, especially detail pages under community discussions, integrations, glossary, resources, and success stories.
- The German route family has internal-link leakage back into English URLs in multiple templates, which weakens the German internal graph and muddies locale intent.
- There are still user-facing links pointing at redirect aliases or missing targets such as `/learning-centre`, `/compare-tools`, `/privacy-policy`, `/terms-of-service`, and `/free-guide`.

## Public URL Pressure

- Total public sitemap URLs reviewed: `2,138`
- Programmatic SEO pages: `2,004`
- Report-comment matrix pages: `1,060`
- Expanded long-tail pages: `436`
- Scenario matrix pages: `315`
- Comparison pages: `44`
- UK or England regional pages: `41`
- Blog posts: `42`
- German localised sitemap URLs: `38`

This shape matters because the site is not operating with a balanced link graph. A small set of hubs carries most authority, while the majority of URLs sit in mechanically generated families.

## Current Internal-Linking Shape

### 1. Global authority sources

The strongest sitewide sources are:

- `components/header.tsx`
- `components/Footer.tsx`
- `app/home-client.tsx`

These mostly push users and crawlers toward:

- pricing
- core product pages
- waitlist
- blog
- compare
- integrations
- community
- resources
- success stories
- FAQ
- about pages

This is a sensible commercial spine, but it means the long-tail families depend heavily on second-order links from hubs and templates.

### 2. Strong secondary hubs

The clearest internal authority distributors beyond the global shell are:

- `app/diagnosis/page.tsx`
- `app/(marketing)/teacher-parent-communication-hub/page.tsx`
- `app/uk/teacher-communication-resources/page.tsx`
- `app/blog/[slug]/blog-post-client.tsx`
- `app/community/community-client.tsx`
- `app/integrations/integrations-client.tsx`

These pages do pass links onward, but not enough of them currently feed the largest programmatic families in a disciplined way.

### 3. Template-level linking

Large route families largely self-manage their own linking:

- `components/ProgrammaticPage.tsx` uses `page.cta`, breadcrumbs, and `page.internalLinks`
- `components/seo/teacher-writing-landing-page.tsx` uses `page.internalLinks` and `page.relatedSlugs`
- `components/ExpandedBlogLandingPage.tsx` links to `page.sourceBlogPath`, `page.relatedLinks`, and `page.hubPath`
- `app/blog/[slug]/blog-post-client.tsx` mainly links back to `/blog` and a small set of `relatedPosts`

That structure creates internal-link circulation inside clusters, but not always enough fresh authority from top-level pages. The result is a large number of pages that are technically linked yet still strategically underlinked.

## Likely Crawl-Waste Patterns

| URL family                                                               |          Approx. count | Why it looks wasteful                                                                                                                                  | Crawl risk | Strategic recommendation                                                                                           |
| ------------------------------------------------------------------------ | ---------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `/report-comments/[student-type]/[subject]/[phase]`                      |                  1,060 | Very large matrix family rendered through shared scaffolding. Likely many adjacent-intent pages with limited unique authority signals.                 | High       | Reduce sitemap inclusion, consolidate to stronger hubs, and only keep combinations that earn links or performance. |
| `/scenario/[phase]/[issue]` and `/scenario/[phase]/[issue]/[year-group]` |                    315 | Broad and deep scenario permutations compete with problem pages, reply pages, and diagnosis recommendations.                                           | High       | Tighten qualification rules and route more authority through fewer scenario hubs.                                  |
| `/expanded/[seedSlug]/[variant]`                                         |                    436 | Expanded pages appear to derive from seed articles and mostly link back to source blog content plus related variants.                                  | High       | Prune hard, remove weak variants from sitemap, and consolidate authority into the strongest seed articles.         |
| `/alternatives/[competitor]/[useCase]` and comparison families           |                     44 | Commercially useful, but structurally repetitive and easy to overproduce.                                                                              | Medium     | Keep strongest intent pages, but support them from compare hubs and product pages more deliberately.               |
| `/uk/*` and `/england/*` regional clusters                               |                     41 | Region-specific intent can be real, but it creates a second English layer that can drift into duplication.                                             | Medium     | Keep the best UK-specific pages, consolidate weak variants, and route them from one clear UK hub.                  |
| Legacy alias links and redirect targets                                  | Low count, high impact | Links still point to redirect or missing URLs such as `/learning-centre`, `/compare-tools`, `/privacy-policy`, `/terms-of-service`, and `/free-guide`. | Medium     | Replace them with canonical destination URLs to reduce wasted crawl hops and broken graph edges.                   |

## Likely Orphan Or Near-Orphan Sections

These sections are not true orphans, but they appear to rely on a narrow set of pathways and are weakly connected to the commercial funnel.

### 1. Expanded long-tail pages

Evidence:

- `components/ExpandedBlogLandingPage.tsx`
- seed-source relationship back to blog only

Why they are at risk:

- They depend on source-blog and related-page links rather than repeated links from homepage, compare, diagnosis, or product pages.
- The family is large enough that many pages are unlikely to receive consistent authority or revisits.

### 2. Community discussion threads

Evidence:

- `app/community/discussions/[id]/page.tsx`
- generic metadata with a single detail template

Why they are at risk:

- Threads are one level below the community hub and are not supported by nav or footer links.
- They are weakly connected to commercial pages and appear more likely to attract crawl than to convert or rank meaningfully unless the thread layer becomes a real content product.

### 3. Integration detail pages

Evidence:

- `app/integrations/[slug]/page.tsx`
- slug-derived metadata and list-detail structure

Why they are at risk:

- Detail pages appear to depend mainly on the integrations listing page.
- The top-level site does link to `/integrations`, but not to specific high-value integrations from stronger commercial or educational surfaces.

### 4. Glossary term pages

Evidence:

- `app/glossary/[slug]/page.tsx`
- `app/glossary/[slug]/glossary-term-client.tsx`

Why they are at risk:

- Term pages mainly loop within glossary terms and side links to learning resources.
- The current glossary sample is small, but if it expands materially without stronger hub support it becomes a classic crawl sink.

### 5. Resource and success-story detail pages

Evidence:

- `app/resources/[slug]/page.tsx`
- `app/success-stories/[slug]/page.tsx`

Why they are at risk:

- These detail pages mostly depend on their own parent hubs.
- They are the kind of pages that can support trust and conversion, but they are not being used that way aggressively enough.

## Weak Internal-Linking Patterns

### 1. Programmatic clusters link sideways more than upward

The biggest families use related-links systems, breadcrumbs, or small internal-link sets, but many pages do not appear to earn repeated links from:

- homepage trust and use-case blocks
- pricing
- product pages
- diagnosis results
- major editorial hubs

That is a weak pattern because it spreads crawl across many similar pages without a corresponding increase in authority or funnel relevance.

### 2. Too few strategic hubs feed the large matrices

The site has good hub candidates, but they are not used as aggressively as they should be for the largest page families. For example:

- the homepage does not look like a major distributor into the strongest high-intent long-tail clusters
- `teacher-parent-communication-hub` and `uk/teacher-communication-resources` do link into clusters, but these hubs are not obviously reinforced throughout the rest of the site
- blog posts mostly circulate through blog-related content rather than passing more authority into commercial or scenario pages

### 3. Funnel disconnect on secondary content sections

Several sections exist as islands relative to the Draft funnel:

- community
- integrations
- glossary
- resources
- success stories

They link around themselves, but they do not consistently route users toward:

- Draft product pages
- pricing
- waitlist
- diagnosis
- stronger commercial comparison pages

### 4. Locale leakage on German pages

German templates still point back to English destinations in several places:

- `app/de/glossary/[slug]/glossary-term-client.tsx`
- `app/de/ai-literacy/resources/resource-library-client.tsx`
- `app/de/ai-literacy/courses/[slug]/course-client.tsx`
- `app/de/ai-literacy/resources/[slug]/resource-detail-client.tsx`
- `app/de/about/founder-story/page.tsx`

This weakens the DE graph, creates mixed-language journeys, and reduces the chance that German pages behave like a coherent locale cluster.

### 5. Redirect and missing-target links still exist

Confirmed examples:

- `components/header.tsx` links to `/privacy-policy` and `/terms-of-service`
- `components/exit-intent-mount.tsx` links to `/free-guide`
- `app/best-ai-tool-parent-emails/best-ai-tool-parent-emails-client.tsx` links to `/compare-tools` and `/learning-centre`
- `app/best-ai-writing-tools-for-teachers-2025/best-ai-writing-client.tsx` links to `/learning-centre`
- `app/reduce-stress-parent-messages/reduce-stress-client.tsx` links to `/learning-centre`
- `app/ai-for-student-reports/ai-for-student-reports-client.tsx` links to `/learning-centre`

These are small fixes, but they matter because they create wasted crawl hops and weaken internal canonical clarity.

## Strategic Hubs That Should Pass More Authority

These pages are strong candidates to concentrate and redistribute internal authority:

- homepage
- pricing
- Draft product page
- diagnosis
- compare hub
- blog hub
- teacher parent communication hub
- UK teacher communication resources hub
- resources hub
- success stories hub

They should be used more deliberately to support:

- the best scenario pages
- the best report-comment pages
- high-conviction comparison pages
- a curated set of regional pages
- case studies and proof pages that support conversion

## Recommended Internal-Linking Improvements

### High priority

1. Route more authority from the homepage, pricing, and product pages into a curated shortlist of the best-performing scenario, report-comment, and comparison pages.
2. Add stronger onward links from blog posts into diagnosis, pricing, Draft product pages, and selected high-intent use-case pages.
3. Turn diagnosis into a more explicit link router for the strongest problem and scenario pages rather than a neutral matcher across very large inventories.
4. Fix canonical destination links sitewide where current links still hit redirects or missing pages.
5. Repair German internal-link pathways so DE pages link to DE hubs, DE resource libraries, DE glossary routes, and DE pricing where those routes exist.

### Medium priority

1. Add stronger proof-to-conversion pathways from success stories and resource detail pages into Draft, pricing, and waitlist.
2. Add “best next pages” modules to integration, glossary, and community templates so those sections do not only recycle lateral links.
3. Create fewer but stronger long-tail hub pages that summarize families, then link to carefully chosen detail pages rather than emitting full matrices into the crawl path.
4. Review whether community discussion detail pages deserve index-facing treatment at all if they do not become a strategic content asset.

## Recommended Pruning Or Consolidation Opportunities

1. Prune the weakest `expanded` variants first. This is the clearest case of overproduction relative to link support.
2. Consolidate the `report-comments` family into a smaller set of stronger subject or phase hubs, then link down only where the deeper page is materially distinct.
3. Consolidate overlapping `scenario`, `problem`, and `reply` pathways so each intent has one obvious best route.
4. Reduce the number of regional English pages unless they are clearly UK-specific and supported from the UK hub.
5. Consider whether glossary, integrations, and community detail layers should stay small and curated rather than scaling mechanically.

## Highest-Priority Risks

1. The report-comment matrix is far too large for the authority being passed into it.
2. Expanded long-tail pages look overproduced and weakly supported.
3. Scenario permutations likely compete with adjacent families while sharing the same template structure.
4. German internal-link leakage breaks locale cohesion.
5. Redirect and missing-target links are still present in user-facing templates.

## Concrete Code Areas To Update

### Global shell and top-level authority

- `components/header.tsx`
- `components/Footer.tsx`
- `app/home-client.tsx`
- `app/pricing/page.tsx`
- `app/products/draft/draft-client.tsx`

### Link-routing hubs

- `app/diagnosis/page.tsx`
- `app/(marketing)/teacher-parent-communication-hub/page.tsx`
- `app/uk/teacher-communication-resources/page.tsx`
- `app/blog/[slug]/blog-post-client.tsx`

### Programmatic and long-tail templates

- `components/ProgrammaticPage.tsx`
- `components/seo/teacher-writing-landing-page.tsx`
- `components/ExpandedBlogLandingPage.tsx`
- `components/ScenarioPage.tsx`
- `app/compare/[slug]/comparison-client.tsx`

### Secondary sections with weak funnel integration

- `app/community/community-client.tsx`
- `app/community/discussions/[id]/page.tsx`
- `app/integrations/integrations-client.tsx`
- `app/integrations/[slug]/page.tsx`
- `app/glossary/[slug]/glossary-term-client.tsx`
- `app/resources/[slug]/page.tsx`
- `app/success-stories/[slug]/page.tsx`

### German locale cleanup

- `app/de/glossary/[slug]/glossary-term-client.tsx`
- `app/de/ai-literacy/resources/resource-library-client.tsx`
- `app/de/ai-literacy/courses/[slug]/course-client.tsx`
- `app/de/ai-literacy/resources/[slug]/resource-detail-client.tsx`
- `app/de/about/founder-story/page.tsx`

### Redirect and canonical destination cleanup

- `app/best-ai-tool-parent-emails/best-ai-tool-parent-emails-client.tsx`
- `app/best-ai-writing-tools-for-teachers-2025/best-ai-writing-client.tsx`
- `app/reduce-stress-parent-messages/reduce-stress-client.tsx`
- `app/ai-for-student-reports/ai-for-student-reports-client.tsx`
- `components/exit-intent-mount.tsx`

## Conservative Conclusion

The site does not have a pure orphan problem. It has a support imbalance problem. A small number of commercial and hub pages carry most authority, while the largest URL families are too big, too similar, and too internally self-referential. The best next step is not to add more pages. It is to tighten which pages deserve strong links, fix locale and redirect leakage, and use the strongest hubs to pass authority into a smaller, more defensible set of long-tail URLs.
