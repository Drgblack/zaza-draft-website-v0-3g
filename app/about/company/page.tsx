"use client"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { AboutSidebar } from "@/components/about-sidebar"
import { Stat } from "@/components/stat"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"

export default function CompanyPage() {
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
                { label: t("about.company.hero.eyebrow") }
              ]}
            />
            
            {/* Hero */}
            <div className="mb-16">
              <div className="text-sm font-medium text-[#7C3AED] mb-4">
                {t("about.company.hero.eyebrow")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-6">
                {t("about.company.hero.title")}
              </h1>
              <p className="text-2xl font-semibold text-[#F9FAFB]">
                {t("about.company.hero.subtitle")}
              </p>
            </div>
            
            {/* Why Teachers Need Zaza */}
            <section className="mb-16 space-y-6">
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.p1")}
              </p>
              <p className="text-lg font-semibold text-[#F9FAFB]">
                {t("about.company.body.p2")}
              </p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.p3")}
              </p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.p4")}
              </p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.p5")}{" "}
                <Link href="/about/founder" className="text-[#7C3AED] hover:text-[#9333EA] underline">
                  {t("about.company.body.founderLink")}
                </Link>
              </p>
            </section>
            
            {/* Vision Quote */}
            <blockquote className="mb-16 border-l-4 border-[#7C3AED] pl-6 py-4 bg-[#111827]">
              <p className="text-xl italic text-[#D1D5DB]">
                {t("about.company.body.vision")}
              </p>
            </blockquote>
            
            {/* Why Teachers Trust Zaza */}
            <section className="mb-16 space-y-6">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">
                {t("about.company.body.trustHeading")}
              </h2>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                <strong className="text-[#F9FAFB]">{t("about.company.body.trustP1").split('.')[0]}.</strong>
                {t("about.company.body.trustP1").substring(t("about.company.body.trustP1").indexOf('.') + 1)}
              </p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.trustP2")}
              </p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.trustP3")}
              </p>
              <p className="text-lg font-semibold text-[#F9FAFB]">
                {t("about.company.body.trustP4")}
              </p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.trustP5")}
              </p>
              
              {/* Testimonial 1 */}
              <Card className="bg-[#111827] border-[#1F2937] p-6 mt-8">
                <p className="text-[#D1D5DB] italic mb-3">
                  "{t("about.company.body.testimonial1")}"
                </p>
                <p className="text-sm text-[#9CA3AF]">
                  — {t("about.company.body.testimonial1Author")}
                </p>
              </Card>
            </section>
            
            {/* A Day With Zaza */}
            <section className="mb-16 space-y-6">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">
                {t("about.company.body.dayHeading")}
              </h2>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.dayIntro")}
              </p>
              <p className="text-lg font-semibold text-[#F9FAFB]">
                {t("about.company.body.dayChange")}
              </p>
              
              {/* Use cases */}
              <div className="space-y-4 mt-8">
                <div>
                  <p className="text-lg font-semibold text-[#F9FAFB] mb-2">
                    {t("about.company.body.dayDraftQ")}
                  </p>
                  <p className="text-lg text-[#D1D5DB]">
                    {t("about.company.body.dayDraftA")}
                  </p>
                </div>
                
                <div>
                  <p className="text-lg font-semibold text-[#F9FAFB] mb-2">
                    {t("about.company.body.dayTeachQ")}
                  </p>
                  <p className="text-lg text-[#D1D5DB]">
                    {t("about.company.body.dayTeachA")}
                  </p>
                </div>
                
                <div>
                  <p className="text-lg font-semibold text-[#F9FAFB] mb-2">
                    {t("about.company.body.dayGradeQ")}
                  </p>
                  <p className="text-lg text-[#D1D5DB]">
                    {t("about.company.body.dayGradeA")}
                  </p>
                </div>
                
                <div>
                  <p className="text-lg font-semibold text-[#F9FAFB] mb-2">
                    {t("about.company.body.dayShieldQ")}
                  </p>
                  <p className="text-lg text-[#D1D5DB]">
                    {t("about.company.body.dayShieldA")}
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-[#D1D5DB] leading-relaxed mt-8">
                {t("about.company.body.daySummary")}
              </p>
              <p className="text-lg font-semibold text-[#F9FAFB]">
                {t("about.company.body.dayPrinciples")}
              </p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.dayZara")}
              </p>
              
              {/* Testimonial 2 */}
              <Card className="bg-[#111827] border-[#1F2937] p-6 mt-8">
                <p className="text-[#D1D5DB] italic mb-3">
                  "{t("about.company.body.testimonial2")}"
                </p>
                <p className="text-sm text-[#9CA3AF]">
                  — {t("about.company.body.testimonial2Author")}
                </p>
              </Card>
              
              {/* CTA */}
              <div className="mt-8 text-center">
                <p className="text-xl font-semibold text-[#F9FAFB] mb-4">
                  {t("about.company.body.dayCTA")}
                </p>
                <Link 
                  href="/pricing"
                  className="inline-block bg-[#7C3AED] hover:bg-[#9333EA] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  {t("about.company.body.dayCtaLink")}
                </Link>
              </div>
            </section>
            
            {/* Our Promise */}
            <section className="mb-16 space-y-6">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">
                {t("about.company.body.promiseHeading")}
              </h2>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.promiseP1")}
              </p>
              <p className="text-lg font-semibold text-[#F9FAFB]">
                {t("about.company.body.promiseP2")}
              </p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                {t("about.company.body.promiseP3")}
              </p>
            </section>
            
            {/* Stats */}
            <section className="mb-16">
              <Card className="bg-[#111827] border-[#1F2937] p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Stat
                    label={t("about.company.stats.teachers.label")}
                    value={t("about.company.stats.teachers.value")}
                  />
                  <Stat
                    label={t("about.company.stats.countries.label")}
                    value={t("about.company.stats.countries.value")}
                  />
                  <Stat
                    label={t("about.company.stats.timeSaved.label")}
                    value={t("about.company.stats.timeSaved.value")}
                  />
                </div>
              </Card>
            </section>
            
            {/* Footer */}
            <p className="text-center text-sm text-[#9CA3AF] italic">
              {t("about.company.body.footer")}
            </p>
          </main>
        </div>
      </div>
    </div>
  )
}
