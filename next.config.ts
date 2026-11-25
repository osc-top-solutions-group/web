import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Reenvío de /agente-api/* al asistente (proxy.ts): el valor por defecto corta a los 30 s y un turno lento
  // de NOVA (reintento del modelo) terminaba en error para el visitante aunque sí se hubiera procesado.
  experimental: { proxyTimeout: 60_000 },
  async redirects() {
    return [
      /* ── Legacy slug redirects (Spanish canonical) ── */
      {
        source: "/soluciones/cross-protection",
        destination: "/soluciones/critical-infrastructure-security",
        permanent: true,
      },
      {
        source: "/soluciones/smart-solutions",
        destination: "/soluciones/ai-powered-operations",
        permanent: true,
      },
      {
        source: "/soluciones/managed-services",
        destination: "/soluciones/managed-operations",
        permanent: true,
      },
      {
        source: "/soluciones/cross-protection",
        destination: "/soluciones/critical-infrastructure-security",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    // El reenvío de /agente-api/* al orquestador del asistente vive en proxy.ts
    // (tiempo de ejecución, variable AGENTE_API_ORIGIN), no aquí.
    return [
      /* ── Internal rewrites so public SEO slugs resolve to file slugs ── */
      {
        source: "/soluciones/critical-infrastructure-security",
        destination: "/soluciones/cross-protection",
      },
      {
        source: "/soluciones/ai-powered-operations",
        destination: "/soluciones/smart-solutions",
      },
      {
        source: "/soluciones/managed-operations",
        destination: "/soluciones/managed-services",
      },
    ];
  },
};

export default nextConfig;
