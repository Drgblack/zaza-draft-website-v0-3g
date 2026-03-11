# Parent Communication and Report Diagnosis

## What this adds

- Canonical route: `/diagnosis`
- Alias route: `/communication-diagnosis`
- Prefill redirects for common long-tail queries
- Client-side diagnosis tool that maps teacher inputs to the most relevant Zaza Draft pages
- FAQ, HowTo, Article, and Breadcrumb JSON-LD via `StructuredData`

## Main files

- `app/diagnosis/page.tsx`
- `components/CommunicationDiagnosis.tsx`
- `components/DiagnosisResultCard.tsx`
- `lib/diagnosis-rules.ts`

## How the rule engine works

The tool uses a small client-safe rule engine in `lib/diagnosis-rules.ts`.

Each rule contains:

- `id`: stable identifier for maintenance
- `priority`: base score
- `matches`: predicate against the form input and lower-cased free text
- `recommendations`: recommendation keys plus "why this fits" bullets

The `diagnose()` function:

1. normalises the raw form values
2. evaluates every rule
3. scores matching recommendations
4. merges "why this fits" reasons
5. appends broad fallbacks if the input is sparse
6. returns the top 6 recommendations

## How to add a new rule

1. Add a new recommendation entry to `recommendationLibrary` if the page is new.
2. Add a new rule object to `diagnosisRules`.
3. Keep the reasons concrete. Prefer short bullets such as "Direct fit for KS2 report wording" over vague explanations.
4. If the route is a new long-tail redirect, add a small redirect page under `app/` and add it to `app/sitemap.ts`.

Example rule shape:

```ts
{
  id: "new-rule-id",
  priority: 90,
  matches: (input, freeText) =>
    hasIssue(input, "report-writing-stress") && textHas(freeText, "parents' evening"),
  recommendations: [
    {
      key: "report-builder-hub",
      why: ["Useful when report stress overlaps with another school communication pressure"],
    },
  ],
}
```

## How to test

Run:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

Manual checks:

1. Open `/diagnosis`.
2. Submit an angry parent combination and confirm the first result is the angry-parent guide.
3. Open `/how-to-reply-angry-parent` and confirm it redirects to `/diagnosis?issue=angry-parent-email&tone=de-escalate`.
4. Check `/sitemap.xml` includes `/diagnosis` and the redirect helper routes.
5. Confirm result-card clicks emit analytics events in the browser session.

## Structured data

`app/diagnosis/page.tsx` already renders:

- `Article`
- `FAQPage`
- `HowTo`
- `BreadcrumbList`

If you expand the page:

- keep FAQ answers factual and teacher-safe
- keep HowTo steps task-based, not promotional
- use the canonical `/diagnosis` path for JSON-LD

## Expansion ideas

- Add subject-specific diagnosis rules once more report-comment combinations are published.
- Add a server action or API endpoint later if you want to persist anonymised diagnosis trends.
- Add locale-aware diagnosis variants if the UK and Germany experiences need to diverge.
