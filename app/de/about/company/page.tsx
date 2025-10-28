import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über Zaza Technologies",
  description: "Lehrerfreundliche KI, gemeinsam mit Lehrkräften entwickelt.",
};

export default function AboutCompanyPageDE() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 text-center">
          <p className="uppercase tracking-wider text-xs text-violet-300/90">Über uns</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold">Über Zaza Technologies</h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto">
            Lehrkräfte haben nicht für so viel Verwaltung unterschrieben.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 prose prose-slate dark:prose-invert">
          <p>
            Sie sind Lehrerin oder Lehrer geworden, um junge Menschen zu inspirieren, nicht um in
            Korrekturen, Dokumentation und E-Mail-Management zu versinken. Und doch steigen die
            Burnout-Zahlen, während engagierte Pädagoginnen und Pädagogen den Beruf verlassen, weil die
            Bürokratie kaum noch zu bewältigen ist.
          </p>

          <h2>Zaza ändert das</h2>
          <p>
            Gegründet 2025 von einer Learning-Scientist mit 20 Jahren Erfahrung in der beruflichen Bildung
            entwickeln wir eine Familie von KI-Apps, die speziell für Lehrkräfte gedacht sind - nicht für die
            Schulleitung verkauft, nicht von der IT ausgewählt, sondern gemeinsam mit Lehrkräften entwickelt,
            um genau die Aufgaben zu lösen, die Ihnen Zeit und Energie rauben.
          </p>

          <h2>Was uns unterscheidet</h2>
          <p>
            Wir sind kein weiteres Tech-Unternehmen, das Bildung erst „entdeckt“. Zaza basiert auf zwei
            Jahrzehnten Lernwissenschaft und betrieblicher Bildung; tausende Lehrkräfte geben uns
            kontinuierlich Rückmeldungen aus der Praxis. Jedes Produkt entsteht im Co-Design mit
            Lehrkräften und ist in Forschung verankert - denn Abkürzungen, die die Pädagogik schwächen,
            sind keine Abkürzungen.
          </p>
          <p>
            Darum gibt es den <strong>KnowledgeCore</strong> - eine vertrauenswürdige Intelligenz-Schicht,
            die jede Zaza App erklärbar, datenschutzfreundlich und unterrichtstauglich macht.
            Keine Black-Boxes. Keine Halluzinationen, die Sie unglaubwürdig aussehen lassen. Keine
            Untergrabung Ihrer professionellen Urteilsfähigkeit.
          </p>

          <h2>So funktioniert es</h2>
          <p>
            Von Zaza Draft (intelligentes Kommentieren) bis Zaza Teach (KI-Unterrichtsplanung mit
            AutoPlanner) verfolgen alle Produkte ein Ziel: Ihnen Zeit zurückzugeben, damit Sie sich auf das
            konzentrieren können, was Sie am besten können - unterrichten.
          </p>

          <h2>Unser Versprechen</h2>
          <p>
            Wir machen keine großen Tech-Versprechen. Wir stehen für Klarheit, Nutzen und Vertrauen.
            Denn jede Lehrkraft verdient Werkzeuge, die ihr Handwerk respektieren, ihre Glaubwürdigkeit
            schützen und ihr helfen, zu gedeihen.
          </p>
        </div>
      </section>
    </main>
  );
}
