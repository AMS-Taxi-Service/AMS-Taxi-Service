import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../lib/auth'
import {
  CarIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
  XIcon,
} from '../icons'

const navigation = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon, end: true },
  { label: 'Cars', path: '/admin/cars', icon: CarIcon, end: false },
  {
    label: 'Contact Us Info',
    path: '/admin/contact-info',
    icon: PhoneIcon,
    end: false,
  },
  {
    label: 'WhatsApp',
    path: '/admin/whatsapp',
    icon: WhatsAppIcon,
    end: false,
  },
]

function getPageTitle(pathname: string): string {
  if (pathname === '/admin') return 'Dashboard'
  if (pathname === '/admin/cars') return 'Cars'
  if (pathname === '/admin/contact-info') return 'Contact Us Info'
  if (pathname === '/admin/whatsapp') return 'WhatsApp'
  if (pathname === '/admin/cars/new') return 'Add Car'
  if (pathname.startsWith('/admin/cars/') && pathname.endsWith('/edit'))
    return 'Edit Car'
  return 'Admin'
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const closeSidebar = () => setSidebarOpen(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 md:hidden"
          onClick={closeSidebar}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
          <Link
            to="/admin"
            onClick={closeSidebar}
            className="text-lg font-bold text-white"
          >
            Car<span className="text-emerald-500">Booking</span>
          </Link>

          <button
            className="text-slate-400 md:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-3 text-xs text-slate-500">
          Admin Panel v1
        </div>
      </aside>

      <div className="flex min-h-screen flex-col md:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
          <div className="flex h-16 items-center justify-between gap-2 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                className="text-slate-600 md:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <MenuIcon className="h-6 w-6" />
              </button>

              <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                {getPageTitle(location.pathname)}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:text-sm"
              >
                <GlobeIcon className="h-4 w-4" />
                <span className="hidden sm:inline">View User Site</span>
                <span className="sm:hidden">Site</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:text-sm"
              >
                <LogOutIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}