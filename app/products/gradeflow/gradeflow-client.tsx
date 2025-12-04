"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { DemoModal } from "@/components/demo-modal"
import { useState } from "react"
import { CheckCircle2, Clock, Shield, FileCheck } from "lucide-react"

export default function GradeFlowClient() {
  const { t } = useLanguage()
  const [demoOpen, setDemoOpen] = useState(false)

  const painPoints = [
    t("products.gradeflow.turn.pain1"),
    t("products.gradeflow.turn.pain2"),
    t("products.gradeflow.turn.pain3"),
  ]

  const solutionSteps = [
    t("products.gradeflow.change.step1"),
    t("products.gradeflow.change.step2"),
    t("products.gradeflow.change.step3"),
    t("products.gradeflow.change.step4"),
  ]

  const features = [
    {
      icon: Clock,
      title: t("products.gradeflow.features.faster.title"),
      description: t("products.gradeflow.features.faster.desc"),
    },
    {
      icon: Shield,
      title: t("products.gradeflow.features.fair.title"),
      description: t("products.gradeflow.features.fair.desc"),
    },
    {
      icon: FileCheck,
      title: t("products.gradeflow.features.audit.title"),
      description: t("products.gradeflow.features.audit.desc"),
    },
  ]

  const testimonials = [
    {
      quote: t("products.gradeflow.social.quote1"),
      author: t("products.gradeflow.social.author1"),
      image: "/testimonials/maria-teacher.jpg",
      alt: "Lisa Park",
    },
    {
      quote: t("products.gradeflow.social.quote2"),
      author: t("products.gradeflow.social.author2"),
      image: "/testimonials/professional-teacher-headshot-man.jpg",
      alt: "David Kim",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-[#0B1220]">
        {/* Breadcrumbs */}
        <div className="border-b border-[#1F2937]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.products"), href: "/suite" },
                { label: "GradeFlow", href: "/products/gradeflow" },
              ]}
            />
          </div>
        </div>

        {/* Hero Section (Hole) */}
        <section className="py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9FAFB] leading-tight">
                {t("products.gradeflow.hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-[#D1D5DB] leading-relaxed">
                {t("products.gradeflow.hero.subtitle")}
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="gradient-primary text-white font-medium rounded-xl">
                  <Link href="/pricing#gradeflow">{t("products.gradeflow.hero.cta")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Turn (Agitate the Problem) */}
        <section className="py-16 bg-[#111827]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <ul className="space-y-4">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg text-[#D1D5DB]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Change (Introduce Solution) */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 xl:gap-12 items-center">
              {/* Text content */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB]">
                  {t("products.gradeflow.change.title")}
                </h2>
                <ul className="space-y-3">
                  {solutionSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-[#D1D5DB]">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supporting image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/products/gradeflow-hero.jpg"
                  alt="Teacher grading assignments with AI assistance"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features (3 Columns) */}
        <section className="py-16 bg-[#111827]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-center mb-12">
              {t("products.gradeflow.features.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="bg-[#0B1220] border-[#1F2937] p-6">
                    <Icon className="w-10 h-10 text-[#7C3AED] mb-4" />
                    <h3 className="text-xl font-semibold text-[#F9FAFB] mb-3">{feature.title}</h3>
                    <p className="text-[#D1D5DB]">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-center mb-12">
              {t("products.gradeflow.social.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-[#111827] border-[#1F2937] p-6 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#1F2937] flex-shrink-0">
                    <Image src={testimonial.image} alt={testimonial.alt} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-lg text-[#D1D5DB] mb-3 md:mb-2 italic">"{testimonial.quote}"</p>
                    <p className="text-sm text-[#9CA3AF]">{testimonial.author}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-16 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("products.gradeflow.cta.title")}</h2>
            <div className="pt-4">
              <Button asChild size="lg" className="bg-white text-[#7C3AED] hover:bg-gray-100 font-medium rounded-xl">
                <Link href="/pricing#gradeflow">{t("products.gradeflow.cta.button")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} defaultProduct="GradeFlow" />
    </>
  )
}

