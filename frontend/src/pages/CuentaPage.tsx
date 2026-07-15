import React, { useState } from 'react';
import '../App.css';

export const CuentaPage = () => {
    // 1. Lazy Initialization: Leemos el localStorage al inicializar el estado
    const [formData, setFormData] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                return {
                    username: user.username || '',
                    names: user.names || '',
                    father_surname: user.father_surname || '',
                    mother_surname: user.mother_surname || '',
                    email: user.email || '',
                    dni: user.dni || '',
                    phone: user.phone || ''
                };
            } catch (error) {
                console.error("Error al leer datos:", error);
            }
        }
        return {
            username: '', names: '', father_surname: '',
            mother_surname: '', email: '', dni: '', phone: ''
        };
    });

    // 2. Estado para la notificación profesional
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('access');
            if (!token) throw new Error('No estás autenticado.');

            // Llamada real a la API (tu backend de Django)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/me/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Excluimos 'username' porque pertenece al modelo User, no a Customer
                body: JSON.stringify({
                    names: formData.names,
                    father_surname: formData.father_surname,
                    mother_surname: formData.mother_surname,
                    email: formData.email,
                    dni: formData.dni,
                    phone: formData.phone
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error del backend:", errorData);
                throw new Error('Error al actualizar en el servidor');
            }

            // Guardado local: Actualizamos el localStorage
            localStorage.setItem('user', JSON.stringify(formData));

            // Disparamos el evento para que el Navbar actualice el nombre
            window.dispatchEvent(new Event('auth-change'));

            // Mostramos mensaje de éxito
            setNotification({ show: true, message: 'Perfil actualizado con éxito en la base de datos.', type: 'success' });
            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);

        } catch (error) {
            // AQUÍ ESTÁ EL CATCH QUE FALTABA
            console.error(error);
            setNotification({ show: true, message: 'Hubo un error al guardar los datos.', type: 'error' });
            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
        }
    };

    return (
        <div className="cuenta-container" style={{ padding: '60px 20px', backgroundColor: '#FDFBF7', minHeight: '80vh', position: 'relative' }}>

            {/* Componente visual de la notificación */}
            {notification.show && (
                <div style={{
                    position: 'fixed',
                    top: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: notification.type === 'success' ? '#2e7d32' : '#d32f2f',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    animation: 'fadeInOut 3s ease-in-out'
                }}>
                    {notification.type === 'success' ? '✓' : '⚠'} {notification.message}
                </div>
            )}

            <h1 style={{ textAlign: 'center', color: '#8B3A3A', fontFamily: 'serif' }}>Mi Cuenta</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '40px auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Usuario</label>
                    <input type="text" name="username" value={formData.username} readOnly style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#EAEAEA', color: '#666', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nombres</label>
                    <input type="text" name="names" value={formData.names} onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc', outlineColor: '#8B3A3A' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Apellido Paterno</label>
                    <input type="text" name="father_surname" value={formData.father_surname} onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc', outlineColor: '#8B3A3A' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Apellido Materno</label>
                    <input type="text" name="mother_surname" value={formData.mother_surname} onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc', outlineColor: '#8B3A3A' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Correo Electrónico</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ padding: '10px', border: '1px solid #ccc', outlineColor: '#8B3A3A' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>DNI</label>
                    <input type="text" name="dni" value={formData.dni} onChange={handleChange} style={{ padding: '10px', border: '1px solid #ccc', outlineColor: '#8B3A3A' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Teléfono</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ padding: '10px', border: '1px solid #ccc', outlineColor: '#8B3A3A' }} />
                </div>

                <button type="submit" style={{ gridColumn: '1 / -1', marginTop: '10px', border: 'none', cursor: 'pointer', backgroundColor: '#8B3A3A', color: 'white', padding: '12px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', borderRadius: '3px' }}>
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};