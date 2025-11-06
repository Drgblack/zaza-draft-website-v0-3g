const fs = require('fs');

// Read the file
let content = fs.readFileSync('./lib/i18n/language-context.tsx', 'utf8');

// Fix common encoding corruptions
const fixes = {
  'Ã¼': 'ü',
  'Ãœ': 'Ü', 
  'Ã¶': 'ö',
  'Ã–': 'Ö',
  'Ã¤': 'ä',
  'Ã„': 'Ä',
  'ÃŸ': 'ß',
  'Ã¼ber': 'über',
  'Ãœber': 'Über',
  'fÃ¼r': 'für',
  'grÃ¶ÃŸ': 'größ',
  'mÃ¶': 'mö',
  'kÃ¶': 'kö',
  'LehrkrÃ¤fte': 'Lehrkräfte',
  'GrÃ¼nder': 'Gründer',
  'KÃ¼nstliche': 'Künstliche'
};

// Apply all fixes
for (const [broken, fixed] of Object.entries(fixes)) {
  content = content.split(broken).join(fixed);
}

// Write back
fs.writeFileSync('./lib/i18n/language-context.tsx', content, 'utf8');

console.log('✅ Encoding fixed!');