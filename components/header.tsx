"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { SignupModal } from "@/components/signup-modal";
import { track } from "@/lib/analytics";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [learningCentreDropdownOpen, setLearningCentreDropdownOpen] =
    useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<
    Record<string, boolean>
  >({});
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const L = (de: string, en: string) => (language === "de" ? de : en);

  const navigation = [{ name: t("nav.pricing"), href: "/pricing" }];
  const toggleMobileAccordion = (id: string) =>
    setMobileAccordion((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleHeaderNavClick = (href: string) => {
    if (href === "/pricing") {
      track("cta_click", { location: "header", id: "pricing" });
    }
  };

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
  ];

  const learningCentreMenuItems = [
    {
      name: L("AI-Literacy-Ressourcencenter", "AI Literacy Resource Center"),
      href: "/ai-literacy",
    },
    {
      name: L("Glossar", "Glossary"),
      href: "/glossary",
    },
    {
      name: L("Webinare", "Webinars"),
      href: "/webinars",
    },
    {
      name: L("Video-Tutorials", "Video Tutorials"),
      href: "/videos",
    },
    {
      name: L(
        "Bestes KI-Tool für Eltern-E-Mails",
        "Best AI Tool for Parent Emails",
      ),
      href: "/best-ai-tool-parent-emails",
    },
    {
      name: L(
        "Weniger Stress beim Schreiben an Eltern",
        "Reduce Stress Writing Parent Messages",
      ),
      href: "/reduce-stress-parent-messages",
    },
    {
      name: L(
        "Beste KI-Schreibtools für Lehrkräfte 2025",
        "Best AI Writing Tools for Teachers 2025",
      ),
      href: "/best-ai-writing-tools-for-teachers-2025",
    },
    {
      name: L("KI für Zeugnis-/Schülerberichte", "AI for Student Reports"),
      href: "/ai-for-student-reports",
    },
  ];

  const resourcesMenuItems = [
    { name: "Blog", href: "/blog" },
    { name: L("Tools vergleichen", "Compare Tools"), href: "/compare" },
    { name: L("Integrationen", "Integrations"), href: "/integrations" },
    { name: L("Community", "Community"), href: "/community" },
    {
      name: L("Erfolgsgeschichten", "Success Stories"),
      href: "/success-stories",
    },
    { name: L("ROI-Rechner", "ROI Calculator"), href: "/roi-calculator" },
    { name: t("nav.faq"), href: "/faq" },
    { name: t("nav.resources"), href: "/resources" },
  ];

  const aboutMenuItems = [
    { name: t("about.nav.company"), href: "/about/company" },
    { name: t("about.nav.founder"), href: "/about/founder" },
    { name: t("about.nav.press"), href: "/about/press" },
    {
      name: L("Ambassador-Programm", "Ambassador Program"),
      href: "/ambassadors",
    },
    {
      name: L("State-of-AI-Report", "State of AI Report"),
      href: "/state-of-ai-education",
    },
  ];

  const mobileSections = [
    { id: "pricing", title: t("nav.pricing"), href: "/pricing" },
    { id: "products", title: t("nav.products"), children: productsMenuItems },
    {
      id: "learning",
      title: t("nav.learningCentre"),
      children: learningCentreMenuItems,
    },
    {
      id: "resources",
      title: t("nav.resources"),
      children: resourcesMenuItems,
    },
    { id: "about", title: t("nav.about"), children: aboutMenuItems },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-md shadow-lg shadow-black/5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 py-3 lg:py-4 min-h-[72px]">
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 flex items-center gap-3 group hover:opacity-90 transition-opacity"
            >
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
                onClick={() => handleHeaderNavClick(item.href)}
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
                {t("nav.learningCentre")}
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
                {t("nav.resources")}
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
            {/* EN / DE toggle */}
            <div className="flex items-center gap-2 rounded-lg bg-white/5 p-1">
              <button
                onClick={() => {
                  const newPath = pathname.replace(/^\/de(\/|$)/, "$1") || "/";
                  setLanguage("en");
                  router.push(newPath);
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  language === "en"
                    ? "bg-[#8B5CF6] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  const newPath = pathname.startsWith("/de")
                    ? pathname
                    : "/de" + (pathname === "/" ? "" : pathname);
                  setLanguage("de");
                  router.push(newPath);
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  language === "de"
                    ? "bg-[#8B5CF6] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                DE
              </button>
            </div>

            {/* Desktop Get Started CTA */}
            <Button
              onClick={() => {
                track("cta_click", { location: "header", id: "get_started" });
                setSignupOpen(true);
              }}
              className="ml-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25"
            >
              {t("nav.getStarted")}
            </Button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative z-10 flex w-full flex-col bg-[#0B1220]">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0B1220] px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
                  Menu
                </span>
                <button
                  type="button"
                  className="rounded-xl border border-white/10 px-3 py-2 text-gray-200 hover:bg-white/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-2">
                  {mobileSections.map((section) => {
                    const controlsId = `mobile-section-${section.id}`;
                    if (section.children) {
                      return (
                        <div
                          key={section.id}
                          className="overflow-hidden rounded-2xl border border-white/5 bg-white/5"
                        >
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white"
                            onClick={() => toggleMobileAccordion(section.id)}
                            aria-expanded={
                              mobileAccordion[section.id] ? "true" : "false"
                            }
                            aria-controls={controlsId}
                          >
                            {section.title}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                mobileAccordion[section.id] ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {mobileAccordion[section.id] && (
                            <div
                              id={controlsId}
                              className="space-y-1 border-t border-white/5 px-4 pb-3"
                            >
                              {section.children.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={section.id}
                        href={section.href || "#"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {section.title}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <div className="border-t border-white/10 px-4 py-6">
                <div className="space-y-3">
                  <div className="flex gap-2 rounded-full bg-white/5 p-1">
                    <button
                      onClick={() => {
                        const newPath = pathname.startsWith("/de")
                          ? pathname.replace(/^\/de/, "")
                          : pathname;
                        setLanguage("en");
                        router.push(newPath === "" ? "/" : newPath);
                      }}
                      className={`flex-1 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all ${
                        language === "en"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "text-gray-400"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        const newPath = pathname.startsWith("/de")
                          ? pathname
                          : "/de" + (pathname === "/" ? "" : pathname);
                        setLanguage("de");
                        router.push(newPath);
                      }}
                      className={`flex-1 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all ${
                        language === "de"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "text-gray-400"
                      }`}
                    >
                      DE
                    </button>
                  </div>
                  <Button
                    onClick={() => {
                      track("cta_click", {
                        location: "header",
                        id: "mobile_get_started",
                      });
                      setSignupOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-full shadow-lg shadow-purple-500/25"
                  >
                    {t("nav.getStarted")}
                  </Button>
                </div>
                <div className="mt-6 space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                    Company
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                    <Link href="/privacy-policy" className="hover:text-white">
                      Privacy
                    </Link>
                    <Link href="/terms-of-service" className="hover:text-white">
                      Terms
                    </Link>
                    <Link href="/impressum" className="hover:text-white">
                      Impressum
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
}
