import type { MenuCategory } from '../types/menuCategory'

const API_URL = import.meta.env.VITE_API_URL

export async function getMenuCategories(): Promise<MenuCategory[]> {
  const response = await fetch(`${API_URL}/menu-categories/`)

  if (!response.ok) {
    throw new Error('Error al obtener el menú')
  }

  return response.json()
}