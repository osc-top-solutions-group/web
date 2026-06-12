import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, ORG_ID } from "@/lib/seo";
import {
  ArrowRight, ChevronRight, TrendingUp, FileText,
  Globe, Building2, Leaf, Users, Calendar, Newspaper,
  BarChart2,
} from "lucide-react";
import CalendarioIR from "./CalendarioIR";

export const metadata: Metadata = {
  title: "Inversionistas — OSC Top Solutions Group",
  description:
    "Información financiera y corporativa sobre los resultados y desempeño de OSC Top Solutions Group. Kit del inversionista, gobierno corporativo, ESG y calendario de eventos.",
  alternates: { canonical: `${SITE_URL}/inversionistas` },
  openGraph: {
    title: "Inversionistas — OSC Top Solutions Group",
    description: "Kit del inversionista, reportes financieros, ESG y calendario de eventos de OSC Top Solutions Group.",
    type: "website",
    url: `${SITE_URL}/inversionistas`,
  },
};

const irSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/inversionistas/#page`,
  url: `${SITE_URL}/inversionistas`,
  name: "Inversionistas — OSC Top Solutions Group",
  description: "Portal de relación con inversionistas de OSC Top Solutions Group.",
  about: { "@id": ORG_ID },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",          item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Inversionistas",item: `${SITE_URL}/inversionistas` },
    ],
  },
};

/* ─── DATA ─────────────────────────────────────────────────────── */
const reports = [
  {
    feat: true,
    tag: "Documento principal",
    title: "Reporte Integrado 2025",
    desc: "Estados financieros consolidados, capítulo ESG completo, gobierno corporativo, tesis de inversión y hechos relevantes 2024–2025.",
    meta: "PDF · 84 pgs · ESP/EN",
    lines: 5,
  },
  { feat: false, tag: "ESG",               title: "Reporte de Sostenibilidad 2025",       meta: "PDF · 32 pgs",       lines: 4 },
  { feat: false, tag: "Hechos relevantes", title: "Hechos Relevantes 2025–2026",           meta: "PDF · 6 pgs · 2026", lines: 3 },
  { feat: false, tag: "Compliance",        title: "Política Compliance & Anticorrupción",  meta: "PDF · 8 pgs · v1.4", lines: 4 },
  { feat: false, tag: "Ética",             title: "Código de Ética y Conducta",            meta: "PDF · 18 pgs · v2.1",lines: 4 },
];

const bigCards = [
  {
    num: "01", icon: Building2,
    title: "Gobierno Corporativo",
    desc: "Estructura de gobernanza, comités estatutarios, código de ética y sistema de gestión integrado. Base para la creación de valor sostenible.",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
  },
  {
    num: "02", icon: BarChart2,
    title: "Información Financiera",
    desc: "Estados financieros consolidados, earnings releases y financial summaries. Histórico trimestral completo desde 2021.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
  },
  {
    num: "03", icon: TrendingUp,
    title: "Plan Estratégico 2026–2030",
    desc: "Tesis de inversión, hoja de ruta multi-país, guidance financiero y prioridades de capital allocation a cinco años.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
  },
  {
    num: "04", icon: Newspaper,
    title: "Sala de Prensa",
    desc: "Hechos relevantes, comunicados oficiales y archivo de prensa. Solicitudes de medios respondidas en menos de 24 horas hábiles.",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80",
  },
];

const events = [
  {
    day: "15", month: "May · 2026",
    title: "1Q 2026 — Earnings Release & Conference Call",
    desc: "Publicación de resultados consolidados del primer trimestre, con conferencia abierta a analistas y prensa. Pre-registro requerido.",
    status: "Próximo", accent: true, when: "11:00 GMT-5 · 60 min",
  },
  {
    day: "04", month: "Jun · 2026",
    title: "Asamblea Ordinaria de Accionistas",
    desc: "Aprobación de estados financieros 2025, dividendo y elección de comités estatutarios.",
    status: "Por agenda", accent: true, when: "10:00 GMT-5 · presencial + virtual",
  },
  {
    day: "22", month: "Jun · 2026",
    title: "Investor Day 2026 — Beyond Tech LatAm",
    desc: "Sesión institucional con la dirección, recorrido por el portafolio comercial y guidance multi-año.",
    status: "Save the date", accent: false, when: "Bogotá · día completo",
  },
  {
    day: "15", month: "Ago · 2026",
    title: "2Q 2026 — Earnings Release & Conference Call",
    desc: "Publicación de resultados consolidados del segundo trimestre. Pre-registro requerido.",
    status: "Calendario", accent: false, when: "11:00 GMT-5",
  },
];

const news = [
  {
    tag: "Hecho relevante",
    title: "OSC firma acuerdo multi-país con Telefónica para despliegue 5G SA en cuatro mercados",
    date: "22 abr 2026",
  },
  {
    tag: "Earnings",
    title: "Resultados 1Q 2026: ingresos +18% YoY, margen EBITDA 22.4%",
    date: "15 abr 2026",
  },
  {
    tag: "Sostenibilidad",
    title: "OSC publica Reporte Integrado 2025 con verificación GRI externa",
    date: "05 mar 2026",
  },
];

/* ─── SUB-COMPONENTS ────────────────────────────────────────────── */

function DocIcon({ dark = false, lines = 5 }: { dark?: boolean; lines?: number }) {
  const widths = [80, 100, 60, 90, 70].slice(0, lines);
  return (
    <div
      className="relative mb-5 shrink-0"
      style={{
        width: 52, height: 68,
        border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
        borderRadius: "4px 10px 4px 4px",
        background: dark ? "rgba(255,255,255,0.05)" : "#F8FAFC",
      }}
    >
      <div
        className="absolute top-0 right-0 w-0 h-0"
        style={{
          borderStyle: "solid",
          borderWidth: "0 10px 10px 0",
          borderColor: `transparent ${dark ? "#0F172A" : "white"} transparent transparent`,
        }}
        aria-hidden="true"
      />
      <div className="absolute flex flex-col gap-1.5" style={{ inset: "0 7px", top: 16 }}>
        {widths.map((w, i) => (
          <span
            key={i}
            className="block rounded-sm"
            style={{ height: 2, width: `${w}%`, background: dark ? "rgba(255,255,255,0.22)" : "#CBD5E1" }}
          />
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ num, label, dark }: { num: string; label: string; dark?: boolean }) {
  return (
    <AnimatedSection className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-[#FF0057]" aria-hidden="true" />
      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF0057]">
        {num} — {label}
      </span>
    </AnimatedSection>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────── */

export default function InversionistasPage() {
  return (
    <>
      <JsonLd data={irSchema} />

      {/* ══════════════════════════════════════════════════════
          § HERO — dark full-bleed
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#0F172A]">
        {/* Background photo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2000&auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
          }}
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.75) 55%, rgba(15,23,42,0.50) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Accent glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,0,87,0.10) 0%, transparent 65%)",
            transform: "translate(25%, -15%)",
          }}
          aria-hidden="true"
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-[0.04]" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <AnimatedSection>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-white/30 text-xs mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <span className="text-white/60">Inversionistas</span>
            </nav>

            {/* Sector pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border border-[#FF0057]/35 bg-[#FF0057]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0057] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF0057]">
                Investor Relations
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white max-w-3xl mb-6 leading-[1.05]">
              Portal del{" "}
              <span style={{ color: "#FF0057" }}>Inversionista</span>
            </h1>

            <p className="text-white/50 text-lg lg:text-xl font-light max-w-2xl mb-12 leading-relaxed">
              Información financiera y corporativa sobre los resultados y desempeño de OSC. Nuestro objetivo es reportar la performance del negocio y responder a sus consultas con transparencia.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="#kit"
                className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-full transition-all duration-200 hover:shadow-2xl text-sm text-white"
                style={{ background: "#FF0057", boxShadow: "0 4px 24px rgba(255,0,87,0.30)" }}
              >
                Descargar Investor Kit <ArrowRight size={16} />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-semibold px-7 py-4 rounded-full transition-all duration-200 text-sm"
              >
                Contactar IR <ChevronRight size={16} />
              </a>
            </div>

            {/* Stats bar */}
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-sm">
              {[
                { v: "+18%", l: "Ingresos YoY · 1Q 2026" },
                { v: "22.4%", l: "Margen EBITDA" },
                { v: "16", l: "Países operativos" },
                { v: "GRI", l: "Verificación ESG externa" },
              ].map((stat, i) => (
                <div
                  key={stat.l}
                  className={`px-8 py-6 text-center sm:text-left ${
                    i < 3 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""
                  }`}
                >
                  <div className="text-3xl lg:text-4xl font-black mb-1 text-[#FF0057]">{stat.v}</div>
                  <div className="text-white/40 text-xs leading-tight font-medium">{stat.l}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom fade to white */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0F172A 70%, white)" }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════
          § 01 · INVESTOR'S KIT — white
      ══════════════════════════════════════════════════════ */}
      <section id="kit" className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6">

          <SectionLabel num="01" label="Investor's Kit" />

          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
              <div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0F172A] mb-4 leading-tight">
                  Kit del <span style={{ color: "#FF0057" }}>inversionista.</span>
                </h2>
                <div className="w-14 h-1 rounded-full mb-5" style={{ background: "linear-gradient(90deg,#FF0057,rgba(255,0,87,0.3))" }} />
              </div>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Documentos institucionales consolidados para inversionistas, autoridades regulatorias y prensa. Documentos no listados disponibles bajo proceso formal de due diligence.
              </p>
            </div>
          </AnimatedSection>

          {/* Reports grid */}
          <AnimatedSection delay={0.06}>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>

              {/* Featured card — col 1, row-span-2 */}
              {(() => {
                const r = reports[0];
                return (
                  <article
                    className="row-span-2 flex flex-col p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                    style={{ background: "#0F172A", color: "white", minHeight: 380 }}
                  >
                    <div className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF0057]">
                      <span className="w-3.5 h-px bg-[#FF0057]" />
                      {r.tag}
                    </div>
                    <DocIcon dark lines={r.lines} />
                    <h4 className="font-bold text-white mb-3 leading-tight text-2xl">{r.title}</h4>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.65)" }}>{r.desc}</p>
                    <div
                      className="mt-auto pt-4 flex justify-between items-center font-mono text-[10px] tracking-[0.12em] uppercase"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}
                    >
                      <span>{r.meta}</span>
                      <span className="text-[#FF0057] font-semibold">Descargar →</span>
                    </div>
                  </article>
                );
              })()}

              {/* 4 smaller cards */}
              {reports.slice(1).map((r, i) => (
                <article
                  key={i}
                  className="flex flex-col p-7 bg-white border border-slate-200 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0F172A] hover:shadow-lg hover:shadow-slate-100"
                  style={{ minHeight: 220 }}
                >
                  <div className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF0057]">
                    <span className="w-3.5 h-px bg-[#FF0057]" />
                    {r.tag}
                  </div>
                  <DocIcon lines={r.lines} />
                  <h4 className="font-semibold text-[#0F172A] mb-auto leading-snug tracking-tight text-[17px]">
                    {r.title}
                  </h4>
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex justify-between items-center font-mono text-[10px] tracking-[0.12em] uppercase text-slate-400">
                    <span>{r.meta}</span>
                    <span className="text-[#FF0057] font-semibold">Descargar →</span>
                  </div>
                </article>
              ))}

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 02 · CENTROS DE INFORMACIÓN — dark
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.04]" aria-hidden="true" />
        <div
          className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top left, rgba(255,0,87,0.07) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6">

          <SectionLabel num="02" label="Centros de información" />

          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
              <div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                  Explore por <span style={{ color: "#FF0057" }}>tema.</span>
                </h2>
                <div className="w-14 h-1 rounded-full mb-5" style={{ background: "linear-gradient(90deg,#FF0057,rgba(255,0,87,0.3))" }} />
              </div>
              <p className="text-white/45 text-[15px] leading-relaxed">
                Cuatro centros temáticos con la información estructurada por área. Cada centro reúne documentos, métricas y contactos especializados.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-5">
            {bigCards.map((c, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <a
                  href="#"
                  className="group relative flex flex-col justify-end overflow-hidden rounded-2xl text-white no-underline"
                  style={{ minHeight: 360, padding: 32, isolation: "isolate" }}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{
                      zIndex: -2,
                      backgroundImage: `url('${c.img}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    aria-hidden="true"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      zIndex: -1,
                      background: "linear-gradient(0deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.55) 60%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Number pill */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <c.icon size={14} style={{ color: "#FF0057" }} />
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#FF0057] font-medium">{c.num}</span>
                  </div>

                  <h3 className="font-bold text-white mb-3 leading-none text-3xl lg:text-4xl tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-sm mb-5 leading-relaxed max-w-prose" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {c.desc}
                  </p>
                  <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase text-white group-hover:gap-5 transition-[gap] duration-200">
                    Ver detalle
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 03 · SOSTENIBILIDAD — white
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6">

          <SectionLabel num="03" label="Sostenibilidad" />

          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
              <div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0F172A] mb-4 leading-tight">
                  ESG con <span style={{ color: "#FF0057" }}>doble</span> materialidad.
                </h2>
                <div className="w-14 h-1 rounded-full mb-5" style={{ background: "linear-gradient(90deg,#FF0057,rgba(255,0,87,0.3))" }} />
              </div>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Reporte alineado con GRI Standards y revisado externamente. Métricas medibles, no aspiracionales. Cifras auditadas y revisadas anualmente.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.06}>
            <div className="grid gap-5" style={{ gridTemplateColumns: "1.2fr 1fr 1fr" }}>

              {/* Featured dark card */}
              <article className="relative flex flex-col rounded-2xl overflow-hidden" style={{ background: "#0F172A", padding: 40, minHeight: 400 }}>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "20px 20px" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(70% 55% at 110% 110%, rgba(255,0,87,0.22) 0%, transparent 60%)" }}
                  aria-hidden="true"
                />

                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0057]">
                      <Leaf size={12} />
                      Reporte 2025
                    </div>
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] tracking-[0.08em] uppercase font-medium"
                      style={{ background: "rgba(16,185,129,0.12)", color: "#6EE7B7", border: "1px solid rgba(16,185,129,0.22)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      GRI Verified
                    </span>
                  </div>

                  <h4 className="font-bold text-white leading-tight tracking-tight mb-4 text-2xl lg:text-3xl">
                    Reporte de<br />Sostenibilidad
                  </h4>

                  <p className="text-[14px] leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.60)" }}>
                    Doble materialidad financiera y de impacto. Capítulo ESG completo dentro del Reporte Integrado 2025 con verificación independiente.
                  </p>

                  <div
                    className="grid grid-cols-3 my-6 py-5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.10)", borderBottom: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    {[
                      { val: "16", label: "Países" },
                      { val: "84", label: "Páginas" },
                      { val: "GRI", label: "Estándar" },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="font-bold text-white text-xl leading-none mb-1">{s.val}</div>
                        <div className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <a href="#" className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase text-white hover:text-[#FF0057] hover:gap-5 transition-all duration-200">
                    Descargar PDF
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>

              {/* Environmental card */}
              <article
                className="relative flex flex-col rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", padding: 32, minHeight: 340 }}
              >
                <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl" style={{ background: "linear-gradient(90deg,#059669,#34D399)" }} aria-hidden="true" />
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold mb-4" style={{ color: "#059669" }}>
                  Ambiental
                </div>
                <div className="font-bold text-[#0F172A] leading-none tracking-tight mb-3" style={{ fontSize: "clamp(56px,5.8vw,80px)", letterSpacing: "-0.04em" }}>
                  −18<sup className="font-mono font-normal ml-1 text-[17px]" style={{ color: "#059669" }}>%</sup>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "#374151", maxWidth: "26ch" }}>
                  kWh por colaborador · FY22 → FY25 · datos verificados
                </p>
                <div className="mt-auto pt-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: "#6B7280" }}>Progreso hacia meta</span>
                    <span className="font-mono text-[9px] font-bold" style={{ color: "#059669" }}>60%</span>
                  </div>
                  <div className="relative h-2 rounded-full overflow-hidden mb-3" style={{ background: "rgba(16,185,129,0.15)" }}>
                    <div className="h-full rounded-full" style={{ width: "60%", background: "linear-gradient(90deg,#059669,#34D399)" }} />
                  </div>
                  <div className="pt-3 font-mono text-[10px] tracking-[0.12em] uppercase" style={{ borderTop: "1px solid rgba(16,185,129,0.22)", color: "#6B7280" }}>
                    Meta 2028 · −30%
                  </div>
                </div>
              </article>

              {/* Social card */}
              <article
                className="relative flex flex-col rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{ background: "#FFF1F2", border: "1px solid #FECDD3", padding: 32, minHeight: 340 }}
              >
                <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl" style={{ background: "linear-gradient(90deg,#FF0057,#FF4D7D)" }} aria-hidden="true" />
                <div className="flex items-center gap-2 mb-1">
                  <Users size={12} style={{ color: "#FF0057" }} />
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#FF0057] font-semibold">Social</div>
                </div>
                <div className="flex items-center gap-5 mb-3 mt-3">
                  <div className="relative shrink-0">
                    <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
                      <circle cx="36" cy="36" r="28" fill="none" stroke="#FECDD3" strokeWidth="5" />
                      <circle cx="36" cy="36" r="28" fill="none" stroke="#FF0057" strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={`${(34 / 100) * 2 * Math.PI * 28} ${2 * Math.PI * 28}`} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold text-[#FF0057] text-[13px] leading-none">34%</span>
                    </div>
                  </div>
                  <div className="font-bold leading-none tracking-tight" style={{ fontSize: "clamp(52px,5.4vw,72px)", letterSpacing: "-0.04em" }}>
                    <em className="not-italic text-[#FF0057]">34</em>
                    <span className="text-[#0F172A]">%</span>
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "#374151", maxWidth: "26ch" }}>
                  Mujeres en posiciones técnicas · objetivo 40% a 2028
                </p>
                <div className="mt-auto pt-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: "#6B7280" }}>Actual</span>
                    <span className="font-mono text-[9px] font-bold" style={{ color: "#FF0057" }}>Meta · 40%</span>
                  </div>
                  <div className="relative h-2 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,0,87,0.12)" }}>
                    <div className="h-full rounded-full" style={{ width: "85%", background: "linear-gradient(90deg,#FF0057,#FF4D7D)" }} />
                  </div>
                  <div className="pt-3 font-mono text-[10px] tracking-[0.12em] uppercase" style={{ borderTop: "1px solid rgba(255,0,87,0.18)", color: "#6B7280" }}>
                    9 universidades aliadas
                  </div>
                </div>
              </article>

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 04 · EVENTS & NEWS — dark
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.04]" aria-hidden="true" />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom right, rgba(255,0,87,0.07) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6">

          <SectionLabel num="04" label="Events & News" />

          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
              <div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                  Próximos eventos y <span style={{ color: "#FF0057" }}>comunicados.</span>
                </h2>
                <div className="w-14 h-1 rounded-full mb-5" style={{ background: "linear-gradient(90deg,#FF0057,rgba(255,0,87,0.3))" }} />
              </div>
              <p className="text-white/45 text-[15px] leading-relaxed">
                Calendario oficial de earnings, asambleas y eventos. Conferencias trimestrales abiertas a analistas y prensa con registro previo.
              </p>
            </div>
          </AnimatedSection>

          {/* Events timeline */}
          <AnimatedSection delay={0.06}>
            <div className="flex flex-col border-t border-white/10">
              {events.map((ev, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-center gap-6 lg:gap-8 py-7 border-b border-white/10 no-underline transition-all duration-200 hover:bg-white/[0.03] hover:px-4 cursor-pointer"
                >
                  {/* Day number */}
                  <div className="shrink-0 text-center pr-6 border-r border-white/10" style={{ minWidth: 90 }}>
                    <div className="font-bold text-white leading-none" style={{ fontSize: 40, letterSpacing: "-0.04em" }}>{ev.day}</div>
                    <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#FF0057] font-medium mt-1.5">{ev.month}</div>
                  </div>

                  {/* Title + desc */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white leading-snug tracking-tight mb-1.5 text-[18px]">{ev.title}</h4>
                    <p className="text-[13px] text-white/40 leading-relaxed">{ev.desc}</p>
                  </div>

                  {/* Status pill */}
                  <div className="hidden lg:block shrink-0 text-right font-mono text-[10px] tracking-[0.16em] uppercase" style={{ width: 180 }}>
                    <span
                      className={[
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-medium mb-1.5",
                        ev.accent
                          ? "text-[#FF0057] border-[#FF0057]/25 bg-[#FF0057]/8"
                          : "text-white/40 border-white/15 bg-white/4",
                      ].join(" ")}
                    >
                      {ev.accent && <span className="w-1.5 h-1.5 rounded-full bg-[#FF0057] animate-pulse" />}
                      {ev.status}
                    </span>
                    <span className="block text-white/30">{ev.when}</span>
                  </div>

                  <div className="shrink-0 text-white/25 group-hover:text-[#FF0057] group-hover:translate-x-1 transition-all duration-200">
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* News strip */}
          <AnimatedSection delay={0.1}>
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <Newspaper size={14} style={{ color: "#FF0057" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF0057]">Comunicados recientes</span>
              </div>
              <div className="grid sm:grid-cols-3 border-t border-white/10">
                {news.map((n, i) => (
                  <a
                    key={i}
                    href="#"
                    className="group flex flex-col p-7 hover:bg-white/[0.03] no-underline transition-colors duration-200 cursor-pointer"
                    style={{ borderRight: i < news.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
                  >
                    <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#FF0057] font-medium mb-3">{n.tag}</div>
                    <h4 className="font-semibold text-white leading-snug tracking-tight mb-4 flex-1 text-[15px]">{n.title}</h4>
                    <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.1em] uppercase text-white/25 pt-3 border-t border-white/10">
                      <span>{n.date}</span>
                      <span className="text-white/25 group-hover:text-[#FF0057] group-hover:translate-x-1 transition-all duration-200 inline-block">→</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 05 · CONTACTO IR — white
      ══════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6">

          <SectionLabel num="05" label="Investor Relations" />

          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-100">
              <div className="grid lg:grid-cols-[1fr_420px]">

                {/* Left: IR contact — dark */}
                <div
                  className="relative p-10 lg:p-14 flex flex-col justify-between overflow-hidden"
                  style={{ background: "#0F172A", borderRight: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="absolute pointer-events-none inset-0"
                    style={{ background: "radial-gradient(70% 60% at 0% 100%, rgba(255,0,87,0.14) 0%, transparent 65%)" }}
                    aria-hidden="true"
                  />

                  {/* Top */}
                  <div className="relative mb-8">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-5 h-px bg-[#FF0057]" aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#FF0057] font-medium">Investor Relations</span>
                    </div>

                    <h3 className="font-bold text-white leading-none tracking-tight mb-5" style={{ fontSize: "clamp(26px,3.5vw,46px)", letterSpacing: "-0.035em" }}>
                      Contacte directo con{" "}
                      <em className="not-italic text-[#FF0057]">Investor Relations.</em>
                    </h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "48ch" }}>
                      Solicitudes de due diligence, cobertura de analistas, requerimientos de prensa y autoridades respondidos en menos de 48 horas hábiles.
                    </p>
                  </div>

                  {/* Contact person card */}
                  <div className="relative mb-8">
                    <div
                      className="flex items-center gap-4 p-5 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-[15px]"
                        style={{ background: "linear-gradient(135deg,#FF0057,#cc0044)" }}
                      >
                        AD
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm leading-tight mb-0.5">Angélica D. Haro</p>
                        <p className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: "rgba(255,255,255,0.38)" }}>
                          Directora de Relación con Inversionistas
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.30)" }}>Disponible</span>
                      </div>
                    </div>
                  </div>

                  {/* Info rows + CTA */}
                  <div className="relative">
                    <div className="flex flex-col mb-7" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      {[
                        { label: "Email",    val: "angelica.dharo@osctopsolutionsgroup.com", href: "mailto:angelica.dharo@osctopsolutionsgroup.com" },
                        { label: "Horario",  val: "L–V · 8:00–18:00 GMT-5",                 href: undefined },
                        { label: "Respuesta",val: "< 48 horas hábiles",                      href: undefined },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.30)" }}>{row.label}</span>
                          {row.href ? (
                            <a href={row.href} className="font-mono text-[12px] transition-colors duration-150 hover:text-[#FF0057] truncate max-w-[280px]" style={{ color: "rgba(255,255,255,0.75)" }}>
                              {row.val}
                            </a>
                          ) : (
                            <span className="font-mono text-[12px]" style={{ color: "rgba(255,255,255,0.75)" }}>{row.val}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <a
                      href="mailto:angelica.dharo@osctopsolutionsgroup.com"
                      className="inline-flex items-center gap-3 text-white font-mono text-[11px] tracking-[0.12em] uppercase px-7 py-3.5 rounded-full transition-all duration-200 hover:gap-5"
                      style={{ background: "#FF0057", boxShadow: "0 4px 24px rgba(255,0,87,0.30)" }}
                    >
                      Escribir a IR
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Right: calendar */}
                <div className="bg-slate-50">
                  <CalendarioIR />
                </div>

              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LEGAL DISCLAIMER
      ══════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-slate-400 text-xs leading-relaxed max-w-4xl">
            <strong className="text-slate-500">Aviso Legal:</strong> La información contenida en esta sección es de carácter informativo y refleja datos al momento de su publicación. OSC Top Solutions Group es una empresa privada. Los indicadores financieros corresponden a información interna de gestión y no constituyen oferta pública de valores. Para consultas formales, comuníquese directamente con la Dirección de Relación con Inversionistas.
          </p>
        </div>
      </section>
    </>
  );
}
