import styles from '../styles/CocinaPage.module.css';

export const CocinaPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nuestra Cocina</h1>
      <p className={styles.description}>
        Inspirados en las tradicionales picanterías de Arequipa, llevamos a tu mesa el auténtico sabor de nuestra tierra. Respetamos las recetas ancestrales, seleccionando meticulosamente rocotos frescos, camarones de río y los mejores ingredientes locales para ofrecerte una experiencia inolvidable.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&q=80" 
        alt="Plato tradicional" 
        className={styles.image}
      />
    </div>
  );
};