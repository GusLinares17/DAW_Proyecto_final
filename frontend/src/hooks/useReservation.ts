import { useMutation, useQuery } from '@tanstack/react-query'
import { createReservation, getMyReservations } from '../api/reservationApi'

export function useReservations() {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: getMyReservations,
  })
}

export function useCreateReservation() {
  return useMutation({
    mutationFn: createReservation,
  })
}