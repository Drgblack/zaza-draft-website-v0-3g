import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Zaza Technologies",
  description: "Teacher-first AI built with educators, not for bureaucracy.",
};

export default function AboutCompanyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <p className="uppercase tracking-wider text-xs text-violet-300/90">About</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold">About Zaza Technologies</h1>
          <p className="mt-4 text-lg text-slate-200 max-w-3xl">
            Teachers didn&apos;t sign up for this much admin.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 prose prose-slate dark:prose-invert">
          <p>
            You became a teacher to inspire minds, not to drown in grading, documentation, and inbox
            management. Yet here we are - with burnout rates climbing and passionate educators
            leaving the profession because the bureaucratic weight has become unsustainable.
          </p>

          <h2>Zaza exists to change that</h2>
          <p>
            Founded in 2025 by a learning scientist with 20 years in professional education, we&apos;re building a
            family of AI apps designed specifically for teachers - not sold to your principal, not chosen by IT, but built
            with educators to solve the problems that actually steal your time and energy.
          </p>

          <h2>What makes us different?</h2>
          <p>
            We&apos;re not another tech company "discovering" education. Zaza is grounded in two decades of
            learning science and workplace education, with thousands of educators shaping our tools through real-world
            feedback. Every product is co-designed with teachers and rooted in research - because shortcuts that
            compromise pedagogy are not shortcuts at all.
          </p>
          <p>
            That&apos;s why we built the <strong>KnowledgeCore</strong> - a trusted intelligence layer that keeps every
            Zaza app explainable, privacy-first, and classroom-ready. No black boxes. No hallucinations that make you
            look foolish. No undermining your professional judgment.
          </p>

          <h2>How it works</h2>
          <p>
            From Zaza Draft (intelligent comment writing) to Zaza Teach (AI lesson planning with AutoPlanner) and
            beyond, every product shares one mission: give you your time back so you can focus on what you do best - teaching.
          </p>

          <h2>Our promise</h2>
          <p>
            We&apos;re not here with big tech promises. We&apos;re here with clarity, usefulness, and trust. Because every
            teacher deserves tools that respect their craft, protect their credibility, and help them thrive.
          </p>
        </div>
      </section>
    </main>
  );
}
