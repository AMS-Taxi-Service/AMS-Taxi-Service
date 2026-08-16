import { dummyCars } from '../../data/dummyCars'

export default function AdminDashboardPage() {
  const totalCars = dummyCars.length
  const activeCars = dummyCars.filter((car) => car.status === 'active').length
  const inactiveCars = totalCars - activeCars
  const featuredCars = dummyCars.filter((car) => car.featured).length

  const stats = [
    { label: 'Total Cars', value: totalCars, color: 'text-slate-900' },
    { label: 'Active Cars', value: activeCars, color: 'text-emerald-600' },
    { label: 'Inactive Cars', value: inactiveCars, color: 'text-red-600' },
    { label: 'Featured Cars', value: featuredCars, color: 'text-amber-600' },
  ]

  return (
    <div className="space-y-6">
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
          Ye dummy statistics hain. Supabase connect karne ke baad real data
          show hoga.
        </p>
      </div>
    </div>
  )
}