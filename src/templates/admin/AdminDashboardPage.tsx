import { useEffect, useState } from 'react'
import { fetchCars } from '../../lib/carsApi'
import type { Car } from '../../types/car'

export default function AdminDashboardPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchCars()
        if (!cancelled) setCars(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load stats.')
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

  const totalCars = cars.length
  const activeCars = cars.filter((car) => car.status === 'active').length
  const inactiveCars = totalCars - activeCars
  const featuredCars = cars.filter((car) => car.featured).length

  const stats = [
    { label: 'Total Cars', value: totalCars, color: 'text-slate-900' },
    { label: 'Active Cars', value: activeCars, color: 'text-emerald-600' },
    { label: 'Inactive Cars', value: inactiveCars, color: 'text-red-600' },
    { label: 'Featured Cars', value: featuredCars, color: 'text-amber-600' },
  ]

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-4 shadow-sm sm:p-6"
          >
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              {stat.label}
            </p>
            <p className={`mt-2 text-2xl font-bold sm:text-3xl ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          Overview
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Ye statistics ab Supabase database se aa rahi hain.
        </p>
      </div>
    </div>
  )
}