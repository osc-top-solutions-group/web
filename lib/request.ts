import type { NextRequest } from "next/server";

/** Tope del cuerpo de una petición de formulario. Muy por encima de lo que necesitan los campos válidos. */
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Lee y parsea el cuerpo JSON con tope de tamaño.
 * `req.json()` a secas materializa el cuerpo completo en memoria antes de que
 * la validación pueda rechazarlo.
 */
export async function readJson(
  req: NextRequest,
): Promise<{ ok: true; body: unknown } | { ok: false; error: string }> {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return { ok: false, error: "Cuerpo de la petición demasiado grande" };

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return { ok: false, error: "No se pudo leer el cuerpo de la petición" };
  }

  if (raw.length > MAX_BODY_BYTES) return { ok: false, error: "Cuerpo de la petición demasiado grande" };

  try {
    return { ok: true, body: JSON.parse(raw) };
  } catch {
    return { ok: false, error: "Cuerpo de la petición inválido" };
  }
}

/**
 * IP del cliente detrás del balanceador HTTPS global de GCP.
 *
 * El balanceador *añade* al final de `X-Forwarded-For`, dejando:
 *   `<valores-enviados-por-el-cliente>, <ip-real-del-cliente>, <ip-del-balanceador>`
 * La IP real es la **penúltima**. Tomar la primera sería leer un valor que el
 * cliente controla — y con eso se burla cualquier límite por IP.
 */
export function clientIp(req: NextRequest): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (!xff) return null;
  const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
  return parts.length >= 2 ? parts[parts.length - 2] : (parts[0] ?? null);
}

/** Metadatos de origen que se guardan con el envío para investigar abuso. */
export function clientMeta(req: NextRequest) {
  return {
    ip: clientIp(req),
    userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
    referer: req.headers.get("referer")?.slice(0, 500) ?? null,
  };
}

/**
 * Compara un secreto en tiempo constante.
 * `!==` filtra información por el tiempo que tarda en fallar.
 */
export function secretMatches(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < provided.length; i++) diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
