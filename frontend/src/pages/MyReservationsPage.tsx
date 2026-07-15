import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteReservation } from '../api/reservationApi';

export const MyReservationsPage = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyReservations = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error("Error cargando reservas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReservations();
  }, []);

  const handleCancel = async (id: number) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas cancelar esta reserva?");
    if (!isConfirmed) return;

    try {
      await deleteReservation(id);
      setReservations(reservations.filter(res => res.id !== id));
      alert("Reserva cancelada exitosamente.");
    } catch (error) {
      alert("Hubo un error al cancelar la reserva.");
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#FDFBF7', minHeight: '80vh' }}>Cargando tus reservas...</div>;
  }

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#FDFBF7', minHeight: '80vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Times New Roman, serif', color: '#8B3A3A', fontSize: '2.5rem', marginBottom: '30px', borderBottom: '1px solid #EAEAEA', paddingBottom: '10px' }}>Mis Reservas</h1>
        
        {reservations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #EAEAEA' }}>
            <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '20px' }}>Aún no tienes reservas con nosotros.</p>
            <Link to="/nueva-reserva" className="btn-reservar">Hacer una reserva</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {reservations.map((res) => (
              <div key={res.id} style={{ backgroundColor: '#fff', border: '1px solid #EAEAEA', borderRadius: '4px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                
                <div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333', fontFamily: 'serif', fontSize: '1.4rem' }}>Reserva para {res.guests || res.number_of_people} personas</h3>
                  <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span><strong>Fecha:</strong> {res.date || res.reservation_date}</span>
                    <span><strong>Hora:</strong> {res.time || res.reservation_time}</span>
                    <span><strong>Mesa:</strong> {res.table ? `Mesa #${res.table}` : 'Asignación pendiente'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link 
                    to={`/editar-reserva/${res.id}`} 
                    style={{ backgroundColor: '#EAEAEA', color: '#333', border: 'none', padding: '8px 16px', cursor: 'pointer', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.8rem', textAlign: 'center', textDecoration: 'none' }}
                  >
                    Modificar
                  </Link>
                  <button 
                    onClick={() => handleCancel(res.id)}
                    style={{ backgroundColor: '#transparent', color: '#d32f2f', border: '1px solid #d32f2f', padding: '8px 16px', cursor: 'pointer', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.8rem', transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#d32f2f'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#d32f2f'; }}
                  >
                    Cancelar
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};