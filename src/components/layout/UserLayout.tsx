import { Link, Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="text-lg font-bold text-slate-900">
            Car<span className="text-emerald-700">Booking</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
            <Link to="/" className="transition hover:text-emerald-700">
              Home
            </Link>
            <Link to="/" className="transition hover:text-emerald-700">
              Cars
            </Link>
            <Link to="/" className="transition hover:text-emerald-700">
              Packages
            </Link>
            <Link to="/" className="transition hover:text-emerald-700">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Car Booking Site
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Rent cars with drivers in Saudi Arabia.
              </p>
            </div>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Car Booking Site. All rights
              reserved.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/admin"
              className="text-[10px] text-slate-700 transition hover:text-slate-500"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}