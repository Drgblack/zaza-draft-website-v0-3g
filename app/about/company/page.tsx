import Link from "next/link";

export const metadata = {
  title: "About Zaza Technologies",
  description: "Why Zaza exists, how we’re different, and our promise to teachers.",
};

export default function CompanyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">About Zaza Technologies</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Teachers didn't sign up for this much admin.
        </p>
        <p className="text-sm text-muted-foreground">
          You became a teacher to inspire minds, not to drown in grading, documentation, and inbox
          management. Yet here we are - with burnout rates climbing and passionate educators leaving the
          profession because the bureaucratic weight has become unsustainable.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold">Zaza exists to change that</h2>
        <p className="text-sm text-muted-foreground">
          Founded in 2025 by a learning scientist with 20 years in professional education, we're
          building a family of AI apps designed specifically for teachers - not sold to your principal,
          not chosen by IT, but built with educators to solve the problems that actually steal your time
          and energy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">What makes us different?</h2>
        <p className="text-sm text-muted-foreground">
          We're not another tech company "discovering" education. Zaza is grounded in two decades of
          learning science and workplace education, with thousands of educators shaping our tools through
          real-world feedback. Every product is co-designed with teachers and rooted in research - because
          shortcuts that compromise pedagogy are not shortcuts at all.
        </p>
        <p className="text-sm text-muted-foreground">
          That's why we built the <strong>KnowledgeCore</strong> - a trusted intelligence layer that keeps
          every Zaza app explainable, privacy-first, and classroom-ready. No black boxes. No hallucinations
          that make you look foolish. No undermining your professional judgment.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="text-sm text-muted-foreground">
          From <Link href="/products/draft" className="underline">Zaza Draft</Link> (intelligent comment writing)
          to <Link href="/products/teach" className="underline">Zaza Teach</Link> (AI lesson planning with
          AutoPlanner) and beyond, every product shares one mission: give you your time back so you can focus
          on what you do best - teaching.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Our promise</h2>
        <p className="text-sm text-muted-foreground">
          We're not here with big tech promises. We're here with clarity, usefulness, and trust. Because every
          teacher deserves tools that respect their craft, protect their credibility, and help them thrive.
        </p>
      </section>
    </main>
  );
}
