import { createHash } from "node:crypto";

/**
 * Política de tratamiento de datos personales tomada de QUALITA (el SGC de OSC) —
 * SOLO servidor (Route Handlers).
 *
 * QUALITA es la única fuente: la web no guarda una copia del PDF en el repo. Se
 * consulta la versión VIGENTE y PÚBLICA por código (mismo mecanismo que el Portal
 * de Proveedores, `forms/documental/publicacion.js` del repo sgc); cuando Legal
 * aprueba una versión nueva en QUALITA, el sitio la muestra sola en minutos.
 *
 * Red y autenticación:
 *   - se llama a la URL del Cloud Run de QUALITA (no al dominio, que pasa por IAP);
 *   - Cloud Run exige un ID token de la cuenta de servicio de la web (roles/run.invoker);
 *   - QUALITA exige además la clave compartida en `x-publicacion-key`.
 * Variables de runtime (ver `deploy.ps1`): QUALITA_API_URL, QUALITA_API_KEY y,
 * opcional, POLITICA_DATOS_CODIGO. Sin ellas `politicaDatos()` devuelve `null`
 * y los formularios enlazan a /compliance.
 *
 * Integridad: QUALITA anuncia el SHA-256 del PDF; aquí se recalcula al recibirlo
 * y, si no coincide, el archivo se descarta. Nunca se sirve un texto distinto del aprobado.
 */

const BASE = (process.env.QUALITA_API_URL ?? "").replace(/\/+$/, "");
const KEY = (process.env.QUALITA_API_KEY ?? "").trim();
export const POLITICA_DATOS_CODIGO = (process.env.POLITICA_DATOS_CODIGO ?? "GLEG-POL-4-GLO").trim().toUpperCase();

const TIMEOUT_MS = 12_000;
/** Cada cuánto se revisa si QUALITA aprobó una versión nueva. */
const REVISAR_CADA_MS = 10 * 60 * 1000;
const MAX_PDF_BYTES = 20 * 1024 * 1024;
const RE_SHA256 = /^[a-f0-9]{64}$/;

export const qualitaConfigurado = Boolean(BASE && KEY);

export interface PoliticaDatos {
  codigo: string;
  nombre: string;
  /** Etiqueta de la versión vigente ("3", o "3-c1" tras una corrección editorial). */
  version: string;
  sha256: string;
}

/** ID token de la cuenta de servicio del Cloud Run (servidor de metadatos). En local no se pide. */
let tokenId: { valor: string; vence: number } | null = null;
async function idToken(): Promise<string | null> {
  if (/^http:\/\/(localhost|127\.0\.0\.1)/.test(BASE)) return null;
  if (tokenId && tokenId.vence > Date.now()) return tokenId.valor;
  const res = await fetch(
    `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${encodeURIComponent(BASE)}`,
    { headers: { "Metadata-Flavor": "Google" }, cache: "no-store", signal: AbortSignal.timeout(5_000) },
  );
  if (!res.ok) throw new Error(`servidor de metadatos respondió ${res.status}`);
  const valor = (await res.text()).trim();
  // Los ID token duran una hora; se renueva con margen.
  tokenId = { valor, vence: Date.now() + 45 * 60 * 1000 };
  return valor;
}

async function pedir(ruta: string): Promise<Response> {
  const token = await idToken();
  return fetch(`${BASE}/api/documental-publicacion${ruta}`, {
    headers: {
      "x-publicacion-key": KEY,
      "x-publicacion-consumidor": "web-corporativa",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

let meta: { datos: PoliticaDatos; leidoEn: number } | null = null;
let pdf: { sha256: string; bytes: Buffer } | null = null;

/**
 * Versión vigente de la política, o `null` si QUALITA no está configurado o nunca
 * respondió. Si QUALITA falla después de haber respondido una vez, se sigue
 * mostrando la última versión conocida (contingencia).
 */
export async function politicaDatos(): Promise<PoliticaDatos | null> {
  if (!qualitaConfigurado) return null;
  if (meta && Date.now() - meta.leidoEn < REVISAR_CADA_MS) return meta.datos;
  try {
    const res = await pedir(`/documentos/${encodeURIComponent(POLITICA_DATOS_CODIGO)}`);
    if (!res.ok) throw new Error(`QUALITA respondió ${res.status}`);
    const m = await res.json();
    const sha256 = String(m?.pdf?.sha256 ?? "");
    const version = String(m?.version?.etiqueta ?? "");
    if (m?.fuente !== "qualita" || m?.forma !== 1 || !RE_SHA256.test(sha256) || !version) {
      throw new Error("forma de respuesta no reconocida");
    }
    meta = {
      datos: { codigo: String(m.codigo ?? POLITICA_DATOS_CODIGO), nombre: String(m.nombre ?? "Política de tratamiento de datos personales"), version, sha256 },
      leidoEn: Date.now(),
    };
    return meta.datos;
  } catch (err) {
    console.error(`[qualita] no se pudo leer ${POLITICA_DATOS_CODIGO}: ${err instanceof Error ? err.message : "error desconocido"}`);
    // Se reintenta en un minuto, no en cada visita.
    if (meta) meta.leidoEn = Date.now() - REVISAR_CADA_MS + 60_000;
    return meta?.datos ?? null;
  }
}

/** PDF de la versión vigente, verificado contra el SHA-256 que anuncia QUALITA. `null` si no está disponible. */
export async function politicaDatosPdf(): Promise<{ politica: PoliticaDatos; bytes: Buffer } | null> {
  const politica = await politicaDatos();
  if (!politica) return null;
  if (pdf?.sha256 === politica.sha256) return { politica, bytes: pdf.bytes };
  try {
    const res = await pedir(`/documentos/${encodeURIComponent(POLITICA_DATOS_CODIGO)}/pdf`);
    if (!res.ok) throw new Error(`QUALITA respondió ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length > MAX_PDF_BYTES) throw new Error("el PDF excede el tamaño admitido");
    if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") throw new Error("el archivo recibido no es un PDF");
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    if (sha256 !== politica.sha256) {
      // Versión nueva aprobada entre las dos llamadas, o archivo alterado: se descarta y se relee.
      meta = null;
      throw new Error("el PDF no coincide con la huella anunciada");
    }
    pdf = { sha256, bytes };
    return { politica, bytes };
  } catch (err) {
    console.error(`[qualita] no se pudo descargar el PDF de ${POLITICA_DATOS_CODIGO}: ${err instanceof Error ? err.message : "error desconocido"}`);
    return null;
  }
}
