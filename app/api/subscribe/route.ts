import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { envios, MODULOS } from "@/lib/firebase/server";
import { validateSuscripcion } from "@/lib/forms";
import { readJson, clientMeta, secretMatches } from "@/lib/request";

/** Código gRPC ALREADY_EXISTS — lo lanza `create()` cuando el documento ya está. */
const ALREADY_EXISTS = 6;

/** Tope de suscriptores que devuelve el GET administrativo. */
const MAX_LISTADO = 5000;

/**
 * POST /api/subscribe — alta en `formularios/web_suscriptores/envios/{email}`.
 *
 * El correo es el ID del documento, así que `create()` falla si ya existe:
 * la deduplicación es atómica en una sola escritura, sin la carrera que tiene
 * un "consultar y luego insertar".
 */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ message: parsed.error }, { status: 400 });

  const valid = validateSuscripcion(parsed.body);
  if (!valid.ok) return NextResponse.json({ message: "Email inválido" }, { status: 400 });

  const email = valid.value;

  try {
    await envios(MODULOS.suscriptores).doc(email).create({
      email,
      estado: "activo",
      origen: "web-corporativa",
      createdAt: FieldValue.serverTimestamp(),
      meta: clientMeta(req),
    });
    return NextResponse.json({ message: "Suscrito exitosamente" }, { status: 200 });
  } catch (err) {
    if ((err as { code?: number }).code === ALREADY_EXISTS) {
      return NextResponse.json({ message: "Este email ya está suscrito" }, { status: 409 });
    }
    console.error("[subscribe] error al escribir en Firestore:", err);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

/**
 * GET /api/subscribe — listado administrativo de suscriptores.
 *
 * El secreto va en `Authorization: Bearer <ADMIN_SECRET>`, no en la query
 * string: los parámetros de URL quedan escritos de forma permanente en los
 * logs del balanceador y de Cloud Run.
 */
export async function GET(req: NextRequest) {
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? null;

  if (!process.env.ADMIN_SECRET) {
    console.error("[subscribe] ADMIN_SECRET no está configurado; se niega el acceso");
    return NextResponse.json({ message: "No disponible" }, { status: 503 });
  }
  if (!secretMatches(bearer, process.env.ADMIN_SECRET)) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  try {
    const snap = await envios(MODULOS.suscriptores)
      .orderBy("createdAt", "desc")
      .limit(MAX_LISTADO)
      .get();

    const subscribers = snap.docs.map((d) => {
      const { email, estado, createdAt } = d.data();
      return { email, estado, subscribedAt: createdAt?.toDate?.()?.toISOString() ?? null };
    });

    return NextResponse.json({ subscribers, count: subscribers.length });
  } catch (err) {
    console.error("[subscribe] error al leer de Firestore:", err);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
