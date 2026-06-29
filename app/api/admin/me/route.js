import { NextResponse } from "next/server";
import { getAdmin } from "../../../../lib/auth";

export async function GET(request) {
  const admin = await getAdmin(request);
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  return NextResponse.json({ email: admin.email, id: admin.id });
}
