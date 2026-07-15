import '../App.css';
// Reemplaza esto con tu hook real
import { useMenuCategories } from '../hooks/useMenuCategory';

export const MenuPage = () => {
  const { data: categories, isLoading } = useMenuCategories();

  if (isLoading) return <div className="loading-screen">Cargando los sabores...</div>;

  return (
    <div className="menu-page-container">
      <div className="menu-header">
        <h1>La Carta</h1>
        <p>Una selección cuidadosa de nuestra mejor gastronomía.</p>
      </div>

      <div className="menu-grid">
        {categories?.map((category: any) => (
          <div key={category.id} className="menu-category">
            <h2>{category.name}</h2>
            <div className="menu-items-list">
              {category.items?.map((item: any) => (
                <div key={item.id} className="menu-item-row">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-description">{item.description}</span>
                  </div>
                  <span className="item-price">S/ {item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};