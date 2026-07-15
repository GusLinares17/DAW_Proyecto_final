import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateReservation } from '../hooks/useReservation'
import { useTables } from '../hooks/useTable'
import styles from './NewReservationPage.module.css'

export function NewReservationPage() {
  const navigate = useNavigate()
  const { data: tables, isLoading, isError } = useTables()
  const createReservation = useCreateReservation()

  const [form, setForm] = useState({
    table: '',
    reservation_date: '',
    reservation_time: '',
    guests: 1,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: name === 'guests' ? Number(value) : value,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createReservation.mutate(form, {
      onSuccess: () => navigate('/mis-reservas'),
    })
  }

  if (isLoading) return <p className={styles.statusMessage}>Cargando mesas...</p>
  if (isError) return <p className={styles.errorMessage}>Error al cargar las mesas.</p>

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h1>Reservar mesa</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Mesa</label>
            <select name="table" value={form.table} onChange={handleChange} required>
              <option value="">Seleccione una mesa</option>
              {tables?.map((table) => (
                <option key={table.id} value={table.id}>
                  Mesa {table.number} · {table.location} · {table.capacity} personas
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Fecha</label>
            <input type="date" name="reservation_date" value={form.reservation_date} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Hora</label>
            <input type="time" name="reservation_time" value={form.reservation_time} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Personas</label>
            <input type="number" name="guests" min="1" value={form.guests} onChange={handleChange} required />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={createReservation.isPending}>
            Confirmar reserva
          </button>
        </form>

        {createReservation.isPending && <p className={styles.statusMessage}>Registrando reserva...</p>}
        {createReservation.isError && <p className={styles.errorMessage}>No fue posible registrar la reserva.</p>}
      </div>
    </section>
  )
}