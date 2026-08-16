import { Link } from 'react-router-dom'
import { dummyCars } from '../../data/dummyCars'
import { PencilIcon, PlusIcon } from '../../components/icons'

function StatusBadge({ status }: { status: 'active' | 'inactive' }) {
  return status === 'active' ? (
    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      Active
    </span>
  ) : (
    <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
      Inactive
    </span>
  )
}

export default function AdminCarsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {dummyCars.length} cars (dummy data)
        </p>

        <Link
          to="/admin/cars/new"
          className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          <PlusIcon className="h-4 w-4" />
          Add Car
        </Link>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {dummyCars.map((car) => (
          <div key={car.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">{car.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {car.category} • {car.seats} seats
                </p>
              </div>
              <StatusBadge status={car.status} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                SAR {car.pricePerDay}/day
              </p>

              <Link
                to={`/admin/cars/${car.id}/edit`}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <PencilIcon className="h-3.5 w-3.5" />
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Car</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Seats</th>
              <th className="px-4 py-3">Price/Day</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {dummyCars.map((car) => (
              <tr key={car.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {car.name}
                </td>
                <td className="px-4 py-3 text-slate-600">{car.category}</td>
                <td className="px-4 py-3 text-slate-600">{car.seats}</td>
                <td className="px-4 py-3 text-slate-600">
                  SAR {car.pricePerDay}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={car.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/admin/cars/${car.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    <PencilIcon className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}