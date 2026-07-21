# Sabor Peruano — Sistema de Gestión de Restaurante

Proyecto final del curso **Desarrollo de Aplicaciones Web**.

Sabor Peruano es una aplicación web desarrollada bajo una arquitectura cliente-servidor que permite gestionar las reservas de un restaurante. El sistema ofrece funcionalidades para registrar usuarios, autenticarse mediante JSON Web Tokens (JWT), consultar el menú, visualizar mesas disponibles y administrar reservas.

El backend fue desarrollado utilizando **Django REST Framework**, mientras que el frontend fue implementado con **React**, **Vite** y **TypeScript**, comunicándose mediante una API REST.

---

# Integrantes

- Gustavo Linares Aquino
- Geisel Reymar Pacheco
- Jesús Francisco Silva Pino

---

# Tecnologías utilizadas

## Backend

- Python 3
- Django 6
- Django REST Framework
- Simple JWT
- django-filter
- django-cors-headers
- Gunicorn
- WhiteNoise

## Frontend

- React
- Vite
- TypeScript
- React Router DOM
- TanStack Query

## Base de datos

- SQLite (desarrollo local)
- PostgreSQL / Supabase (producción)

---

# Arquitectura del sistema

```text
                Usuario
                   │
                   ▼
        React + Vite + TypeScript
                   │
                   ▼
           TanStack Query
                   │
                   ▼
       Django REST Framework
                   │
                   ▼
   SQLite / PostgreSQL (Supabase)
```

El frontend consume los servicios expuestos por la API REST del backend. Django procesa las solicitudes, aplica la autenticación mediante JWT y administra el acceso a la base de datos.

---

# Estructura del proyecto

```text
DAW_Proyecto_final/
│
├── backend/
│   ├── apps/
│   ├── restaurant/
│   ├── templates/
│   ├── manage.py
│   ├── requirements.txt
│   └── build.sh
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── package.json
│   ├── .env.example
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

### Descripción de las carpetas principales

| Carpeta | Descripción |
|----------|-------------|
| `backend/apps/management` | Contiene los modelos, vistas, serializadores y lógica principal del sistema. |
| `backend/restaurant` | Configuración general del proyecto Django. |
| `backend/templates` | Plantillas HTML utilizadas por el backend. |
| `frontend/src/api` | Funciones encargadas de consumir la API REST. |
| `frontend/src/hooks` | Hooks personalizados que utilizan TanStack Query. |
| `frontend/src/pages` | Páginas principales de la aplicación. |
| `frontend/src/routes` | Definición de rutas públicas y protegidas. |
| `frontend/src/components` | Componentes reutilizables del frontend. |
| `frontend/src/utils` | Funciones auxiliares para autenticación y utilidades. |

---