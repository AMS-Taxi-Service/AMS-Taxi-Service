import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchCars } from '../../lib/carsApi'
import type { Car, CarStatus } from '../../types/car'
import { CarIcon, PencilIcon, PlusIcon } from '../../components/icons'

const filterClass =
  'h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'

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

function CarThumb({ car }: { car: Car }) {
  if (!car.image_url) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <CarIcon className="h-6 w-6" />
      </div>
    )
  }

  return (
    <img
      src={car.image_url}
      alt={car.name}
      className="h-12 w-12 shrink-0 rounded-xl object-cover"
    />
  )
}

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<'all' | CarStatus>('all')
  const [featuredFilter, setFeaturedFilter] = useState<
    'all' | 'featured' | 'not_featured'
  >('all')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchCars()
        if (!cancelled) setCars(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load cars.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(
    () => Array.from(new Set(cars.map((car) => car.category))).sort(),
    [cars]
  )

  const filteredCars = useMemo(
    () =>
      cars.filter((car) => {
        if (categoryFilter !== 'all' && car.category !== categoryFilter) {
          return false
        }

        if (statusFilter !== 'all' && car.status !== statusFilter) {
          return false
        }

        if (featuredFilter === 'featured' && !car.featured) {
          return false
        }

        if (featuredFilter === 'not_featured' && car.featured) {
          return false
        }

        return true
      }),
    [cars, categoryFilter, statusFilter, featuredFilter]
  )

  const hasActiveFilters =
    categoryFilter !== 'all' ||
    statusFilter !== 'all' ||
    featuredFilter !== 'all'

  const clearFilters = () => {
    setCategoryFilter('all')
    setStatusFilter('all')
    setFeaturedFilter('all')
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {filteredCars.length} of {cars.length} cars
        </p>

        <div className="flex items-center gap-2">
          {hasActiveFilters ? (
            <button
              onClick={clearFilters}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear Filters
            </button>
          ) : null}

          <Link
            to="/admin/cars/new"
            className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <PlusIcon className="h-4 w-4" />
            Add Car
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-3">
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className={filterClass}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as 'all' | CarStatus)
          }
          className={filterClass}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={featuredFilter}
          onChange={(event) =>
            setFeaturedFilter(
              event.target.value as 'all' | 'featured' | 'not_featured'
            )
          }
          className={filterClass}
          aria-label="Filter by featured"
        >
          <option value="all">All Cars</option>
          <option value="featured">Featured Only</option>
          <option value="not_featured">Not Featured</option>
        </select>
      </div>

      {error ? (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      {!error && cars.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-base font-semibold text-slate-900">No cars yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Pehli car add karne ke liye “Add Car” button par click karo.
          </p>
        </div>
      ) : null}

      {!error && cars.length > 0 && filteredCars.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-base font-semibold text-slate-900">
            No cars match your filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear Filters
          </button>
        </div>
      ) : null}

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filteredCars.map((car) => (
          <div key={car.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <CarThumb car={car} />
                <div>
                  <p className="font-semibold text-slate-900">{car.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {car.category} • {car.seats} seats
                  </p>
                </div>
              </div>
              <StatusBadge status={car.status} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                SAR {car.price_per_day}/day
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
      {filteredCars.length > 0 ? (
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
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <CarThumb car={car} />
                      <div>
                        <p className="font-medium text-slate-900">{car.name}</p>
                        {car.featured ? (
                          <span className="mt-0.5 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                            Featured
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{car.category}</td>
                  <td className="px-4 py-3 text-slate-600">{car.seats}</td>
                  <td className="px-4 py-3 text-slate-600">
                    SAR {car.price_per_day}
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
      ) : null}
    </div>
  )
}