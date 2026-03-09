# SEO and GEO Measurement Playbook

This playbook is for measuring how organic search, AI overviews, and answer engines contribute to Zaza Draft traffic and trial intent.

Primary goal:
Understand which pain-first pages, comparison pages, and AI referrals are turning into meaningful product interest.

## 1. Google Search Console and GA4 Setup Guide

### Google Search Console

1. Add both properties:
   - `https://zazadraft.com/`
   - Domain property if DNS control is available
2. Submit the sitemap:
   - `https://zazadraft.com/sitemap.xml`
3. Inspect and request indexing for:
   - `/teacher-parent-communication-hub`
   - `/how-to-reply-to-an-angry-parent-email`
   - `/how-to-write-a-behaviour-email-to-parents`
   - `/positive-but-honest-report-card-comments-for-struggling-students`
   - `/roi-calculator`
4. Create regex query filters for:
   - brand: `zaza|zaza draft|zaza draft ai`
   - parent communication: `parent|parents evening|angry parent|behaviour email`
   - report writing: `report comments|report card comments|school reports`
   - safety and AI: `safe ai|hallucination|chatgpt alternative|gdpr`
5. Review weekly:
   - impressions
   - clicks
   - average position
   - pages with rising impressions but weak click-through

### GA4

1. Create a GA4 property for `zazadraft.com`.
2. Add the measurement ID to `.env` as:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Confirm GA4 is loading through [analytics.tsx](/c:/Users/User/zaza-draft-website-v0-3g/components/analytics.tsx) in [layout.tsx](/c:/Users/User/zaza-draft-website-v0-3g/app/layout.tsx).
4. In GA4, mark these as key events once they appear:
   - `trial_start_click`
   - `roi_calculated`
   - `utm_landing_session`
   - `ai_referral_session`
5. Build standard GA4 comparisons for:
   - organic search
   - referral
   - direct
   - AI referrals only
   - X / video campaigns via UTM

### Custom Event Names and Intended Use

| Event                 | Purpose                                                             | Key parameters                                                                           |
| --------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `trial_start_click`   | Measure CTA intent from landing pages and tools                     | `placement`, `cta_variant`, `source_page`                                                |
| `roi_calculated`      | Measure engagement with the ROI calculator                          | `reports_per_week`, `parent_emails_per_week`, `yearly_hours_saved`, `yearly_value_saved` |
| `utm_landing_session` | Track campaign traffic from X, video, newsletter, and partner links | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `landing_path`    |
| `ai_referral_session` | Track visits from ChatGPT, Perplexity, Gemini, Claude, Copilot      | `ai_source`, `referrer_host`, `landing_path`                                             |

### Recommended UTM Structure

Use clean, repeatable naming so GA4 and spreadsheets stay readable.

Examples:

```text
https://zazadraft.com/how-to-reply-to-an-angry-parent-email?utm_source=x&utm_medium=social&utm_campaign=teacher-pain-cluster&utm_content=angry-parent-email

https://zazadraft.com/roi-calculator?utm_source=youtube&utm_medium=video&utm_campaign=roi-demo&utm_content=teacher-roi

https://zazadraft.com/products/draft?utm_source=linkedin&utm_medium=social&utm_campaign=trust-first-launch&utm_content=product-tour
```

Recommended values:

- `utm_source`: `x`, `youtube`, `linkedin`, `newsletter`, `partner-site`
- `utm_medium`: `social`, `video`, `email`, `referral`
- `utm_campaign`: short, evergreen labels such as `teacher-pain-cluster`
- `utm_content`: asset or CTA identifier such as `roi-demo`, `faq-cta`, `video-clip-1`

### AI Referrer Tracking

Implemented referrer detection currently checks:

- ChatGPT
- Perplexity
- Gemini
- Claude
- Copilot

Important limitation:
Some AI overviews do not pass a clean referrer. For those, Search Console impressions and landing-page behaviour still matter more than direct referral counts.

### GA4 Reports to Build First

1. Landing page report filtered to:
   - `/how-to-*`
   - `/teacher-parent-communication-hub`
   - `/roi-calculator`
2. Events report filtered to:
   - `trial_start_click`
   - `roi_calculated`
3. Traffic acquisition report with comparison:
   - session default channel group = Organic Search
   - event name = `trial_start_click`
4. Pages and screens report with comparison:
   - event name contains `trial_start_click`
   - page path includes pain-first landing pages

## 2. Enhanced ROI Calculator Specification

Implemented route:

- [page.tsx](/c:/Users/User/zaza-draft-website-v0-3g/app/roi-calculator/page.tsx)
- [roi-calculator-client.tsx](/c:/Users/User/zaza-draft-website-v0-3g/app/roi-calculator/roi-calculator-client.tsx)

What it now does:

- focuses on report comments and parent emails rather than generic admin hours
- uses GBP and UK school-year assumptions
- tracks `roi_calculated`
- tracks CTA intent after calculation
- publishes `WebPage`, `BreadcrumbList`, and `SoftwareApplication` JSON-LD

Schema note:
The implementation uses `potentialAction` on `WebPage` because that is the supported Schema.org property for an interactive calculator journey.

## 3. A/B Test Plan for CTAs

### Variants

- Variant A: `Start Free Trial`
- Variant B: `Try 5 Free Comments`
- Variant C: `Join Early Access - No Card Needed`

### Placements

- Hero CTA on pain-first landing pages
- End-of-FAQ CTA block
- Resource gate CTA on `/free-resources`
- ROI calculator CTA

### Test Matrix

| Placement      | Primary metric                        | Secondary metric               | Suggested event parameter      |
| -------------- | ------------------------------------- | ------------------------------ | ------------------------------ |
| Hero           | `trial_start_click` rate              | scroll depth, bounce reduction | `placement=hero`               |
| FAQ end        | `trial_start_click` rate              | FAQ engagement before click    | `placement=faq-end`            |
| Resource gate  | email sign-up rate                    | trial click after sign-up      | `placement=resource-gate`      |
| ROI calculator | `trial_start_click` after calculation | `roi_calculated` to CTA rate   | `placement=roi-calculator-cta` |

### Experiment Recommendation

Start with one placement at a time.

Recommended order:

1. Hero CTA on the highest-traffic pain page
2. FAQ-end CTA on the same page
3. ROI calculator CTA
4. Resource gates

### Tooling Options

#### Vercel A/B

Use when:

- you want route-level or edge-based traffic splitting
- you need clean control of variant assignment
- you want stable testing on landing-page headlines and CTA copy

Implementation idea:

- assign a cookie-based variant on first visit
- expose the assigned variant in the CTA event parameter `cta_variant`

#### GA4 Experiments

Use when:

- you want measurement and analysis in one place
- the UI variation is light
- the team is already comfortable reading GA4 reports

Important:
Whichever tool is used, keep the event naming identical so comparison remains clean.

### Winning Criteria

A CTA variant wins if it improves:

1. `trial_start_click` rate
2. landing-page to product-page progression
3. sign-up quality or downstream trial completion

Do not choose winners on click-through alone if the downstream trial quality drops.

## 4. Brand Search Growth Tracker Template

Use [brand-search-growth-tracker-template.csv](/c:/Users/User/zaza-draft-website-v0-3g/docs/brand-search-growth-tracker-template.csv) as the base sheet.

Required columns:

- month
- zaza_draft_volume
- zaza_draft_ai_volume
- brand_impressions
- brand_clicks
- brand_ctr
- avg_brand_position
- non_brand_impressions
- non_brand_clicks
- ai_referral_sessions
- organic_trial_start_clicks
- notes

How to fill it:

- keyword volume can come from your SEO tool of choice
- impressions and clicks come from Search Console brand query filters
- AI referral sessions come from GA4 `ai_referral_session`
- organic trial starts come from GA4 `trial_start_click` filtered to Organic Search

## 5. Dashboard Mockup

Use this as the first reporting dashboard in GA4, Looker Studio, or a spreadsheet summary tab.

### Row 1: Executive KPIs

- Organic sessions
- Non-brand organic clicks
- Trial-start clicks from organic landing pages
- AI referral sessions

### Row 2: Landing Page Performance

Table with:

- landing page
- clicks
- impressions
- average position
- organic sessions
- `trial_start_click` count
- `trial_start_click` rate

Priority pages:

- `/how-to-reply-to-an-angry-parent-email`
- `/how-to-write-a-behaviour-email-to-parents`
- `/positive-but-honest-report-card-comments-for-struggling-students`
- `/teacher-parent-communication-hub`
- `/roi-calculator`

### Row 3: Pain-Keyword Rankings

Table with:

- keyword
- current rank
- previous rank
- landing page
- impressions
- clicks
- notes

Suggested keyword groups:

- angry parent email
- behaviour email to parents
- positive but honest report comments
- safe AI for teacher reports
- AI parent email generator for teachers

### Row 4: Conversion Funnel

Simple funnel:

1. organic landing page session
2. CTA click
3. product page visit
4. trial or early-access start

### Row 5: GEO Signals

Cards or table for:

- AI referral sessions by source
- landing pages most visited from AI sources
- average engagement time for AI referrals
- `trial_start_click` rate from AI referrals

### Row 6: Brand Search Growth

Trend chart for:

- `zaza draft`
- `zaza draft ai`
- branded impressions
- branded clicks

## 6. Recommended Weekly Review Rhythm

Every week:

1. Check Search Console for rising impressions on pain pages.
2. Check GA4 for `trial_start_click` by landing page.
3. Compare AI referral landing pages against organic landing pages.
4. Review whether CTA variant tests are producing better downstream intent.
5. Note changes in the tracker sheet.

Every month:

1. Review brand growth.
2. Refresh underperforming meta titles on pages with good impressions but weak CTR.
3. Decide which landing pages deserve more internal links, more examples, or a stronger CTA.
