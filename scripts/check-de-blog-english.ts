import fs from "node:fs";
import path from "node:path";

const blogDir = path.join(process.cwd(), "content", "blog");
const deFilePattern = /\.de\.mdx?$/i;
const explicitEnglishPatterns: RegExp[] = [
  /\bcopy\s+and\s+paste\b/i,
  /\bhow\s+to\b/i,
  /\bcontinue\s+reading\b/i,
  /\bback\s+to\b/i,
  /\byou\s+can\b/i,
  /\buse\s+this\b/i,
  /\bdownload\b/i,
  /\bstep\b/i,
  /\byour\b/i,
];

const englishSignalWords = new Set([
  "the",
  "and",
  "with",
  "your",
  "you",
  "can",
  "use",
  "this",
  "that",
  "these",
  "those",
  "download",
  "continue",
  "reading",
  "back",
  "copy",
  "paste",
  "step",
  "steps",
  "template",
  "templates",
  "related",
  "guide",
  "click",
]);

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }
    if (deFilePattern.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function isIgnorableLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return true;
  if (trimmed.startsWith("slug:")) return true;
  if (trimmed.startsWith("image:")) return true;
  if (/^(?:https?:\/\/|www\.)\S+$/i.test(trimmed)) return true;
  if (/^(?:\/|\.{1,2}\/|[A-Za-z]:\\)[^\s]+$/.test(trimmed)) return true;
  if (/^[\w.-]+\/[\w./-]+$/.test(trimmed)) return true;
  if (/^`[^`]+`$/.test(trimmed) && /[/\\]/.test(trimmed)) return true;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return true;
  return false;
}

function stripMarkup(line: string): string {
  return line
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[>*#|_[\]{}()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function looksLikeCodeLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return true;
  if (/^[\[\]{}();:=<>+\-/*.,'"`$\\]+$/.test(trimmed)) return true;
  if (
    /^(const|let|var|function|return|import|export|if|else|for|while)\b/.test(
      trimmed,
    )
  ) {
    return true;
  }
  if (/^[A-Za-z_][\w-]*:\s*$/.test(trimmed)) return true;
  return false;
}

function isStructuralLine(line: string): boolean {
  return (
    /^\s*#{1,6}\s+/.test(line) ||
    /^\s*[-*+]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    /<Callout\b/i.test(line) ||
    /<\/Callout>/i.test(line)
  );
}

function hasEnglishSignal(line: string, strict: boolean): boolean {
  const cleaned = stripMarkup(line);
  if (!cleaned) return false;

  for (const pattern of explicitEnglishPatterns) {
    if (pattern.test(cleaned)) return true;
  }

  const tokens = cleaned.match(/[A-Za-z][A-Za-z'-]*/g) ?? [];
  if (tokens.length === 0) return false;

  let hits = 0;
  for (const token of tokens) {
    if (englishSignalWords.has(token.toLowerCase())) hits++;
  }

  if (strict) return hits >= 1;

  const ratio = hits / tokens.length;
  return hits >= 2 && ratio >= 0.2;
}

function checkFile(filePath: string): Array<{ line: number; text: string }> {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  const findings: Array<{ line: number; text: string }> = [];

  let inFrontmatter = false;
  let frontmatterSeen = false;
  let inCodeFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!frontmatterSeen && trimmed === "---") {
      inFrontmatter = !inFrontmatter;
      if (!inFrontmatter) frontmatterSeen = true;
      continue;
    }

    if (inFrontmatter) continue;

    if (/^```/.test(trimmed)) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (isIgnorableLine(line)) continue;

    const strict = isStructuralLine(line);

    if (inCodeFence) {
      if (looksLikeCodeLine(line)) continue;
      if (hasEnglishSignal(line, true)) {
        findings.push({ line: i + 1, text: line });
      }
      continue;
    }

    if (hasEnglishSignal(line, strict)) {
      findings.push({ line: i + 1, text: line });
    }
  }

  return findings;
}

const files = walk(blogDir);
const allFindings: Array<{ file: string; line: number; text: string }> = [];

for (const file of files) {
  for (const finding of checkFile(file)) {
    allFindings.push({
      file: path.relative(process.cwd(), file),
      line: finding.line,
      text: finding.text.trim(),
    });
  }
}

if (allFindings.length > 0) {
  console.error("English leakage detected in German blog sources:");
  for (const finding of allFindings) {
    console.error(`- ${finding.file}:${finding.line} -> ${finding.text}`);
  }
  process.exit(1);
}

console.log(`DE blog language guard passed (${files.length} files checked).`);
