import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, FileText, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Anchor, Wifi, Activity, BarChart2, Shield, Cpu,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digitalización Portuaria con IoT y LTE Privado — Guía de Implementación 2025–2026 | OSC",
  description:
    "Framework completo para modernizar terminales portuarios: arquitectura LTE privada, trazabilidad de contenedores con IoT, gate automation, integración TOS y hoja de ruta de 120 días con ROI documentado para puertos LATAM.",
  keywords: [
    "digitalización portuaria IoT LTE privado LATAM",
    "trazabilidad contenedores terminal portuario",
    "LTE privado puerto terminal contenedores",
    "gate automation OCR RFID puerto",
    "TOS integración IoT terminal portuario",
    "OSC Top Solutions puertos",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/digitalizacion-portuaria-iot-lte-privado` },
  openGraph: {
    title: "Digitalización Portuaria con IoT y LTE Privado",
    description:
      "Arquitectura LTE privada, trazabilidad de contenedores, gate automation e integración TOS. Hoja de ruta de 120 días con ROI documentado.",
    type: "article",
    url: `${SITE_URL}/guias/digitalizacion-portuaria-iot-lte-privado`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Digitalización Portuaria con IoT y LTE Privado — Guía de Implementación 2025–2026",
  description:
    "Framework de implementación para modernizar operaciones portuarias con conectividad privada, trazabilidad de activos e integración con sistemas TOS.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01", dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/digitalizacion-portuaria-iot-lte-privado`,
  inLanguage: "es-419",
  keywords: "digitalización portuaria, LTE privado, IoT terminal, gate automation, TOS integración, LATAM",
};

/* ── Accent ─────────────────────── */
const A = "#0EA5E9";
const AL = "#38BDF8";

/* ── Micro-components ───────────── */
function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle,  bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  color: "#F59E0B", label: "Alerta de implementación" },
    info:    { icon: Info,           bg: "rgba(14,165,233,0.07)",  border: "rgba(14,165,233,0.22)",  color: AL,        label: "Nota técnica" },
    success: { icon: CheckCircle2,   bg: "rgba(14,165,233,0.07)",  border: "rgba(14,165,233,0.22)",  color: AL,        label: "Benchmark validado" },
    stat:    { icon: TrendingUp,     bg: "rgba(255,0,87,0.07)",    border: "rgba(255,0,87,0.22)",    color: "#FF0057", label: "Dato crítico 2025" },
    danger:  { icon: AlertTriangle,  bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.28)",   color: "#EF4444", label: "Brecha documentada" },
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

function CodeBlock({ children, label = "arquitectura" }: { children: string; label?: string }) {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/08" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex gap-1.5">{["#FF5F57","#FFBD2E","#28C840"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}</div>
        <span className="text-[10px] text-white/30 font-mono ml-2">{label}</span>
      </div>
      <pre className="p-5 text-[11px] leading-relaxed text-sky-300/80 font-mono overflow-x-auto" style={{ background: "rgba(0,0,0,0.40)" }}>{children}</pre>
    </div>
  );
}

function PhaseCard({ num, title, days, items }: { num: string; title: string; days: string; items: string[] }) {
  return (
    <div className="my-4 rounded-2xl border overflow-hidden" style={{ borderColor: `${A}30`, background: `${A}06` }}>
      <div className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: `${A}20` }}>
        <span className="text-2xl font-black" style={{ color: `${AL}50` }}>{num}</span>
        <div>
          <p className="font-bold text-white text-sm">{title}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: AL }}>{days}</p>
        </div>
      </div>
      <ul className="px-5 py-4 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Page ───────────────────────── */
export default function GuiaDigitalizacionPortuaria() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="min-h-screen" style={{ background: "#080F1E" }}>

        {/* ── HERO ── */}
        <div className="relative overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full" style={{ background: `radial-gradient(ellipse at top right, ${A}12 0%, transparent 60%)`, transform: "translate(20%,-20%)" }} />
            <div className="absolute inset-0 grid-bg opacity-[0.04]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-white/30 text-xs mb-10">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <Link href="/industrias/puertos" className="hover:text-white/60 transition-colors">Puertos</Link>
              <ChevronRight size={12} />
              <span style={{ color: AL }}>Guía Técnica</span>
            </nav>

            {/* Back */}
            <Link href="/industrias/puertos" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: `${AL}80` }}>
              <ArrowLeft size={14} />
              <span>Volver a Puertos</span>
            </Link>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <FileText size={11} />
              Guía Técnica · Implementación 2025–2026
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Digitalización Portuaria<br />
              <span style={{ color: AL }}>con IoT y LTE Privado</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
              Framework de implementación técnica para modernizar terminales portuarios con conectividad privada, trazabilidad de activos e integración con sistemas TOS. Edición 2025–2026.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Clock size={13} /> 8 min de lectura</span>
              <span className="flex items-center gap-1.5"><FileText size={13} /> 16 páginas</span>
              <span className="flex items-center gap-1.5"><Anchor size={13} /> Sector Puertos & Logística</span>
              <span>26 fuentes verificadas</span>
            </div>
          </div>
        </div>

        {/* ── KPI STRIP ── */}
        <div className="border-y border-white/08" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "42.8h", l: "Estadía promedio de buque LATAM", ctx: "vs 16.2h clase mundial" },
              { v: "31%", l: "Terminales con TOS integrado a IoT", ctx: "vs 74% benchmark global" },
              { v: "28%", l: "Con trazabilidad RT de contenedores", ctx: "vs 81% en OCDE" },
              { v: "9%", l: "Terminales con red privada LTE/5G", ctx: "vs 42% referentes globales" },
            ].map(({ v, l, ctx }) => (
              <div key={v}>
                <p className="text-3xl font-black text-white tabular-nums">{v}</p>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{l}</p>
                <p className="text-[10px] font-bold mt-1.5" style={{ color: AL }}>{ctx}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* ── 1. Resumen Ejecutivo ── */}
          <SectionHeading number="01" title="Resumen Ejecutivo" />
          <p className="text-slate-300 leading-relaxed mb-4">
            Los puertos marítimos son la arteria del comercio global: el <strong>90% del comercio internacional por volumen</strong> se moviliza vía transporte marítimo (<em>UNCTAD Review of Maritime Transport 2024</em>). En América Latina, los puertos concentran más del 85% del valor de las exportaciones regionales, y la capacidad de mover contenedores, graneles y carga rodante con máxima velocidad, trazabilidad y seguridad determina directamente la competitividad de las cadenas de suministro del continente.
          </p>
          <Callout type="danger">
            <strong>La brecha es estructural y creciente:</strong> El puerto de Shangai opera con un tiempo de estadía promedio de 14.2 horas; Rotterdam, 18.6 horas. El promedio de los principales puertos latinoamericanos en 2024 fue de 42.8 horas — tres veces mayor (<em>World Bank LPI 2024; CEPAL 2025</em>). Esta brecha se explica en una proporción significativa por la ausencia de conectividad digital robusta, trazabilidad en tiempo real y sistemas integrados de gestión operativa.
          </Callout>
          <p className="text-slate-300 leading-relaxed mb-4">
            Los puertos que han implementado tecnologías de IoT industrial y LTE Privado reportan reducciones de tiempos de operación de buque entre <strong>22% y 38%</strong>, incrementos de productividad de grúas de entre 15% y 28%, y reducción de incidentes de seguridad en patio entre <strong>41% y 63%</strong> (<em>IAPH World Ports Sustainability Program 2025; Ericsson Port Connectivity Report 2025</em>).
          </p>

          <SubHeading title="Contexto: Estado de la Digitalización Portuaria en LATAM 2025" />
          <DataTable
            headers={["Indicador", "LATAM 2025", "Benchmark Global", "Brecha"]}
            rows={[
              ["Tiempo promedio estadía de buque (contenedor)", "42.8 horas", "16.2 horas", "−26.6h"],
              ["Productividad grúa pórtico (movimientos/hora)", "24.3 mov/h", "34.7 mov/h", "−10.4 mov/h"],
              ["Penetración TOS avanzados (integrado a IoT)", "31% terminales", "74%", "−43 pp"],
              ["Trazabilidad RT de contenedores en patio", "28% operaciones", "81%", "−53 pp"],
              ["Terminales con red privada LTE/5G", "9%", "42%", "−33 pp"],
              ["Incidentes de seguridad en patio /1000 TEUs", "3.4", "0.8", "−76% mejor"],
            ]}
          />

          {/* ── 2. Las 5 Capas ── */}
          <SectionHeading number="02" title="La Arquitectura de un Puerto Digital: Las Cinco Capas de Integración" />
          <p className="text-slate-300 leading-relaxed mb-6">
            El puerto tradicional opera con información fragmentada. La digitalización integrada superpone una capa de datos en tiempo real sobre todas las operaciones físicas del terminal, creando un flujo de información continuo desde el buque hasta la puerta de salida terrestre. El resultado no es solo más eficiencia —es un modelo operativo cualitativamente diferente donde el sistema <strong>anticipa, coordina y optimiza</strong> en lugar de solo registrar.
          </p>
          <Callout type="stat">
            Según el <em>Drewry Port Technology Investment Study 2025</em>, cada <strong>USD 1 invertido</strong> en tecnología de operaciones portuarias genera entre <strong>USD 3.8 y USD 6.2</strong> en valor operativo en un horizonte de 5 años, siendo la conectividad privada LTE y la trazabilidad IoT las inversiones de mayor ROI documentado.
          </Callout>

          <CodeBlock label="puerto-digital — 5 capas">{`CAPA 5 — INTELIGENCIA Y OPTIMIZACIÓN
  AI/ML: optimización de patio, predicción de llegadas, asignación
  dinámica de grúas, gestión de ventanas de buques, carbon footprint
                   ↑ datos en tiempo real
CAPA 4 — PLATAFORMA DE GESTIÓN
  TOS (Terminal Operating System) integrado con IoT
  Port Community System (PCS), VBS (Vehicle Booking System)
  PMIS (Port Management Information System)
                   ↑ datos procesados
CAPA 3 — COMUNICACIONES  ← columna vertebral de la digitalización
  LTE Privado + Wi-Fi 6 + DECT + AIS/VHF + Fibra óptica
                   ↑ datos crudos
CAPA 2 — SENSORES Y DISPOSITIVOS CAMPO
  IoT en grúas, RTGs, straddle carriers, reach stackers,
  RFID en contenedores y puertas, cámaras PTZ, UWB tracking
                   ↑ señales físicas
CAPA 1 — OPERACIONES FÍSICAS
  Buques, grúas, patio de contenedores, acceso terrestre,
  almacenamiento, servicios al buque, logística de última milla`}</CodeBlock>

          <SubHeading title="Requisitos de Conectividad por Operación Portuaria" />
          <DataTable
            headers={["Operación", "Latencia", "Ancho de Banda", "Disponibilidad", "Criticidad"]}
            rows={[
              ["Control remoto grúas STS", "< 20 ms RTT", "2–8 Mbps/cabina", "99.999%", "Crítica"],
              ["Telemetría RTGs / grúas de patio", "< 500 ms", "200–800 Kbps/grúa", "99.99%", "Alta"],
              ["Tracking UWB straddle carriers", "< 100 ms", "100–500 Kbps/equipo", "99.99%", "Alta"],
              ["RFID / OCR en puertas de acceso", "< 2 s", "500 Kbps–2 Mbps/lane", "99.9%", "Alta"],
              ["Videovigilancia HD en patio", "< 500 ms", "4–12 Mbps/cámara", "99.9%", "Alta"],
              ["Comunicaciones VHF/PTT operadores", "< 100 ms", "64–256 Kbps/usuario", "99.999%", "Crítica"],
              ["AGV (Automated Guided Vehicles)", "< 20 ms", "1–5 Mbps/AGV", "99.999%", "Crítica"],
            ]}
          />

          {/* ── 3. LTE Privado ── */}
          <SectionHeading number="03" title="LTE Privado en Terminales Portuarias: La Columna Vertebral Digital" />

          <SubHeading title="Por Qué Wi-Fi No Es Suficiente para Puertos Modernos" />
          <p className="text-slate-300 leading-relaxed mb-4">
            La decisión más frecuente —y más costosa— en digitalización portuaria es intentar construir sobre una base de Wi-Fi industrial lo que requiere una arquitectura LTE. Las razones por las que el Wi-Fi falla como red primaria en terminales son estructurales:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              { t: "Interferencia de señal en entorno metálico denso", d: "Las grúas STS de acero, los contenedores apilados en filas de 6–7 alturas y las superestructuras de buques crean un entorno RF extremadamente adverso. La atenuación por multitrayecto genera zonas oscuras impredecibles que se desplazan conforme cambia la configuración del patio —varias veces por hora en un terminal activo." },
              { t: "Handover en movimiento de equipos", d: "Un reach stacker moviéndose a 25 km/h experimenta handovers de Wi-Fi cada 30–90 segundos. Durante el handover (200–800 ms), la telemetría se interrumpe y el sistema TOS pierde visibilidad del activo. LTE realiza handovers en < 50 ms, transparentes para la aplicación." },
              { t: "Disponibilidad SLA insuficiente", d: "El Wi-Fi industrial en entornos portuarios reporta disponibilidades efectivas de 97.8–99.2% (Nokia Port Connectivity Benchmark 2025). Para operaciones de control remoto de grúas y AGVs, se requiere 99.999% — la diferencia es entre 1.8 horas de downtime/año (Wi-Fi) y 5 minutos/año (LTE Privado)." },
            ].map(({ t, d }) => (
              <li key={t} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: AL }} />
                <div>
                  <span className="text-white font-semibold text-sm">{t}: </span>
                  <span className="text-slate-400 text-sm">{d}</span>
                </div>
              </li>
            ))}
          </ul>

          <SubHeading title="Arquitectura LTE Privada para Terminal de Contenedores" />
          <CodeBlock label="terminal-portuario — vista lógica">{`ZONA MUELLE          ZONA PATIO              ZONA ACCESO TERRESTRE
Grúas STS             RTGs, Straddle          Gate Automation
Amarre/maniobra       Carriers, RS            Báscula, OCR
Servicios buque       Contenedores            VBS Check-in
      │                    │                         │
─────────────────────────────────────────────────────────────
          RADIO ACCESS NETWORK (LTE Private)
  eNodeB en torres + mastiles: cobertura muelle, patio, acceso
  Frecuencias 700/850 MHz (cobertura perimetral)
  + DECT-2020 NR en cabinas de grúa (voz PTT baja latencia)
              ↑ Fronthaul fibra óptica subterránea
─────────────────────────────────────────────────────────────
          CORE NETWORK EPC/5GC (On-Premise)
  Rack en datacenter del terminal; UPS + generador
  APN-OT: grúas, RTGs, AGVs, telemetría
  APN-IT: operadores, acceso internet, videovigilancia
  APN-GUEST: tripulantes y camioneros (acceso controlado)
              ↓ APIs e interfaces
─────────────────────────────────────────────────────────────
          SISTEMAS DE APLICACIÓN
  TOS (Navis N4, SPARCS, Tideworks, 1-Stop)
  VBS · PMIS · SCADA de servicios · Gate OCR
  Video Analytics AI · Vessel Traffic Service`}</CodeBlock>

          <Callout type="info">
            <strong>Diseño de cobertura RF:</strong> Instalar radio sites en mástiles de 20–25 m en zona de patio (cobertura sobre nivel de apilamiento máximo), antenas direccionales en extremos de berths apuntando hacia el quai, y sites adicionales en estructuras de pórtico de grúas STS para cobertura independiente de la posición de la grúa. Usar 700/850 MHz para cobertura perimetral y 1800/2100 MHz para capacidad en zonas densas.
          </Callout>

          {/* ── 4. IoT ── */}
          <SectionHeading number="04" title="IoT en Operaciones Portuarias: Casos de Uso y Stack Tecnológico" />

          <SubHeading title="Trazabilidad de Contenedores en Patio: RFID + OCR + UWB" />
          <p className="text-slate-300 leading-relaxed mb-4">
            La trazabilidad en tiempo real de cada contenedor es la aplicación de mayor impacto en eficiencia operativa. Sin trazabilidad, los RTG operators buscan contenedores "a ojo" en el patio — actividad que el <em>Journal of Port Management 2025</em> estima consume entre el <strong>18% y el 31% del tiempo productivo total</strong> de los equipos de patio.
          </p>
          <DataTable
            headers={["Tecnología", "Aplicación", "Precisión", "Infraestructura"]}
            rows={[
              ["RFID UHF (ISO 18000-63)", "Identificación automática en puertas, bajo grúas STS y RTG", "Identificación a 8–12 m", "Lectores fijos en arcos; antenas en spreader"],
              ["OCR + AI", "Lectura automática número ISO 6346 y matrícula de vehículos", "98.5–99.4% en condiciones normales", "Cámaras 4K + iluminación LED noche"],
              ["UWB Tracking", "Posicionamiento RT de RTGs, straddle carriers, reach stackers y personal", "± 30 cm", "Tags UWB + anchors cada 50–80 m"],
              ["GPS/GNSS RTK", "Posicionamiento en zonas sin cobertura UWB", "± 2–5 cm", "Antena GNSS + corrección RTK vía NTRIP"],
              ["Sensor spreader (inclinómetro + encoder)", "Posición exacta del spreader para landing de contenedores", "± 5 cm vertical", "Integrado en PLC de la grúa"],
            ]}
          />

          <SubHeading title="Telemetría de Grúas: Del Estado Desconocido al Mantenimiento Predictivo" />
          <Callout type="stat">
            Una grúa STS representa una inversión de <strong>USD 12–18M</strong> y genera entre 200 y 400 movimientos por turno. Una parada no planificada de 4 horas puede representar <strong>USD 80,000–250,000</strong> en demoras de buque y pérdida de productividad.
          </Callout>
          <DataTable
            headers={["Sistema", "Sensores", "Datos Capturados", "Valor Operativo"]}
            rows={[
              ["Telemetría de carga y ciclos", "Célula de carga en spreader; encoder hoisting", "Ciclos/turno; carga por movimiento; perfil de velocidad", "Benchmarking productividad; detección operador subóptimo"],
              ["Condición eléctrica (VFDs)", "Temperatura variadores Siemens/ABB; calidad de energía", "Temperatura IGBT; desequilibrio de fases; consumo por ciclo", "Predicción de falla de VFD; gestión consumo energético"],
              ["Condición mecánica", "Vibración en tambores; temperatura de cajas de engranaje", "Espectros de vibración; temperatura aceite", "Mantenimiento predictivo de tambores y engranajes"],
              ["Sistemas de posicionamiento", "Encoder de rail/cross travel; sensor anti-pendulación", "Posición XYZ spreader ±5 cm", "Anti-colisión entre grúas; automatización de landing"],
              ["Sistemas de seguridad", "Anemómetro en boom; sensor nivel de rueda", "Velocidad de viento (límite 72 km/h)", "Seguridad del operador; cumplimiento normativo"],
            ]}
          />

          <SubHeading title="Gate Automation: El Cuello de Botella Resuelto" />
          <p className="text-slate-300 leading-relaxed mb-4">
            En terminales latinoamericanos, el tiempo promedio de procesamiento por camión en gate es de <strong>14.8 minutos</strong> (<em>CEPAL 2025</em>); en terminales con gate automation completo, este tiempo cae a <strong>1.8–3.2 minutos</strong> — una reducción del 78–88%.
          </p>
          <CodeBlock label="flujo-camion — gate automatizado">{`[1] PRE-GATE (100 m antes de la caseta) — Tiempo: < 15 segundos
    → Lectura RFID/OCR de matrícula + contenedor (si viene cargado)
    → Validación contra VBS: cita activa?
    → Verificación de habilitaciones del camionero

[2] GATE-IN (caseta de procesamiento) — Tiempo: 1.8–3.2 min vs. 14.8 min manual
    → OCR lateral y posterior: número ISO 6346 confirmado
    → Verificación de sello ISO 17712: sello íntegro?
    → Inspección volumétrica laser: dimensiones conformes?
    → Captura biométrica de conductor (según regulación aduanera)
    → Báscula dinámica: peso vs. manifiesto
    → Asignación automática de slot en patio por TOS
    → Impresión / envío de ticket con slot asignado

[3] IN-GATE → PATIO
    → Instrucciones de slot en display del camión (app VBS)
    → Confirmación de llegada al slot via RFID/GPS

[4] GATE-OUT (salida) — Tiempo: < 45 segundos
    → Verificación documentación vs. TOS
    → Registro de peso de salida
    → Apertura automática de barrera`}</CodeBlock>

          {/* ── 5. TOS ── */}
          <SectionHeading number="05" title="Integración con TOS: El Sistema Nervioso del Terminal" />
          <p className="text-slate-300 leading-relaxed mb-4">
            El Terminal Operating System (TOS) es el cerebro del terminal. La integración TOS-IoT cierra la brecha entre el TOS y la realidad del campo: el TOS recibe datos en tiempo real y puede optimizar dinámicamente la planificación conforme la situación evoluciona.
          </p>
          <DataTable
            headers={["Integración", "Protocolo", "Frecuencia", "Impacto Operativo"]}
            rows={[
              ["TOS ← Posición RT de grúas", "OPC-UA o REST API", "500 ms", "Asigna movimientos a la grúa más cercana; reduce traslados en vacío"],
              ["TOS ← Posición de contenedores en patio", "MQTT + REST API", "Evento (por movimiento)", "Elimina búsquedas ineficientes; conocimiento exacto de cada caja"],
              ["TOS ← Estado de camiones en patio", "LTE + GPS API", "30 s", "Coordina llegada del camión al slot justo cuando el RTG llega"],
              ["TOS ← Gate automation", "EDI EDIFACT o API REST", "Evento (por camión)", "Prepara instrucciones de slot antes de que el camión entre al patio"],
              ["TOS ← AIS / VTS (buques)", "AIS API + EDI", "Cada 2 min", "Pre-planifica descarga con 2–4 horas de anticipación"],
              ["TOS → RTG operator (instrucciones)", "LTE (display en cabina)", "Evento (por instrucción)", "Elimina instrucciones por radio VHF; reducción de errores"],
            ]}
          />

          <SubHeading title="Principales TOS del Mercado y Capacidades IoT (2025)" />
          <DataTable
            headers={["TOS", "Presencia LATAM", "Capacidad IoT Nativa", "Fortaleza"]}
            rows={[
              ["Navis N4 (Cargotec)", "Alta — ICTSI, DP World, APM en LATAM", "N4 IoT Hub: integración nativa RFID, OCR, sensores", "Estándar de facto internacional; mayor ecosistema"],
              ["SPARCS N4 (Navis)", "Alta — misma familia", "Via N4 IoT Hub", "Terminales más pequeños; modelo SaaS disponible"],
              ["1-Stop (Tideworks)", "Media — puertos nacionales", "Via middleware", "Buena opción para medianos con presupuesto ajustado"],
              ["SmartPort (SAP)", "Emergente LATAM", "Integración SAP EWM + IoT nativa", "Terminales con SAP como ERP corporativo"],
              ["Jade Logistics (XVELA)", "Creciente", "Colaboración con navieras + planificación de estiba", "Diferenciador: planificación colaborativa con capitán"],
            ]}
          />

          {/* ── 6. Seguridad ── */}
          <SectionHeading number="06" title="Seguridad Portuaria con IoT: Más Allá de las Cámaras" />
          <Callout type="danger">
            Según el <em>World Customs Organization Illicit Trade Report 2024</em>, los puertos latinoamericanos concentran el <strong>34% de las incautaciones de narcotráfico en contenedores a nivel global</strong>. La correlación entre eventos físicos sospechosos y anomalías en el TOS es la herramienta de detección más efectiva documentada.
          </Callout>
          <DataTable
            headers={["Componente", "Tecnología", "Cobertura", "Integración"]}
            rows={[
              ["Videovigilancia analítica AI", "Cámaras 4K + motor analytics (intrusión, LPR, comportamiento)", "Patio perimetral, accesos, muelle, gates", "PSIM; alertas; correlación con TOS"],
              ["Control de acceso biométrico", "RFID + huella o reconocimiento facial", "Acceso a zonas restringidas (ISPS Code)", "AD corporativo; auditoría inmutable"],
              ["Detección intrusión perimetral", "Fibra óptica vibrotactil + sensores de presión", "Perímetro completo del terminal", "PSIM; correlación con CCTV más cercano"],
              ["Rastreo de personal en patio", "Tags UWB o BLE de personal", "Toda la zona de patio y muelle", "Alerta ante zona de exclusión activa; evacuación"],
              ["Monitoreo ciberseguridad OT", "Sensor pasivo en red OT (Nozomi / Claroty)", "Red de automatización, TOS, grúas", "PSIM + SOC; correlación cyber-físico"],
              ["Escáner de contenedores", "Rayos X / gamma (fijo o móvil)", "Gate de entrada o bahía de inspección", "Sistema aduanero (VUCE, EDI); análisis AI"],
            ]}
          />

          {/* ── 7. Sostenibilidad ── */}
          <SectionHeading number="07" title="Sostenibilidad y Puerto Verde: El Imperativo Regulatorio 2025–2030" />
          <Callout type="info">
            <strong>Marco regulatorio vigente:</strong> IMO GHG Strategy (2023): 0 emisiones netas sector marítimo para 2050. EU FuelEU Maritime (en vigor 2025): aplica a buques que toquen puertos europeos — relevante para exportaciones LATAM. CSRD UE: navieras deben reportar huella Scope 3 incluyendo operaciones portuarias.
          </Callout>
          <DataTable
            headers={["Tecnología", "Impacto en Emisiones", "Reducción Estimada", "Inversión", "Payback"]}
            rows={[
              ["OPS / Cold Ironing", "Elimina generadores auxiliares del buque en puerto", "−85% emisiones en muelle", "USD 2–8M por berth", "4–7 años"],
              ["Gestión activa RTGs eléctricos", "Optimización ciclos + frenado regenerativo", "−15 a −22% consumo/movimiento", "USD 50–200K por RTG", "2–4 años"],
              ["Electrificación flota de patio", "Elimina emisiones directas de flota", "−100% emisiones directas", "USD 80–150K/vehículo", "5–8 años"],
              ["JIT Port Call (PCO)", "Reduce velocidad crucero en aproximación", "−10 a −18% emisiones por escala", "USD 50–200K (software)", "< 1 año"],
              ["Medición CO₂/TEU", "Visibilidad para reporting Scope 3", "Trazabilidad de emisiones", "USD 30–120K", "N/A (compliance)"],
            ]}
          />

          {/* ── 8. Hoja de Ruta ── */}
          <SectionHeading number="08" title="Implementación: Hoja de Ruta de 120 Días" />
          <p className="text-slate-300 leading-relaxed mb-6">
            El camino hacia el puerto inteligente no requiere transformar todo simultáneamente. El framework de 120 días propuesto permite capturar valor en el corto plazo — comenzando por la conectividad LTE y la telemetría de grúas — mientras se construye la arquitectura de datos que habilita la optimización continua con AI en el mediano plazo.
          </p>

          <PhaseCard num="01" title="Assessment y Diseño" days="Días 1–30" items={[
            "Port Digital Readiness Assessment en 6 dimensiones: conectividad, trazabilidad, integración TOS, gate operations, seguridad ISPS, madurez de datos",
            "RF Survey y diseño de red LTE: medición de cobertura actual, análisis de propagación, posicionamiento de radio sites, dimensionamiento de capacidad",
            "BOM completo con especificaciones de sensores, gateways y plataforma",
            "Business case con TCO 10 años y ROI documentado por fuente de valor",
            "Plan de implementación detallado por fases con hitos y KPIs de seguimiento",
          ]} />

          <PhaseCard num="02" title="Conectividad y Telemetría Base" days="Días 31–75" items={[
            "Instalación de mástiles y radio units (eNodeB/RRH) con alimentación DC y tierra física",
            "Despliegue de Core EPC on-premise en datacenter del terminal",
            "Configuración de APNs diferenciados: OT (grúas, AGVs), IT (operadores), guest",
            "Instalación de módems LTE en grúas STS y RTGs (integración con PLC via OPC-UA)",
            "Instalación de tags UWB en straddle carriers y reach stackers",
            "Pruebas de cobertura documentadas con drive test en todas las zonas del terminal",
          ]} />

          <PhaseCard num="03" title="Gate Automation e Integración TOS" days="Días 76–105" items={[
            "Instalación de portales OCR en gates de entrada y salida",
            "Integración OCR → TOS via API: lectura automática popula directamente el TOS",
            "Configuración de VBS con integración LTE para instrucciones en tiempo real a camioneros",
            "Activación del flujo de trazabilidad en tiempo real: RFID/UWB → TOS",
          ]} />

          <PhaseCard num="04" title="Analítica y Optimización" days="Días 106–120" items={[
            "Dashboards de productividad RT: movimientos/hora por grúa, tiempo de ciclo por berth, permanencia en patio por contenedor",
            "Configuración de alertas operativas: grúa bajo productividad histórica, dwell time excedido, camión en espera > objetivo",
            "Primer ciclo de análisis de datos: identificación de 3–5 oportunidades de optimización",
            "Entrenamiento del equipo de supervisión y operaciones en uso de dashboards y alertas",
          ]} />

          {/* ── 9. KPIs ── */}
          <SectionHeading number="09" title="KPIs del Puerto Digital" />
          <DataTable
            headers={["KPI", "Definición", "Benchmark LATAM", "Clase Mundial"]}
            rows={[
              ["BCH — Buque Crane Hour", "Movimientos de grúa por hora de operación de buque", "21.4 mov/h", "31.8 mov/h"],
              ["GCH — Gross Crane Hour", "Movimientos por hora total de estadía del buque en berth", "16.3 mov/h", "27.4 mov/h"],
              ["Tiempo de estadía promedio", "Horas desde atraque hasta desamarre", "42.8 h", "16.2 h"],
              ["Tiempo de procesamiento en gate", "Minutos desde llegada al gate hasta salida", "14.8 min", "2.6 min"],
              ["Dwell Time importación", "Días desde descarga hasta retiro por camión", "7.2 días", "2.8 días"],
              ["Ratio movimientos en vacío (RTG)", "Movimientos sin contenedor / Total", "31.4%", "18.7%"],
            ]}
          />

          <SubHeading title="Métricas de Impacto del Programa de Digitalización" />
          <DataTable
            headers={["KPI", "Línea Base", "Objetivo Año 1", "Objetivo Año 2"]}
            rows={[
              ["BCH (Grúas STS)", "100% (base)", "+14 a +22%", "+22 a +35%"],
              ["Tiempo de estadía de buque", "100% (base)", "−18 a −28%", "−28 a −40%"],
              ["Tiempo de procesamiento gate", "100% (base)", "−60 a −75%", "−78 a −88%"],
              ["Incidentes de seguridad (hurto/daño)", "100% (base)", "−35 a −50%", "−50 a −65%"],
              ["Ratio movimientos en vacío RTG", "100% (base)", "−20 a −30%", "−30 a −45%"],
              ["Consumo energético por TEU", "100% (base)", "−12 a −18%", "−18 a −28%"],
            ]}
          />

          {/* ── 10. ROI ── */}
          <SectionHeading number="10" title="ROI y Modelo de Negocio" />
          <SubHeading title="Estructura de Inversión por Tamaño de Terminal" />
          <DataTable
            headers={["Componente", "Terminal Pequeño (< 200K TEU/año)", "Terminal Mediano (200K–800K)", "Terminal Grande (> 800K)"]}
            rows={[
              ["Red LTE Privada", "USD 600K–1.2M", "USD 1.2M–3.5M", "USD 3.5M–8M"],
              ["Telemetría grúas y equipos", "USD 200K–450K", "USD 450K–1.2M", "USD 1.2M–4M"],
              ["Gate Automation (OCR + RFID)", "USD 180K–400K", "USD 400K–900K", "USD 900K–2.5M"],
              ["TOS + integraciones", "USD 250K–600K", "USD 600K–1.5M", "USD 1.5M–5M"],
              ["Trazabilidad UWB + plataforma IoT", "USD 150K–380K", "USD 380K–950K", "USD 950K–3M"],
              ["Seguridad integrada (CCTV AI + PSIM)", "USD 200K–500K", "USD 500K–1.5M", "USD 1.5M–5M"],
              ["INVERSIÓN TOTAL", "USD 1.6M–3.5M", "USD 3.5M–9.5M", "USD 9.5M–27.5M"],
            ]}
          />

          <SubHeading title="Fuentes de Retorno Documentadas (Terminal Mediano)" />
          <DataTable
            headers={["Fuente de Valor", "Mecanismo", "ROI Anual Estimado"]}
            rows={[
              ["Incremento productividad grúas (+18%)", "Más movimientos/hora → más buques/berth/año", "USD 1.2M–3.8M"],
              ["Reducción demurrage reclamado", "Eliminación de reclamaciones por retrasos del terminal", "USD 400K–1.1M"],
              ["Gate automation → reducción personal", "Reducción 60–75% en personal manual de gate", "USD 300K–700K"],
              ["Reducción incidentes de seguridad", "Menor valor robado + reducción primas de seguro", "USD 200K–600K"],
              ["Reducción consumo energético (−15%)", "Optimización RTGs + OPS + frenado regenerativo", "USD 150K–450K"],
              ["Reducción accidentes → reducción primas", "Tracking personal en zonas activas; alertas de proximidad", "USD 80K–250K"],
              ["AHORRO/VALOR ANUAL TOTAL", "—", "USD 2.3M–7.0M"],
            ]}
          />
          <Callout type="success">
            <strong>ROI sobre inversión total (escenario central):</strong> 60–185% en Año 1; más del 300% acumulado en 3 años. <strong>Payback period:</strong> 18–36 meses según tamaño de terminal y módulos implementados.
          </Callout>

          {/* ── Conclusiones ── */}
          <SectionHeading number="11" title="Conclusiones" />
          <p className="text-slate-300 leading-relaxed mb-4">
            La digitalización portuaria con IoT y LTE Privado no es una tendencia futura —es la realidad operativa de los terminales de clase mundial hoy, y la diferencia competitiva que determinará qué puertos latinoamericanos capturarán el crecimiento del comercio regional en la próxima década.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Los terminales que inicien su journey digital en 2025–2026 tienen la ventaja de aprender de implementaciones maduras en Europa y Asia, adoptando tecnologías probadas a costos de infraestructura decrecientes.
          </p>
          <Callout type="success">
            El framework de 120 días permite capturar valor en el corto plazo — comenzando por la conectividad LTE y la telemetría de grúas — mientras se construye la arquitectura de datos que habilita la optimización continua con AI en el mediano plazo.
          </Callout>

          {/* ── Referencias ── */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <details className="group">
              <summary className="cursor-pointer text-sm font-bold text-white/50 hover:text-white/80 transition-colors flex items-center gap-2 list-none">
                <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] group-open:rotate-90 transition-transform">▶</span>
                Ver 26 fuentes y referencias
              </summary>
              <ol className="mt-6 space-y-2">
                {[
                  "UNCTAD, \"Review of Maritime Transport 2024\", United Nations Conference on Trade and Development, noviembre 2024.",
                  "World Bank, \"Logistics Performance Index 2024: Connecting to Compete\", World Bank Group, 2024.",
                  "CEPAL, \"Perfil Marítimo y Logístico de América Latina y el Caribe 2025\", CEPAL, Q1 2025.",
                  "IAPH, \"World Ports Sustainability Programme Annual Report 2025\", IAPH, 2025.",
                  "IAPH, \"Port Performance Scorecard: Productivity and Efficiency Indicators 2025\", IAPH Data Hub, 2025.",
                  "GSMA Intelligence, \"Private Networks in Ports and Maritime: Deployment Tracker Q1 2025\", GSMA, marzo 2025.",
                  "Drewry Maritime Research, \"Port Technology Investment and ROI Study 2025\", Q1 2025.",
                  "Gartner, \"Port and Terminal Digitalization Maturity Study 2025\", Gartner Supply Chain Research, 2025.",
                  "Nokia, \"Port Connectivity Benchmark: LTE vs. Wi-Fi in Terminal Environments\", Nokia DAC Technical Report, 2025.",
                  "Ericsson, \"Industry Connect: Port and Maritime Private Networks Portfolio 2025\", Ericsson Technology Review, 2025.",
                  "Navis/Cargotec, \"N4 TOS IoT Integration and Productivity Benchmarks 2025\", Navis Product Report, 2025.",
                  "APM Terminals, \"Gate Automation ROI and Operational Impact Report 2025\", APM Terminals Innovation, 2025.",
                  "BIMCO, \"Vessel Operating Cost Benchmark 2025: Port Cost Analysis\", BIMCO Research, 2025.",
                  "PortXchange, \"Just-in-Time Port Call: Performance and Emissions Impact 2025\", PortXchange Data Report, 2025.",
                  "Konecranes, \"Port Equipment Telemetry and Predictive Maintenance System Technical Documentation\", Konecranes, 2025.",
                  "Liebherr Container Cranes, \"Crane Monitoring and Condition Assessment Technical Manual\", Liebherr, 2024.",
                  "ABB, \"Crane Automation, Electrification and Digital Portfolio for Ports\", ABB Marine & Ports, 2025.",
                  "IMO, \"2023 IMO Strategy on Reduction of GHG Emissions from Ships\", International Maritime Organization, 2023.",
                  "European Commission, \"FuelEU Maritime Regulation (EU) 2023/1805\", Official Journal of the European Union, 2023.",
                  "DNV, \"Maritime Forecast to 2050: Energy Transition Outlook\", DNV GL, 2024.",
                  "WCO, \"Illicit Trade Report 2024\", World Customs Organization, 2024.",
                  "Genetec, \"Port Security Reference Architecture\", Genetec Technical Paper, 2025.",
                  "Kalmar (Cargotec), \"SmartPort: Digital Solutions Results and Customer Case Studies 2025\", Kalmar, 2025.",
                  "HHLA, \"Gate Automation at Container Terminal Altenwerder: Case Study 2024\", HHLA, 2024.",
                  "Journal of Port Management, \"Efficiency Losses from Manual Container Tracking in Latin American Terminals\", Vol. 18, No. 2, 2025.",
                  "ANTAQ Brasil, \"Resolução 66/2024: Eficiência Energética em Instalações Portuárias\", ANTAQ, 2024.",
                ].map((ref, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-500">
                    <span className="shrink-0 font-bold tabular-nums" style={{ color: `${AL}60` }}>{i + 1}.</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ol>
            </details>
          </div>

          {/* ── CTA ── */}
          <div className="mt-16 rounded-3xl p-8 lg:p-10 text-center" style={{ background: `linear-gradient(135deg, ${A}12 0%, rgba(255,255,255,0.03) 100%)`, border: `1px solid ${A}25` }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <Anchor size={11} />
              Especialistas en Digitalización Portuaria
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              ¿Listo para modernizar<br />su terminal portuario?
            </h2>
            <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Nuestro equipo de especialistas puede realizar un Port Digital Readiness Assessment para cuantificar la brecha y dimensionar su inversión.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: A, color: "#fff" }}
            >
              Hablar con un especialista en puertos
              <Activity size={15} />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
