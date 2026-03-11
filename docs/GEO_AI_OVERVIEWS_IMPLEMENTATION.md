# GEO and AI Overviews Implementation

This document records the GEO updates implemented across Zaza Draft for AI overviews, answer engines, and retrieval-style citations.

Note on wording:
For public-facing copy and schema, the implementation uses `GDPR-ready school workflows` rather than an unqualified `GDPR compliant` claim. That keeps the language conservative and aligned with the existing trust-first positioning.

## Direct-Answer Paragraphs

### `/how-to-reply-to-an-angry-parent-email`

To reply to an angry parent email calmly, pause before answering and separate the feeling from the facts. A strong teacher reply usually does four things: acknowledges the concern, states only the key verified facts, explains what has already happened in school, and offers one clear next step such as a call, meeting, or follow-up after checking with a colleague. Avoid matching the parent's tone, rebutting every accusation, or adding fresh emotional language. Keep it short enough to reread once before sending. Zaza Draft can suggest calmer wording for difficult parent communication, but teachers stay in control, edit the draft, and approve every word before it is used.

### `/positive-but-honest-report-card-comments-for-struggling-students`

To write positive but honest report card comments for struggling students, describe the real challenge clearly, add one genuine strength or positive response to support, and end with a practical next step. The aim is not to hide the struggle or soften it into vague praise. It is to write something accurate, balanced, and professionally kind. Strong comments stay specific about focus, confidence, progress, behaviour, or attainment rather than making sweeping statements about the child. They should also be safe to stand behind at parents' evening or in later follow-up. Zaza Draft helps teachers shape report comments faster, but the teacher still checks the facts, adjusts the tone, and approves the final wording.

### `/how-to-write-a-behaviour-email-to-parents`

To write a behaviour email to parents, describe the behaviour factually, explain its impact on learning, safety, or classroom routines, state what action was taken in school, and set out one clear next step. Keep the tone calm and professional rather than moralising or emotional. Avoid sweeping phrases such as `always disruptive` or guesses about motive because they are more likely to trigger defensiveness and harder to stand behind later in school records. A good behaviour email should be brief, specific, and easy to understand on a phone. Zaza Draft can suggest safer wording, while teachers still review, edit, and approve every line.

## Consistent Entity Definitions

### Primary Definition

Zaza Draft is a UK-based, teacher-built, hallucination-safe AI co-writer for parent communication and report comments. Founded by Dr Greg Blackburn, PhD Education, it is designed for GDPR-ready school workflows, does not invent student facts, and keeps teachers in full control of every word.

### Short Footer Definition

Teacher-built, hallucination-safe AI co-writing for calm parent communication and report comments.

### Founder and Blog Bio Line

Dr Greg Blackburn, PhD Education, founded Zaza Technologies and built Zaza Draft as a calm, teacher-first AI co-writer for sensitive school writing.

### Implemented Surfaces

- Footer
- Founder page
- Blog post author block
- Organization, WebSite, SoftwareApplication, Article, FAQPage, and HowTo JSON-LD

## Updated FAQ Blocks

### `/how-to-reply-to-an-angry-parent-email`

- How should a teacher start a reply to an angry parent email?
- Should I reply immediately to an angry parent email?
- Do I need to answer every accusation in the email?
- What if the parent has copied in SLT or my line manager?
- When should I suggest a call or meeting instead of another email?
- How do I sound calm without sounding weak?
- Can Zaza Draft write the whole email for me?

### `/how-to-write-a-behaviour-email-to-parents`

- Should I email home about behaviour straight away or wait?
- How much detail should I include in the behaviour email?
- How do I stop the email sounding accusatory?
- Should I mention what we already did in school?
- What if I need the email to be suitable for SLT or pastoral records as well?
- Should I copy in the head of year on the first behaviour email?
- Can Zaza Draft help with behaviour emails?

### `/positive-but-honest-report-card-comments-for-struggling-students`

- How do I write positively without hiding the struggle?
- Can I mention low attainment and confidence in the same comment?
- What if I am writing dozens of difficult comments in one sitting?
- How do I say a pupil is behind without sounding cruel?
- Can I mention SEN, confidence, or emotional factors in a report comment?
- Should these examples be copied directly?
- What if there has been very little progress this term?
- Can Zaza Draft help me keep the tone consistent across a whole class set?

### `/how-to-document-parent-contact-without-losing-your-mind`

- What should always be included in a parent-contact log?
- How detailed should my documentation be?
- What do I actually write after a missed phone call or no reply?
- Should my contact notes sound formal?
- Can the same note be adapted for email and school records?
- How do I keep my notes usable for SLT, safeguarding, or pastoral follow-up?
- How do I stop this admin work swallowing the whole evening?
- Can Zaza Draft help with parent-contact records as well as the email itself?

### `/how-to-tell-parents-their-child-is-falling-behind`

- When should I tell parents a child is falling behind?
- How direct should I be?
- Should I say `falling behind` directly in the email?
- Should I offer support ideas in the email?
- What if there may be a wider issue affecting progress?
- How do I avoid making parents feel blamed?
- What if this email may lead to a difficult meeting later?
- Can Zaza Draft help me phrase this more carefully?

## People Also Ask Targets

These are recommended PAA-style targets based on current search-result patterns and adjacent teacher queries reviewed on 9 March 2026. They should be treated as inferred opportunity targets, not first-party Google Search Console volume data.

| Query                                                                | Suggested answer snippet                                                                                                                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| how to reply to an angry parent email                                | Reply calmly by acknowledging the concern, stating only the verified facts, and offering one next step such as a call or meeting.                       |
| what should a teacher say to an angry parent                         | Keep the wording respectful, factual, and brief. The aim is to lower the temperature, not to win the argument by email.                                 |
| should teachers reply to angry parent emails immediately             | Usually not. A short pause reduces reactive wording and makes it easier to send something professional and school-safe.                                 |
| how to write a behaviour email to parents                            | Describe the behaviour factually, explain the impact, note the school response, and end with a clear next step.                                         |
| what should be included in a behaviour email home                    | Include the observable behaviour, its impact on learning or safety, what was done in school, and what happens next.                                     |
| how do you email parents about behaviour without sounding accusatory | Focus on facts, not motives. Calm, specific wording is usually better than moralising language.                                                         |
| positive but honest report card comments for struggling students     | Name the real challenge, add one genuine strength or response to support, and finish with a constructive next step.                                     |
| how to write report comments for weak students                       | Use specific language about progress, confidence, or attainment rather than blunt labels, then point towards support or improvement.                    |
| what do you write in a report for a struggling child                 | Keep the comment balanced, accurate, and future-facing so it is helpful to families and safe to stand behind later.                                     |
| is AI safe for teacher reports                                       | AI can help with drafting if teachers review every line, keep real evidence at the centre, and avoid invented pupil details.                            |
| can teachers use AI for report comments                              | Teachers can use AI as a co-writer if the school permits it, the output is checked carefully, and the final comment remains teacher-approved.           |
| safe AI alternatives to ChatGPT for teachers                         | Many teachers want a narrower tool built for school writing because parent communication and reports need calmer, lower-risk wording.                   |
| hallucination safe AI for teachers                                   | In practice, this means a review-led workflow that avoids invented student facts and keeps teachers responsible for accuracy.                           |
| how to document parent contact at school                             | Record the date, contact method, concern discussed, any parent response, and the next step in concise factual language.                                 |
| what should be in a parent contact log                               | A usable log includes when contact happened, what the issue was, what response came back, and what action follows.                                      |
| how to log a failed parent phone call                                | Note the date, time, method attempted, and any follow-up action such as an email or a second call attempt.                                              |
| how to tell parents their child is falling behind                    | Explain the concern clearly, say what you have seen in school, and suggest a support step without sounding alarmist.                                    |
| parents evening email templates UK                                   | Good templates confirm the purpose, keep the tone calm, and make practical details easy to scan on a phone.                                             |
| how to write a difficult email to parents as a teacher               | Use a short structure: purpose, verified facts, impact, and next step. Avoid emotional over-explaining.                                                 |
| what is teacher-first AI writing help                                | Teacher-first AI writing help is specialised co-writing for parent communication, report comments, and school messages where tone and judgement matter. |

## Multilingual Starter

### `/de/` Starter

Priority German routes if expansion continues:

- `/de/wie-antworte-ich-auf-eine-veraergerte-elternmail`
- `/de/verhaltensmail-an-eltern-schreiben`
- `/de/positive-aber-ehrliche-zeugnisbemerkungen`
- `/de/elternkontakt-dokumentieren-ohne-stress`
- `/de/sichere-ki-fuer-lehrkraefte`

German localisation notes:

- Keep the trust language conservative and school-safe.
- Preserve the co-writer framing. Do not imply autonomous writing.
- Replace UK-specific references only where they would confuse a German-speaking teacher audience.

### `/eu/` Starter

Recommended use of `/eu/`:

- English-language trust and compliance pages for Europe-wide discovery
- Pan-European school leadership content
- Comparison pages where `GDPR-ready` and teacher control are key qualifiers

Suggested `/eu/` routes:

- `/eu/gdpr-ready-ai-writing-for-schools`
- `/eu/safe-ai-parent-communication-for-teachers`
- `/eu/teacher-report-writing-ai-with-human-review`

### Translation Priorities

1. Localise direct-answer paragraphs first.
2. Translate FAQs second.
3. Adapt examples and school references third.
4. Rebuild JSON-LD with the same entity IDs and `inLanguage` variants.

## JSON-LD Enhancements Implemented

- Added the site-wide `SoftwareApplication` entity in the root layout.
- Reused the same product definition across Organization, WebSite, SoftwareApplication, Article, FAQPage, and HowTo schema.
- Added richer `about`, `keywords`, `creator`, and `publisher` relationships.
- Added founder description detail to Article and Organization schema.
- Added product and organisation references to teacher-writing landing page schema.
