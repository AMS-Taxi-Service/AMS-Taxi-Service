import { supabase } from './supabase'

const BUCKET = 'car-images'

export async function uploadCarImage(file: File): Promise<string> {
  const extension = file.name.split('.').pop() ?? 'jpg'
  const path = `cars/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)

  return data.publicUrl
}

export async function deleteCarImageByUrl(url: string): Promise<void> {
  try {
    const path = url.split(`/${BUCKET}/`)[1]

    if (!path) {
      return
    }

    await supabase.storage.from(BUCKET).remove([path])
  } catch {
    // Image delete na bhi ho to critical nahi
  }
}