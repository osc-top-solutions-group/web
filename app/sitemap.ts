import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const TODAY = new Date().toISOString().split("T")[0];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`,                                            lastModified: TODAY, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${SITE_URL}/soluciones`,                                  lastModified: TODAY, changeFrequency: "monthly", priority: 0.9  },
    { url: `${SITE_URL}/soluciones/critical-infrastructure-security`, lastModified: TODAY, changeFrequency: "monthly", priority: 0.9  },
    { url: `${SITE_URL}/soluciones/connectivity-telecom`,             lastModified: TODAY, changeFrequency: "monthly", priority: 0.9  },
    { url: `${SITE_URL}/soluciones/ai-powered-operations`,            lastModified: TODAY, changeFrequency: "monthly", priority: 0.9  },
    { url: `${SITE_URL}/soluciones/managed-operations`,               lastModified: TODAY, changeFrequency: "monthly", priority: 0.9  },
    { url: `${SITE_URL}/industrias`,                                  lastModified: TODAY, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/industrias/puertos`,                          lastModified: TODAY, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/industrias/energia-mineria`,                  lastModified: TODAY, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/industrias/power-utilities`,                  lastModified: TODAY, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/industrias/gobierno`,                         lastModified: TODAY, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/industrias/telecoms`,                         lastModified: TODAY, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/nosotros`,                                    lastModified: TODAY, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/beyond-tech`,                                 lastModified: TODAY, changeFrequency: "monthly", priority: 0.70 },
    { url: `${SITE_URL}/inversionistas`,                              lastModified: TODAY, changeFrequency: "monthly", priority: 0.70 },
    { url: `${SITE_URL}/compliance`,                                  lastModified: TODAY, changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE_URL}/carrera`,                                     lastModified: TODAY, changeFrequency: "weekly",  priority: 0.65 },
    { url: `${SITE_URL}/contacto`,                                    lastModified: TODAY, changeFrequency: "yearly",  priority: 0.60 },
  ];
}
