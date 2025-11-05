"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"
import { ChevronRight, Mail, HelpCircle, BookOpen } from "lucide-react"

export default function SupportPage() {
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
            <span className="text-white">{t("support.title")}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t("support.title")}</h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-12">{t("support.intro")}</p>

          {/* Primary Contact */}
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Mail className="h-8 w-8 text-purple-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{t("support.email.title")}</h2>
                <p className="text-gray-300 mb-4">{t("support.email.description")}</p>
                <a
                  href="mailto:help@zazatechnologies.com"
                  className="inline-flex items-center gap-2 text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  help@zazatechnologies.com
                </a>
                <p className="text-sm text-gray-400 mt-4">{t("support.email.response")}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link
              href="/faq"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all"
            >
              <HelpCircle className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {t("support.faq.title")}
              </h3>
              <p className="text-gray-400">{t("support.faq.description")}</p>
            </Link>

            <Link
              href="/resources"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all"
            >
              <BookOpen className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {t("support.resources.title")}
              </h3>
              <p className="text-gray-400">{t("support.resources.description")}</p>
            </Link>
          </div>

          {/* Troubleshooting */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">{t("support.troubleshooting.title")}</h2>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{t("support.troubleshooting.login.title")}</h3>
                <p className="text-gray-300">{t("support.troubleshooting.login.description")}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{t("support.troubleshooting.email.title")}</h3>
                <p className="text-gray-300">{t("support.troubleshooting.email.description")}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {t("support.troubleshooting.subscription.title")}
                </h3>
                <p className="text-gray-300">{t("support.troubleshooting.subscription.description")}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{t("support.troubleshooting.browser.title")}</h3>
                <p className="text-gray-300">{t("support.troubleshooting.browser.description")}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{t("support.troubleshooting.bugs.title")}</h3>
                <p className="text-gray-300">{t("support.troubleshooting.bugs.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

