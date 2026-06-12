import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, ORG_ID, CERTIFICATIONS, AREA_SERVED } from "@/lib/seo";
import {
  ArrowRight, ChevronRight, Shield, Eye, Briefcase,
  ArrowUpRight, Server, Zap, Activity, Globe, Wifi, Radio,
  MonitorDot, CheckCircle2, AlertTriangle, BookOpen, FileText,
} from "lucide-react";

const ACCENT = "#FF0057";

/* ─── SEO ─── */
export const metadata: Metadata = {
  title: "Redes Privadas 5G y Conectividad Crítica LATAM | OSC",
  description:
    "Diseño, despliegue y operación de redes 4G/5G privadas, fibra óptica y microondas. NOC 24/7, 99.99% uptime, ISO 9001. Ciclo completo de ingeniería en 16 países LATAM.",
  keywords: [
    "redes privadas 5G LATAM",
    "conectividad infraestructura crítica",
    "redes 4G 5G privadas",
    "fibra óptica LATAM",
    "NOC 24/7 telecomunicaciones",
    "microondas punto a punto",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/soluciones/connectivity-telecom` },
  openGraph: {
    title: "Redes Privadas 5G y Conectividad Crítica LATAM | OSC Top Solutions",
    description:
      "Redes 4G/5G privadas, fibra óptica y microondas con NOC 24/7. 99.99% uptime, ISO 9001, 16 países.",
    type: "website",
    url: `${SITE_URL}/soluciones/connectivity-telecom`,
  },
};

/* ─── DATA ─── */
const differentials = [
  {
    Icon: Wifi,
    title: "Multi-tecnología desde el diseño",
    description:
      "Integramos 4G/5G, microondas, satélite, fibra y MPLS en una única arquitectura resiliente con failover automático entre tecnologías sin intervención manual.",
  },
  {
    Icon: Activity,
    title: "NOC 24/7 certificado ISO 9001",
    description:
      "Centro de operaciones con más de 130,000 actividades anuales, tiempos de respuesta garantizados por SLA y dashboard de estado en tiempo real para el cliente.",
  },
  {
    Icon: Globe,
    title: "Cobertura sin límites geográficos",
    description:
      "Presencia en 16 países con capacidad de despliegue en zonas remotas, minas, fronteras y entornos industriales sin infraestructura previa.",
  },
  {
    Icon: Server,
    title: "Un único punto de responsabilidad",
    description:
      "Diseñamos, desplegamos, auditamos y operamos su red. Si algo falla, un solo partner responde — sin excusas de interfaz entre proveedores ni brechas contractuales.",
  },
];

const conectividadServices = [
  {
    Icon: Wifi,
    title: "Redes 4G y 5G Privadas",
    description:
      "Redes móviles privadas LTE/5G Stand Alone con cobertura de sitio, autonomía de la red pública y SLA garantizado para comunicaciones críticas.",
  },
  {
    Icon: Radio,
    title: "Redes de microondas",
    description:
      "Backhaul microondas de alta capacidad en bandas licenciadas y libres para interconexión de sitios remotos donde la fibra no es viable.",
  },
  {
    Icon: Zap,
    title: "IP / MPLS / Segment Routing",
    description:
      "Backbone de transporte con QoS garantizado por clase de servicio, VPNs empresariales y gestión centralizada de tráfico.",
  },
  {
    Icon: Globe,
    title: "Conectividad Satelital Multi-Órbita",
    description:
      "Soluciones LEO, MEO y GEO para conectividad de respaldo o primaria en ubicaciones sin alternativa de transporte viable.",
  },
  {
    Icon: Activity,
    title: "Redes ópticas (DWDM/OTN)",
    description:
      "Transmisión de altísima capacidad en fibra óptica para backbone troncal con multiplexación DWDM y máxima eficiencia espectral.",
  },
];

const telecomServices = [
  {
    Icon: MonitorDot,
    title: "Operación de la red (NOC)",
    description:
      "Centro de operaciones 24/7 con monitoreo proactivo, gestión de incidentes, cambios y problemas bajo estándares ITIL y certificación ISO 9001.",
  },
  {
    Icon: Server,
    title: "Diseño de red",
    description:
      "Arquitectura técnica de redes de acceso, transporte y core, dimensionada para los objetivos de cobertura, capacidad y SLA del cliente.",
  },
  {
    Icon: Zap,
    title: "Ingeniería de Detalle",
    description:
      "Ingeniería civil y electromecánica de detalle para sitios de telecomunicaciones, con planos, memorias de cálculo y especificaciones de materiales.",
  },
  {
    Icon: Activity,
    title: "Auditoría de Calidad 4G/5G",
    description:
      "Medición de KPIs de red, drive tests, pruebas de throughput y latencia, análisis de interferencias y recomendaciones de optimización continua.",
  },
  {
    Icon: Radio,
    title: "Despliegue de Fibra óptica",
    description:
      "Tendido de fibra aérea, subterránea y de acceso con fusiones, certificación OTDR y documentación as-built completa.",
  },
  {
    Icon: Globe,
    title: "Viabilidad y estudios de sitio",
    description:
      "Evaluación de candidatos de sitio, estudios de viabilidad técnica, levantamiento topográfico y análisis de interferencias para nuevos despliegues.",
  },
  {
    Icon: Shield,
    title: "Instalación HW/SW especializado",
    description:
      "Integración y puesta en marcha de equipos activos de radio, transmisión, core y seguridad de los principales fabricantes del mercado.",
  },
  {
    Icon: Wifi,
    title: "Adecuaciones civiles",
    description:
      "Construcción y adecuación de infraestructura pasiva: torres, shelters, sistemas de energía, aire acondicionado y puesta a tierra.",
  },
];

const connectivityLogos = [
  { src: "/Logo partners/nokia.png",        name: "Nokia" },
  { src: "/Logo partners/druid.png",         name: "Druid" },
  { src: "/Logo partners/jsc Ingenium.png",  name: "JSC Ingenium" },
  { src: "/Logo partners/ubiik.png",         name: "Ubiik" },
  { src: "/Logo partners/wesco.jpg",         name: "Wesco | Anixter" },
  { src: "/Logo partners/gold data.png",     name: "Gold Data" },
  { src: "/Logo partners/ifx.png",           name: "IFX Networks" },
  { src: "/Logo partners/whitesky.png",      name: "Whitesky" },
  { src: "/Logo partners/EVIDEN.png",        name: "Eviden" },
];

const LogoSlot = ({ src, name }: { src: string; name: string }) => (
  <div className="bg-white flex items-center justify-center px-8 py-8 hover:bg-slate-50 transition-colors duration-200" style={{ minHeight: 96 }}>
    <img
      src={src}
      alt={name}
      className="max-w-full object-contain grayscale hover:grayscale-0 opacity-40 hover:opacity-90 transition-all duration-300"
      style={{ maxHeight: 40, maxWidth: 120 }}
    />
  </div>
);

const certifications = [
  {
    code: "ISO 27001",
    name: "Seguridad de la Información",
    validity: "Válido hasta dic. 2027",
    description: "Garantiza confidencialidad, integridad y disponibilidad de datos y sistemas de información.",
  },
  {
    code: "IEC 62443",
    name: "Seguridad de Sistemas OT",
    validity: "Válido hasta nov. 2027",
    description: "Estándar global para ciberseguridad en infraestructura crítica y sistemas de control industrial.",
  },
  {
    code: "ISO 9001",
    name: "Gestión de Calidad",
    validity: "Válido hasta mar. 2027",
    description: "Aseguramiento de calidad en procesos operativos del NOC-SOC. Revisión y mejora continua certificadas.",
  },
];

const insight = {
  caseStudy: {
    client: "Operación Minera — Chile",
    sector: "Energía & Minería",
    context: "Mina a 4,200 msnm con conectividad satelital de alta latencia como único enlace y cero redundancia.",
    before: ["Latencia: 650 ms", "Uptime: 78%", "Tecnologías integradas: 1"],
    after: ["Latencia: 28 ms", "Uptime: 99.97%", "Tecnologías: 3 (5G + MW + SAT)"],
    improvement: "−96% latencia · +28% uptime",
    quote: "Por primera vez tenemos conectividad que no nos limita operativamente.",
  },
  whitepaper: {
    title: "Redes privadas 4G/5G para infraestructura crítica: Guía de diseño y operación",
    desc: "Marco técnico para ingenieros y directores de TI/OT sobre cómo diseñar, desplegar y operar redes privadas resilientes con múltiples tecnologías de transporte en entornos críticos y remotos.",
  },
  datasheet: {
    title: "Connectivity & Telecom Solutions — Capacidades de red, SLAs y modelos de operación",
    desc: "Ficha técnica con tecnologías de transporte soportadas, parámetros SLA del NOC 24/7, capacidades de ingeniería, cobertura geográfica y estructura de servicios gestionados.",
  },
};

const faq = [
  {
    q: "¿Pueden garantizar conectividad en zonas totalmente remotas sin infraestructura previa?",
    a: "Sí. Para zonas sin infraestructura previa, combinamos redes 4G/5G privadas con backhaul microondas y conectividad satelital LEO (< 40 ms de latencia). Esta arquitectura multi-capa garantiza conectividad con 99.9%+ de disponibilidad incluso en ambientes geográficamente adversos.",
  },
  {
    q: "¿Cómo funciona el failover automático entre tecnologías?",
    a: "Nuestra arquitectura SD-WAN detecta degradaciones o caídas en milisegundos y redirige el tráfico al enlace de respaldo sin intervención manual. El proceso completo de failover toma menos de 30 segundos. Los protocolos de enrutamiento dinámico garantizan continuidad del tráfico crítico sin pérdida de sesión.",
  },
  {
    q: "¿Pueden asumir la operación de una red que no diseñaron o desplegaron?",
    a: "Sí. Tenemos experiencia en transición de operaciones de redes heredadas. El proceso incluye una fase de auditoría y levantamiento técnico (4-8 semanas) para entender el estado real de la red, seguida de una fase de estabilización antes de asumir los SLAs contractuales.",
  },
  {
    q: "¿Qué SLA ofrecen y cómo se mide el uptime?",
    a: "El SLA estándar es 99.99% de disponibilidad mensual (< 52 minutos de downtime/año). El uptime se mide con sondeos activos cada 30 segundos desde el NOC y es reportado en tiempo real en un dashboard del cliente. Penalidades contractuales aplicables si no se cumple.",
  },
  {
    q: "¿Cuánto tiempo toma desplegar una red 4G/5G privada?",
    a: "Una red 4G privada de cobertura de sitio (1-3 sectores) puede estar operativa en 6-10 semanas desde la firma del contrato. Redes multi-sitio de mayor complejidad requieren entre 3 y 9 meses según geografía, permisos regulatorios y logística de acceso.",
  },
  {
    q: "¿Trabajan con equipos de fabricantes específicos o son agnósticos?",
    a: "Somos agnósticos de fabricante. Tenemos certificaciones y experiencia documentada con Ericsson, Nokia, Huawei, Cisco, Juniper, Cambium, Ubiquiti y otros. La selección de tecnología responde únicamente a los requerimientos técnicos del cliente.",
  },
];

const otherSolutions = [
  { slug: "critical-infrastructure-security", name: "Critical Infrastructure Security", desc: "Ciberseguridad convergente OT/IT",       Icon: Shield    },
  { slug: "ai-powered-operations",            name: "AI-Powered Operations",            desc: "Inteligencia operativa y video analítica", Icon: Eye       },
  { slug: "managed-operations",               name: "Managed Operations",               desc: "NOC · SOC · BPO on-demand",               Icon: Briefcase },
];

/* ─── JSON-LD ─── */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/soluciones/connectivity-telecom/#service`,
  name: "Connectivity & Telecom — Redes Privadas 5G y Conectividad Crítica",
  description:
    "Diseño, despliegue y operación de redes 4G/5G privadas, fibra óptica, microondas y soluciones satelitales. NOC 24/7, 99.99% uptime, ISO 9001.",
  provider: { "@id": ORG_ID },
  areaServed: AREA_SERVED,
  serviceType: "Telecomunicaciones y Conectividad Crítica",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Conectividad Crítica",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Redes Privadas 4G/5G LTE" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fibra Óptica y Microondas punto a punto" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "NOC 24/7 con 99.99% uptime SLA" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ingeniería de RF y diseño de cobertura" } },
    ],
  },
  hasCredential: CERTIFICATIONS,
  url: `${SITE_URL}/soluciones/connectivity-telecom`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",       item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Soluciones", item: `${SITE_URL}/soluciones` },
    { "@type": "ListItem", position: 3, name: "Connectivity & Telecom", item: `${SITE_URL}/soluciones/connectivity-telecom` },
  ],
};

/* ─── PAGE ─── */
export default function ConnectivityTelecomPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      {/* ═══════════════════════════════════════
          01 · HERO
      ═══════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 overflow-hidden flex flex-col justify-center min-h-[520px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/HeroBanner Conectivity.png')" }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(10,18,40,0.92) 0%, rgba(10,18,40,0.75) 55%, rgba(10,18,40,0.40) 100%)" }}
        />
        {/* Accent glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${ACCENT}15 0%, transparent 60%)`,
            transform: "translate(25%, -25%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          {/* Breadcrumb */}
          <AnimatedSection>
            <nav className="flex items-center gap-1.5 text-white/35 text-xs mb-10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/65 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <Link href="/soluciones" className="hover:text-white/65 transition-colors">Soluciones</Link>
              <ChevronRight size={12} />
              <span className="text-white/55">Connectivity & Telecom Solutions</span>
            </nav>
          </AnimatedSection>

          <AnimatedSection className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-bold text-white mb-6 leading-[1.06]">
              Connectivity &amp; Telecom Solutions
            </h1>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              Diseñamos, desplegamos y operamos redes resilientes para infraestructuras críticas —{" "}
              <span className="text-white font-medium">
                multi-tecnología, con NOC 24/7 y responsabilidad end-to-end garantizada en contrato.
              </span>
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-bold px-7 py-4 rounded-full text-sm text-white transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
              style={{ background: ACCENT, boxShadow: `0 4px 24px ${ACCENT}50` }}
            >
              Evaluar arquitectura de red <ArrowRight size={15} />
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
          <AnimatedSection className="mb-14 max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Cuando la red falla, todo falla. El costo de la inactividad es{" "}
              <span style={{ color: ACCENT }}>real e inmediato</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-3xl overflow-hidden">
            {[
              { stat: "$2.3M",    context: "Costo por hora de downtime",      detail: "estimado en operaciones críticas de telecomunicaciones: pérdida de ingresos, penalizaciones SLA y daño reputacional." },
              { stat: "65%",     context: "Incidentes por cambios no gestionados", detail: "de las interrupciones de red en LATAM tienen origen en cambios sin control de configuración ni ventana de mantenimiento." },
              { stat: "4.5 h",   context: "MTTR sin NOC dedicado",            detail: "tiempo medio de restauración promedio cuando la organización no cuenta con un centro de operaciones de red 24/7 certificado." },
              { stat: "40%",     context: "Proyectos con sobrecostos",        detail: "de los despliegues de infraestructura de red con múltiples proveedores exceden el presupuesto aprobado por falta de integración." },
            ].map(({ stat, context, detail }, i) => (
              <AnimatedSection key={stat} delay={i * 0.08}>
                <div
                  className="group flex flex-col p-8 lg:p-10 h-full relative overflow-hidden hover:bg-white/[0.03] transition-colors duration-300"
                  style={{ backgroundColor: "rgba(255,255,255,0.025)" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }}
                  />
                  <p className="font-black text-4xl lg:text-5xl tabular-nums leading-none mb-4" style={{ color: ACCENT }}>{stat}</p>
                  <p className="text-white font-semibold text-sm mb-2">{context}</p>
                  <p className="text-white/40 text-sm font-light leading-relaxed flex-1">{detail}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          02 · DIFERENCIALES
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Por qué OSC</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight">
              Diferenciales para garantizar la{" "}
              <span style={{ color: ACCENT }}>resiliencia en infraestructura crítica</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentials.map(({ Icon, title, description }, i) => (
              <AnimatedSection key={title} delay={i * 0.08}>
                <div className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl p-8 h-full hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0 transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}18` }}>
                    <Icon size={22} style={{ color: ACCENT }} />
                  </div>
                  <div className="w-8 h-[2px] rounded-full mb-5 transition-all duration-500 group-hover:w-14" style={{ backgroundColor: ACCENT }} />
                  <h3 className="text-[#0F172A] font-bold text-base leading-snug mb-3">{title}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-1">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          03 · SERVICIOS — Redes & Conectividad
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[500px] rounded-full pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${ACCENT}07 0%, transparent 65%)`, transform: "translate(-30%, 30%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Redes & Conectividad */}
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Redes &amp; Conectividad</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight max-w-xl">
              Conectividad de extremo a extremo,{" "}
              <span style={{ color: ACCENT }}>sin puntos ciegos</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-20">
            {conectividadServices.map(({ Icon, title, description }, i) => (
              <AnimatedSection key={title} delay={i * 0.07}>
                <div className="group flex flex-col p-7 rounded-2xl border border-white/8 hover:border-white/18 transition-all duration-300 relative overflow-hidden h-full cursor-default" style={{ backgroundColor: "rgba(255,255,255,0.035)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${ACCENT}07 0%, transparent 55%)` }} />
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0 relative transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: `${ACCENT}14`, border: `1px solid ${ACCENT}28` }}>
                    <Icon size={22} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug mb-3 relative">{title}</h3>
                  <p className="text-white/45 text-sm font-light leading-relaxed flex-1 relative">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Ingeniería & Operación */}
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Ingeniería &amp; Operación</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight max-w-xl">
              Ciclo completo de red,{" "}
              <span style={{ color: ACCENT }}>sin brechas de responsabilidad</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {telecomServices.map(({ Icon, title, description }, i) => (
              <AnimatedSection key={title} delay={i * 0.07}>
                <div className="group flex flex-col p-7 rounded-2xl border border-white/8 hover:border-white/18 transition-all duration-300 relative overflow-hidden h-full cursor-default" style={{ backgroundColor: "rgba(255,255,255,0.035)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${ACCENT}07 0%, transparent 55%)` }} />
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0 relative transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: `${ACCENT}14`, border: `1px solid ${ACCENT}28` }}>
                    <Icon size={22} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug mb-3 relative">{title}</h3>
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
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">Tecnologías que integramos</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A]">Integramos el mejor stack para su entorno</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {connectivityLogos.map((logo, i) => (
                <LogoSlot key={i} src={logo.src} name={logo.name} />
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
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Certificaciones vigentes</span>
          </AnimatedSection>
          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight max-w-xl">
                Madurez verificable, <span style={{ color: ACCENT }}>no solo declarada</span>
              </h2>
              <Link href="/nosotros" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#0F172A] transition-colors">
                Ver Sistema de Gestión Integrado <ArrowUpRight size={13} />
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <AnimatedSection key={cert.code} delay={i * 0.08}>
                <div className="group border border-slate-200/80 rounded-2xl p-8 hover:border-slate-300 hover:shadow-md transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}20)` }} />
                  <div className="inline-flex items-center font-black text-base px-4 py-1.5 rounded-xl mb-5 w-fit" style={{ backgroundColor: `${ACCENT}10`, color: ACCENT }}>{cert.code}</div>
                  <h3 className="text-[#0F172A] font-bold text-lg mb-1">{cert.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }} />
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{cert.validity}</span>
                  </div>
                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-1">{cert.description}</p>
                  <div className="mt-6 h-px w-8 group-hover:w-14 rounded-full transition-all duration-500" style={{ backgroundColor: ACCENT }} />
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
          07 · FAQ
      ═══════════════════════════════════════ */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
            <AnimatedSection className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px" style={{ backgroundColor: ACCENT }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>FAQ</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] leading-tight">
                Lo que preguntan los{" "}
                <span style={{ color: ACCENT }}>decisores antes de firmar</span>
              </h2>
              <p className="text-slate-400 text-sm font-light mt-3 leading-relaxed">
                Respuestas directas a las dudas más comunes de CTOs y líderes de operaciones.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.05}>
              <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl bg-white overflow-hidden">
                {faq.map((item, i) => (
                  <details key={i} className="group">
                    <summary className="flex items-center gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-slate-50/60 transition-colors duration-150">
                      <span className="text-[10px] font-black tabular-nums shrink-0 w-5 text-slate-300 group-open:text-[#FF0057] transition-colors duration-200">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[#0F172A] font-semibold text-sm leading-snug flex-1 group-open:text-[#FF0057] transition-colors duration-200">{item.q}</span>
                      <ChevronRight size={14} className="shrink-0 rotate-90 group-open:-rotate-90 transition-transform duration-300 text-slate-300 group-open:text-[#FF0057]" />
                    </summary>
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
          08 · CTA FINAL
      ═══════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 25% 50%, rgba(255,255,255,0.1) 0%, transparent 55%)" }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <AnimatedSection direction="left">
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
                Connectivity &amp; Telecom Solutions · OSC Top Solutions
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Ninguna geografía debería limitar su operación crítica.
              </h2>
              <p className="text-white/75 text-lg font-light leading-relaxed max-w-lg">
                Evaluamos su arquitectura actual e identificamos brechas de resiliencia{" "}
                <span className="font-semibold text-white">antes de que se conviertan en incidentes operativos.</span>
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1} className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
                style={{ color: ACCENT }}
              >
                Evaluar arquitectura de red <ArrowRight size={16} />
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
