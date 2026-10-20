/**
 * Entorno de despliegue: `qa` o `prod`.
 *
 * Lo fija el `Dockerfile` (ARG ENTORNO → NEXT_PUBLIC_ENTORNO) y por eso queda
 * horneado en la imagen: una imagen construida para QA no puede terminar
 * sirviendo producción por una variable de runtime mal puesta, y viceversa.
 * El valor por defecto es `prod` para que el disparador de Cloud Build que
 * construye producción (sin build-args) siga funcionando sin cambios.
 *
 * En QA el sitio: no carga GTM/GA4, se declara `noindex`, escribe los
 * formularios en módulos `web_*_qa` de Firestore y no dispara correos.
 */
export type Entorno = "qa" | "prod";

export const ENTORNO: Entorno = process.env.NEXT_PUBLIC_ENTORNO === "qa" ? "qa" : "prod";

export const ES_PRODUCCION = ENTORNO === "prod";

/** `true` cuando la imagen se construyó con AGENTE_HABILITADO=1 (widget del asistente visible). */
export const AGENTE_HABILITADO = process.env.NEXT_PUBLIC_AGENTE_HABILITADO === "1";
