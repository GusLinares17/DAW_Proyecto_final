import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteReservation } from '../api/reservationApi';
import styles from '../styles/MyReservationsPage.module.css';

export const MyReservationsPage = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

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

  useEffect(() => { fetchMyReservations(); }, []);

  const handleCancel = async (id: string | number) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas cancelar esta reserva?");
    if (!isConfirmed) return;
    try {
      await deleteReservation(id);
      setReservations(reservations.filter(res => res.id !== id));
      setNotification({ show: true, message: 'Reserva cancelada exitosamente.', type: 'success' });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    } catch (error) {
      setNotification({ show: true, message: 'Hubo un error al cancelar la reserva.', type: 'error' });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    }
  };

  if (isLoading) return <div className={styles.loading}>Cargando tus reservas...</div>;

  return (
    <div className={styles.container}>
      {notification.show && (
        <div className={`${styles.notification} ${notification.type === 'success' ? styles.success : styles.error}`}>
          {notification.type === 'success' ? '✓' : '⚠'} {notification.message}
        </div>
      )}

      <div className={styles.innerBox}>
        <h1 className={styles.title}>Mis Reservas</h1>

        {reservations.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Aún no tienes reservas con nosotros.</p>
            <Link to="/reservations/new" className={styles.btnReservar}>Hacer una reserva</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {reservations.map((res) => (
              <div key={res.id} className={styles.card}>
                <div>
                  <h3 className={styles.cardTitle}>Reserva para {res.guests || res.number_of_people} personas</h3>
                  <div className={styles.cardDetails}>
                    <span><strong>Fecha:</strong> {res.reservation_date || res.date}</span>
                    <span><strong>Hora:</strong> {res.reservation_time || res.time}</span>
                    <span><strong>Mesa:</strong> {res.table_detail?.number ? `Mesa #${res.table_detail.number}` : 'Asignación pendiente'}</span>
                  </div>
                </div>

                <div className={styles.btnGroup}>
                  <Link to={`/editar-reserva/${res.id}`} className={styles.btnModify}>Modificar</Link>
                  <button onClick={() => handleCancel(res.id)} className={styles.btnCancel}>Cancelar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};