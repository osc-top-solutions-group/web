import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, BookOpen, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Shield, Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Centros de Mando C4/C5 para Seguridad Ciudadana — Whitepaper 2025–2026 | OSC",
  description:
    "Arquitectura tecnológica y casos de implementación de centros de comando C4/C5 para ciudades medianas y grandes de América Latina: 7 capas tecnológicas, modelos por tamaño de ciudad, casos CDMX/Medellín/Bogotá, factores de éxito y roadmap de 18 meses.",
  keywords: [
    "centros de mando C4 C5 seguridad ciudadana LATAM",
    "videovigilancia analítica AI ciudad inteligente",
    "CAD despacho emergencias América Latina",
    "LTE privado misión crítica policía",
    "smart city seguridad pública LATAM",
    "OSC Top Solutions gobierno",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/centros-mando-c4c5-seguridad-ciudadana` },
  openGraph: {
    title: "Centros de Mando C4/C5 para Seguridad Ciudadana",
    description:
      "Arquitectura C4/C5, 7 capas tecnológicas, casos CDMX/Medellín/Bogotá y roadmap de 18 meses para ciudades LATAM.",
    type: "article",
    url: `${SITE_URL}/guias/centros-mando-c4c5-seguridad-ciudadana`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Centros de Mando C4/C5 para Seguridad Ciudadana — Whitepaper Técnico 2025–2026",
  description: "Arquitectura tecnológica y casos de implementación de centros de comando integrados para ciudades medianas y grandes en América Latina.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01", dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/centros-mando-c4c5-seguridad-ciudadana`,
  inLanguage: "es-419",
};

const A = "#6366F1";
const AL = "#818CF8";

function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle, bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", color: "#F59E0B", label: "Alerta de implementación" },
    info:    { icon: Info,          bg: "rgba(99,102,241,0.07)", border: "rgba(99,102,241,0.22)", color: AL,       label: "Nota técnica" },
    success: { icon: CheckCircle2,  bg: "rgba(99,102,241,0.07)", border: "rgba(99,102,241,0.22)", color: AL,       label: "Caso validado" },
    stat:    { icon: TrendingUp,    bg: "rgba(255,0,87,0.07)",   border: "rgba(255,0,87,0.22)",   color: "#FF0057",label: "Dato crítico 2025" },
    danger:  { icon: AlertTriangle, bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.28)",  color: "#EF4444",label: "Brecha documentada" },
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
      <pre className="p-5 text-[11px] leading-relaxed text-indigo-300/80 font-mono overflow-x-auto" style={{ background: "rgba(0,0,0,0.40)" }}>{children}</pre>
    </div>
  );
}

function CaseCard({ city, title, highlights, result }: { city: string; title: string; highlights: string[]; result: string }) {
  return (
    <div className="my-6 rounded-2xl border overflow-hidden" style={{ borderColor: `${A}30`, background: `${A}06` }}>
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: `${A}20` }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${A}20` }}>
          <Shield size={14} style={{ color: AL }} />
        </div>
        <div>
          <p className="font-bold text-white text-sm">{title}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: AL }}>{city}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/08">
        <div className="px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: `${AL}80` }}>Características clave</p>
          <ul className="space-y-1.5">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />{h}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 py-4 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: `${AL}80` }}>Impacto documentado</p>
          <p className="text-sm text-slate-300 leading-relaxed">{result}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhitepaperC4C5() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="min-h-screen" style={{ background: "#080F1E" }}>

        {/* HERO */}
        <div className="relative overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full" style={{ background: `radial-gradient(ellipse at top right, ${A}12 0%, transparent 60%)`, transform: "translate(20%,-20%)" }} />
            <div className="absolute inset-0 grid-bg opacity-[0.04]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6">
            <nav className="flex items-center gap-1.5 text-white/30 text-xs mb-10">
              <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <Link href="/industrias/gobierno" className="hover:text-white/60 transition-colors">Gobierno</Link>
              <ChevronRight size={12} />
              <span style={{ color: AL }}>Whitepaper</span>
            </nav>
            <Link href="/industrias/gobierno" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: `${AL}80` }}>
              <ArrowLeft size={14} /><span>Volver a Gobierno</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <BookOpen size={11} />Whitepaper Técnico · 2025–2026
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Centros de Mando<br /><span style={{ color: AL }}>C4/C5 para Seguridad Ciudadana</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
              Arquitectura tecnológica y modelos de implementación para centros de comando integrados en ciudades medianas y grandes de América Latina. Con casos verificados: CDMX, Medellín y Bogotá.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Clock size={13} />12 min de lectura</span>
              <span className="flex items-center gap-1.5"><BookOpen size={13} />24 páginas</span>
              <span className="flex items-center gap-1.5"><Shield size={13} />Seguridad Pública</span>
              <span>24 fuentes verificadas</span>
            </div>
          </div>
        </div>

        {/* KPI STRIP */}
        <div className="border-y border-white/08" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "14%", l: "Ciudades > 500K hab. con C4/C5 operativo en LATAM", ctx: "vs 78% en OCDE" },
              { v: "18.4m", l: "Tiempo promedio de respuesta a emergencia (urbano)", ctx: "vs 6.8 min en OCDE" },
              { v: "24%", l: "Tasa de resolución de homicidios en LATAM", ctx: "vs 67% en Europa Occidental" },
              { v: "−43%", l: "Reducción en tiempo de respuesta con C5 maduro", ctx: "vs línea base pre-implementación" },
            ].map(({ v, l, ctx }) => (
              <div key={v}>
                <p className="text-3xl font-black text-white tabular-nums">{v}</p>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{l}</p>
                <p className="text-[10px] font-bold mt-1.5" style={{ color: AL }}>{ctx}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="max-w-4xl mx-auto px-6 py-16">

          <SectionHeading number="01" title="Abstract: La Infraestructura Más Transformadora de la Seguridad Pública" />
          <p className="text-slate-300 leading-relaxed mb-4">
            La inseguridad ciudadana es la principal preocupación de los latinoamericanos: el <strong>71% declara sentirse inseguro</strong> en su ciudad, y el 38% reportó haber sido víctima directa de un delito en los últimos 12 meses (<em>Latinobarómetro 2024</em>). América Latina concentra el 8% de la población mundial pero el <strong>33% de los homicidios globales</strong> (<em>UNODC 2024</em>).
          </p>
          <Callout type="success">
            Las ciudades que han implementado C4/C5 maduros documentan reducciones en tasas de delito entre el <strong>18% y el 43%</strong> en los primeros tres años de operación, tiempos de respuesta reducidos en 35–55%, y tasas de resolución de casos incrementadas en <strong>22–38%</strong> (<em>BID Seguridad Ciudadana y Tecnología 2025; IACP Technology Best Practices 2025</em>).
          </Callout>

          <SubHeading title="Déficit de Infraestructura de Seguridad en LATAM 2025" />
          <DataTable
            headers={["Indicador", "LATAM Promedio", "Referente Internacional", "Brecha"]}
            rows={[
              ["Cámaras de videovigilancia / 1,000 hab.", "1.4", "8.2 (UE promedio)", "−83%"],
              ["Ciudades con C4/C5 operativo y maduro", "14% (> 500K hab.)", "78% (OCDE)", "−64 pp"],
              ["Tiempo promedio respuesta a emergencia", "18.4 min", "6.8 min (OCDE)", "+11.6 min"],
              ["Tasa de resolución de homicidios", "24%", "67% (Europa Occidental)", "−43 pp"],
              ["Inversión en tecnología de seguridad / PIB", "0.08%", "0.31% (OCDE)", "−75%"],
              ["Ciudades con plataforma analítica predictiva", "6%", "44% (OCDE)", "−38 pp"],
              ["Integración sistemas emergencia (112/911) + CCTV", "19%", "89% (OCDE)", "−70 pp"],
            ]}
          />

          <SectionHeading number="02" title="Taxonomía: De la Sala de Radio al Centro de Inteligencia" />
          <DataTable
            headers={["Generación", "Componentes", "Capacidades", "Estado en LATAM 2025"]}
            rows={[
              ["C2 — Comando y Control", "Radio + despacho manual", "Coordinación básica de unidades en campo", "Ciudades pequeñas sin modernización"],
              ["C3 — + Comunicaciones", "C2 + Red digital (P25/TETRA/LTE)", "Comunicación de voz digital; registro de eventos", "Transición activa en muchas ciudades"],
              ["C4 — + Cómputo", "C3 + CCTV + software de gestión", "Videovigilancia; despacho asistido; BD de eventos", "14% de ciudades > 500K con C4 maduro"],
              ["C5 — + Colaboración + inteligencia", "C4 + analítica + integración interagencial", "Predicción de delitos; fusión datos multi-agencia", "< 5% de ciudades LATAM"],
              ["C6 — + Comunidad + IoT", "C5 + canales ciudadanos + IoT urbano", "Participación ciudadana; sensores IoT urbanos", "Emergente; Smart Dubai, Singapur, Barcelona"],
            ]}
          />

          <SubHeading title="Flujo Operativo del C5 en Respuesta a un Incidente" />
          <CodeBlock label="c5 — flujo-respuesta-incidente">{`DETECCIÓN (t=0)
├─ Alerta automática de CCTV (analytics detecta riña)
├─ Llamada ciudadana al 123/911 (CAD integrado)
├─ Sensor IoT (disparo de arma detectado por ShotSpotter)
└─ Reporte de unidad en campo (radio LTE/MCPTT)
         ↓
VALIDACIÓN (t= 0–90 seg)
├─ Operador valida en pantalla de CCTV: incidente confirmado
├─ CAD genera ID de incidente; categoriza tipo y prioridad
├─ GIS muestra unidades disponibles en radio de 2 km
└─ Verificación de antecedentes automática
         ↓
DESPACHO (t= 90 seg – 3 min)
├─ Sistema recomienda unidad óptima (distancia + tiempo estimado)
├─ Dispatcher confirma y despacha via radio LTE/MCPTT
├─ Patrulla recibe misión en terminal MDT (pantalla en patrulla)
└─ Routing GPS en tiempo real hacia la escena
         ↓
RESPUESTA EN ESCENA (t= 3–18 min según ciudad)
├─ Operador C5 monitorea desde CCTV la llegada de unidades
├─ Unidades adicionales si evolución lo requiere
├─ Transmisión de video en tiempo real desde bodycam a C5
└─ Coordinación interagencial si escala (ambulancia, bomberos)
         ↓
GESTIÓN POST-INCIDENTE
├─ Registro automático de toda la secuencia en CAD
├─ Video preservado automáticamente como evidencia
├─ Análisis de tiempo de respuesta y calidad de despacho
└─ Retroalimentación al modelo predictivo (actualiza patrones)`}</CodeBlock>

          <SectionHeading number="03" title="Arquitectura Tecnológica: Las Siete Capas del C4/C5" />

          <SubHeading title="Capa 1 — Infraestructura de Comunicaciones" />
          <DataTable
            headers={["Tecnología", "Función", "Estándar", "Cobertura Requerida"]}
            rows={[
              ["LTE Privado / MCPTT", "Voz y datos de misión crítica para policía, bomberos, emergencias", "3GPP TS 23.179 Release 14/15", "99.5% área urbana + 100% C5 y hospitales"],
              ["Radio LMR (TETRA o P25)", "Interoperabilidad con sistemas legacy y agencias existentes", "ETSI EN 300 392 (TETRA); TIA-102 (P25)", "Zonas críticas + interoperabilidad federal"],
              ["Fibra óptica (backbone)", "Transporte de video CCTV, datos, interconexión de sites", "ITU-T G.652D / G.657A", "Todos los nodos del sistema"],
              ["MPLS / SD-WAN", "WAN segura entre C5, subestaciones, juzgados, hospitales", "RFC 3031 + estándares SD-WAN", "Toda la red gubernamental de seguridad"],
              ["Radio VHF/UHF (backup)", "Comunicaciones de emergencia ante falla de red digital", "ITU Radio Regulations", "Alcance urbano completo como failsafe"],
            ]}
          />

          <SubHeading title="Capa 2 — Videovigilancia Inteligente: CCTV + Analytics" />
          <DataTable
            headers={["Especificación", "Cámara Vigilancia Estándar", "PTZ Premium", "Cámara LPR/ANPR"]}
            rows={[
              ["Resolución", "4MP mínimo (2K); recom. 8MP (4K)", "4K + zoom óptico 32× mínimo", "2MP/5MP con procesador ANPR integrado"],
              ["Visión nocturna", "IR 40–60 m; recom. starlight color", "Starlight color + IR 150 m", "LED infrarrojo + luz blanca pulsada"],
              ["Almacenamiento", "30 días mínimo; 90 días nodos críticos", "60 días", "180 días (requerimiento judicial LATAM)"],
              ["Cifrado", "AES-256 tránsito + at rest", "AES-256", "AES-256 + firma digital de evidencia"],
              ["Resistencia", "IP66; IK10 (vandalismo)", "IP67; IK10", "IP67; IK10; calefactor en zonas frías"],
            ]}
          />

          <p className="text-slate-300 leading-relaxed mt-4 mb-4">
            <strong>Video Analytics: capacidades críticas para seguridad ciudadana:</strong>
          </p>
          <DataTable
            headers={["Función Analytics", "Descripción", "Tasa de Detección", "Aplicación Operativa"]}
            rows={[
              ["Detección de intrusión / merodeo", "Alerta ante persona en zona restringida o merodeo", "94–97%", "Alertas en zonas de alta criminalidad nocturna"],
              ["Detección de pelea / violencia", "Detección de movimientos bruscos, posiciones de combate", "88–93%", "Despacho preventivo antes de escalada"],
              ["LPR (License Plate Recognition)", "Lectura de matrícula vs. BD (robados, órdenes de captura)", "98.4%", "Intercepción de vehículos vinculados a delitos"],
              ["Reconocimiento facial", "Identificación contra BD de prófugos (con marco legal habilitante)", "94.2% FAR < 0.01%", "Solo con marco legal; bajo protocolo estricto"],
              ["Detección de abandono de objetos", "Alerta ante objeto abandonado > tiempo definido", "91%", "Prevención de artefactos explosivos"],
              ["Conteo y densidad de multitudes", "Estimación RT de aforo en espacios públicos", "±8% error > 1,000 personas", "Gestión de eventos masivos; prevención de estampidas"],
            ]}
          />

          <SubHeading title="Capa 3 — CAD y GIS Operacional" />
          <p className="text-slate-300 leading-relaxed mb-4">
            El CAD es el sistema de información central del C4/C5. Capacidades mínimas para un C5 moderno:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Ingesta multicanal: Llamadas 911/123 (CTI integrado), WhatsApp Business API gubernamental, app ciudadana, reportes de unidades en campo, alertas automáticas de CCTV analytics, sensores IoT.",
              "GIS en tiempo real: Posición GPS de todas las unidades actualizada cada 30 segundos. Routing dinámico con tráfico en tiempo real.",
              "Despacho recomendado por AI: El sistema sugiere la unidad óptima considerando distancia, tiempo estimado de llegada, especialización y carga de trabajo actual.",
              "Evidencia digital: Captura automática de video de cámaras más cercanas al incidente; preservación bajo cadena de custodia digital.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />{item}
              </li>
            ))}
          </ul>

          <SubHeading title="Capa 4 — Ecosistema de Datos Interoperables del C5" />
          <CodeBlock label="c5 — ecosistema-datos">{`Fuentes de Datos Policiales:          Sistemas de Justicia:
├─ CAD (incidentes en tiempo real)    ├─ SIJIN / SIJOT (investigación criminal)
├─ RMS (gestión de registros)         ├─ RNEC / RENIEC (registro civil)
├─ AFIS (huellas dactilares)          ├─ RUNT / Registro de vehículos
├─ Órdenes de captura activas         └─ Juzgados (órdenes judiciales activas)
├─ Base de datos de vehículos robados
└─ Bases de personas buscadas         Servicios de Emergencia:
                                      ├─ Bomberos (CAD interoperable)
Inteligencia de Ciudad:               ├─ Ambulancias / SAMU
├─ Cámaras CCTV en tiempo real        └─ Defensa Civil
├─ Sensores acústicos de disparos
├─ LPR en vías principales            Fuentes Abiertas (OSINT):
├─ Semáforos inteligentes (tráfico)   ├─ Redes sociales monitoreadas
└─ Datos de movilidad celular          └─ Medios de comunicación digitales
   (agregados, anonimizados)`}</CodeBlock>

          <SubHeading title="Capa 5 — Analítica Predictiva e Inteligencia Criminal" />
          <Callout type="warning">
            <strong>Predicción de personas (PredPol):</strong> Alto riesgo de sesgo algorítmico, discriminación y violación de derechos. Regulado o prohibido en varios países de la UE. En LATAM, sin marco legal claro. <strong>Recomendación: no implementar sin legislación específica de protección de datos y supervisión judicial.</strong>
          </Callout>
          <DataTable
            headers={["Herramienta", "Función", "Impacto Documentado"]}
            rows={[
              ["Análisis de redes criminales (SNA)", "Mapeo de vínculos entre individuos, organizaciones y eventos", "Identificación de líderes; reducción tiempo de investigación 45%"],
              ["Crime mapping y hot spot analysis", "Visualización geoespacial de patrones delictuales", "Priorización de patrullaje aumenta efectividad 18–32%"],
              ["Análisis de llamadas al 911/123", "Patrones de llamadas repetidas (violencia doméstica, puntos de venta)", "Intervención proactiva en hogares de alta repetición"],
              ["Reconocimiento de patrones de robo", "ML que vincula series de robos por MO, zona y horario", "Vinculación de casos seriales; faster clearance rate"],
            ]}
          />

          <SectionHeading number="04" title="Modelos de Implementación según Tamaño de Ciudad" />
          {[
            {
              tier: "Ciudad Pequeña / Municipio", size: "50K–300K habitantes",
              items: ["20–80 cámaras en hot spots identificados + accesos principales", "CAD básico integrado con despacho de policía municipal; SaaS viable a este nivel", "Upgrade de radio analógico a DMR digital mínimo; LTE comercial con APN privado", "Centro de monitoreo de 2–4 puestos en alcaldía o cuartel; sin edificio dedicado"],
              funding: "BID (Ciudades Emergentes y Sostenibles); CAF (Gobernanza Urbana); transferencias del gobierno nacional.",
            },
            {
              tier: "Ciudad Mediana", size: "300K–1.5M habitantes",
              items: ["150–600 cámaras con analytics en 30–40% de nodos críticos; LPR en accesos principales", "C4 completo: CAD integrado con CCTV, GIS operacional, comunicaciones LTE Privada o TETRA", "Centro de mando dedicado (500–1,500 m²); 12–24 posiciones; video wall 16–24 pantallas", "Crime mapping y hot spot analysis; inicio de analítica predictiva de lugares (place-based)", "Interoperabilidad básica con policía nacional/departamental, bomberos, emergencias"],
              funding: "BID préstamo soberano; recursos propios del municipio; PPP con proveedor tecnológico.",
            },
            {
              tier: "Gran Ciudad / Área Metropolitana", size: "> 1.5M habitantes",
              items: ["1,000–10,000+ cámaras (Bogotá > 5,500; CDMX > 22,000; São Paulo > 30,000)", "C5 pleno con analítica predictiva, fusión de datos multi-agencia, sala de crisis de máxima capacidad", "Red de comunicaciones propia: LTE Privada de cobertura metropolitana o TETRA municipal", "Centro principal + 4–8 centros distritales interconectados con capacidad de operación autónoma", "Integración con servicios urbanos: semáforos, transporte público, utilities → hacia C6"],
              funding: "BID/CAF préstamo soberano; PPP BOOT; fondo de seguridad nacional; recursos propios.",
            },
          ].map(({ tier, size, items, funding }) => (
            <div key={tier} className="mb-8 rounded-2xl border border-white/08 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="px-6 py-4 border-b border-white/08" style={{ background: `${A}10` }}>
                <p className="font-bold text-white text-base">{tier}</p>
                <p className="text-xs text-slate-400 mt-0.5">{size}</p>
              </div>
              <div className="px-6 py-5">
                <ul className="space-y-2 mb-4">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />{item}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-slate-500"><span className="font-bold" style={{ color: `${AL}80` }}>Financiamiento:</span> {funding}</p>
              </div>
            </div>
          ))}

          <SectionHeading number="05" title="Casos de Implementación: Referentes LATAM 2023–2025" />

          <CaseCard
            city="Ciudad de México — C5 CDMX (el más grande de LATAM)"
            title="C5 Ciudad de México: 22,000+ cámaras, 15,000+ sensores"
            highlights={[
              "22,000+ cámaras de videovigilancia integradas (Metro + SSC)",
              "Red de radio TETRA de cobertura metropolitana para policía y emergencias",
              "CAD integrado con SSPC, Bomberos CDMX, ERUM y Protección Civil",
              "Analytics de video con LPR en 400+ nodos viales",
              "15,000+ sensores: botones de pánico, sísmicos, alertas de incendio",
            ]}
            result="Tiempo de respuesta policial en zonas con cámaras: 7.8 min vs. 14.2 min sin cobertura. 847,000 incidentes viales resueltos (2024). 1,840 capturas via LPR en 2024."
          />

          <CaseCard
            city="Medellín — CIES (Centro de Información Estratégica de Seguridad)"
            title="CIES Medellín: el modelo más avanzado en ciudades medianas"
            highlights={[
              "Integración única de policía, secretaría, fiscalía y medicina legal en un piso operativo",
              "Plataforma de análisis de redes criminales con datos integrados multi-agencia",
              "Sistema de alertas tempranas para violencia homicida basado en indicadores de deterioro social",
              "Programa de intervenciones focalizadas: trabajo social + educación + oportunidades despachados ANTES de que escale la violencia",
            ]}
            result="Medellín pasó de 381 homicidios/100K hab. en 1991 a 18.9 en 2024 — reducción del 95%. El CIES (desde 2012) es un componente relevante de esta transformación multifactorial."
          />

          <CaseCard
            city="Bogotá — NUSE 123"
            title="NUSE 123 Bogotá: la plataforma de coordinación más madura de Colombia"
            highlights={[
              "5,500+ cámaras integradas; 450+ analistas y operadores 24/7",
              "CAD con GIS RT; tiempo promedio de atención de llamada: 12 segundos",
              "Integración con 11 entidades: Policía, Bomberos, CRUE, Defensa Civil, Secretaría de Movilidad, Transmilenio y más",
              "Proyecto LTE Privada Nokia: primera red de misión crítica integrada de Colombia; primera fase operativa Q1 2026",
            ]}
            result="Primera fase de LTE Privada Nokia iniciada Q3 2024. Referente regional para integración multi-agencia en grandes ciudades latinoamericanas."
          />

          <SectionHeading number="06" title="Cinco Factores Críticos de Éxito (y Causas de Fracaso)" />
          <Callout type="danger">
            El <strong>64% de los proyectos de C4/C5 en LATAM que fracasan</strong> lo hacen por razones de gobernanza, no tecnológicas (<em>BID Evaluación de Proyectos de Seguridad Ciudadana 2025</em>).
          </Callout>
          <ul className="space-y-5 mb-6">
            {[
              { n: "1", t: "Gobernanza antes que tecnología", d: "Sin claridad sobre quién manda el sistema, qué agencias coordinan y cómo se procesan los datos, la tecnología más avanzada genera conflictos interinstitucionales. El modelo de gobernanza debe definirse antes del primer servidor." },
              { n: "2", t: "Sostenibilidad operativa desde el diseño", d: "El OPEX es típicamente 15–25% del CAPEX por año. Un proyecto sin OPEX comprometido en el presupuesto plurianual antes de inaugurarse estará abandonado en 3–4 años. Referencia negativa: proyectos con 40–70% de cámaras inoperativas por falta de mantenimiento 2–3 años post-implementación en Colombia, Ecuador y Perú." },
              { n: "3", t: "Capital humano especializado", d: "Un C5 requiere operadores entrenados en despacho de emergencias, analistas de inteligencia criminal, técnicos de video y especialistas en ciberseguridad. En LATAM, la escasez de estos perfiles es crítica. Los proyectos sin plan de formación y retención de talento colapsan operativamente." },
              { n: "4", t: "Marco legal de privacidad y derechos", d: "El uso de videovigilancia y analytics sin marco legal claro genera impugnaciones judiciales, controversias políticas y, en el peor de los casos, abuso institucional. Los mejores proyectos incluyen un consejo de ética/derechos que revisa los protocolos antes de la implementación." },
              { n: "5", t: "Integración con modelo policial", d: "La tecnología amplifica el modelo policial existente — tanto sus fortalezas como sus debilidades. Un C5 sobre un modelo policial reactivo sin confianza ciudadana producirá mejoras limitadas. El C5 más efectivo se integra con estrategia policial de proximidad y prevención." },
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

          <SectionHeading number="07" title="Marco de Derechos Humanos para Tecnología de Vigilancia" />
          <p className="text-slate-300 leading-relaxed mb-4">
            Principios de referencia OHCHR "Surveillance and Privacy" Framework 2023:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              { t: "Legalidad", d: "Toda capacidad de vigilancia debe tener base en ley explícita que defina sus alcances, limitaciones y control." },
              { t: "Necesidad y proporcionalidad", d: "La tecnología de vigilancia solo puede usarse cuando sea necesaria para lograr un objetivo legítimo y cuando sea proporcional a ese objetivo." },
              { t: "No discriminación", d: "Los sistemas no pueden diseñarse ni operar de manera que generen impactos desproporcionados sobre grupos étnicos, religiosos, políticos o socioeconómicos." },
              { t: "Supervisión independiente", d: "Debe existir un mecanismo de supervisión externo al ejecutivo (judicial, legislativo o ciudadano) con capacidad real de revisión." },
              { t: "Transparencia", d: "Los ciudadanos deben conocer la existencia de sistemas de vigilancia, su alcance general y los mecanismos de protección disponibles." },
            ].map(({ t, d }) => (
              <li key={t} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />
                <div><span className="text-white font-semibold text-sm">{t}: </span><span className="text-slate-400 text-sm">{d}</span></div>
              </li>
            ))}
          </ul>

          <SectionHeading number="08" title="Roadmap: 18 Meses a C4 Operativo" />
          {[
            { phase: "Meses 1–3", title: "Diagnóstico y Diseño", items: ["Diagnóstico de seguridad: análisis de criminalidad geoespacial (3 años mínimo); hot spots; patrones temporales", "Diagnóstico institucional: capacidades de comunicaciones, sistemas existentes, personal, presupuesto comprometido", "Diseño técnico completo: posicionamiento de cámaras basado en análisis de criminalidad; diseño de red de comunicaciones", "Marco de gobernanza: acuerdo interinstitucional; protocolo de acceso y uso de datos; marco ético de videovigilancia", "Structuración del modelo de financiamiento e inicio de procesos de licitación"] },
            { phase: "Meses 4–9", title: "Infraestructura Base", items: ["Obras civiles: Centro de mando o adecuación de espacio existente", "Despliegue de infraestructura de comunicaciones (LTE o TETRA): torres, antenas, core", "Instalación de fibra óptica backbone entre C5, subestaciones y nodos de cámaras", "Instalación de cámaras en primera fase (hot spots prioritarios: 40–50% del total)", "Despliegue de CAD y plataforma VMS (Video Management System)"] },
            { phase: "Meses 10–14", title: "Integración y Operación Piloto", items: ["Integración CAD-CCTV-GIS: despacho ve las cámaras más cercanas al incidente automáticamente", "Integración con agencias de emergencia: bomberos, ambulancias, defensa civil", "Operación piloto en zona piloto: validación operativa antes del go-live total", "Capacitación intensiva de operadores y supervisores", "Calibración de analytics de video con condiciones locales (iluminación, demografía)"] },
            { phase: "Meses 15–18", title: "Go-Live y Estabilización", items: ["Go-live progresivo: comunicaciones + CCTV → CAD → analytics", "NOC activo 24/7 para monitoreo de salud del sistema", "KPI tracking semanal primeros 90 días: disponibilidad cámaras, tiempo de respuesta, satisfacción operadores", "Comunicación pública: informar a ciudadanos sobre el sistema y las salvaguardas de derechos", "Evaluación de impacto a 6 meses: comparación vs. línea base de criminalidad"] },
          ].map(({ phase, title, items }) => (
            <div key={phase} className="mb-4 rounded-2xl border overflow-hidden" style={{ borderColor: `${A}30`, background: `${A}06` }}>
              <div className="flex items-center gap-4 px-5 py-4 border-b" style={{ borderColor: `${A}20` }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: AL }}>{phase}</p>
                <p className="font-bold text-white text-sm">{title}</p>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Referencias */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <details className="group">
              <summary className="cursor-pointer text-sm font-bold text-white/50 hover:text-white/80 transition-colors flex items-center gap-2 list-none">
                <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] group-open:rotate-90 transition-transform">▶</span>
                Ver 24 fuentes y referencias
              </summary>
              <ol className="mt-6 space-y-2">
                {[
                  "UNODC, \"Global Study on Homicide 2024\", United Nations Office on Drugs and Crime, 2024.",
                  "Latinobarómetro, \"Informe 2024: Percepción de Inseguridad en América Latina\", Corporación Latinobarómetro, 2024.",
                  "BID, \"Seguridad Ciudadana y Tecnología: Evaluación de Proyectos en América Latina 2025\", BID, Q1 2025.",
                  "BID, \"Centros de Comando para Seguridad Ciudadana: Marco de Referencia Técnico 2025\", BID, 2025.",
                  "BID, \"Ciudades Emergentes y Sostenibles: Programa de Financiamiento de Seguridad Urbana 2025\", BID, 2025.",
                  "IACP, \"Technology Best Practices for Law Enforcement Agencies 2025\", IACP Technology Committee, 2025.",
                  "IACP, \"Emergency Response Time Benchmarks: International Comparison 2025\", IACP Research, 2025.",
                  "OHCHR, \"The Right to Privacy in the Digital Age: Guiding Principles on Surveillance Technologies\", UN Human Rights Office, 2023.",
                  "Motorola Solutions, \"Video Security Analytics Performance and Accuracy Report 2025\", 2025.",
                  "Milestone Systems, \"Video Analytics Accuracy Study: Smart City Deployments 2025\", 2025.",
                  "NENA, \"i3 Standard for Next Generation Emergency Services\", NENA, actualización 2024.",
                  "Hexagon Safety & Infrastructure, \"CAD System Requirements for Modern Emergency Communications Centers\", 2025.",
                  "Secretaría de Seguridad Ciudadana CDMX, \"Informe de Gestión C5 Ciudad de México 2024\", SSC CDMX, enero 2025.",
                  "UNAM Instituto de Geografía, \"Evaluación de Impacto del C5 en la Criminalidad de Ciudad de México\", UNAM, 2024.",
                  "Alcaldía de Medellín, \"Anuario Estadístico de Medellín 2024\", Alcaldía de Medellín, 2025.",
                  "InSight Crime, \"Medellín Security Model: Analysis of Factors in Violence Reduction\", 2024.",
                  "Secretaría Distrital de Seguridad de Bogotá, \"Informe de Gestión NUSE 123, 2024\", Alcaldía Mayor de Bogotá, 2025.",
                  "APCO International, \"Communications Center Resiliency and Continuity Guide 2025\", APCO, 2025.",
                  "CISA, \"Securing Emergency Communications Centers: Cybersecurity Best Practices\", CISA, 2024.",
                  "Lum, C. et al., \"The Effectiveness of Predictive Policing: A Systematic Review\", American Journal of Criminal Justice, Vol. 49(1), 2024.",
                  "Chainey, S. & Ratcliffe, J., \"GIS and Crime Mapping\", 4th Edition, Wiley-Blackwell, 2024.",
                  "AMERIPOL, \"Marco de Intercambio de Información para la Cooperación Policial en América\", AMERIPOL, 2025.",
                  "Access Now, \"Facial Recognition Technology in Latin America: Legal Landscape and Human Rights Risks 2025\", Access Now, 2025.",
                  "ICCL, \"Urban Surveillance Technology Index 2025\", ICCL, 2025.",
                ].map((ref, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-500">
                    <span className="shrink-0 font-bold tabular-nums" style={{ color: `${AL}60` }}>{i + 1}.</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ol>
            </details>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl p-8 lg:p-10 text-center" style={{ background: `linear-gradient(135deg, ${A}12 0%, rgba(255,255,255,0.03) 100%)`, border: `1px solid ${A}25` }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <Shield size={11} />Especialistas en Centros de Mando
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">¿Planifica un C4/C5<br />para su ciudad?</h2>
            <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Nuestro equipo ha implementado sistemas de seguridad ciudadana en toda América Latina. Evaluamos su contexto, dimensionamos la inversión y diseñamos la arquitectura correcta para su ciudad.
            </p>
            <Link href="/contacto" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5" style={{ background: A, color: "#fff" }}>
              Hablar con un especialista en seguridad ciudadana
              <Activity size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
