# WOLF1K Services — Sitio web

Aplicación web para **WOLF1K SERVICES**, empresa de trim, carpintería y acabados en Tampa, Florida.
Frontend en React y un backend ligero (API REST + MySQL) para las reseñas de clientes.

## Tecnologías

| Capa | Tecnologías |
| --- | --- |
| Frontend | React 19, Vite, TypeScript, Material UI (MUI), React Router DOM, Axios, ESLint, Vitest + Testing Library |
| Backend | Node.js, Express 5, TypeScript, mysql2, Zod, helmet, cors, express-rate-limit, dotenv, Vitest + Supertest |
| Base de datos | MySQL 8.4 |
| Opcional | Docker Compose (desarrollo) |

No se usa Next.js, Firebase ni Supabase. `bcrypt` no está instalado: se añadirá cuando exista autenticación.

## Arquitectura

```
Navegador ──► frontend (React, Vite)  ──HTTP/JSON──►  backend (Express, /api/v1)  ──►  MySQL
```

- **Frontend y backend son proyectos separados** (`/frontend`, `/backend`), cada uno con su `package.json`.
- **Servicios y proyectos** son archivos TypeScript en el frontend (no cambian desde el servidor todavía).
- **Reseñas** pasan por la API. Las reseñas nuevas se guardan como `pending` y solo se muestran las `approved`.
- **Contacto**: no hay formulario ni se guardan datos de visitantes. La página Contact Us muestra los datos de la empresa
  (teléfono, email, zona de servicio y redes) definidos en `frontend/src/config/company.ts`.
- Backend por capas: `routes → controllers → services → repositories → MySQL`. `app.ts` recibe sus dependencias,
  por eso los tests corren sin base de datos.

## Requisitos

- Node.js 20.19 o superior (probado con Node 22) y npm
- MySQL 8.4 (local o con Docker)

## Instalación y ejecución (sin Docker)

### 1. Base de datos

```sql
CREATE DATABASE wolf1k CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wolf1k'@'localhost' IDENTIFIED BY 'una_contraseña_segura';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX ON wolf1k.* TO 'wolf1k'@'localhost';
```

### 2. Backend

```bash
cd backend
cp .env.example .env        # editar credenciales de MySQL
npm install
npm run db:init             # crea las tablas (database/schema.sql)
npm run db:seed             # OPCIONAL, solo desarrollo: reseñas de muestra
npm run dev                 # http://localhost:3000/api/v1
```

Producción: `npm run build && npm start`.

¿Sin MySQL a mano? `npm run dev:mock` levanta la misma API con datos en memoria (solo para desarrollar el frontend).

### 3. Frontend

```bash
cd frontend
cp .env.example .env        # VITE_API_URL
npm install
npm run dev                 # http://localhost:5173
```

Producción: `npm run build` genera `frontend/dist/` (archivos estáticos).

## Ejecución con Docker (opcional)

```bash
cp .env.example .env        # contraseñas de MySQL
docker compose up --build
```

Levanta `mysql` (8.4, crea las tablas al iniciar el volumen por primera vez), `backend` (puerto 3000) y `frontend` (puerto 5173).
Reseñas de muestra: `docker compose exec backend npm run db:seed`.

## Variables de entorno

**backend/.env**

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `NODE_ENV` | `development`, `test` o `production` | `development` |
| `PORT` | Puerto de la API | `3000` |
| `CORS_ORIGINS` | Orígenes permitidos, separados por coma | `http://localhost:5173` |
| `TRUST_PROXY` | Nº de proxies delante de la API (0 directo, 1 detrás de Nginx) | `0` |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Conexión a MySQL | — |
| `DB_CONNECTION_LIMIT` | Tamaño del pool | `10` |
| `RATE_LIMIT_WINDOW_MINUTES`, `RATE_LIMIT_MAX` | Límite general por IP | `15`, `300` |
| `FORM_RATE_LIMIT_WINDOW_MINUTES`, `FORM_RATE_LIMIT_MAX` | Límite de `POST /reviews` | `60`, `5` |

**frontend/.env**

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `VITE_API_URL` | URL base de la API, sin barra final | `http://localhost:3000/api/v1` |
| `VITE_ENABLE_REVIEWS` | `true` muestra las reseñas (sección de la Home, página y enlaces). Sin definir quedan ocultas; requiere la API en línea | `false` |

**.env (raíz)** — solo para Docker Compose: `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`.

## Endpoints

Prefijo: `/api/v1`

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/health` | `{ "status": "ok", "service": "wolf1k-api" }` |
| GET | `/reviews` | Reseñas con `status = approved` → `{ "data": [{ id, name, rating, comment, createdAt }] }` |
| POST | `/reviews` | Body `{ name, rating (1-5), comment }`. Se guarda como `pending`. Responde 201 |

Errores: `{ "error": { "code", "message", "details"?: [{ field, message }] } }` con códigos 400, 404, 413, 429 o 500.

## Base de datos

Scripts en `backend/database/`: `schema.sql` (tabla e índices) y `seed.sql` (muestras para desarrollo).

- **reviews**: `id`, `name`, `rating`, `comment`, `status` (`pending` | `approved` | `rejected`), `created_at`, `updated_at`.
  Índice `(status, created_at)`.

Si la base se creó con una versión anterior del esquema, la tabla `contact_messages` ya no se usa:
`DROP TABLE IF EXISTS contact_messages;`

Todavía no hay panel de administración. Para moderar a mano:

```sql
SELECT id, name, rating, comment FROM reviews WHERE status = 'pending';
UPDATE reviews SET status = 'approved' WHERE id = 12;   -- o 'rejected'
```

> `seed.sql` contiene reseñas marcadas como "Sample". No son reseñas reales: no ejecutar en producción.
> Para borrarlas: `DELETE FROM reviews WHERE name LIKE 'Sample Customer%';`

## Estructura de archivos

```
wolf1k-services/
├── README.md · docker-compose.yml · .env.example
├── frontend/
│   ├── public/assets/{brand,hero,services,projects,reviews,icons,videos}/
│   └── src/
│       ├── api/          client.ts, reviews.ts, errors.ts, endpoints.ts
│       ├── components/   common, layout, home, services, projects, reviews, contact
│       ├── config/       company.ts, routes.ts, seo.ts, messages.ts
│       ├── data/         services.ts, projects.ts, videos.ts, home.ts, about.ts
│       ├── hooks/ · pages/ · routes/ · theme/ · types/ · utils/ · test/
└── backend/
    ├── database/         schema.sql, seed.sql
    ├── src/              config, controllers, database, middleware, repositories,
    │                     routes, schemas, services, types, utils, app.ts, server.ts
    └── tests/            api.test.ts, helpers.ts, devServer.ts
```

## ADDING NEW CONTENT / AGREGAR NUEVO CONTENIDO

Todas las imágenes viven en `frontend/public/assets/` y se referencian con rutas que empiezan por `/assets/...`.

| Qué | Dónde copiar el archivo | Qué archivo editar después |
| --- | --- | --- |
| **Logo** | `frontend/public/assets/brand/` (ej. `wolf1k-logo.png`) | Nada si se llama `wolf1k-logo.png`. Si cambia el nombre: `frontend/src/config/company.ts` → `brandAssets.logo` |
| **Imágenes Hero** | `frontend/public/assets/hero/` | `frontend/src/data/home.ts` → `heroContent.image` (y `index.html`: `og:image` y `preload`) |
| **Servicios** | `frontend/public/assets/services/` | `frontend/src/data/services.ts` |
| **Proyectos** | `frontend/public/assets/projects/` | `frontend/src/data/projects.ts` |
| **Reseñas / avatares** | `frontend/public/assets/reviews/` | Reservado para uso futuro (hoy las reseñas no llevan avatar) |
| **Iconos** | `frontend/public/assets/icons/` | El componente que lo use |
| **Videos** | `frontend/public/assets/videos/` (`.mp4` + imagen de portada) | `frontend/src/data/videos.ts` |
| **Teléfono, email, redes** | — | `frontend/src/config/company.ts` |
| **Favicon** | `frontend/public/favicon.svg` | `frontend/index.html` si cambia el nombre |

### Agregar un proyecto

1. Copiar la imagen a `frontend/public/assets/projects/` (ej. `project-16.webp`).
2. Abrir `frontend/src/data/projects.ts`.
3. Añadir un registro al arreglo `projects`:

```ts
{
  id: 16,
  title: 'Custom Crown Molding',
  category: 'Interior Trim',      // una categoría nueva crea su filtro automáticamente
  location: 'Tampa, FL',          // opcional
  description: 'Short description of the work.',
  image: '/assets/projects/project-16.webp',
  featured: true,                 // opcional: lo muestra en la Home
},
```

### Agregar un servicio

1. Copiar la imagen a `frontend/public/assets/services/` (ej. `stair-railings.webp`).
2. Abrir `frontend/src/data/services.ts`.
3. Añadir un registro al arreglo `services`:

```ts
{
  id: 9,
  slug: 'stair-railings',
  title: 'Stair Railings',
  description: 'Short description of the service.',
  image: '/assets/services/stair-railings.webp',
},
```

El servicio aparece solo en la Home y en la página Services.

### Formatos y tamaños recomendados

| Tipo | Formato | Tamaño aproximado |
| --- | --- | --- |
| Fotografías | `.webp` preferiblemente, `.jpg` aceptado | — |
| Logos | `.png` o `.svg` | — |
| Hero | WebP | 1920×1080 |
| Proyectos | WebP | 1200×800 (también funciona vertical: la tarjeta recorta a 4:5) |
| Servicios | WebP | 1000×700 |

Usar WebP reduce mucho el peso. No subir fotos gigantes tal como salen del teléfono: redimensionarlas antes
(por ejemplo con [Squoosh](https://squoosh.app)) y procurar que cada una pese menos de ~300 KB.
Si una imagen no carga, el sitio muestra un recuadro "Image unavailable" en lugar de romperse.

## Tests y calidad

```bash
cd backend  && npm test && npm run lint && npm run typecheck
cd frontend && npm test && npm run lint && npm run typecheck
```

- Backend (20 tests): health, listado solo de aprobadas, alta como `pending`, validaciones, entradas incorrectas,
  JSON inválido, payload demasiado grande, rate limiting, CORS, 404 y no exposición de errores SQL.
  Usan un repositorio en memoria; no ejercitan MySQL real.
- Frontend (19 tests): Home y secciones críticas, navegación, menú móvil, página de contacto (sin formulario), reseñas y su formulario, y el modo con reseñas ocultas.

## Seguridad

- `helmet` (cabeceras), `cors` restringido a `CORS_ORIGINS`, cuerpo JSON limitado a 10 kB.
- Rate limiting general y uno estricto para `POST /reviews` (5 por hora por IP por defecto).
- Validación con Zod en modo estricto (campos desconocidos se rechazan; el cliente no puede enviar `status`).
- Sanitización: se eliminan etiquetas HTML y caracteres de control; React escapa el texto al mostrarlo.
- Consultas parametrizadas con mysql2; `multipleStatements` desactivado en el pool.
- Manejo centralizado de errores: los errores internos/SQL se registran en el servidor y el cliente recibe un mensaje genérico.
- Secretos solo en `.env` (ignorado por Git); se versionan únicamente los `.env.example`.

### npm audit

- Dependencias de producción (`npm audit --omit=dev`): **0 vulnerabilidades** en frontend y backend.
- Dependencias de desarrollo: aviso de severidad moderada en `minimatch` (GHSA-g3hv-75wg-m249), que llega a través de
  ESLint / typescript-eslint. Solo afecta al linter en la máquina de desarrollo, no al sitio ni a la API.
  El arreglo automático (`npm audit fix --force`) baja ESLint 10 → 9 (cambio incompatible), así que se dejó sin aplicar;
  se resolverá al actualizar typescript-eslint cuando publique la corrección.

## Despliegue

1. **Base de datos**: MySQL 8.4 con un usuario limitado a la base `wolf1k`; ejecutar `npm run db:init` (no `db:seed`).
2. **Backend**: `npm ci && npm run build && npm start` con `NODE_ENV=production`, detrás de HTTPS (Nginx o similar).
   Ajustar `CORS_ORIGINS` al dominio real y `TRUST_PROXY=1` si hay proxy inverso. Usar un gestor de procesos (pm2, systemd).
3. **Frontend**: `VITE_API_URL=https://tu-dominio/api/v1 npm run build` y publicar `frontend/dist/` como sitio estático.
   En **Vercel**: importar el repositorio con Root Directory `frontend` (`vercel.json` ya resuelve las rutas de la SPA).
   Sin backend alojado, no definir `VITE_ENABLE_REVIEWS`: el sitio se publica sin la sección de reseñas.
   Es una SPA: configurar el servidor para devolver `index.html` en rutas desconocidas
   (Nginx: `try_files $uri /index.html;`).
4. Antes de publicar: colocar el logo, completar `frontend/src/config/company.ts` y cambiar `og:image` en
   `frontend/index.html` a una URL absoluta del dominio final.
