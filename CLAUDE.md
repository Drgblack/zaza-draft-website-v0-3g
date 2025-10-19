# CLAUDE.md — Zaza Draft Monorepo Brief

## Purpose
This repo hosts **Zaza Draft – Marketing Website** (Next.js 15, App Router, Tailwind v4).
Primary goals:
- Ship blog content and product pages.
- Keep posts safe and stable across EN/DE with strict content formatting.
- Ship resources content as MS Word .docx files.
- Keep resources safe and stable across EN/DE with strict content formatting.
- Zero breakage from template literals or unusual characters.

## Product ecosystem (context for tone & copy)
- **Zaza Draft**: teacher-facing AI writing assistant for parent emails, report comments, grading blurbs, IEP/504 recaps.
- **Zaza Teach**: lesson/units planning with success criteria, exit tickets, and pipelines to comments/newsletters.
- **GradeFlow**: rubric-linked feedback, Glow–Grow–Go comments, batch comment tiles.
- **Shield**: privacy & safety guardrails, role-based access, templates that avoid student PHI/PII in non-district tools.

When generating code or copy, protect teacher time and student privacy. Tone: clear-but-kind, professional, no corporate jargon.

## Blog content rules (critical)
- **We store posts in**: src/data/posts-data.tsx
- **Type**: BlogPost = { id, title, slug, excerpt, content, contentDe?, publishedAt, tags }
- **Use** String.raw\\` for content and contentDe to avoid breaking on ${...} or backslashes.
- **HTML only** inside content: <h2> <h3> <p> <ul> <ol> <strong> and the special HTML comments:
  <!-- CALLOUT:QUICK_WIN -->, <!-- CALLOUT:CLASSROOM -->, <!-- CALLOUT:TIME_SAVER -->, <!-- CALLOUT:TEMPLATE -->, <!-- PULL_QUOTE -->, <!-- EXAMPLE -->
- **No inline styles or classes.** Close tags. Replace em dashes with hyphens. Encode special chars.
- **Images**: use **/images/...** only (never blob: or *.vusercontent.net).
- **Length target**: ~1500 words per post unless the title specifies otherwise.
- **Delivery format for new posts**: a single BlogPost object literal (no exports/wrappers).

## Editing constraints for Claude
- Do not add new npm deps without approval.
- Do not modify build config unless asked.
- Do not move posts out of src/data/posts-data.tsx.
- Maintain EN & DE parity when the post includes both.

## Where things are
- Pages: /app
- Blog index & details: /app/(marketing)/blog/*
- Data: src/data/posts-data.tsx
- Components: components/*
- Translations: i18n/*

## Pipelines we rely on
- One Plan → Comments → Parent Email → Newsletter line → 5-Field Note (documents/templates described in posts).
- Posts are rendered with design-system wrappers that consume the HTML comment markers above.

## Claude tasks you may perform
- Add a post: append a **single BlogPost object** to src/data/posts-data.tsx.
- Fix formatting: ensure String.raw, headings, callout markers, and image paths correctness.
- Create/adjust copy with teacher voice (clear, calm, practical).
- Never place identifying student health info in examples.

## Test & ship
- Local: pnpm dev  → http://localhost:3000
- Type/lint: pnpm typecheck and pnpm lint
- Commit to a feature branch and open PR; Vercel previews on PR branches.

