guarda todos los errores que encuentres para no repetirlos en @CLAUDE.md

## Agentes del proyecto y reglas de enrutado (.claude/agents/)
El proyecto tiene 5 agentes especializados. Reglas para decidir cuándo delegar:

- **NO delegues** tareas simples y concretas (cambiar un texto, un color, añadir un producto a la BD, responder una duda): hazlas directamente.
- **backend** → API routes, Prisma/SQLite, auth JWT, lógica de afiliados (`affLink`), seeds, schema.
- **frontend** → componentes React, páginas, CSS, comparador, diseño responsive.
- **seo** → metadatos, JSON-LD, sitemap, contenido SEO, keywords del nicho bebé.
- **revisor-errores** → SIEMPRE después de cualquier cambio de código no trivial, y para diagnosticar fallos. Solo lee y reporta.
- **integrador** → tareas grandes que tocan 2+ áreas. Descompone, delega en los demás, unifica y cierra con revisor-errores.

Flujo típico de una tarea grande: integrador → [backend / frontend / seo] → revisor-errores → resumen con pasos manuales de Windows si los hay.

## Arquitectura de autenticación (decidida)
El proyecto usa auth propia de **admin con email + contraseña**: JWT con `jose` (cookie httpOnly `admin_token`, 8h) + `bcryptjs` + Prisma (modelo `AdminUser`). NO se usa NextAuth ni Google OAuth. Protección de rutas `/admin/*` en `middleware.js`. Datos (productos, newsletter) en Prisma/SQLite.

## Errores encontrados (2026-06-29)
- **`next-auth` no está instalado pero 5 archivos lo importan → el build falla** (`next build` → "Module not found: Can't resolve 'next-auth'"). Archivos huérfanos de un intento previo con NextAuth/Google que hay que ELIMINAR o reescribir: `app/api/auth/[...nextauth]/route.js`, `app/components/SessionWrapper.js`, `app/admin/login/LoginButton.js`, `app/admin/LogoutButton.js`, `app/admin/page.js`, `app/admin/login/page.js`.
- **`jose` se importa en `lib/auth.js` pero NO está en package.json ni instalado** → fallaría en runtime el middleware y `/api/admin/login`. Hay que `npm install jose`.
- **`app/admin/page.js` y `app/admin/login/page.js` siguen siendo la versión NextAuth/Google**, no la del sistema email+contraseña. Falta crear: formulario de login que haga POST a `/api/admin/login`, y dashboard que lea la cookie JWT.
- **`.env.local` quedó obsoleto** con variables de NextAuth (`NEXTAUTH_*`, `GOOGLE_*`); contradice `.env`. El sistema real usa `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`. `.env.local` tiene prioridad sobre `.env` en Next.js → puede confundir.
- **`JWT_SECRET` por defecto es un placeholder** en `.env`/`lib/auth.js` ("cambia-esta-clave..."). Cambiar antes de producción.
- **DB de dev anidada** en `prisma/prisma/dev.db` (por `DATABASE_URL="file:./prisma/dev.db"` resuelto desde la carpeta prisma). Funciona pero es confuso.
- Nota: MIGRADO a Postgres (Neon) el 2026-07-07 — ver sección "Base de datos (Neon)" abajo.

## Capa de datos: PRODUCTS/CATEGORIES ya NO son estáticos
- `lib/products.js` **ya no exporta `PRODUCTS` ni `CATEGORIES`**. Son funciones async: `getProducts()`, `getProduct(id)`, `getCategories()`, `getDealOfDay()` (leen de Prisma). Importar `PRODUCTS`/`CATEGORIES` directamente rompe el build ("not exported").
  - Server Components (`page.js`, `layout.js`, `sitemap.js`) → `await getProducts()` / `await getCategories()` y pasar por props.
  - Client Components → reciben datos por props o desde `StoreProvider` (que ahora expone `categories` y `compareItems`).
- **Comparador sin listado global:** `StoreProvider` guarda objetos completos en `compareItems` (no ids). `toggleCompare(product)` recibe el objeto; `compareIds` se deriva. `CompareButton` recibe `product={p}` (no `id`). `Comparator` lee `compareItems`.
- **`JWT_SECRET` placeholder hace fallar el BUILD, no solo producción:** el guard de `lib/auth.js` lanza `throw` cuando `NODE_ENV==="production"` (caso de `next build`) y el secreto es el por defecto → falla "Collecting page data" en rutas que importan `lib/auth`. Poner secreto real en `.env`.

## Errores encontrados (2026-07-06) — sandbox Linux de Cowork
- **Prisma Client generado solo para Windows no funciona en el sandbox Linux** ("could not locate the Query Engine for runtime debian-openssl-3.0.x"). Se añadió `binaryTargets = ["native", "windows", "debian-openssl-3.0.x"]` a `schema.prisma`, PERO la descarga del engine Linux falla en el sandbox (`binaries.prisma.sh` → 403 Forbidden, red restringida). **Workaround que sí funciona:** leer/escribir la BD directamente con `python3` + `sqlite3` sobre `prisma/prisma/dev.db` (tabla `Product`). El usuario debe ejecutar `npx prisma generate` en Windows tras cambiar el schema.
- **`affLink()` añadía `?tag=` de Amazon a CUALQUIER URL** (incluidas las de Awin `awin1.com`, lo que rompería su tracking). Corregido: solo añade el tag si el dominio es de Amazon.
- Los enlaces cortos `amzn.to` no se pueden resolver (redirect) desde el sandbox: Amazon devuelve vacío fuera de un navegador real.

## Afiliados (estado 2026-07-06, actualizado)
- Amazon Afiliados: ACTIVO. Tag real: **`ahorramama-21`** (ya puesto en `AFFILIATE_TAG` de `lib/products.js`). Los productos antiguos usan enlaces cortos `amzn.to` (tag embebido); los nuevos usan `https://www.amazon.es/dp/ASIN` SIN tag — `affLink()` lo añade al renderizar. NO guardar el tag en la BD.
- Awin: cuenta de editor **ahorramama, ID 2960799** (= `awinaffid` para deep-links). 6 programas solicitados pendientes de aprobación (2026-07-06): El Corte Inglés ES, AliExpress ES, Aosom ES, Carrefour Supermercado Online, Babymarkt ES, Vertbaudet ES. OJO Carrefour: SOLO comisiona categorías food/supermercado.
- En Awin España NO están: Kiabi, Chicco, Tutete, Pisamonas, Prenatal, Bebitus.
- Campo `store` del modelo Product indica la tienda ("Amazon", "El Corte Inglés", etc.). Para productos Awin usar la URL de deep-link de Awin (`awin1.com/cread.php?...`) tal cual, sin modificar.
- 2026-07-06: subidos 14 chollos reales de Amazon (ids 27-40) + 30 más (ids 41-70) con precio/valoración/imagen reales (imágenes hotlink `m.media-amazon.com`, funcionan porque los componentes usan `<img>` normal y `images.unoptimized` en next.config). Categorías nuevas: Sillas de coche, Habitación, Juego, Baño, Viaje, Chupetes.
- Criterio de calidad: no subir productos con valoración < 4,0★ (descartados: calienta biberones 3,7★, sacaleches NUK manual 3,9★, calzones Aolso 3,8★, vaso NUK Mini-Me 3,8★).

## Errores encontrados (2026-07-06, tarde) — sandbox
- **`sqlite3` da "disk I/O error" al ESCRIBIR en la BD a través del mount** (`/sessions/.../mnt/...`). Workaround: copiar `dev.db` a `/tmp`, escribir allí y copiar de vuelta (verificar con `md5sum`). La lectura simple a veces también falla ("unable to open database file").
- **La caché del mount del shell puede quedarse DESFASADA tras editar con las herramientas de archivos** (el shell ve archivos truncados). Antes de COMMITEAR, verificar con `wc -l`/`tail` que el mount ve el archivo completo; si no, reescribirlo entero vía shell (heredoc).
- **`public/products/postgresql-18.4-2-windows-x64.exe` (359 MB)**: instalador que NO debe subirse a git (GitHub rechaza >100 MB). Añadido a .gitignore.
- **La BD `*.db` está en .gitignore** pero Vercel la necesita para mostrar productos → se añadió excepción `!prisma/prisma/dev.db` (se versiona). En Vercel el filesystem es de solo lectura: la web LEE productos bien, pero newsletter/panel admin NO podrán escribir en producción hasta migrar a Postgres.

## Build en Windows (entorno local)
- `prisma generate` → **EPERM** renombrando `query_engine-windows.dll.node` si hay un `next dev` corriendo (bloquea la DLL). Detener el dev server antes de generar/buildear.
- `next build` → **ENOENT renombrando `.next/export/500.html`** si `.next` quedó sucio/bloqueado. Solución: `Remove-Item -Recurse -Force .next` y reconstruir sin dev server activo.

## Base de datos (Neon Postgres) — desde 2026-07-07
- Producción y desarrollo usan **Neon Postgres** (recurso `ahorramama-db`, región fra1, plan Free), conectado al proyecto de Vercel (inyecta `DATABASE_URL` automáticamente). `.env` local apunta a la misma BD.
- `schema.prisma` con `provider = "postgresql"`. 69 productos + newsletter + admin importados. `dev.db` (SQLite) quedó como copia local SIN versionar.
- Newsletter y panel admin ya pueden ESCRIBIR en producción.
- Para consultas rápidas sin Prisma: endpoint HTTP de Neon `POST https://<host>/sql` con cabecera `Neon-Connection-String` (funciona desde el navegador; el sandbox NO llega por red).

## Errores del entorno (2026-07-07)
- **El mount del sandbox NO permite BORRAR archivos** (`rm` → Operation not permitted), solo crear/sobrescribir. Consecuencia: cada operación git de escritura deja su `*.lock` huérfano (`index.lock`, `HEAD.lock`) que bloquea la siguiente. Solución: borrar los .lock desde el Explorador de Windows, y commitear con plumbing sin locks: `GIT_INDEX_FILE=/tmp/gidx git add/write-tree` + `git commit-tree` + escribir el hash directamente en `.git/refs/heads/main`.
- La tarea programada diaria de precios corre a las 9:00 y también puede dejar locks (ejecución 2026-07-07: OK, commit f6fa3e8, 9 cambios).
