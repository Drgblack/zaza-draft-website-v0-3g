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
              alt="Dr Greg Blackburn"
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
            Zaza helps teachers thrive. Dr Greg Blackburn spent two decades in Learning and Development before founding Zaza in 2025 to build teacher-first AI. Not a former teacher - a learning scientist and operator focused on giving teachers their time back.
          </p>
          <div className="mt-6 inline-flex flex-col items-center rounded-xl border border-border/60 bg-card px-5 py-4 text-sm">
            <p className="font-medium">Dr Greg Blackburn</p>
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
              I began my working life in Hobart as a painter and decorator while figuring out what came next. My dad owned a local paint factory - Tas Paints - so brushes, colour charts and hard work were part of daily life. That start taught me care for detail, resilience, and what it feels like when expectations are set low. I moved into TAFE, completed an apprenticeship, then made a decision that changed everything - go to university and rebuild my future from first principles.
            </p>
            <p>
              I studied Administration, Information Systems and German at the University of Tasmania, earned First Class Honours in Information Systems, worked at Telstra, and completed an MBA at the University of Queensland. My research pulled me deeper into learning science - critical thinking and problem-solving in student-centred eLearning - and I later earned a PhD by publication from City, University of London.
            </p>
          </div>
        </div>
      </section>

      {/* L&D Experience */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold">My Learning and Development Experience</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            For more than 20 years I have worked in professional learning and workplace education. I have taught thousands of adults in real classrooms, introducing new technologies, building new skills, and guiding people through change.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            At Telstra and the University of Queensland I designed interventions to help staff adopt IT systems and digital tools, and built blended programmes that combined workshops with online modules. My PhD research focused on how student-centred eLearning can strengthen critical thinking and problem-solving.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            At Communardo I led the redesign of the Learning Centre into an AI-first federated model, creating leadership pathways for both junior and senior staff. I also introduced change-readiness training, soft skills development, and most recently, AI-enhanced training for onboarding, compliance, and productivity learning.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Across all of this my approach has been consistent: respect pedagogy, focus on transfer of learning, and connect innovation to usability. The impact - learners gain confidence, adapt to change, and thrive with new tools. With Zaza I am now productising this experience into AI-powered tools that give teachers the same advantage - scaffolds that save time, reduce admin, and strengthen practice in the classroom.
          </p>
        </div>
      </section>

      {/* Why I Built Zaza */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Why I Built Zaza</h2>
          <p className="mt-2 text-muted-foreground">Three principles guide everything we do.</p>
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
              I was never a classroom teacher. But much of my family and close friends are - my sister, cousins, an aunty and uncle, plus colleagues who teach every day. I have listened to their stories and seen the workload first hand: parent emails, report writing, grading, and admin that never ends. The gap was obvious - tools often created more work than they removed.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              If you are a teacher, you have probably tried tools that promised hours back and delivered another chore. I understand the scepticism. Zaza is built to be different. We will keep listening, keep improving, and keep choosing clarity and usefulness over noise.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              My door is open. If you have feedback or want to help shape what teachers need next, please reach out.
            </p>

            <div className="mt-8 rounded-xl border border-border/60 bg-card p-5">
              <p className="font-medium">Greg</p>
              <p className="text-sm text-muted-foreground">
                Dr Greg Blackburn - Founder and CEO - Zaza Technologies
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

