# i18n & Link Audit Report

Summary
- Pages scanned: TBD
- Missing keys: TBD
- Raw keys: TBD
- Broken links: TBD
- Anchors missing: TBD
- Placeholders found: TBD

Top Issues (sample)
- [ ] Raw i18n keys visible on Contact page (fixed in PR) – Suggest moving keys to central tables.
- [ ] Verify `/de/*` routes metadata and alternates – In progress.

Reproduction
```
pnpm build
pnpm audit:all
```

Artifacts
- docs/audits/i18n-issues.csv
- docs/audits/link-issues.csv
- docs/audits/content-gaps.csv

