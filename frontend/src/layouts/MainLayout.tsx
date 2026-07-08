import { Outlet } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function MainLayout() {
  return (
    <div className="layout">
      <Navbar />

      <main className="app-shell">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}