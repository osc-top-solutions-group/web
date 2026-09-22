/**
 * Central SEO configuration.
 *
 * `SITE_URL` alimenta el canonical, `og:url` y todos los `@id` del JSON-LD, así
 * que el valor por defecto tiene que ser el dominio de producción. Antes era una
 * URL de Vercel heredada de la migración: como la variable nunca se definió en
 * Cloud Run, el sitio publicado le declaraba a los buscadores que la versión
 * canónica de cada página vivía en ese otro dominio.
 *
 * `NEXT_PUBLIC_SITE_URL` queda solo para apuntar a otro entorno. Tener presente
 * que Next.js resuelve las `NEXT_PUBLIC_*` en tiempo de build y estas páginas se
 * prerenderizan: definirla únicamente como variable de runtime no cambia nada,
 * tiene que estar presente durante `next build`.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://osctopsolutionsgroup.com";

export const ORG_ID      = `${SITE_URL}/#organization`;
export const WEBSITE_ID  = `${SITE_URL}/#website`;

export const ORG_NAME    = "OSC Top Solutions Group";
export const ORG_LOGO    = `${SITE_URL}/logo-osc.png`;
export const ORG_EMAIL   = "comunicaciones@osctopsolutionsgroup.com";
export const ORG_LINKEDIN =
  "https://www.linkedin.com/company/osc-top-solutions-group/";

/** Certifications shared across Service schemas */
export const CERTIFICATIONS = [
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "ISO 27001:2022 — Seguridad de la Información",
    validThrough: "2027-12-31",
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "IEC 62443 — Ciberseguridad de Sistemas de Control OT",
    validThrough: "2027-11-30",
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "ISO 9001:2015 — Gestión de Calidad",
    validThrough: "2027-03-31",
  },
] as const;

export const AREA_SERVED = [
  "Colombia", "Chile", "México", "Perú", "Bolivia", "Ecuador",
  "Costa Rica", "Guatemala", "Honduras", "El Salvador", "Nicaragua",
  "Panamá", "Argentina", "Uruguay", "Brasil", "Estados Unidos",
];
