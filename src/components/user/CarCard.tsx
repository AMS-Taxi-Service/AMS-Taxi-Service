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
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10">
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-60">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={car.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-300">
            <CarIcon className="h-16 w-16" />
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Featured badge (top left) */}
        {car.featured ? (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-950 shadow-lg">
            <StarIcon className="h-3 w-3" />
            Featured
          </span>
        ) : null}

        {/* Category badge (top right) */}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 backdrop-blur">
          {car.category}
        </span>

        {/* Car name on image */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-extrabold text-white drop-shadow-md">
            {car.name}
          </h3>
        </div>

        {/* Price (future use - jab zaroorat ho comment hata dena) */}
        {/* <span className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          SAR {car.price_per_day}/day
        </span> */}
      </div>

      {/* Body Section */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
            <UsersIcon className="h-3.5 w-3.5 text-emerald-700" />
            {car.seats} Seats
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
            <ShieldCheckIcon className="h-3.5 w-3.5" />
            With Driver
          </span>
        </div>

        {whatsappNumber ? (
          <a
            href={buildCarWhatsappLink(whatsappNumber, car)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#128C42] to-[#0e6e34] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book on WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  )
}