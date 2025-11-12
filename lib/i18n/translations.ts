import fs from "fs";
import path from "path";

type TranslationMap = Record<string, any>;

const cache: Record<string, TranslationMap> = {};

export function loadTranslations(
  locale: string,
  namespace: string,
): TranslationMap {
  const cacheKey = `${locale}-${namespace}`;

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "locales",
      locale,
      `${namespace}.json`,
    );
    const content = fs.readFileSync(filePath, "utf-8");
    cache[cacheKey] = JSON.parse(content);
    return cache[cacheKey];
  } catch (error) {
    console.warn(`Translation file not found: ${locale}/${namespace}.json`);
    return {};
  }
}

export function t(key: string, locale: string = "en"): string {
  const [namespace, ...pathParts] = key.split(".");
  const path = pathParts.join(".");

  // Try namespace-specific translations
  const translations = loadTranslations(locale, namespace);
  const value = getNestedValue(translations, path);

  if (value) return value;

  // Fallback to common
  const common = loadTranslations(locale, "common");
  const commonValue = getNestedValue(common, path);

  if (commonValue) return commonValue;

  // Return key if not found
  return key;
}

function getNestedValue(obj: any, path: string): string | undefined {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}
