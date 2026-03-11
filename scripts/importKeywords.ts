import fs from "node:fs";
import path from "node:path";

type ImportedKeyword = {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  yearGroup: string;
  subject: string;
  modifier: string;
};

function splitTsvLine(line: string) {
  return line.split("\t").map((value) => value.trim());
}

function main() {
  const inputPath = path.join(process.cwd(), "data", "keywords.tsv");
  const outputPath = path.join(process.cwd(), "data", "how-to-keywords.json");

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Missing TSV file at ${inputPath}`);
  }

  const raw = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);

  if (!lines.length) {
    throw new Error("keywords.tsv is empty.");
  }

  const headers = splitTsvLine(lines[0]);
  const rows = lines.slice(1);

  const mapped: ImportedKeyword[] = rows
    .map((line) => {
      const values = splitTsvLine(line);
      const row = Object.fromEntries(
        headers.map((header, index) => [header, values[index] ?? ""]),
      );

      return {
        slug: String(row["Slug"] || "").replace(/^\//, ""),
        primaryKeyword: String(row["Primary Keyword"] || ""),
        secondaryKeywords: String(row["Secondary Keywords"] || ""),
        yearGroup: String(row["Year Group"] || ""),
        subject: String(row["Subject / Issue"] || ""),
        modifier:
          String(row["Pupil Type / Modifier"] || "General") || "General",
      };
    })
    .filter((row) => row.slug && row.primaryKeyword);

  fs.writeFileSync(outputPath, `${JSON.stringify(mapped, null, 2)}\n`, "utf8");
  console.log(`Imported ${mapped.length} keyword rows into ${outputPath}`);
}

main();
