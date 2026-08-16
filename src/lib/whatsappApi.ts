import { supabase } from './supabase'
import type { WhatsappNumber, WhatsappNumberInput } from '../types/whatsapp'

export async function fetchActiveWhatsappNumbers(): Promise<WhatsappNumber[]> {
  const { data, error } = await supabase
    .from('whatsapp_numbers')
    .select('*')
    .eq('is_active', true)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as WhatsappNumber[]
}

export async function fetchAllWhatsappNumbers(): Promise<WhatsappNumber[]> {
  const { data, error } = await supabase
    .from('whatsapp_numbers')
    .select('*')
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as WhatsappNumber[]
}

export async function createWhatsappNumber(
  input: WhatsappNumberInput
): Promise<WhatsappNumber> {
  const { data, error } = await supabase
    .from('whatsapp_numbers')
    .insert(input)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as WhatsappNumber
}

export async function updateWhatsappNumber(
  id: string,
  input: WhatsappNumberInput
): Promise<WhatsappNumber> {
  const { data, error } = await supabase
    .from('whatsapp_numbers')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as WhatsappNumber
}

export async function deleteWhatsappNumber(id: string): Promise<void> {
  const { error } = await supabase
    .from('whatsapp_numbers')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}

export async function setDefaultWhatsappNumber(id: string): Promise<void> {
  const { error } = await supabase
    .from('whatsapp_numbers')
    .update({ is_default: false })
    .neq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  const { error: secondError } = await supabase
    .from('whatsapp_numbers')
    .update({ is_default: true })
    .eq('id', id)

  if (secondError) {
    throw new Error(secondError.message)
  }
}