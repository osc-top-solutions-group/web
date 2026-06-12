import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
  async rewrites() {
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
