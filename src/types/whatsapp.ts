export type WhatsappNumber = {
  id: string
  label: string
  number: string
  is_active: boolean
  is_default: boolean
  created_at: string
}

export type WhatsappNumberInput = {
  label: string
  number: string
  is_active: boolean
  is_default: boolean
}