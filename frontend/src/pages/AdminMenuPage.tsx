import { useEffect, useState } from 'react';
import styles from '../styles/AdminMenuPage.module.css';
import { getAccessToken } from '../utils/auth';

interface Category {
    id: string;
    name: string;
}

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string | number;
    category: number | string;
    status: boolean;
    available: boolean;
}

export function AdminMenuPage() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', status: true, available: true
    });

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

    const fetchItems = async () => {
        const response = await fetch(`${API_URL}/menu-items/`);
        if (response.ok) setItems(await response.json());
    };

    const fetchCategories = async () => {
        const response = await fetch(`${API_URL}/menu-categories/`);
        if (response.ok) setCategories(await response.json());
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const openModal = (item?: MenuItem) => {
        if (item) {
            setEditingId(item.id);
            setFormData({
                name: item.name, description: item.description, price: item.price.toString(),
                category: item.category.toString(), status: item.status, available: item.available
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', description: '', price: '', category: '', status: true, available: true });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingId ? `${API_URL}/menu-items/${editingId}/` : `${API_URL}/menu-items/`;
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAccessToken()}` },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchItems();
                showToast(`Plato ${editingId ? 'actualizado' : 'creado'} exitosamente.`, 'success');
            } else {
                const errorData = await response.json();
                let errorMessage = "Error al guardar el plato:\n";
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
        if (!window.confirm("¿Estás seguro de que deseas eliminar este plato?")) return;

        try {
            const response = await fetch(`${API_URL}/menu-items/${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });

            if (response.ok) {
                fetchItems();
                showToast("Plato eliminado exitosamente.", 'success');
            } else {
                showToast("Error al eliminar el plato.", 'error');
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
                <h1>Administrar Carta</h1>
                <button className={styles.addBtn} onClick={() => openModal()}>+ Añadir Plato</button>
            </div>

            {categories.map(category => {
                const categoryItems = items.filter(item => item.category.toString() === category.id.toString());
                if (categoryItems.length === 0) return null;

                return (
                    <div key={category.id} className={styles.categorySection}>
                        <h2 className={styles.categoryTitle}>{category.name}</h2>
                        <table className={styles.adminTable}>
                            <thead>
                                <tr><th>Nombre</th><th>Precio</th><th>Disponible</th><th>Acciones</th></tr>
                            </thead>
                            <tbody>
                                {categoryItems.map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.name}</strong><br /><small style={{ color: 'gray' }}>{item.description}</small></td>
                                        <td>S/ {item.price}</td>
                                        <td>{item.available ? 'Sí' : 'No'}</td>
                                        <td className={styles.actionButtons}>
                                            <button className={styles.editBtn} onClick={() => openModal(item)}>Editar</button>
                                            <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>{editingId ? 'Editar Plato' : 'Nuevo Plato'}</h2>
                        <form onSubmit={handleSubmit} className={styles.adminForm}>
                            <div className={styles.formGroup}>
                                <label>Nombre del plato</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Descripción</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Precio (S/)</label>
                                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Categoría</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} required>
                                    <option value="">Seleccione una categoría</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                            </div>
                            <div className={styles.checkboxGroup}>
                                <label>
                                    <input type="checkbox" name="available" checked={formData.available} onChange={handleInputChange} />
                                    Disponible para ordenar
                                </label>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className={styles.saveBtn}>{editingId ? 'Actualizar' : 'Guardar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}