/*
 * Receptor de reportes de violación CSP (report-uri / report-to).
 * Los reportes válidos se loguean a stdout como JSON de una línea para que
 * Cloud Logging los capture como entradas estructuradas.
 *
 * Responde SIEMPRE 204 (incluso al descartar) para no dar señal a sondeos.
 */

const MAX_BODY_BYTES = 10_240;

const ALLOWED_DOCUMENT_HOST = "osctopsolutionsgroup.com";

const EXTENSION_SCHEMES = [
  "chrome-extension://",
  "moz-extension://",
  "safari-extension://",
];

type NormalizedReport = {
  documentUri: string;
  blockedUri: string;
  raw: unknown;
};

/* Acepta ambos formatos: report-uri ({"csp-report": {...}}) y la Reporting API
 * de report-to (array de {type: "csp-violation", body: {...}}). */
function normalize(payload: unknown): NormalizedReport[] {
  if (Array.isArray(payload)) {
    return payload
      .filter(
        (r): r is { type?: string; body?: Record<string, unknown> } =>
          typeof r === "object" && r !== null
      )
      .filter((r) => r.type === "csp-violation" && typeof r.body === "object" && r.body !== null)
      .map((r) => ({
        documentUri: String(r.body?.documentURL ?? ""),
        blockedUri: String(r.body?.blockedURL ?? ""),
        raw: r,
      }));
  }

  if (typeof payload === "object" && payload !== null && "csp-report" in payload) {
    const body = (payload as Record<string, unknown>)["csp-report"];
    if (typeof body === "object" && body !== null) {
      const r = body as Record<string, unknown>;
      return [
        {
          documentUri: String(r["document-uri"] ?? ""),
          blockedUri: String(r["blocked-uri"] ?? ""),
          raw: payload,
        },
      ];
    }
  }

  return [];
}

function isOwnDocument(documentUri: string): boolean {
  try {
    const host = new URL(documentUri).hostname;
    if (host === ALLOWED_DOCUMENT_HOST || host.endsWith(`.${ALLOWED_DOCUMENT_HOST}`)) {
      return true;
    }
    // Permite observar violaciones en local durante desarrollo
    return process.env.NODE_ENV === "development" && host === "localhost";
  } catch {
    return false;
  }
}

function isExtensionNoise(blockedUri: string): boolean {
  return EXTENSION_SCHEMES.some((scheme) => blockedUri.startsWith(scheme));
}

export async function POST(request: Request) {
  const discard = new Response(null, { status: 204 });

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return discard;
  }

  let payload: unknown = null;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) return discard;
    payload = JSON.parse(body);
  } catch {
    return discard;
  }

  const reports = normalize(payload).filter(
    (r) => isOwnDocument(r.documentUri) && !isExtensionNoise(r.blockedUri)
  );

  for (const report of reports) {
    console.log(
      JSON.stringify({
        severity: "WARNING",
        message: "csp-violation",
        userAgent: request.headers.get("user-agent") ?? undefined,
        report: report.raw,
      })
    );
  }

  return discard;
}
