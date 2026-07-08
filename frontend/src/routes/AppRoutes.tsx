import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import { ProtectedRoute } from './ProtectedRoute'

import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { MenuPage } from '../pages/MenuPage'
import { MyReservationsPage } from '../pages/MyReservationsPage'
import { NewReservationPage } from '../pages/NewReservationPage'
import { RegisterPage } from '../pages/RegisterPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/reservations/new"
              element={<NewReservationPage />}
            />

            <Route
              path="/my-reservations"
              element={<MyReservationsPage />}
            />
          </Route>

        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}