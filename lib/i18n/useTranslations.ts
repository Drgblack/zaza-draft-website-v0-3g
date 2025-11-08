import { useLanguage } from './language-context'
import enCommon from '@/locales/en/common.json'
import deCommon from '@/locales/de/common.json'
import enAiLiteracy from '@/locales/en/aiLiteracy.json'
import deAiLiteracy from '@/locales/de/aiLiteracy.json'
import enCommunity from '@/locales/en/community.json'
import deCommunity from '@/locales/de/community.json'
import enVideos from '@/locales/en/videos.json'
import deVideos from '@/locales/de/videos.json'

const translations = {
  en: {
    common: enCommon,
    aiLiteracy: enAiLiteracy,
    community: enCommunity,
    videos: enVideos,
  },
  de: {
    common: deCommon,
    aiLiteracy: deAiLiteracy,
    community: deCommunity,
    videos: deVideos,
  },
}

export function useTranslations(namespace: string = 'common') {
  const { language } = useLanguage()
  
  const t = (key: string): string => {
    const [ns, ...pathParts] = key.includes('.') ? key.split('.') : [namespace, key]
    const path = pathParts.join('.')
    
    // Try namespace-specific
    const nsTranslations = translations[language]?.[ns] || {}
    const value = getNestedValue(nsTranslations, path)
    if (value) return value
    
    // Fallback to common
    const commonValue = getNestedValue(translations[language]?.common || {}, path)
    if (commonValue) return commonValue
    
    // Return key if not found
    return key
  }
  
  return { t, language }
}

function getNestedValue(obj: any, path: string): string | undefined {
  if (!path) return obj
  return path.split('.').reduce((current, key) => current?.[key], obj)
}
