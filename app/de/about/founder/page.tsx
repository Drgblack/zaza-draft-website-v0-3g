import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lernen Sie den Gründer kennen | Dr. Greg Blackburn - Zaza Technologies",
  description: "KI für Lehrkräfte entwickeln. Über 20 Jahre Erfahrung in L&D und PhD in Professional Education.",
};

export default function FounderPageDE() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 text-center">
          <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full ring-4 ring-violet-500/40">
            <Image
              src="/images/founder-greg.jpg"
              alt="Dr. Greg Blackburn"
              width={256}
              height={256}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <p className="uppercase tracking-wider text-xs text-violet-300/90">Gründer</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold">Lernen Sie Dr. Greg Blackburn kennen</h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto">
            KI für Lehrkräfte entwickeln - wissenschaftlich fundiert und praxiserprobt.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 prose prose-slate dark:prose-invert">
          <h2>Der Weg</h2>
          <p>
            Meine berufliche Laufbahn begann in Hobart als Maler und Lackierer. Mein Vater führte eine lokale Farbenfabrik - Tas Paints - daher gehörten Pinsel, Farbkarten und harte Arbeit zum Alltag. Aufgrund seiner Kontakte in der Branche ging ich an das TAFE, um eine Ausbildung zu machen.
          </p>
          <p>
            Ich merkte schnell, dass mir das nicht lag. Aber mein Vater sagte: &quot;Sohn, mach erst deinen Abschluss, dann kannst du alles machen.&quot; Also biss ich die Zähne zusammen und schloss die Ausbildung ab. Diese Erfahrung lehrte mich Durchhaltevermögen und den Wert harter Arbeit - und machte mir klar, dass ich das nicht ein Leben lang tun wollte.
          </p>
          <p>
            Nach dem Abschluss brach ich zu einer Weltreise auf. Für mich war das eine Reise der Entdeckung - Menschen treffen, Länder sehen, Kulturen kennenlernen. Ich suchte nach etwas anderem. Irgendwann begriff ich, dass Bildung mein Ticket zu einem größeren Lebenszweck war. Diese Erkenntnis veränderte alles - an die Universität gehen und meine Zukunft von Grund auf neu aufbauen.
          </p>

          <h2>Erwachsene unterrichten, keine Kinder</h2>
          <p>
            Ich war nie Lehrer an einer Schule. In der beruflichen Weiterbildung habe ich jedoch Tausende Erwachsene in Präsenztrainings unterrichtet - neue Technologien eingeführt, neue Kompetenzen aufgebaut und Change Management begleitet. Diese Erfahrung zeigte mir, was Lernen erleichtert und was es behindert - und hält mich nah an den realen Herausforderungen von Lehrkräften.
          </p>

          <h2>Akademische Grundlage</h2>
          <p>
            Ich studierte Administration, Wirtschaftsinformatik und Deutsch an der University of Tasmania, erwarb First Class Honours in Information Systems, arbeitete bei Telstra und absolvierte einen MBA an der University of Queensland. Meine Forschung vertiefte mein Verständnis von Lernwissenschaft - kritisches Denken und Problemlösen in studierendenzentriertem E-Learning - und später promovierte ich an der City, University of London.
          </p>

          <h2>Warum Zaza?</h2>
          <p>
            Ich war nie Klassenlehrer. Aber viele in meiner Familie und enge Freunde sind es - meine Schwester, Cousins, eine Tante und ein Onkel sowie Kollegen, die täglich unterrichten. Ich habe ihre Geschichten gehört und die Arbeitsbelastung aus erster Hand gesehen: Eltern-E-Mails, Zeugnisse schreiben, Bewertungen und Verwaltung, die nie endet. Die Lücke war offensichtlich - Tools schufen oft mehr Arbeit, als sie beseitigten.
          </p>
          <p>
            <strong>2025</strong> gründete ich <strong>Zaza Technologies</strong> mit einer klaren Mission: KI bauen, die die Expertise von Lehrkräften respektiert, sicher und erklärbar ist und Zeit zurückgibt. Zaza ist halluzinationsbewusst, datenschutzorientiert und gemeinsam mit Pädagoginnen und Pädagogen entwickelt.
          </p>
          <p>
            Heute helfen unsere Tools, wiederkehrende Administration zu reduzieren und den Fokus auf die Momente mit Schülerinnen und Schülern zu legen, die wirklich zählen. Wir stehen erst am Anfang.
          </p>

          <blockquote>
            Jede Lehrkraft verdient Werkzeuge, die das Handwerk respektieren und Zeit für das Wesentliche schaffen - das Unterrichten.
          </blockquote>

          <h2>Drei Prinzipien</h2>
          <h3>Für Lehrkräfte - mit Lehrkräften</h3>
          <p>
            Gemeinsam mit Pädagoginnen und Pädagogen entwickelt, in realen Workflows geprüft und iterativ verbessert.
          </p>

          <h3>Boutique statt Big Tech</h3>
          <p>
            Wir bedienen eine Zielgruppe mit Sorgfalt - Lehrkräfte. Qualität vor Masse, Nutzen vor Hype.
          </p>

          <h3>Sicherheit und Vertrauen</h3>
          <p>
            Datenschutz zuerst, schulreife Schutzmechanismen und erklärbare KI - damit Ergebnisse vertrauenswürdig sind.
          </p>

          <h2>Ein persönliches Wort</h2>
          <p>
            Viele Tools versprechen Zeitgewinn und schaffen neue Aufgaben. Skepsis ist verständlich. Zaza will anders sein - wir hören zu, verbessern kontinuierlich und stellen Klarheit und Nutzen in den Vordergrund.
          </p>
          <p>
            Mein Postfach ist offen. Wenn Sie Feedback haben oder mitgestalten möchten, melden Sie sich gern.
          </p>
          <p>
            <strong>Greg</strong><br />
            Dr. Greg Blackburn - Gründer und CEO - Zaza Technologies
          </p>
        </div>
      </section>
    </main>
  );
}
