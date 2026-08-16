import { supabase } from './supabase'
import type { ContactInfo, ContactInfoInput } from '../types/contactInfo'

export async function fetchContactInfos(): Promise<ContactInfo[]> {
  const { data, error } = await supabase
    .from('contact_infos')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as ContactInfo[]
}

export async function createContactInfo(
  input: ContactInfoInput
): Promise<ContactInfo> {
  const { data, error } = await supabase
    .from('contact_infos')
    .insert(input)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as ContactInfo
}

export async function updateContactInfo(
  id: string,
  input: ContactInfoInput
): Promise<ContactInfo> {
  const { data, error } = await supabase
    .from('contact_infos')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as ContactInfo
}

export async function deleteContactInfo(id: string): Promise<void> {
  const { error } = await supabase.from('contact_infos').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}