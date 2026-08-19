import type { Car } from '../../types/car'
import { buildCarWhatsappLink } from '../../lib/whatsapp'
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
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg sm:rounded-3xl sm:hover:shadow-2xl sm:hover:shadow-emerald-900/10">
      {/* Image Section */}
      <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-60">
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
            <CarIcon className="h-12 w-12 sm:h-16 sm:w-16" />
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Featured badge (top left) */}
        {car.featured ? (
          <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-950 sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
            <StarIcon className="h-3 w-3" />
            Featured
          </span>
        ) : null}

        {/* Category badge (top right) */}
        <span className="absolute right-2.5 top-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-700 sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
          {car.category}
        </span>

        {/* Car name on image */}
        <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4">
          <h3 className="text-base font-extrabold text-white drop-shadow-md sm:text-lg">
            {car.name}
          </h3>
        </div>

        {/* Price (future use - jab zaroorat ho comment hata dena) */}
        {/* <span className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          SAR {car.price_per_day}/day
        </span> */}
      </div>

      {/* Body Section */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500 sm:gap-2 sm:text-xs">
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 sm:gap-1.5 sm:px-2.5 sm:py-1">
            <UsersIcon className="h-3 w-3 text-emerald-700 sm:h-3.5 sm:w-3.5" />
            {car.seats} Seats
          </span>

          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 sm:gap-1.5 sm:px-2.5 sm:py-1">
            <ShieldCheckIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            With Driver
          </span>
        </div>

        {whatsappNumber ? (
          <a
            href={buildCarWhatsappLink(whatsappNumber, car)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#128C42] to-[#0e6e34] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition hover:brightness-110 sm:mt-4 sm:py-3"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book on WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  )
}