import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, ORG_ID, CERTIFICATIONS, AREA_SERVED } from "@/lib/seo";
import {
  ArrowRight, ChevronRight, Shield, Eye, Wifi, Briefcase,
  ArrowUpRight, Lock,
  Server, Zap, AlertTriangle, Activity, Globe, MonitorDot, CheckCircle2,
  BookOpen, FileText,
} from "lucide-react";

const ACCENT = "#FF0057";
const DARK = "#0F172A";

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Ciberseguridad OT Infraestructura Crítica LATAM | OSC",
  description:
    "Zero Trust, IEC 62443 e ISO 27001 para entornos OT/IT convergentes. NOC-SOC 24/7, MTTR < 15 min garantizado. Diagnóstico ejecutivo de madurez OT sin costo en 16 países LATAM.",
  keywords: [
    "ciberseguridad OT infraestructura crítica LATAM",
    "IEC 62443",
    "ISO 27001 infraestructura crítica",
    "Zero Trust OT IT",
    "NOC SOC 24/7 LATAM",
    "ciberseguridad industrial",
    "convergencia OT IT",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/soluciones/cross-protection` },
  openGraph: {
    title: "Ciberseguridad OT Infraestructura Crítica LATAM | OSC Top Solutions",
    description:
      "MTTR < 15 min · ISO 27001 + IEC 62443 · NOC-SOC 24/7 en 16 países. Protección sin interrumpir la operación.",
    type: "website",
    url: `${SITE_URL}/soluciones/cross-protection`,
  },
};

/* ─── DATA ─── */
const differentials = [
  {
    Icon: Server,
    title: "Arquitectura para Infraestructura Crítica",
    description:
      "Diseñamos soluciones a medida que garantizan la continuidad operativa en los entornos más complejos y exigentes.",
  },
  {
    Icon: Activity,
    title: "Resiliencia y Resultados",
    description:
      "Blindamos la rentabilidad del negocio, asegurando que la ciberseguridad sea un motor de crecimiento y no un obstáculo.",
  },
  {
    Icon: Zap,
    title: "Convergencia IT/OT Protegida",
    description:
      "Seguridad integral desde la planta hasta la nube, con un enfoque proactivo centrado en la neutralización de amenazas.",
  },
  {
    Icon: Globe,
    title: "Ecosistema Global",
    description:
      "Respaldo total a través de alianzas estratégicas con los líderes tecnológicos mundiales para resolver retos locales.",
  },
];

const services = [
  {
    Icon: Server,
    title: "Gestión de terminales (TI/OT)",
    description:
      "Protección unificada de estaciones de trabajo, servidores, PLCs y HMIs. Visibilidad completa del parque de dispositivos IT y OT desde un solo panel.",
    tags: ["EDR", "Asset Discovery", "Patch Mgmt"],
  },
  {
    Icon: Wifi,
    title: "Protección básica 4G/5G",
    description:
      "Seguridad perimetral para redes privadas 4G y 5G. Segmentación, microsegmentación y control de tráfico en entornos de conectividad móvil crítica.",
    tags: ["4G/5G Privada", "Micro-segmentación", "SD-WAN"],
  },
  {
    Icon: Lock,
    title: "Zero Trust y Gestión de acceso",
    description:
      "Acceso privilegiado mínimo en entornos convergentes OT/IT. Autenticación multifactor, gestión de identidades y control granular por activo.",
    tags: ["MFA", "PAM", "IAM"],
  },
  {
    Icon: Shield,
    title: "Seguridad Perimetral (TI/OT)",
    description:
      "Firewall de siguiente generación, IDS/IPS y zona desmilitarizada industrial (IDMZ). Separación efectiva entre redes corporativas y de control.",
    tags: ["NGFW", "IDS/IPS", "IDMZ"],
  },
  {
    Icon: MonitorDot,
    title: "Red Automatizada Monitoreo",
    description:
      "Monitoreo continuo y automatizado de la red en tiempo real. Correlación de eventos, detección de anomalías y respuesta inmediata ante incidentes.",
    tags: ["SIEM", "SOAR", "Threat Hunting"],
  },
];


const partners = [
  { name: "Fortinet", category: "Firewall & SD-WAN",      logo: "/soluciones/cross-protection/partners/fortinet.png" },
  { name: "Lumu",     category: "Threat Detection · NDR", logo: "/soluciones/cross-protection/partners/lumu.png"     },
  { name: "Nozomi",   category: "OT / ICS Security",      logo: "/soluciones/cross-protection/partners/nozomi.png"   },
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
    client: "Puerto de Santos",
    sector: "Puertos & Logística",
    context: "Terminal con vulnerabilidades OT no detectadas en sistemas de grúas y acceso.",
    before: ["MTTR: 8 horas", "Incidentes P1/P2: 12/año", "Visibilidad OT: < 40%"],
    after: ["MTTR: 15 minutos", "Incidentes P1/P2: 2/año", "Visibilidad OT: 100%"],
    improvement: "−95% MTTR · −83% incidentes",
    quote: "OSC se convirtió en un socio crítico para nuestra continuidad operativa.",
  },
  whitepaper: {
    title: "Convergencia OT/IT: Marco de referencia para infraestructura crítica resiliente",
    desc: "Guía ejecutiva para CISOs y líderes OT sobre cómo diseñar arquitecturas de ciberseguridad convergentes que protejan la continuidad operativa sin interrumpir la producción.",
  },
  datasheet: {
    title: "Critical Infrastructure Security — Capacidades técnicas y SLAs",
    desc: "Ficha técnica completa con capacidades del servicio, SLAs contractuales, integraciones certificadas y modelo de precios para entornos OT/IT convergentes.",
  },
};

const faq = [
  {
    q: "¿Qué diferencia a OSC en ciberseguridad OT frente a vendors tradicionales?",
    a: "Llevamos 30 años operando infraestructuras OT reales — no solo instalando software. Nuestro NOC-SOC entiende las dinámicas de control industrial (SCADA, PLCs, DCS) con la misma profundidad que los entornos TI. IEC 62443 no es una certificación que obtenemos para vender; es el estándar con el que operamos desde el primer día.",
  },
  {
    q: "¿Cuál es el MTTR garantizado por SLA?",
    a: "El MTTR (Mean Time To Respond) contractual es de < 15 minutos para incidentes P1. Nuestro NOC prioriza por impacto operacional, no por volumen de alertas. La respuesta incluye contención, notificación y primer diagnóstico — no solo el acuse de recibo.",
  },
  {
    q: "¿El despliegue requiere downtime? ¿Cuánto tiempo toma el onboarding?",
    a: "Zero downtime. Utilizamos un enfoque de despliegue pasivo-primero: sensores en modo observación durante las primeras semanas antes de activar capacidades de contención. El onboarding completo toma entre 4 y 10 semanas dependiendo de la complejidad del entorno. El piloto operativo se activa desde la semana 4.",
  },
  {
    q: "¿Son agnósticos de vendor o nos empujan hacia tecnologías propias?",
    a: "Somos 100% agnósticos. Integramos Fortinet, Palo Alto, Tenable, Rapid7, Claroty, Splunk y cualquier stack existente. No hay lock-in: usted es dueño de sus datos, configuraciones y licencias. OSC provee el layer de integración y operación, no el vendor único.",
  },
  {
    q: "¿Cumple con NERC CIP, Habeas Data, LGPD y marcos regulatorios regionales?",
    a: "Sí. La certificación ISO 27001 + IEC 62443 cubre la base de todos los marcos regulatorios aplicables en LATAM. Para NERC CIP (mercados eléctricos), tenemos casos documentados de migración de entornos con hallazgos a cero hallazgos en auditoría. Nuestra política de privacidad es multi-jurisdicción y está disponible en /legal.",
  },
  {
    q: "¿Cómo funciona el modelo de precios? ¿Hay CAPEX?",
    a: "Modelo SaaS predecible: tecnología + operación 24/7 en un único fee mensual. Sin CAPEX oculto ni sorpresas. El SLA publicado incluye 99.95% de disponibilidad, MTTR < 15 min y tiempo de respuesta P1 < 1 hora. Puedes escalar o reducir el alcance trimestralmente sin penalidades.",
  },
];

const otherSolutions = [
  { slug: "ai-powered-operations",        name: "AI-Powered Operations",          desc: "Inteligencia operativa y video analítica",  Icon: Eye       },
  { slug: "connectivity-telecom",         name: "Connectivity & Telecom",          desc: "Redes críticas, ingeniería y NOC 24/7",     Icon: Wifi      },
  { slug: "managed-operations",           name: "Managed Operations",              desc: "NOC · SOC · BPO on-demand",                Icon: Briefcase },
];

/* ─── JSON-LD ─── */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/soluciones/cross-protection/#service`,
  name: "Critical Infrastructure Security — Ciberseguridad OT/IT Convergente",
  alternateName: "Ciberseguridad OT infraestructura crítica",
  description:
    "Protección OT/IT convergente con Zero Trust, NOC-SOC 24/7 y MTTR < 15 min. IEC 62443 + ISO 27001 vigentes.",
  provider: { "@id": ORG_ID },
  areaServed: AREA_SERVED,
  serviceType: "Ciberseguridad OT/IT",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Ciberseguridad OT/IT",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "NOC-SOC 24/7 con MTTR < 15 min" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Arquitectura Zero Trust OT/IT" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IEC 62443 Compliance & Assessment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Threat Detection & Response NDR" } },
    ],
  },
  hasCredential: CERTIFICATIONS,
  url: `${SITE_URL}/soluciones/cross-protection`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",      item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Soluciones", item: `${SITE_URL}/soluciones` },
    { "@type": "ListItem", position: 3, name: "Critical Infrastructure Security", item: `${SITE_URL}/soluciones/cross-protection` },
  ],
};

/* ─── PAGE ─── */
export default function CrossProtectionPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, faqSchema, breadcrumbSchema]} />
      {/* ═══════════════════════════════════════
          01 · HERO — full-bleed image background
      ═══════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 overflow-hidden flex flex-col justify-center min-h-[520px]">
        {/* Background image */}
        <Image
          src="/soluciones/cross-protection/hero/herobanner.png"
          alt="Cross Protection — Ciberseguridad OT/IT"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/80" />
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />
        {/* Accent glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${ACCENT}10 0%, transparent 60%)`,
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
              <span className="text-white/55">Critical Infrastructure Security</span>
            </nav>
          </AnimatedSection>

          <AnimatedSection className="max-w-2xl">
            {/* H1 */}
            <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-bold text-white mb-6 leading-[1.06]">
              Critical Infrastructure Security
            </h1>

            {/* Sub-claim */}
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              Detectamos y neutralizamos amenazas sin detener su operación.{" "}
              <span className="text-white font-medium">
                Reduzca el costo operacional de los incidentes
              </span>{" "}
              con una respuesta experta y cumplimiento verificable en cada paso.
            </p>

            {/* CTA — solo uno */}
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-bold px-7 py-4 rounded-full text-sm text-white transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
              style={{ background: ACCENT, boxShadow: `0 4px 24px ${ACCENT}50` }}
            >
              Agendar evaluación de ciberseguridad <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          01b · CONTEXTO — stats de riesgo
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* H2 */}
          <AnimatedSection className="mb-14 max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Blindando el Valor y la Continuidad Operativa de la{" "}
              <span style={{ color: ACCENT }}>Infraestructura Crítica</span>
            </h2>
          </AnimatedSection>

          {/* 4 stat cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-3xl overflow-hidden">
            {[
              {
                stat: "$5.08 MDD",
                context: "Costo promedio de una brecha",
                detail: "en infraestructura crítica — riesgo directo al EBITDA anual.",
              },
              {
                stat: "+35%",
                context: "Más ataques en LATAM",
                detail: "que el promedio global, con más de 2,600 intentos semanales por empresa.",
              },
              {
                stat: "108 días",
                context: "Reducción del impacto",
                detail: "con IA y automatización, ahorrando hasta $1.8 MDD por incidente.",
              },
              {
                stat: "2%",
                context: "De la facturación global",
                detail: "en multas por nuevas normativas, con responsabilidad directa a la junta directiva.",
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
              Diferenciales de OSC para garantizar la{" "}
              <span style={{ color: ACCENT }}>resiliencia en infraestructura crítica</span>
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
              Protección de extremo a extremo,{" "}
              <span style={{ color: ACCENT }}>sin puntos ciegos</span>
            </h2>
          </AnimatedSection>

          {/* Service cards — 5 col grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
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
                Integramos el mejor stack para su entorno
              </h2>
            </div>
          </AnimatedSection>

          {/* Logo strip — grayscale → color on hover */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-slate-100 border border-slate-100 rounded-3xl overflow-hidden">
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="group flex-1 flex flex-col items-center justify-center py-14 px-10 hover:bg-[#F8FAFC] transition-colors duration-300 cursor-default"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-11 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
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
                <span style={{ color: ACCENT }}>decisores antes de firmar</span>
              </h2>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                Respuestas directas a las dudas más comunes de CISOs y líderes operativos.
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
                Critical Infrastructure Security · OSC Top Solutions
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                ¿Su infraestructura crítica está realmente protegida?
              </h2>
              <p className="text-white/75 text-lg font-light leading-relaxed max-w-lg">
                Realizamos un diagnóstico ejecutivo de madurez de ciberseguridad OT/IT para identificar brechas reales{" "}
                <span className="font-semibold text-white">antes de que lo haga un atacante.</span>
              </p>
            </AnimatedSection>

            {/* Actions */}
            <AnimatedSection direction="right" delay={0.1} className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
                style={{ color: ACCENT }}
              >
                Agendar diagnóstico ejecutivo <ArrowRight size={16} />
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
