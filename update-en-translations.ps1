# Read current locale files
$enContent = Get-Content "locales\en.json" -Raw | ConvertFrom-Json
$deContent = Get-Content "locales\de.json" -Raw | ConvertFrom-Json

# Add all the new company page translations to English
$enContent | Add-Member -NotePropertyName "about.company.hero.eyebrow" -NotePropertyValue "ABOUT" -Force
$enContent | Add-Member -NotePropertyName "about.company.hero.title" -NotePropertyValue "About Zaza Technologies" -Force
$enContent | Add-Member -NotePropertyName "about.company.hero.subtitle" -NotePropertyValue "You didn't become a teacher to write emails." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.p1" -NotePropertyValue "You became a teacher to inspire minds—not to drown in grading, documentation, and endless emails. Yet here we are, with burnout rates climbing and passionate educators leaving the profession because the bureaucratic weight has become unsustainable." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.p2" -NotePropertyValue "Zaza exists to change that." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.p3" -NotePropertyValue "We're building a trusted ecosystem of AI tools that restore the time, energy, and joy teaching should bring. Every app in the Zaza family removes repetitive tasks like lesson planning, grading, and parent emails while embedding empathy, safety, and real pedagogy into every feature." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.p4" -NotePropertyValue "We're not here to replace teachers. We're here to give you back what brought you to the classroom in the first place: the ability to actually teach." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.p5" -NotePropertyValue "Founded in 2025 by Dr. Greg Blackburn—a learning scientist with 20 years in L&D and a PhD in Professional Education—who watched too many teacher friends burn out from administrative overload. After teaching thousands of adults and leading major learning initiatives, he built Zaza to solve the problems that steal teachers' time." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.founderLink" -NotePropertyValue "Learn more about Greg's journey" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.vision" -NotePropertyValue "We see a future where teaching is less about admin and stress, and more about creativity, connection, and impact." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.trustHeading" -NotePropertyValue "Why Teachers Trust Zaza" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.trustP1" -NotePropertyValue "We're not another tech company discovering education. Zaza is grounded in two decades of learning science and workplace education, with over 2,400 teachers from 43 countries shaping our tools through real-world feedback." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.trustP2" -NotePropertyValue "Every product is co-designed with educators and rooted in research—because shortcuts that compromise pedagogy are not shortcuts at all." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.trustP3" -NotePropertyValue "That's why we built the KnowledgeCore—a trust layer that makes every Zaza app explainable, privacy-first, and classroom-ready." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.trustP4" -NotePropertyValue "No black boxes. No hallucinations. No undermining your professional judgment." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.trustP5" -NotePropertyValue "When Zaza Draft suggests a parent email or Zaza Teach builds a lesson plan, you can trust it reflects actual learning science—not generic AI fluff that damages your credibility." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.testimonial1" -NotePropertyValue "I was skeptical about AI writing parent emails. But Zaza Draft doesn't just save me time—it makes me sound more professional and empathetic than when I'm rushing at 10 PM." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.testimonial1Author" -NotePropertyValue "Sarah M., 6th Grade ELA Teacher" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayHeading" -NotePropertyValue "A Day With Zaza" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayIntro" -NotePropertyValue "It's 9 PM on a Tuesday. You still need to email parents about the field trip, finish grading essays, and prep tomorrow's lesson on persuasive writing." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayChange" -NotePropertyValue "With Zaza, that changes." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayDraftQ" -NotePropertyValue "Need a parent update that's warm, clear, and professional?" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayDraftA" -NotePropertyValue "Zaza Draft writes it in seconds—you just review and send." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayTeachQ" -NotePropertyValue "Want a complete lesson plan with activities and differentiation strategies?" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayTeachA" -NotePropertyValue "Zaza Teach builds it while you make dinner." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayGradeQ" -NotePropertyValue "30 essays left?" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayGradeA" -NotePropertyValue "GradeFlow gives every student meaningful feedback—without stealing your weekend." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayShieldQ" -NotePropertyValue "Anxious about responding to a difficult parent email at 11 PM?" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayShieldA" -NotePropertyValue "Shield helps you reply with professionalism—and protects your boundaries by reminding you it can wait until morning." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.daySummary" -NotePropertyValue "Whether you're using Draft for parent communications, Teach for lesson planning, GradeFlow for assessments, or Shield as your buffer for stressful messages, the principles are the same:" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayPrinciples" -NotePropertyValue "Respect for your craft. Protection of your credibility. Tools that actually reduce stress." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayZara" -NotePropertyValue "And because every app includes Zara—your consistent in-app assistant—you'll always have support from a voice you already know and trust." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.testimonial2" -NotePropertyValue "Zaza gave me back my evenings. I'm a better teacher now because I'm not exhausted." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.testimonial2Author" -NotePropertyValue "Michael R., High School History Teacher" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayCTA" -NotePropertyValue "Ready to reclaim your time?" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.dayCtaLink" -NotePropertyValue "Start your free 14-day trial" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.promiseHeading" -NotePropertyValue "Our Promise" -Force
$enContent | Add-Member -NotePropertyName "about.company.body.promiseP1" -NotePropertyValue "We're not here with big tech promises. We're here with clarity, usefulness, and trust." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.promiseP2" -NotePropertyValue "Every teacher deserves tools that respect their craft, protect their credibility, and help them thrive." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.promiseP3" -NotePropertyValue "Try Zaza Draft free for 14 days. If it doesn't save you at least 2 hours in your first week, we'll refund you immediately—no questions asked." -Force
$enContent | Add-Member -NotePropertyName "about.company.body.footer" -NotePropertyValue "Built by educators, for educators." -Force
$enContent | Add-Member -NotePropertyName "about.company.stats.teachers.label" -NotePropertyValue "Teachers" -Force
$enContent | Add-Member -NotePropertyName "about.company.stats.teachers.value" -NotePropertyValue "2,400+" -Force
$enContent | Add-Member -NotePropertyName "about.company.stats.countries.label" -NotePropertyValue "Countries" -Force
$enContent | Add-Member -NotePropertyName "about.company.stats.countries.value" -NotePropertyValue "43" -Force
$enContent | Add-Member -NotePropertyName "about.company.stats.timeSaved.label" -NotePropertyValue "Hours Saved Weekly" -Force
$enContent | Add-Member -NotePropertyName "about.company.stats.timeSaved.value" -NotePropertyValue "2+" -Force

# Save English
$enContent | ConvertTo-Json -Depth 10 | Out-File "locales\en.json" -Encoding UTF8

Write-Host "✅ English translations added! Now adding German..." -ForegroundColor Green