"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"

type CaseStudy = {
  id: string
  tag: string
  scenario: string
  before: string
  after: string
  teacher: string
}

const CASE_STUDIES: Record<"en" | "de", CaseStudy[]> = {
  en: [
    {
      id: "parent-email",
      tag: "Parent Email",
      scenario: "Behaviour concern, parent email",
      before: "Tom is lazy in class and never pays attention.",
      after:
        "I've noticed Tom is finding it harder to stay engaged in class lately. I'm giving him short check-ins and clear cues to help him stay with the task. A quick note from home about focusing would really support him this week.",
      teacher: "Emma, Year 5 teacher",
    },
    {
      id: "report-comment",
      tag: "Report Comment",
      scenario: "End-of-term report, maths",
      before: "Sofia rushes her work and makes careless mistakes.",
      after:
        "Sofia understands new concepts quickly and brings creative ideas. With a little more time to check her work and slow down on multi-step questions, she produces careful, accurate answers. We'll keep practising that steady pace next term.",
      teacher: "Liam, Year 7 maths teacher",
    },
    {
      id: "grading-feedback",
      tag: "Grading Comment",
      scenario: "Essay feedback, English",
      before: "This essay is poorly structured and confusing.",
      after:
        "Your essay has promising points. To make it clearer, start with a focused thesis and use one idea per paragraph. Try adding a short outline before you draft, then read aloud once to check flow. I'm excited to see your next version.",
      teacher: "Ava, English teacher",
    },
  ],
  de: [
    {
      id: "parent-email",
      tag: "Elternnachricht",
      scenario: "Verhaltensrückmeldung per E-Mail",
      before: "Tom ist im Unterricht faul und passt nie auf.",
      after:
        "Mir fällt auf, dass Tom sich gerade schwer tut, dranzubleiben. Ich gebe ihm kurze Check-ins und klare Hinweise, damit er bei der Aufgabe bleibt. Eine kurze Erinnerung von zu Hause ans Fokussieren würde ihn diese Woche gut unterstützen.",
      teacher: "Emma, Klassenlehrerin Jahrgang 5",
    },
    {
      id: "report-comment",
      tag: "Zeugnis-Kommentar",
      scenario: "Zeugnis, Mathematik",
      before: "Sofia arbeitet zu schnell und macht Flüchtigkeitsfehler.",
      after:
        "Sofia versteht neue Inhalte schnell und bringt kreative Ideen ein. Wenn sie sich etwas mehr Zeit zum Prüfen nimmt und Mehrschrittaufgaben ruhiger angeht, sind ihre Ergebnisse sehr genau. Daran üben wir gemeinsam weiter im nächsten Halbjahr.",
      teacher: "Liam, Mathematiklehrer Jahrgang 7",
    },
    {
      id: "grading-feedback",
      tag: "Bewertungs-Feedback",
      scenario: "Aufsatz-Rückmeldung, Englisch",
      before: "Der Aufsatz ist schlecht aufgebaut und schwer verständlich.",
      after:
        "Dein Aufsatz hat starke Ansätze. Für mehr Klarheit: Starte mit einer klaren These und bleib pro Absatz bei einer Idee. Lege vor dem Schreiben eine kurze Gliederung an und lies einmal laut, um den Fluss zu prüfen. Ich freue mich auf deine nächste Version.",
      teacher: "Ava, Englischlehrerin",
    },
  ],
}

export function CaseStudyCarousel() {
  const { t, language } = useLanguage()
  const [index, setIndex] = useState(0)
  const cases = CASE_STUDIES[language]
  const current = cases[index]

  const goTo = (next: number) => {
    const total = cases.length
    const wrapped = (next + total) % total
    setIndex(wrapped)
  }

  return (
    <section className="bg-[#0F172A] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[2px] text-[#A855F7]">
              {t("caseStudies.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("caseStudies.heading")}
            </h2>
            <p className="text-[#CBD5E1] max-w-2xl">{t("caseStudies.subheading")}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => goTo(index - 1)}
              className="bg-transparent border border-white/20 text-white hover:bg-white/10 transition-transform duration-150 hover:scale-[1.02] active:scale-95"
            >
              {t("caseStudies.prev")}
            </Button>
            <Button
              onClick={() => goTo(index + 1)}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white transition-transform duration-150 hover:scale-[1.02] active:scale-95"
            >
              {t("caseStudies.next")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="bg-[#0B1220] border border-[#1F2937] p-6 text-white h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center rounded-full bg-[#8B5CF6]/10 px-3 py-1 text-xs font-semibold text-[#C4B5FD]">
                {current.tag}
              </span>
              <span className="text-xs text-[#94A3B8]">{t("caseStudies.beforeLabel")}</span>
            </div>
            <p className="text-sm text-[#CBD5E1] mb-2">{current.scenario}</p>
            <div className="rounded-lg border border-[#1F2937] bg-[#0F172A] p-4 text-[#E5E7EB] shadow-inner">
              {current.before}
            </div>
          </Card>

          <Card className="bg-[#0B1220] border border-[#1F2937] p-6 text-white h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                {t("caseStudies.afterTag")}
              </span>
              <span className="text-xs text-[#94A3B8]">{t("caseStudies.afterLabel")}</span>
            </div>
            <p className="text-sm text-[#CBD5E1] mb-2">{current.scenario}</p>
            <div className="rounded-lg border border-[#1F2937] bg-[#0F172A] p-4 text-[#E5E7EB] shadow-inner">
              {current.after}
            </div>
            <p className="mt-4 text-xs font-medium text-[#A5B4FC]">{current.teacher}</p>
          </Card>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {cases.map((item, idx) => {
            const isActive = idx === index
            return (
              <button
                key={item.id}
                onClick={() => goTo(idx)}
                aria-label={`${item.tag} ${item.scenario}`}
                className={`h-2.5 rounded-full transition-all duration-150 ${
                  isActive ? "w-8 bg-[#8B5CF6]" : "w-2.5 bg-[#1F2937] hover:bg-[#4B5563]"
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
