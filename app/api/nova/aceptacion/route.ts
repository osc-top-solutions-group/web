import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { readJson, clientIp } from "@/lib/request";
import { aceptacionParaRegistro, evidenciaConsentimiento } from "@/lib/consentimiento-servidor";

/**
 * POST /api/nova/aceptacion — la persona marcó, dentro del chat de NOVA, la casilla
 * de la política de tratamiento de datos.
 *
 * Sin esta aceptación el asistente no recibe datos ni radica solicitudes. La
 * evidencia se arma AQUÍ (texto literal de la casilla, documento vigente en QUALITA,
 * hora del servidor e IP), igual que en los formularios, y se entrega al orquestador
 * servidor-a-servidor: firmada con el token compartido, que el navegador no conoce.
 * El orquestador no acepta esta llamada desde el navegador (ver `proxy.ts`).
 */

const RE_SESION = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const NO_DISPONIBLE = "No pudimos registrar su aceptación. Por favor intente de nuevo.";

export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const b = (parsed.body && typeof parsed.body === "object" ? parsed.body : {}) as Record<string, unknown>;

  const sesion = typeof b.session_id === "string" ? b.session_id : "";
  if (!RE_SESION.test(sesion)) return NextResponse.json({ error: "Inicie de nuevo la conversación" }, { status: 400 });

  const acepta = await evidenciaConsentimiento(req, parsed.body, "chat");
  if (!acepta.ok) return NextResponse.json({ error: acepta.error }, { status: acepta.status });

  const origen = (process.env.AGENTE_API_ORIGIN ?? "").replace(/\/+$/, "");
  const token = process.env.AGENTE_ORIGEN_TOKEN ?? "";
  if (!origen || !token) return NextResponse.json({ error: NO_DISPONIBLE }, { status: 503 });

  const aceptacion = aceptacionParaRegistro(acepta.evidencia);
  const firma = createHmac("sha256", token).update(`${sesion}|${aceptacion.fecha}|${aceptacion.declaracion}`).digest("hex");
  const ip = clientIp(req);

  try {
    const res = await fetch(`${origen}/agente-api/aceptacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-agente-origen": token,
        "x-agente-firma": firma,
        ...(ip ? { "x-agente-cliente-ip": ip } : {}),
      },
      // El orquestador guarda la evidencia sin `origen`: lo fija él al radicar ("chat").
      body: JSON.stringify({
        session_id: sesion,
        aceptacion_datos: {
          declaracion: aceptacion.declaracion,
          documento: aceptacion.documento,
          confirmacion_navegador: aceptacion.confirmacion_navegador,
          fecha: aceptacion.fecha,
          ip: aceptacion.ip,
          user_agent: aceptacion.user_agent,
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && typeof data?.respuesta === "string") {
      return NextResponse.json({ ok: true, respuesta: data.respuesta });
    }
    if (res.status === 400 && data?.error === "Sesión no encontrada") {
      return NextResponse.json({ error: "La conversación expiró. Inicie una nueva." }, { status: 400 });
    }
    console.error(`[nova] el asistente respondió ${res.status} al registrar la aceptación`);
    return NextResponse.json({ error: NO_DISPONIBLE }, { status: 502 });
  } catch (err) {
    console.error(`[nova] no se pudo registrar la aceptación: ${err instanceof Error ? err.message : "error desconocido"}`);
    return NextResponse.json({ error: NO_DISPONIBLE }, { status: 502 });
  }
}
