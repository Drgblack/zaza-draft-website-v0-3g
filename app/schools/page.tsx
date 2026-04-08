import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock3,
  MessageSquareWarning,
  ShieldCheck,
  Users,
} from "lucide-react";

import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

const demoHref = "/contact/schools?plan=enterprise&source=schools_page";
const heroImage = "/teacher-working-at-desk-with-laptop.jpg";
const rolloutImage = "/school-district-meeting-teachers.jpg";

const problemStrip = [
  {
    title: "Reduce escalation risk",
    description:
      "Give staff support before one badly judged phrase turns into a complaint, a forwarded thread, or a leadership issue.",
    icon: ShieldCheck,
  },
  {
    title: "Support staff in difficult moments",
    description:
      "Help people respond calmly when the message in front of them is emotionally charged, sensitive, or hard to word well.",
    icon: Users,
  },
  {
    title: "Create calmer consistency",
    description:
      "Make professional, parent-facing communication feel steadier across the school without flattening teacher judgement.",
    icon: MessageSquareWarning,
  },
  {
    title: "Protect time and energy",
    description:
      "Reduce the after-hours rewriting, second-guessing, and colleague checking that difficult emails tend to create.",
    icon: Clock3,
  },
] as const;

const leadershipPainCards = [
  {
    title: "Parent emails that do not close with one reply",
    body: "A message that should take ten minutes can linger for days, absorbing staff attention and leadership time long after the first exchange.",
  },
  {
    title: "Too much rewriting under pressure",
    body: "Staff already rewrite difficult messages several times, delay sending, or ask colleagues for a second opinion because the tone has to hold up.",
  },
  {
    title: "Fear that one phrase could trigger a complaint",
    body: "When communication feels emotionally loaded, the risk is rarely factual error. It is wording, tone, defensibility, and how the message lands.",
  },
  {
    title: "Support arriving after tension is already high",
    body: "By the time a line manager is pulled in, the emotional energy has usually already been spent and the relationship may already be strained.",
  },
] as const;

const howItWorks = [
  {
    step: "01",
    title: "Staff bring the message they are hesitating over",
    body: "A difficult draft, a fresh reply, or a message still forming in notes can be brought into Zaza before it is sent.",
  },
  {
    step: "02",
    title: "Zaza reshapes it into a calmer working draft",
    body: "The system helps produce wording that is clearer, steadier, and easier to stand behind professionally without removing the core point.",
  },
  {
    step: "03",
    title: "The staff member stays in control",
    body: "Judgement remains with the staff member or leader. Zaza supports professional communication, not automated sending or generic AI output.",
  },
  {
    step: "04",
    title: "The school gains a support layer before escalation",
    body: "Leaders get a practical way to reduce avoidable communication fallout while keeping responses human, credible, and appropriate to the person sending them.",
  },
] as const;

const inclusions = [
  "Zaza Draft access for staff who handle parent communication",
  "Communication templates for common high-stakes scenarios",
  "Onboarding for your team and implementation guidance",
  "Practical guidance for emotionally sensitive situations",
  "Priority support for rollout and adoption questions",
  "Optional implementation support for school-wide or trust-wide deployment",
] as const;

const scenarios = [
  "Behaviour incidents that need to stay calm and factual",
  "Parent complaints and challenging follow-up replies",
  "Sensitive wellbeing updates where tone matters as much as content",
  "Attendance and safeguarding-adjacent communication requiring care and clarity",
  "Grade, assessment, or progress tension that can easily escalate",
  "Messages after a difficult meeting when professionalism has to hold under pressure",
] as const;

const comparisonRows = [
  {
    generic: "Useful for generating text quickly",
    zaza: "Designed specifically around school-parent communication where tone, judgement, and defensibility matter",
  },
  {
    generic:
      "Requires staff to invent the right prompt and evaluate the output alone",
    zaza: "Built as a communication support layer for the messages that already carry emotional and professional consequences",
  },
  {
    generic: "Often sounds polished but not always school-authentic",
    zaza: "Aims for calmer, clearer wording that still sounds human and appropriate for real parent-facing use",
  },
  {
    generic: "Best when the task is broad and open-ended",
    zaza: "Best when the school needs support with the message staff are worried about sending tomorrow morning",
  },
] as const;

const rolloutOptions = [
  {
    name: "Pilot rollout",
    summary:
      "A focused starting point for one school, team, or high-need staff group.",
    details: [
      "Scoped onboarding and setup",
      "Defined use cases and rollout support",
      "Best for proving value quickly in real communication pressure points",
    ],
  },
  {
    name: "School-wide rollout",
    summary:
      "A full school implementation for leaders who want a consistent staff communication support layer.",
    details: [
      "Access shaped around staff communication needs",
      "Onboarding, guidance, and support for implementation",
      "Suitable for schools treating workload, professionalism, and escalation risk as one issue",
    ],
  },
  {
    name: "Multi-school or trust rollout",
    summary:
      "A broader deployment model for groups that want consistency across schools while keeping local judgement intact.",
    details: [
      "Multi-site planning and implementation support",
      "Shared communication principles with practical flexibility",
      "Commercial scope tailored to staff numbers and rollout depth",
    ],
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title:
    "Zaza for Schools | Safer High-Stakes Parent Communication Support for Staff",
  description:
    "Zaza for Schools helps school leaders support staff with calmer, clearer, more professional parent communication before difficult emails turn into complaints, escalation, or unnecessary workload.",
  path: "/schools",
  image: heroImage,
  keywords: [
    "school communication support",
    "parent email risk reduction for schools",
    "school leadership communication workflow",
    "staff parent communication system",
    "high-stakes parent communication",
  ],
});

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function DemoCta({
  className,
  secondaryLabel = "See rollout options",
  secondaryHref = "#commercial-model",
}: {
  className?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          asChild
          size="lg"
          className="h-11 rounded-full px-6 text-sm font-semibold"
        >
          <Link href={demoHref}>
            Book a school demo
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Link
          href={secondaryHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
        >
          {secondaryLabel}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export default function SchoolsPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "schools-webpage-schema",
            data: createWebPageJsonLd({
              name: "Zaza for Schools",
              description:
                "A premium communication support system for schools that helps staff shape calmer, clearer, more professional parent communication before messages escalate.",
              path: "/schools",
              keywords: [
                "Zaza for Schools",
                "school communication support system",
                "parent email risk reduction",
                "leadership demo",
              ],
              potentialActionName: "Book a school demo",
            }),
          },
          {
            id: "schools-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Schools", path: "/schools" },
            ]),
          },
        ]}
      />

      <main className="bg-white text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.18),transparent_38%),radial-gradient(circle_at_top_right,_rgba(217,119,6,0.10),transparent_28%),linear-gradient(180deg,#f8f6f2_0%,#ffffff_56%,#f8fafc_100%)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center lg:px-12 lg:py-24">
            <div className="max-w-2xl space-y-8">
              <div className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm backdrop-blur">
                Zaza for Schools
              </div>

              <div className="space-y-5">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  A safer way for schools to handle high-stakes parent
                  communication
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                  Zaza helps staff shape calmer, clearer, more professional
                  messages before they are sent. For schools, that means less
                  after-hours rewriting, fewer avoidable escalations, and a
                  stronger support layer around difficult communication.
                </p>
              </div>

              <div className="space-y-3">
                <DemoCta
                  secondaryLabel="See how it works for schools"
                  secondaryHref="#how-it-works"
                />
                <p className="max-w-lg text-sm leading-7 text-slate-500">
                  Built for emotionally sensitive school communication where
                  tone, judgement, and professionalism matter as much as the
                  wording itself.
                </p>
              </div>

              <dl className="grid gap-4 pt-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
                  <dt className="text-sm text-slate-500">Designed for</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    leaders, principals, trusts, and school teams
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
                  <dt className="text-sm text-slate-500">Supports</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    workload, wellbeing, and communication quality
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
                  <dt className="text-sm text-slate-500">Best fit</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    the messages staff hesitate over most
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-amber-200/40 blur-3xl lg:block" />
              <div className="absolute -right-8 bottom-4 hidden h-28 w-28 rounded-full bg-slate-300/40 blur-3xl lg:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={heroImage}
                    alt="Teacher reviewing a difficult parent email on a laptop in a calm school office"
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-slate-950/70 p-5 text-white shadow-lg backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-200/90">
                      Communication support layer
                    </p>
                    <p className="mt-3 text-lg font-semibold leading-7">
                      Support staff before a difficult reply becomes tomorrow
                      morning&rsquo;s leadership issue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {problemStrip.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <Icon className="size-5 text-amber-300" />
                  <h2 className="mt-4 text-base font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <SectionIntro
                eyebrow="What schools are actually dealing with"
                title="The organisational problem is bigger than one difficult email"
                description="Staff already do a lot to stay professional. They rewrite, pause, ask colleagues, use templates, and try generic AI tools because difficult parent communication carries consequences. The issue at school level is the emotional load, the time lost, and the fallout when support arrives too late."
              />

              <div className="grid gap-5 sm:grid-cols-2">
                {leadershipPainCards.map((card) => (
                  <Card
                    key={card.title}
                    className="h-full rounded-[1.75rem] border-slate-200 bg-slate-50/80 py-0 shadow-none"
                  >
                    <CardHeader className="px-7 pt-7">
                      <CardTitle className="text-xl leading-8 text-slate-950">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-7 pb-7 pt-0">
                      <p className="text-sm leading-7 text-slate-600">
                        {card.body}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-b border-slate-200 bg-slate-50"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div className="space-y-8">
                <SectionIntro
                  eyebrow="How Zaza for Schools works"
                  title="A practical communication system, not generic AI text generation"
                  description="Zaza for Schools gives staff a structured way to work through the messages they are most worried about sending. It supports judgement rather than replacing it, and helps schools create steadier parent communication before problems grow."
                />
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={rolloutImage}
                      alt="School leadership team discussing communication support in a modern school setting"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 34vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-white/10" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {howItWorks.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Step {item.step}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
                          {item.title}
                        </h3>
                      </div>
                      <div className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                        Human-led
                      </div>
                    </div>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
              <SectionIntro
                eyebrow="What is included"
                title="A premium rollout designed for real school use, not a lightweight self-serve tool"
                description="Zaza for Schools combines access, guidance, implementation support, and practical communication scaffolding. The aim is not only adoption. It is better outcomes in difficult messages and less avoidable communication strain across the school."
              />

              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                      Institutional package
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                      Zaza Draft for individual teachers. Zaza for Schools for
                      team rollout.
                    </h3>
                  </div>
                  <Briefcase className="size-10 text-amber-300" />
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {inclusions.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-amber-300" />
                        <p className="text-sm leading-7 text-slate-200">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionIntro
                eyebrow="Designed for high-stakes school communication"
                title="Built for the messages staff hesitate over"
                description="This is for the communication that gets rewritten several times, sits open in drafts, or risks becoming more difficult once it reaches a parent inbox."
              />
              <DemoCta
                className="lg:pb-1"
                secondaryLabel="View the commercial model"
                secondaryHref="#commercial-model"
              />
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-base font-medium leading-8 text-slate-900">
                    {scenario}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <SectionIntro
                eyebrow="Why schools do not stop at generic AI"
                title="Generic AI can generate text. Zaza is designed for the message that has consequences if it lands badly."
                description="Schools are right to notice that staff are already experimenting with AI. The question is whether a generic tool is enough for sensitive school-parent communication. Zaza is designed around trust, tone, and professional defensibility in school contexts."
              />

              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-sm">
                <div className="grid gap-px bg-white/10 md:grid-cols-2">
                  <div className="bg-slate-900/90 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                      Generic AI
                    </p>
                  </div>
                  <div className="bg-slate-900 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                      Zaza for Schools
                    </p>
                  </div>
                  {comparisonRows.map((row) => (
                    <div key={row.generic} className="contents">
                      <div className="bg-slate-900/85 p-6 text-sm leading-7 text-slate-300">
                        {row.generic}
                      </div>
                      <div className="bg-slate-900 p-6 text-sm leading-7 text-white">
                        {row.zaza}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="commercial-model"
          className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]"
        >
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionIntro
                eyebrow="Commercial model"
                title="Structured for pilots, school-wide rollout, and trust-level adoption"
                description="Zaza for Schools is positioned as a premium support layer for staff communication. Commercial scope is shaped around staff numbers, rollout depth, implementation needs, and the level of support your team wants."
              />
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">
                  Typical conversations sit in the range of a premium monthly
                  school support tool, not low-cost self-serve software.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 xl:grid-cols-3">
              {rolloutOptions.map((option) => (
                <Card
                  key={option.name}
                  className="rounded-[1.75rem] border-slate-200 bg-white py-0 shadow-sm"
                >
                  <CardHeader className="px-7 pt-7">
                    <CardTitle className="text-2xl tracking-tight text-slate-950">
                      {option.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-7 text-slate-600">
                      {option.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-7 pb-7 pt-0">
                    <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                      Tailored commercial scope
                    </div>
                    <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                      {option.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <CheckCircle2 className="mt-1 size-4 shrink-0 text-slate-900" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-8 text-white shadow-sm lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                  Next step
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  Book a leadership conversation and we will scope the right
                  rollout model with you.
                </h3>
              </div>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                <Link href={demoHref}>
                  Book a school demo
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8 lg:px-12 lg:py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
              Final step
            </p>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Support your staff before difficult emails turn into bigger
              problems
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Give your school a calmer, more consistent communication layer for
              the messages that carry emotional weight, professional risk, and
              after-hours load. Zaza for Schools is designed to help staff
              respond clearly, calmly, and credibly before issues escalate.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                <Link href={demoHref}>
                  Book a school demo
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <p className="text-sm leading-7 text-slate-400">
                For principals, school leaders, trusts, and teams responsible
                for difficult parent-facing communication.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
