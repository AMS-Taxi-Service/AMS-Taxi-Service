import { useEffect, useState } from 'react'
import { fetchActiveCars } from '../../lib/carsApi'
import { useDefaultWhatsappNumber } from '../../hooks/useDefaultWhatsappNumber'
import { useLanguage } from '../../lib/LanguageContext'
import type { Car } from '../../types/car'
import CarCard from '../../components/user/CarCard'

export default function UserCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const whatsapp = useDefaultWhatsappNumber()
  const { t } = useLanguage()

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchActiveCars()
        if (!cancelled) setCars(data)
      } catch {
        if (!cancelled) setHasError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-600/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-32">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            {t('ourFleet')}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t('chooseCar')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
            {t('carsPageDesc')}
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          {!loading && !hasError && cars.length > 0 ? (
            <p className="text-sm font-semibold text-slate-500">
              {cars.length} {t('carsAvailable')}
            </p>
          ) : null}

          {loading ? (
            <div className="mt-10 flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
            </div>
          ) : hasError ? (
            <div className="mt-10 rounded-2xl bg-red-50 p-10 text-center text-sm font-medium text-red-700">
              {t('carsError')}
            </div>
          ) : cars.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
              {t('carsEmpty')}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {cars.map((car) => (
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
    </>
  )
}