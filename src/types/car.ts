export type CarStatus = 'active' | 'inactive'

export type Car = {
  id: string
  name: string
  category: string
  seats: number
  price_per_day: number
  status: CarStatus
  featured: boolean
  image_url: string | null
  created_at: string
  updated_at: string
}

export type CarInput = {
  name: string
  category: string
  seats: number
  price_per_day: number
  status: CarStatus
  featured: boolean
  image_url: string | null
}