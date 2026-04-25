import { cn } from "@/lib/utils";
import {
  parseFreshnessDate,
  type FreshnessPrecision,
} from "@/lib/seo/content-freshness";

type LastUpdatedProps = {
  isoDate: string;
  locale?: "en" | "de";
  precision?: FreshnessPrecision;
  theme?: "light" | "dark";
  className?: string;
};

function formatLastUpdated(
  isoDate: string,
  locale: "en" | "de",
  precision: FreshnessPrecision,
) {
  const date = parseFreshnessDate(isoDate);

  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    timeZone: "UTC",
    ...(precision === "date"
      ? {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      : {
          month: "long",
          year: "numeric",
        }),
  }).format(date);
}

export function LastUpdated({
  isoDate,
  locale = "en",
  precision = "month",
  theme = "light",
  className,
}: LastUpdatedProps) {
  const label = locale === "de" ? "Zuletzt aktualisiert" : "Last updated";
  const value = formatLastUpdated(isoDate, locale, precision);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
        theme === "dark"
          ? "border-white/12 bg-white/6 text-slate-200"
          : "border-[#ddd2c3] bg-white/85 text-slate-700",
        className,
      )}
    >
      <span className="font-medium">{label}:</span>
      <time dateTime={isoDate} className="font-semibold">
        {value}
      </time>
    </div>
  );
}
