"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MessageSquare, ShieldCheck } from "lucide-react";

import { AgentReadableSummary } from "@/components/seo/AgentReadableSummary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

type ExampleCategory = "all" | "parent-email" | "reports" | "leadership";

type ExampleCard = {
  title: string;
  category: ExampleCategory;
  situation: string;
  focus: string;
  before: string;
  after: string;
  thumbnail: string;
};

const cards: Record<"en" | "de", ExampleCard[]> = {
  en: [
    {
      title: "Behaviour update that still sounds calm",
      category: "parent-email",
      situation: "A parent email after a difficult lesson",
      focus: "Lowering tone risk without removing the point",
      before:
        "Oliver was disruptive again today and ignored several instructions. This is becoming unacceptable.",
      after:
        "I wanted to let you know that Oliver found it difficult to stay focused during today's lesson despite several reminders. We are continuing to support him in class and would appreciate your partnership in reinforcing expectations at home.",
      thumbnail: "/elementary-school-classroom-teacher.jpg",
    },
    {
      title: "Report comment that says something useful",
      category: "reports",
      situation: "A report draft that feels too obvious",
      focus: "Moving from generic praise to parent value",
      before: "Ava is kind and works hard.",
      after:
        "Ava works with steady concentration and responds thoughtfully to feedback. She is particularly strong at refining her work once she has reflected on the next step.",
      thumbnail: "/young-teacher-confident-classroom.jpg",
    },
    {
      title: "Leadership follow-up that avoids escalation",
      category: "leadership",
      situation: "A tense reply with senior leadership copied in",
      focus: "Keeping facts clear while protecting professionalism",
      before:
        "I think you are misunderstanding the situation and I do not appreciate the accusation.",
      after:
        "Thank you for taking the time to write. I can hear how concerned you are, and I would like to clarify what happened from school's perspective and agree the best next step together.",
      thumbnail: "/school-district-meeting-teachers.jpg",
    },
  ],
  de: [
    {
      title: "Verhaltenshinweis, der trotzdem ruhig klingt",
      category: "parent-email",
      situation: "Eine Elternmail nach einer schwierigen Stunde",
      focus: "Tonrisiko senken, ohne den Punkt zu verwischen",
      before:
        "Oliver war heute wieder stoerend und hat mehrere Anweisungen ignoriert. Das ist so nicht akzeptabel.",
      after:
        "Ich wollte Sie wissen lassen, dass es Oliver heute trotz mehrerer Erinnerungen schwerfiel, waehrend des Unterrichts konzentriert zu bleiben. Wir unterstuetzen ihn weiter in der Schule und wuerden Ihre Partnerschaft zu Hause sehr schaetzen.",
      thumbnail: "/elementary-school-classroom-teacher.jpg",
    },
    {
      title: "Zeugnisformulierung mit echtem Mehrwert",
      category: "reports",
      situation: "Ein Entwurf, der noch zu offensichtlich wirkt",
      focus: "Von allgemeinem Lob zu hilfreicher Rueckmeldung",
      before: "Ava ist freundlich und arbeitet hart.",
      after:
        "Ava arbeitet konzentriert und nimmt Rueckmeldungen sehr ueberlegt auf. Besonders stark ist ihre Faehigkeit, ihre Arbeit nach einer Reflexion gezielt zu verbessern.",
      thumbnail: "/young-teacher-confident-classroom.jpg",
    },
    {
      title: "Rueckmeldung mit Schulleitung in CC ohne Eskalation",
      category: "leadership",
      situation: "Eine angespannte Antwort mit Fuehrungsebene im Verlauf",
      focus: "Fakten klar halten und Professionalitaet schuetzen",
      before:
        "Ich denke, Sie missverstehen die Situation, und diesen Vorwurf finde ich unangemessen.",
      after:
        "Vielen Dank fuer Ihre Nachricht. Ich sehe Ihre Sorge und moechte den Ablauf aus schulischer Sicht klar schildern, damit wir den naechsten Schritt gemeinsam gut abstimmen koennen.",
      thumbnail: "/school-district-meeting-teachers.jpg",
    },
  ],
};

export function SuccessStoriesClient() {
  const { language } = useLanguage();
  const locale = language === "de" ? "de" : "en";
  const [selectedCategory, setSelectedCategory] =
    useState<ExampleCategory>("all");

  const content = {
    en: {
      badge: "Representative examples",
      title: "The kinds of communication Zaza Draft is built to improve",
      subtitle:
        "These are representative before-and-after examples, not customer proof claims. They show the kinds of wording problems Zaza Draft is designed to help teachers and schools work through.",
      filters: [
        { id: "all" as ExampleCategory, label: "All examples" },
        { id: "parent-email" as ExampleCategory, label: "Parent emails" },
        { id: "reports" as ExampleCategory, label: "Report comments" },
        { id: "leadership" as ExampleCategory, label: "Leadership follow-up" },
      ],
      metrics: [
        {
          icon: ShieldCheck,
          title: "Focus",
          value: "Tone risk",
        },
        {
          icon: MessageSquare,
          title: "Format",
          value: "Before / after wording",
        },
        {
          icon: Clock,
          title: "Use",
          value: "High-stakes school messages",
        },
      ],
      situation: "Situation",
      focus: "What improves",
      before: "Before",
      after: "After with Zaza-style support",
      summaryTitle: "What this page is for",
      ctaTitle: "See the product and pricing next",
      ctaBody:
        "If these are the kinds of messages your staff hesitate over, the product and pricing pages explain how Zaza Draft supports them in practice.",
      primary: "See pricing",
      secondary: "Explore Zaza Draft",
    },
    de: {
      badge: "Beispielhafte Szenarien",
      title: "Die Arten von Kommunikation, fuer die Zaza Draft gebaut ist",
      subtitle:
        "Diese Vorher-Nachher-Beispiele sind repräsentative Szenarien und keine Kundennachweise. Sie zeigen, bei welchen Formulierungsproblemen Zaza Draft Lehrkraeften und Schulen helfen soll.",
      filters: [
        { id: "all" as ExampleCategory, label: "Alle Beispiele" },
        { id: "parent-email" as ExampleCategory, label: "Elternmails" },
        { id: "reports" as ExampleCategory, label: "Zeugnisse" },
        {
          id: "leadership" as ExampleCategory,
          label: "Schulleitung / Follow-up",
        },
      ],
      metrics: [
        {
          icon: ShieldCheck,
          title: "Fokus",
          value: "Tonrisiko",
        },
        {
          icon: MessageSquare,
          title: "Format",
          value: "Vorher / Nachher",
        },
        {
          icon: Clock,
          title: "Einsatz",
          value: "Sensible Schulnachrichten",
        },
      ],
      situation: "Situation",
      focus: "Was verbessert wird",
      before: "Vorher",
      after: "Nachher mit Zaza-artiger Unterstuetzung",
      summaryTitle: "Wofuer diese Seite gedacht ist",
      ctaTitle: "Als Nächstes Produkt und Preise ansehen",
      ctaBody:
        "Wenn das die Arten von Nachrichten sind, bei denen Ihr Team zoegert, erklaeren Produkt- und Preisseite den konkreten Einsatz von Zaza Draft.",
      primary: "Preise ansehen",
      secondary: "Zaza Draft ansehen",
    },
  }[locale];

  const examples = cards[locale];
  const filteredExamples =
    selectedCategory === "all"
      ? examples
      : examples.filter((example) => example.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl text-center">
          <Badge className="mb-6 border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-purple-300">
            {content.badge}
          </Badge>
          <h1 className="text-balance text-5xl font-bold text-white md:text-6xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-xl text-gray-300">
            {content.subtitle}
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {content.metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <Icon className="mx-auto mb-3 h-8 w-8 text-purple-400" />
                  <div className="text-sm uppercase tracking-[0.18em] text-gray-400">
                    {metric.title}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">
                    {metric.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-40 border-y border-white/10 bg-[#0F172A]/95 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {content.filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedCategory(filter.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  selectedCategory === filter.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {filteredExamples.map((example) => (
            <article
              key={example.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative h-52">
                <Image
                  src={example.thumbnail}
                  alt={example.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
              </div>
              <div className="space-y-5 p-6">
                <h2 className="text-2xl font-semibold text-white">
                  {example.title}
                </h2>
                <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-purple-300">
                    {content.situation}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    {example.situation}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-blue-300">
                    {content.focus}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    {example.focus}
                  </p>
                </div>
                <div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-rose-200">
                    {content.before}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-rose-50">
                    {example.before}
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">
                    {content.after}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-emerald-50">
                    {example.after}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <AgentReadableSummary
            locale={locale}
            theme="dark"
            title={content.summaryTitle}
            intro={
              locale === "de"
                ? "Die Beispiele auf dieser Seite sollen den Charakter des Problems und die gewuenschte Verbesserung zeigen, nicht Markttraktion belegen."
                : "The examples on this page are meant to show the shape of the problem and the kind of improvement Zaza Draft is aiming for, not to claim market traction."
            }
            answers={{
              whatIsIt:
                locale === "de" ? (
                  <>Eine Sammlung repräsentativer Kommunikationsbeispiele.</>
                ) : (
                  <>A collection of representative communication examples.</>
                ),
              whoIsItFor:
                locale === "de" ? (
                  <>
                    Fuer Lehrkraefte und Schulen, die schnell sehen wollen, ob
                    Zaza zum eigenen Kommunikationsalltag passt.
                  </>
                ) : (
                  <>
                    For teachers and schools who want a fast sense of whether
                    Zaza fits their communication workflow.
                  </>
                ),
              problemItSolves:
                locale === "de" ? (
                  <>
                    Sie zeigt, wie zu harte, zu vage oder zu offensichtliche
                    Formulierungen in ruhigere, klarere Fassungen uebergehen
                    koennen.
                  </>
                ) : (
                  <>
                    It shows how wording that is too blunt, too vague, or too
                    obvious can move toward calmer, clearer drafts.
                  </>
                ),
              howItWorks:
                locale === "de" ? (
                  <>
                    Jedes Beispiel kombiniert einen schwierigen Ausgangstext mit
                    einer Version, wie Zaza Draft die Nachricht neu ausrichten
                    soll.
                  </>
                ) : (
                  <>
                    Each example pairs a difficult starting draft with the kind
                    of calmer version Zaza Draft is built to help produce.
                  </>
                ),
              whatItCosts:
                locale === "de" ? (
                  <>
                    Die aktuelle Preisstruktur finden Sie auf der{" "}
                    <Link href="/pricing" className="font-semibold underline">
                      Preisseite
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    The current pricing structure is on the{" "}
                    <Link href="/pricing" className="font-semibold underline">
                      pricing page
                    </Link>
                    .
                  </>
                ),
              nextStep:
                locale === "de" ? (
                  <>
                    Gehen Sie als Naechstes zur Produktseite oder zu den
                    Preisen.
                  </>
                ) : (
                  <>Next, move to the product page or pricing.</>
                ),
            }}
          />
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {content.ctaTitle}
          </h2>
          <p className="mt-4 text-xl text-gray-300">{content.ctaBody}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6 font-medium text-white shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/pricing">{content.primary}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-transparent px-8 py-6 text-white hover:bg-white/10"
            >
              <Link href="/products/draft">
                {content.secondary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name:
              locale === "de"
                ? "Lehrkraft-Kommunikationsbeispiele"
                : "Teacher communication examples",
            description:
              locale === "de"
                ? "Repräsentative Vorher-Nachher-Beispiele fuer Elternkommunikation und Schultexte."
                : "Representative before-and-after examples for parent communication and school writing.",
            url: "https://www.zazadraft.com/success-stories",
            publisher: {
              "@type": "Organization",
              name: "Zaza Draft",
            },
          }),
        }}
      />
    </div>
  );
}
