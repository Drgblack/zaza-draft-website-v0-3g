﻿"use client";
"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"
import { footerConfig } from "@/lib/footer-config"

export function Footer() {
  const { t, language, setLanguage } = useLanguage()

  const languages = [
    { code: "en" as const, label: "EN", enabled: true },
    { code: "de" as const, label: "DE", enabled: true },
    { code: "fr" as const, label: "FR", enabled: false },
    { code: "es" as const, label: "ES", enabled: false },
    { code: "it" as const, label: "IT", enabled: false },
  ]

  return (
    <footer className="bg-[#0B1220] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Column 1 - Brand + Social */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Image
                src="/z-logo.png"
                alt="Zaza"
                width={40}
                height={40}
                className="h-10 w-10 transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-semibold text-white">Zaza Draft</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              The writing partner for teachers. Beat the blank page, save hours, and stay in control for parent emails,
              student reports, and staff notes.
            </p>
            <div className="flex gap-4">
              <a
                href={footerConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] rounded"
                aria-label={t("footer.social.tiktok")}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="sr-only">{t("footer.social.tiktok")}</span>
              </a>
              <a
                href={footerConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] rounded"
                aria-label={t("footer.social.twitter")}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">{t("footer.social.twitter")}</span>
              </a>
              <a
                href={footerConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] rounded"
                aria-label={t("footer.social.linkedin")}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">{t("footer.social.linkedin")}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("footer.productEcosystem")}</h3>
            <ul className="space-y-3">
              {footerConfig.links.productEcosystem.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] rounded"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t(link.label)}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] rounded"
                    >
                      {t(link.label)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("footer.learningResources")}</h3>
            <ul className="space-y-3">
              {footerConfig.links.learningResources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("footer.company")}</h3>
            <ul className="space-y-3">
              {footerConfig.links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] rounded"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <p className="text-gray-400">Â© 2025 Zaza Technologies. All rights reserved.</p>

          {/* Language links */}
          <div className="flex items-center gap-2">
            {languages.map((lang, index) => (
              <span key={lang.code} className="flex items-center">
                {index > 0 && <span className="text-gray-600 mx-2">Â·</span>}
                {lang.enabled ? (
                  <button
                    onClick={() => setLanguage(lang.code)}
                    className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] rounded px-1 ${
                      language === lang.code ? "text-purple-400 font-semibold" : "text-gray-400 hover:text-white"
                    }`}
                    aria-label={`Switch to ${lang.label}`}
                  >
                    {lang.label}
                  </button>
                ) : (
                  <span
                    className="text-sm text-gray-600 opacity-50 cursor-not-allowed px-1"
                    aria-disabled="true"
                    title="Coming soon"
                  >
                    {lang.label}
                  </span>
                )}
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-500">Built by educators, for educators.</p>
        </div>
      </div>
    </footer>
  )
}

