import { NextRequest, NextResponse } from "next/server";
import { validateSolicitud, detectBot, CAMPOS_SOLICITUD, OPCIONES_SOLICITUD, type CampoSolicitud } from "@/lib/forms";
import { readJson, clientMeta } from "@/lib/request";
import { esm, MESA_NO_DISPONIBLE } from "@/lib/esm";
import { aceptacionParaRegistro, evidenciaConsentimiento } from "@/lib/consentimiento-servidor";

/**
 * POST /api/solicitud — radica en la mesa de servicio (OSC One) una solicitud que
 * no es un caso de cliente: PQRS, certificado laboral, proveedores, información
 * comercial, cotización u otra. Cada tipo llega al área que lo atiende y con su
 * propio radicado (PQR-, CER-, PRV-, COM-, ATC-); la confirmación la envía la mesa.
 *
 * Igual que /api/caso: si la mesa no responde no se guarda nada ni se finge el éxito.
 */
export async function POST(req: NextRequest) {
  const parsed = await readJson(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Al bot se le responde como a un humano (sin número de radicado) y no se crea nada.
  const bot = detectBot(parsed.body);
  if (bot.bot) {
    console.warn(`[solicitud] envío descartado por anti-bots (${bot.motivo}) ip=${clientMeta(req).ip}`);
    return NextResponse.json({ ok: true });
  }

  const valid = validateSolicitud(parsed.body);
  if (!valid.ok) return NextResponse.json({ error: valid.error }, { status: 400 });
  const s = valid.value;

  const legible = (campo: CampoSolicitud, valor: string) =>
    OPCIONES_SOLICITUD[campo]?.find((o) => o.id === valor)?.etiqueta ?? valor;

  // Los datos del tipo van también en la descripción: es lo que lee quien atiende.
  const partes: string[] = [];
  if (s.descripcion) partes.push(s.descripcion);
  const detalle = (Object.entries(s.datos) as [CampoSolicitud, string][])
    .map(([campo, valor]) => `${CAMPOS_SOLICITUD[campo].etiqueta}: ${legible(campo, valor)}`);
  if (detalle.length) partes.push(detalle.join("\n"));
  if (s.tipo.id === "certificado-laboral") {
    partes.push("Radicado por el formulario web: la identidad NO se verificó contra el directorio. Validarla antes de emitir el certificado.");
  }
  partes.push('Radicado desde el formulario "Radicar una solicitud" de la web corporativa.');

  // Aceptación de la política de datos: sin ella no se radica. Queda qué versión vigente
  // en QUALITA aceptó (código, versión y huella del PDF), el texto de la casilla, cuándo y desde dónde.
  const acepta = await evidenciaConsentimiento(req, parsed.body, "solicitud");
  if (!acepta.ok) return NextResponse.json({ error: acepta.error }, { status: acepta.status });

  const quien = s.datos.empresa ? `${s.nombre} (${s.datos.empresa})` : s.nombre;

  // Campo a campo: el cuerpo del visitante nunca se propaga por spread hacia la mesa.
  const r = await esm<{ consecutivo: string }>("/solicitudes", {
    method: "POST",
    body: {
      tipo: s.tipo.id,
      pais: s.paisIso,
      asunto: `${s.tipo.etiqueta} - ${quien}`.slice(0, 200).padEnd(5, "."),
      descripcion: partes.join("\n\n").slice(0, 5000).padEnd(10, "."),
      canal: "formulario_web",
      solicitante: { correo: s.email, nombre: s.nombre, tipo: s.tipo.solicitante },
      payload: {
        ...s.datos,
        ...(s.telefono ? { telefono: s.telefono } : {}),
        ...(s.tipo.id === "certificado-laboral" ? { verificacion_directorio: "no_verificado" } : {}),
        formulario_web: "Radicar una solicitud",
      },
      // Idempotencia: el mismo envío (reintento o doble clic) devuelve el mismo radicado.
      // Evidencia de la aceptación: la mesa la guarda en su registro de aceptaciones, no en el caso.
      aceptacion_datos: aceptacionParaRegistro(acepta.evidencia),
      referencia_externa: `web:${s.envioId}`,
    },
  });

  if ((r.status === 200 || r.status === 201) && r.data?.consecutivo) {
    console.log(`[solicitud] ${r.data.consecutivo} radicada desde la web (${s.tipo.id})`);
    return NextResponse.json({ ok: true, caso: r.data.consecutivo });
  }

  // Sin detalles de la mesa al visitante: su mensaje puede revelar configuración interna.
  console.error(`[solicitud] la mesa respondió ${r.status} para ${s.tipo.id}: ${r.data?.error ?? "(sin detalle)"}`);
  return NextResponse.json({ error: MESA_NO_DISPONIBLE }, { status: r.status === 503 ? 503 : 502 });
}
