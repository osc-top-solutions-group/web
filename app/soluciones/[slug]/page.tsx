import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { solutionsData, getSolution } from "@/app/soluciones/_data";
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Eye,
  Wifi,
  Briefcase,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ── Static params ──
   Exclude slugs that are served by dedicated page files via rewrites:
   - critical-infrastructure-security  → /soluciones/cross-protection
   - ai-powered-operations             → /soluciones/smart-solutions
   - managed-operations                → /soluciones/managed-services
   Only connectivity-solutions and telecom-services use this [slug] route. */
const REWRITE_HANDLED_SLUGS = new Set([
  "critical-infrastructure-security",
  "ai-powered-operations",
  "managed-operations",
]);

export async function generateStaticParams() {
  return solutionsData
    .filter((s) => !REWRITE_HANDLED_SLUGS.has(s.slug))
    .map((s) => ({ slug: s.slug }));
}

/* ── SEO Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sol = getSolution(slug);
  if (!sol) return {};

  const seoTitle = `${sol.category} – ${sol.sector} | OSC Top Solutions`;
  const seoDescription = `${sol.hero.subheadline}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      sol.category.toLowerCase(),
      sol.sector.toLowerCase(),
      "infraestructura crítica LATAM",
      "telecomunicaciones",
      "ciberseguridad",
      "OSC Top Solutions",
    ].join(", "),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
    },
  };
}

/* ── Category icons ── */
const categoryIcons: Record<string, React.ElementType> = {
  "critical-infrastructure-security": Shield,
  "ai-powered-operations": Eye,
  "connectivity-telecom": Wifi,
  "managed-operations": Briefcase,
};

/* ── Page ── */
export default async function SolucionLanding({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Slugs handled by dedicated page files — should never reach here
  if (REWRITE_HANDLED_SLUGS.has(slug)) notFound();
  const sol = getSolution(slug);
  if (!sol) notFound();

  const Icon = categoryIcons[sol.slug] ?? Shield;

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO — white split layout (≠ industry dark full-bleed)
      ══════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-0 overflow-hidden bg-white">
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-[0.5]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-slate-400 text-xs mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-600 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <Link href="/soluciones" className="hover:text-slate-600 transition-colors">Soluciones</Link>
              <ChevronRight size={12} />
              <span className="text-slate-600">{sol.category}</span>
            </nav>
          </AnimatedSection>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0 items-stretch min-h-[560px]">
            {/* LEFT — text content */}
            <AnimatedSection direction="left" className="pb-20 pr-0 lg:pr-16 flex flex-col justify-center">
              {/* Category pill */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${sol.color}12`, border: `1px solid ${sol.color}25` }}
                >
                  <Icon size={16} style={{ color: sol.color }} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: sol.color }}>
                  {sol.category}
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0F172A] mb-6 leading-[1.08]">
                {sol.hero.headline}
              </h1>

              <p className="text-slate-500 text-lg font-light leading-relaxed mb-10 max-w-lg">
                {sol.hero.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-14">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full text-sm text-white transition-all duration-200 hover:shadow-xl"
                  style={{ background: sol.color, boxShadow: `0 4px 20px ${sol.color}25` }}
                >
                  Hablar con un experto <ArrowRight size={15} />
                </Link>
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-[#0F172A] font-semibold px-6 py-3.5 rounded-full text-sm transition-all duration-200"
                >
                  Ver servicios <ChevronRight size={15} />
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {sol.hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-black text-xl text-[#0F172A]">{stat.value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* RIGHT — dark panel with service preview */}
            <AnimatedSection direction="right" delay={0.1} className="relative">
              <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:left-0 bg-[#0F172A] rounded-tl-[40px] overflow-hidden flex flex-col justify-between p-10 mb-0 min-h-[400px] lg:min-h-0">
                {/* Header */}
                <div>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.25em] mb-5">
                    Servicios incluidos
                  </p>
                  <ul className="space-y-3">
                    {sol.hero.previewItems.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: sol.color }}
                        />
                        <span className="text-white/70 text-sm font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                    style={{ color: sol.color }}
                  >
                    Solicitar evaluación gratuita <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          EL RETO — light gray, pain-points horizontal
          (≠ industry: centered typographic, pills)
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Label */}
          <AnimatedSection className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px" style={{ backgroundColor: sol.color }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: sol.color }}>
              El Reto
            </span>
          </AnimatedSection>

          {/* Challenge statement — centered, large */}
          <AnimatedSection className="max-w-3xl mb-16">
            <h2 className="text-2xl lg:text-3xl font-semibold text-[#0F172A] leading-snug">
              <span
                className="inline-block w-5 h-5 rounded mr-2 align-middle"
                style={{ backgroundColor: sol.color }}
              />
              {sol.challenge.statement}
            </h2>
          </AnimatedSection>

          {/* Pain points — 2x2 grid (≠ industry 2-col text layout) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sol.challenge.painPoints.map((point, i) => (
              <AnimatedSection key={point.title} delay={i * 0.07}>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 h-full hover:border-slate-300 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle
                      size={15}
                      className="shrink-0 mt-0.5"
                      style={{ color: sol.color }}
                    />
                    <p className="text-[#0F172A] font-semibold text-sm leading-snug">{point.title}</p>
                  </div>
                  <p className="text-slate-500 text-sm font-light leading-relaxed pl-6">
                    {point.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROPUESTA DE VALOR — white, numbered vertical list
          (≠ industry: glassmorphism cards on dark bg)
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Label */}
          <AnimatedSection className="flex items-center gap-3 mb-16">
            <div className="w-8 h-px" style={{ backgroundColor: sol.color }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: sol.color }}>
              Propuesta de Valor
            </span>
          </AnimatedSection>

          {/* Numbered props — horizontal row (≠ 4-col glass cards) */}
          <div className="grid lg:grid-cols-3 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100">
            {sol.valueProps.map((vp, i) => (
              <AnimatedSection key={vp.number} delay={i * 0.1}>
                <div className="bg-white p-10 h-full flex flex-col group hover:bg-slate-50 transition-colors duration-300">
                  {/* Large number */}
                  <span
                    className="text-6xl font-black leading-none mb-6 tabular-nums select-none"
                    style={{ color: sol.color, opacity: 0.25 }}
                  >
                    {vp.number}
                  </span>

                  {/* Title */}
                  <h3 className="text-[#0F172A] font-bold text-xl mb-4 leading-snug">{vp.title}</h3>

                  {/* Description */}
                  <p className="text-slate-500 text-base font-light leading-relaxed flex-1">
                    {vp.description}
                  </p>

                  {/* Bottom bar on hover */}
                  <div
                    className="mt-8 h-[2px] w-0 group-hover:w-12 rounded-full transition-all duration-500"
                    style={{ backgroundColor: sol.color }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICIOS — dark bg, list layout
          (≠ industry: light #F8FAFC, 3-col card grid)
      ══════════════════════════════════════════════ */}
      <section id="servicios" className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.06]" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${sol.color}08 0%, transparent 65%)`,
            transform: "translate(20%, -20%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Label */}
          <AnimatedSection className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: sol.color }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: sol.color }}>
              Servicios
            </span>
          </AnimatedSection>

          <AnimatedSection className="mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
              Portafolio completo de{" "}
              <span style={{ color: sol.color }}>{sol.category}</span>
            </h2>
          </AnimatedSection>

          {/* Services — grouped list layout */}
          <div className="space-y-16">
            {sol.services.map((group, gi) => (
              <div key={gi}>
                {group.groupName && (
                  <AnimatedSection delay={gi * 0.05}>
                    <div className="flex items-center gap-4 mb-8">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-full"
                        style={{ color: sol.color, backgroundColor: `${sol.color}15`, border: `1px solid ${sol.color}25` }}
                      >
                        {group.groupName}
                      </span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                  </AnimatedSection>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.services.map((svc, si) => (
                    <AnimatedSection key={svc.name} delay={si * 0.06}>
                      <div className="group border border-white/10 rounded-2xl p-6 h-full hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col">
                        {/* Service name */}
                        <div className="flex items-start gap-3 mb-4">
                          <CheckCircle2
                            size={15}
                            className="shrink-0 mt-0.5"
                            style={{ color: sol.color }}
                          />
                          <h3 className="text-white font-semibold text-sm leading-snug">{svc.name}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-white/40 text-sm font-light leading-relaxed flex-1 pl-6">
                          {svc.description}
                        </p>

                        {/* Tags */}
                        {svc.tags && svc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4 pl-6">
                            {svc.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                style={{
                                  color: sol.color,
                                  backgroundColor: `${sol.color}10`,
                                  border: `1px solid ${sol.color}20`,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — brand red background
          (≠ industry: dark #0F172A CTA)
      ══════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: sol.color }}>
        {/* Noise texture */}
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            {/* Text */}
            <AnimatedSection direction="left">
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
                {sol.category} · OSC Top Solutions
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                {sol.cta.headline}
              </h2>
              <p className="text-white/70 text-lg font-light leading-relaxed max-w-xl">
                {sol.cta.description}
              </p>
            </AnimatedSection>

            {/* Actions */}
            <AnimatedSection direction="right" delay={0.1} className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
                style={{ color: sol.color }}
              >
                Hablar con un experto <ArrowRight size={16} />
              </Link>
              <Link
                href="/soluciones"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/25 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200"
              >
                Ver todas las soluciones <ChevronRight size={15} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
