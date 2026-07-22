# Sabor Peruano — Sistema de Gestión de Restaurante

Proyecto final del curso **Desarrollo de Aplicaciones Web**.

**Sabor Peruano** es una aplicación web con arquitectura cliente-servidor orientada a la consulta del menú y la gestión de reservas de un restaurante.

El sistema permite registrar usuarios, iniciar sesión mediante JSON Web Tokens (JWT), consultar platos y mesas, crear reservas y revisar las reservas asociadas al usuario autenticado.

El backend fue desarrollado con **Django REST Framework** y el frontend con **React**, **Vite** y **TypeScript**. Ambos se comunican mediante una API REST.

---

## Integrantes

- Gustavo Linares Aquino
- Geisel Reymar Pacheco
- Jesús Francisco Silva Pino

---

## Aplicación desplegada

- **Frontend:** [Sabor Peruano en Vercel](https://daw-proyecto-final-navy.vercel.app/)
- **Backend:** [Página principal del backend](https://sabor-peruano-backend.onrender.com/)
- **API REST:** [API del sistema](https://sabor-peruano-backend.onrender.com/api/)
- **Administración:** [Django Admin](https://sabor-peruano-backend.onrender.com/admin/)

> El servicio del backend puede tardar algunos segundos en responder después de un periodo de inactividad.

---

## Tecnologías utilizadas

### Backend

- Python 3
- Django 6
- Django REST Framework
- Simple JWT
- django-filter
- django-cors-headers
- dj-database-url
- Gunicorn
- WhiteNoise

### Frontend

- React
- Vite
- TypeScript
- React Router DOM
- TanStack Query

### Base de datos y despliegue

- SQLite para desarrollo local
- PostgreSQL alojado en Supabase para producción
- Render para el backend
- Vercel para el frontend

---

## Arquitectura del sistema

```text
                  Usuario
                     │
                     ▼
          React + Vite + TypeScript
                     │
                     ▼
              TanStack Query
                     │
              Solicitudes HTTP
                     │
                     ▼
          Django REST Framework
                     │
                     ▼
       SQLite / PostgreSQL (Supabase)
```

El frontend consume los recursos de la API REST mediante solicitudes HTTP. Django REST Framework procesa las peticiones, aplica la autenticación JWT y administra el acceso a la base de datos.

---

## Estructura del proyecto

```text
DAW_Proyecto_final/
│
├── backend/
│   ├── apps/
│   │   └── management/
│   │       ├── management/
│   │       │   └── commands/
│   │       ├── migrations/
│   │       ├── models/
│   │       ├── serializers/
│   │       ├── views/
│   │       └── urls.py
│   │
│   ├── restaurant/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── templates/
│   ├── build.sh
│   ├── manage.py
│   └── requirements.txt
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
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

### Carpetas principales

| Carpeta | Descripción |
|---|---|
| `backend/apps/management` | Contiene los modelos, serializadores, vistas, rutas y lógica principal de la aplicación. |
| `backend/restaurant` | Contiene la configuración general del proyecto Django. |
| `backend/templates` | Contiene la plantilla HTML de bienvenida del backend. |
| `frontend/src/api` | Contiene las funciones que realizan solicitudes a la API REST. |
| `frontend/src/components` | Contiene componentes reutilizables del frontend. |
| `frontend/src/hooks` | Contiene hooks personalizados y operaciones con TanStack Query. |
| `frontend/src/layouts` | Contiene estructuras visuales compartidas entre las páginas. |
| `frontend/src/pages` | Contiene las páginas principales de la aplicación. |
| `frontend/src/routes` | Contiene la definición y protección de las rutas. |
| `frontend/src/types` | Contiene las interfaces y tipos de TypeScript. |
| `frontend/src/utils` | Contiene funciones auxiliares para autenticación y almacenamiento de tokens. |

---

## Funcionalidades

- Registro de usuarios y creación de perfiles de cliente.
- Inicio de sesión mediante JWT.
- Renovación del token de acceso.
- Consulta de categorías y platos del menú.
- Consulta de mesas del restaurante.
- Creación de reservas.
- Consulta de reservas del usuario autenticado.
- Edición de reservas.
- Visualización de información de la cuenta.
- Protección de rutas privadas.
- Administración de datos mediante Django Admin.
- Inicialización de categorías, platos, mesas y usuario administrador.

---

## Requisitos

Para ejecutar el proyecto localmente se necesita:

- Git
- Python 3
- pip
- Node.js
- npm

Las versiones instaladas pueden comprobarse con:

```bash
git --version
python3 --version
pip --version
node --version
npm --version
```

> En Windows puede utilizarse `python` en lugar de `python3`.

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/GusLinares17/DAW_Proyecto_final.git
cd DAW_Proyecto_final
```

### 2. Configurar el backend

Ingresar al directorio del backend:

```bash
cd backend
```

#### Crear el entorno virtual

Linux o WSL:

```bash
python3 -m venv my_env
```

Windows:

```bash
python -m venv my_env
```

#### Activar el entorno virtual

Linux o WSL:

```bash
source my_env/bin/activate
```

Windows PowerShell:

```powershell
.\my_env\Scripts\Activate.ps1
```

Windows CMD:

```cmd
my_env\Scripts\activate
```

#### Instalar las dependencias

```bash
pip install -r requirements.txt
```

#### Aplicar las migraciones

```bash
python manage.py migrate
```

#### Cargar los datos iniciales

Antes de ejecutar el comando `bootstrap`, se recomienda definir las credenciales del administrador.

Linux o WSL:

```bash
export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_EMAIL=admin@saborperuano.com
export DJANGO_SUPERUSER_PASSWORD=Admin123456
python manage.py bootstrap
```

Windows PowerShell:

```powershell
$env:DJANGO_SUPERUSER_USERNAME="admin"
$env:DJANGO_SUPERUSER_EMAIL="admin@saborperuano.com"
$env:DJANGO_SUPERUSER_PASSWORD="Admin123456"
python manage.py bootstrap
```

> Las credenciales anteriores son solo un ejemplo para desarrollo local. No deben utilizarse en producción.

El comando `bootstrap` crea o actualiza:

- Un usuario administrador.
- Categorías del menú.
- Platos iniciales.
- Mesas iniciales.

Utiliza `update_or_create`, por lo que puede ejecutarse nuevamente sin duplicar los registros configurados.

#### Ejecutar el backend

```bash
python manage.py runserver
```

Servicios locales:

- Backend: `http://127.0.0.1:8000/`
- API REST: `http://127.0.0.1:8000/api/`
- Django Admin: `http://127.0.0.1:8000/admin/`

### 3. Configurar el frontend

Abrir otra terminal y, desde la raíz del repositorio, ingresar al frontend:

```bash
cd frontend
```

#### Instalar las dependencias

```bash
npm install
```

#### Crear el archivo de variables de entorno

Linux o WSL:

```bash
cp .env.example .env
```

Windows:

```cmd
copy .env.example .env
```

El archivo `frontend/.env` debe contener:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

#### Ejecutar el frontend

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173/
```

---

## Variables de entorno

### Frontend

| Variable | Descripción | Ejemplo local |
|---|---|---|
| `VITE_API_URL` | Dirección base de la API REST consumida por React. | `http://127.0.0.1:8000/api` |

### Backend

El backend obtiene sus variables mediante `os.environ`. No carga automáticamente un archivo `.env`.

| Variable | Descripción | Entorno |
|---|---|---|
| `SECRET_KEY` | Clave secreta utilizada por Django. | Producción |
| `DEBUG` | Activa o desactiva el modo de depuración. | Producción |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL. | Producción |
| `FRONTEND_URL` | URL del frontend autorizada mediante CORS. | Producción |
| `RENDER_EXTERNAL_HOSTNAME` | Dominio del servicio proporcionado por Render. | Automática |
| `DJANGO_SUPERUSER_USERNAME` | Nombre del administrador creado por `bootstrap`. | Opcional |
| `DJANGO_SUPERUSER_EMAIL` | Correo del administrador. | Opcional |
| `DJANGO_SUPERUSER_PASSWORD` | Contraseña del administrador. | Recomendada |

Si `DATABASE_URL` no está definida, Django utiliza SQLite mediante el archivo local:

```text
backend/db.sqlite3
```

---

## API REST

La API local se encuentra en:

```text
http://127.0.0.1:8000/api/
```

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/register/` | Registra un usuario y crea su perfil de cliente. |
| `POST` | `/api/token/` | Obtiene los tokens `access` y `refresh`. |
| `POST` | `/api/token/refresh/` | Genera un nuevo token de acceso. |

### Recursos principales

| Endpoint | Recurso |
|---|---|
| `/api/menu-categories/` | Categorías del menú. |
| `/api/menu-items/` | Platos del restaurante. |
| `/api/customers/` | Clientes registrados. |
| `/api/tables/` | Mesas del restaurante. |
| `/api/reservations/` | Reservas. |

Los métodos disponibles en cada recurso dependen de los permisos y del `ViewSet` correspondiente.

---

## Autenticación JWT

Al iniciar sesión, el backend devuelve:

- `access`: token utilizado para acceder a recursos protegidos.
- `refresh`: token utilizado para solicitar un nuevo token de acceso.

La respuesta también incluye información básica del usuario y de su perfil de cliente.

El frontend almacena los tokens y los incorpora en las solicitudes que requieren autenticación.

---

## Rutas del frontend

### Rutas públicas

| Ruta | Descripción |
|---|---|
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

### Rutas protegidas

| Ruta | Descripción |
|---|---|
| `/reservations/new` | Creación de una nueva reserva. |
| `/my-reservations` | Consulta de reservas del usuario autenticado. |

Las rutas protegidas requieren que exista una sesión válida.

> En la implementación actual, `/cuenta` y `/editar-reserva/:id` están definidas fuera de `ProtectedRoute`.

---

## Datos iniciales

El comando:

```bash
python manage.py bootstrap
```

crea o actualiza las siguientes categorías:

- Entradas.
- Platos principales.
- Bebidas.
- Postres.

También registra platos iniciales como:

- Papa a la huancaína.
- Ocopa.
- Lomo saltado.
- Ají de gallina.
- Arroz con mariscos.
- Chicha morada.
- Limonada.
- Mazamorra morada.

Además, crea cinco mesas con diferentes capacidades y ubicaciones.

---

## Despliegue

### Backend en Render

El backend está desplegado en Render.

Para automatizar su construcción, el repositorio incluye `backend/build.sh`, que ejecuta:

```bash
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py bootstrap
```

El proceso:

1. Instala las dependencias.
2. recopila los archivos estáticos.
3. aplica las migraciones.
4. crea o actualiza los datos iniciales.

Gunicorn está incluido como servidor WSGI para producción. El comando exacto de inicio se configura directamente en el servicio de Render.

Las principales variables configuradas en producción son:

```text
SECRET_KEY
DEBUG=False
DATABASE_URL
FRONTEND_URL
DJANGO_SUPERUSER_USERNAME
DJANGO_SUPERUSER_EMAIL
DJANGO_SUPERUSER_PASSWORD
```

### Frontend en Vercel

El frontend está desplegado en Vercel con la siguiente variable:

```text
VITE_API_URL=https://sabor-peruano-backend.onrender.com/api
```

El comando de compilación definido en `package.json` es:

```bash
npm run build
```

Este comando ejecuta TypeScript y genera la versión de producción mediante Vite:

```text
tsc -b && vite build
```

---

## Comandos disponibles

### Backend

```bash
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python manage.py bootstrap
python manage.py createsuperuser
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Archivos excluidos de Git

El archivo `.gitignore` evita almacenar dependencias, archivos generados localmente y datos privados, entre ellos:

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

El archivo `frontend/.env.example` sí se incluye porque sirve como referencia y no contiene credenciales privadas.

---

## Prueba rápida

Con el backend y el frontend ejecutándose:

1. Abrir `http://localhost:5173/`.
2. Registrar un usuario.
3. Iniciar sesión.
4. Consultar la carta.
5. Crear una reserva.
6. Consultar las reservas del usuario.
7. Editar una reserva.
8. Revisar los datos desde Django Admin.

---

## Buenas prácticas aplicadas

- Separación entre backend y frontend.
- Arquitectura cliente-servidor.
- API REST con Django REST Framework.
- Autenticación mediante JWT.
- Protección de rutas privadas.
- Variables sensibles excluidas del repositorio.
- Archivo `.env.example` como referencia.
- SQLite en desarrollo y PostgreSQL en producción.
- Uso de ramas y Pull Requests.
- Despliegue independiente del frontend y del backend.
- Inicialización de datos mediante un comando personalizado.

---

## Licencia

Proyecto desarrollado con fines académicos para el curso **Desarrollo de Aplicaciones Web**.