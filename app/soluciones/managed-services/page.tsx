import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, ORG_ID, CERTIFICATIONS, AREA_SERVED } from "@/lib/seo";
import {
  ArrowRight, ChevronRight, Shield, Eye, Wifi, Radio, Briefcase,
  ArrowUpRight,
  Server, Zap, AlertTriangle, Activity, Globe, MonitorDot, CheckCircle2,
  BookOpen, FileText,
} from "lucide-react";

const ACCENT = "#FF0057";
const DARK = "#0F172A";

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Managed Services NOC SOC 24/7 LATAM | OSC Top Solutions",
  description:
    "NOC/SOC 24/7 como servicio, BPO técnico y workforce management para telecom e infraestructura crítica. Escale su operación en 16 países sin ampliar nómina. ISO 27001 + ISO 9001.",
  keywords: [
    "managed services NOC SOC LATAM",
    "NOC 24/7 infraestructura crítica",
    "SOC como servicio",
    "BPO telecomunicaciones",
    "workforce management telecom",
    "operación gestionada LATAM",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/soluciones/managed-services` },
  openGraph: {
    title: "Managed Services NOC SOC 24/7 LATAM | OSC Top Solutions",
    description:
      "NOC/SOC 24/7, BPO técnico y gestión de talento en 16 países. Escale operaciones sin ampliar nómina.",
    type: "website",
    url: `${SITE_URL}/soluciones/managed-services`,
  },
};

/* ─── DATA ─── */
const differentials = [
  {
    Icon: Briefcase,
    title: "Workforce on-demand sin carga administrativa",
    description:
      "Personal técnico especializado activado según su demanda real, con incorporación, gestión de desempeño y administración de nómina completamente externalizadas.",
  },
  {
    Icon: Activity,
    title: "BPO operacional con SLA garantizado",
    description:
      "NOC, SOC, PMO, Mesa de Ayuda y soporte TI como servicio gestionado, con KPIs contractuales y un solo punto de contacto para toda la operación.",
  },
  {
    Icon: Zap,
    title: "Escalabilidad inmediata",
    description:
      "Aumenta o reduce el alcance del servicio trimestralmente sin penalidades. La demanda variable no debería generar costos fijos estructurales.",
  },
  {
    Icon: Shield,
    title: "Transformación sin disrupción",
    description:
      "Plan de transferencia de conocimiento estructurado, período de estabilización supervisado y continuidad total del servicio durante la transición.",
  },
];

const services = [
  {
    Icon: Briefcase,
    title: "Gestión Integral de Talento",
    description:
      "Selección, contratación, incorporación, evaluación de desempeño y desvinculación de perfiles técnicos especializados con total cobertura administrativa.",
  },
  {
    Icon: Server,
    title: "Personal Técnico Especializado",
    description:
      "Ingenieros de red, técnicos de campo, analistas de seguridad y perfiles TI por proyecto, tiempo parcial o dedicación completa.",
  },
  {
    Icon: Activity,
    title: "NOC y SOC como Servicio",
    description:
      "Tercerización completa de NOC (monitoreo de red) y SOC (seguridad) con Mesa de Ayuda integrada y gestión de incidentes bajo ITIL.",
  },
  {
    Icon: Zap,
    title: "Gestión de Proyectos (PMO)",
    description:
      "Planificación, seguimiento, reportería ejecutiva, auditorías de servicio y supervisión de nodos en campo bajo metodología estructurada.",
  },
  {
    Icon: Shield,
    title: "Soporte TI y Smart Support",
    description:
      "Soporte técnico de primer, segundo y tercer nivel con base de conocimiento, gestión de activos y desarrollo de software a medida.",
  },
  {
    Icon: Globe,
    title: "Contact Center as a Service",
    description:
      "CCaaS con agentes especializados en telecomunicaciones e infraestructura para atención a clientes, activaciones y soporte técnico remoto.",
  },
  {
    Icon: Radio,
    title: "Operaciones en Sitio",
    description:
      "Logística directa e inversa, gestión de almacén, entrega de equipos y administración de acceso a sitios de telecomunicaciones.",
  },
  {
    Icon: MonitorDot,
    title: "Administración de nómina",
    description:
      "Gestión completa de nómina, beneficios, cumplimiento laboral y coordinación con RRHH del cliente sin carga operativa interna.",
  },
];

const partners = [
  { name: "Nokia", logo: "/Logo partners/nokia.png" },
  { name: "IFX Networks", logo: "/Logo partners/ifx.png" },
  { name: "EVIDEN", logo: "/Logo partners/EVIDEN.png" },
  { name: "Gold Data", logo: "/Logo partners/gold data.png" },
  { name: "Cotel", logo: "/Logo partners/cotel.png" },
  { name: "ANTUBAY", logo: "/Logo partners/ANTUBAY.png" },
];

const certifications = [
  {
    code: "ISO 27001",
    name: "Seguridad de la Información",
    validity: "Válido hasta dic. 2027",
    description:
      "Garantiza confidencialidad, integridad y disponibilidad de datos y sistemas de información.",
  },
  {
    code: "IEC 62443",
    name: "Seguridad de Sistemas OT",
    validity: "Válido hasta nov. 2027",
    description:
      "Estándar global para ciberseguridad en infraestructura crítica y sistemas de control industrial.",
  },
  {
    code: "ISO 9001",
    name: "Gestión de Calidad",
    validity: "Válido hasta mar. 2027",
    description:
      "Aseguramiento de calidad en procesos operativos del NOC-SOC. Revisión y mejora continua certificadas.",
  },
];

const insight = {
  caseStudy: {
    client: "Banco Regional — Colombia",
    sector: "Servicios Financieros",
    context: "NOC interno de 18 personas con costos crecientes y MTTR fuera de SLA regulatorio bancario.",
    before: ["Costo NOC/mes: base 100", "MTTR incidentes P1: 3.2 horas", "Satisfacción interna: 52%"],
    after: ["Costo NOC/mes: base 61", "MTTR incidentes P1: 28 minutos", "Satisfacción interna: 91%"],
    improvement: "−39% costo · −85% MTTR",
    quote: "Migrar el NOC a OSC fue la mejor decisión de transformación operativa del año.",
  },
  whitepaper: {
    title: "El modelo BPO especializado para telecomunicaciones e infraestructura crítica",
    desc: "Guía ejecutiva para COOs y directores de operaciones sobre cómo estructurar servicios gestionados de NOC, SOC, PMO y workforce que reducen costos sin sacrificar calidad ni control.",
  },
  datasheet: {
    title: "Managed Operations — Servicios gestionados, modelo SLA y estructura de precios",
    desc: "Ficha técnica con catálogo de servicios, KPIs contractuales, tiempos de activación, modelos de engagement y estructura de precios para NOC, SOC, BPO y Workforce Management.",
  },
};

const faq = [
  {
    q: "¿Cómo garantizan la calidad del personal técnico que proveen?",
    a: "Todos los perfiles pasan por un proceso de selección técnica con evaluación práctica, verificación de antecedentes y certificaciones. Mantenemos un banco activo de más de 200 perfiles pre-evaluados por especialidad y país. Además, los primeros 30 días incluyen un período de evaluación con opción de reemplazo sin costo.",
  },
  {
    q: "¿Podemos escalar o reducir el equipo según demanda estacional?",
    a: "Sí. El modelo está diseñado para variabilidad. Podemos aumentar o reducir el alcance trimestralmente sin penalidades. La única restricción es un aviso de 30 días para reducciones significativas (>20% del equipo) para garantizar la transferencia de conocimiento adecuada.",
  },
  {
    q: "¿Cómo funciona la transición de un NOC interno a modelo gestionado?",
    a: "La transición toma entre 8 y 16 semanas en tres fases: (1) Auditoría y documentación del estado actual, (2) período de operación en paralelo con el equipo interno, (3) transferencia completa con SLAs activos. El equipo interno no es desvinculado de golpe — se hace una transición ordenada.",
  },
  {
    q: "¿Tienen habilitaciones de seguridad para trabajar en infraestructuras gubernamentales?",
    a: "Sí. Contamos con personal con habilitaciones de seguridad en múltiples países de la región para trabajo en instalaciones clasificadas, bases militares, aeropuertos y otras infraestructuras con requisitos de seguridad elevados.",
  },
  {
    q: "¿Cómo manejan la confidencialidad de los datos de nuestros clientes finales?",
    a: "Operamos bajo acuerdos de confidencialidad estrictos con cada cliente. Nuestras políticas de seguridad de datos cumplen ISO 27001 y son auditadas anualmente. El personal operativo solo accede a la información necesaria para su función, con trazabilidad completa de accesos.",
  },
  {
    q: "¿Cuál es el modelo de precios? ¿Hay compromisos de volumen mínimo?",
    a: "Ofrecemos tres modelos: (1) por posición/recurso mensual, (2) fee fijo por servicio gestionado con SLA, y (3) modelo mixto para operaciones complejas. El volumen mínimo depende del servicio — algunos como PMO o NOC requieren un mínimo para ser sostenibles. Lo definimos en la propuesta técnica.",
  },
];

const otherSolutions = [
  { slug: "critical-infrastructure-security", name: "Critical Infrastructure Security", desc: "Ciberseguridad convergente OT/IT",       Icon: Shield },
  { slug: "ai-powered-operations",            name: "AI-Powered Operations",            desc: "Inteligencia operativa y video analítica", Icon: Eye    },
  { slug: "connectivity-telecom",             name: "Connectivity & Telecom",           desc: "Redes críticas, ingeniería y NOC 24/7",   Icon: Wifi   },
];

/* ─── JSON-LD ─── */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/soluciones/managed-services/#service`,
  name: "Managed Operations — NOC, SOC, BPO y Workforce Management",
  description:
    "NOC/SOC 24/7, BPO técnico especializado y gestión de workforce para telecomunicaciones e infraestructuras críticas en 16 países LATAM.",
  provider: { "@id": ORG_ID },
  areaServed: AREA_SERVED,
  serviceType: "Managed Services — NOC/SOC/BPO",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Operación Gestionada",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "NOC 24/7 como servicio" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SOC como servicio — Threat Monitoring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "BPO técnico especializado telecomunicaciones" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workforce Management y talento técnico on-demand" } },
    ],
  },
  hasCredential: CERTIFICATIONS,
  url: `${SITE_URL}/soluciones/managed-services`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",       item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Soluciones", item: `${SITE_URL}/soluciones` },
    { "@type": "ListItem", position: 3, name: "Managed Operations", item: `${SITE_URL}/soluciones/managed-services` },
  ],
};

/* ─── PAGE ─── */
export default function ManagedServicesPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      {/* ═══════════════════════════════════════
          01 · HERO — CSS gradient background
      ═══════════════════════════════════════ */}
      <section
        className="relative pt-28 pb-20 overflow-hidden flex flex-col justify-center min-h-[520px]"
      >
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/HeroBanner Managed Services.png')" }}
        />
        {/* Overlay oscuro para legibilidad */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(10,18,40,0.90) 0%, rgba(10,18,40,0.72) 55%, rgba(10,18,40,0.35) 100%)" }}
        />
        {/* Accent glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${ACCENT}15 0%, transparent 60%)`,
            transform: "translate(25%, -25%)",
          }}
        />

        {/* ── Content ── */}
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          {/* Breadcrumb */}
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-white/35 text-xs mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/65 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <Link href="/soluciones" className="hover:text-white/65 transition-colors">Soluciones</Link>
              <ChevronRight size={12} />
              <span className="text-white/55">Managed Operations</span>
            </nav>
          </AnimatedSection>

          <AnimatedSection className="max-w-2xl">
            {/* H1 */}
            <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-bold text-white mb-6 leading-[1.06]">
              Managed Operations
            </h1>

            {/* Sub-claim */}
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              Transformamos la complejidad de gestionar talento especializado y operaciones técnicas en ventaja competitiva —{" "}
              <span className="text-white font-medium">
                con servicios administrados que se adaptan a su demanda sin carga administrativa.
              </span>
            </p>

            {/* CTA */}
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-bold px-7 py-4 rounded-full text-sm text-white transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
              style={{ background: ACCENT, boxShadow: `0 4px 24px ${ACCENT}50` }}
            >
              Evaluar modelo operativo actual <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          01b · STATS
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* H2 */}
          <AnimatedSection className="mb-14 max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              El costo de operar lo que deberías{" "}
              <span style={{ color: ACCENT }}>delegar</span>
            </h2>
          </AnimatedSection>

          {/* 4 stat cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-3xl overflow-hidden">
            {[
              {
                stat: "45 días",
                context: "Para contratar un perfil técnico",
                detail: "tiempo promedio de reclutamiento de talento especializado en redes y seguridad en LATAM, sin garantía de retención.",
              },
              {
                stat: "3.2 h",
                context: "MTTR con NOC interno",
                detail: "tiempo medio de resolución de incidentes P1 en organizaciones que operan su propio NOC sin certificación ITIL.",
              },
              {
                stat: "22%",
                context: "Sobrecosto en proyectos sin PMO",
                detail: "desviación promedio de presupuesto en proyectos TI gestionados sin oficina de proyectos formal ni metodología estructurada.",
              },
              {
                stat: "75%",
                context: "Proyectos fuera de tiempo",
                detail: "de los proyectos de infraestructura crítica no se entregan en el plazo acordado cuando no hay un integrador único responsable.",
              },
            ].map(({ stat, context, detail }, i) => (
              <AnimatedSection key={stat} delay={i * 0.08}>
                <div
                  className="group flex flex-col p-8 lg:p-10 h-full relative overflow-hidden hover:bg-white/[0.03] transition-colors duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.025)" }}
                >
                  {/* Accent line top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }}
                  />

                  {/* Stat */}
                  <p
                    className="font-black text-4xl lg:text-5xl tabular-nums leading-none mb-4"
                    style={{ color: ACCENT }}
                  >
                    {stat}
                  </p>

                  {/* Context label */}
                  <p className="text-white font-semibold text-sm mb-2">{context}</p>

                  {/* Detail */}
                  <p className="text-white/40 text-sm font-light leading-relaxed flex-1">{detail}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          02 · DIFERENCIALES OSC
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* ── Section header ── */}
          <AnimatedSection className="mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
                Por qué OSC
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight">
              Diferenciales de OSC para escalar operaciones{" "}
              <span style={{ color: ACCENT }}>sin escalar su equipo</span>
            </h2>
          </AnimatedSection>

          {/* ── 4 differential cards ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentials.map(({ Icon, title, description }, i) => (
              <AnimatedSection key={title} delay={i * 0.08}>
                <div className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl p-8 h-full hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 relative overflow-hidden">
                  {/* Accent top line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}18` }}
                  >
                    <Icon size={22} style={{ color: ACCENT }} />
                  </div>

                  {/* Divider accent */}
                  <div
                    className="w-8 h-[2px] rounded-full mb-5 transition-all duration-500 group-hover:w-14"
                    style={{ backgroundColor: ACCENT }}
                  />

                  {/* Title */}
                  <h3 className="text-[#0F172A] font-bold text-base leading-snug mb-3">{title}</h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-1">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          02b · SERVICIOS
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />
        {/* Accent glow */}
        <div
          className="absolute bottom-0 left-0 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${ACCENT}07 0%, transparent 65%)`,
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <AnimatedSection className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
                Servicios
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight max-w-xl">
              Operación gestionada de extremo a extremo,{" "}
              <span style={{ color: ACCENT }}>sin puntos ciegos</span>
            </h2>
          </AnimatedSection>

          {/* Service cards — 3 col grid for 8 services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ Icon, title, description }, i) => (
              <AnimatedSection key={title} delay={i * 0.07}>
                <div
                  className="group flex flex-col p-7 rounded-2xl border border-white/8 hover:border-white/18 transition-all duration-300 relative overflow-hidden h-full cursor-default"
                  style={{ backgroundColor: "rgba(255,255,255,0.035)" }}
                >
                  {/* Hover gradient fill */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}07 0%, transparent 55%)` }}
                  />
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0 relative transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${ACCENT}14`, border: `1px solid ${ACCENT}28` }}
                  >
                    <Icon size={22} style={{ color: ACCENT }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base leading-snug mb-3 relative">{title}</h3>

                  {/* Description */}
                  <p className="text-white/45 text-sm font-light leading-relaxed flex-1 relative">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          04 · PARTNERS / STACK
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">
                Tecnologías que integramos
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A]">
                Plataformas que potencian la operación gestionada
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100">
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="bg-white flex items-center justify-center px-6 py-8 hover:bg-slate-50 transition-colors duration-200"
                  style={{ minHeight: 96 }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-w-full object-contain grayscale hover:grayscale-0 opacity-40 hover:opacity-90 transition-all duration-300"
                    style={{ maxHeight: 40, maxWidth: 100 }}
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          05 · CERTIFICACIONES
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: ACCENT }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
              Certificaciones vigentes
            </span>
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight max-w-xl">
                Madurez verificable,{" "}
                <span style={{ color: ACCENT }}>no solo declarada</span>
              </h2>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#0F172A] transition-colors"
              >
                Ver Sistema de Gestión Integrado <ArrowUpRight size={13} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <AnimatedSection key={cert.code} delay={i * 0.08}>
                <div className="group border border-slate-200/80 rounded-2xl p-8 hover:border-slate-300 hover:shadow-md transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }}
                  />

                  {/* Code badge */}
                  <div
                    className="inline-flex items-center font-black text-base px-4 py-1.5 rounded-xl mb-5 w-fit"
                    style={{ backgroundColor: `${ACCENT}10`, color: ACCENT }}
                  >
                    {cert.code}
                  </div>

                  <h3 className="text-[#0F172A] font-bold text-lg mb-1">{cert.name}</h3>

                  {/* Validity */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {cert.validity}
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-1">
                    {cert.description}
                  </p>

                  <div
                    className="mt-6 h-px w-8 group-hover:w-14 rounded-full transition-all duration-500"
                    style={{ backgroundColor: ACCENT }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          06 · INSIGHTS
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">

          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
                Insights
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight max-w-xl">
              Caso de éxito y{" "}
              <span style={{ color: ACCENT }}>recursos técnicos</span>
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Case study ── */}
            <AnimatedSection delay={0}>
              <div className="bg-[#0F172A] rounded-2xl overflow-hidden h-full flex flex-col border border-white/8">
                <div className="p-6 border-b border-white/10">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-3 inline-block"
                    style={{ color: ACCENT, backgroundColor: `${ACCENT}15` }}
                  >
                    {insight.caseStudy.sector}
                  </span>
                  <h3 className="text-white font-bold text-base">{insight.caseStudy.client}</h3>
                  <p className="text-white/40 text-xs mt-1 font-light leading-snug">{insight.caseStudy.context}</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/10 flex-1">
                  <div className="p-5">
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-3">Antes</p>
                    <ul className="space-y-2">
                      {insight.caseStudy.before.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <AlertTriangle size={11} className="shrink-0 mt-0.5 text-slate-500" />
                          <span className="text-slate-400 text-xs font-light leading-tight">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5" style={{ backgroundColor: `${ACCENT}05` }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT, opacity: 0.7 }}>
                      Después
                    </p>
                    <ul className="space-y-2">
                      {insight.caseStudy.after.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: ACCENT }} />
                          <span className="text-white/70 text-xs font-light leading-tight">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-white/10" style={{ backgroundColor: `${ACCENT}08` }}>
                  <p className="font-black text-sm" style={{ color: ACCENT }}>{insight.caseStudy.improvement}</p>
                  {insight.caseStudy.quote && (
                    <p className="text-white/50 text-xs italic mt-2 leading-snug">&ldquo;{insight.caseStudy.quote}&rdquo;</p>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* ── Whitepaper ── */}
            <AnimatedSection delay={0.1}>
              <div className="group bg-white border border-slate-200/80 rounded-2xl p-7 h-full flex flex-col hover:border-slate-300 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}18` }}
                >
                  <BookOpen size={22} style={{ color: ACCENT }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block" style={{ color: ACCENT }}>
                  Whitepaper
                </span>
                <h3 className="text-[#0F172A] font-bold text-base leading-snug mb-3">{insight.whitepaper.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed flex-1">{insight.whitepaper.desc}</p>
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  Solicitar documento <ArrowUpRight size={13} />
                </Link>
              </div>
            </AnimatedSection>

            {/* ── Datasheet ── */}
            <AnimatedSection delay={0.15}>
              <div className="group bg-white border border-slate-200/80 rounded-2xl p-7 h-full flex flex-col hover:border-slate-300 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}18` }}
                >
                  <FileText size={22} style={{ color: ACCENT }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block" style={{ color: ACCENT }}>
                  Datasheet
                </span>
                <h3 className="text-[#0F172A] font-bold text-base leading-snug mb-3">{insight.datasheet.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed flex-1">{insight.datasheet.desc}</p>
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  Solicitar documento <ArrowUpRight size={13} />
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          07 · FAQ — compact 2-col
      ═══════════════════════════════════════ */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">

            {/* ── Left: sticky title ── */}
            <AnimatedSection className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px" style={{ backgroundColor: ACCENT }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                  FAQ
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] leading-tight">
                Lo que preguntan los{" "}
                <span style={{ color: ACCENT }}>decisores antes de delegar</span>
              </h2>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                Respuestas directas a las dudas más comunes de COOs y líderes operativos.
              </p>
            </AnimatedSection>

            {/* ── Right: compact accordion ── */}
            <AnimatedSection delay={0.05}>
              <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl bg-white overflow-hidden">
                {faq.map((item, i) => (
                  <details key={i} className="group">
                    <summary className="flex items-center gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-slate-50/60 transition-colors duration-150">
                      {/* Number */}
                      <span className="text-[10px] font-black tabular-nums shrink-0 w-5 text-slate-300 group-open:text-[#FF0057] transition-colors duration-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Question */}
                      <span className="text-[#0F172A] font-semibold text-sm leading-snug flex-1 group-open:text-[#FF0057] transition-colors duration-200">
                        {item.q}
                      </span>

                      {/* Toggle */}
                      <ChevronRight
                        size={14}
                        className="shrink-0 rotate-90 group-open:-rotate-90 transition-transform duration-300 text-slate-300 group-open:text-[#FF0057]"
                      />
                    </summary>

                    {/* Answer */}
                    <div className="px-6 pb-5 pt-1 pl-[3.75rem]">
                      <p className="text-slate-500 text-sm font-light leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          08 · CTA FINAL — red
      ═══════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 25% 50%, rgba(255,255,255,0.1) 0%, transparent 55%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            {/* Text */}
            <AnimatedSection direction="left">
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
                Managed Operations · OSC Top Solutions
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Opera más con menos fricción interna.
              </h2>
              <p className="text-white/75 text-lg font-light leading-relaxed max-w-lg">
                Evaluamos su modelo operativo actual y diseñamos el esquema de servicios gestionados que{" "}
                <span className="font-semibold text-white">libera a su equipo para enfocarse en lo estratégico.</span>
              </p>
            </AnimatedSection>

            {/* Actions */}
            <AnimatedSection direction="right" delay={0.1} className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
                style={{ color: ACCENT }}
              >
                Evaluar modelo operativo <ArrowRight size={16} />
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
