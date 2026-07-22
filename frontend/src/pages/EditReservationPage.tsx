import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateReservation } from '../api/reservationApi';
import { getTables } from '../api/tableApi';
import styles from './EditReservationPage.module.css';

export const EditReservationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [tables, setTables] = useState<any[]>([]);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [formData, setFormData] = useState({ table: '', reservation_date: '', reservation_time: '', guests: 1 });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const tablesData = await getTables();
                setTables(tablesData);
                const token = localStorage.getItem('access');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations/${id}/`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        table: data.table || '', reservation_date: data.reservation_date || data.date || '',
                        reservation_time: data.reservation_time || data.time || '', guests: data.guests || data.number_of_people || 1
                    });
                } else navigate('/mis-reservas');
            } catch (error) { console.error("Error:", error); } finally { setIsLoading(false); }
        };
        if (id) fetchInitialData();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateReservation(id as string, formData);
            setNotification({ show: true, message: 'Reserva modificada exitosamente.', type: 'success' });
            setTimeout(() => navigate('/mis-reservas'), 1500);
        } catch (error) {
            setNotification({ show: true, message: 'Hubo un error al intentar modificar la reserva. Comprueba la capacidad de la mesa.', type: 'error' });
            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
        }
    };

    if (isLoading) return <div className={styles.loading}>Cargando los datos de tu reserva...</div>;

    return (
        <div className={styles.container}>
            {notification.show && (
                <div className={`${styles.notification} ${notification.type === 'success' ? styles.success : styles.error}`}>
                    {notification.type === 'success' ? '✓' : '⚠'} {notification.message}
                </div>
            )}
            <div className={styles.formBox}>
                <h1 className={styles.title}>Modificar Reserva</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Mesa y Zona</label>
                        <select name="table" value={formData.table} onChange={handleChange} required className={styles.input}>
                            <option value="">Seleccione una mesa</option>
                            {tables.filter(t => t.available !== false).map(t => (
                                <option key={t.id} value={t.id}>
                                    Mesa {t.number} - {t.location || 'Sin asignar'} (Capacidad: {t.capacity} personas)
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Fecha</label>
                        <input type="date" name="reservation_date" value={formData.reservation_date} onChange={handleChange} required className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Hora</label>
                        <input type="time" name="reservation_time" value={formData.reservation_time} onChange={handleChange} required className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Número de Personas</label>
                        <input type="number" name="guests" min="1" max="20" value={formData.guests} onChange={handleChange} required className={styles.input} />
                    </div>
                    <div className={styles.buttonsRow}>
                        <button type="submit" className={styles.saveBtn}>Guardar</button>
                        <button type="button" onClick={() => navigate('/mis-reservas')} className={styles.cancelBtn}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};