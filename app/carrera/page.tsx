import type { Metadata } from "next";
import CarreraClient from "./CarreraClient";

/* ── SEO ─────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Trabaja en OSC | Empleos en Infraestructura Crítica y Ciberseguridad OT/IT — LATAM",
  description:
    "Únete a OSC Top Solutions — 300+ ingenieros operando redes críticas, ciberseguridad OT/IT y NOC 24/7 en 16 países de América. Certificaciones Cisco, Fortinet, Nokia y Palo Alto pagadas al 100%. Vacantes en Colombia, Perú, México y Panamá.",
  keywords:
    "empleo infraestructura crítica LATAM, trabajo ingeniería telecomunicaciones, vacantes NOC SOC ingenieros, ciberseguridad OT IT empleos, redes industriales SCADA trabajo, OSC Top Solutions carrera, certificaciones Fortinet Cisco Nokia pagadas, ingenieros críticos América Latina, beyond tech beyond limits empleo",
  alternates: { canonical: "/carrera" },
  openGraph: {
    title: "Trabaja en OSC | Infraestructura Crítica · 16 Países · LATAM",
    description:
      "300+ ingenieros, 16 países, 30 años operando lo que no puede fallar. Certificaciones 100% cubiertas, mentoría real y carrera con propósito.",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carrera en OSC — Infraestructura Crítica LATAM",
    description:
      "Únete al equipo que opera lo que no puede fallar. 16 países · Certificaciones pagadas · NOC 24/7.",
  },
};

/* ── STRUCTURED DATA ─────────────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://osctopsolutions.com/#organization",
      name: "OSC Top Solutions",
      alternateName: "OSC",
      description:
        "Empresa especializada en infraestructura crítica, telecomunicaciones, ciberseguridad OT/IT y servicios NOC/SOC en 16 países de América Latina.",
      url: "https://osctopsolutions.com",
      foundingDate: "1994",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 300 },
      areaServed: ["CO", "PE", "MX", "PA", "CL", "EC", "BO", "PY", "UY", "AR"],
      knowsAbout: [
        "Infraestructura Crítica",
        "Telecomunicaciones",
        "Ciberseguridad OT/IT",
        "Redes Industriales",
        "NOC 24/7",
        "SOC",
        "SCADA",
        "IEC 61850",
      ],
    },
    {
      "@type": "JobPosting",
      title: "Ingenieros de Infraestructura Crítica y Ciberseguridad OT/IT",
      description:
        "OSC busca ingenieros y técnicos especializados en redes, ciberseguridad OT/IT, NOC/SOC y sistemas industriales SCADA para operar infraestructura crítica en 16 países de América Latina.",
      hiringOrganization: {
        "@type": "Organization",
        name: "OSC Top Solutions",
        sameAs: "https://osctopsolutions.com",
      },
      jobLocation: [
        { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "CO", addressLocality: "Bogotá" } },
        { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "PE", addressLocality: "Lima" } },
        { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "MX", addressLocality: "Ciudad de México" } },
      ],
      employmentType: "FULL_TIME",
      skills: "Cisco, Fortinet, Nokia, Ericsson, SCADA, IEC 61850, CrowdStrike, Palo Alto Networks",
      educationRequirements: "Ingeniería en Telecomunicaciones, Sistemas, Electrónica o afines",
      jobBenefits: "Certificaciones técnicas 100% cubiertas, rotación regional, mentoría con expertos 20+ años, NOC 24/7 con respaldo de equipo",
      datePosted: "2026-01-01",
      validThrough: "2027-01-01",
      applicantLocationRequirements: { "@type": "Country", name: "América Latina" },
      directApply: true,
    },
  ],
};

/* ── PAGE ────────────────────────────────────────────── */

export default function CarreraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarreraClient />
    </>
  );
}
