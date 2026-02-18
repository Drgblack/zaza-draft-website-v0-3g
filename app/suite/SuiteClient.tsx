"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";

const suiteImages = [
  {
    src: "/images/teacher-writing-or-reflecting.png",
    alt: "Teacher writing or reflecting",
  },
  {
    src: "/images/teacher-interacting-warmly-with-students.png",
    alt: "Teacher interacting warmly with students",
  },
  {
    src: "/images/teacher-working-after-class.png",
    alt: "Teacher working after class",
  },
];

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-[#334155] bg-[#1E293B] text-white shadow-lg p-6 md:p-8 transition-all duration-300 hover:border-[#8B5CF6] hover:shadow-[0_12px_30px_rgba(139,92,246,0.2)]">
      <h3 className="text-xl md:text-2xl font-semibold text-[#A855F7] mb-4">
        {title}
      </h3>
      <div className="mt-3 text-sm md:text-base text-[#CBD5E1]">{children}</div>
    </article>
  );
}

export default function SuiteClient() {
  const { t, language } = useLanguage();
  const betaFeedbackHeading =
    language === "de"
      ? "Feedback aus der Beta folgt"
      : "Beta feedback is coming";
  const betaFeedbackBody =
    language === "de"
      ? "Wir onboarden gerade die erste Gruppe Lehrkräfte. Echte Zitate erscheinen hier, sobald wir sie gesammelt haben. Wenn du Draft mitgestalten möchtest, tritt dem Early Access bei."
      : "We are onboarding our first cohort of teachers now. Real quotes will appear here as soon as they are collected. If you would like to shape Draft, join early access.";
  const betaFeedbackCta =
    language === "de" ? "Early Access" : "Join Early Access";

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    suiteImages.forEach((image) => {
      if (image.src.includes("C:\\") || image.src.includes("/public/")) {
        console.warn("[suite] suspicious image path used:", image.src);
      }
    });
  }, []);

  return (
    <main className="bg-[#0F172A] text-white">
      {/* HERO */}
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {t("suite.hero.title")}
          </h1>
          <p className="mt-6 text-base/7 text-[#94A3B8]">
            {t("suite.hero.subhead")}
          </p>
        </div>
        {/* Trust Bar */}
        <div className="mt-10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[#94A3B8]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                {t("suite.trust.hallucinationSafe")}
              </span>
              <span className="hidden sm:inline text-[#475569]">|</span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                {t("suite.trust.ferpa")}
              </span>
              <span className="hidden sm:inline text-[#475569]">|</span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                {t("suite.trust.teachers")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS STRIP */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-center text-sm text-[#64748B] mb-4">
            {t("suite.logos.title")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[#94A3B8]">
            <span className="text-sm sm:text-base font-medium opacity-80">
              {t("suite.logos.item1")}
            </span>
            <span className="text-sm sm:text-base font-medium opacity-80">
              {t("suite.logos.item2")}
            </span>
            <span className="text-sm sm:text-base font-medium opacity-80">
              {t("suite.logos.item3")}
            </span>
            <span className="text-sm sm:text-base font-medium opacity-80">
              {t("suite.logos.item4")}
            </span>
            <span className="text-sm sm:text-base font-medium opacity-80">
              {t("suite.logos.item5")}
            </span>
          </div>
        </div>
      </section>

      {/* TEACHER-FIRST */}
      <section className="bg-[#1E293B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("suite.teacherFirst.title")}
            </h2>
            <p className="text-lg text-[#CBD5E1] leading-relaxed">
              {t("suite.teacherFirst.body")}
            </p>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-4">
            {t("suite.screens.title")}
          </h2>
          <p className="text-center text-[#E0E7FF] mb-10">
            {t("suite.screens.caption")}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {suiteImages.map((image) => (
              <div
                key={image.src}
                className="rounded-2xl border border-[#334155] bg-[#0F172A] overflow-hidden"
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR APPS */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">
            {t("suite.coreApps.title")}
          </h2>
          <div className="grid gap-6 md:gap-8">
            <Card title="Zaza Teach">
              <p>{t("suite.teach.body")}</p>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#94A3B8]">
                <li>{t("suite.teach.li1")}</li>
                <li>{t("suite.teach.li2")}</li>
                <li>{t("suite.teach.li3")}</li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/products/teach"
                  className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all"
                >
                  {t("suite.teach.cta")}
                </Link>
              </div>
            </Card>

            <Card title="Zaza Draft">
              <p>{t("suite.draft.body")}</p>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#94A3B8]">
                <li>{t("suite.draft.li1")}</li>
                <li>{t("suite.draft.li2")}</li>
                <li>{t("suite.draft.li3")}</li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/products/draft"
                  className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all"
                >
                  {t("suite.draft.cta")}
                </Link>
              </div>
            </Card>

            <Card title="Zaza GradeFlow">
              <p>{t("suite.gradeflow.body")}</p>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#94A3B8]">
                <li>{t("suite.gradeflow.li1")}</li>
                <li>{t("suite.gradeflow.li2")}</li>
                <li>{t("suite.gradeflow.li3")}</li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/products/gradeflow"
                  className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all"
                >
                  {t("suite.gradeflow.cta")}
                </Link>
              </div>
            </Card>

            <Card title="Zaza Shield">
              <p>{t("suite.shield.body")}</p>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-[#94A3B8]">
                <li>{t("suite.shield.li1")}</li>
                <li>{t("suite.shield.li2")}</li>
                <li>{t("suite.shield.li3")}</li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/products/shield"
                  className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all"
                >
                  {t("suite.shield.cta")}
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-20 bg-[#0F172A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-10">
            {t("suite.hiw.title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-6">
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center text-[#A78BFA] font-semibold">
                1
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t("suite.hiw.step1.title")}
              </h3>
              <p className="mt-2 text-[#94A3B8]">{t("suite.hiw.step1.desc")}</p>
            </div>
            <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-6">
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center text-[#A78BFA] font-semibold">
                2
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t("suite.hiw.step2.title")}
              </h3>
              <p className="mt-2 text-[#94A3B8]">{t("suite.hiw.step2.desc")}</p>
            </div>
            <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-6">
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center text-[#A78BFA] font-semibold">
                3
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t("suite.hiw.step3.title")}
              </h3>
              <p className="mt-2 text-[#94A3B8]">{t("suite.hiw.step3.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#0F172A] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-10">
            {t("suite.testimonials.title")}
          </h2>
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#334155] bg-[#0F172A] p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {betaFeedbackHeading}
            </h3>
            <p className="text-[#CBD5E1] mb-6">{betaFeedbackBody}</p>
            <Link
              href="/pricing#draft"
              className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-[#8B5CF6] bg-transparent text-[#A78BFA] px-6 font-semibold hover:bg-[#8B5CF6]/10 transition-all"
            >
              {betaFeedbackCta}
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="bg-[#1E293B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("suite.platform.title")}
            </h2>
            <p className="text-lg text-[#CBD5E1] leading-relaxed">
              {t("suite.platform.body")}
            </p>
            <ul className="mt-6 list-disc pl-6 space-y-2 text-[#94A3B8]">
              <li>{t("suite.platform.li1")}</li>
              <li>{t("suite.platform.li2")}</li>
              <li>{t("suite.platform.li3")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY SCHOOLS */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#334155] bg-[#1E293B] p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("suite.why.title")}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5"
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
                <span className="text-lg text-[#CBD5E1]">
                  {t("suite.why.timeSaved")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5"
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
                <span className="text-lg text-[#CBD5E1]">
                  {t("suite.why.retention")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5"
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
                <span className="text-lg text-[#CBD5E1]">
                  {t("suite.why.safety")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5"
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
                <span className="text-lg text-[#CBD5E1]">
                  {t("suite.why.evidence")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="bg-[#1E293B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#334155] bg-[#0F172A] p-8 md:p-10 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("suite.roadmap.title")}
            </h2>
            <p className="text-lg text-[#CBD5E1] leading-relaxed">
              {t("suite.roadmap.body")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("suite.cta.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/95 mb-10 leading-relaxed">
            {t("suite.cta.body")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-[#8B5CF6] shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              {t("suite.cta.primary")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-white px-8 font-semibold text-white hover:bg-white/10 transition-all"
            >
              {t("suite.cta.secondary")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
