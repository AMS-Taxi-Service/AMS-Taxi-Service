import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { siteConfig } from '../../lib/siteConfig'
import { useContactInfos } from '../../hooks/useContactInfos'
import { useLanguage } from '../../lib/LanguageContext'
import type { TranslationKey } from '../../lib/translations'
import LanguageSwitcher from '../LanguageSwitcher'
import {
  CarIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
} from '../icons'

const navItems: { key: TranslationKey; path: string }[] = [
  { key: 'home', path: '/' },
  { key: 'cars', path: '/cars' },
  { key: 'aboutUs', path: '/about' },
  { key: 'contact', path: '/contact' },
]

export default function UserLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items: contactItems } = useContactInfos()
  const { lang, t } = useLanguage()

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="flex min-h-screen flex-col bg-white"
    >
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-3 sm:px-6">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 sm:gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md shadow-emerald-700/20 sm:h-9 sm:w-9">
              <CarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="whitespace-nowrap text-xs font-extrabold tracking-tight text-slate-900 sm:text-lg">
              AMS <span className="text-emerald-700">Taxi Service</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-base font-semibold text-slate-900 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-emerald-700'
                    : 'transition hover:text-emerald-700'
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <Link
              to="/contact"
              className="hidden rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-700/20 transition hover:bg-emerald-800 md:block"
            >
              {t('bookNow')}
            </Link>

            <button
              className="rounded-xl border border-slate-200 p-2 text-slate-900 md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2.5 text-base font-semibold ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {t(item.key)}
                </NavLink>
              ))}

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-xl bg-emerald-700 px-3 py-2.5 text-center text-base font-semibold text-white"
              >
                {t('bookNow')}
              </Link>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <CarIcon className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold text-white">
                AMS <span className="text-emerald-500">Taxi Service</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              {t('footerDesc')}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              {t('quickLinks')}
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-400 transition hover:text-emerald-400"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              {t('contactFooter')}
            </p>
            <ul className="mt-4 space-y-3">
              {contactItems.map((item) =>
                item.type === 'phone' ? (
                  <li key={item.id}>
                    <a
                      href={`tel:${item.value.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-emerald-400"
                    >
                      <PhoneIcon className="h-4 w-4 text-emerald-500" />
                      <span dir="ltr">{item.value}</span>
                    </a>
                  </li>
                ) : (
                  <li key={item.id}>
                    <a
                      href={`mailto:${item.value}`}
                      className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-emerald-400"
                    >
                      <MailIcon className="h-4 w-4 text-emerald-500" />
                      <span className="break-all">{item.value}</span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} {siteConfig.siteName}.{' '}
              {t('rights')}
            </p>

            <Link
              to="/admin"
              className="text-[10px] text-slate-700 transition hover:text-slate-500"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}