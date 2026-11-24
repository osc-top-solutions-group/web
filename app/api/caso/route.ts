import { NextRequest, NextResponse } from "next/server";
import { validateCaso, detectBot } from "@/lib/forms";
import { readJson, clientMeta } from "@/lib/request";
import { esm, MESA_NO_DISPONIBLE } from "@/lib/esm";

/**
 * POST /api/caso — abre un caso de cliente en la mesa de servicio (OSC One).
 *
 * A diferencia de Contacto (lead en Firestore + correo), aquí el envío crea el
 * caso en la mesa y devuelve su número; la confirmación al cliente la envía la
 * propia mesa. Si la mesa no responde NO se guarda nada ni se finge el éxito:
 * el cliente ve el error y el canal alterno.
 */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Al bot se le responde como a un humano (sin número de caso) y no se crea nada.
  const bot = detectBot(parsed.body);
  if (bot.bot) {
    console.warn(`[caso] envío descartado por anti-bots (${bot.motivo}) ip=${clientMeta(req).ip}`);
    return NextResponse.json({ ok: true });
  }

  const valid = validateCaso(parsed.body);
  if (!valid.ok) return NextResponse.json({ error: valid.error }, { status: 400 });
  const c = valid.value;

  // Campo a campo: el cuerpo del visitante nunca se propaga por spread hacia la mesa.
  const r = await esm<{ consecutivo: string }>("/solicitudes", {
    method: "POST",
    body: {
      tipo: "solicitud-cliente",
      pais: c.paisIso,
      asunto: `${c.servicio} · ${c.empresa}`.slice(0, 200).padEnd(5, "."),
      descripcion: c.descripcion,
      canal: "formulario_web",
      urgencia: c.severidad.urgencia,
      solicitante: { correo: c.email, nombre: c.nombre, tipo: "cliente" },
      payload: {
        empresa: c.empresa,
        servicio_afectado: c.servicio,
        severidad: `${c.severidad.codigo} ${c.severidad.etiqueta}`,
        ...(c.contrato ? { contrato: c.contrato } : {}),
        ...(c.telefono ? { telefono: c.telefono } : {}),
        formulario_web: "Centro de Servicio al Cliente",
      },
      // Idempotencia: el mismo envío (reintento o doble clic) devuelve el mismo caso.
      referencia_externa: `web:${c.envioId}`,
    },
  });

  if ((r.status === 200 || r.status === 201) && r.data?.consecutivo) {
    console.log(`[caso] caso ${r.data.consecutivo} abierto desde el Centro de Servicio`);
    return NextResponse.json({ ok: true, caso: r.data.consecutivo });
  }

  // Sin detalles de la mesa al cliente: su mensaje puede revelar configuración interna.
  console.error(`[caso] la mesa respondió ${r.status}: ${r.data?.error ?? "(sin detalle)"}`);
  return NextResponse.json({ error: MESA_NO_DISPONIBLE }, { status: r.status === 503 ? 503 : 502 });
}
