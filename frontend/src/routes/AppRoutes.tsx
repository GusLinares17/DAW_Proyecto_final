import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import { ProtectedRoute } from './ProtectedRoute'

import { AdminMenuPage } from '../pages/AdminMenuPage'
import { AdminReservationsPage } from '../pages/AdminReservationsPage'
import { CocinaPage } from '../pages/CocinaPage'
import { CuentaPage } from '../pages/CuentaPage'
import { EditReservationPage } from '../pages/EditReservationPage'
import { EquipoPage } from '../pages/EquipoPage'
import { EventosPage } from '../pages/EventosPage'
import { ExperienciasPage } from '../pages/ExperienciasPage'
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
          <Route path="/cocina" element={<CocinaPage />} />
          <Route path="/experiencias" element={<ExperienciasPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/cuenta" element={<CuentaPage />} />
          <Route path="/editar-reserva/:id" element={<EditReservationPage />} />


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
            <Route
              path="/admin/carta"
              element={<AdminMenuPage />}
            />
            <Route 
              path="/admin/reservas" 
              element={<AdminReservationsPage />} 
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