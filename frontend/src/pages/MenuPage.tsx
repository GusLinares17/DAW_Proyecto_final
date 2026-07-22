import { useEffect, useState } from 'react';
import styles from '../styles/MenuPage.module.css';

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string | number;
  category: string | number;
  available: boolean;
}

export const MenuPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const [resCategories, resItems] = await Promise.all([
          fetch(`${API_URL}/menu-categories/`),
          fetch(`${API_URL}/menu-items/`)
        ]);

        if (resCategories.ok) setCategories(await resCategories.json());
        if (resItems.ok) setItems(await resItems.json());
      } catch (error) {
        console.error("Error al cargar la carta:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  if (isLoading) return <div className={styles.loadingScreen}>Cargando los sabores...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>La Carta</h1>
        <p>Una selección cuidadosa de nuestra mejor gastronomía.</p>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => {
          const categoryItems = items.filter(
            item => item.category.toString() === category.id.toString() && item.available
          );

          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id} className={styles.category}>
              <h2>{category.name}</h2>
              <div>
                {categoryItems.map((item) => (
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
          );
        })}
      </div>
    </div>
  );
};