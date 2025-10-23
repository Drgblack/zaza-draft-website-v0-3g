import Link from "next/link";

export const metadata = {
  title: "Zaza Suite — Four Teacher Apps + One Intelligent Platform",
  description:
    "See how Zaza Teach, Draft, GradeFlow and Shield are powered by the KnowledgeCore platform to reduce workload, protect wellbeing and improve learning.",
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 md:p-8">
      <h3 className="text-lg md:text-xl font-semibold text-violet-400">{title}</h3>
      <div className="mt-3 text-sm md:text-base text-foreground/85">{children}</div>
    </article>
  );
}

export default function SuitePage() {
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="container mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground/80">
          Product Ecosystem
        </div>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
          The Zaza Suite: Four Teacher Apps, One Intelligent Platform
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/85">
          Zaza is a family of safe, teacher-first AI apps that work together to reduce workload and improve learning.
          All apps are powered by the Zaza KnowledgeCore platform for trusted, explainable AI.
        </p>
      </section>

      {/* TEACHER-FIRST */}
      <section className="container mx-auto px-4 md:px-6 pb-8">
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Built for Teachers</h2>
          <p className="mt-3 text-foreground/85">
            Zaza gives time back and lets educators focus on teaching. Everything is designed with privacy, safeguarding
            and pedagogy at the core—so schools can trust what they deploy.
          </p>
        </div>
      </section>

      {/* FOUR APPS */}
      <section className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">The Four Core Apps</h2>
        <div className="mt-6 grid gap-4">
          <Card title="Zaza Teach">
            <p>
              AI lesson planning that adapts to your curriculum, saves hours of prep time, and keeps lessons engaging and
              standards-aligned.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Auto-planner: complete lesson structure in minutes</li>
              <li>Curriculum-aware: Common Core + international frameworks</li>
              <li>Differentiation helpers &amp; creative activity ideas</li>
            </ul>
            <div className="mt-4">
              <Link href="/products/teach" className="inline-flex h-10 items-center justify-center rounded-xl border px-4 font-semibold hover:bg-muted">
                Learn more about Teach
              </Link>
            </div>
          </Card>

          <Card title="Zaza Draft">
            <p>
              Comment &amp; report writing without burnout—clear, kind communication grounded in teacher wellbeing research.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Report &amp; comment templates you can personalise</li>
              <li>Tone guidance and bias checks for fair, supportive feedback</li>
              <li>Private by default; designed for professional, parent-ready copy</li>
            </ul>
            <div className="mt-4">
              <Link href="/products/draft" className="inline-flex h-10 items-center justify-center rounded-xl border px-4 font-semibold hover:bg-muted">
                Learn more about Draft
              </Link>
            </div>
          </Card>

          <Card title="Zaza GradeFlow">
            <p>
              An explainable grading copilot with OCR, rubrics and evidence-based feedback—faster marking with fairness and consistency.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Rubric-aligned, audit-ready feedback with cited evidence</li>
              <li>Consistency across classes and assessors</li>
              <li>Exportable marksheets and moderation support</li>
            </ul>
            <div className="mt-4">
              <Link href="/products/gradeflow" className="inline-flex h-10 items-center justify-center rounded-xl border px-4 font-semibold hover:bg-muted">
                Learn more about GradeFlow
              </Link>
            </div>
          </Card>

          <Card title="Zaza Shield">
            <p>
              Communication management that protects teacher wellbeing—drafts difficult emails and helps maintain healthy boundaries.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Draft assistant for sensitive parent/admin messages</li>
              <li>Boundary prompts and escalation guidance</li>
              <li>Professional, consistent communication patterns</li>
            </ul>
            <div className="mt-4">
              <Link href="/products/shield" className="inline-flex h-10 items-center justify-center rounded-xl border px-4 font-semibold hover:bg-muted">
                Learn more about Shield
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Zaza KnowledgeCore (Platform)</h2>
          <p className="mt-3 text-foreground/85">
            KnowledgeCore is the secure, intelligent platform that powers every Zaza app. It organises teacher documents,
            enforces privacy &amp; compliance, and provides explainable, audit-ready AI across the suite.
            <span className="font-semibold"> It’s not sold as a separate product</span>—it’s how the Zaza apps stay consistent,
            safe and connected.
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-1 text-foreground/85">
            <li>Privacy &amp; safeguarding by design</li>
            <li>Shared context across apps (no re-uploading)</li>
            <li>Explainable outputs, rubric alignment and audit trails</li>
          </ul>
        </div>
      </section>

      {/* WHY SCHOOLS */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Why Schools Choose Zaza</h2>
          <ul className="mt-4 list-disc pl-6 space-y-1 text-foreground/85">
            <li><span className="font-semibold text-foreground">Time saved:</span> Teachers recover hours each week.</li>
            <li><span className="font-semibold text-foreground">Retention supported:</span> Lower stress and fairer workload.</li>
            <li><span className="font-semibold text-foreground">Safe &amp; compliant:</span> Data privacy and safeguarding, by default.</li>
            <li><span className="font-semibold text-foreground">Evidence-based:</span> Pedagogy and auditability—not just speed.</li>
          </ul>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Roadmap-Ready</h2>
          <p className="mt-3 text-foreground/85">
            Coming extensions include smarter parent communication, formative assessment synthesis, and differentiation support—
            all delivered via KnowledgeCore so teachers benefit everywhere, not in one tool only.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-400 text-white p-8 md:p-10 text-center shadow">
          <h2 className="text-2xl md:text-3xl font-semibold">Start Exploring Today</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Whether you’re a teacher seeking relief or a school looking for scalable support, Zaza helps your staff thrive.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/solutions" className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 font-semibold text-violet-700 shadow hover:bg-white/95">
              Explore Our Solutions
            </Link>
            <Link href="/contact" className="inline-flex h-10 items-center justify-center rounded-xl border border-white/80 px-4 font-semibold text-white hover:bg-white/10">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}