import type { Table } from '../types/table'

const API_URL = import.meta.env.VITE_API_URL

export async function getTables(): Promise<Table[]> {
  const response = await fetch(`${API_URL}/tables/`)

  if (!response.ok) {
    throw new Error('Error al obtener las mesas')
  }

  return response.json()
}