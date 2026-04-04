"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { resolveSelfServeCheckout } from "@/config/pricing";
import { usePricingCurrency } from "@/hooks/use-pricing-currency";
import { trackCtaClick } from "@/lib/analytics";
import { getDraftPricingHref } from "@/lib/draft-cta";
import { useLanguage } from "@/lib/i18n/language-context";
import { formatLocalizedPrice } from "@/lib/pricing-currency";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [funnelCtaReady, setFunnelCtaReady] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [learningCentreDropdownOpen, setLearningCentreDropdownOpen] =
    useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<
    Record<string, boolean>
  >({
    products: true,
    learning: true,
    resources: true,
    about: true,
  });
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const isGermanFunnel = pathname === "/de/start";
  const isStartFunnel = pathname === "/start" || isGermanFunnel;
  const isGermanFoundingFunnel = pathname === "/de/founding";
  const isFoundingFunnel = pathname === "/founding" || isGermanFoundingFunnel;
  const isAnyFunnel = isStartFunnel || isFoundingFunnel;
  const { currency } = usePricingCurrency({
    locales: isGermanFunnel ? ["de-DE"] : undefined,
  });
  const L = (de: string, en: string) => (language === "de" ? de : en);
  const riskCheckerLabel = L("Free Risk Checker", "Free Risk Checker");
  const headerCtaHref = getDraftPricingHref(language);
  const headerCtaLabel = t("nav.getStarted");
  const foundingToggleLinks = {
    en: "/founding",
    de: "/de/founding",
  } as const;
  const funnelReturnPath = isGermanFunnel ? "/de/start" : "/start";
  const funnelCheckout = resolveSelfServeCheckout({
    plan: "draft",
    interval: "annual",
    currency,
    returnPath: funnelReturnPath,
  });
  const funnelPriceLabel = `${formatLocalizedPrice(
    funnelCheckout.displayAmount,
    currency,
  )}/${isGermanFunnel ? "Jahr" : "year"}`;
  const funnelHeaderCtaHref =
    funnelCtaReady && funnelCheckout.isAvailable
      ? funnelCheckout.href
      : `${funnelReturnPath}#pricing`;
  const funnelHeaderCtaLabel =
    funnelCtaReady && funnelCheckout.isAvailable
      ? isGermanFunnel
        ? "Pro starten"
        : "Start Pro"
      : isGermanFunnel
        ? "Preise ansehen"
        : "See plans";

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setFunnelCtaReady(true);
  }, []);

  useEffect(() => {
    if (isAnyFunnel && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isAnyFunnel, mobileMenuOpen]);

  const navigation = [
    { name: riskCheckerLabel, href: "/parent-email-risk-checker" },
    { name: t("nav.pricing"), href: "/pricing" },
  ];
  const toggleMobileAccordion = (id: string) =>
    setMobileAccordion((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleHeaderNavClick = (href: string) => {
    if (href === "/parent-email-risk-checker") {
      trackCtaClick({
        ctaText: riskCheckerLabel,
        ctaLocation: "header_nav_checker",
      });
    }
    if (href === "/pricing") {
      trackCtaClick({
        ctaText: t("nav.pricing"),
        ctaLocation: "header_nav",
      });
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
    {
      id: "checker",
      title: riskCheckerLabel,
      href: "/parent-email-risk-checker",
    },
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

  const languageToggle = (
    <div className="flex items-center gap-2 rounded-lg bg-white/5 p-1">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          language === "en"
            ? "bg-[#8B5CF6] text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("de")}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          language === "de"
            ? "bg-[#8B5CF6] text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        DE
      </button>
    </div>
  );

  const foundingLanguageToggle = (
    <div
      className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
      role="group"
      aria-label={
        isGermanFoundingFunnel
          ? "Sprache für Gründungsseite auswählen"
          : "Select founding page language"
      }
    >
      <Link
        href={foundingToggleLinks.en}
        lang="en"
        hrefLang="en"
        aria-label="Switch founding page to English"
        aria-current={!isGermanFoundingFunnel ? "page" : undefined}
        className={`rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all sm:px-3 ${
          !isGermanFoundingFunnel
            ? "bg-[#8B5CF6] text-white shadow-sm"
            : "text-gray-300 hover:bg-white/5 hover:text-white"
        }`}
      >
        EN
      </Link>
      <Link
        href={foundingToggleLinks.de}
        lang="de"
        hrefLang="de"
        aria-label="Gründungsseite auf Deutsch anzeigen"
        aria-current={isGermanFoundingFunnel ? "page" : undefined}
        className={`rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all sm:px-3 ${
          isGermanFoundingFunnel
            ? "bg-[#8B5CF6] text-white shadow-sm"
            : "text-gray-300 hover:bg-white/5 hover:text-white"
        }`}
      >
        DE
      </Link>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-md shadow-lg shadow-black/5">
        <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-6 py-3 lg:px-8 lg:py-4">
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 flex items-center gap-3 p-1.5 transition-opacity hover:opacity-90 group"
            >
              <Image
                src="/z-logo.png"
                alt="Zaza"
                width={48}
                height={48}
                className="h-12 w-12 transition-transform group-hover:scale-105"
                priority
              />
              <span className="hidden text-xl font-bold text-white min-[380px]:inline">
                Zaza Draft
              </span>
            </Link>
          </div>

          {isFoundingFunnel ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {foundingLanguageToggle}
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700 sm:px-4 sm:text-sm"
              >
                <a
                  href="#founding-offer"
                  onClick={() =>
                    trackCtaClick({
                      ctaText: isGermanFoundingFunnel
                        ? "Als Gründungslehrkraft beitreten"
                        : "Join as a founding teacher",
                      ctaLocation: "header_founding",
                    })
                  }
                >
                  <span className="hidden sm:inline">
                    {isGermanFoundingFunnel
                      ? "Als Gründungslehrkraft beitreten"
                      : "Join as a founding teacher"}
                  </span>
                  <span className="sm:hidden">
                    {isGermanFoundingFunnel ? "Beitreten" : "Join"}
                  </span>
                </a>
              </Button>
            </div>
          ) : isStartFunnel ? (
            <div className="flex items-center gap-3">
              {languageToggle}
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700"
              >
                <a
                  href={funnelHeaderCtaHref}
                  onClick={() =>
                    trackCtaClick({
                      ctaText:
                        funnelCtaReady && funnelCheckout.isAvailable
                          ? `${funnelHeaderCtaLabel} – ${funnelPriceLabel}`
                          : funnelHeaderCtaLabel,
                      ctaLocation: "header_funnel",
                    })
                  }
                >
                  {funnelHeaderCtaLabel}
                </a>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-gray-300 transition-colors hover:bg-white/5"
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

              <div className="hidden lg:flex lg:items-center lg:gap-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[15px] font-medium text-gray-300 transition-colors duration-200 hover:text-white"
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
                  <button className="flex items-center gap-1 text-[15px] font-medium text-gray-300 transition-colors duration-200 hover:text-white">
                    {t("nav.products")}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {productsDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 pb-2">
                      <div className="mx-1 w-48 rounded-xl border border-white/10 bg-[#111827] py-2 shadow-xl shadow-black/20">
                        {productsMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
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
                  <button className="flex items-center gap-1 text-[15px] font-medium text-gray-300 transition-colors duration-200 hover:text-white">
                    {t("nav.learningCentre")}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {learningCentreDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 pb-2">
                      <div className="w-72 rounded-xl border border-white/10 bg-[#111827] py-2 shadow-xl shadow-black/20">
                        {learningCentreMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
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
                  <button className="flex items-center gap-1 text-[15px] font-medium text-gray-300 transition-colors duration-200 hover:text-white">
                    {t("nav.resources")}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {resourcesDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 pb-2">
                      <div className="w-56 rounded-xl border border-white/10 bg-[#111827] py-2 shadow-xl shadow-black/20">
                        {resourcesMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
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
                  <button className="flex items-center gap-1 text-[15px] font-medium text-gray-300 transition-colors duration-200 hover:text-white">
                    {t("nav.about")}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {aboutDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 pb-2">
                      <div className="w-56 rounded-xl border border-white/10 bg-[#111827] py-2 shadow-xl shadow-black/20">
                        {aboutMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
                {languageToggle}
                <Button
                  asChild
                  className="ml-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link
                    href={headerCtaHref}
                    onClick={() =>
                      trackCtaClick({
                        ctaText: headerCtaLabel,
                        ctaLocation: "header_primary",
                      })
                    }
                  >
                    {headerCtaLabel}
                  </Link>
                </Button>
              </div>
            </>
          )}
        </nav>

        {!isAnyFunnel && mobileMenuOpen && (
          <div className="fixed inset-0 z-[60] flex lg:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative z-10 flex h-[100dvh] w-full flex-col bg-[#0B1220] pt-[env(safe-area-inset-top)]">
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0B1220] px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
                  Menu
                </span>
                <button
                  type="button"
                  className="rounded-xl border border-white/10 px-3 py-2 text-gray-200 transition-colors hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
                <div className="mb-6 flex w-fit gap-2 rounded-full bg-white/5 p-1">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all ${
                      language === "en"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("de")}
                    className={`rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all ${
                      language === "de"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    DE
                  </button>
                </div>

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
                                  className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
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
                        onClick={() => {
                          if (section.href === "/parent-email-risk-checker") {
                            trackCtaClick({
                              ctaText: riskCheckerLabel,
                              ctaLocation: "header_mobile_checker",
                            });
                          }
                          setMobileMenuOpen(false);
                        }}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {section.title}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <div className="border-t border-white/10 px-4 py-6">
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-medium text-white shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Link
                      href={headerCtaHref}
                      onClick={() => {
                        trackCtaClick({
                          ctaText: headerCtaLabel,
                          ctaLocation: "header_mobile",
                        });
                        setMobileMenuOpen(false);
                      }}
                    >
                      {headerCtaLabel}
                    </Link>
                  </Button>
                </div>
                <div className="mt-6 space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                    Company
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                    <Link href="/privacy" className="hover:text-white">
                      Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-white">
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
    </>
  );
}
