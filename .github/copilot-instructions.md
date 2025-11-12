## Zaza Draft Ã¢â‚¬â€ AI Agent Instructions (concise)

This file tells an automated coding agent how this repo is structured and the exact, discoverable conventions to follow.

1. Quick facts

- Tech: Next.js 15 (App Router), TypeScript, Tailwind v4, React 19
- Dev commands (found in `package.json`):
  - `npm run dev` Ã¢â‚¬â€ start dev server (http://localhost:3000)
  - `npm run build` Ã¢â‚¬â€ production build
  - `npm run start` Ã¢â‚¬â€ start built app
  - `npm run typecheck` Ã¢â‚¬â€ `tsc --noEmit`
  - `npm run lint` Ã¢â‚¬â€ `next lint`
  - `npm run validate-posts` Ã¢â‚¬â€ `tsx src/data/validate-posts.ts` (content checker)

2. Big-picture architecture (what to know)

- Pages live under `app/` (Next 15 App Router). Use server and client components per file's "use client" pragma.
- Blog and content: `lib/cms/posts.ts` dynamically loads `./posts-data` and falls back to `fallback-posts` Ã¢â‚¬â€ edits should target the source posts file (see `src/data/posts-data.tsx` / `src/data` in older docs).
- Translations: centralized in `lib/i18n/language-context.tsx` Ã¢â‚¬â€ keys are flat strings (e.g. `nav.home`, `hero.headline`). Modify here to add languages or keys.
- UI: `components/` contains reusable shadcn-style primitives; shared primitives are under `components/ui/`.
- Forms & integrations: signup uses `app/actions/signup.ts` which calls Brevo when env vars are present. If env vars missing, the code returns a mocked success.

3. Content & formatting rules (strict, enforceable)

- Blog content must use `String.raw` for `content` and `contentDe` to avoid template-literal issues.
- Allowed HTML tags inside post content: `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<strong>` only. No inline styles or classes.
- Special HTML comment markers are meaningful and consumed by UI: `<!-- CALLOUT:* -->`, `<!-- PULL_QUOTE -->`, `<!-- EXAMPLE -->`, `<!-- TEMPLATE -->`.
- Image paths must use `/images/...` only.
- EN and DE variants must be structurally aligned when both exist.

4. Safe edits policy (must-follow)

- Do not add new npm dependencies without human approval.
- Do not change build or routing config (next.config.mjs, tsconfig.json) unless asked.
- When updating posts, keep the objects as plain literals and maintain `String.raw` usage.

5. Useful file references and examples

- Add/edit translations: `lib/i18n/language-context.tsx` (many example keys inside `translationsEn`).
- Blog loader and helpers: `lib/cms/posts.ts` (imports `posts-data`, `fallback-posts`, merges inbox posts).
- Content validation: `src/data/validate-posts.ts` (run `npm run validate-posts`).
- Signup form server action: `app/actions/signup.ts` (reads `NEXT_PUBLIC_BREVO_API_KEY` and `NEXT_PUBLIC_BREVO_ENDPOINT`).

6. Common tasks for an agent (explicit)

- Add a new blog post: append a BlogPost object to the canonical posts file (follow existing data shape and `String.raw`). Run `npm run validate-posts`.
- Update translations: add keys to `lib/i18n/language-context.tsx`, mirror structure for DE when applicable.
- Wire a new resource: drop `.docx` into `public/downloads/` and update `lib/cms/resources.ts` metadata.

7. Developer workflow notes

- Local dev: `npm install` then `npm run dev`.
- If Brevo env vars are absent, the signup action simulates success Ã¢â‚¬â€ tests and dev flows will still work.
- Run `npm run typecheck` and `npm run lint` after code changes.

8. Tone & guardrails for generated copy

- Voice: clear-but-kind, teacher-focused, avoid corporate jargon. Protect student privacy Ã¢â‚¬â€ never include PHI/PII in examples.

If anything here is unclear or you'd like more examples (e.g., exact BlogPost object example, or how callout markers render), tell me which section to expand and I'll iterate.
