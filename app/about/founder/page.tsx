"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

export default function FounderPage() {
  const { t } = useLanguage()
  
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Minimal Breadcrumb */}
        <div className="mb-12">
          <Breadcrumbs
            items={[
              { label: t("nav.about"), href: "/about" },
              { label: "Founder" }
            ]}
            className="text-sm text-[#6B7280]"
          />
        </div>
        
        {/* Hero Section */}
        <div className="mb-20 text-center">
          {/* Photo with Purple Glow */}
          <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full ring-4 ring-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.7)]">
            <Image
              src="/greg-blackburn-headshot.jpg"
              alt="Dr. Greg Blackburn"
              width={128}
              height={128}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          
          {/* Styled Badge Instead of Plain Text */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 mb-6">
            <span className="text-sm font-medium text-[#8B5CF6] tracking-wide uppercase">
              Founder & Educator
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-8 leading-tight">
            {t("about.founder.hero.title")}
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-[#D1D5DB] leading-relaxed">
              {t("about.founder.hero.intro1")}
            </p>
            
            <p className="text-lg text-[#9CA3AF] leading-relaxed">
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
        
        {/* The Journey - with improved spacing and callouts */}
        <section className="mb-20">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#F9FAFB] mb-3">{t("about.founder.journey.heading")}</h2>
            <p className="text-lg text-[#9CA3AF]">{t("about.founder.journey.subtitle")}</p>
          </div>
          
          <div className="space-y-6 text-lg text-[#D1D5DB] leading-[1.8]">
            <p>{t("about.founder.journey.p1")}</p>
            <p>{t("about.founder.journey.p2")}</p>
            <p>{t("about.founder.journey.p3")}</p>
            <p>{t("about.founder.journey.p4")}</p>
            <p>{t("about.founder.journey.p5")}</p>
            
            {/* Callout block with side border */}
            <div className="border-l-4 border-[#8B5CF6] pl-6 py-4 my-8 bg-[#8B5CF6]/5 rounded-r-lg">
              <p className="text-[#E5E7EB] leading-[1.8]">{t("about.founder.journey.p6")}</p>
            </div>
            
            <p>{t("about.founder.journey.p7")}</p>
            <p>{t("about.founder.journey.p8")}</p>
            <p>{t("about.founder.journey.p9")}</p>
            
            {/* Final callout */}
            <div className="border-l-4 border-[#8B5CF6] pl-6 py-4 my-8 bg-[#8B5CF6]/5 rounded-r-lg">
              <p className="text-xl font-semibold text-[#F9FAFB] italic">{t("about.founder.journey.p10")}</p>
            </div>
            
            {/* Inspiring quote */}
            <blockquote className="text-center py-8 my-8">
              <p className="text-2xl font-medium text-[#8B5CF6] italic">
                {t("about.founder.journey.quote")}
              </p>
            </blockquote>
          </div>
        </section>
        
        {/* Why I Built Zaza - with icons */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">{t("about.founder.why.heading")}</h2>
          
          <div className="space-y-6 text-lg text-[#D1D5DB] leading-[1.8] mb-10">
            <p>{t("about.founder.why.mission")}</p>
            <p>{t("about.founder.why.principles")}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-[#111827] border-[#1F2937] p-6 hover:border-[#8B5CF6]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle1.title")}</h3>
              <p className="text-sm text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle1.description")}
              </p>
            </Card>
            
            <Card className="bg-[#111827] border-[#1F2937] p-6 hover:border-[#8B5CF6]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle2.title")}</h3>
              <p className="text-sm text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle2.description")}
              </p>
            </Card>
            
            <Card className="bg-[#111827] border-[#1F2937] p-6 hover:border-[#8B5CF6]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="font-semibold text-[#F9FAFB] mb-3">{t("about.founder.why.principle3.title")}</h3>
              <p className="text-sm text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle3.description")}
              </p>
            </Card>
          </div>
          
          <Card className="bg-[#8B5CF6]/5 border-[#8B5CF6]/30 p-8 text-center">
            <p className="text-[#9CA3AF] text-sm mb-2">{t("about.founder.why.subtitle")}</p>
            <p className="text-4xl font-bold text-[#F9FAFB] mt-4">2,400+ Teachers</p>
            <p className="text-[#D1D5DB] mt-2">already co-designing Zaza with us across 43 countries</p>
          </Card>
        </section>
        
        {/* Personal Note */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#F9FAFB] mb-8">{t("about.founder.note.heading")}</h2>
          <div className="space-y-6 text-lg text-[#D1D5DB] leading-[1.8]">
            <p>{t("about.founder.note.p1")}</p>
            <p>{t("about.founder.note.p2")}</p>
            
            <div className="mt-8 pt-6 border-t border-[#1F2937]">
              <p className="font-semibold text-[#F9FAFB] text-xl">{t("about.founder.note.signature.name")}</p>
              <p className="text-sm text-[#9CA3AF] mt-1">{t("about.founder.note.signature.role")}</p>
            </div>
          </div>
        </section>
        
        {/* Enhanced CTA with Glow */}
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
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            Start your free 14-day trial
          </Link>
        </section>
      </div>
    </div>
  )
}
