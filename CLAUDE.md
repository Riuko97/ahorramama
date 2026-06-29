guarda todos los errores que encuentres para no repetirlos en @CLAUDE.md

## Arquitectura de autenticación (decidida)
El proyecto usa auth propia de **admin con email + contraseña**: JWT con `jose` (cookie httpOnly `admin_token`, 8h) + `bcryptjs` + Prisma (modelo `AdminUser`). NO se usa NextAuth ni Google OAuth. Protección de rutas `/admin/*` en `middleware.js`. Datos (productos, newsletter) en Prisma/SQLite.

## Errores encontrados (2026-06-29)
- **`next-auth` no está instalado pero 5 archivos lo importan → el build falla** (`next build` → "Module not found: Can't resolve 'next-auth'"). Archivos huérfanos de un intento previo con NextAuth/Google que hay que ELIMINAR o reescribir: `app/api/auth/[...nextauth]/route.js`, `app/components/SessionWrapper.js`, `app/admin/login/LoginButton.js`, `app/admin/LogoutButton.js`, `app/admin/page.js`, `app/admin/login/page.js`.
- **`jose` se importa en `lib/auth.js` pero NO está en package.json ni instalado** → fallaría en runtime el middleware y `/api/admin/login`. Hay que `npm install jose`.
- **`app/admin/page.js` y `app/admin/login/page.js` siguen siendo la versión NextAuth/Google**, no la del sistema email+contraseña. Falta crear: formulario de login que haga POST a `/api/admin/login`, y dashboard que lea la cookie JWT.
- **`.env.local` quedó obsoleto** con variables de NextAuth (`NEXTAUTH_*`, `GOOGLE_*`); contradice `.env`. El sistema real usa `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`. `.env.local` tiene prioridad sobre `.env` en Next.js → puede confundir.
- **`JWT_SECRET` por defecto es un placeholder** en `.env`/`lib/auth.js` ("cambia-esta-clave..."). Cambiar antes de producción.
- **DB de dev anidada** en `prisma/prisma/dev.db` (por `DATABASE_URL="file:./prisma/dev.db"` resuelto desde la carpeta prisma). Funciona pero es confuso.
- Nota: SQLite no sirve en Vercel (filesystem efímero). Para producción migrar a Postgres (Vercel Postgres/Neon/Supabase).

## Capa de datos: PRODUCTS/CATEGORIES ya NO son estáticos
- `lib/products.js` **ya no exporta `PRODUCTS` ni `CATEGORIES`**. Son funciones async: `getProducts()`, `getProduct(id)`, `getCategories()`, `getDealOfDay()` (leen de Prisma). Importar `PRODUCTS`/`CATEGORIES` directamente rompe el build ("not exported").
  - Server Components (`page.js`, `layout.js`, `sitemap.js`) → `await getProducts()` / `await getCategories()` y pasar por props.
  - Client Components → reciben datos por props o desde `StoreProvider` (que ahora expone `categories` y `compareItems`).
- **Comparador sin listado global:** `StoreProvider` guarda objetos completos en `compareItems` (no ids). `toggleCompare(product)` recibe el objeto; `compareIds` se deriva. `CompareButton` recibe `product={p}` (no `id`). `Comparator` lee `compareItems`.
- **`JWT_SECRET` placeholder hace fallar el BUILD, no solo producción:** el guard de `lib/auth.js` lanza `throw` cuando `NODE_ENV==="production"` (caso de `next build`) y el secreto es el por defecto → falla "Collecting page data" en rutas que importan `lib/auth`. Poner secreto real en `.env`.

## Build en Windows (entorno local)
- `prisma generate` → **EPERM** renombrando `query_engine-windows.dll.node` si hay un `next dev` corriendo (bloquea la DLL). Detener el dev server antes de generar/buildear.
- `next build` → **ENOENT renombrando `.next/export/500.html`** si `.next` quedó sucio/bloqueado. Solución: `Remove-Item -Recurse -Force .next` y reconstruir sin dev server activo.
