import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Zaza Draft (DE)",
  description:
    "Impressum mit den gesetzlichen Angaben zu Zaza Technologies UG (haftungsbeschränkt).",
};

export default function ImpressumPageDe() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Impressum
        </h1>
        <p className="mt-2 text-lg text-slate-400">Angaben gemäß § 5 TMG</p>

        <section className="mt-10 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Unternehmensdaten
          </p>
          <div className="space-y-2 text-slate-200">
            <p>Zaza Technologies UG (haftungsbeschränkt)</p>
            <p>Gumbertstraße 150</p>
            <p>40229 Düsseldorf</p>
            <p>Deutschland</p>
          </div>
          <div className="space-y-2 text-slate-200">
            <p>Handelsregister: [HRB-Nummer eintragen, sobald vorhanden]</p>
            <p>Registergericht: Amtsgericht Düsseldorf</p>
          </div>
          <div className="space-y-2 text-slate-200">
            <p>Vertreten durch den Geschäftsführer:</p>
            <p>Dr. Greg Blackburn</p>
          </div>

          <div className="space-y-2 text-slate-200">
            <p className="font-semibold text-white">Kontakt</p>
            <p>
              E-Mail:{" "}
              <a
                className="text-sky-300 hover:text-sky-200"
                href="mailto:greg@zazatechnologies.com"
              >
                greg@zazatechnologies.com
              </a>
            </p>
          </div>

          <div className="space-y-2 text-slate-200">
            <p className="font-semibold text-white">Umsatzsteuer-ID</p>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz:
              <br />
              [wird nach Vergabe durch das Finanzamt ergänzt]
            </p>
          </div>

          <div className="space-y-2 text-slate-200">
            <p className="font-semibold text-white">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </p>
            <p>Dr. Greg Blackburn</p>
            <p>Gumbertstraße 150</p>
            <p>40229 Düsseldorf</p>
            <p>Deutschland</p>
          </div>
        </section>
      </div>
    </main>
  );
}
