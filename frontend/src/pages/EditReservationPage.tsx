import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateReservation } from '../api/reservationApi';
import { getTables } from '../api/tableApi';

export const EditReservationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [tables, setTables] = useState<any[]>([]); // Estado para guardar las mesas
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [formData, setFormData] = useState({
        table: '',
        reservation_date: '',
        reservation_time: '',
        guests: 1
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const tablesData = await getTables();
                setTables(tablesData);

                const token = localStorage.getItem('access');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations/${id}/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        table: data.table || '', // Asignamos el ID de la mesa actual
                        reservation_date: data.reservation_date || data.date || '',
                        reservation_time: data.reservation_time || data.time || '',
                        guests: data.guests || data.number_of_people || 1
                    });
                } else {
                    navigate('/mis-reservas');
                }
            } catch (error) {
                console.error("Error al cargar detalles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchInitialData();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateReservation(id as string, formData);

            setNotification({ show: true, message: 'Reserva modificada exitosamente.', type: 'success' });

            setTimeout(() => {
                navigate('/mis-reservas');
            }, 1500);

        } catch (error) {
            setNotification({ show: true, message: 'Hubo un error al intentar modificar la reserva.', type: 'error' });
            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
        }
    };

    if (isLoading) {
        return <div style={{ padding: '100px', textAlign: 'center', backgroundColor: '#FDFBF7', minHeight: '80vh' }}>Cargando los datos de tu reserva...</div>;
    }

    return (
        <div style={{ padding: '60px 20px', backgroundColor: '#FDFBF7', minHeight: '80vh', position: 'relative' }}>

            {notification.show && (
                <div style={{
                    position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)',
                    backgroundColor: notification.type === 'success' ? '#2e7d32' : '#d32f2f',
                    color: 'white', padding: '12px 24px', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000, fontFamily: 'monospace', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px',
                    animation: 'fadeInOut 1.5s ease-in-out'
                }}>
                    {notification.type === 'success' ? '✓' : '⚠'} {notification.message}
                </div>
            )}

            <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '8px', border: '1px solid #EAEAEA', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <h1 style={{ fontFamily: 'Times New Roman, serif', color: '#8B3A3A', textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Modificar Reserva</h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Mesa</label>
                        <select name="table" value={formData.table} onChange={handleChange} required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', outlineColor: '#8B3A3A' }}>
                            <option value="">Seleccione una mesa</option>
                            {tables.map((t) => (
                                <option key={t.id} value={t.id}>Mesa {t.number} · {t.capacity} personas</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Fecha</label>
                        <input type="date" name="reservation_date" value={formData.reservation_date} onChange={handleChange} required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', outlineColor: '#8B3A3A' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Hora</label>
                        <input type="time" name="reservation_time" value={formData.reservation_time} onChange={handleChange} required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', outlineColor: '#8B3A3A' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Número de Personas</label>
                        <input type="number" name="guests" min="1" max="20" value={formData.guests} onChange={handleChange} required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', outlineColor: '#8B3A3A' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <button type="submit" style={{ flex: 1, backgroundColor: '#8B3A3A', color: 'white', padding: '14px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', borderRadius: '4px' }}>
                            Guardar
                        </button>
                        <button type="button" onClick={() => navigate('/mis-reservas')} style={{ flex: 1, backgroundColor: '#EAEAEA', color: '#333', padding: '14px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', borderRadius: '4px' }}>
                            Cancelar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};