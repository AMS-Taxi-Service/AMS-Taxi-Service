export type DummyCar = {
  id: string
  name: string
  category: string
  seats: number
  pricePerDay: number
  status: 'active' | 'inactive'
  featured: boolean
}

export const dummyCars: DummyCar[] = [
  {
    id: '1',
    name: 'Toyota Camry 2022',
    category: 'Sedan',
    seats: 5,
    pricePerDay: 250,
    status: 'active',
    featured: true,
  },
  {
    id: '2',
    name: 'Toyota Hiace 2021',
    category: 'Van',
    seats: 12,
    pricePerDay: 450,
    status: 'active',
    featured: false,
  },
  {
    id: '3',
    name: 'GMC Yukon 2023',
    category: 'SUV',
    seats: 7,
    pricePerDay: 700,
    status: 'active',
    featured: true,
  },
  {
    id: '4',
    name: 'Hyundai H1 2020',
    category: 'Van',
    seats: 8,
    pricePerDay: 400,
    status: 'inactive',
    featured: false,
  },
  {
    id: '5',
    name: 'Lexus ES 2023',
    category: 'Luxury',
    seats: 5,
    pricePerDay: 900,
    status: 'active',
    featured: false,
  },
  {
    id: '6',
    name: 'Mercedes V-Class 2022',
    category: 'VIP',
    seats: 7,
    pricePerDay: 1100,
    status: 'inactive',
    featured: true,
  },
]