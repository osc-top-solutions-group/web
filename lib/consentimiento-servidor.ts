import type { NextRequest } from "next/server";
import { politicaDatos } from "@/lib/qualita";
import { clientMeta } from "@/lib/request";
import { esm } from "@/lib/esm";
import { declaracionDatos, FALTA_CONSENTIMIENTO, type FormularioConsentimiento } from "@/lib/consentimiento";

/**
 * Evidencia de la aceptación de la política de tratamiento de datos — SOLO servidor.
 *
 * Ningún formulario público se guarda ni se radica sin ella. Registra qué documento
 * exacto estaba vigente en QUALITA (código, versión y huella del PDF), el texto
 * literal de la casilla, la hora del servidor y desde dónde se aceptó.
 */
export interface EvidenciaConsentimiento {
  acepto: true;
  formulario: FormularioConsentimiento;
  /** Texto literal de la casilla que la persona marcó. */
  declaracion: string;
  /** Documento vigente en QUALITA al aceptar; `null` si QUALITA no estaba disponible. */
  documento: { codigo: string; nombre: string; version: string; sha256: string } | null;
  /** Huella del documento que el navegador declara haber mostrado; `null` si no la envió. */
  confirmacionNavegador: string | null;
  /** Hora del servidor (UTC, ISO 8601): no depende del reloj del visitante. */
  fecha: string;
  ip: string | null;
  userAgent: string | null;
}

const RE_SHA256 = /^[a-f0-9]{64}$/;

export type ResultadoConsentimiento =
  | { ok: true; evidencia: EvidenciaConsentimiento }
  | { ok: false; status: number; error: string };

export async function evidenciaConsentimiento(
  req: NextRequest,
  body: unknown,
  formulario: FormularioConsentimiento,
): Promise<ResultadoConsentimiento> {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Solo vale el booleano `true`: ni "on", ni 1, ni un campo ausente.
  if (b.consentimiento !== true) return { ok: false, status: 400, error: FALTA_CONSENTIMIENTO };

  const politica = await politicaDatos();
  const huella = typeof b.politicaSha256 === "string" && RE_SHA256.test(b.politicaSha256) ? b.politicaSha256 : null;

  // La persona aceptó un documento que ya no es el vigente (Legal aprobó una versión
  // nueva mientras llenaba el formulario): debe leer y aceptar la nueva.
  if (politica && huella && huella !== politica.sha256) {
    return {
      ok: false,
      status: 409,
      error: "La política de tratamiento de datos se actualizó mientras llenaba el formulario. Recargue la página, revísela y acéptela de nuevo.",
    };
  }

  const { ip, userAgent } = clientMeta(req);
  return {
    ok: true,
    evidencia: {
      acepto: true,
      formulario,
      // Si el navegador no alcanzó a cargar la versión, vio la casilla sin código ni versión.
      declaracion: declaracionDatos(formulario, politica && huella ? politica : null),
      documento: politica
        ? { codigo: politica.codigo, nombre: politica.nombre, version: politica.version, sha256: politica.sha256 }
        : null,
      confirmacionNavegador: huella,
      fecha: new Date().toISOString(),
      ip,
      userAgent,
    },
  };
}

/**
 * La evidencia como la recibe el registro de aceptaciones de la mesa de servicio
 * (`aceptacion_datos` del canal de radicación, `lib/aceptaciones.js` de OSC One).
 * Va al registro, no al caso: quien atiende el caso solo ve "Política aceptada: versión X, fecha".
 */
export function aceptacionParaRegistro(e: EvidenciaConsentimiento) {
  return {
    origen: e.formulario,
    declaracion: e.declaracion,
    documento: e.documento,
    confirmacion_navegador: e.confirmacionNavegador,
    fecha: e.fecha,
    ip: e.ip,
    user_agent: e.userAgent,
  };
}

/**
 * Deja en el registro de la mesa la aceptación de un formulario que no crea caso
 * (Contacto, Frente Crítico). La evidencia ya quedó guardada con el contacto: si la
 * mesa no responde, el envío no se pierde y el fallo queda en el log.
 */
export async function registrarAceptacionSinCaso(
  e: EvidenciaConsentimiento,
  titular: { correo: string; nombre: string },
  referencia: string,
): Promise<void> {
  const r = await esm<{ id: string }>("/aceptaciones", {
    method: "POST",
    body: { canal: "formulario_web", referencia_externa: referencia.slice(0, 120), titular, aceptacion_datos: aceptacionParaRegistro(e) },
  });
  if (r.status !== 201) console.error(`[consentimiento] la mesa respondió ${r.status} al registrar la aceptación de ${referencia}`);
}
