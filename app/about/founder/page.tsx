"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";

export default function FounderPage() {
  const { lang } = useLanguage?.() ?? { lang: "en" as "en" | "de" };

  // NOTE: Point this to your actual photo. If it doesn't exist yet,
  // drop a file at /public/images/founder-greg.jpg or update this path.
  const photoSrc = "/images/founder-greg.jpg";

  const copy = {
    en: {
      heroTitle: "Meet the Founder Building AI that Serves Teachers",
      heroTagline:
        "Zaza helps teachers thrive. Dr. Greg Blackburn spent two decades in Learning & Development before founding Zaza in 2025 to build teacher-first AI. Not a former teacher – a learning scientist and operator focused on giving teachers their time back.",
      badgeTitle: "Dr. Greg Blackburn",
      badgeSub: "Founder & CEO • PhD in Professional Education • EdTech Builder",

      journeyKicker: "The Journey",
      journeySub: "From paint brushes in Tasmania to AI founder.",
      p1: `I began my working life in Hobart as a painter and decorator while figuring out what came next. My dad owned a local paint factory — Tas Paints — so brushes, colour charts and hard work were part of daily life. That start taught me care for detail, resilience, and what it feels like when expectations are set low. I moved into TAFE, completed an apprenticeship, then made a decision that changed everything — go to university and rebuild my future from first principles.`,
      p2: `I studied Administration, Information Systems and German at the University of Tasmania, earned First Class Honours in Information Systems, worked at Telstra, and completed an MBA at the University of Queensland. My research pulled me deeper into learning science — critical thinking and problem-solving in student-centred e-learning — and I later earned a PhD by publication from City, University of London.`,
      p3: `I was never a classroom teacher. But much of my family and many close friends are — my sister, cousins, an aunty and uncle, and colleagues who teach every day. I've listened to their stories and seen the workload first-hand: parent emails, report writing, grading, and admin that never ends. The gap was obvious — tools often created more work than they removed.`,
      p4: `In 2025 I founded Zaza Technologies with a simple mission: build AI that respects teacher expertise, is safe and explainable, and gives time back. Zaza is hallucination-aware, privacy-first, and designed with educators, not around them.`,
      p5: `Today our tools help teachers reduce repetitive admin and focus on the moments that matter with students. We are just getting started.`,
      quote: `Every teacher deserves tools that respect their craft and give them time to do what they do best — teach.`,

      whyTitle: "Why I Built Zaza",
      whySub: "Three principles that guide everything we do.",
      card1H: "For Teachers — With Teachers",
      card1P:
        "Co-designed with educators, validated in real workflows, refined by real feedback.",
      card2H: "Boutique — Not Big Tech",
      card2P:
        "We serve one audience with care — teachers. Quality over scale, usefulness over hype.",
      card3H: "Safety and Trust",
      card3P:
        "Privacy-first, school-ready safeguards, and explainable AI so teachers can trust the output.",

      noteTitle: "A Personal Note",
      noteP1:
        "If you are a teacher, you have probably tried tools that promised hours back and delivered another chore. I understand the scepticism. Zaza is built to be different. We will keep listening, keep improving, and keep choosing clarity and usefulness over noise.",
      noteP2:
        "My door is open. If you have feedback or want to help shape what teachers need next, please reach out.",
      signName: "Greg",
      signSub: "Dr. Greg Blackburn • Founder & CEO • Zaza Technologies",
    },
    de: {
      heroTitle: "Der Gründer, der KI für Lehrkräfte baut",
      heroTagline:
        "Zaza hilft Lehrkräften zu gedeihen. Dr. Greg Blackburn arbeitete zwei Jahrzehnte im Learning & Development und gründete 2025 Zaza, um konsequent lehrkraftzentrierte KI zu bauen. Er war kein Lehrer – sondern Lernwissenschaftler und Macher mit dem Ziel, Lehrkräften Zeit zurückzugeben.",
      badgeTitle: "Dr. Greg Blackburn",
      badgeSub: "Gründer & CEO • PhD Professional Education • EdTech-Builder",

      journeyKicker: "Die Reise",
      journeySub: "Vom Malerpinsel in Tasmanien zum KI-Gründer.",
      p1: `Mein Berufsleben begann in Hobart als Maler und Lackierer. Mein Vater führte eine lokale Farbenfabrik — Tas Paints —, daher waren Pinsel, Farbkarten und Anpacken Alltag. Diese Zeit lehrte mich Detailtreue und Durchhaltevermögen. Über TAFE und eine Ausbildung ging es weiter an die Universität — eine Entscheidung, die alles veränderte.`,
      p2: `Ich studierte Administration, Wirtschaftsinformatik und Deutsch an der University of Tasmania, erhielt First Class Honours in Information Systems, arbeitete bei Telstra und schloss einen MBA an der University of Queensland ab. In der Forschung konzentrierte ich mich auf kritisches Denken und Problemlösen im studierendenzentrierten E-Learning und promovierte später per Veröffentlichung an der City, University of London.`,
      p3: `Ich war nie Lehrer. Aber viele in meiner Familie und in meinem Freundeskreis sind es — meine Schwester, Cousins, Tante und Onkel sowie Kolleginnen und Kollegen. Ihre Geschichten und die reale Arbeitslast kenne ich gut: Elternkommunikation, Berichte, Bewertung, Administration ohne Ende. Zu oft erzeugten Tools mehr Arbeit, als sie sparten.`,
      p4: `2025 gründete ich Zaza Technologies mit einer klaren Mission: KI bauen, die die Expertise von Lehrkräften respektiert, sicher und erklärbar ist und Zeit zurückgibt. Zaza ist halluzinationsbewusst, datenschutzorientiert und gemeinsam mit Pädagoginnen und Pädagogen entwickelt.`,
      p5: `Heute helfen unsere Tools, wiederkehrende Administration zu reduzieren und den Fokus auf die Momente mit Schülerinnen und Schülern zu legen, die wirklich zählen. Wir stehen erst am Anfang.`,
      quote:
        "Jede Lehrkraft verdient Werkzeuge, die das Handwerk respektieren und Zeit für das Wesentliche schaffen — das Unterrichten.",

      whyTitle: "Warum ich Zaza gegründet habe",
      whySub: "Drei Prinzipien leiten unsere Arbeit.",
      card1H: "Für Lehrkräfte — mit Lehrkräften",
      card1P:
        "Gemeinsam mit Pädagoginnen und Pädagogen entwickelt, in realen Workflows geprüft und iterativ verbessert.",
      card2H: "Boutique statt Big Tech",
      card2P:
        "Wir bedienen eine Zielgruppe mit Sorgfalt — Lehrkräfte. Qualität vor Masse, Nutzen vor Hype.",
      card3H: "Sicherheit & Vertrauen",
      card3P:
        "Datenschutz zuerst, schulreife Schutzmechanismen und erklärbare KI — damit Ergebnisse vertrauenswürdig sind.",

      noteTitle: "Ein persönliches Wort",
      noteP1:
        "Viele Tools versprechen Zeitgewinn und schaffen neue Aufgaben. Skepsis ist verständlich. Zaza will anders sein — wir hören zu, verbessern kontinuierlich und stellen Klarheit und Nutzen in den Vordergrund.",
      noteP2:
        "Mein Postfach ist offen. Wenn Sie Feedback haben oder mitgestalten möchten, melden Sie sich gern.",
      signName: "Greg",
      signSub: "Dr. Greg Blackburn • Gründer & CEO • Zaza Technologies",
    },
  } as const;

  const t = copy[lang] ?? copy.en;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full ring-4 ring-purple-500/30">
            <Image
              src={photoSrc}
              alt="Dr. Greg Blackburn"
              width={256}
              height={256}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.heroTitle}
          </h1>
          <p className="mt-3 text-muted-foreground">{t.heroTagline}</p>

          <div className="mt-6 inline-flex flex-col items-center rounded-xl border border-border/60 bg-card px-5 py-4 text-sm">
            <p className="font-medium">{t.badgeTitle}</p>
            <p className="text-muted-foreground">{t.badgeSub}</p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto grid gap-10 px-4 py-14 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-4">
            <h2 className="text-xl font-semibold">{t.journeyKicker}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.journeySub}</p>
          </div>

          <div className="sm:col-span-8 space-y-5 leading-relaxed text-muted-foreground">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
            <p>{t.p4}</p>
            <p>{t.p5}</p>
            <blockquote className="mt-6 border-l-4 border-purple-400/60 pl-4 italic text-foreground">
              {t.quote}
            </blockquote>
          </div>
        </div>
      </section>

      {/* Why I Built Zaza */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold">{t.whyTitle}</h2>
          <p className="mt-2 text-muted-foreground">{t.whySub}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">{t.card1H}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.card1P}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">{t.card2H}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.card2P}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-medium">{t.card3H}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.card3P}</p>
          </div>
        </div>
      </section>

      {/* Personal Note */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold">{t.noteTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t.noteP1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.noteP2}</p>

            <div className="mt-8 rounded-xl border border-border/60 bg-card p-5">
              <p className="font-medium">{t.signName}</p>
              <p className="text-sm text-muted-foreground">{t.signSub}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
