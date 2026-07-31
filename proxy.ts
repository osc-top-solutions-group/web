import { NextRequest, NextResponse } from "next/server";

const REPORT_ENDPOINT = "/api/csp-report";

/*
 * CSP en modo Report-Only mientras se observan violaciones reales.
 *
 * Deliberadamente NO se emiten aquí: frame-ancestors, Strict-Transport-Security,
 * X-Content-Type-Options ni Referrer-Policy — el Global External ALB de GCP ya
 * los envía y duplicarlos causa intersecciones/conflictos en el navegador.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  // Hashes de los scripts inline del layout (calculados sobre el contenido
  // exacto emitido en el build — recalcular si esos scripts cambian):
  //   bootstrap de GTM y config de gtag en app/layout.tsx
  const GTM_BOOTSTRAP_HASH = "'sha256-LPX1ZdTkH2J8taOTKyCeYChBFIGVCLHUSleB3Fr6dTQ='";
  const GTAG_CONFIG_HASH = "'sha256-yFIa1TiJ8OcW/CrCX9S1xdfz0k3bjaQn9GXp7uxzWew='";

  const csp = [
    "default-src 'self'",
    // Sin 'strict-dynamic': hacía que el navegador ignorara 'self' y, al no
    // haber nonce en páginas estáticas, bloqueaba los chunks de Next
    // (/_next/static/chunks/*). Con allowlist explícita 'self' sí aplica.
    // unsafe-eval solo en dev (React lo usa para reconstruir stacks de error).
    `script-src 'self' 'nonce-${nonce}' ${GTM_BOOTSTRAP_HASH} ${GTAG_CONFIG_HASH} https://www.googletagmanager.com https://www.google-analytics.com${isDev ? " 'unsafe-eval'" : ""}`,
    // Tailwind v4 + framer-motion + estilos inline requieren unsafe-inline
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://images.unsplash.com https://osctopsolutionsgroup.com https://www.telesemana.com https://radartecnologico.com https://itenlinea.com https://imagenes.portafolio.co https://www.acis.org.co https://www.googletagmanager.com https://www.google-analytics.com",
    // next/font auto-hospeda Montserrat/Inter
    "font-src 'self'",
    // cdn.jsdelivr.net: GeoJSON del mapa (react-simple-maps, fetch en cliente)
    // dominios de Google: beacons de GA4 (incluye endpoints regionales)
    "connect-src 'self' https://cdn.jsdelivr.net https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://stats.g.doubleclick.net",
    // Spotify: embeds de podcast · googletagmanager: iframe <noscript> de GTM
    "frame-src 'self' https://open.spotify.com https://www.googletagmanager.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // Nota: en Report-Only esta directiva no tiene efecto; aplica al pasar a enforcing
    "upgrade-insecure-requests",
    `report-uri ${REPORT_ENDPOINT}`,
    "report-to csp-endpoint",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  // Next.js lee este request header para inyectar el nonce en sus propios
  // scripts durante el render dinámico (no afecta al response).
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy-Report-Only", csp);
  response.headers.set("Reporting-Endpoints", `csp-endpoint="${REPORT_ENDPOINT}"`);

  return response;
}

export const config = {
  matcher: [
    /*
     * Se excluyen: API routes, estáticos de Next, optimización de imágenes,
     * favicon y prefetches de next/link.
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|favicon.png).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
