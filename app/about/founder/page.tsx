"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

export default function FounderPage() {
  const { t } = useLanguage()
  
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-24 text-center">
          {/* Photo with Animated Purple Glow */}
          <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full ring-4 ring-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] animate-pulse-glow">
            <Image
              src="/greg-blackburn-headshot.jpg"
              alt="Dr. Greg Blackburn"
              width={128}
              height={128}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          
          {/* Styled Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 mb-6">
            <span className="text-sm font-medium text-[#8B5CF6] tracking-wide uppercase">
              Founder & Educator
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-8 leading-tight">
            {t("about.founder.hero.title")}
          </h1>
          
          {/* Bio Card */}
          <Card className="inline-block bg-[#111827]/50 border-[#8B5CF6]/20 px-8 py-5 mb-8 backdrop-blur-sm">
            <p className="text-[#D1D5DB] text-base leading-relaxed max-w-2xl">
              PhD in Professional Education. 20 years in Learning & Development. Founder of Zaza Technologies to help teachers thrive.
            </p>
          </Card>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-[#D1D5DB] leading-relaxed">
              {t("about.founder.hero.intro1")}
            </p>
            
            <p className="text-lg text-[#9CA3AF] leading-relaxed">
              {t("about.founder.hero.intro2")}
            </p>
          </div>
        </div>
        
        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent mb-20"></div>
        
        {/* The Journey */}
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#F9FAFB] mb-4">{t("about.founder.journey.heading")}</h2>
            <p className="text-xl text-[#9CA3AF]">{t("about.founder.journey.subtitle")}</p>
          </div>
          
          <div className="space-y-7 text-lg text-[#D1D5DB] leading-[1.8]">
            <p>{t("about.founder.journey.p1")}</p>
            <p>{t("about.founder.journey.p2")}</p>
            <p>{t("about.founder.journey.p3")}</p>
            <p>{t("about.founder.journey.p4")}</p>
            <p>{t("about.founder.journey.p5")}</p>
            
            {/* Callout block */}
            <div className="border-l-4 border-[#8B5CF6] pl-6 py-5 my-10 bg-[#8B5CF6]/5 rounded-r-xl shadow-lg shadow-[#8B5CF6]/10">
              <p className="text-[#E5E7EB] leading-[1.8]">{t("about.founder.journey.p6")}</p>
            </div>
            
            <p>{t("about.founder.journey.p7")}</p>
            <p>{t("about.founder.journey.p8")}</p>
            <p>{t("about.founder.journey.p9")}</p>
            
            {/* Final callout */}
            <div className="border-l-4 border-[#8B5CF6] pl-6 py-5 my-10 bg-[#8B5CF6]/5 rounded-r-xl shadow-lg shadow-[#8B5CF6]/10">
              <p className="text-xl font-semibold text-[#F9FAFB] italic">{t("about.founder.journey.p10")}</p>
            </div>
            
            {/* Pull Quote - Centered and Large */}
            <blockquote className="text-center py-12 my-12">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-6xl text-[#8B5CF6]/20">"</div>
                <p className="text-3xl font-medium text-[#8B5CF6] italic relative z-10">
                  {t("about.founder.journey.quote")}
                </p>
              </div>
            </blockquote>
          </div>
        </section>
        
        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent mb-20"></div>
        
        {/* Why I Built Zaza */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-[#F9FAFB] mb-8">{t("about.founder.why.heading")}</h2>
          
          <div className="space-y-7 text-lg text-[#D1D5DB] leading-[1.8] mb-12">
            <p>{t("about.founder.why.mission")}</p>
            <p>{t("about.founder.why.principles")}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-[#111827] border-[#1F2937] p-8 hover:border-[#8B5CF6]/50 hover:shadow-lg hover:shadow-[#8B5CF6]/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#8B5CF6]/20 transition-colors">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-4">{t("about.founder.why.principle1.title")}</h3>
              <p className="text-base text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle1.description")}
              </p>
            </Card>
            
            <Card className="bg-[#111827] border-[#1F2937] p-8 hover:border-[#8B5CF6]/50 hover:shadow-lg hover:shadow-[#8B5CF6]/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#8B5CF6]/20 transition-colors">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-4">{t("about.founder.why.principle2.title")}</h3>
              <p className="text-base text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle2.description")}
              </p>
            </Card>
            
            <Card className="bg-[#111827] border-[#1F2937] p-8 hover:border-[#8B5CF6]/50 hover:shadow-lg hover:shadow-[#8B5CF6]/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#8B5CF6]/20 transition-colors">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-4">{t("about.founder.why.principle3.title")}</h3>
              <p className="text-base text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle3.description")}
              </p>
            </Card>
          </div>
          
          {/* Social Proof Card */}
          <Card className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 border-[#8B5CF6]/30 p-10 text-center rounded-2xl shadow-xl shadow-[#8B5CF6]/10">
            <p className="text-[#9CA3AF] text-sm uppercase tracking-wide mb-3">{t("about.founder.why.subtitle")}</p>
            <p className="text-5xl font-bold text-[#F9FAFB] mt-4 mb-3">2,400+ Teachers</p>
            <p className="text-lg text-[#D1D5DB]">already co-designing Zaza with us across 43 countries</p>
          </Card>
        </section>
        
        {/* CTA Section - Moved Up */}
        <section className="text-center py-16 mb-20 bg-gradient-to-b from-[#8B5CF6]/5 to-transparent rounded-2xl">
          <h3 className="text-3xl font-bold text-[#F9FAFB] mb-5">
            Join 2,400+ teachers shaping the future of Zaza
          </h3>
          <p className="text-xl text-[#D1D5DB] mb-2 font-medium">
            Built with teachers, for teachers.
          </p>
          <p className="text-lg text-[#9CA3AF] mb-10">
            Start saving 10+ hours per week with AI that respects your craft.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-105"
          >
            Start your free 14-day trial
          </Link>
        </section>
        
        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent mb-20"></div>
        
        {/* Personal Note */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-[#F9FAFB] mb-8">{t("about.founder.note.heading")}</h2>
          <div className="space-y-7 text-lg text-[#D1D5DB] leading-[1.8]">
            <p>{t("about.founder.note.p1")}</p>
            <p>{t("about.founder.note.p2")}</p>
            
            <div className="mt-10 pt-8 border-t border-[#8B5CF6]/20">
              <p className="font-semibold text-[#F9FAFB] text-2xl">{t("about.founder.note.signature.name")}</p>
              <p className="text-base text-[#9CA3AF] mt-2">{t("about.founder.note.signature.role")}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
