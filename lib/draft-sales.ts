export const DRAFT_SALES_ENABLED =
  process.env.NEXT_PUBLIC_DRAFT_SALES_ENABLED === "true";

export function getDraftPrelaunchCtaLabel(language: "en" | "de") {
  return language === "de" ? "Early Access beitreten" : "Join Early Access";
}

export function getDraftPrelaunchHelperLine(language: "en" | "de") {
  return language === "de"
    ? "Startet bald - melde dich fuer Early Access an, um erste Einladungen und Launch-Updates zu erhalten."
    : "Launching soon - join early access for first invites and launch updates.";
}
