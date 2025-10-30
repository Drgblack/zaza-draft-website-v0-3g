"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import {
  Shield,
  Lock,
  AlertTriangle,
  FileCheck,
  Settings,
  Plug,
  BarChart3,
  MessageSquare,
  FileText,
  BookOpen,
  Check,
  X,
} from "lucide-react"

export default function ShieldClient() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="container relative mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-purple-400">
              {t("shield.hero.eyebrow")}
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white lg:text-6xl">{t("shield.hero.title")}</h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-300 lg:text-xl">{t("shield.hero.subtitle")}</p>

            {/* CTA Group */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40 hover:scale-105"
              >
                <a
                  href="https://www.zazashield.com?utm_source=zazadraft_site&utm_medium=cta&utm_campaign=shield_hero"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("shield.hero.cta.primary")}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-semibold px-8 py-6 text-lg rounded-full bg-transparent"
              >
                <Link href="/contact?topic=shield">{t("shield.hero.cta.secondary")}</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300 border border-white/10">
                <Check className="h-4 w-4 text-green-400" />
                {t("shield.trust.gdpr")}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300 border border-white/10">
                <Check className="h-4 w-4 text-green-400" />
                {t("shield.trust.ferpa")}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300 border border-white/10">
                <Check className="h-4 w-4 text-green-400" />
                {t("shield.trust.schoolReady")}
              </div>
            </div>

            {/* Hero Image */}
            <div className="mt-16 flex justify-center">
              <div className="animate-float">
                <Image
                  src="/icons/zaza-shield.jpg"
                  alt="Zaza Shield"
                  width={120}
                  height={120}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Stakes Section */}
      <section className="py-20 bg-[#1E293B]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">{t("shield.problem.title")}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <Card className="bg-[#0F172A] border-white/10 p-8 hover:border-purple-500/50 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Lock className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.problem.card1.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.problem.card1.description")}</p>
            </Card>

            <Card className="bg-[#0F172A] border-white/10 p-8 hover:border-purple-500/50 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <AlertTriangle className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.problem.card2.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.problem.card2.description")}</p>
            </Card>

            <Card className="bg-[#0F172A] border-white/10 p-8 hover:border-purple-500/50 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <FileCheck className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.problem.card3.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.problem.card3.description")}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Snapshot */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">{t("shield.solution.title")}</h2>
            <p className="text-lg text-gray-300">{t("shield.solution.subtitle")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto mb-12">
            <Card className="bg-[#1E293B] border-white/10 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.solution.card1.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.solution.card1.description")}</p>
            </Card>

            <Card className="bg-[#1E293B] border-white/10 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.solution.card2.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.solution.card2.description")}</p>
            </Card>

            <Card className="bg-[#1E293B] border-white/10 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Lock className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.solution.card3.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.solution.card3.description")}</p>
            </Card>

            <Card className="bg-[#1E293B] border-white/10 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Settings className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.solution.card4.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.solution.card4.description")}</p>
            </Card>
          </div>

          <div className="text-center">
            <a
              href="https://www.zazashield.com/features?utm_source=zazadraft_site&utm_medium=link&utm_campaign=shield_features"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-2 transition-colors"
            >
              {t("shield.solution.cta")} →
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#1E293B]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">{t("shield.howItWorks.title")}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto mb-12">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 border-2 border-purple-500">
                  <span className="text-2xl font-bold text-purple-400">1</span>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Plug className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.howItWorks.step1.title")}</h3>
                <p className="text-gray-400 leading-relaxed">{t("shield.howItWorks.step1.description")}</p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 border-2 border-purple-500">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Settings className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.howItWorks.step2.title")}</h3>
                <p className="text-gray-400 leading-relaxed">{t("shield.howItWorks.step2.description")}</p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 border-2 border-purple-500">
                  <span className="text-2xl font-bold text-purple-400">3</span>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.howItWorks.step3.title")}</h3>
                <p className="text-gray-400 leading-relaxed">{t("shield.howItWorks.step3.description")}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold px-8 rounded-full"
            >
              <a
                href="https://www.zazashield.com/get-started?utm_source=zazadraft_site&utm_medium=cta&utm_campaign=shield_howto"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("shield.howItWorks.cta")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">{t("shield.socialProof.title")}</h2>
          </div>

          <Card className="bg-[#1E293B] border-white/10 p-12 max-w-3xl mx-auto">
            <blockquote className="text-center">
              <p className="text-xl text-gray-300 leading-relaxed mb-6 italic">"{t("shield.socialProof.quote")}"</p>
              <footer className="text-gray-400">
                <p className="font-semibold text-white">{t("shield.socialProof.attribution")}</p>
                <p className="text-sm">{t("shield.socialProof.role")}</p>
              </footer>
            </blockquote>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-[#1E293B]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">{t("shield.useCases.title")}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <Card className="bg-[#0F172A] border-white/10 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <MessageSquare className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.useCases.card1.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.useCases.card1.description")}</p>
            </Card>

            <Card className="bg-[#0F172A] border-white/10 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.useCases.card2.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.useCases.card2.description")}</p>
            </Card>

            <Card className="bg-[#0F172A] border-white/10 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <BookOpen className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{t("shield.useCases.card3.title")}</h3>
              <p className="text-gray-400 leading-relaxed">{t("shield.useCases.card3.description")}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">{t("shield.comparison.title")}</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-6 text-left text-white font-semibold">{t("shield.comparison.feature")}</th>
                    <th className="py-4 px-6 text-center text-white font-semibold">{t("shield.comparison.shield")}</th>
                    <th className="py-4 px-6 text-center text-white font-semibold">{t("shield.comparison.manual")}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-6">{t("shield.comparison.row1.feature")}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-5 w-5 text-green-400" />
                        <span className="text-sm">{t("shield.comparison.row1.shield")}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <X className="h-5 w-5 text-red-400" />
                        <span className="text-sm">{t("shield.comparison.row1.manual")}</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-6">{t("shield.comparison.row2.feature")}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-5 w-5 text-green-400" />
                        <span className="text-sm">{t("shield.comparison.row2.shield")}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <X className="h-5 w-5 text-red-400" />
                        <span className="text-sm">{t("shield.comparison.row2.manual")}</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-6">{t("shield.comparison.row3.feature")}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-5 w-5 text-green-400" />
                        <span className="text-sm">{t("shield.comparison.row3.shield")}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <X className="h-5 w-5 text-red-400" />
                        <span className="text-sm">{t("shield.comparison.row3.manual")}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-[#1E293B]">
        <div className="container mx-auto px-6 lg:px-8">
          <Card className="bg-[#0F172A] border-white/10 p-12 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t("shield.pricing.title")}</h2>
            <p className="text-lg text-gray-300 mb-8">{t("shield.pricing.description")}</p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold px-8 rounded-full"
            >
              <a
                href="https://www.zazashield.com/pricing?utm_source=zazadraft_site&utm_medium=cta&utm_campaign=shield_pricing"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("shield.pricing.cta")}
              </a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white lg:text-5xl mb-6">{t("shield.finalCta.title")}</h2>
            <p className="text-lg text-gray-300 mb-8">{t("shield.finalCta.subtitle")}</p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-500/25"
              >
                <a
                  href="https://www.zazashield.com?utm_source=zazadraft_site&utm_medium=cta&utm_campaign=shield_final"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("shield.finalCta.primary")}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-semibold px-8 py-6 text-lg rounded-full bg-transparent"
              >
                <Link href="/contact?topic=shield">{t("shield.finalCta.secondary")}</Link>
              </Button>
            </div>

            <p className="text-sm text-gray-400">{t("shield.finalCta.note")}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
