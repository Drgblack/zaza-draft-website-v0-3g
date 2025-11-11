"use client";

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { AboutSidebar } from "@/components/about-sidebar"
import { Timeline } from "@/components/timeline"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      title: t("about.overview.values.teacherFirst.title"),
      body: t("about.overview.values.teacherFirst.body"),
    },
    {
      title: t("about.overview.values.safety.title"),
      body: t("about.overview.values.safety.body"),
    },
    {
      title: t("about.overview.values.privacy.title"),
      body: t("about.overview.values.privacy.body"),
    },
    {
      title: t("about.overview.values.evidence.title"),
      body: t("about.overview.values.evidence.body"),
    },
  ]

  const timeline = [
    {
      date: "2023",
      title: t("about.overview.timeline.2023.title"),
      body: t("about.overview.timeline.2023.body"),
    },
    {
      date: "2024",
      title: t("about.overview.timeline.2024.title"),
      body: t("about.overview.timeline.2024.body"),
    },
    {
      date: "2025",
      title: t("about.overview.timeline.2025.title"),
      body: t("about.overview.timeline.2025.body"),
    },
  ]

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AboutSidebar />
          </aside>

          {/* Main content */}
          <main>
            <Breadcrumbs items={[{ label: t("nav.about") }]} />

            {/* Hero */}
            <div className="mb-16">
              <div className="text-sm font-medium text-[#7C3AED] mb-4">{t("about.overview.hero.eyebrow")}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-6">{t("about.overview.hero.title")}</h1>
              <p className="text-xl text-[#D1D5DB] leading-relaxed max-w-3xl">{t("about.overview.hero.subtitle")}</p>
            </div>

            {/* Mission */}
            <section className="mb-16">
              <Card className="bg-[#111827] border-[#1F2937] p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-[#F9FAFB] mb-6">{t("about.overview.mission.title")}</h2>
                <p className="text-lg text-[#D1D5DB] leading-relaxed">{t("about.overview.mission.body")}</p>
              </Card>
            </section>

            {/* Values */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-8">{t("about.overview.values.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="bg-[#111827] border-[#1F2937] p-6">
                    <h3 className="text-xl font-bold text-[#F9FAFB] mb-3">{value.title}</h3>
                    <p className="text-[#9CA3AF] leading-relaxed">{value.body}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#F9FAFB] mb-8">{t("about.overview.timeline.title")}</h2>
              <Timeline items={timeline} />
            </section>

            {/* CTA */}
            <section>
              <Card className="bg-gradient-to-br from-[#7C3AED]/20 via-[#6366F1]/20 to-[#3B82F6]/20 border-[#1F2937] p-12 text-center">
                <h2 className="text-3xl font-bold text-[#F9FAFB] mb-4">{t("about.overview.cta.title")}</h2>
                <p className="text-lg text-[#D1D5DB] mb-8 max-w-2xl mx-auto">{t("about.overview.cta.body")}</p>
                <Button asChild size="lg" className="gradient-primary text-white font-medium">
                  <Link href="/contact">
                    {t("about.overview.cta.button")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

