import { useEffect, useState } from 'react'
import { fetchActiveWhatsappNumbers } from '../lib/whatsappApi'
import type { WhatsappNumber } from '../types/whatsapp'

export function useDefaultWhatsappNumber() {
  const [number, setNumber] = useState<WhatsappNumber | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchActiveWhatsappNumbers()
        if (!cancelled) setNumber(data[0] ?? null)
      } catch {
        // ignore
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return number
}