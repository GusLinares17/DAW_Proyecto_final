import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

export function HomePage() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <p className={styles.preTitle}>Experiencia Culinaria</p>
        <h1 className={styles.mainTitle}>Sabor Peruano</h1>
        <h2 className={styles.subtitle}>
          Descubre la auténtica gastronomía de nuestra tierra, respetando las recetas ancestrales en cada plato.
        </h2>

        <div className={styles.buttonGroup}>
          <Link to="/menu" className={styles.btnPrimary}>Ver la Carta</Link>
          <Link to="/reservations/new" className={styles.btnSecondary}>Reservar Mesa</Link>
        </div>
      </div>
    </section>
  );
}