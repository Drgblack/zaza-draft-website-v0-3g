import Image from "next/image";

export default function AboutCompanyPage({ searchParams }:{ searchParams?: Record<string,string> }) {
  try {
    const { cookies, headers } = require("next/headers");
    const { redirect } = require("next/navigation");
    const cookieLocale = cookies().get("NEXT_LOCALE")?.value;
    const acceptLang = (headers().get("accept-language") || "").toLowerCase();
    const wantsDE = cookieLocale === "de" || acceptLang.startsWith("de") || (searchParams?.lang === "de");
    if (wantsDE) { redirect("/de/about/company"); }
  } catch {}

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About Zaza Technologies</h1>
          <p className="mt-4 text-muted-foreground">
            Teachers didn&apos;t sign up for this much admin.
          </p>
          <p className="mt-2 text-muted-foreground">
            You became a teacher to inspire minds, not to drown in grading, documentation, and inbox management. Yet here we are - with burnout rates climbing and passionate educators leaving the profession because the bureaucratic weight has become unsustainable.
          </p>
        </div>
      </section>

      {/* Problem -> Solution */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold">Zaza exists to change that</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Founded in 2025 by a learning scientist with 20 years in professional education, we&apos;re building a family of AI apps designed specifically for teachers - not sold to your principal, not chosen by IT, but built <em>with educators</em> to solve the problems that actually steal your time and energy.
            </p>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold">What makes us different?</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            We&apos;re not another tech company "discovering" education. Zaza is grounded in two decades of learning science and workplace education, with thousands of educators shaping our tools through real-world feedback. Every product is co-designed with teachers and rooted in research - because shortcuts that compromise pedagogy are not shortcuts at all.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            That&apos;s why we built the <strong>KnowledgeCore</strong> - a trusted intelligence layer that keeps every Zaza app explainable, privacy-first, and classroom-ready. No black boxes. No hallucinations that make you look foolish. No undermining your professional judgment.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold">How it works</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              From <strong>Zaza Draft</strong> (intelligent comment writing) to <strong>Zaza Teach</strong> (AI lesson planning with AutoPlanner) and beyond, every product shares one mission: give you your time back so you can focus on what you do best - teaching.
            </p>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold">Our promise</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            We&apos;re not here with big tech promises. We&apos;re here with clarity, usefulness, and trust. Because every teacher deserves tools that respect their craft, protect their credibility, and help them thrive.
          </p>
        </div>
      </section>
    </main>
  );
}

