import Image from "next/image";

export default function FounderPageDE() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full ring-4 ring-purple-500/30">
            <Image
              src="/images/founder-greg.jpg"
              alt="Dr Greg Blackburn"
              width={256}
              height={256}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Lernen Sie den Gründer kennen, der KI für Lehrkräfte entwickelt
          </h1>
          <p className="mt-3 text-muted-foreground">
            Zaza hilft Lehrkräften, zu gedeihen. Dr Greg Blackburn arbeitete über 20 Jahre in Learning and Development, bevor er 2025 Zaza gründete, um KI zu entwickeln, die von Anfang an für Lehrkräfte gedacht ist. Kein ehemaliger Lehrer - sondern ein Lernforscher und Praktiker mit dem Ziel, Lehrkräften ihre Zeit zurückzugeben.
          </p>
          <div className="mt-6 inline-flex flex-col items-center rounded-xl border border-border/60 bg-card px-5 py-4 text-sm">
            <p className="font-medium">Dr Greg Blackburn</p>
            <p className="text-muted-foreground">Gründer und CEO - PhD in Professional Education - EdTech-Entwickler</p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto grid gap-10 px-4 py-14 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-4">
            <h2 className="text-xl font-semibold">Der Weg</h2>
            <p className="mt-2 text-sm text-muted-foreground">Von Malerpinseln in Tasmanien zum KI-Gründer.</p>
          </div>

          <div className="sm:col-span-8 space-y-5 leading-relaxed text-muted-foreground">
            <p>
              Meine berufliche Laufbahn begann in Hobart als Maler und Lackierer, während ich überlegte, wie es weitergehen sollte. Mein Vater besaß eine lokale Lackfabrik - Tas Paints - daher gehörten Pinsel, Farbkarten und harte Arbeit zum Alltag. Diese Zeit lehrte mich Detailgenauigkeit, Belastbarkeit und das Gefühl, wenn die Erwartungen niedrig angesetzt sind. Ich wechselte an das TAFE, absolvierte eine Lehre und traf dann eine Entscheidung, die alles veränderte - ich ging an die Universität und baute meine Zukunft von Grund auf neu auf.
            </p>
            <p>
              Ich studierte Administration, Wirtschaftsinformatik und Deutsch an der University of Tasmania, erwarb First Class Honours in Information Systems, arbeitete bei Telstra und absolvierte einen MBA an der University of Queensland. Meine Forschung vertiefte mein Verständnis von Lernwissenschaft - kritisches Denken und Problemlösen in studierendenzentriertem E-Learning - und später promovierte ich an der City, University of London.
            </p>
          </div>
        </div>
      </section>

      {/* L&D Experience */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold">Meine Learning and Development Erfahrung</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Seit über 20 Jahren arbeite ich in der beruflichen Weiterbildung und Erwachsenenbildung. Ich habe Tausende von Erwachsenen in Präsenztrainings unterrichtet, ihnen neue Technologien nähergebracht, neue Fähigkeiten vermittelt und sie durch Veränderungsprozesse begleitet.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Bei Telstra und der University of Queensland habe ich Trainingsmaßnahmen entwickelt, um Mitarbeitende beim Einsatz von IT-Systemen und digitalen Tools zu unterstützen. Außerdem habe ich Blended-Learning-Programme aufgebaut, die Workshops mit Online-Modulen verbinden. Meine Promotion erforschte, wie studierendenzentriertes E-Learning kritisches Denken und Problemlösungskompetenz stärken kann.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Bei Communardo leitete ich die Neugestaltung des Learning Centre hin zu einem KI-orientierten föderierten Modell und entwickelte Führungspfade für sowohl jüngere als auch erfahrene Mitarbeitende. Darüber hinaus habe ich Trainings zu Veränderungsbereitschaft, Soft Skills und zuletzt KI-gestützte Lernprogramme für Onboarding, Compliance und Produktivität eingeführt.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Mein Ansatz war immer derselbe: Pädagogik respektieren, auf nachhaltigen Lerntransfer achten und Innovation mit Nutzbarkeit verbinden. Das Ergebnis - Lernende gewinnen Selbstvertrauen, passen sich Veränderungen an und gedeihen mit neuen Werkzeugen. Mit Zaza bringe ich diese Erfahrung nun in KI-gestützte Werkzeuge ein, die Lehrkräften denselben Vorteil verschaffen - Hilfsmittel, die Zeit sparen, Administration reduzieren und die Praxis im Klassenzimmer stärken.
          </p>
        </div>
      </section>

      {/* Why I Built Zaza */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Warum ich Zaza gegründet habe</h2>
          <p className="mt-2 text-muted-foreground">Drei Prinzipien leiten alles, was wir tun.</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">Für Lehrkräfte - Mit Lehrkräften</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Gemeinsam mit Pädagogen entwickelt, in echten Arbeitsabläufen validiert, durch echtes Feedback verbessert.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">Boutique - Nicht Big Tech</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Wir konzentrieren uns mit Sorgfalt auf eine Zielgruppe - Lehrkräfte. Qualität vor Größe, Nützlichkeit vor Hype.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">Sicherheit und Vertrauen</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Privacy-first, schulkonforme Sicherheitsmechanismen und erklärbare KI, damit Lehrkräfte den Ergebnissen vertrauen können.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Note */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold">Persönliche Worte</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Ich war nie Lehrer an einer Schule. Aber viele meiner Familienmitglieder und Freunde sind es - meine Schwester, Cousins, eine Tante und ein Onkel sowie Kolleginnen und Kollegen, die täglich unterrichten. Ich habe ihre Geschichten gehört und die Arbeitslast direkt miterlebt: Elternkommunikation, Berichte, Benotung und endlose Verwaltung. Die Lücke war offensichtlich - viele Tools haben oft mehr Arbeit geschaffen als sie entfernt haben.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Wenn Sie Lehrer oder Lehrerin sind, haben Sie wahrscheinlich schon Werkzeuge ausprobiert, die versprachen, Stunden einzusparen, und die stattdessen neue Aufgaben erzeugt haben. Ich verstehe diesen Skeptizismus. Zaza ist anders aufgebaut. Wir hören weiter zu, verbessern uns und setzen Klarheit und Nützlichkeit vor Lärm.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Meine Tür steht offen. Wenn Sie Feedback haben oder mithelfen möchten, die nächsten Werkzeuge für Lehrkräfte zu gestalten, melden Sie sich bitte.
            </p>

            <div className="mt-8 rounded-xl border border-border/60 bg-card p-5">
              <p className="font-medium">Greg</p>
              <p className="text-sm text-muted-foreground">
                Dr Greg Blackburn - Gründer und CEO - Zaza Technologies
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

