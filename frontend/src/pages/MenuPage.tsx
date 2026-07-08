import { MenuItemCard } from '../components/MenuItemCard'
import { useMenuCategories } from '../hooks/useMenuCategory'

export function MenuPage() {
  const { data: categories, isLoading, isError } = useMenuCategories()

  if (isLoading) {
    return <p>Cargando menú...</p>
  }

  if (isError) {
    return <p>Error al cargar el menú.</p>
  }

  return (
    <section className="page-section">
      <h1>Nuestro menú</h1>

      <div className="menu-list">
        {categories?.map((category) => (
          <section key={category.id} className="menu-category">
            <h2>{category.name}</h2>

            {category.description && (
              <p>{category.description}</p>
            )}

            <div className="menu-items">
              {category.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}