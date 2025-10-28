import type { Metadata } from "next";
import Image from "next/image";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Meet the Founder | Dr. Greg Blackburn - Zaza Technologies",
  description: "Building AI that serves teachers. Over 20 years in L&D and a PhD in Professional Education.",
};

export default function FounderPage({ searchParams }:{ searchParams: Record<string, string | string[] | undefined> }) {
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  const acceptLang = (headers().get('accept-language') || '').toLowerCase();
  const wantsDE = cookieLocale === 'de' || acceptLang.startsWith('de') || (typeof searchParams?.lang === 'string' && searchParams.lang === 'de');
  if (wantsDE) { redirect('/de/about/founder'); }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 text-center">
          <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full ring-4 ring-violet-500/40">
            <Image
              src="/images/founder-greg.jpg"
              alt="Dr. Greg Blackburn"
              width={256}
              height={256}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <p className="uppercase tracking-wider text-xs text-violet-300/90">Founder</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold">Meet Dr. Greg Blackburn</h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto">
            Building AI that serves teachers - grounded in research and practice.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 prose prose-slate dark:prose-invert">
          <h2>The Journey</h2>
          <p>
            I began my working life in Hobart as a painter and decorator while I figured out what came next. My dad owned a local paint factory - Tas Paints - so brushes, colour charts and hard work were part of daily life. Given his contacts in the industry, I moved into TAFE to undertake an apprenticeship.
          </p>
          <p>
            I soon realised I did not enjoy it. But my dad told me, &quot;Son, just get your papers and you can then do anything you want.&quot; So I slugged through and completed my apprenticeship. That experience taught me resilience, the value of hard work, and also the clarity that I did not want to do this all my life.
          </p>
          <p>
            After finishing, I set off on round-the-world travel. For me this was a journey of discovery - meeting people, seeing countries, learning cultures. I was searching for something else. Somewhere along the way I realised that education was my ticket to a greater purpose. That realisation changed everything - go to university and rebuild my future from first principles.
          </p>

          <h2>Teaching Adults, Not Children</h2>
          <p>
            I was never a K-12 classroom teacher. In the professional learning and development world, though, I have taught thousands of adults in real classrooms - introducing new technologies at work, building new skills and navigating change. That experience showed me what helps people learn - and what gets in the way - and it keeps me close to the daily realities teachers face.
          </p>

          <h2>Academic Foundation</h2>
          <p>
            I studied Administration, Information Systems and German at the University of Tasmania, earned First Class Honours in Information Systems, worked at Telstra, and completed an MBA at the University of Queensland. My research pulled me deeper into learning science - critical thinking and problem-solving in student-centred e-learning - and I later earned a PhD by publication from City, University of London.
          </p>

          <h2>Why Zaza?</h2>
          <p>
            I was never a classroom teacher. But much of my family and many close friends are - my sister, cousins, an aunty and uncle, and colleagues who teach every day. I have listened to their stories and seen the workload first-hand: parent emails, report writing, grading, and admin that never ends. The gap was obvious - tools often created more work than they removed.
          </p>
          <p>
            In <strong>2025</strong> I founded <strong>Zaza Technologies</strong> with a simple mission: build AI that respects teacher expertise, is safe and explainable, and gives time back. Zaza is hallucination-aware, privacy-first, and designed with educators, not around them.
          </p>
          <p>
            Today our tools help teachers reduce repetitive admin and focus on the moments that matter with students. We are just getting started.
          </p>

          <blockquote>
            Every teacher deserves tools that respect their craft and give them time to do what they do best - teach.
          </blockquote>

          <h2>Three Principles</h2>
          <h3>For Teachers - With Teachers</h3>
          <p>
            Co-designed with educators, validated in real workflows, refined by real feedback.
          </p>

          <h3>Boutique - Not Big Tech</h3>
          <p>
            We serve one audience with care - teachers. Quality over scale, usefulness over hype.
          </p>

          <h3>Safety and Trust</h3>
          <p>
            Privacy-first, school-ready safeguards, and explainable AI so teachers can trust the output.
          </p>

          <h2>A Personal Note</h2>
          <p>
            If you are a teacher, you have probably tried tools that promised hours back and delivered another chore. I understand the scepticism. Zaza is built to be different. We will keep listening, keep improving, and keep choosing clarity and usefulness over noise.
          </p>
          <p>
            My door is open. If you have feedback or want to help shape what teachers need next, please reach out.
          </p>
          <p>
            <strong>Greg</strong><br />
            Dr. Greg Blackburn - Founder and CEO - Zaza Technologies
          </p>
        </div>
      </section>
    </main>
  );
}
