"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { SignupModal } from "@/components/signup-modal";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";
import { DraftDemo } from "@/components/draft-demo";
import { CaseStudyCarousel } from "@/components/case-study-carousel";
import { SocialProofBadges } from "@/components/social-proof-badges";

const Check = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const SliderIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110 4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export function HomePageClient() {
  const { t, language } = useLanguage();
  const [signupOpen, setSignupOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showHallucinationTooltip, setShowHallucinationTooltip] =
    useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const scrollToDemo = () => {
    track("cta_click_home_see_examples", { language });
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  const testimonials = [
    {
      quote: t("testimonials.quote1.text"),
      author: t("testimonials.quote1.author"),
      name: t("testimonials.quote1.name"),
      image: "/testimonials/teacher-1.jpg",
    },
    {
      quote: t("testimonials.quote2.text"),
      author: t("testimonials.quote2.author"),
      name: t("testimonials.quote2.name"),
      image: "/images/marcus-johnson.png",
    },
    {
      quote: t("testimonials.quote3.text"),
      author: t("testimonials.quote3.author"),
      name: t("testimonials.quote3.name"),
      image: "/testimonials/teacher-3.jpg",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F172A] pt-32 lg:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-xs uppercase tracking-[2px] text-[#A855F7] font-semibold mb-4"
              >
                {t("hero.eyebrow")}
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/10 px-4 py-2 text-sm font-medium text-[#A78BFA] border border-[#8B5CF6]/30 backdrop-blur-sm"
              >
                <span className="text-xl" aria-hidden="true">
                  ✦
                </span>
                <span>{t("hero.badge")}</span>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="space-y-4"
              >
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                  <span className="text-white">{t("hero.headline")}</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {t("hero.headlineAccent")}
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="text-lg lg:text-xl text-[#CBD5E1] leading-relaxed max-w-[600px] mx-auto lg:mx-0"
              >
                {t("hero.subheading")}
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-transform transition-shadow duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/30 active:scale-[0.98]"
                >
                  <Link
                    href="/early-access"
                    onClick={() =>
                      track("cta_click_home_get_started", { language })
                    }
                  >
                    {t("hero.ctaPrimary")}
                  </Link>
                </Button>
                <Button
                  onClick={scrollToDemo}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-transform transition-shadow duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 group active:scale-[0.98]"
                >
                  {t("hero.ctaSecondary")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-6 text-sm text-gray-400 justify-center lg:justify-start pt-4"
              >
                <div className="relative flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>{t("hero.trustIndicators.hallucinationSafe")}</span>
                  <button
                    onClick={() =>
                      setShowHallucinationTooltip(!showHallucinationTooltip)
                    }
                    className="inline-flex items-center justify-center w-4 h-4 text-purple-400 hover:text-purple-300 transition-colors"
                    aria-label={t("hallucinationSafe.tooltip.heading")}
                  >
                    <InfoIcon className="w-4 h-4" />
                  </button>
                  {showHallucinationTooltip && (
                    <div className="absolute left-0 top-8 z-50 w-80 bg-white rounded-lg shadow-2xl p-5 border border-gray-200">
                      <button
                        onClick={() => setShowHallucinationTooltip(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        aria-label="Close"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {t("hallucinationSafe.tooltip.heading")}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {t("hallucinationSafe.tooltip.body")}
                      </p>
                      <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  {t("hero.trustIndicators.ferpaCompliant")}
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  {t("hero.trustIndicators.teachers")}
                </div>
              </motion.div>
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                className="text-xs text-gray-400 leading-relaxed max-w-[640px] mx-auto lg:mx-0"
              >
                {t("hero.trustClarifier")}
              </motion.p>
            </div>

            <motion.div
              className="w-full lg:h-[600px]"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      x: 0,
                      y: [0, -6, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.8, delay: 0.3 }
                  : {
                      opacity: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                      x: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                      y: {
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      },
                    }
              }
            >
              <div className="relative max-w-[520px] mx-auto h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-2xl blur-[20px] opacity-60 -z-10" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 h-full">
                  <Image
                    src="/professional-high-resolution-stock-photo-of-a-real.jpg"
                    alt="Strikingly attractive professional female teacher in modern classroom"
                    width={520}
                    height={600}
                    priority
                    className="w-full h-full rounded-2xl object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0F172A]/10"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Situations Section */}
      <section className="bg-[#0F172A] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center"
          >
            {t("situations.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {[
              t("situations.items.gradeDispute"),
              t("situations.items.accidentalCC"),
              t("situations.items.escalation"),
              t("situations.items.behaviorIncident"),
              t("situations.items.toneAccusation"),
              t("situations.items.sensitiveReport"),
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3 text-[#CBD5E1]"
              >
                <CheckCircleIcon className="w-5 h-5 text-[#A78BFA] mt-0.5 flex-shrink-0" />
                <span className="text-base leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1E293B] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg text-[#CBD5E1] leading-relaxed text-pretty max-w-[780px] mx-auto mb-8"
          >
            {t("philosophy.topParagraph")}
          </motion.p>
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-balance"
          >
            {t("problem.heading")}
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed text-pretty max-w-[700px] mx-auto"
          >
            {t("problem.body")}
          </motion.p>

          {/* Optional Supporting Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                value: t("problem.stats.parentEmails.value"),
                label: t("problem.stats.parentEmails.label"),
              },
              {
                value: t("problem.stats.reportCards.value"),
                label: t("problem.stats.reportCards.label"),
              },
              {
                value: t("problem.stats.gradingFeedback.value"),
                label: t("problem.stats.gradingFeedback.label"),
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#A855F7] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-1/4 w-1/3 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Solution/Mission Statement Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-balance"
          >
            {t("solution.heading")}
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed text-pretty max-w-[900px] mx-auto mb-6"
          >
            {t("solution.bodyPrimary")}
          </motion.p>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-[#94A3B8] leading-relaxed text-pretty max-w-[800px] mx-auto"
          >
            {t("solution.bodySecondary")}
          </motion.p>
        </div>
        <div className="absolute top-0 left-1/4 w-1/3 h-1/2 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/2 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0F172A] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                value: t("stats.documentsRefined.number"),
                label: t("stats.documentsRefined.label"),
              },
              {
                value: t("stats.teachers.number"),
                label: t("stats.teachers.label"),
              },
              {
                value: t("stats.timeSaved.number"),
                label: t("stats.timeSaved.label"),
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent mb-3">
                  {stat.value}
                </div>
                <div className="text-lg text-white font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-lg text-[#94A3B8] mt-16"
          >
            {t("stats.subtitle")}
          </motion.p>
          <SocialProofBadges />
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            {t("howItWorks.heading")}
          </motion.h2>

          {/* Visual Workflow Diagram */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
              {[
                {
                  icon: <DocumentIcon className="w-12 h-12 text-[#A855F7]" />,
                  title: t("howItWorks.diagram.step1.title"),
                  description: t("howItWorks.diagram.step1.description"),
                  example: t("howItWorks.diagram.step1.example"),
                },
                {
                  icon: <SliderIcon className="w-12 h-12 text-[#A855F7]" />,
                  title: t("howItWorks.diagram.step2.title"),
                  description: t("howItWorks.diagram.step2.description"),
                  example: t("howItWorks.diagram.step2.example"),
                },
                {
                  icon: (
                    <CheckCircleIcon className="w-12 h-12 text-[#A855F7]" />
                  ),
                  title: t("howItWorks.diagram.step3.title"),
                  description: t("howItWorks.diagram.step3.description"),
                  example: t("howItWorks.diagram.step3.example"),
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl p-8 shadow-lg h-full">
                    <div className="flex justify-center mb-4">{step.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      {step.description}
                    </p>
                    <p className="text-xs italic text-gray-500 text-center">
                      {step.example}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-[#A855F7]" />
                    </div>
                  )}
                  {index < 2 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight className="w-8 h-8 text-[#A855F7] rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3-Step Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                num: t("howItWorks.steps.step1.number"),
                title: t("howItWorks.steps.step1.title"),
                desc: t("howItWorks.steps.step1.description"),
              },
              {
                num: t("howItWorks.steps.step2.number"),
                title: t("howItWorks.steps.step2.title"),
                desc: t("howItWorks.steps.step2.description"),
              },
              {
                num: t("howItWorks.steps.step3.number"),
                title: t("howItWorks.steps.step3.title"),
                desc: t("howItWorks.steps.step3.description"),
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6"
                >
                  {step.num}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo">
        <DraftDemo
          language={language}
          onTryItYourself={() => {
            track("cta_click_home_try_demo", { language, location: "home" });
            setSignupOpen(true);
          }}
        />
      </section>

      {/* Use Cases Section */}
      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            {t("useCases.heading")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📩",
                title: t("useCases.cards.parentMessages.title"),
                desc: t("useCases.cards.parentMessages.description"),
                examples: t("useCases.cards.parentMessages.examples"),
              },
              {
                icon: "📋",
                title: t("useCases.cards.reportCards.title"),
                desc: t("useCases.cards.reportCards.description"),
                examples: t("useCases.cards.reportCards.examples"),
              },
              {
                icon: "📝",
                title: t("useCases.cards.gradingComments.title"),
                desc: t("useCases.cards.gradingComments.description"),
                examples: t("useCases.cards.gradingComments.examples"),
              },
              {
                icon: "📣",
                title: t("useCases.cards.schoolCommunications.title"),
                desc: t("useCases.cards.schoolCommunications.description"),
                examples: t("useCases.cards.schoolCommunications.examples"),
              },
              {
                icon: "🏅",
                title: t("useCases.cards.referenceLetters.title"),
                desc: t("useCases.cards.referenceLetters.description"),
                examples: t("useCases.cards.referenceLetters.examples"),
              },
              {
                icon: "📘",
                title: t("useCases.cards.documentation.title"),
                desc: t("useCases.cards.documentation.description"),
                examples: t("useCases.cards.documentation.examples"),
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -3 }}
                className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 transition-transform transition-shadow duration-200 hover:border-[#8B5CF6] hover:shadow-[0_12px_30px_rgba(139,92,246,0.2)] hover:-translate-y-1 transform-gpu"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-base text-[#CBD5E1] mb-4 leading-relaxed">
                  {card.desc}
                </p>
                <p className="text-sm text-[#94A3B8] italic">{card.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyCarousel />

      {/* Comparison Section */}
      <section className="bg-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("comparison.heading")}
            </h2>
            <p className="text-lg text-[#CBD5E1]">
              {t("comparison.subheading")}
            </p>
            <p className="text-sm text-[#94A3B8] mt-3 max-w-3xl mx-auto">
              {t("comparison.clarifier")}
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left py-4 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                      {t("comparison.tableHeaders.feature")}
                    </th>
                    <th className="text-center py-4 px-6 text-[#94A3B8] font-medium text-sm uppercase tracking-wider">
                      {t("comparison.tableHeaders.genericAI")}
                    </th>
                    <th className="text-center py-4 px-6 bg-[#8B5CF6]/10 text-[#A78BFA] font-semibold text-sm uppercase tracking-wider rounded-t-lg">
                      {t("comparison.tableHeaders.zazaDraft")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: t("comparison.rows.training.feature"),
                      generic: t("comparison.rows.training.generic"),
                      zaza: t("comparison.rows.training.zaza"),
                    },
                    {
                      feature: t("comparison.rows.safety.feature"),
                      generic: t("comparison.rows.safety.generic"),
                      zaza: t("comparison.rows.safety.zaza"),
                    },
                    {
                      feature: t("comparison.rows.toneControl.feature"),
                      generic: t("comparison.rows.toneControl.generic"),
                      zaza: t("comparison.rows.toneControl.zaza"),
                    },
                    {
                      feature: t("comparison.rows.compliance.feature"),
                      generic: t("comparison.rows.compliance.generic"),
                      zaza: t("comparison.rows.compliance.zaza"),
                    },
                    {
                      feature: t("comparison.rows.useCases.feature"),
                      generic: t("comparison.rows.useCases.generic"),
                      zaza: t("comparison.rows.useCases.zaza"),
                    },
                    {
                      feature: t("comparison.rows.outputQuality.feature"),
                      generic: t("comparison.rows.outputQuality.generic"),
                      zaza: t("comparison.rows.outputQuality.zaza"),
                    },
                    {
                      feature: t("comparison.rows.learningCurve.feature"),
                      generic: t("comparison.rows.learningCurve.generic"),
                      zaza: t("comparison.rows.learningCurve.zaza"),
                    },
                    {
                      feature: t("comparison.rows.community.feature"),
                      generic: t("comparison.rows.community.generic"),
                      zaza: t("comparison.rows.community.zaza"),
                    },
                  ].map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={
                        prefersReducedMotion ? {} : { opacity: 0, y: 10 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-[#334155] hover:bg-white/5 transition-colors"
                    >
                      <td className="py-5 px-6 text-white font-medium text-base">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-[#94A3B8] text-sm">
                          <XIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span>{row.generic}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center bg-[#8B5CF6]/5">
                        <div className="flex items-center justify-center gap-2 text-[#A78BFA] text-sm font-medium">
                          <Check className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                          <span>{row.zaza}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Zaza Section */}
      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            {t("whyChoose.heading")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                title: t("whyChoose.benefits.beatWritersBlock.title"),
                desc: t("whyChoose.benefits.beatWritersBlock.description"),
              },
              {
                title: t("whyChoose.benefits.writeWithConfidence.title"),
                desc: t("whyChoose.benefits.writeWithConfidence.description"),
              },
              {
                title: t("whyChoose.benefits.saveTime.title"),
                desc: t("whyChoose.benefits.saveTime.description"),
              },
              {
                title: t("whyChoose.benefits.breakBarriers.title"),
                desc: t("whyChoose.benefits.breakBarriers.description"),
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0F172A] border border-[#8B5CF6]/20 rounded-xl p-10 transition-transform transition-shadow duration-200 hover:border-[#8B5CF6] hover:shadow-[0_8px_20px_rgba(139,92,246,0.2)] hover:-translate-y-1 transform-gpu"
              >
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mb-5">
                  <Check className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-16"
          >
            {t("testimonials.heading")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-xl p-10 shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-[#8B5CF6] flex-shrink-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-bold text-[#1E293B] mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-sm font-semibold text-[#64748B]">
                      {testimonial.author}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FCD34D]" />
                  ))}
                </div>
                <p className="text-lg text-[#1E293B] italic leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t("finalCTA.heading")}
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-white/95 mb-10 max-w-2xl mx-auto"
          >
            {t("finalCTA.subheading")}
          </motion.p>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={() => {
                track("cta_click_home_final", { language });
                setSignupOpen(true);
              }}
              size="lg"
              className="bg-white text-[#8B5CF6] hover:bg-gray-50 font-semibold px-12 py-5 text-xl rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105"
              style={{ minHeight: "44px" }}
            >
              {t("finalCTA.button")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
}
