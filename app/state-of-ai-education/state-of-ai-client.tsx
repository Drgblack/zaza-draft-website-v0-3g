"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

export default function StateOfAIClient() {
  const { language } = useLanguage();
  const isGerman = language === "de";

  const content = isGerman
    ? {
        badge: "Ressourcen-Hub",
        title: "Wie Zaza derzeit ueber KI in der Bildung denkt",
        subtitle:
          "Diese Seite ist aktuell kein Marktbericht und kein Datensatz mit grossen Reichweitenangaben. Sie sammelt stattdessen die Fragen, Prinzipien und Themenfelder, die fuer Lehrkraefte und Schulen beim Einsatz von KI in sensibler Kommunikation wirklich zaehlen.",
        pillars: [
          {
            icon: ShieldCheck,
            title: "Verantwortung vor Geschwindigkeit",
            body: "Wenn KI in Schulen eingesetzt wird, ist die Qualitaet einer Formulierung oft wichtiger als die reine Geschwindigkeit der Texterstellung.",
          },
          {
            icon: Users,
            title: "Lehrkraft bleibt in Kontrolle",
            body: "Zaza ist fuer review-intensive Arbeitsablaeufe gedacht. Die finale Entscheidung ueber jeden Text bleibt bei der Lehrkraft oder der Schule.",
          },
          {
            icon: BookOpen,
            title: "Praxisnaehe statt Hype",
            body: "Wir fokussieren auf Elternmails, Zeugnisbemerkungen und sensible Schulnachrichten statt auf breite KI-Slogans.",
          },
        ],
        sections: [
          {
            title: "Welche Fragen wir beobachten",
            body: "Wie kann KI Lehrkraefte bei schwierigen Nachrichten unterstuetzen, ohne Professionalitaet, Datenschutz oder schulische Prozesse zu untergraben?",
          },
          {
            title: "Welche Themen kuenftige Ressourcen abdecken sollen",
            body: "Leitfaeden zu Tonrisiko, teacher review, sensible Elternkommunikation, verantwortungsvoller Einfuehrung in Schulen und klaren Grenzen generischer KI-Tools.",
          },
          {
            title: "Was diese Seite nicht behauptet",
            body: "Sie ist kein flaechendeckender Marktbericht, keine grosse Umfrage und kein Nachweis von Marktpenetration. Wenn kuenftige Forschung erscheint, sollte sie klar belegt und nachvollziehbar veroeffentlicht werden.",
          },
        ],
        summaryTitle: "Kurzfassung fuer Schulleitungen und Lehrkraefte",
        ctaTitle: "Zaza lieber in Produkt und Preise einordnen",
        ctaBody:
          "Wenn Sie wissen moechten, wie Zaza Draft konkret fuer Elternkommunikation und sensible Schultexte eingesetzt wird, finden Sie die aktuellsten Informationen auf den Produkt- und Preis-Seiten.",
        primary: "Produkt ansehen",
        secondary: "Preise ansehen",
        topic: "Thema",
      }
    : {
        badge: "Resource hub",
        title: "How Zaza currently thinks about AI in education",
        subtitle:
          "This page is not currently a market report or a large-scale dataset. Instead, it gathers the questions, principles, and topic areas that matter most when teachers and schools use AI in sensitive communication.",
        pillars: [
          {
            icon: ShieldCheck,
            title: "Responsibility before speed",
            body: "When AI is used in schools, the quality of a phrase often matters more than how quickly text can be generated.",
          },
          {
            icon: Users,
            title: "Teacher review stays central",
            body: "Zaza is designed for review-heavy workflows. Final judgement over any message stays with the teacher or the school.",
          },
          {
            icon: BookOpen,
            title: "Teacher practice over hype",
            body: "The focus is parent emails, report comments, and sensitive school messages rather than broad AI slogans.",
          },
        ],
        sections: [
          {
            title: "Questions we are tracking",
            body: "How can AI support teachers with difficult messages without undermining professionalism, privacy, or school processes?",
          },
          {
            title: "What future resources should cover",
            body: "Guidance on tone risk, teacher review, sensitive parent communication, responsible school rollout, and the limits of generic AI tools.",
          },
          {
            title: "What this page does not claim",
            body: "It is not a national market report, not a large survey, and not evidence of market penetration. If future research is published, it should be clearly sourced and transparently documented.",
          },
        ],
        summaryTitle: "The short version for school teams",
        ctaTitle: "Use product and pricing pages as the source of truth",
        ctaBody:
          "If you want to understand how Zaza Draft actually supports parent communication and sensitive school writing today, the product and pricing pages are the current source of truth.",
        primary: "Explore the product",
        secondary: "See pricing",
        topic: "Topic",
      };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.14),_transparent_34%),linear-gradient(180deg,_#0F172A_0%,_#111827_100%)] px-6 pb-20 pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
            {content.badge}
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-bold md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
            {content.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {content.pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <Icon className="h-8 w-8 text-purple-300" />
                <h2 className="mt-5 text-2xl font-semibold">{pillar.title}</h2>
                <p className="mt-3 text-base leading-8 text-slate-300">
                  {pillar.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {content.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-[#111827] p-8"
            >
              <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-blue-200">
                <FileText className="mr-2 h-3.5 w-3.5" />
                {content.topic}
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <AgentReadableSummary
            locale={isGerman ? "de" : "en"}
            theme="dark"
            title={content.summaryTitle}
            intro={
              isGerman
                ? "Diese Seite soll die inhaltliche Richtung transparent machen, ohne sich auf unbelegte Marktbehauptungen zu stuetzen."
                : "This page is meant to make the current direction clear without leaning on unsupported market claims."
            }
            answers={{
              whatIsIt: isGerman ? (
                <>
                  Ein offener Ressourcen-Hub zu KI in Bildung und
                  Schulkommunikation.
                </>
              ) : (
                <>
                  An open resource hub about AI in education and school
                  communication.
                </>
              ),
              whoIsItFor: isGerman ? (
                <>
                  Fuer Lehrkraefte, Schulen und Schulleitungen, die den Einsatz
                  von KI verantwortungsvoll einordnen wollen.
                </>
              ) : (
                <>
                  For teachers, schools, and leaders who want to think about AI
                  adoption responsibly.
                </>
              ),
              problemItSolves: isGerman ? (
                <>
                  Er trennt Produktpositionierung von unbelegten Reichweiten-
                  oder Forschungsbehauptungen.
                </>
              ) : (
                <>
                  It separates product positioning from unsupported research or
                  reach claims.
                </>
              ),
              howItWorks: isGerman ? (
                <>
                  Er sammelt die wichtigsten Fragen, Prinzipien und
                  Themenfelder, die spaetere Ressourcen fundiert ausbauen
                  koennen.
                </>
              ) : (
                <>
                  It collects the main questions, principles, and topic areas
                  that future resources can develop with evidence.
                </>
              ),
              whatItCosts: isGerman ? (
                <>
                  Diese Seite ist eine kostenlose Ressource; Preise fuer Zaza
                  Draft stehen auf der Preisseite.
                </>
              ) : (
                <>
                  This page is a free resource; pricing for Zaza Draft lives on
                  the pricing page.
                </>
              ),
              nextStep: isGerman ? (
                <>
                  Nutzen Sie die Produkt- und Preis-Seiten fuer das aktuelle
                  Angebot.
                </>
              ) : (
                <>
                  Use the product and pricing pages for the current commercial
                  offer.
                </>
              ),
            }}
          />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{content.ctaTitle}</h2>
          <p className="mt-4 text-xl text-slate-300">{content.ctaBody}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white px-8 py-6 text-[#0F172A] hover:bg-slate-100"
            >
              <Link href="/products/draft">
                {content.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-transparent px-8 py-6 text-white hover:bg-white/10"
            >
              <Link href="/pricing">{content.secondary}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
