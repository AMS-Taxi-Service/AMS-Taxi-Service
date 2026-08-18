import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchActiveCars } from '../../lib/carsApi'
import type { Car } from '../../types/car'
import CarCard from '../../components/user/CarCard'
import { useDefaultWhatsappNumber } from '../../hooks/useDefaultWhatsappNumber'
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
   const whatsapp = useDefaultWhatsappNumber()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
              <StarIcon className="h-3.5 w-3.5" />
              Trusted Transport in Saudi Arabia
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Reliable{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">
                Taxi Service
              </span>{' '}
              in Saudi Arabia
            </h1>

            <p className="mt-5 text-sm leading-6 text-slate-400 sm:text-lg sm:leading-8">
              Makkah, Madinah, airport pickups, Umrah transport and city tours
              — comfortable taxis with professional drivers.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/cars"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
              >
                Browse Cars
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Contact Us
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
                Licensed Drivers
              </p>
              <p className="text-xs text-slate-500">Safe & insured travel</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <ClockIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">On-Time Pickup</p>
              <p className="text-xs text-slate-500">
                Airport & hotel transfers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <UsersIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Family Friendly
              </p>
              <p className="text-xs text-slate-500">Vans & VIP cars for groups</p>
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
                Premium Fleet
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Featured Cars
              </h2>
            </div>

            <Link
              to="/cars"
              className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition hover:text-emerald-800"
            >
              View All Cars
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="mt-10 flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
            </div>
          ) : featuredCars.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
              Featured cars coming soon.
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-950 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

            <h2 className="relative text-2xl font-extrabold text-white sm:text-4xl">
              Need a car for your trip?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-emerald-100 sm:text-base">
              Contact us now and we will arrange the perfect car with a
              professional driver for you.
            </p>

            <Link
              to="/contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-lg transition hover:bg-emerald-50"
            >
              Contact Us
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}