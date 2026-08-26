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
  PhoneIcon,
  WhatsAppIcon,
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
      className="relative flex min-h-screen flex-col bg-slate-950"
    >
      <header
        className={`absolute inset-x-0 top-0 z-40 transition ${
          menuOpen ? 'bg-slate-950' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-20">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 sm:gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 sm:h-9 sm:w-9">
              <CarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="whitespace-nowrap text-sm font-extrabold tracking-tight text-white sm:text-lg">
              AMS <span className="text-emerald-400">Taxi Service</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-base font-semibold text-slate-200 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  isActive ? 'text-emerald-400' : 'transition hover:text-white'
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
              className="hidden items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/30 transition hover:bg-emerald-500 md:flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t('bookNow')}
            </Link>

            <button
              className="rounded-xl border border-white/15 p-2 text-white md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <span className="flex w-5 flex-col items-start gap-[5px]">
                <span className="h-[2.5px] w-full rounded-full bg-white" />
                <span className="h-[2.5px] w-3/5 rounded-full bg-white" />
                <span className="h-[2.5px] w-full rounded-full bg-white" />
          </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="border-t border-white/10 bg-slate-950 px-4 py-3 md:hidden">
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
                        ? 'bg-white/10 text-emerald-400'
                        : 'text-slate-200 hover:bg-white/5'
                    }`
                  }
                >
                  {t(item.key)}
                </NavLink>
              ))}

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-base font-semibold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t('bookNow')}
              </Link>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-100 bg-slate-950 text-slate-300">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-3 sm:gap-10 sm:px-6">
          <div className="col-span-2 sm:col-span-1">
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