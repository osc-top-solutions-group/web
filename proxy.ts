import { NextRequest, NextResponse } from "next/server";

const REPORT_ENDPOINT = "/api/csp-report";

/*
 * CSP diferenciado por ruta, en modo Report-Only mientras se observa.
 *
 * DEFAULT = POLÍTICA ESTRICTA (nonce, sin unsafe-inline). Toda ruta que no
 * esté clasificada explícitamente en MARKETING_PREFIXES hereda la política
 * fuerte: el fallo por olvido queda del lado seguro. El costo de entrada del
 * default estricto es que la página DEBE renderizar dinámicamente
 * (export const dynamic = "force-dynamic") para que Next.js inyecte el nonce;
 * una página estática bajo política estricta queda sin hidratar al activar
 * enforcing (los scripts flight self.__next_f.push no llevan nonce).
 *
 * Deliberadamente NO se emiten aquí: frame-ancestors, Strict-Transport-Security,
 * X-Content-Type-Options ni Referrer-Policy — el Global External ALB de GCP ya
 * los envía y duplicarlos causa intersecciones/conflictos en el navegador.
 */

/*
 * Rutas de marketing prerenderizadas: script-src con 'unsafe-inline'.
 *
 * ⚠ Agregar una ruta aquí implica RENUNCIAR a la protección contra XSS inline
 * en esa ruta. Solo deben entrar páginas que no rendericen contenido de
 * terceros ni datos de usuario (contenido 100% controlado por este repo).
 *
 * Cada prefijo cubre la ruta exacta y sus hijas ("/soluciones" cubre también
 * los slugs públicos SEO que next.config.ts reescribe). "/" es solo exacta.
 */
const MARKETING_PREFIXES = [
  "/",
  "/beyond-tech",
  "/carrera",
  "/compliance",
  "/contacto",
  "/guias",
  "/industrias",
  "/inversionistas",
  "/nosotros",
  "/osc-connect",
  "/soluciones",
  "/vcard",
];

/*
 * Excepciones que SIEMPRE son estrictas aunque un prefijo de marketing las
 * cubra: artículos que renderizan HTML de WordPress con dangerouslySetInnerHTML.
 * (El listado /beyond-tech/blog no renderiza contenido externo y es marketing.)
 */
const STRICT_OVERRIDES = ["/beyond-tech/blog/"];

function isStrictRoute(pathname: string): boolean {
  if (STRICT_OVERRIDES.some((p) => pathname.startsWith(p))) return true;
  const isMarketing = MARKETING_PREFIXES.some((p) =>
    p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(`${p}/`)
  );
  return !isMarketing;
}

function buildCsp(scriptSrc: string): string {
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
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
}

export function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const devEval = isDev ? " 'unsafe-eval'" : "";
  const analyticsHosts =
    "https://www.googletagmanager.com https://www.google-analytics.com";

  const requestHeaders = new Headers(request.headers);
  let csp: string;

  if (isStrictRoute(request.nextUrl.pathname)) {
    /* Política estricta (default): nonce */
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    csp = buildCsp(`'self' 'nonce-${nonce}' ${analyticsHosts}${devEval}`);
    requestHeaders.set("x-nonce", nonce);
    // Next.js lee este request header para inyectar el nonce en sus propios
    // scripts durante el render dinámico (no afecta al response).
    requestHeaders.set("Content-Security-Policy", csp);
  } else {
    /* Marketing prerenderizado (lista explícita) */
    csp = buildCsp(`'self' 'unsafe-inline' ${analyticsHosts}${devEval}`);
  }

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
