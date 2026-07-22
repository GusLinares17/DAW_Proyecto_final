import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'
import styles from '../styles/RegisterPage.module.css'

export function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation = useRegister()

  const [form, setForm] = useState({
    username: '',
    password: '',
    dni: '',
    names: '',
    father_surname: '',
    mother_surname: '',
    email: '',
    phone: '',
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    registerMutation.mutate(form, {
      onSuccess: () => navigate('/login'),
    })
  }

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h1>Crear cuenta</h1>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Usuario</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Nombres</label>
            <input type="text" name="names" value={form.names} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Apellido paterno</label>
            <input type="text" name="father_surname" value={form.father_surname} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Apellido materno</label>
            <input type="text" name="mother_surname" value={form.mother_surname} onChange={handleChange} required />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Correo electrónico</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>DNI</label>
            <input type="text" name="dni" value={form.dni} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={registerMutation.isPending}>
            Crear cuenta
          </button>

          {registerMutation.isPending && <p className={styles.statusMessage}>Registrando usuario...</p>}
          {registerMutation.isError && <p className={styles.errorMessage}>No fue posible registrar el usuario.</p>}

          <p className={styles.formLink}>
            ¿Ya tienes una cuenta? <Link to="/login">Ingresar</Link>
          </p>
        </form>
      </div>
    </section>
  )
}