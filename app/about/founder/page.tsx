"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { AboutSidebar } from "@/components/about-sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { useLanguage } from "@/lib/i18n/language-context"

export default function FounderPage() {
  const { t } = useLanguage()
  
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AboutSidebar />
          </aside>
          
          {/* Main content */}
          <main className="max-w-4xl">
            <Breadcrumbs
              items={[
                { label: t("nav.about"), href: "/about" },
                { label: "Founder" }
              ]}
            />
            
            {/* Hero Section */}
            <div className="mb-16 text-center">
              <div className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full ring-4 ring-[#7C3AED]/20">
                <Image
                  src="/greg-blackburn-headshot.jpg"
                  alt="Dr. Greg Blackburn"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-6">
                Meet the Founder Building AI that Serves Teachers
              </h1>
              
              <p className="text-xl text-[#D1D5DB] mb-4 leading-relaxed">
                Zaza helps teachers thrive. Dr. Greg Blackburn spent two decades in Learning and Development 
                before founding Zaza in 2025 to build teacher-first AI. Not a former teacher, a learning scientist 
                and operator focused on giving teachers their time back.
              </p>
              
              <p className="text-lg text-[#9CA3AF] mb-8">
                Twenty years in L and D. Taught thousands of adults in real classrooms. Now building AI so teachers can thrive.
              </p>
              
              <Card className="inline-block bg-[#111827] border-[#1F2937] px-6 py-4">
                <p className="font-semibold text-[#F9FAFB]">Dr. Greg Blackburn</p>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  Founder and CEO · PhD in Professional Education · EdTech Builder
                </p>
              </Card>
            </div>
            
            {/* The Journey */}
            <section className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#F9FAFB] mb-2">The Journey</h2>
                <p className="text-[#9CA3AF]">From paint brushes in Tasmania to AI founder.</p>
              </div>
              
              <div className="space-y-6 text-lg text-[#D1D5DB] leading-relaxed">
                <p>
                  I began my working life in Hobart as a painter and decorator while I figured out what came next. 
                  My dad owned a local paint factory, Tas Paints, so brushes, colour charts and hard work were 
                  part of daily life. Given his contacts in the industry, I moved into TAFE to undertake an apprenticeship.
                </p>
                
                <p>
                  I soon realised I wanted to study, but my careers adviser told me, "Son, just get your papers and 
                  you can then do anything you want." So I slugged through and completed my apprenticeship. That 
                  experience taught me resilience, the value of hard work, and the clarity that I was desperate to study.
                </p>
                
                <p>
                  After finishing, I set off on round-the-world travel. For me this was a journey of discovery, 
                  meeting people, seeing countries, learning cultures. I was searching for something else. Somewhere 
                  along the way I realised that education was my ticket to a greater purpose. That passion endures 
                  today and rebuild my future from first principles.
                </p>
                
                <p>
                  I was never a K-12 classroom teacher. In the professional learning and development world, though, 
                  I have taught thousands of adults in real classrooms. From onboarding new hires, to upskilling 
                  teams, to navigating change. That experience showed me what helps people learn, what gets in 
                  the way, and it keeps me close to the daily realities teachers face.
                </p>
                
                <p>
                  I studied Administration, Information Systems and German at the University of Tasmania, earned 
                  First Class Honours in Information Systems at City University of Queensland. My research pulled 
                  me deeper into learning science, critical thinking and problem-solving in student-centred 
                  e-learning, and I later earned a PhD by publication from City, University of London.
                </p>
                
                <p>
                  I was never a classroom teacher. But much of my family and many close friends are, my sister, 
                  cousins, an aunty and uncle, and colleagues who teach every day. I have listened to their stories 
                  and seen the workload first-hand: parent emails, report writing, grading, and documentation. All 
                  necessary, but so consuming it steals the time and energy teachers need more than they envied.
                </p>
                
                <p>
                  In <strong className="text-[#F9FAFB]">2025</strong> I founded <strong className="text-[#F9FAFB]">Zaza Technologies</strong> with 
                  a simple mission: build AI that respects teacher expertise, is safe and explainable, 
                  gives time back. Zaza is hallucination-aware, privacy-first, and designed with educators, not around them.
                </p>
                
                <p>
                  Today our tools help teachers reduce repetitive admin and focus on the moments that matter with students. 
                  We are just getting started.
                </p>
                
                <blockquote className="border-l-4 border-[#7C3AED] pl-6 py-4 my-8 bg-[#111827] italic text-[#D1D5DB]">
                  Every teacher deserves tools that respect their craft and give them time to do what they do best: teach.
                </blockquote>
              </div>
            </section>
            
            {/* Why I Built Zaza */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">Why I Built Zaza</h2>
              <p className="text-lg text-[#D1D5DB] mb-8">
                Three principles that guide everything we do.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">For Teachers, With Teachers</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    Co-designed with educators, validated in real workflows, refined by real feedback.
                  </p>
                </Card>
                
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">Boutique, Not Big Tech</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    We serve one audience with care: teachers. Quality over scale, usefulness over hype.
                  </p>
                </Card>
                
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">Safety and Trust</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    Privacy-first, school-ready safeguards, and explainable AI so teachers can trust the output.
                  </p>
                </Card>
              </div>
            </section>
            
            {/* Personal Note */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">A Personal Note</h2>
              <div className="space-y-4 text-lg text-[#D1D5DB] leading-relaxed">
                <p>
                  If you are a teacher, you have probably tried tools that promised hours back and delivered another 
                  chore. I understand the skepticism. Zaza is built to be different. We will keep listening, keep 
                  improving, and keep clarity and usefulness over noise.
                </p>
                
                <p>
                  My door is open. If you have feedback or want to help shape what teachers need next, please reach out.
                </p>
                
                <div className="mt-8 pt-6 border-t border-[#1F2937]">
                  <p className="font-semibold text-[#F9FAFB]">Greg</p>
                  <p className="text-sm text-[#9CA3AF]">Dr. Greg Blackburn · Founder and CEO · Zaza Technologies</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
