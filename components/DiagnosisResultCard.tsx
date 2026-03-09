"use client";

import Link from "next/link";
import type { Recommendation } from "@/lib/diagnosis-rules";

type DiagnosisResultCardProps = {
  recommendation: Recommendation;
  onOpen?: (recommendation: Recommendation) => void;
};

export function DiagnosisResultCard({
  recommendation,
  onOpen,
}: DiagnosisResultCardProps) {
  return (
    <article className="rounded-[28px] border border-[#ddd2c3] bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)]">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        Recommended next page
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        {recommendation.title}
      </h3>
      <p className="mt-4 text-base leading-8 text-slate-700">
        {recommendation.description}
      </p>

      <div className="mt-5 rounded-3xl border border-[#e6ddd1] bg-[#fcfaf6] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Why this fits
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
          {recommendation.why.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-500">
        Hallucination-safe - GDPR compliant - You stay in control
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={recommendation.url}
          onClick={() => onOpen?.(recommendation)}
          className="inline-flex items-center rounded-full bg-[#164e3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123f34]"
        >
          Open recommendation
        </Link>
        <Link
          href="/early-access"
          className="inline-flex items-center rounded-full border border-[#d2c8bb] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#faf6f0]"
        >
          Start free trial
        </Link>
      </div>
    </article>
  );
}
