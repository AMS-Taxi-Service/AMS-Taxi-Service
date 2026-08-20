import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { LanguageProvider } from './lib/LanguageContext'
import ScrollToTop from './components/ScrollToTop'
import UserLayout from './components/layout/UserLayout'
import AdminLayout from './components/layout/AdminLayout'
import UserHomePage from './templates/user/UserHomePage'
import UserCarsPage from './templates/user/UserCarsPage'
import UserAboutPage from './templates/user/UserAboutPage'
import UserContactPage from './templates/user/UserContactPage'
import AdminLoginPage from './templates/auth/AdminLoginPage'
import AdminDashboardPage from './templates/admin/AdminDashboardPage'
import AdminCarsPage from './templates/admin/AdminCarsPage'
import AdminCarFormPage from './templates/admin/AdminCarFormPage'
import AdminContactInfoPage from './templates/admin/AdminContactInfoPage'
import AdminWhatsappPage from './templates/admin/AdminWhatsappPage'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserHomePage />} />
            <Route path="/cars" element={<UserCarsPage />} />
            <Route path="/about" element={<UserAboutPage />} />
            <Route path="/contact" element={<UserContactPage />} />
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
              <Route
                path="/admin/contact-info"
                element={<AdminContactInfoPage />}
              />
              <Route path="/admin/whatsapp" element={<AdminWhatsappPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  )
}