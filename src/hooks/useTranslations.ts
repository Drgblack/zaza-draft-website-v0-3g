import { useLanguage } from '@/contexts/LanguageContext';

// Import translation files
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import enHome from '@/locales/en/home.json';
import deHome from '@/locales/de/home.json';
import enGlossary from '@/locales/en/glossary.json';
import deGlossary from '@/locales/de/glossary.json';

const translations = {
  en: {
    common: enCommon,
    home: enHome,
    glossary: enGlossary,
  },
  de: {
    common: deCommon,
    home: deHome,
    glossary: deGlossary,
  },
};

export function useTranslations(namespace: 'common' | 'home' | 'glossary') {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language][namespace];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation missing: ${namespace}.${key} (${language})`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, language };
}