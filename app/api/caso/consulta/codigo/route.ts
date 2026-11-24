import { NextRequest, NextResponse } from "next/server";
import { validateNumeroCaso } from "@/lib/forms";
import { readJson } from "@/lib/request";
import { esm, MESA_NO_DISPONIBLE } from "@/lib/esm";

/**
 * POST /api/caso/consulta/codigo — pide a la mesa que envíe el código de
 * verificación al correo registrado en el caso.
 *
 * La respuesta es la misma exista o no el caso: quien prueba números no puede
 * saber cuáles existen ni a qué correo pertenecen.
 */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const caso = validateNumeroCaso((parsed.body as Record<string, unknown> | null)?.caso);
  if (!caso.ok) return NextResponse.json({ error: caso.error }, { status: 400 });

  const r = await esm<{ vigencia_min: number }>("/consulta/codigo", { method: "POST", body: { consecutivo: caso.value } });
  if (r.status !== 200) {
    console.error(`[caso] consulta/codigo: la mesa respondió ${r.status}`);
    return NextResponse.json({ error: MESA_NO_DISPONIBLE }, { status: r.status === 503 ? 503 : 502 });
  }
  return NextResponse.json({ ok: true, vigenciaMin: r.data?.vigencia_min ?? 10 });
}
