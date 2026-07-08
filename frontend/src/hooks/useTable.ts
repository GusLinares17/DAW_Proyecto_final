import { useQuery } from '@tanstack/react-query'
import { getTables } from '../api/tableApi'

export function useTables() {
  return useQuery({
    queryKey: ['tables'],
    queryFn: getTables,
  })
}