import Link from "next/link";
import type { GuideLink } from "@/lib/guides";

type GuideLinksBlockProps = {
  title: string;
  intro: string;
  links: GuideLink[];
  eyebrow?: string;
  hubHref?: string;
  hubLabel?: string;
  theme?: "light" | "dark";
};

export function GuideLinksBlock({
  title,
  intro,
  links,
  eyebrow = "Teacher communication guides",
  hubHref = "/guides",
  hubLabel = "Browse all guides",
  theme = "light",
}: GuideLinksBlockProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`rounded-[32px] border p-6 md:p-8 ${
        isDark
          ? "border-white/10 bg-[#111827] text-white"
          : "border-[#ddd2c3] bg-white/90 text-slate-900"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p
            className={`text-xs uppercase tracking-[0.2em] ${
              isDark ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-3 text-3xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-4 text-base leading-8 ${
              isDark ? "text-[#CBD5E1]" : "text-slate-700"
            }`}
          >
            {intro}
          </p>
        </div>

        <Link
          href={hubHref}
          className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
            isDark
              ? "border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-white hover:bg-[#8B5CF6]/20"
              : "border-[#d2c8bb] bg-[#fcfaf6] text-slate-900 hover:bg-white"
          }`}
        >
          {hubLabel}
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-[28px] border px-5 py-5 transition ${
              isDark
                ? "border-white/10 bg-[#0B1220] hover:border-[#8B5CF6]/40"
                : "border-[#e6ddd1] bg-[#fcfaf6] hover:bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              {link.label}
            </h3>
            <p
              className={`mt-3 text-sm leading-7 ${
                isDark ? "text-[#CBD5E1]" : "text-slate-700"
              }`}
            >
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
