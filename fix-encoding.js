const fs = require("fs");

// Read the file
let content = fs.readFileSync("./lib/i18n/language-context.tsx", "utf8");

// Fix common encoding corruptions
const fixes = {
  ü: "ü",
  Ãœ: "Ü",
  ö: "ö",
  "Ã–": "Ö",
  ä: "ä",
  "Ã„": "Ä",
  ÃŸ: "ß",
  über: "über",
  Ãœber: "Über",
  für: "für",
  gröÃŸ: "größ",
  mö: "mö",
  kö: "kö",
  Lehrkräfte: "Lehrkräfte",
  Gründer: "Gründer",
  Künstliche: "Künstliche",
};

// Apply all fixes
for (const [broken, fixed] of Object.entries(fixes)) {
  content = content.split(broken).join(fixed);
}

// Write back
fs.writeFileSync("./lib/i18n/language-context.tsx", content, "utf8");

console.log("✅ Encoding fixed!");
