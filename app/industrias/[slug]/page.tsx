import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ResourceCaptureForm from "@/components/industrias/ResourceCaptureForm";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, ORG_ID, CERTIFICATIONS, AREA_SERVED } from "@/lib/seo";
import { industries, getIndustry } from "@/app/industrias/_data";
import {
  ArrowRight, ChevronRight, Shield, Eye, Radio,
  Server, Monitor, Smartphone, Activity, CheckCircle2,
  Zap, TrendingUp, AlertTriangle, MapPin, Quote,
} from "lucide-react";

/* ── Static params ── */
export async function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

/* ── SEO Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};

  // Title: keyword-first, max 60 chars
  const seoTitle = `${ind.name} — Conectividad y Ciberseguridad OT LATAM | OSC`;
  // Description: keyword + differentiator + CTA implícito, max 155 chars
  const seoDescription = `OSC integra redes críticas, ciberseguridad OT/IT y operaciones gestionadas para ${ind.name.toLowerCase()} en 16 países. ISO 27001 + IEC 62443. Diagnóstico ejecutivo sin costo.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      `tecnología ${ind.name.toLowerCase()} LATAM`,
      `infraestructura crítica ${ind.sector.toLowerCase()}`,
      "ciberseguridad OT IT infraestructura",
      "redes privadas LTE 5G",
      "NOC SOC 24/7",
      "IEC 62443 ISO 27001",
      "OSC Top Solutions",
    ].join(", "),
    alternates: { canonical: `${SITE_URL}/industrias/${slug}` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      url: `${SITE_URL}/industrias/${slug}`,
    },
  };
}

/* ── Icon map ── */
const categoryIcons: Record<string, React.ElementType> = {
  "Sistemas Inteligentes (SISE)":                        Eye,
  "Conectividad IoT de alta disponibilidad":             Activity,
  "Transporte inalámbrico para infraestructura":         Radio,
  "Infraestructura fija de datos":                       Server,
  "Ciberseguridad para entornos críticos":               Shield,
  "Plataformas Operativas para misión crítica":          Monitor,
  "Plataformas Operativa para misión crítica":           Monitor,
  "Redes móviles privadas y de misión crítica":          Smartphone,
};

/* ── Page ── */
export default async function IndustriaLanding({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const A = ind.color; // accent

  const heroImages: Record<string, string> = {
    "power-utilities": "/Industria/herobanner utilities.png",
    "energia-mineria":  "/Industria/herobanner mineria.png",
    "puertos":          "/Industria/herobanner puertos.png",
    "gobierno":         "/Industria/herobanner gobierno.png",
    "telecoms":         "/Industria/herobanner telecoms.png",
  };
  const heroBg = heroImages[ind.slug];

  /* ── JSON-LD ── */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/industrias/${ind.slug}/#service`,
    name: `Soluciones Tecnológicas para ${ind.name} — Conectividad, Ciberseguridad OT y Managed Services`,
    description: ind.hero.subheadline,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    serviceType: `Integración tecnológica — ${ind.name}`,
    hasCredential: CERTIFICATIONS,
    url: `${SITE_URL}/industrias/${ind.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",       item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Industrias", item: `${SITE_URL}/industrias` },
      { "@type": "ListItem", position: 3, name: ind.name,     item: `${SITE_URL}/industrias/${ind.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      {/* ══════════════════════════════════════════════════════
          § 1 · HERO — dark full-bleed, animated stats bar
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#0F172A]">

        {/* Hero background image */}
        {heroBg && (
          <Image
            src={heroBg}
            alt={`${ind.name} hero background`}
            fill
            priority
            className="object-cover object-center"
            style={{ opacity: 0.35 }}
          />
        )}

        {/* Dark gradient overlay — ensures text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.70) 50%, rgba(15,23,42,0.50) 100%)",
          }}
        />

        {/* Accent glow on top of image */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${A}18 0%, transparent 65%)`,
            transform: "translate(25%, -15%)",
          }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-[0.04]" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <AnimatedSection>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-white/30 text-xs mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <Link href="/industrias" className="hover:text-white/60 transition-colors">Industrias</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{ind.name}</span>
            </nav>

            {/* Sector pill */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border"
              style={{ color: A, borderColor: `${A}35`, backgroundColor: `${A}10` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: A }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{ind.sector}</span>
            </div>

            {/* H1 */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white max-w-4xl mb-6 leading-[1.05]">
              {ind.hero.headline
                .split(" ")
                .map((word, i, arr) =>
                  i >= arr.length - 2 ? (
                    <span key={i} style={{ color: A }}> {word}</span>
                  ) : (
                    <span key={i}> {word}</span>
                  )
                )}
            </h1>

            <p className="text-white/50 text-lg lg:text-xl font-light max-w-2xl mb-12 leading-relaxed">
              {ind.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-full transition-all duration-200 hover:shadow-2xl text-sm text-white"
                style={{ background: A, boxShadow: `0 4px 24px ${A}30` }}
              >
                Hablar con un experto <ArrowRight size={16} />
              </Link>
              <a
                href="#soluciones"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-semibold px-7 py-4 rounded-full transition-all duration-200 text-sm"
              >
                Ver soluciones <ChevronRight size={16} />
              </a>
            </div>

            {/* Stats bar */}
            <div className="inline-grid grid-cols-1 sm:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-sm">
              {ind.hero.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-8 py-6 text-center sm:text-left ${
                    i < ind.hero.stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""
                  }`}
                >
                  <div className="text-3xl lg:text-4xl font-black mb-1" style={{ color: A }}>
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs leading-tight font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom fade to white (next section is bg-white) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0F172A 70%, #0F172A)" }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════
          § 2 · EL RETO — white, two-column + pain stats
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6">

          {/* Section label */}
          <AnimatedSection className="flex items-center gap-3 mb-14">
            <div className="w-8 h-px" style={{ backgroundColor: A }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: A }}>
              El Reto
            </span>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left — headline + context */}
            <AnimatedSection direction="left">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0F172A] mb-5 leading-tight">
                ¿Por qué la tecnología convencional{" "}
                <span style={{ color: A }}>no alcanza?</span>
              </h2>
              <div
                className="w-14 h-1 rounded-full mb-7"
                style={{ background: `linear-gradient(90deg, ${A}, ${A}30)` }}
              />
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-8">
                {ind.challenge.context}
              </p>

              {/* Quote */}
              <div
                className="relative p-6 rounded-2xl border-l-4"
                style={{
                  borderLeftColor: A,
                  backgroundColor: `${A}04`,
                  borderColor: `${A}18`,
                }}
              >
                <Quote size={18} className="absolute top-4 right-4 opacity-20" style={{ color: A }} />
                <p className="text-slate-600 text-sm italic leading-relaxed pr-6">
                  &ldquo;{ind.challenge.quote}&rdquo;
                </p>
              </div>
            </AnimatedSection>

            {/* Right — pain stats */}
            <AnimatedSection direction="right" delay={0.12}>
              <div className="space-y-5 lg:pt-10">
                {ind.painStats.map((ps, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-5 p-6 rounded-2xl border bg-white hover:shadow-lg hover:shadow-slate-100 transition-all duration-300"
                    style={{ borderColor: "rgba(0,0,0,0.07)" }}
                  >
                    {/* Big stat */}
                    <div className="shrink-0 min-w-[80px] text-right">
                      <div
                        className="text-3xl font-black leading-none tabular-nums"
                        style={{ color: A }}
                      >
                        {ps.value}
                      </div>
                    </div>

                    <div className="w-px self-stretch bg-slate-100 shrink-0" />

                    <div className="flex-1">
                      {/* Context tag */}
                      <span
                        className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full mb-2"
                        style={{ color: A, background: `${A}10`, border: `1px solid ${A}20` }}
                      >
                        {ps.context}
                      </span>
                      <p className="text-slate-600 text-sm font-light leading-relaxed">
                        {ps.label}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Problem highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{ backgroundColor: `${A}06`, border: `1px solid ${A}15` }}
                  >
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" style={{ color: A }} />
                    <p className="text-slate-600 text-xs font-medium leading-snug">
                      Sistemas aislados = puntos de falla amplificados
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{ backgroundColor: `${A}06`, border: `1px solid ${A}15` }}
                  >
                    <Shield size={14} className="shrink-0 mt-0.5" style={{ color: A }} />
                    <p className="text-slate-600 text-xs font-medium leading-snug">
                      Brecha OT/IT sin visibilidad unificada
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 3 · SEGMENTACIÓN — dark, 3 segment cards con stats
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#0F172A" }}>
        {/* Subtle center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${A}08 0%, transparent 65%)` }}
        />
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Section label */}
          <AnimatedSection className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: A }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: A }}>
              Segmentación
            </span>
          </AnimatedSection>

          <AnimatedSection className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight max-w-xl">
                  Desafíos específicos{" "}
                  <span style={{ color: A }}>por segmento</span>
                </h2>
              </div>
              <p className="text-white/35 text-base font-light max-w-sm leading-relaxed">
                Cada operación dentro de {ind.name} tiene retos únicos que requieren soluciones diferenciadas.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6">
            {ind.segmentation.map((seg, i) => (
              <AnimatedSection key={seg.segment} delay={i * 0.1}>
                <div
                  className="group relative flex flex-col h-full rounded-3xl overflow-hidden border transition-all duration-300 hover:border-white/20"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, ${A}, ${A}30)` }}
                  />

                  <div className="p-8 flex flex-col flex-1">
                    {/* Segment pill */}
                    <div
                      className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1 mb-6"
                      style={{ background: `${A}12`, border: `1px solid ${A}25` }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: A }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: A }}>
                        {seg.segment}
                      </span>
                    </div>

                    {/* Large stat */}
                    <div className="mb-5">
                      <div
                        className="text-5xl lg:text-6xl font-black leading-none tabular-nums mb-1"
                        style={{ color: A }}
                      >
                        {seg.stat}
                      </div>
                      <p className="text-white/35 text-xs font-medium leading-snug">
                        {seg.statLabel}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-white/8 mb-5" />

                    {/* Description */}
                    <p className="text-white/50 text-sm font-light leading-relaxed mb-6 flex-1">
                      {seg.description}
                    </p>

                    {/* Challenges */}
                    <ul className="space-y-3">
                      {seg.challenges.map((ch) => (
                        <li key={ch} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: `${A}12`, border: `1px solid ${A}22` }}
                          >
                            <TrendingUp size={10} style={{ color: A }} />
                          </div>
                          <span className="text-white/55 text-xs font-light leading-relaxed">{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 4 · PROPUESTA DE VALOR — dark glassmorphism
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#060F1E" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${A}10 0%, transparent 65%)` }}
        />
        <div className="absolute inset-0 grid-bg opacity-[0.06]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section label */}
          <AnimatedSection className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: A }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: A }}>
              Propuesta de Valor
            </span>
          </AnimatedSection>

          <AnimatedSection className="mb-16">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl lg:text-5xl font-bold text-white max-w-xl leading-tight">
                {ind.priority.headline}
              </h2>
              <p className="text-white/40 text-base font-light max-w-sm leading-relaxed">
                {ind.priority.description}
              </p>
            </div>
          </AnimatedSection>

          {/* Value prop cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ind.valueProps.map((vp, i) => (
              <AnimatedSection key={vp.title} delay={i * 0.08}>
                <div
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 h-full hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, ${A}, ${A}30)` }}
                  />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${A}15`, border: `1px solid ${A}25` }}
                  >
                    <Zap size={17} style={{ color: A }} />
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug mb-3">{vp.title}</h3>
                  <p className="text-white/45 text-sm font-light leading-relaxed flex-1">{vp.description}</p>
                  <div
                    className="mt-5 h-[2px] w-8 rounded-full group-hover:w-16 transition-all duration-500"
                    style={{ backgroundColor: A }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 5 · SERVICIOS — light grid
      ══════════════════════════════════════════════════════ */}
      <section id="soluciones" className="py-28 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">

          {/* ── Header ── */}
          <AnimatedSection className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: A }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: A }}>
              Servicios
            </span>
          </AnimatedSection>

          <AnimatedSection className="mb-16">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold text-[#0F172A] max-w-2xl leading-tight">
                  Soluciones integradas para{" "}
                  <span style={{ color: A }}>{ind.name}</span>
                </h2>
                <p className="text-slate-400 text-base font-light mt-3 max-w-lg">
                  Portafolio de tecnología convergente diseñado para los desafíos del sector.
                </p>
              </div>
              <Link
                href="/soluciones"
                className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                style={{ color: A }}
              >
                Ver todas las soluciones
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>

          {/* ── Service cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ind.solutions.map((sol, i) => {
              const num = String(i + 1).padStart(2, "0");
              const IconComp = categoryIcons[sol.category] ?? Zap;
              return (
                <AnimatedSection key={sol.category} delay={i * 0.06}>
                  <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 overflow-hidden cursor-default">

                    {/* Top accent bar — slides in from left on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${A}, ${A}50)` }}
                    />

                    <div className="flex flex-col flex-1 p-6">

                      {/* Top row: number + icon */}
                      <div className="flex items-start justify-between mb-5">
                        <span
                          className="text-[11px] font-black tabular-nums"
                          style={{ color: "rgba(0,0,0,0.12)" }}
                        >
                          {num}
                        </span>
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: `${A}08`,
                            border: `1px solid ${A}18`,
                          }}
                        >
                          <IconComp size={17} style={{ color: A }} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-[#0F172A] text-sm leading-snug mb-4 group-hover:text-[#0F172A] transition-colors duration-200">
                        {sol.category}
                      </h3>

                      {/* Capabilities */}
                      <ul className="space-y-2.5 flex-1">
                        {sol.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2.5">
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-[6px] transition-colors duration-300"
                              style={{ background: `${A}55` }}
                            />
                            <span className="text-slate-400 text-xs font-light leading-relaxed">
                              {cap}
                            </span>
                          </li>
                        ))}
                      </ul>

                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="h-[2px] mx-6 mb-5 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: `linear-gradient(90deg, ${A}30, transparent)` }}
                    />

                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 6 · CASOS DE ÉXITO — dark slate, evidencia real
      ══════════════════════════════════════════════════════ */}
      {ind.caseStudies && ind.caseStudies.length > 0 && (
        <section className="py-28 relative overflow-hidden" style={{ background: "#0F172A" }}>
          <div className="absolute inset-0 grid-bg opacity-[0.06]" />
          {/* Accent glow */}
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at bottom left, ${A}0A 0%, transparent 60%)`,
              transform: "translate(-20%, 20%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Header */}
            <AnimatedSection className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ backgroundColor: A }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: A }}>
                Casos de Éxito
              </span>
            </AnimatedSection>

            <AnimatedSection className="mb-14">
              <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
                Resultados reales.{" "}
                <span style={{ color: A }}>Operaciones reales.</span>
              </h2>
            </AnimatedSection>

            {/* Case study cards */}
            <div className="space-y-4">
              {ind.caseStudies.map((cs, i) => (
                <AnimatedSection key={cs.headline} delay={i * 0.09}>
                  <Link href="/contacto" className="group block">
                    <div
                      className="relative grid md:grid-cols-[260px_1fr_64px] gap-0 rounded-2xl border overflow-hidden transition-all duration-300"
                      style={{
                        borderColor: "rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${A}08 0%, transparent 50%)` }}
                      />
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `linear-gradient(90deg, ${A}, ${A}30)` }}
                      />

                      {/* LEFT — metric hero */}
                      <div
                        className="relative flex flex-col justify-between p-7 border-r"
                        style={{ borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        {/* Location tag */}
                        <div className="flex items-center gap-2 mb-6">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: A }}
                          />
                          <span
                            className="text-[10px] font-black uppercase tracking-[0.22em]"
                            style={{ color: A }}
                          >
                            {cs.location}
                          </span>
                        </div>

                        {/* Big metric */}
                        {cs.metric ? (
                          <div>
                            <div
                              className="text-3xl lg:text-4xl font-black leading-none mb-2 transition-colors duration-300"
                              style={{ color: "rgba(255,255,255,0.90)" }}
                            >
                              {cs.metric.split(" ")[0]}
                            </div>
                            <div className="text-white/35 text-xs font-medium leading-snug">
                              {cs.metric.split(" ").slice(1).join(" ")}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <TrendingUp size={24} style={{ color: A }} className="mb-2" />
                            <div className="text-white/35 text-xs font-medium">Caso verificado</div>
                          </div>
                        )}

                        {/* Index number */}
                        <div
                          className="absolute bottom-5 right-6 text-5xl font-black tabular-nums pointer-events-none select-none"
                          style={{ color: "rgba(255,255,255,0.04)", lineHeight: 1 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* CENTER — content */}
                      <div className="p-7 flex flex-col justify-center">
                        <h3 className="text-white font-bold text-lg lg:text-xl leading-snug mb-3 group-hover:text-white transition-colors duration-200">
                          {cs.headline}
                        </h3>
                        <p className="text-white/40 text-sm font-light leading-relaxed">
                          {cs.description}
                        </p>
                      </div>

                      {/* RIGHT — arrow */}
                      <div className="hidden md:flex items-center justify-center border-l" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <ArrowRight
                            size={15}
                            className="text-white/20 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5"
                            style={{ color: undefined }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          § 7 · RECURSOS / BIBLIOTECA TÉCNICA — lead capture
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#080F1E" }}>
        {/* Background: two glow orbs */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top right, ${A}0A 0%, transparent 60%)`,
            transform: "translate(20%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at bottom left, rgba(0,0,134,0.08) 0%, transparent 60%)",
            transform: "translate(-20%, 20%)",
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-[0.04]" />

        {/* Top edge separator */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${A}30, transparent)` }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section label */}
          <AnimatedSection className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ backgroundColor: A }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: A }}>
              Biblioteca Técnica
            </span>
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight max-w-2xl mb-4">
              Recursos técnicos{" "}
              <span style={{ color: A }}>para su operación</span>
            </h2>
            <p className="text-white/40 text-base font-light max-w-xl leading-relaxed">
              Contenido desarrollado por ingenieros OSC con más de 30 años en {ind.name.toLowerCase()}. Seleccione el recurso de su interés para consultarlo en línea.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <ResourceCaptureForm resources={ind.resources} vertical={ind.name} />
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 8 · CTA FINAL — red full-bleed
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#FF0057" }}>
        {/* Depth layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.18) 0%, transparent 60%)" }}
        />
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 65%)",
            transform: "translate(25%, -25%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 65%)",
            transform: "translate(-20%, 25%)",
          }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />

        <div className="relative max-w-5xl mx-auto px-6">
          <AnimatedSection>

            {/* Sector pill */}
            <div className="flex justify-center mb-10">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border"
                style={{ color: "rgba(255,255,255,0.90)", borderColor: "rgba(255,255,255,0.30)", backgroundColor: "rgba(255,255,255,0.12)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-white" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{ind.sector}</span>
              </div>
            </div>

            {/* Headline */}
            <div className="text-center mb-14">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Hable con un especialista en{" "}
                <span className="italic opacity-90">{ind.name}</span>
              </h2>
              <p className="text-white/65 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                Nuestros ingenieros diseñan la arquitectura tecnológica exacta que su operación necesita. Diagnóstico técnico a medida para su operación.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-14">
              {[
                {
                  icon: Zap,
                  title: "Diagnóstico técnico",
                  desc: "Evaluamos su infraestructura actual e identificamos brechas críticas.",
                },
                {
                  icon: Shield,
                  title: "Arquitectura a medida",
                  desc: "Diseñamos la solución exacta para sus requerimientos operativos.",
                },
                {
                  icon: TrendingUp,
                  title: "ROI cuantificado",
                  desc: "Calculamos el retorno esperado antes de cualquier compromiso.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl"
                  style={{
                    background: "rgba(0,0,0,0.15)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.20)" }}
                  >
                    <item.icon size={15} className="text-white" />
                  </div>
                  <p className="text-white font-bold text-sm mb-1.5">{item.title}</p>
                  <p className="text-white/55 text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 font-bold px-9 py-4 rounded-full text-sm transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
                style={{
                  background: "#fff",
                  color: "#FF0057",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.20)",
                }}
              >
                Agendar diagnóstico <ArrowRight size={16} />
              </Link>
              <Link
                href="/soluciones"
                className="inline-flex items-center gap-2 font-semibold px-9 py-4 rounded-full text-sm text-white transition-all duration-200 hover:bg-white/20"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.30)",
                }}
              >
                Explorar soluciones <ChevronRight size={16} />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                "30+ años de operación",
                "16 países",
                "+2,000 clientes",
                "NOC 24/7 ISO 9001",
              ].map((signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-white/50" />
                  <span className="text-white/55 text-xs font-medium">{signal}</span>
                </div>
              ))}
            </div>

          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
