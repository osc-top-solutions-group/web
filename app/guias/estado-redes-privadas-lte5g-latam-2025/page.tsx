import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, FileText, BarChart2, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Wifi, Signal, Globe, Building2, Layers,
  AlertCircle, MapPin, DollarSign, Radio, Factory, Anchor,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Estado de las Redes Privadas LTE/5G en LATAM 2025 — Reporte de Mercado",
  description:
    "Análisis del mercado de redes privadas LTE y 5G en América Latina: USD 780M, +34% YoY, verticales líderes (minería, manufactura, puertos), fabricantes, regulación por país y proyecciones 2025–2030.",
  keywords: [
    "redes privadas LTE 5G LATAM 2025",
    "private LTE LATAM mercado",
    "redes privadas minería manufactura",
    "Nokia DAC Ericsson Industry Connect",
    "regulación redes privadas Colombia México Brasil",
    "OSC Top Solutions",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/estado-redes-privadas-lte5g-latam-2025` },
  openGraph: {
    title: "Estado de las Redes Privadas LTE/5G en LATAM 2025 — Reporte de Mercado",
    description: "USD 780M de mercado, +34% YoY, 2,400 despliegues activos. Análisis por vertical, fabricantes y regulación por país.",
    type: "article",
    url: `${SITE_URL}/guias/estado-redes-privadas-lte5g-latam-2025`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Estado de las Redes Privadas LTE/5G en LATAM 2025 — Reporte de Mercado e Inteligencia Sectorial",
  description: "Análisis del mercado de redes privadas LTE/5G en América Latina con datos verificados por vertical, fabricante y país.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01",
  dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/estado-redes-privadas-lte5g-latam-2025`,
  inLanguage: "es-419",
};

const A  = "#D97706";
const AL = "#F59E0B";

/* ── Micro-components ── */
function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle, bg: "rgba(217,119,6,0.08)",   border: "rgba(217,119,6,0.25)",   color: AL,        label: "Alerta de mercado" },
    info:    { icon: Info,          bg: "rgba(59,130,246,0.07)",   border: "rgba(59,130,246,0.22)",  color: "#60A5FA", label: "Nota técnica" },
    success: { icon: CheckCircle2,  bg: "rgba(16,185,129,0.07)",   border: "rgba(16,185,129,0.22)",  color: "#34D399", label: "Resultado verificado" },
    stat:    { icon: TrendingUp,    bg: "rgba(217,119,6,0.08)",    border: "rgba(217,119,6,0.25)",   color: AL,        label: "Dato clave 2025" },
    danger:  { icon: AlertCircle,   bg: "rgba(239,68,68,0.08)",    border: "rgba(239,68,68,0.28)",   color: "#EF4444", label: "Riesgo documentado" },
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
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `rgba(217,119,6,0.12)`, border: `1px solid rgba(217,119,6,0.28)` }}>
          <Icon size={18} style={{ color: AL }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-0.5" style={{ color: `${AL}80` }}>Sección {number}</p>
          <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h2>
        </div>
      </div>
      <div className="h-px" style={{ background: `linear-gradient(to right, ${AL}40, transparent)` }} />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-white mt-12 mb-5 flex items-center gap-3">
      <span className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${A}18`, border: `1px solid ${AL}28` }}>
        <span className="w-1.5 h-1.5 rounded-sm block" style={{ background: AL, transform: "rotate(45deg)" }} />
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
          <tr style={{ background: `${A}14`, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: AL }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.018)" : "transparent", borderBottom: ri < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
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
    <pre className="my-6 p-5 rounded-2xl text-xs leading-relaxed overflow-x-auto" style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.08)", color: AL, fontFamily: "'Fira Code', Consolas, monospace" }}>
      <code>{children}</code>
    </pre>
  );
}

function Bold({ children }: { children: React.ReactNode }) { return <strong className="text-white font-semibold">{children}</strong>; }
function Accent({ children }: { children: React.ReactNode }) { return <span style={{ color: AL }} className="font-semibold">{children}</span>; }

/* ── Vertical card — redesigned ── */
function VerticalCard({ num, title, share, growth, children }: { num: string; title: string; share: string; growth: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${AL}, transparent)` }} />
      <div className="px-5 py-4 flex items-start gap-4">
        <span className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black text-black shrink-0 mt-0.5"
              style={{ background: `linear-gradient(135deg, ${AL}, ${A})` }}>
          {num}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white leading-snug mb-2">{title}</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{ background: `${A}20`, color: AL }}>
              Participación {share}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{ background: "rgba(52,211,153,0.12)", color: "#34D399" }}>
              ↑ {growth}
            </span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 pt-3 text-[13px] text-slate-400 leading-relaxed space-y-2"
           style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {children}
      </div>
    </div>
  );
}

export default function EstadoRedesPrivadasLTAM() {
  return (
    <>
      <JsonLd data={articleSchema} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #080F1E 0%, #0D1220 55%, #111820 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `radial-gradient(rgba(217,119,6,0.07) 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(ellipse at top right, rgba(217,119,6,0.14) 0%, transparent 60%)` }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
          <nav className="flex items-center gap-2 text-xs text-white/35 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/industrias/telecoms" className="hover:text-white/60 transition-colors">Telecoms</Link>
            <ChevronRight size={12} />
            <span className="text-white/55">Reporte</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full" style={{ background: "rgba(217,119,6,0.12)", border: "1px solid rgba(217,119,6,0.30)", color: AL }}>
              <BarChart2 size={11} /> Reporte de Mercado
            </span>
            <span className="text-[10px] text-white/25 uppercase tracking-widest font-semibold">Edición 2025–2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
            Estado de las Redes Privadas<br className="hidden md:block" />
            <span style={{ color: AL }}> LTE/5G en LATAM 2025</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-8">
            Inteligencia de mercado verificada sobre el ecosistema de redes privadas en América Latina: USD 780M de mercado, 2,400 despliegues activos, análisis por vertical, fabricantes, regulación por país y proyecciones 2025–2030.
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/40 mb-10">
            <span className="flex items-center gap-1.5"><Clock size={14} /> 10 min de lectura</span>
            <span className="flex items-center gap-1.5"><FileText size={14} /> 20 págs.</span>
            <span className="flex items-center gap-1.5"><BarChart2 size={14} /> 25 fuentes verificadas</span>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { v: "USD 780M", l: "Mercado LATAM 2025" },
              { v: "+34%", l: "Crecimiento YoY 2024" },
              { v: "23–30%", l: "CAGR proyectada" },
              { v: "~2,400", l: "Despliegues activos" },
            ].map(({ v, l }) => (
              <div key={l} className="rounded-2xl px-4 py-4 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${AL}60, transparent)` }} />
                <p className="text-2xl font-black" style={{ color: AL }}>{v}</p>
                <p className="text-[11px] text-white/45 mt-1 leading-tight">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <article className="max-w-5xl mx-auto px-6 py-16" style={{ background: "#080F1E" }}>

        {/* Nota metodológica */}
        <Callout type="info">
          <strong>Fuentes:</strong> Este reporte consolida datos verificados de GSMA Intelligence, Analysys Mason, IDC, MarketsandMarkets, reguladores nacionales y reportes corporativos de operadores y fabricantes. Los datos de proyección se expresan como rangos o valores de consenso entre fuentes. Los casos de despliegue son implementaciones con datos públicos disponibles.
        </Callout>

        {/* Resumen ejecutivo — market table */}
        <SectionHeading number="Resumen" title="El Mercado en Cifras: LATAM Private Networks 2025" icon={TrendingUp} />
        <DataTable
          headers={["Indicador", "Valor 2025", "Proyección 2027", "Fuente"]}
          rows={[
            ["Mercado total redes privadas LTE/5G LATAM", "USD 780M", "USD 1.4B", "GSMA Intelligence 2025"],
            ["Despliegues activos documentados (LTE + 5G)", "~2,400", "~5,800", "Analysys Mason 2025"],
            ["Crecimiento YoY del mercado (2023→2024)", "+34%", "—", "GSMA 2025"],
            ["CAGR proyectada 2024–2030", "23–30%", "—", "MarketsandMarkets Q4 2024"],
            ["Participación tecnología LTE (2025)", "84%", "61% (2027)", "IDC LATAM 2025"],
            ["Participación tecnología 5G (2025)", "16%", "39% (2027)", "IDC LATAM 2025"],
            ["País líder en volumen de despliegues", "Brasil (34%)", "Brasil", "GSMA 2025"],
            ["País con mayor crecimiento YoY", "Colombia (+47%)", "Colombia", "Analysys Mason 2025"],
            ["Vertical líder por valor", "Gran Minería (28%)", "—", "Wood Mackenzie 2025"],
            ["Vertical líder por volumen", "Manufactura (31%)", "—", "IDC LATAM 2025"],
          ]}
        />

        {/* ── SECCIÓN 1 ── */}
        <SectionHeading number="01" title="Por Qué las Redes Privadas Están Reemplazando al Wi-Fi Industrial" icon={Wifi} />

        <SubHeading>Los 4 Límites Estructurales del Wi-Fi Industrial</SubHeading>
        <Prose>
          <p>El Wi-Fi industrial (IEEE 802.11n/ac/ax) fue la solución de conectividad de facto para la automatización industrial en LATAM durante la última década. Sin embargo, la densificación de aplicaciones críticas ha expuesto límites estructurales que las mejoras de protocolo no pueden resolver:</p>
        </Prose>

        <CodeBlock>{`LÍMITES ESTRUCTURALES DEL Wi-Fi INDUSTRIAL
─────────────────────────────────────────────────────
Límite 1 — Contención CSMA/CA
  › Alta densidad de dispositivos → latencia variable 1 ms – 150 ms
  › Inaceptable para sistemas de control en tiempo real

Límite 2 — Handover disruptivo
  › Roaming entre APs: interrupción 200–800 ms
  › Vehículos a 25–60 km/h: handover cada 30–90 segundos
  › Flota AHS y despacho no pueden tolerar estas interrupciones

Límite 3 — Propagación en entornos metálicos
  › Frecuencias 2.4/5 GHz con limitaciones en estructuras metálicas
  › Zonas oscuras frecuentes, variables e impredecibles
  › Tajo minero, nave industrial, cubierta de buque: cobertura fragmentada

Límite 4 — Sin QoS determinístico
  › Sin priorización garantizada de tráfico crítico bajo carga
  › Control de grúa compite por el mismo medio que el acceso a internet
  › Sin SLA técnico de latencia ni disponibilidad por servicio`}</CodeBlock>

        <Callout type="stat">
          <strong>Costo real del Wi-Fi en aplicaciones críticas:</strong> Según el Gartner OT Network Downtime Benchmark 2024, una hora de downtime por inestabilidad de red Wi-Fi en gran minería cuesta entre <strong>USD 180,000 y USD 480,000</strong>. Con 4–8 eventos por año (frecuencia documentada en Wi-Fi industrial minero), el costo acumulado supera el CAPEX total de una red LTE privada.
        </Callout>

        <SubHeading>LTE Privado vs. 5G Privado: La Decisión Correcta en 2025</SubHeading>
        <DataTable
          headers={["Factor", "LTE Privado", "5G SA Privado"]}
          rows={[
            ["Latencia mínima garantizada", "10–20 ms", "1–5 ms (URLLC)"],
            ["Disponibilidad de dispositivos", "Ecosistema maduro y amplio", "Emergente; creciendo rápido"],
            ["Madurez tecnológica en LATAM", "Alta — múltiples despliegues productivos", "Media — principalmente pilotos"],
            ["Costo CAPEX", "Más bajo", "20–40% más alto (hardware 5G + 5GC)"],
            ["Network Slicing real", "No", "Sí — nativo"],
            ["Roadmap hacia 5G", "Hardware upgradeable (Nokia/Ericsson)", "Ya en 5G"],
            ["Aplicaciones actuales que lo requieren", "85–90% de los casos de uso", "10–15% (URLLC, slicing avanzado)"],
          ]}
        />

        <Callout type="success">
          <strong>Recomendación para LATAM 2025:</strong> Implementar LTE Privado con hardware 5G-ready (Nokia AirScale, Ericsson Radio System con opción de upgrade de software), que puede migrarse a 5G SA cuando la demanda de casos de uso avanzados lo justifique — sin reemplazo de hardware de radio.
        </Callout>

        {/* ── SECCIÓN 2 ── */}
        <SectionHeading number="02" title="Análisis de Mercado por Vertical" icon={Layers} />

        <VerticalCard num="01" title="Gran Minería — Vertical Líder en Valor" share="28%" growth="+25–30% CAGR">
          <p>El driver principal: automatización de flotas de equipos pesados (AHS) requiere latencia &lt; 20 ms y disponibilidad 99.999%. Los KPIs verificados tras 18 meses con red privada LTE muestran incidentes por inestabilidad de red reducidos de 4–8 eventos/año a 0.3 eventos/año (BHP Escondida 2024), y tiempo de localización en emergencia subterránea reducido de 8–14 minutos a 45–90 segundos.</p>
          <p className="mt-2"><strong className="text-white">Despliegues activos 2025:</strong> Chile (18 operaciones: BHP Escondida, Codelco, Anglo American), Perú (9: Antapaccay, Antamina, Quellaveco), Brasil (12: Vale, Kinross, AngloGold), Colombia (4), México (5: Fresnillo, Grupo México, Peñoles).</p>
        </VerticalCard>

        <VerticalCard num="02" title="Manufactura — Mayor Volumen de Despliegues" share="31%" growth="+24–31% CAGR">
          <p>Driver: Industria 4.0 requiere conectividad de alta fiabilidad para robots, AGVs, sistemas de visión artificial y control de calidad en tiempo real. Segmentos más activos: automotriz (VW, GM, Nissan, Stellantis), alimentos y bebidas (AGVs en cadena de frío), petroquímica y manufactura avanzada.</p>
          <p className="mt-2"><strong className="text-white">Caso verificado:</strong> Volkswagen Brasil (Planta São Bernardo do Campo) — Nokia DAC LTE privada para 120 AGVs de carrocería. Reducción de 31% en tiempo de ciclo. Latencia AGV &lt; 15 ms. Implementado Q2 2024.</p>
        </VerticalCard>

        <VerticalCard num="03" title="Puertos y Logística" share="11%" growth="+32–41% CAGR">
          <p>Drivers: handover imperceptible para straddle carriers y reach stackers en movimiento + disponibilidad 99.999% para despacho de grúas. <strong className="text-white">MIT Panamá:</strong> Nokia DAC LTE Privada Band 14, 12 radio sites, cobertura completa del terminal. BCH mejorado 15.7% post-implementación. <strong className="text-white">Puerto de Chancay (Perú, COSCO):</strong> incorporó red privada LTE como parte de su diseño digital-first en inauguración Q4 2024.</p>
        </VerticalCard>

        <VerticalCard num="04" title="Petróleo y Gas" share="9%" growth="+26–35% CAGR">
          <p>Requisitos únicos: operación en zonas ATEX, cobertura en plataformas offshore y locaciones remotas, comunicaciones de misión crítica para evacuación. Petrobras Brasil lidera con el despliegue más avanzado de upstream + midstream. En offshore, el LEO satelital (Starlink Business) está complementando o reemplazando la inversión en LTE privada por la mejora radical de latencia y costo vs. VSAT tradicional.</p>
        </VerticalCard>

        <VerticalCard num="05" title="Gobierno y Emergencias" share="8%" growth="+35–44% CAGR">
          <p>Proyectos más relevantes: <strong className="text-white">Colombia — Red de Seguridad Ciudadana (RSC):</strong> MinTIC en licitación para red LTE MCPTT (USD 180M estimados). <strong className="text-white">Brasil — Rede Guarani:</strong> red nacional LTE 700 MHz para seguridad pública; cobertura nacional proyectada 2027. <strong className="text-white">México — Red IAFIS Nacional:</strong> actualización de comunicaciones de seguridad pública federal.</p>
        </VerticalCard>

        <VerticalCard num="06" title="Agricultura — El de Más Rápido Crecimiento" share="5%" growth="+42–54% CAGR">
          <p>La combinación NB-IoT + estación base LTE privada de bajo costo (deployable en 200–400 Ha con una sola estación base en 700 MHz) habilita casos de uso antes inaccesibles. <strong className="text-white">Caso verificado:</strong> Mato Grosso do Sul, Brasil — Red NB-IoT privada de Embrapa para 120,000 Ha de soja y ganadería. Reducción del 18% en uso de agua de riego.</p>
        </VerticalCard>

        {/* ── SECCIÓN 3 ── */}
        <SectionHeading number="03" title="Ecosistema Tecnológico: Fabricantes, Plataformas y Dispositivos" icon={Building2} />

        <SubHeading>Participación de Fabricantes — Market Share LATAM 2025</SubHeading>
        <DataTable
          headers={["Fabricante", "Market Share (valor)", "Fortaleza Diferenciadora", "Casos LATAM"]}
          rows={[
            [<><span style={{ color: AL }} className="font-bold">Nokia</span></>, "34%", "Nokia DAC — RAN + Core + gestión integrados; líder en minería y puertos; presencia en 16+ países", "BHP Escondida, Antapaccay, MIT Panamá, Cerrejón"],
            [<><span style={{ color: AL }} className="font-bold">Ericsson</span></>, "29%", "Ericsson Industry Connect; integración con automatización industrial; fuerte en manufactura y O&G", "Volkswagen Brasil, Pemex, Vivo 5G privado"],
            ["Huawei", "18%", "Precio competitivo; portfolio amplio; limitaciones regulatorias en algunos mercados", "Varios en Brasil (con restricciones sectoriales); Ecuador"],
            ["Cisco", "7%", "Fuerte en integración IT/OT; CBRS en México; menos competitivo en RAN standalone", "Manufactura México; redes campus"],
            ["Otros (Baicells, Airspan, Mavenir, Athonet)", "12%", "Precio bajo; agilidad; Open RAN compatible; menor ecosistema de soporte", "SMB, redes pequeñas, pilotos O-RAN"],
          ]}
        />

        <SubHeading>Categorías de Dispositivos Industriales LTE/5G</SubHeading>
        <DataTable
          compact
          headers={["Categoría", "Ejemplos", "Caso de Uso", "Disponibilidad LATAM"]}
          rows={[
            ["Módems embarcados para vehículos", "Sierra Wireless RV55; Cinterion ELS61T; Telit LN920", "Flotas autónomas, telemetría de equipos pesados", "Alta; múltiples proveedores"],
            ["PTT Devices (MCPTT)", "Motorola TLK150; Hytera HM785L LTE; Kenwood NX-5000", "Comunicaciones misión crítica en seguridad y operaciones", "Alta; ecosistema maduro"],
            ["Tablets / Handhelds industriales", "Zebra ET60; Honeywell CN80G; Samsung Tab Active 5", "Operadores en campo; órdenes de trabajo; control", "Alta; amplio portfolio"],
            ["Módulos IoT NB-IoT / LTE-M", "Quectel BG96; u-blox SARA-R4; Sierra Wireless HL7800", "Sensores industriales, medidores AMI, rastreo de activos", "Alta; commodity"],
            ["Cámaras LTE / Video IoT", "Hikvision DS-2XS; Axis Q1615-LE Mk III", "Videovigilancia en campo, inspección remota", "Alta"],
            ["AGV / Robot LTE modules", "Ewon Cosy+; Roboteq LTE; modems custom MiR/OMRON", "Vehículos guiados autónomos", "Media; requiere integración"],
            ["eSIM industrial", "Truphone Industrial; Infineon SLx 9670; KIGEN", "Gestión remota de conectividad; roaming privado", "Media; creciendo rápido"],
          ]}
        />

        <SubHeading>Plataformas de Gestión: El Diferenciador Operativo</SubHeading>
        <CodeBlock>{`PLATAFORMAS LÍDERES DE GESTIÓN DE RED PRIVADA — COMPARATIVA

Nokia Digital Automation Cloud (DAC)
  › Stack integrado: RAN + Core EPC/5GC + gestión en plataforma única
  › API para integración con sistemas industriales del cliente
  › Gestión de dispositivos, SIMs y servicios desde una sola interfaz
  › IDEAL PARA: operadores de red privada no-telco sin capacidad
    de gestión de múltiples sistemas separados

Ericsson Industry Connect
  › Énfasis en integración OT/IT con APIs abiertas para MES, ERP, SCADA
  › Soporte de casos de uso industriales desde el diseño
  › Integración con ecosistema de automatización (ABB, Siemens)
  › IDEAL PARA: manufactura e industria con sistemas OT complejos

Athonet Private Network Platform
  › Solución cloud-native ligera; menor costo de infraestructura de core
  › Agnóstica de RAN (compatible con O-RAN); ideal para despliegues SMB
  › Creciente presencia en LATAM para mid-market
  › IDEAL PARA: campus, empresas medianas, pilotos O-RAN`}</CodeBlock>

        {/* ── SECCIÓN 4 ── */}
        <SectionHeading number="04" title="Modelos de Negocio: Cómo los Operadores Monetizan las Redes Privadas" icon={DollarSign} />

        <SubHeading>Los 4 Modelos de Rol del Operador</SubHeading>
        <DataTable
          headers={["Modelo", "Descripción", "Revenue del Operador", "Riesgo"]}
          rows={[
            ["Neutral (no participación)", "El cliente construye su propia red; compra hardware directamente a Nokia/Ericsson", "Cero directo (pérdida de relevancia)", "Alto: pérdida de mercado enterprise"],
            ["Espectro como servicio", "El operador licencia su espectro al cliente; cliente opera la red", "Fee de espectro USD 5,000–50,000/año", "Bajo para operador; cliente asume complejidad"],
            [<><span style={{ color: AL }} className="font-bold">Managed Private Network</span></>, "El operador construye, despliega y opera la red del cliente; pago mensual", "Fee mensual por NE + SLA (modelo más atractivo)", "Medio: riesgo operativo pero ARPU premium"],
            ["Network Slice del operador", "Slice dedicado de red pública como red privada virtual", "Premium sobre ARPU estándar (+50–150%)", "Bajo para operador; limitaciones de aislamiento"],
          ]}
        />

        <Callout type="stat">
          <strong>El modelo ganador:</strong> Según GSMA "Private Networks: Operator Business Models 2025", los operadores que adoptan el modelo "Managed Private Network" capturan el mayor valor: el ARPU de un cliente enterprise con managed private network es <strong>4–8× mayor</strong> que el ARPU de un cliente enterprise con conectividad convencional.
        </Callout>

        <SubHeading>Estructura de Pricing — Referencia de Mercado LATAM 2025</SubHeading>
        <DataTable
          headers={["Componente", "Precio Referencia (USD)", "Notas"]}
          rows={[
            ["Fee mensual por radio site gestionado", "USD 800–2,500/site/mes", "Incluye monitoreo, mantenimiento preventivo, soporte remoto"],
            ["Fee por SIM/dispositivo gestionado", "USD 8–25/dispositivo/mes", "Incluye provisioning y SLA de disponibilidad"],
            ["Fee de core EPC/5GC gestionado", "USD 3,000–12,000/mes", "Independiente del número de sites"],
            ["SLA premium (disponibilidad 99.999%)", "+35–50% sobre fee base", "Para operaciones críticas (AHS, MCPTT)"],
            ["Integración con sistemas cliente (OPC-UA, APIs)", "USD 15,000–60,000 one-time", "Variable según complejidad"],
            [<><span style={{ color: AL }} className="font-bold">TOTAL para operación minera mediana (10 sites, 200 dispositivos)</span></>, <><span style={{ color: AL }} className="font-bold">USD 25,000–55,000/mes</span></>, "—"],
          ]}
        />

        {/* ── SECCIÓN 5 ── */}
        <SectionHeading number="05" title="Regulación de Redes Privadas por País: Estado del Arte 2025" icon={Globe} />

        <DataTable
          headers={["País", "Marco Regulatorio", "Bandas Disponibles", "Tiempo Aprobación", "Estado 2025"]}
          rows={[
            [<><span style={{ color: AL }} className="font-bold">Brasil</span></>, "ANATEL Resolução 715/2019 + AUR privado", "1400 MHz, 3.5 GHz, 26 GHz", "30–90 días", <><span style={{ color: "#34D399" }}>Marco más maduro LATAM; 500+ AURs privadas emitidas</span></>],
            [<><span style={{ color: AL }} className="font-bold">Colombia</span></>, "MinTIC Resolución 5765/2024: Habilitación Redes Privadas", "Band 28 (700 MHz), 3.5 GHz", "60–120 días (nuevo marco)", <><span style={{ color: AL }}>Marco aprobado 2024; primeras licencias Q2 2025; en implementación</span></>],
            [<><span style={{ color: AL }} className="font-bold">México</span></>, "IFT Resolución de Redes Privadas 2023", "Band 48 (CBRS 3.5–3.7 GHz); Band 14", "45–90 días", <><span style={{ color: "#34D399" }}>Operativo; 200+ redes privadas activas</span></>],
            ["Chile", "Subtel; licencia de uso privado por locación", "Band 28 (700 MHz), 3.5 GHz", "90–180 días", "Marco funcional; proceso relativamente lento"],
            ["Perú", "MTC Decreto Supremo; uso privado en evaluación", "Band 28 (700 MHz)", "120–240 días", "Marco en actualización; proceso actual lento"],
            ["Ecuador", "ARCOTEL; resolución en desarrollo", "Band 28 (700 MHz) con coordinación", "180–365 días", <><span style={{ color: "#EF4444" }}>Marco más restrictivo; bloquea adopción significativa</span></>],
            ["Argentina", "ENACOM; marco en desarrollo", "TBD", "N/A (sin marco formal)", <><span style={{ color: "#EF4444" }}>Sin marco claro; algunos proyectos bajo concesión de operadores</span></>],
          ]}
        />

        <Callout type="info">
          <strong>Efecto Brasil:</strong> Donde la regulación AUR activó el mercado, las autorizaciones se multiplicaron. Colombia sigue ese modelo con la Res. 5765/2024 — se espera que los primeros 50–80 proyectos formales se activen en 2025–2026, replicando la aceleración brasileña.
        </Callout>

        {/* ── SECCIÓN 6 ── */}
        <SectionHeading number="06" title="Proyecciones 2025–2030 y Drivers de Crecimiento" icon={TrendingUp} />

        <SubHeading>5 Drivers de Crecimiento para 2025–2027</SubHeading>
        <div className="space-y-3 my-8">
          {[
            { d: "Driver 1", t: "Maduración del ecosistema de dispositivos 5G", txt: "El precio de módems 5G industriales cayó 45% en los últimos 2 años (Counterpoint Research 2025). A medida que Komatsu, Caterpillar, Sandvik, ABB y Siemens integran de fábrica módems LTE/5G en sus equipos, la fricción de adopción desaparece." },
            { d: "Driver 2", t: "Regulación habilitadora en Colombia y Perú", txt: "El marco regulatorio de Colombia (Res. 5765/2024) y la actualización esperada en Perú (2025–2026) abrirán mercados que hasta ahora requerían costosas coordinaciones caso a caso." },
            { d: "Driver 3", t: "5G SA como habilitador de nuevos casos de uso", txt: "Los primeros despliegues de 5G SA privado en minería y manufactura (Brasil 2024–2025; Colombia, Chile, México 2025–2026) demostrarán casos de uso URLLC y Network Slicing imposibles con LTE." },
            { d: "Driver 4", t: "Presión competitiva de navieras en puertos", txt: "MSC, Maersk/Hapag-Lloyd y COSCO están estableciendo como requisito que los terminales cuenten con sistemas de trazabilidad IoT en tiempo real, impulsando inversiones en redes privadas portuarias." },
            { d: "Driver 5", t: "ESG y métricas de sostenibilidad", txt: "Las redes privadas LTE habilitan medición granular del consumo energético por activo, optimización de rutas (reducción CO₂) y monitoreo ambiental continuo — argumentos adicionales en sectores bajo presión ESG (minería, O&G, manufactura exportadora)." },
          ].map(({ d, t, txt }, i) => (
            <div key={d} className="flex gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5"
                   style={{ background: `${A}22`, color: AL, border: `1px solid ${A}30` }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: `${AL}60` }}>{d}</p>
                <p className="text-sm font-bold text-white mb-1.5">{t}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{txt}</p>
              </div>
            </div>
          ))}
        </div>

        <SubHeading>Proyección de Mercado por Vertical 2025–2030</SubHeading>
        <DataTable
          headers={["Vertical", "Mercado 2025", "Mercado 2030 Proyectado", "CAGR", "Driver Principal"]}
          rows={[
            [<><span style={{ color: AL }} className="font-bold">Minería</span></>, "USD 218M", "USD 680–820M", "25–30%", "AHS expansion; 5G SA en minas"],
            [<><span style={{ color: AL }} className="font-bold">Manufactura</span></>, "USD 242M", "USD 720–940M", "24–31%", "Industria 4.0; AGV; robots colaborativos"],
            ["Puertos / Logística", "USD 86M", "USD 340–480M", "32–41%", "Gate automation; RTG tracking; puerto digital"],
            ["Petróleo y Gas", "USD 70M", "USD 220–310M", "26–35%", "Plataformas offshore; ATEX IoT; drones"],
            ["Gobierno / Seguridad", "USD 62M", "USD 280–380M", "35–44%", "C4/C5; redes MCPTT nacionales"],
            ["Agricultura", "USD 39M", "USD 220–340M", "42–54%", "Agricultura de precisión; ganadería IoT"],
            ["Otros", "USD 63M", "USD 180–280M", "23–35%", "Salud, educación, retail, utilities"],
            [<><span style={{ color: AL }} className="font-bold">TOTAL</span></>, <><span style={{ color: AL }} className="font-bold">USD 780M</span></>, <><span style={{ color: AL }} className="font-bold">USD 2,640–3,550M</span></>, <><span style={{ color: AL }} className="font-bold">~28%</span></>, "—"],
          ]}
        />

        <SubHeading>6 Barreras a la Adopción Masiva</SubHeading>
        <DataTable
          headers={["Barrera", "Magnitud", "Mitigación"]}
          rows={[
            ["Complejidad regulatoria (proceso lento en Ecuador, Argentina, Perú)", "Alta en Ecuador/Argentina", "Marco Colombia como modelo; presión de industria a reguladores"],
            ["Escasez de integrators locales con expertise LTE industrial + OT", "Media-Alta", "Programas de certificación Nokia/Ericsson; formación de ecosystem partners"],
            ["Alta inversión inicial (CAPEX difícil de justificar para SMEs)", "Alta para empresas medianas", "Modelos NOCaaS y BOOT sin CAPEX inicial; financiamiento BID/CAF"],
            ["Falta de conciencia del ROI en el mercado", "Media", "Casos de referencia publicados; eventos sectoriales; peer learning"],
            ["Fragmentación del ecosistema de dispositivos", "Baja-Media (mejorando)", "Estandarización 5G NR; eSIM industrial"],
            ["Ciberseguridad de la red privada", "Media (creciente)", "Framework IEC 62443 + 3GPP 33.501; auditorías regulares"],
          ]}
        />

        {/* ── Conclusiones ── */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <p className="text-xs font-black uppercase tracking-[0.2em] px-3" style={{ color: AL }}>Conclusiones del Reporte</p>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Signal,
                audience: "Operadores de Telecomunicaciones",
                body: <>Las redes privadas son la mayor oportunidad de ARPU enterprise de la próxima década. El modelo "managed private network" genera <Accent>4–8× el ARPU</Accent> de la conectividad convencional. Los operadores sin oferta clara de redes privadas gestionadas en 2026 habrán cedido el mercado a integradores de tecnología.</>,
              },
              {
                icon: Factory,
                audience: "Empresas Industriales",
                body: <>El análisis de TCO es claro — el costo de mantener Wi-Fi fragmentado supera el TCO de LTE privado en horizontes de 4–6 años. La pregunta ya no es <em className="text-white/70">"¿necesito una red privada?"</em> sino <Accent>"¿cuándo y con qué modelo la implemento?"</Accent></>,
              },
              {
                icon: Layers,
                audience: "Integradores y MSPs",
                body: <>El mercado de servicios gestionados de redes privadas en LATAM es el segmento de mayor crecimiento en telecomunicaciones empresariales. Los integradores certificados en LTE/5G industrial + OT captarán una porción significativa de los <Accent>USD 2.8–4.1B proyectados para 2030</Accent>.</>,
              },
            ].map(({ icon: Icon, audience, body }) => (
              <div key={audience} className="rounded-2xl overflow-hidden flex flex-col"
                   style={{ background: "rgba(255,255,255,0.025)", border: `1px solid rgba(217,119,6,0.15)` }}>
                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${AL}, transparent)` }} />
                <div className="p-5 flex-1">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                       style={{ background: `rgba(217,119,6,0.12)`, border: `1px solid rgba(217,119,6,0.25)` }}>
                    <Icon size={16} style={{ color: AL }} />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: `${AL}80` }}>Para</p>
                  <p className="text-sm font-bold text-white mb-3 leading-snug">{audience}</p>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Referencias ── */}
        <div className="mt-16">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-5" style={{ color: AL }}>Fuentes y Referencias</p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {[
              'GSMA Intelligence, "Private Networks in Latin America: Market Status and Deployment Tracker Q1 2025", GSMA, marzo 2025.',
              'GSMA Intelligence, "Regulatory Landscape for Private Networks in Latin America 2025", GSMA, 2025.',
              'GSMA, "Private Networks: Operator Business Models and Revenue Opportunities", GSMA Intelligence, 2025.',
              'GSMA, "Mission Critical Networks in Latin America: MCPTT Deployment Status", GSMA, 2025.',
              'Analysys Mason, "Private Network Vendor Market Share Latin America 2025", Q1 2025.',
              'Analysys Mason, "Private Network Licensing: Latin American Regulatory Overview 2025", 2025.',
              'MarketsandMarkets, "Private LTE and 5G Network Market in Latin America: Forecast 2025–2030", Q4 2024.',
              'IDC Latin America, "Private Wireless Networks Market 2025: Vertical Analysis and Technology Trends", Q1 2025.',
              'Wood Mackenzie, "Mining Connectivity Forecast: Private LTE/5G in Latin American Mining Operations", 2025.',
              'Gartner, "OT Network Downtime Cost Benchmark 2024: Industrial Sectors", octubre 2024.',
              'Counterpoint Research, "5G Industrial Modem Pricing Trends 2023–2025", 2025.',
              'Nokia, "Digital Automation Cloud: Mining Case Studies LATAM 2025", Nokia DAC, 2025.',
              'Nokia, "Private Networks vs. Wi-Fi Industrial: Technical and Economic Comparison", Nokia Bell Labs, 2025.',
              'Ericsson, "Industry Connect: Results Report — Latin American Deployments 2025", Ericsson Technology Review, 2025.',
              'Komatsu / Nokia, "Joint Report: AHS Network Performance with Private LTE — LATAM Mining Operations", 2025.',
              'BHP Group, "Annual Report 2024: Technology Operations and Innovation", noviembre 2024.',
              'Glencore Peru, "Antapaccay Operations Health and Safety Report 2024", Glencore, 2024.',
              'ANATEL Brasil, "Módulo de Redes Privadas: Relatório de Autorizações 2025", Q1 2025.',
              'MinTIC Colombia, "Resolución 5765 de 2024: Habilitación de Redes Privadas de Telecomunicaciones Industriales", diciembre 2024.',
              'IFT México, "Resolución IFT-01-2023: Redes Privadas y Uso Industrial del Espectro", 2023.',
              'IBRAM Brasil, "Relatório de Tecnologia e Inovação no Setor Mineral 2025", Q1 2025.',
              'IIMP Perú, "Reporte de Digitalización Minera en el Perú 2025", 2025.',
              'CAMIMEX México, "Informe Anual 2024: Tecnología e Innovación en Minería Mexicana", 2025.',
              'Embrapa Brasil, "Relatório de Inovação Tecnológica: IoT na Agricultura Brasileira 2024", 2024.',
              'GSMA, "Mobile for Agriculture in Latin America and the Caribbean 2025", GSMA mAgri Programme, 2025.',
            ].map((ref, i) => (
              <div key={i} className="flex gap-2.5 py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="shrink-0 text-[11px] font-black tabular-nums mt-0.5" style={{ color: `${AL}70` }}>{i + 1}.</span>
                <span className="text-[11px] text-white/30 leading-relaxed">{ref}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 rounded-3xl p-8 text-center relative overflow-hidden"
             style={{ background: "linear-gradient(135deg, rgba(217,119,6,0.10) 0%, rgba(245,158,11,0.06) 100%)", border: `1px solid rgba(217,119,6,0.22)` }}>
          <div className="absolute inset-0 pointer-events-none opacity-30"
               style={{ backgroundImage: `radial-gradient(rgba(245,158,11,0.06) 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: AL }}>Redes Privadas LTE/5G</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">¿Evalúa una red privada para su operación?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              OSC Top Solutions diseña, despliega y opera redes privadas LTE/5G en minería, manufactura, puertos y sectores de misión crítica en toda LATAM. Presente en 16+ países.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${A}, ${AL})`, color: "#000" }}
            >
              Hablar con un especialista en redes privadas
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </div>

      </article>
    </>
  );
}
