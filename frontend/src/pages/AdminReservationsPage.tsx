import { useEffect, useState } from 'react';
import styles from '../styles/AdminReservationsPage.module.css';
import { getAccessToken } from '../utils/auth';

interface Customer { id: string; names: string; email: string; dni: string; }
interface Table { id: string; number: string; capacity: number; }
interface Reservation { 
    id: string; 
    reservation_date: string; 
    reservation_time: string; 
    guests: number; 
    status: boolean; 
    customer: any; 
    table: string; 
    table_detail?: Table; 
    location: string;
}

export function AdminReservationsPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [tables, setTables] = useState<Table[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');
    const [editingResId, setEditingResId] = useState<string | null>(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [formData, setFormData] = useState({
        reservation_date: '', reservation_time: '', guests: '', status: false, table: ''
    });

    const API_URL = import.meta.env.VITE_API_URL;
    const getHeaders = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAccessToken()}` });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const headers = getHeaders();
        try {
            const [resCust, resTab, resRes] = await Promise.all([
                fetch(`${API_URL}/customers/`, { headers }),
                fetch(`${API_URL}/tables/`, { headers }),
                fetch(`${API_URL}/reservations/`, { headers })
            ]);
            if (resCust.ok) setCustomers(await resCust.json());
            if (resTab.ok) setTables(await resTab.json());
            if (resRes.ok) setReservations(await resRes.json());
        } catch (error) {
            showToast("Error al cargar los datos.", "error");
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setFormData(prev => ({ ...prev, [name]: value === 'true' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const openModal = (customerId: string, res?: Reservation) => {
        setSelectedCustomer(customerId);
        if (res) {
            setEditingResId(res.id);
            setFormData({
                reservation_date: res.reservation_date, reservation_time: res.reservation_time,
                guests: res.guests.toString(), status: res.status, table: res.table
            });
        } else {
            setEditingResId(null);
            setFormData({ reservation_date: '', reservation_time: '', guests: '', status: false, table: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...formData, customer: selectedCustomer };
        const url = editingResId ? `${API_URL}/reservations/${editingResId}/` : `${API_URL}/reservations/`;
        const method = editingResId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method, headers: getHeaders(), body: JSON.stringify(payload)
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchData();
                showToast(`Reserva ${editingResId ? 'actualizada' : 'creada'} exitosamente.`, 'success');
            } else {
                const errorData = await response.json();
                let errorMessage = "Error al guardar la reserva:\n";
                if (typeof errorData === 'object' && errorData !== null) {
                    for (const key in errorData) {
                        const value = errorData[key];
                        if (key === 'non_field_errors') {
                            errorMessage += `- ${Array.isArray(value) ? value.join(', ') : value}\n`;
                        } else {
                            errorMessage += `- ${key}: ${Array.isArray(value) ? value.join(', ') : value}\n`;
                        }
                    }
                } else errorMessage = "Ocurrió un error inesperado en el servidor.";
                showToast(errorMessage, 'error');
            }
        } catch (error) {
            showToast("Hubo un problema de conexión con el servidor.", 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta reserva?")) return;

        try {
            const response = await fetch(`${API_URL}/reservations/${id}/`, {
                method: 'DELETE', headers: getHeaders()
            });

            if (response.ok) {
                fetchData();
                showToast("Reserva cancelada exitosamente.", 'success');
            } else {
                showToast("Error al cancelar la reserva.", 'error');
            }
        } catch (error) {
            showToast("Error de conexión al intentar eliminar.", 'error');
        }
    };

    const getCustomerReservations = (customerId: string) => {
        return reservations.filter(res => {
            const resCustomerId = typeof res.customer === 'object' ? res.customer?.id : res.customer;
            return resCustomerId === customerId;
        });
    };

    return (
        <section className={styles.adminSection}>
            {notification.show && (
                <div className={`${styles.notification} ${notification.type === 'success' ? styles.success : styles.error}`}>
                    {notification.type === 'success' ? '✓' : '⚠'} {notification.message}
                </div>
            )}

            <div className={styles.adminHeader}>
                <h1>Gestión de Reservas por Usuario</h1>
            </div>

            <table className={styles.adminTable}>
                <thead>
                    <tr><th>Cliente</th><th>Correo</th><th>Reservas Activas</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {(Array.isArray(customers) ? customers : []).map(customer => {
                        const userReservations = getCustomerReservations(customer.id);
                        return (
                            <tr key={customer.id}>
                                <td><strong>{customer.names}</strong><br /><small style={{ color: '#888' }}>{String(customer.id).substring(0, 8)}</small></td>
                                <td>{customer.email}</td>
                                <td>
                                    {userReservations.length === 0 ? (
                                        <span style={{ color: 'gray', fontStyle: 'italic' }}>Sin reservas activas</span>
                                    ) : (
                                        userReservations.map(res => (
                                            <div key={res.id} className={styles.reservationCard}>
                                                <div className={styles.reservationHeader}>
                                                    <span>📅 {res.reservation_date}</span>
                                                    <span className={`${styles.badge} ${res.status ? styles.badgeConfirmada : styles.badgePendiente}`}>
                                                        {res.status ? 'Confirmada' : 'Pendiente'}
                                                    </span>
                                                </div>
                                                <div className={styles.reservationDetails}>
                                                    <span>🕒 Hora: <strong>{res.reservation_time}</strong></span>
                                                    <span>👥 Personas: <strong>{res.guests}</strong></span>
                                                    <span>🍽️ Mesa: <strong>{res.table_detail ? res.table_detail.number : 'Sin asignar'}</strong></span>
                                                </div>
                                                <div className={styles.actionButtons}>
                                                    <button className={styles.editBtn} onClick={() => openModal(customer.id, res)}>Modificar</button>
                                                    <button className={styles.deleteBtn} onClick={() => handleDelete(res.id)}>Cancelar</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </td>
                                <td style={{ verticalAlign: 'top', width: '180px' }}>
                                    <button className={styles.saveBtn} onClick={() => openModal(customer.id)}>+ Nueva Reserva</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>{editingResId ? 'Editar Reserva' : 'Crear Reserva para Cliente'}</h2>
                        <form onSubmit={handleSubmit} className={styles.adminForm}>
                            <div className={styles.formGroup}>
                                <label>Fecha</label>
                                <input type="date" name="reservation_date" value={formData.reservation_date} onChange={handleInputChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Hora</label>
                                <input type="time" name="reservation_time" value={formData.reservation_time} onChange={handleInputChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Número de Personas</label>
                                <input type="number" name="guests" value={formData.guests} onChange={handleInputChange} required min="1" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Mesa</label>
                                <select name="table" value={formData.table} onChange={handleInputChange} required>
                                    <option value="">Seleccione una mesa</option>
                                    {tables.map(table => <option key={table.id} value={table.id}>
                                        Mesa {table.number} - {table.location} (Cap: {table.capacity})
                                    </option>)}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Estado de Reserva</label>
                                <select name="status" value={formData.status.toString()} onChange={handleInputChange}>
                                    <option value="false">Pendiente</option>
                                    <option value="true">Confirmada</option>
                                </select>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className={styles.saveBtn}>{editingResId ? 'Actualizar' : 'Guardar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}