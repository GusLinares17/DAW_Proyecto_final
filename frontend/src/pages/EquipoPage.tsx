import styles from '../styles/EquipoPage.module.css';

export const EquipoPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Nuestro Equipo</h1>
                <p className={styles.subtitle}>La maestría culinaria detrás de cada plato.</p>
            </div>
            <div className={styles.grid}>
                <div className={styles.member}>
                    <img src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=400&h=400&fit=crop" alt="Chef Ejecutivo" className={styles.image} />
                    <h3 className={styles.name}>Gustavo Linares Aquino</h3>
                    <p className={styles.role}>Chef Ejecutivo</p>
                </div>
                <div className={styles.member}>
                    <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&h=400&fit=crop" alt="Jefe de Cocina" className={styles.image} />
                    <h3 className={styles.name}>Geisel Reymar Pacheco Medina</h3>
                    <p className={styles.role}>Jefe de Cocina</p>
                </div>
                <div className={styles.member}>
                    <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop" alt="Maestro Picantero" className={styles.image} />
                    <h3 className={styles.name}>Jesús Francisco Silva Pino</h3>
                    <p className={styles.role}>Maestro Picantero</p>
                </div>
            </div>
        </div>
    );
};