import { NextRequest, NextResponse } from "next/server";
import { validateCodigoConsulta, validateNumeroCaso } from "@/lib/forms";
import { readJson } from "@/lib/request";
import { esm, COOKIE_CONSULTA, COOKIE_CONSULTA_MAX_AGE, COOKIE_CONSULTA_PATH, MESA_NO_DISPONIBLE } from "@/lib/esm";

/**
 * POST /api/caso/consulta/verificar — valida el código y abre la sesión de consulta.
 *
 * La mesa devuelve un token firmado, atado al correo del caso, que aquí se
 * guarda en una cookie httpOnly: el JavaScript de la página nunca lo ve y solo
 * viaja a `/api/caso/*`.
 */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const b = (parsed.body ?? {}) as Record<string, unknown>;

  const caso = validateNumeroCaso(b.caso);
  if (!caso.ok) return NextResponse.json({ error: caso.error }, { status: 400 });
  const codigo = validateCodigoConsulta(b.codigo);
  if (!codigo.ok) return NextResponse.json({ error: codigo.error }, { status: 400 });

  const r = await esm<{ token: string; consecutivo: string }>("/consulta/verificar", {
    method: "POST",
    body: { consecutivo: caso.value, codigo: codigo.value },
  });
  if (r.status === 400) {
    return NextResponse.json({ error: "El código no es válido o ya venció. Solicite uno nuevo." }, { status: 400 });
  }
  if (r.status !== 200 || !r.data?.token) {
    console.error(`[caso] consulta/verificar: la mesa respondió ${r.status}`);
    return NextResponse.json({ error: MESA_NO_DISPONIBLE }, { status: r.status === 503 ? 503 : 502 });
  }

  const res = NextResponse.json({ ok: true, caso: r.data.consecutivo });
  res.cookies.set(COOKIE_CONSULTA, r.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: COOKIE_CONSULTA_PATH,
    maxAge: COOKIE_CONSULTA_MAX_AGE,
  });
  return res;
}
