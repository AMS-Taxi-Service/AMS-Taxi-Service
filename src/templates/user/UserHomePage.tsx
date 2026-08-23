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
        {/* Background image — simple, koi flip nahi */}
        <picture className="absolute inset-0 h-full w-full">
          <source media="(min-width: 640px)" srcSet="/hero.png" />
          <img
            src="/hero-mobile.png"
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-top sm:object-center"
          />
        </picture>

        {/* Text readability ke liye halka overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-950/40 sm:to-transparent" />

        <div className="relative mx-auto w-full max-w-[1800px] px-4 pb-40 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:px-12 lg:pb-32 lg:pt-44 xl:px-20">
          <div className="max-w-[78%] text-start sm:max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-emerald-300 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm">
              <StarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {t('heroBadge')}
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl">
              {t('heroTitle1')} {t('heroTitleHighlight')}
              <span className="mt-1 block text-emerald-400">
                {t('heroTitle2')}
              </span>
            </h1>

            <p className="mt-3 text-xs leading-5 text-slate-300/80 sm:mt-5 sm:text-base sm:leading-7">
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
      </section>

      {/* Trust strip — floating card */}
      <section className="relative z-10 -mt-10 sm:-mt-12">
        <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-900/10 md:grid-cols-4 md:divide-x md:divide-y-0">
            <div className="flex items-center gap-3 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <ShieldCheckIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {t('licensedDrivers')}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {t('licensedDriversDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <ClockIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {t('onTimePickup')}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {t('onTimePickupDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <UsersIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {t('familyFriendly')}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {t('familyFriendlyDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {t('support247')}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {t('support247Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars — big container */}
      <section>
        <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 sm:mt-8 sm:p-8 lg:p-10">
            {/* Header row */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                  {t('premiumFleet')}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {t('featuredCars')}
                </h2>
              </div>

              <Link
                to="/cars"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-600 hover:text-emerald-700"
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
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
                {t('featuredComingSoon')}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto w-full max-w-[1800px] px-4 py-10 sm:px-6 sm:py-14 lg:px-12 xl:px-20">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
            {/* Line-art background (poori card par) */}
            <picture>
              <source media="(min-width: 1024px)" srcSet="/cta-art.png" />
              <img
                src="/cta-art-mobile.png"
                alt=""
                loading="lazy"
                decoding="async"
                className="block max-h-[420px] w-full object-cover object-bottom sm:max-h-[480px] lg:h-auto lg:max-h-none"
              />
            </picture>

            {/* Text readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e24]/80 via-transparent to-transparent sm:bg-gradient-to-r sm:from-[#0a2e24]/90 sm:via-[#0a2e24]/40 sm:to-transparent" />

            <div className="absolute inset-0 flex max-w-[68%] flex-col items-start justify-start px-6 py-8 sm:max-w-none sm:p-10 lg:max-w-xl lg:p-14">
              <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-3xl">
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