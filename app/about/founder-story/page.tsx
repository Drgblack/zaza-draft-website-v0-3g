import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const ogImage = "/greg-blackburn-headshot.jpg"
const canonicalUrl = "https://zazadraft.com/about/founder-story"

export const metadata: Metadata = {
  title: "Greg's Founder Story | Zaza Draft",
  description:
    "From paint brushes in Hobart to a PhD in Professional Education and founding Zaza Technologies – Greg Blackburn's full founder story.",
  openGraph: {
    title: "Greg's Founder Story | Zaza Draft",
    description:
      "A deeper look at the journey behind Zaza Draft and Zaza Technologies – why Greg Blackburn built teacher-first AI tools.",
    url: canonicalUrl,
    type: "profile",
    images: [ogImage],
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      de: "https://zazadraft.com/de/about/founder-story",
    },
  },
}

export default function FounderStoryPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/about/founder"
            className="inline-flex items-center text-sm text-[#A78BFA] hover:text-white transition-colors"
          >
            <span className="mr-2 text-lg">←</span>
            Back to Founder page
          </Link>
        </div>

        {/* Hero */}
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] mb-4">
            Founder story
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#E5E7FF]">
            From paint brushes to PhD
          </h1>
          <p className="text-base sm:text-lg text-[rgba(255,255,255,0.8)] max-w-3xl">
            This is the longer version of how I went from an apprenticeship in a
            Tasmanian paint factory to building Zaza Technologies – a suite of
            teacher-first AI tools designed to give educators their time back.
          </p>
        </header>

        {/* Quick timeline */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E7FF] mb-6">
            A quick timeline
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-[rgba(15,23,42,0.95)] border border-[rgba(148,163,184,0.5)] rounded-xl p-6 shadow-lg shadow-black/30 hover:border-[#8B5CF6] hover:shadow-[#8B5CF6]/30 transition-all duration-200">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Early years
              </p>
              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                Paint, TAFE &amp; Cascade Brewery
              </h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Apprenticeship as a painter and decorator in Hobart, a
                pre-vocational TAFE course, and a four year apprenticeship at
                Cascade Brewery. Learned the value of hard work – and that I
                wanted more from education and career.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] rounded-xl p-6">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                University &amp; language
              </p>
              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                UTas &amp; German studies
              </h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Studied Administration, Information Systems and German at the
                University of Tasmania, graduating with First Class Honours and
                discovering a love of research and learning design.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] rounded-xl p-6">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Corporate &amp; leadership
              </p>
              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                Telstra &amp; MBA at UQ
              </h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Moved to Brisbane, worked six years at Telstra, and completed an
                MBA at the University of Queensland – shifting from operations
                into strategy and leadership, and starting to publish early
                research.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] rounded-xl p-6">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Research &amp; EdTech
              </p>
              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                PhD &amp; Chief Learning Officer
              </h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Completed a PhD in Professional Education at City, University of
                London, focusing on critical thinking and problem solving in
                student-centred e-learning. Went on to lead learning strategy as
                Chief Learning Officer at Communardo, working at the intersection
                of technology, learning and change.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] rounded-xl p-6 md:col-span-2">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Zaza Technologies
              </p>
              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                Founding Zaza in 2025
              </h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                After years in learning and development, listening to teachers
                describe late-night marking, reports and admin, I founded Zaza
                Technologies in 2025 to build humane, teacher-first AI tools that
                give educators their time back without compromising their
                professional judgement.
              </p>
            </Card>
          </div>
        </section>

        {/* Long-form narrative */}
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E7FF] mb-6">
            The longer story
          </h2>

          <div className="space-y-8 text-[rgba(226,232,240,0.95)] leading-[1.9] text-sm sm:text-base">
            <p>
              I didn&apos;t grow up planning to work in education or technology. My
              working life began with a paintbrush in hand in Hobart, Tasmania. I
              completed a pre-vocational course at TAFE and a four year
              apprenticeship at Cascade Brewery, learning how to turn up, do the
              work and navigate tough environments. Those years taught me
              resilience – but they also made it clear that I wanted more from my
              working life.
            </p>

            <p>
              Travel opened my world. I lived abroad, studied German and saw
              first-hand how education can unlock new paths. Returning to
              Tasmania, I studied Administration, Information Systems and German
              at the University of Tasmania. Graduating with First Class Honours
              wasn&apos;t just a line on a CV – it was proof that, despite earlier
              doubts and family tensions, I could succeed academically and build
              a new trajectory for myself.
            </p>

            <p>
              My next chapter took me to Brisbane. I joined Telstra and spent six
              years there, moving from operational roles into more strategic work
              while studying for an MBA at the University of Queensland. The MBA
              opened doors into management at UQ, where I became a Business
              Manager. It was there that I began publishing research into how
              people learn, solve problems and think in complex organisations.
            </p>

            <p>
              Around this time my two daughters, Viola and Solara, were born.
              Fatherhood reframed everything. Success stopped being just about
              titles or promotions and became about creating work that would one
              day mean something to them – work that left time and emotional
              space for family, not just endless hustle.
            </p>

            <p>
              Driven by curiosity, I later completed a PhD in Professional
              Education at City, University of London, by publication. My
              research focused on critical thinking and problem solving in
              student-centred e-learning. Over the years I published widely,
              taught thousands of organisational staff, and eventually moved into
              the role of Chief Learning Officer at Communardo. I found myself at
              the intersection of learning, technology and organisational change.
            </p>

            <p>
              Yet alongside all of this, I was listening to the struggles of
              teachers and learning professionals – especially those in schools.
              I heard about late-night marking, Sunday spent writing reports, and
              the emotional toll of constant communication with very little
              support. AI tools were starting to appear, but most felt generic and
              unsafe for education: they ignored context, invented information and
              often created more work to check than they saved.
            </p>

            <p>
              That gap planted a seed. What if AI tools could be designed
              specifically for teachers – grounded in pedagogy, respectful of
              professional judgement and built to reduce workload rather than
              increase it? What if they could help teachers reclaim a few hours
              each week without sacrificing the quality of their teaching or their
              relationships with students and families?
            </p>

            <p>
              In 2025, that question became Zaza Technologies. Zaza Draft, our
              first product, focuses on one of the most emotionally demanding
              parts of a teacher&apos;s job: written communication with parents and
              carers. From there, the wider Zaza suite is growing into lesson
              planning, grading support and other tools that quietly sit in the
              background while teachers do what only they can do – teach, care
              and build trust.
            </p>

            <p>
              For me, Zaza is more than a company. It is a way of bringing
              together decades of experience in learning and development, my
              research into critical thinking and problem solving, the realities I
              have heard from teachers, and my desire to leave something
              meaningful to my daughters. It is my way of proving that EdTech can
              be built with empathy, rigour and a deep respect for the profession
              it serves.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="pb-20 border-t border-[rgba(148,163,184,0.3)] pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#E5E7FF] mb-4">
                Where this story leads
              </h2>
              <p className="text-sm sm:text-base text-[rgba(226,232,240,0.9)] max-w-xl">
                If this story resonates with you, I&apos;d love you to explore Zaza
                Draft and see how it might support your own work. And if you have
                thoughts or feedback, my door is open.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about/founder"
                className="inline-flex items-center px-4 py-2 rounded-full border border-[rgba(148,163,184,0.6)] text-sm hover:bg-white hover:text-[#050816] transition-colors"
              >
                Back to Founder page
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-sm font-medium shadow-lg shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/50 transition-transform hover:scale-105"
              >
                Try Zaza Draft
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
