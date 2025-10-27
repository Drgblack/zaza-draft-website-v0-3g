export const metadata = {
  title: "Zaza Technologies | Unser Unternehmen",
  description: "Sichere, lehrerzentrierte KI, die Arbeitsbelastung reduziert und Effizienz sowie Wohlbefinden stärkt."
};

export default function CompanyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Unser Unternehmen</p>
      <h1 className="text-3xl font-bold mb-4">Zaza Technologies</h1>
      <p className="text-muted-foreground mb-6">
        Wir sind ein Team aus Pädagog:innen, Entwickler:innen und Designer:innen. Zaza baut sichere, lehrerzentrierte KI-Tools,
        die die Arbeitsbelastung reduzieren und die Effizienz sowie das Wohlbefinden von Lehrkräften stärken.
      </p>
      <p className="mb-4">
        Jede Zaza-App basiert auf unserer KnowledgeCore-Plattform – für vertrauenswürdige, erklärbare KI mit konsistenten,
        schultauglichen Schutzmechanismen. Datenschutz, Klarheit und Klassentauglichkeit stehen im Mittelpunkt.
      </p>
      <p className="mb-4">
        Heute unterstützt Zaza Lehrkräfte in vielen Ländern und spart wöchentlich Stunden bei Planung, Feedback
        und Elternkommunikation. Unser Ziel: Lehrkräften Zeit und kreative Sicherheit zurückgeben.
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4"><div className="text-2xl font-semibold">500+</div><div className="text-sm text-muted-foreground">Lehrkräfte</div></div>
        <div className="rounded-xl border p-4"><div className="text-2xl font-semibold">15</div><div className="text-sm text-muted-foreground">Länder</div></div>
        <div className="rounded-xl border p-4"><div className="text-2xl font-semibold">10 Std.+</div><div className="text-sm text-muted-foreground">pro Woche gespart</div></div>
      </div>
    </main>
  );
}
