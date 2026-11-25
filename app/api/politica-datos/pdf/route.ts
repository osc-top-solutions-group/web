import { NextResponse } from "next/server";
import { politicaDatosPdf } from "@/lib/qualita";

export const dynamic = "force-dynamic";

/**
 * GET /api/politica-datos/pdf — PDF vigente de la política de tratamiento de datos
 * personales (QUALITA), para leerlo en el navegador. Es un documento clasificado
 * como público; se sirve tal cual lo aprobó Legal, verificado por su huella.
 */
export async function GET() {
  const r = await politicaDatosPdf();
  if (!r) {
    return NextResponse.json(
      { error: "La política no está disponible en este momento. Intente de nuevo en unos minutos." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  const nombre = `${r.politica.codigo}-v${r.politica.version}.pdf`.replace(/[^A-Za-z0-9._-]/g, "_");
  return new NextResponse(new Uint8Array(r.bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(r.bytes.length),
      "Content-Disposition": `inline; filename="${nombre}"`,
      // Corta: una versión nueva aprobada en QUALITA debe verse en minutos.
      "Cache-Control": "public, max-age=300",
      ETag: `"${r.politica.sha256}"`,
      "X-Content-Type-Options": "nosniff",
      "X-Documento-Version": r.politica.version,
    },
  });
}
