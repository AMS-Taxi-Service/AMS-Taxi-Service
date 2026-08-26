import { useEffect, useState, useMemo } from 'react'
import { fetchActiveCars } from '../../lib/carsApi'
import { useDefaultWhatsappNumber } from '../../hooks/useDefaultWhatsappNumber'
import { useLanguage } from '../../lib/LanguageContext'
import type { Car } from '../../types/car'
import CarCard from '../../components/user/CarCard'
import { CarIcon, MessageCircleIcon, WhatsAppIcon } from '../../components/icons'

export default function UserCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const whatsapp = useDefaultWhatsappNumber()
  const { t } = useLanguage()

  // Filters
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCapacity, setSelectedCapacity] = useState<string>('all')

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

  const filteredCars = useMemo(() => {
    let result = [...cars]

    // Type filter
    if (selectedType !== 'all') {
      result = result.filter((car) => car.category.toLowerCase() === selectedType)
    }

    // Capacity filter
    if (selectedCapacity !== 'all') {
      if (selectedCapacity === '2-4') {
        result = result.filter((car) => car.seats >= 2 && car.seats <= 4)
      } else if (selectedCapacity === '5-7') {
        result = result.filter((car) => car.seats >= 5 && car.seats <= 7)
      } else if (selectedCapacity === '8+') {
        result = result.filter((car) => car.seats >= 8)
      }
    }

    // Popular: featured cars pehle
    result.sort((a, b) => Number(b.featured) - Number(a.featured))

    return result
  }, [cars, selectedType, selectedCapacity])

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navbar band — footer wala dark color */}
      <div className="h-16 bg-slate-950 sm:h-20" />

      {/* Page heading — compact */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Soft glow accents */}
        <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-48 w-64 rounded-full bg-teal-100/50 blur-3xl" />

          <div className="relative mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              <CarIcon className="h-3.5 w-3.5" />
              {t('ourFleet')}
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t('allVehicles')}
            </h1>

            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />

            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
              {t('carsPageDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Vehicle Type */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900">{t('vehicleType')}</h3>
                  <div className="mt-4 space-y-2">
                    {[
                      { value: 'all', label: t('all') },
                      { value: 'sedan', label: t('sedan') },
                      { value: 'suv', label: 'SUV' },
                      { value: 'van', label: t('van') },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setSelectedType(type.value)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          selectedType === type.value
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Capacity */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900">{t('capacity')}</h3>
                  <div className="mt-4 space-y-2">
                    {[
                      { value: 'all', label: t('all') },
                      { value: '2-4', label: '2-4' },
                      { value: '5-7', label: '5-7' },
                      { value: '8+', label: '8+' },
                    ].map((cap) => (
                      <button
                        key={cap.value}
                        onClick={() => setSelectedCapacity(cap.value)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          selectedCapacity === cap.value
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {cap.label} {cap.value !== 'all' ? t('seats') : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Need Help */}
                <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg shadow-emerald-600/20">
                  <MessageCircleIcon className="h-8 w-8" />
                  <h3 className="mt-4 text-base font-bold">{t('needHelp')}</h3>
                  <p className="mt-2 text-sm text-emerald-50">{t('needHelpDesc')}</p>
                  {whatsapp?.number && (
                    <a
                      href={`https://wa.me/${whatsapp.number}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-emerald-700 shadow-md transition hover:bg-emerald-50"
                    >
                      <MessageCircleIcon className="h-4 w-4" />
                      {t('chatOnWhatsApp')}
                    </a>
                  )}
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1">
              {/* Mobile — vehicle type pills */}
              <div className="mb-6 flex flex-wrap justify-center gap-2 lg:hidden">
                {[
                  { value: 'all', label: t('all') },
                  { value: 'sedan', label: t('sedan') },
                  { value: 'suv', label: 'SUV' },
                  { value: 'van', label: t('van') },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                      selectedType === type.value
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-white text-slate-600 shadow-sm hover:bg-slate-100'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {!loading && !hasError && filteredCars.length > 0 ? (
                <p className="mb-6 text-sm font-semibold text-slate-400">
                  {filteredCars.length} {t('carsAvailable')}
                </p>
              ) : null}

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                </div>
              ) : hasError ? (
                <div className="rounded-2xl bg-red-50 p-12 text-center text-sm font-medium text-red-700">
                  {t('carsError')}
                </div>
              ) : filteredCars.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center text-sm text-slate-500">
                  {t('carsEmpty')}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCars.map((car) => (
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
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b3d2c] to-[#07271c] shadow-xl shadow-emerald-950/20">
            {/* Faint line-art pattern */}
            <img
              src="/cta-art.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
            />

            <div className="relative flex flex-col items-start gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-12">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {t('cantFindWhatYouNeed')}
                </h2>
                <p className="mt-2 text-sm text-emerald-100/70 sm:text-base">
                  {t('cantFindDesc')}
                </p>
              </div>

              {whatsapp?.number && (
                <a
                  href={`https://api.whatsapp.com/send?phone=${whatsapp.number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-emerald-300/50 bg-emerald-400/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-400/20"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t('chatOnWhatsApp')}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}