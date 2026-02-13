const fs = require("fs");

// Read the file
let content = fs.readFileSync("./lib/i18n/language-context.tsx", "utf8");

// Company page translations - English
const companyEN = `
  // Company page
  "company.hero.label": "OUR COMPANY",
  "company.hero.headline": "Zaza Technologies",
  "company.hero.subheading": "We are a small, specialised team of learning designers, engineers, and educational researchers building technology that helps teachers thrive.",
  "company.origin.p1": "Zaza Technologies was founded in 2025 with a clear belief: education deserves AI tools built with real pedagogical understanding, not repurposed corporate AI models. We build technology that protects teacher wellbeing.",
  "company.origin.p2": "So we chose a different approach.",
  "company.origin.p3": "We design tools that are trained on real pedagogy, developed with educators, and refined through classroom use. Tools that understand the nuance of teacher judgement, the emotional weight of parent interaction, and the importance of constructive feedback. Tools that are accurate, reliable, and safe for educational settings.",
  "company.origin.aiDifferentiator": "Our models are Built with teacher design partners and education-specific workflows and classroom language patterns, refined through iterative testing with educators, and designed to produce output that sounds like a teacher - not a machine.",
  "company.origin.p4": "Our goal is simple: give teachers meaningful time back.",
  "company.philosophy.title": "Our Philosophy",
  "company.philosophy.intro": "We do not believe in \"AI that replaces teachers.\" We believe in AI that supports teachers.",
  "company.philosophy.principle1": "Tools must respect teacher expertise.",
  "company.philosophy.principle2": "Tools must reduce workload, not shift it.",
  "company.philosophy.principle3": "Tools must protect students and their learning environment.",
  "company.philosophy.principle4": "Tools must be trustworthy and transparent.",
  "company.philosophy.closing": "If technology cannot help teachers do what they do best - teach - then it does not belong in the classroom.",
  "company.boutique.title": "A Boutique Approach",
  "company.boutique.intro": "We are intentionally not a large technology company. We are a focused team building for one audience only – teachers.",
  "company.boutique.means": "This means:",
  "company.boutique.point1": "We work closely with educators across multiple regions and contexts.",
  "company.boutique.point2": "We test features directly in real classrooms.",
  "company.boutique.point3": "We prioritise clarity, safety, and ease of use over novelty.",
  "company.boutique.closing": "We do not optimise for rapid scale. We optimise for what works.",
  "company.boutique.impact": "Scale is not the goal. Impact is.",
  "company.today.title": "Where We Are Today",
  "company.today.p1": "Zaza now supports over 500 teachers in more than 15 countries. On average, teachers save over 10 hours per week on writing and communication tasks by using Zaza's tools. And we are just getting started.",
  "company.today.p2": "Our long-term vision is to build a complete suite of AI tools that help teachers reclaim their time, protect their wellbeing, and stay connected to the heart of their work – their students.",
  "company.today.close": "Because when teachers thrive, students thrive.",
  "company.stats.teachers.number": "150k+",
  "company.stats.teachers.label": "Teachers using Zaza",
  "company.stats.countries.number": "15",
  "company.stats.countries.label": "Countries",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "Hours saved weekly",`;

// Company page translations - German
const companyDE = `
  // Company page
  "company.hero.label": "UNSER UNTERNEHMEN",
  "company.hero.headline": "Zaza Technologies",
  "company.hero.subheading": "Wir sind ein kleines, spezialisiertes Team aus Lerndesignern, Ingenieuren und Bildungsforschern, die Technologie entwickeln, die Lehrkräften hilft, erfolgreich zu sein.",
  "company.origin.p1": "Zaza Technologies wurde 2025 mit einer klaren Überzeugung gegründet: Bildung verdient KI-Tools, die mit echtem pädagogischem Verständnis entwickelt wurden, nicht umfunktionierte Unternehmens-KI-Modelle. Wir entwickeln Technologie, die das Wohlbefinden von Lehrkräften schützt.",
  "company.origin.p2": "Deshalb haben wir einen anderen Ansatz gewählt.",
  "company.origin.p3": "Wir entwickeln Tools, die auf echter Pädagogik trainiert, mit Pädagogen entwickelt und durch Klassenzimmereinsatz verfeinert werden. Tools, die die Nuancen des Lehrerurteils, das emotionale Gewicht der Elterninteraktion und die Bedeutung konstruktiven Feedbacks verstehen. Tools, die für Bildungsumgebungen präzise, zuverlässig und sicher sind.",
  "company.origin.aiDifferentiator": "Unsere Modelle werden anhand echten Lehrer-Feedbacks und Klassenzimmer-Sprachmustern trainiert, durch iterative Tests mit Pädagogen verfeinert und so konzipiert, dass die Ausgabe wie eine Lehrkraft klingt - nicht wie eine Maschine.",
  "company.origin.p4": "Unser Ziel ist einfach: Lehrkräften bedeutungsvolle Zeit zurückgeben.",
  "company.philosophy.title": "Unsere Philosophie",
  "company.philosophy.intro": "Wir glauben nicht an \"KI, die Lehrkräfte ersetzt\". Wir glauben an KI, die Lehrkräfte unterstützt.",
  "company.philosophy.principle1": "Tools müssen die Expertise von Lehrkräften respektieren.",
  "company.philosophy.principle2": "Tools müssen Arbeitsbelastung reduzieren, nicht verschieben.",
  "company.philosophy.principle3": "Tools müssen Schüler und ihre Lernumgebung schützen.",
  "company.philosophy.principle4": "Tools müssen vertrauenswürdig und transparent sein.",
  "company.philosophy.closing": "Wenn Technologie Lehrkräften nicht dabei helfen kann, das zu tun, was sie am besten können - unterrichten - dann gehört sie nicht ins Klassenzimmer.",
  "company.boutique.title": "Ein Boutique-Ansatz",
  "company.boutique.intro": "Wir sind absichtlich kein großes Technologieunternehmen. Wir sind ein fokussiertes Team, das nur für ein Publikum entwickelt – Lehrkräfte.",
  "company.boutique.means": "Das bedeutet:",
  "company.boutique.point1": "Wir arbeiten eng mit Pädagogen aus mehreren Regionen und Kontexten zusammen.",
  "company.boutique.point2": "Wir testen Funktionen direkt in echten Klassenzimmern.",
  "company.boutique.point3": "Wir priorisieren Klarheit, Sicherheit und Benutzerfreundlichkeit über Neuheit.",
  "company.boutique.closing": "Wir optimieren nicht für schnelles Wachstum. Wir optimieren für das, was funktioniert.",
  "company.boutique.impact": "Wachstum ist nicht das Ziel. Wirkung ist es.",
  "company.today.title": "Wo wir heute stehen",
  "company.today.p1": "Zaza unterstützt jetzt über 500 Lehrkräfte in mehr als 15 Ländern. Im Durchschnitt sparen Lehrkräfte über 10 Stunden pro Woche bei Schreib- und Kommunikationsaufgaben durch die Nutzung der Tools von Zaza. Und wir fangen gerade erst an.",
  "company.today.p2": "Unsere langfristige Vision ist es, eine vollständige Suite von KI-Tools zu entwickeln, die Lehrkräften helfen, ihre Zeit zurückzugewinnen, ihr Wohlbefinden zu schützen und mit dem Kern ihrer Arbeit verbunden zu bleiben – ihren Schülern.",
  "company.today.close": "Denn wenn Lehrkräfte gedeihen, gedeihen Schüler.",
  "company.stats.teachers.number": "150k+",
  "company.stats.teachers.label": "Lehrkräfte nutzen Zaza",
  "company.stats.countries.number": "15",
  "company.stats.countries.label": "Länder",
  "company.stats.hours.number": "10+",
  "company.stats.hours.label": "Wöchentlich gesparte Stunden",`;

// Find the right place to insert (after contact section in English)
const enInsertPoint = content.indexOf(
  '  "contact.help.support": "→ Support Centre",',
);
if (enInsertPoint > -1) {
  content =
    content.slice(0, enInsertPoint + 48) +
    companyEN +
    content.slice(enInsertPoint + 48);
  console.log("✅ Added English company translations");
} else {
  console.log("❌ Could not find English insertion point");
}

// Find the right place to insert (after contact section in German)
const deInsertPoint = content.indexOf(
  '  "contact.help.support": "→ Support-Center",',
);
if (deInsertPoint > -1) {
  content =
    content.slice(0, deInsertPoint + 49) +
    companyDE +
    content.slice(deInsertPoint + 49);
  console.log("✅ Added German company translations");
} else {
  console.log("❌ Could not find German insertion point");
}

// Write back
fs.writeFileSync("./lib/i18n/language-context.tsx", content, "utf8");
console.log("✅ Company page translations restored!");
