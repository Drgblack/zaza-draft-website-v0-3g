# DE Glossary Follow-up Plan

## 1) lang="de" for /de/*
- Option A: `app/de/layout.tsx` setting `<html lang="de">` and rendering children.
- Option B: Page-level wrapper that sets document lang (less ideal than layout).

## 2) DefinedTermSet JSON-LD (DE)
- Mirror EN schema block in `/de/glossary` page with German strings.
- Validate via Rich Results test.

## 3) Data expansion / CMS
- Start with 30–50 high-traffic terms per category.
- Structure: `{ id, term, definition, example, category }` with DE overrides.
- Consider CMS (e.g., JSON files or headless CMS) with runtime fetch or build-time import.

## Testing
- Local `pnpm build && pnpm start`.
- Verify alternates/canonicals, breadcrumb JSON-LD, and no console errors.
