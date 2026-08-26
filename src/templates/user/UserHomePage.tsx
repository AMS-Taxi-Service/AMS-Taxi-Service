import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchActiveCars } from '../../lib/carsApi'
import { useDefaultWhatsappNumber } from '../../hooks/useDefaultWhatsappNumber'
import { useLanguage } from '../../lib/LanguageContext'
import type { Car } from '../../types/car'
import CarCard from '../../components/user/CarCard'
import {
  ArrowRightIcon,
  ClockIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
} from '../../components/icons'

export default function UserHomePage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const whatsapp = useDefaultWhatsappNumber()
  const { t } = useLanguage()

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchActiveCars()
        if (!cancelled) setCars(data)
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const featuredCars = cars.filter((car) => car.featured)

  return (
    <>
          {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Image — mobile: flow me (poori, bina crop), desktop: absolute cover */}
        <picture className="block sm:absolute sm:inset-0 sm:h-full sm:w-full">
          <source media="(min-width: 640px)" srcSet="/hero.webp" />
          <img
            src="/hero-mobile.webp"
            alt=""
            fetchPriority="high"
            className="block h-auto w-full object-top sm:h-full sm:w-full sm:object-cover"
          />
        </picture>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-slate-950/75 sm:via-slate-950/25 sm:to-transparent" />

        {/* Content — mobile: image ke upar overlay, desktop: normal flow */}
        <div className="absolute inset-x-0 top-0 sm:static">
          <div className="relative mx-auto w-full max-w-[1800px] px-4 pb-52 pt-24 sm:px-6 sm:pb-36 sm:pt-28 lg:px-12 lg:pb-44 lg:pt-32 xl:px-20">
            <div className="max-w-[78%] text-start sm:max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-emerald-300 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm">
                <StarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {t('heroBadge')}
              </span>

              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl">
                {t('heroTitle1')} {t('heroTitleHighlight')}
                <span className="mt-1 block text-emerald-400">
                  {t('heroTitle2')}
                </span>
              </h1>

              <p className="mt-3 whitespace-pre-line text-xs leading-5 text-slate-300/80 sm:hidden">
                {t('heroDescMobile')}
              </p>
              <p className="mt-3 hidden whitespace-pre-line text-xs leading-5 text-slate-300/80 sm:mt-5 sm:block sm:text-base sm:leading-7">
                {t('heroDesc')}
              </p>

              <div className="mt-6 flex flex-col items-start gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3 sm:justify-start">
                <Link
                  to="/cars"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-[11px] font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 sm:justify-start sm:gap-2 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm"
                >
                  {t('browseCars')}
                  <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center justify-center rounded-lg bg-white px-4 py-2 text-[11px] font-semibold text-emerald-900 shadow-lg shadow-black/20 transition hover:bg-emerald-50 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm"
                >
                  {t('contactUs')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trust strip — 4 alag cards */}
      <section className="relative z-10 -mt-14 sm:-mt-8">
        <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Licensed Drivers */}
            <div className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-100 p-4 shadow-md shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg sm:gap-4 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-600/25 sm:h-12 sm:w-12">
                <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div>
                <p className="text-[13px] font-bold text-slate-900 sm:text-sm">
                  {t('licensedDrivers')}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                  {t('licensedDriversDesc')}
                </p>
              </div>
            </div>

            {/* On-Time Pickup */}
            <div className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-100 p-4 shadow-md shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg sm:gap-4 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 sm:h-12 sm:w-12">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div>
                <p className="text-[13px] font-bold text-slate-900 sm:text-sm">
                  {t('onTimePickup')}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                  {t('onTimePickupDesc')}
                </p>
              </div>
            </div>

            {/* Family Friendly */}
            <div className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-100 p-4 shadow-md shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg sm:gap-4 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 sm:h-12 sm:w-12">
                <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div>
                <p className="text-[13px] font-bold text-slate-900 sm:text-sm">
                  {t('familyFriendly')}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                  {t('familyFriendlyDesc')}
                </p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-100 p-4 shadow-md shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg sm:gap-4 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25 sm:h-12 sm:w-12">
                <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div>
                <p className="text-[13px] font-bold text-slate-900 sm:text-sm">
                  {t('support247')}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                  {t('support247Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Cars */}
      <section className="pt-8 sm:pt-10">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Header row */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t('featuredCars')}
              </h2>
            </div>

            <Link
              to="/cars"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-200 shadow-sm transition hover:border-emerald-500 hover:text-emerald-400"
            >
              {t('viewAllCars')}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* Cards grid */}
          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
            </div>
          ) : featuredCars.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center text-sm text-slate-400">
              {t('featuredComingSoon')}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {featuredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  whatsappNumber={whatsapp?.number ?? null}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto w-full max-w-[1800px] px-4 py-10 sm:px-6 sm:py-14 lg:px-12 xl:px-20">
            <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-slate-900/10">
            {/* Line-art background (poori card par) */}
            <picture className="block">
              <source media="(min-width: 1024px)" srcSet="/cta-art.webp" />
              <img
                src="/cta-art-mobile.webp"
                alt=""
                loading="lazy"
                decoding="async" 
                className="block h-auto w-full"
              />
            </picture>

            {/* Text readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e24]/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-[#0a2e24]/90 sm:via-[#0a2e24]/40 sm:to-transparent" />

            <div className="absolute inset-x-0 top-0 flex flex-col items-start justify-start px-6 py-6 sm:p-10 lg:inset-0 lg:max-w-xl lg:p-14">
              <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-3xl">
                {t('ctaTitle1')}{' '}
                <span className="text-emerald-300">
                  {t('ctaTitleHighlight')}
                </span>
              </h2>

              <p className="mt-3 whitespace-pre-line text-xs leading-5 text-emerald-100/70 sm:mt-3 sm:text-base sm:leading-7">
                {t('ctaDesc')}
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-500 sm:mt-6 sm:gap-2 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm"
              >
                {t('contactUs')}
                <ArrowRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}