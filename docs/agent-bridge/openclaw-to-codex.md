# OpenClaw -> Codex Queue

## Rules
- Only one task can be `ACTIVE`
- All new tasks are added as `QUEUED`
- Tasks must not be overwritten
- Tasks must include full implementation instructions
- Greg controls which task becomes ACTIVE

---

## Queue status
- Active task.
- Next task ID: TASK-001


---

## TASK-001
Status: ACTIVE
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


---

## TASK-003
Status: QUEUED
Type: new page
Priority: HIGH
Date: 2026-04-08
Requested by: Greg

### Title
7 Parent Emails lead magnet page and PDF deployment

### Objective
Implement the 7 Parent Emails lead magnet in the Vercel/GitHub website repo so the landing page and PDF are deployable through the normal site pipeline.

### Scope
Implement all content and asset wiring needed for:
- landing page route: `/7-parent-emails`
- public PDF asset: `/guides/7-parent-emails-teachers-should-never-send-as-is.pdf`
- CTA wiring from the page to the existing checker/start flow
- static/public linking suitable for the existing Vercel deployment model

Use the existing Next.js/router structure already present in the repo. If the app uses `app/`, place the page in the equivalent `app/7-parent-emails/page.*` location. If it uses `pages/`, place it in the equivalent `pages/7-parent-emails.*` location. For the PDF asset, place the final file in the repo’s public/static asset path so it deploys to `/guides/7-parent-emails-teachers-should-never-send-as-is.pdf`.

### Implementation instructions

#### 1. Add the landing page route
Create the `/7-parent-emails` page in the existing routing system used by the repo. Reuse existing page layout/styles/components where possible. Do not redesign the site.

Use this exact page copy:

##### Hero
Headline:
7 Parent Emails Teachers Should Never Send As-Is

Subheadline:
Free realistic examples for teachers who are tired, frustrated, or emotionally flooded — plus a quick checker to turn risky drafts into calm, professional messages.

Primary CTA button:
Check my draft now

Secondary CTA:
Get the free guide

Support line:
Have a draft in your inbox or notes right now? Paste it in — it's free and takes seconds.

##### Problem section
Some of the hardest messages teachers write are the ones written when they are already tired, frustrated, or emotionally flooded.

It is 10pm.
A parent email lands.
You start writing the version that proves you are right.
Then you realise you cannot send this tonight.

That is the moment this page is for.

##### What’s inside
This free guide includes realistic examples of parent-facing messages teachers often write under pressure, plus safer rewrites that keep the meaning but reduce the risk.

You will see:
- the risky first draft
- a calmer professional version
- a short explanation of what changed

##### Proof insert after first example
If you are reading this and thinking, “I have one like this sitting in drafts right now,” do not stop at examples.

Paste your message into the Parent Email Risk Checker and get a safer, more professional version to work from first.

Button:
Check my draft now

##### Mid-page CTA block
If you already have a draft sitting in your notes, inbox, or head, start there.

The Parent Email Risk Checker gives you a calmer, clearer, more professional version to work from without weakening the message.

Primary button:
Check my draft now

Secondary link:
Get the free guide

##### Closing block
If you recognised yourself in these examples, the problem is usually not that you do not know what to say.

It is that the first version gets written under pressure.

The Parent Email Risk Checker helps you turn that first version into something calmer, clearer, and easier to stand behind professionally.

Primary button:
Check my draft now

Secondary link:
Get the free guide

#### 2. CTA destinations
Use the existing checker/start destination already used on the live site for trying Zaza.
- Primary CTA destination: existing checker/start flow
- Secondary CTA destination: `/guides/7-parent-emails-teachers-should-never-send-as-is.pdf`

Do not invent a new signup flow.

#### 3. Add the PDF asset to the repo
Create or commit the final PDF asset so it deploys publicly at:
- `https://zazadraft.com/guides/7-parent-emails-teachers-should-never-send-as-is.pdf`

If the repo prefers source-controlled markdown before generating PDF, add both:
- a markdown source file under a sensible content/docs path
- the generated PDF in the public/static asset path

Use this full guide content as the source of truth:

Title:
7 Parent Emails Teachers Should Never Send As-Is

Subtitle:
A free practical guide for teachers who need to turn emotionally loaded drafts into calm, clear, professional messages.

Cover support line:
For the parent email you know you should not send as-is.

Intro:
Some of the hardest messages teachers write are the ones written when they are already tired, frustrated, or emotionally flooded.

A difficult parent email arrives late at night.
It is already 10pm and the message is about to ruin your whole night.
You type out the version that proves you are right.
Then you realise you cannot send this tonight.

This guide is built for those moments.

Each example below shows:
- the kind of message a teacher might write in the heat of the moment
- a safer, calmer version that protects tone without losing honesty
- what changed and why

The goal is not to sound robotic.
The goal is to send the message you will not regret tomorrow.

Section 1 title:
The late-night parent email

Section 1 BEFORE:
I’m honestly frustrated at this point. Your child has now ignored instructions repeatedly, disrupted other pupils’ learning, and shown very little respect for the expectations in class. I have already addressed this several times and it feels like nothing changes. I need you to speak to them properly because this cannot keep happening.

Section 1 AFTER:
I wanted to follow up about today’s lesson. There were several points where your child struggled to follow instructions and this affected their focus and the learning environment around them.

I have spoken with them in class and will continue to support them, but I wanted to make you aware so we can work together on this.

Please do speak with them about the importance of following instructions and staying focused in lesson time. If helpful, I’m happy to discuss ways we can support them consistently.

Section 1 What changed:
- removed blame and frustration language
- focused on observable behaviour
- kept the parent on the same side as the teacher
- added a collaborative next step

Section 2 title:
The aggressive parent email

Section 2 BEFORE:
I don’t appreciate the tone of your email. The situation has not happened the way you are describing it, and I think it would be more helpful if you actually checked the facts before accusing staff.

Section 2 AFTER:
Thank you for getting in touch. I can see this situation has caused concern, and I want to make sure the facts are clear.

From the school’s side, the situation was handled as follows: [brief factual summary].

If it would be helpful, we can continue the conversation with the relevant member of staff so that any next steps are clear.

Section 2 What changed:
- acknowledged concern without accepting unfair accusations
- removed defensiveness
- moved the message back to facts and process
- kept authority without escalation

Section 3 title:
The behaviour note written when you are fed up

Section 3 BEFORE:
X was impossible again today. Constant talking, constant disruption, and clearly not bothered about the warnings they were given. They wasted everyone’s time and then acted like they had done nothing wrong.

Section 3 AFTER:
X needed repeated reminders today about classroom expectations, particularly around talking while others were working.

Despite several warnings, the disruption continued and this affected the concentration of other pupils.

This has been logged so we can monitor patterns and put consistent support in place.

Section 3 What changed:
- removed judgmental wording
- described behaviour instead of character
- protected professionalism in case the note is shared later
- made the purpose of the note clear

Section 4 title:
The holding reply you need when you cannot send this tonight

Section 4 BEFORE:
I’m replying now because I don’t want this hanging over me, but to be honest I’m not happy with how this has been handled and I think expectations at home need to be clearer because this keeps landing back in school.

Section 4 AFTER:
I wanted to acknowledge your email and let you know I will follow up properly once I have reviewed the situation in full.

In the meantime, thank you for your patience.

Section 4 What changed:
- turned an unsafe immediate response into a holding reply
- created space for a calmer follow-up
- prevented a late-night escalation
- helped the teacher avoid replying while emotionally flooded

Section 5 title:
The version that proves you are right

Section 5 BEFORE:
I could argue every point in your email, but that is not going to help if we keep having the same problem.

Section 5 AFTER:
From my notes, here is what happened: [2-3 straight facts]. I am keen to keep this productive and focus on the next step that best supports [student name].

Section 5 What changed:
- removed the urge to win the exchange
- prioritised factual clarity over emotional release
- reduced escalation risk without weakening authority

Section 6 title:
The heated exchange that needs boundaries

Section 6 BEFORE:
Your email feels unfair, and I am not going back and forth on every point when the facts are already clear.

Section 6 AFTER:
I want to keep this calm and focused on the facts. If helpful, I am happy to arrange a short call with the relevant staff member included.

Section 6 What changed:
- avoided point-scoring
- kept the message calm and professional
- added one clear next step

Closing section:
If you recognised yourself in these examples, that does not mean you are bad at communication.
It usually means you are writing in hard moments, under pressure, when the emotional cost is already high.

That is exactly where Zaza Draft is designed to help.

CTA:
If you already have a draft sitting open, start there.
Paste it into the Parent Email Risk Checker and get a calmer, more professional version to work from.

#### 4. File structure guidance
Use the repo’s existing structure, but the final deployed outputs must map to:
- landing page route: `/7-parent-emails`
- PDF asset route: `/guides/7-parent-emails-teachers-should-never-send-as-is.pdf`

If using Next.js app router, likely structure is similar to:
- `app/7-parent-emails/page.tsx`
- `public/guides/7-parent-emails-teachers-should-never-send-as-is.pdf`

If using pages router, likely structure is similar to:
- `pages/7-parent-emails.tsx` or equivalent
- `public/guides/7-parent-emails-teachers-should-never-send-as-is.pdf`

Prefer the project’s existing conventions over inventing a new structure.

#### 5. UTM and scheduled-post linking
All scheduled posts should drive to the landing page, not directly to the PDF.

Use:
- `utm_source=[platform]`
- `utm_medium=organic`
- `utm_campaign=lead-magnet`
- `utm_content=[descriptor]`

Example UTM link:
- `https://zazadraft.com/7-parent-emails?utm_source=x&utm_medium=organic&utm_campaign=lead-magnet&utm_content=10pm-email`

Ensure the existing lead-magnet push posts point to `/7-parent-emails` with `utm_campaign=lead-magnet`.

### Constraints
- Do not mark this task ACTIVE
- Do not redesign the page
- Do not add new routes beyond the required `/7-parent-emails` page and static/public PDF asset
- Do not change auth, billing, pricing, analytics architecture, or product logic
- Preserve existing analytics instrumentation where CTAs are wired
- Reuse existing components/layout primitives where possible
- Keep the checker/start CTA path aligned with the existing live site

### Acceptance criteria
- Landing page is deployable at `https://zazadraft.com/7-parent-emails`
- PDF is deployable at `https://zazadraft.com/guides/7-parent-emails-teachers-should-never-send-as-is.pdf`
- The page uses the locked-in hero, subheadline, support line, and `Check my draft now` CTA copy
- The page includes the problem section, what’s-inside section, proof insert, mid-page CTA block, and closing block described above
- Primary CTAs point to the existing checker/start flow
- Secondary CTAs point to the public PDF
- The PDF asset exists in the repo’s deployable static/public path
- Scheduled post links can point to `/7-parent-emails` using `utm_campaign=lead-magnet`
- No redesign or product-logic changes are introduced
