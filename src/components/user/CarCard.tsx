import type { Car } from '../../types/car'
import { buildCarWhatsappLink } from '../../lib/whatsapp'
import { useLanguage } from '../../lib/LanguageContext'
import { CarIcon, ShieldCheckIcon, UsersIcon, WhatsAppIcon, } from '../icons'

export default function CarCard({
  car,
  whatsappNumber,
}: {
  car: Car
  whatsappNumber?: string | null
}) {
  const { lang, t } = useLanguage()

  return (
    <div className="group relative mx-1 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-0 sm:rounded-3xl">
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden bg-white sm:h-56">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={car.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
            <CarIcon className="h-16 w-16 sm:h-20 sm:w-20" />
          </div>
        )}

        {/* Category badge — top right */}
        <span className="absolute right-3 top-3 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
          {car.category}
        </span>
      </div>

      {/* Body Section */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-lg font-bold text-slate-900">
          {car.name}
        </h3>

        {/* Info row — 2 items */}
        <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-600 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <UsersIcon className="h-4 w-4 text-slate-400" />
            {car.seats} {t('seats')}
          </span>

          <span className="flex items-center gap-1.5 text-emerald-700">
            <ShieldCheckIcon className="h-4 w-4" />
            {t('withDriver')}
          </span>
        </div>

        {whatsappNumber ? (
          <a
            href={buildCarWhatsappLink(whatsappNumber, car, lang)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-600 sm:mt-5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t('bookOnWhatsApp')}
          </a>
        ) : null}
      </div>
    </div>
  )
}