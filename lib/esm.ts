/**
 * Cliente de la mesa de servicio (OSC One / ESM) — SOLO servidor (Route Handlers).
 *
 * La web habla con el canal de radicación externa de la mesa (`/api/intake/*`)
 * servidor-a-servidor, con la clave del canal en la cabecera `x-intake-key`.
 * Esa clave nunca llega al navegador: los formularios llaman a `/api/caso/*` de
 * este sitio y son estos handlers los que llaman a la mesa.
 *
 * Variables de runtime del servicio (ver `deploy.ps1`):
 *   ESM_INTAKE_URL  base del canal, p. ej. https://esm-qa.osctopsolutionsgroup.com/api/intake
 *   ESM_INTAKE_KEY  secreto `esm-intake-api-key[-qa]` del proyecto esm-osc-one
 * Sin ellas `esmConfigurado` es `false` y los handlers responden 503: el
 * formulario le indica al cliente el canal alterno en vez de simular el caso.
 */

const BASE = (process.env.ESM_INTAKE_URL ?? "").replace(/\/+$/, "");
const KEY = process.env.ESM_INTAKE_KEY ?? "";
const TIMEOUT_MS = 12_000;

export const esmConfigurado = Boolean(BASE && KEY);

/** Cookie httpOnly con la sesión de consulta de casos (la emite la mesa; dura 30 minutos). */
export const COOKIE_CONSULTA = "osc_caso";
export const COOKIE_CONSULTA_PATH = "/api/caso";
export const COOKIE_CONSULTA_MAX_AGE = 30 * 60;

export interface RespuestaEsm<T> {
  /** Código HTTP de la mesa; 503 si no está configurada y 504 si no respondió a tiempo. */
  status: number;
  data: (T & { error?: string }) | null;
}

export async function esm<T = Record<string, unknown>>(
  ruta: string,
  opciones: { method?: "GET" | "POST"; body?: unknown; tokenConsulta?: string } = {},
): Promise<RespuestaEsm<T>> {
  if (!esmConfigurado) return { status: 503, data: null };
  const { method = "GET", body, tokenConsulta } = opciones;
  try {
    const res = await fetch(`${BASE}${ruta}`, {
      method,
      headers: {
        Accept: "application/json",
        "x-intake-key": KEY,
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(tokenConsulta ? { "x-consulta-token": tokenConsulta } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const texto = await res.text();
    let data: (T & { error?: string }) | null = null;
    try {
      data = texto ? JSON.parse(texto) : null;
    } catch {
      data = null;
    }
    return { status: res.status, data };
  } catch (err) {
    const vencio = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    console.error(`[esm] ${method} ${ruta} falló: ${err instanceof Error ? err.message : "error desconocido"}`);
    return { status: vencio ? 504 : 502, data: null };
  }
}

/** Mensaje para el visitante cuando la mesa no está disponible: nunca se simula que el caso quedó creado. */
export const MESA_NO_DISPONIBLE =
  "La mesa de servicio no está disponible en este momento. Por favor intente de nuevo en unos minutos o use la línea NOC 24x7.";
