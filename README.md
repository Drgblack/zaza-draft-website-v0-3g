# Zaza Draft - Marketing Website

A production-ready multi-page marketing site for Zaza Draft, an AI-powered tool that helps teachers write better parent messages.

## Features

- **Multi-page site** with Home, Features, Pricing, Blog, Resources, About, Contact, and Legal pages
- **Internationalization (i18n)** - English and German live, expandable to ES/FR/IT
- **CMS-backed Blog** - 3 seeded posts with tags, author info, and related posts
- **CMS-backed Resources** - Templates, guides, and checklists for teachers
- **Dark theme** with purple gradient branding
- **Email signup** with Brevo integration
- **GA4 analytics** ready
- **Fully responsive** and accessible

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Google Fonts (Inter)

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env

# Brevo Email Integration (optional)

NEXT_PUBLIC_BREVO_API_KEY=your_brevo_api_key
NEXT_PUBLIC_BREVO_ENDPOINT=https://api.brevo.com/v3/contacts

# Google Analytics (optional)

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe (optional - for future payment integration)

NEXT*PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test*...
STRIPE*SECRET_KEY=sk_test*...
STRIPE*PRICE_ID=price*...
\`\`\`

If environment variables are not set, the app will use mock endpoints and display console warnings.

## Internationalization

### Current Languages

- **English (EN)** - Default, fully translated
- **German (DE)** - Fully translated

### Adding New Languages

1. Open `lib/i18n/language-context.tsx`
2. Copy the `translationsEn` object structure
3. Create a new translations object (e.g., `translationsEs` for Spanish)
4. Add the new language to the `Language` type
5. Update the language switcher in `components/header.tsx`

Example files for ES/FR/IT are already created in `lib/i18n/` with TODO comments.

### Translation Keys

All translation keys are centralized in `lib/i18n/language-context.tsx`. Key categories:

- `nav.*` - Navigation labels
- `footer.*` - Footer labels
- `home.*` - Home page content
- `features.*` - Features page content
- `pricing.*` - Pricing page content
- `form.*` - Form labels and messages
- `blog.*` - Blog labels
- `resources.*` - Resources labels

## Content Management

### Adding Blog Posts

Edit `lib/cms/posts.ts` and add a new post to the `posts` array:

\`\`\`typescript
{
slug: "your-post-slug",
title: "Your Post Title",
excerpt: "Brief description...",
coverImage: "/path-to-image.jpg",
body: `Full post content in markdown...`,
tags: ["Tag1", "Tag2"],
authorName: "Author Name",
authorAvatar: "/author-avatar.png",
publishedAt: "2024-01-15",
language: "en"
}
\`\`\`

### Adding Resources

Edit `lib/cms/resources.ts` and add a new resource to the `resources` array:

\`\`\`typescript
{
slug: "your-resource-slug",
title: "Resource Title",
type: "Guide" | "Template" | "Checklist",
excerpt: "Brief description...",
heroImage: "/path-to-image.jpg",
body: `Full resource content...`,
downloadUrl: "/optional-download-link.pdf", // optional
language: "en"
}
\`\`\`

### Images

Place images in the `public/` directory. Reference them with `/image-name.jpg` in your code.

## Customization

### Colors

The color palette is defined in `app/globals.css`. Main colors:

- Background: `#0B1220` (navy)
- Surface: `#111827` / `#0F172A`
- Primary gradient: `#7C3AED` to `#6366F1` (purple)
- Accent: `#60A5FA` (blue)
- Text: `#F9FAFB` (light)
- Muted: `#D1D5DB` / `#9CA3AF`

### Typography

The site uses Inter font from Google Fonts. To change fonts:

1. Update the import in `app/layout.tsx`
2. Update the font variable in `app/globals.css`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

For the intended branch and redeploy workflow, see [docs/DEPLOYMENT_WORKFLOW.md](./docs/DEPLOYMENT_WORKFLOW.md).

Recommended default:

- Use `main` as the only production branch.
- Use feature branches for preview deployments and review.
- Redeploy production after any environment-variable change, especially `NEXT_PUBLIC_*` values.

### Environment Variables in Production

Set the following in your Vercel project settings:

- `NEXT_PUBLIC_BREVO_API_KEY`
- `NEXT_PUBLIC_BREVO_ENDPOINT`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## SEO

- Each page has custom metadata
- Sitemap available at `/sitemap.xml`
- Longtail sitemap available at `/sitemap-longtail.xml`
- Robots.txt configured
- Open Graph tags for social sharing

### Tiered Sitemaps

The sitemap setup is intentionally split by quality:

- `/sitemap.xml`
  Main sitemap for core commercial pages, product pages, hubs, blog content, localised essentials, and the strongest programmatic URLs.
- `/sitemap-longtail.xml`
  Secondary sitemap for deeper longtail programmatic pages such as broader scenario, report-comment, alternatives, expanded, and related SEO variants.

Quality logic lives in:

- `app/sitemap.ts`
- `app/sitemap-longtail.ts`

How to submit in Google Search Console:

1. Submit `https://zazadraft.com/sitemap.xml` as the main sitemap.
2. Submit `https://zazadraft.com/sitemap-longtail.xml` as a separate secondary sitemap.
3. Keep both sitemap lines in `app/robots.txt` so crawlers can discover the split sitemap setup automatically.
4. Monitor the two sitemap submissions separately so the main sitemap stays a cleaner signal for canonical growth pages.

What to monitor after changes:

1. Coverage and indexing rate for `/sitemap.xml` versus `/sitemap-longtail.xml`.
2. Whether promoted high-confidence `report-comments` and `scenario` URLs are being indexed faster than the deeper longtail set.
3. Whether the longtail sitemap starts accumulating `Crawled - currently not indexed` or duplicate signals, which is a sign that the promoted slice is still too broad.
4. Whether helper redirects or alias routes reappear in sitemap output after future route changes.
5. Whether newly pruned `report-comments` and `scenario` pages stay out of both sitemap tiers once they are marked `noindex` or redirected at route level.

Current longtail quality filter:

- Implemented in `app/sitemap.ts` through `LONGTAIL_QUALITY_CRITERIA` and `assessLongtailQuality()`.
- Keeps the main sitemap unchanged.
- Filters only the longtail sitemap with these heuristics:
  - estimated word count must be at least `900`
  - estimated unique examples must be at least `4`
  - slug depth must stay at `4` segments or fewer
  - matrix-style longtail pages must match a promoted cohort instead of entering by default
- Current promoted matrix cohorts for longtail retention:
  - report comments: `primary` or `ks2`, plus `english` or `maths`
  - scenario pages: `primary` or `ks2`, plus `behaviour` or `low-attainment`, plus `year-5` or `year-6`
- Excluded longtail URLs are logged from the sitemap generation step so they can be reviewed after deploy.

How to tighten the longtail criteria further with GSC data:

1. Reduce `maxSlugDepth` if deep expanded or regional paths stay unindexed.
2. Raise `minimumEstimatedWordCount` if longtail pages keep landing in `Crawled - currently not indexed`.
3. Raise `minimumUniqueExamples` if templated pages are clustering under duplicate or alternate signals.
4. Narrow the promoted report-comment and scenario cohorts to only the cells with stable impressions and clicks.
5. Mirror any cohort changes in both `LONGTAIL_QUALITY_CRITERIA` and the route-level index rules so sitemap policy and metadata stay aligned.

## Link Audit

Internal-link auditing for stale, redirected, missing, or low-confidence targets lives in:

- `scripts/link-audit.ts`

What it checks:

- links to redirect or alias routes such as `/learning-centre`, `/communication-diagnosis`, and old helper paths
- links to removed helper routes such as `/behaviour-email-diagnosis`, `/parent-ignores-email-help`, `/report-writing-stress-help`, and `/slt-documentation-help`
- links to removed or missing routes
- links to low-confidence programmatic pages that are currently marked `noindex`, especially deep `/report-comments/*` tail variants

What it writes:

- `docs/seo/link-audit-report.json`
- `docs/seo/link-audit-report.md`

How to run it:

```bash
pnpm exec tsx scripts/link-audit.ts
```

To scan only one subtree:

```bash
pnpm exec tsx scripts/link-audit.ts --path ./app --dry-run
```

If you prefer `ts-node`, the script is path-safe and can be run the same way once `ts-node` is available in your environment:

```bash
ts-node scripts/link-audit.ts
```

Optional auto-rewrite mode:

```bash
pnpm exec tsx scripts/link-audit.ts --write
```

`--fix` is supported as a clearer alias:

```bash
pnpm exec tsx scripts/link-audit.ts --fix
```

Auto-rewrite notes:

- `--dry-run` reports findings without editing files.
- `--write` or `--fix` updates deterministic replacements in scanned files.
- Before editing a file, the script creates a sibling backup with the suffix `.link-audit.bak`.
- Removed helper routes are rewritten to their diagnosis or hub replacement when a deterministic target exists.
- Low-value `/report-comments/*` links are rewritten to `/report-comment-builder` when the prune rules mark them as `redirect` or `noindex`.

Example report shape:

```json
{
  "generatedAt": "2026-03-10T08:00:00.000Z",
  "scannedRoots": ["app"],
  "scannedFiles": 214,
  "findings": [
    {
      "file": "app/example/page.tsx",
      "line": 42,
      "column": 19,
      "rawTarget": "/behaviour-email-diagnosis",
      "normalizedTarget": "/behaviour-email-diagnosis",
      "type": "removed-helper-route",
      "suggestedReplacement": "/diagnosis?issue=behaviour-concern&phase=primary&studentContext=behaviour-issues&tone=professional-but-empathetic",
      "autoFixable": true,
      "reason": "Removed helper route. Update the link to the diagnosis target or a stronger canonical hub instead."
    }
  ],
  "totals": {
    "removed-helper-route": 1,
    "redirect-target": 0,
    "missing-route": 0,
    "low-confidence-programmatic": 0
  },
  "dryRun": true,
  "writeMode": false,
  "backupsCreated": []
}
```

## Diagnosis Tool

The parent communication and report diagnosis experience lives at `/diagnosis`.

Main files:

- `app/diagnosis/page.tsx`
- `components/CommunicationDiagnosis.tsx`
- `components/DiagnosisResultCard.tsx`
- `lib/diagnosis-rules.ts`

How to add or change rules:

1. Add or update a recommendation in `recommendationLibrary` inside `lib/diagnosis-rules.ts`.
2. Add a new rule object to `diagnosisRules` with a stable `id`, a `priority`, a `matches` predicate, and one or more recommendation keys.
3. Keep `why` bullets specific to the teacher context, for example `UK primary follow-up` or `Direct fit for de-escalation`.
4. If the rule needs a new long-tail entry route, add a redirect page under `app/` that points into `/diagnosis` with prefilled query params.

How to test the diagnosis flow:

```bash
pnpm run lint
pnpm run build
```

Manual checks:

1. Open `/diagnosis` and submit an angry parent case with `de-escalate`.
2. Open `/how-to-reply-angry-parent` and confirm it permanently redirects to `/diagnosis?issue=angry-parent-email&tone=de-escalate`.
3. Confirm `/sitemap.xml` includes `/diagnosis` but does not include redirect-only helper routes.
4. In the browser, verify diagnosis events appear through the existing analytics wiring.

Structured data integration:

- `app/diagnosis/page.tsx` already renders `Article`, `SoftwareApplication`, `FAQPage`, `HowTo`, and `BreadcrumbList` through `components/StructuredData.tsx`.
- Keep the canonical path as `/diagnosis` when adding schema.
- Add new FAQ items to `diagnosisFaqs` in `lib/diagnosis-rules.ts` so the UI and JSON-LD stay aligned.

Expansion ideas:

- Add more subject-specific report-comment recommendations as new programmatic pages go live.
- Add more redirect helper routes for high-intent teacher searches.
- Add server-side storage later if you want anonymised diagnosis trends beyond client analytics.

## Matrix Programmatic Pages

The new matrix-driven pain and scenario expansion lives in:

- `lib/matrix.ts`
- `components/ScenarioPage.tsx`
- `app/scenario/[phase]/[issue]/[year-group]/page.tsx`
- `app/report-comments/[student-type]/[subject]/[phase]/page.tsx`

Current matrix scale:

- `207` scenario pages
- `304` report-comment pages
- `511` total new matrix combinations

This keeps the current launch focused on valid, teacher-relevant combinations while taking the site comfortably past the previous page count. The report-comments route keeps the `[phase]` segment name, but it accepts both stage slugs such as `ks2` and year-specific slugs such as `year-5` so coverage can grow without a breaking route change.

How to scale this to 2,000+ pages:

1. Add more student types in `lib/matrix.ts`.
2. Add more subject families beyond `english`, `maths`, `science`, and `all-subjects`.
3. Add more issue families or school-context modifiers to the scenario matrix.
4. Add region-specific variants once UK sub-clusters need separate wording.

Quality checks for matrix pages:

1. Keep rendered copy in the `900-1500` word range.
2. Make sure the exact target keyword appears in the title, H1, hero copy, at least one H2, and the meta description.
3. Keep UK English spelling and school context, including behaviour, parents' evening, Ofsted, SEN, safeguarding, and professional communication where relevant.
4. Do not let pages drift into generic AI copy. Zaza Draft should remain a calm teacher-first co-writer with teachers in control.
5. Keep examples conservative and editable. Do not imply automatic sending or invented pupil facts.

Sitemap inclusion:

- `app/sitemap.ts` now imports `getMatrixSitemapEntries()` from `lib/matrix.ts` so all generated scenario and report-comment URLs are included automatically.

## Index Control

Initial low-confidence noindex control for programmatic pages lives in:

- `lib/seo.ts`
- `lib/index-control.ts`
- `lib/report-prune.ts`
- `app/report-comments/[student-type]/[subject]/[phase]/page.tsx`
- `app/scenario/[phase]/[issue]/[year-group]/page.tsx`
- `lib/seo-canonical.ts`
- `next.config.mjs`

What it does now:

- Keeps core commercial and hub pages indexable by default.
- Exposes shared `isIndexable()` and `getCanonical()` helpers from `lib/seo.ts` so page metadata, canonical logic, and sitemap policy stay aligned.
- Applies the current rules to both `report-comments` and `scenario` matrix pages.
- Applies `noindex,follow` through Next metadata when a matrix page is too broad to justify index priority.
- Logs the decision server-side so you can review the current rule behaviour in local output or Vercel logs.
- Self-canonicalises stronger matrix pages and canonicalises weaker overlapping variants back to the relevant hub.

Current rule set for `report-comments`:

1. Parse the route as `/report-comments/{studentType}/{subject}/{stage}`.
2. Redirect the broadest prune targets straight to `/report-comment-builder`:
   - any `all-subjects` route
   - `fe`
   - `post-16`
3. Keep the page indexable only if it matches all of the promoted criteria:
   - preferred student type: `struggling`, `anxious-eal`, or `sen-needs`
   - common subject: `english`, `maths`, or `science`
   - popular phase or core year group:
     - `primary`
     - `ks2`
     - `secondary`
     - `year-3` through `year-11`
4. Noindex the remaining report-comments tail so it stays accessible without competing for index coverage.

Current rule set for `scenario`:

1. Parse the route as `/scenario/{phase}/{issue}/{yearGroup}`.
2. Promote only the current teacher-facing issue set:
   - `behaviour`
   - `angry-parent`
   - `missing-homework`
   - `parents-evening`
   - `sen-support`
3. Promote only the current phase and year-group cohorts:
   - `primary:year-5`
   - `primary:year-6`
   - `ks1:year-2`
   - `ks2:year-5`
   - `ks2:year-6`
   - `ks3:year-8`
   - `ks3:year-9`
   - `ks4:year-10`
   - `ks4:year-11`
4. Noindex the page if it falls outside those promoted issue and phase-year combinations.

Canonical behaviour:

1. Stronger matrix pages keep a self-canonical URL.
2. Lower-confidence `report-comments` variants canonicalise to `/report-comment-builder`.
3. Lower-confidence `scenario` variants canonicalise to `/scenario-combinations`.
4. Other overlapping longtail families such as `/alternatives/*`, `/reply/*`, and `/problems/*` continue to canonicalise to their hub pages.

How to expand the rules as audit data comes in:

1. Add new route-family logic in `getIndexControlDecision()` inside `lib/index-control.ts`.
2. Start with clear path families such as:
   - `/reply/*`
   - `/problems/*`
   - `/expanded/*`
3. Prefer deterministic rules first:
   - broad stage plus broad subject
   - promoted phase-year cohorts
   - promoted issue cohorts
   - canonical-to-hub families
   - weak cells identified in Search Console
   - low-link, low-click, or duplicate-intent patterns from the SEO audit
4. Only tighten rules after reviewing:
   - impressions
   - clicks
   - internal-link support
   - canonical target quality
5. Keep route-level metadata as the control point for dynamic noindex decisions. That is more reliable for this app than static header rules.
6. If GSC shows a matrix page earning impressions, clicks, and stable indexing, move its cohort into the promoted sets in `lib/index-control.ts` and mirror the same cohort in the sitemap confidence rules in `app/sitemap.ts`.

Report pruning monitoring after deploy:

1. In Google Search Console, expect a mix of:
   - `Page with redirect`
   - `Excluded by 'noindex' tag`
   - `Alternate page with proper canonical tag`
2. Watch whether `/report-comment-builder` picks up the impressions previously spread across very broad report-comment combinations.
3. Review whether any kept report-comment pages begin slipping into `Crawled - currently not indexed`. If they do, the promoted keep set may still be too broad.
4. If a noindexed report-comment page starts earning meaningful impressions or internal links, move that cohort into the keep criteria in `lib/report-prune.ts`.

First 50 example slugs and titles:

```text
scenario/primary/behaviour/year-1 - Behaviour email help for Year 1 Primary teachers | Zaza Draft
scenario/primary/missing-homework/year-1 - Missing homework email help for Year 1 Primary teachers | Zaza Draft
scenario/primary/angry-parent/year-1 - Angry parent email reply help for Year 1 Primary teachers | Zaza Draft
scenario/primary/sen-support/year-1 - SEN support email help for Year 1 Primary teachers | Zaza Draft
scenario/primary/low-attainment/year-1 - Low attainment message help for Year 1 Primary teachers | Zaza Draft
scenario/primary/anxiety/year-1 - Anxiety-sensitive email help for Year 1 Primary teachers | Zaza Draft
scenario/primary/grade-complaint/year-1 - Grade complaint reply help for Year 1 Primary teachers | Zaza Draft
scenario/primary/disorganisation/year-1 - Disorganisation message help for Year 1 Primary teachers | Zaza Draft
scenario/primary/parents-evening/year-1 - Parents' evening follow-up help for Year 1 Primary teachers | Zaza Draft
scenario/primary/behaviour/year-2 - Behaviour email help for Year 2 Primary teachers | Zaza Draft
scenario/primary/missing-homework/year-2 - Missing homework email help for Year 2 Primary teachers | Zaza Draft
scenario/primary/angry-parent/year-2 - Angry parent email reply help for Year 2 Primary teachers | Zaza Draft
scenario/primary/sen-support/year-2 - SEN support email help for Year 2 Primary teachers | Zaza Draft
scenario/primary/low-attainment/year-2 - Low attainment message help for Year 2 Primary teachers | Zaza Draft
scenario/primary/anxiety/year-2 - Anxiety-sensitive email help for Year 2 Primary teachers | Zaza Draft
scenario/primary/grade-complaint/year-2 - Grade complaint reply help for Year 2 Primary teachers | Zaza Draft
scenario/primary/disorganisation/year-2 - Disorganisation message help for Year 2 Primary teachers | Zaza Draft
scenario/primary/parents-evening/year-2 - Parents' evening follow-up help for Year 2 Primary teachers | Zaza Draft
scenario/primary/behaviour/year-3 - Behaviour email help for Year 3 Primary teachers | Zaza Draft
scenario/primary/missing-homework/year-3 - Missing homework email help for Year 3 Primary teachers | Zaza Draft
scenario/primary/angry-parent/year-3 - Angry parent email reply help for Year 3 Primary teachers | Zaza Draft
scenario/primary/sen-support/year-3 - SEN support email help for Year 3 Primary teachers | Zaza Draft
scenario/primary/low-attainment/year-3 - Low attainment message help for Year 3 Primary teachers | Zaza Draft
scenario/primary/anxiety/year-3 - Anxiety-sensitive email help for Year 3 Primary teachers | Zaza Draft
scenario/primary/grade-complaint/year-3 - Grade complaint reply help for Year 3 Primary teachers | Zaza Draft
scenario/primary/disorganisation/year-3 - Disorganisation message help for Year 3 Primary teachers | Zaza Draft
scenario/primary/parents-evening/year-3 - Parents' evening follow-up help for Year 3 Primary teachers | Zaza Draft
scenario/primary/behaviour/year-4 - Behaviour email help for Year 4 Primary teachers | Zaza Draft
scenario/primary/missing-homework/year-4 - Missing homework email help for Year 4 Primary teachers | Zaza Draft
scenario/primary/angry-parent/year-4 - Angry parent email reply help for Year 4 Primary teachers | Zaza Draft
scenario/primary/sen-support/year-4 - SEN support email help for Year 4 Primary teachers | Zaza Draft
scenario/primary/low-attainment/year-4 - Low attainment message help for Year 4 Primary teachers | Zaza Draft
scenario/primary/anxiety/year-4 - Anxiety-sensitive email help for Year 4 Primary teachers | Zaza Draft
scenario/primary/grade-complaint/year-4 - Grade complaint reply help for Year 4 Primary teachers | Zaza Draft
scenario/primary/disorganisation/year-4 - Disorganisation message help for Year 4 Primary teachers | Zaza Draft
scenario/primary/parents-evening/year-4 - Parents' evening follow-up help for Year 4 Primary teachers | Zaza Draft
scenario/primary/behaviour/year-5 - Behaviour email help for Year 5 Primary teachers | Zaza Draft
scenario/primary/missing-homework/year-5 - Missing homework email help for Year 5 Primary teachers | Zaza Draft
scenario/primary/angry-parent/year-5 - Angry parent email reply help for Year 5 Primary teachers | Zaza Draft
scenario/primary/sen-support/year-5 - SEN support email help for Year 5 Primary teachers | Zaza Draft
scenario/primary/low-attainment/year-5 - Low attainment message help for Year 5 Primary teachers | Zaza Draft
scenario/primary/anxiety/year-5 - Anxiety-sensitive email help for Year 5 Primary teachers | Zaza Draft
scenario/primary/grade-complaint/year-5 - Grade complaint reply help for Year 5 Primary teachers | Zaza Draft
scenario/primary/disorganisation/year-5 - Disorganisation message help for Year 5 Primary teachers | Zaza Draft
scenario/primary/parents-evening/year-5 - Parents' evening follow-up help for Year 5 Primary teachers | Zaza Draft
scenario/primary/behaviour/year-6 - Behaviour email help for Year 6 Primary teachers | Zaza Draft
scenario/primary/missing-homework/year-6 - Missing homework email help for Year 6 Primary teachers | Zaza Draft
scenario/primary/angry-parent/year-6 - Angry parent email reply help for Year 6 Primary teachers | Zaza Draft
scenario/primary/sen-support/year-6 - SEN support email help for Year 6 Primary teachers | Zaza Draft
scenario/primary/low-attainment/year-6 - Low attainment message help for Year 6 Primary teachers | Zaza Draft
```

## UK Cluster Pages

The UK-specific cluster expansion lives in:

- `lib/uk-matrix.ts`
- `components/UkClusterPage.tsx`
- `app/uk/parents-evening-email-templates/[phase]/page.tsx`
- `app/uk/ofsted-friendly-report-comments/[subject]/page.tsx`
- `app/uk/behaviour-letter-home/[year-group]/page.tsx`
- `app/uk/sen-report-comments/[need]/page.tsx`

What the UK matrix covers:

- Parents' evening email templates by phase
- Ofsted-friendly report comments by subject
- Behaviour letters home by year group
- SEN report comments by need

How to add or update UK pages:

1. Add or update the slug arrays in `lib/uk-matrix.ts`.
2. Adjust the relevant page builder in `lib/uk-matrix.ts` so the title, H1, meta description, hero copy, examples, and FAQ stay aligned.
3. Keep the target keyword in the title, H1, first body section, at least one H2, and the meta description.
4. Check that internal links still point to live UK or core pages.

Quality checks for UK pages:

1. Keep British spelling throughout, including behaviour, personalised, organisation, and parents' evening.
2. Treat "Ofsted-friendly" as a tone and evidence standard, not as a claim of approval.
3. Keep GDPR-aware language and avoid unnecessary pupil detail in examples.
4. Preserve the teacher-first positioning. Zaza Draft supports drafting, but teachers still edit and approve every word.
5. Keep SEN wording person-centred and avoid diagnostic overreach.

Mirroring `/de/` logic later:

- Keep the route families the same and mirror the data-builder pattern rather than forking the component tree.
- Reuse `components/UkClusterPage.tsx` only if the design stays shared. Put translated copy dictionaries and region-specific compliance notes in a separate matrix file.
- Keep locale-specific schema copy, keywords, and trust text close to the matrix layer so UK and German variants can diverge safely without changing route logic.
- `app/sitemap.ts` now imports `getUkClusterSitemapEntries()` so new UK matrix pages are included automatically once they are added to `lib/uk-matrix.ts`.

## Expanded Blog Landings

The blog-to-landing expansion flow lives in:

- `scripts/expand-from-blog.ts`
- `lib/expanded-pages.ts`
- `components/ExpandedBlogLandingPage.tsx`
- `app/expanded/[slug]/[variant]/page.tsx`

What it does:

- Reads the current English blog inventory through `lib/cms/posts.ts`
- Detects qualifying seed posts around parent communication, report comments, safe AI, and workload reduction
- Generates nested markdown pages in `expanded-pages/<blog-slug>/<variant>.md`
- Writes a manifest to `expanded-pages/_meta/manifest.json`
- Writes the current first 50 generated slugs to `expanded-pages/_meta/first-50.txt`

How to run it:

1. Run `pnpm exec tsx scripts/expand-from-blog.ts --clean` to rebuild the current expanded landing set from scratch.
2. Add `--dry-run` if you want to inspect the planned output without writing files.
3. Add `--print-first-50` if you want the first 50 generated slugs echoed in the terminal.

Current expansion output:

- `39` qualifying English blog seeds
- `436` generated `/expanded/[slug]/[variant]` pages
- generated word-count range: `1365` to `1428`

Sitemap integration:

- `app/sitemap.ts` now imports `getExpandedPageSitemapEntries()` from `lib/expanded-pages.ts`.
- No manual sitemap editing is needed after generation. Once markdown files exist in `expanded-pages/`, the `/expanded/...` URLs are included automatically.

Quality checks for expanded landings:

1. Keep each page above `900` words. The current generator writes pages in the `1365-1428` range.
2. Keep the seed keyword and variant keyword in the title, H1, hero copy, and meta description.
3. Link back to both the source blog post and the relevant hub page.
4. Keep the tone teacher-first, calm, and conservative. Do not let the expanded pages drift into broad AI-platform language.
5. Keep the examples editable and low-risk. Teachers still review and approve every final word.

First 50 generated slugs:

- Stored in `expanded-pages/_meta/first-50.txt`
- Full page manifest is in `expanded-pages/_meta/manifest.json`

## Technical Multipliers

Shared helpers:

- `lib/seo-helpers.ts` now provides `PROGRAMMATIC_ISR_SECONDS`, `canonicalPath()`, `buildProgrammaticMetadata()`, and `buildProgrammaticNotFoundMetadata()`.
- Use these helpers for dynamic and matrix-driven pages so canonicals, metadata shape, and weekly ISR stay consistent across scenario, comparison, diagnosis, UK, and expanded routes.

Example `page.tsx` pattern:

```tsx
import { StructuredData } from "@/components/StructuredData";
import { buildProgrammaticMetadata } from "@/lib/seo-helpers";

export const revalidate = 604800;

export const metadata = buildProgrammaticMetadata({
  title:
    "Parent Email and Report Problem Diagnosis - Teacher Help | Zaza Draft",
  description:
    "Diagnose your parent email, report comment, behaviour, or tone problem and get calmer Zaza Draft recommendations built for teachers.",
  path: "/diagnosis",
  keywords: [
    "parent email diagnosis for teachers",
    "report comment diagnosis",
    "teacher communication help",
  ],
});

export default function ExamplePage() {
  return (
    <>
      <StructuredData
        type="HowTo"
        data={{
          id: "example-howto-jsonld",
          path: "/diagnosis",
          title: "How to use the diagnosis tool",
          description:
            "Describe the issue, review matched pages, and draft calmly with teacher control.",
          steps: [
            { name: "Describe the issue", text: "Choose the closest inputs." },
            { name: "Review matched pages", text: "Open the best-fit result." },
          ],
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          id: "example-faq-jsonld",
          path: "/diagnosis",
          title: "Diagnosis FAQ",
          description: "Common questions about using the diagnosis flow.",
          faqs: [
            {
              question: "Is this still teacher-controlled?",
              answer: "Yes. Teachers review and approve every final word.",
            },
          ],
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          id: "example-breadcrumb-jsonld",
          path: "/diagnosis",
          title: "Diagnosis",
          description: "Parent communication and report diagnosis",
          breadcrumbs: {
            "/diagnosis": "Diagnosis",
          },
        }}
      />
    </>
  );
}
```

ISR and on-demand revalidation:

- Programmatic routes use `export const revalidate = 604800`.
- Keep the weekly interval documented in `lib/seo-helpers.ts`, but note that Next.js route config exports must stay as literals, not imported constants.
- On-demand revalidation runs through `app/api/revalidate-programmatic/route.ts`.
- By default, that route now revalidates the core dynamic hubs and path families as well as the original programmatic seeds.
- You can `POST` to `/api/revalidate-programmatic?secret=YOUR_SECRET` with:
  - `{ "paths": ["/diagnosis", "/alternatives/chatgpt/parent-emails"] }`
  - `{ "paths": ["/uk/ofsted-friendly-report-comments/english"], "includeDefaults": false }`

Validation steps after changing programmatic routes:

1. Run `pnpm run typecheck`.
2. Run `pnpm run lint`.
3. Run `pnpm run build`.
4. Spot-check canonical output in page metadata for one route in each family.
5. Spot-check JSON-LD coverage so each new route still has `HowTo`, `FAQPage`, and `BreadcrumbList` where expected.
6. If diagnosis tracking changed, verify GA4 events in the browser for `diagnosis_page_viewed`, `diagnosis_completed`, `diagnosis_recommendation_clicked`, and `diagnosis_cta_clicked`.

## Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text on images
- Color contrast meets WCAG AA standards

## Support

For questions or issues:

- Email: support@zazadraft.com
- Documentation: This README

## License

© Zaza Technologies. All rights reserved.
