# Despliegue en Vercel (con Postgres)

> **Importante:** en local usamos **SQLite** (`prisma/dev.db`), pero **SQLite NO sirve en Vercel**: su sistema de archivos es efímero y la base de datos se borraría en cada despliegue. Para producción hay que usar **Postgres**.

## 1. Crear una base de datos Postgres

Elige una (todas tienen plan gratis):

- **Vercel Postgres** — integración directa desde el dashboard de Vercel (Storage → Create → Postgres).
- **Neon** ([neon.tech](https://neon.tech)) — Postgres serverless, muy buen plan gratuito.
- **Supabase** ([supabase.com](https://supabase.com)) — Postgres + extras.

Copia la **connection string** (algo como `postgresql://usuario:password@host/dbname?sslmode=require`).

## 2. Cambiar el provider de Prisma a Postgres

En [prisma/schema.prisma](prisma/schema.prisma), cambia el datasource:

```prisma
datasource db {
  provider = "postgresql"   // antes: "sqlite"
  url      = env("DATABASE_URL")
}
```

> El resto del schema (modelos `Product`, `Newsletter`, `AdminUser`) es compatible con Postgres sin cambios. Los campos `images` y `opinions` se guardan como `String` con JSON serializado, lo cual funciona igual en ambos motores.

## 3. Variables de entorno en Vercel

En **Project Settings → Environment Variables** añade:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | La connection string de Postgres del paso 1 |
| `JWT_SECRET` | Una clave aleatoria fuerte (mín. 32 caracteres) — **no uses el placeholder** |
| `ADMIN_EMAIL` | Email del administrador |
| `ADMIN_PASSWORD` | Contraseña inicial del admin (solo se usa al hacer el seed) |

Genera el `JWT_SECRET` con:
```bash
openssl rand -base64 32
```
o en PowerShell:
```powershell
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

> `lib/auth.js` lanza un error en producción si `JWT_SECRET` sigue siendo el placeholder, así que es obligatorio configurarlo.

## 4. Aplicar migraciones y seed en Postgres

Con `DATABASE_URL` apuntando ya a Postgres (en tu `.env` local o exportada):

```bash
# Genera el cliente
npx prisma generate

# Crea las tablas en Postgres (nueva migración limpia)
npx prisma migrate deploy   # si ya tienes migraciones para postgres
# — o, la primera vez para Postgres:
npx prisma migrate dev --name init_postgres

# Carga productos + usuario admin
node prisma/seed.js
```

> Las migraciones actuales en `prisma/migrations/` se generaron para SQLite. Al cambiar a Postgres conviene **regenerar** la migración inicial (borrar la carpeta `prisma/migrations` y volver a `prisma migrate dev --name init`), porque la sintaxis SQL difiere entre motores.

## 5. Build

Asegúrate de que el cliente Prisma se genera en cada build de Vercel. Añade a `package.json`:

```json
"scripts": {
  "build": "prisma generate && next build"
}
```

(Vercel ejecuta `npm run build` automáticamente.)

## 6. Comprobación post-deploy

1. Visita la web pública → los productos deben cargar desde Postgres.
2. Ve a `/admin/login` → entra con `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
3. Comprueba el panel `/admin` y la gestión de productos.

---

## Desarrollo local (sin tocar nada)

En local sigues con SQLite. El `.env` ya tiene:
```
DATABASE_URL="file:./prisma/dev.db"
```
Comandos útiles:
```bash
npx prisma migrate dev     # aplica migraciones
node prisma/seed.js        # carga datos de ejemplo + admin
npm run dev                # arranca en http://localhost:3000
```
Admin local por defecto (definido en `.env`): `admin@ahorramama.com` / `chollos2024`.
