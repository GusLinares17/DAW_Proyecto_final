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
- PostgreSQL (producción, alojado en Supabase)

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

El frontend consume los recursos expuestos por la API REST del backend mediante solicitudes HTTP. Django REST Framework procesa las peticiones, aplica la autenticación mediante JSON Web Tokens (JWT) y administra el acceso a la base de datos.

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
| `backend/apps/management` | Contiene los modelos, serializadores, vistas, rutas y lógica principal de la aplicación. |
| `backend/restaurant` | Configuración general del proyecto Django. |
| `backend/templates` | Plantillas HTML utilizadas por el backend. |
| `frontend/src/api` | Funciones encargadas de consumir la API REST. |
| `frontend/src/components` | Componentes reutilizables del frontend. |
| `frontend/src/hooks` | Hooks personalizados que utilizan TanStack Query. |
| `frontend/src/layouts` | Estructuras visuales compartidas entre las páginas. |
| `frontend/src/pages` | Páginas principales de la aplicación. |
| `frontend/src/routes` | Definición de rutas públicas y protegidas. |
| `frontend/src/types` | Interfaces y tipos utilizados por TypeScript. |
| `frontend/src/utils` | Funciones auxiliares para autenticación, almacenamiento de tokens y otras utilidades. |

---

# Requisitos

Para ejecutar el proyecto localmente es necesario tener instalado:

- Git
- Python 3
- pip
- Node.js
- npm

Puede verificar las versiones instaladas mediante:

```bash
git --version
python3 --version
pip --version
node --version
npm --version
```

> En Windows puede utilizarse `python` en lugar de `python3`.

---

# Instalación local

## 1. Clonar el repositorio

```bash
git clone https://github.com/GusLinares17/DAW_Proyecto_final.git

cd DAW_Proyecto_final
```

---

## 2. Configurar el backend

Ingresar al directorio del backend.

```bash
cd backend
```

### Crear el entorno virtual

#### Linux / WSL

```bash
python3 -m venv my_env
```

#### Windows

```bash
python -m venv my_env
```

### Activar el entorno virtual

#### Linux / WSL

```bash
source my_env/bin/activate
```

#### Windows (PowerShell)

```powershell
.\my_env\Scripts\Activate.ps1
```

#### Windows (CMD)

```cmd
my_env\Scripts\activate
```

---

### Instalar las dependencias

```bash
pip install -r requirements.txt
```

---

### Aplicar migraciones

```bash
python manage.py migrate
```

---

### Ejecutar el servidor

```bash
python manage.py runserver
```

El backend estará disponible en:

```text
http://127.0.0.1:8000/
```

La API REST estará disponible en:

```text
http://127.0.0.1:8000/api/
```

El panel de administración estará disponible en:

```text
http://127.0.0.1:8000/admin/
```

---

## 3. Configurar el frontend

Abrir una nueva terminal e ingresar al directorio del frontend.

```bash
cd frontend
```

### Instalar las dependencias

```bash
npm install
```

---

### Crear el archivo de variables de entorno

#### Linux / WSL

```bash
cp .env.example .env
```

#### Windows

```cmd
copy .env.example .env
```

Contenido del archivo `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

### Ejecutar el frontend

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173/
```

---

# Variables de entorno

## Frontend

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | Dirección base de la API REST utilizada por el frontend. |

---

## Backend

El proyecto obtiene sus variables mediante `os.environ`.

Durante el desarrollo local, si no existe la variable `DATABASE_URL`, Django utiliza automáticamente una base de datos SQLite (`db.sqlite3`).

En producción se recomienda configurar, como mínimo, las siguientes variables:

| Variable | Descripción |
|----------|-------------|
| `SECRET_KEY` | Clave secreta utilizada por Django. |
| `DEBUG` | Activa o desactiva el modo de depuración. |
| `DATABASE_URL` | Cadena de conexión hacia PostgreSQL. |
| `FRONTEND_URL` | URL del frontend permitida mediante CORS. |
| `DJANGO_SUPERUSER_USERNAME` | Usuario administrador inicial. |
| `DJANGO_SUPERUSER_EMAIL` | Correo del administrador. |
| `DJANGO_SUPERUSER_PASSWORD` | Contraseña del administrador. |

> El backend no utiliza un archivo `.env`; las variables se leen directamente desde el entorno del sistema o desde Render.

---