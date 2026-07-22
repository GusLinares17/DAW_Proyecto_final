import { useEffect, useState } from 'react';
import { getAccessToken } from '../utils/auth';
import styles from './AdminMenuPage.module.css';

interface Table {
    id: string;
    number: string;
    capacity: number;
}

export function AdminTablesPage() {
    const [tables, setTables] = useState<Table[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        number: '',
        capacity: ''
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const openModal = (table?: Table) => {
        if (table) {
            setEditingId(table.id);
            setFormData({
                number: table.number.toString(),
                capacity: table.capacity.toString()
            });
        } else {
            setEditingId(null);
            setFormData({ number: '', capacity: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = editingId ? `${API_URL}/tables/${editingId}/` : `${API_URL}/tables/`;
        const method = editingId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify({
                number: formData.number,
                // Aseguramos que la capacidad se envíe como un número entero a Django
                capacity: parseInt(formData.capacity, 10)
            })
        });

        if (response.ok) {
            setIsModalOpen(false);
            fetchTables();
        } else {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData);
            alert("Error al guardar la mesa. Revisa que el número de mesa no esté duplicado.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta mesa? Ten cuidado, podría afectar a las reservas que ya la tienen asignada.")) return;

        const response = await fetch(`${API_URL}/tables/${id}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getAccessToken()}` }
        });

        if (response.ok) {
            fetchTables();
        } else {
            alert("No se puede eliminar la mesa. Es probable que tenga reservas activas asociadas.");
        }
    };

    return (
        <section className={styles.adminSection}>
            <div className={styles.adminHeader}>
                <h1>Administrar Mesas</h1>
                <button className={styles.addBtn} onClick={() => openModal()}>+ Nueva Mesa</button>
            </div>

            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>Número de Mesa</th>
                        <th>Capacidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map(table => (
                        <tr key={table.id}>
                            <td>
                                <strong>Mesa {table.number}</strong>
                            </td>
                            <td>{table.capacity} personas</td>
                            <td className={styles.actionButtons}>
                                <button className={styles.editBtn} onClick={() => openModal(table)}>
                                    Editar
                                </button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(table.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}

                    {tables.length === 0 && (
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                No hay mesas registradas en el sistema.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>{editingId ? 'Editar Mesa' : 'Registrar Nueva Mesa'}</h2>
                        <form onSubmit={handleSubmit} className={styles.adminForm}>

                            <div className={styles.formGroup}>
                                <label>Número o Nombre de la Mesa</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ej: 1, 2, Terraza-A..."
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Capacidad (Personas)</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.saveBtn}>
                                    {editingId ? 'Actualizar Mesa' : 'Guardar Mesa'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}