'use client'

import { createContext, useState, useEffect, type ReactNode } from 'react'
import type { Language } from '@/types'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
})

const STORAGE_KEY = 'juanlacroix-lang'
const SUPPORTED: Language[] = ['en', 'es', 'ca', 'nl']

function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED.includes(stored as Language)) {
    return stored as Language
  }

  // Auto-detect from browser
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('nl')) return 'nl'
  if (browserLang.startsWith('ca')) return 'ca'
  if (browserLang.startsWith('es')) return 'es'
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLanguageState(detectLanguage())
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  // Prevent hydration mismatch by rendering with default until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
