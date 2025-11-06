const fs = require('fs');
let content = fs.readFileSync('./lib/i18n/language-context.tsx', 'utf8');

// Use SINGLE quotes for the German text to avoid escaping issues
const germanPhilosophyIntro = `  "company.philosophy.intro": 'Wir glauben nicht an "KI, die Lehrkräfte ersetzt". Wir glauben an KI, die Lehrkräfte unterstützt.',`;

// Find where to insert (after philosophy.title)
const insertPoint = content.lastIndexOf('"company.philosophy.title": "Unsere Philosophie",');
if (insertPoint > -1) {
  const afterLine = content.indexOf('\n', insertPoint) + 1;
  content = content.slice(0, afterLine) + germanPhilosophyIntro + '\n' + content.slice(afterLine);
  console.log('✅ Fixed German philosophy.intro');
}

fs.writeFileSync('./lib/i18n/language-context.tsx', content, 'utf8');