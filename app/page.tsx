import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import Cases from "@/components/home/Cases";
import Industries from "@/components/home/Industries";
import News from "@/components/home/News";
import CtaFinal from "@/components/home/CtaFinal";
import JsonLd from "@/components/seo/JsonLd";
import {
  SITE_URL, ORG_ID, WEBSITE_ID,
  ORG_NAME, ORG_LOGO, ORG_EMAIL, ORG_LINKEDIN,
  CERTIFICATIONS, AREA_SERVED,
} from "@/lib/seo";

/* ── Home-specific metadata (overrides layout.tsx defaults) ── */
export const metadata: Metadata = {
  title: "Integrador Tecnológico Infraestructura Crítica LATAM | OSC",
  description:
    "OSC integra conectividad, ciberseguridad OT/IT y operaciones gestionadas en 16 países. ISO 27001 + IEC 62443 vigentes 2027. +2,000 clientes y +33,000 nodos operativos en América Latina.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

/* ── JSON-LD schemas ── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: ORG_NAME,
  alternateName: "OSC",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: ORG_LOGO,
    width: 200,
    height: 60,
    caption: "Logo OSC Top Solutions Group",
  },
  description:
    "Integrador y operador tecnológico especializado en infraestructuras críticas en América Latina. 30 años de experiencia, 16 países, +2,000 clientes, +33,000 nodos gestionados.",
  foundingDate: "1994",
  areaServed: AREA_SERVED,
  hasCredential: CERTIFICATIONS,
  knowsAbout: [
    "Ciberseguridad OT/IT convergente",
    "Redes privadas 4G/5G",
    "NOC/SOC 24/7",
    "Digital twin infraestructura crítica",
    "IEC 62443",
    "Zero Trust arquitectura",
    "Infraestructura crítica puertos",
    "Infraestructura crítica energía y minería",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: ORG_EMAIL,
    contactType: "customer service",
    areaServed: "LATAM",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [ORG_LINKEDIN],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: ORG_NAME,
  description:
    "Integrador tecnológico para infraestructuras críticas en América Latina",
  publisher: { "@id": ORG_ID },
  inLanguage: "es-419",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Hero />
      <Stats />
      <Industries />
      <Services />
      <Cases />
      <News />
      <CtaFinal />
    </>
  );
}
