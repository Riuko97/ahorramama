# Migración a PostgreSQL (SQLite → Postgres)

**Por qué:** en Vercel el disco es de solo lectura. La web LEE productos bien, pero la
newsletter y el panel admin NO pueden guardar nada en producción hasta usar una BD externa.

Este kit contiene todo lo necesario:
- `datos.sql` — los 69 productos + suscriptores + admin, listos para importar.
- `schema.postgres.prisma` — el schema con provider `postgresql`.

## Paso 1 · Crear la base de datos en la nube (5 min)

La opción más fácil con Vercel es **Neon** (Postgres serverless, plan gratuito):

1. Entra en tu proyecto de Vercel → pestaña **Storage** → **Create Database** → **Neon Postgres**.
2. Acepta y elige región **Frankfurt (eu-central-1)** (la más cercana a España).
3. Vercel añade automáticamente la variable `DATABASE_URL` al proyecto.
4. Copia esa `DATABASE_URL` (Storage → tu BD → `.env.local` tab) — la necesitas en el paso 3.

## Paso 2 · Cambiar el schema en el proyecto

En PowerShell, dentro de la carpeta del proyecto (SIN `next dev` corriendo):

```powershell
copy migracion-postgres\schema.postgres.prisma prisma\schema.prisma
```

Y en `.env`, sustituye la línea `DATABASE_URL="file:./prisma/dev.db"` por la URL de Neon:

```
DATABASE_URL="postgresql://usuario:password@ep-xxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

## Paso 3 · Crear tablas e importar los datos

```powershell
npx prisma generate
npx prisma db push          # crea las tablas en Neon
```

Para importar `datos.sql` tienes dos opciones:

**A) Con psql (ya tienes PostgreSQL instalado en Windows):**
```powershell
psql "TU_DATABASE_URL_DE_NEON" -f migracion-postgres\datos.sql
```

**B) Desde el editor SQL de Neon:** abre el SQL Editor en neon.tech, pega el contenido
de `datos.sql` y ejecútalo.

## Paso 4 · Probar en local y desplegar

```powershell
npm run dev     # comprueba que la home muestra los 69 productos desde Neon
```

Si todo va bien: commit + push. Vercel ya tiene `DATABASE_URL` (paso 1), así que el
deploy funcionará y **newsletter + panel admin escribirán de verdad en producción**.

## Después de migrar

- Elimina la excepción `!prisma/prisma/dev.db` del `.gitignore` (la BD ya no viaja en git).
- `git rm --cached prisma/prisma/dev.db` para dejar de versionarla (guárdala como copia local).
- El instalador `postgresql-18.4-2-windows-x64.exe` de `public/products/` ya solo te sirve
  si quieres un Postgres local de desarrollo; puedes borrarlo de esa carpeta (no debe estar en `public/`).

## Vuelta atrás (si algo falla)

Restaura el schema anterior y la URL de SQLite en `.env`:
```powershell
git checkout -- prisma/schema.prisma
# .env: DATABASE_URL="file:./prisma/dev.db"
npx prisma generate
```
