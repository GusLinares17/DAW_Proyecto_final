import { ReservationCard } from '../components/ReservationCard'
import { useReservations } from '../hooks/useReservation'

export function MyReservationsPage() {
  const { data: reservations, isLoading, isError } = useReservations()

  if (isLoading) {
    return <p>Cargando reservas...</p>
  }

  if (isError) {
    return <p>Error al cargar tus reservas.</p>
  }

  return (
    <section className="page-section">
      <h1>Mis reservas</h1>

      {reservations?.length === 0 && (
        <p>No tienes reservas registradas.</p>
      )}

      <div className="reservation-list">
        {reservations?.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
          />
        ))}
      </div>
    </section>
  )
}