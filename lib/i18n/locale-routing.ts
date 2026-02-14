export type Locale = "en" | "de";

export function detectLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith("/de") ? "de" : "en";
}

export function toLocalePath(pathname: string, locale: Locale): string {
  if (!pathname || pathname === "") return locale === "de" ? "/de" : "/";

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (locale === "de") {
    if (normalized.startsWith("/de/") || normalized === "/de")
      return normalized;
    return normalized === "/" ? "/de" : `/de${normalized}`;
  }

  const withoutDe = normalized.replace(/^\/de(?=\/|$)/, "");
  return withoutDe === "" ? "/" : withoutDe;
}
