"use client"

import { useState } from "react"
import { Check, ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { SignupModal } from "@/components/signup-modal"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { PricingDecisionTool } from "@/components/pricing-decision-tool"

export default function PricingPage() {
  const { t } = useLanguage()
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const [signupOpen, setSignupOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <div className="bg-[#0F172A] min-h-screen">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#8B5CF6] uppercase tracking-wider text-sm font-semibold mb-4"
            >
              {t("pricing.hero.preheadline")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {t("pricing.hero.headline")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#94A3B8] mb-8 max-w-3xl mx-auto"
            >
              {t("pricing.hero.subheadline")}
            </motion.p>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-[#94A3B8]"
            >
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8B5CF6]" />
                {t("pricing.trust.teachers")}
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8B5CF6]" />
                {t("pricing.trust.ferpa")}
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8B5CF6]" />
                {t("pricing.trust.cancel")}
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8B5CF6]" />
                {t("pricing.trust.noCard")}
              </span>
            </motion.div>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="pb-10 px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-[#1E293B] rounded-full p-1 flex items-center justify-center">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white"
                    : "text-[#94A3B8]"
                }`}
              >
                {t("pricing.toggle.monthly")}
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  billingPeriod === "annual"
                    ? "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white"
                    : "text-[#94A3B8]"
                }`}
              >
                {t("pricing.toggle.annual")}
                {billingPeriod === "annual" && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {t("pricing.toggle.save")}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 px-6 mt-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1E293B] rounded-2xl p-10 border-2 border-transparent hover:border-[#8B5CF6] transition-all hover:-translate-y-1"
            >
              <div className="inline-block bg-[#8B5CF6]/20 text-[#A78BFA] px-3 py-1.5 rounded-lg text-sm font-semibold mb-6">
                {t("pricing.free.badge")}
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{t("pricing.free.title")}</h3>
              <p className="text-[#94A3B8] mb-6">{t("pricing.free.description")}</p>
              <div className="mb-2">
                <span className="text-5xl font-bold text-white">{t("pricing.free.price")}</span>
              </div>
              <p className="text-[#94A3B8] mb-6">{t("pricing.free.period")}</p>

              <Button
                onClick={() => setSignupOpen(true)}
                className="w-full bg-transparent border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 py-6 text-lg font-semibold rounded-lg mb-8"
              >
                {t("pricing.free.cta")}
              </Button>

              <p className="text-center text-sm text-[#94A3B8] mb-8">{t("pricing.free.upgradeText")}</p>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">{t("pricing.free.featuresTitle")}</h4>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <span className="text-[#94A3B8]">{t(`pricing.free.feature${i}`)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#8B5CF6]/10 border-l-4 border-[#8B5CF6] rounded-lg">
                <p className="text-sm text-[#94A3B8]">{t("pricing.free.limitation")}</p>
              </div>
            </motion.div>

            {/* Premium Plan - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E293B] rounded-2xl p-10 border-2 border-[#8B5CF6] relative lg:scale-105 shadow-2xl shadow-[#8B5CF6]/30"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                {t("pricing.premium.badge")}
              </div>

              <h3 className="text-4xl font-bold text-white mb-3 mt-4">{t("pricing.premium.title")}</h3>
              <p className="text-[#E2E8F0] text-lg mb-6">{t("pricing.premium.description")}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={billingPeriod}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-2"
                >
                  <span className="text-6xl font-bold text-white">
                    {billingPeriod === "monthly" ? t("pricing.premium.priceMonthly") : t("pricing.premium.priceAnnual")}
                  </span>
                </motion.div>
              </AnimatePresence>

              <p className="text-[#94A3B8] mb-2">{t("pricing.premium.period")}</p>
              {billingPeriod === "annual" && (
                <div className="mb-6">
                  <p className="text-sm text-[#94A3B8]">{t("pricing.premium.annualTotal")}</p>
                  <p className="text-sm text-green-500 font-semibold">{t("pricing.premium.savings")}</p>
                </div>
              )}

              <Button
                onClick={() => setSignupOpen(true)}
                className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:scale-105 py-6 text-lg font-semibold rounded-lg mb-3 shadow-lg shadow-[#8B5CF6]/40 transition-transform"
              >
                {t("pricing.premium.cta")}
              </Button>
              <p className="text-center text-sm text-[#94A3B8] mb-4">{t("pricing.premium.trial")}</p>

              <div className="flex items-center justify-center gap-2 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] rounded-lg px-5 py-3 mb-4">
                <span className="text-xl">🛡️</span>
                <span className="text-sm text-[#10B981] font-semibold">{t("pricing.premium.guarantee")}</span>
              </div>

              <p className="text-center text-sm text-white font-semibold mb-8">{t("pricing.premium.timeSaving")}</p>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">{t("pricing.premium.featuresTitle")}</h4>
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{t(`pricing.premium.feature${i}`)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-[#8B5CF6]/15 rounded-xl">
                <h5 className="text-[#A78BFA] font-semibold mb-2">{t("pricing.premium.roiTitle")}</h5>
                <p className="text-[#E2E8F0] text-sm">{t("pricing.premium.roiText")}</p>
              </div>
            </motion.div>

            {/* Team Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1E293B] rounded-2xl p-10 border-2 border-transparent hover:border-[#FB923C] transition-all hover:-translate-y-1"
            >
              <div className="inline-block bg-[#FB923C]/20 text-[#FB923C] px-3 py-1.5 rounded-lg text-sm font-semibold mb-6">
                {t("pricing.team.badge")}
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{t("pricing.team.title")}</h3>
              <p className="text-[#94A3B8] mb-6">{t("pricing.team.description")}</p>
              <div className="mb-2">
                <span className="text-5xl font-bold text-white">{t("pricing.team.price")}</span>
              </div>
              <p className="text-[#94A3B8] mb-2">{t("pricing.team.period")}</p>
              <p className="text-sm text-[#94A3B8] mb-6">{t("pricing.team.starting")}</p>

              <Button
                asChild
                className="w-full bg-transparent border-2 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 py-6 text-lg font-semibold rounded-lg mb-8"
              >
                <a href="mailto:sales@zazadraft.com">{t("pricing.team.cta")}</a>
              </Button>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">{t("pricing.team.featuresTitle")}</h4>
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#FB923C] flex-shrink-0 mt-0.5" />
                    <span className="text-[#94A3B8]">{t(`pricing.team.feature${i}`)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#FB923C]/10 border-l-4 border-[#FB923C] rounded-lg">
                <p className="text-sm text-[#94A3B8]">{t("pricing.team.roi")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bundle Card section between pricing cards and comparison table */}
        {/* Bundle Card */}
        <section className="pb-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              {/* Left side */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-white text-[#8B5CF6] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  {t("pricing.bundle.badge")}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{t("pricing.bundle.title")}</h3>
                <p className="text-lg md:text-xl text-white/95 mb-4">{t("pricing.bundle.description")}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">{t("pricing.bundle.price")}</span>
                  <span className="text-xl md:text-2xl text-white/70 line-through">
                    {t("pricing.bundle.originalPrice")}
                  </span>
                </div>
                <p className="text-lg font-semibold text-green-400">{t("pricing.bundle.savings")}</p>
              </div>

              {/* Right side */}
              <div className="flex-shrink-0">
                <Button
                  onClick={() => setSignupOpen(true)}
                  className="bg-white text-[#8B5CF6] hover:bg-white/90 hover:scale-105 px-8 md:px-12 py-6 text-lg md:text-xl font-bold rounded-lg shadow-lg transition-transform whitespace-nowrap"
                >
                  {t("pricing.bundle.cta")}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-6 bg-[#0F172A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">{t("pricing.comparison.title")}</h2>

            <div className="bg-[#1E293B] rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 p-6 bg-[#0F172A]">
                <div className="text-white font-semibold">{t("pricing.comparison.features")}</div>
                <div className="text-white text-center">{t("pricing.comparison.free")}</div>
                <div
                  className="text-center relative z-10 bg-gradient-to-b from-[rgba(139,92,246,0.2)] to-[rgba(139,92,246,0.05)] border-l-2 border-r-2 border-[#8B5CF6] rounded-lg -mx-2 px-2 py-2"
                  style={{ boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" }}
                >
                  <div className="text-[#8B5CF6] font-bold">{t("pricing.comparison.premium")}</div>
                  <div className="text-xs text-[#8B5CF6]">{t("pricing.comparison.popular")}</div>
                </div>
                <div className="text-white text-center">{t("pricing.comparison.team")}</div>
              </div>

              {/* Table Rows */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i, idx) => (
                <div key={i} className={`grid grid-cols-4 gap-4 p-6 ${idx % 2 === 0 ? "bg-[#8B5CF6]/5" : ""}`}>
                  <div className="text-[#E2E8F0]">{t(`pricing.comparison.row${i}.feature`)}</div>
                  <div className="text-center text-[#94A3B8]">{t(`pricing.comparison.row${i}.free`)}</div>
                  <div className="text-center text-[#8B5CF6] font-semibold">
                    {t(`pricing.comparison.row${i}.premium`)}
                  </div>
                  <div className="text-center text-[#94A3B8]">{t(`pricing.comparison.row${i}.team`)}</div>
                </div>
              ))}

              {/* CTA Row */}
              <div className="grid grid-cols-4 gap-4 p-6 bg-[#0F172A]">
                <div></div>
                <div className="text-center">
                  <Button
                    onClick={() => setSignupOpen(true)}
                    variant="outline"
                    className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                  >
                    {t("pricing.comparison.ctaFree")}
                  </Button>
                </div>
                <div className="text-center">
                  <Button
                    onClick={() => setSignupOpen(true)}
                    className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:scale-105"
                  >
                    {t("pricing.comparison.ctaPremium")}
                  </Button>
                </div>
                <div className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 bg-transparent"
                  >
                    <a href="mailto:sales@zazadraft.com">{t("pricing.comparison.ctaTeam")}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Tool Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">{t("pricing.decision.title")}</h2>
              <p className="text-xl text-gray-400">{t("pricing.decision.subtitle")}</p>
            </div>
            <PricingDecisionTool />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">{t("pricing.faq.title")}</h2>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-[#1E293B] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-[#1E293B]/80 transition-colors"
                  >
                    <span className="text-lg font-semibold text-white pr-4">{t(`pricing.faq.q${i}`)}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8B5CF6] flex-shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-[#94A3B8] leading-relaxed">{t(`pricing.faq.a${i}`)}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 px-6 bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">{t("pricing.testimonials.title")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-[#8B5CF6] flex-shrink-0">
                      <Image
                        src={`/testimonials/pricing-teacher-${i}.jpg`}
                        alt={t(`pricing.testimonials.author${i}`)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[#1E293B] font-semibold">{t(`pricing.testimonials.author${i}`)}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#1E293B] italic leading-relaxed">{t(`pricing.testimonials.quote${i}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">{t("pricing.finalCta.title")}</h2>
            <p className="text-xl text-white/95 mb-10">{t("pricing.finalCta.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setSignupOpen(true)}
                className="bg-white text-[#8B5CF6] hover:scale-105 px-10 py-6 text-lg font-semibold rounded-lg shadow-lg transition-transform"
              >
                {t("pricing.finalCta.primary")}
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg font-semibold rounded-lg bg-transparent"
              >
                <a href="/#demo">{t("pricing.finalCta.secondary")}</a>
              </Button>
            </div>

            <p className="text-white/90 mt-6">{t("pricing.finalCta.trust")}</p>
          </div>
        </section>
      </div>

      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  )
}
