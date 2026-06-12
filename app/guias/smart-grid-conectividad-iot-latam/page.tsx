import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, BookOpen, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Zap, Activity, BarChart2, Database, Cpu,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Grid y Conectividad IoT en LATAM — Whitepaper Técnico 2025–2026 | OSC",
  description:
    "Whitepaper técnico completo: AMI, arquitecturas de comunicación IoT (RF-Mesh, NB-IoT, PLC, LTE privado), DERMS, Virtual Power Plants, IEC 61850, ROI del Smart Grid y casos documentados en ENEL, EPM y Enel Chile.",
  keywords: [
    "smart grid LATAM 2025",
    "AMI advanced metering infrastructure",
    "DERMS gestión energía distribuida",
    "conectividad IoT distribución eléctrica",
    "IEC 61850 subestaciones",
    "pérdidas técnicas distribuidoras",
    "OSC Top Solutions",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/smart-grid-conectividad-iot-latam` },
  openGraph: {
    title: "Smart Grid y Conectividad IoT en LATAM — Whitepaper 2025–2026",
    description:
      "AMI, DERMS, IEC 61850, VPPs y ROI del Smart Grid para distribuidoras eléctricas latinoamericanas.",
    type: "article",
    url: `${SITE_URL}/guias/smart-grid-conectividad-iot-latam`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Smart Grid y Conectividad IoT en LATAM — Whitepaper Técnico 2025–2026",
  description: "Análisis técnico de tecnologías de telemetría, AMI y comunicaciones para redes de distribución modernas en América Latina.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01", dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/smart-grid-conectividad-iot-latam`,
  inLanguage: "es-419",
  keywords: "smart grid, AMI, DERMS, IoT distribución eléctrica, IEC 61850, VPP, LATAM",
};

/* ── Accent ─────────────────────── */
const A = "#000086";
const AL = "#818CF8";

/* ── Micro-components ───────────── */
function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle,  bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  color: "#F59E0B", label: "Consideración clave" },
    info:    { icon: Info,           bg: "rgba(129,140,248,0.07)", border: "rgba(129,140,248,0.22)", color: AL,        label: "Nota técnica" },
    success: { icon: CheckCircle2,   bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.22)",  color: "#34D399", label: "Caso documentado" },
    stat:    { icon: TrendingUp,     bg: "rgba(255,0,87,0.07)",    border: "rgba(255,0,87,0.22)",    color: "#FF0057", label: "Dato crítico 2025" },
  }[type];
  const Icon = cfg.icon;
  return (
    <div className="my-8 rounded-2xl p-5" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5"><Icon size={16} style={{ color: cfg.color }} /></div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: cfg.color }}>{cfg.label}</p>
          <div className="text-sm text-slate-300 leading-relaxed [&_strong]:text-white [&_strong]:font-semibold">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mt-20 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-black tabular-nums px-2.5 py-1 rounded-lg"
              style={{ background: `${A}18`, color: AL, border: `1px solid ${A}28` }}>
          {number}
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight">{title}</h2>
      <div className="mt-3 h-[2px] rounded-full" style={{ background: `linear-gradient(to right, ${AL}60, transparent)` }} />
    </div>
  );
}

function SubHeading({ title }: { title: string }) {
  return (
    <h3 className="text-base font-bold text-white mt-12 mb-5 flex items-center gap-3">
      <span className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${A}18`, border: `1px solid ${A}25` }}>
        <span className="w-1.5 h-1.5 rounded-sm block" style={{ background: AL, transform: "rotate(45deg)" }} />
      </span>
      {title}
    </h3>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-white/[0.09]">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr style={{ background: `${A}14`, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: AL }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.018)" : "transparent" }}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 text-xs leading-relaxed ${j === 0 ? "text-slate-200 font-medium" : "text-slate-400"}`}>{cell}</td>
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
    <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/08" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex gap-1.5">{["#FF5F57","#FFBD2E","#28C840"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}</div>
        <span className="text-[10px] text-white/30 font-mono ml-2">arquitectura</span>
      </div>
      <pre className="p-5 text-[11px] leading-relaxed text-indigo-300/80 font-mono overflow-x-auto" style={{ background: "rgba(0,0,0,0.40)" }}>{children}</pre>
    </div>
  );
}

/* ── Page ───────────────────────── */
export default function WhitepaperSmartGridLatam() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="min-h-screen" style={{ background: "#080F1E" }}>

        {/* ── HERO ── */}
        <div className="relative overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full" style={{ background: `radial-gradient(ellipse at top right, ${A}22 0%, transparent 60%)`, transform: "translate(20%,-20%)" }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background: `radial-gradient(ellipse at bottom left, rgba(129,140,248,0.08) 0%, transparent 60%)`, transform: "translate(-20%,20%)" }} />
            <div className="absolute inset-0 grid-bg opacity-[0.04]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-white/30 text-xs mb-10">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight size={11} />
              <Link href="/industrias/power-utilities" className="hover:text-white/60 transition-colors">Power Utilities</Link>
              <ChevronRight size={11} />
              <span className="text-white/50">Whitepaper</span>
            </nav>

            {/* Type badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: AL, borderColor: `${AL}40`, background: `rgba(0,0,134,0.18)` }}>
              <BookOpen size={11} />
              Whitepaper Técnico — 2025–2026
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.05] mb-6">
              Smart Grid y Conectividad{" "}
              <span style={{ color: AL }}>IoT en LATAM</span>
            </h1>

            <p className="text-white/45 text-lg font-light leading-relaxed mb-10 max-w-2xl">
              Estado del arte en tecnologías AMI, DERMS y comunicaciones IoT para redes de distribución eléctricas en América Latina, con casos documentados y modelo de ROI verificado.
            </p>

            {/* KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { value: "17.4%", label: "Pérdidas técnicas y no técnicas promedio LATAM", icon: BarChart2 },
                { value: "USD 18B", label: "Energía no recuperada anualmente en la región", icon: TrendingUp },
                { value: "14.8h", label: "SAIDI promedio LATAM (vs. 1.4h benchmark OCDE)", icon: Activity },
                { value: "29%", label: "Cobertura AMI en LATAM (vs. 74% OCDE)", icon: Cpu },
              ].map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div key={kpi.label} className="rounded-2xl p-4 border" style={{ background: "rgba(0,0,134,0.15)", borderColor: `${AL}25` }}>
                    <Icon size={14} className="mb-2" style={{ color: AL }} />
                    <div className="text-2xl font-black text-white mb-1">{kpi.value}</div>
                    <div className="text-[10px] text-white/35 leading-snug">{kpi.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-white/30"><Clock size={12} /> 12 min lectura</span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5 text-xs text-white/30"><BookOpen size={12} /> 24 páginas</span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5 text-xs text-white/30"><Zap size={12} /> AMI · DERMS · IEC 61850 · VPP</span>
            </div>
          </div>
        </div>

        {/* ── ARTICLE BODY ── */}
        <div className="max-w-4xl mx-auto px-6 pb-24">

          {/* Abstract */}
          <SectionHeading number="00" title="Abstract Ejecutivo" />
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            Las redes de distribución eléctrica latinoamericanas enfrentan una transformación sin precedentes. La irrupción masiva de energía solar distribuida, vehículos eléctricos, sistemas de almacenamiento BESS y prosumidores ha convertido la red de distribución unidireccional del siglo XX en un sistema bidireccional de enorme complejidad operativa que los modelos de gestión tradicionales no están equipados para manejar.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            Las pérdidas técnicas y no técnicas en distribución continúan siendo el mayor destructor de valor en el sector eléctrico de la región: el promedio latinoamericano de pérdidas es del <strong className="text-white">17.4%</strong>, frente al 6–8% de las utilities de clase mundial. En términos económicos, esas pérdidas adicionales representan aproximadamente <strong className="text-white">USD 18B anuales</strong> de energía no recuperada.
          </p>
          <Callout type="stat">
            La solución a ambos desafíos —gestionar la complejidad de la red bidireccional y reducir las pérdidas— converge en la misma infraestructura: <strong>la conectividad IoT de campo y la arquitectura de Smart Grid</strong>. Medidores AMI, sensores de red, sistemas de automatización y DERMS; todo depende de comunicar datos confiablemente desde miles de puntos de campo hasta los sistemas de gestión centrales.
          </Callout>

          <SubHeading title="El Contexto: Por Qué LATAM Necesita Smart Grid con Urgencia" />
          <DataTable
            headers={["Indicador", "LATAM Promedio", "Benchmark Clase Mundial", "Costo de la Brecha", "Fuente"]}
            rows={[
              ["Pérdidas técnicas y no técnicas", "17.4%", "5.8%", "USD 18B/año en energía no recuperada", "OLADE 2025"],
              ["Cobertura de medidores AMI", "29% del parque", "74% (IEA OCDE)", "Imposibilidad de facturación granular", "IEA AMI 2025"],
              ["SAIDI (horas de interrupción/año)", "14.8 horas", "1.4 horas (OCDE)", "Penalizaciones regulatorias + NPS", "IEA Reliability 2025"],
              ["Penetración DER (solar + BESS)", "8.4% capacidad", "28% (OCDE)", "Red no preparada para gestión bidireccional", "IRENA LATAM 2025"],
              ["Distribuidoras con ADMS+IoT", "22%", "81% (OCDE)", "Sin capacidad de operación activa", "CIGRE LATAM 2025"],
              ["Inversión en digitalización/MWh", "USD 0.8/MWh", "USD 3.1/MWh (OCDE)", "Brecha estructural de inversión", "IEA Energy 2025"],
            ]}
          />

          {/* § 1 */}
          <SectionHeading number="01" title="La Arquitectura del Smart Grid: Del Modelo Pasivo al Activo" />
          <SubHeading title="La Transición del Grid 2.0 al Grid 4.0" />
          <DataTable
            headers={["Generación", "Período", "Características", "Estado en LATAM"]}
            rows={[
              ["Grid 2.0 — Automatización Temprana", "1980–2005", "SCADA básico; teleprotección en transmisión; medidores electromecánicos", "Aún prevalente en distribución rural y algunas ciudades"],
              ["Grid 3.0 — Digitalización", "2005–2020", "AMI de primera generación; ADMS/DMS; primeros PMUs en transmisión; GIS energético", "Adoptado en distribuidoras urbanas grandes (ENEL, EPM, Endesa Chile)"],
              ["Grid 4.0 — Inteligencia y Resiliencia", "2020–2030", "AMI completo con analítica; DERMS; VPP; 5G para control; IA autónoma", "Pilotos avanzados en Brasil, Chile, Colombia; despliegue masivo en curso"],
            ]}
          />

          <SubHeading title="La Pirámide de Datos del Smart Grid" />
          <CodeBlock>{`FUENTES DE DATOS (Producción de campo)
├─ Medidores AMI: 96 lecturas/día/medidor × 1M medidores = 96M puntos/día
├─ Sensores de transformador MT/BT: cada 5 min × 50,000 transformadores
├─ IEDs de subestación (PMUs): 30–120 muestras/segundo por punto
├─ Sensores de calidad de energía: continuo por feeder
└─ Georeferenciación de equipos móviles de campo

CAPA DE COMUNICACIONES (Transporte)
├─ FAN (Field Area Network): RF-Mesh Wi-SUN + NB-IoT para medidores AMI
├─ NAN (Neighborhood Area Network): PLC-G3 o LoRaWAN para sensores MT/BT
└─ WAN: Fibra / microondas para subestaciones; LTE para equipos móviles

CAPA DE PLATAFORMA
├─ MDMS (Meter Data Mgmt System): almacenamiento, VEE, analítica de medidores
├─ ADMS/DMS: gestión activa de la red de distribución en tiempo real
├─ DERMS: gestión de recursos de energía distribuida (DER)
└─ OMS (Outage Management System): gestión de interrupciones del servicio

CAPA DE ANALÍTICA E INTELIGENCIA
├─ Detección de pérdidas no técnicas (ML sobre patrones de consumo)
├─ Predicción de demanda (LSTM; Prophet; variables exógenas)
├─ Mantenimiento predictivo de activos (transformadores, cables)
└─ Optimización de voltaje y reducción de pérdidas técnicas (CVR/VVO)`}</CodeBlock>

          {/* § 2 */}
          <SectionHeading number="02" title="AMI: Advanced Metering Infrastructure" />
          <SubHeading title="Componentes del Sistema AMI" />
          <DataTable
            headers={["Componente", "Función", "Especificaciones Clave", "Protocolos"]}
            rows={[
              ["Smart Meter (AMI)", "Medición activa y reactiva; telemetría bidireccional; calidad de energía", "Clase 0.5S; IEC 62056 DLMS/COSEM; tamper detection; memoria 15 min × 90 días", "DLMS/COSEM; ANSI C12.18/22; IDIS"],
              ["Data Concentrator Unit (DCU)", "Agregación 500–5,000 medidores; routing de comandos; buffer local", "LTE/4G primary + fibra upstream; RF-Mesh/PLC downstream; UPS; IP65", "DLMS/COSEM a medidores; HTTPS/MQTT hacia MDMS"],
              ["MDMS", "Almacenamiento masivo; VEE; integración ERP/billing; analítica de consumo", "Ingesta > 100M lecturas/día; VEE < 2 horas; integración SAP IS-U, Oracle CC&B", "REST/SOAP hacia sistemas empresariales; MQTT para ingesta"],
              ["Head End System (HES)", "Plataforma de gestión y comunicación con todos los DCUs; scheduling de lecturas", "Disponibilidad 99.99%; gestión de colas; concurrencia de miles de DCUs", "DLMS/COSEM; protocolos propietarios de fabricantes"],
              ["HAN Gateway", "Comunicación entre medidor y dispositivos domiciliarios (termostatos, EV, solar)", "ZigBee SE 2.0; Z-Wave Plus; Wi-Fi 6; latencia < 100ms", "ZigBee SE 2.0; OCPP 2.0 (EV)"],
            ]}
          />

          <SubHeading title="Tecnologías de Comunicación AMI: Selección por Contexto" />
          <DataTable
            headers={["Tecnología", "Throughput", "Alcance", "Densidad Óptima", "Ventajas", "Limitaciones", "Aplicación LATAM"]}
            rows={[
              ["RF-Mesh (Wi-SUN 802.15.4g)", "300 Kbps–2 Mbps", "300–800 m/salto", "> 500 medidores/km²", "Red autónoma; auto-healing; sin costo de espectro", "CAPEX alto; deployment complejo en baja densidad", "Zonas urbanas densas: EPM, Enel SP, Enel Chile"],
              ["PLC Narrowband (G3-PLC / PRIME)", "10–500 Kbps", "Limitado por topología", "Redes con buena continuidad de línea", "Sin infraestructura radio adicional; usa línea eléctrica existente", "Susceptible a ruido eléctrico; requiere inyectores", "Brasil (COPEL, AES Tietê) y Chile en BT estructurada"],
              ["NB-IoT (3GPP Rel. 13)", "200 Kbps DL", "Cobertura extendida +20 dB", "Áreas periurbanas y rurales", "SLA garantizado; bajo costo de dispositivo; batería > 10 años", "Dependencia del operador móvil", "Perú, Ecuador, Colombia rural, México rural"],
              ["LoRaWAN", "250 bps–50 Kbps", "5–20 km rural", "< 200 dispositivos/km²", "Muy bajo costo; largo alcance; batería > 10 años", "Sin SLA garantizado; no apto para alta densidad", "Sensores auxiliares; no para AMI masivo en zonas densas"],
              ["Private LTE / LTE-M", "1–10 Mbps", "1–10 km", "Toda escala (flexible)", "Control total de SLA; latencia determinística; escalable", "Mayor CAPEX; gestión de red propia", "Distribuidoras con LTE privada para OT bundle con SCADA"],
            ]}
          />

          <SubHeading title="KPIs de Performance de un Despliegue AMI Maduro" />
          <DataTable
            headers={["KPI", "Definición", "Benchmark Clase Mundial", "Impacto en Negocios"]}
            rows={[
              ["Read Rate", "% medidores con ≥ 1 lectura válida en período de billing", "> 99% mensual", "Facturación precisa; detección de fraude"],
              ["Data Completeness", "% de intervalos de medición que llegan sin errores", "> 97.5%", "Análisis de consumo; balance energético"],
              ["Command Success Rate", "% de comandos (corte, reconexión) ejecutados en primer intento", "> 99.5%", "Gestión de cartera; eficiencia operativa"],
              ["Tamper Alert Rate", "% eventos de manipulación detectados en < 15 min", "> 95% de detección", "Reducción de pérdidas no técnicas"],
              ["Latencia de Outage Notification", "Tiempo desde corte hasta alerta en OMS via last gasp", "< 3 minutos", "SAIDI/SAIFI mejorado; mejor NPS"],
              ["Costo por lectura", "OPEX total / número de lecturas procesadas", "< USD 0.002/lectura", "Eficiencia vs. lectura manual"],
            ]}
          />

          {/* § 3 */}
          <SectionHeading number="03" title="Telecomunicaciones en Subestaciones: IEC 61850" />
          <SubHeading title="El Estándar que Unifica la Comunicación de Subestaciones" />
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            IEC 61850 reemplaza el cableado de cobre señal-por-señal tradicional por comunicaciones digitales sobre Ethernet, reduciendo drásticamente los costos de ingeniería en nuevas subestaciones y permitiendo la reconfiguración remota de esquemas de protección.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { title: "GOOSE (Generic Object-Oriented Substation Event)", desc: "Mensajes de alta prioridad y baja latencia (< 4 ms) para comunicación de eventos de protección entre IEDs. Cuando un relé detecta una falla, envía GOOSE a otros relés para coordinar la apertura de interruptores. La latencia de 4 ms es un requisito absoluto — un retardo mayor puede permitir que la falla cause daño al equipo." },
              { title: "MMS (Manufacturing Message Specification)", desc: "Comunicación cliente-servidor para supervisión y control (HMI↔IEDs, SCADA↔subestación). Latencia tolerante (100 ms–2 s). Para lecturas periódicas, comandos de apertura/cierre e interruptores y configuración de parámetros de relés." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl border" style={{ background: "rgba(0,0,134,0.12)", borderColor: `${AL}20` }}>
                <p className="font-bold text-white text-xs mb-2">{item.title}</p>
                <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Callout type="warning">
            <strong>Implicación de seguridad crítica:</strong> GOOSE en su implementación básica NO tiene autenticación ni cifrado. Un dispositivo en la misma red Ethernet puede inyectar mensajes GOOSE falsos y provocar la apertura no autorizada de interruptores. Las redes de comunicación de subestaciones IEC 61850 deben estar físicamente aisladas o micro-segmentadas. Un atacante con acceso puede manipular protecciones eléctricas.
          </Callout>

          <SubHeading title="PMUs (Phasor Measurement Units) y WAMS" />
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Las PMUs miden magnitudes y ángulos de fase con sincronización GPS de ±1 microsegundo a tasas de 30–120 muestras/segundo, habilitando aplicaciones imposibles con instrumentación tradicional:
          </p>
          <ul className="space-y-2.5 text-sm text-slate-300 mb-6">
            {[
              "Detección de oscilaciones inter-área (0.1–2 Hz) que pueden causar inestabilidad del sistema eléctrico antes de que sean visibles con SCADA convencional.",
              "Estimación de estado de alta precisión: cálculo en tiempo real del estado operativo completo de la red, ×100 más preciso que los medidores convencionales.",
              "Detección de fallas en líneas de transmisión con resolución de ±500 m.",
              "Alerta temprana ante condiciones de colapso de tensión.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: AL }} />
                {item}
              </li>
            ))}
          </ul>
          <Callout type="info">
            <strong>Estado WAMS en LATAM 2025:</strong> Brasil (ONS) tiene el sistema más desarrollado con &gt; 80 PMUs. Colombia (XM) tiene 42 PMUs en el STN. Chile (CEN) y Perú (COES) tienen implementaciones parciales.
          </Callout>

          {/* § 4 */}
          <SectionHeading number="04" title="DERMS: Gestión de Recursos de Energía Distribuida" />
          <SubHeading title="El Problema que el DERMS Resuelve" />
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            La penetración de DER —solar fotovoltaica, baterías BESS, puntos de carga EV, microgeneradores— está creciendo exponencialmente. En una zona residencial de Santiago o São Paulo con 30% de penetración solar, el alimentador puede tener flujo de energía inverso en horas de alta generación. Los efectos técnicos:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { title: "Reverse Power Flow", desc: "Tensión elevada al final del alimentador; posible violación de límites regulatorios de calidad de tensión." },
              { title: "Voltage Rise", desc: "Los inversores fotovoltaicos pueden llevar la tensión al 110–115% de la nominal." },
              { title: "Protection Coordination Issues", desc: "Los esquemas de protección radiales no detectan correctamente fallas cuando hay fuentes distribuidas." },
              { title: "Incertidumbre de Demanda Neta", desc: "Sin telemetría en tiempo real de los DERs, la demanda neta es altamente impredecible." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl border" style={{ background: "rgba(0,0,134,0.10)", borderColor: `${AL}18` }}>
                <p className="font-bold text-white text-xs mb-1.5">{item.title}</p>
                <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <SubHeading title="Arquitectura DERMS" />
          <CodeBlock>{`ARQUITECTURA DE GESTIÓN DER

NIVEL REGULATORIO / MERCADO
└─ Mercado de Capacidad / Servicios Ancilares
   (VPP participando en mercados; DER como reserva flexible)
               ↑↓ señales de precio / capacidad

NIVEL DERMS (Distribuidora)
├─ Inventario DER: registro de todos los DER activos (PV, BESS, EVSE)
├─ DER Dispatch Optimization: algoritmo MPC / LP
│   → minimizar pérdidas + maximizar autogeneración + respetar límites
├─ VPP Aggregation: agrupación virtual de DER para mercados
├─ Voltage/VAR Management: corrección de tensión via inversores DER
└─ Constraint Management: detección y mitigación de congestiones locales
               ↓ señales de control (< 5 s)

NIVEL DISPOSITIVO DER
├─ Inversores PV con comunicación (SunSpec, IEC 61850, Modbus)
├─ BESS con BMS comunicado (SunSpec; IEC 61850; OCPI)
├─ EVSE con comunicación (OCPP 2.0.1; ISO 15118)
└─ Smart thermostats / cargas gestionables (CTA-2045; IEEE 2030.5)`}</CodeBlock>

          <SubHeading title="Virtual Power Plants (VPP) en LATAM 2025" />
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Una VPP agrega virtualmente múltiples DER distribuidos geográficamente que actúan coordinadamente como si fueran una sola planta de generación. Una VPP de 5,000 hogares con BESS de 5 kWh puede ofrecer 25 MW de respuesta en segundos — comparable a una pequeña planta de gas de peaking.
          </p>
          <DataTable
            headers={["País", "Estado", "Referencia"]}
            rows={[
              ["Brasil", "Marco regulatorio habilitado por ANEEL Resolução 1000/2021. Pilotos activos: Neoenergia SP (2,000 clientes) y EDP Brasil.", "ANEEL 2021"],
              ["Chile", "CNE en consulta pública para 'agregadores de flexibilidad' (Q2 2025). Piloto ENEL Chile + Tesla Powerwall en Santiago.", "CNE 2025"],
              ["Colombia", "CREG Resolución 015/2018 + Decreto 829/2023. Piloto EPM Medellín: 1,200 usuarios en ADR activo con reducción de pico del 7.8%.", "CREG 2018/2023"],
            ]}
          />

          {/* § 5 */}
          <SectionHeading number="05" title="Casos de Implementación: Smart Grid LATAM 2024–2025" />

          {[
            {
              title: "ENEL São Paulo — AMI Masivo + Detección de Pérdidas ML",
              loc: "Brasil",
              color: "#22C55E",
              body: "ENEL São Paulo (8.4M clientes) tiene el despliegue AMI más grande de LATAM: 3.4M medidores al Q1 2025, de 6M proyectado para 2026. Tecnología: RF-Mesh Wi-SUN de Landis+Gyr con HES de Itron.",
              results: [
                "Pérdidas no técnicas en zonas con AMI 100%: reducción del 34% en 24 meses.",
                "Detección de fraudes via ML: 847,000 eventos detectados en 2024 (vs. 180,000 con inspección manual).",
                "SAIDI en zonas con OMS integrado a AMI: reducción del 28% vs. zonas sin AMI.",
                "Tiempo de detección de outage (last gasp): 2.8 minutos promedio vs. 22 minutos con llamadas de clientes.",
              ],
              source: "ENEL Brasil, Relatório de Sustentabilidade 2024; ANEEL 2024.",
            },
            {
              title: "EPM Medellín — ADMS + Smart Grid Integrado",
              loc: "Colombia",
              color: "#F59E0B",
              body: "EPM es la utility eléctrica de referencia en Colombia. Opera ADMS de GE Vernova integrado con OMS, AMI de 1.4M medidores y predicción de demanda con MAPE < 2.4%.",
              results: [
                "SAIDI 2024: 3.2 horas/usuario/año (vs. promedio LATAM 14.8 horas — récord regional).",
                "Pérdidas totales: 9.1% (objetivo regulatorio < 11%; promedio LATAM 17.4%).",
                "94% de detección de fallas en feeders automatizadas via ADMS.",
                "Primer proyecto piloto VPP activo: 1,200 clientes con reducción de pico del 7.8%.",
              ],
              source: "EPM Medellín, Informe Integrado de Gestión 2024; SSPD Colombia 2024.",
            },
            {
              title: "Enel Chile — Renovables + Smart Grid en Alta Tensión",
              loc: "Chile",
              color: AL,
              body: "Enel Chile implementó PMUs en todos los nudos críticos del SEN y un sistema DERMS piloto para gestión de la generación renovable variable (solar Atacama + eólico sur).",
              results: [
                "Reducción de curtailment de energía renovable zona norte: 38% con DERMS activo vs. despacho manual.",
                "Detección de oscilaciones inter-área via WAMS: alertas con 3–8 minutos de anticipación.",
                "Cobertura AMI Región Metropolitana: 78% del parque (primera distribuidora de Chile en superar 75%).",
              ],
              source: "Enel Chile, Memoria Anual 2024; Coordinador Eléctrico Nacional Chile 2024.",
            },
          ].map((cs) => (
            <div key={cs.title} className="mb-8 rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
              <div className="px-5 py-4 flex items-start gap-4 border-b border-white/08">
                <div className="shrink-0 w-2 h-2 rounded-full mt-1.5" style={{ background: cs.color }} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: cs.color }}>{cs.loc}</p>
                  <p className="font-bold text-white text-sm">{cs.title}</p>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{cs.body}</p>
                <ul className="space-y-2">
                  {cs.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: cs.color }} />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-white/25 mt-4 italic">{cs.source}</p>
              </div>
            </div>
          ))}

          {/* § 6 */}
          <SectionHeading number="06" title="Seguridad en Redes de Comunicación AMI" />
          <Callout type="warning">
            Los medidores AMI no son solo instrumentos de medición — son activos con capacidad de <strong>cortar y reconectar el suministro eléctrico de millones de hogares</strong>. Un atacante que comprometa el sistema AMI de una distribuidora puede ejecutar un corte masivo coordinado. Puerto Rico (2009): hackers comprometieron medidores via RF causando USD 400M en energía no facturada.
          </Callout>
          <DataTable
            headers={["Capa", "Controles de Seguridad", "Estándar de Referencia"]}
            rows={[
              ["Físico (medidor)", "Tamper detection con alerta inmediata; sellado físico de puertos; certificación metrológica", "OIML R 46; IEC 62052-11"],
              ["Comunicación de campo (RF/PLC)", "Cifrado AES-128 DLMS; autenticación de dispositivos via certificados; detección de inyección", "DLMS/COSEM Security Suite 0/1/2; IEC 62056-5-3"],
              ["Comunicación WAN (DCU → HES)", "TLS 1.3; certificados X.509 renovados automáticamente; túnel dedicado; sin acceso a internet público", "NIST SP 800-187; IEC 62351-8"],
              ["HES / MDMS (sistemas centrales)", "VPN + MFA; SIEM con monitoreo de comandos masivos; alertas ante comandos de corte inusuales", "IEC 62351-8; NERC CIP-007"],
              ["API de integración", "OAuth 2.0 + API Gateway con rate limiting; mutual TLS; log inmutable de todos los comandos", "OWASP API Security Top 10 2025"],
            ]}
          />

          {/* § 7 */}
          <SectionHeading number="07" title="ROI del Smart Grid: El Caso de Negocio" />
          <DataTable
            headers={["Fuente de Valor", "Mecanismo", "Impacto Documentado", "Referencia"]}
            rows={[
              ["Reducción de pérdidas no técnicas", "Detección ML via AMI: manipulación, conexiones clandestinas, bypass de medidor", "USD 8M–22M", "ENEL SP / ANEEL 2024"],
              ["Reducción de OPEX de lectura y campo", "Eliminación de lecturas manuales; reducción de órdenes de trabajo", "USD 3M–7M", "McKinsey Utilities 2025"],
              ["Mejora de SAIDI/SAIFI", "Outage detection + reconfiguración automática; reducción de multas regulatorias", "USD 1.5M–4.5M", "ANEEL/SSPD/CNSE 2024"],
              ["CVR (Conservation Voltage Reduction)", "Optimización de tensión: reducción de consumo y pérdidas técnicas", "USD 800K–2.2M", "EPRI CVR Studies 2024"],
              ["Mantenimiento predictivo de activos", "Telemetría de transformadores y equipos para mantenimiento predictivo", "USD 400K–1.1M", "IEA Smart Grid 2025"],
              ["Nuevos productos tarifarios", "Tarifas TOU habilitadas por AMI; ADR activo; VPP", "Variable (nuevo revenue stream)", "IRENA 2025"],
              ["VALOR ANUAL TOTAL", "—", "USD 13.7M–36.8M", "—"],
              ["ROI sobre inversión AMI completa", "—", "250–520% en 10 años", "—"],
              ["Payback", "—", "3–5 años", "—"],
            ]}
          />

          {/* § 8 */}
          <SectionHeading number="08" title="Hoja de Ruta: Del Grid Tradicional al Grid 4.0" />
          <DataTable
            headers={["Nivel", "Capacidades", "% Distribuidoras LATAM (2025)"]}
            rows={[
              ["N1 — Grid Pasivo", "Medición manual; SCADA básico; sin automatización de distribución", "28%"],
              ["N2 — Grid Supervisado", "AMI parcial (< 40%); SCADA moderno; OMS básico; sin integración campo-sistema", "34%"],
              ["N3 — Grid Activo", "AMI > 70%; ADMS/DMS operativo; VVC/CVR; OMS integrado; detección ML de pérdidas", "24%"],
              ["N4 — Grid Inteligente", "AMI 100%; DERMS operativo; ADR activo; predicción demanda < 2% MAPE; VPP piloto", "11%"],
              ["N5 — Grid Autónomo", "IA para operación autónoma; mercados de flexibilidad activos; digital twin completo", "3%"],
            ]}
          />

          <SubHeading title="Prioridades de Inversión 2025–2027 para Escalar a N3" />
          {[
            { year: "Año 1", items: ["AMI Piloto (50,000 medidores en zona de alta pérdida no técnica): ROI en 18–24 meses. RF-Mesh para urbano, NB-IoT para periurbano.", "Sensores de calidad de tensión en MT (50–100 transformadores en zonas críticas de DER): habilitador de DERMS.", "MDMS y plataforma de analítica básica: prerequisito técnico para todas las aplicaciones de valor."] },
            { year: "Año 2–3", items: ["Expansión AMI al 100% de la zona de concesión.", "ADMS/DMS para gestión activa de la red de distribución.", "Integración OMS-AMI para outage detection automático.", "ML para detección de pérdidas: activo desde que AMI supera 60% de cobertura."] },
          ].map((phase) => (
            <div key={phase.year} className="mb-5 p-5 rounded-2xl border" style={{ background: "rgba(0,0,134,0.10)", borderColor: `${AL}20` }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: AL }}>{phase.year}</p>
              <ul className="space-y-2">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: AL }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Conclusions */}
          <div className="mt-14 p-7 rounded-3xl border" style={{ background: "linear-gradient(135deg, rgba(0,0,134,0.18) 0%, rgba(0,0,0,0) 100%)", borderColor: `${AL}22` }}>
            <h2 className="text-xl font-bold text-white mb-4">Conclusiones</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              La transformación del sector eléctrico latinoamericano hacia redes inteligentes no es una opción tecnológica — es un imperativo económico (USD 18B anuales en pérdidas), regulatorio (SAIDI comprometido en contratos de concesión) y de política energética (integración de renovables sin DERMS es imposible a escala).
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              El retorno económico es consistente y documentado: USD 250–520% en 10 años para distribuidoras que implementan AMI completo con analítica de pérdidas. Payback de 3–5 años dentro del horizonte de planificación de cualquier concesionaria con contrato de largo plazo.
            </p>
          </div>

          {/* References */}
          <details className="mt-10">
            <summary className="text-xs text-white/30 cursor-pointer hover:text-white/50 transition-colors font-bold uppercase tracking-widest">Fuentes y Referencias (25)</summary>
            <ol className="mt-4 space-y-1.5 text-xs text-slate-500 leading-relaxed list-decimal pl-5">
              {["OLADE, Balance Energético de América Latina y el Caribe 2025, Q1 2025.","IEA, AMI World Report 2025: Advanced Metering Infrastructure Deployment Status, 2025.","IEA, Smart Grid Reliability Statistics 2025: SAIDI/SAIFI Benchmarks.","IEA, Smart Grid Benefits and Costs: Utility Evidence from Commercial Deployments, 2025.","IEA, Energy Investment Report 2025: Electricity Sector, mayo 2025.","IRENA, Distributed Energy Resources and Virtual Power Plants in Latin America, 2025.","IRENA, LATAM DER Penetration and Grid Integration Report 2025.","CIGRE, TB 834: Wide Area Monitoring Systems: Deployment and Applications, 2024.","CIGRE LATAM, State of Digital Distribution Networks in Latin America 2025.","EPRI, Smart Grid Value Assessment: Commercial Utility Evidence 2024.","McKinsey & Company, Utilities Practice: Smart Grid ROI and Operating Model Transformation 2025.","ENEL Brasil, Relatório de Sustentabilidade 2024.","ANEEL Brasil, Relatório de Qualidade de Fornecimento de Energia Elétrica 2024.","EPM Medellín, Informe Integrado de Gestión 2024.","Enel Chile, Memoria Anual 2024.","Coordinador Eléctrico Nacional Chile (CEN), Estadísticas del Sistema Eléctrico Nacional 2024.","Wi-SUN Alliance, AMI Network Performance and Technical Report 2025.","DLMS User Association, AMI Connectivity Solutions: Technical Comparison 2025.","GSMA Intelligence, NB-IoT for Utilities: Market Applications and Performance 2025.","IEC 61850:2019 — Communication Networks and Systems for Power Utility Automation.","IEC 62351-6:2020 — Security for IEC 61850 Communications.","IEC 62056 DLMS/COSEM — Electricity Metering Data Exchange, actualización 2024.","ANEEL Brasil, Resolução Normativa 1000/2021: Geração Distribuída e Prosumidores.","CREG Colombia, Resolución 015/2018: Actividades de Gestión de la Demanda.","NIST, SP 800-187: Guide to LTE Security, 2017."].map((ref, i) => (
                <li key={i}>{ref}</li>
              ))}
            </ol>
          </details>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-white/08 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <Link href="/industrias/power-utilities" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm">
              <ArrowLeft size={14} /> Volver a Power Utilities
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-bold text-sm text-white px-6 py-3.5 rounded-full transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, #000086 0%, #2020A0 100%)`, boxShadow: `0 4px 20px rgba(0,0,134,0.50)` }}
            >
              Hablar con un especialista en Smart Grid
              <ChevronRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
