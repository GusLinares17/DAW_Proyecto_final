import { useMenuCategories } from '../hooks/useMenuCategory';
import styles from './MenuPage.module.css';

export const MenuPage = () => {
  const { data: categories, isLoading } = useMenuCategories();

  if (isLoading) return <div className={styles.loadingScreen}>Cargando los sabores...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>La Carta</h1>
        <p>Una selección cuidadosa de nuestra mejor gastronomía.</p>
      </div>

      <div className={styles.grid}>
        {categories?.map((category: any) => (
          <div key={category.id} className={styles.category}>
            <h2>{category.name}</h2>
            <div>
              {category.items?.map((item: any) => (
                <div key={item.id} className={styles.itemRow}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemDescription}>{item.description}</span>
                  </div>
                  <span className={styles.itemPrice}>S/ {item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};