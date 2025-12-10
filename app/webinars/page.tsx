import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webinare | Zaza Draft",
  description: "Live-Sessions und On-Demand-Webinare rund um Zaza Draft und KI im Unterricht.",
};

export default function WebinarsPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Webinare für Lehrkräfte
        </h1>
        <p className="text-base sm:text-lg text-[rgba(226,232,240,0.9)] max-w-2xl mb-4">
          Hier entstehen Webinare und Live-Sessions zu KI-gestützter
          Elternkommunikation, stressärmeren Zeugnissen und Unterrichtsplanung mit Zaza.
        </p>
        <p className="text-sm text-[rgba(148,163,184,0.9)]">
          Trage dich in die Warteliste ein, um als Erstes über neue Termine informiert
          zu werden.
        </p>
      </section>
    </main>
  );
}
