const API_URL = import.meta.env.VITE_API_URL

export interface RegisterData {
  username: string
  password: string
  dni: string
  names: string
  father_surname: string
  mother_surname: string
  email: string
  phone: string
}

export interface LoginData {
  username: string
  password: string
}

export interface LoginResponse {
  names: any
  access: string
  refresh: string
  username?: string
  first_name?: string
}

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Error al registrar usuario')
  }

  return response.json()
}

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Usuario o contraseña incorrectos')
  }

  return response.json()
}