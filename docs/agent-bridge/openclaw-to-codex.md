# OpenClaw -> Codex Queue

## Rules
- Only one task can be `ACTIVE`
- All new tasks are added as `QUEUED`
- Tasks must not be overwritten
- Tasks must include full implementation instructions
- Greg controls which task becomes ACTIVE

---

## Queue status
- No active tasks yet.
- Next task ID: TASK-001


---

## TASK-001
Status: QUEUED
Type: messaging alignment
Priority: HIGH

### Title
Homepage and schools page trust-calibration optimisation

### Objective
Apply the approved homepage and schools-page copy refinements to improve clarity, trust, and conversion without redesigning layouts or changing product scope.

### Scope
Homepage:
- hero headline line break
- hero support line
- recognition line directly under hero
- calm writing support section support line
- before/after section hook line

Schools page:
- keep existing hero unchanged
- add one reassurance line in the package or rollout section
- add one escalation-prevention line in an existing visible support section
- ensure the FAQ covers the required points and add only missing entries if needed

### Exact copy

#### Homepage hero headline
Use exactly this two-line phrasing:

Write parent emails and school messages
without second-guessing how they’ll be interpreted

#### Homepage hero support line
Replace the current hero support paragraph with exactly:

Zaza helps teachers write clear, calm messages in moments that feel uncertain - before wording, tone, or timing turn a situation into something bigger.

#### Homepage recognition line under hero
Add exactly this line directly under the hero:

The message that takes the longest is usually the one that matters most.

#### Homepage calm writing support section
Keep the existing section heading:

Calm writing support for high-stakes school communication

Add exactly this line directly under that heading:

Especially when you are not sure how a message will land.

#### Homepage before/after section
Add exactly this line directly above the before/after example block:

This is the kind of message teachers hesitate over.

#### Schools page hero
Keep this hero line unchanged:

A safer way for schools to handle high-stakes parent communication

#### Schools page package or rollout section
Add exactly this line within the package or rollout section:

Schools gain a clearer, more consistent communication approach across staff, without adding oversight pressure.

#### Schools page visible support section
Add exactly this line in an existing visible supporting section:

Most escalation starts with a message that could have been phrased differently.

#### Schools page FAQ
Ensure the FAQ clearly includes all of the following points:
- teachers stay in control
- Zaza does not replace judgement
- it is not surveillance
- how rollout works

If any one of these is missing, add concise FAQ entries only for the missing point or points.

### CTA hierarchy
Do not change CTA structure or CTA order in this task.

### Layout/order instructions
- Keep the homepage layout unchanged except for the copy edits listed above
- Apply the new two-line hero headline exactly as written
- Place the new recognition line directly below the homepage hero area
- Place the new calm-writing support line directly below the existing section heading
- Place the before/after hook directly above the before/after example block
- Keep the schools page hero unchanged
- Place the oversight-pressure reassurance line inside the existing package or rollout section, not as a new feature block
- Place the escalation-prevention line in an existing visible supporting section, not as a standalone new module
- Use the existing FAQ section and only add missing FAQ entries if needed

### Constraints
- No redesign
- No dashboard or analytics feature additions
- No new product features
- No route changes
- No auth, billing, pricing, analytics architecture, or product logic changes
- Do not weaken or rewrite the existing schools hero
- Keep this task limited to copy and messaging alignment

### Acceptance criteria
- Homepage hero uses the exact new two-line phrasing with they’ll
- Homepage hero support line is replaced with the exact approved sentence
- Homepage includes the new recognition line directly under the hero
- Homepage calm writing support section includes the new support line
- Homepage before/after section includes the hesitation hook directly above the example
- Schools hero remains unchanged
- Schools page includes the oversight-pressure reassurance line in the package or rollout section
- Schools page includes the escalation-prevention line in a visible supporting section
- Schools FAQ clearly covers teacher control, judgement, non-surveillance, and rollout
- No redesign, dashboard, feature expansion, or logic changes are introduced


---

## TASK-002
Status: QUEUED
Type: conversion optimisation
Priority: HIGH
Date: 2026-04-08
Requested by: Greg

### Title
Homepage and schools page conversion optimisation pass

### Objective
Apply the approved homepage and schools-page copy refinements to improve trust and conversion while preserving the current layout, routes, analytics, and product scope.

### Scope
Target repository: homepage and schools page in the existing website app.

Implement copy updates in the existing components/sections that render:
- homepage hero headline
- homepage hero support line
- homepage recognition line under hero
- homepage calm writing support section
- homepage before/after section
- schools page hero
- schools page package or rollout section
- schools page visible support section
- schools page FAQ

Use the existing files/components that currently power those sections. Do not create new routes or new page-level architectures.

### Implementation instructions
Apply the following changes exactly.

#### 1. Homepage hero headline
Replace the current hero headline with this exact two-line copy:

Write parent emails and school messages
without second-guessing how they’ll be interpreted

Requirements:
- keep the two-line break exactly as written above
- use the contraction “they’ll”
- do not add extra punctuation

#### 2. Homepage hero support line
Replace the current hero support paragraph with exactly:

Zaza helps teachers write clear, calm messages in moments that feel uncertain - before wording, tone, or timing turn a situation into something bigger.

Requirements:
- replace the existing paragraph, do not append to it
- keep the dash style exactly as shown

#### 3. Homepage recognition line under hero
Add this exact line directly under the homepage hero support area:

The message that takes the longest is usually the one that matters most.

Requirements:
- place it immediately below the hero support line
- style it as supporting copy within the existing hero area, not as a new banner or callout card

#### 4. Homepage calm writing support section
Find the section with the heading:

Calm writing support for high-stakes school communication

Add this exact line directly below that heading:

Especially when you are not sure how a message will land.

Requirements:
- do not change the existing section heading
- insert this as a single supporting line directly below the heading

#### 5. Homepage before/after section
Add this exact hook line directly above the before/after example block:

This is the kind of message teachers hesitate over.

Requirements:
- place it above the example itself, not below
- keep it as plain supporting copy, not a badge or label

#### 6. Schools page hero
Keep the existing schools hero unchanged:

A safer way for schools to handle high-stakes parent communication

Requirements:
- do not rewrite, shorten, or restyle this hero line

#### 7. Schools page package or rollout section
Within the existing package or rollout section, add this exact sentence:

Schools gain a clearer, more consistent communication approach across staff, without adding oversight pressure.

Requirements:
- place this inside the existing package/rollout content
- do not create a new feature block or separate module for it

#### 8. Schools page support section
Add this exact sentence in an existing visible supporting section on the schools page:

Most escalation starts with a message that could have been phrased differently.

Requirements:
- place this in an existing support section where it will be clearly visible
- do not create a new standalone section just for this line unless absolutely required by the current component structure

#### 9. Schools page FAQ
Check the existing FAQ and ensure it clearly covers all four points below:
- teachers stay in control
- Zaza does not replace judgement
- it is not surveillance
- how rollout works

Requirements:
- if all four are already present, leave the FAQ unchanged
- if any are missing, add concise FAQ entries only for the missing points
- do not expand the FAQ unnecessarily

### Constraints
- preserve existing analytics instrumentation
- no redesign
- no new routes
- no new pages
- no dashboard or analytics feature additions
- no new product features
- no auth, billing, pricing, or product-logic changes
- preserve existing CTA structure and CTA order for this task
- preserve the existing schools hero exactly
- use existing sections/components wherever possible

### Acceptance criteria
Pass only if all of the following are true:

- homepage hero headline matches exactly:
  - Write parent emails and school messages
  - without second-guessing how they’ll be interpreted
- homepage hero support line matches exactly:
  - Zaza helps teachers write clear, calm messages in moments that feel uncertain - before wording, tone, or timing turn a situation into something bigger.
- homepage includes the line “The message that takes the longest is usually the one that matters most.” directly under the hero support area
- calm writing support section includes the exact line “Especially when you are not sure how a message will land.” directly below its heading
- before/after section includes the exact line “This is the kind of message teachers hesitate over.” directly above the example block
- schools page hero remains exactly “A safer way for schools to handle high-stakes parent communication”
- schools page includes the exact sentence “Schools gain a clearer, more consistent communication approach across staff, without adding oversight pressure.” inside the package or rollout section
- schools page includes the exact sentence “Most escalation starts with a message that could have been phrased differently.” in a visible support section
- schools FAQ clearly covers control, judgement, non-surveillance, and rollout
- no redesign, no new routes, and no analytics or product-logic changes were introduced

TEST_WRITE_SUCCESS
