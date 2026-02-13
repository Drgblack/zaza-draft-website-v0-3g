import type { Metadata } from "next";
import Image from "next/image";
import { AboutSidebar } from "@/components/about-sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AssetCard } from "@/components/asset-card";
import { ExpandableBio } from "@/components/expandable-bio";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, Sparkles, Quote, Award } from "lucide-react";

const ogImage = "/press-kit/screenshot-hero-preview.jpg";

export const metadata: Metadata = {
  title: "Press Kit | Zaza Draft media resources",
  description:
    "Everything you need to cover Zaza Draft: logos, screenshots, brand guidelines, fact sheet, founder bio, and press contacts.",
  openGraph: {
    title: "Press Kit | Zaza Draft media resources",
    description:
      "Download logos, screenshots, brand guidelines, and founder bio. Ready-to-use media assets for journalists and partners.",
    url: "https://zazadraft.com/about/press",
    type: "website",
    siteName: "Zaza Draft",
    locale: "en_GB",
    alternateLocale: ["de_DE"],
    images: [{ url: ogImage, alt: "Zaza Draft press kit previews" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit | Zaza Draft",
    description:
      "Logos, screenshots, guidelines, and founder bio for your coverage.",
    images: [ogImage],
  },
  alternates: {
    canonical: "https://zazadraft.com/about/press",
    languages: {
      en: "https://zazadraft.com/about/press",
      de: "https://zazadraft.com/de/about/press",
    },
  },
};

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
            <div className="mt-6 mb-12 bg-gradient-to-r from-[#111827] to-[#0F172A] rounded-3xl border border-[#1F2937] p-8 md:p-10">
              <p className="text-sm font-semibold text-[#A78BFA] uppercase tracking-[0.2em] mb-3">
                Press Kit
              </p>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] leading-tight">
                    Everything press-ready for Zaza Draft
                  </h1>
                  <p className="text-lg text-[#CBD5E1] max-w-3xl">
                    Logos, screenshots, brand guidelines, fact sheet, founder
                    bio, and contact details-clean, current, and ready to use.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="rounded-full border border-white/20 bg-white text-[#111827] hover:bg-[#E5E7EB]"
                      variant="outline"
                    >
                      <a href="mailto:press@zazatechnologies.com">
                        Request interview
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 min-w-[280px] shadow-lg">
                  <div className="flex items-center gap-3 text-[#E5E7EB] mb-3">
                    <Sparkles className="w-5 h-5 text-[#A78BFA]" />
                    <span className="text-sm uppercase tracking-[0.18em] text-[#A78BFA]">
                      Fact Sheet
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[#CBD5E1]">
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Founded</dt>
                      <dd>2025</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Registered office</dt>
                      <dd>
                        Gumbertstraße 150
                        <br />
                        40229 Düsseldorf
                        <br />
                        Deutschland
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Mission</dt>
                      <dd>Teacher-first AI that gives time back</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Audience</dt>
                      <dd>Teachers & schools (K12)</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Funding</dt>
                      <dd>Bootstrapped</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-[#9CA3AF]">Traction</dt>
                      <dd>
                        Private beta with teachers shaping Draft's communication
                        workflows.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Outcomes at a glance */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                Outcomes at a glance
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Time saved",
                    value: "Hours saved each week",
                    detail: "Average time teachers reclaim with Draft",
                  },
                  {
                    label: "Beta community",
                    value: "Pilot educators",
                    detail:
                      "Early adopters shaping calm, professional parent communication.",
                  },
                  {
                    label: "Reliability",
                    value: "Hallucination-aware",
                    detail: "Guardrails and explainable outputs",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5"
                  >
                    <p className="text-sm text-[#9CA3AF]">{item.label}</p>
                    <p className="text-2xl font-semibold text-white">
                      {item.value}
                    </p>
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
                  <h2 className="text-2xl font-bold text-[#F9FAFB]">
                    Brand assets
                  </h2>
                </div>
                <p className="text-sm text-[#CBD5E1] max-w-3xl">
                  These are the official Z icon marks. Use the correct colourway
                  per background, and keep lockups clear and respectful of the
                  brand.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-1">
                <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 space-y-4">
                  <div className="rounded-xl border border-[#1F2937] bg-[#0F172A] p-3">
                    <div className="relative h-32 w-full">
                      <Image
                        src="/press-kit/brand/zaza-z-icon-1024.png"
                        alt="Zaza Z icon - colour"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 80vw, 30vw"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#F9FAFB]">
                      Zaza Z icon - colour
                    </h3>
                    <p className="text-sm text-[#CBD5E1] mt-1">
                      For use on light or neutral backgrounds so the gradient
                      retains the brand depth.
                    </p>
                  </div>
                  <a
                    href="/press-kit/brand/zaza-z-icon-1024.png"
                    download
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-3 py-2 text-sm font-semibold text-white transition-colors hover:from-[#6D28D9] hover:to-[#4F46E5]"
                  >
                    Download PNG
                  </a>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-dashed border-[#374151] bg-[#0F172A] p-4 text-sm text-[#CBD5E1]">
                <p className="font-semibold text-white mb-2">Usage note</p>
                <p>
                  The colour icon is the official mark for light and neutral
                  contexts; keep the mark unaltered.
                </p>
              </div>
            </section>

            {/* Product & Context Screens */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-4">
                Product screenshots
              </h2>
              <p className="text-sm text-[#CBD5E1] max-w-3xl mb-4">
                Product screenshots are available on request.
              </p>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white"
              >
                <a href="mailto:press@zazatechnologies.com">
                  Request screenshots
                </a>
              </Button>
            </section>

            {/* Brand Guidelines */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                Brand Guidelines
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AssetCard
                  title="Brand Guidelines PDF"
                  description="Logo spacing, color values, typography hierarchy, do's & don'ts, usage examples."
                  downloadUrl="/press-kit/zaza-brand-guidelines.pdf"
                  downloadLabel="Download PDF"
                />
              </div>
            </section>

            {/* Company Boilerplate */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                Company Boilerplate
              </h2>
              <div className="bg-[#1F2937] rounded-2xl p-8 border border-[#374151]">
                <p className="text-[#D1D5DB] leading-relaxed mb-4">
                  Zaza Technologies builds safe, empathetic AI tools for
                  educators. Our flagship app, Zaza Draft, helps teachers save
                  hours each week on parent communications with
                  hallucination-aware AI. Headquartered in Germany, Zaza is
                  teacher-first, GDPR-ready, and trusted by schools worldwide.
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  For media inquiries or interviews, contact{" "}
                  <a
                    href="mailto:press@zazatechnologies.com"
                    className="text-[#A78BFA] hover:underline"
                  >
                    press@zazatechnologies.com
                  </a>
                </p>
              </div>
            </section>

            {/* Testimonials / Social Proof */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                What teachers say
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    quote:
                      "Draft gives me evenings back - emails now take minutes, not hours.",
                    name: "Sarah L., Middle School",
                  },
                  {
                    quote:
                      "Tone and clarity land immediately. Parents respond with less friction.",
                    name: "Mark R., Department Lead",
                  },
                  {
                    quote:
                      "Finally AI that doesn’t sound generic. My voice stays intact.",
                    name: "Emma K., Primary Teacher",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 space-y-3"
                  >
                    <Quote className="w-5 h-5 text-[#A78BFA]" />
                    <p className="text-[#E5E7EB] leading-relaxed">
                      "{item.quote}"
                    </p>
                    <p className="text-sm text-[#9CA3AF]">{item.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Coverage / Awards */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-[#A78BFA]" />
                <h2 className="text-2xl font-bold text-[#F9FAFB]">
                  Coverage & awards
                </h2>
              </div>
              <p className="text-[#9CA3AF] mb-4">
                First features and interviews are being scheduled. Media
                partners welcome.
              </p>
              <div className="bg-[#111827] border border-dashed border-[#374151] rounded-2xl p-6 text-[#CBD5E1]">
                <p>
                  "First coverage coming soon" - reach out for exclusive early
                  interviews or demos.
                </p>
              </div>
            </section>

            {/* Founder Bio */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                Founder Bio
              </h2>
              <ExpandableBio
                shortLabel="Short Bio"
                longLabel="Long Bio"
                shortBio="Greg Blackburn is the founder of Zaza Technologies. With a PhD in Professional Education and 20+ years in Learning & Development, Greg has worked at the intersection of education, AI, and technology. He founded Zaza to help teachers thrive by saving time, reducing stress, and focusing on what matters most: teaching. Founder based in Saarland, Germany."
                longBio="Dr. Harvey Gregory Scott Blackburn (Greg) is the founder of Zaza Technologies, an AI-powered EdTech company based in Germany. Greg began his career in Learning & Development after completing a Diploma in German and an MBA from the University of Queensland, later earning a PhD in Professional Education from City, University of London. His research focused on critical thinking and problem-solving in student-centred eLearning. Over two decades, he has led major learning initiatives in both higher education and corporate environments, most recently as Group Director of Learning at Communardo. Zaza Technologies reflects Greg's vision of building safe, teacher-first AI tools that combine sound pedagogy with cutting-edge AI. Greg lives in Germany with his family and is passionate about empowering educators through technology. Founder based in Saarland, Germany."
              />
            </section>

            {/* FAQ for media */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                FAQ for media
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    q: "What makes Zaza Draft different?",
                    a: "Hallucination-aware, explainable AI trained on pedagogy that keeps the teacher’s voice.",
                  },
                  {
                    q: "How do you handle privacy?",
                    a: "EU hosting, GDPR-minded, no training on customer data, privacy by design.",
                  },
                  {
                    q: "Who uses Zaza?",
                    a: "Teachers and schools (K12) in our private beta, helping us refine the product.",
                  },
                  {
                    q: "How do you address bias?",
                    a: "Curated prompting, human QA, misuse monitoring, fast correction cycles.",
                  },
                  {
                    q: "What data does Draft process?",
                    a: "Text-based communication and planning content; no full student PII required, sensitive fields optional/pseudonymised.",
                  },
                  {
                    q: "How long is onboarding?",
                    a: "Self-serve in minutes; school deployments with a short onboarding checklist.",
                  },
                  {
                    q: "Do you provide training?",
                    a: "Yes. Live workshops, on-demand videos, and concise in-app guides.",
                  },
                  {
                    q: "Funding?",
                    a: "Bootstrapped; focused on sustainable, user-first growth.",
                  },
                  {
                    q: "Interview contact?",
                    a: "press@zazatechnologies.com - replies within 24h; prepared statements on request.",
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5"
                  >
                    <p className="text-sm font-semibold text-[#E5E7EB]">
                      {item.q}
                    </p>
                    <p className="text-sm text-[#CBD5E1] mt-2 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Media Contact */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">
                Media contact
              </h2>
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
                  Get in touch
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
  );
}
