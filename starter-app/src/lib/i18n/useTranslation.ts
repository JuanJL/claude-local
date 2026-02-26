'use client'

import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'
import { translations } from './translations'
import type { TranslationStrings } from '@/types'

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext)

  const t = (key: keyof TranslationStrings): string => {
    return translations[language][key] ?? key
  }

  return { t, language, setLanguage }
}
