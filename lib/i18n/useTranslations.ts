import { useLanguage } from './language-context'
import enCommon from '@/locales/en/common'
import deCommon from '@/locales/de/common'
import enAiLiteracy from '@/locales/en/aiLiteracy'
import deAiLiteracy from '@/locales/de/aiLiteracy'
import enCommunity from '@/locales/en/community'
import deCommunity from '@/locales/de/community'

const translations = {
  en: {
    common: enCommon,
    aiLiteracy: enAiLiteracy,
    community: enCommunity,
  },
  de: {
    common: deCommon,
    aiLiteracy: deAiLiteracy,
    community: deCommunity,
  },
}

export function useTranslations(namespace: string = 'common') {
  const { language } = useLanguage()
  
  const t = (key: string): string => {
    const [ns, ...pathParts] = key.includes('.') ? key.split('.') : [namespace, key]
    const path = pathParts.join('.')
    
    const nsTranslations = translations[language]?.[ns] || {}
    const value = getNestedValue(nsTranslations, path)
    if (value) return value
    
    const commonValue = getNestedValue(translations[language]?.common || {}, path)
    if (commonValue) return commonValue
    
    return key
  }
  
  return { t, language }
}

function getNestedValue(obj: any, path: string): string | undefined {
  if (!path) return obj
  return path.split('.').reduce((current, key) => current?.[key], obj)
}
