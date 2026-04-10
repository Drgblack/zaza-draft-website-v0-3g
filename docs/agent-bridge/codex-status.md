# Codex Status Log

## Latest update

Date: 2026-04-10
Task title: TASK-008 - Why not just use ChatGPT? differentiation pass

### Outcome

- completed

### What changed

- added a new explicit comparison section to `/start` above pricing and below the core value explanation
- added an earlier objection-handling block on the homepage with the headline `Why not just use ChatGPT?`
- strengthened the homepage comparison table so it reads as a real decision aid around teacher-specific communication, escalation-aware wording, prompt-free use, recognisable voice, and final teacher control
- added a concise bridge line near CTA zones on both `/start` and the homepage final CTA
- mirrored the new `/start` comparison copy for the German locale so the funnel structure stays consistent

### Files changed

- `app/funnel/JessicaReedFunnel.tsx`
- `app/funnel/components/ComparisonSection.tsx`
- `app/funnel/components/FinalCTASection.tsx`
- `app/funnel/content.ts`
- `app/home-client.tsx`
- `lib/i18n/language-context.tsx`
- `docs/agent-bridge/codex-status.md`

### Not implemented

- no pricing changes
- no route changes
- no new product logic

### Blockers

- the first build attempt timed out with an `EPIPE` during output, but a second run completed successfully

### Notes for Greg

- the homepage objection answer now appears much earlier, rather than being buried in the lower comparison section
- the `/start` change uses a new reusable comparison section component so future copy updates stay isolated

### Suggested next step

- review `/` and `/start` in the browser, then decide whether to commit and push this task
