'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'
import type { Language } from '@/types'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
  { code: 'nl', label: 'NL' },
]

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation()

  return (
    <div className="fixed top-4 right-4 z-50 flex bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-warm-gray/10 p-1">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
            language === code
              ? 'bg-primary text-white shadow-sm'
              : 'text-warm-gray hover:text-dark'
          }`}
          aria-label={`Switch to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
