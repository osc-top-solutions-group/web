import type { Metadata } from "next";
import FrenteCriticoClient from "./FrenteCriticoClient";

/* ── SEO ─────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Diagnóstico de Prioridades Operativas | OSC Top Solutions",
  description:
    "Describa en una línea el frente más crítico de su operación —continuidad, visibilidad, capacidad o resiliencia— y reciba en 48 horas hábiles una lectura inicial escrita por el equipo técnico de OSC. Sin presentación comercial.",
  keywords:
    "diagnóstico infraestructura crítica, continuidad operativa LATAM, resiliencia operacional, visibilidad de activos industriales, capacidad de infraestructura crítica, OSC Top Solutions diagnóstico, consultoría técnica infraestructura crítica",
  alternates: { canonical: "/frente-critico" },
  openGraph: {
    title: "¿Cuál es hoy el frente más crítico de su operación?",
    description:
      "Una lectura inicial de su contexto en 48 horas hábiles, escrita por alguien que conoce su sector. Toma 1 minuto y no es una demo.",
    type: "website",
    locale: "es_419",
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Cuál es hoy el frente más crítico de su operación?",
    description:
      "Descríbalo en una línea. Respuesta técnica en 48 horas hábiles, sin presentación comercial.",
  },
};

export default function FrenteCriticoPage() {
  return <FrenteCriticoClient />;
}
