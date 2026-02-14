import type { Metadata } from "next";

import { Card } from "@/components/ui/card";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

const ogImage = "/greg-blackburn-headshot.jpg";

const canonicalUrl = "https://zazadraft.com/de/about/founder-story";

export const metadata: Metadata = {
  title: "Gründerstory | Zaza Draft",

  description:
    "Die ausführliche Gründerstory von Greg Blackburn führt von der Malerlehre in Hobart über die Promotion bis zur Gründung von Zaza Technologies.",

  alternates: {
    canonical: canonicalUrl,

    languages: {
      en: "https://zazadraft.com/about/founder-story",

      de: canonicalUrl,
    },
  },

  openGraph: {
    title: "Gründerstory | Zaza Draft",

    description:
      "Die längere Geschichte hinter Zaza Draft und Zaza Technologies - warum Greg Blackburn KI-Tools speziell für Lehrkräfte gebaut hat.",

    url: canonicalUrl,

    type: "website",

    siteName: "Zaza Draft",

    locale: "de_DE",

    images: [{ url: ogImage, alt: "Greg Blackburn, Gründer von Zaza Draft" }],
  },

  twitter: {
    card: "summary_large_image",

    title: "Gründerstory | Zaza Draft",

    description:
      "Die längere Geschichte hinter Zaza Draft und Zaza Technologies - warum Greg Blackburn KI-Tools für Lehrkräfte gebaut hat.",
  },
};

export default function FounderStoryPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Zurück-Link */}

        <div className="mb-8">
          <Link
            href="/de/about/founder"
            className="inline-flex items-center text-sm text-[#A78BFA] hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Gründerseite
          </Link>
        </div>

        {/* Hero */}

        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] mb-4">
            Gründerstory
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#E5E7FF]">
            Von der Malerlehre zum PhD
          </h1>

          <p className="text-base sm:text-lg text-[rgba(255,255,255,0.8)] max-w-3xl">
            Das ist die längere Version der Geschichte, wie ich von einer Lehre
            in einer tasmanischen Lackfabrik zu Zaza Technologies gekommen bin –
            einer Suite von lehrerzentrierten KI-Tools, die Lehrkräften Zeit und
            Kopfkapazität zurückgeben sollen.
          </p>
        </header>

        {/* Kurze Zeitleiste */}

        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E7FF] mb-4">
            Eine kurze Zeitleiste
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-[rgba(15,23,42,0.95)] border border-[rgba(148,163,184,0.5)] rounded-xl p-6 shadow-lg shadow-black/30 text-[rgba(226,232,240,0.95)]">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Frühe Jahre
              </p>

              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                Farbe, TAFE & Cascade Brewery
              </h3>

              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Meine berufliche Reise begann in Hobart, Tasmanien, mit einer
                berufsvorbereitenden Ausbildung an der TAFE und einer
                vierjährigen Malerlehre in der Cascade-Brauerei – harte Arbeit
                in einem rauen Umfeld, die mir Durchhaltevermögen beigebracht
                hat, aber auch den Wunsch nach einer anderen Zukunft.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] p-5 text-[rgba(226,232,240,0.95)]">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Studium & Sprache
              </p>

              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                UTas & Germanistik
              </h3>

              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Studium von Administration, Informationssystemen und Deutsch an
                der University of Tasmania, Abschluss mit First Class Honours
                und Entdeckung einer Leidenschaft für Forschung und
                Lernumgebungen.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] p-5 text-[rgba(226,232,240,0.95)]">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Unternehmen & Führung
              </p>

              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                Telstra & MBA an der UQ
              </h3>

              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Umzug nach Brisbane, sechs Jahre bei Telstra und ein MBA an der
                University of Queensland – der Wechsel von operativen Aufgaben
                hin zu strategischer Arbeit, Leadership und den ersten
                Veröffentlichungen.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] p-5 text-[rgba(226,232,240,0.95)]">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Forschung & EdTech
              </p>

              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                PhD & Chief Learning Officer
              </h3>

              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Promotion in Professional Education an der City, University of
                London, Schwerpunkt kritisches Denken und Problemlösen in
                studentenzentriertem E-Learning. Später Chief Learning Officer
                bei Communardo – an der Schnittstelle von Technologie, Lernen
                und Veränderung.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] p-5 md:col-span-2 text-[rgba(226,232,240,0.95)]">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Zaza Technologies
              </p>

              <h3 className="font-semibold mb-2 text-[#E5E7FF]">
                Gründung von Zaza 2025
              </h3>

              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Nach vielen Jahren im Learning & Development, in denen ich
                Lehrkräften von langen Abenden mit Korrekturen, Berichten und
                Elternkommunikation zugehört habe, gründete ich 2025 Zaza
                Technologies – mit dem Ziel, menschliche, lehrerzentrierte
                KI-Tools zu bauen, die Zeit zurückgeben, ohne professionelle
                Urteilsfähigkeit zu ersetzen.
              </p>
            </Card>
          </div>
        </section>

        {/* Lange Geschichte */}

        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E7FF] mb-6">
            Die längere Geschichte
          </h2>

          <div className="space-y-8 text-[rgba(226,232,240,0.95)] leading-[1.9] text-sm sm:text-base">
            <p>
              Ich bin nicht mit dem Plan aufgewachsen, einmal in Bildung oder
              Technologie zu arbeiten. Mein Berufsleben begann mit einem Pinsel
              in der Hand in Hobart, Tasmanien. Die Malerlehre und die Arbeit in
              der Brauerei haben mir Disziplin beigebracht – aber auch deutlich
              gemacht, dass ich mir ein anderes Berufsleben wünsche.
            </p>

            <p>
              Reisen haben mir die Augen geöffnet. Ich habe im Ausland gelebt,
              Deutsch studiert und gesehen, wie sehr Bildung neue Wege öffnen
              kann. Zurück in Tasmanien habe ich Administration,
              Informationssysteme und Deutsch an der University of Tasmania
              studiert und mit First Class Honours abgeschlossen. Das war für
              mich der Beweis, dass ich trotz früher Zweifel und familiärer
              Spannungen akademisch erfolgreich sein und meinen Weg selbst
              definieren kann.
            </p>

            <p>
              Der nächste Schritt führte mich nach Brisbane. Ich habe bei
              Telstra gearbeitet und parallel ein MBA-Studium an der University
              of Queensland absolviert. Das MBA öffnete mir Türen ins Management
              an der UQ, wo ich als Business Manager tätig war. In dieser Zeit
              begann ich, Forschung darüber zu veröffentlichen, wie Menschen
              lernen, Probleme lösen und in komplexen Organisationen denken.
            </p>

            <p>
              In diesen Jahren wurden auch meine beiden Töchter, Viola und
              Solara, geboren. Vater zu werden hat alles verschoben. Erfolg
              bedeutete plötzlich nicht mehr nur Titel und Beförderungen,
              sondern Arbeit, die eines Tages auch für sie Sinn ergibt – und
              genug Zeit und emotionale Energie, um für die Familie da zu sein.
            </p>

            <p>
              Getrieben von Neugier habe ich später eine Promotion in
              Professional Education an der City, University of London
              abgeschlossen – auf Basis von Publikationen. Meine Forschung
              drehte sich um kritisches Denken und Problemlösen in
              studentenzentriertem E-Learning. Im Laufe der Jahre habe ich
              hunderte Mitarbeitende geschult und bin schließlich Chief Learning
              Officer bei Communardo geworden. Dort war ich täglich an der
              Schnittstelle von Lernen, Technologie und organisatorischem
              Wandel.
            </p>

            <p>
              Gleichzeitig habe ich immer wieder den Alltag von Lehrkräften und
              Learning-Professionals gehört – besonders in Schulen: Abende mit
              Korrekturen, Sonntage mit Zeugnissen und die emotionale Last
              ständiger Kommunikation mit Eltern, oftmals mit wenig
              struktureller Unterstützung. Erste KI-Tools kamen zwar auf,
              fühlten sich aber häufig generisch an, ignorierten Kontext und
              erzeugten zusätzlichen Kontrollaufwand.
            </p>

            <p>
              Daraus entstand eine Frage: Was wäre, wenn KI-Tools speziell für
              Lehrkräfte gestaltet würden – verankert in Didaktik, respektvoll
              gegenüber professionellem Urteil und mit dem Ziel, Arbeitslast
              wirklich zu senken? Was wäre, wenn Lehrkräfte jede Woche ein paar
              Stunden zurückgewinnen könnten, ohne die Qualität ihrer
              Rückmeldungen oder Beziehungen zu Schülerinnen und Schülern zu
              gefährden?
            </p>

            <p>
              2025 wurde aus dieser Frage Zaza Technologies. Zaza Draft, unser
              erstes Produkt, konzentriert sich auf den emotional
              anspruchsvollen Teil des Lehrerberufs: schriftliche Kommunikation
              mit Eltern und Erziehungsberechtigten. Von dort aus wächst die
              Zaza-Suite in Richtung Unterrichtsplanung, Bewertungsunterstützung
              und weitere Tools, die im Hintergrund bleiben, damit Lehrkräfte
              das tun können, was nur sie können – unterrichten, begleiten und
              Vertrauen aufbauen.
            </p>

            <p>
              Für mich ist Zaza mehr als ein Unternehmen. Es ist eine Art Gefäß
              für jahrzehntelange Erfahrung in Lernen und Entwicklung, meine
              Forschung zu kritischem Denken und Problemlösen, die Stimmen der
              Lehrkräfte, die ich gehört habe, und meinen Wunsch, etwas
              Sinnvolles für meine Töchter zu hinterlassen. Es ist mein Weg zu
              zeigen, dass EdTech mit Empathie, Strenge und Respekt vor der
              Profession gebaut werden kann, die es unterstützt.
            </p>
          </div>
        </section>

        {/* Abschluss-CTA */}

        <section className="pb-20 border-t border-[rgba(148,163,184,0.3)] pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#E5E7FF] mb-4">
                Wohin diese Geschichte führt
              </h2>

              <p className="text-sm sm:text-base text-[rgba(226,232,240,0.9)] max-w-xl">
                Wenn dich diese Geschichte anspricht, freue ich mich, wenn du
                Zaza Draft ausprobierst und schaust, wie es deine eigene Arbeit
                unterstützen kann. Und wenn du Rückmeldungen oder Ideen hast –
                meine Tür ist offen.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/de/about/founder"
                className="inline-flex items-center px-4 py-2 rounded-full border border-[rgba(148,163,184,0.6)] text-sm hover:bg-[#0F172A] hover:text-white transition-colors"
              >
                Zurück zur Gründerseite
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-sm font-medium shadow-lg shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/50 transition-transform hover:scale-105"
              >
                Zaza Draft ausprobieren
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
