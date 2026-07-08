import type { MenuItem } from './menuItem'

export interface MenuCategory {
  id: string
  name: string
  description: string | null
  items: MenuItem[]
}