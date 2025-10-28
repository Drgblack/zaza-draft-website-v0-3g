import type { Metadata } from "next";
<<<<<<< HEAD
=======
import { redirect } from "next/navigation";
>>>>>>> 3176e96 (fix(about/company): resolve merge markers; server components; centered hero; finalized EN+DE copy; DE fallback)

export const metadata: Metadata = {
  title: "Über Zaza Technologies",
  description: "Lehrerfreundliche KI, gemeinsam mit Lehrkräften entwickelt.",
};

export default function AboutCompanyPageDE() {
<<<<<<< HEAD
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 text-center">
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold">Über Zaza Technologies</h1>
          <p className="mt-4 text-slate-300 max-w-3xl mx-auto">
            Lehrerfreundliche KI, entwickelt mit Lehrkräften und fundiert in Lernwissenschaft.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 prose prose-slate">
          <h2 className="!mb-2">Lehrkräfte haben nicht für so viel Verwaltung unterschrieben.</h2>
          <p>
            Sie sind Lehrer oder Lehrerin geworden, um Köpfe zu inspirieren, nicht um in Korrekturen, Dokumentation und
            Posteingang zu versinken. Doch genau das passiert – mit steigenden Burnout-Raten und engagierten Pädagogen,
            die den Beruf verlassen, weil die bürokratische Last nicht mehr tragbar ist.
          </p>

          <h3 className="!mt-10 !mb-2">Dafür gibt es Zaza</h3>
          <p>
            Gegründet 2025 von einem Learning Scientist mit 20 Jahren Erfahrung in der beruflichen Bildung, entwickeln wir
            eine Familie von KI-Apps speziell für Lehrkräfte – nicht für die Schulleitung verkauft, nicht von der IT
            ausgewählt, sondern gemeinsam mit Pädagogen gebaut, um die Probleme zu lösen, die Ihnen wirklich Zeit und Energie rauben.
          </p>

          <h3 className="!mt-10 !mb-2">Was uns unterscheidet</h3>
          <p>
            Wir sind nicht noch ein Tech-Unternehmen, das Bildung neu "entdeckt". Zaza basiert auf zwei Jahrzehnten
            Lernwissenschaft und Weiterbildungspraxis. Tausende Lehrkräfte gestalten unsere Tools mit echtem
            Feedback aus dem Alltag. Jedes Produkt ist mit Lehrkräften co-designt und forschungsbasiert – denn Abkürzungen,
            die die Pädagogik kompromittieren, sind keine Abkürzungen.
          </p>
          <p>
            Deshalb haben wir die KnowledgeCore entwickelt – eine vertrauenswürdige Intelligenzschicht, die jede Zaza-App
            erklärbar, datenschutzorientiert und klassenraumtauglich macht. Keine Black Boxes. Keine Halluzinationen, die
            Sie bloßstellen. Keine Untergrabung Ihrer professionellen Urteilsfähigkeit.
          </p>

          <h3 className="!mt-10 !mb-2">So funktioniert es</h3>
          <p>
            Von Zaza Draft (intelligente Kommentarformulierung) bis Zaza Teach (KI-Unterrichtsplanung mit AutoPlanner) und
            darüber hinaus verfolgen alle Produkte ein Ziel: Ihnen Zeit zurückzugeben, damit Sie sich auf das Wesentliche
            konzentrieren können – das Unterrichten.
          </p>

          <h3 className="!mt-10 !mb-2">Unser Versprechen</h3>
          <p>
            Wir kommen nicht mit großen Tech-Versprechen. Wir kommen mit Klarheit, Nützlichkeit und Vertrauen. Denn jede
            Lehrkraft verdient Werkzeuge, die das eigene Handwerk respektieren, die Glaubwürdigkeit schützen und beim
            Aufblühen helfen.
          </p>
        </div>
      </section>
    </main>
  );
=======
  // Simple runtime guard: if something goes wrong here in the future, fall back to EN.
  try {
    return (
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 text-center">
            <h1 className="mt-2 text-4xl sm:text-5xl font-bold">
              Über Zaza Technologies
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto font-semibold">
              Lehrkräfte haben nicht für so viel Verwaltung unterschrieben.
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-3xl px-4 py-12 prose prose-slate dark:prose-invert">
          <p>
            Sie sind Lehrkraft geworden, um junge Menschen zu inspirieren – nicht um in Korrekturen,
            Dokumentation und E-Mail-Postfächern zu versinken. Und doch stehen wir genau hier:
            steigende Burnout-Raten und engagierte Pädagoginnen und Pädagogen verlassen den Beruf,
            weil die bürokratische Last nicht mehr tragbar ist.
          </p>

          <h2>Zaza existiert, um das zu ändern</h2>
          <p>
            Gegründet 2025 von einer Lernwissenschaftlerin mit 20 Jahren Erfahrung in der
            beruflichen Bildung, bauen wir eine Familie von KI-Apps speziell für Lehrkräfte –
            nicht an Schulleitungen verkauft, nicht von der IT ausgewählt, sondern gemeinsam mit
            Lehrkräften entwickelt, um die Probleme zu lösen, die tatsächlich Zeit und Energie rauben.
          </p>

          <h2>Was uns unterscheidet</h2>
          <p>
            Wir sind nicht noch ein Tech-Unternehmen, das „Schule entdeckt“. Zaza basiert auf zwei
            Jahrzehnten Lernforschung und Weiterbildungspraxis. Tausende Lehrkräfte prägen unsere
            Werkzeuge durch Rückmeldungen aus dem echten Schulalltag. Jedes Produkt ist co-designt
            mit Lehrkräften und forschungsbasiert – denn Abkürzungen, die die Pädagogik schwächen,
            sind keine Abkürzungen.
          </p>
          <p>
            Deshalb haben wir die KnowledgeCore entwickelt – eine vertrauenswürdige Intelligenzschicht,
            die jede Zaza App erklärbar, datenschutzfreundlich und klassenraumtauglich hält. Keine
            Black Boxes. Keine Halluzinationen, die Sie in Verlegenheit bringen. Keine Untergrabung
            Ihres professionellen Urteils.
          </p>

          <h2>So funktioniert es</h2>
          <p>
            Von Zaza Draft (intelligente Kommentarformulierung) bis Zaza Teach (KI-Unterrichtsplanung
            mit AutoPlanner) und darüber hinaus verfolgen alle Produkte ein Ziel: Ihnen Zeit
            zurückzugeben, damit Sie sich auf das konzentrieren können, was Sie am besten können – unterrichten.
          </p>

          <h2>Unser Versprechen</h2>
          <p>
            Wir kommen nicht mit großen Tech-Versprechen. Wir kommen mit Klarheit, Nützlichkeit und Vertrauen.
            Denn jede Lehrkraft verdient Werkzeuge, die ihr Handwerk respektieren, ihre Glaubwürdigkeit schützen
            und ihr helfen, zu gedeihen.
          </p>
        </section>
      </main>
    );
  } catch {
    redirect("/about/company");
  }
>>>>>>> 3176e96 (fix(about/company): resolve merge markers; server components; centered hero; finalized EN+DE copy; DE fallback)
}
