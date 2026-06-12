import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, FileText, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Radio, Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Guía Técnica: Despliegue 5G SA en América Latina — Implementación 2025–2026 | OSC",
  description:
    "Framework técnico completo para despliegue de redes 5G Standalone en LATAM: arquitectura 5GC cloud-native, Network Slicing, MEC, espectro por país, Open RAN, regulación comparada y hoja de ruta de 24 meses.",
  keywords: [
    "despliegue 5G SA América Latina",
    "5G Standalone LATAM arquitectura",
    "Network Slicing 5G operadores",
    "5G Core cloud-native NSA SA diferencias",
    "MEC Multi-Access Edge Computing 5G",
    "OSC Top Solutions telecoms",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/despliegue-5g-sa-america-latina` },
  openGraph: {
    title: "Guía Técnica: Despliegue 5G SA en América Latina",
    description: "Arquitectura 5GC cloud-native, Network Slicing, MEC, espectro por país y hoja de ruta de 24 meses para operadores LATAM.",
    type: "article",
    url: `${SITE_URL}/guias/despliegue-5g-sa-america-latina`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Guía Técnica: Despliegue 5G SA en América Latina — Edición 2025–2026",
  description: "Requisitos técnicos, consideraciones regulatorias y arquitectura de referencia para el despliegue de redes 5G Stand Alone en mercados LATAM.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01", dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/despliegue-5g-sa-america-latina`,
  inLanguage: "es-419",
};

const A = "#0891B2";
const AL = "#22D3EE";

function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle, bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", color: "#F59E0B", label: "Alerta de implementación" },
    info:    { icon: Info,          bg: "rgba(8,145,178,0.07)",  border: "rgba(8,145,178,0.22)",  color: AL,        label: "Nota técnica" },
    success: { icon: CheckCircle2,  bg: "rgba(8,145,178,0.07)",  border: "rgba(8,145,178,0.22)",  color: AL,        label: "Capacidad diferencial" },
    stat:    { icon: TrendingUp,    bg: "rgba(255,0,87,0.07)",   border: "rgba(255,0,87,0.22)",   color: "#FF0057", label: "Dato de mercado 2025" },
    danger:  { icon: AlertTriangle, bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.28)",  color: "#EF4444", label: "Riesgo técnico" },
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
            {headers.map(h => <th key={h} className="text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: AL }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.018)" : "transparent" }}>
              {row.map((cell, j) => <td key={j} className={`px-4 py-3 text-xs leading-relaxed ${j === 0 ? "text-slate-200 font-medium" : "text-slate-400"}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeBlock({ children, label = "arquitectura" }: { children: string; label?: string }) {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/08" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex gap-1.5">{["#FF5F57","#FFBD2E","#28C840"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}</div>
        <span className="text-[10px] text-white/30 font-mono ml-2">{label}</span>
      </div>
      <pre className="p-5 text-[11px] leading-relaxed text-cyan-300/80 font-mono overflow-x-auto" style={{ background: "rgba(0,0,0,0.40)" }}>{children}</pre>
    </div>
  );
}

export default function Guia5GSA() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="min-h-screen" style={{ background: "#080F1E" }}>
        <div className="relative overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full" style={{ background: `radial-gradient(ellipse at top right, ${A}12 0%, transparent 60%)`, transform: "translate(20%,-20%)" }} />
            <div className="absolute inset-0 grid-bg opacity-[0.04]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6">
            <nav className="flex items-center gap-1.5 text-white/30 text-xs mb-10">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <Link href="/industrias/telecoms" className="hover:text-white/60 transition-colors">Telecoms</Link>
              <ChevronRight size={12} />
              <span style={{ color: AL }}>Guía Técnica</span>
            </nav>
            <Link href="/industrias/telecoms" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: `${AL}80` }}>
              <ArrowLeft size={14} /><span>Volver a Telecoms</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <FileText size={11} />Guía Técnica · Implementación 2025–2026
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Despliegue 5G SA<br /><span style={{ color: AL }}>en América Latina</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
              Framework técnico, regulatorio y operativo para operadores que planifican o están en proceso de despliegue de 5G Standalone en mercados latinoamericanos. Arquitectura 5GC cloud-native, Network Slicing, MEC y hoja de ruta de 24 meses.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Clock size={13} />8 min de lectura</span>
              <span className="flex items-center gap-1.5"><FileText size={13} />16 páginas</span>
              <span className="flex items-center gap-1.5"><Radio size={13} />Sector Telecoms</span>
              <span>23 fuentes verificadas</span>
            </div>
          </div>
        </div>

        {/* KPI STRIP */}
        <div className="border-y border-white/08" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "18", l: "Operadores con 5G comercial en LATAM (NSA + SA)", ctx: "GSMA Intelligence Q1 2025" },
              { v: "7", l: "Han lanzado o anunciado 5G SA comercial para 2025–2026", ctx: "Brasil lidera: Claro, Vivo, TIM" },
              { v: "×3–5", l: "ARPU premium con Network Slicing enterprise vs. conectividad convencional", ctx: "GSMA Network Slicing 2025" },
              { v: "< 1ms", l: "Latencia URLLC en 5G SA (vs 15–30 ms en 5G NSA)", ctx: "3GPP Release 16+ con configuración adecuada" },
            ].map(({ v, l, ctx }) => (
              <div key={v}>
                <p className="text-3xl font-black text-white tabular-nums">{v}</p>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{l}</p>
                <p className="text-[10px] font-bold mt-1.5" style={{ color: AL }}>{ctx}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <SectionHeading number="01" title="Estado del Despliegue 5G en LATAM 2025" />
          <DataTable
            headers={["País", "Operadores con 5G", "Tecnología", "Cobertura (% pob.)", "Estado SA"]}
            rows={[
              ["Brasil", "Claro, Vivo, TIM, Oi (parcial)", "NSA + SA", "68% NSA; 31% SA", "SA comercial (Claro, Vivo, TIM)"],
              ["México", "AT&T México, Telcel", "NSA + SA piloto", "51% NSA", "SA piloto Q4 2025"],
              ["Colombia", "Claro, Movistar, Tigo, WOM", "NSA", "34% NSA", "SA proyectado 2026"],
              ["Chile", "Entel, Movistar, Claro, WOM", "NSA + SA piloto", "48% NSA", "SA piloto Entel + Movistar"],
              ["Perú", "Claro, Movistar, Entel", "NSA", "28% NSA", "SA proyectado 2026–2027"],
              ["Argentina", "Personal, Claro, Movistar", "NSA", "38% NSA", "SA proyectado 2027"],
              ["Ecuador", "Claro, Movistar, CNT", "NSA (piloto)", "8%", "SA 2027+"],
              ["Panamá", "Tigo, Claro, Movistar", "NSA", "41% NSA", "SA en evaluación"],
            ]}
          />

          <SectionHeading number="02" title="NSA vs. SA: La Diferencia que Importa" />
          <p className="text-slate-300 leading-relaxed mb-4">
            El 5G SA no es simplemente un upgrade de radio — es una transformación de arquitectura de principio a fin: del EPC monolítico al 5GC cloud-native con funciones de red virtualizadas orquestadas por Kubernetes.
          </p>
          <DataTable
            headers={["Capacidad", "En 5G NSA", "En 5G SA", "Aplicación Crítica"]}
            rows={[
              ["Network Slicing", "Limitado / No real", "Sí — nativo (3GPP Release 15+)", "Redes privadas industriales; servicios enterprise diferenciados"],
              ["URLLC (< 1 ms latencia)", "No", "Sí — con configuración adecuada", "Teleoperación, automatización industrial, robótica"],
              ["mMTC (massive IoT)", "Parcial", "Sí — NB-IoT + eMTC integrado", "Smart cities, agricultura, logística masiva"],
              ["Edge Computing (MEC)", "Parcial", "Sí — UPF local integrado", "Gaming, AR/VR, AI en el edge industrial"],
              ["QoS end-to-end garantizada", "Limitada", "Sí — garantizada por slice", "SLA enterprise con garantía técnica"],
              ["Seguridad mejorada (5G-AKA)", "No", "Sí — autenticación y cifrado mejorado", "Gobierno, defensa, servicios críticos"],
            ]}
          />

          <SubHeading title="Arquitectura del 5G Core (5GC) Cloud-Native" />
          <CodeBlock label="5gc — service-based-architecture (sba)">{`                 SERVICE-BASED ARCHITECTURE (SBA)
     ┌────────────────────────────────────────────────────┐
     │                                                    │
AMF  SMF   UPF   PCF   UDM   AUSF   NRF   NEF   NSSF    │
 │    │     │     │     │     │     │     │     │        │
 └────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘        │
            Service-Based Interface (SBI / HTTP2)          │
     └────────────────────────────────────────────────────┘

AMF  — Access and Mobility Management Function
SMF  — Session Management Function
UPF  — User Plane Function (deployable en edge)
PCF  — Policy Control Function (QoS y facturación)
UDM  — Unified Data Management (reemplaza HSS)
AUSF — Authentication Server Function (5G-AKA)
NRF  — Network Repository Function (descubrimiento de NFs)
NEF  — Network Exposure Function (APIs para terceros)
NSSF — Network Slice Selection Function`}</CodeBlock>
          <Callout type="info">
            <strong>Implicación operativa clave:</strong> Cada NF es un microservicio en contenedores sobre Kubernetes. La gestión ya no es la del EPC tradicional (configuración de appliances físicos) sino cloud-native: orquestación con Helm charts, observabilidad con Prometheus/Grafana, CI/CD para actualizaciones sin tiempo de inactividad.
          </Callout>

          <SectionHeading number="03" title="Espectro Radioeléctrico: La Materia Prima del 5G SA en LATAM" />
          <DataTable
            headers={["Banda", "Fortaleza", "Throughput Típico", "Estado en LATAM"]}
            rows={[
              ["700 MHz (n28)", "Cobertura y penetración — ideal para rural, suburban e interiores", "100–400 Mbps", "Asignada o en proceso en mayoría de países LATAM"],
              ["3.5 GHz (n78/n77)", "Capacidad y densificación — caballo de batalla del 5G de capacidad", "1–3 Gbps en óptimas", "Brasil (2021), Colombia (2023), Chile, México en proceso"],
              ["26 GHz (n258 / mmWave)", "Ultra-capacidad en zonas densas — estadios, aeropuertos", "> 10 Gbps teórico; radio celda 50–200 m", "Solo Brasil con asignación formal (licitación 2021)"],
            ]}
          />

          <SubHeading title="Obligaciones de Cobertura por País (Compromisos de Licitación)" />
          <DataTable
            headers={["País", "Banda Licitada", "Cobertura Comprometida", "Penalidad por Incumplimiento"]}
            rows={[
              ["Brasil", "3.5 GHz", "100% de capitales año 1; 90% municipios > 30K hab. año 5", "Multas ANATEL + devolución de espectro"],
              ["Colombia", "700 MHz + 3.5 GHz", "60% pob. urbana año 3; 30% rural año 5", "Multas CRC + obligaciones de compartición"],
              ["Chile", "700 MHz + 3.5 GHz", "85% pob. año 4; zonas rurales obligatorias", "Multas Subtel; financiamiento de cobertura rural"],
              ["México", "600 MHz + 2.5 GHz", "70% pob. año 3; sitios de interés nacional", "Sanciones IFT; retiro de licencia en reincidencia"],
              ["Perú", "700 MHz", "70% pob. año 4; capitales de región año 2", "Multas MTC; subastas reducidas en renovación"],
            ]}
          />

          <SectionHeading number="04" title="RAN 5G SA: De BTS Monolítico a Open RAN" />
          <SubHeading title="Massive MIMO: La Clave de la Eficiencia Espectral 5G" />
          <DataTable
            headers={["Parámetro", "LTE Advanced (4×4 MIMO)", "5G NR Massive MIMO (64T64R)", "Impacto"]}
            rows={[
              ["Antenas activas", "4", "64–192", "Ganancia de array: +18–24 dB"],
              ["Usuarios simultáneos por celda", "4–8 (MU-MIMO)", "16–32 (MU-MIMO 5G)", "×4–8 en capacidad efectiva"],
              ["Eficiencia espectral", "2–4 bps/Hz", "8–16 bps/Hz", "+300–400% mismo espectro"],
              ["Cobertura en interiores", "Moderada", "Mejorada (beamforming adaptativo)", "Mayor penetración en edificios"],
            ]}
          />
          <Callout type="warning">
            <strong>Consideraciones de despliegue para LATAM:</strong> Las antenas Massive MIMO 5G son significativamente más pesadas (30–50 kg) con mayor sail area. Las torres y mástiles existentes deben tener su capacidad estructural evaluada antes del upgrade. El consumo energético de una radio 5G NR con Massive MIMO es <strong>3–5× mayor que una radio LTE equivalente</strong> — auditar la infraestructura eléctrica de cada site antes del despliegue.
          </Callout>

          <SectionHeading number="05" title="Network Slicing: El Diferenciador Comercial del 5G SA" />
          <CodeBlock label="network-slicing — infraestructura-compartida">{`INFRAESTRUCTURA FÍSICA COMPARTIDA (RAN + Transporte + Core)
            │
            ├─────────────────────────────────────────
            │         NETWORK SLICING LAYER
            │
    ┌───────┴──────┐  ┌───────────────┐  ┌──────────────────┐
    │   SLICE 1    │  │    SLICE 2    │  │     SLICE 3       │
    │  eMBB Masivo │  │   URLLC Ind. │  │    mMTC IoT       │
    │              │  │              │  │                   │
    │ BW: 500 Mbps │  │ Latencia: 1ms│  │ 1M devices/km²   │
    │ Disponib:    │  │ Reliab: 99.9%│  │ Batería: 10 años │
    │  99.9%       │  │  99.999%     │  │ BW: 100 Kbps/dev │
    │              │  │              │  │                   │
    │ Clientes:    │  │ Clientes:    │  │ Clientes:         │
    │ Residencial  │  │ Minería,     │  │ Smart City,       │
    │ Streaming    │  │ Manufactura, │  │ Agricultura,      │
    │ Gaming       │  │ Robótica     │  │ Utilities IoT     │
    └──────────────┘  └──────────────┘  └───────────────────┘`}</CodeBlock>

          <DataTable
            headers={["Slice de Red", "Industria Target", "Parámetros Técnicos"]}
            rows={[
              ["Slice Industrial Ultra-Fiable", "Minería, manufactura, plantas de proceso", "Latencia < 5 ms; Disponibilidad 99.9999%; BW dedicado"],
              ["Slice Enterprise Privado", "Empresas, campus, hospitales", "Latencia < 20 ms; QoS garantizada; seguridad E2E"],
              ["Slice Video y Gaming", "Streaming 8K, cloud gaming, AR/VR", "Latencia < 10 ms; Throughput > 100 Mbps; Jitter < 1 ms"],
              ["Slice IoT Masivo", "Smart city, utilities, logística", "Latencia tolerante; cobertura extendida; coste/SIM bajo"],
              ["Slice de Emergencias", "Policía, bomberos, ambulancias", "Prioridad máxima; MCPTT; Disponibilidad 99.999%"],
            ]}
          />

          <SectionHeading number="06" title="5G Core Cloud-Native: Infraestructura y Migración" />
          <CodeBlock label="5gc-distribuido — arquitectura">{`CORE CENTRAL (Data Center Principal)
├─ AMF, SMF, PCF, UDM, AUSF, NRF, NEF, NSSF
│   (funciones de control; latencia no crítica)
└─ Redundancia activa-activa entre 2 DCs

CORE REGIONAL / EDGE (Data Centers en ciudades principales)
└─ UPF (User Plane Function) local
    ├─ Latencia de tráfico reducida (el tráfico no va al DC central)
    ├─ Habilitador de MEC (Multi-Access Edge Computing)
    │   ─ Latencia hasta usuario: < 10 ms en misma ciudad
    └─ Soporte de Network Slicing URLLC`}</CodeBlock>

          <DataTable
            headers={["Estrategia de Migración", "Descripción", "Recomendado Para"]}
            rows={[
              ["Coexistencia EPC + 5GC", "EPC sirve a abonados LTE y 5G NSA; 5GC nuevo sirve solo abonados 5G SA. Migración gradual conforme crece la base de terminales.", "Mayoría de operadores LATAM 2025–2027. Riesgo bajo; mayor complejidad operativa."],
              ["5GC unificado con soporte de LTE", "5GC incluye soporte para LTE via interfaz N26. Un único core gestiona LTE y 5G SA. Requiere 3GPP Release 16+.", "Operadores que quieren simplificar la operación a largo plazo. Mayor complejidad de implementación inicial."],
              ["Greenfield 5G SA", "Desplegar directamente 5GC sin EPC para un nuevo segmento o mercado. Sin deuda técnica de LTE.", "MVNOs de nueva generación, redes privadas industriales, operadores en mercados sin base LTE significativa."],
            ]}
          />

          <SectionHeading number="07" title="MEC: El Edge del 5G SA" />
          <CodeBlock label="mec-arquitectura — 5g-sa">{`USUARIO 5G SA (terminal, sensor, robot, cámara)
           ↓ Radio 5G NR
        gNB (gNodeB — antena 5G)
           ↓ N3 interface
    ┌──────────────────────────────┐
    │   UPF Local (edge site)      │  ← User Plane Function
    │   ─────────────────────────  │    desplegado en edge,
    │   MEC Platform               │    no en core central
    │   (ETSI MEC Application)     │
    │   ─────────────────────────  │
    │   AI Inference Engine        │  ← Procesamiento local:
    │   Container Runtime          │    modelos ML ejecutados
    │   Storage local              │    sin ir a cloud central
    └──────────────────────────────┘
           ↓ N9 interface (hacia Core Central si aplica)
    5GC Central (SMF, AMF, PCF...)`}</CodeBlock>

          <DataTable
            headers={["Caso de Uso MEC", "Industria", "Latencia Requerida"]}
            rows={[
              ["Cloud Gaming", "Entretenimiento consumer", "< 10 ms RTT"],
              ["AR/VR Industrial", "Manufactura, mantenimiento", "< 5 ms"],
              ["Video Analytics RT", "Seguridad, retail, logística", "< 10 ms inferencia"],
              ["Vehículos Conectados (V2X)", "Transporte, logística", "< 5 ms"],
              ["Digital Twin Industrial", "Minería, O&G, manufactura", "< 50 ms"],
            ]}
          />

          <SectionHeading number="08" title="Marco Regulatorio Comparado 5G SA en LATAM 2025" />
          <DataTable
            headers={["Dimensión", "Brasil", "Colombia", "Chile", "México"]}
            rows={[
              ["Autoridad regulatoria", "ANATEL", "MinTIC + CRC", "Subtel", "IFT"],
              ["Espectro 3.5 GHz asignado", "Sí (licitación 2021)", "Sí (asignación 2023)", "Sí (licitación 2021)", "Parcial (en proceso)"],
              ["Obligaciones de roaming doméstico", "Sí — MVNO habilitado", "Sí — acuerdo regulado", "Sí", "Sí"],
              ["Regulación de Network Slicing", "Sin regulación específica", "Sin regulación específica", "Sin regulación específica", "Sin regulación específica"],
              ["Regulación de MEC / Edge", "Sin regulación específica", "Sin regulación específica", "Sin regulación específica", "Sin regulación específica"],
              ["Regulación de redes privadas 5G", "Autorização AUR (ANATEL)", "Resolución en desarrollo", "Licencia Subtel", "IFT Resolution privada"],
              ["Ciberseguridad de red", "Resolução 740/2020", "Decreto 338/2022", "Ley Marco Ciber. 2024", "Lineamientos IFT"],
            ]}
          />

          <SectionHeading number="09" title="Hoja de Ruta de Despliegue 5G SA: 24 Meses" />
          {[
            { phase: "Fase 1 — Meses 1–6", title: "Preparación y Arquitectura", items: ["Definición de estrategia de migración EPC → 5GC: coexistencia, migración gradual o greenfield", "Selección de vendor de 5GC (Nokia CloudBand, Ericsson Cloud Core, Cisco Ultra Cloud Core, Huawei 5GC)", "Arquitectura de infraestructura cloud para 5GC: bare metal vs. VMware Telco Cloud vs. OpenStack vs. hyperscaler", "Diseño de arquitectura de Network Slicing: número de slices iniciales, parámetros técnicos por slice, modelo de facturación", "Evaluación estructural de torres/mástiles para antenas Massive MIMO (peso, sail area, carga de viento)", "Auditoría de capacidad eléctrica de sites: los radios 5G NR consumen 3–5× más energía que LTE"] },
            { phase: "Fase 2 — Meses 7–14", title: "Despliegue de Core e Infraestructura", items: ["Implementación de infraestructura Kubernetes en datacenters centrales y edge locations", "Despliegue y validación de todos los NFs del 5GC (AMF, SMF, UPF, PCF, UDM, AUSF, NRF, NEF, NSSF)", "Integración con sistemas OSS/BSS: provisioning de abonados 5G SA, gestión de slices, billing diferenciado", "Despliegue de primera ola de gNBs 5G SA en zonas piloto (mínimo 3 áreas urbanas representativas)", "Pruebas end-to-end de todos los casos de uso prioritarios: eMBB, URLLC (validación de latencia), Network Slicing básico"] },
            { phase: "Fase 3 — Meses 15–24", title: "Lanzamiento Comercial y Expansión", items: ["Lanzamiento comercial en mercados piloto con primeros servicios diferenciados (eMBB, servicios enterprise con SLA)", "Expansión de cobertura 5G SA por olas según obligaciones regulatorias y demanda comercial", "Activación de Network Slicing para primeros clientes enterprise industriales", "Despliegue de UPFs en edge locations para casos de uso MEC (gaming, video analytics)", "Optimización de performance: tuning de Massive MIMO beamforming, ajuste QoS por slice"] },
          ].map(({ phase, title, items }) => (
            <div key={phase} className="mb-4 rounded-2xl border overflow-hidden" style={{ borderColor: `${A}30`, background: `${A}06` }}>
              <div className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: `${A}20` }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: AL }}>{phase}</p>
                <p className="font-bold text-white text-sm">{title}</p>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {items.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-300"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />{item}</li>)}
              </ul>
            </div>
          ))}

          <SectionHeading number="10" title="KPIs del Despliegue 5G SA" />
          <DataTable
            headers={["KPI", "Definición", "Benchmark Objetivo"]}
            rows={[
              ["Cobertura 5G SA", "% de población con acceso a señal 5G SA (> −100 dBm RSRP)", "Según compromisos regulatorios"],
              ["Throughput DL promedio", "Velocidad media de descarga en condiciones reales (no peak lab)", "> 500 Mbps (ciudad)"],
              ["Latencia media RTT", "Round Trip Time en condiciones de red real", "< 10 ms (eMBB); < 2 ms (URLLC slice)"],
              ["Disponibilidad de slice", "% de tiempo que cada slice cumple su SLA", "99.9% (eMBB); 99.999% (URLLC)"],
              ["Tasa de adopción terminales 5G SA", "% de abonados activos con terminal 5G SA compatible", "> 40% de base activa en 36 meses"],
              ["ARPU incremental 5G", "Diferencia entre ARPU de abonado 5G SA vs. 4G LTE", "+15–25% sobre ARPU LTE promedio"],
              ["NPS de clientes enterprise 5G", "Net Promoter Score de clientes con servicios enterprise 5G SA", "> 45"],
            ]}
          />

          <div className="mt-16 pt-8 border-t border-white/10">
            <details className="group">
              <summary className="cursor-pointer text-sm font-bold text-white/50 hover:text-white/80 transition-colors flex items-center gap-2 list-none">
                <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] group-open:rotate-90 transition-transform">▶</span>
                Ver 23 fuentes y referencias
              </summary>
              <ol className="mt-6 space-y-2">
                {["GSMA Intelligence, \"5G in Latin America: Market Status and Deployment Tracker Q1 2025\", GSMA, marzo 2025.","GSMA Intelligence, \"Regulatory Environment for 5G in Latin America: Spectrum and Policy\", GSMA, 2025.","GSMA, \"Network Slicing: Commercial Use Cases and Revenue Opportunity\", GSMA Intelligence, 2025.","3GPP, \"TS 23.501: System Architecture for the 5G System (5GS) — Release 17\", 3GPP, 2024.","3GPP, \"TS 38.211: NR Physical Channels and Modulation — Release 17\", 3GPP, 2024.","3GPP, \"TS 33.501: Security Architecture and Procedures for 5G System\", 3GPP, Release 18, 2024.","3GPP, \"TS 28.530: Management and Orchestration — Network Slicing\", 3GPP, 2024.","ETSI, \"GS MEC 002: Multi-access Edge Computing — Technical Requirements\", ETSI, actualización 2025.","ETSI, \"GR NFV-EVE 005: Report on Cloud-Native Approaches for NFV\", ETSI, 2024.","Nokia, \"5G Massive MIMO Deployment Guide for Latin America 2025\", Nokia Bell Labs, 2025.","Nokia, \"EPC to 5GC Migration: Operator Strategy Guide\", Nokia, 2025.","Nokia, \"Network Slicing Commercial Models: Operator Use Cases\", Nokia, 2025.","Ericsson, \"5G Core Migration Strategies: Technical and Commercial Considerations\", Ericsson Technology Review, 2025.","Ericsson, \"Radio Technology 5G NR Massive MIMO: Field Performance\", Ericsson, 2025.","Analysys Mason, \"Open RAN Market Status in Latin America 2025\", Analysys Mason, Q1 2025.","O-RAN Alliance, \"O-RAN Architecture Description Version 7.0\", O-RAN Alliance, 2025.","ANATEL Brasil, \"Resolução 740/2021: Leilão 5G — Condições de Uso de Radiofrequências\", ANATEL, 2021.","MinTIC Colombia, \"Resolución de Asignación de Espectro 5G 3.5 GHz\", MinTIC, 2023.","Subtel Chile, \"Decreto de Licitación 5G: Bandas 700 MHz y 3.5 GHz\", Subtel, 2021.","IFT México, \"Resolución IFT-01-2023: Concesiones y Espectro 5G\", IFT, 2023.","ENISA, \"5G Network Security: Technical Guidelines for Operators 2025\", ENISA, 2025.","Cisco, \"Ultra Cloud Core: 5GC Cloud-Native Architecture Guide\", Cisco Systems, 2025.","CIS, \"CIS Benchmark for Kubernetes v1.9.0\", Center for Internet Security, 2025."].map((ref, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-500">
                    <span className="shrink-0 font-bold tabular-nums" style={{ color: `${AL}60` }}>{i + 1}.</span><span>{ref}</span>
                  </li>
                ))}
              </ol>
            </details>
          </div>

          <div className="mt-16 rounded-3xl p-8 lg:p-10 text-center" style={{ background: `linear-gradient(135deg, ${A}12 0%, rgba(255,255,255,0.03) 100%)`, border: `1px solid ${A}25` }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <Radio size={11} />Primera red 5G SA en LATAM
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">¿Planificando el despliegue<br />5G SA en su mercado?</h2>
            <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              OSC implementó la primera red 5G Standalone de América Latina. Nuestro equipo acompaña desde el diseño de arquitectura hasta la puesta en servicio y operación del core 5G.
            </p>
            <Link href="/contacto" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5" style={{ background: A, color: "#fff" }}>
              Hablar con un especialista en 5G SA
              <Activity size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
