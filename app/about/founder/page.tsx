"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { ArrowRight, Heart, Mountain, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FounderPage() {
  const { t } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll(".fade-on-scroll")
    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-[#0F172A] min-h-screen overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#A78BFA]/5 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12 w-full">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] blur-2xl opacity-60 animate-pulse-slow" />
              <div className="relative rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 ring-4 ring-[#8B5CF6] shadow-2xl shadow-[#8B5CF6]/50">
                <Image
                  src="/founder-headshot.jpg"
                  alt="Dr. Greg Blackburn, Founder of Zaza Draft"
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight text-balance px-4 break-words">
            {t("founder.hero.headline")}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-[#A78BFA] max-w-3xl mx-auto leading-relaxed text-balance px-4 break-words">
            {t("founder.hero.subheading")}
          </p>

          {/* Callout Card */}
          <div className="inline-block">
            <Card className="bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-[#8B5CF6]/20 hover:shadow-[#8B5CF6]/30 transition-all duration-300">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-[#8B5CF6] font-semibold">
                  {t("founder.hero.label")}
                </div>
                <div className="text-2xl font-semibold text-white">{t("founder.hero.name")}</div>
                <div className="text-base text-[#A78BFA]">{t("founder.hero.tagline")}</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE JOURNEY */}
      <section className="py-24 px-4 sm:px-6 fade-on-scroll opacity-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
            {/* Left Column - Sticky Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-8 w-full">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#8B5CF6] break-words">
                {t("founder.journey.title")}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-full" />
              <blockquote className="text-sm sm:text-base italic text-[rgba(255,255,255,0.7)] border-l-4 border-[#8B5CF6] pl-6 break-words">
                {t("founder.journey.quote")}
              </blockquote>
            </div>

            {/* Right Column - Narrative Content */}
            <div className="space-y-12 w-full">
              {/* Paragraph 1 */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-[1.8] break-words">
                  {t("founder.journey.p1")}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />

              {/* Paragraph 2 */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-[1.8] break-words">
                  {t("founder.journey.p2")}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />

              {/* Paragraph 3 */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-[1.8] break-words">
                  {t("founder.journey.p3")}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />

              {/* Paragraph 4 */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-[1.8] break-words">
                  {t("founder.journey.p4")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION CALLOUT */}
      <section className="py-20 px-4 sm:px-6 border-t border-b border-[rgba(139,92,246,0.3)] bg-gradient-to-r from-[rgba(139,92,246,0.15)] to-transparent fade-on-scroll opacity-0">
        <div className="max-w-4xl mx-auto text-center space-y-8 w-full">
          <blockquote className="text-lg sm:text-xl md:text-2xl italic text-white leading-relaxed text-balance px-4 break-words">
            {t("founder.mission.quote")}
          </blockquote>
          <p className="text-base sm:text-lg md:text-xl text-[#A78BFA] break-words">
            {t("founder.mission.attribution")}
          </p>
        </div>
      </section>

      {/* SECTION 4: THE MISSION */}
      <section className="py-24 px-4 sm:px-6 fade-on-scroll opacity-0">
        <div className="max-w-6xl mx-auto w-full">
          {/* Heading */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B5CF6] break-words">
              {t("founder.whyZaza.title")}
            </h2>
            <p className="text-lg sm:text-xl text-[#A78BFA] max-w-3xl mx-auto break-words px-4">
              {t("founder.whyZaza.subtitle")}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - For Teachers */}
            <Card className="bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] p-8 rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-[#8B5CF6]/20 transition-all duration-300 group">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-[rgba(139,92,246,0.2)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t("founder.whyZaza.card1.title")}</h3>
                <p className="text-base text-[rgba(255,255,255,0.7)] leading-relaxed">
                  {t("founder.whyZaza.card1.body")}
                </p>
              </div>
            </Card>

            {/* Card 2 - Boutique Approach */}
            <Card className="bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] p-8 rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-[#8B5CF6]/20 transition-all duration-300 group">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-[rgba(139,92,246,0.2)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t("founder.whyZaza.card2.title")}</h3>
                <p className="text-base text-[rgba(255,255,255,0.7)] leading-relaxed">
                  {t("founder.whyZaza.card2.body")}
                </p>
              </div>
            </Card>

            {/* Card 3 - Legacy Vision */}
            <Card className="bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] p-8 rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-[#8B5CF6]/20 transition-all duration-300 group">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-[rgba(139,92,246,0.2)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mountain className="w-8 h-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t("founder.whyZaza.card3.title")}</h3>
                <p className="text-base text-[rgba(255,255,255,0.7)] leading-relaxed">
                  {t("founder.whyZaza.card3.body")}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: PERSONAL MESSAGE */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent to-[rgba(139,92,246,0.05)] fade-on-scroll opacity-0">
        <div className="max-w-3xl mx-auto w-full">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B5CF6] break-words">
              {t("founder.personal.title")}
            </h2>
          </div>

          {/* Message */}
          <div className="space-y-8 mb-16">
            <p className="text-sm sm:text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-[1.9] break-words">
              {t("founder.personal.message1")}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-[1.9] break-words">
              {t("founder.personal.message2")}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[rgba(255,255,255,0.9)] leading-[1.9] break-words">
              {t("founder.personal.message3")}
            </p>
          </div>

          {/* Signature Block */}
          <div className="text-center space-y-4 pt-12 border-t border-[rgba(139,92,246,0.2)]">
            <div className="text-4xl font-signature text-[#8B5CF6] mb-2">Greg</div>
<div className="text-base text-[#A78BFA]">{t("founder.personal.title2")}</div>
            <div className="text-sm text-[rgba(255,255,255,0.5)]">{t("founder.personal.company")}</div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:from-[#7C3AED] hover:to-[#8B5CF6] text-white font-medium px-8 py-6 rounded-full shadow-lg shadow-[#8B5CF6]/25 transition-all duration-200 hover:shadow-[#8B5CF6]/40 hover:scale-105"
            >
              <Link href="/contact">
                {t("founder.personal.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? "visible" : ""} bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white p-4 rounded-full shadow-lg shadow-[#8B5CF6]/25 hover:shadow-[#8B5CF6]/40 hover:scale-110 transition-all duration-200 fixed bottom-4 right-4 z-50`}
        aria-label="Scroll to top"
      >
        <ArrowRight className="h-6 w-6 rotate-[-90deg]" />
      </button>
    </div>
  )
}

