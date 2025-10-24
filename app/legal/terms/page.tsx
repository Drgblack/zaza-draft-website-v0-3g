"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0B1220]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              {t("nav.home")}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-white">{t("legal.terms.title")}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t("legal.terms.title")}</h1>
          <p className="text-gray-400 mb-12">{t("legal.terms.lastUpdated")}</p>

          <div className="prose prose-invert prose-lg max-w-none space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("legal.terms.s1.title")}</h2>
              <p className="text-gray-300 leading-relaxed">{t("legal.terms.s1.p1")}</p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("legal.terms.s2.title")}</h2>
              <p className="text-gray-300 leading-relaxed">{t("legal.terms.s2.p1")}</p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("legal.terms.s3.title")}</h2>
              <p className="text-gray-300 leading-relaxed">{t("legal.terms.s3.p1")}</p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("legal.terms.s4.title")}</h2>
              <p className="text-gray-300 leading-relaxed">{t("legal.terms.s4.p1")}</p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("legal.terms.s5.title")}</h2>
              <p className="text-gray-300 leading-relaxed">{t("legal.terms.s5.p1")}</p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("legal.terms.s6.title")}</h2>
              <p className="text-gray-300 leading-relaxed">{t("legal.terms.s6.p1")}</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t("legal.terms.s7.title")}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t("legal.terms.s7.p1")}{" "}
                <a href="mailto:help@zazatechnologies.com" className="text-purple-400 hover:text-purple-300 underline">
                  help@zazatechnologies.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zazadraft.com/legal/terms",
    languages: {
      en: "https://zazadraft.com/legal/terms",
      de: "https://zazadraft.com/de/legal/terms",
    },
  },
}
