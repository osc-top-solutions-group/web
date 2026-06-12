import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, FileText, BookOpen, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp, Zap,
  Shield, Cpu, Database, Activity, BarChart2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mantenimiento Predictivo con IoT en Entornos Industriales — Guía 2025–2026",
  description:
    "Guía técnica completa: arquitectura IIoT de 4 capas, selección de sensores por tipo de activo, modelos de analítica predictiva, plan de implementación de 8 semanas y modelo de ROI verificado para operaciones extractivas en LATAM.",
  keywords: [
    "mantenimiento predictivo IoT industrial",
    "IIoT minería LATAM",
    "sensores industriales predictivo",
    "plataforma IIoT analítica activos",
    "reducción paradas no planificadas minería",
    "OSC Top Solutions",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/mantenimiento-predictivo-iot` },
  openGraph: {
    title: "Mantenimiento Predictivo con IoT en Entornos Industriales",
    description:
      "Arquitectura IIoT, selección de sensores, modelos analíticos y ROI para operaciones extractivas en América Latina.",
    type: "article",
    url: `${SITE_URL}/guias/mantenimiento-predictivo-iot`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Mantenimiento Predictivo con IoT en Entornos Industriales — Guía de Implementación 2025–2026",
  description:
    "Guía técnica de implementación de mantenimiento predictivo basado en IIoT para operaciones extractivas en América Latina.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01",
  dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/mantenimiento-predictivo-iot`,
  inLanguage: "es-419",
  keywords: "mantenimiento predictivo, IIoT, sensores industriales, minería LATAM, analítica de activos",
};

/* ─────────────────────────────────────────────────────────────
   REUSABLE MICRO-COMPONENTS
───────────────────────────────────────────────────────────── */
function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle,  bg: "rgba(255,165,0,0.08)",  border: "rgba(255,165,0,0.25)", color: "#F59E0B", label: "Alerta de implementación" },
    info:    { icon: Info,           bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.22)", color: "#60A5FA", label: "Nota técnica" },
    success: { icon: CheckCircle2,   bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.22)", color: "#34D399", label: "Benchmark" },
    stat:    { icon: TrendingUp,     bg: "rgba(255,0,87,0.07)",   border: "rgba(255,0,87,0.22)",  color: "#FF0057", label: "Benchmark 2025" },
  }[type];
  const Icon = cfg.icon;
  return (
    <div
      className="my-8 rounded-2xl p-5"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <Icon size={16} style={{ color: cfg.color }} />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: cfg.color }}>
            {cfg.label}
          </p>
          <div className="text-sm text-slate-300 leading-relaxed [&_strong]:text-white [&_strong]:font-semibold">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ number, title, icon: Icon }: { number: string; title: string; icon: React.ElementType }) {
  return (
    <div className="mt-20 mb-8 first:mt-0">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,0,87,0.12)", border: "1px solid rgba(255,0,87,0.28)" }}>
          <Icon size={18} style={{ color: "#FF0057" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-0.5" style={{ color: "rgba(255,0,87,0.45)" }}>Sección {number}</p>
          <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h2>
        </div>
      </div>
      <div className="h-px" style={{ background: "rgba(255,0,87,0.10)" }} />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-white mt-12 mb-5 flex items-center gap-3">
      <span className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,0,87,0.12)", border: "1px solid rgba(255,0,87,0.20)" }}>
        <span className="w-1.5 h-1.5 rounded-sm block" style={{ background: "#FF0057", transform: "rotate(45deg)" }} />
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
    <pre
      className="my-6 p-5 rounded-2xl text-xs leading-relaxed overflow-x-auto"
      style={{
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#94A3B8",
        fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return <strong className="text-white font-semibold">{children}</strong>;
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#FF0057" }} className="font-semibold">{children}</span>;
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function MantenimientoPredictivo() {
  return (
    <>
      <JsonLd data={articleSchema} />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #060B18 0%, #0A1628 55%, #0D1F3C 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(255,0,87,0.12) 0%, transparent 60%)" }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/35 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/industrias/energia-mineria" className="hover:text-white/60 transition-colors">Energía & Minería</Link>
            <ChevronRight size={12} />
            <span className="text-white/55">Guía</span>
          </nav>

          {/* Type badge */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full"
              style={{ background: "rgba(13,148,136,0.12)", border: "1px solid rgba(13,148,136,0.30)", color: "#14B8A6" }}
            >
              <FileText size={11} />
              Guía Técnica
            </span>
            <span className="text-[10px] text-white/25 uppercase tracking-widest font-semibold">Edición 2025–2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
            Mantenimiento Predictivo con IoT<br className="hidden md:block" />
            <span style={{ color: "#FF0057" }}> en Entornos Industriales</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-10">
            Guía de implementación técnica: arquitectura IIoT de 4 capas, selección de sensores por activo,
            modelos de analítica de nivel 1–5, plan de 8 semanas y modelo de ROI verificado para operaciones
            extractivas en América Latina.
          </p>

          {/* Metadata pills */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {[
              { icon: Clock,     label: "45 min lectura" },
              { icon: BookOpen,  label: "16 secciones" },
              { icon: FileText,  label: "21 referencias técnicas" },
              { icon: Activity,  label: "Minería · O&G · Proceso" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-white/40">
                <Icon size={12} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "38–54%", label: "reducción paradas no planificadas" },
              { value: "22–41%", label: "extensión vida útil activos" },
              { value: "23–31%", label: "reducción costo mantenimiento" },
              { value: "2–4 meses", label: "período de payback" },
            ].map(({ value, label }) => (
              <div
                key={value}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-xl font-black mb-1" style={{ color: "#FF0057" }}>{value}</p>
                <p className="text-[11px] text-white/40 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(180deg, #0A1628 0%, #0D1B2E 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-14">

          {/* ─── RESUMEN EJECUTIVO ─── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Resumen Ejecutivo</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <Prose>
              <p>
                Las paradas no planificadas constituyen el mayor destructor de valor en operaciones extractivas.
                Según el <Bold>Deloitte Global Mining Benchmark Report 2025</Bold>, la disponibilidad promedio de planta
                en minería latinoamericana es del <Accent>79.4%</Accent>, frente al <Bold>91.2%</Bold> de las operaciones
                de clase mundial en Australia y Norteamérica. Esa brecha de <Accent>11.8 puntos porcentuales</Accent> representa,
                para una operación de 500,000 TM/mes, entre <Bold>USD 14M y USD 38M</Bold> en producción diferida anual.
              </p>
              <p>
                El Mantenimiento Predictivo basado en IIoT (PdM) es hoy la herramienta técnica de mayor impacto para
                cerrar esa brecha. La diferencia entre una implementación exitosa y un piloto fallido no está en la
                tecnología de sensores — está en la calidad de la instrumentación, la integración real con los flujos de
                trabajo de mantenimiento y la voluntad organizacional de actuar sobre las recomendaciones del sistema.
              </p>
            </Prose>

            <DataTable
              headers={["Paradigma", "Costo Relativo", "Disponibilidad", "Advertencia Media", "Impacto en Seguridad"]}
              rows={[
                [<Bold key="r">Reactivo (Run-to-Failure)</Bold>, "100% (base)", "70–79%", "0 días", "Alto (fallas catastróficas)"],
                [<Bold key="p">Preventivo por tiempo/ciclos</Bold>, "65–80%", "80–86%", "0 días", "Medio"],
                [<Bold key="pd">Predictivo basado en condición</Bold>, <Accent key="c1">40–55%</Accent>, <Accent key="c2">88–93%</Accent>, "7–60 días", "Bajo"],
                [<Bold key="pr">Prescriptivo (AI + contexto)</Bold>, <Accent key="c3">35–48%</Accent>, <Accent key="c4">91–96%</Accent>, "14–90 días", "Muy bajo"],
              ]}
            />

            <Callout type="stat">
              <strong>Benchmark 2025:</strong> Las operaciones extractivas de clase mundial operan en modo predictivo para el{" "}
              <strong>82–91% de sus activos de criticidad A y B</strong>. La industria minera latinoamericana promedia el{" "}
              <strong>31%</strong> de activos en modo predictivo (IIMP, 2025). Esta brecha de{" "}
              <strong>50+ puntos porcentuales</strong> es la mayor oportunidad de eficiencia operativa de la próxima
              década en el sector extractivo regional.
            </Callout>
          </div>

          {/* ─── SECCIÓN 1: FUNDAMENTOS ─── */}
          <SectionHeading number="1" title="Fundamentos: La Cadena de Valor del PdM IIoT" icon={Activity} />

          <SubHeading>1.1 Por Qué el PdM Basado en IIoT Falla Cuando Falla</SubHeading>
          <Prose>
            <p>
              El IIoT para mantenimiento predictivo tiene una <Bold>tasa de abandono de pilotos en América Latina del 43%</Bold> durante
              el primer año (IDC LatAm Industrial IoT Survey 2025). Las causas principales documentadas:
            </p>
          </Prose>

          <div className="my-6 space-y-3">
            {[
              { n: "38%", title: "Instrumentación de baja calidad o mal instalada", desc: "Datos de vibración con 10–15 dB de error por montaje incorrecto; sensores de temperatura con deriva no calibrada; señales con ruido eléctrico por cableado inadecuado junto a cables de potencia." },
              { n: "29%", title: "Sin integración con CMMS", desc: "Las alertas se generan en una pantalla que nadie abre sistemáticamente; no se generan órdenes de trabajo; el ciclo de retroalimentación nunca se cierra." },
              { n: "21%", title: "Falta de baseline limpio", desc: "El sistema se activa con umbrales genéricos de fábrica o ISO sin capturar el comportamiento nominal real del activo bajo sus condiciones reales." },
              { n: "12%", title: "Organización no preparada", desc: "El equipo de mantenimiento no confía en las alertas, no actúa sobre ellas o las sobreescribe; los planificadores no integran el PdM en la planificación de paradas." },
            ].map(({ n, title, desc }) => (
              <div
                key={n}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,0,87,0.10)", border: "1px solid rgba(255,0,87,0.22)" }}>
                  <span className="text-sm font-black" style={{ color: "#FF0057" }}>{n}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">{title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <SubHeading>1.2 La Cadena de Valor del PdM: Seis Eslabones</SubHeading>
          <Prose>
            <p>El PdM es un sistema de información de decisiones. Su valor no reside en los sensores — reside en la capacidad de convertir señales físicas en inteligencia accionable.</p>
          </Prose>
          <CodeBlock>{`┌─────────────────────────────────────────────────────────────────────────┐
│                     CADENA DE VALOR PdM IIoT                           │
│                                                                         │
│  [1] INSTRUMENTACIÓN → [2] CONECTIVIDAD → [3] INGESTA                 │
│   Sensores físicos      Protocolos OT      Plataforma IIoT             │
│   en activos críticos   OPC-UA, MQTT,      Almacén de series           │
│   Vibración, temp,      WirelessHART,      de tiempo; VEE             │
│   corriente, presión,   Modbus TCP         automatizado               │
│   ultrasonido, aceite   sobre LTE/Wi-Fi                               │
│        ↓                     ↓                  ↓                      │
│  [6] RETROALIMENTACIÓN ← [5] ACCIÓN ← [4] ANALÍTICA                  │
│   Resultado de la         CMMS / EAM         ML: detección           │
│   intervención →          OT integrado       anomalías,              │
│   Actualización del       SAP PM, Maximo     RUL prediction,         │
│   modelo; mejora          Alerta → Orden     patrón de falla         │
│   de precisión            de trabajo         probable               │
└─────────────────────────────────────────────────────────────────────────┘`}</CodeBlock>

          <SubHeading>1.3 Modos de Falla, Señales Físicas y Ventanas de Detección</SubHeading>
          <DataTable
            compact
            headers={["Modo de Falla", "Señal Precursora", "Tecnología", "Ventana", "Estándar"]}
            rows={[
              ["Desbalance / desalineación en rotativo", "Vibración a 1X y 2X de velocidad", "Acelerómetro triaxial MEMS", "2–8 semanas", "ISO 10816-3"],
              ["Desgaste de rodamiento (etapas 1–4)", "BPFO, BPFI, BSF, FTF; temperatura carcasa", "Acelerómetro + termopar", "1–12 semanas", "ISO 15243"],
              ["Cavitación en bomba centrífuga", "Vibración >4 kHz; DP > diseño", "Acelerómetro + ultrasonido de contacto", "1–4 semanas", "HI ANSI/HI 9.6.7"],
              ["Recalentamiento de motor eléctrico", "Temperatura de devanados / rodamientos", "RTD Pt100 clase A; termopar K", "2–72 horas", "IEC 60034-27"],
              ["Degradación de aislamiento en transformador", "Gas disuelto en aceite (H₂, C₂H₂, CO)", "Sensor DGA on-line", "Semanas–meses", "IEC 60599-2022"],
              ["Contaminación de aceite lubricante", "Partículas metálicas Fe/Cu/Cr; ISO 4406", "Sensor de ferrografía en línea", "2–6 semanas", "ISO 4406:2021"],
              ["Desgaste revestimientos chancadora", "Cambio en perfil de vibración; +potencia", "Acelerómetro + analizador de potencia", "1–3 semanas", "Metso Minerals 2025"],
              ["Falla de rodillo correa transportadora", "Vibración asimétrica; temperatura superficial", "Acelerómetro in-situ o IR", "1–4 semanas", "CEMA 7th Ed."],
            ]}
          />

          {/* ─── SECCIÓN 2: ARQUITECTURA IIoT ─── */}
          <SectionHeading number="2" title="Arquitectura IIoT de Referencia: Cuatro Capas" icon={Cpu} />

          <SubHeading>Capa 1 — Edge (Field Level): Instrumentación</SubHeading>
          <Prose>
            <p><Bold>Principio de selección:</Bold> El sensor más preciso del mundo es inútil si está mal instalado o si su señal llega al sistema con ruido. La selección del sensor correcto y su instalación correcta son el fundamento de todo el sistema.</p>
          </Prose>

          <DataTable
            headers={["Parámetro", "Especificación Mínima", "Justificación"]}
            rows={[
              [<Bold key="t">Temperatura operativa</Bold>, "-40°C a +85°C", "Entornos cordilleranos (minas andinas: -20°C) y plantas de proceso caliente (+65°C)"],
              [<Bold key="ip">Grado de protección IP</Bold>, "IP67 mínimo; IP68 minería subterránea", "Inmersión temporal en agua de mina; chorro de agua a presión en limpieza"],
              [<Bold key="a">Certificación ATEX / IECEx</Bold>, "Obligatorio en Zonas 1/2 (O&G), Zonas 21/22", "Explosión potencial ante chispa en atmósferas con gas o polvo inflamable"],
              [<Bold key="p">Protocolo de salida</Bold>, "4–20 mA + HART; Modbus RTU 485; WirelessHART", "Compatibilidad con sistemas existentes"],
              [<Bold key="f">Frecuencia de muestreo (vibración)</Bold>, "Mínimo 25.6 kHz (mejor: 51.2 kHz)", "Análisis espectral hasta 12.8 kHz requiere muestreo 2× Nyquist"],
              [<Bold key="c">Calibración</Bold>, "Certificado ISO 17025 vigente; máx. 12 meses", "Reproducibilidad del dato; validez ante auditorías"],
            ]}
          />

          <Callout type="warning">
            <strong>Alerta crítica de implementación:</strong> Un acelerómetro de USD 800 con montaje magnético sobre
            superficie pintada introduce hasta <strong>12–15 dB de error</strong> en el espectro de vibración, haciendo
            imposible el diagnóstico de rodamientos. Un acelerómetro de USD 150 con montaje roscado en superficie
            preparada entrega datos <strong>10 veces más confiables</strong>. La calidad del montaje supera en importancia
            al costo del sensor.{" "}
            <em>(Fuente: SKF Application Note AN 010; Emerson Rosemount Technical Note 00840-0100-4809)</em>
          </Callout>

          <SubHeading>Capa 2 — Edge Computing: Gateways Industriales</SubHeading>
          <DataTable
            headers={["Capacidad", "Especificación", "Razón"]}
            rows={[
              ["CPU", "ARM Cortex-A72+ o x86 Core i5+ industrial", "FFT en tiempo real de señales 25.6 kHz requiere ≥ 1.5 GHz"],
              ["Memoria RAM", "≥ 4 GB DDR4", "Buffer de señales + ejecución de modelos ONNX/TensorFlow Lite"],
              ["Almacenamiento local", "≥ 64 GB SSD industrial (SLC NAND)", "Buffer de 24–72 horas ante pérdida de conectividad WAN"],
              ["Conectividad OT", "4× RS-485; 2× Ethernet GbE (Modbus TCP, OPC-UA)", "Integración con sensores y PLCs existentes"],
              ["Conectividad WAN", "LTE/4G Cat-12 + Ethernet WAN + Wi-Fi 802.11ac", "Redundancia de conectividad hacia plataforma central"],
              ["Temperatura operativa", "-40°C a +70°C sin ventilación forzada", "Operación en gabinetes exteriores expuestos"],
            ]}
          />

          <Prose>
            <p><Bold>Gateways validados en entornos extractivos LATAM:</Bold></p>
          </Prose>
          <div className="my-6 grid sm:grid-cols-2 gap-3">
            {[
              { name: "Moxa MC-7400 Series", desc: "Ampliamente usado en minería LATAM; -40°C a +70°C; MIL-STD-810G; Cell LTE Cat-4." },
              { name: "Advantech UNO-2484G", desc: "Core i5 industrial; -20°C a +60°C; expansión modular para I/O analógica." },
              { name: "Siemens SIMATIC IPC227E", desc: "Integración nativa con TIA Portal; ideal en plantas con predominio Siemens." },
              { name: "Eurotech ReliaGATE 10-14", desc: "ARM Cortex-A9; soporte Kura (Eclipse IoT); -40°C a +75°C." },
            ].map(({ name, desc }) => (
              <div
                key={name}
                className="p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-sm font-bold text-white mb-1">{name}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>Capa 3 — Platform: IIoT Central y Analítica</SubHeading>
          <DataTable
            headers={["Plataforma", "Fortaleza Principal", "Mejor Ajuste LATAM"]}
            rows={[
              [<Bold key="a">AVEVA PI System + PI AF</Bold>, "Historian industrial de facto; mayor ecosistema OT; 30+ años en minería", "Gran minería con SAP ERP; Chile, Perú"],
              [<Bold key="b">Azure IoT Hub + Azure ML</Bold>, "Ecosistema cloud completo; integración Power BI nativa; skills IT disponibles", "Operaciones con fuerte adopción Microsoft 365 / Azure"],
              [<Bold key="c">Siemens Industrial Edge + MindSphere</Bold>, "Integración nativa con automatización Siemens; edge computing baja latencia", "Plantas con automatización Siemens predominante"],
              [<Bold key="d">PTC ThingWorx + Vuforia</Bold>, "Realidad aumentada integrada; dashboards no-code; AR para técnicos en campo", "Operaciones con dispersión geográfica de técnicos"],
              [<Bold key="e">Uptake Industrial AI</Bold>, "100% especializado en assets industriales; modelos preentrenados minería/O&G", "Operaciones con foco en reducción rápida de paradas"],
              [<Bold key="f">AWS IoT Greengrass + SageMaker</Bold>, "Flexibilidad máxima; modelos ML custom; costo de ingesta competitivo", "Equipos de datos internos maduros"],
            ]}
          />

          <SubHeading>Capa 4 — Action: Integración con CMMS</SubHeading>
          <Prose>
            <p>Una alerta predictiva sin integración con el CMMS es ruido — información valiosa que nadie actúa porque hacerlo requiere más pasos que ignorarla.</p>
          </Prose>
          <CodeBlock>{`PLATAFORMA IIoT                               SAP PM / EAM
     │
     ├─ ALERTA CRÍTICA (RUL < 48h o anomalía severa)
     │      └─► Orden de Mantenimiento Correctivo PM01 | Prioridad 1 (Muy urgente)
     │              Notificación push → Supervisor de turno
     │
     ├─ ALERTA ALTA (RUL 48h–2 semanas)
     │      └─► Aviso Preventivo PM02 | Próxima ventana disponible
     │              Verificación automática de stock en MM
     │              Si stock = 0 → Solicitud de pedido automática a compras
     │
     ├─ ALERTA MEDIA (RUL > 2 semanas, tendencia negativa)
     │      └─► Registro en backlog PM → Lista de inspecciones
     │              Programación sugerida en próxima parada menor
     │
     └─ DATO INFORMATIVO (desvío < umbral)
            └─► Dashboard operativo | Monitoreo intensificado`}</CodeBlock>

          {/* ─── SECCIÓN 3: SELECCIÓN DE SENSORES ─── */}
          <SectionHeading number="3" title="Guía de Selección de Sensores por Tipo de Activo" icon={Shield} />

          <SubHeading>3.1 Equipos Rotativos — Stack por Criticidad</SubHeading>
          <Prose>
            <p>Los equipos rotativos representan el <Bold>62–68% de los activos críticos</Bold> en operaciones extractivas y concentran el mayor número de fallas catastróficas prevenibles.</p>
          </Prose>

          <div className="my-6 space-y-4">
            {[
              {
                level: "A", color: "#FF0057", bg: "rgba(255,0,87,0.08)", border: "rgba(255,0,87,0.22)",
                title: "Criticidad A — Pérdida de producción inmediata y total (sin redundancia)",
                items: [
                  "Acelerómetro triaxial MEMS alta frecuencia (0–20,000 Hz): montaje roscado en carcasa de rodamiento DE y NDE. Ref: PCB 356A32; Wilcoxon 797M; Hansford HS-100S.",
                  "RTD Pt100 clase A: rodamiento principal + temperatura de bobinados.",
                  "Transformador de corriente (CT) no invasivo en cada fase: detección MCSA, desequilibrio, sobrecorriente.",
                  "Sensor de aceite en línea: ferrografía + temperatura + viscosidad. Ref: Parker WearSens; MP Filtri LPA3-WI.",
                  "Frecuencia: continua; FFT almacenada cada 15 min; alarmas en tiempo real.",
                ]
              },
              {
                level: "B", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.22)",
                title: "Criticidad B — Impacto parcial; redundancia parcial disponible",
                items: [
                  "Acelerómetro uniaxial en eje de mayor sensibilidad (radial para rodamientos, axial para empuje).",
                  "Temperatura de carcasa (sensor IR superficial o termopar K).",
                  "CT en corriente de motor (una fase como mínimo).",
                  "Frecuencia: cada 1–4 horas; alarmas en tiempo real.",
                ]
              },
              {
                level: "C", color: "#60A5FA", bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.22)",
                title: "Criticidad C — Redundancia total; reemplazo rápido disponible",
                items: [
                  "Medición periódica con herramienta portátil certificada (SKF QuickCollect o Fluke 810).",
                  "Frecuencia: semanal a mensual según historial.",
                ]
              },
            ].map(({ level, color, bg, border, title, items }) => (
              <div key={level} className="rounded-2xl overflow-hidden" style={{ background: bg, border: `1px solid ${border}` }}>
                <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${border}` }}>
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: color, color: "white" }}>{level}</span>
                  <p className="text-sm font-semibold text-white leading-tight">{title}</p>
                </div>
                <ul className="px-5 py-4 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ background: color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <SubHeading>3.2 Activos Eléctricos Críticos</SubHeading>
          <DataTable
            compact
            headers={["Activo", "Sensor Recomendado", "Parámetro Medido", "Falla Detectada", "Ventana"]}
            rows={[
              [<Bold key="t1">Transformador AT/MT</Bold>, "DGA online tipo Vaisala MGP252 o Hydran M2", "H₂, C₂H₂, CO, CO₂, CH₄", "Descargas internas, punto caliente en devanados", "Semanas–meses"],
              [<Bold key="t2">Transformador distribución</Bold>, "Thermocouple K en OTI/WTI + sensor humedad", "Temperatura de aceite y devanados; humedad", "Envejecimiento acelerado; infiltración de agua", "2–8 semanas"],
              [<Bold key="sw">Switchgear 12–36 kV</Bold>, "Sensor DP tipo HFCT o antena UHF", "Actividad de descarga parcial (pC)", "Degradación de aislamiento en cables y pasatapas", "Meses"],
              [<Bold key="vfd">Variador de frecuencia (VFD)</Bold>, "Temperatura bus DC + análisis armónicas + T° IGBT", "THD; temperatura de semiconductor", "Degradación capacitores; falla IGBT inminente", "1–4 semanas"],
              [<Bold key="motor">Motor AT (molino SAG/Ball)</Bold>, "RTD en devanados (12 pts) + MCSA", "T° devanados; vibración rodamiento; corriente", "Corto entre espiras; falla rodamiento de empuje", "1–8 semanas"],
            ]}
          />

          <SubHeading>3.3 Infraestructura de Proceso</SubHeading>
          <DataTable
            headers={["Activo", "Stack de Sensores", "KPI Crítico", "Consecuencia de Falla"]}
            rows={[
              [<Bold key="c">Correa transportadora</Bold>, "Acelerómetros en rodillos (cada 15–20 m); sensor alineación; termocámara", "T° rodillos (>85°C = falla inminente); desalineación >5 mm", "Incendio por rodillo atascado; costo correa USD 200K–2M+"],
              [<Bold key="m">Molino SAG</Bold>, "Acelerómetro en rodamiento principal; micrófonos de carga (audio fingerprinting); sensores presión hidráulica", "Nivel carga acústica; condición trunnion bearing; presión aceite", "Fractura trunnion bearing: hasta USD 12M + 6–12 semanas parada"],
              [<Bold key="ch">Chancadora cónica</Bold>, "Acelerómetro triaxial; sensor presión hidráulica; T° aceite; medidor desgaste láser", "Presión hidráulica (sobrecarga); T° aceite; vibración excéntrico", "Rotura de manto de Mn: USD 80–350K + parada 48–120h"],
              [<Bold key="b">Bomba de pulpa</Bold>, "Acelerómetro rodamiento; transmisor DP succión/descarga; caudal magnético; CT", "Eficiencia hidráulica; vibración; cavitación", "Desgaste catastrófico de impeller: USD 15–90K; parada 24–96h"],
            ]}
          />

          {/* ─── SECCIÓN 4: ANALÍTICA ─── */}
          <SectionHeading number="4" title="Modelos de Analítica: Del Umbral al Prescriptivo" icon={BarChart2} />

          <div className="space-y-4 my-6">
            {[
              { level: "1", label: "Monitoreo de umbrales (Rule-based)", desc: "Comparación de valor instantáneo vs. límite fijo (ISO 10816 para vibración; datasheet para temperatura). Alta tasa de falsas alarmas; no requiere datos históricos. Punto de partida válido, no punto de llegada.", color: "#94A3B8" },
              { level: "2", label: "Detección estadística de anomalías", desc: "Comparación vs. comportamiento histórico del mismo activo (Bollinger Bands, 3-sigma CUSUM). Requiere 4–8 semanas de baseline limpio. Reduce falsas alarmas significativamente.", color: "#60A5FA" },
              { level: "3", label: "ML para detección de anomalías multivariable", desc: "Modelos entrenados sobre correlaciones de múltiples señales. Algoritmos: Isolation Forest, Autoencoder LSTM, One-Class SVM. Requiere 12–16 semanas de datos de operación normal.", color: "#34D399" },
              { level: "4", label: "RUL Prediction (Remaining Useful Life)", desc: "Estimación cuantitativa del tiempo restante antes de falla. Permite programar la intervención en la ventana óptima. Modelos: PHM, Weibull bayesiano, redes LSTM de pronóstico.", color: "#F59E0B" },
              { level: "5", label: "Prescriptivo (AI + Contexto Operativo)", desc: "No solo predice cuándo fallará — determina qué intervención exacta, con qué repuestos y en qué ventana del plan de producción. Estado del arte 2025; en proceso de adopción en LATAM.", color: "#FF0057" },
            ].map(({ level, label, desc, color }) => (
              <div
                key={level}
                className="flex gap-4 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5"
                  style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
                >
                  {level}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1.5">{label}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Callout type="info">
            <strong>El problema del falso positivo:</strong> Un sistema que genera demasiados falsos positivos pierde
            credibilidad con el equipo de mantenimiento en 4–8 semanas. La estrategia correcta: comenzar con
            <strong> sensibilidad baja</strong> (pocos falsos positivos, posibles falsos negativos) y aumentar
            gradualmente conforme el equipo construye confianza en el sistema.
          </Callout>

          {/* ─── SECCIÓN 5: PLAN 8 SEMANAS ─── */}
          <SectionHeading number="5" title="Implementación: Plan de 8 Semanas" icon={Zap} />

          <div className="space-y-4 my-6">
            {[
              {
                weeks: "Semanas 1–2", title: "Assessment y Diseño",
                items: [
                  "Clasificar activos en matriz FMEA: consecuencia de falla × probabilidad de falla",
                  "Seleccionar los 20 activos con mayor score (auditar contra criterio del equipo de operaciones)",
                  "Diseñar arquitectura de instrumentación por activo (sensor, posición, protocolo, frecuencia)",
                  "Elaborar BOM detallado con especificaciones técnicas y referencias de proveedor",
                  "Plan de proyecto con hitos, responsables y criterios de aceptación",
                ]
              },
              {
                weeks: "Semanas 3–4", title: "Instrumentación",
                items: [
                  "Preparación de superficies: amolado Ra < 0.8 μm + limpieza con solvente",
                  "Instalación de insertos roscados con epoxi estructural curado 24h",
                  "Cableado: señal separada ≥30 cm de cables de potencia; apantallado en un extremo",
                  "Etiquetado: TAG + posición (DE/NDE/radial/axial) + fecha + número de calibración",
                  "Prueba de señal: nivel, offset, ruido de fondo y respuesta a excitación conocida",
                ]
              },
              {
                weeks: "Semanas 5–6", title: "Plataforma y Baseline",
                items: [
                  "Onboarding de activos con metadata completa (fabricante, modelo, N/S, velocidad nominal, tipo de rodamientos)",
                  "Configuración de umbrales iniciales basados en norma (ISO 10816-3; ISO 20816)",
                  "Integración CMMS: conexión API, mapeo de campos, prueba de generación de aviso",
                  "Captura de baseline 3–4 semanas en activos verificados en buena condición",
                ]
              },
              {
                weeks: "Semanas 7–8", title: "Go-Live y Estabilización",
                items: [
                  "Semana 7: alertas en modo shadow — solo equipo del proyecto; comparar con conocimiento experto",
                  "Semana 8: activación real, comenzando por criticidad A y Crítica",
                  "Revisión diaria de cada alerta con el supervisor de mantenimiento las primeras 2 semanas",
                  "KPI de éxito: ≥95% activos con datos válidos; ≥99% conectividad; ≥1 OT generada automáticamente y ejecutada",
                ]
              },
            ].map(({ weeks, title, items }, idx) => (
              <div
                key={weeks}
                className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="px-5 py-3 flex items-center gap-4"
                  style={{ background: "rgba(255,0,87,0.06)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                    style={{ background: "#FF0057" }}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/35">{weeks}</p>
                    <p className="text-sm font-bold text-white">{title}</p>
                  </div>
                </div>
                <ul className="px-5 py-4 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: "#FF0057" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ─── SECCIÓN 6: KPIs ─── */}
          <SectionHeading number="6" title="KPIs del Programa de Mantenimiento Predictivo" icon={TrendingUp} />

          <DataTable
            headers={["KPI", "Benchmark Objetivo", "Año 1 → Año 2"]}
            rows={[
              [<Bold key="k1">Cobertura activos Criticidad A</Bold>, "100% año 1", "100% → 100%"],
              [<Bold key="k2">Disponibilidad del sistema de sensores</Bold>, "≥ 97.5%", "Semanal"],
              [<Bold key="k3">Precisión del sistema (PPV)</Bold>, "≥ 70% año 1", "70% → 82%"],
              [<Bold key="k4">Sensibilidad del sistema</Bold>, "≥ 92% (no perder fallas reales)", "Constante"],
              [<Bold key="k5">Tiempo de anticipación promedio</Bold>, "≥ 14 días promedio", "Creciente con madurez del modelo"],
              [<Bold key="k6">Tiempo alerta → orden CMMS</Bold>, "< 30 minutos (automático)", "Auto desde Semana 8"],
            ]}
          />

          <DataTable
            headers={["KPI Operativo", "Línea Base LATAM", "Objetivo Año 1", "Objetivo Año 2"]}
            rows={[
              [<Bold key="p">Paradas no planificadas</Bold>, "100% (índice base)", <Accent key="a1">−28 a −38%</Accent>, <Accent key="a2">−42 a −54%</Accent>],
              [<Bold key="m">MTBF (Tiempo entre fallas)</Bold>, "Línea base propia", "+25%", "+45%"],
              [<Bold key="r">MTTR (Tiempo de reparación)</Bold>, "Línea base propia", "−20%", "−35%"],
              [<Bold key="c">Costo mantenimiento correctivo</Bold>, "100% (índice base)", "−30%", "−48%"],
              [<Bold key="v">Vida útil activos críticos</Bold>, "100% (diseño OEM)", "+18%", "+32%"],
              [<Bold key="s">Incidentes de seguridad por falla</Bold>, "Línea base", "−38%", "−57%"],
            ]}
          />

          {/* ─── SECCIÓN 7: ROI ─── */}
          <SectionHeading number="7" title="Modelo de ROI y Caso de Negocio" icon={Database} />

          <SubHeading>7.1 Inversión de Referencia — 100 Activos Monitoreados</SubHeading>
          <DataTable
            headers={["Componente", "Rango (USD)", "Supuestos"]}
            rows={[
              ["Sensores e instrumentación", "180,000 – 340,000", "Mezcla de criticidades A/B/C; acelerómetros, RTDs, CTs, sensores DGA"],
              ["Gateways industriales y red de campo", "65,000 – 130,000", "8–15 gateways según dispersión; cableado; armarios IP66"],
              ["Plataforma IIoT (licencias año 1)", "85,000 – 200,000", "SaaS cloud u on-premise; incluye conectores estándar"],
              ["Integración CMMS (SAP PM / Maximo)", "35,000 – 90,000", "Varía con complejidad del CMMS y calidad de la API"],
              ["Servicios de implementación y capacitación", "65,000 – 135,000", "RF Survey, instalación supervisada, validación de modelos, 3 roles"],
              [<Bold key="total">INVERSIÓN TOTAL AÑO 1</Bold>, <Bold key="usd">USD 430,000 – 895,000</Bold>, "—"],
              ["OPEX anual años 2+ (licencias + soporte)", "130,000 – 250,000", "~15–25% del CAPEX inicial"],
            ]}
          />

          <SubHeading>7.2 Modelo de Retorno — Escenario Conservador</SubHeading>
          <Prose>
            <p><Bold>Supuesto base:</Bold> Operación minera mediana (500,000 TM/mes); <Bold>1.8 paradas no planificadas de activos A</Bold> evitadas por año; costo promedio de parada <Bold>USD 1.4M</Bold> (lucro cesante + mano de obra de emergencia + daño secundario).</p>
          </Prose>
          <DataTable
            headers={["Fuente de Ahorro/Valor", "Valor Anual (USD)", "Fuente"]}
            rows={[
              ["Prevención de paradas no planificadas (1.8 × USD 1.4M)", <Accent key="v1">2,520,000</Accent>, "Deloitte Mining Benchmark 2025"],
              ["Reducción mantenimiento preventivo innecesario (−27%)", "310,000", "McKinsey Maintenance Optimization 2025"],
              ["Extensión vida útil activos críticos (diferimiento CAPEX)", "380,000", "Emerson Asset Performance Benchmark 2025"],
              ["Reducción inventario de repuestos en emergencia", "105,000", "Gartner Supply Chain Optimization 2024"],
              ["Reducción incidentes de seguridad por falla mecánica", "180,000", "ICMM Safety Cost Benchmark 2025"],
              [<Bold key="total">AHORRO/VALOR ANUAL TOTAL</Bold>, <Accent key="v2"><Bold key="b">3,495,000</Bold></Accent>, "—"],
              [<Bold key="roi">ROI sobre inversión año 1</Bold>, <Accent key="v3"><Bold key="c">290–710%</Bold></Accent>, "Escenario central"],
              [<Bold key="pb">Payback period</Bold>, <Accent key="v4"><Bold key="d">2–4 meses</Bold></Accent>, "Escenario conservador"],
            ]}
          />

          {/* ─── SECCIÓN 8: TENDENCIAS ─── */}
          <SectionHeading number="8" title="Tendencias 2025–2026: Hacia el Mantenimiento Autónomo" icon={Cpu} />

          <div className="space-y-5 my-6">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#FF0057" }}>8.1 AI Generativa Aplicada al Diagnóstico de Activos</p>
              <Prose>
                <p>
                  Los LLMs están siendo integrados en plataformas IIoT para traducir datos de sensores y patrones de falla
                  en narrativas de diagnóstico accionables. En lugar de un gráfico espectral que solo interpreta un analista
                  certificado ISO CAT III, el técnico recibe:
                </p>
              </Prose>
              <blockquote
                className="mt-4 px-4 py-3 rounded-xl text-sm text-slate-300 italic leading-relaxed"
                style={{ background: "rgba(255,0,87,0.07)", borderLeft: "3px solid #FF0057" }}
              >
                &ldquo;El rodamiento NDE del motor de la bomba de alimentación #3 muestra incremento progresivo de frecuencias
                BPFI desde 14 días. Con alta probabilidad corresponde a desgaste en pista interna. Se recomienda inspección
                visual y reemplazo en los próximos 5–8 días. Rodamiento equivalente disponible en bodega (stock 2 unidades).&rdquo;
              </blockquote>
              <p className="text-xs text-slate-500 mt-3">Fuente: Gartner &ldquo;AI in Industrial Operations 2025–2027&rdquo;, marzo 2025.</p>
            </div>

            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#0D9488" }}>8.2 Digital Twins para Simulación de Degradación</p>
              <Prose>
                <p>
                  Los gemelos digitales permiten no solo monitorear el estado actual sino simular el comportamiento futuro
                  bajo diferentes escenarios de carga. El sistema puede responder:
                </p>
              </Prose>
              <blockquote
                className="mt-4 px-4 py-3 rounded-xl text-sm text-slate-300 italic leading-relaxed"
                style={{ background: "rgba(13,148,136,0.07)", borderLeft: "3px solid #0D9488" }}
              >
                &ldquo;Si operamos el molino SAG al 95% de capacidad durante los próximos 12 días, los rodamientos de trunnion
                llegarán al 15% de vida remanente; si operamos al 88%, estarán al 34% al momento de la parada planificada.&rdquo;
              </blockquote>
              <p className="text-xs text-slate-500 mt-3">Fuente: Siemens Xcelerator Whitepaper 2025; Ansys Predictive Digital Twins 2025.</p>
            </div>
          </div>

          {/* ─── CONCLUSIONES ─── */}
          <div
            className="my-14 rounded-3xl p-8"
            style={{ background: "linear-gradient(135deg, rgba(255,0,87,0.10) 0%, rgba(0,0,134,0.08) 100%)", border: "1px solid rgba(255,0,87,0.22)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,0,87,0.15)", border: "1px solid rgba(255,0,87,0.30)" }}>
                <CheckCircle2 size={16} style={{ color: "#FF0057" }} />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/50">Conclusiones</p>
            </div>
            <Prose>
              <p className="text-white/80 leading-[1.9]">
                El mantenimiento predictivo basado en IIoT industrial no es una inversión en tecnología —
                es una <Bold>inversión estructural en la continuidad operativa, la seguridad y la competitividad</Bold> a
                largo plazo de la operación. Las empresas extractivas que implementan PdM como capacidad
                estratégica sistemáticamente superan a sus competidores en disponibilidad de planta, costos de
                mantenimiento y performance de seguridad.
              </p>
              <p className="text-white/70 leading-[1.9]">
                La evidencia de implementaciones en la región es consistente: el retorno se materializa dentro del
                <Bold> primer año operativo</Bold> en operaciones de media y gran escala. El riesgo de no actuar —
                continuar en modo reactivo mientras los competidores globales aceleran su adopción de analítica de
                activos — es un riesgo estratégico que excede con creces el riesgo de implementación.
              </p>
            </Prose>
          </div>

          {/* ─── REFERENCIAS ─── */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Referencias y Fuentes</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <ol className="space-y-2">
              {[
                "Deloitte, Global Mining Benchmark Report 2025: Operational Performance in Extractive Industries, enero 2025.",
                "McKinsey & Company, Operations Benchmarking: Latin American Mining 2025, febrero 2025.",
                "IDC Latin America, Industrial IoT Survey 2025: Adoption, Barriers and ROI in LATAM Manufacturing & Mining, marzo 2025.",
                "ARC Advisory Group, IIoT Platform Evaluation: Industrial Predictive Maintenance Solutions, Q4 2024.",
                "Gartner, Magic Quadrant for Industrial IoT Platforms 2024, octubre 2024.",
                "Gartner, AI in Industrial Operations 2025–2027: Emerging Technology Trends, marzo 2025.",
                "ICMM, Digital Safety Innovation Report 2025.",
                "IIMP, Reporte de Gestión de Activos y Mantenimiento Minero en América Latina 2025, Q1 2025.",
                "Emerson Electric, Asset Performance and Reliability Survey: Latin American Industrial Operations 2025.",
                "ISO 10816-3:1998/Amd.1:2013 — Mechanical Vibration: Evaluation by Measurements on Non-rotating Parts.",
                "ISO 20816-3:2022 — Mechanical Vibration: Measurement and Evaluation of Machine Vibration.",
                "ISO 15243:2017 — Rolling Bearings: Damage and Failures, Terms, Characteristics and Causes.",
                "IEC 60599:2022 — Guide to the Interpretation of Dissolved and Free Gases Analysis.",
                "IEEE C57.104-2019 — Guide for the Interpretation of Gases in Mineral Oil-Immersed Transformers.",
                "PHM Society, Annual Conference on Prognostics and Health Management 2024: Proceedings.",
                "SKF Group, Bearing Damage Severity Classification and Vibration Diagnostic Guide, actualización 2024.",
                "Metso Minerals, Crushing and Screening Wear Monitoring Technical Bulletin 2025.",
                "Siemens, Digital Twin for Asset Lifecycle Management in Mining, Siemens Xcelerator Whitepaper 2025.",
                "AVEVA, PI System in Mining: Operational Excellence Through Real-Time Data, Technical Paper 2024.",
                "Uptake Technologies, Industrial AI for Asset Performance Management: 2025 Report.",
                "ASTM D4378-20 — Standard Practice for In-Service Monitoring of Mineral Turbine Oils.",
              ].map((ref, i) => (
                <li key={i} className="flex gap-3 text-xs text-slate-500 leading-relaxed">
                  <span className="shrink-0 font-mono text-white/20">{String(i + 1).padStart(2, "0")}.</span>
                  {ref}
                </li>
              ))}
            </ol>
          </div>

          {/* ─── FOOTER CTA ─── */}
          <div
            className="mt-16 rounded-3xl p-10 text-center"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E1035 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: "#FF0057" }}>
              ¿Listo para implementar?
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
              OSC diseña e implementa soluciones<br className="hidden md:block" />
              de mantenimiento predictivo en LATAM
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
              Evaluamos su operación, priorizamos activos críticos y diseñamos la arquitectura IIoT completa —
              desde sensores hasta integración con su CMMS.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2.5 font-bold text-white px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #FF0057 0%, #CC0044 100%)", boxShadow: "0 4px 20px rgba(255,0,87,0.30)" }}
              >
                Solicitar diagnóstico ejecutivo
                <ArrowLeft size={15} className="rotate-180" />
              </Link>
              <Link
                href="/industrias/energia-mineria"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors"
              >
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
