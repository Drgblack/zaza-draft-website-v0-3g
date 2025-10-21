import { Card, CardContent } from "@/components/ui/card";

const DEFAULTS_EN = { 
  'ai-rubric-prompts': { title: 'AI Rubric Prompts', description: 'Ready-to-use AI prompts to generate detailed, consistent rubrics.' },} as const;
const DEFAULTS_DE = { 
  'ai-rubric-prompts': { title: 'AI-Rubrik-Prompts', description: 'Fertige AI-Prompts für detaillierte, konsistente Bewertungsraster.' },} as const;
import { Button } from "@/components/ui/button";

const DEFAULTS_EN = { 
  'ai-rubric-prompts': { title: 'AI Rubric Prompts', description: 'Ready-to-use AI prompts to generate detailed, consistent rubrics.' },} as const;
const DEFAULTS_DE = { 
  'ai-rubric-prompts': { title: 'AI-Rubrik-Prompts', description: 'Fertige AI-Prompts für detaillierte, konsistente Bewertungsraster.' },} as const;
import { Download } from "lucide-react";

const DEFAULTS_EN = { 
  'ai-rubric-prompts': { title: 'AI Rubric Prompts', description: 'Ready-to-use AI prompts to generate detailed, consistent rubrics.' },} as const;
const DEFAULTS_DE = { 
  'ai-rubric-prompts': { title: 'AI-Rubrik-Prompts', description: 'Fertige AI-Prompts für detaillierte, konsistente Bewertungsraster.' },} as const;

// Import resources index (array, { value: [...] }, or single object)

const DEFAULTS_EN = { 
  'ai-rubric-prompts': { title: 'AI Rubric Prompts', description: 'Ready-to-use AI prompts to generate detailed, consistent rubrics.' },} as const;
const DEFAULTS_DE = { 
  'ai-rubric-prompts': { title: 'AI-Rubrik-Prompts', description: 'Fertige AI-Prompts für detaillierte, konsistente Bewertungsraster.' },} as const;
import rawIndex from "../../data/resources/resources.index.json";

const DEFAULTS_EN = { 
  'ai-rubric-prompts': { title: 'AI Rubric Prompts', description: 'Ready-to-use AI prompts to generate detailed, consistent rubrics.' },} as const;
const DEFAULTS_DE = { 
  'ai-rubric-prompts': { title: 'AI-Rubrik-Prompts', description: 'Fertige AI-Prompts für detaillierte, konsistente Bewertungsraster.' },} as const;

type FileEntry = { docx?: string; pdf?: string };
type Resource = {
  slug: string;
  title?: string | null;
  blurb?: string | null;
  published?: string | null;
  tags?: string[] | null;
  files?: { en?: FileEntry; de?: FileEntry } | null;
};

function normalizeIndex(input: any): Resource[] {
  if (!input) return [];
  if (Array.isArray(input)) return input as Resource[];
  if (typeof input === "object") {
    if (Array.isArray((input as any).value)) {
      return ((input as any).value ?? []) as Resource[];
    }
    return [input as Resource];
  }
  return [];
}

function pickHref(r: Resource): string | null {
  const en = r.files?.en ?? {};
  const de = r.files?.de ?? {};
  return (en as FileEntry).pdf ?? (en as FileEntry).docx ?? (de as FileEntry).pdf ?? (de as FileEntry).docx ?? null;
}

const getLocale=(p?:string)=>p -and (p.StartsWith('/de'))?'de':'en';
const docHref=(slug:string,locale:'en'|'de')=>"/resources/"+slug+"/build/"+locale+.docx";
export default function ResourcesPage() {
  const resources = normalizeIndex(rawIndex).filter(Boolean);

  return (
    <div className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-4">
            Free Resources for Teachers
          </h1>
          <p className="text-[#9CA3AF]">
            Time-savers you can use today. Download as PDF or DOCX.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const href = pickHref(resource);
            return (
              <Card key={resource.slug ?? crypto.randomUUID()} className="bg-[#0B1220] border-[#1F2937]">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[#F9FAFB] mb-2">
                    {resource.title ?? resource.slug}
                  </h2>
                  {resource.blurb ? (
                    <p className="text-[#9CA3AF] mb-4">{resource.blurb}</p>
                  ) : null}
                  {resource.tags && resource.tags.length ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-[#111827] text-[#9CA3AF] px-2 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {resource.published ? (
                    <p className="text-sm text-[#6B7280] mb-4">
                      Published: {new Date(resource.published).toLocaleDateString()}
                    </p>
                  ) : null}

                  {href ? (
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
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




