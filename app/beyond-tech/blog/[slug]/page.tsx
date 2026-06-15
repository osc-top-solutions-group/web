import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ExternalLink } from "lucide-react";

/* ─── Article registry ─────────────────────────────────────────────────────── */
type ArticleMeta = {
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
} & (
  | { source: "wp"; wpSlug: string }
  | { source: "linkedin"; linkedInUrl: string }
);

const ARTICLES: Record<string, ArticleMeta> = {
  "redes-privadas-mineria-4-0": {
    category: "Minería",
    categoryColor: "#0F172A",
    title: "La conectividad como decisión estratégica en la minería moderna",
    excerpt: "Redes privadas y soluciones de conectividad avanzada que posicionan a la minería 4.0 con mayor eficiencia, seguridad y continuidad operativa en LATAM.",
    date: "2025",
    readTime: "5 min",
    image: "https://osctopsolutionsgroup.com/wp-content/uploads/2026/02/Mineria.jpg",
    source: "wp",
    wpSlug: "redes-privadas-mineria-4-0",
  },
  "blindaje-operativo": {
    category: "Ciberseguridad",
    categoryColor: "#FF0057",
    title: "Blindaje Operativo: Estrategia Integral de Ciberseguridad",
    excerpt: "La convergencia IT/OT exige un nuevo enfoque de seguridad. Estrategias integrales para blindar infraestructuras críticas de energía y minería.",
    date: "28 Feb 2025",
    readTime: "6 min",
    image: "",
    source: "linkedin",
    linkedInUrl: "https://www.linkedin.com/pulse/blindaje-operativo-estrategia-integral-de-ciberseguridad-3vwle/",
  },
  "abismo-itot-latam": {
    category: "Transformación Industrial",
    categoryColor: "#0F172A",
    title: "El Abismo IT/OT: por qué la transformación industrial en LATAM",
    excerpt: "Análisis de la brecha entre tecnologías de información y operación, y los factores que frenan la transformación industrial en América Latina.",
    date: "15 Feb 2025",
    readTime: "7 min",
    image: "",
    source: "linkedin",
    linkedInUrl: "https://www.linkedin.com/pulse/el-abismo-itot-por-qu%C3%A9-la-transformaci%C3%B3n-industrial-en-latam-wjzse/",
  },
  "la-clave-humana-en-la-ciberseguridad": {
    category: "Ciberseguridad",
    categoryColor: "#FF0057",
    title: "La Clave Humana en la Ciberseguridad",
    excerpt: "El factor humano es el eslabón más crítico en cualquier estrategia de seguridad. La concientización y el entrenamiento del personal son componentes esenciales de una defensa integral.",
    date: "2025",
    readTime: "4 min",
    image: "https://osctopsolutionsgroup.com/wp-content/uploads/2024/04/La-Clave-Humana-en-la-Ciberseguridad.webp",
    source: "wp",
    wpSlug: "la-clave-humana-en-la-ciberseguridad",
  },
  "monetizacion-efectiva-de-5g": {
    category: "Telecom",
    categoryColor: "#0F172A",
    title: "Monetización efectiva de 5G: Innovación en la nube y el borde",
    excerpt: "Estrategias para monetizar el potencial real del 5G mediante innovación en cloud y edge computing, posicionando a los operadores como socios estratégicos en sectores exigentes.",
    date: "2025",
    readTime: "6 min",
    image: "https://osctopsolutionsgroup.com/wp-content/uploads/2024/04/Monetizacion-efectiva-de-5G-Innovacion-en-la-nube-y-el-borde.webp",
    source: "wp",
    wpSlug: "monetizacion-efectiva-de-5g-innovacion-en-la-nube-y-el-borde",
  },
  "estrategia-lumu-ciberseguridad": {
    category: "Ciberseguridad",
    categoryColor: "#FF0057",
    title: "Transferencia y aprendizaje en línea: la estrategia de Lumu en ciberseguridad",
    excerpt: "Cómo Lumu aplica transferencia de conocimiento y aprendizaje continuo como eje central de su estrategia de ciberseguridad para infraestructuras críticas en LATAM.",
    date: "2025",
    readTime: "5 min",
    image: "https://osctopsolutionsgroup.com/wp-content/uploads/2024/04/La-estrategia-de-lumu-en-ciberseguridad.png",
    source: "wp",
    wpSlug: "transferencia-y-aprendizaje-en-linea-la-estrategia-de-lumu-en-ciberseguridad",
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  return {
    title: `${article.title} | OSC Beyond Tech`,
    description: article.excerpt,
    openGraph: { images: article.image ? [article.image] : [] },
  };
}

async function fetchWpContent(wpSlug: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://osctopsolutionsgroup.com/wp-json/wp/v2/posts?slug=${wpSlug}&_fields=content`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0]?.content?.rendered ?? null;
  } catch {
    return null;
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  let wpContent: string | null = null;
  if (article.source === "wp") {
    wpContent = await fetchWpContent(article.wpSlug);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ── Header ── */}
      <div className="bg-[#0F172A] pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/beyond-tech"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={15} />
            Volver a Beyond Tech
          </Link>

          <span
            className="inline-block text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full text-white mb-5"
            style={{ background: article.categoryColor }}
          >
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5">
            {article.title}
          </h1>

          <div className="flex items-center gap-5 text-white/40 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {article.readTime} de lectura
            </span>
          </div>
        </div>
      </div>

      {/* ── Featured image ── */}
      {article.image && (
        <div className="max-w-3xl mx-auto px-6 -mt-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {wpContent ? (
          <div
            className="prose prose-slate prose-lg max-w-none
              prose-headings:font-extrabold prose-headings:text-[#0F172A]
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-[#FF0057] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-lg
              prose-strong:text-[#0F172A]
              prose-ul:text-slate-600 prose-ol:text-slate-600"
            dangerouslySetInnerHTML={{ __html: wpContent }}
          />
        ) : (
          /* LinkedIn / fallback */
          <div className="flex flex-col items-center text-center py-12 gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${article.categoryColor}15`, border: `1px solid ${article.categoryColor}30` }}
            >
              <ExternalLink size={24} style={{ color: article.categoryColor }} />
            </div>
            <p className="text-slate-500 text-base leading-relaxed max-w-md">
              {article.excerpt}
            </p>
            <p className="text-slate-400 text-sm">
              Este artículo está publicado en LinkedIn. Haz clic para leerlo completo.
            </p>
            {"linkedInUrl" in article && (
              <a
                href={article.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
                style={{ background: "#0077B5" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Leer en LinkedIn
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Back CTA ── */}
      <div className="border-t border-gray-100 py-10">
        <div className="max-w-3xl mx-auto px-6 flex justify-center">
          <Link
            href="/beyond-tech"
            className="inline-flex items-center gap-2 text-[#FF0057] font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            <ArrowLeft size={14} />
            Ver más artículos
          </Link>
        </div>
      </div>
    </main>
  );
}
