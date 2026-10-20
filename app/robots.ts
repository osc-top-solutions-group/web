import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { ES_PRODUCCION } from "@/lib/entorno";

export default function robots(): MetadataRoute.Robots {
  if (!ES_PRODUCCION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/404", "/500"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
