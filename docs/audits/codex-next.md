# Codex Next Actions — Checklist with Preview URLs

**Timestamp:** 2025-10-26

Please proceed to post a brief checklist comment on each PR when Vercel previews flip to Ready, including the direct preview URL(s).

## PR #3 — Contact i18n Fix
- [ ] Open preview (EN) and confirm all labels render (no raw keys); test `?topic=shield`
- [ ] Switch to DE and confirm labels/fallbacks; test `?topic=shield`
- [ ] Screenshot any regressions; otherwise ✅ ready to merge

## PR #1 — German Glossary
- [ ] Verify routes load (list + detail)
- [ ] SEO/metadata present (title/description/lang="de")
- [ ] JSON-LD parity (DE where applicable)
- [ ] Visual QA (no EN bleed-through; navigation OK)

## PR #4 — Audit Tooling
- [ ] Artifacts generated: `i18n-issues.csv`, `link-issues.csv`, `content-gaps.csv`
- [ ] Workflow runs as expected on PR
- [ ] After #3 and #1 merge: flip CI to strict (`audit:i18n --strict`, `audit:links`, `audit:content`)
- [ ] Begin centralising `ct()` usage; cautious EN→DE autofill; flag legal as **REQUIRES REVIEW**

