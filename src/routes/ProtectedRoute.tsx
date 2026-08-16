import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export default function ProtectedRoute() {
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'authenticated' : 'unauthenticated')
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setStatus(session ? 'authenticated' : 'unauthenticated')
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}