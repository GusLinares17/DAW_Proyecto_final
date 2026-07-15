import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateReservation } from '../api/reservationApi';

export const EditReservationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        reservation_date: '',
        reservation_time: '',
        guests: 1,
        special_requests: ''
    });

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                const token = localStorage.getItem('access');
                const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations/${id}/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        reservation_date: data.reservation_date || data.date || '',
                        reservation_time: data.reservation_time || data.time || '',
                        guests: data.guests || data.number_of_people || 1,
                        special_requests: data.special_requests || ''
                    });
                } else {
                    alert("No se pudo encontrar la reserva.");
                    navigate('/mis-reservas');
                }
            } catch (error) {
                console.error("Error al cargar detalles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchReservationDetails();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateReservation(Number(id), formData);
            alert('Reserva modificada exitosamente.');
            navigate('/mis-reservas');
        } catch (error) {
            alert('Hubo un error al intentar modificar la reserva.');
        }
    };

    if (isLoading) {
        return <div style={{ padding: '100px', textAlign: 'center', backgroundColor: '#FDFBF7', minHeight: '80vh' }}>Cargando los datos de tu reserva...</div>;
    }

    return (
        <div style={{ padding: '60px 20px', backgroundColor: '#FDFBF7', minHeight: '80vh' }}>
            <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '8px', border: '1px solid #EAEAEA', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <h1 style={{ fontFamily: 'Times New Roman, serif', color: '#8B3A3A', textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Modificar Reserva</h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

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