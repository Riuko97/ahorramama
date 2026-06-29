import { NextResponse } from "next/server";
import { verifyToken, COOKIE } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api/");
  // Normaliza la barra final (el proyecto usa trailingSlash: true)
  const path = pathname.replace(/\/+$/, "") || "/";

  // Rutas públicas que no requieren token
  if (path === "/admin/login" || path === "/api/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    // Las APIs responden 401 en JSON; las páginas redirigen al login
    if (isApi) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
