import { useEffect, useState, type FormEvent } from 'react'
import {
  createContactInfo,
  deleteContactInfo,
  fetchContactInfos,
  updateContactInfo,
} from '../../lib/contactApi'
import type { ContactInfo, ContactType } from '../../types/contactInfo'
import {
  MailIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
} from '../../components/icons'

const inputClass =
  'h-12 w-full rounded-xl border border-slate-300 px-4 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'

export default function AdminContactInfoPage() {
  const [items, setItems] = useState<ContactInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [formType, setFormType] = useState<ContactType>('phone')
  const [formValue, setFormValue] = useState('')

  const load = async () => {
    try {
      const data = await fetchContactInfos()
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
    setFormType('phone')
    setFormValue('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = formValue.trim()

    if (!value) {
      setError('Value is required.')
      return
    }

    if (formType === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      setError('Invalid email address.')
      return
    }

    setSaving(true)
    setError('')

    try {
      if (editingId) {
        await updateContactInfo(editingId, { type: formType, value })
      } else {
        await createContactInfo({ type: formType, value })
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: ContactInfo) => {
    setEditingId(item.id)
    setFormType(item.type)
    setFormValue(item.value)
    setError('')
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Kya aap waqai is contact info ko delete karna chahte hain?'
    )

    if (!confirmed) return

    setDeletingId(id)
    setError('')

    try {
      await deleteContactInfo(id)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete.')
    } finally {
      setDeletingId('')
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Add / Edit Form */}
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          {editingId ? 'Edit Contact Info' : 'Add Contact Info'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Ye info user site ke Contact Us page aur footer me show hogi.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-sm font-medium text-slate-700">Type</p>
              <select
                value={formType}
                onChange={(event) =>
                  setFormType(event.target.value as ContactType)
                }
                className={inputClass}
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-slate-700">
                Value
              </p>
              <input
                value={formValue}
                onChange={(event) => setFormValue(event.target.value)}
                placeholder={
                  formType === 'phone'
                    ? '+966 50 123 4567'
                    : 'info@example.com'
                }
                dir="ltr"
                className={inputClass}
              />
            </div>
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
              No contact info yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Upar form se phone ya email add karo.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  {item.type === 'phone' ? (
                    <PhoneIcon className="h-5 w-5" />
                  ) : (
                    <MailIcon className="h-5 w-5" />
                  )}
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {item.type}
                  </p>
                  <p
                    className="truncate text-sm font-semibold text-slate-900"
                    dir="ltr"
                  >
                    {item.value}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100"
                  aria-label="Edit"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100 disabled:opacity-60"
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