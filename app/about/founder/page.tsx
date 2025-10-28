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
                {t("about.founder.hero.title")}
              </h1>
              
              <p className="text-xl text-[#D1D5DB] mb-4 leading-relaxed">
                {t("about.founder.hero.intro1")}
              </p>
              
              <p className="text-lg text-[#9CA3AF] mb-8">
                {t("about.founder.hero.intro2")}
              </p>
              
              <Card className="inline-block bg-[#111827] border-[#1F2937] px-6 py-4">
                <p className="font-semibold text-[#F9FAFB]">{t("about.founder.hero.title.name")}</p>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  {t("about.founder.hero.title.role")}
                </p>
              </Card>
            </div>
            
            {/* The Journey */}
            <section className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#F9FAFB] mb-2">{t("about.founder.journey.heading")}</h2>
                <p className="text-[#9CA3AF]">{t("about.founder.journey.subtitle")}</p>
              </div>
              
              <div className="space-y-6 text-lg text-[#D1D5DB] leading-relaxed">
                <p>{t("about.founder.journey.p1")}</p>
                <p>{t("about.founder.journey.p2")}</p>
                <p>{t("about.founder.journey.p3")}</p>
                <p>{t("about.founder.journey.p4")}</p>
                <p>{t("about.founder.journey.p5")}</p>
                <p>{t("about.founder.journey.p6")}</p>
                <p>
                  {t("about.founder.journey.p7").split("2025")[0]}
                  <strong className="text-[#F9FAFB]">2025</strong>
                  {t("about.founder.journey.p7").split("2025")[1].split("Zaza Technologies")[0]}
                  <strong className="text-[#F9FAFB]">Zaza Technologies</strong>
                  {t("about.founder.journey.p7").split("Zaza Technologies")[1]}
                </p>
                <p>{t("about.founder.journey.p8")}</p>
                
                <blockquote className="border-l-4 border-[#7C3AED] pl-6 py-4 my-8 bg-[#111827] italic text-[#D1D5DB]">
                  {t("about.founder.journey.quote")}
                </blockquote>
              </div>
            </section>
            
            {/* Why I Built Zaza */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">{t("about.founder.why.heading")}</h2>
              <p className="text-lg text-[#D1D5DB] mb-8">
                {t("about.founder.why.subtitle")}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle1.title")}</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    {t("about.founder.why.principle1.description")}
                  </p>
                </Card>
                
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle2.title")}</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    {t("about.founder.why.principle2.description")}
                  </p>
                </Card>
                
                <Card className="bg-[#111827] border-[#1F2937] p-6">
                  <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle3.title")}</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    {t("about.founder.why.principle3.description")}
                  </p>
                </Card>
              </div>
            </section>
            
            {/* Personal Note */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">{t("about.founder.note.heading")}</h2>
              <div className="space-y-4 text-lg text-[#D1D5DB] leading-relaxed">
                <p>{t("about.founder.note.p1")}</p>
                <p>{t("about.founder.note.p2")}</p>
                
                <div className="mt-8 pt-6 border-t border-[#1F2937]">
                  <p className="font-semibold text-[#F9FAFB]">{t("about.founder.note.signature.name")}</p>
                  <p className="text-sm text-[#9CA3AF]">{t("about.founder.note.signature.role")}</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
