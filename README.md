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

# Funcionalidades

El sistema incluye las siguientes funcionalidades:

- Registro de usuarios y creación de su perfil de cliente.
- Inicio de sesión mediante autenticación JWT.
- Renovación del token de acceso.
- Consulta de categorías del menú.
- Consulta de platos disponibles.
- Consulta de mesas del restaurante.
- Creación de reservas.
- Consulta de reservas del usuario autenticado.
- Edición de reservas.
- Visualización de información de la cuenta.
- Protección de rutas privadas.
- Administración de datos mediante Django Admin.
- Inicialización de categorías, platos, mesas y usuario administrador.

---

# API REST

La API REST se encuentra disponible localmente en:

```text
http://127.0.0.1:8000/api/
```

## Endpoints de autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/register/` | Registra un usuario y crea su perfil de cliente. |
| `POST` | `/api/token/` | Obtiene los tokens `access` y `refresh`. |
| `POST` | `/api/token/refresh/` | Genera un nuevo token de acceso mediante el token de renovación. |

---

## Endpoints principales

| Endpoint | Recurso |
|----------|---------|
| `/api/menu-categories/` | Categorías del menú. |
| `/api/menu-items/` | Platos del restaurante. |
| `/api/customers/` | Clientes registrados. |
| `/api/tables/` | Mesas del restaurante. |
| `/api/reservations/` | Reservas. |

Los métodos disponibles para cada recurso dependen de la configuración y los permisos definidos en su respectivo `ViewSet`.

---

# Autenticación JWT

El sistema utiliza JSON Web Tokens para autenticar a los usuarios.

Al iniciar sesión, el backend devuelve:

- `access`: token utilizado para acceder a los recursos protegidos.
- `refresh`: token utilizado para solicitar un nuevo token de acceso.

Además de los tokens, la respuesta del inicio de sesión incluye información básica del usuario y de su perfil de cliente.

El frontend almacena los tokens y los utiliza en las solicitudes privadas hacia la API.

---

# Rutas del frontend

## Rutas públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal. |
| `/menu` | Carta del restaurante. |
| `/login` | Inicio de sesión. |
| `/register` | Registro de usuario. |
| `/cocina` | Información sobre la cocina. |
| `/experiencias` | Información sobre experiencias. |
| `/eventos` | Información sobre eventos. |
| `/equipo` | Información sobre el equipo. |
| `/cuenta` | Información de la cuenta. |
| `/editar-reserva/:id` | Edición de una reserva. |

## Rutas protegidas

| Ruta | Descripción |
|------|-------------|
| `/reservations/new` | Creación de una nueva reserva. |
| `/my-reservations` | Consulta de reservas del usuario autenticado. |

Las rutas protegidas solo pueden ser utilizadas cuando existe una sesión válida.

> Actualmente, `/cuenta` y `/editar-reserva/:id` están definidas como rutas públicas en el código del frontend. Si posteriormente se desea restringir su acceso, deben moverse dentro del componente `ProtectedRoute`.

---

# Datos iniciales

El backend incluye el comando personalizado:

```bash
python manage.py bootstrap
```

Este comando crea o actualiza:

- Un usuario administrador.
- Categorías del menú.
- Platos iniciales.
- Mesas iniciales.

Las categorías creadas son:

- Entradas.
- Platos principales.
- Bebidas.
- Postres.

También se agregan platos representativos, como:

- Papa a la huancaína.
- Ocopa.
- Lomo saltado.
- Ají de gallina.
- Arroz con mariscos.
- Chicha morada.
- Limonada.
- Mazamorra morada.

El comando utiliza `update_or_create`, por lo que puede ejecutarse varias veces sin duplicar los registros configurados.

## Crear el administrador local

Antes de ejecutar `bootstrap`, pueden definirse las credenciales del administrador.

### Linux / WSL

```bash
export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_EMAIL=admin@saborperuano.com
export DJANGO_SUPERUSER_PASSWORD=Admin123456
python manage.py bootstrap
```

### Windows PowerShell

```powershell
$env:DJANGO_SUPERUSER_USERNAME="admin"
$env:DJANGO_SUPERUSER_EMAIL="admin@saborperuano.com"
$env:DJANGO_SUPERUSER_PASSWORD="Admin123456"
python manage.py bootstrap
```

> Las credenciales mostradas son únicamente un ejemplo para desarrollo local y no deben utilizarse en producción.

---

# Aplicación desplegada

## Frontend

```text
https://daw-proyecto-final-navy.vercel.app/
```

## Backend

```text
https://sabor-peruano-backend.onrender.com/
```

## API REST

```text
https://sabor-peruano-backend.onrender.com/api/
```

## Panel de administración

```text
https://sabor-peruano-backend.onrender.com/admin/
```

> El servicio gratuito de Render puede tardar algunos segundos en responder después de un periodo de inactividad.

---

# Despliegue

## Backend en Render

El backend está desplegado en Render y utiliza Gunicorn como servidor WSGI.

Durante el proceso de construcción, Render ejecuta el archivo:

```text
backend/build.sh
```

El archivo contiene los siguientes comandos:

```bash
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py bootstrap
```

Estos comandos realizan las siguientes tareas:

1. Instalan las dependencias del backend.
2. Reúnen los archivos estáticos de Django.
3. Aplican las migraciones de la base de datos.
4. Crean o actualizan los datos iniciales del sistema.

En Render deben configurarse de forma segura las siguientes variables:

```text
SECRET_KEY
DEBUG=False
DATABASE_URL
FRONTEND_URL
DJANGO_SUPERUSER_USERNAME
DJANGO_SUPERUSER_EMAIL
DJANGO_SUPERUSER_PASSWORD
```

La variable `RENDER_EXTERNAL_HOSTNAME` es proporcionada automáticamente por Render y se utiliza para añadir el dominio del servicio a `ALLOWED_HOSTS`.

---

## Frontend en Vercel

El frontend está desplegado en Vercel.

La variable de entorno configurada en producción es:

```text
VITE_API_URL=https://sabor-peruano-backend.onrender.com/api
```

Vercel instala las dependencias, compila el proyecto y publica el contenido generado por Vite.

El comando de compilación definido en `package.json` es:

```bash
npm run build
```

Este comando ejecuta:

```text
tsc -b && vite build
```

---

# Comandos disponibles

## Backend

```bash
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python manage.py bootstrap
python manage.py createsuperuser
```

## Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

# Archivos no incluidos en Git

El repositorio no almacena archivos generados localmente, dependencias instaladas ni información privada.

Entre los archivos y carpetas ignorados se encuentran:

```text
my_env/
venv/
.venv/
node_modules/
dist/
.vite/
__pycache__/
db.sqlite3
*.sqlite3
staticfiles/
media/
.env
.env.local
.env.*.local
```

Estos archivos se excluyen mediante `.gitignore`.

El archivo:

```text
frontend/.env.example
```

sí se incluye porque sirve como referencia para crear el archivo `.env` local y no contiene credenciales privadas.

---

# Prueba rápida del sistema

Para comprobar el funcionamiento del proyecto localmente:

1. Ejecutar el backend en `http://127.0.0.1:8000/`.
2. Ejecutar el frontend en `http://localhost:5173/`.
3. Abrir el frontend en el navegador.
4. Registrar un usuario.
5. Iniciar sesión.
6. Consultar la carta.
7. Crear una reserva.
8. Consultar las reservas del usuario.
9. Editar una reserva.
10. Revisar los datos desde Django Admin.

También puede verificarse directamente la API desde:

```text
http://127.0.0.1:8000/api/
```

---

# Buenas prácticas aplicadas

- Separación entre backend y frontend.
- Uso de arquitectura cliente-servidor.
- API REST con Django REST Framework.
- Autenticación mediante JWT.
- Protección de rutas privadas en React.
- Variables sensibles fuera del repositorio.
- Uso de `.env.example` como referencia.
- Base de datos SQLite en desarrollo y PostgreSQL en producción.
- Uso de ramas y Pull Requests en GitHub.
- Despliegue independiente del frontend y backend.
- Inicialización automática de datos mediante un comando personalizado.

---

# Licencia

Proyecto desarrollado con fines académicos para el curso **Desarrollo de Aplicaciones Web**.

---