# Sistema de Gestión de Restaurante

Proyecto final del curso **Desarrollo de Aplicaciones Web**.

El sistema permite administrar reservas de un restaurante mediante una arquitectura cliente-servidor utilizando Django REST Framework como backend y React + Vite como frontend.

---

## Integrantes

- Gustavo Linares Aquino
- Geisel Reymar Pacheco
- Jesús Francisco Silva Pino

---

# Tecnologías utilizadas

## Backend

- Python
- Django
- Django REST Framework
- Simple JWT

## Frontend

- React
- Vite
- React Router
- TanStack Query
- TypeScript

---

# Estructura del proyecto

```
restaurant-management/
│
├── backend/
│
└── frontend/
```

---

# Funcionalidades

- Registro de usuarios
- Inicio de sesión con JWT
- Consulta del menú
- Consulta de mesas
- Creación de reservas
- Visualización de reservas del usuario
- Protección de rutas mediante autenticación

---

# Instalación

## Backend

```bash
cd backend

python -m venv my_env

source my_env/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Variables de entorno

Crear un archivo `.env` dentro de `frontend`.

```
VITE_API_URL=http://localhost:8000/api
```

---

# Arquitectura

```
React

↓

TanStack Query

↓

Django REST Framework

↓

Base de datos
```
