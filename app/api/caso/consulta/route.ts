import { NextRequest, NextResponse } from "next/server";
import { validateNumeroCaso } from "@/lib/forms";
import { esm, COOKIE_CONSULTA, COOKIE_CONSULTA_PATH, MESA_NO_DISPONIBLE } from "@/lib/esm";

const SIN_CACHE = { "Cache-Control": "no-store" };

function sinSesion() {
  const res = NextResponse.json(
    { error: "Su sesión de consulta venció. Solicite un código nuevo." },
    { status: 401, headers: SIN_CACHE },
  );
  res.cookies.set(COOKIE_CONSULTA, "", { httpOnly: true, path: COOKIE_CONSULTA_PATH, maxAge: 0 });
  return res;
}

/**
 * GET /api/caso/consulta            → casos del correo verificado ("ver todos mis casos").
 * GET /api/caso/consulta?caso=SAC-1 → un caso con su conversación pública e historial.
 *
 * Requiere la sesión de consulta (cookie httpOnly que deja `/verificar`). La
 * mesa solo devuelve casos del correo que recibió el código.
 */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_CONSULTA)?.value;
  if (!token) return sinSesion();

  const pedido = req.nextUrl.searchParams.get("caso");
  let ruta = "/consulta/solicitudes";
  if (pedido) {
    const caso = validateNumeroCaso(pedido);
    if (!caso.ok) return NextResponse.json({ error: caso.error }, { status: 400, headers: SIN_CACHE });
    ruta += `/${encodeURIComponent(caso.value)}`;
  }

  const r = await esm(ruta, { tokenConsulta: token });
  if (r.status === 401) return sinSesion();
  if (r.status === 404) {
    return NextResponse.json({ error: "No encontramos ese caso entre los suyos." }, { status: 404, headers: SIN_CACHE });
  }
  if (r.status !== 200 || !r.data) {
    console.error(`[caso] consulta: la mesa respondió ${r.status}`);
    return NextResponse.json({ error: MESA_NO_DISPONIBLE }, { status: r.status === 503 ? 503 : 502, headers: SIN_CACHE });
  }
  return NextResponse.json(r.data, { headers: SIN_CACHE });
}

/** DELETE /api/caso/consulta — cierra la sesión de consulta en este navegador. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true }, { headers: SIN_CACHE });
  res.cookies.set(COOKIE_CONSULTA, "", { httpOnly: true, path: COOKIE_CONSULTA_PATH, maxAge: 0 });
  return res;
}
