import { supabase } from './supabase'

export type LoginResult = {
  success: boolean
  error?: string
}

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
  }
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut()
}

export async function getCurrentSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}