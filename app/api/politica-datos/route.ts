import { NextResponse } from "next/server";
import { politicaDatos } from "@/lib/qualita";

export const dynamic = "force-dynamic";

/**
 * GET /api/politica-datos — versión vigente de la política de tratamiento de datos
 * personales, tal como está aprobada en QUALITA. Los formularios la usan para
 * mostrar el enlace con su versión. 503 si QUALITA no está disponible: el
 * formulario enlaza entonces a /compliance.
 */
export async function GET() {
  const p = await politicaDatos();
  if (!p) return NextResponse.json({ error: "Política no disponible" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json(
    { codigo: p.codigo, nombre: p.nombre, version: p.version, sha256: p.sha256, pdf: "/api/politica-datos/pdf" },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
}
