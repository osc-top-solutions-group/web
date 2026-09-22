import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { envios, MODULOS } from "@/lib/firebase/server";
import { validateFrenteCritico } from "@/lib/forms";
import { readJson, clientMeta } from "@/lib/request";

/** POST /api/frente-critico — registra un lead en `formularios/web_frente_critico/envios`. */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const valid = validateFrenteCritico(parsed.body);
  if (!valid.ok) return NextResponse.json({ error: valid.error }, { status: 400 });

  try {
    const ref = await envios(MODULOS.frenteCritico).add({
      ...valid.value,
      estado: "nuevo",
      origen: "landing-frente-critico",
      createdAt: FieldValue.serverTimestamp(),
      meta: clientMeta(req),
    });
    console.log(`[frente-critico] envío registrado ${ref.id}`);
    // Igual que en `/api/contacto`, la notificación por correo la dispara una
    // Cloud Function con trigger de Firestore: este servicio público no tiene
    // permisos de Gmail. `notify-contacto` hoy solo escucha la colección de
    // contacto, así que su trigger debe extenderse a esta ruta.
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Sin detalles al cliente: el mensaje de Firestore puede revelar rutas y configuración.
    console.error("[frente-critico] error al escribir en Firestore:", err);
    return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 });
  }
}
