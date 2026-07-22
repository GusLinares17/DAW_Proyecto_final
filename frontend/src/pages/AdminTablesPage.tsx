import { useEffect, useState } from 'react';
import styles from '../styles/AdminTablesPage.module.css';
import { getAccessToken } from '../utils/auth';

interface Table {
    id: string;
    number: string;
    capacity: number;
    location: string;
    available: boolean;
}

export function AdminTablesPage() {
    const [tables, setTables] = useState<Table[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [formData, setFormData] = useState({
        number: '',
        capacity: '',
        location: '',
        available: true
    });

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        const res = await fetch(`${API_URL}/tables/`, {
            headers: { 'Authorization': `Bearer ${getAccessToken()}` }
        });
        if (res.ok) setTables(await res.json());
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const openModal = (table?: Table) => {
        if (table) {
            setEditingId(table.id);
            setFormData({
                number: table.number.toString(),
                capacity: table.capacity.toString(),
                location: table.location || '',
                available: table.available !== undefined ? table.available : true
            });
        } else {
            setEditingId(null);
            setFormData({ number: '', capacity: '', location: '', available: true });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = editingId ? `${API_URL}/tables/${editingId}/` : `${API_URL}/tables/`;
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    number: formData.number,
                    capacity: parseInt(formData.capacity, 10),
                    location: formData.location,
                    available: formData.available
                })
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchTables();
                showToast(`Mesa ${editingId ? 'actualizada' : 'registrada'} exitosamente.`, 'success');
            } else {
                const errorData = await response.json();
                let errorMessage = "Error al guardar:\n";
                if (typeof errorData === 'object' && errorData !== null) {
                    for (const key in errorData) {
                        errorMessage += `- ${key}: ${Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key]}\n`;
                    }
                }
                showToast(errorMessage, 'error');
            }
        } catch (error) {
            showToast("Hubo un problema de conexión con el servidor.", 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta mesa?")) return;

        try {
            const response = await fetch(`${API_URL}/tables/${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });

            if (response.ok) {
                fetchTables();
                showToast("Mesa eliminada exitosamente.", 'success');
            } else {
                showToast("No se puede eliminar la mesa. Verifique que no tenga reservas asociadas.", 'error');
            }
        } catch (error) {
            showToast("Error de conexión al intentar eliminar.", 'error');
        }
    };

    return (
        <section className={styles.adminSection}>
            {notification.show && (
                <div className={`${styles.notification} ${notification.type === 'success' ? styles.success : styles.error}`}>
                    {notification.type === 'success' ? '✓' : '⚠'} {notification.message}
                </div>
            )}

            <div className={styles.adminHeader}>
                <h1>Administrar Mesas</h1>
                <button className={styles.addBtn} onClick={() => openModal()}>+ Nueva Mesa</button>
            </div>

            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>Número de Mesa</th>
                        <th>Zona / Ubicación</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map(table => (
                        <tr key={table.id}>
                            <td><strong>Mesa {table.number}</strong></td>
                            <td>{table.location || 'Sin asignar'}</td>
                            <td>{table.capacity} personas</td>
                            <td>
                                <span className={`${styles.badge} ${table.available ? styles.badgeConfirmada : styles.badgePendiente}`}>
                                    {table.available ? 'Activa' : 'Inactiva'}
                                </span>
                            </td>
                            <td className={styles.actionButtons}>
                                <button className={styles.editBtn} onClick={() => openModal(table)}>Editar</button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(table.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    {tables.length === 0 && (
                        <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No hay mesas registradas.</td></tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>{editingId ? 'Editar Mesa' : 'Registrar Nueva Mesa'}</h2>
                        <form onSubmit={handleSubmit} className={styles.adminForm}>

                            <div className={styles.formGroup}>
                                <label>Número de la Mesa</label>
                                <input type="number" name="number" value={formData.number} onChange={handleInputChange} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Zona / Ubicación</label>
                                <select name="location" value={formData.location} onChange={handleInputChange} required>
                                    <option value="">Seleccione una zona</option>
                                    <option value="Salón principal">Salón principal</option>
                                    <option value="Terraza">Terraza</option>
                                    <option value="Ventana">Ventana</option>
                                    <option value="Salón principal - VIP">Salón principal - VIP</option>
                                    <option value="Salón privado">Salón privado</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Capacidad (Personas)</label>
                                <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} required min="1" />
                            </div>

                            <div className={styles.checkboxGroup}>
                                <label>
                                    <input type="checkbox" name="available" checked={formData.available} onChange={handleInputChange} />
                                    Mesa Activa (Disponible para reservas)
                                </label>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className={styles.saveBtn}>{editingId ? 'Actualizar Mesa' : 'Guardar Mesa'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}