import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos | Zaza Draft",
  description: "Videos and walkthroughs for Zaza Draft – coming soon.",
};

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Zaza Draft Videos
        </h1>
        <p className="text-base sm:text-lg text-[rgba(226,232,240,0.9)] max-w-2xl">
          Unsere Video-Bibliothek wird gerade überarbeitet. Bald findest du hier
          kurze Walkthroughs, Best Practices und Beispiele direkt aus dem
          Unterrichtsalltag.
        </p>
      </section>
    </main>
  );
}
