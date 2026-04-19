"use client";

import Link from "next/link";
import {
  Check,
  Shield,
  Languages,
  Download,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { SignupModal } from "@/components/signup-modal";
import { useState } from "react";

export default function FeaturesPage() {
  const { t, language } = useLanguage();
  const [signupOpen, setSignupOpen] = useState(false);
  const isGerman = language === "de";

  const heroTitle = isGerman
    ? "Funktionen fuer mehr Sicherheit im Ton und mehr Wert im Text"
    : "Features built for judgement, tone, and professional school writing";
  const heroSubtitle = isGerman
    ? "Zaza Draft hilft Lehrkraeften, professionelle Elternmails zu formulieren, Tonrisiken vor dem Senden zu erkennen und Zeugnisbemerkungen so zu verbessern, dass sie Eltern wirklich weiterhelfen."
    : "Zaza Draft is designed to help teachers write professional parent emails, spot tone risk before sending, and improve report comments so they say something genuinely useful.";
  const examplesHeading = isGerman
    ? "Wie die Funktionen in der Praxis helfen"
    : "How the features help in real writing";
  const examplesIntro = isGerman
    ? "Gute Kommunikation geht nicht nur darum, Text zu erzeugen. Es geht darum, professioneller, klarer und wertvoller zu formulieren."
    : "Good communication is not just about generating text. It is about making the final wording more professional, clearer, and more useful.";
  const examples = isGerman
    ? [
        {
          title: "Kalt vs professionell",
          weaker:
            "Ich habe Ihre Nachricht erhalten. Dieses Verhalten muss sich verbessern.",
          stronger:
            "Danke fuer Ihre Nachricht. Ich wollte kurz teilen, was heute passiert ist und wie wir Ihr Kind weiter dabei unterstuetzen, positive Verhaltensmuster aufzubauen.",
        },
        {
          title: "Generisch vs aussagekraeftig",
          weaker: "Sofia arbeitet hart und ist freundlich.",
          stronger:
            "Sofia arbeitet konstant und aufmerksam. Besonders stark ist ihre Faehigkeit, nach Feedback sorgfaeltig nachzubessern und ihre Ideen ruhig weiterzuentwickeln.",
        },
        {
          title: "Vage vs klar",
          weaker: "Es gab diese Woche ein paar Schwierigkeiten.",
          stronger:
            "Ich wollte Ihnen kurz zwei Situationen aus dieser Woche schildern, in denen Daniel waehrend der Gruppenarbeit Erinnerungen brauchte, damit Sie ein klares Bild davon haben, woran wir gerade arbeiten.",
        },
      ]
    : [
        {
          title: "Cold vs professional",
          weaker:
            "I have received your email. This behaviour needs to improve.",
          stronger:
            "Thank you for your email. I wanted to briefly share what happened today and how we are continuing to support your child in building more positive classroom habits.",
        },
        {
          title: "Generic vs meaningful",
          weaker: "Sofia works hard and is kind.",
          stronger:
            "Sofia works with steady concentration. She is especially strong at responding thoughtfully to feedback and developing her ideas with care.",
        },
        {
          title: "Vague vs clear",
          weaker: "There were a few issues this week.",
          stronger:
            "I wanted to share two brief moments from this week where Daniel needed reminders during group work, so you have a clear picture of what we are addressing in school.",
        },
      ];
  const resourceHeading = isGerman ? "Weiterfuehrende Hilfen" : "Go deeper";
  const resourceLinks = isGerman
    ? [
        {
          href: "/de/parent-email-risk-checker",
          label: "Risiko-Check fuer Elternmails",
        },
        {
          href: "/de/start",
          label: "Mit Zaza Draft starten",
        },
        {
          href: "/de/pricing",
          label: "Preise ansehen",
        },
        {
          href: "/de/products/draft",
          label: "Zaza Draft im Detail ansehen",
        },
      ]
    : [
        {
          href: "/teacher-email-tone-guide",
          label: "A Teacher's Guide to Email Tone with Parents",
        },
        {
          href: "/how-to-write-better-report-comments",
          label: "How to Write Better Report Comments",
        },
        {
          href: "/pricing",
          label: "See pricing",
        },
        {
          href: "/products/draft",
          label: "Explore Zaza Draft in detail",
        },
      ];

  const features = isGerman
    ? [
        {
          icon: Sparkles,
          title: "Tonhilfe fuer heikle Formulierungen",
          description:
            "Erkennt Stellen, die schnell zu schroff, kuhl oder missverstaendlich wirken koennen, und hilft bei ruhigeren Alternativen.",
          color: "from-purple-500 to-pink-500",
        },
        {
          icon: Shield,
          title: "Sicherere Schulkommunikation",
          description:
            "Unterstuetzt bei Elternmails, Verhaltensupdates und Dokumentation, wenn Professionalitaet und Vorsicht zusammenkommen muessen.",
          color: "from-blue-500 to-cyan-500",
        },
        {
          icon: Languages,
          title: "Klarer Ton auch ueber Sprachgrenzen",
          description:
            "Hilft dabei, dass Botschaft und Haltung auch in mehrsprachiger Elternkommunikation respektvoll und nachvollziehbar bleiben.",
          color: "from-green-500 to-emerald-500",
        },
        {
          icon: Download,
          title: "Entwuerfe, die du weiterverwenden kannst",
          description:
            "Speichere, ueberarbeite und exportiere Formulierungen, die sich fuer deinen Schulalltag bewaehrt haben.",
          color: "from-orange-500 to-red-500",
        },
        {
          icon: Check,
          title: "Mehrere Fassungen fuer bessere Entscheidungen",
          description:
            "Vergleiche ruhiger, klarer oder aussagekraeftiger formulierte Varianten, statt dich mit der ersten Version zufriedenzugeben.",
          color: "from-indigo-500 to-purple-500",
        },
      ]
    : [
        {
          icon: Sparkles,
          title: "Tone support for difficult wording",
          description:
            "Spots lines that may read as too blunt, cold, or easy to misread and helps you move toward calmer alternatives.",
          color: "from-purple-500 to-pink-500",
        },
        {
          icon: Shield,
          title: "Safer school communication",
          description:
            "Supports parent emails, behaviour updates, and documentation where professionalism and caution both matter.",
          color: "from-blue-500 to-cyan-500",
        },
        {
          icon: Languages,
          title: "Clear tone across languages",
          description:
            "Helps keep meaning and tone respectful in multilingual parent communication.",
          color: "from-green-500 to-emerald-500",
        },
        {
          icon: Download,
          title: "Drafts you can reuse",
          description:
            "Save, revise, and export wording patterns that work well in real school situations.",
          color: "from-orange-500 to-red-500",
        },
        {
          icon: Check,
          title: "Multiple versions for better judgement",
          description:
            "Compare calmer, clearer, or more informative variants instead of settling for the first output.",
          color: "from-indigo-500 to-purple-500",
        },
      ];

  return (
    <>
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-[#F9FAFB] sm:text-5xl">
              {heroTitle}
            </h1>
            <p className="text-xl leading-relaxed text-[#D1D5DB]">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="bg-[#111827] border-[#1F2937] p-8 transition-colors hover:border-[#7C3AED]/50"
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#F9FAFB]">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-[#9CA3AF]">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111827] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#F9FAFB] sm:text-4xl">
              {examplesHeading}
            </h2>
            <p className="text-lg text-[#D1D5DB]">{examplesIntro}</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {examples.map((example) => (
              <Card
                key={example.title}
                className="bg-[#0F172A] border-[#1F2937] p-8"
              >
                <h3 className="mb-5 text-xl font-bold text-[#F9FAFB]">
                  {example.title}
                </h3>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-rose-400/15 bg-rose-400/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-200">
                      {isGerman ? "Schwaecher" : "Weaker"}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#E5E7EB]">
                      {example.weaker}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      {isGerman ? "Staerker" : "Stronger"}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white">
                      {example.stronger}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#F9FAFB] sm:text-4xl">
              {t("features.how.title")}
            </h2>
            <p className="text-lg text-[#D1D5DB]">
              {t("features.how.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED]/10">
                <span className="text-2xl font-bold text-[#7C3AED]">1</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#F9FAFB]">
                {t("features.how.step1.title")}
              </h3>
              <p className="leading-relaxed text-[#9CA3AF]">
                {t("features.how.step1.desc")}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED]/10">
                <span className="text-2xl font-bold text-[#7C3AED]">2</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#F9FAFB]">
                {t("features.how.step2.title")}
              </h3>
              <p className="leading-relaxed text-[#9CA3AF]">
                {t("features.how.step2.desc")}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED]/10">
                <span className="text-2xl font-bold text-[#7C3AED]">3</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#F9FAFB]">
                {t("features.how.step3.title")}
              </h3>
              <p className="leading-relaxed text-[#9CA3AF]">
                {t("features.how.step3.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-3xl border border-[#1F2937] bg-[#111827] p-8 md:p-10">
            <h2 className="text-3xl font-bold text-[#F9FAFB]">
              {resourceHeading}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {resourceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[#1F2937] bg-[#0B1220] px-5 py-4 text-sm font-medium text-[#D1D5DB] transition hover:border-[#7C3AED]/50 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#7C3AED]/10 to-transparent py-20 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-[#F9FAFB] sm:text-4xl">
            {t("features.cta.title")}
          </h2>
          <p className="mb-8 text-lg text-[#D1D5DB]">
            {t("features.cta.subtitle")}
          </p>
          <Button
            onClick={() => setSignupOpen(true)}
            size="lg"
            className="gradient-primary text-base font-medium text-white"
          >
            {t("features.cta.primary")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
}
