import { useEffect, useState } from 'react'
import { fetchContactInfos } from '../lib/contactApi'
import type { ContactInfo } from '../types/contactInfo'

export function useContactInfos() {
  const [items, setItems] = useState<ContactInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchContactInfos()
        if (!cancelled) setItems(data)
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { items, loading }
}