"use client";

import { useLanguage } from "@/lib/i18n/language-context"

export function PrivacyClient() {
  const { language } = useLanguage()
  const isGerman = language === "de"

  const content = isGerman ? contentDE : contentEN

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: isGerman ? "Datenschutz | Zaza Draft" : "Privacy Policy | Zaza Draft",
            description: isGerman
              ? "Wie Zaza Draft personenbezogene Daten verarbeitet und schÃƒÂ¼tzt. DSGVO-konforme Richtlinie fÃƒÂ¼r LehrkrÃƒÂ¤fte und Schulen."
              : "How Zaza Draft collects, uses, and protects your data. GDPR-ready policy for teachers, schools, and partners.",
          }),
        }}
      />

      <div className="min-h-screen bg-[#0A0F1E]">
        {/* Hero */}
        <section className="border-b border-white/5 bg-gradient-to-b from-[#0A0F1E] to-[#111827] pt-[max(1.25rem,env(safe-area-inset-top))] md:pt-10 lg:pt-12 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{content.hero.title}</h1>
              <p className="text-lg text-[#D1D5DB] leading-relaxed mb-4">{content.hero.intro}</p>
              <p className="text-sm text-[#9CA3AF]">{content.hero.lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <nav className="bg-[#111827] border border-white/5 rounded-lg p-6">
                  <h2 className="text-sm font-semibold text-white mb-4">{content.onThisPage}</h2>
                  <ul className="space-y-2">
                    {content.sections.map((section, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i + 1}`}
                          className="text-sm text-[#9CA3AF] hover:text-white transition-colors block py-1"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="lg:col-span-9">
              <div className="prose prose-invert prose-lg max-w-none">
                {content.sections.map((section, i) => (
                  <section key={i} id={`section-${i + 1}`} className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                    <div className="text-[#D1D5DB] leading-relaxed space-y-4">
                      {section.content.map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="mt-12 p-6 bg-[#111827] border border-white/5 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">{content.contactCta.title}</h3>
                <p className="text-[#D1D5DB] mb-4">{content.contactCta.text}</p>
                <a
                  href="mailto:help@zazatechnologies.com"
                  className="inline-flex items-center text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors"
                >
                  help@zazatechnologies.com
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

// English Content
const contentEN = {
  hero: {
    title: "Privacy Policy",
    intro:
      'This policy explains how Zaza Technologies ("we", "us") processes personal data for Zaza Draft and related services. It covers what we collect, why, how long we keep it, who we share it with, and your rights under the UK/EU GDPR.',
    lastUpdated: "Last updated: 12 October 2025",
  },
  onThisPage: "On this page",
  sections: [
    {
      title: "Who we are",
      content: [
        'Zaza Draft is a product of Zaza Technologies ("Zaza", "we", "us"). We build tools to help teachers write clear, compassionate parent messages and report comments efficiently.',
        "Controller: Zaza Technologies",
        "Contact: help@zazatechnologies.com",
      ],
    },
    {
      title: "What this policy covers",
      content: [
        "This policy applies to zaza-draft.com and related sites/apps, including marketing pages, in-product experiences, and support channels.",
      ],
    },
    {
      title: "Data we collect",
      content: [
        "Account & identity: name, email, role, school name (optional), language, authentication IDs.",
        "Usage: pages visited, features used, device/browser information, approximate location (from IP).",
        "Content you provide: prompts, text pasted/typed, message templates, saved resources.",
        "Support: messages you send to our help desk, bug reports, feedback.",
        "Payments: handled by our payment provider; we do not store full card details on our servers.",
      ],
    },
    {
      title: "How we use your data",
      content: [
        "Provide and improve Zaza Draft features.",
        "Personalise the product (e.g., language, recently used templates).",
        "Prevent abuse and ensure safety (rate limits, anomaly detection).",
        "Communicate with you (service emails, updates, support).",
        "Comply with legal obligations and enforce terms.",
      ],
    },
    {
      title: "Legal bases (GDPR)",
      content: [
        "We rely on one or more of: contract (to deliver the service), legitimate interests (product safety, analytics, improvement), consent (optional marketing and certain cookies), and legal obligation.",
      ],
    },
    {
      title: "AI & subprocessors",
      content: [
        "To generate and improve writing assistance, we use reputable AI providers and infrastructure partners as processors. We restrict data sharing to what is necessary to provide the service. Examples include:",
        "Model providers (e.g., OpenAI, Anthropic): prompt/response processing.",
        "Hosting & infrastructure (e.g., cloud and CDN providers).",
        "Auth & database (e.g., managed identity, storage, and logging).",
        "Email (e.g., Brevo) for transactional messages.",
        "We do not sell personal data. We use safeguards such as DPAs and, where needed, Standard Contractual Clauses.",
      ],
    },
    {
      title: "Cookies & analytics",
      content: [
        "We use essential cookies for login and security, and (with consent where required) analytics to understand usage and improve the product. You can manage non-essential cookies via our cookie banner or browser settings.",
      ],
    },
    {
      title: "Data sharing & international transfers",
      content: [
        "We may share data with subprocessors under contract, professional advisers, or if required by law. When data is transferred outside the UK/EU, we rely on approved safeguards (e.g., SCCs).",
      ],
    },
    {
      title: "Data retention",
      content: [
        "We keep personal data for as long as necessary to provide the service and meet legal, accounting, or reporting requirements. You can request deletion of your account data (see Your rights).",
      ],
    },
    {
      title: "Security",
      content: [
        "We use industry-standard security measures, encryption in transit, access controls, and regular reviews. No method is 100% secure; please keep your credentials confidential.",
      ],
    },
    {
      title: "Your rights",
      content: [
        "Under UK/EU GDPR you can request access, correction, deletion, restriction, portability, and object to certain processing. You can also withdraw consent where we rely on consent.",
        "Contact help@zazatechnologies.com to exercise rights. You may lodge a complaint with your local data authority.",
      ],
    },
    {
      title: "Children",
      content: [
        "Zaza Draft is built for educators. It is not directed to children. Please do not submit children's personal data.",
      ],
    },
    {
      title: "Changes to this policy",
      content: ['We may update this policy. We will post changes here and adjust the "Last updated" date.'],
    },
    {
      title: "Contact us",
      content: ["Questions or requests: help@zazatechnologies.com"],
    },
  ],
  contactCta: {
    title: "Questions about your data?",
    text: "Contact our team for any privacy-related questions or to exercise your rights.",
  },
}

// German Content
const contentDE = {
  hero: {
    title: "Datenschutzrichtlinie",
    intro:
      'Diese Richtlinie erklÃƒÂ¤rt, wie Zaza Technologies (Ã¢â‚¬Å¾wir") personenbezogene Daten fÃƒÂ¼r Zaza Draft und verbundene Dienste verarbeitet. Sie beschreibt, welche Daten wir erheben, warum, wie lange wir sie speichern, mit wem wir sie teilen und welche Rechte Sie nach der EU/UK-DSGVO haben.',
    lastUpdated: "Zuletzt aktualisiert: 12. Oktober 2025",
  },
  onThisPage: "Auf dieser Seite",
  sections: [
    {
      title: "Wer wir sind",
      content: [
        "Zaza Draft ist ein Produkt von Zaza Technologies. Verantwortlicher: Zaza Technologies.",
        "Kontakt: help@zazatechnologies.com",
      ],
    },
    {
      title: "Geltungsbereich",
      content: [
        "Gilt fÃƒÂ¼r zaza-draft.com und verbundene Websites/Apps, einschlieÃƒÅ¸lich Marketing-Seiten, Produktbereiche und Support.",
      ],
    },
    {
      title: "Welche Daten wir erheben",
      content: [
        "Konto- und IdentitÃƒÂ¤tsdaten: Name, E-Mail, Rolle, Schulname (optional), Sprache, Authentifizierungs-IDs.",
        "Nutzungsdaten: besuchte Seiten, genutzte Funktionen, GerÃƒÂ¤te-/Browser-Informationen, ungefÃƒÂ¤hrer Standort (aus IP).",
        "Von Ihnen eingegebene Inhalte: Prompts, eingefÃƒÂ¼gter/getippter Text, Nachrichtenvorlagen, gespeicherte Ressourcen.",
        "Support: Nachrichten an unseren Helpdesk, Fehlerberichte, Feedback.",
        "Zahlungsabwicklung: erfolgt ÃƒÂ¼ber einen Zahlungsdienstleister; wir speichern keine vollstÃƒÂ¤ndigen Kartendaten auf unseren Servern.",
      ],
    },
    {
      title: "Wie wir Daten nutzen",
      content: [
        "Bereitstellung und Verbesserung der Zaza Draft-Funktionen.",
        "Personalisierung des Produkts (z. B. Sprache, zuletzt verwendete Vorlagen).",
        "Sicherheit und Missbrauchsvermeidung (Rate Limits, Anomalieerkennung).",
        "Kommunikation mit Ihnen (Service-E-Mails, Updates, Support).",
        "ErfÃƒÂ¼llung gesetzlicher Pflichten und Durchsetzung der Nutzungsbedingungen.",
      ],
    },
    {
      title: "Rechtsgrundlagen (DSGVO)",
      content: [
        "Wir stÃƒÂ¼tzen uns auf eine oder mehrere der folgenden Grundlagen: VertragserfÃƒÂ¼llung (zur Bereitstellung des Dienstes), berechtigte Interessen (Produktsicherheit, Analyse, Verbesserung), Einwilligung (optionales Marketing und bestimmte Cookies) und gesetzliche Verpflichtung.",
      ],
    },
    {
      title: "KI & Auftragsverarbeiter",
      content: [
        "Zur Generierung und Verbesserung der Schreibhilfe nutzen wir seriÃƒÂ¶se KI-Anbieter und Infrastrukturpartner als Auftragsverarbeiter. Wir beschrÃƒÂ¤nken die Datenweitergabe auf das zur Bereitstellung des Dienstes Notwendige. Beispiele:",
        "Modellanbieter (z. B. OpenAI, Anthropic): Prompt-/Response-Verarbeitung.",
        "Hosting & Infrastruktur (z. B. Cloud- und CDN-Anbieter).",
        "Auth & Datenbank (z. B. verwaltete IdentitÃƒÂ¤t, Speicherung und Protokollierung).",
        "E-Mail (z. B. Brevo) fÃƒÂ¼r Transaktionsnachrichten.",
        "Wir verkaufen keine personenbezogenen Daten. Wir nutzen SchutzmaÃƒÅ¸nahmen wie AV-VertrÃƒÂ¤ge und, wo erforderlich, Standardvertragsklauseln.",
      ],
    },
    {
      title: "Cookies & Analyse",
      content: [
        "Wir verwenden unbedingt erforderliche Cookies fÃƒÂ¼r Login und Sicherheit sowie (mit Einwilligung, wo erforderlich) Analyse-Cookies, um die Nutzung zu verstehen und das Produkt zu verbessern. Sie kÃƒÂ¶nnen nicht erforderliche Cookies ÃƒÂ¼ber unser Cookie-Banner oder Ihre Browser-Einstellungen verwalten.",
      ],
    },
    {
      title: "Weitergabe & ÃƒÅ“bermittlungen",
      content: [
        "Wir kÃƒÂ¶nnen Daten an Auftragsverarbeiter unter Vertrag, professionelle Berater oder wenn rechtlich erforderlich weitergeben. Bei DatenÃƒÂ¼bermittlungen auÃƒÅ¸erhalb der UK/EU nutzen wir geeignete Garantien (z. B. SCCs).",
      ],
    },
    {
      title: "Aufbewahrung",
      content: [
        "Wir speichern personenbezogene Daten nur so lange wie nÃƒÂ¶tig, um den Dienst bereitzustellen und gesetzliche, buchhalterische oder Berichtspflichten zu erfÃƒÂ¼llen. Sie kÃƒÂ¶nnen die LÃƒÂ¶schung Ihrer Kontodaten beantragen (siehe Ihre Rechte).",
      ],
    },
    {
      title: "Sicherheit",
      content: [
        "Wir nutzen branchenÃƒÂ¼bliche SicherheitsmaÃƒÅ¸nahmen, VerschlÃƒÂ¼sselung bei der ÃƒÅ“bertragung, Zugriffskontrollen und regelmÃƒÂ¤ÃƒÅ¸ige ÃƒÅ“berprÃƒÂ¼fungen. Keine Methode ist zu 100 % sicher; bitte bewahren Sie Ihre Zugangsdaten vertraulich auf.",
      ],
    },
    {
      title: "Ihre Rechte",
      content: [
        "Nach der UK/EU-DSGVO kÃƒÂ¶nnen Sie Auskunft, Berichtigung, LÃƒÂ¶schung, EinschrÃƒÂ¤nkung, DatenÃƒÂ¼bertragbarkeit beantragen und bestimmten Verarbeitungen widersprechen. Sie kÃƒÂ¶nnen auch Einwilligungen jederzeit widerrufen.",
        "Kontakt: help@zazatechnologies.com. Sie haben das Recht, Beschwerde bei Ihrer ÃƒÂ¶rtlichen DatenschutzbehÃƒÂ¶rde einzulegen.",
      ],
    },
    {
      title: "Kinder",
      content: [
        "Zaza Draft richtet sich an LehrkrÃƒÂ¤fte, nicht an Kinder. Bitte ÃƒÂ¼bermitteln Sie keine personenbezogenen Daten von Kindern.",
      ],
    },
    {
      title: "Ãƒâ€žnderungen",
      content: [
        'Wir kÃƒÂ¶nnen diese Richtlinie aktualisieren. Ãƒâ€žnderungen werden hier verÃƒÂ¶ffentlicht und das Datum "Zuletzt aktualisiert" angepasst.',
      ],
    },
    {
      title: "Kontakt",
      content: ["Fragen oder Anfragen: help@zazatechnologies.com"],
    },
  ],
  contactCta: {
    title: "Fragen zu Ihren Daten?",
    text: "Kontaktieren Sie unser Team bei datenschutzbezogenen Fragen oder zur AusÃƒÂ¼bung Ihrer Rechte.",
  },
}

