import type { Reservation } from '../types/reservation'

const API_URL = import.meta.env.VITE_API_URL

export interface CreateReservationData {
  table: string
  reservation_date: string
  reservation_time: string
  guests: number
}

export async function getMyReservations(): Promise<Reservation[]> {
  const access = localStorage.getItem('access')

  if (!access) {
    throw new Error('No hay token de acceso')
  }

  const response = await fetch(`${API_URL}/reservations/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al obtener las reservas')
  }

  return response.json()
}

export async function createReservation(
  data: CreateReservationData,
): Promise<Reservation> {
  const access = localStorage.getItem('access')

  if (!access) {
    throw new Error('No hay token de acceso')
  }

  const response = await fetch(`${API_URL}/reservations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Error al crear la reserva')
  }

  return response.json()
}

export async function deleteReservation(id: number) {
  const token = localStorage.getItem('access');
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Error al cancelar la reserva');
  return true;
}

export async function updateReservation(id: number, data: any) {
  const token = localStorage.getItem('access');
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error('Error al modificar la reserva');
  return response.json();
}