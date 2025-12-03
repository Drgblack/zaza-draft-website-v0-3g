import type { Metadata } from "next"
import { AboutSidebar } from "@/components/about-sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AssetCard } from "@/components/asset-card"
import { ExpandableBio } from "@/components/expandable-bio"
import { Button } from "@/components/ui/button"
import { Mail, ExternalLink, Download, Sparkles, Quote, FileText, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Press Kit - Zaza Draft",
  description:
    "Download logos, screenshots, brand guidelines, and founder bio for Zaza Draft. Media resources for journalists and partners.",
}

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F9FAFB]">
      <div className="max-w-screen-2xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          <aside className="hidden lg:block">
            <AboutSidebar />
          </aside>

          <main>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Press Kit", href: "/about/press" },
              ]}
            />

            {/* Hero */}
            <div className="mt-8 mb-16 bg-gradient-to-r from-[#111827] to-[#0F172A] rounded-3xl border border-[#1F2937] p-8 md:p-10">
              <p className="text-sm font-semibold text-[#A78BFA] uppercase tracking-[0.2em] mb-3">Press Kit</p>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] leading-tight">
                    Alles für Ihre Berichterstattung über Zaza Draft
                  </h1>
                  <p className="text-lg text-[#CBD5E1] max-w-3xl">
                    Logos, Screenshots, Brand-Guidelines, Fact Sheet, Gründer-Bio, Kontakt und mehr – pressefertig, klar beschriftet und konsistent gestaltet.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white">
                      <a href="/press-kit/zaza-draft-press-kit.zip" download>
                        <Download className="w-4 h-4 mr-2" />
                        Alle Assets herunterladen (ZIP)
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-[#7C3AED]/60 text-[#F9FAFB]">
                      <a href="mailto:press@zazatechnologies.com">Interview anfragen</a>
                    </Button>
                  </div>
                </div>
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 min-w-[280px] shadow-lg">
                  <div className="flex items-center gap-3 text-[#E5E7EB] mb-3">
                    <Sparkles className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm uppercase tracking-[0.18em] text-[#A78BFA]">Fact Sheet</span>
                  </div>
                  <dl className="space-y-2 text-sm text-[#CBD5E1]">
                    <div className="flex justify-between gap-4"><dt className="text-[#9CA3AF]">Gegründet</dt><dd>2025</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#9CA3AF]">HQ</dt><dd>Dresden, Deutschland</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#9CA3AF]">Mission</dt><dd>KI, die Lehrkräften Zeit zurückgibt</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#9CA3AF]">Zielgruppe</dt><dd>Lehrkräfte & Schulen (K12)</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#9CA3AF]">Funding</dt><dd>Bootstrapped</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#9CA3AF]">Traktion</dt><dd>500+ Lehrkräfte, 15 Länder</dd></div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Outcomes at a glance */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Outcomes at a glance</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Zeitersparnis", value: "10+ Std./Woche", detail: "Durchschnittliche Zeit, die Lehrkräfte mit Draft zurückgewinnen" },
                  { label: "Lehrkräfte", value: "500+", detail: "Aktive Nutzer aus 15 Ländern" },
                  { label: "Verlässlichkeit", value: "Halluzinationsarm", detail: "Built-in Guardrails & erklärbare Outputs" },
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
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-[#F9FAFB]">Brand Assets</h2>
                <Button asChild variant="outline" className="rounded-full border-[#7C3AED]/60 text-[#F9FAFB]">
                  <a href="/press-kit/zaza-draft-press-kit.zip" download>
                    <Download className="w-4 h-4 mr-2" />
                    Alle Assets (ZIP)
                  </a>
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AssetCard
                  title="Primärlogo (RGB, PNG)"
                  description="Farblogo auf hellem Hintergrund, transparent."
                  previewImage="/press-kit/logo-light-preview.jpg"
                  downloadUrl="/press-kit/zaza-draft-logo-primary.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Dunkel-Hintergrund Logo"
                  description="Farblogo für dunkle Flächen, transparent."
                  previewImage="/press-kit/logo-dark-preview.jpg"
                  downloadUrl="/press-kit/zaza-draft-logo-dark.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Monochrom (SVG)"
                  description="Einfarbig für Druck & Prägung."
                  previewImage="/press-kit/logo-mono-preview.jpg"
                  downloadUrl="/press-kit/zaza-draft-logo-mono.svg"
                  downloadLabel="Download SVG"
                />
                <AssetCard
                  title="App Icon"
                  description="iOS/Android App Icon, 1024x1024."
                  previewImage="/press-kit/logo-dark-preview.jpg"
                  downloadUrl="/press-kit/zaza-draft-app-icon.png"
                  downloadLabel="Download PNG"
                />
              </div>
            </section>

            {/* Product & Context Screens */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Screenshots & Kontextbilder</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AssetCard
                  title="Hero Screenshot"
                  description="Main product hero image showing the Zaza Draft interface."
                  previewImage="/press-kit/screenshot-hero-preview.jpg"
                  downloadUrl="/press-kit/screenshot-hero.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Dashboard View"
                  description="Teacher dashboard with recent comments and quick actions."
                  previewImage="/press-kit/screenshot-dashboard-preview.jpg"
                  downloadUrl="/press-kit/screenshot-dashboard.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Draft Editor"
                  description="Comment drafting interface with AI suggestions and tone controls."
                  previewImage="/press-kit/screenshot-editor-preview.jpg"
                  downloadUrl="/press-kit/screenshot-editor.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Safety Guardrails"
                  description="Hallucination prevention and translation safety features in action."
                  previewImage="/press-kit/screenshot-safety-preview.jpg"
                  downloadUrl="/press-kit/screenshot-safety.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Kontext: Lehrkraft im Klassenzimmer"
                  description="Realistische Szene mit Zaza Draft im Unterrichtskontext."
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
                  description="Logo-Spacings, Farbwerte, Typo-Hierarchien, Do's & Don'ts, Anwendungsbeispiele."
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
                  Zaza Technologies builds safe, empathetic AI tools for educators. Our flagship app, Zaza Draft, helps
                  teachers save hours each week on parent communications with hallucination-safe AI. Headquartered in
                  Germany, Zaza is teacher-first, GDPR-compliant, and trusted by schools worldwide.
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  For media inquiries or interviews, contact{" "}
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
                  { quote: "Draft gibt mir Abende zurück – Mails dauern jetzt Minuten, nicht Stunden.", name: "Sarah L., Mittelstufenlehrerin" },
                  { quote: "Ton und Klarheit passen sofort. Eltern reagieren entspannter.", name: "Mark R., Abteilungsleiter" },
                  { quote: "Endlich KI, die nicht generisch klingt. Meine Stimme bleibt erhalten.", name: "Emma K., Grundschule" },
                ].map((item) => (
                  <div key={item.name} className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 space-y-3">
                    <Quote className="w-5 h-5 text-[#A78BFA]" />
                    <p className="text-[#E5E7EB] leading-relaxed">“{item.quote}”</p>
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
                <p>“First coverage coming soon” – melden Sie sich für exklusive Early-Access-Interviews oder Demos.</p>
              </div>
            </section>

            {/* Founder Bio */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Founder Bio</h2>
              <ExpandableBio
                shortLabel="Short Bio"
                longLabel="Long Bio"
                shortBio="Greg Blackburn is the founder of Zaza Technologies. With a PhD in Professional Education and 20+ years in Learning & Development, Greg has worked at the intersection of education, AI, and technology. He founded Zaza to help teachers thrive by saving time, reducing stress, and focusing on what matters most: teaching."
                longBio="Dr. Harvey Gregory Scott Blackburn (Greg) is the founder of Zaza Technologies, an AI-powered EdTech company based in Germany. Greg began his career in Learning & Development after completing a Diploma in German and an MBA from the University of Queensland, later earning a PhD in Professional Education from City, University of London. His research focused on critical thinking and problem-solving in student-centred eLearning. Over two decades, he has led major learning initiatives in both higher education and corporate environments, most recently as Group Director of Learning at Communardo. Zaza Technologies reflects Greg's vision of building safe, teacher-first AI tools that combine sound pedagogy with cutting-edge AI. Greg lives in Germany with his family and is passionate about empowering educators through technology."
              />
            </section>

            {/* FAQ for media */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">FAQ für Medien</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { q: "Was macht Zaza Draft anders?", a: "Halluzinationsarme, erklärbare KI, die auf Pädagogik trainiert ist und Lehrerstimme bewahrt." },
                  { q: "Wie geht ihr mit Datenschutz um?", a: "EU-Hosting, GDPR-orientiert, keine Trainingsnutzung von Kundendaten, Privacy-by-Design." },
                  { q: "Wer nutzt Zaza?", a: "Lehrkräfte und Schulen (K12), aktuell 500+ Lehrkräfte in 15 Ländern." },
                  { q: "Wie wird Bias adressiert?", a: "Kuratiertes Prompting, menschliches QA, Monitoring von Fehlverhalten, schnelle Korrekturzyklen." },
                  { q: "Welche Daten verarbeitet Draft?", a: "Textbasierte Kommunikations- und Planungsinhalte; keine Schüler-Personendaten erforderlich, sensible Felder optional pseudonymisiert." },
                  { q: "Wie lange dauert die Einführung?", a: "Self-serve in Minuten; Schul-Deployments mit Onboarding-Checkliste in Tagen." },
                  { q: "Bietet ihr Schulungen?", a: "Ja. Live-Workshops, On-Demand-Videos und kurze In-App-Guides." },
                  { q: "Finanzierung?", a: "Bootstrapped; Fokus auf nachhaltigem, nutzerzentriertem Wachstum." },
                  { q: "Kontakt für Interviews?", a: "press@zazatechnologies.com – Antworten binnen 24h; Kommentar-Statements auf Anfrage." },
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
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Media Contact</h2>
              <div className="bg-[#1F2937] rounded-2xl p-8 border border-[#374151]">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#A78BFA]" />
                    <div>
                      <p className="text-sm text-[#9CA3AF]">Email</p>
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
                  Get in Touch
                </Button>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="bg-gradient-to-r from-[#7C3AED]/10 to-[#6366F1]/10 rounded-2xl p-8 border border-[#7C3AED]/20 text-center">
              <p className="text-[#D1D5DB] mb-2">Need something else?</p>
              <a
                href="mailto:press@zazatechnologies.com"
                className="text-[#A78BFA] hover:text-[#C4B5FD] transition-colors font-medium"
              >
                Contact press@zazatechnologies.com
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
import type { Metadata } from "next"


