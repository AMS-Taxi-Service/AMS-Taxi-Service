import type { Car } from '../../types/car'
import { buildCarWhatsappLink } from '../../lib/whatsapp'
import { CarIcon, StarIcon, UsersIcon, WhatsAppIcon } from '../icons'

export default function CarCard({
  car,
  whatsappNumber,
}: {
  car: Car
  whatsappNumber?: string | null
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-slate-100 sm:h-56">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={car.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <CarIcon className="h-14 w-14" />
          </div>
        )}

        {car.featured ? (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-950 shadow">
            <StarIcon className="h-3 w-3" />
            Featured
          </span>
        ) : null}

        {/* <span className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          SAR {car.price_per_day}/day
        </span> */}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-bold text-slate-900">{car.name}</h3>

        <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">
            {car.category}
          </span>

          <span className="flex items-center gap-1.5">
            <UsersIcon className="h-3.5 w-3.5" />
            {car.seats} Seats
          </span>
        </div>

        {whatsappNumber ? (
          <a
            href={buildCarWhatsappLink(whatsappNumber, car)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#128C42] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0e6e34]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book on WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  )
}