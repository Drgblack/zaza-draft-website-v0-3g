"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { AboutSidebar } from "@/components/about-sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

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
            <div className="mb-20 text-center">
              <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full ring-4 ring-[#7C3AED]/20">
                <Image
                  src="/greg-blackburn-headshot.jpg"
                  alt="Dr. Greg Blackburn"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              
              <p className="text-sm font-medium text-[#9CA3AF] mb-6 tracking-wide uppercase">Founder & Educator</p>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-8">
                Meet the Educator Building AI to Give Teachers Their Time Back
              </h1>
              
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-xl text-[#D1D5DB] leading-relaxed">
                  {t("about.founder.hero.intro1")}
                </p>
                
                <p className="text-lg text-[#9CA3AF]">
                  {t("about.founder.hero.intro2")}
                </p>
              </div>
              
              <Card className="inline-block bg-[#111827] border-[#1F2937] px-6 py-4 mt-8">
                <p className="font-semibold text-[#F9FAFB]">{t("about.founder.hero.title.name")}</p>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  {t("about.founder.hero.title.role")}
                </p>
              </Card>
            </div>
            
            {/* The Journey */}
            <section className="mb-20">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#F9FAFB] mb-3">{t("about.founder.journey.heading")}</h2>
                <p className="text-lg text-[#9CA3AF]">{t("about.founder.journey.subtitle")}</p>
              </div>
              
              <div className="space-y-6 text-lg text-[#D1D5DB] leading-relaxed">
                <p>{t("about.founder.journey.p1")}</p>
                <p>{t("about.founder.journey.p2")}</p>
                <p>{t("about.founder.journey.p3")}</p>
                <p>{t("about.founder.journey.p3b")}</p>
                <p>{t("about.founder.journey.p4")}</p>
                <p>{t("about.founder.journey.p5")}</p>
                <p className="text-xl font-semibold text-[#F9FAFB] italic">{t("about.founder.journey.p6")}</p>
              </div>
            </section>
            
            {/* Why I Built Zaza */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">{t("about.founder.why.heading")}</h2>
              
              <div className="space-y-6 text-lg text-[#D1D5DB] leading-relaxed mb-10">
                <p>{t("about.founder.journey.p7")}</p>
                <p>{t("about.founder.journey.p8")}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle1.title")}</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    {t("about.founder.why.principle1.description")}
                  </p>
                </Card>
                
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle2.title")}</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    {t("about.founder.why.principle2.description")}
                  </p>
                </Card>
                
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle3.title")}</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    {t("about.founder.why.principle3.description")}
                  </p>
                </Card>
              </div>
              
              <Card className="bg-[#7C3AED]/5 border-[#7C3AED]/30 p-8 text-center">
                <p className="text-[#9CA3AF] text-sm mb-2">{t("about.founder.why.subtitle")}</p>
                <p className="text-3xl font-bold text-[#F9FAFB] mt-4">2,400+ Teachers</p>
                <p className="text-[#D1D5DB] mt-2">already co-designing Zaza with us across 43 countries</p>
              </Card>
            </section>
            
            {/* Personal Note */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-8">{t("about.founder.note.heading")}</h2>
              <div className="space-y-6 text-lg text-[#D1D5DB] leading-relaxed">
                <p>{t("about.founder.note.p1")}</p>
                <p>{t("about.founder.note.p2")}</p>
                
                <div className="mt-8 pt-6 border-t border-[#1F2937]">
                  <p className="font-semibold text-[#F9FAFB] text-xl">{t("about.founder.note.signature.name")}</p>
                  <p className="text-sm text-[#9CA3AF] mt-1">{t("about.founder.note.signature.role")}</p>
                </div>
              </div>
            </section>
            
            {/* CTA Section */}
            <section className="text-center py-12 border-t border-[#1F2937]">
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">
                Join 2,400+ teachers shaping the future of Zaza
              </h3>
              <p className="text-[#D1D5DB] mb-2">
                Built with teachers, for teachers.
              </p>
              <p className="text-[#9CA3AF] mb-8">
                Start saving 10+ hours per week with AI that respects your craft.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg transition-colors"
              >
                Start your free 14-day trial
              </Link>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
