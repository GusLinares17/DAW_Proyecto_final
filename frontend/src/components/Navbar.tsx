import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('access');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.first_name || user.username || 'Usuario');
        setIsAdmin(user.is_admin || false);
      } catch (error) {
        setUserName(null);
        setIsAdmin(false);
      }
    } else {
      setUserName(null);
      setIsAdmin(false);
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
    setIsAdmin(false);
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
        {!isAdmin && (
          <Link
            to={userName ? "/reservations/new" : "/login"}
            className="btn-reservar"
          >
            Reservar
          </Link>
        )}
        
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
                {isAdmin ? (
                  <>
                    <Link to="/admin/carta" onClick={() => setIsDropdownOpen(false)}>Modificar carta</Link>
                    <Link to="/admin/categorias" onClick={() => setIsDropdownOpen(false)}>Modificar categorías</Link>
                    <Link to="/admin/mesas" onClick={() => setIsDropdownOpen(false)}>Modificar mesas</Link>
                    <Link to="/admin/reservas" onClick={() => setIsDropdownOpen(false)}>Modificar reservas</Link>
                    <button onClick={handleLogout}>Salir</button>
                  </>
                ) : (
                  <>
                    <Link to="/cuenta" onClick={() => setIsDropdownOpen(false)}>Cuenta</Link>
                    <Link to="/my-reservations" onClick={() => setIsDropdownOpen(false)}>Mis reservas</Link>
                    <button onClick={handleLogout}>Salir</button>
                  </>
                )}
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