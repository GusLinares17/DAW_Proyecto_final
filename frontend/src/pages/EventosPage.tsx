import styles from '../styles/EventosPage.module.css';

export const EventosPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Eventos y Celebraciones</h1>
            <p className={styles.description}>
                Haz que tus momentos especiales tengan el inconfundible Sabor Peruano. Disponemos de espacios diseñados para crear recuerdos inolvidables con la mejor atención y calidez.
            </p>
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Próximos Encuentros</h2>
                <div className={styles.eventBlock}>
                    <h3 className={styles.eventTitle}>Tardes de Jarana y Cajón</h3>
                    <p className={styles.eventTime}>Todos los Sábados - 2:00 PM</p>
                    <p className={styles.eventText}>Acompaña tu almuerzo con música criolla en vivo. Un ambiente lleno de ritmo, tradición y alegría garantizada para toda la familia.</p>
                </div>
                <div className={styles.eventBlockLast}>
                    <h3 className={styles.eventTitle}>Reservas Corporativas y Privadas</h3>
                    <p className={styles.eventText}>Ofrecemos menús degustación exclusivos para grupos. Escríbenos para planificar tu evento empresarial o celebración familiar privada con nosotros.</p>
                    <button className={styles.btnAction}>Solicitar Información</button>
                </div>
            </div>
        </div>
    );
};