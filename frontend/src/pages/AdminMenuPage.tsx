import { useEffect, useState } from 'react';
import { getAccessToken } from '../utils/auth';
import styles from './AdminMenuPage.module.css';

interface Category {
    id: string;
    name: string;
}

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string | number;
    category: number;
    status: boolean;
    available: boolean;
}

export function AdminMenuPage() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        status: true,
        available: true
    });

    const API_URL = import.meta.env.VITE_API_URL;
    const token = getAccessToken();

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

    const fetchItems = async () => {
        const response = await fetch(`${API_URL}/menu-items/`);
        if (response.ok) {
            const data = await response.json();
            setItems(data);
        }
    };

    const fetchCategories = async () => {
        const response = await fetch(`${API_URL}/menu-categories/`);
        if (response.ok) {
            const data = await response.json();
            setCategories(data);
        }
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
                name: item.name,
                description: item.description,
                price: item.price.toString(),
                category: item.category.toString(),
                status: item.status,
                available: item.available
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

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setIsModalOpen(false);
            fetchItems();
        } else {
            alert("Error al guardar el plato. Verifica los permisos de administrador.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este plato?")) return;

        const response = await fetch(`${API_URL}/menu-items/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            fetchItems();
        } else {
            alert("Error al eliminar el plato.");
        }
    };

    return (
        <section className={styles.adminSection}>
            <div className={styles.adminHeader}>
                <h1>Administrar Carta</h1>
                <button className={styles.addBtn} onClick={() => openModal()}>+ Añadir Plato</button>
            </div>

            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Disponible</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>S/ {item.price}</td>
                            <td>{item.available ? 'Sí' : 'No'}</td>
                            <td>
                                <button className={styles.editBtn} onClick={() => openModal(item)}>Editar</button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
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
                                <button type="submit" className={styles.saveBtn}>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}