import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createCar,
  deleteCar,
  fetchCarById,
  updateCar,
} from '../../lib/carsApi'
import { deleteCarImageByUrl, uploadCarImage } from '../../lib/storageApi'
import type { Car, CarStatus } from '../../types/car'
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

type FormState = {
  name: string
  category: string
  seats: string
  pricePerDay: string
  status: CarStatus
  featured: boolean
}

export default function AdminCarFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState('')

  const [currentCar, setCurrentCar] = useState<Car | null>(null)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [imageRemoved, setImageRemoved] = useState(false)

  const [form, setForm] = useState<FormState>({
    name: '',
    category: '',
    seats: '5',
    pricePerDay: '',
    status: 'active',
    featured: false,
  })

  useEffect(() => {
    if (!id) return

    let cancelled = false

    const load = async () => {
      try {
        const car = await fetchCarById(id)

        if (cancelled) return

        if (!car) {
          setNotFound(true)
        } else {
          setCurrentCar(car)
          setForm({
            name: car.name,
            category: car.category,
            seats: String(car.seats),
            pricePerDay: String(car.price_per_day),
            status: car.status,
            featured: car.featured,
          })
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load car.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [id])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB.')
      return
    }

    setError('')
    setImageFile(file)
    setImageRemoved(false)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setPreviewUrl('')
    setImageRemoved(true)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const seats = Number(form.seats)
    const pricePerDay = Number(form.pricePerDay)

    if (!form.name.trim() || !form.category.trim()) {
      setError('Car name and category are required.')
      return
    }

    if (!Number.isFinite(seats) || seats < 1) {
      setError('Seats must be at least 1.')
      return
    }

    if (!Number.isFinite(pricePerDay) || pricePerDay < 0) {
      setError('Price must be 0 or more.')
      return
    }

    setSaving(true)

    try {
      let imageUrl: string | null = currentCar?.image_url ?? null

      if (imageFile) {
        imageUrl = await uploadCarImage(imageFile)

        if (currentCar?.image_url) {
          await deleteCarImageByUrl(currentCar.image_url)
        }
      } else if (imageRemoved) {
        if (currentCar?.image_url) {
          await deleteCarImageByUrl(currentCar.image_url)
        }

        imageUrl = null
      }

      const input = {
        name: form.name.trim(),
        category: form.category.trim(),
        seats,
        price_per_day: pricePerDay,
        status: form.status,
        featured: form.featured,
        image_url: imageUrl,
      }

      if (isEdit && id) {
        await updateCar(id, input)
      } else {
        await createCar(input)
      }

      navigate('/admin/cars')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save car.')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return

    const confirmed = window.confirm(
      'Kya aap waqai is car ko delete karna chahte hain?'
    )

    if (!confirmed) return

    setDeleting(true)
    setError('')

    try {
      await deleteCar(id)

      if (currentCar?.image_url) {
        await deleteCarImageByUrl(currentCar.image_url)
      }

      navigate('/admin/cars')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete car.')
      setDeleting(false)
    }
  }

  const displayImage = previewUrl || currentCar?.image_url || ''

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    )
  }

  if (notFound) {
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
          {isEdit
            ? 'Car details update karo aur Save par click karo.'
            : 'Nayi car add karne ke liye form fill karo.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Car Image */}
          <div>
            <p className="mb-1.5 text-sm font-medium text-slate-700">
              Car Image
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {displayImage && !imageRemoved ? (
                <img
                  src={displayImage}
                  alt="Car preview"
                  className="h-24 w-24 rounded-2xl border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
                  No image
                </div>
              )}

              <div className="space-y-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {imageFile || (displayImage && !imageRemoved)
                    ? 'Change Image'
                    : 'Upload Image'}
                </label>

                {(imageFile || (displayImage && !imageRemoved)) && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="block text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                )}

                <p className="text-xs text-slate-400">
                  JPG / PNG, max 5MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Car Name">
              <input
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Toyota Camry 2022"
                className={inputClass}
              />
            </Field>

            <Field label="Category">
              <input
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                placeholder="Sedan"
                className={inputClass}
              />
            </Field>

            <Field label="Seats">
              <input
                type="number"
                min={1}
                value={form.seats}
                onChange={(event) =>
                  setForm({ ...form, seats: event.target.value })
                }
                placeholder="5"
                className={inputClass}
              />
            </Field>

            <Field label="Price Per Day (SAR)">
              <input
                type="number"
                min={0}
                value={form.pricePerDay}
                onChange={(event) =>
                  setForm({ ...form, pricePerDay: event.target.value })
                }
                placeholder="250"
                className={inputClass}
              />
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value as CarStatus })
                }
                className={inputClass}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>

            <Field label="Featured">
              <label className="flex h-12 cursor-pointer items-center gap-3 rounded-xl border border-slate-300 px-4">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    setForm({ ...form, featured: event.target.checked })
                  }
                  className="h-5 w-5 accent-emerald-700"
                />
                <span className="text-sm font-medium text-slate-700">
                  Featured car
                </span>
              </label>
            </Field>
          </div>

          {error ? (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? 'Saving...' : 'Save Car'}
            </button>
          </div>
        </form>
      </div>

      {isEdit ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-6">
          <h3 className="text-sm font-bold text-red-700">Danger Zone</h3>
          <p className="mt-1 text-sm text-red-600">
            Is car ko delete karne ke liye neeche wala button use karo.
          </p>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="mt-4 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <TrashIcon className="h-4 w-4" />
            {deleting ? 'Deleting...' : 'Delete Car'}
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