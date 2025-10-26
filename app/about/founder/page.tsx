import Image from "next/image";

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full ring-4 ring-purple-500/30">
            <Image
              src="/images/founder-greg.jpg"
              alt="Dr. Greg Blackburn"
              width={256}
              height={256}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Meet the Founder Building AI that Serves Teachers
          </h1>
          <p className="mt-3 text-muted-foreground">
            Zaza helps teachers thrive. Dr. Greg Blackburn spent two decades in Learning and Development before founding Zaza in 2025 to build teacher-first AI. Not a former teacher - a learning scientist and operator focused on giving teachers their time back.
          </p>
          <p className="mt-2 text-muted-foreground">Twenty years in L and D - taught thousands of adults in real classrooms - now building AI so teachers can thrive.</p>

          <div className="mt-6 inline-flex flex-col items-center rounded-xl border border-border/60 bg-card px-5 py-4 text-sm">
            <p className="font-medium">Dr. Greg Blackburn</p>
            <p className="text-muted-foreground">
              Founder and CEO - PhD in Professional Education - EdTech Builder
            </p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto grid gap-10 px-4 py-14 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-4">
            <h2 className="text-xl font-semibold">The Journey</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              From paint brushes in Tasmania to AI founder.
            </p>
          </div>

          <div className="sm:col-span-8 space-y-5 leading-relaxed text-muted-foreground">
            <p>
  I began my working life in Hobart as a painter and decorator while I figured out what came next. My dad owned a local paint factory - Tas Paints - so brushes, colour charts and hard work were part of daily life. Given his contacts in the industry, I moved into TAFE to undertake an apprenticeship.
</p>
<p>
  I soon realised I did not enjoy it. But my dad told me, "Son, just get your papers and you can then do anything you want." So I slugged through and completed my apprenticeship. That experience taught me resilience, the value of hard work, and also the clarity that I did not want to do this all my life.
</p>
<p>
  After finishing, I set off on round-the-world travel. For me this was a journey of discovery - meeting people, seeing countries, learning cultures. I was searching for something else. Somewhere along the way I realised that education was my ticket to a greater purpose. That realisation changed everything - go to university and rebuild my future from first principles.
</p>
            <p>
  I was never a K-12 classroom teacher. In the professional learning and development world, though, I have taught thousands of adults in real classrooms - introducing new technologies at work, building new skills and navigating change. That experience showed me what helps people learn - and what gets in the way - and it keeps me close to the daily realities teachers face.
</p>
            <p>
              I studied Administration, Information Systems and German at the University of Tasmania, earned First Class Honours in Information Systems, worked at Telstra, and completed an MBA at the University of Queensland. My research pulled me deeper into learning science - critical thinking and problem-solving in student-centred e-learning - and I later earned a PhD by publication from City, University of London.
            </p>
            <p>
              I was never a classroom teacher. But much of my family and many close friends are - my sister, cousins, an aunty and uncle, and colleagues who teach every day. I have listened to their stories and seen the workload first-hand: parent emails, report writing, grading, and admin that never ends. The gap was obvious - tools often created more work than they removed.
            </p>
            <p>
              In <strong>2025</strong> I founded <strong>Zaza Technologies</strong> with a simple mission: build AI that respects teacher expertise, is safe and explainable, and gives time back. Zaza is hallucination-aware, privacy-first, and designed with educators, not around them.
            </p>
            <p>
              Today our tools help teachers reduce repetitive admin and focus on the moments that matter with students. We are just getting started.
            </p>
            <blockquote className="mt-6 border-l-4 border-purple-400/60 pl-4 italic text-foreground">
              Every teacher deserves tools that respect their craft and give them time to do what they do best - teach.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Why I Built Zaza */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Why I Built Zaza</h2>
          <p className="mt-2 text-muted-foreground">Three principles that guide everything we do.</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">For Teachers - With Teachers</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Co-designed with educators, validated in real workflows, refined by real feedback.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">Boutique - Not Big Tech</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We serve one audience with care - teachers. Quality over scale, usefulness over hype.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">Safety and Trust</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Privacy-first, school-ready safeguards, and explainable AI so teachers can trust the output.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Note */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold">A Personal Note</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              If you are a teacher, you have probably tried tools that promised hours back and delivered another chore. I understand the scepticism. Zaza is built to be different. We will keep listening, keep improving, and keep choosing clarity and usefulness over noise.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              My door is open. If you have feedback or want to help shape what teachers need next, please reach out.
            </p>

            <div className="mt-8 rounded-xl border border-border/60 bg-card p-5">
              <p className="font-medium">Greg</p>
              <p className="text-sm text-muted-foreground">
                Dr. Greg Blackburn - Founder and CEO - Zaza Technologies
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



