import { Link, useNavigate } from 'react-router-dom'

import { isAuthenticated, logout } from '../utils/auth'

export function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <Link to="/" className="navbar-brand">
          Sabor Peruano
        </Link>

        <div className="navbar-links">
          <Link to="/menu">Menú</Link>
          <Link to="/reservations/new">Reservar</Link>

          {isAuthenticated() && (
            <>
              <Link to="/my-reservations">Mis reservas</Link>

              <button type="button" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}