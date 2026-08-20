import { useState } from 'react'
import { useLanguage } from '../lib/LanguageContext'
import type { Language } from '../lib/translations'
import { GlobeIcon } from './icons'

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
]

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)

  const current = languages.find((item) => item.code === lang) ?? languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        aria-label="Change language"
      >
        <GlobeIcon className="h-4 w-4 text-emerald-700" />
        <span>{current.label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div className="absolute end-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLang(item.code)
                setOpen(false)
              }}
              className={`block w-full px-4 py-2.5 text-start text-sm font-semibold transition ${
                item.code === lang
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}