import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PodcastCarousel from "@/components/beyond-tech/PodcastCarousel";
import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react";

// ─── Static image imports — bundled by Next.js → /_next/static/media/
import imgPerumin   from "./images/perumin.jpg";
import imgAndicom   from "./images/andicom.png";
import imgBolivia   from "./images/beyond-tech-bolivia.jpg";
import imgPeru      from "./images/beyond-tech-peru.png";
import imgChile     from "./images/beyond-tech-chile.webp";
import imgSmartCity     from "./images/smart-city-cartagena.jpg";
import imgPowerUtils    from "./images/transformando-resiliencia-energetica.png";

export const metadata: Metadata = {
  title: "Beyond Tech – OSC Top Solutions",
  description: "Casos de éxito, podcast y eventos. Pasamos de implementar tecnología a orquestar resultados.",
};

const cases = [
  {
    tag: "Telecom",
    tagColor: "#0F172A",
    title: "Red 5G Stand Alone para operaciones críticas en LATAM",
    context: "Operador regional requería cobertura 5G privada para infraestructura crítica distribuida.",
    problem: "Latencia inaceptable y falta de cobertura en zonas industriales remotas con protocolos de seguridad estrictos.",
    solution: "Diseño e implementación de red 5G SA privada con slice dedicado para operaciones críticas, integrada con NOC regional.",
    results: ["Latencia <5ms en zona de cobertura", "99.99% disponibilidad desde día 1", "Integración con plataformas SCADA existentes"],
  },
  {
    tag: "Puertos",
    tagColor: "#FF0057",
    title: "Transformación digital de infraestructura portuaria",
    context: "Puerto de primera categoría en América del Sur con necesidad de modernización urgente.",
    problem: "Ineficiencia logística crítica, colas de espera de 8+ horas y falta de visibilidad en tiempo real.",
    solution: "Plataforma integral de trazabilidad con IoT, video analítica e integración con sistema TOS existente.",
    results: ["40% reducción en tiempos de espera", "Trazabilidad 100% de contenedores", "ROI positivo en 18 meses"],
  },
  {
    tag: "Energía",
    tagColor: "#0F172A",
    title: "Expansión fibra óptica en zonas remotas",
    context: "Empresa energética con operaciones distribuidas en +200 sitios remotos sin conectividad confiable.",
    problem: "Dependencia de satélite con costos elevados, alta latencia y baja disponibilidad.",
    solution: "Tendido de 5,000 km de fibra óptica con anillos de redundancia y NOC dedicado para gestión proactiva.",
    results: ["+5,000 km de red propia operativa", "90% reducción en costos de conectividad", "Tiempo de falla promedio <4h"],
  },
];

// ─── EVENTS ────────────────────────────────────────────────────────────────
// dateISO drives upcoming / past split at build time.
// Update dates when official confirmations arrive.
const EVENTS = [
  {
    title:     "Transformando la Resiliencia Energética",
    subtitle:  "El Futuro de las Power Utilities · Infraestructura energética crítica en LATAM",
    location:  "Por confirmar",
    date:      "Próximamente",
    dateISO:   "2026-12-31",
    type:      "Conferencia",
    typeColor: "#000086",
    image:     imgPowerUtils.src,
    href:      "https://osctsgeventos.zohobackstage.com/TransformandolaResilienciaEnergticaElFuturodelasPowerUtilities#/",
  },
  {
    title:     "Beyond Tech Tour — Perú",
    subtitle:  "#BeyondTech Tour LATAM · Infraestructura crítica y conectividad",
    location:  "Lima, Perú",
    date:      "Jul 2025",
    dateISO:   "2025-07-31",
    type:      "Tour OSC",
    typeColor: "#FF0057",
    image:     imgPeru.src,
    href:      "https://osctsgeventos.zohobackstage.com/BeyondTechTourLATAM-PER#/",
  },
  {
    title:     "Smart City Cartagena",
    subtitle:  "Ciudades inteligentes y transformación urbana con tecnología crítica",
    location:  "Cartagena, Colombia",
    date:      "Abr 2025",
    dateISO:   "2025-04-30",
    type:      "Conferencia",
    typeColor: "#000086",
    image:     imgSmartCity.src,
    href:      "https://osctsgeventos.zohobackstage.com/SmartCityCartagena1#/",
  },
  {
    title:     "Beyond Tech Tour — Chile",
    subtitle:  "#BeyondTech Tour LATAM · Infraestructura crítica y conectividad",
    location:  "Santiago, Chile",
    date:      "Ago 2025",
    dateISO:   "2025-08-31",
    type:      "Tour OSC",
    typeColor: "#FF0057",
    image:     imgChile.src,
    href:      "https://osctsgeventos.zohobackstage.com/BeyondTechTourLATAM-CHILE#/",
  },
  {
    title:     "Beyond Tech Tour — Bolivia",
    subtitle:  "#BeyondTech Tour LATAM · Infraestructura crítica y conectividad",
    location:  "La Paz, Bolivia",
    date:      "Jun 2025",
    dateISO:   "2025-06-30",
    type:      "Tour OSC",
    typeColor: "#FF0057",
    image:     imgBolivia.src,
    href:      "https://osctsgeventos.zohobackstage.com/BeyondTechTourLATAM-BOLIVIA#/",
  },
  {
    title:     "PERUMIN",
    subtitle:  "Convención Minera Internacional — infraestructura crítica en minería",
    location:  "Arequipa, Perú",
    date:      "15–19 Sep 2025",
    dateISO:   "2025-09-19",
    type:      "Feria Industrial",
    typeColor: "#0F172A",
    image:     imgPerumin.src,
    href:      "https://osctsgeventos.zohobackstage.com/PERUMIN-Per#/",
  },
  {
    title:     "ANDICOM 2025",
    subtitle:  "Congreso Colombiano de Telecomunicaciones e Innovación Digital",
    location:  "Cartagena, Colombia",
    date:      "3–5 Sep 2025",
    dateISO:   "2025-09-05",
    type:      "Congreso",
    typeColor: "#000086",
    image:     imgAndicom.src,
    href:      "https://osctsgeventos.zohobackstage.com/ANDICOM2025#/",
  },
];

const posts = [
  {
    category: "Minería",
    categoryColor: "#0F172A",
    title: "La conectividad como decisión estratégica en la minería moderna",
    excerpt: "Redes privadas y soluciones de conectividad avanzada que posicionan a la minería 4.0 con mayor eficiencia, seguridad y continuidad operativa en LATAM.",
    date: "2025",
    readTime: "5 min",
    image: "https://osctopsolutionsgroup.com/wp-content/uploads/2026/02/Mineria.jpg",
    href: "https://osctopsolutionsgroup.com/informativo/redes-privadas-mineria-4-0/",
  },
  {
    category: "Ciberseguridad",
    categoryColor: "#FF0057",
    title: "Blindaje Operativo: Estrategia Integral de Ciberseguridad",
    excerpt: "La convergencia IT/OT exige un nuevo enfoque de seguridad. Estrategias integrales para blindar infraestructuras críticas de energía y minería.",
    date: "28 Feb 2025",
    readTime: "6 min",
    image: "",
    href: "https://www.linkedin.com/pulse/blindaje-operativo-estrategia-integral-de-ciberseguridad-3vwle/",
  },
  {
    category: "Transformación Industrial",
    categoryColor: "#0F172A",
    title: "El Abismo IT/OT: por qué la transformación industrial en LATAM",
    excerpt: "Análisis de la brecha entre tecnologías de información y operación, y los factores que frenan la transformación industrial en América Latina.",
    date: "15 Feb 2025",
    readTime: "7 min",
    image: "",
    href: "https://www.linkedin.com/pulse/el-abismo-itot-por-qu%C3%A9-la-transformaci%C3%B3n-industrial-en-latam-wjzse/",
  },
  {
    category: "Ciberseguridad",
    categoryColor: "#FF0057",
    title: "La Clave Humana en la Ciberseguridad",
    excerpt: "El factor humano es el eslabón más crítico en cualquier estrategia de seguridad. La concientización y el entrenamiento del personal son componentes esenciales de una defensa integral.",
    date: "2025",
    readTime: "4 min",
    image: "https://osctopsolutionsgroup.com/wp-content/uploads/2024/04/La-Clave-Humana-en-la-Ciberseguridad.webp",
    href: "https://osctopsolutionsgroup.com/informativo/la-clave-humana-en-la-ciberseguridad/",
  },
  {
    category: "Telecom",
    categoryColor: "#0F172A",
    title: "Monetización efectiva de 5G: Innovación en la nube y el borde",
    excerpt: "Estrategias para monetizar el potencial real del 5G mediante innovación en cloud y edge computing, posicionando a los operadores como socios estratégicos en sectores exigentes.",
    date: "2025",
    readTime: "6 min",
    image: "https://osctopsolutionsgroup.com/wp-content/uploads/2024/04/Monetizacion-efectiva-de-5G-Innovacion-en-la-nube-y-el-borde.webp",
    href: "https://osctopsolutionsgroup.com/informativo/monetizacion-efectiva-de-5g-innovacion-en-la-nube-y-el-borde/",
  },
  {
    category: "Ciberseguridad",
    categoryColor: "#FF0057",
    title: "Transferencia y aprendizaje en línea: la estrategia de Lumu en ciberseguridad",
    excerpt: "Cómo Lumu aplica transferencia de conocimiento y aprendizaje continuo como eje central de su estrategia de ciberseguridad para infraestructuras críticas en LATAM.",
    date: "2025",
    readTime: "5 min",
    image: "https://osctopsolutionsgroup.com/wp-content/uploads/2024/04/La-estrategia-de-lumu-en-ciberseguridad.png",
    href: "https://osctopsolutionsgroup.com/informativo/transferencia-y-aprendizaje-en-linea-la-estrategia-de-lumu-en-ciberseguridad/",
  },
];

export default function BeyondTechPage() {
  const now = new Date();
  const upcomingEvents = EVENTS
    .filter(e => new Date(e.dateISO) > now)
    .sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime());
  const pastEvents = EVENTS
    .filter(e => new Date(e.dateISO) <= now)
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-white grid-bg">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,0,134,0.05) 0%, transparent 65%)", transform: "translate(20%,-20%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#0F172A] max-w-3xl mb-6">
              Pasamos de implementar tecnología a{" "}
              <span className="text-gradient">orquestar resultados</span>
            </h1>
            <p className="text-[#475569] text-xl font-light max-w-2xl">
              Casos de éxito, conversaciones de liderazgo y encuentros del
              ecosistema de infraestructuras críticas.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Casos de Éxito */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,134,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Header */}
          <AnimatedSection className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] max-w-xl leading-tight">
                Resultados que <span className="text-gradient">definen el estándar</span>
              </h2>
              <p className="text-slate-400 text-sm font-light max-w-xs leading-relaxed lg:text-right">
                Proyectos reales. Métricas verificables.<br />
                Impacto sostenido en infraestructuras críticas de LATAM.
              </p>
            </div>
          </AnimatedSection>

          {/* Cards — horizontal 3-col grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.12}>
                <div className="group relative bg-white border border-gray-100 hover:border-gray-200 hover:shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer flex flex-col h-full">

                  {/* Colored header band */}
                  <div className="relative px-7 pt-7 pb-6" style={{ background: `linear-gradient(135deg, ${c.tagColor}10 0%, ${c.tagColor}04 100%)` }}>
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${c.tagColor} 0%, ${c.tagColor}44 60%, transparent 100%)` }} />

                    {/* Tag + number */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-black uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-full text-white shadow-sm" style={{ background: c.tagColor }}>
                        {c.tag}
                      </span>
                      <span className="text-[11px] font-black tabular-nums" style={{ color: `${c.tagColor}55` }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[#0F172A] font-bold text-lg leading-snug group-hover:text-[#FF0057] transition-colors duration-300">
                      {c.title}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 px-7 py-6 gap-5">

                    {/* 3 blocks stacked */}
                    {[
                      { label: "Contexto",     content: c.context,  num: "01" },
                      { label: "Desafío",      content: c.problem,  num: "02" },
                      { label: "Solución OSC", content: c.solution, num: "03" },
                    ].map((block) => (
                      <div key={block.label} className="flex gap-3">
                        <span
                          className="mt-0.5 text-[9px] font-black tabular-nums w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: `${c.tagColor}12`, color: c.tagColor }}
                        >
                          {block.num}
                        </span>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-300 mb-1">{block.label}</p>
                          <p className="text-slate-500 text-sm font-light leading-relaxed">{block.content}</p>
                        </div>
                      </div>
                    ))}

                    {/* Results */}
                    <div className="mt-auto pt-5 border-t border-gray-100">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-3">Resultados</p>
                      <div className="flex flex-col gap-2">
                        {c.results.map((r) => (
                          <div key={r} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.tagColor }} />
                            <span className="text-[12px] font-bold" style={{ color: c.tagColor }}>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: c.tagColor }}>
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,0,87,0.08) 0%, transparent 70%)", transform: "translate(20%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,134,0.12) 0%, transparent 70%)", transform: "translate(-20%,20%)" }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-0">
              Conversaciones de <span className="text-gradient">liderazgo tecnológico</span>
            </h2>
            <p className="text-white/50 text-base font-light mt-4 max-w-xl mx-auto">
              Episodios con líderes que están transformando la industria desde adentro.
            </p>
          </AnimatedSection>
          <AnimatedSection className="mb-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF0057] mb-4">Temporada completa</p>
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/show/4QgBueN0xO1JsyfbFaD8qD/video?utm_source=generator"
                width="100%"
                height="351"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </AnimatedSection>
          <PodcastCarousel />
        </div>
      </section>

      {/* Eventos */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0F172A" }}>
        <div className="absolute inset-0 grid-bg opacity-[0.06]" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,0,87,0.07) 0%, transparent 65%)", transform: "translate(20%,-20%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-6">

          {/* Header */}
          <AnimatedSection className="mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#FF0057" }}>Agenda</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-0 leading-tight">
              OSC en el <span className="text-gradient">ecosistema</span>
            </h2>
            <p className="text-white/40 text-lg font-light mt-3 max-w-xl">
              Conferencias, tours y congresos donde el sector de infraestructuras críticas de LATAM se reúne.
            </p>
          </AnimatedSection>

          {/* ── UPCOMING ─────────────────────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full" style={{ background: "#FF0057" }}>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Próximos eventos
              </span>
            </div>

            {upcomingEvents.length > 0 ? (
              upcomingEvents.length === 1 ? (
                /* ── Single upcoming: full-width featured card ── */
                <AnimatedSection>
                  <a
                    href={upcomingEvents[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid md:grid-cols-[5fr_4fr] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-72 md:h-auto overflow-hidden">
                      <img
                        src={upcomingEvents[0].image}
                        alt={upcomingEvents[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, rgba(15,23,42,0.6) 100%)" }} />
                      <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.85) 30%, transparent 100%)" }} />
                      {/* type badge */}
                      <span
                        className="absolute top-5 left-5 text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full text-white"
                        style={{ background: upcomingEvents[0].typeColor }}
                      >
                        {upcomingEvents[0].type}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-8 lg:p-12" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#FF0057] animate-pulse" />
                        <span className="text-[#FF0057] text-[11px] font-bold uppercase tracking-widest">Evento próximo</span>
                      </div>
                      <h3 className="text-white font-bold text-2xl lg:text-3xl leading-snug mb-3 group-hover:text-white/90 transition-colors">
                        {upcomingEvents[0].title}
                      </h3>
                      <p className="text-white/45 text-sm font-light leading-relaxed mb-8">
                        {upcomingEvents[0].subtitle}
                      </p>
                      <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <MapPin size={13} style={{ color: "#FF0057" }} />
                          {upcomingEvents[0].location}
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Calendar size={13} style={{ color: "#FF0057" }} />
                          {upcomingEvents[0].date}
                        </div>
                      </div>
                      <div
                        className="inline-flex items-center gap-2 self-start text-white font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 group-hover:gap-3"
                        style={{ background: "#FF0057", boxShadow: "0 4px 24px rgba(255,0,87,0.35)" }}
                      >
                        Registrarme <ArrowUpRight size={15} />
                      </div>
                    </div>
                  </a>
                </AnimatedSection>
              ) : (
                /* ── Multiple upcoming: grid ── */
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {upcomingEvents.map((ev, i) => (
                    <AnimatedSection key={ev.href} delay={i * 0.1}>
                      <a href={ev.href} target="_blank" rel="noopener noreferrer"
                        className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300 h-full"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white" style={{ background: ev.typeColor }}>
                            {ev.type}
                          </span>
                          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-white/90 text-[11px] font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <Calendar size={10} /> {ev.date}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-white/80 transition-colors">{ev.title}</h3>
                          <p className="text-white/40 text-sm font-light leading-relaxed mb-5 flex-1">{ev.subtitle}</p>
                          <div className="flex items-center gap-2 text-white/50 text-sm mb-5">
                            <MapPin size={12} style={{ color: ev.typeColor }} /> {ev.location}
                          </div>
                          <div className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: ev.typeColor }}>
                            Registrarme <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </a>
                    </AnimatedSection>
                  ))}
                </div>
              )
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className="text-white font-semibold text-base mb-2">Próximos eventos en camino</p>
                <p className="text-white/40 text-sm mb-5">Síguenos en LinkedIn para ser el primero en conocer la agenda.</p>
                <a href="https://www.linkedin.com/company/osc-top-solutions" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FF0057] text-sm font-bold hover:gap-3 transition-all duration-200">
                  Seguir OSC en LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
            )}
          </div>

          {/* ── PAST ─────────────────────────────────────────────── */}
          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  Eventos anteriores
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastEvents.map((ev, i) => (
                  <AnimatedSection key={ev.href} delay={i * 0.07}>
                    <a
                      href={ev.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 hover:shadow-xl transition-all duration-300 h-full"
                      style={{ background: "rgba(255,255,255,0.025)" }}
                    >
                      {/* Image with grayscale + dark overlay */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ filter: "grayscale(20%) brightness(0.9)" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Top badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span
                            className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white/90"
                            style={{ background: `${ev.typeColor}BB` }}
                          >
                            {ev.type}
                          </span>
                          <span className="text-[9px] font-semibold text-white/60 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            Finalizado
                          </span>
                        </div>

                        {/* Bottom: location */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/60 text-[11px]">
                          <MapPin size={10} style={{ color: `${ev.typeColor}CC` }} />
                          {ev.location}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-white/90 font-bold text-[15px] leading-snug mb-1.5 group-hover:text-white transition-colors">
                          {ev.title}
                        </h3>
                        <p className="text-white/35 text-xs font-light leading-relaxed flex-1 mb-4">
                          {ev.subtitle}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-white/8">
                          <div className="flex items-center gap-1.5 text-white/30 text-xs">
                            <Calendar size={10} />
                            {ev.date}
                          </div>
                          <ArrowUpRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors" />
                        </div>
                      </div>
                    </a>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Blog */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,134,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <AnimatedSection className="mb-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] max-w-xl leading-tight">
                Perspectivas del <span className="text-gradient">ecosistema crítico</span>
              </h2>
              <a
                href="https://osctopsolutionsgroup.com/informativo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF0057] hover:gap-3 transition-all duration-200 self-start lg:self-end"
              >
                Ver todos los artículos
                <ArrowUpRight size={16} />
              </a>
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimatedSection key={post.title} delay={i * 0.08}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white border border-gray-100 hover:border-gray-200 hover:shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 h-full cursor-pointer"
                >
                  {/* ── Image header ── */}
                  <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${post.categoryColor}dd 0%, ${post.categoryColor}88 50%, #0F172A 100%)` }}
                      >
                        <div className="text-center px-6">
                          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-2">LinkedIn</p>
                          <p className="text-white font-bold text-sm leading-snug opacity-80">{post.category}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span
                      className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full text-white shadow-sm"
                      style={{ background: post.categoryColor }}
                    >
                      {post.category}
                    </span>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/80 text-[10px] bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Clock size={10} />
                      {post.readTime}
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-[#0F172A] font-bold text-[15px] leading-snug mb-3 flex-1 group-hover:text-[#FF0057] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-light leading-relaxed mb-5 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-slate-300 text-[11px] font-medium">{post.date}</span>
                      <div className="flex items-center gap-1 text-slate-300 group-hover:text-[#FF0057] transition-colors duration-300">
                        <span className="text-[11px] font-bold">Leer más</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
