# Agent Bridge Rules

This folder is the handoff surface between OpenClaw and Codex.

## Roles

- OpenClaw: strategist, prioritiser, copy/CTA logic, implementation briefs
- Codex: builder, code changes, UI implementation, status reporting
- Greg: supervisor and final decision-maker

## Core rule

OpenClaw does not redesign systems unless explicitly instructed.
Codex implements only what is specified in the latest approved brief.

## Files

- `openclaw-to-codex.md` = current implementation queue
- `codex-status.md` = implementation log and blockers

## Brief requirements

Every OpenClaw brief should include:

1. objective
2. scope
3. exact copy
4. CTA hierarchy
5. layout/order rules
6. constraints
7. acceptance criteria

## Codex response requirements

For each completed task, Codex must record:

1. what was changed
2. files changed
3. anything not implemented
4. blockers/questions
5. suggested next step

## Guardrails

- no new routes unless explicitly requested
- no pricing/auth/product-logic changes unless explicitly requested
- preserve analytics/tracking where already wired
- prefer reuse of existing components
