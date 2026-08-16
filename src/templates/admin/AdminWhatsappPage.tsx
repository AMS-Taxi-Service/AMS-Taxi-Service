import { useEffect, useState, type FormEvent } from 'react'
import {
  createWhatsappNumber,
  deleteWhatsappNumber,
  fetchAllWhatsappNumbers,
  setDefaultWhatsappNumber,
  updateWhatsappNumber,
} from '../../lib/whatsappApi'
import type { WhatsappNumber } from '../../types/whatsapp'
import {
  PencilIcon,
  StarIcon,
  TrashIcon,
  WhatsAppIcon,
} from '../../components/icons'

const inputClass =
  'h-12 w-full rounded-xl border border-slate-300 px-4 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'

export default function AdminWhatsappPage() {
  const [items, setItems] = useState<WhatsappNumber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [formLabel, setFormLabel] = useState('Sales')
  const [formNumber, setFormNumber] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formDefault, setFormDefault] = useState(false)

  const load = async () => {
    try {
      const data = await fetchAllWhatsappNumbers()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setFormLabel('Sales')
    setFormNumber('')
    setFormActive(true)
    setFormDefault(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanNumber = formNumber.replace(/[^\d]/g, '')

    if (!formLabel.trim()) {
      setError('Label is required.')
      return
    }

    if (cleanNumber.length < 8 || cleanNumber.length > 15) {
      setError('Number must include country code, e.g. 966501234567')
      return
    }

    setSaving(true)
    setError('')

    try {
      const input = {
        label: formLabel.trim(),
        number: cleanNumber,
        is_active: formActive,
        is_default: formDefault,
      }

      let savedId = editingId

      if (editingId) {
        await updateWhatsappNumber(editingId, input)
      } else {
        const created = await createWhatsappNumber(input)
        savedId = created.id
      }

      if (formDefault && savedId) {
        await setDefaultWhatsappNumber(savedId)
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: WhatsappNumber) => {
    setEditingId(item.id)
    setFormLabel(item.label)
    setFormNumber(item.number)
    setFormActive(item.is_active)
    setFormDefault(item.is_default)
    setError('')
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Kya aap waqai is WhatsApp number ko delete karna chahte hain?'
    )

    if (!confirmed) return

    try {
      await deleteWhatsappNumber(id)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete.')
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultWhatsappNumber(id)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set default.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Form */}
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          {editingId ? 'Edit WhatsApp Number' : 'Add WhatsApp Number'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Default number car cards ke WhatsApp button par use hota hai.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-sm font-medium text-slate-700">
                Label
              </p>
              <input
                value={formLabel}
                onChange={(event) => setFormLabel(event.target.value)}
                placeholder="Sales / Support"
                className={inputClass}
              />
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-slate-700">
                WhatsApp Number
              </p>
              <input
                value={formNumber}
                onChange={(event) => setFormNumber(event.target.value)}
                placeholder="966501234567"
                dir="ltr"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-slate-400">
                Country code ke sath, sirf numbers. Example: 966501234567
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={formActive}
                onChange={(event) => setFormActive(event.target.checked)}
                className="h-5 w-5 accent-emerald-700"
              />
              <span className="text-sm font-medium text-slate-700">
                Active
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={formDefault}
                onChange={(event) => setFormDefault(event.target.checked)}
                className="h-5 w-5 accent-amber-500"
              />
              <span className="text-sm font-medium text-slate-700">
                Default (car cards par use hoga)
              </span>
            </label>
          </div>

          {error ? (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
            </button>

            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-900">
              No WhatsApp numbers yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Upar form se apna WhatsApp number add karo.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#1da851]">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </p>

                    {item.is_default ? (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        Default
                      </span>
                    ) : null}

                    {item.is_active ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700">
                        Inactive
                      </span>
                    )}
                  </div>

                  <p className="truncate text-sm text-slate-500" dir="ltr">
                    +{item.number}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {!item.is_default ? (
                  <button
                    onClick={() => handleSetDefault(item.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                  >
                    <StarIcon className="h-3.5 w-3.5" />
                    Set Default
                  </button>
                ) : null}

                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100"
                  aria-label="Edit"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  aria-label="Delete"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}