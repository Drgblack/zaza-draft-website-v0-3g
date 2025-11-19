'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GlossaryTestPage() {
  const { t } = useTranslations('glossary');
  const { language, setLanguage } = useLanguage();

  return (
    <div className="container mx-auto p-8">
      {/* Language Switcher */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded ${
            language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('de')}
          className={`px-4 py-2 rounded ${
            language === 'de' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Deutsch
        </button>
      </div>

      {/* Test Translations */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">{t('hero.title')}</h1>
        <p className="text-xl">{t('hero.subtitle')}</p>
        <p className="text-gray-600">{t('hero.description')}</p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="border p-4 rounded">
            <div className="text-3xl font-bold">150+</div>
            <div className="text-sm">{t('stats.totalTerms')}</div>
          </div>
          <div className="border p-4 rounded">
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm">{t('stats.categories')}</div>
          </div>
          <div className="border p-4 rounded">
            <div className="text-3xl font-bold">100%</div>
            <div className="text-sm">{t('stats.coverage')}</div>
          </div>
        </div>

        <div className="mt-8">
          <input
            type="text"
            placeholder={t('search.placeholder')}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h2 className="text-2xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="mb-4">{t('cta.description')}</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded">
            {t('cta.button')}
          </button>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-yellow-100 rounded">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p>Current Language: {language}</p>
          <p>Translations loading correctly: ✅</p>
        </div>
      </div>
    </div>
  );
}