export const FIRST_TOUCH_UTM_STORAGE_KEY = "zaza:first-touch-utm";

export type FirstTouchUtm = {
  source?: string;
  medium?: string;
  campaign?: string;
  landingPath: string;
  capturedAt: string;
};

type CaptureFirstTouchResult = {
  value: FirstTouchUtm;
  isNew: boolean;
} | null;

function cleanUtmValue(value: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized.slice(0, 200) : undefined;
}

function isFirstTouchUtm(value: unknown): value is FirstTouchUtm {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.landingPath === "string" &&
    typeof record.capturedAt === "string" &&
    (record.source === undefined || typeof record.source === "string") &&
    (record.medium === undefined || typeof record.medium === "string") &&
    (record.campaign === undefined || typeof record.campaign === "string")
  );
}

export function readStoredFirstTouchUtm(
  storage: Storage | null | undefined = undefined,
) {
  const resolvedStorage =
    storage ?? (typeof window !== "undefined" ? window.localStorage : null);

  if (!resolvedStorage) {
    return null;
  }

  try {
    const rawValue = resolvedStorage.getItem(FIRST_TOUCH_UTM_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    return isFirstTouchUtm(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function createFirstTouchUtm(search: string, pathname: string) {
  const params = new URLSearchParams(search);
  const source = cleanUtmValue(params.get("utm_source"));
  const medium = cleanUtmValue(params.get("utm_medium"));
  const campaign = cleanUtmValue(params.get("utm_campaign"));

  if (!source && !medium && !campaign) {
    return null;
  }

  return {
    source,
    medium,
    campaign,
    landingPath: pathname || "/",
    capturedAt: new Date().toISOString(),
  } satisfies FirstTouchUtm;
}

export function captureFirstTouchUtmFromLocation(
  location: Pick<Location, "pathname" | "search">,
  storage: Storage | null | undefined = undefined,
): CaptureFirstTouchResult {
  const existing = readStoredFirstTouchUtm(storage);
  if (existing) {
    return { value: existing, isNew: false };
  }

  const firstTouch = createFirstTouchUtm(location.search, location.pathname);
  const resolvedStorage =
    storage ?? (typeof window !== "undefined" ? window.localStorage : null);

  if (!firstTouch || !resolvedStorage) {
    return null;
  }

  try {
    resolvedStorage.setItem(
      FIRST_TOUCH_UTM_STORAGE_KEY,
      JSON.stringify(firstTouch),
    );
    return { value: firstTouch, isNew: true };
  } catch {
    return null;
  }
}
