import { useEffect, useState } from 'react';
import { getAccessToken } from '../utils/auth';
import styles from './AdminMenuPage.module.css';

interface Reservation {
    id: string;
    date: string;
    time: string;
    number_of_people: number;
    status: string;
    customer?: { names: string; email: string };
    table_detail?: { number: string; capacity: number };
}

export function AdminReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const API_URL = import.meta.env.VITE_API_URL;
    const token = getAccessToken();

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const response = await fetch(`${API_URL}/reservations/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const data = await response.json();
            setReservations(data);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Estás seguro de cancelar/eliminar esta reserva?")) return;

        const response = await fetch(`${API_URL}/reservations/${id}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            fetchReservations();
        } else {
            alert("Error al eliminar la reserva.");
        }
    };

    return (
        <section className={styles.adminSection}>
            <div className={styles.adminHeader}>
                <h1>Administrar Todas las Reservas</h1>
            </div>

            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>ID / Cliente</th>
                        <th>Fecha y Hora</th>
                        <th>Personas</th>
                        <th>Estado</th>
                        <th>Mesa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(res => (
                        <tr key={res.id}>
                            <td>
                                <strong>{res.customer?.names || 'Usuario Admin/Desconocido'}</strong><br />
                                <small>{res.id.split('-')[0]}</small>
                            </td>
                            <td>{res.date} a las {res.time}</td>
                            <td>{res.number_of_people}</td>
                            <td>{res.status}</td>
                            <td>{res.table_detail ? `Mesa ${res.table_detail.number}` : 'Sin asignar'}</td>
                            <td>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(res.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}