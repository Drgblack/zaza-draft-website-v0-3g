"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

export default function FounderPage() {
  const { t, language } = useLanguage()
  
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 left-1/4 w-64 h-64 bg-[#EC4899]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-24 text-center">
          {/* Gradient Arc Behind Photo */}
          <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#8B5CF6]/20 via-transparent to-transparent rounded-full blur-3xl -z-10"></div>
          
          {/* Photo with Enhanced Glow */}
          <div className="relative mx-auto mb-6 h-32 w-32 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] opacity-30 blur-xl group-hover:opacity-50 transition-opacity animate-pulse-glow"></div>
            <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-[#8B5CF6]/40 group-hover:ring-[#8B5CF6]/60 transition-all duration-300 group-hover:scale-105">
              <Image
                src="/greg-blackburn-headshot.jpg"
                alt="Dr. Greg Blackburn"
                width={128}
                height={128}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Styled Badge with Icon */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 backdrop-blur-sm mb-8">
            <span className="text-xl">🎓</span>
            <span className="text-sm font-medium text-[#8B5CF6] tracking-wide uppercase">
              Founder & Educator
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-8 leading-tight animate-fade-in">
            {language === 'en' ? (
              <>
                Meet the Educator Building AI to Give Teachers{' '}
                <span className="gradient-text">Their Time Back</span>
              </>
            ) : (
              <>
                Lernen Sie den Pädagogen kennen, der KI entwickelt, um Lehrkräften{' '}
                <span className="gradient-text">ihre Zeit zurückzugeben</span>
              </>
            )}
          </h1>
          
          {/* Dark Bio Card - FIXED */}
          <Card className="inline-block bg-[#1E293B] border-[#8B5CF6]/30 backdrop-blur-sm px-8 py-5 mb-8 shadow-lg shadow-[#8B5CF6]/10">
            <p className="text-[#F8FAFC] text-base leading-relaxed max-w-2xl font-medium">
              PhD in Professional Education. 20 years in Learning & Development. Founder of Zaza Technologies to help teachers thrive.
            </p>
          </Card>
          
          <div className="max-w-3xl mx-auto space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <p className="text-xl text-[#D1D5DB] leading-relaxed">
              {t("about.founder.hero.intro1")}
            </p>
            
            <p className="text-lg text-[#9CA3AF] leading-relaxed">
              {t("about.founder.hero.intro2")}
            </p>
          </div>
        </div>
        
        {/* Gradient Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent mb-20"></div>
        
        {/* The Journey with Timeline */}
        <section className="mb-24">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🗺️</span>
              <h2 className="text-4xl font-bold text-[#F9FAFB]">{t("about.founder.journey.heading")}</h2>
            </div>
            <p className="text-xl text-[#9CA3AF]">{t("about.founder.journey.subtitle")}</p>
          </div>
          
          {/* Timeline Milestones */}
          <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-lg">
              <span className="w-2 h-2 bg-[#8B5CF6] rounded-full"></span>
              <span className="text-sm text-[#9CA3AF]">Apprentice</span>
            </div>
            <div className="w-8 h-px bg-[#8B5CF6]/30 hidden sm:block"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-lg">
              <span className="w-2 h-2 bg-[#8B5CF6] rounded-full"></span>
              <span className="text-sm text-[#9CA3AF]">World Travel</span>
            </div>
            <div className="w-8 h-px bg-[#8B5CF6]/30 hidden sm:block"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-lg">
              <span className="w-2 h-2 bg-[#8B5CF6] rounded-full"></span>
              <span className="text-sm text-[#9CA3AF]">UTas</span>
            </div>
            <div className="w-8 h-px bg-[#8B5CF6]/30 hidden sm:block"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#8B5CF6]/20 rounded-lg">
              <span className="w-2 h-2 bg-[#8B5CF6] rounded-full"></span>
              <span className="text-sm text-[#9CA3AF]">PhD</span>
            </div>
            <div className="w-8 h-px bg-[#8B5CF6]/30 hidden sm:block"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#EC4899]/30 rounded-lg">
              <span className="w-2 h-2 bg-[#EC4899] rounded-full"></span>
              <span className="text-sm text-[#D1D5DB] font-medium">Zaza</span>
            </div>
          </div>
          
          <div className="space-y-7 text-lg text-[#D1D5DB] leading-[1.8]">
            <p>{t("about.founder.journey.p1")}</p>
            <p>{t("about.founder.journey.p2")}</p>
            <p>{t("about.founder.journey.p3")}</p>
            
            {/* Mid-story Pull Quote - FIXED */}
            <div className="my-10 py-8 px-6 bg-[#1E293B] border-l-4 border-[#8B5CF6] rounded-r-xl">
              <p className="text-2xl font-semibold italic text-[#F8FAFC]">
                {language === 'en' ? 
                  '"Education is the key to my future."' : 
                  '„Bildung ist der Schlüssel zu meiner Zukunft."'
                }
              </p>
            </div>
            
            <p>{t("about.founder.journey.p4")}</p>
            <p>{t("about.founder.journey.p5")}</p>
            
            {/* Callout block - FIXED */}
            <div className="border-l-4 border-[#8B5CF6] pl-6 py-5 my-10 bg-[#1E293B] rounded-r-xl">
              <p className="text-[#F8FAFC] leading-[1.8] font-medium">{t("about.founder.journey.p6")}</p>
            </div>
            
            <p>{t("about.founder.journey.p7")}</p>
            <p><span className="font-semibold text-[#C084FC]">For two decades</span> {t("about.founder.journey.p8").replace('For two decades in Learning & Development, I', 'in Learning & Development, I')}</p>
            <p>{t("about.founder.journey.p9")}</p>
            
            {/* Final callout - FIXED */}
            <div className="border-l-4 border-[#EC4899] pl-6 py-5 my-10 bg-[#1E293B] rounded-r-xl">
              <p className="text-xl font-semibold text-[#F8FAFC] italic">{t("about.founder.journey.p10")}</p>
            </div>
            
            {/* Final Pull Quote - FIXED */}
            <blockquote className="text-center py-12 my-12 px-8 bg-[#1E293B] rounded-xl border border-[#8B5CF6]/20">
              <div className="relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-7xl text-[#8B5CF6]/30 font-serif">"</div>
                <p className="text-3xl font-medium text-[#F8FAFC] italic relative z-10">
                  {t("about.founder.journey.quote")}
                </p>
              </div>
            </blockquote>
          </div>
        </section>
        
        {/* Gradient Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#EC4899]/40 to-transparent mb-20"></div>
        
        {/* Why I Built Zaza */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">💡</span>
            <h2 className="text-4xl font-bold text-[#F9FAFB]">{t("about.founder.why.heading")}</h2>
          </div>
          
          <div className="space-y-7 text-lg text-[#D1D5DB] leading-[1.8] mb-12">
            <p>{t("about.founder.why.mission")}</p>
            <p>{t("about.founder.why.principles")}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-[#1E293B] border-[#8B5CF6]/30 p-8 hover:border-[#8B5CF6]/60 hover:shadow-xl hover:shadow-[#8B5CF6]/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6]/20 to-[#8B5CF6]/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">{t("about.founder.why.principle1.title")}</h3>
              <p className="text-base text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle1.description")}
              </p>
            </Card>
            
            <Card className="bg-[#1E293B] border-[#EC4899]/30 p-8 hover:border-[#EC4899]/60 hover:shadow-xl hover:shadow-[#EC4899]/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#EC4899]/20 to-[#EC4899]/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">{t("about.founder.why.principle2.title")}</h3>
              <p className="text-base text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle2.description")}
              </p>
            </Card>
            
            <Card className="bg-[#1E293B] border-[#8B5CF6]/30 p-8 hover:border-[#8B5CF6]/60 hover:shadow-xl hover:shadow-[#8B5CF6]/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6]/20 to-[#EC4899]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">{t("about.founder.why.principle3.title")}</h3>
              <p className="text-base text-[#D1D5DB] leading-relaxed">
                {t("about.founder.why.principle3.description")}
              </p>
            </Card>
          </div>
          
          {/* Enhanced Social Proof - FIXED */}
          <Card className="bg-[#1E293B] border-[#8B5CF6]/30 p-10 text-center rounded-2xl shadow-2xl shadow-[#8B5CF6]/20">
            <p className="text-[#9CA3AF] text-sm uppercase tracking-wide mb-3">{t("about.founder.why.subtitle")}</p>
            <p className="text-6xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent mt-4 mb-3">2,400+</p>
            <p className="text-lg text-[#F8FAFC] font-medium">Teachers already co-designing Zaza across 43 countries</p>
          </Card>
        </section>
        
        {/* CTA Section with Float Animation */}
        <section className="text-center py-16 mb-20 bg-gradient-to-b from-[#8B5CF6]/5 via-[#EC4899]/5 to-transparent rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          <h3 className="text-3xl font-bold text-[#F9FAFB] mb-5 relative z-10">
            Join 2,400+ teachers shaping the future of Zaza
          </h3>
          <p className="text-xl text-[#D1D5DB] mb-2 font-medium relative z-10">
            Built with teachers, for teachers.
          </p>
          <p className="text-lg text-[#9CA3AF] mb-10 relative z-10">
            Start saving 10+ hours per week with AI that respects your craft.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] rounded-xl transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:scale-105 animate-float relative z-10"
          >
            Start your free 14-day trial
          </Link>
        </section>
        
        {/* Gradient Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent mb-20"></div>
        
        {/* Personal Note */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">✍️</span>
            <h2 className="text-4xl font-bold text-[#F9FAFB]">{t("about.founder.note.heading")}</h2>
          </div>
          <div className="space-y-7 text-lg text-[#D1D5DB] leading-[1.8]">
            <p>{t("about.founder.note.p1")}</p>
            <p>{t("about.founder.note.p2")}</p>
            
            <div className="mt-10 pt-8 border-t border-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent">
              <p className="font-semibold text-[#F8FAFC] text-2xl">{t("about.founder.note.signature.name")}</p>
              <p className="text-base text-[#9CA3AF] mt-2">{t("about.founder.note.signature.role")}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
