"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { CheckCircle2, Globe, Clock, Users, Zap } from "lucide-react";

export default function CompanyPage() {
  const { t } = useLanguage();

  return (
    // Ensure the main container has the full site gradient
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Hero Section - REDUCED PADDING */}
      <section className="pt-32 pb-10 px-6"> 
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-purple-400 text-sm font-semibold mb-4 tracking-wider">
            {t("company.hero.label")}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t("company.hero.headline")}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t("company.hero.subheading")}
          </p>
        </div>
      </section>

      {/* Origin Story (IMPROVED DESIGN: max-w-3xl) */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto p-10 bg-white/5 border border-white/10 rounded-xl shadow-lg shadow-black/30">
          <h2 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
             <Zap className="w-5 h-5"/>
             {t("company.origin.title")}
          </h2>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">{t("company.origin.p1")}</p>
            <p className="text-xl font-bold text-white italic py-3 border-y border-white/10">
              {t("company.origin.p2")}
            </p>
            <p className="text-lg">{t("company.origin.p3")}</p>
            <p className="text-lg">{t("company.origin.aiDifferentiator")}</p>
            <p className="text-xl font-bold text-purple-400 pt-4">
              {t("company.origin.p4")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/10 to-blue-900/10 border-t border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase text-purple-400 mb-4 tracking-widest">
            {t("company.mission.title")}
          </h2>
          <blockquote className="text-3xl md:text-4xl font-extrabold text-white leading-tight italic max-w-3xl mx-auto">
            "{t("company.mission.quote")}"
          </blockquote>
          <p className="text-lg text-gray-400 mt-6">— {t("company.mission.attribution")}</p>
          {/* Placeholder for a company image, styled to fit the dark theme */}
          <div className="mt-12 w-full h-80 bg-[#1E293B] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10">
             <span className="text-gray-500 italic text-lg">{t("company.mission.imagePlaceholder")}</span>
          </div>
        </div>
      </section>

      {/* Philosophy Section (IMPROVED DESIGN: max-w-3xl) */}
      <section className="py-16 px-6 bg-[#1E293B] border-y border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t("company.philosophy.title")}
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-medium">
            {t("company.philosophy.intro")}
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-300">
                {t("company.philosophy.principle1")}
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-300">
                {t("company.philosophy.principle2")}
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-300">
                {t("company.philosophy.principle3")}
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-300">
                {t("company.philosophy.principle4")}
              </p>
            </div>
          </div>

          <p className="text-gray-500 italic mt-10">
            {t("company.philosophy.closing")}
          </p>
        </div>
      </section>

      {/* Boutique Approach (IMPROVED DESIGN: max-w-3xl) */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t("company.boutique.title")}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("company.boutique.intro")}
          </p>

          <p className="text-lg text-gray-400 mb-6 font-semibold">
            {t("company.boutique.means")}
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-300">{t("company.boutique.point1")}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-300">{t("company.boutique.point2")}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-300">{t("company.boutique.point3")}</p>
            </div>
          </div>

          <p className="text-gray-500 italic mb-8 mt-6">
            {t("company.boutique.closing")}
          </p>
          <p className="text-xl font-bold text-white">
            {t("company.boutique.impact")}
          </p>
        </div>
      </section>

      {/* Where We Are Today (IMPROVED DESIGN: max-w-3xl) */}
      <section className="py-16 px-6 bg-[#1E293B] border-y border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t("company.today.title")}
          </h2>
          <p className="text-lg text-gray-300 mb-6">{t("company.today.p1")}</p>
          <p className="text-lg text-gray-300 mb-6">{t("company.today.p2")}</p>
          <p className="text-xl font-bold text-purple-400">
            {t("company.today.close")}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-400 transition-colors">
              <Users className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <div className="text-5xl font-bold text-white mb-2">
                {t("company.stats.teachers.number")}
              </div>
              <div className="text-gray-400">
                {t("company.stats.teachers.label")}
              </div>
            </div>
            <div className="text-center bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-400 transition-colors">
              <Globe className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <div className="text-5xl font-bold text-white mb-2">
                {t("company.stats.countries.number")}
              </div>
              <div className="text-gray-400">
                {t("company.stats.countries.label")}
              </div>
            </div>
            <div className="text-center bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-400 transition-colors">
              <Clock className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <div className="text-5xl font-bold text-white mb-2">
                {t("company.stats.hours.number")}
              </div>
              <div className="text-gray-400">
                {t("company.stats.hours.label")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
