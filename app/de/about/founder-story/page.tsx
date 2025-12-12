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
        {/* ZurÃ¼ck-Link */}
        <div className="mb-8">
          <Link
            href="/de/about/founder"
            className="inline-flex items-center text-sm text-[#A78BFA] hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            ZurÃ¼ck zur GrÃ¼nderseite
          </Link>
        </div>

        {/* Hero */}
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] mb-4">
            GrÃ¼nderstory
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Von der Malerlehre zum PhD
          </h1>
          <p className="text-base sm:text-lg text-[rgba(255,255,255,0.8)] max-w-3xl">
            Das ist die lÃ¤ngere Version der Geschichte, wie ich von einer Lehre in einer
            tasmanischen Lackfabrik zu Zaza Technologies gekommen bin â€“ einer Suite von
            lehrerzentrierten KI-Tools, die LehrkrÃ¤ften Zeit und KopfkapazitÃ¤t
            zurÃ¼ckgeben sollen.
          </p>
        </header>

        {/* Kurze Zeitleiste */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E7FF] mb-4">
            Eine kurze Zeitleiste
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-[rgba(15,23,42,0.95)] border border-[rgba(148,163,184,0.5)] rounded-xl p-6 shadow-lg shadow-black/30">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                FrÃ¼he Jahre
              </p>
              <h3 className="font-semibold mb-2">Farbe, TAFE & Cascade Brewery</h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Meine berufliche Reise begann in Hobart, Tasmanien, mit einer
                berufsvorbereitenden Ausbildung an der TAFE und einer vierjÃ¤hrigen
                Malerlehre in der Cascade-Brauerei â€“ harte Arbeit in einem rauen Umfeld,
                die mir DurchhaltevermÃ¶gen beigebracht hat, aber auch den Wunsch nach
                einer anderen Zukunft.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] p-5">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Studium & Sprache
              </p>
              <h3 className="font-semibold mb-2">UTas & Germanistik</h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Studium von Administration, Informationssystemen und Deutsch an der
                University of Tasmania, Abschluss mit First Class Honours und Entdeckung
                einer Leidenschaft fÃ¼r Forschung und Lernumgebungen.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] p-5">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Unternehmen & FÃ¼hrung
              </p>
              <h3 className="font-semibold mb-2">Telstra & MBA an der UQ</h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Umzug nach Brisbane, sechs Jahre bei Telstra und ein MBA an der
                University of Queensland â€“ der Wechsel von operativen Aufgaben hin zu
                strategischer Arbeit, Leadership und den ersten VerÃ¶ffentlichungen.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] p-5">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Forschung & EdTech
              </p>
              <h3 className="font-semibold mb-2">PhD & Chief Learning Officer</h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Promotion in Professional Education an der City, University of London,
                Schwerpunkt kritisches Denken und ProblemlÃ¶sen in studentenzentriertem
                E-Learning. SpÃ¤ter Chief Learning Officer bei Communardo â€“ an der
                Schnittstelle von Technologie, Lernen und VerÃ¤nderung.
              </p>
            </Card>

            <Card className="bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.3)] p-5 md:col-span-2">
              <p className="text-xs uppercase tracking-wide text-[#A78BFA] mb-1">
                Zaza Technologies
              </p>
              <h3 className="font-semibold mb-2">GrÃ¼ndung von Zaza 2025</h3>
              <p className="text-sm text-[rgba(226,232,240,0.9)]">
                Nach vielen Jahren im Learning & Development, in denen ich LehrkrÃ¤ften
                von langen Abenden mit Korrekturen, Berichten und Elternkommunikation
                zugehÃ¶rt habe, grÃ¼ndete ich 2025 Zaza Technologies â€“ mit dem Ziel,
                menschliche, lehrerzentrierte KI-Tools zu bauen, die Zeit zurÃ¼ckgeben,
                ohne professionelle UrteilsfÃ¤higkeit zu ersetzen.
              </p>
            </Card>
          </div>
        </section>

        {/* Lange Geschichte */}
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E7FF] mb-6">
            Die lÃ¤ngere Geschichte
          </h2>

          <div className="space-y-8 text-[rgba(226,232,240,0.95)] leading-[1.9] text-sm sm:text-base">
            <p>
              Ich bin nicht mit dem Plan aufgewachsen, einmal in Bildung oder Technologie
              zu arbeiten. Mein Berufsleben begann mit einem Pinsel in der Hand in
              Hobart, Tasmanien. Die Malerlehre und die Arbeit in der Brauerei haben mir
              Disziplin beigebracht â€“ aber auch deutlich gemacht, dass ich mir ein
              anderes Berufsleben wÃ¼nsche.
            </p>

            <p>
              Reisen haben mir die Augen geÃ¶ffnet. Ich habe im Ausland gelebt, Deutsch
              studiert und gesehen, wie sehr Bildung neue Wege Ã¶ffnen kann. ZurÃ¼ck in
              Tasmanien habe ich Administration, Informationssysteme und Deutsch an der
              University of Tasmania studiert und mit First Class Honours abgeschlossen.
              Das war fÃ¼r mich der Beweis, dass ich trotz frÃ¼her Zweifel und familiÃ¤rer
              Spannungen akademisch erfolgreich sein und meinen Weg selbst definieren
              kann.
            </p>

            <p>
              Der nÃ¤chste Schritt fÃ¼hrte mich nach Brisbane. Ich habe bei Telstra
              gearbeitet und parallel ein MBA-Studium an der University of Queensland
              absolviert. Das MBA Ã¶ffnete mir TÃ¼ren ins Management an der UQ, wo ich als
              Business Manager tÃ¤tig war. In dieser Zeit begann ich, Forschung darÃ¼ber zu
              verÃ¶ffentlichen, wie Menschen lernen, Probleme lÃ¶sen und in komplexen
              Organisationen denken.
            </p>

            <p>
              In diesen Jahren wurden auch meine beiden TÃ¶chter, Viola und Solara,
              geboren. Vater zu werden hat alles verschoben. Erfolg bedeutete plÃ¶tzlich
              nicht mehr nur Titel und BefÃ¶rderungen, sondern Arbeit, die eines Tages auch
              fÃ¼r sie Sinn ergibt â€“ und genug Zeit und emotionale Energie, um fÃ¼r die
              Familie da zu sein.
            </p>

            <p>
              Getrieben von Neugier habe ich spÃ¤ter eine Promotion in Professional
              Education an der City, University of London abgeschlossen â€“ auf Basis von
              Publikationen. Meine Forschung drehte sich um kritisches Denken und
              ProblemlÃ¶sen in studentenzentriertem E-Learning. Im Laufe der Jahre habe
              ich hunderte Mitarbeitende geschult und bin schlieÃŸlich Chief Learning
              Officer bei Communardo geworden. Dort war ich tÃ¤glich an der Schnittstelle
              von Lernen, Technologie und organisatorischem Wandel.
            </p>

            <p>
              Gleichzeitig habe ich immer wieder den Alltag von LehrkrÃ¤ften und
              Learning-Professionals gehÃ¶rt â€“ besonders in Schulen: Abende mit
              Korrekturen, Sonntage mit Zeugnissen und die emotionale Last stÃ¤ndiger
              Kommunikation mit Eltern, oftmals mit wenig struktureller UnterstÃ¼tzung.
              Erste KI-Tools kamen zwar auf, fÃ¼hlten sich aber hÃ¤ufig generisch an,
              ignorierten Kontext und erzeugten zusÃ¤tzlichen Kontrollaufwand.
            </p>

            <p>
              Daraus entstand eine Frage: Was wÃ¤re, wenn KI-Tools speziell fÃ¼r
              LehrkrÃ¤fte gestaltet wÃ¼rden â€“ verankert in Didaktik, respektvoll gegenÃ¼ber
              professionellem Urteil und mit dem Ziel, Arbeitslast wirklich zu senken?
              Was wÃ¤re, wenn LehrkrÃ¤fte jede Woche ein paar Stunden zurÃ¼ckgewinnen kÃ¶nnten,
              ohne die QualitÃ¤t ihrer RÃ¼ckmeldungen oder Beziehungen zu SchÃ¼lerinnen und
              SchÃ¼lern zu gefÃ¤hrden?
            </p>

            <p>
              2025 wurde aus dieser Frage Zaza Technologies. Zaza Draft, unser erstes
              Produkt, konzentriert sich auf den emotional anspruchsvollen Teil des
              Lehrerberufs: schriftliche Kommunikation mit Eltern und Erziehungsberechtigten.
              Von dort aus wÃ¤chst die Zaza-Suite in Richtung Unterrichtsplanung,
              BewertungsunterstÃ¼tzung und weitere Tools, die im Hintergrund bleiben, damit
              LehrkrÃ¤fte das tun kÃ¶nnen, was nur sie kÃ¶nnen â€“ unterrichten, begleiten und
              Vertrauen aufbauen.
            </p>

            <p>
              FÃ¼r mich ist Zaza mehr als ein Unternehmen. Es ist eine Art GefÃ¤ÃŸ fÃ¼r
              jahrzehntelange Erfahrung in Lernen und Entwicklung, meine Forschung zu
              kritischem Denken und ProblemlÃ¶sen, die Stimmen der LehrkrÃ¤fte, die ich
              gehÃ¶rt habe, und meinen Wunsch, etwas Sinnvolles fÃ¼r meine TÃ¶chter zu
              hinterlassen. Es ist mein Weg zu zeigen, dass EdTech mit Empathie, Strenge
              und Respekt vor der Profession gebaut werden kann, die es unterstÃ¼tzt.
            </p>
          </div>
        </section>

        {/* Abschluss-CTA */}
        <section className="pb-20 border-t border-[rgba(148,163,184,0.3)] pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#E5E7FF] mb-4">
                Wohin diese Geschichte fÃ¼hrt
              </h2>
              <p className="text-sm sm:text-base text-[rgba(226,232,240,0.9)] max-w-xl">
                Wenn dich diese Geschichte anspricht, freue ich mich, wenn du Zaza Draft
                ausprobierst und schaust, wie es deine eigene Arbeit unterstÃ¼tzen kann.
                Und wenn du RÃ¼ckmeldungen oder Ideen hast â€“ meine TÃ¼r ist offen.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/de/about/founder"
                className="inline-flex items-center px-4 py-2 rounded-full border border-[rgba(148,163,184,0.6)] text-sm hover:bg-[#0F172A] hover:text-white transition-colors"
              >
                ZurÃ¼ck zur GrÃ¼nderseite
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
