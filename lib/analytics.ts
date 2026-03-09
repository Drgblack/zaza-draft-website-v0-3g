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

const baseTrack = (event: string, props?: TrackProps) => {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props as PlausibleProps);
  } catch {
    // no-op
  }
  try {
    (window as any)?.analytics?.track?.(event, props);
  } catch {
    // no-op
  }
  try {
    window.gtag?.("event", event, props);
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

declare global {
  interface Window {
    plausible?: (eventName: string, props?: PlausibleProps) => void;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}
