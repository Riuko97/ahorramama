import { SignJWT, jwtVerify } from "jose";

const DEFAULT_SECRET = "cambia-esta-clave-secreta-en-produccion-min32chars";
const COOKIE = "admin_token";
const MAX_AGE = 60 * 60 * 8; // 8 horas

// Se evalúa de forma perezosa (no al importar) para no romper el build cuando
// la variable de entorno aún no está disponible. En producción exige una clave
// propia; en desarrollo cae al valor por defecto.
function getSecret() {
  const raw = process.env.JWT_SECRET || DEFAULT_SECRET;
  if (process.env.NODE_ENV === "production" && raw === DEFAULT_SECRET) {
    throw new Error(
      "JWT_SECRET no está configurado. Define una clave segura en las variables de entorno antes de desplegar."
    );
  }
  return new TextEncoder().encode(raw);
}

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

/**
 * Lee y verifica el token del admin desde las cookies de la petición.
 * Defensa en profundidad para usar dentro de route handlers, además del middleware.
 * @returns {Promise<object|null>} payload del admin o null si no autenticado.
 */
export async function getAdmin(request) {
  const token = request.cookies.get(COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Lee el admin desde las cookies en un Server Component (next/headers).
 * @returns {Promise<object|null>}
 */
export async function getAdminFromCookies(cookieStore) {
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE, MAX_AGE };
