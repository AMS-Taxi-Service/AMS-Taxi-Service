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
        <picture className="absolute inset-0 h-full w-full">
          <source media="(min-width: 640px)" srcSet="/hero.webp" />
          <img
            src="/hero-mobile.png"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-910" />

        <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-600/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
              <StarIcon className="h-3.5 w-3.5" />
              {t('heroBadge')}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              {t('heroTitle1')}{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">
                {t('heroTitleHighlight')}
              </span>{' '}
              {t('heroTitle2')}
            </h1>

            <p className="mt-5 text-sm leading-6 text-slate-400 sm:text-lg sm:leading-8">
              {t('heroDesc')}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/cars"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              >
                {t('browseCars')}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <ShieldCheckIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {t('licensedDrivers')}
              </p>
              <p className="text-xs text-slate-500">
                {t('licensedDriversDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <ClockIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {t('onTimePickup')}
              </p>
              <p className="text-xs text-slate-500">{t('onTimePickupDesc')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <UsersIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {t('familyFriendly')}
              </p>
              <p className="text-xs text-slate-500">
                {t('familyFriendlyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
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
              className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition hover:text-emerald-800"
            >
              {t('viewAllCars')}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="mt-10 flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
            </div>
          ) : featuredCars.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
              {t('featuredComingSoon')}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-950 px-6 py-10 text-center shadow-2xl shadow-emerald-900/30 sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

            <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                <ClockIcon className="h-3.5 w-3.5" />
                {t('available247')}
              </span>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t('ctaTitle1')}{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">
                  {t('ctaTitleHighlight')}
                </span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-emerald-100/80 sm:text-base sm:leading-7">
                {t('ctaDesc')}
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-bold text-emerald-900 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  {t('contactUs')}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-emerald-100/70">
                <span className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4 text-emerald-300" />
                  {t('licensedDrivers')}
                </span>
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-emerald-300" />
                  {t('onTimePickup')}
                </span>
                <span className="flex items-center gap-2">
                  <StarIcon className="h-4 w-4 text-amber-300" />
                  {t('trustedTravellers')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}