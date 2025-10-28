import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Über Zaza Technologies",
  description: "Lehrerfreundliche KI, gemeinsam mit Lehrkräften entwickelt.",
};

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
          </p>

          <div>
            <h2 className="text-xl font-semibold">Dafür gibt es Zaza</h2>
            <p className="mt-2">
              Gegründet 2025 von einer Lernwissenschaftlerin mit 20 Jahren Erfahrung in
              der beruflichen Bildung, bauen wir eine Familie von KI-Apps speziell für
              Lehrkräfte. Nicht an Ihre Schulleitung verkauft, nicht von der IT
              ausgewählt, sondern gemeinsam mit Lehrkräften entwickelt, um die Probleme zu
              lösen, die Ihnen tatsächlich Zeit und Energie rauben.
            </p>
          </div>

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

          <div>
            <h2 className="text-xl font-semibold">Unser Versprechen</h2>
            <p className="mt-2">
              Wir kommen nicht mit großen Tech-Versprechen. Wir kommen mit Klarheit,
              Nützlichkeit und Vertrauen. Denn jede Lehrkraft verdient Werkzeuge, die ihr
              Handwerk respektieren, ihre Glaubwürdigkeit schützen und beim Gedeihen
              helfen.
            </p>
          </div>
        </section>
      </main>
    );
  } catch {
    redirect("/about/company");
  }
}
