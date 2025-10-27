import Link from "next/link";

export const metadata = {
  title: "Über Zaza Technologies",
  description: "Warum es Zaza gibt, was uns unterscheidet und unser Versprechen an Lehrkräfte.",
};

export default function CompanyPageDe() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Über Zaza Technologies</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Lehrkräfte haben nicht für so viel Verwaltung unterschrieben.
        </p>
        <p className="text-sm text-muted-foreground">
          Sie wurden Lehrkraft, um Köpfe zu inspirieren, nicht um in Korrekturen, Dokumentation und Posteingängen
          zu ertrinken. Doch hier sind wir - mit steigenden Burnout-Raten und leidenschaftlichen Pädagoginnen
          und Pädagogen, die den Beruf verlassen, weil die bürokratische Last untragbar geworden ist.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold">Zaza existiert, um das zu ändern</h2>
        <p className="text-sm text-muted-foreground">
          Gegründet 2025 von einem Lernwissenschaftler mit 20 Jahren Erfahrung in der Bildung, bauen wir eine
          Familie von KI-Apps, die speziell für Lehrkräfte entwickelt wurden - nicht für die Schulleitung, nicht
          von der IT ausgewählt, sondern gemeinsam mit Lehrkräften entwickelt, um die Probleme zu lösen, die
          ihnen tatsächlich Zeit und Energie rauben.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Was macht uns anders?</h2>
        <p className="text-sm text-muted-foreground">
          Wir sind nicht ein weiteres Tech-Unternehmen, das "Bildung entdeckt". Zaza basiert auf zwei Jahrzehnten
          Lernforschung und Weiterbildung, mit Tausenden von Lehrkräften, die unsere Werkzeuge durch Feedback aus
          der Praxis mitgestalten. Jedes Produkt ist co-designed mit Lehrkräften und in Forschung verankert - denn
          Abkürzungen, die die Pädagogik untergraben, sind keine echten Abkürzungen.
        </p>
        <p className="text-sm text-muted-foreground">
          Deshalb haben wir den <strong>KnowledgeCore</strong> gebaut - eine vertrauenswürdige Intelligenzschicht,
          die jede Zaza-App erklärbar, datenschutzfreundlich und klassenzimmertauglich hält. Keine Black Boxes.
          Keine Halluzinationen, die Sie unprofessionell wirken lassen. Keine Untergrabung Ihres pädagogischen
          Urteilsvermögens.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Wie es funktioniert</h2>
        <p className="text-sm text-muted-foreground">
          Von <Link href="/products/draft" className="underline">Zaza Draft</Link> (intelligentes Kommentarschreiben)
          bis <Link href="/products/teach" className="underline">Zaza Teach</Link> (KI-gestützte Unterrichtsplanung
          mit AutoPlanner) und darüber hinaus - jedes Produkt verfolgt ein Ziel: Ihnen Ihre Zeit zurückzugeben,
          damit Sie sich auf das konzentrieren können, was Sie am besten können - das Unterrichten.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Unser Versprechen</h2>
        <p className="text-sm text-muted-foreground">
          Wir sind nicht hier mit großen Tech-Versprechen. Wir sind hier mit Klarheit, Nützlichkeit und Vertrauen.
          Denn jede Lehrkraft verdient Werkzeuge, die ihr Handwerk respektieren, ihre Glaubwürdigkeit schützen
          und ihr helfen, erfolgreich zu sein.
        </p>
      </section>
    </main>
  );
}
