import type { Metadata } from "next"
import { AboutSidebar } from "@/components/about-sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AssetCard } from "@/components/asset-card"
import { ExpandableBio } from "@/components/expandable-bio"
import { Button } from "@/components/ui/button"
import { Mail, ExternalLink, Sparkles, Quote, Award } from "lucide-react"
import { SetLanguage } from "@/components/set-language"

const ogImage = "/press-kit/screenshot-hero-preview.jpg"
const siteUrl = "https://zazadraft.com"
const iconPackDe = [
  {
    name: "Zaza Z icon - colour",
    description: "Nutzen Sie es auf hellen Hintergründen, damit der Verlauf die Marke ausspielt.",
    file: "/press-kit/brand/zaza-z-icon-1024.png",
    alt: "Zaza Z icon - colour",
  },
  {
    name: "Zaza Z glyph - white",
    description: "Für dunkle Hintergründe oder Überlagerungen mit hohem Kontrast.",
    file: "/press-kit/brand/zaza-z-glyph-white-1024.png",
    alt: "Zaza Z glyph - white",
  },
  {
    name: "Zaza Z glyph - black",
    description: "Für monochrome Drucksachen oder leichte neutrale Flächen ohne Verlauf.",
    file: "/press-kit/brand/zaza-z-glyph-black-1024.png",
    alt: "Zaza Z glyph - black",
  },
]
import Image from "next/image"

export const metadata: Metadata = {
  title: "Presse-Kit | Zaza Draft Medienressourcen",
  description:
    "Logos, Screenshots, Brand-Guidelines, Fact Sheet, Gründer-Bio und Kontaktdaten für Berichterstattung.",
  openGraph: {
    title: "Presse-Kit | Zaza Draft Medienressourcen",
    description:
      "Logos, Screenshots, Brand Guidelines und Gründer-Bio zum Download. Alle Medienassets für Journalist:innen und Partner.",
    url: `${siteUrl}/de/about/press`,
    type: "website",
    siteName: "Zaza Draft",
    locale: "de_DE",
    alternateLocale: ["en_GB"],
    images: [{ url: ogImage, alt: "Zaza Draft press kit previews" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Presse-Kit | Zaza Draft",
    description: "Logos, Screenshots und Gründer-Bio für Ihre Berichterstattung.",
    images: [ogImage],
  },
  alternates: {
    canonical: `${siteUrl}/de/about/press`,
    languages: {
      en: "https://zazadraft.com/about/press",
      de: `${siteUrl}/de/about/press`,
    },
  },
}

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F9FAFB]">
      <SetLanguage lang="de" />
      <div className="max-w-screen-2xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          <aside className="hidden lg:block">
            <AboutSidebar />
          </aside>

          <main>
            <Breadcrumbs
              items={[
                { label: "Startseite", href: "/de" },
                { label: "├£ber uns", href: "/de/about" },
                { label: "Presse-Kit", href: "/de/about/press" },
              ]}
            />

            {/* Hero */}
            <div className="mt-6 mb-12 bg-gradient-to-r from-[#111827] to-[#0F172A] rounded-3xl border border-[#1F2937] p-8 md:p-10">
              <p className="text-sm font-semibold text-[#A78BFA] uppercase tracking-[0.2em] mb-3">Presse-Kit</p>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] leading-tight">
                    Alles für Ihre Berichterstattung über Zaza Draft
                  </h1>
                  <p className="text-lg text-[#CBD5E1] max-w-3xl">
                    Logos, Screenshots, Brand-Guidelines, Fact Sheet, Gründer-Bio und Kontaktinformationen - aktuell,
                    konsistent und sofort nutzbar.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="rounded-full border border-white/20 bg-white text-[#111827] hover:bg-[#E5E7EB]"
                      variant="outline"
                    >
                      <a href="mailto:press@zazatechnologies.com">Interview anfragen</a>
                    </Button>
                  </div>
                </div>
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 min-w-[280px] shadow-lg">
                  <div className="flex items-center gap-3 text-[#E5E7EB] mb-3">
                    <Sparkles className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm uppercase tracking-[0.18em] text-[#A78BFA]">Fact Sheet</span>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[#CBD5E1]">
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Gegründet</dt>
                      <dd>2025</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">HQ</dt>
                      <dd>Dresden, Deutschland</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Mission</dt>
                      <dd>Lehrerzentrierte KI, die Zeit zurückgibt</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Zielgruppe</dt>
                      <dd>Lehrkräfte &amp; Schulen (K12)</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Funding</dt>
                      <dd>Bootstrapped</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Traktion</dt>
                      <dd>500+ Lehrkräfte, 15 Länder</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Outcomes at a glance */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Kennzahlen auf einen Blick</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Zeitersparnis", value: "10+ Std./Woche", detail: "Durchschnittliche Zeit, die Lehrkräfte mit Draft zurückgewinnen" },
                  { label: "Lehrkräfte", value: "500+", detail: "Aktive Nutzer aus 15 Ländern" },
                  { label: "Verlässlichkeit", value: "Halluzinationsarm", detail: "Guardrails & erklärbare Outputs" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
                    <p className="text-sm text-[#9CA3AF]">{item.label}</p>
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="text-sm text-[#CBD5E1] mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Brand Logos */}
            <section className="mb-16">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#A78BFA]" />
                  <h2 className="text-2xl font-bold text-[#F9FAFB]">Brand Assets</h2>
                </div>
                <p className="text-sm text-[#CBD5E1] max-w-3xl">
                  Die offiziellen Z-Icons in drei Varianten. Wählen Sie die passende Version abhängig vom Hintergrund und behalten Sie klare Abstände ein.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {iconPackDe.map((icon) => (
                  <div key={icon.name} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 space-y-4">
                    <div className="rounded-xl border border-[#1F2937] bg-[#0F172A] p-3">
                      <div className="relative h-32 w-full">
                        <Image src={icon.file} alt={icon.alt} fill className="object-contain" sizes="(max-width: 768px) 50vw, 30vw" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#F9FAFB]">{icon.name}</h3>
                      <p className="text-sm text-[#CBD5E1] mt-1">{icon.description}</p>
                    </div>
                    <a
                      href={icon.file}
                      download
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-3 py-2 text-sm font-semibold text-white transition-colors hover:from-[#6D28D9] hover:to-[#4F46E5]"
                    >
                      Download PNG
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-dashed border-[#374151] bg-[#0F172A] p-4 text-sm text-[#CBD5E1]">
                <p className="font-semibold text-white mb-2">Hinweise zur Verwendung</p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Das Farbicon nutzen Sie auf hellen Flächen, damit der Verlauf die Marke sichtbar macht.</li>
                  <li>Weiß eignet sich für dunkle Hintergründe oder Überlagerungen mit hohem Kontrast.</li>
                  <li>Schwarz verwenden Sie für monochrome Drucke, Prägungen oder neutrale Flächen ohne Verlauf – nicht einfärben oder strecken.</li>
                </ul>
              </div>
            </section>

            {/* Product & Context Screens */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Screenshots & Kontextbilder</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AssetCard
                  title="Hero Screenshot"
                  description="Produkt-Hero mit Zaza Draft Interface."
                  previewImage="/press-kit/screenshot-hero-preview.jpg"
                  downloadUrl="/press-kit/screenshot-hero.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Dashboard View"
                  description="Dashboard mit aktuellen Kommentaren und Schnellaktionen."
                  previewImage="/press-kit/screenshot-dashboard-preview.jpg"
                  downloadUrl="/press-kit/screenshot-dashboard.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Draft Editor"
                  description="Schreib-Interface mit KI-Vorschlägen und Tonsteuerung."
                  previewImage="/press-kit/screenshot-editor-preview.jpg"
                  downloadUrl="/press-kit/screenshot-editor.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Safety Guardrails"
                  description="Halluzinationsschutz und ├£bersetzungssicherheit im Einsatz."
                  previewImage="/press-kit/screenshot-safety-preview.jpg"
                  downloadUrl="/press-kit/screenshot-safety.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Kontext: Klassenzimmer"
                  description="Realistische Szene mit Zaza Draft im Unterricht."
                  previewImage="/press-kit/context-classroom.jpg"
                  downloadUrl="/press-kit/context-classroom.jpg"
                  downloadLabel="Download JPG"
                />
                <AssetCard
                  title="Kontext: Home Office"
                  description="Lehrkraft nutzt Draft zuhause für Elternkommunikation."
                  previewImage="/press-kit/context-home.jpg"
                  downloadUrl="/press-kit/context-home.jpg"
                  downloadLabel="Download JPG"
                />
              </div>
            </section>

            {/* Brand Guidelines */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Brand Guidelines</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AssetCard
                  title="Brand Guidelines PDF"
                  description="Logo-Spacings, Farbwerte, Typografie-Hierarchien, Do's & Don'ts, Anwendungsbeispiele."
                  downloadUrl="/press-kit/zaza-brand-guidelines.pdf"
                  downloadLabel="Download PDF"
                />
              </div>
            </section>

            {/* Company Boilerplate */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Company Boilerplate</h2>
              <div className="bg-[#1F2937] rounded-2xl p-8 border border-[#374151]">
                <p className="text-[#D1D5DB] leading-relaxed mb-4">
                  Zaza Technologies baut sichere, empathische KI-Tools für Pädagog:innen. Unsere Haupt-App Zaza Draft hilft
                  Lehrkräften, jede Woche Stunden bei Elternkommunikation zu sparen - mit halluzinationsbewusster KI. Mit Sitz in
                  Deutschland ist Zaza lehrerzentriert, DSGVO-orientiert und wird weltweit von Schulen genutzt.
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  Für Presseanfragen oder Interviews kontaktieren Sie{" "}
                  <a href="mailto:press@zazatechnologies.com" className="text-[#A78BFA] hover:underline">
                    press@zazatechnologies.com
                  </a>
                </p>
              </div>
            </section>

            {/* Testimonials / Social Proof */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Stimmen von Lehrkräften</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { quote: "Draft gibt mir Abende zurück - Mails dauern jetzt Minuten, nicht Stunden.", name: "Sarah L., Mittelstufenlehrerin" },
                  { quote: "Ton und Klarheit passen sofort. Eltern reagieren entspannter.", name: "Mark R., Abteilungsleiter" },
                  { quote: "Endlich KI, die nicht generisch klingt. Meine Stimme bleibt erhalten.", name: "Emma K., Grundschule" },
                ].map((item) => (
                  <div key={item.name} className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 space-y-3">
                    <Quote className="w-5 h-5 text-[#A78BFA]" />
                    <p className="text-[#E5E7EB] leading-relaxed">"{item.quote}"</p>
                    <p className="text-sm text-[#9CA3AF]">{item.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Coverage / Awards */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-[#A78BFA]" />
                <h2 className="text-2xl font-bold text-[#F9FAFB]">Coverage & Awards</h2>
              </div>
              <p className="text-[#9CA3AF] mb-4">Erste Features und Interviews werden derzeit geplant. Medienpartner willkommen.</p>
              <div className="bg-[#111827] border border-dashed border-[#374151] rounded-2xl p-6 text-[#CBD5E1]">
                <p>"First coverage coming soon" - melden Sie sich für exklusive Early-Access-Interviews oder Demos.</p>
              </div>
            </section>

            {/* Founder Bio */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Founder Bio</h2>
              <ExpandableBio
                shortLabel="Kurz-Bio"
                longLabel="Ausführliche Bio"
                shortBio="Greg Blackburn ist Gründer von Zaza Technologies. Mit einem PhD in Professional Education und über 20 Jahren in Learning & Development arbeitet Greg an der Schnittstelle von Bildung, KI und Technologie. Er gründete Zaza, um Lehrkräften Zeit zurückzugeben, Stress zu reduzieren und den Fokus auf das Wesentliche zu legen: unterrichten."
                longBio="Dr. Harvey Gregory Scott Blackburn (Greg) ist Gründer von Zaza Technologies, einem KI-gestützten EdTech-Unternehmen mit Sitz in Deutschland. Greg begann seine Laufbahn im Learning & Development nach einem Diplom in Germanistik und einem MBA an der University of Queensland und promovierte anschlie├ƒend in Professional Education an der City, University of London. Seine Forschung konzentrierte sich auf kritisches Denken und Probleml├Âsen im studierendenzentrierten E-Learning. ├£ber zwei Jahrzehnte leitete er gro├ƒe Lerninitiativen in Hochschule und Wirtschaft, zuletzt als Group Director of Learning bei Communardo. Zaza Technologies spiegelt Gregs Vision wider, sichere, lehrerzentrierte KI-Tools zu bauen, die fundierte Pädagogik mit moderner KI verbinden. Greg lebt in Deutschland und m├Âchte Lehrkräfte weltweit stärken."
              />
            </section>

            {/* FAQ for media */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">FAQ für Medien</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { q: "Was macht Zaza Draft anders?", a: "Halluzinationsbewusste, erklärbare KI, trainiert auf Pädgogik und mit echter Lehrerstimme." },
                  { q: "Wie geht ihr mit Datenschutz um?", a: "EU-Hosting, GDPR-orientiert, keine Trainingsnutzung von Kundendaten, Privacy-by-Design." },
                  { q: "Wer nutzt Zaza?", a: "Lehrkräfte und Schulen (K12), aktuell 500+ Lehrkräfte in 15 Ländern." },
                  { q: "Wie adressiert ihr Bias?", a: "Kuratiertes Prompting, menschliches QA, Monitoring von Fehlverhalten, schnelle Korrekturzyklen." },
                  { q: "Welche Daten verarbeitet Draft?", a: "Textbasierte Kommunikations- und Planungsinhalte; keine vollständigen Schüler-PII erforderlich, sensible Felder optional/pseudonymisiert." },
                  { q: "Wie lange dauert die Einführung?", a: "Self-serve in Minuten; Schul-Deployments mit kurzer Onboarding-Checkliste." },
                  { q: "Bietet ihr Schulungen?", a: "Ja. Live-Workshops, On-Demand-Videos und kurze In-App-Guides." },
                  { q: "Finanzierung?", a: "Bootstrapped; Fokus auf nachhaltigem, nutzerzentriertem Wachstum." },
                  { q: "Kontakt für Interviews?", a: "press@zazatechnologies.com - Antworten binnen 24h; Statements auf Anfrage." },
                ].map((item) => (
                  <div key={item.q} className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
                    <p className="text-sm font-semibold text-[#E5E7EB]">{item.q}</p>
                    <p className="text-sm text-[#CBD5E1] mt-2 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Media Contact */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Pressekontakt</h2>
              <div className="bg-[#1F2937] rounded-2xl p-8 border border-[#374151]">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#A78BFA]" />
                    <div>
                      <p className="text-sm text-[#9CA3AF]">E-Mail</p>
                      <a
                        href="mailto:press@zazatechnologies.com"
                        className="text-[#F9FAFB] hover:text-[#A78BFA] transition-colors"
                      >
                        press@zazatechnologies.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-[#A78BFA]" />
                    <div>
                      <p className="text-sm text-[#9CA3AF]">Website</p>
                      <a
                        href="https://zazatechnologies.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F9FAFB] hover:text-[#A78BFA] transition-colors"
                      >
                        zazatechnologies.com
                      </a>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-white rounded-xl">
                  <Mail className="w-4 h-4 mr-2" />
                  Kontakt aufnehmen
                </Button>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="bg-gradient-to-r from-[#7C3AED]/10 to-[#6366F1]/10 rounded-2xl p-8 border border-[#7C3AED]/20 text-center">
              <p className="text-[#D1D5DB] mb-2">Brauchen Sie etwas anderes?</p>
              <a
                href="mailto:press@zazatechnologies.com"
                className="text-[#A78BFA] hover:text-[#C4B5FD] transition-colors font-medium"
              >
                Kontakt: press@zazatechnologies.com
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
