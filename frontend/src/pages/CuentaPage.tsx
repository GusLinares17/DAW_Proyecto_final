import React, { useState } from 'react';
import styles from './CuentaPage.module.css';

export const CuentaPage = () => {
    const [formData, setFormData] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                return {
                    username: user.username || '', names: user.names || '',
                    father_surname: user.father_surname || '', mother_surname: user.mother_surname || '',
                    email: user.email || '', dni: user.dni || '', phone: user.phone || ''
                };
            } catch (error) {
                console.error("Error al leer datos:", error);
            }
        }
        return { username: '', names: '', father_surname: '', mother_surname: '', email: '', dni: '', phone: '' };
    });

    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access');
            if (!token) throw new Error('No estás autenticado.');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/me/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    names: formData.names, father_surname: formData.father_surname,
                    mother_surname: formData.mother_surname, email: formData.email,
                    dni: formData.dni, phone: formData.phone
                })
            });

            if (!response.ok) throw new Error('Error al actualizar en el servidor');

            localStorage.setItem('user', JSON.stringify(formData));
            window.dispatchEvent(new Event('auth-change'));
            setNotification({ show: true, message: 'Perfil actualizado con éxito en la base de datos.', type: 'success' });
            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);

        } catch (error) {
            console.error(error);
            setNotification({ show: true, message: 'Hubo un error al guardar los datos.', type: 'error' });
            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
        }
    };

    return (
        <div className={styles.container}>
            {notification.show && (
                <div className={`${styles.notification} ${notification.type === 'success' ? styles.success : styles.error}`}>
                    {notification.type === 'success' ? '✓' : '⚠'} {notification.message}
                </div>
            )}

            <h1 className={styles.title}>Mi Cuenta</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Usuario</label>
                    <input type="text" name="username" value={formData.username} readOnly className={`${styles.input} ${styles.inputReadonly}`} />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Nombres</label>
                    <input type="text" name="names" value={formData.names} onChange={handleChange} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Apellido Paterno</label>
                    <input type="text" name="father_surname" value={formData.father_surname} onChange={handleChange} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Apellido Materno</label>
                    <input type="text" name="mother_surname" value={formData.mother_surname} onChange={handleChange} required className={styles.input} />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Correo Electrónico</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>DNI</label>
                    <input type="text" name="dni" value={formData.dni} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Teléfono</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} />
                </div>
                <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Guardar Cambios</button>
            </form>
        </div>
    );
};