## Follow‑up: German Glossary Enhancements

Scope: Complete the deferred items after initial DE routes verification.

Deliverables
- Set `lang="de"` for `/de/*`
  - Add a route-level layout or inject page-level `lang` where appropriate.
  - Verify `<html lang="de">` on `/de/glossary` and `/de/glossary/[slug]`.

- DefinedTermSet JSON-LD (DE)
  - Add DefinedTermSet JSON-LD to `/de/glossary` mirroring EN structure.
  - Ensure term detail structured data remains valid (optional this pass).

- German dataset expansion or CMS
  - Expand term translations (term, definition, example) for key categories, or
  - Integrate a CMS-backed translation source with a safe fallback to EN.

Verification Checklist
- [ ] `/de/glossary` renders with `<html lang="de">`.
- [ ] `/de/glossary/[slug]` renders with `<html lang="de">`.
- [ ] Breadcrumb JSON-LD still present and valid on DE routes.
- [ ] DefinedTermSet JSON-LD present on `/de/glossary` (German).
- [ ] No console errors in production preview.
- [ ] Performance unaffected; static output intact with trailing slashes.

Notes
- Keep canonical links and alternates consistent with EN/DE.
- Maintain fallback behavior: if a term lacks a DE translation, show EN content but keep DE UI.

