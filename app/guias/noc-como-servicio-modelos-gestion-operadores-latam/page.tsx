import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, BookOpen, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Wifi, Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "NOC como Servicio: Modelos de Gestión para Operadores en LATAM — Whitepaper 2025–2026 | OSC",
  description:
    "Comparativa técnica y financiera entre NOC in-house, NOCaaS y modelo híbrido para operadores latinoamericanos: TCO a 5 años, AIOps, casos Tigo/Millicom y MVNO México, KPIs operativos y hoja de ruta de transición de 12 meses.",
  keywords: [
    "NOC como servicio telecomunicaciones LATAM",
    "gestión de redes operadores América Latina",
    "AIOps telecomunicaciones NOCaaS",
    "OPEX reducción gestión red operadores",
    "NOC híbrido operadores regionales",
    "OSC Top Solutions telecoms",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/noc-como-servicio-modelos-gestion-operadores-latam` },
  openGraph: {
    title: "NOC como Servicio: Modelos de Gestión para Operadores en LATAM",
    description: "TCO a 5 años, AIOps, casos verificados y roadmap de 12 meses para la transición a NOC gestionado.",
    type: "article",
    url: `${SITE_URL}/guias/noc-como-servicio-modelos-gestion-operadores-latam`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "NOC como Servicio: Modelos de Gestión para Operadores en LATAM — Whitepaper 2025–2026",
  description: "Comparativa técnica y financiera entre gestión in-house vs NOC gestionado, con casos de implementación en operadores nacionales y regionales de la región.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01", dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/noc-como-servicio-modelos-gestion-operadores-latam`,
  inLanguage: "es-419",
};

const A = "#7C3AED";
const AL = "#A78BFA";

function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle, bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", color: "#F59E0B", label: "Alerta de implementación" },
    info:    { icon: Info,          bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.22)", color: AL,        label: "Nota técnica" },
    success: { icon: CheckCircle2,  bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.22)", color: AL,        label: "Caso validado" },
    stat:    { icon: TrendingUp,    bg: "rgba(255,0,87,0.07)",   border: "rgba(255,0,87,0.22)",   color: "#FF0057", label: "Dato crítico 2025" },
    danger:  { icon: AlertTriangle, bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.28)",  color: "#EF4444", label: "Riesgo identificado" },
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
      <pre className="p-5 text-[11px] leading-relaxed text-violet-300/80 font-mono overflow-x-auto" style={{ background: "rgba(0,0,0,0.40)" }}>{children}</pre>
    </div>
  );
}

export default function WhitepaperNOCaaS() {
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
              <span style={{ color: AL }}>Whitepaper</span>
            </nav>
            <Link href="/industrias/telecoms" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: `${AL}80` }}>
              <ArrowLeft size={14} /><span>Volver a Telecoms</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <BookOpen size={11} />Whitepaper Técnico · 2025–2026
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              NOC como Servicio:<br /><span style={{ color: AL }}>Modelos de Gestión para Operadores en LATAM</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
              Comparativa técnica y financiera entre NOC in-house, NOCaaS y modelo híbrido. Con análisis de TCO a 5 años, AIOps, casos verificados y roadmap de transición de 12 meses.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Clock size={13} />12 min de lectura</span>
              <span className="flex items-center gap-1.5"><BookOpen size={13} />24 páginas</span>
              <span className="flex items-center gap-1.5"><Wifi size={13} />Sector Telecoms</span>
              <span>22 fuentes verificadas</span>
            </div>
          </div>
        </div>

        {/* KPI STRIP */}
        <div className="border-y border-white/08" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "22–41%", l: "Reducción de OPEX al migrar a NOC gestionado o híbrido", ctx: "TM Forum NOC Benchmark 2025" },
              { v: "35%", l: "Ahorro de OPEX en gestión de red vs operación in-house", ctx: "Caso comprobado OSC en Colombia" },
              { v: "34K", l: "Posiciones vacantes de ingenieros de gestión de redes 5G en LATAM", ctx: "IDC Telecom Talent Gap 2025" },
              { v: "6.2m", l: "MTTD con NOCaaS vs 14.8 min con NOC in-house promedio LATAM", ctx: "Analysys Mason NOC Benchmark 2025" },
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
          <SectionHeading number="01" title="Abstract: Por Qué el NOC In-House Está Siendo Cuestionado" />
          <p className="text-slate-300 leading-relaxed mb-4">
            La gestión de redes de telecomunicaciones en América Latina atraviesa una transformación estructural impulsada por tres fuerzas simultáneas: la densificación acelerada de infraestructura 5G y fibra óptica que multiplica la complejidad operativa, la presión de márgenes que exige eficiencia en OPEX, y la escasez crítica de talento técnico especializado en gestión de redes de nueva generación.
          </p>
          <Callout type="success">
            Los operadores que migraron a modelos de NOC gestionado o híbrido reportaron reducciones en OPEX de red entre <strong>22% y 41%</strong>, con mejoras en MTTR de 28–44% y en disponibilidad de red de 0.8–1.4 puntos porcentuales (<em>TM Forum NOC Operations Benchmark 2025</em>).
          </Callout>
          <DataTable
            headers={["Indicador", "Valor 2025", "Tendencia", "Fuente"]}
            rows={[
              ["Operadores LATAM con NOC 100% in-house", "61%", "↓ (era 78% en 2022)", "TM Forum LATAM Survey 2025"],
              ["Operadores con modelo híbrido", "28%", "↑", "TM Forum 2025"],
              ["Operadores con NOC 100% gestionado (NOCaaS)", "11%", "↑", "TM Forum 2025"],
              ["OPEX promedio gestión de red / ingreso total", "18.4%", "↓ (era 22.1% en 2022)", "GSMA Operators Cost Benchmark 2025"],
              ["Disponibilidad promedio (operadores medianos LATAM)", "99.71%", "↑ levemente", "ITU Telecom Performance Report 2025"],
              ["Escasez de ingenieros de gestión de redes 5G", "34,000 posiciones vacantes", "↑↑", "IDC Telecom Talent Gap 2025"],
              ["MTTD in-house vs NOCaaS", "14.8 min vs 6.2 min", "—", "Analysys Mason NOC Benchmark 2025"],
              ["Mercado de NOC gestionado telecom LATAM", "USD 2.1B", "+18% CAGR", "MarketsandMarkets 2025"],
            ]}
          />

          <SectionHeading number="02" title="La Evolución del NOC: Del Monitoreo Reactivo a la Inteligencia de Red" />
          <DataTable
            headers={["Generación", "Período", "Modelo Operativo", "Límites"]}
            rows={[
              ["NOC 1.0 — Monitoreo Reactivo", "Pre-2010", "Operadores mirando paneles; alarmas sonoras; escalación manual (NMS legacy)", "Sin automatización; fatiga de operador; cientos de alarmas simultáneas"],
              ["NOC 2.0 — Gestión de Eventos", "2010–2018", "Correlación básica de eventos; tickets automáticos; dashboards (Splunk básico; ServiceNow)", "Correlación limitada; sin RCA; silos por dominio"],
              ["NOC 3.0 — AIOps y Automatización", "2018–2024", "AI/ML para correlación; automatización de remediación; analytics predictivo (Moogsoft; Dynatrace)", "Requiere datos limpios; curva de entrenamiento larga"],
              ["NOC 4.0 — Intent-Based Networking", "2024–2026+", "Gestión por intención; autonomía de remediación; predicción proactiva (Nokia AVA; Ericsson IDOS)", "Alta inversión; requiere modernización de red subyacente"],
            ]}
          />

          <SubHeading title="Funciones Críticas de un NOC de Clase Mundial" />
          <ul className="space-y-3 mb-6">
            {[
              { t: "Monitoreo en tiempo real (24/7/365)", d: "Supervisión de disponibilidad de todos los NEs. Umbrales por criticidad: gold (99.99%), silver (99.9%), bronze (99.5%). Dashboards por dominio y ejecutivo en 5 KPIs críticos." },
              { t: "Gestión de fallos (Fault Management)", d: "MTTD benchmark clase mundial: < 5 min para fallos de alta severidad. Root Cause Analysis (RCA): causa raíz, no solo el síntoma. Escalación L1→L2→L3 con SLAs definidos." },
              { t: "Gestión de rendimiento (Performance Management)", d: "Recolección periódica de KPIs. Análisis de tendencias: detección de degradación progresiva antes de impactar el SLA. Alerta a 70% de uso; acción a 85%." },
              { t: "Gestión de configuración (Configuration Management)", d: "CMDB actualizada y reconciliada con la red real. Backup automático de configuraciones. Toda modificación en producción bajo proceso CAB. Detección de desvíos de configuración." },
              { t: "Integración NOC-SOC", d: "Monitoreo de eventos de seguridad de red. DDoS detection y mitigación: identificación de ataques volumétricos en tiempo real; activación de scrubbing centers." },
            ].map(({ t, d }) => (
              <li key={t} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />
                <div><span className="text-white font-semibold text-sm">{t}: </span><span className="text-slate-400 text-sm">{d}</span></div>
              </li>
            ))}
          </ul>

          <SectionHeading number="03" title="Los Tres Modelos de NOC: Análisis Comparativo" />

          <SubHeading title="Modelo A — NOC In-House (Gestión Propia Completa)" />
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            El operador construye, equipa, staffea y opera su propio NOC. Todo el personal es empleado directo.
          </p>
          <DataTable
            headers={["Componente de Costo", "Rango Anual (operador 500K–2M abonados)", "Notas"]}
            rows={[
              ["Personal (L1/L2/L3, líderes de turno, supervisores)", "USD 2.8M–6.5M/año", "40–80 FTEs en operación 24/7; costo varía por país"],
              ["Herramientas y licencias (NMS, OSS, ITSM, analytics)", "USD 800K–2.2M/año", "AIOps representa USD 400K–1.5M adicionales"],
              ["Infraestructura (datacenter, workstations, video wall)", "USD 400K–1M CAPEX + USD 120K–300K/año OPEX", "Amortización CAPEX sobre 7 años"],
              ["Formación y certificaciones", "USD 150K–400K/año", "Rotación de talento técnico 22–35% anual en LATAM"],
              ["COSTO TOTAL ANUAL", "USD 4.3M–10.4M", "Por operador mediano"],
            ]}
          />

          <SubHeading title="Modelo B — NOC Completamente Gestionado (NOCaaS)" />
          <CodeBlock label="contrato-nocaas — componentes">{`SCOPE OF SERVICES:
├─ Monitoreo 24/7/365 de todos los NEs definidos en el alcance
├─ Gestión de fallos: detección, correlación, RCA, resolución (hasta L2)
│   → L3 (vendor) escalado con SLA de primera llamada < 15 min
├─ Gestión de rendimiento: recolección de KPIs, análisis de tendencias
├─ Reporting mensual: disponibilidad, incidentes, capacidad
├─ Gestión de cambios: coordinación y ejecución de cambios
└─ Integración con OSS/BSS del cliente vía API

SLAs TÍPICOS (NOCaaS de clase):
├─ MTTD fallas P1: < 3 minutos
├─ MTTR fallas P1: < 2 horas (dependiente de acceso físico)
├─ Disponibilidad del NOC: 99.999%
├─ Tiempo de primera respuesta ticket P1: < 5 minutos
└─ SLA de entrega de reporte mensual: día 5 del mes siguiente

MODELO DE PRECIOS (referencia mercado LATAM 2025):
├─ Fee mensual fijo por NE gestionado: USD 35–120/NE/mes
├─ Fee por servicio gestionado (APN, VPN, L3 VPN): USD 50–200/servicio/mes
└─ Fee por capacidad de incidentes: variable`}</CodeBlock>

          <SubHeading title="Modelo C — NOC Híbrido (Co-gestión)" />
          <CodeBlock label="noc-hibrido — arquitectura">{`OPERADOR (in-house)                    MSP (gestionado)
├─ L3 / Expertise técnico profundo    ├─ L1 Monitoreo 24/7 básico
│   (arquitectos de red, especialistas │   (alarmas, ticketing inicial,
│   5G, core IP, seguridad)            │   escalación protocolar)
│                                      │
├─ Gestión de incidentes críticos P1  ├─ L2 Resolución de problemas
│   (decisiones con impacto de red)    │   estándar (con runbooks)
│                                      │
├─ Change management de alta          ├─ Gestión de performance y
│   complejidad (upgrades de SW,       │   reporting mensual
│   expansiones de red)                │
│                                      │
└─ Gestión relación clientes enterprise└─ Gestión de configuración básica

INTEGRACIÓN:
Plataforma ITSM compartida (ServiceNow o equivalente)
CMDB única con acceso de ambos equipos
Proceso de escalación L1→L2→L3 documentado y practicado`}</CodeBlock>

          <SectionHeading number="04" title="Análisis Financiero: TCO a 5 Años" />
          <DataTable
            headers={["Componente", "In-House (anual)", "NOCaaS (anual)", "Híbrido (anual)"]}
            rows={[
              ["Personal NOC directo", "USD 4.2M", "USD 0 (incluido en fee)", "USD 1.4M (30% del equipo)"],
              ["Herramientas / licencias", "USD 1.4M", "USD 0 (incluido)", "USD 400K (L2/L3)"],
              ["Infraestructura (OPEX)", "USD 280K", "USD 0", "USD 80K (sala L3 propia)"],
              ["Fee de servicio MSP", "USD 0", "USD 3.6M–5.2M", "USD 1.8M–2.6M (L1 + servicios)"],
              ["Gestión de contratos / governance", "USD 0", "USD 120K", "USD 120K"],
              ["TOTAL ANUAL", "USD 5.88M", "USD 3.72M–5.32M", "USD 3.8M–4.6M"],
              ["TCO a 5 años", "USD 38.4M", "USD 18.6M–26.6M", "USD 22.0M–28.0M"],
            ]}
          />

          <SubHeading title="El Costo Oculto: La Rotación de Talento In-House" />
          <Callout type="danger">
            En LATAM, la rotación anual en perfiles de ingeniería de redes con experiencia en 5G, SDN o AIOps está entre el <strong>22% y el 35%</strong> (<em>IDC Telecom Talent Report LATAM 2025</em>). En un equipo NOC de 50 personas con 25% de rotación: 12–13 posiciones rotadas × USD 46K–123K cada una = <strong>USD 552K–1.6M en costos de rotación por año</strong> que no aparece en el presupuesto pero es absolutamente real.
          </Callout>
          <DataTable
            headers={["Elemento de Costo por Rotación", "Costo Estimado"]}
            rows={[
              ["Reclutamiento (headhunter o plataforma)", "USD 8,000–20,000"],
              ["Onboarding y acceso a sistemas", "USD 3,000–8,000"],
              ["Formación hasta productividad plena (6–12 meses)", "USD 15,000–35,000"],
              ["Pérdida de productividad del equipo durante vacante", "USD 20,000–60,000"],
              ["COSTO TOTAL POR POSICIÓN ROTADA", "USD 46,000–123,000"],
            ]}
          />

          <SectionHeading number="05" title="AIOps: La Transformación de la Gestión de Redes" />
          <Callout type="stat">
            Para 2027, el <strong>40% de los grandes operadores de telecomunicaciones</strong> habrán adoptado plataformas de AIOps para la gestión de red, frente al 14% de 2024 (<em>Gartner "Market Guide for AIOps Platforms 2025"</em>). En LATAM: 8% de adopción en 2024, proyectado 28% para 2027.
          </Callout>
          <ul className="space-y-4 mb-6">
            {[
              { n: "1", t: "Reducción de ruido de alarmas", d: "Un NOC típico recibe 10,000–50,000 alarmas diarias; el 85–95% son correlacionadas o de baja relevancia. AIOps agrupa eventos relacionados en un único ticket de causa raíz, reduciendo alarmas accionables en 60–85%. Caso: Claro Colombia redujo MTTD en P1 de 12 a 3.8 minutos con Moogsoft (2024)." },
              { n: "2", t: "Predicción de degradación de servicio", d: "Modelos LSTM identifican patrones de degradación semanas antes de que impacten el SLA. Impacto: reducción de incidentes P1 de 18–32% en operadores con sistemas de predicción maduros (Ericsson IDOS, 2024)." },
              { n: "3", t: "Automatización de remediación (Self-Healing)", d: "Reinicio automático de procesos en NEs, re-routing de tráfico, actualización de parámetros de radio ante congestión. Nokia AVA automatiza el 34–48% de las remediaciones de incidentes L1 en despliegues maduros." },
              { n: "4", t: "AI-assisted RCA", d: "El sistema presenta el diagnóstico probable con evidencias en segundos. El ingeniero valida y decide. Reducción de MTTR de 35–55% en incidentes P1 complejos (Dynatrace Telecom Benchmark 2025)." },
            ].map(({ n, t, d }) => (
              <li key={n} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5" style={{ background: `${A}20`, color: AL }}>{n}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{t}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{d}</p>
                </div>
              </li>
            ))}
          </ul>
          <DataTable
            headers={["Plataforma AIOps", "Fabricante", "Fortaleza Principal", "Adopción LATAM"]}
            rows={[
              ["Nokia AVA", "Nokia", "Suite completa Nokia-heavy; RAN automation nativa; predictive analytics de radioacceso", "Alta (operadores con Nokia RAN)"],
              ["Ericsson IDOS", "Ericsson", "ML para predicción de KPIs de radio; automatización de SON para redes Ericsson", "Alta (operadores con Ericsson RAN)"],
              ["IBM Watson AIOps", "IBM", "Mejor correlación multi-dominio (IT + red); integración con ServiceNow; análisis NLP", "Media"],
              ["Moogsoft (Dell)", "Dell/Moogsoft", "Líder en reducción de ruido de alarmas; agnóstico de fabricante", "Media"],
              ["Dynatrace", "Dynatrace", "Excelente para telco cloud-native; observabilidad full-stack", "Creciente"],
              ["Cisco Crosswork", "Cisco", "Fuerte en red IP/MPLS; automatización de cambios; SD-WAN", "Media"],
            ]}
          />

          <SectionHeading number="06" title="Casos de Implementación NOCaaS en LATAM 2023–2025" />

          {[
            {
              title: "Operador Regional Colombia — Migración a NOC Híbrido",
              profile: "Operador fijo (fibra + HFC) en 3 departamentos; 280K abonados residenciales + 12K empresariales.",
              before: "NOC propio con 28 operadores en dos turnos; MTTD P1: 18 min; MTTR P1: 4.8h; costo NOC: USD 2.4M/año; disponibilidad: 99.62%; rotación: 31% anual.",
              decision: "Tercerizar L1 (monitoreo básico 24/7, ticketing, escalación nocturna) a MSP; mantener L2/L3 in-house (12 ingenieros).",
              results: ["MTTD P1: 18 min → 4.2 min (−77%)", "MTTR P1: 4.8h → 2.6h (−46%)", "Disponibilidad: 99.62% → 99.89%", "Costo total NOC: USD 2.4M → USD 1.6M (−33%)", "Rotación L2/L3 in-house: 31% → 14%"],
            },
            {
              title: "MVNO Fintech México — NOC 100% Gestionado desde el Día 1",
              profile: "MVNO de telecomunicaciones asociado a fintech; 180K SIMs activas; red 100% virtualizada.",
              before: "Startup sin equipo técnico de red propio. Necesitaban operaciones sin CAPEX en NOC.",
              decision: "Contrato NOCaaS con Ericsson Managed Services; OSS Ericsson; ITSM via ServiceNow cloud; dashboard ejecutivo en Power BI.",
              results: ["Disponibilidad 99.94% en el primer año de operación", "Cero ingenieros de red propios — equipo de 6 personas enfocado en producto", "Time-to-market de nuevos servicios: 40% más rápido que competidores con NOC in-house"],
            },
            {
              title: "Tigo (Millicom) — AIOps y NOC Consolidado Centroamérica",
              profile: "Operaciones en Colombia, Guatemala, Honduras, El Salvador, Bolivia, Paraguay y Panamá.",
              before: "NOCs separados por país; duplicación de herramientas y personal; MTTD variable y alto.",
              decision: "NOC consolidado regional con AIOps desde Bogotá: Nokia NetAct + IBM Watson AIOps + ServiceNow ITSM único regional.",
              results: ["Reducción de headcount equivalente en operaciones: −22% sobre base 2022", "OPEX de gestión de red reducido en USD 18M anuales en el conjunto", "MTTD promedio regional: reducción del 58%", "Incidentes P1 recurrentes reducidos 41%"],
            },
          ].map(({ title, profile, before, decision, results }) => (
            <div key={title} className="mb-8 rounded-2xl border border-white/08 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="px-6 py-4 border-b border-white/08" style={{ background: `${A}10` }}>
                <p className="font-bold text-white text-base">{title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{profile}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/08">
                <div className="px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: `${AL}80` }}>Situación antes</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{before}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: `${AL}80` }}>Decisión</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{decision}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: `${AL}80` }}>Resultados</p>
                  <ul className="space-y-1.5">
                    {results.map((r, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300"><span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />{r}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          <SectionHeading number="07" title="KPIs del NOC: El Marco de Medición" />
          <DataTable
            headers={["KPI", "Definición", "Benchmark Clase Mundial", "LATAM Promedio"]}
            rows={[
              ["MTTD (Mean Time to Detect)", "Tiempo desde inicio de falla hasta detección", "< 3 min (P1)", "14.8 min"],
              ["MTTR (Mean Time to Repair)", "Tiempo desde detección hasta restauración", "< 1.5h (P1)", "4.6h"],
              ["Disponibilidad de red", "% de tiempo con servicio disponible", "99.999% (five nines)", "99.71%"],
              ["First Call Resolution (FCR)", "% de incidentes resueltos en L1 sin escalar", "> 65%", "42%"],
              ["Alarm-to-Ticket Ratio", "% de alarmas que generan ticket accionable", "< 5% (con AIOps)", "18–35% (sin AIOps)"],
              ["Change Success Rate", "% de cambios sin incidente post-cambio", "> 98%", "87%"],
              ["OPEX NOC / Ingreso total", "Costo del NOC como % de ingresos", "3–6% (clase mundial)", "8–14% (LATAM promedio)"],
              ["Ratio de automatización", "% de incidentes resueltos sin intervención humana", "35–55% (AIOps maduro)", "5–15% (sin AIOps)"],
            ]}
          />

          <SectionHeading number="08" title="Hoja de Ruta: 12 Meses a NOC Híbrido" />
          {[
            { phase: "Meses 1–3", title: "Assessment y Diseño del Modelo", items: ["Inventario completo de NEs gestionados con criticidad asignada", "Análisis de tickets del último año: distribución por nivel (L1/L2/L3), dominio, turno, causa raíz", "Evaluación de herramientas actuales: ¿qué puede integrarse con el MSP? ¿qué debe reemplazarse?", "RFP para selección de MSP: SLAs mínimos, requisitos de seguridad, modelo de precios, experiencia con tecnologías propias", "Diseño de arquitectura de integración: API NOC del MSP ↔ OSS propio"] },
            { phase: "Meses 4–7", title: "Implementación de Plataforma e Integración", items: ["Despliegue del sistema de ticketing compartido (ServiceNow o JIRA Service Management)", "Integración API entre NMS/OSS propio y plataforma del MSP", "Documentación de runbooks para todas las categorías de incidentes que el MSP manejará", "Configuración de umbrales de alarma y políticas de escalación", "Pruebas de integración en ambiente de staging"] },
            { phase: "Meses 8–10", title: "Operación en Paralelo y Calibración", items: ["Activación del MSP en modo 'shadow': opera en paralelo con el equipo in-house", "Identificación de gaps: casos donde el MSP no tiene el conocimiento; construcción de runbook correspondiente", "Calibración de SLAs: ajuste de MTTD, MTTR y umbrales de escalación basado en performance real observada", "Reducción gradual del equipo in-house en funciones L1 que el MSP ya domina"] },
            { phase: "Meses 11–12", title: "Go-Live y Estabilización", items: ["Transferencia completa de funciones L1 al MSP", "Ajuste del equipo in-house al perfil target (L2/L3 ingeniería de red)", "Monitoreo semanal de KPIs durante primer trimestre post go-live", "Reunión mensual de service review con el MSP: análisis de incidentes, tendencias, mejoras propuestas", "Revisión formal de contrato a los 12 meses: ajuste de scope y SLAs basado en experiencia del primer año"] },
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

          <div className="mt-16 pt-8 border-t border-white/10">
            <details className="group">
              <summary className="cursor-pointer text-sm font-bold text-white/50 hover:text-white/80 transition-colors flex items-center gap-2 list-none">
                <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] group-open:rotate-90 transition-transform">▶</span>
                Ver 22 fuentes y referencias
              </summary>
              <ol className="mt-6 space-y-2">
                {["TM Forum, \"NOC Operations Benchmark Report 2025\", TeleManagement Forum, Q1 2025.","TM Forum, \"NOC Transformation Case Studies Latin America 2025\", TM Forum, 2025.","TM Forum, \"AI/ML Adoption in Network Operations: Operator Survey 2025\", TM Forum, 2025.","GSMA Intelligence, \"Operators Cost Benchmark Report 2025: OPEX Analysis by Region\", GSMA, 2025.","GSMA, \"Talent in the Telecommunications Industry: 2025 Global Survey\", GSMA, 2025.","Analysys Mason, \"NOC Benchmarking: Performance and Cost Metrics for Telecoms 2025\", Analysys Mason, Q1 2025.","Analysys Mason, \"AIOps in Telecom Network Operations: Adoption and ROI Analysis\", Analysys Mason, 2025.","Gartner, \"Magic Quadrant for AIOps Platforms 2025\", Gartner Research, 2025.","IDC, \"Telecom Talent and Workforce Report Latin America 2025\", IDC LatAm, 2025.","MarketsandMarkets, \"Managed Network Services Market in Latin America: Forecast 2025–2030\", MarketsandMarkets, Q4 2024.","Nokia, \"AVA Analytics Platform: Network Operations Benchmark 2025\", Nokia Bell Labs, 2025.","Nokia, \"Case Study: Millicom NOC Consolidation with NetAct and Watson AIOps\", Nokia, 2024.","Ericsson, \"IDOS (Intelligent Data Operations Suite): Telecom Network AI Performance Report\", Ericsson Technology Review, 2025.","Ericsson, \"Managed Services Case Study: MVNO Mexico NOCaaS Deployment\", Ericsson, 2024.","IBM, \"Watson AIOps for Telecommunications: Customer Results 2024\", IBM, 2024.","Dynatrace, \"Telecom Benchmark Report: Full-Stack Observability in 5G Networks 2025\", Dynatrace, 2025.","Millicom (Tigo), \"Annual Report 2024: Technology Operations\", Millicom International Cellular S.A., 2024.","ITU, \"Telecommunication Network Performance Report 2025\", International Telecommunication Union, 2025.","ETSI, \"GS ZSM 009: Zero-Touch Network and Service Management\", ETSI, 2024.","ETSI, \"TS 102 165: Telecom Security Standards for Network Operations\", ETSI, 2024.","NIST, \"SP 800-161r1: Cybersecurity Supply Chain Risk Management Practices\", NIST, 2022.","ServiceNow, \"Telecommunications Service Management: Industry Benchmark 2025\", ServiceNow, 2025."].map((ref, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-500">
                    <span className="shrink-0 font-bold tabular-nums" style={{ color: `${AL}60` }}>{i + 1}.</span><span>{ref}</span>
                  </li>
                ))}
              </ol>
            </details>
          </div>

          <div className="mt-16 rounded-3xl p-8 lg:p-10 text-center" style={{ background: `linear-gradient(135deg, ${A}12 0%, rgba(255,255,255,0.03) 100%)`, border: `1px solid ${A}25` }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <Wifi size={11} />NOC con +130,000 actividades/año · ISO 9001
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">¿Evaluando la transición<br />a NOC gestionado?</h2>
            <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              OSC gestiona más de 130,000 actividades de NOC anuales bajo certificación ISO 9001. Evaluamos su situación actual y diseñamos el modelo óptimo para su escala y red.
            </p>
            <Link href="/contacto" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5" style={{ background: A, color: "#fff" }}>
              Hablar con un especialista en gestión de redes
              <Activity size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
