"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export default function CompanyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-[#8B5CF6] text-sm font-semibold mb-4 tracking-wider">
            {t("company.hero.label")}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t("company.hero.headline")}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t("company.hero.subheading")}
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">{t("company.origin.p1")}</p>
          <p className="text-lg font-semibold text-white">{t("company.origin.p2")}</p>
          <p className="text-lg">{t("company.origin.p3")}</p>
          <p className="text-lg">{t("company.origin.aiDifferentiator")}</p>
          <p className="text-xl font-semibold text-[#8B5CF6] mt-8">{t("company.origin.p4")}</p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-6 bg-[#1E293B]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">{t("company.philosophy.title")}</h2>
          <p className="text-xl text-gray-300 mb-8 font-semibold">{t("company.philosophy.intro")}</p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-[#8B5CF6] text-2xl">•</div>
              <p className="text-gray-300">{t("company.philosophy.principle1")}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-[#8B5CF6] text-2xl">•</div>
              <p className="text-gray-300">{t("company.philosophy.principle2")}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-[#8B5CF6] text-2xl">•</div>
              <p className="text-gray-300">{t("company.philosophy.principle3")}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-[#8B5CF6] text-2xl">•</div>
              <p className="text-gray-300">{t("company.philosophy.principle4")}</p>
            </div>
          </div>

          <p className="text-gray-400 italic">{t("company.philosophy.closing")}</p>
        </div>
      </section>

      {/* Boutique Approach */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">{t("company.boutique.title")}</h2>
          <p className="text-xl text-gray-300 mb-8">{t("company.boutique.intro")}</p>
          
          <p className="text-lg text-gray-400 mb-4">{t("company.boutique.means")}</p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-[#8B5CF6] text-2xl">•</div>
              <p className="text-gray-300">{t("company.boutique.point1")}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-[#8B5CF6] text-2xl">•</div>
              <p className="text-gray-300">{t("company.boutique.point2")}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-[#8B5CF6] text-2xl">•</div>
              <p className="text-gray-300">{t("company.boutique.point3")}</p>
            </div>
          </div>

          <p className="text-gray-400 italic mb-4">{t("company.boutique.closing")}</p>
          <p className="text-xl font-semibold text-white">{t("company.boutique.impact")}</p>
        </div>
      </section>

      {/* Where We Are Today */}
      <section className="py-16 px-6 bg-[#1E293B]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">{t("company.today.title")}</h2>
          <p className="text-lg text-gray-300 mb-6">{t("company.today.p1")}</p>
          <p className="text-lg text-gray-300 mb-6">{t("company.today.p2")}</p>
          <p className="text-xl font-semibold text-[#8B5CF6]">{t("company.today.close")}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8B5CF6] mb-2">
                {t("company.stats.teachers.number")}
              </div>
              <div className="text-gray-400">{t("company.stats.teachers.label")}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8B5CF6] mb-2">
                {t("company.stats.countries.number")}
              </div>
              <div className="text-gray-400">{t("company.stats.countries.label")}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8B5CF6] mb-2">
                {t("company.stats.hours.number")}
              </div>
              <div className="text-gray-400">{t("company.stats.hours.label")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}