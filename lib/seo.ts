/**
 * Central SEO configuration.
 * Update SITE_URL when the production custom domain is set.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://osc-web-xi.vercel.app";

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
