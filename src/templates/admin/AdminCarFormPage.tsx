import { Link, useParams } from 'react-router-dom'
import { dummyCars } from '../../data/dummyCars'
import { TrashIcon } from '../../components/icons'

const inputClass =
  'h-12 w-full rounded-xl border border-slate-300 px-4 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-slate-700">{label}</p>
      {children}
    </div>
  )
}

export default function AdminCarFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const car = dummyCars.find((item) => item.id === id)

  if (isEdit && !car) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold text-red-600">Car not found</p>
        <Link
          to="/admin/cars"
          className="mt-4 inline-block text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back to Cars
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          {isEdit ? 'Edit Car' : 'Add New Car'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Form structure (dummy data). CRUD operations baad me connect hongi.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Car Name">
            <input
              defaultValue={car?.name}
              placeholder="Toyota Camry 2022"
              className={inputClass}
            />
          </Field>

          <Field label="Category">
            <input
              defaultValue={car?.category}
              placeholder="Sedan"
              className={inputClass}
            />
          </Field>

          <Field label="Seats">
            <input
              type="number"
              defaultValue={car?.seats}
              placeholder="5"
              className={inputClass}
            />
          </Field>

          <Field label="Price Per Day (SAR)">
            <input
              type="number"
              defaultValue={car?.pricePerDay}
              placeholder="250"
              className={inputClass}
            />
          </Field>

          <Field label="Status">
            <select
              defaultValue={car?.status ?? 'active'}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>

          <Field label="Featured">
            <select
              defaultValue={car?.featured ? 'yes' : 'no'}
              className={inputClass}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </Field>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Save Car
          </button>
        </div>
      </div>

      {isEdit ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-6">
          <h3 className="text-sm font-bold text-red-700">Danger Zone</h3>
          <p className="mt-1 text-sm text-red-600">
            Is car ko delete karne ke liye neeche wala button use karo.
          </p>

          <button
            type="button"
            className="mt-4 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <TrashIcon className="h-4 w-4" />
            Delete Car
          </button>
        </div>
      ) : null}

      <div>
        <Link
          to="/admin/cars"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back to Cars
        </Link>
      </div>
    </div>
  )
}