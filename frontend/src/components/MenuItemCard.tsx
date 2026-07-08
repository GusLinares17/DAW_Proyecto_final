import type { MenuItem } from '../types/menuItem'

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <article className="menu-card">
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>

      <strong>S/ {item.price}</strong>
    </article>
  )
}