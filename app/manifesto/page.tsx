import type { Metadata } from "next";

const canonicalUrl = "https://zazadraft.com/manifesto";

export const metadata: Metadata = {
  title: "The Zaza Manifesto | Zaza Technologies",
  description:
    "The official Zaza Manifesto: our foundational commitments for trust, thinking, and wellbeing across every Zaza product.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-GB": canonicalUrl,
      "de-DE": "https://zazadraft.com/de/manifesto",
      "x-default": canonicalUrl,
    },
  },
  openGraph: {
    title: "The Zaza Manifesto | Zaza Technologies",
    description:
      "The official Zaza Manifesto: our foundational commitments for trust, thinking, and wellbeing across every Zaza product.",
    url: canonicalUrl,
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Zaza Manifesto | Zaza Technologies",
    description:
      "The official Zaza Manifesto: our foundational commitments for trust, thinking, and wellbeing across every Zaza product.",
  },
};

function Divider() {
  return <p className="text-center text-slate-500 tracking-[0.3em]">***</p>;
}

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="mb-12 text-lg leading-8 text-slate-300">
          This manifesto defines how Zaza builds AI. It applies across all Zaza
          products and systems. We prioritize trust, thinking, and wellbeing
          over speed, shortcuts, or hype.
        </p>

        <article className="space-y-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">
            The Zaza Manifesto
          </h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              We believe AI should make people more human - not less.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Technology should not replace thinking.
              <br />
              It should protect it.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Education should not be faster at the cost of understanding.
              <br />
              Work should not be more efficient at the cost of wellbeing.
              <br />
              Progress should not be impressive if it isn’t ethical.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              At Zaza, we believe AI has a responsibility - not just a
              capability.
            </p>
          </section>

          <Divider />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              We build AI that respects thinking.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              The world is filling with tools that give answers instantly.
              <br />
              Very few help people learn, reason, or grow.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Zaza exists to change that.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              We design AI that:
            </p>
            <ul className="list-disc space-y-2 pl-7 text-lg leading-8 text-slate-300">
              <li>Encourages reflection before response</li>
              <li>Scaffolds understanding instead of bypassing it</li>
              <li>Strengthens judgment instead of replacing it</li>
            </ul>
            <p className="text-lg leading-8 text-slate-300">
              Whether you are a student, a teacher, a parent, a professional, or
              a creator - Zaza is built to help you think better, not think
              less.
            </p>
          </section>

          <Divider />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              We stand on the side of trust.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Trust is not a feature.
              <br />
              It is a foundation.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Zaza products are built with:
            </p>
            <ul className="list-disc space-y-2 pl-7 text-lg leading-8 text-slate-300">
              <li>Privacy-first architecture</li>
              <li>Clear human review points</li>
              <li>Hallucination-aware safeguards</li>
              <li>Role-based access and consent</li>
              <li>Transparent AI behaviour</li>
            </ul>
            <p className="text-lg leading-8 text-slate-300">
              We do not trade trust for growth.
              <br />
              We do not hide complexity behind magic.
              <br />
              We do not build tools we wouldn’t trust in a classroom, a
              staffroom, or a family home.
            </p>
          </section>

          <Divider />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              We believe education deserves better tools.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Teachers are overwhelmed.
              <br />
              Students are under-supported.
              <br />
              Parents are confused.
              <br />
              Institutions are cautious - and rightly so.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Zaza builds tools that:
            </p>
            <ul className="list-disc space-y-2 pl-7 text-lg leading-8 text-slate-300">
              <li>Save teachers time without erasing their voice</li>
              <li>Support students without removing struggle</li>
              <li>Help parents engage without jargon</li>
              <li>Give schools AI they can stand behind publicly</li>
            </ul>
            <p className="text-lg leading-8 text-slate-300">
              We don’t ask education to adapt to AI.
              <br />
              We adapt AI to education.
            </p>
          </section>

          <Divider />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              We design for wellbeing, not burnout.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Productivity without humanity is just exhaustion at scale.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Zaza tools are designed to:
            </p>
            <ul className="list-disc space-y-2 pl-7 text-lg leading-8 text-slate-300">
              <li>Reduce emotional labour</li>
              <li>Lower anxiety, not increase it</li>
              <li>Build confidence through use</li>
              <li>Reward consistency, not pressure</li>
              <li>Celebrate progress, not perfection</li>
            </ul>
            <p className="text-lg leading-8 text-slate-300">
              We believe the best tools feel supportive - not demanding.
            </p>
          </section>

          <Divider />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              We believe systems matter more than features.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Zaza is not a collection of disconnected apps.
              <br />
              It is an ecosystem.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Our intelligence layer learns patterns, not people’s secrets.
              <br />
              Our products talk to each other without leaking trust.
              <br />
              Our design compounds value instead of creating noise.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Every Zaza product should feel:
            </p>
            <ul className="list-disc space-y-2 pl-7 text-lg leading-8 text-slate-300">
              <li>Familiar, not fragmented</li>
              <li>Supportive, not intrusive</li>
              <li>Purposeful, not bloated</li>
            </ul>
          </section>

          <Divider />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              We grow through value, not manipulation.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              We believe in virality - but not dark patterns.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Zaza grows when people:
            </p>
            <ul className="list-disc space-y-2 pl-7 text-lg leading-8 text-slate-300">
              <li>Share progress they’re proud of</li>
              <li>Recommend tools that genuinely helped them</li>
              <li>Invite others because it feels good to do so</li>
            </ul>
            <p className="text-lg leading-8 text-slate-300">
              No tricks.
              <br />
              No addiction loops.
              <br />
              No exploiting attention.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              If something spreads, it should be worth spreading.
            </p>
          </section>

          <Divider />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              We are building for the long term.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Zaza is not built for trends.
              <br />
              It is built for classrooms, careers, families, and futures.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              We expect AI to change everything -
              <br />
              which is exactly why how we build matters.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Our guiding question is simple:
            </p>
            <p className="text-lg leading-8 text-slate-300">
              “Does this help someone think, grow, or feel supported - or does
              it just look clever?”
            </p>
            <p className="text-lg leading-8 text-slate-300">
              If it’s the latter, we redesign it.
            </p>
          </section>

          <Divider />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100">
              This is what Zaza stands for.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Thoughtful AI.
              <br />
              Ethical growth.
              <br />
              Human-centred design.
              <br />
              Trust without compromise.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              We are building tools people can rely on -
              <br />
              not just today, but years from now.
            </p>
            <p className="text-lg leading-8 text-slate-300">This is Zaza.</p>
          </section>
        </article>

        <p className="mt-12 text-base leading-7 text-slate-300">
          This manifesto guides every Zaza product, decision, and design choice.
        </p>
      </main>
    </div>
  );
}
