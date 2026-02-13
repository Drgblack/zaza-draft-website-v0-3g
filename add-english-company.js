const fs = require("fs");
let content = fs.readFileSync("./lib/i18n/language-context.tsx", "utf8");

// Check if already added
if (content.includes('"company.hero.label": "OUR COMPANY"')) {
  console.log("✅ English translations already exist");
  process.exit(0);
}

const englishCompany = `
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
  "company.philosophy.intro": 'We do not believe in "AI that replaces teachers." We believe in AI that supports teachers.',
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

// Try multiple possible insertion points
const markers = [
  "const translationsEn",
  '"contact.form.submit": "Send Message"',
  '"contact.help.email": "hello@zazadraft.com"',
  '"nav.pricing": "Pricing"',
];

let inserted = false;

// Find the translationsEn object
const enStart = content.indexOf("const translationsEn");
if (enStart > -1) {
  // Find the closing brace of translationsEn (before translationsDe)
  const enEnd = content.indexOf("const translationsDe", enStart);

  if (enEnd > -1) {
    // Find the last comma before the closing brace
    const enObjEnd = content.lastIndexOf("},", enEnd);

    if (enObjEnd > -1) {
      // Go back to find the last comma in the object
      const lastComma = content.lastIndexOf(",", enObjEnd);

      // Insert after the last comma
      content =
        content.slice(0, lastComma + 1) +
        englishCompany +
        content.slice(lastComma + 1);
      console.log("✅ Added English company translations");
      inserted = true;
    }
  }
}

if (!inserted) {
  console.log("❌ Could not find insertion point");
  console.log("Searching for markers...");
  markers.forEach((m) => {
    const idx = content.indexOf(m);
    console.log(`  ${m}: ${idx > -1 ? "FOUND at " + idx : "NOT FOUND"}`);
  });
} else {
  fs.writeFileSync("./lib/i18n/language-context.tsx", content, "utf8");
  console.log("✅ File saved!");
}
