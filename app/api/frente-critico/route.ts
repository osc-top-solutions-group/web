import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { envios, MODULOS } from "@/lib/firebase/server";
import { validateFrenteCritico, detectBot } from "@/lib/forms";
import { readJson, clientMeta } from "@/lib/request";

/** POST /api/frente-critico — registra un lead en `formularios/web_frente_critico/envios`. */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Anti-bots antes de validar: al bot se le responde igual que a un humano
  // (200 sin detalle) para no darle señal de qué heurística lo detectó.
  const bot = detectBot(parsed.body);
  if (bot.bot) {
    console.warn(`[frente-critico] envío descartado por anti-bots (${bot.motivo}) ip=${clientMeta(req).ip}`);
    return NextResponse.json({ ok: true });
  }

  const valid = validateFrenteCritico(parsed.body);
  if (!valid.ok) return NextResponse.json({ error: valid.error }, { status: 400 });

  try {
    const ref = await envios(MODULOS.frenteCritico).add({
      ...valid.value,
      estado: "nuevo",
      origen: "landing-frente-critico",
      // `notificado: false` es lo que consulta el barrido `resend-pending-leads`
      // para reintentar cualquier lead cuyo correo no haya salido.
      notificado: false,
      createdAt: FieldValue.serverTimestamp(),
      meta: clientMeta(req),
    });
    console.log(`[frente-critico] envío registrado ${ref.id}`);
    // La notificación por correo la envía la Cloud Function
    // `notify-web-frente-critico` (trigger de Firestore sobre esta colección):
    // este servicio público no tiene permisos de Gmail.
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Sin detalles al cliente: el mensaje de Firestore puede revelar rutas y configuración.
    console.error("[frente-critico] error al escribir en Firestore:", err);
    return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 });
  }
}
