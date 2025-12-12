import Link from "next/link"

export { metadata } from "./metadata"

export default function FeaturesDePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-sm uppercase text-[#A78BFA] tracking-[0.3em]">Funktionen</p>
        <h1 className="mt-4 text-4xl font-bold">Funktionen</h1>
        <div className="mt-8 space-y-4 text-lg text-[#E5E7EB]">
          <p>Diese Seite wird derzeit aktualisiert.</p>
          <p>Eine vollständige Übersicht der Funktionen von Zaza Draft folgt in Kürze.</p>
          <p>Bis dahin finden Sie alle Funktionen auf der englischen Seite.</p>
        </div>
        <div className="mt-10">
          <Link
            href="/features"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A78BFA] hover:text-white transition-colors"
          >
            Zur englischen Feature-Übersicht
          </Link>
        </div>
      </div>
    </main>
  )
}
