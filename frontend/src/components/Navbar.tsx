import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('access');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.first_name || user.username || 'Usuario');
      } catch (error) {
        setUserName(null);
      }
    } else {
      setUserName(null);
    }
  };

  useEffect(() => {
    checkAuth();

    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    setUserName(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar-chicha">
      <div className="navbar-brand">
        <Link to="/">Sabor Peruano</Link>
      </div>

      <ul className="navbar-menu">
        <li><Link to="/cocina">Nuestra cocina</Link></li>
        <li><Link to="/menu">La carta</Link></li>
        <li><Link to="/experiencias">Experiencias</Link></li>
        <li><Link to="/eventos">Eventos</Link></li>
        <li><Link to="/equipo">Nuestro equipo</Link></li>
      </ul>

      <div className="navbar-auth">
        <Link
          to={userName ? "/reservations/new" : "/login"}
          className="btn-reservar"
        >
          Reservar
        </Link>
        {userName ? (
          <div className="user-menu-container">
            <button
              className="user-dropdown-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {userName} ▼
            </button>

            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/cuenta" onClick={() => setIsDropdownOpen(false)}>Cuenta</Link>
                <Link to="/my-reservations" onClick={() => setIsDropdownOpen(false)}>Mis reservas</Link>
                <button onClick={handleLogout}>Salir</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-link">Iniciar sesion</Link>
        )}
      </div>
    </nav>
  );
};