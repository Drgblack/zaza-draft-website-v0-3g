/**
 * Fix common mojibake/encoding corruptions (often UTF-8 decoded as Latin-1/Windows-1252).
 * This script is intentionally simple and safe: it only applies known string replacements.
 *
 * Usage (example):
 *   node fix-encoding.js "content"
 */

const fixes = {
  // German umlauts and ß
  ä: "ä",
  "Ã„": "Ä",
  ö: "ö",
  "Ã-": "Ö",
  ü: "ü",
  Ãœ: "Ü",
  ÃŸ: "ß",

  // Smart quotes / punctuation (common mojibake)
  "â€ž": "„",
  "â€œ": "“",
  "â€": "”",
  "â€˜": "‘",
  "'": "’",
  "...": "…",

  // Dashes (keep as-is if your project later normalises)
  "-": "-",
  "-": "-",

  // Bullet / misc
  "â€¢": "•",
  "Â ": " ", // non-breaking space artefact
};

function applyFixes(input) {
  let out = input;
  for (const [from, to] of Object.entries(fixes)) {
    out = out.split(from).join(to);
  }
  return out;
}

function main() {
  const input = process.argv.slice(2).join(" ");
  if (!input) {
    console.error("Provide a string to fix.");
    process.exit(1);
  }
  process.stdout.write(applyFixes(input));
}

if (require.main === module) {
  main();
}

module.exports = { applyFixes, fixes };
