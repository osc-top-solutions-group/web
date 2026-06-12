import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, FileText, BookOpen, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Wifi, Shield, Zap, Radio, Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Redes LTE/5G Privadas para Minería 4.0 — Whitepaper Técnico 2025–2026",
  description:
    "Arquitectura técnica de redes LTE/5G privadas industriales para minería: comparativa tecnológica, espectro por país LATAM, TCO a 10 años, casos de uso 5G exclusivos y roadmap de implementación de 24 semanas.",
  keywords: [
    "redes LTE privadas minería LATAM",
    "5G privado industria extractiva",
    "Private LTE minería Chile Perú Colombia",
    "redes privadas industriales minería 4.0",
    "conectividad misión crítica minería",
    "OSC Top Solutions",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/redes-lte5g-privadas-mineria` },
  openGraph: {
    title: "Redes LTE/5G Privadas para Minería 4.0 — Whitepaper Técnico",
    description: "Comparativa técnica LTE vs 5G vs microondas vs satelital LEO para operaciones extractivas en América Latina.",
    type: "article",
    url: `${SITE_URL}/guias/redes-lte5g-privadas-mineria`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Redes LTE/5G Privadas para Minería 4.0 — Whitepaper Técnico 2025–2026",
  description: "Análisis técnico y económico de tecnologías de conectividad para operaciones mineras en América Latina.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01",
  dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/redes-lte5g-privadas-mineria`,
  inLanguage: "es-419",
};

/* ── Micro-components (same pattern as guide) ── */
function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle,  bg: "rgba(255,165,0,0.08)",  border: "rgba(255,165,0,0.25)", color: "#F59E0B", label: "Alerta de diseño" },
    info:    { icon: Info,           bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.22)", color: "#60A5FA", label: "Principio de diseño" },
    success: { icon: CheckCircle2,   bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.22)", color: "#34D399", label: "Caso documentado" },
    stat:    { icon: TrendingUp,     bg: "rgba(0,0,134,0.09)",    border: "rgba(0,0,134,0.28)",   color: "#6366F1", label: "Insight crítico" },
  }[type];
  const Icon = cfg.icon;
  return (
    <div className="my-8 rounded-2xl p-5" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <div className="flex items-start gap-3">
        <Icon size={16} style={{ color: cfg.color }} className="shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: cfg.color }}>{cfg.label}</p>
          <div className="text-sm text-slate-300 leading-relaxed [&_strong]:text-white [&_strong]:font-semibold">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ number, title, icon: Icon }: { number: string; title: string; icon: React.ElementType }) {
  return (
    <div className="mt-20 mb-8 first:mt-0">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,134,0.15)", border: "1px solid rgba(99,102,241,0.28)" }}>
          <Icon size={18} style={{ color: "#6366F1" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-0.5" style={{ color: "rgba(99,102,241,0.6)" }}>Sección {number}</p>
          <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h2>
        </div>
      </div>
      <div className="h-px" style={{ background: "rgba(0,0,134,0.15)" }} />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-white mt-12 mb-5 flex items-center gap-3">
      <span className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(0,0,134,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
        <span className="w-1.5 h-1.5 rounded-sm block" style={{ background: "#6366F1", transform: "rotate(45deg)" }} />
      </span>
      {children}
    </h3>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="text-slate-300 leading-[1.8] text-[15px] space-y-4">{children}</div>;
}

function DataTable({ headers, rows, compact }: { headers: string[]; rows: (string | React.ReactNode)[][]; compact?: boolean }) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-white/[0.09]">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-widest text-white/60 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.018)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 ${compact ? "py-2.5" : "py-3.5"} ${ci === 0 ? "text-slate-200 font-medium" : "text-slate-400"} text-[13px] leading-snug align-top`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="my-6 p-5 rounded-2xl text-xs leading-relaxed overflow-x-auto" style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.08)", color: "#94A3B8", fontFamily: "'Fira Code', Consolas, monospace" }}>
      <code>{children}</code>
    </pre>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return <strong className="text-white font-semibold">{children}</strong>;
}
function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#6366F1" }} className="font-semibold">{children}</span>;
}
function AccentRed({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#FF0057" }} className="font-semibold">{children}</span>;
}

export default function RedesLTE5GMineria() {
  return (
    <>
      <JsonLd data={articleSchema} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #06081A 0%, #0A0F2E 55%, #0D1535 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: "radial-gradient(rgba(99,102,241,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(0,0,134,0.18) 0%, transparent 60%)" }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
          <nav className="flex items-center gap-2 text-xs text-white/35 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/industrias/energia-mineria" className="hover:text-white/60 transition-colors">Energía & Minería</Link>
            <ChevronRight size={12} />
            <span className="text-white/55">Whitepaper</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,134,0.15)", border: "1px solid rgba(0,0,134,0.35)", color: "#818CF8" }}>
              <BookOpen size={11} /> Whitepaper Técnico
            </span>
            <span className="text-[10px] text-white/25 uppercase tracking-widest font-semibold">Edición 2025–2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
            Redes LTE/5G Privadas<br className="hidden md:block" />
            <span style={{ color: "#818CF8" }}> para Minería 4.0</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-10">
            Comparativa técnica LTE Privado vs. 5G SA vs. Microondas vs. Satelital LEO para operaciones extractivas.
            Análisis de espectro por país, TCO a 10 años, casos de uso exclusivos 5G y roadmap de implementación de 24 semanas.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            {[
              { icon: Clock,    label: "50 min lectura" },
              { icon: BookOpen, label: "10 secciones" },
              { icon: FileText, label: "24 referencias técnicas" },
              { icon: Wifi,     label: "LTE · 5G · Microondas · LEO" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-white/40">
                <Icon size={12} /><span>{label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "38%→72%", label: "penetración redes privadas gran minería LATAM 2025→2027" },
              { value: "94%", label: "reducción eventos pérdida comunicación AHS (BHP Escondida)" },
              { value: "300%+", label: "ROI LTE privado en operaciones con flotas autónomas" },
              { value: "USD 180K–480K", label: "costo por hora de downtime en gran minería" },
            ].map(({ value, label }) => (
              <div key={value} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xl font-black mb-1" style={{ color: "#818CF8" }}>{value}</p>
                <p className="text-[11px] text-white/40 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0A0F2E 0%, #0D1535 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 py-14">

          {/* ── CONTEXTO ── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Abstract Ejecutivo</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <Prose>
              <p>
                La industria minera latinoamericana opera en uno de los entornos de conectividad más exigentes del planeta:
                terrenos abruptos, altitudes extremas (2,000–5,500 msnm en los Andes), interferencias electromagnéticas
                y presión regulatoria orientada a cero fatalidades. La conectividad ha dejado de ser una utilidad de soporte
                para convertirse en <Bold>la columna vertebral de la productividad, la seguridad operativa y la competitividad</Bold> a largo plazo.
              </p>
              <p>
                Según el <Bold>McKinsey Global Institute Mining Report 2025</Bold>, la digitalización plena podría liberar entre{" "}
                <Accent>USD 290B y USD 420B</Accent> en valor global para 2030, con América Latina capturando el 18–23% de ese potencial.
              </p>
            </Prose>

            <DataTable
              headers={["Indicador", "Valor 2025", "Proyección 2027", "Fuente"]}
              rows={[
                ["Penetración redes privadas LTE/5G en gran minería LATAM", <Accent key="1">38%</Accent>, <Accent key="2">72%</Accent>, "GSMA Intelligence 2025"],
                ["Inversión global en digitalización minera", "USD 18.6B/año", "USD 31.4B/año", "Wood Mackenzie 2025"],
                ["Equipos de carguío con automatización (global)", "~1,900 unidades", "~4,800 unidades", "Mining Technology Q1 2025"],
                ["Pérdida productividad por downtime conectividad", <AccentRed key="3">USD 180K–480K/hora</AccentRed>, "—", "Gartner OT Downtime 2024"],
                ["Reducción accidentes con Private LTE vs. radio troncal", <Accent key="4">−31% a −44%</Accent>, "—", "ICMM Digital Safety 2025"],
              ]}
            />
          </div>

          {/* ── S1: IMPERATIVO ── */}
          <SectionHeading number="1" title="El Imperativo de Conectividad en la Minería Moderna" icon={Wifi} />

          <SubHeading>1.1 De la Radio Troncal al Fabric Digital de Mina</SubHeading>
          <Prose>
            <p>
              La irrupción de la automatización de flotas, telemetría de activos y sistemas de despacho en tiempo real
              incrementó exponencialmente los requisitos de ancho de banda. Según <Bold>Caterpillar Technology Report 2025</Bold>,
              un camión autónomo de 300 toneladas genera entre <Accent>4 y 9 GB de telemetría por turno de 12 horas</Accent>.
              Una flota de 40 unidades demanda entre 160 y 360 GB/turno — volumen que ninguna red Wi-Fi fragmentada puede gestionar.
            </p>
          </Prose>

          <SubHeading>1.2 Requisitos Técnicos de Conectividad por Aplicación</SubHeading>
          <DataTable
            compact
            headers={["Aplicación", "Latencia Máx.", "Ancho de Banda", "Disponibilidad", "Referencia"]}
            rows={[
              [<Bold key="a">Control flotas autónomas (AHS)</Bold>, "< 20 ms", "2–10 Mbps/vehículo", <AccentRed key="r1">99.999%</AccentRed>, "3GPP TS 22.261"],
              [<Bold key="b">MCPTT — Voz misión crítica</Bold>, "< 100 ms", "64–256 Kbps/usuario", <AccentRed key="r2">99.999%</AccentRed>, "3GPP TS 23.179"],
              ["Videovigilancia HD (Full HD / 4K)", "< 500 ms", "4–12 Mbps/cámara", "99.9%", "ONVIF Profile S/T 2025"],
              ["Telemetría equipos pesados", "< 1 s", "50–500 Kbps/equipo", "99.9%", "ISO 15143-3 (AEMP 2.0)"],
              ["Monitoreo sísmico / geotécnico", "< 100 ms", "500 Kbps–2 Mbps", "99.99%", "ISRM Guidelines 2024"],
              ["Posicionamiento de personal (UWB/GNSS/LTE)", "< 50 ms", "100–500 Kbps/persona", "99.99%", "ISO 17772"],
              ["Remote Control (teleoperación)", "< 50 ms RTT", "1–5 Mbps/cabina", <AccentRed key="r3">99.999%</AccentRed>, "3GPP URLLC TS 22.104"],
            ]}
          />

          <Callout type="info">
            <strong>Principio de diseño:</strong> La arquitectura de red se define desde el peor caso —control de flotas autónomas
            y MCPTT— y se desciende en exigencia para las demás aplicaciones. Una red certificada para soportar AHS a 99.999%
            de disponibilidad soporta todas las aplicaciones menos exigentes por defecto.
          </Callout>

          {/* ── S2: LTE PRIVADO ── */}
          <SectionHeading number="2" title="LTE Privado Industrial: La Columna Vertebral de la Mina Inteligente" icon={Radio} />

          <SubHeading>2.1 Arquitectura Técnica</SubHeading>
          <Prose>
            <p>Una Red LTE Privada Industrial es una infraestructura celular desplegada, operada y controlada exclusivamente por la organización propietaria, <Bold>sin dependencia de redes públicas de operadores móviles</Bold>.</p>
          </Prose>
          <CodeBlock>{`┌─────────────────────────────────────────────────────────────┐
│                    OPERACIÓN MINERA                         │
│                                                             │
│  [PIT / TAJO]          [PLANTA]         [SUBTERRÁNEO]      │
│  Camiones AHS          Molinos SAG      Equipos LHD        │
│  Perforadoras          Chancadoras      Personal tracking  │
│  Palas eléctricas      Bombas críticas  Sensores gas       │
│       │                    │                 │             │
│  ─────┴────────────────────┴─────────────────┴─────        │
│              RADIO ACCESS NETWORK (RAN)                     │
│         eNodeB/gNodeB en torres distribuidas                │
│              ↑ Fronthaul: fibra / microondas                │
│  ─────────────────────────────────────────────             │
│              CORE NETWORK (On-Premise)                      │
│    EPC (4G): MME · SGW · PGW · HSS · PCRF                  │
│    5GC (5G): AMF · SMF · UPF · NRF · PCF                   │
│              ↓ Interfaces IP / SIP                          │
│  ─────────────────────────────────────────────             │
│    FMS/AHS · MCPTT · SCADA · CMMS · Video Analytics        │
└─────────────────────────────────────────────────────────────┘`}</CodeBlock>

          <SubHeading>2.2 Espectro Radioeléctrico por País LATAM 2025</SubHeading>
          <DataTable
            compact
            headers={["País", "Bandas Disponibles", "Autoridad", "Estado 2025"]}
            rows={[
              [<Bold key="cl">Chile</Bold>, "Band 14 (758/788 MHz), Band 28 (700 MHz APT), Band 66", "SUBTEL", "Operativo; 12+ minas con licencia activa"],
              [<Bold key="pe">Perú</Bold>, "Band 28 (700 MHz), Band 3 (1800 MHz), Band 7 (2600 MHz)", "MTC / OSIPTEL", "Operativo; proceso simplificado desde 2023"],
              [<Bold key="co">Colombia</Bold>, "Band 28 (700 MHz), Banda 3.5 GHz (en licitación)", "MINTIC / ANE", "Marco aprobado; primeras licencias Q2 2025"],
              [<Bold key="mx">México</Bold>, "Band 48 (CBRS 3.5–3.7 GHz), Band 14 (700 MHz)", "IFT", "Operativo; 8+ concesionarias mineras activas"],
              [<Bold key="br">Brasil</Bold>, "Band 26 (850 MHz), Band 48 (3.5 GHz TDD)", "ANATEL", "Mercado más activo de LATAM"],
            ]}
          />

          <SubHeading>2.3 Comparativa Técnica: LTE vs. Alternativas</SubHeading>
          <DataTable
            headers={["Atributo", "LTE Privado", "Wi-Fi 6 Industrial", "TETRA/DMR", "5G SA Privado"]}
            rows={[
              [<Bold key="l">Latencia (garantizada)</Bold>, <Accent key="v1">10–20 ms</Accent>, "20–150 ms (variable)", "300 ms–1.5 s", <Accent key="v2">1–10 ms (URLLC)</Accent>],
              ["Cobertura por nodo (800 MHz)", "1–10 km", "50–300 m", "2–8 km", "200 m–3 km (3.5 GHz)"],
              ["Handover a alta velocidad", "Sin degradación ≤ 350 km/h", "Corte 200–800 ms >30 km/h", "No aplica (solo voz)", "Sin degradación ≤ 500 km/h"],
              ["QoS determinístico", "Sí — QCI por flujo", "No — CSMA/CA contención", "Limitado a voz", "Sí — Network Slicing nativo"],
              ["Seguridad nativa", "AES-128/256 + SIM AKA", "WPA3-Enterprise (si se configura)", "Cifrado de voz TEA", "AES-256 + 5G-AKA mejorado"],
              ["Throughput por celda", "50–150 Mbps DL", "100–600 Mbps (contendido)", "< 1 Mbps datos", "1–10 Gbps DL"],
            ]}
          />

          {/* ── S3: 5G ── */}
          <SectionHeading number="3" title="5G Privado en Minería: Adopción, Casos de Uso y Roadmap" icon={Zap} />

          <SubHeading>3.1 Estado Real de Adopción 5G en Minería LATAM 2025</SubHeading>
          <Prose>
            <p>
              La realidad del mercado latinoamericano en 2025: <Bold>LTE Privado es el estándar de producción</Bold> y 5G es el horizonte
              de inversión para operaciones que ya tienen Private LTE, aprovechando la capacidad de upgrade de hardware actual.
            </p>
          </Prose>

          <div className="my-6 grid sm:grid-cols-2 gap-3">
            {[
              { country: "Chile", status: "3 pilotos 5G NSA (Codelco, BHP, Antofagasta Minerals). Ninguno en producción plena aún." },
              { country: "Brasil", status: "Vale 5G privado en Carajás (Pará) desde 2024. Kinross Paracatu inició piloto Q1 2025." },
              { country: "Perú", status: "Glencore Antapaccay inició RFP para Private 5G en Q4 2024; resultado esperado H1 2025." },
              { country: "Colombia / México / Ecuador", status: "En etapa de evaluación técnica y regulatoria." },
            ].map(({ country, status }) => (
              <div key={country} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-sm font-bold text-white mb-1">{country}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{status}</p>
              </div>
            ))}
          </div>

          <SubHeading>3.2 Cuándo Migrar de LTE a 5G</SubHeading>
          <DataTable
            compact
            headers={["Capacidad Requerida", "¿LTE la provee?", "¿5G SA la provee?", "Aplicación Minera"]}
            rows={[
              ["Latencia < 5 ms garantizada", "No (mínimo ~15 ms)", <Accent key="y1">Sí — URLLC slice</Accent>, "Teleoperación háptica, robótica colaborativa"],
              ["Network slicing por aplicación", "No (QoS por flujo)", <Accent key="y2">Sí — nativo 3GPP</Accent>, "Segregación garantizada AHS / MCPTT / IoT"],
              ["> 1,000 dispositivos IoT/km²", "Limitado", <Accent key="y3">Sí — mMTC NR</Accent>, "Despliegue masivo de sensores geotécnicos"],
              ["Edge computing integrado (MEC)", "Parcialmente", <Accent key="y4">Sí — UPF + MEC</Accent>, "AI inference < 10 ms para Computer Vision"],
              ["Throughput > 500 Mbps/celda", "No", <Accent key="y5">Sí — hasta 2 Gbps</Accent>, "Descarga masiva de datos de perforación"],
            ]}
          />

          <SubHeading>3.3 Casos de Uso 5G Exclusivos para Minería 4.0</SubHeading>
          <div className="space-y-4 my-6">
            {[
              { title: "Teleoperación con retroalimentación háptica", color: "#818CF8", desc: "Operadores en sala remota conducen equipos con retroalimentación táctil en tiempo real. Requiere RTT < 5 ms y confiabilidad 99.9999%. Ref: Komatsu + NTT DoCoMo, Japón 2024. Roadmap LATAM: Chile 2026–2027." },
              { title: "Gemelo Digital en tiempo real sub-segundo", color: "#34D399", desc: "Actualización continua del modelo 3D de la mina con datos de LiDAR embarcado y drones autónomos. Requiere throughput > 100 Mbps + edge computing para nube de puntos. Ref: Rio Tinto Gudai-Darri, Australia 2024." },
              { title: "Computer Vision para Seguridad Activa", color: "#F59E0B", desc: "Análisis de video IA en tiempo real: detección ausencia EPP, intrusión en zonas de exclusión, detección de fatiga. Requiere latencia de inferencia < 10 ms → MEC en celda 5G. Ref: Anglo American Quellaveco, Perú Q4 2024." },
              { title: "Coordinación Swarm de Vehículos Autónomos (V2X)", color: "#FF0057", desc: "Comunicación directa vehículo a vehículo (PC5 interface 3GPP Release 16) sin servidor central. Algoritmos distribuidos eliminan colisiones por diseño. Disponible con 5G SA + V2X. Roadmap: 2026–2028." },
            ].map(({ title, color, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-1.5 shrink-0 rounded-full self-stretch" style={{ background: color }} />
                <div>
                  <p className="text-sm font-bold text-white mb-1.5">{title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <SubHeading>3.4 Roadmap de Evolución LTE → 5G</SubHeading>
          <CodeBlock>{`2024─────2025─────2026─────2027─────2028
  │         │         │         │         │
 LTE      LTE +     5G NSA   5G SA     5G SA
Privado   capas     overlay  parcial   completo
  │       5G-ready    │         │         │
  │         │       + URLLC  + Slicing  + Swarm
Flotas    Upgrade   en pit    producción  V2X
MCPTT    antenas    piloto    + Edge AI   Háptico
IoT      on-site   Computer   MEC        Digital
Video     RRH      Vision     nativo     Twin RT

Nota: El hardware Nokia AirScale RRH y Ericsson Radio System instalado
desde 2023 soporta upgrade de software a 5G NR sin reemplazo físico.`}</CodeBlock>

          {/* ── S4: MICROONDAS ── */}
          <SectionHeading number="4" title="Microondas Industrial: Backbone Confiable para Backhaul" icon={Radio} />

          <Prose>
            <p>
              El <Bold>67% de las redes LTE privadas en minería</Bold> utiliza microondas como backhaul primario o secundario,
              dada la imposibilidad práctica de tender fibra en entornos de tajo abierto activo donde la topografía cambia semanalmente
              (<em>Ericsson Mobility Report Mining Supplement 2025</em>).
            </p>
          </Prose>

          <DataTable
            headers={["Parámetro", "Especificación para Minería", "Consideración Crítica"]}
            rows={[
              [<Bold key="b">Bandas de frecuencia</Bold>, "6–11 GHz (≥40 km); 18–23 GHz (alta capacidad, ≤15 km); 70–80 GHz E-band", "Polvo fino de minerales (SiO₂, Cu) genera atenuación +0.5–2 dB/km >15 GHz. Fade margin adicional requerido."],
              [<Bold key="c">Capacidad por enlace</Bold>, "100 Mbps – 10 Gbps (E-band: hasta 10 Gbps full duplex)", "Dimensionar para proyección a 7 años; automatización incrementa demanda factor 5–10x"],
              [<Bold key="d">Disponibilidad objetivo</Bold>, "99.999% para backhaul LTE crítico", "Requiere space diversity o frequency diversity; fade margin mínimo 30 dB"],
              [<Bold key="l">Latencia inherente</Bold>, "< 0.1 ms por salto", "Negligible incluso apilando 3–4 saltos"],
              [<Bold key="r">Robustez mecánica</Bold>, "MIL-STD-810 o ETSI EN 300 019", "Torres expuestas a vientos 120–180 km/h en zonas cordilleranas"],
            ]}
          />

          <CodeBlock>{`[Core LTE — Datacenter Principal]
           │
    ┌──────┴──────┐
  Fibra OPGW    Microondas
  (10 Gbps)    (1–10 Gbps backup)
  Latencia <1ms  Latencia <0.2ms
    └──────┬──────┘
           │ Conmutación automática < 50 ms
    ┌──────┴──────────────────┐
   Hub 1                    Hub 2
  (Pit Norte)            (Planta SAG)
    │                        │
  RAN 1–6               RAN 7–12
 (tajo activo)          (procesamiento)`}</CodeBlock>

          {/* ── S5: SATELITAL ── */}
          <SectionHeading number="5" title="Conectividad Satelital LEO/MEO: El Habilitador del Último Kilómetro" icon={Globe} />

          <Prose>
            <p>
              Starlink Business, con más de 6,400 satélites (Q1 2025), opera con latencias de <Accent>17–45 ms</Accent> y
              velocidades de 100–500 Mbps. Disponibilidad en zonas industriales remotas de Sudamérica: <Bold>99.3% durante 2024</Bold>.
            </p>
          </Prose>

          <DataTable
            compact
            headers={["Tecnología", "Latencia Real", "Throughput", "Disponibilidad", "OPEX/mes", "SLA"]}
            rows={[
              [<Bold key="s">Starlink Business</Bold>, "20–45 ms", "150–500 Mbps", "~99.3%", "USD 500–1,200", "No (best-effort)"],
              [<Bold key="o">OneWeb Industrial</Bold>, "30–60 ms", "50–195 Mbps", <Accent key="v1">99.7% (SLA)</Accent>, "USD 800–2,000", "Sí (B2B)"],
              [<Bold key="m">SES O3b mPOWER (MEO)</Bold>, "90–150 ms", "50–500 Mbps", <Accent key="v2">99.9% (SLA)</Accent>, "USD 1,500–4,000", "Sí (enterprise)"],
              ["Viasat 3 (GEO)", "600–750 ms", "20–100 Mbps", "99.8%", "USD 800–3,000", "Sí"],
              ["Amazon Kuiper (LEO)", "20–50 ms (proyectado)", "100–400 Mbps", "TBD", "TBD", "Planificado 2026"],
            ]}
          />

          <Callout type="warning">
            <strong>Regla de asignación de tráfico:</strong> Control de flotas autónomas (AHS), voz MCPTT y SCADA van
            <strong> exclusivamente por LTE Privado</strong> — ningún satélite LEO garantiza &lt;20 ms en todas las condiciones.
            El satelital cubre ERP, videoconferencias corporativas, actualizaciones de software y sincronización cloud.
          </Callout>

          {/* ── S6: TCO ── */}
          <SectionHeading number="6" title="Análisis TCO: Comparativa Económica a 10 Años" icon={TrendingUp} />

          <Prose>
            <p><Bold>Modelo de costos para operación de 5,000 Ha con 500 dispositivos conectados</Bold> (estimaciones basadas en proyectos ejecutados en LATAM 2022–2025):</p>
          </Prose>

          <DataTable
            headers={["Componente", "LTE Privado", "LTE + Microondas", "LTE + LEO", "Wi-Fi Industrial 6"]}
            rows={[
              ["CAPEX Infraestructura", "USD 3.2–5.8M", "USD 4.5–8.1M", "USD 3.5–6.2M", "USD 1.6–3.0M"],
              ["OPEX Anual", "USD 160–280K", "USD 200–340K", "USD 260–420K", "USD 380–620K"],
              ["Disponibilidad SLA", <Accent key="v1">99.999%</Accent>, <Accent key="v2">99.999%</Accent>, "99.95%", "99.3–99.6%"],
              ["TCO 10 años (sin riesgo)", "USD 5.2–8.6M", "USD 6.5–11.5M", "USD 6.1–10.4M", "USD 4.4–9.2M"],
              ["Costo esperado downtime (10 años)", "~0", "~0", "USD 200–600K", <AccentRed key="r">USD 1.5M–8M+</AccentRed>],
              [<Bold key="total">TCO ajustado por riesgo</Bold>, <Accent key="v3">USD 5.2–8.6M</Accent>, "USD 6.5–11.5M", "USD 6.3–11.0M", <AccentRed key="v4">USD 5.9–17.2M</AccentRed>],
            ]}
          />

          <Callout type="stat">
            <strong>Insight crítico de TCO:</strong> El Wi-Fi industrial tiene el CAPEX más bajo en el papel. Pero una sola hora
            de downtime de AHS por inestabilidad de red (documentado 1–3 veces/año en Wi-Fi industrial minero, Gartner OT Downtime 2024)
            puede costar <strong>más que el CAPEX total de una red LTE privada</strong>. El análisis de TCO sin riesgo operativo es
            un análisis incompleto.
          </Callout>

          {/* ── S7: IMPLEMENTACIONES ── */}
          <SectionHeading number="7" title="Implementaciones de Referencia 2024–2025" icon={CheckCircle2} />

          <div className="space-y-5 my-6">
            {[
              {
                op: "BHP Escondida — Chile", tech: "LTE Privado + AHS", color: "#818CF8",
                detail: "Extensión de red LTE en la mina de cobre más grande del mundo (170,000 Ha). Flota de 54 camiones autónomos Caterpillar 793F. Resultado: reducción de eventos de pérdida de comunicación AHS en 94%; mejora en tiempos de ciclo de camiones del 6.8%.",
                source: "BHP Annual Sustainability & Technology Report 2024"
              },
              {
                op: "Vale Carajás — Brasil", tech: "5G Privado SA + IoT", color: "#34D399",
                detail: "Red 5G privada SA con Ericsson Industry Connect. 1,200 sensores IoT de monitoreo de taludes y diques de relave, transmisión cada 100 ms. Resultado: reducción del 67% en falsas alertas sísmicas con mejora de latencia de 800 ms (Wi-Fi) a 18 ms (5G).",
                source: "Vale Technology Innovation Report Q4 2024"
              },
              {
                op: "Glencore Antapaccay — Perú", tech: "LTE Privado Nokia DAC (4,200 msnm)", color: "#F59E0B",
                detail: "Red LTE Privada Nokia DAC a 4,200 msnm, -15°C mínimo, vientos de 80 km/h. Soporte de despacho Modular Mining ProVision y MCPTT para 1,800 trabajadores. Resultado: disponibilidad de red 99.96%; localización de personal en emergencia de 8 minutos a 52 segundos.",
                source: "Nokia DAC Case Study, marzo 2025"
              },
              {
                op: "Cerrejón — Colombia", tech: "Arquitectura Híbrida LTE + Microondas", color: "#60A5FA",
                detail: "69,000 Ha con backbone de microondas Nokia MINI-LINK 6000 conectando 23 nodos LTE distribuidos. Eliminación de 4 operadores por turno en cabinas de monitoreo gracias a videovigilancia centralizada. Ahorro operativo: USD 1.8M anuales.",
                source: "Nokia MINI-LINK Case Study 2024"
              },
            ].map(({ op, tech, color, detail, source }) => (
              <div key={op} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="px-5 py-3 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                  <div>
                    <p className="text-sm font-bold text-white">{op}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color }}>{tech}</p>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">{detail}</p>
                  <p className="text-[10px] text-white/25 italic">{source}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── S8: ROADMAP ── */}
          <SectionHeading number="8" title="Roadmap de Implementación: De la Evaluación al Go-Live (24 semanas)" icon={Zap} />

          <div className="space-y-4 my-6">
            {[
              { phase: "Fase 1", weeks: "Semanas 1–4", title: "RF Survey y Diseño de Red", items: ["RF Survey de campo con vehículo 4x4 y equipos de medición (Ranplan Professional, Planet EV)", "Diseño de radio: número y posición de radio sites, configuración de antenas, frequency plan", "Dimensionamiento de capacidad: tráfico proyectado por zona, número de UEs simultáneos", "Diseño de backhaul: rutas de microondas o fibra, análisis de perfil de enlace, fade margin", "Gestión de espectro: solicitud de licencia ante autoridad regulatoria del país"] },
              { phase: "Fase 2", weeks: "Semanas 5–16", title: "Construcción y Despliegue", items: ["Construcción de mástiles o torres 15–40 m; estudio estructural certificado", "Instalación de radio units (RRH/AAU) con alimentación DC/AC, ground kit y jumpers certificados", "Despliegue de Core Network: rack en datacenter on-site; UPS; generador de respaldo; climatización", "Instalación de backhaul: alineación de antenas de microondas, configuración de QoS de enlace", "Instalación de dispositivos UE en equipos: modems embarcados en camiones, IoT modules en sensores"] },
              { phase: "Fase 3", weeks: "Semanas 17–20", title: "Integración y Pruebas", items: ["Integración con Fleet Management System (FMS): API de telemetría, comandos de despacho, video", "Integración con MCPTT: grupos de radio, prioridades, interoperabilidad con radio troncal legacy", "Integración con SCADA/DCS: OPC-UA sobre LTE, latencia end-to-end validada", "Drive test documentado con mapa de RSRP, RSRQ, SINR por zona de operación"] },
              { phase: "Fase 4", weeks: "Semanas 21–24", title: "Go-Live y Estabilización", items: ["Migración progresiva: primero telemetría, luego video, finalmente AHS y MCPTT", "Monitoreo intensivo de KPIs: disponibilidad, call drop rate, throughput, latencia por aplicación", "NOC 24/7 durante primer mes de operación plena", "Entrega de documentación: as-built, runbooks operativos, procedimientos de mantenimiento"] },
            ].map(({ phase, weeks, title, items }, idx) => (
              <div key={phase} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="px-5 py-3 flex items-center gap-4" style={{ background: "rgba(0,0,134,0.08)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ background: "#000086" }}>{idx + 1}</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/35">{weeks}</p>
                    <p className="text-sm font-bold text-white">{title}</p>
                  </div>
                </div>
                <ul className="px-5 py-4 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: "#818CF8" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── S9: CYBERSECURITY ── */}
          <SectionHeading number="9" title="Cybersecurity para Redes Privadas LTE/5G en Minería" icon={Shield} />

          <Prose>
            <p>La red privada LTE/5G es infraestructura OT y debe tratarse con controles de seguridad correspondientes, no con los de una red IT convencional.</p>
          </Prose>

          <div className="space-y-3 my-6">
            {[
              { threat: "Rogue eNodeB / gNodeB", mitigation: "Implementar NAC con autenticación mutual certificada entre RAN y Core; monitoreo de espectro RF para detección de estaciones no autorizadas.", color: "#FF0057" },
              { threat: "SIM cloning / IMSI catching", mitigation: "eSIM con perfiles remotamente gestionados (eUICC); rotación periódica de keys de autenticación; alerta ante IMSI duplicados en la red.", color: "#F59E0B" },
              { threat: "Acceso físico a Core Network", mitigation: "Sala de acceso restringido con control biométrico, CCTV y alarma de intrusión. Acceso de mantenimiento remoto via jump server con MFA y sesión grabada.", color: "#60A5FA" },
              { threat: "IT/OT lateral movement vía LTE", mitigation: "Segmentación de APNs por tipo de tráfico; firewall entre APN-OT y APN-IT; política de zero-trust entre segmentos.", color: "#34D399" },
            ].map(({ threat, mitigation, color }) => (
              <div key={threat} className="flex gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: color }} />
                <div>
                  <p className="text-sm font-bold text-white mb-1">{threat}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{mitigation}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CONCLUSIONES ── */}
          <div className="my-14 rounded-3xl p-8" style={{ background: "linear-gradient(135deg, rgba(0,0,134,0.12) 0%, rgba(99,102,241,0.08) 100%)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.30)" }}>
                <CheckCircle2 size={16} style={{ color: "#818CF8" }} />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/50">Conclusiones Estratégicas</p>
            </div>
            <Prose>
              <p className="text-white/80 leading-[1.9]">
                Las operaciones que permanecen en arquitecturas legacy — Wi-Fi fragmentado, radio troncal sin datos —
                acumulan un déficit tecnológico que se manifiesta en pérdidas de productividad cuantificables, incidentes
                de seguridad prevenibles y una <Bold>brecha competitiva creciente</Bold> respecto a las operaciones de clase mundial.
              </p>
              <p className="text-white/70 leading-[1.9]">
                La evidencia es concluyente: el <Bold>ROI de LTE Privado Industrial supera el 300% en horizonte de 5 años</Bold>{" "}
                para operaciones que activan automatización de flotas. El hardware instalado hoy es upgradeable a 5G NR por software,
                protegiendo la inversión para la siguiente generación de casos de uso. <Bold>El timing importa</Bold>: las operaciones
                que inicien su journey de conectividad en 2025–2026 tendrán 3–5 años de ventaja operativa y de datos.
              </p>
            </Prose>
          </div>

          {/* ── REFERENCIAS ── */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Referencias y Fuentes</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <ol className="space-y-2">
              {[
                "McKinsey Global Institute, Digital Mining: Unlocking Value in Latin America's Extractive Sector, Q1 2025.",
                "GSMA Intelligence, Private Networks in Mining: Global Deployment Tracker Q1 2025, marzo 2025.",
                "Wood Mackenzie, Mining Technology & Automation Outlook 2025–2030, febrero 2025.",
                "Analysys Mason, Industrial Private Networks: Market Forecast 2025–2030, enero 2025.",
                "MarketsandMarkets, Private LTE/5G Network Market — Global Forecast to 2029, Q4 2024.",
                "ICMM, Digital Safety Innovation Report 2025: Technology in Fatality Prevention.",
                "IIMP, Reporte de Digitalización Minera en América Latina 2025, marzo 2025.",
                "Gartner, OT Network Downtime Cost Benchmark 2024: Industrial Sectors, octubre 2024.",
                "BHP Group, Annual Report 2024: Technology and Sustainability, noviembre 2024.",
                "Vale S.A., Technology and Innovation Report Q4 2024, enero 2025.",
                "Nokia Corporation, Digital Automation Cloud (DAC) Technical Specification Sheet Release 24.3, 2025.",
                "Ericsson, Industry Connect: Mining Private Networks Portfolio 2025.",
                "SpaceX, Starlink Business Service Performance and Terms 2025.",
                "SES, O3b mPOWER: Medium Earth Orbit Connectivity for Enterprise and Industrial Applications, 2025.",
                "3GPP, TS 22.261: Service Requirements for the 5G System — Release 17, 2024.",
                "3GPP, TS 33.501: Security Architecture and Procedures for 5G System, Release 18, 2024.",
                "SUBTEL Chile, Resolución Exenta N° 4.120: Marco Regulatorio para Redes Privadas, 2024.",
                "ANATEL Brasil, Módulo de Redes Privadas — Atualização 2025, enero 2025.",
                "MINTIC Colombia, Resolución 5765 de 2024: Habilitación de Redes Privadas Industriales.",
                "NIST, SP 800-187: Guide to LTE Security, actualización 2024.",
                "ITU-R, Recommendation P.530-18: Propagation Data for Terrestrial Line-of-Sight Systems, 2024.",
                "Mining Technology Magazine, BHP Escondida AHS Network Expansion, septiembre 2024.",
                "Ericsson, Case Study: Vale Carajás 5G Private Network Deployment, diciembre 2024.",
                "Nokia, Case Study: Glencore Antapaccay Private LTE — High Altitude Industrial Deployment, marzo 2025.",
              ].map((ref, i) => (
                <li key={i} className="flex gap-3 text-xs text-slate-500 leading-relaxed">
                  <span className="shrink-0 font-mono text-white/20">{String(i + 1).padStart(2, "0")}.</span>
                  {ref}
                </li>
              ))}
            </ol>
          </div>

          {/* ── CTA ── */}
          <div className="mt-16 rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E1035 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: "#818CF8" }}>¿Listo para implementar?</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
              OSC diseña e implementa redes privadas LTE/5G<br className="hidden md:block" />
              para operaciones mineras en toda LATAM
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
              RF Survey, diseño de red, gestión de espectro, implementación y NOC 24/7 — end-to-end, desde la evaluación hasta el go-live.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contacto" className="inline-flex items-center gap-2.5 font-bold text-white px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg" style={{ background: "linear-gradient(135deg, #000086 0%, #3B3FD8 100%)", boxShadow: "0 4px 20px rgba(0,0,134,0.40)" }}>
                Solicitar diagnóstico ejecutivo
                <ArrowLeft size={15} className="rotate-180" />
              </Link>
              <Link href="/industrias/energia-mineria" className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors">
                <ArrowLeft size={14} />
                Volver a Energía & Minería
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
