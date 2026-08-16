import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import UserLayout from './components/layout/UserLayout'
import AdminLayout from './components/layout/AdminLayout'
import UserHomePage from './templates/user/UserHomePage'
import AdminLoginPage from './templates/auth/AdminLoginPage'
import AdminDashboardPage from './templates/admin/AdminDashboardPage'
import AdminCarsPage from './templates/admin/AdminCarsPage'
import AdminCarFormPage from './templates/admin/AdminCarFormPage'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserHomePage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/cars" element={<AdminCarsPage />} />
            <Route path="/admin/cars/new" element={<AdminCarFormPage />} />
            <Route
              path="/admin/cars/:id/edit"
              element={<AdminCarFormPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}