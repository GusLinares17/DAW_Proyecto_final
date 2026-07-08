import type { Reservation } from '../types/reservation'

interface ReservationCardProps {
  reservation: Reservation
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  return (
    <article className="reservation-card">
      <h2>Reserva</h2>

      <div className="reservation-info">
        <p>
          <strong>Cliente:</strong>{' '}
          {reservation.customer.names} {reservation.customer.father_surname}
        </p>

        <p>
          <strong>Mesa:</strong> {reservation.table_detail.number}
        </p>

        <p>
          <strong>Ubicación:</strong> {reservation.table_detail.location}
        </p>

        <p>
          <strong>Fecha:</strong> {reservation.reservation_date}
        </p>

        <p>
          <strong>Hora:</strong> {reservation.reservation_time}
        </p>

        <p>
          <strong>Personas:</strong> {reservation.guests}
        </p>
      </div>
    </article>
  )
}