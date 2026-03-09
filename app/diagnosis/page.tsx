import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";
import { CommunicationDiagnosis } from "@/components/CommunicationDiagnosis";
import {
  diagnosisFaqs,
  diagnosisInternalLinks,
  type DiagnosisInputs,
} from "@/lib/diagnosis-rules";
import { defaultMetadata } from "@/lib/metadata";

export const revalidate = 604800;

const title =
  "Parent Email and Report Problem Diagnosis - Teacher Help | Zaza Draft";
const description =
  "Diagnose your parent email, report comment, behaviour, or tone problem and get calmer Zaza Draft recommendations built for teachers. Teacher-first, GDPR compliant, and always under your control.";

const howToSteps = [
  {
    name: "Describe the situation",
    text: "Choose the closest school phase, issue, student context, and tone need. Add free text if the situation overlaps several pressures.",
  },
  {
    name: "Review matched pages",
    text: "The diagnosis engine suggests the most relevant Zaza Draft pages first, then adds nearby pages if your situation needs more than one angle.",
  },
  {
    name: "Open the best-fit page",
    text: "Read the recommended examples, adapt the tone, and decide whether to keep browsing or move into Zaza Draft for a custom draft.",
  },
  {
    name: "Draft calmly with teacher control",
    text: "Use Zaza Draft as a co-writer, not a replacement. You edit and approve every final word before anything is used.",
  },
];

type DiagnosisPageProps = {
  searchParams?: {
    phase?: string;
    issue?: string;
    studentContext?: string | string[];
    tone?: string | string[];
    freeText?: string;
  };
};

function toArray(value: string | string[] | undefined) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function getInitialValues(
  searchParams: DiagnosisPageProps["searchParams"],
): Partial<DiagnosisInputs> {
  return {
    phase: (searchParams?.phase ?? "") as DiagnosisInputs["phase"],
    issue: (searchParams?.issue ?? "") as DiagnosisInputs["issue"],
    studentContexts: toArray(
      searchParams?.studentContext,
    ) as DiagnosisInputs["studentContexts"],
    toneNeeds: toArray(searchParams?.tone) as DiagnosisInputs["toneNeeds"],
    freeText: searchParams?.freeText ?? "",
  };
}

export const metadata = defaultMetadata({
  title,
  description,
  path: "/diagnosis",
  type: "article",
  keywords: [
    "parent email diagnosis for teachers",
    "report comment diagnosis",
    "how to reply to an angry parent",
    "teacher communication help",
    "behaviour email wording",
    "report writing stress",
    "GDPR compliant AI for teachers",
  ],
});

export default function DiagnosisPage({ searchParams }: DiagnosisPageProps) {
  const initialValues = getInitialValues(searchParams);

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          id: "diagnosis-article-jsonld",
          path: "/diagnosis",
          title,
          description,
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          id: "diagnosis-faq-jsonld",
          path: "/diagnosis",
          title,
          description,
          faqs: diagnosisFaqs,
        }}
      />
      <StructuredData
        type="HowTo"
        data={{
          id: "diagnosis-howto-jsonld",
          path: "/diagnosis",
          title:
            "How to use the parent communication and report diagnosis tool",
          description,
          steps: howToSteps,
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          id: "diagnosis-breadcrumb-jsonld",
          path: "/diagnosis",
          title,
          description,
          breadcrumbs: {
            "/diagnosis": "Diagnosis",
          },
        }}
      />

      <div className="min-h-screen bg-[#f6f1e8] text-slate-900">
        <section className="border-b border-[#ddd2c3] bg-[radial-gradient(circle_at_top_left,_rgba(29,78,68,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.16),_transparent_32%),linear-gradient(180deg,_#fcfaf6_0%,_#f6f1e8_100%)]">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <nav className="mb-8 flex flex-wrap gap-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-900">Diagnosis</span>
            </nav>

            <div className="grid gap-10 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="max-w-4xl space-y-6">
                <p className="inline-flex rounded-full border border-[#cdd9d5] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                  Parent communication and report diagnosis
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                  Parent email and report diagnosis for teachers
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-700">
                  When the problem is bigger than one email, it helps to
                  diagnose it first. This tool helps you describe the issue,
                  then points you to the calmest and most relevant Zaza Draft
                  pages for angry parent replies, behaviour concerns,
                  report-writing stress, documentation for SLT, and
                  tone-sensitive school communication.
                </p>
                <p className="max-w-3xl text-lg leading-8 text-slate-700">
                  Zaza Draft is a specialised teacher-first co-writer, not a
                  generic AI tool. The goal is to reduce stress, improve tone,
                  and still keep you in full control of every final word.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#d8d0c5] bg-white/85 px-4 py-3 text-sm leading-6 text-slate-700">
                    Diagnose a parent email, report comment, or documentation
                    problem
                  </div>
                  <div className="rounded-2xl border border-[#d8d0c5] bg-white/85 px-4 py-3 text-sm leading-6 text-slate-700">
                    Get calmer pages matched to phase, tone, and student context
                  </div>
                  <div className="rounded-2xl border border-[#d8d0c5] bg-white/85 px-4 py-3 text-sm leading-6 text-slate-700">
                    Hallucination-safe support with GDPR-aware teacher control
                  </div>
                </div>
              </div>

              <aside className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Clear answer first
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-800">
                  If you are not sure which page to trust first, start here. The
                  diagnosis flow narrows the problem, matches the closest Zaza
                  Draft pages, and helps you move toward a calmer draft without
                  giving up teacher judgement.
                </p>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Best for
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                      <li>- Angry parent replies and difficult follow-up</li>
                      <li>- Behaviour emails and documentation pressure</li>
                      <li>
                        - Report exhaustion, tone anxiety, and weekend drain
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Teacher safety
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Use the diagnosis as a starting point. Zaza Draft helps
                      you find calmer wording, but you remain responsible for
                      context, policy, and every final approval.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 lg:px-8 lg:py-20">
          <CommunicationDiagnosis initialValues={initialValues} />

          <section className="rounded-[32px] border border-[#ddd2c3] bg-white/90 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Internal links
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Diagnosis-friendly pages worth opening next
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {diagnosisInternalLinks.map((item) => (
                <Link
                  key={item.pageSlug}
                  href={item.url}
                  className="rounded-[28px] border border-[#ddd2c3] bg-[#fcfaf6] p-5 transition hover:bg-white"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Recommended page
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Questions teachers usually ask before clicking through
              </h2>
            </div>
            <div className="space-y-3">
              {diagnosisFaqs.map((item) => (
                <details
                  key={item.question}
                  className="rounded-3xl border border-[#ddd2c3] bg-white/90 px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-medium text-slate-950">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
