"use client"

import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { AboutSidebar } from "@/components/about-sidebar"
import { Stat } from "@/components/stat"
import { Breadcrumbs } from "@/components/breadcrumbs"

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
          <main>
            <Breadcrumbs
              items={[{ label: t("nav.about"), href: "/about" }, { label: t("about.company.hero.eyebrow") }]}
            />

            {/* Hero */}
            <div className="mb-16">
              <div className="text-sm font-medium text-[#7C3AED] mb-4">{t("about.company.hero.eyebrow")}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-6">{t("about.company.hero.title")}</h1>
              <p className="text-xl text-[#D1D5DB] leading-relaxed max-w-3xl">{t("about.company.hero.subtitle")}</p>
            </div>

            {/* Body paragraphs */}
            <section className="mb-16 space-y-6 max-w-3xl">
              <p className="text-lg text-[#D1D5DB] leading-relaxed">{t("about.company.body.p1")}</p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">{t("about.company.body.p2")}</p>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">{t("about.company.body.p3")}</p>
            </section>

            {/* Stats */}
            <section>
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
          </main>
        </div>
      </div>
    </div>
  )
}

