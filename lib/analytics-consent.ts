export const ANALYTICS_CONSENT_STORAGE_KEY = "zaza:analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "zaza:analytics-consent-updated";

export type AnalyticsConsentState = "accepted" | "declined";

export const EEA_UK_CH_REGIONS = [
  "AT",
  "BE",
  "BG",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
] as const;

function isAnalyticsConsentState(
  value: string | null | undefined,
): value is AnalyticsConsentState {
  return value === "accepted" || value === "declined";
}

export function readStoredAnalyticsConsent(
  storage: Storage | null | undefined = undefined,
) {
  const resolvedStorage =
    storage ?? (typeof window !== "undefined" ? window.localStorage : null);

  if (!resolvedStorage) {
    return null;
  }

  try {
    const value = resolvedStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return isAnalyticsConsentState(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredAnalyticsConsent(
  value: AnalyticsConsentState,
  storage: Storage | null | undefined = undefined,
) {
  const resolvedStorage =
    storage ?? (typeof window !== "undefined" ? window.localStorage : null);

  if (!resolvedStorage) {
    return;
  }

  try {
    resolvedStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  } catch {
    // no-op
  }
}

export function clearStoredAnalyticsConsent(
  storage: Storage | null | undefined = undefined,
) {
  const resolvedStorage =
    storage ?? (typeof window !== "undefined" ? window.localStorage : null);

  if (!resolvedStorage) {
    return;
  }

  try {
    resolvedStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY);
  } catch {
    // no-op
  }
}

export function updateGoogleAnalyticsConsent(state: AnalyticsConsentState) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", {
    analytics_storage: state === "accepted" ? "granted" : "denied",
  });
}

export function dispatchAnalyticsConsentEvent(state: AnalyticsConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, {
      detail: state,
    }),
  );
}

export function applyAnalyticsConsent(state: AnalyticsConsentState) {
  writeStoredAnalyticsConsent(state);
  updateGoogleAnalyticsConsent(state);
  dispatchAnalyticsConsentEvent(state);
}

export function buildGoogleConsentBootstrap(measurementId: string) {
  const storageKey = JSON.stringify(ANALYTICS_CONSENT_STORAGE_KEY);
  const regions = JSON.stringify(EEA_UK_CH_REGIONS);

  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var analyticsConsentKey = ${storageKey};
var eeaUkChRegions = ${regions};
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  region: eeaUkChRegions,
  wait_for_update: 500
});
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  var storedAnalyticsConsent = window.localStorage.getItem(analyticsConsentKey);
  if (storedAnalyticsConsent === 'accepted' || storedAnalyticsConsent === 'declined') {
    gtag('consent', 'update', {
      analytics_storage: storedAnalyticsConsent === 'accepted' ? 'granted' : 'denied'
    });
  }
} catch (error) {
  // no-op
}
gtag('js', new Date());
gtag('config', '${measurementId}');`;
}
