"use client";

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

export function TermsClient() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F9FAFB]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("terms.back")}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t("terms.title")}</h1>
          <p className="text-lg text-gray-400">{t("terms.company")}</p>
          <p className="mt-2 text-sm text-gray-500">{t("terms.lastUpdated")}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-gray-300">{t("terms.intro")}</p>

          <h2 className="mt-12 text-2xl font-bold">{t("terms.s1.title")}</h2>
          <p className="text-gray-300">{t("terms.s1.content")}</p>

          <h2 className="mt-8 text-2xl font-bold">{t("terms.s2.title")}</h2>
          <p className="text-gray-300">{t("terms.s2.content")}</p>

          <h2 className="mt-8 text-2xl font-bold">{t("terms.s3.title")}</h2>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>{t("terms.s3.item1")}</li>
            <li>{t("terms.s3.item2")}</li>
            <li>{t("terms.s3.item3")}</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">{t("terms.s4.title")}</h2>
          <p className="text-gray-300">{t("terms.s4.content")}</p>

          <h2 className="mt-8 text-2xl font-bold">{t("terms.s5.title")}</h2>
          <p className="text-gray-300">{t("terms.s5.content")}</p>

          <h2 className="mt-8 text-2xl font-bold">{t("terms.s6.title")}</h2>
          <p className="text-gray-300">{t("terms.s6.content")}</p>

          <div className="mt-12 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <p className="text-gray-300">
              {t("terms.contact.text")}{" "}
              <a href="mailto:help@zazatechnologies.com" className="text-purple-400 hover:text-purple-300">
                help@zazatechnologies.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
