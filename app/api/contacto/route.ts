import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { envios, MODULOS } from "@/lib/firebase/server";
import { validateContacto, detectBot } from "@/lib/forms";
import { readJson, clientMeta } from "@/lib/request";
import { evidenciaConsentimiento, registrarAceptacionSinCaso } from "@/lib/consentimiento-servidor";

/** POST /api/contacto — registra un lead en `formularios/web_contacto/envios`. */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Anti-bots antes de validar: al bot se le responde igual que a un humano
  // (200 sin detalle) para no darle señal de qué heurística lo detectó.
  const bot = detectBot(parsed.body);
  if (bot.bot) {
    console.warn(`[contacto] envío descartado por anti-bots (${bot.motivo}) ip=${clientMeta(req).ip}`);
    return NextResponse.json({ ok: true });
  }

  const valid = validateContacto(parsed.body);
  if (!valid.ok) return NextResponse.json({ error: valid.error }, { status: 400 });

  // Aceptación de la política de datos: qué versión, qué texto, cuándo y desde dónde.
  const acepta = await evidenciaConsentimiento(req, parsed.body, "contacto");
  if (!acepta.ok) return NextResponse.json({ error: acepta.error }, { status: acepta.status });

  try {
    const ref = await envios(MODULOS.contacto).add({
      ...valid.value,
      autorizacionDatos: acepta.evidencia,
      estado: "nuevo",
      origen: "web-corporativa",
      // `notificado: false` es lo que consulta el barrido `resend-pending-leads`
      // para reintentar cualquier lead cuyo correo no haya salido.
      notificado: false,
      createdAt: FieldValue.serverTimestamp(),
      meta: clientMeta(req),
    });
    console.log(`[contacto] envío registrado ${ref.id}`);
    // La aceptación queda también en el registro único de la mesa de servicio (consulta de Legal).
    await registrarAceptacionSinCaso(acepta.evidencia, { correo: valid.value.email, nombre: valid.value.nombre }, `web:contacto:${ref.id}`);
    // La notificación por correo la envía la Cloud Function `notify-web-contacto`
    // (trigger de Firestore): este servicio público no tiene permisos de Gmail.
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Sin detalles al cliente: el mensaje de Firestore puede revelar rutas y configuración.
    console.error("[contacto] error al escribir en Firestore:", err);
    return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 });
  }
}
