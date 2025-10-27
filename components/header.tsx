"use client";
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { SignupModal } from "@/components/signup-modal"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
  const [learningCentreDropdownOpen, setLearningCentreDropdownOpen] = useState(false)
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navigation = [{ name: t("nav.pricing"), href: "/pricing" }]

  const productsMenuItems = [
  { name: t("nav.products.suite") || "Zaza Suite", href: "/suite" },
    {
      name: t("nav.products.teach") || "Zaza Teach",
      href: "/products/teach",
    },
    {
      name: t("nav.products.draft") || "Zaza Draft",
      href: "/products/draft",
    },
    {
      name: t("nav.products.gradeflow") || "GradeFlow",
      href: "/products/gradeflow",
    },
    {
      name: t("nav.products.shield") || "Zaza Shield",
      href: "/products/shield",
    },
  ]

  const learningCentreMenuItems = [
    {
      name: "AI Literacy Resource Center",
      href: "/ai-literacy",
    },
    {
      name: "Glossary",
      href: "/glossary",
    },
    {
      name: "Webinars",
      href: "/webinars",
    },
    {
      name: "Video Tutorials",
      href: "/videos",
    },
    {
      name: "Best AI Tool for Parent Emails",
      href: "/best-ai-tool-parent-emails",
    },
    {
      name: "Reduce Stress Writing Parent Messages",
      href: "/reduce-stress-parent-messages",
    },
    {
      name: "Best AI Writing Tools for Teachers 2025",
      href: "/best-ai-writing-tools-for-teachers-2025",
    },
    {
      name: "AI for Student Reports",
      href: "/ai-for-student-reports",
    },
  ]

  const resourcesMenuItems = [
    { name: "Blog", href: "/blog" },
    { name: "Compare Tools", href: "/compare" },
    { name: "Integrations", href: "/integrations" },
    { name: "Community", href: "/community" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "ROI Calculator", href: "/roi-calculator" },
    { name: t("nav.faq"), href: "/faq" },
    { name: t("nav.resources"), href: "/resources" },
  ]

  const aboutMenuItems = [
    { name: t("about.nav.company"), href: "/about/company" },
    { name: t("about.nav.founder"), href: "/about/founder" },
    { name: t("about.nav.press"), href: "/about/press" },
    { name: "Ambassador Program", href: "/ambassadors" },
    { name: "State of AI Report", href: "/state-of-ai-education" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-md shadow-lg shadow-black/5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 h-20">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group hover:opacity-90 transition-opacity">
              <Image
                src="/z-logo.png"
                alt="Zaza"
                width={48}
                height={48}
                className="h-12 w-12 transition-transform group-hover:scale-105"
                priority
              />
              <span className="text-xl font-bold text-white">Zaza Draft</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-gray-300 hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1">
                {t("nav.products")}
                <ChevronDown className="h-4 w-4" />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 pb-2">
                  <div className="w-48 rounded-xl bg-[#111827] border border-white/10 shadow-xl shadow-black/20 py-2">
                    {productsMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-base text-gray-300 hover:bg-white/5 hover:text-white transition-colors rounded-md mx-1"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setLearningCentreDropdownOpen(true)}
              onMouseLeave={() => setLearningCentreDropdownOpen(false)}
            >
              <button className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1">
                Learning Centre
                <ChevronDown className="h-4 w-4" />
              </button>

              {learningCentreDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 pb-2">
                  <div className="w-72 rounded-xl bg-[#111827] border border-white/10 shadow-xl shadow-black/20 py-2">
                    {learningCentreMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <button className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1">
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 pb-2">
                  <div className="w-56 rounded-xl bg-[#111827] border border-white/10 shadow-xl shadow-black/20 py-2">
                    {resourcesMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1">
                {t("nav.about")}
                <ChevronDown className="h-4 w-4" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 pb-2">
                  <div className="w-56 rounded-xl bg-[#111827] border border-white/10 shadow-xl shadow-black/20 py-2">
                    {aboutMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 items-center">
            <div className="flex items-center gap-2 rounded-lg bg-white/5 p-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  language === "en" ? "bg-[#8B5CF6] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("de")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  language === "de" ? "bg-[#8B5CF6] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                DE
              </button>
            </div>
            <Button
              onClick={() => setSignupOpen(true)}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:from-[#7C3AED] hover:to-[#9333EA] text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40 hover:scale-105"
            >
              {t("nav.getStarted")}
            </Button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0B1220]/98 backdrop-blur-xl">
            <div className="space-y-1 px-6 pb-6 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-400">{t("nav.products")}</div>
                {productsMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-xl px-6 py-2.5 text-base text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-400">Learning Centre</div>
                {learningCentreMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-xl px-6 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-400">Resources</div>
                {resourcesMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-xl px-6 py-2.5 text-base text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-400">{t("nav.about")}</div>
                {aboutMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-xl px-6 py-2.5 text-base text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 pb-2">
                <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 border border-white/10">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      language === "en" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "text-gray-400"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("de")}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      language === "de" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "text-gray-400"
                    }`}
                  >
                    Deutsch
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => {
                    setSignupOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-full shadow-lg shadow-purple-500/25"
                >
                  {t("nav.getStarted")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  )
}

