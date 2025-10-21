"use client";

import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Item = { slug: string; href: string };

const ITEMS: Item[] = [
  { slug: "ai-prompt-library",         href: "/resources/ai-prompt-library/build/en.docx" },
  { slug: "ai-rubric-prompts",         href: "/resources/ai-rubric-prompts/build/en.docx" },
  { slug: "assessment-rubrics",        href: "/resources/assessment-rubrics/build/en.docx" },
  { slug: "classroom-management",      href: "/resources/classroom-management/build/en.docx" },
  { slug: "end-of-term-comments",      href: "/resources/end-of-term-comments/build/en.docx" },
  { slug: "lesson-planning-templates", href: "/resources/lesson-planning-templates/build/en.docx" },
  { slug: "parent-message-templates",  href: "/resources/parent-message-templates/build/en.docx" },
  { slug: "teacher-time-playbook",     href: "/resources/teacher-time-playbook/build/en.docx" },
  { slug: "tone-checklist",            href: "/resources/tone-checklist/build/en.docx" },
  { slug: "weekly-newsletter-bundle",  href: "/resources/weekly-newsletter-bundle/build/en.docx" },
];

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

const DEFAULTS: Record<string, { title: string; blurb: string }> = {
  "ai-prompt-library":         { title: "The Teacher’s AI Prompt Library",          blurb: "Reusable prompts for emails, feedback, lesson hooks, and differentiation." },
  "ai-rubric-prompts":         { title: "AI Rubric Prompts",                        blurb: "Ready-to-run prompts that generate clear, student-friendly rubrics." },
  "assessment-rubrics":        { title: "Differentiated Rubric Kit",                blurb: "Editable rubrics for essays, presentations, and group work with next-step lines." },
  "classroom-management":      { title: "The Reset Routine Guide",                  blurb: "First-5-min routine, non-verbal redirects, and short scripts to keep lessons calm." },
  "end-of-term-comments":      { title: "Comment Bank Builder",                     blurb: "Balanced, personalised report comments using Strength → Growth → Next Step." },
  "lesson-planning-templates": { title: "Flexible Lesson Plan Templates (DOCX)",    blurb: "5E, Workshop, Direct Instruction, and Quick Plan templates with checks & supports." },
  "parent-message-templates":  { title: "Parent Communication Toolkit",             blurb: "Clear, compassionate templates for positives, concerns, missing work, and intros." },
  "teacher-time-playbook":     { title: "Batch & Automate Playbook",                blurb: "Weekly batching, inbox-zero flow, and simple automations to save hours each week." },
  "tone-checklist":            { title: "Professional Tone Checklist",              blurb: "One-page pre-send check: clarity, tone, facts, action, polish." },
  "weekly-newsletter-bundle":  { title: "“This Week in Our Class” Bundle",          blurb: "Three editable newsletter layouts plus a quick content idea bank." }
};

export default function ResourcesPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-2">Free Resources for Teachers</h1>
          <p className="text-[#9CA3AF]">Time-savers you can use today (live). Download as PDF or DOCX.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ slug, href }) => {
            const meta = DEFAULTS[slug] ?? { title: humanizeSlug(slug), blurb: "" };
            const title = meta.title || humanizeSlug(slug);
            const blurb = meta.blurb;
            return (
              <Card key={slug} className="bg-[#111827] border-[#1F2937]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                  {blurb && <p className="text-[#9CA3AF] mb-4">{blurb}</p>}
                  <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all">
                    <a href={href} download={getDownloadName(title, href)} className="flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
