import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  translations,
  type Language,
  type TranslationKey,
} from './translations'

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('site-lang')
    return stored === 'ar' ? 'ar' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('site-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = (key: TranslationKey) => translations[lang][key]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)

  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return ctx
}