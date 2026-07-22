import { useEffect, useState } from 'react';
import styles from '../styles/AdminCategoriesPage.module.css';
import { getAccessToken } from '../utils/auth';

interface Category {
    id: string;
    name: string;
    description: string;
}

export function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await fetch(`${API_URL}/menu-categories/`);
        if (response.ok) {
            setCategories(await response.json());
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const openModal = (category?: Category) => {
        if (category) {
            setEditingId(category.id);
            setFormData({ name: category.name, description: category.description });
        } else {
            setEditingId(null);
            setFormData({ name: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingId ? `${API_URL}/menu-categories/${editingId}/` : `${API_URL}/menu-categories/`;
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchCategories();
                showToast(`Categoría ${editingId ? 'actualizada' : 'creada'} exitosamente.`, 'success');
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
        if (!window.confirm("¿Seguro que deseas eliminar esta categoría? Podría afectar a los platos asignados a ella.")) return;

        try {
            const response = await fetch(`${API_URL}/menu-categories/${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });

            if (response.ok) {
                fetchCategories();
                showToast("Categoría eliminada exitosamente.", 'success');
            } else {
                showToast("Error al eliminar la categoría.", 'error');
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
                <h1>Administrar Categorías</h1>
                <button className={styles.addBtn} onClick={() => openModal()}>+ Nueva Categoría</button>
            </div>

            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td><strong>{category.name}</strong></td>
                            <td>{category.description}</td>
                            <td className={styles.actionButtons}>
                                <button className={styles.editBtn} onClick={() => openModal(category)}>Editar</button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(category.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>{editingId ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                        <form onSubmit={handleSubmit} className={styles.adminForm}>
                            <div className={styles.formGroup}>
                                <label>Nombre</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Descripción</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required />
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