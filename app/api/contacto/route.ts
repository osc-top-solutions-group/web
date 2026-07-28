import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { envios, MODULOS } from "@/lib/firebase/server";
import { validateContacto } from "@/lib/forms";
import { readJson, clientMeta } from "@/lib/request";

/** POST /api/contacto — registra un lead en `formularios/web_contacto/envios`. */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const valid = validateContacto(parsed.body);
  if (!valid.ok) return NextResponse.json({ error: valid.error }, { status: 400 });

  try {
    const ref = await envios(MODULOS.contacto).add({
      ...valid.value,
      estado: "nuevo",
      origen: "web-corporativa",
      createdAt: FieldValue.serverTimestamp(),
      meta: clientMeta(req),
    });
    console.log(`[contacto] envío registrado ${ref.id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Sin detalles al cliente: el mensaje de Firestore puede revelar rutas y configuración.
    console.error("[contacto] error al escribir en Firestore:", err);
    return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 });
  }
}
