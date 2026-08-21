import type { Car } from '../../types/car'
import { buildCarWhatsappLink } from '../../lib/whatsapp'
import { useLanguage } from '../../lib/LanguageContext'
import {
  CarIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
  WhatsAppIcon,
} from '../icons'

export default function CarCard({
  car,
  whatsappNumber,
}: {
  car: Car
  whatsappNumber?: string | null
}) {
  const { lang, t } = useLanguage()

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg sm:rounded-3xl sm:hover:shadow-2xl sm:hover:shadow-emerald-900/10">
      {/* Image Section */}
      <div className="relative h-32 overflow-hidden bg-slate-100 sm:h-60">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={car.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-300">
            <CarIcon className="h-10 w-10 sm:h-16 sm:w-16" />
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Featured badge (top left) */}
        {car.featured ? (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-950 sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
            <StarIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            Featured
          </span>
        ) : null}

        {/* Category badge (top right) */}
        <span className="absolute right-2 top-2 rounded-full bg-white/95 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-slate-700 sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
          {car.category}
        </span>

        {/* Car name on image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-3 sm:left-4 sm:right-4">
          <h3 className="text-sm font-extrabold text-white drop-shadow-md sm:text-lg">
            {car.name}
          </h3>
        </div>
      </div>

      {/* Body Section */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold text-slate-500 sm:gap-2 sm:text-xs">
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 font-bold text-black sm:gap-1.5 sm:px-2.5 sm:py-1">
            <UsersIcon className="h-2.5 w-2.5 text-emerald-700 [stroke-width:3] sm:h-3.5 sm:w-3.5" />
            {car.seats} {t('seats')}
          </span>

          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 sm:gap-1.5 sm:px-2.5 sm:py-1">
            <ShieldCheckIcon className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
            {t('withDriver')}
          </span>
        </div>

        {whatsappNumber ? (
          <a
            href={buildCarWhatsappLink(whatsappNumber, car, lang)}
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#128C42] to-[#0e6e34] px-3 py-2 text-xs font-bold text-white shadow-md shadow-emerald-900/20 transition hover:brightness-110 sm:mt-4 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {t('bookOnWhatsApp')}
          </a>
        ) : null}
      </div>
    </div>
  )
}