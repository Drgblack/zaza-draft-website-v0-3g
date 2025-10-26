import { t } from "./t";

type LocalMap = Record<string, string | undefined> | undefined;

/**
 * ct() — "cautious translate"
 * 1) Try global i18n with t(key)
 * 2) Fall back to page-local map if provided
 * 3) Return the key literally (visible) if still missing — audit will catch it
 */
export function ct(key: string, local?: LocalMap): string {
  const globalVal = t?.(key);
  if (globalVal && globalVal !== key) return globalVal;
  if (local?.[key]) return String(local[key]);
  return key;
}
