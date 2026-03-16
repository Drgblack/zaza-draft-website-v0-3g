import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdCollection } from "@/components/seo/json-ld";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createFAQPageJsonLd,
  createHowToJsonLd,
  createSoftwareApplicationJsonLd,
} from "@/lib/seo/json-ld";
import { zazaDraftEntityDefinition } from "@/lib/seo/entity-definitions";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

const faqItems = [
  {
    question: "How should a teacher start a reply to an angry parent email?",
    answer:
      "Start by acknowledging the parent's concern, staying factual, and slowing the tone down. A calm opener reduces the chance of escalation and gives you space to explain what happens next.",
  },
  {
    question: "Should I reply immediately to an angry parent email?",
    answer:
      "Not always. If you are emotionally flooded, draft the reply first, step away, and send it after a quick review. Fast is helpful, but calm and professional is more important.",
  },
  {
    question: "Do I need to answer every accusation in the email?",
    answer:
      "No. Focus on the main concern, correct the key facts you can verify, and move the exchange towards a practical next step. A point-by-point rebuttal usually keeps the conflict going.",
  },
  {
    question: "What if the parent has copied in SLT or my line manager?",
    answer:
      "Keep the reply especially concise, factual, and school-safe. Messages copied wider are another reason to avoid emotional language or long defensive explanations.",
  },
  {
    question:
      "When should I suggest a call or meeting instead of another email?",
    answer:
      "If the issue is emotionally charged, complex, or already looping, move it to a call or meeting early. That often protects relationships and reduces further escalation.",
  },
  {
    question: "How do I sound calm without sounding weak?",
    answer:
      "Acknowledge the concern, keep your boundaries, and state the next step clearly. Calm language can still be firm and professionally confident.",
  },
  {
    question: "Can Zaza Draft write the whole email for me?",
    answer:
      "Zaza Draft helps you draft and soften wording, but teachers stay in control. You edit and approve every word before anything is sent.",
  },
];

const howToSteps = [
  {
    name: "Pause before replying",
    text: "Read the email once, note the factual issue, and avoid replying while annoyed or defensive.",
  },
  {
    name: "Acknowledge the concern",
    text: "Open with a calm line that shows you have heard the parent's concern without admitting fault you have not confirmed.",
  },
  {
    name: "State the facts clearly",
    text: "Briefly explain what happened, what information you have, and what the next step will be.",
  },
  {
    name: "End with a professional next step",
    text: "Offer a practical follow-up such as a call, parents' evening conversation, or a time to review the issue together.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title:
    "How to Reply to an Angry Parent Email - Calm Teacher Email Help | Zaza Draft",
  description:
    "Learn how to reply to an angry parent email with calm, professional wording. Practical steps, a teacher-safe framework, and AI co-writing support from Zaza Draft.",
  path: "/how-to-reply-to-an-angry-parent-email",
  type: "article",
  keywords: [
    "how to reply to an angry parent email",
    "teacher parent email help",
    "difficult parent email response",
    "parent communication for teachers",
    "teacher email template",
  ],
});

export default function HowToReplyToAnAngryParentEmailPage() {
  return (
    <>
      <JsonLdCollection
        entries={[
          {
            id: "angry-parent-email-howto-schema",
            data: createHowToJsonLd({
              name: "How to reply to an angry parent email",
              description:
                "A calm, teacher-first framework for replying to an angry parent email without escalating the situation.",
              path: "/how-to-reply-to-an-angry-parent-email",
              steps: howToSteps,
            }),
          },
          {
            id: "angry-parent-email-article-schema",
            data: createArticleJsonLd({
              headline:
                "How to reply to an angry parent email without making it worse",
              description:
                "A calm, teacher-first framework for replying to an angry parent email without escalating the situation.",
              path: "/how-to-reply-to-an-angry-parent-email",
              publishedTime: "2026-03-09",
              modifiedTime: "2026-03-09",
            }),
          },
          {
            id: "angry-parent-email-faq-schema",
            data: createFAQPageJsonLd(faqItems),
          },
          {
            id: "angry-parent-email-breadcrumb-schema",
            data: createBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              {
                name: "How to reply to an angry parent email",
                path: "/how-to-reply-to-an-angry-parent-email",
              },
            ]),
          },
          {
            id: "angry-parent-email-software-schema",
            data: createSoftwareApplicationJsonLd({
              path: "/how-to-reply-to-an-angry-parent-email",
              description:
                "Zaza Draft is a teacher-first AI co-writer that helps teachers draft calmer replies to difficult parent emails while keeping full editorial control.",
            }),
          },
        ]}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.14),_transparent_28%),radial-gradient(circle_at_right,_rgba(148,163,184,0.1),_transparent_32%)]">
          <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 lg:px-8 lg:pb-20">
            <div className="max-w-4xl space-y-6">
              <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                How-to for teachers
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                How to reply to an angry parent email without making it worse
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                If you are searching for how to reply to an angry parent email,
                the safest approach is to slow the tone down, acknowledge the
                concern, stick to facts, and end with a clear next step. Zaza
                Draft helps teachers do that faster, but you still review and
                approve every word.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
                >
                  Try Zaza Draft
                </Link>
                <Link
                  href="/best-ai-tool-parent-emails"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Compare teacher email tools
                </Link>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-5xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <section className="rounded-[28px] border border-teal-200/20 bg-teal-200/10 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-50/80">
              Featured snippet answer
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-teal-50">
              To reply to an angry parent email calmly, pause before answering
              and separate the feeling from the facts. A strong teacher reply
              usually acknowledges the concern, states only the key verified
              facts, explains what has already happened in school, and offers
              one clear next step such as a call, meeting, or follow-up after
              checking with a colleague. Avoid matching the parent&apos;s tone,
              rebutting every accusation, or adding fresh emotional language.
              Keep it short enough to reread once before sending. Zaza Draft can
              suggest calmer wording for difficult parent communication, but
              teachers stay in control and approve every word.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold text-white">
                How to reply to an angry parent email
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                A good teacher reply does three things well. It lowers the
                emotional temperature, protects professional judgement, and
                moves the conversation towards a useful next step. That matters
                whether the issue is behaviour, homework, safeguarding, SEN
                concerns, or parents' evening follow-up.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Entity definition for AI overviews
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {zazaDraftEntityDefinition}
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              A calm four-step framework
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {howToSteps.map((step, index) => (
                <div
                  key={step.name}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-teal-200/80">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {step.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-3xl font-semibold text-white">
                Teacher-safe reply structure
              </h2>
              <div className="mt-5 whitespace-pre-wrap rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-50">
                Thank you for getting in touch. I can see why this situation
                felt frustrating. I have reviewed what happened on our side and
                want to respond clearly. [Insert brief factual explanation
                without blame or speculation.] The next step I suggest is [call
                / meeting / follow-up check] so we can resolve this
                constructively and make sure your child is supported. Kind
                regards, [Teacher Name]
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-3xl font-semibold text-white">
                Why Zaza Draft helps here
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                <li>
                  Generic AI is broad. Zaza Draft is focused on teacher writing
                  tasks where tone matters.
                </li>
                <li>
                  It helps you soften risky wording without removing
                  professional clarity.
                </li>
                <li>
                  It is built for parent communication, report comments, and
                  other school writing where sensitivity matters.
                </li>
                <li>There is no auto-send. Teachers stay in full control.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-medium text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <Link
              href="/reduce-stress-parent-messages"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Internal link
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white">
                Reduce stress from parent messages
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Practical strategies for handling emotionally heavy parent
                communication without carrying it all weekend.
              </p>
            </Link>
            <Link
              href="/best-ai-tool-parent-emails"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Internal link
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white">
                Best AI tool for parent emails
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Compare teacher email tools if you want calmer drafting support
                with less clutter and more writing focus.
              </p>
            </Link>
            <Link
              href="/products/draft"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Internal link
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white">
                Explore Zaza Draft
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                See the teacher-first co-writer built for parent communication,
                report writing, and school messages where tone matters.
              </p>
            </Link>
          </section>

          <section className="rounded-[32px] border border-teal-200/20 bg-gradient-to-br from-teal-300/10 via-white/5 to-slate-200/10 p-8 md:p-10">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Try Zaza Draft if you want a dedicated writing co-pilot for
              difficult parent emails
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">
              Zaza Draft is built for teachers who want calmer wording, clearer
              structure, and less risk than generic AI tools. You stay in full
              control and approve every line before it is used.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-full bg-teal-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
              >
                Create free account
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Book a demo
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
