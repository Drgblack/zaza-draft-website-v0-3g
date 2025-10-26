# PR Checklist: German Glossary Verification

- Routing
  - [ ] `/de/glossary` returns 200 (both `/de/glossary` and `/de/glossary/`).
  - [ ] Sample term returns 200: `/de/glossary/artificial-intelligence` (and with trailing slash).
  - [ ] Non-existent term shows friendly 404 using `app/not-found.tsx`.

- UI & Content
  - [ ] All visible UI labels on `/de/glossary` are German (badge, title, subtitle, stats, search placeholder, category chips, section headings, CTAs).
  - [ ] Filters work with German labels but still filter correctly across categories.
  - [ ] Term content remains canonical English with partial German coverage for key terms (OK for this phase).

- SEO & Metadata
  - [ ] `/de/glossary` page title/description are German.
  - [ ] `<link rel="canonical">` on `/de/glossary` points to `https://zazadraft.com/de/glossary`.
  - [ ] `<link rel="alternate" hreflang="en" href="https://zazadraft.com/glossary">` present.
  - [ ] `<link rel="alternate" hreflang="de" href="https://zazadraft.com/de/glossary">` present.
  - [ ] Open Graph `og:title`/`og:description` are German on `/de/glossary`.
  - [ ] Term page `/de/glossary/artificial-intelligence` has German OG and correct canonical/alternates.

- Structured Data
  - [ ] Breadcrumb JSON-LD renders on `/de/glossary` and the sample term page (via `BreadcrumbSchema`).
  - [ ] DefinedTermSet/term JSON-LD not required for this phase; note if you want parity with EN later.

- Navigation & Language
  - [ ] On `/de/glossary`, the language toggle doesn’t break or navigate away unexpectedly.
  - [ ] Known limitation: document `<html lang>` is currently `en` (set in `app/layout.tsx`). Confirm acceptable for this phase.
    - Follow-up option: set page-level `lang` or route-specific layout to output `lang="de"` for `/de/*`.

- Analytics
  - [ ] Glossary hub view event still fires; no console errors.

- Visual QA
  - [ ] No English UI strings leak into the DE page.
  - [ ] No broken styles or missing icons.

- Performance/Errors
  - [ ] No client or server console errors on `/de/glossary` or the term page.
  - [ ] Page loads as static with trailing slashes (matches host expectations).

## Spot Checks
- Production URLs:
  - /de/glossary
  - /de/glossary/artificial-intelligence
- View source/head:
  - Confirm canonical and alternates
  - Confirm OG tags
  - Confirm Breadcrumb JSON-LD

## Follow‑ups (post‑verification)
- Add `lang="de"` for DE routes (route-specific layout or dynamic `html` attrs).
- Add DefinedTermSet JSON-LD to `/de/glossary` for schema parity with EN.
- Expand German term dataset or integrate CMS-backed translations.
- Optionally have language toggle navigate across locales (`/glossary` ↔ `/de/glossary`).

