export type ContactType = 'phone' | 'email'

export type ContactInfo = {
  id: string
  type: ContactType
  value: string
  sort_order: number
  created_at: string
}

export type ContactInfoInput = {
  type: ContactType
  value: string
}