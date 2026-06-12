import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, ORG_ID, CERTIFICATIONS, AREA_SERVED } from "@/lib/seo";
import {
  ArrowRight, ChevronRight, Shield, Eye, Wifi, Radio, Briefcase,
  ArrowUpRight, Zap, Activity, Globe, MonitorDot, CheckCircle2,
  AlertTriangle, Brain, Camera, Lock, Navigation, Network,
  Video, Server, BookOpen, FileText,
} from "lucide-react";

const ACCENT = "#FF0057";

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Digital Twin e Inteligencia Operativa Infraestructura | OSC",
  description:
    "Gemelos digitales, videovigilancia con IA y analítica operativa para infraestructuras críticas. Reduce OPEX hasta 35%. +33,000 nodos monitoreados en 16 países LATAM.",
  keywords: [
    "digital twin infraestructura crítica",
    "videovigilancia IA industria",
    "gemelos digitales LATAM",
    "analítica operativa infraestructura",
    "SISE sistema integrado seguridad",
    "centro de comando unificado",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/soluciones/smart-solutions` },
  openGraph: {
    title: "Digital Twin e Inteligencia Operativa para Infraestructura Crítica | OSC",
    description:
      "Gemelos digitales, IA y videovigilancia analítica. Reduce OPEX hasta 35%, +33,000 nodos monitoreados.",
    type: "website",
    url: `${SITE_URL}/soluciones/smart-solutions`,
  },
};

/* ─── DATA ─── */
const differentials = [
  {
    Icon: Brain,
    title: "Analítica Cognitiva con IA",
    description:
      "Elevamos la seguridad mediante algoritmos de Deep Learning que automatizan la detección de eventos críticos en tiempo real. Reducimos la latencia de respuesta y eliminamos la ineficiencia del monitoreo convencional, transformando el video pasivo en inteligencia accionable.",
  },
  {
    Icon: Activity,
    title: "Resiliencia Predictiva",
    description:
      "Proyectamos el futuro de su infraestructura mediante la sincronización bidireccional de activos. Esta capacidad de mantenimiento prescriptivo de OSC asegura la máxima disponibilidad, mitigando riesgos y eliminando el impacto económico del downtime no programado.",
  },
  {
    Icon: MonitorDot,
    title: "Arquitectura de Comando Interoperable",
    description:
      "Gobernamos la complejidad integrando protocolos heterogéneos (IoT, PTT/PTV, VMS) en un ecosistema de Comando y Control unificado. Eliminamos los silos de información para garantizar una visión 360° que acelera la toma de decisiones al más alto nivel directivo.",
  },
  {
    Icon: Navigation,
    title: "Telemetría Avanzada y Control de Campo",
    description:
      "Maximizamos la productividad del capital humano y técnico mediante sensores de precisión y geofencing. Convertimos la data de campo en un activo estratégico para el cumplimiento de KPIs, garantizando un control granular absoluto sobre cada eslabón de la operación.",
  },
];

const services = [
  {
    Icon: Eye,
    title: "Videovigilancia",
    description:
      "Sistemas de cámaras con analítica embebida para detección de eventos, reconocimiento facial y alertas automáticas en tiempo real.",
  },
  {
    Icon: Lock,
    title: "Control de Acceso",
    description:
      "Soluciones de acceso físico y lógico integradas: biometría, tarjetas inteligentes y gestión centralizada de permisos.",
  },
  {
    Icon: Globe,
    title: "Gemelos Digitales",
    description:
      "Réplicas digitales de activos e instalaciones para monitoreo continuo, optimización de procesos y mantenimiento predictivo.",
  },
  {
    Icon: Navigation,
    title: "Seguimiento de Activos",
    description:
      "Trazabilidad en tiempo real de equipos, vehículos y personal mediante IoT y RFID, integrado con ERP y plataformas de despacho.",
  },
  {
    Icon: Radio,
    title: "Comunicaciones Operativas (PTT/PTV)",
    description:
      "Push-to-talk y push-to-video sobre redes LTE/5G privadas para coordinación operativa segura entre campo y centros de mando.",
  },
  {
    Icon: Network,
    title: "Optimización del tráfico IP",
    description:
      "Gestión inteligente del ancho de banda y QoS para priorizar tráfico crítico de video, voz y datos en redes convergentes.",
  },
  {
    Icon: Video,
    title: "Análisis de Video Avanzado",
    description:
      "IA aplicada al video: detección de comportamientos anómalos, reconocimiento de matrículas, conteo de personas y análisis forense.",
  },
  {
    Icon: Shield,
    title: "Plataformas de Seguridad Ciudadana",
    description:
      "Ecosistemas C4i/C5 que integran video analítica, comunicaciones de emergencia y despacho en un único centro de mando unificado.",
  },
  {
    Icon: Camera,
    title: "Cámaras como Sensores",
    description:
      "Transformamos cámaras en sensores multifunción capaces de detectar temperatura, humo, ruido y condiciones ambientales críticas.",
  },
  {
    Icon: Server,
    title: "Centros de datos modulares",
    description:
      "Infraestructura de cómputo modular y escalable desplegable en campo para procesamiento edge de video e IoT sin dependencia de nube.",
  },
];

const smartLogosRow1 = [
  { src: "/Logo partners/genetec.png",        name: "Genetec" },
  { src: "/Logo partners/milestone.jpg",       name: "Milestone" },
  { src: "/Logo partners/Verkada.png",         name: "Verkada" },
  { src: "/Logo partners/provision.png",       name: "Provision ISR" },
  { src: "/Logo partners/thermal radal.jpg",   name: "Thermal Radar" },
  { src: "/Logo partners/iss.png",             name: "ISS" },
  { src: "/Logo partners/hexagon.png",         name: "Hexagon" },
  { src: "/Logo partners/gold data.png",       name: "Gold Data" },
  { src: "/Logo partners/ifx.png",             name: "IFX Networks" },
  { src: "/Logo partners/cotel.png",           name: "Cotel" },
];

const smartLogosRow2 = [
  { src: "/Logo partners/ubiik.png",           name: "Ubiik" },
  { src: "/Logo partners/powerfleet.png",      name: "Powerfleet" },
  { src: "/Logo partners/vhive.png",           name: "vHive" },
  { src: "/Logo partners/traki.png",           name: "Traki" },
  { src: "/Logo partners/itron.png",           name: "Itron" },
  { src: "/Logo partners/Geosystem.png",       name: "Geosystem" },
  { src: "/Logo partners/nokia.png",           name: "Nokia" },
  { src: "/Logo partners/EVIDEN.png",          name: "Eviden" },
  { src: "/Logo partners/ANTUBAY.png",         name: "Antubay" },
  { src: "/Logo partners/EASYMETERING.png",    name: "Easymetering" },
];

const SmartLogoSlot = ({ src, name }: { src: string; name: string }) => (
  <div
    className="flex-shrink-0 mx-8 flex items-center justify-center"
    style={{ width: 130, height: 48 }}
  >
    <img
      src={src}
      alt={name}
      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 opacity-40 hover:opacity-90 transition-all duration-300"
    />
  </div>
);

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
    client: "Terminal Portuaria — Colombia",
    sector: "Puertos & Logística",
    context:
      "Puerto con 80 cámaras analógicas sin analítica, respuesta reactiva a incidentes y sin trazabilidad de vehículos.",
    before: ["Tiempo detección incidente: 45 min", "Falsos positivos: 120/día", "Trazabilidad vehículos: nula"],
    after: ["Tiempo detección incidente: 2 min", "Falsos positivos: 8/día", "Trazabilidad vehículos: 100%"],
    improvement: "−96% tiempo detección · −93% falsos positivos",
    quote: "Por primera vez sabemos qué pasa en el puerto en tiempo real.",
  },
  whitepaper: {
    title: "De cámaras a sensores: Cómo la IA transforma la infraestructura crítica",
    desc: "Guía técnica para líderes de seguridad y operaciones sobre cómo desplegar analítica de video con IA, gemelos digitales y centros de comando unificados sin reemplazar la infraestructura existente.",
  },
  datasheet: {
    title: "AI-Powered Operations — Plataforma SISE y capacidades técnicas",
    desc: "Ficha técnica con capacidades de videovigilancia analítica, control de acceso, gemelos digitales, PTT/PTV, seguimiento de activos y SLAs de la plataforma integrada.",
  },
};

const faq = [
  {
    q: "¿La analítica de video reemplaza mis cámaras actuales?",
    a: "No necesariamente. En la mayoría de los casos, integramos nuestra plataforma de analítica sobre la infraestructura de video existente mediante software en el edge o en la nube. La migración a cámaras con analítica embebida es opcional y se evalúa en la fase de diagnóstico.",
  },
  {
    q: "¿Cómo se integra con nuestros sistemas ERP y SCADA existentes?",
    a: "La plataforma SISE cuenta con conectores nativos para los principales ERP (SAP, Oracle), SCADA (Ignition, Wonderware) y sistemas de despacho. La integración se realiza mediante APIs estándar sin necesidad de reemplazar sistemas existentes.",
  },
  {
    q: "¿Qué tan precisa es la detección de IA? ¿Genera muchas falsas alarmas?",
    a: "La precisión varía entre 94% y 99% dependiendo del tipo de análisis y las condiciones del entorno. El proceso de calibración del modelo en las primeras semanas reduce los falsos positivos a menos de 10/día. Los modelos se ajustan continuamente con retroalimentación del operador.",
  },
  {
    q: "¿El sistema opera sin conectividad continua a Internet?",
    a: "Sí. Diseñamos arquitecturas edge-first donde el procesamiento de IA ocurre localmente. La conectividad a la nube se usa para sincronización, reportería y backups. La plataforma opera con autonomía completa en modo offline.",
  },
  {
    q: "¿Cuánto tiempo toma implementar un centro de comando unificado?",
    a: "Un centro de comando básico con integración de 3-5 sistemas puede estar operativo en 8 a 12 semanas. Proyectos C5i de ciudad completa requieren entre 6 y 18 meses dependiendo de la cantidad de sistemas, usuarios y proceso de capacitación requerido.",
  },
  {
    q: "¿Cómo manejan la privacidad de los datos y cumplimiento de regulaciones?",
    a: "La plataforma cumple con LGPD, Ley 1581 (Colombia), Habeas Data y marcos regulatorios regionales. Los datos biométricos y de video se almacenan localmente con cifrado AES-256. Podemos proveer un DPA (Data Processing Agreement) adaptado a la jurisdicción del cliente.",
  },
];

const otherSolutions = [
  { slug: "critical-infrastructure-security", name: "Critical Infrastructure Security", desc: "Ciberseguridad convergente OT/IT",       Icon: Shield    },
  { slug: "connectivity-telecom",             name: "Connectivity & Telecom",           desc: "Redes críticas, ingeniería y NOC 24/7", Icon: Wifi      },
  { slug: "managed-operations",              name: "Managed Operations",               desc: "NOC · SOC · BPO on-demand",             Icon: Briefcase },
];

/* ─── JSON-LD ─── */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/soluciones/smart-solutions/#service`,
  name: "AI-Powered Operations — Digital Twin e Inteligencia Operativa",
  description:
    "Gemelos digitales, videovigilancia con IA y analítica operativa para infraestructuras críticas. Reduce OPEX hasta 35%, +33,000 nodos monitoreados.",
  provider: { "@id": ORG_ID },
  areaServed: AREA_SERVED,
  serviceType: "Inteligencia Operativa e IA Industrial",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Inteligencia Operativa",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Twin y gemelos digitales de infraestructura" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Videovigilancia IA con analítica de video" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Centro de Comando Unificado (SISE)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Analítica operativa y reducción de OPEX" } },
    ],
  },
  hasCredential: CERTIFICATIONS,
  url: `${SITE_URL}/soluciones/smart-solutions`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",       item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Soluciones", item: `${SITE_URL}/soluciones` },
    { "@type": "ListItem", position: 3, name: "AI-Powered Operations", item: `${SITE_URL}/soluciones/smart-solutions` },
  ],
};

/* ─── PAGE ─── */
export default function SmartSolutionsPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      {/* ═══════════════════════════════════════
          01 · HERO — background image
      ═══════════════════════════════════════ */}
      <section
        className="relative pt-28 pb-20 overflow-hidden flex flex-col justify-center min-h-[520px]"
      >
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/HeroBanner Smart Solutions.png')" }}
        />
        {/* Overlay oscuro para legibilidad del texto */}
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
              <span className="text-white/55">AI-Powered Operations</span>
            </nav>
          </AnimatedSection>

          <AnimatedSection className="max-w-2xl">
            {/* H1 */}
            <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-bold text-white mb-6 leading-[1.06]">
              AI-Powered Operations
            </h1>

            {/* Sub-claim */}
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              Evolucionamos la infraestructura crítica con IA avanzada para anticipar riesgos y automatizar la eficiencia de su operación en tiempo real
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Primary */}
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-3 font-bold px-8 py-4 rounded-full text-sm text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #cc0044 100%)`,
                  boxShadow: `0 6px 32px ${ACCENT}55`,
                }}
              >
                Habla con un especialista
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                  <ArrowRight size={13} />
                </span>
              </Link>

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          01b · STATS — la brecha de datos
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* H2 */}
          <AnimatedSection className="mb-14 max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              La brecha entre datos operativos e{" "}
              <span style={{ color: ACCENT }}>inteligencia accionable</span>
            </h2>
          </AnimatedSection>

          {/* 4 stat cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-3xl overflow-hidden">
            {[
              {
                stat: "45 min",
                context: "Tiempo promedio de detección",
                detail: "sin analítica de video. Cada minuto de retraso amplifica el impacto del incidente.",
              },
              {
                stat: "67%",
                context: "Datos no analizados",
                detail: "de los terabytes de video e IoT generados diariamente nunca son revisados por un operador.",
              },
              {
                stat: "120/día",
                context: "Falsas alarmas sin IA",
                detail: "promedio de alertas sin contexto que saturan a los operadores y generan fatiga de alarmas en centros de mando.",
              },
              {
                stat: "52%",
                context: "Incidentes por silos de datos",
                detail: "de los eventos de seguridad críticos surgen porque video, acceso e IoT operan en plataformas desconectadas entre sí.",
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
              Evolucionamos la infraestructura crítica con IA avanzada para anticipar riesgos y automatizar la eficiencia de{" "}
              <span style={{ color: ACCENT }}>su operación en tiempo real</span>
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
              Inteligencia operativa de extremo a extremo,{" "}
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
          04 · PARTNERS / STACK — static grid
      ═══════════════════════════════════════ */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <AnimatedSection className="mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">
              Tecnologías que integramos
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A]">
              Integramos el mejor stack para su entorno
            </h2>
          </AnimatedSection>

          {/* All 20 logos — 5 cols on desktop, 4 on tablet, 3 on mobile */}
          <AnimatedSection delay={0.08}>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {[...smartLogosRow1, ...smartLogosRow2].map((logo, i) => (
                <div
                  key={i}
                  className="bg-white flex items-center justify-center px-8 py-8 hover:bg-slate-50 transition-colors duration-200"
                  style={{ minHeight: 96 }}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full object-contain grayscale hover:grayscale-0 opacity-40 hover:opacity-90 transition-all duration-300"
                    style={{ maxHeight: 40, maxWidth: 120 }}
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
                <span style={{ color: ACCENT }}>líderes antes de implementar</span>
              </h2>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                Respuestas directas a las dudas más comunes sobre analítica de video y centros de comando.
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
                AI-Powered Operations · OSC Top Solutions
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Su operación ya genera datos.{" "}
                OSC le otorga la inteligencia.
              </h2>
              <p className="text-white/75 text-lg font-light leading-relaxed max-w-lg">
                Integramos capas de Inteligencia Artificial en su infraestructura actual para activar analítica avanzada y potenciar la toma de decisiones,{" "}
                <span className="font-semibold text-white">optimizando la inversión que ya ha realizado.</span>
              </p>
            </AnimatedSection>

            {/* Actions */}
            <AnimatedSection direction="right" delay={0.1} className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
                style={{ color: ACCENT }}
              >
                Agendar sesión técnica <ArrowRight size={16} />
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
