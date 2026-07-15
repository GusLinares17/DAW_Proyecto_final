import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useLogin } from '../hooks/useLogin'
import { saveTokens } from '../utils/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const loginMutation = useLogin()

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/'

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    loginMutation.mutate(form, {
      onSuccess: (data) => {
        saveTokens(data.access, data.refresh)

        localStorage.setItem('user', JSON.stringify({
          username: data.username,
          first_name: data.first_name,
          names: data.names,
          father_surname: data.father_surname,
          mother_surname: data.mother_surname,
          email: data.email,
          dni: data.dni,
          phone: data.phone
        }))

        window.dispatchEvent(new Event('auth-change'));

        navigate(from, { replace: true })
      },
    })
  }

  return (
    <section className="auth-page">
      <div className="form-card">
        <h1>Ingresar</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loginMutation.isPending}>
            Ingresar
          </button>
        </form>

        {loginMutation.isPending && <p>Iniciando sesión...</p>}
        {loginMutation.isError && <p>Usuario o contraseña incorrectos.</p>}

        <p className="form-link">
          ¿No tienes una cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </div>
    </section>
  )
}