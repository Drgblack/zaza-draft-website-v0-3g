import { readStoredAnalyticsConsent } from "@/lib/analytics-consent";
import type { DistributionAnalyticsMeta } from "@/lib/distribution-analytics";

type PlausibleProps = Record<string, string | number | boolean>;
type TrackProps = Record<string, string | number | boolean | undefined>;

type AnalyticsNamespace = {
  track: (event: string, props?: Record<string, any>) => void;
  viewHub: () => void;
  viewCategory: (category: string) => void;
  viewDiscussion: (id: string | number, title?: string) => void;
  viewTerm: (id: string | number, term?: string) => void;
  registerWebinar: (id: string | number, title?: string) => void;
  filterByCategory: (category: string) => void;
  watchRecording: (id: string | number, title?: string) => void;
};

function toTrackProps(props?: TrackProps): TrackProps | undefined {
  if (!props) {
    return undefined;
  }

  const entries = Object.entries(props).filter(
    ([, value]) =>
      value !== undefined &&
      (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"),
  );

  return entries.length ? Object.fromEntries(entries) : undefined;
}

function hasAnalyticsConsent() {
  return readStoredAnalyticsConsent() === "accepted";
}

function toDistributionProps(
  meta: DistributionAnalyticsMeta,
  props: TrackProps = {},
): TrackProps {
  return {
    product: meta.product,
    page_type: meta.pageType,
    slug: meta.slug,
    ...props,
  };
}

const baseTrack = (event: string, props?: TrackProps) => {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const cleanProps = toTrackProps(props);
  try {
    window.plausible?.(event, cleanProps as PlausibleProps);
  } catch {
    // no-op
  }
  try {
    (window as any)?.analytics?.track?.(event, cleanProps);
  } catch {
    // no-op
  }
  try {
    window.gtag?.("event", event, cleanProps);
  } catch {
    // no-op
  }
};

const makeNamespace = (): AnalyticsNamespace => ({
  track: baseTrack,
  viewHub: () => baseTrack("view_hub"),
  viewCategory: (category) => baseTrack("view_category", { category }),
  viewDiscussion: (id, title) => baseTrack("view_discussion", { id, title }),
  viewTerm: (id, term) => baseTrack("view_term", { id, term }),
  registerWebinar: (id, title) => baseTrack("register_webinar", { id, title }),
  filterByCategory: (category) => baseTrack("filter_by_category", { category }),
  watchRecording: (id, title) => baseTrack("watch_recording", { id, title }),
});

export const analytics: AnalyticsNamespace & {
  community: AnalyticsNamespace;
  webinars: AnalyticsNamespace;
  glossary: AnalyticsNamespace;
} = {
  ...makeNamespace(),
  community: makeNamespace(),
  webinars: makeNamespace(),
  glossary: makeNamespace(),
};

export const track = (event: string, props?: Record<string, any>) =>
  baseTrack(event, props);
export const trackEvent = (event: string, props?: Record<string, any>) =>
  baseTrack(event, props);

export const trackRiskCheckerSubmitted = (locale: "en" | "de") => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "risk_checker_submitted", {
    event_category: "engagement",
    event_label: "parent_email_risk_checker",
    locale,
    page_path:
      locale === "de"
        ? "/de/parent-email-risk-checker"
        : "/parent-email-risk-checker",
  });
};

export const trackCtaClick = ({
  ctaText,
  ctaLocation,
}: {
  ctaText: string;
  ctaLocation: string;
}) =>
  baseTrack("cta_click", {
    cta_text: ctaText.trim(),
    cta_location: ctaLocation,
  });

export const trackGenerateLead = ({
  formLocation,
  method,
}: {
  formLocation: string;
  method: string;
}) =>
  baseTrack("generate_lead", {
    form_location: formLocation,
    method,
  });

export const trackScrollDepth = (percentScrolled: 50 | 90) =>
  baseTrack("scroll_depth", {
    percent_scrolled: percentScrolled,
  });

type DiagnosisEventProps = {
  issue?: string;
  phase?: string;
  studentContexts?: string[];
  toneNeeds?: string[];
  recommendations?: number;
  topRecommendation?: string;
  pageSlug?: string;
  trigger?: "manual" | "prefilled";
};

function toDiagnosisProps(props: DiagnosisEventProps = {}) {
  return {
    issue: props.issue,
    phase: props.phase,
    student_contexts: props.studentContexts?.join(",") || undefined,
    tone_needs: props.toneNeeds?.join(",") || undefined,
    recommendations: props.recommendations,
    top_recommendation: props.topRecommendation,
    page_slug: props.pageSlug,
    trigger: props.trigger,
  };
}

export const trackDiagnosisPageViewed = (props: DiagnosisEventProps = {}) =>
  baseTrack("diagnosis_page_viewed", toDiagnosisProps(props));

export const trackDiagnosisRun = (props: DiagnosisEventProps = {}) =>
  baseTrack(
    props.trigger === "prefilled"
      ? "diagnosis_prefilled_run"
      : "diagnosis_completed",
    toDiagnosisProps(props),
  );

export const trackDiagnosisReset = (props: DiagnosisEventProps = {}) =>
  baseTrack("diagnosis_reset_clicked", toDiagnosisProps(props));

export const trackDiagnosisFormCleared = () =>
  baseTrack("diagnosis_form_cleared");

export const trackDiagnosisRecommendationClick = (
  props: DiagnosisEventProps = {},
) => baseTrack("diagnosis_recommendation_clicked", toDiagnosisProps(props));

export const trackDiagnosisCtaClick = (props: DiagnosisEventProps = {}) =>
  baseTrack("diagnosis_cta_clicked", toDiagnosisProps(props));

export const trackTrialStart = ({
  placement,
  ctaVariant,
  sourcePage,
}: {
  placement: string;
  ctaVariant: string;
  sourcePage: string;
}) =>
  baseTrack("trial_start_click", {
    placement,
    cta_variant: ctaVariant,
    source_page: sourcePage,
  });

export const trackRoiCalculated = ({
  reportsPerWeek,
  parentEmailsPerWeek,
  yearlyHoursSaved,
  yearlyValueSaved,
}: {
  reportsPerWeek: number;
  parentEmailsPerWeek: number;
  yearlyHoursSaved: number;
  yearlyValueSaved: number;
}) =>
  baseTrack("roi_calculated", {
    reports_per_week: reportsPerWeek,
    parent_emails_per_week: parentEmailsPerWeek,
    yearly_hours_saved: yearlyHoursSaved,
    yearly_value_saved: yearlyValueSaved,
  });

export const trackUtmLanding = ({
  source,
  medium,
  campaign,
  content,
  term,
  landingPath,
}: {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  content?: string | null;
  term?: string | null;
  landingPath: string;
}) =>
  baseTrack("utm_landing_session", {
    utm_source: source ?? undefined,
    utm_medium: medium ?? undefined,
    utm_campaign: campaign ?? undefined,
    utm_content: content ?? undefined,
    utm_term: term ?? undefined,
    landing_path: landingPath,
  });

export const trackAiReferralSession = ({
  aiSource,
  referrerHost,
  landingPath,
}: {
  aiSource: string;
  referrerHost: string;
  landingPath: string;
}) =>
  baseTrack("ai_referral_session", {
    ai_source: aiSource,
    referrer_host: referrerHost,
    landing_path: landingPath,
  });

export const trackComparisonPageView = (meta: DistributionAnalyticsMeta) =>
  baseTrack("comparison_page_view", toDistributionProps(meta));

export const trackFreeToolPageView = (meta: DistributionAnalyticsMeta) =>
  baseTrack("free_tool_page_view", toDistributionProps(meta));

export const trackToolStarted = (
  meta: DistributionAnalyticsMeta,
  props: TrackProps = {},
) => baseTrack("tool_started", toDistributionProps(meta, props));

export const trackToolCompleted = (
  meta: DistributionAnalyticsMeta,
  props: TrackProps = {},
) => baseTrack("tool_completed", toDistributionProps(meta, props));

export const trackSignupClicked = (
  meta: DistributionAnalyticsMeta,
  props: TrackProps = {},
) => baseTrack("signup_clicked", toDistributionProps(meta, props));

export const trackPricingClicked = (
  meta: DistributionAnalyticsMeta,
  props: TrackProps = {},
) => baseTrack("pricing_clicked", toDistributionProps(meta, props));

export const trackShareClicked = (
  meta: DistributionAnalyticsMeta,
  props: TrackProps = {},
) => baseTrack("share_clicked", toDistributionProps(meta, props));

export const trackAccountCreatedFromTool = (
  meta: DistributionAnalyticsMeta,
  props: TrackProps = {},
) => baseTrack("account_created_from_tool", toDistributionProps(meta, props));

declare global {
  interface Window {
    plausible?: (eventName: string, props?: PlausibleProps) => void;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}
