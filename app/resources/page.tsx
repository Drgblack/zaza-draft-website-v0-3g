function humanizeSlug(s?: string) {
  if (!s) return "Resource";
  return s.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function getDownloadName(title?: string, href?: string) {
  const kind = (href?.toLowerCase().endsWith(".pdf") ? "PDF" : "DOCX");
  const lang = href?.match(/\/build\/([a-z]{2})\./i)?.[1]?.toUpperCase() || "EN";
  const base = (title && title.trim()) || "Resource";
  const safe = base.replace(/[^A-Za-z0-9 ]/g,"").replace(/\s+/g,"-");
  return `${safe}_${lang}_Zaza-Draft.${kind.toLowerCase()}`;
}
import fs from "node:fs";
import path from "node:path";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// ----- types -----
type FileEntry = { docx?: string; pdf?: string };
type Meta = { slug: string; files?: { en?: FileEntry; de?: FileEntry } };
type IndexItem = {
  slug: string;
  title?: string;
  blurb?: string;
  category?: string;
  tags?: string[];
  published?: string;
};

// ----- helpers -----
function readJsonSafe<T = any>(full: string): T | null {
  try { return JSON.parse(fs.readFileSync(full, "utf8")); } catch { return null; }
}

function readIndex(): IndexItem[] {
  const idxPath = path.join(process.cwd(), "data", "resources", "resources.index.json");
  const text = fs.existsSync(idxPath) ? fs.readFileSync(idxPath, "utf8") : "";
  if (!text.trim()) return [];
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // NDJSON / concatenated objects fallback
    const items: IndexItem[] = [];
    let buf = "", depth = 0;
    for (const ch of text) {
      buf += ch;
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      if (depth === 0 && buf.trim()) {
        try { items.push(JSON.parse(buf)); } catch {}
        buf = "";
      }
    }
    return items;
  }
}

function readMetas(): Meta[] {
  const base = path.join(process.cwd(), "public", "resources");
  if (!fs.existsSync(base)) return [];
  return fs.readdirSync(base)
    .filter((n) => fs.statSync(path.join(base, n)).isDirectory())
    .map((slug) => {
      const metaPath = path.join(base, slug, "meta.json");
      const meta = (fs.existsSync(metaPath) ? readJsonSafe<Meta>(metaPath) : null) ?? { slug, files: {} };
      // ensure slug set
      (meta as any).slug = (meta as any).slug ?? slug;
      // try to auto-detect docx/pdf if meta missing
      const build = path.join(base, slug, "build");
      const mk = (p?: string) => (p && fs.existsSync(path.join(process.cwd(), "public", p.replace(/^\//, "")))) ? p : undefined;
      if (fs.existsSync(build)) {
        const enDocx = mk(`/resources/${slug}/build/en.docx`);
        const deDocx = mk(`/resources/${slug}/build/de.docx`);
        const enPdf  = mk(`/resources/${slug}/build/en.pdf`);
        const dePdf  = mk(`/resources/${slug}/build/de.pdf`);
        meta.files = meta.files ?? {};
        meta.files.en = meta.files.en ?? {};
        meta.files.de = meta.files.de ?? {};
        meta.files.en.docx = meta.files.en.docx ?? enDocx;
        meta.files.de.docx = meta.files.de.docx ?? deDocx;
        meta.files.en.pdf  = meta.files.en.pdf  ?? enPdf;
        meta.files.de.pdf  = meta.files.de.pdf  ?? dePdf;
      }
      return meta as Meta;
    });
}

function pickHref(m: Meta): string | null {
  const en = m.files?.en ?? {};
  const de = m.files?.de ?? {};
  return en.pdf ?? en.docx ?? de.pdf ?? de.docx ?? null;
}

export default function ResourcesPage() {
  // Read everything at build/server time (no client fetches)
  const index = readIndex();
  const bySlug = new Map(index.map((i) => [i.slug, i]));
  const metas = readMetas();

  // Merge: meta (files) + index (title/blurb/tags/published)
  const resources = metas.map((m) => {
    const extra = bySlug.get(m.slug) ?? {};
    return {
      slug: m.slug,
      files: m.files,
      title: extra.title ?? m.slug,
      blurb: extra.blurb ?? "",
      tags: extra.tags ?? [],
      published: extra.published,
      category: (extra as any).category,
    } as IndexItem & Meta;
  }).sort((a,b) => (a.title||"").localeCompare(b.title||""));

  return (
    <div className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-4">Free Resources for Teachers</h1>
          <p className="text-[#9CA3AF]">Time-savers you can use today. Download as PDF or DOCX.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const href = pickHref(resource);
            return (
              <Card key={resource.slug} className="bg-[#0B1220] border-[#1F2937]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[#F9FAFB] mb-2">{ (resource.title ?? humanizeSlug(resource.slug)) }</h2>
                  {(resource.blurb ?? DEFAULTS[resource.slug]?.blurb) ? (
                    <p className="text-[#9CA3AF] mb-4">{(resource.blurb ?? DEFAULTS[resource.slug]?.blurb)}</p>
                  ) : null}

                  {resource.tags && resource.tags.length ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((t) => (
                        <span key={t} className="text-xs bg-[#111827] text-[#9CA3AF] px-2 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  ) : null}

                  {resource.published ? (
                    <p className="text-sm text-[#6B7280] mb-4">
                      Published: {new Date(resource.published).toLocaleDateString()}
                    </p>
                  ) : null}

                  {href ? (
                    <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all">
                      <a href={href} download className="flex items-center justify-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-[#1F2937] text-[#9CA3AF] cursor-not-allowed">
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}




