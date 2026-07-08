import { useQuery } from '@tanstack/react-query'
import { getMenuCategories } from '../api/menuCategoryApi'

export function useMenuCategories() {
  return useQuery({
    queryKey: ['menu-categories'],
    queryFn: getMenuCategories,
  })
}