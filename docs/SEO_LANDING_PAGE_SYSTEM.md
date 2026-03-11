# Zaza Draft SEO Landing Page System

## A. Recommended folder and file structure

```text
app/
  [slug]/
    page.tsx

components/
  seo/
    teacher-writing-landing-page.tsx

lib/
  seo/
    teacher-writing-pages.ts
    teacher-writing-schema.ts

docs/
  SEO_LANDING_PAGE_SYSTEM.md
```

Notes:

- `app/[slug]/page.tsx` is a static whitelist route, not an open catch-all.
- `lib/seo/teacher-writing-pages.ts` is the canonical source for all 10 pages:
  title tag, meta description, H1, hero copy, section copy, CTAs, FAQ, internal linking, comparison blocks, trust blocks, related pages, and testimonial placeholders.
- `components/seo/teacher-writing-landing-page.tsx` renders the shared premium layout.
- `lib/seo/teacher-writing-schema.ts` keeps metadata and JSON-LD aligned with the content source.

## B. Canonical page copy source

The full production page copy for all 10 pages lives in:

- `lib/seo/teacher-writing-pages.ts`

This is the source the site now renders directly, so it is more reliable than keeping a second markdown-only version that could drift.

## C. Reusable page template component structure

```tsx
TeacherWritingLandingPage
  Hero
    Intent badge
    H1
    Hero paragraphs
    Trust bullets
    Primary and secondary CTA
  FeaturedSnippetAnswer (how-to pages only)
  TrustBlock
  SectionCard[]
  ComparisonTable (where relevant)
  InternalLinksBlock
  FAQBlock
  RelatedPagesBlock
  CTASection
  JSON-LD script tags
```

Implementation notes:

- Keep the layout server-rendered.
- Keep the page body data-driven from `teacher-writing-pages.ts`.
- Use the same component for tool, comparison, how-to, and template intent pages.

## D. JSON-LD mapping by page type

Tool intent pages:

- `WebPage`
- `BreadcrumbList`
- `SoftwareApplication`
- `FAQPage`

Alternative and comparison pages:

- `WebPage`
- `BreadcrumbList`
- `Article`
- `FAQPage`

How-to and problem pages:

- `WebPage`
- `BreadcrumbList`
- `Article`
- `FAQPage`

Template pages:

- `WebPage`
- `BreadcrumbList`
- `Article`
- `FAQPage`

Code location:

- `lib/seo/teacher-writing-schema.ts`

## E. Recommended internal-linking hub strategy

Primary cluster:

- Parent communication cluster
- Report writing cluster
- Competitor comparison cluster

Parent communication cluster:

- `/ai-parent-email-generator-for-teachers`
- `/teacher-email-writer`
- `/parent-email-template-for-teachers`
- `/how-to-write-a-parent-complaint-email`
- `/how-to-respond-to-an-angry-parent-email`

Report writing cluster:

- `/report-comment-generator-for-teachers`
- `/report-card-comment-generator`
- `/ai-report-writing-for-teachers`

Competitor comparison cluster:

- `/alternative-to-magicschool-ai`
- `/alternative-to-teachmate-ai`

Hub behaviour:

- Link laterally within the same cluster from body copy and related-page cards.
- Link upward from all 10 pages to `/products/draft`, `/early-access`, and relevant existing Zaza support pages.
- Use the comparison pages as commercial bridges into the tool pages.
- Use the how-to pages as featured-snippet entry points that feed into the parent communication tool pages.
- Use the template page as a mid-funnel bridge between informational traffic and tool intent.

## F. 25 additional long-tail keywords to build next

1. best ai parent email generator for teachers
2. parent communication ai for schools
3. teacher parent email examples
4. behaviour concern email to parent template
5. positive parent email examples for teachers
6. follow up email after parent meeting
7. difficult parent email response examples
8. ai email writer for school staff
9. teacher progress report comments examples
10. end of term report comments generator
11. personalised report card comments ai
12. primary school report comment generator
13. secondary school report writing ai
14. ks2 report comment generator
15. eyfs report comments ai
16. parent complaint response template school
17. how to email parents about behaviour concerns
18. how to write a difficult parent email
19. school safe ai writing tool for teachers
20. teacher writing assistant for reports
21. alternative to chatgpt for teacher emails
22. alternative to grammarly for teachers
23. ai tool for report comments and parent emails
24. teacher co-writer for school communication
25. professional parent email phrasing for teachers
