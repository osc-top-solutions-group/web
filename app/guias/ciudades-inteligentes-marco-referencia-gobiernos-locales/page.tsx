import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, FileText, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Building2, Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ciudades Inteligentes: Marco de Referencia para Gobiernos Locales — Guía 2025–2026 | OSC",
  description:
    "Framework de priorización de ciudad inteligente para gobiernos locales LATAM: 10 tecnologías con mayor ROI, estrategia de conectividad urbana, gobernanza de datos, fuentes de financiamiento BID/CAF y hoja de ruta de 18 meses con casos documentados en Medellín, Guadalajara y Montevideo.",
  keywords: [
    "ciudades inteligentes smart city LATAM",
    "framework gobierno local ciudad inteligente",
    "alumbrado LED inteligente municipio ROI",
    "gestión inteligente tránsito semáforos adaptativos",
    "IoT ambiental calidad aire ciudad",
    "OSC Top Solutions gobierno",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/ciudades-inteligentes-marco-referencia-gobiernos-locales` },
  openGraph: {
    title: "Ciudades Inteligentes: Marco de Referencia para Gobiernos Locales",
    description: "10 tecnologías de mayor ROI, financiamiento BID/CAF y hoja de ruta de 18 meses para ciudades LATAM.",
    type: "article",
    url: `${SITE_URL}/guias/ciudades-inteligentes-marco-referencia-gobiernos-locales`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Ciudades Inteligentes: Marco de Referencia para Gobiernos Locales — Edición 2025–2026",
  description: "Metodología para evaluar, priorizar e implementar tecnología de ciudad inteligente con enfoque en ROI, sostenibilidad y capacidad fiscal.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01", dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/ciudades-inteligentes-marco-referencia-gobiernos-locales`,
  inLanguage: "es-419",
};

const A = "#10B981";
const AL = "#34D399";

function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle, bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", color: "#F59E0B", label: "Alerta de implementación" },
    info:    { icon: Info,          bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.22)", color: AL,       label: "Nota metodológica" },
    success: { icon: CheckCircle2,  bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.22)", color: AL,       label: "Caso validado" },
    stat:    { icon: TrendingUp,    bg: "rgba(255,0,87,0.07)",   border: "rgba(255,0,87,0.22)",   color: "#FF0057",label: "Dato crítico 2025" },
    danger:  { icon: AlertTriangle, bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.28)",  color: "#EF4444",label: "Causa de fracaso" },
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
      <pre className="p-5 text-[11px] leading-relaxed text-emerald-300/80 font-mono overflow-x-auto" style={{ background: "rgba(0,0,0,0.40)" }}>{children}</pre>
    </div>
  );
}

export default function GuiaCiudadesInteligentes() {
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
              <span style={{ color: AL }}>Guía Técnica</span>
            </nav>
            <Link href="/industrias/gobierno" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: `${AL}80` }}>
              <ArrowLeft size={14} /><span>Volver a Gobierno</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <FileText size={11} />Guía Técnica · Implementación 2025–2026
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Ciudades Inteligentes:<br /><span style={{ color: AL }}>Marco de Referencia para Gobiernos Locales</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
              Framework de priorización e implementación de tecnología urbana con foco en ROI ciudadano, sostenibilidad fiscal y capacidad de gestión. Para ciudades LATAM que quieren resultados medibles, no pilotos tecnológicos costosos.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Clock size={13} />8 min de lectura</span>
              <span className="flex items-center gap-1.5"><FileText size={13} />16 páginas</span>
              <span className="flex items-center gap-1.5"><Building2 size={13} />Sector Gobierno & Smart City</span>
              <span>25 fuentes verificadas</span>
            </div>
          </div>
        </div>

        {/* KPI STRIP */}
        <div className="border-y border-white/08" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "57%", l: "De proyectos Smart City LATAM 2018–2023 que no alcanzaron objetivos", ctx: "BID Lecciones Aprendidas 2025" },
              { v: "82%", l: "De la población latinoamericana vive en ciudades", ctx: "ONU-Hábitat 2025; proyección 88% para 2040" },
              { v: "10–30%", l: "Mejora en índice de calidad de vida urbana con smart city bien ejecutado", ctx: "McKinsey Global Institute 2025" },
              { v: "40–60%", l: "Ahorro en costos de iluminación pública con LED + telegestión", ctx: "Casos documentados LATAM 2024" },
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

          <SectionHeading number="01" title="Resumen Ejecutivo: Un Método de Gobierno, No un Destino Tecnológico" />
          <p className="text-slate-300 leading-relaxed mb-4">
            Esta guía adopta una postura diferente: <strong>la ciudad inteligente no es un destino tecnológico — es un método de gobierno basado en datos, conectividad y participación ciudadana orientado a mejorar la calidad de vida de manera medible y sostenible</strong>. Desde esta premisa, el framework prioriza el ROI ciudadano (impacto en calidad de vida), la sostenibilidad fiscal (tecnología que la ciudad puede pagar y mantener) y la capacidad de gestión (tecnología que el equipo del gobierno local puede operar efectivamente).
          </p>
          <Callout type="danger">
            <strong>Por qué fracasan el 57% de los proyectos Smart City en LATAM:</strong> 34% parten de la tecnología disponible, no del problema ciudadano que se quiere resolver. 28% no tienen presupuesto para operar el sistema (OPEX sin comprometer). 22% no tienen el equipo técnico para gestionar la solución. 11% no definieron métricas de impacto antes de comenzar.
          </Callout>

          <SectionHeading number="02" title="Framework de Priorización: Empezar por el Problema" />
          <SubHeading title="Los Siete Dominios de Calidad de Vida Urbana" />
          <DataTable
            headers={["Dominio", "Indicadores Clave", "Potencial Tecnológico"]}
            rows={[
              ["Seguridad ciudadana", "Tasa de homicidios; tasa de hurtos; percepción de inseguridad", "MUY ALTO — tecnología probada"],
              ["Movilidad y transporte", "Tiempo de desplazamiento; frecuencia/puntualidad TP; accidentes viales", "MUY ALTO — alta madurez tecnológica"],
              ["Servicios públicos", "Continuidad de agua potable; gestión de residuos; cortes eléctricos", "ALTO — soluciones probadas"],
              ["Salud pública", "Tiempos en urgencias; cobertura de vacunación; enfermedades prevalentes", "MEDIO-ALTO — potencial grande, mayor complejidad"],
              ["Medio ambiente", "Calidad del aire (PM2.5, PM10); calidad del agua; isla de calor urbana", "ALTO — IoT ambiental de bajo costo"],
              ["Trámites y servicios al ciudadano", "Tiempo de respuesta a peticiones; % trámites digitalizados; satisfacción", "ALTO — digitalización de gobierno"],
              ["Participación ciudadana", "Nivel de participación en decisiones; confianza en instituciones", "MEDIO — potencial de impacto en legitimidad"],
            ]}
          />

          <SubHeading title="El Test de Priorización: Tres Preguntas Antes de Comprometer Inversión" />
          <ul className="space-y-4 mb-6">
            {[
              { n: "1", q: "¿Cuál es el problema ciudadano específico que resuelve esta tecnología, y cómo lo mediremos?", d: 'Si la respuesta es vaga ("mejorar la seguridad") en lugar de específica ("reducir el tiempo de respuesta policial en 8 minutos promedio en el sector Centro-Histórico"), el proyecto no tiene suficiente claridad para ser evaluado.' },
              { n: "2", q: "¿Tenemos el presupuesto para operar esto durante 5 años, no solo para comprarlo?", d: "Regla práctica: el OPEX anual de soluciones de ciudad inteligente es 15–30% del CAPEX. Un proyecto de USD 10M requiere USD 1.5M–3M/año para funcionar. Sin ese presupuesto comprometido en el plan plurianual, el proyecto será un elefante blanco en 3–4 años." },
              { n: "3", q: "¿Tenemos el equipo que necesita esta tecnología para operar?", d: "Cada componente requiere perfiles técnicos específicos: analistas de datos, administradores de sistemas de video, técnicos de IoT, operadores de CAD, especialistas en ciberseguridad. La escasez de estos perfiles en el sector público latinoamericano es estructural." },
            ].map(({ n, q, d }) => (
              <li key={n} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5" style={{ background: `${A}20`, color: AL }}>{n}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{q}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{d}</p>
                </div>
              </li>
            ))}
          </ul>

          <SectionHeading number="03" title="Las Diez Tecnologías de Mayor Impacto en Ciudades LATAM 2025–2030" />
          <DataTable
            headers={["#", "Tecnología", "Impacto QV", "Viabilidad Fiscal", "ROI Típico", "Plazo de Beneficio"]}
            rows={[
              ["1", "Alumbrado público LED + sensores", "★★★★★", "★★★★★", "250–400% en 8 años", "12–18 meses"],
              ["2", "Gestión inteligente de tránsito (semáforos adaptativos + CCTV vial)", "★★★★★", "★★★★☆", "180–350% en 5 años", "18–24 meses"],
              ["3", "Plataforma de gobierno digital (trámites online + datos abiertos)", "★★★★☆", "★★★★★", "200–450% en 5 años", "6–12 meses"],
              ["4", "Monitoreo de calidad de aire y agua (IoT ambiental)", "★★★★☆", "★★★★★", "150–280% en 7 años", "12–24 meses"],
              ["5", "Gestión inteligente de residuos (sensores llenado + rutas óptimas)", "★★★★☆", "★★★★☆", "160–300% en 5 años", "18–30 meses"],
              ["6", "Centro de mando C4/C5 (seguridad ciudadana)", "★★★★★", "★★★☆☆", "140–280% en 7 años", "24–36 meses"],
              ["7", "Red de conectividad pública (Wi-Fi en espacios + fibra backbone)", "★★★★☆", "★★★☆☆", "Alto valor social (difícil monetizar directamente)", "36–60 meses"],
              ["8", "Sistema de transporte público inteligente (GPS + App + validación electrónica)", "★★★★★", "★★★☆☆", "150–320% en 8 años", "24–48 meses"],
              ["9", "Plataforma de gestión de emergencias (SIGE integrado)", "★★★★★", "★★★☆☆", "Alto valor en vidas salvadas", "18–36 meses"],
              ["10", "Gemelo digital de ciudad (City Digital Twin)", "★★★☆☆", "★★☆☆☆", "Alto potencial a largo plazo; alto costo", "48–84 meses"],
            ]}
          />

          <SubHeading title="Tecnología #1 — Alumbrado Público LED Inteligente" />
          <p className="text-slate-300 leading-relaxed mb-4">
            El alumbrado público es la mayor partida de consumo energético en presupuestos municipales latinoamericanos (<strong>15–35% del gasto en energía del gobierno local</strong>). La migración a LED reduce el consumo entre 50–75%; la adición de telegestión añade otro 15–20% de ahorro.
          </p>
          <DataTable
            headers={["Ciudad", "Antes", "Después (3 años)", "Ahorro Anual", "Payback"]}
            rows={[
              ["Medellín (2022–2024)", "114,000 luminarias sodio", "85% LED + telegestión", "USD 8.4M/año", "4.2 años"],
              ["Guadalajara, México (2021–2023)", "170,000 luminarias mercurio/sodio", "100% LED", "USD 12.1M/año", "3.8 años"],
              ["Montevideo, Uruguay (2020–2023)", "60,000 luminarias", "LED + sensores IoT", "USD 3.2M/año", "5.1 años"],
              ["Lima (Miraflores, 2023)", "18,000 luminarias", "LED inteligente", "USD 1.1M/año", "3.4 años"],
            ]}
          />

          <SubHeading title="Tecnología #2 — Gestión Inteligente del Tránsito" />
          <p className="text-slate-300 leading-relaxed mb-4">
            El tiempo promedio de desplazamiento en ciudades latinoamericanas es el mayor del mundo entre economías emergentes: <strong>48.3 minutos</strong> para ciudades {`>`} 500K habitantes (<em>TomTom Traffic Index 2025</em>). Bogotá, São Paulo y Ciudad de México están consistentemente entre las 10 ciudades más congestionadas del planeta.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Semáforos adaptativos: algoritmos de optimización en tiempo real (SCOOT, SCATS, OpenTrafficLab). Impacto: −15–25% tiempo de viaje; −8–12% emisiones CO₂.",
              "Centro de Gestión de Movilidad (CGM): video wall con CCTV vial + datos de semáforos + TP; coordinación de incidentes viales en tiempo real.",
              "ATMS con paneles de mensaje variable (PMV): información de tiempo de viaje, alertas de incidentes, velocidad variable. Integración con Waze/Google Maps via API.",
              "LPR vial: control de vehículos con restricción de circulación (pico y placa), detección de vehículos robados, estadísticas de movilidad anonimizadas.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />{item}
              </li>
            ))}
          </ul>

          <SubHeading title="Tecnología #4 — IoT Ambiental: Calidad de Aire y Agua" />
          <DataTable
            headers={["Parámetro", "Sensor", "Costo por Nodo", "Uso Operativo"]}
            rows={[
              ["PM2.5 / PM10", "Sensor óptico láser (Sensirion SPS30)", "USD 200–800/nodo", "Alertas RT; mapa público; cierre de escuelas en episodios críticos"],
              ["NO₂", "Sensor electroquímico (Alphasense NO2-B43F)", "USD 400–1,200/nodo", "Correlación con tráfico; zonas de baja emisión"],
              ["CO (monóxido de carbono)", "Sensor electroquímico", "USD 200–600/nodo", "Zonas de alto tráfico; túneles; garajes"],
              ["Ruido (dB)", "Sonómetro IoT", "USD 300–900/nodo", "Mapa de ruido urbano; cumplimiento de normativa"],
              ["Temperatura y humedad", "Sensor digital (SHT31)", "USD 50–150/nodo", "Mapa de isla de calor; gestión de eventos de calor extremo"],
            ]}
          />
          <Callout type="info">
            <strong>Densidad de red recomendada:</strong> 1 nodo por cada 2–4 km² en zonas urbanas densas; 1 nodo por km² en zonas industriales. <strong>Red mínima para ciudad de 500K hab.: 40–80 nodos</strong> (Recomendación OMS de red de monitoreo comunitario 2022).
          </Callout>

          <SectionHeading number="04" title="Conectividad: La Infraestructura Habilitadora de Todo lo Demás" />
          <CodeBlock label="conectividad-urbana — arquitectura por capas">{`CAPA DE BACKHAUL (Backbone urbano)
├─ Fibra óptica subterránea en corredores principales
│  (10/40 Gbps; propiedad municipal o IRU de largo plazo)
└─ Microondas punto-a-punto como redundancia en nodos críticos

CAPA DE DISTRIBUCIÓN (Acceso a infraestructura)
├─ Fibra hasta gabinetes de calle (FTTC)
│  Alimenta semáforos, cámaras, sensores IoT, kioscos
└─ LTE/5G privado para infraestructura móvil (policía, transporte)

CAPA DE ACCESO CIUDADANO
├─ Wi-Fi público en plazas, parques y transporte público
│  (IEEE 802.11ax / Wi-Fi 6; acceso gratuito o tarifa mínima)
├─ NB-IoT (Narrowband IoT) para sensores de bajo costo
│  Alumbrado, residuos, ambiente, agua
└─ LoRaWAN como alternativa open para sensores sin SLA crítico`}</CodeBlock>

          <SubHeading title="El Modelo de Fibra Municipal: ¿Construir o Arrendar?" />
          <DataTable
            headers={["Modelo", "Descripción", "Recomendado Para"]}
            rows={[
              ["A — Red propia", "Municipio construye y opera. Control total, menor costo a largo plazo (10–20 años), activo municipal. Alto CAPEX (USD 50K–250K/km).", "Ciudades > 500K hab. con presupuesto y capacidad técnica interna"],
              ["B — IRU (Indefeasible Right of Use)", "Derecho de uso exclusivo de fibra existente por 15–25 años. Menor CAPEX, sin responsabilidad de mantenimiento pasivo.", "Cuando ya existe infraestructura de operadores privados en los corredores necesarios"],
              ["C — Contrato de servicio", "El operador provee conectividad; el municipio paga mensualmente. Mínimo CAPEX; máximo OPEX; menor control.", "Solo para etapas piloto o ciudades pequeñas sin capacidad de gestión de infraestructura"],
            ]}
          />

          <SectionHeading number="05" title="Gobernanza de Datos: El Activo Más Valioso de la Ciudad Inteligente" />
          <p className="text-slate-300 leading-relaxed mb-4">
            Una ciudad inteligente de 1 millón de habitantes con instrumentación básica genera entre <strong>500 GB y 5 TB de datos operativos por día</strong>. Este volumen es un activo estratégico — pero solo si existe la infraestructura analítica y la gobernanza para transformarlo en inteligencia accionable.
          </p>
          <CodeBlock label="city-data-platform — arquitectura">{`FUENTES DE DATOS (Producción)
├─ IoT urbano (sensores, CCTV, semáforos, residuos)
├─ Sistemas de gestión (CAD, TOS transporte, catastro, ERP municipal)
├─ Plataformas ciudadanas (app, PQRS, portal de trámites)
└─ Datos externos (opendata nacional, NWP clima, datos OSINT)

CAPA DE INGESTA Y PROCESAMIENTO
├─ Data Lake: Apache HDFS o equivalente cloud
├─ Stream processing (RT): Apache Kafka + Spark Streaming
└─ Batch processing (histórico): Apache Spark / Hive

CAPA ANALÍTICA
├─ BI: Tableau, Power BI, Metabase (open source)
├─ ML: Python (scikit-learn, Prophet); Azure ML; AWS SageMaker
└─ GIS analítico: Esri ArcGIS Enterprise o QGIS + PostGIS (open source)

CAPA DE CONSUMO
├─ Dashboard ejecutivo (alcaldía y secretarías)
├─ Plataforma de datos abiertos (ciudadanos y academia)
├─ API para aplicaciones de terceros (startups cívicas)
└─ Reportes regulatorios (gobierno nacional, multilaterales)`}</CodeBlock>

          <SubHeading title="Marco Legal de Protección de Datos Urbanos por País" />
          <DataTable
            headers={["País", "Ley de Protección de Datos", "Aplicabilidad a Smart City"]}
            rows={[
              ["Colombia", "Ley 1581/2012; Decreto 1377/2013; CONPES 3920/2018", "Alta aplicabilidad; datos biométricos con protección especial; CONPES 3975 Política Nacional de IA"],
              ["Brasil", "LGPD (Lei Geral de Proteção de Dados, 2020)", "Marco más robusto de LATAM; ANPD activa; Guía ANPD para smart cities en desarrollo"],
              ["Chile", "Ley 19.628 + Proyecto de Ley de Datos Personales (aprobado 2024)", "Marco actualizado en 2024; Política Nacional de IA 2021"],
              ["México", "LFPDPPP (sector privado); LFTAIPG (sector público)", "Dos marcos separados; coordinación compleja; Ley Federal de IA en consulta"],
              ["Perú", "Ley 29733 + DS 003-2013", "Marco básico; sin regulación específica de IA/Smart City; DU 007-2020"],
            ]}
          />

          <SectionHeading number="06" title="Financiamiento: Cómo Pagar la Ciudad Inteligente" />
          <DataTable
            headers={["Fuente", "Tipo", "Monto Típico", "Adecuado Para"]}
            rows={[
              ["BID (FOMIN / préstamos soberanos)", "Préstamo soberano al gobierno nacional", "USD 10M–500M", "Proyectos grandes; ciudades con apoyo del gobierno nacional"],
              ["CAF (Banco de Desarrollo de AL)", "Préstamo a municipio o gobierno subnacional", "USD 5M–200M", "Ciudades intermedias con capacidad fiscal; proyectos integrados"],
              ["KfW (Alemania) / AFD (Francia) / JICA", "Crédito bilateral con cooperación técnica", "USD 10M–100M", "Proyectos con componente de sostenibilidad / cambio climático"],
              ["Fondo Verde para el Clima (GCF)", "Donación / préstamo concesional", "USD 5M–500M", "Proyectos con reducción documentable de GEI"],
              ["Recursos propios municipales", "Presupuesto de la ciudad", "Variable", "Proyectos pequeños; co-financiamiento; OPEX"],
              ["PPP con privado", "Concesión / BOOT / Build & Operate", "Variable", "Alumbrado, transporte, residuos con flujo de ingresos"],
            ]}
          />

          <SubHeading title="Caso Ilustrativo: Plan Ciudad Inteligente a 5 años — USD 45M (500K hab.)" />
          <DataTable
            headers={["Componente", "CAPEX (USD M)", "Financiamiento Recomendado", "OPEX Anual (USD M)"]}
            rows={[
              ["Alumbrado LED inteligente (ciudad completa)", "12M", "PPP o crédito CAF (se paga con ahorro energético)", "−3.2M (ahorro neto)"],
              ["Sistema de gestión de tránsito", "8M", "Crédito BID; co-financiamiento municipal", "0.8M"],
              ["Plataforma de gobierno digital", "3M", "Recursos propios + cooperación técnica", "0.4M"],
              ["Centro de mando C4", "14M", "Crédito soberano BID / CAF", "1.8M"],
              ["Red IoT ambiental y de servicios", "2M", "Recursos propios; BID pequeños proyectos", "0.2M"],
              ["Gestión inteligente de residuos", "4M", "PPP con empresa de recolección o crédito", "0.3M"],
              ["Plataforma de datos y gobernanza", "2M", "Cooperación técnica + recursos propios", "0.4M"],
              ["TOTAL", "45M", "Mix", "2.7M neto (ahorro LED compensa parcialmente)"],
            ]}
          />

          <SectionHeading number="07" title="KPIs: Cómo Medir el Éxito de la Ciudad Inteligente" />
          <DataTable
            headers={["Dominio", "KPI Primario", "Línea Base LATAM", "Target Año 3"]}
            rows={[
              ["Seguridad", "Tasa de homicidios (c/100K hab.) / Tiempo respuesta policial", "28.4 / 18.4 min", "−20% / −35%"],
              ["Movilidad", "Tiempo promedio de desplazamiento (min)", "48.3 min", "−18%"],
              ["Eficiencia energética", "Consumo energético alumbrado (MWh/año)", "Línea base local", "−50%"],
              ["Ambiente", "Días con PM2.5 > límite OMS (anuales)", "Línea base local", "−15%"],
              ["Gobierno digital", "% trámites digitalizados / NPS ciudadano", "21% / 32 NPS", "+60% / +25 NPS"],
              ["Residuos", "Costo de recolección (USD/tonelada)", "Línea base local", "−25%"],
              ["Calidad de vida", "Índice de Progreso Social (IPS)", "Línea base local", "+8 puntos"],
            ]}
          />
          <Callout type="info">
            <strong>City Dashboard público:</strong> Un dashboard ciudadano que muestre el estado de los servicios urbanos en tiempo real genera confianza ciudadana, crea presión institucional para mantener el sistema operativo y atrae inversión privada. Referencias: Dashboard Público de Medellín (datamed.net); Open Data Santiago (datos.gob.cl); Data Rio (data.rio).
          </Callout>

          <SectionHeading number="08" title="Hoja de Ruta: Los Primeros 18 Meses" />
          {[
            { phase: "Meses 1–3", title: "Diagnóstico y Estrategia", items: ["Diagnóstico de calidad de vida: encuesta ciudadana mínimo 2,000 casos; análisis de datos de todas las secretarías; benchmarking con ciudades comparables", "Auditoría de capacidades institucionales: TI existente, talento técnico disponible, presupuesto plurianual confirmado", "Plan Estratégico de Ciudad Inteligente: documento público aprobado por el concejo, con visión, 5–7 objetivos medibles, 10–15 proyectos priorizados y roadmap de 5 años", "Creación de la Unidad de Ciudad Inteligente: designación de la unidad técnica responsable"] },
            { phase: "Meses 4–9", title: "Proyectos de Alto Impacto y Rápido Retorno (payback < 24 meses)", items: ["Alumbrado LED en corredores prioritarios (primero donde el impacto sea más visible para ciudadanos)", "Digitalización de los 5–10 trámites más demandados (licencias, pagos, permisos)", "App ciudadana con reporte de problemas: lanzamiento con marketing ciudadano activo", "Red mínima de sensores de calidad del aire: 20–30 nodos en zonas críticas"] },
            { phase: "Meses 10–18", title: "Infraestructura de Plataforma", items: ["Backbone de fibra óptica en corredores principales", "Despliegue de primera fase de semáforos adaptativos en corredores de mayor congestión", "Plataforma de datos urbanos: data lake + dashboard básico con KPIs públicos", "Primeras licitaciones de proyectos de mediano y largo plazo (C4/C5, transporte inteligente)"] },
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
                Ver 25 fuentes y referencias
              </summary>
              <ol className="mt-6 space-y-2">
                {[
                  "ONU-Hábitat, \"World Cities Report 2024: Cities as Agents of Change\", UN-Habitat, 2024.",
                  "McKinsey Global Institute, \"Smart Cities: Digital Solutions for a More Livable Future\", actualización 2025, McKinsey, enero 2025.",
                  "BID, \"Ciudades Inteligentes en América Latina: Lecciones Aprendidas 2018–2024\", BID, Q1 2025.",
                  "BID, \"Índice de Ciudades Prósperas: Latinoamérica y el Caribe 2025\", BID, 2025.",
                  "BID, \"Infraestructura de Telecomunicaciones para Smart Cities en América Latina\", BID Tech, 2025.",
                  "OCDE, \"Smart Cities and Inclusive Growth: Building on Evidence and Partnerships 2025\", OECD Publishing, 2025.",
                  "OCDE, \"Digital Government Review: Latin America and the Caribbean 2025\", OECD Publishing, 2025.",
                  "OCDE, \"Data Governance in Smart Cities: Principles and Practices\", OECD Digital Government Studies, 2025.",
                  "CEPAL, \"Gobierno Digital en América Latina y el Caribe: Avances y Perspectivas 2025\", CEPAL, Q1 2025.",
                  "CEPAL, \"Protección de Datos Personales en América Latina y el Caribe 2025\", CEPAL, 2025.",
                  "TomTom, \"TomTom Traffic Index 2025: Global City Congestion Report\", TomTom, enero 2025.",
                  "OMS/WHO, \"WHO Global Air Quality Guidelines 2021\", World Health Organization, 2021 (vigentes).",
                  "GSMA Intelligence, \"Municipal 5G and Connectivity Strategies: Urban Use Cases 2025\", GSMA, 2025.",
                  "ITU, \"Smart Cities Infrastructure Guide: Connectivity and Data Platforms\", ITU, 2024.",
                  "NACTO, \"Urban Street Design Guide: Smart Infrastructure 2025\", NACTO, 2025.",
                  "APTA, \"Smart Transportation Technologies Impact Study 2025\", APTA, 2025.",
                  "Alcaldía de Medellín, \"Informe EPM Alumbrado Público: Resultados de la Modernización LED 2024\", 2025.",
                  "SENER México, \"Reporte de Eficiencia Energética Municipal 2024\", Secretaría de Energía de México, 2024.",
                  "Sensoneo, \"Smart Waste Management Results Report 2025: ROI and Operational Impact\", Sensoneo, 2025.",
                  "Access Now, \"Privacy and Smart City Technologies in Latin America 2025\", Access Now, 2025.",
                  "CONPES 3920, \"Política Nacional de Explotación de Datos (Big Data)\", DNP Colombia, 2018.",
                  "ANPD Brasil, \"Guia Orientativo de Proteção de Dados para Cidades Inteligentes\", en elaboración 2025.",
                  "Sensirion AG, \"SPS30 Particulate Matter Sensor Technical Specifications\", Sensirion, 2025.",
                  "Open Data Institute, \"Open Data in Local Government: A Practical Guide 2025\", ODI, 2025.",
                  "ITU-T, \"Focus Group on Smart Sustainable Cities: KPIs for Smart Sustainable Cities\", ITU, actualización 2024.",
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
              <Building2 size={11} />Especialistas en Ciudad Inteligente
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">¿Empezando la estrategia<br />de ciudad inteligente?</h2>
            <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Nuestro equipo puede acompañarle desde el diagnóstico de capacidades hasta la implementación de las primeras tecnologías de alto impacto y rápido retorno.
            </p>
            <Link href="/contacto" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5" style={{ background: A, color: "#fff" }}>
              Hablar con un especialista en ciudad inteligente
              <Activity size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
