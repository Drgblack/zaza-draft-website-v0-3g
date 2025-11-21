"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AiStudentReportsClient() {
  const pathname = usePathname();
  const isGerman = pathname?.includes("/de") ?? false;

  // --- CONTENT DICTIONARY ---
  const content = {
    en: {
      title: "AI for Student Reports",
      hero_subtitle: "Turn observations into professional reports in seconds.",

      // HERO BOX
      example_label: "Example notes:",
      example_notes: [
        "Strong in reading comprehension (scored 85% on last assessment)",
        "Struggles with math fact fluency (still counting on fingers)",
        "Excellent class participation and peer collaboration",
        "Needs reminders to stay on task during independent work",
      ],
      box_footer:
        "This tool helps teachers turn observations into professional reports.",

      // STRESS
      stress_title: "Why Report Writing Causes Teacher Stress",
      stress_items: [
        "It takes hours of personal time on evenings and weekends.",
        "Finding the right words to balance honesty and encouragement is hard.",
        "Repetitive phrasing makes reports sound robotic.",
      ],

      // TIME SAVINGS
      time_title: "How AI Saves 10-20% of Time",
      time_items: [
        "Instantly drafts paragraphs from bullet points.",
        "Suggests professional phrasing for difficult topics.",
        "Automates the formatting and proofreading process.",
      ],

      // PRIVACY (UPDATED: Added GDPR)
      privacy_title: "Privacy, GDPR & FERPA Compliance",
      privacy_items: [
        "No student names are required (use initials or pseudonyms).",
        "Data is encrypted and never trained on without permission.",
        "Compliant with FERPA and GDPR standards.",
      ],

      // STEPS
      steps_title: "Step-by-Step Process",
      steps: [
        {
          title: "1. Enter Observations",
          desc: "Paste your raw notes, bullet points, or assessment scores.",
        },
        {
          title: "2. Select Tone",
          desc: "Choose formal, encouraging, or direct communication styles.",
        },
        {
          title: "3. Generate Report",
          desc: "AI instantly creates a polished paragraph.",
        },
        {
          title: "4. Refine & Save",
          desc: "Make quick edits and export to your system.",
        },
      ],

      // TEMPLATES
      templates_title: "Report Templates by Grade Level",
      templates: [
        {
          grade: "Elementary",
          text: "Focuses on foundational skills, social development, and adjustment to school routines. Perfect for K-5 comments.",
        },
        {
          grade: "Middle School",
          text: "Highlights subject-specific progress, organizational skills, and independence. tailored for 6-8th grade expectations.",
        },
        {
          grade: "High School",
          text: "Emphasizes critical thinking, advanced analysis, and college-readiness skills. Professional tone for 9-12th grade.",
        },
      ],

      // BEFORE & AFTER
      ba_title: "Before & After Examples",
      ba_bad_label: "🔴 Vague / Robotic",
      ba_bad_text:
        "He is a good student. He does his work. sometimes he talks too much.",
      ba_good_label: "🟢 Professional / Specific",
      ba_good_text:
        "John demonstrates a strong work ethic and consistently submits assignments on time. While he participates actively, he benefits from reminders to maintain focus during quiet study periods.",

      // MISTAKES
      mistakes_title: "Common Mistakes to Avoid",
      mistakes: [
        "Using overly complex jargon parents won't understand.",
        "Focusing only on negatives without actionable steps.",
        "Copy-pasting the same comment for every student.",
      ],

      // TESTIMONIALS
      reviews_title: "Teacher Results",
      reviews: [
        {
          stars: "★★★★★",
          text: "Saved me 10 hours this report season. The phrasing is exactly what I needed.",
          author: "Sarah J., 4th Grade Teacher",
          image: "/testimonials/teacher-2.jpg",
        },
        {
          stars: "★★★★★",
          text: "Finally, I can write personal comments for every student without burning out.",
          author: "Mike T., High School English",
          image: "/testimonials/teacher-3.jpg",
        },
      ],

      // FAQ
      faq_title: "Frequently Asked Questions",
      faqs: [
        {
          q: "Is my student data safe?",
          a: "Yes. We do not store personally identifiable information (PII). We recommend using initials.",
        },
        {
          q: "Can I edit the output?",
          a: "Absolutely. The AI produces a draft which you can fully edit before saving.",
        },
        {
          q: "Does it work for all subjects?",
          a: "Yes, from Math and Science to Art and PE, the AI adapts to your specific context.",
        },
        {
          q: "Is it free to try?",
          a: "Yes, you can generate your first few reports for free to see how much time you save.",
        },
      ],

      // CTA
      cta_title: "Ready to write reports faster?",
      cta_button: "See Pricing & Plans",
    },

    // --- GERMAN TRANSLATIONS ---
    de: {
      title: "KI für Schülerberichte",
      hero_subtitle:
        "Verwandeln Sie Beobachtungen in Sekunden in professionelle Berichte.",

      example_label: "Beispielnotizen:",
      example_notes: [
        "Stark im Leseverständnis (85% bei der letzten Bewertung)",
        "Schwierigkeiten beim Rechnen (zählt noch mit den Fingern)",
        "Hervorragende Beteiligung und Zusammenarbeit",
        "Benötigt Erinnerungen, um bei selbstständiger Arbeit fokussiert zu bleiben",
      ],
      box_footer:
        "Dieses Tool hilft Lehrern, Beobachtungen in professionelle Berichte zu verwandeln.",

      stress_title: "Warum das Schreiben von Berichten Stress verursacht",
      stress_items: [
        "Es kostet Stunden persönlicher Zeit an Abenden und Wochenenden.",
        "Die richtigen Worte zwischen Ehrlichkeit und Ermutigung zu finden, ist schwer.",
        "Wiederholende Formulierungen lassen Berichte roboterhaft klingen.",
      ],

      time_title: "Wie KI 10-20% der Zeit spart",
      time_items: [
        "Erstellt sofort Absätze aus Stichpunkten.",
        "Schlägt professionelle Formulierungen für schwierige Themen vor.",
        "Automatisiert die Formatierung und das Korrekturlesen.",
      ],

      privacy_title: "Datenschutz & Konformität",
      privacy_items: [
        "Keine Schülernamen erforderlich (nutzen Sie Initialen).",
        "Daten werden verschlüsselt und niemals ohne Erlaubnis zum Training genutzt.",
        "Konform mit DSGVO und FERPA Standards.",
      ],

      steps_title: "Schritt-für-Schritt-Prozess",
      steps: [
        {
          title: "1. Beobachtungen eingeben",
          desc: "Fügen Sie Ihre Notizen oder Bewertungsergebnisse ein.",
        },
        {
          title: "2. Tonfall wählen",
          desc: "Wählen Sie formell, ermutigend oder direkt.",
        },
        {
          title: "3. Bericht erstellen",
          desc: "Die KI erstellt sofort einen geschliffenen Absatz.",
        },
        {
          title: "4. Verfeinern & Speichern",
          desc: "Machen Sie schnelle Änderungen und exportieren Sie.",
        },
      ],

      templates_title: "Berichtsvorlagen nach Klassenstufe",
      templates: [
        {
          grade: "Grundschule",
          text: "Fokus auf Grundfertigkeiten, soziale Entwicklung und Schulroutine. Perfekt für Kommentare der Klassen 1-4.",
        },
        {
          grade: "Mittelstufe",
          text: "Hebt fachspezifische Fortschritte, Organisation und Selbstständigkeit hervor. Zugeschnitten auf die Erwartungen der Mittelstufe.",
        },
        {
          grade: "Oberstufe",
          text: "Betont kritisches Denken, fortgeschrittene Analyse und Studienvorbereitung. Professioneller Ton für die Oberstufe.",
        },
      ],

      ba_title: "Vorher & Nachher Beispiele",
      ba_bad_label: "🔴 Vage / Roboterhaft",
      ba_bad_text:
        "Er ist ein guter Schüler. Er macht seine Arbeit. Manchmal redet er zu viel.",
      ba_good_label: "🟢 Professionell / Spezifisch",
      ba_good_text:
        "John zeigt eine starke Arbeitsmoral und gibt Aufgaben pünktlich ab. Während er aktiv teilnimmt, profitiert er von Erinnerungen, um in Ruhephasen konzentriert zu bleiben.",

      mistakes_title: "Häufige Fehler vermeiden",
      mistakes: [
        "Zu komplexen Fachjargon verwenden.",
        "Nur auf Negatives fokussieren ohne Lösungen.",
        "Den gleichen Kommentar für jeden Schüler kopieren.",
      ],

      reviews_title: "Ergebnisse von Lehrern",
      reviews: [
        {
          stars: "★★★★★",
          text: "Hat mir 10 Stunden gespart. Die Formulierungen sind genau das, was ich brauchte.",
          author: "Sarah J., Lehrerin 4. Klasse",
          image: "/testimonials/teacher-2.jpg",
        },
        {
          stars: "★★★★★",
          text: "Endlich kann ich persönliche Kommentare schreiben, ohne auszubrennen.",
          author: "Mike T., Englischlehrer",
          image: "/testimonials/teacher-3.jpg",
        },
      ],

      faq_title: "Häufig gestellte Fragen",
      faqs: [
        {
          q: "Sind meine Schülerdaten sicher?",
          a: "Ja. Wir speichern keine personenbezogenen Daten (PII). Nutzen Sie Initialen.",
        },
        {
          q: "Kann ich den Text bearbeiten?",
          a: "Absolut. Die KI erstellt einen Entwurf, den Sie vollständig anpassen können.",
        },
        {
          q: "Funktioniert es für alle Fächer?",
          a: "Ja, von Mathe bis Sport passt sich die KI Ihrem Kontext an.",
        },
        {
          q: "Ist es kostenlos?",
          a: "Ja, Sie können Ihre ersten Berichte kostenlos erstellen, um zu sehen, wie viel Zeit Sie sparen.",
        },
      ],

      cta_title: "Bereit, Berichte schneller zu schreiben?",
      cta_button: "Preise & Pläne ansehen",
    },
  };

  const text = isGerman ? content.de : content.en;

  return (
    // HEADER FIX: 'pt-36' ensures ample space below navbar
    <div className="max-w-5xl mx-auto space-y-24 pb-20 pt-36 px-6">
      {/* --- HERO SECTION --- */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          {text.title}
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {text.hero_subtitle}
        </p>

        {/* NOTES BOX */}
        <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-200 text-left max-w-2xl mx-auto mt-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
          <h3 className="font-bold text-xl mb-6 text-gray-900 border-b border-gray-100 pb-2">
            {text.example_label}
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
            {text.example_notes.map((note, index) => (
              <li key={index} className="leading-snug">
                {note}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-slate-500 italic mt-6 text-sm">{text.box_footer}</p>
      </div>

      {/* --- WHY IT CAUSES STRESS --- */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {text.stress_title}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {text.stress_items.map((item, i) => (
            <div
              key={i}
              className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 text-slate-300 hover:border-red-900/50 transition-colors"
            >
              <span className="text-2xl mb-4 block">⚠️</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* --- HOW AI SAVES TIME --- */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {text.time_title}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {text.time_items.map((item, i) => (
            <div
              key={i}
              className="bg-blue-950/20 p-6 rounded-xl border border-blue-900/30 text-blue-100 hover:bg-blue-950/30 transition-colors"
            >
              <span className="text-2xl mb-4 block">⚡</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* --- PRIVACY --- */}
      <section className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-green-400">🔒</span> {text.privacy_title}
        </h2>
        <ul className="grid gap-4 md:grid-cols-1">
          {text.privacy_items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50"
            >
              <span className="text-green-500 font-bold">✓</span> {item}
            </li>
          ))}
        </ul>
      </section>

      {/* --- STEPS --- */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          {text.steps_title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {text.steps.map((step, i) => (
            <div
              key={i}
              className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TEMPLATES --- */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          {text.templates_title}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {text.templates.map((t, i) => (
            <div
              key={i}
              className="bg-white text-gray-900 p-6 rounded-xl border border-gray-200 shadow-lg"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                Template
              </div>
              <h3 className="text-xl font-bold mb-3">{t.grade}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BEFORE & AFTER --- */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          {text.ba_title}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* BAD */}
          <div className="bg-red-950/20 border border-red-900/50 p-8 rounded-2xl">
            <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
              {text.ba_bad_label}
            </h3>
            <p className="text-red-100/80 font-mono text-lg leading-relaxed">
              "{text.ba_bad_text}"
            </p>
          </div>
          {/* GOOD */}
          <div className="bg-green-950/20 border border-green-900/50 p-8 rounded-2xl relative">
            <div className="absolute top-4 right-4 text-green-500 text-2xl">
              ✨
            </div>
            <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
              {text.ba_good_label}
            </h3>
            <p className="text-green-100/80 font-mono text-lg leading-relaxed">
              "{text.ba_good_text}"
            </p>
          </div>
        </div>
      </section>

      {/* --- MISTAKES --- */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          {text.mistakes_title}
        </h2>
        <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-8">
          <ul className="space-y-4">
            {text.mistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-4 text-red-200">
                <span className="text-red-500 font-bold text-xl">✖</span>
                <span className="text-lg">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- TESTIMONIALS (UPDATED: No Em Dash) --- */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          {text.reviews_title}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {text.reviews.map((r, i) => (
            <div
              key={i}
              className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* IMAGE */}
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600 relative">
                  <Image
                    src={r.image}
                    alt={r.author}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div>
                <div className="text-yellow-400 mb-2 tracking-widest text-sm">
                  {r.stars}
                </div>
                <p className="text-slate-300 italic mb-4 leading-relaxed">
                  "{r.text}"
                </p>
                <p className="text-white text-sm font-bold">{r.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          {text.faq_title}
        </h2>
        <div className="space-y-4">
          {text.faqs.map((f, i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-900 transition-colors"
            >
              <h3 className="text-white font-bold mb-2 text-lg">{f.q}</h3>
              <p className="text-slate-400 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA (UPDATED to /pricing) --- */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-6">{text.cta_title}</h2>
        <Link href="/pricing">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl shadow-indigo-900/20">
            {text.cta_button}
          </button>
        </Link>
      </section>
    </div>
  );
}
