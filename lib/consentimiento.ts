/**
 * Texto de la casilla de aceptación de la política de tratamiento de datos.
 *
 * Lo comparten el navegador y el servidor a propósito: la declaración que queda
 * guardada como evidencia es, letra por letra, la que la persona leyó junto a la
 * casilla, y no una reconstrucción posterior (mismo criterio que el Portal de
 * Proveedores, `modules/aceptaciones/textos.js`).
 */

/** Formularios públicos que recogen datos personales: ninguno se envía sin la casilla marcada. */
export type FormularioConsentimiento = "solicitud" | "caso" | "contacto" | "frente-critico";

export const RESPONSABLE_DATOS = "OSC Top Solutions Group";

/** Para qué se autoriza el tratamiento en cada formulario. */
export const FINALIDAD_DATOS: Record<FormularioConsentimiento, string> = {
  solicitud: "Autorizo el tratamiento de mis datos personales para atender esta solicitud.",
  caso: "Autorizo el tratamiento de mis datos personales para atender este caso.",
  contacto: "Autorizo el tratamiento de mis datos personales para responder a este mensaje y contactarme.",
  "frente-critico": "Autorizo el tratamiento de mis datos personales para responder a esta consulta y contactarme.",
};

/** Lo mínimo de la política vigente que hace falta para nombrarla. */
export interface PoliticaReferida {
  codigo: string;
  version: string;
}

/** Cómo se nombra la política en la casilla: con código y versión cuando viene de QUALITA. */
export function tituloPolitica(politica: PoliticaReferida | null): string {
  return politica
    ? `Política de tratamiento de datos personales (${politica.codigo}, versión ${politica.version})`
    : "Política de tratamiento de datos personales";
}

export const DECLARACION_INICIO = "He leído y acepto la ";

/** Texto completo de la casilla. */
export function declaracionDatos(formulario: FormularioConsentimiento, politica: PoliticaReferida | null): string {
  return `${DECLARACION_INICIO}${tituloPolitica(politica)} de ${RESPONSABLE_DATOS}. ${FINALIDAD_DATOS[formulario]}`;
}

/** Mensaje cuando el envío llega sin la casilla marcada. */
export const FALTA_CONSENTIMIENTO =
  "Para enviar el formulario debe leer y aceptar la política de tratamiento de datos personales";
