import Link from "next/link";

export const metadata = {
  title: "Zaza Suite — Four Teacher Apps + One Intelligent Platform",
  description:
    "See how Zaza Teach, Draft, GradeFlow and Shield are powered by the KnowledgeCore platform to reduce workload, protect wellbeing and improve learning.",
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-[#334155] bg-[#1E293B] text-white shadow-lg p-6 md:p-8 transition-all duration-300 hover:border-[#8B5CF6] hover:shadow-[0_12px_30px_rgba(139,92,246,0.2)]">
      <h3 className="text-xl md:text-2xl font-semibold text-[#A855F7] mb-4">{title}</h3>
      <div className="mt-3 text-sm md:text-base text-[#CBD5E1]">{children}</div>
    </article>
  );
}

export default function SuitePage() {
  return (
    <main className="bg-[#0F172A] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] pt-32 lg:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/10 px-4 py-2 text-sm font-medium text-[#A78BFA] border border-[#8B5CF6]/30 backdrop-blur-sm">
              <span className="text-xl">✨</span>
              <span>Product Ecosystem</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">The Zaza Suite:</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Four Teacher Apps, One Intelligent Platform
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl text-[#CBD5E1] leading-relaxed">
              Zaza is a family of safe, teacher-first AI apps that work together to reduce workload and improve learning.
              All apps are powered by the Zaza KnowledgeCore platform for trusted, explainable AI.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* TEACHER-FIRST */}
      <section className="bg-[#1E293B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Teachers</h2>
            <p className="text-lg text-[#CBD5E1] leading-relaxed">
              Zaza gives time back and lets educators focus on teaching. Everything is designed with privacy, safeguarding
              and pedagogy at the core—so schools can trust what they deploy.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR APPS */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">The Four Core Apps</h2>
          <div className="grid gap-6 md:gap-8">
            <Card title="Zaza Teach">
              <p>
                AI lesson planning that adapts to your curriculum, saves hours of prep time, and keeps lessons engaging and
                standards-aligned.
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#94A3B8]">
                <li>Auto-planner: complete lesson structure in minutes</li>
                <li>Curriculum-aware: Common Core + international frameworks</li>
                <li>Differentiation helpers &amp; creative activity ideas</li>
              </ul>
              <div className="mt-6">
                <Link href="/products/teach" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all">
                  Learn more about Teach
                </Link>
              </div>
            </Card>

            <Card title="Zaza Draft">
              <p>
                Comment &amp; report writing without burnout—clear, kind communication grounded in teacher wellbeing research.
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#94A3B8]">
                <li>Report &amp; comment templates you can personalise</li>
                <li>Tone guidance and bias checks for fair, supportive feedback</li>
                <li>Private by default; designed for professional, parent-ready copy</li>
              </ul>
              <div className="mt-6">
                <Link href="/products/draft" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all">
                  Learn more about Draft
                </Link>
              </div>
            </Card>

            <Card title="Zaza GradeFlow">
              <p>
                An explainable grading copilot with OCR, rubrics and evidence-based feedback—faster marking with fairness and consistency.
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#94A3B8]">
                <li>Rubric-aligned, audit-ready feedback with cited evidence</li>
                <li>Consistency across classes and assessors</li>
                <li>Exportable marksheets and moderation support</li>
              </ul>
              <div className="mt-6">
                <Link href="/products/gradeflow" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all">
                  Learn more about GradeFlow
                </Link>
              </div>
            </Card>

            <Card title="Zaza Shield">
              <p>
                Communication management that protects teacher wellbeing—drafts difficult emails and helps maintain healthy boundaries.
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#94A3B8]">
                <li>Draft assistant for sensitive parent/admin messages</li>
                <li>Boundary prompts and escalation guidance</li>
                <li>Professional, consistent communication patterns</li>
              </ul>
              <div className="mt-6">
                <Link href="/products/shield" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all">
                  Learn more about Shield
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="bg-[#1E293B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Zaza KnowledgeCore (Platform)</h2>
            <p className="text-lg text-[#CBD5E1] leading-relaxed">
              KnowledgeCore is the secure, intelligent platform that powers every Zaza app. It organises teacher documents,
              enforces privacy &amp; compliance, and provides explainable, audit-ready AI across the suite.
              <span className="font-semibold text-white"> It's not sold as a separate product</span>—it's how the Zaza apps stay consistent,
              safe and connected.
            </p>
            <ul className="mt-6 list-disc pl-6 space-y-2 text-[#94A3B8]">
              <li>Privacy &amp; safeguarding by design</li>
              <li>Shared context across apps (no re-uploading)</li>
              <li>Explainable outputs, rubric alignment and audit trails</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY SCHOOLS */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#334155] bg-[#1E293B] p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Schools Choose Zaza</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-[#CBD5E1]"><span className="font-semibold text-white">Time saved:</span> Teachers recover hours each week.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-[#CBD5E1]"><span className="font-semibold text-white">Retention supported:</span> Lower stress and fairer workload.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-[#CBD5E1]"><span className="font-semibold text-white">Safe &amp; compliant:</span> Data privacy and safeguarding, by default.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-[#CBD5E1]"><span className="font-semibold text-white">Evidence-based:</span> Pedagogy and auditability—not just speed.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="bg-[#1E293B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Roadmap-Ready</h2>
            <p className="text-lg text-[#CBD5E1] leading-relaxed">
              Coming extensions include smarter parent communication, formative assessment synthesis, and differentiation support—
              all delivered via KnowledgeCore so teachers benefit everywhere, not in one tool only.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Start Exploring Today</h2>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/95 mb-10 leading-relaxed">
            Whether you're a teacher seeking relief or a school looking for scalable support, Zaza helps your staff thrive.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-[#8B5CF6] shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105">
              Explore Our Solutions
            </Link>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-white px-8 font-semibold text-white hover:bg-white/10 transition-all">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

