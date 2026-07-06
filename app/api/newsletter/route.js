import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { normalizeEmail, isValidEmail } from "../../../lib/validation";

// Rate limiting simple en memoria: 5 peticiones/minuto por IP.
// (En serverless es por instancia; suficiente contra spam básico.)
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  rec.count += 1;
  if (hits.size > 5000) hits.clear(); // evita crecer sin límite
  return rec.count > MAX_PER_WINDOW;
}

export async function POST(request) {
  const ip = (request.headers.get("x-forwarded-for") || "?").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Demasiadas peticiones, prueba en un minuto" }, { status: 429 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  try {
    await prisma.newsletter.upsert({
      where: { email },
      update: {},
      create: { email },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
