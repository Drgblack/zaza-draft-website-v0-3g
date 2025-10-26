# Codex Update — Deploy status & audits next steps

**Timestamp:** 2025-10-25

## Deployment Status
- PR #1 (DE Glossary): Vercel preview is deploying; I will ping when Ready.
- PR #3 (Contact i18n fix): Vercel preview is deploying; I will ping when Ready.
- PR #2 (DE follow-up): Draft PR opened to queue lang="de", DE JSON-LD parity, and dataset expansion.
- PR #4 (Audit tooling): Open; audit workflow (i18n/link/content) added and running on PRs.

## What to do next
1) PR #3 — Verify Contact preview in EN/DE (including `?topic=shield`) and merge.
2) PR #1 — Verify `/de/glossary` and a sample term for UI + metadata, then merge.
3) PR #4 — Confirm audit scripts/workflow and merge to enable CI artifacts on future PRs.
4) Flip CI to strict after merge: remove soft-fail (`|| true`) in `.github/workflows/audit.yml` and run `pnpm audit:i18n --strict`, plus `pnpm audit:links` and `pnpm audit:content` without soft-fail.
5) Centralise `ct()` usage: replace page-local fallbacks with a shared helper; resolve raw-key renderings reported in `i18n-issues.csv`.
6) DE coverage: for low-risk strings auto-fill EN→DE and append `NEEDS NATIVE REVIEW`; leave critical/legal text as placeholders flagged `REQUIRES REVIEW`.
7) Link anchors: add missing `id` targets or adjust `href`s for rows in `link-issues.csv`.
8) Optional: add an external link allowlist to `audit-links.ts` if external noise is high; keep reporting but don’t fail CI for those domains.

## Artifacts
- docs/audits/i18n-issues.csv
- docs/audits/link-issues.csv
- docs/audits/content-gaps.csv

## Notes
- Playwright smoke test (`tests/i18n.spec.ts`) guards against visible raw keys on key routes (EN/DE).
- `locales/en.json` and `locales/de.json` snapshots are generated from the current language context by `audit-i18n.ts`.
- Reproduce locally:
  - `pnpm build && pnpm start`
  - `pnpm audit:all`

