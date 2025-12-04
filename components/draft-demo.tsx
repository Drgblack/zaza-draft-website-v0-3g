"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Tone = "supportive" | "formal" | "concise"
type Pronoun = "he" | "she" | "they"
type PronounOption = Pronoun | "auto"
type ScenarioId = "parent" | "report" | "grading"

export type DraftDemoProps = {
  language: "en" | "de"
  onTryItYourself?: () => void
}

type DemoVariant = {
  before: { en: string; de: string }
  after: Record<Tone, Record<Pronoun, { en: string; de: string }>>
  label: { en: string; de: string }
}

const DEMOS: Record<ScenarioId, DemoVariant> = {
  parent: {
    label: { en: "Parent Email", de: "Elternnachricht" },
    before: {
      en: "Tom is lazy in class and never pays attention.",
      de: "Tom ist im Unterricht faul und passt nie auf.",
    },
    after: {
      supportive: {
        he: {
          en: "I've noticed Tom has been finding it harder to stay engaged in class lately. I'm supporting him with smaller check-ins and positive cues during lessons. A quick reminder at home about staying focused would really help him stay on track.",
          de: "Mir fällt auf, dass Tom sich im Unterricht gerade schwer tut, dranzubleiben. Ich unterstütze ihn mit kurzen Check-ins und positiven Hinweisen. Eine kleine Erinnerung von zu Hause, aufmerksam zu bleiben, würde ihn sehr stärken.",
        },
        she: {
          en: "I've noticed she has a hard time staying engaged in class lately. I'm helping her with smaller check-ins and positive cues. A quick note from home about staying focused would really support her.",
          de: "Mir fällt auf, dass sie sich im Unterricht gerade schwer tut, dranzubleiben. Ich unterstütze sie mit kurzen Check-ins und positiven Hinweisen. Eine kleine Erinnerung von zu Hause, aufmerksam zu bleiben, würde sie sehr stärken.",
        },
        they: {
          en: "I've noticed they have a hard time staying engaged in class lately. I'm helping them with smaller check-ins and positive cues. A quick note from home about staying focused would really support them.",
          de: "Mir fällt auf, dass sie sich im Unterricht gerade schwer tun, dranzubleiben. Ich unterstütze sie mit kurzen Check-ins und positiven Hinweisen. Eine kleine Erinnerung von zu Hause, aufmerksam zu bleiben, würde sie sehr stärken.",
        },
      },
      formal: {
        he: {
          en: "Tom has had difficulty sustaining attention in recent lessons. I am providing structured prompts and short check-ins. Your partnership in encouraging focus at home would be appreciated.",
          de: "Tom hat in den letzten Stunden Schwierigkeiten, seine Aufmerksamkeit zu halten. Ich setze klare Impulse und kurze Check-ins ein. Ihre Unterstützung zu Hause, den Fokus zu stärken, ist sehr hilfreich.",
        },
        she: {
          en: "She has had difficulty sustaining attention in recent lessons. I am providing structured prompts and short check-ins. Your partnership in encouraging focus at home would be appreciated.",
          de: "Sie hat in den letzten Stunden Schwierigkeiten, ihre Aufmerksamkeit zu halten. Ich setze klare Impulse und kurze Check-ins ein. Ihre Unterstützung zu Hause, den Fokus zu stärken, ist sehr hilfreich.",
        },
        they: {
          en: "They have had difficulty sustaining attention in recent lessons. I am providing structured prompts and short check-ins. Your partnership in encouraging focus at home would be appreciated.",
          de: "Sie haben in den letzten Stunden Schwierigkeiten, ihre Aufmerksamkeit zu halten. Ich setze klare Impulse und kurze Check-ins ein. Ihre Unterstützung zu Hause, den Fokus zu stärken, ist sehr hilfreich.",
        },
      },
      concise: {
        he: {
          en: "Tom is struggling to stay focused. I'm using short prompts and check-ins. A reminder at home about paying attention will help.",
          de: "Tom hat Mühe, konzentriert zu bleiben. Ich arbeite mit kurzen Impulsen und Check-ins. Eine Erinnerung zu Hause zum Aufpassen hilft sehr.",
        },
        she: {
          en: "She is struggling to stay focused. I'm using short prompts and check-ins. A reminder at home about paying attention will help.",
          de: "Sie hat Mühe, konzentriert zu bleiben. Ich arbeite mit kurzen Impulsen und Check-ins. Eine Erinnerung zu Hause zum Aufpassen hilft sehr.",
        },
        they: {
          en: "They are struggling to stay focused. I'm using short prompts and check-ins. A reminder at home about paying attention will help.",
          de: "Sie haben Mühe, konzentriert zu bleiben. Ich arbeite mit kurzen Impulsen und Check-ins. Eine Erinnerung zu Hause zum Aufpassen hilft sehr.",
        },
      },
    },
  },
  report: {
    label: { en: "Report Card", de: "Zeugnis-Kommentar" },
    before: {
      en: "Sam never pays attention and ignores instructions.",
      de: "Sam passt nie auf und ignoriert Anweisungen.",
    },
    after: {
      supportive: {
        he: {
          en: "Sam benefits from reminders to stay with the task and extra wait time after instructions. With consistent prompts, he participates more and shows thoughtful ideas.",
          de: "Sam profitiert von Erinnerungen, bei der Aufgabe zu bleiben, und etwas mehr Zeit nach Anweisungen. Mit regelmäßigen Impulsen beteiligt er sich mehr und bringt gute Ideen ein.",
        },
        she: {
          en: "She benefits from reminders to stay with the task and extra wait time after instructions. With consistent prompts, she participates more and shows thoughtful ideas.",
          de: "Sie profitiert von Erinnerungen, bei der Aufgabe zu bleiben, und etwas mehr Zeit nach Anweisungen. Mit regelmäßigen Impulsen beteiligt sie sich mehr und bringt gute Ideen ein.",
        },
        they: {
          en: "They benefit from reminders to stay with the task and extra wait time after instructions. With consistent prompts, they participate more and show thoughtful ideas.",
          de: "Sie profitieren von Erinnerungen, bei der Aufgabe zu bleiben, und etwas mehr Zeit nach Anweisungen. Mit regelmäßigen Impulsen beteiligen sie sich mehr und bringen gute Ideen ein.",
        },
      },
      formal: {
        he: {
          en: "Sam requires occasional prompts to remain on task and benefits from structured guidance. When supported, he contributes and can articulate his thinking clearly.",
          de: "Sam benötigt gelegentlich Impulse, um bei der Aufgabe zu bleiben, und profitiert von klarer Struktur. Mit Unterstützung beteiligt er sich und kann seine Gedanken gut formulieren.",
        },
        she: {
          en: "She requires occasional prompts to remain on task and benefits from structured guidance. When supported, she contributes and can articulate her thinking clearly.",
          de: "Sie benötigt gelegentlich Impulse, um bei der Aufgabe zu bleiben, und profitiert von klarer Struktur. Mit Unterstützung beteiligt sie sich und kann ihre Gedanken gut formulieren.",
        },
        they: {
          en: "They require occasional prompts to remain on task and benefit from structured guidance. When supported, they contribute and can articulate their thinking clearly.",
          de: "Sie benötigen gelegentlich Impulse, um bei der Aufgabe zu bleiben, und profitieren von klarer Struktur. Mit Unterstützung beteiligen sie sich und können ihre Gedanken gut formulieren.",
        },
      },
      concise: {
        he: {
          en: "Sam needs reminders to stay on task. With clear steps, he participates and shares solid ideas.",
          de: "Sam braucht Erinnerungen, um bei der Sache zu bleiben. Mit klaren Schritten beteiligt er sich und teilt gute Ideen.",
        },
        she: {
          en: "She needs reminders to stay on task. With clear steps, she participates and shares solid ideas.",
          de: "Sie braucht Erinnerungen, um bei der Sache zu bleiben. Mit klaren Schritten beteiligt sie sich und teilt gute Ideen.",
        },
        they: {
          en: "They need reminders to stay on task. With clear steps, they participate and share solid ideas.",
          de: "Sie brauchen Erinnerungen, um bei der Sache zu bleiben. Mit klaren Schritten beteiligen sie sich und teilen gute Ideen.",
        },
      },
    },
  },
  grading: {
    label: { en: "Grading Comment", de: "Bewertungs-Feedback" },
    before: {
      en: "Sofia's essay is sloppy and rushed.",
      de: "Sofias Aufsatz ist schlampig und hingeschludert.",
    },
    after: {
      supportive: {
        he: {
          en: "Your ideas are strong, and with more time on structure and proofreading, they will shine even more. Let's plan another pass to tighten the argument.",
          de: "Deine Ideen sind stark. Mit mehr Zeit für Aufbau und Korrektur werden sie noch klarer. Lass uns einen weiteren Durchgang planen, um das Argument zu schärfen.",
        },
        she: {
          en: "Your ideas are strong, and with more time on structure and proofreading, they will shine even more. Let's plan another pass to tighten the argument.",
          de: "Deine Ideen sind stark. Mit mehr Zeit für Aufbau und Korrektur werden sie noch klarer. Lass uns einen weiteren Durchgang planen, um das Argument zu schärfen.",
        },
        they: {
          en: "Your ideas are strong, and with more time on structure and proofreading, they will shine even more. Let's plan another pass to tighten the argument.",
          de: "Deine Ideen sind stark. Mit mehr Zeit für Aufbau und Korrektur werden sie noch klarer. Lass uns einen weiteren Durchgang planen, um das Argument zu schärfen.",
        },
      },
      formal: {
        he: {
          en: "He presents promising points. Additional revision to organize the argument and refine language will elevate the essay. A guided review session is recommended.",
          de: "Er bringt gute Ansatzpunkte. Eine weitere Überarbeitung, um Argumentation und Sprache zu präzisieren, wird den Aufsatz stärken. Eine angeleitete Durchsicht wird empfohlen.",
        },
        she: {
          en: "She presents promising points. Additional revision to organize the argument and refine language will elevate the essay. A guided review session is recommended.",
          de: "Sie bringt gute Ansatzpunkte. Eine weitere Überarbeitung, um Argumentation und Sprache zu präzisieren, wird den Aufsatz stärken. Eine angeleitete Durchsicht wird empfohlen.",
        },
        they: {
          en: "They present promising points. Additional revision to organize the argument and refine language will elevate the essay. A guided review session is recommended.",
          de: "Sie bringen gute Ansatzpunkte. Eine weitere Überarbeitung, um Argumentation und Sprache zu präzisieren, wird den Aufsatz stärken. Eine angeleitete Durchsicht wird empfohlen.",
        },
      },
      concise: {
        he: {
          en: "Strong ideas. With another revision for structure and clarity, this will be even better. Let's polish it together.",
          de: "Starke Ideen. Mit einer weiteren Überarbeitung für Aufbau und Klarheit wird es noch besser. Lass es uns gemeinsam feinschleifen.",
        },
        she: {
          en: "Strong ideas. With another revision for structure and clarity, this will be even better. Let's polish it together.",
          de: "Starke Ideen. Mit einer weiteren Überarbeitung für Aufbau und Klarheit wird es noch besser. Lass es uns gemeinsam feinschleifen.",
        },
        they: {
          en: "Strong ideas. With another revision for structure and clarity, this will be even better. Let's polish it together.",
          de: "Starke Ideen. Mit einer weiteren Überarbeitung für Aufbau und Klarheit wird es noch besser. Lass es uns gemeinsam feinschleifen.",
        },
      },
    },
  },
}

const toneLabels: Record<Tone, { en: string; de: string }> = {
  supportive: { en: "Supportive", de: "Unterstützend" },
  formal: { en: "Formal", de: "Formell" },
  concise: { en: "Concise", de: "Prägnant" },
}

const pronounLabels: Record<PronounOption, { en: string; de: string }> = {
  auto: { en: "Auto", de: "Auto" },
  he: { en: "He", de: "Er" },
  she: { en: "She", de: "Sie" },
  they: { en: "They", de: "Sie (Plural)" },
}

export function DraftDemo({ language, onTryItYourself }: DraftDemoProps) {
  const [scenario, setScenario] = useState<ScenarioId>("parent")
  const [tone, setTone] = useState<Tone>("supportive")
  const [pronounSelection, setPronounSelection] = useState<PronounOption>("auto")
  const [animateKey, setAnimateKey] = useState(0)

  const autoPronoun: Pronoun = language === "de" ? "they" : "they"
  const activePronoun: Pronoun = pronounSelection === "auto" ? autoPronoun : pronounSelection

  const activeDemo = DEMOS[scenario]

  const afterText = useMemo(() => {
    return activeDemo.after[tone][activePronoun][language]
  }, [activeDemo, tone, activePronoun, language])

  const beforeText = activeDemo.before[language]

  const handleRewrite = () => {
    setAnimateKey((prev) => prev + 1)
  }

  const title = language === "de" ? "So arbeitet Draft in der Praxis" : "See Draft in Action"
  const desc =
    language === "de"
      ? "Reale Beispiele auf Basis echter Lehrersprache - keine Registrierung nötig."
      : "Realistic examples based on teacher language - no signup needed."
  const beforeLabel = language === "de" ? "Vorher (dein Entwurf)" : "Before (your draft)"
  const afterLabel = language === "de" ? "Nachher (Draft-Version)" : "After (Draft's version)"
  const helper = language === "de" ? "Demo-Beispieltext" : "Demo example text"
  const rewriteLabel = language === "de" ? "Notiz verfeinern" : "Polish my note"
  const tryLabel = language === "de" ? "Selbst ausprobieren" : "Try it yourself"
  const disclaimer =
    language === "de"
      ? "Diese Demo zeigt Beispieltexte. Die vollständige App passt Nachrichten an deine Schüler:innen und deinen Unterrichtsstil an."
      : "This demo shows example text. The full app personalises messages to your students and your teaching style."

  const scenarioOrder: ScenarioId[] = ["parent", "report", "grading"]

  const handleTry = () => {
    if (onTryItYourself) {
      onTryItYourself()
      return
    }
    const target = document.getElementById("get-started") || document.getElementById("top")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = "#"
    }
  }

  return (
    <section className="py-16 bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          <p className="text-[#CBD5E1] mt-3">{desc}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {scenarioOrder.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setScenario(id)}
              aria-pressed={scenario === id}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors transition-transform transition-shadow duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] transform-gpu ${
                scenario === id
                  ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30 scale-[1.02]"
                  : "bg-[#020617] text-[#9CA3AF] border border-[#1F2937] hover:bg-[#111827] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#0EA5E9]/5"
              } active:scale-[0.98]`}
            >
              {language === "de" ? DEMOS[id].label.de : DEMOS[id].label.en}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">
          <Card className="bg-[#0F172A] border border-[#1F2937] p-6 text-white h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{beforeLabel}</h3>
              <span className="text-xs text-[#94A3B8]">{helper}</span>
            </div>
            <div className="rounded-lg border border-[#1F2937] bg-[#0B1220] p-4 text-[#E5E7EB] min-h-[240px]">
              {beforeText}
            </div>
          </Card>

          <Card className="bg-[#0F172A] border border-[#1F2937] p-6 text-white h-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <h3 className="text-lg font-semibold">{afterLabel}</h3>
              <div className="flex flex-wrap items-center gap-2">
                {(Object.keys(toneLabels) as Tone[]).map((t) => {
                  const selected = tone === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      aria-pressed={selected}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] border ${
                        selected
                          ? "bg-[#8B5CF6] text-white border-[#8B5CF6]"
                          : "bg-[#020617] text-[#9CA3AF] border-[#1F2937] hover:bg-[#111827]"
                      }`}
                    >
                      {toneLabels[t][language]}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {(["auto", "he", "she", "they"] as PronounOption[]).map((p) => {
                const resolved = p === "auto" ? autoPronoun : p
                const selected = p === pronounSelection
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPronounSelection(p)}
                    aria-pressed={selected}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] border ${
                      selected
                        ? "bg-white text-[#0F172A] border-white"
                        : "bg-[#020617] text-[#9CA3AF] border-[#1F2937] hover:bg-[#111827]"
                    }`}
                  >
                    {pronounLabels[p][language]}
                  </button>
                )
              })}
            </div>

            <div className="relative">
              <div
                key={`${scenario}-${tone}-${activePronoun}-${animateKey}`}
                className="rounded-lg border border-[#1F2937] bg-[#0B1220] p-4 text-[#E2E8F0] min-h-[240px] transition-opacity duration-200 ease-out"
              >
                {afterText}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                onClick={handleRewrite}
                className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white transition-transform transition-shadow duration-150 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#8B5CF6]/30"
              >
                {rewriteLabel}
              </Button>
              <Button
                variant="outline"
                onClick={handleTry}
                className="border-[#8B5CF6] bg-[#0F172A] text-[#E5E7EB] hover:bg-[#1F2937] hover:text-white transition-transform transition-shadow duration-150 hover:scale-[1.02] hover:shadow-md hover:shadow-[#8B5CF6]/30 active:scale-[0.98]"
              >
                {tryLabel}
              </Button>
            </div>
          </Card>
        </div>

        <p className="text-xs text-[#94A3B8] mt-6 text-center">{disclaimer}</p>
      </div>
    </section>
  )
}
