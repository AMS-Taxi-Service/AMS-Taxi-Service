import { supabase } from './supabase'
import type { Car, CarInput } from '../types/car'

export async function fetchCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as Car[]
}

export async function fetchCarById(id: string): Promise<Car | null> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return (data as Car) ?? null
}

export async function createCar(input: CarInput): Promise<Car> {
  const { data, error } = await supabase
    .from('cars')
    .insert(input)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as Car
}

export async function updateCar(id: string, input: CarInput): Promise<Car> {
  const { data, error } = await supabase
    .from('cars')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as Car
}

export async function deleteCar(id: string): Promise<void> {
  const { error } = await supabase.from('cars').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}

export async function fetchActiveCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as Car[]
}