# First 150 Programmatic Keywords

Source of truth: `first150KeywordTemplates` in `lib/programmatic.ts`

The exported launch list currently covers:

- 40 problem + phase pages
- 8 reply scenario pages
- 48 report-comment combinations
- 16 comparison pages
- 38 standalone or compatibility pages

## Highest-priority launch examples

### Problem + phase pages

- `behaviour email year 3 primary` -> `/problems/year-3-primary/behaviour-email`
- `angry parent email year 5 primary` -> `/problems/year-5-primary/angry-parent-email`
- `sen parent email ks2` -> `/problems/ks2/sen-parent-email`
- `struggling reader email ks2` -> `/problems/ks2/struggling-reader-email`
- `attendance concern email year 7 secondary` -> `/problems/year-7-secondary/attendance-concern-email`
- `angry parent email ks4 exam season` -> `/problems/ks4-exam-season/angry-parent-email`

### Reply scenarios

- `how to reply when parents ignore behaviour email` -> `/reply/parents-ignore/behaviour-email`
- `how to document parent contact for slt escalating behaviour` -> `/reply/document-parent-contact/slt-escalating-behaviour`
- `how to respond to parent complaint about homework not done` -> `/reply/parent-complaint/homework-not-done`
- `how to write email home about missing homework ks1` -> `/reply/email-home/missing-homework-ks1`
- `how to respond to angry parent email year 6 sat prep` -> `/reply/angry-parent/year-6-sat-prep`
- `how to reply when parent says report comment is too blunt` -> `/reply/report-comment/blunt-wording`

### Report-comment combinations

- `report comments for a pupil on SEN support in English Year 6` -> `/report-comments/sen-support-needs/english/year-6`
- `report comments for a struggling student with behaviour concerns in maths Year 5` -> `/report-comments/struggling-student-behaviour/maths/year-5`
- `report comments for an anxious EAL pupil in science Year 6` -> `/report-comments/anxious-eal-pupil/science/year-6`
- `report comments for a high attaining but disorganised pupil in reading Year 5` -> `/report-comments/high-attaining-but-disorganised/reading/year-5`
- `report comments for a pupil with low attainment and low confidence in maths Year 6` -> `/report-comments/low-attainment-low-confidence/maths/year-6`
- `report comments for a bright but inconsistent pupil in science Year 5` -> `/report-comments/bright-but-inconsistent/science/year-5`

### Comparison pages

- `zaza draft vs MagicSchool AI for parent emails` -> `/alternatives/magicschool-ai/parent-emails`
- `zaza draft vs TeachMate for report comments` -> `/alternatives/teachmate/report-comments`
- `zaza draft vs ChatGPT for professional teacher tone` -> `/alternatives/chatgpt/professional-teacher-tone`
- `zaza draft vs generic AI for angry parent replies` -> `/alternatives/generic-ai/angry-parent-replies`

### UK-specific and single-slug pages

- `parent email template primary school uk` -> `/parent-email-template-primary-school`
- `ofsted friendly report comments secondary` -> `/report-writing-help-secondary-school-ks4`
- `parents evening email script fe school` -> `/parents-evening-email-template-primary-uk`
- `behaviour letter home primary ofsted compliant` -> `/how-to-write-behaviour-email-for-large-class`
- `what to say to parents of year 4 student struggling behaviour and attention` -> `/what-to-say-to-parents-of-year-3-student-struggling-in-reading`
- `positive honest report comment for sen pupil maths and social skills` -> `/positive-honest-report-comment-combinations-for-sen-pupils`

## Notes

- The exact 150-keyword list is generated in code so it stays aligned with the route matrix.
- Use this file as the human-readable launch summary.
- Use `lib/programmatic.ts` when you need the precise machine-readable list for build-time tooling, content ops, or internal-link seeding.
