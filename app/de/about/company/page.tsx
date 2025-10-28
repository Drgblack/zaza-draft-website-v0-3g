"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

export const metadata: Metadata = {
  title: "Über Zaza Technologies",
  description: "Lehrerfreundliche KI, gemeinsam mit Lehrkräften entwickelt.",
};

<<<<<<< HEAD
export default function AboutCompanyPageDE() {
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const items = document.querySelectorAll<HTMLElement>("[data-fade]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("animate-in");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 text-center">
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold">{t("about.company.hero.title")}</h1>
          <p className="mt-5 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto font-semibold">
            {t("about.company.hero.introBold")}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <hr className="my-6 border-slate-200 dark:border-slate-800" />
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
            {t("about.company.intro.p1")}
          </p>
          <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
            {t("about.company.intro.p2")}
=======
export default function Page() {
  try {
    return (
      <main className="min-h-[70vh]">
        <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Über Zaza Technologies
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Lehrkräfte haben nicht für so viel Verwaltung unterschrieben.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-10 leading-relaxed">
          <p>
            Sie wurden Lehrkraft, um Menschen zu inspirieren, nicht um in Korrekturen,
            Dokumentation und E-Mail-Management zu versinken. Dennoch erleben wir steigende
            Burnout-Zahlen und dass engagierte Pädagoginnen und Pädagogen den Beruf
            verlassen, weil die bürokratische Last nicht mehr tragbar ist.
>>>>>>> d943045 (fix(about/company): make pages server components; remove client hooks; keep centered hero + DE fallback)
          </p>

          <p className="mt-6 font-semibold text-slate-900 dark:text-white">
            {t("about.company.intro.changeBold")}
          </p>

<<<<<<< HEAD
          {/* Warum Lehrer Zaza brauchen */}
          <section className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t("about.company.whyNeed.title")}
            </h2>
            <div className="mt-4 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>{t("about.company.whyNeed.p1")}</p>
              <p>{t("about.company.whyNeed.p2")}</p>
              <p>{t("about.company.whyNeed.p3")}</p>
              <p>{t("about.company.whyNeed.p4")}</p>
            </div>

            <div className="mt-5">
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/de/about/founder">{t("about.company.founder.link")}</Link>
              </Button>
            </div>
          </section>
=======
          <div>
            <h2 className="text-xl font-semibold">Was uns unterscheidet</h2>
            <p className="mt-2">
              Wir sind nicht noch ein Tech-Unternehmen, das „die Bildung entdeckt“. Zaza
              basiert auf zwei Jahrzehnten Lernforschung und Weiterbildungspraxis, mit
              Tausenden von Lehrkräften, die unsere Tools durch Feedback aus dem Alltag
              mitgestalten. Jedes Produkt entsteht im Co-Design mit Lehrkräften und ist in
              Forschung verankert - denn Abkürzungen, die die Pädagogik schwächen, sind
              keine Abkürzungen.
            </p>
            <p className="mt-2">
              Deshalb gibt es den <strong>KnowledgeCore</strong> - eine vertrauenswürdige
              Intelligenzschicht, die jede Zaza App erklärbar, datenschutzfreundlich und
              klassentauglich hält. Keine Black Boxes. Keine Halluzinationen, die Sie
              schlecht aussehen lassen. Keine Untergrabung Ihrer professionellen
              Urteilsfähigkeit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">So funktioniert es</h2>
            <p className="mt-2">
              Von <Link href="/products/draft" className="underline">Zaza Draft</Link>
              {" "} (intelligentes Verfassen von Kommentaren) bis
              {" "} <Link href="/products/teach" className="underline">Zaza Teach</Link>
              {" "} (KI-gestützte Unterrichtsplanung mit AutoPlanner) und darüber hinaus
              verfolgen alle Produkte ein Ziel: Ihnen Ihre Zeit zurückzugeben, damit Sie
              sich auf das konzentrieren können, was Sie am besten können - unterrichten.
            </p>
          </div>
>>>>>>> d943045 (fix(about/company): make pages server components; remove client hooks; keep centered hero + DE fallback)

          <hr className="my-10 border-slate-200 dark:border-slate-800" />

          {/* Vision */}
          <blockquote className="italic text-slate-800 dark:text-slate-100 border-l-4 pl-4 border-purple-400/60">
            <p>„{t("about.company.vision.quote")}“</p>
            <cite className="not-italic text-sm text-slate-600 dark:text-slate-400 block mt-2">Zaza Technologies</cite>
          </blockquote>

          <hr className="my-10 border-slate-200 dark:border-slate-800" />

          {/* Vertrauen */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t("about.company.whyTrust.title")}
            </h2>
            <p className="mt-4 font-semibold text-slate-900 dark:text-white">
              {t("about.company.whyTrust.p1Bold")}
            </p>
<<<<<<< HEAD
            <div className="mt-3 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>{t("about.company.whyTrust.p2")}</p>
              <p>{t("about.company.whyTrust.p3")}</p>
              <p className="font-semibold text-slate-900 dark:text-white">
                {t("about.company.whyTrust.knowledgeCoreBold")}
              </p>
              <p className="font-medium">{t("about.company.whyTrust.noBlackBoxes")}</p>
              <p>{t("about.company.whyTrust.useCase")}</p>
            </div>

            {/* Testimonial 1 */}
            <figure
              data-fade
              className="mt-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 p-5 shadow-sm motion-safe:opacity-0 motion-safe:translate-y-3"
            >
              <p className="text-slate-900 dark:text-white">„{t("about.company.whyTrust.testimonial1.text")}“</p>
              <figcaption className="mt-3 text-sm text-slate-600 dark:text-slate-400">– {t("about.company.whyTrust.testimonial1.author")}</figcaption>
            </figure>
          </section>

          {/* Mid‑page CTA */}
          <section className="mt-10">
            <div className="rounded-2xl gradient-primary text-white p-6 sm:p-8 text-center">
              <h3 className="text-2xl font-bold">{t("about.company.cta.mid.title")}</h3>
              <div className="mt-4">
                <Button asChild size="lg" className="rounded-full bg-white text-slate-900 hover:bg-white/90">
                  <Link href="/signup" data-cta="about-mid">{t("about.company.cta.mid.button")}</Link>
                </Button>
              </div>
            </div>
          </section>

          <hr className="my-10 border-slate-200 dark:border-slate-800" />

          {/* Ein Tag mit Zaza */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t("about.company.day.title")}
            </h2>
            <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">{t("about.company.day.p1")}</p>
            <p className="mt-4 font-semibold text-slate-900 dark:text-white">{t("about.company.day.changeBold")}</p>

            <div className="mt-4 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                <span className="font-semibold">{t("about.company.day.parentUpdateBold")} </span>
                {t("about.company.day.parentUpdateBody")}
              </p>
              <p>
                <span className="font-semibold">{t("about.company.day.lessonPlanBold")} </span>
                {t("about.company.day.lessonPlanBody")}
              </p>
              <p>
                <span className="font-semibold">{t("about.company.day.gradingBold")} </span>
                {t("about.company.day.gradingBody")}
              </p>
              <p>
                <span className="font-semibold">{t("about.company.day.shieldBold")} </span>
                {t("about.company.day.shieldBody")}
              </p>
              <p>{t("about.company.day.wrap")}</p>
              <p className="font-semibold">{t("about.company.day.principlesBold")}</p>
              <p>{t("about.company.day.zara")}</p>
            </div>

            {/* Testimonial 2 */}
            <figure
              data-fade
              className="mt-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 p-5 shadow-sm motion-safe:opacity-0 motion-safe:translate-y-3"
            >
              <p className="text-slate-900 dark:text-white">„{t("about.company.day.testimonial2.text")}“</p>
              <figcaption className="mt-3 text-sm text-slate-600 dark:text-slate-400">– {t("about.company.day.testimonial2.author")}</figcaption>
            </figure>

            <div className="mt-8 text-center">
              <Button asChild size="lg" className="rounded-full gradient-primary text-white">
                <Link href="/signup" data-cta="about-final">{t("about.company.cta.final.button")}</Link>
              </Button>
            </div>
          </section>

          <hr className="my-10 border-slate-200 dark:border-slate-800" />

          {/* Unser Versprechen */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t("about.company.promise.title")}
            </h2>
            <div className="mt-4 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>{t("about.company.promise.p1")}</p>
              <p className="font-semibold text-slate-900 dark:text-white">{t("about.company.promise.p2Bold")}</p>
              <p>{t("about.company.promise.p3")}</p>
            </div>
            <p className="mt-8 italic text-slate-600 dark:text-slate-400">*{t("about.company.footer")}*</p>
          </section>
        </div>
      </section>
    </main>
  );
=======
          </div>
        </section>
      </main>
    );
  } catch {
    redirect("/about/company");
  }
>>>>>>> d943045 (fix(about/company): make pages server components; remove client hooks; keep centered hero + DE fallback)
}
