"use client";

import { Check, Shield, Languages, Download, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { SignupModal } from "@/components/signup-modal"
import { useState } from "react"

export default function FeaturesPage() {
  const { t } = useLanguage()
  const [signupOpen, setSignupOpen] = useState(false)

  const features = [
    {
      icon: Sparkles,
      title: t("features.toneTutor.title"),
      description: t("features.toneTutor.desc"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: t("features.safer.title"),
      description: t("features.safer.desc"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Languages,
      title: t("features.translation.title"),
      description: t("features.translation.desc"),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Download,
      title: t("features.export.title"),
      description: t("features.export.desc"),
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Check,
      title: t("features.variants.title"),
      description: t("features.variants.desc"),
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-6">{t("features.title")}</h1>
            <p className="text-xl text-[#D1D5DB] leading-relaxed">{t("features.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#0F172A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Card key={i} className="bg-[#111827] border-[#1F2937] p-8 hover:border-[#7C3AED]/50 transition-colors">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#F9FAFB] mb-3">{feature.title}</h3>
                <p className="text-[#9CA3AF] leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#F9FAFB] sm:text-4xl mb-4">{t("features.how.title")}</h2>
            <p className="text-lg text-[#D1D5DB]">{t("features.how.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#7C3AED]">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#F9FAFB] mb-3">{t("features.how.step1.title")}</h3>
              <p className="text-[#9CA3AF] leading-relaxed">{t("features.how.step1.desc")}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#7C3AED]">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#F9FAFB] mb-3">{t("features.how.step2.title")}</h3>
              <p className="text-[#9CA3AF] leading-relaxed">{t("features.how.step2.desc")}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#7C3AED]">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#F9FAFB] mb-3">{t("features.how.step3.title")}</h3>
              <p className="text-[#9CA3AF] leading-relaxed">{t("features.how.step3.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-[#7C3AED]/10 to-transparent">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#F9FAFB] sm:text-4xl mb-4">{t("features.cta.title")}</h2>
          <p className="text-lg text-[#D1D5DB] mb-8">{t("features.cta.subtitle")}</p>
          <Button
            onClick={() => setSignupOpen(true)}
            size="lg"
            className="gradient-primary text-white font-medium text-base"
          >
            {t("features.cta.primary")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  )
}

