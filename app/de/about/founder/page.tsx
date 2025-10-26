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
              alt="Dr. Greg Blackburn"
              width={256}
              height={256}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Der Gründer, der KI für Lehrkräfte baut
          </h1>
          <p className="mt-3 text-muted-foreground">
            Dr. Greg Blackburn arbeitete zwei Jahrzehnte im Learning & Development und gründete 2025 Zaza,
            um konsequent lehrkraftzentrierte KI-Tools zu entwickeln. Er war kein Lehrer - sondern
            Lernwissenschaftler und Macher mit dem Ziel, Lehrkräften Zeit zurückzugeben.
          </p>

          <div className="mt-6 inline-flex flex-col items-center rounded-xl border border-border/60 bg-card px-5 py-4 text-sm">
            <p className="font-medium">Dr. Greg Blackburn</p>
            <p className="text-muted-foreground">Gründer und CEO • PhD Professional Education • EdTech-Builder</p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto grid gap-10 px-4 py-14 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-4">
            <h2 className="text-xl font-semibold">Die Reise</h2>
            <p className="mt-2 text-sm text-muted-foreground">Vom Malerpinsel in Tasmanien zum KI-Gründer.</p>
          </div>

          <div className="sm:col-span-8 space-y-5 leading-relaxed text-muted-foreground">
            <p>
              Mein Berufsleben begann in Hobart als Maler und Lackierer. Mein Vater führte eine lokale Farbenfabrik - Tas Paints -,
              daher waren Pinsel, Farbkarten und hartes Anpacken Alltag. Diese Zeit lehrte mich Detailtreue und Durchhaltevermögen.
              Über TAFE und eine Ausbildung ging es weiter an die Universität - eine Entscheidung, die alles veränderte.
            </p>
            <p>
              Ich studierte Administration, Wirtschaftsinformatik und Deutsch an der University of Tasmania,
              erhielt First Class Honours in Information Systems, arbeitete bei Telstra und schloss einen MBA an der University of Queensland ab.
              In der Forschung konzentrierte ich mich auf kritisches Denken und Problemlösen im studierendenzentrierten E-Learning
              und promovierte später per Veröffentlichung an der City, University of London.
            </p>
            <p>
              Ich war nie Lehrer. Aber viele in meiner Familie und in meinem Freundeskreis sind es - meine Schwester, Cousins, Tante und Onkel
              sowie Kolleginnen und Kollegen. Ihre Geschichten und die reale Arbeitslast kenne ich gut:
              Elternkommunikation, Berichte, Bewertung, Administration ohne Ende. Zu oft erzeugten Tools mehr Arbeit als sie sparten.
            </p>
            <p>
              <strong>2025</strong> gründete ich <strong>Zaza Technologies</strong> mit einer klaren Mission:
              KI bauen, die die Expertise von Lehrkräften respektiert, sicher und erklärbar ist und Zeit zurückgibt.
              Zaza ist halluzinationsbewusst, datenschutzorientiert und gemeinsam mit Pädagoginnen und Pädagogen entwickelt.
            </p>
            <p>
              Heute helfen unsere Tools, wiederkehrende Administration zu reduzieren und den Fokus auf die Momente mit
              Schülerinnen und Schülern zu legen, die wirklich zählen. Wir stehen erst am Anfang.
            </p>
            <blockquote className="mt-6 border-l-4 border-purple-400/60 pl-4 italic text-foreground">
              Jede Lehrkraft verdient Werkzeuge, die das Handwerk respektieren und Zeit für das Wesentliche schaffen - das Unterrichten.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Why I Built Zaza */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">Warum ich Zaza gegründet habe</h2>
        <p className="mt-2 text-muted-foreground">Drei Prinzipien leiten unsere Arbeit.</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">Für Lehrkräfte - mit Lehrkräften</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Gemeinsam mit Pädagoginnen und Pädagogen entwickelt, in realen Workflows geprüft und iterativ verbessert.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">Boutique statt Big Tech</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Wir bedienen eine Zielgruppe mit Sorgfalt - Lehrkräfte. Qualität vor Masse, Nutzen vor Hype.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">Sicherheit und Vertrauen</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Datenschutz zuerst, schulreife Schutzmechanismen und erklärbare KI - damit Ergebnisse vertrauenswürdig sind.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Note */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold">Ein persönliches Wort</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Viele Tools versprechen Zeitgewinn und schaffen neue Aufgaben. Skepsis ist verständlich.
              Zaza will anders sein - wir hören zu, verbessern kontinuierlich und stellen Klarheit und Nutzen in den Vordergrund.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Mein Postfach ist offen. Wenn Sie Feedback haben oder mitgestalten möchten, melden Sie sich gern.
            </p>

            <div className="mt-8 rounded-xl border border-border/60 bg-card p-5">
              <p className="font-medium">Greg</p>
              <p className="text-sm text-muted-foreground">
                Dr. Greg Blackburn • Gründer und CEO • Zaza Technologies
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
