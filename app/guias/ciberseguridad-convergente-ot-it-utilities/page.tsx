import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, FileText, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Shield, Cpu, Activity, BarChart2, Lock, Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ciberseguridad Convergente OT/IT para Utilities Eléctricas — Guía 2025–2026 | OSC",
  description:
    "Framework técnico completo: Zero Trust para SCADA/ICS, arquitectura IEC 62443, 10 vulnerabilidades críticas en utilities eléctricas LATAM, hoja de ruta de 90 días y cumplimiento regulatorio (Colombia, Brasil, Chile, Perú).",
  keywords: [
    "ciberseguridad OT IT utilities eléctricas",
    "Zero Trust SCADA ICS LATAM",
    "IEC 62443 sector eléctrico",
    "vulnerabilidades SCADA distribuidoras",
    "seguridad infraestructura crítica eléctrica",
    "OSC Top Solutions",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/ciberseguridad-convergente-ot-it-utilities` },
  openGraph: {
    title: "Ciberseguridad Convergente OT/IT para Utilities Eléctricas",
    description:
      "Zero Trust en entornos SCADA/ICS, IEC 62443, 10 vulnerabilidades críticas y hoja de ruta de implementación en 90 días.",
    type: "article",
    url: `${SITE_URL}/guias/ciberseguridad-convergente-ot-it-utilities`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Ciberseguridad Convergente OT/IT para Utilities Eléctricas — Guía de Implementación 2025–2026",
  description: "Framework técnico para implementar arquitecturas Zero Trust en entornos SCADA/ICS de distribución eléctrica sin interrumpir el suministro.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01", dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/ciberseguridad-convergente-ot-it-utilities`,
  inLanguage: "es-419",
  keywords: "ciberseguridad OT IT, Zero Trust SCADA, IEC 62443, utilities eléctricas, infraestructura crítica LATAM",
};

/* ── Accent ─────────────────────── */
const A = "#0D9488";
const AL = "#14B8A6";

/* ── Micro-components ───────────── */
function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle,  bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  color: "#F59E0B", label: "Alerta de implementación" },
    info:    { icon: Info,           bg: "rgba(59,130,246,0.07)",  border: "rgba(59,130,246,0.22)",  color: "#60A5FA", label: "Nota técnica" },
    success: { icon: CheckCircle2,   bg: "rgba(13,148,136,0.07)",  border: "rgba(13,148,136,0.22)",  color: AL,        label: "Benchmark validado" },
    stat:    { icon: TrendingUp,     bg: "rgba(255,0,87,0.07)",    border: "rgba(255,0,87,0.22)",    color: "#FF0057", label: "Dato crítico 2025" },
    danger:  { icon: AlertTriangle,  bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.28)",   color: "#EF4444", label: "Incidente documentado" },
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
      <pre className="p-5 text-[11px] leading-relaxed text-emerald-300/80 font-mono overflow-x-auto" style={{ background: "rgba(0,0,0,0.40)" }}>{children}</pre>
    </div>
  );
}

function VulnCard({ num, title, prevalence, children }: { num: string; title: string; prevalence: string; children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border overflow-hidden" style={{ borderColor: `${A}30`, background: `${A}06` }}>
      <div className="flex items-start gap-4 px-5 py-4 border-b" style={{ borderColor: `${A}20` }}>
        <span className="text-2xl font-black" style={{ color: `${AL}50` }}>{num}</span>
        <div>
          <p className="font-bold text-white text-sm">{title}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: AL }}>Prevalencia: {prevalence}</p>
        </div>
      </div>
      <div className="px-5 py-4 text-sm text-slate-300 leading-relaxed [&_strong]:text-white [&_strong]:font-semibold [&_ul]:mt-3 [&_ul]:space-y-1.5 [&_li]:flex [&_li]:items-start [&_li]:gap-2">{children}</div>
    </div>
  );
}

/* ── Page ───────────────────────── */
export default function GuiaCiberseguridadOTIT() {
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
              <ChevronRight size={11} />
              <Link href="/industrias/power-utilities" className="hover:text-white/60 transition-colors">Power Utilities</Link>
              <ChevronRight size={11} />
              <span className="text-white/50">Guía Técnica</span>
            </nav>

            {/* Type badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: AL, borderColor: `${A}40`, background: `${A}12` }}>
              <FileText size={11} />
              Guía Técnica — 2025–2026
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.05] mb-6">
              Ciberseguridad Convergente{" "}
              <span style={{ color: AL }}>OT/IT para Utilities Eléctricas</span>
            </h1>

            <p className="text-white/45 text-lg font-light leading-relaxed mb-10 max-w-2xl">
              Framework técnico y operativo para implementar arquitecturas Zero Trust en entornos SCADA/ICS sin interrumpir operaciones de suministro eléctrico.
            </p>

            {/* KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { value: "+112%", label: "Incidentes OT eléctrico LATAM 2024", icon: TrendingUp },
                { value: "294 días", label: "Permanencia media de atacante en red OT", icon: Eye },
                { value: "61%", label: "Utilities sin segmentación IT/OT efectiva", icon: Activity },
                { value: "18%", label: "Con monitoreo de seguridad OT dedicado", icon: Shield },
              ].map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div key={kpi.label} className="rounded-2xl p-4 border" style={{ background: `${A}08`, borderColor: `${A}20` }}>
                    <Icon size={14} className="mb-2" style={{ color: AL }} />
                    <div className="text-2xl font-black text-white mb-1">{kpi.value}</div>
                    <div className="text-[10px] text-white/35 leading-snug">{kpi.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-white/30"><Clock size={12} /> 8 min lectura</span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5 text-xs text-white/30"><FileText size={12} /> 16 páginas</span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5 text-xs text-white/30"><Shield size={12} /> IEC 62443 · NERC CIP · Zero Trust</span>
            </div>
          </div>
        </div>

        {/* ── ARTICLE BODY ── */}
        <div className="max-w-4xl mx-auto px-6 pb-24">

          {/* Resumen Ejecutivo */}
          <SectionHeading number="00" title="Resumen Ejecutivo" />
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            La convergencia entre redes de Tecnología Operativa (OT) y Tecnología de la Información (IT) en el sector eléctrico latinoamericano ha creado la superficie de ataque más compleja y potencialmente más devastadora de la infraestructura crítica regional. Los sistemas que controlan la generación, transmisión y distribución de energía —diseñados para operar en redes aisladas (air-gapped)— están hoy interconectados con redes corporativas, plataformas cloud e internet de formas que sus diseñadores nunca anticiparon.
          </p>
          <Callout type="stat">
            <strong>Según Dragos OT/ICS Cybersecurity Year in Review 2024</strong>, los incidentes con impacto en infraestructura eléctrica latinoamericana incrementaron un 112% entre 2023 y 2024 — el mayor incremento documentado en cualquier región del mundo para el sector energía.
          </Callout>

          <SubHeading title="Panorama de Riesgo: Sector Eléctrico LATAM 2025" />
          <DataTable
            headers={["Indicador", "Valor 2025", "Tendencia", "Fuente"]}
            rows={[
              ["Incidentes con impacto eléctrico LATAM (2024)", "284 confirmados", "+112% vs. 2023", "Dragos OT YiR 2024"],
              ["Utilities con SCADA en red IT sin segmentación real", "61%", "↑ digitalización sin seguridad", "Claroty State of OT 2025"],
              ["Costo promedio por parada de suministro > 4h", "USD 4.6M–18M", "↑", "IBM + ANEEL 2024"],
              ["Sistemas ICS/SCADA con CVEs críticos sin parchar", "73%", "—", "Tenable OT 2025"],
              ["Tiempo promedio de permanencia en red OT eléctrica", "294 días", "↑ vs. 210 días global", "Mandiant M-Trends 2025"],
              ["Utilities con monitoreo de seguridad OT dedicado", "18%", "↑ lentamente", "Nozomi OT Report 2025"],
              ["Incidentes con origen en IT propagado hacia OT", "71%", "↑↑", "Claroty 2025"],
            ]}
          />

          {/* § 1 */}
          <SectionHeading number="01" title="El Problema: Por Qué las Utilities Eléctricas Son Tan Vulnerables" />
          <SubHeading title="La Historia de la Convergencia" />
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Durante décadas, los sistemas de control de la red eléctrica operaron bajo el principio de <strong className="text-white">seguridad por oscuridad y aislamiento</strong>: protocolos propietarios (Modbus, DNP3, IEC 61850), hardware especializado y redes físicamente separadas del mundo exterior. La transformación digital rompió ese aislamiento de manera progresiva y, en muchos casos, sin un diseño deliberado de seguridad.
          </p>
          <ul className="space-y-2.5 text-sm text-slate-300 mb-6">
            {[
              "Los sistemas SCADA se conectan a redes corporativas para compartir datos de producción con el ERP.",
              "Técnicos acceden remotamente a RTUs y PLCs desde laptops corporativas via VPN.",
              "Fabricantes de IEDs y relés de protección acceden remotamente para mantenimiento desde sus propias redes.",
              "Los historian servers (OSIsoft PI, AVEVA) replican datos SCADA hacia plataformas cloud para analítica.",
              "Los medidores AMI transmiten datos via redes convergentes en la plataforma MDMS conectada a IT.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: AL }} />
                {item}
              </li>
            ))}
          </ul>
          <Callout type="warning">
            Una utility eléctrica típica de tamaño mediano en LATAM tiene hoy entre <strong>15 y 40 puntos de convergencia IT-OT documentados</strong>, y un número similar de conexiones no documentadas. Cada punto de convergencia es un vector de ataque potencial.
          </Callout>

          <SubHeading title="Taxonomía de Amenazas Específicas del Sector Eléctrico" />
          <DataTable
            headers={["Categoría", "Ejemplos Documentados", "Vector de Acceso", "Impacto"]}
            rows={[
              ["APT Estado-Nación", "CRASHOVERRIDE; TRITON/TRISIS; BLACKENERGY3", "Acceso a sistemas de control; manipulación firmware RTUs", "Blackout regional; daño físico a transformadores"],
              ["Ransomware con módulo OT", "EKANS/SNAKE; INDUSTROYER2; Conti variante OT", "Propagación IT → OT; cifrado historian y HMIs", "Parada de operaciones; presión máxima de pago"],
              ["Espionaje industrial", "APTs interesados en topología y cronogramas", "Acceso persistente de largo plazo; exfiltración silenciosa", "Datos estratégicos; preparación de ataques futuros"],
              ["Sabotaje físico digital", "Manipulación de relés de protección; apertura de interruptores", "Acceso a sistemas de protección y control", "Daño físico a activos; accidentes con víctimas"],
              ["Ransomware oportunista IT→OT", "Grupos sin especialización OT en redes mal segmentadas", "Phishing → IT → propagación lateral hacia OT", "Parada no planificada; pérdida de visibilidad operativa"],
              ["Insider Threat", "Operadores o contratistas con acceso a sistemas de control", "Acceso legítimo mal supervisado", "Variable: errores de configuración a sabotaje deliberado"],
            ]}
          />

          {/* § 2 */}
          <SectionHeading number="02" title="Arquitectura Zero Trust para Entornos OT Eléctricos" />
          <SubHeading title="Los Siete Pilares del Zero Trust Adaptados a OT Eléctrico" />
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            El modelo Zero Trust ("nunca confiar, siempre verificar") fue diseñado originalmente para entornos IT. Su aplicación directa a OT requiere adaptaciones críticas que respeten las restricciones de latencia operativa, la disponibilidad 24/7 y la imposibilidad de parchear sistemas en producción con la misma agilidad que en IT.
          </p>

          {[
            { num: "1", title: "Identidad Verificada para Todos los Accesos", icon: Lock, desc: "MFA obligatorio para acceso a HMIs, estaciones de ingeniería y sistemas SCADA. Para máquinas: certificados X.509 para autenticación de dispositivos. Para legacy sin soporte nativo: proxy de autenticación. PAM (CyberArk, BeyondTrust) para gestión de cuentas privilegiadas." },
            { num: "2", title: "Dispositivos Conocidos y Evaluados", icon: Cpu, desc: "El inventario completo de todos los activos OT es la condición previa. Descubrimiento pasivo obligatorio con Nozomi Networks Guardian, Claroty CTD o Dragos Platform via SPAN port. El escaneo activo está PROHIBIDO en redes OT — puede causar interrupciones en dispositivos legacy." },
            { num: "3", title: "Redes Micro-Segmentadas (IEC 62443)", icon: Shield, desc: "Segmentación en zonas y conductos IEC 62443-3-3. Es el control de mayor impacto: detiene el movimiento lateral del atacante aunque haya logrado acceso inicial." },
            { num: "4", title: "Aplicaciones y Cargas de Trabajo Controladas", icon: Lock, desc: "Application allowlisting en servidores HMI, historian y estaciones de ingeniería. En sistemas Windows legacy (XP, 7, Server 2003/2008): Tripwire Enterprise o Carbon Black App Control son la única defensa efectiva." },
            { num: "5", title: "Datos Clasificados y Protegidos", icon: FileText, desc: "Los datos de topología de red eléctrica, capacidad instalada, esquemas de protección y cronogramas de mantenimiento tienen valor estratégico. Clasificación y control de acceso a datos sensibles de operaciones." },
            { num: "6", title: "Visibilidad y Analítica Continua", icon: Eye, desc: "Sin monitoreo, el promedio de 294 días de permanencia del atacante no puede reducirse. El monitoreo pasivo continuo es el pilar que habilita la detección temprana." },
            { num: "7", title: "Automatización y Orquestación de Respuesta", icon: Activity, desc: "Playbooks de respuesta automatizados: aislamiento de zona comprometida, activación de modo manual degradado, notificación a sala de control, escalación a gerencia y reguladores. La automatización reduce el tiempo de respuesta de horas a minutos." },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.num} className="flex gap-4 mb-5 p-4 rounded-xl border" style={{ background: `${A}06`, borderColor: `${A}18` }}>
                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black" style={{ background: `${A}18`, color: AL }}>{pillar.num}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={13} style={{ color: AL }} />
                    <p className="font-bold text-white text-sm">{pillar.title}</p>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}

          <SubHeading title="Modelo de Zonas IEC 62443 para Utilities Eléctricas" />
          <CodeBlock>{`ARQUITECTURA DE ZONAS IEC 62443 — UTILITY ELÉCTRICA

┌─────────────────────────────────────────────────────────────────────┐
│  ZONA EMPRESARIAL (IT)                                              │
│  ERP, RRHH, Finanzas, Correo, Directorio Activo corporativo         │
│  Red IT estándar; SL-1 (Security Level 1)                           │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ FIREWALL OT-AWARE + DMZ INDUSTRIAL
                    ┌──────┴──────┐
                    │ DMZ         │ Historian (OSIsoft PI / AVEVA)
                    │ INDUSTRIAL  │ Servidores de reporting
                    │             │ Proxy de datos IT↔OT
                    └──────┬──────┘
                           │
┌──────────────────────────┴──────────────────────────────────────────┐
│  ZONA DE OPERACIONES (OT Supervisorio)                              │
│  SCADA, ADMS/DMS, ENERGY MANAGEMENT SYSTEM (EMS)                   │
│  HMIs de operadores; Estaciones de ingeniería; Servidores SCADA     │
│  SL-2 (acceso autenticado + auditoría completa)                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ FIREWALL OT-AWARE DEDICADO (ICS-specific)
                           │ Inspección de protocolos DNP3, IEC 60870-5
┌──────────────────────────┴──────────────────────────────────────────┐
│  ZONA DE CONTROL (OT Campo — Subestaciones / Centros de Generación) │
│  RTUs, PLCs, IEDs (relés de protección SEL, ABB REF, GE D60)        │
│  Controladores de turbina / generador; Controladores de subestación  │
│  SL-2 / SL-3 para sistemas de protección crítica                    │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ Segmentación física + lógica estricta
┌──────────────────────────┴──────────────────────────────────────────┐
│  ZONA DE CAMPO (Sensores y Actuadores)                              │
│  Sensores de tensión/corriente, PMUs, medidores de energía          │
│  Interruptores de potencia, seccionadores con actuador              │
│  SL-1 (protección física + monitoreo pasivo)                        │
└─────────────────────────────────────────────────────────────────────┘

COMUNICACIONES ESPECIALES:
├─ Teleprotección: Canal dedicado para protección de línea
│   Latencia requerida: < 4 ms. Sin cifrado que añada latencia.
└─ Comunicaciones de emergencia: Canal backup independiente de red IP`}</CodeBlock>

          {/* § 3 */}
          <SectionHeading number="03" title="Las 10 Vulnerabilidades Críticas en OT Eléctrico LATAM" />

          <VulnCard num="V1" title="Credenciales por Defecto en IEDs y RTUs" prevalence="68% de dispositivos auditados (Claroty 2025)">
            <p>Relés de protección (SEL-387, ABB REF615, GE D60, Siemens SIPROTEC), RTUs y gateways se envían con credenciales de fábrica documentadas en manuales públicos. La primera acción de cualquier atacante es intentar estas credenciales.</p>
            <ul>
              {["Auditoría inmediata de todas las credenciales en dispositivos de campo.", "Para IEDs que no permiten cambio de contraseña: VLAN + ACLs que solo permitan IPs autorizadas.", "PAM para gestión de credenciales: ningún operador debe conocer contraseñas de dispositivos.", "Documentar todas las cuentas en CMDB de credenciales OT."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V2" title="Ausencia Total de Segmentación IT/OT" prevalence="61% de utilities sin segmentación efectiva (Dragos 2025)">
            <p>La red corporativa IT y la red OT en el mismo plano — o con VLANs sin firewall — es el habilitador del 71% de los incidentes OT que se originan en IT. Un ransomware por phishing puede alcanzar el servidor SCADA en menos de 2 horas en redes planas.</p>
            <ul>
              {["Firewall OT-aware en el boundary IT/OT: FortiGate-ICS, Palo Alto NGFW con firmas ICS.", "DMZ industrial como zona de intercambio: ninguna conexión directa IT↔OT.", "Data diode para flujos críticos de historian a IT: Waterfall Security o OWL Cyber Defense.", "Regla de oro: deny-all entre zonas; solo flujos explícitamente necesarios en whitelist."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V3" title="Acceso Remoto de Terceros Sin Control (OEMs)" prevalence="64% con VPN permanente de fabricantes sin MFA (Ponemon 2025)">
            <p>Fabricantes de IEDs (ABB, Siemens, GE, SEL, Schneider) acceden regularmente a sistemas de control para mantenimiento. Estos accesos son frecuentemente VPNs permanentes, con credenciales compartidas y sin registro de actividad.</p>
            <Callout type="danger">
              <strong>Caso documentado (distribuidora eléctrica Brasil, Q3 2024):</strong> Técnico de proveedor de SCADA con VPN activa fue víctima de phishing. El atacante usó la sesión VPN para cifrar servidores SCADA con ransomware variante Cl0p. 18 horas en modo manual degradado. 240,000 usuarios afectados. Costo estimado: USD 3.2M.
            </Callout>
            <ul>
              {["VPN de acceso JIT: activa solo durante ventanas de mantenimiento aprobadas; desactivada automáticamente al cierre.", "Jump server dedicado con CyberArk PSM o BeyondTrust: grabación completa de sesión.", "MFA obligatorio para TODOS los accesos de terceros, sin excepción.", "Revisión mensual de cuentas de terceros activas."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V4" title="Sistemas SCADA Legacy Sin Soporte en Producción" prevalence="78% con SCADA/HMI en Windows XP, Server 2003/2008 o Windows 7 (Tenable 2025)">
            <p>La justificación es operativa y real: el SCADA fue certificado para un OS específico; actualizar puede invalidar la certificación. Sin embargo, estos sistemas tienen cientos de vulnerabilidades públicamente conocidas y explotadas.</p>
            <ul>
              {["Aislamiento estricto: el sistema legacy en su propia VLAN; lista blanca de 3–5 IPs autorizadas.", "Application allowlisting: Tripwire Enterprise, Carbon Black App Control o Windows AppLocker.", "Eliminar acceso a internet y red corporativa: estos sistemas no necesitan navegar por internet.", "Plan de migración con fecha comprometida: AVEVA Unified SCADA, GE Vernova, Siemens SICAM A8000."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V5" title="Protocolos Sin Autenticación en Comunicaciones de Campo" prevalence="82% de comunicaciones de campo sin autenticación nativa (ICS-CERT 2025)">
            <p>Modbus (1979, sin autenticación), DNP3 (autenticación SAv5 raramente implementada), IEC 60870-5 e IEC 61850 GOOSE fueron diseñados para redes aisladas. En redes convergentes, cualquier dispositivo puede enviar comandos a un RTU sin autenticación — incluyendo un atacante.</p>
            <ul>
              {["IEC 62351 para protocolos IEC 61850, DNP3 e IEC 60870-5 donde el hardware lo soporte.", "Para Modbus legacy: segmentación estricta + firewalls OT con whitelist de función codes.", "Monitoreo de comandos inusuales: alerta ante escrituras desde fuentes no autorizadas.", "Para nuevos proyectos: especificar IEC 62351 como requisito en pliegos de licitación."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V6" title="Sin Monitoreo Pasivo de Red OT" prevalence="82% sin herramienta de monitoreo OT dedicada (Nozomi 2025)">
            <p>El tiempo de permanencia de 294 días es posible precisamente porque no hay nadie mirando el tráfico OT en tiempo real. Las herramientas IT (Splunk, QRadar) sin parsers industriales son ciegas ante tráfico Modbus, DNP3 o IEC 61850.</p>
            <ul>
              {["Sensor pasivo via SPAN port en switch principal de cada zona de control: Nozomi Guardian, Claroty CTD, Dragos Platform o Microsoft Defender for IoT.", "El monitoreo PASIVO es mandatorio — el activo puede generar trips en PLCs y relés.", "Integración con SIEM corporativo: correlacionar eventos OT con eventos IT.", "Definir baseline de comportamiento normal; las desviaciones son alertas."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V7" title="Gestión Deficiente de Parches OT" prevalence="73% de sistemas ICS/SCADA con CVEs críticos sin parchar (Tenable 2025)">
            <p>El ciclo de parcheo en OT eléctrico puede tomar 3–6 meses por dispositivo crítico: requiere parada planificada, pruebas en laboratorio, ventana coordinada con el operador de red y validación post-instalación.</p>
            <ul>
              {["Programa formal de gestión de parches OT: inventario por dispositivo; clasificación por criticidad (CVSS × exposición × criticidad operativa).", "Para CVEs críticos en sistemas expuestos: compensating controls inmediatos mientras se planifica el parche.", "Coordinar con fabricantes (ABB, Siemens, GE, SEL) el calendario de firmware.", "Entorno de pruebas: validar en hardware idéntico antes de aplicar en producción."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V8" title="Backups Insuficientes de Configuraciones OT" prevalence="52% sin backup actualizado y verificado (Cohesity 2025)">
            <p>Sin backups válidos de configuraciones OT, la recuperación tras ransomware puede ser semanas o meses: los IEDs de protección requieren configuración manual parámetro a parámetro.</p>
            <ul>
              {["Backup automatizado de todos los IEDs, RTUs, PLCs y servidores SCADA (Network Config Manager, Rconfig).", "Almacenamiento: servidor en DMZ + réplica offline en storage no conectado + réplica offsite.", "Verificación trimestral de restauración en laboratorio.", "Documentación de configuraciones críticas en papel como último recurso."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V9" title="Sin Plan de Respuesta a Incidentes OT" prevalence="74% de utilities sin plan IRT específico para OT (OEA 2025)">
            <p>Un incidente OT eléctrico es fundamentalmente diferente a uno IT: la respuesta incorrecta puede causar daño físico a equipos o pérdida de control de la red eléctrica.</p>
            <ul>
              {["Plan de respuesta específico: roles, procedimientos por escenario (ransomware en historian, acceso no autorizado a HMI, anomalía en IED de protección).", "Protocolo de decisión: aislar un segmento OT debe involucrar al Director de Operaciones, no solo al CISO.", "Tabletop exercise semestral: simular 'ransomware en SCADA a las 2 AM de un sábado'.", "Contactos de emergencia offline: CERT nacional, regulador, proveedor de IR con experiencia OT."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="V10" title="Cadena de Suministro de Firmware y Software OT" prevalence="Documentada en 12% — exposición no detectada significativamente mayor (CISA 2025)">
            <p>Los IEDs y RTUs reciben actualizaciones de firmware que pueden contener backdoors. Las plataformas SIPROTEC de Siemens y los relés SEL son objetivos documentados de grupos APT.</p>
            <ul>
              {["Verificación criptográfica de todo firmware antes de instalar: comparar SHA-256 con el portal del fabricante.", "Ningún firmware se instala en campo sin validación previa en equipo idéntico en laboratorio.", "Requerimiento de SBOM a proveedores para nuevos contratos de software de gestión y SCADA.", "Monitoreo de comportamiento post-actualización: cualquier anomalía es alerta de primer nivel."].map((m, i) => (
                <li key={i}><CheckCircle2 size={10} style={{ color: AL }} className="shrink-0 mt-0.5" /><span>{m}</span></li>
              ))}
            </ul>
          </VulnCard>

          {/* § 4 */}
          <SectionHeading number="04" title="Hoja de Ruta de Implementación: 90 Días a Zero Trust OT" />
          <SubHeading title="Primeras 72 Horas: Acciones de Impacto Inmediato (Sin Costo Relevante)" />
          <DataTable
            headers={["Acción", "Responsable", "Impacto en Riesgo"]}
            rows={[
              ["Cambiar TODAS las contraseñas por defecto en IEDs, RTUs, gateways", "Ingeniería de subestaciones", "Crítico — elimina el vector más explotado"],
              ["Deshabilitar accesos VPN permanentes de fabricantes sin mantenimiento activo", "TI/Seguridad", "Muy Alto"],
              ["Revocar cuentas de ex-empleados y contratistas en sistemas OT", "TI/RRHH", "Alto"],
              ["Activar logging en firewalls de red y servidores SCADA", "TI/OT", "Alto (visibilidad básica)"],
              ["Backup inmediato de configuraciones críticas (IEDs de líneas principales, SCADA)", "Ingeniería OT", "Muy Alto (resiliencia ante incidente)"],
              ["Inventario manual de todos los dispositivos OT con acceso a red IP", "Ingeniería OT", "Alto (prerequisito de todo lo demás)"],
            ]}
          />

          {[
            { range: "Días 1–30", title: "Visibilidad Completa", items: ["Despliegue de sensor pasivo OT via SPAN port (Nozomi/Claroty/Dragos): primera prioridad del programa.", "CMDB de activos OT: inventario completo con criticidad, firmware, protocolos, flujos de comunicación.", "Identificación de conexiones IT/OT no documentadas mediante análisis de tráfico."] },
            { range: "Días 31–60", title: "Segmentación y Control de Acceso", items: ["Firewall OT-aware en boundary IT/OT: FortiGate-ICS o equivalente con políticas deny-all + whitelist.", "DMZ industrial: mover historian (OSIsoft PI/AVEVA) a DMZ; data diode unidireccional hacia IT.", "PAM para acceso privilegiado a SCADA; jump server con grabación de sesión para terceros.", "MFA en todos los accesos a sistemas de control: HMIs, estaciones de ingeniería, remotos."] },
            { range: "Días 61–90", title: "Detección y Respuesta", items: ["Integración NOC-SOC con datos OT: eventos del sensor pasivo al SIEM con parsers industriales.", "Plan de respuesta a incidentes OT: roles, protocolos y decisiones para OT eléctrico.", "Primer tabletop exercise: simulacro de ransomware en red OT eléctrica.", "Programa de parches OT: inventario de vulnerabilidades, priorización y calendario."] },
          ].map((phase) => (
            <div key={phase.range} className="mb-6 p-5 rounded-2xl border" style={{ background: `${A}06`, borderColor: `${A}20` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: `${A}20`, color: AL }}>{phase.range}</span>
                <p className="font-bold text-white text-sm">{phase.title}</p>
              </div>
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

          {/* § 5 */}
          <SectionHeading number="05" title="Cumplimiento Regulatorio en LATAM 2025" />
          <DataTable
            headers={["Marco / Estándar", "Alcance", "Aplicabilidad LATAM", "Estado"]}
            rows={[
              ["IEC 62443 (Serie completa)", "Seguridad de sistemas industriales; zonas y conductos; SL-1 a SL-4", "Referencia adoptada por reguladores regionales", "< 8% certificación completa en sector eléctrico LATAM"],
              ["NERC CIP (CIP-002 a CIP-014)", "Protección de infraestructura crítica eléctrica", "Referencia voluntaria en LATAM", "Adoptado por utilities con licitaciones internacionales"],
              ["NIST SP 800-82 Rev. 3", "Guía de seguridad para sistemas OT industriales", "Marco técnico citado por reguladores LATAM", "Referencia; no mandatorio"],
              ["CONPES 3995 + Decreto 338 (Colombia)", "Política nacional de ciberseguridad; infraestructura crítica", "Mandatorio para utilities bajo supervisión CREG", "En implementación; cumplimiento heterogéneo"],
              ["ANEEL Resolução (Brasil)", "Regulación de ciberseguridad para el sector eléctrico", "Mandatorio para distribuidoras y transmisoras reguladas", "Marco en maduración; auditorías en proceso"],
              ["Ley Marco 21.663 (Chile)", "Ciberseguridad para infraestructura crítica", "Mandatorio para generadoras, transmisoras y distribuidoras", "Ley aprobada 2024; reglamentación en proceso"],
            ]}
          />

          <Callout type="success">
            <strong>El análisis es inequívoco:</strong> el costo de implementar controles IEC 62443 SL-2 es una fracción del costo de un incidente de ransomware con 24h de parada eléctrica. El costo de la seguridad convergente OT/IT es siempre inferior al costo del riesgo no gestionado.
          </Callout>

          {/* § 6 */}
          <SectionHeading number="06" title="Stack Tecnológico de Referencia" />
          <DataTable
            headers={["Categoría", "Soluciones Validadas", "Consideraciones para OT Eléctrico"]}
            rows={[
              ["Monitoreo pasivo OT", "Nozomi Guardian; Claroty CTD; Dragos Platform; Microsoft Defender for IoT", "Conexión PASIVA via SPAN port. Sin generación de tráfico activo. Parsers para DNP3, IEC 61850, Modbus."],
              ["Firewall OT-aware", "Fortinet FortiGate-ICS; Palo Alto Networks; Tofino Security (Belden); Cisco Firepower + ICS", "Inspección a nivel de aplicación para protocolos industriales. Configuración con expertos OT."],
              ["Data Diode", "Waterfall Security; OWL Cyber Defense (OPTICA); Fox-IT DataDiode", "Unidireccional por hardware para flujo historian→IT. Imposible de comprometer por software."],
              ["PAM (Acceso Privilegiado)", "CyberArk Privileged Access Manager; BeyondTrust Password Safe; Delinea Secret Server", "Grabación de sesiones obligatoria. Rotación automática de credenciales de dispositivos ICS."],
              ["SIEM con correlación OT/IT", "Splunk + ICS Add-on; IBM QRadar + ICS Extension; Microsoft Sentinel + Defender for IoT", "Parsers nativos para protocolos industriales. Reglas de correlación específicas para ataques OT."],
              ["Application Allowlisting", "Tripwire Enterprise; Carbon Black App Control; Ivanti Application Control", "Para Windows XP/7/Server 2008 que no pueden parchearse. Bloquea ransomware por defecto."],
            ]}
          />

          {/* Conclusions */}
          <div className="mt-14 p-7 rounded-3xl border" style={{ background: `linear-gradient(135deg, ${A}10 0%, rgba(0,0,0,0) 100%)`, borderColor: `${A}25` }}>
            <h2 className="text-xl font-bold text-white mb-4">Conclusiones</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              La convergencia OT/IT en el sector eléctrico latinoamericano es irreversible. El framework Zero Trust OT propuesto en esta guía ha sido diseñado para una implementación progresiva de 90 días que prioriza los controles de mayor impacto con el mínimo riesgo operativo.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              El incremento del 112% en incidentes en 2024 no es tendencia estadística — es la señal de que actores sofisticados han identificado el sector como blanco prioritario y que las defensas actuales son insuficientes. Cada día sin visibilidad OT, sin segmentación IT/OT y sin credenciales por defecto cambiadas es un día con riesgo inaceptable.
            </p>
          </div>

          {/* References */}
          <details className="mt-10">
            <summary className="text-xs text-white/30 cursor-pointer hover:text-white/50 transition-colors font-bold uppercase tracking-widest">Fuentes y Referencias (23)</summary>
            <ol className="mt-4 space-y-1.5 text-xs text-slate-500 leading-relaxed list-decimal pl-5">
              {["Dragos Inc., OT/ICS Cybersecurity Year in Review 2024, febrero 2025.","Dragos Inc., Threat Groups Targeting Electric Utilities, 2025.","Claroty, The Global State of OT Security 2025, enero 2025.","Nozomi Networks, OT/IoT Security Report H2 2024, enero 2025.","Mandiant / Google Cloud, M-Trends 2025, marzo 2025.","IBM Security, Cost of a Data Breach Report 2024, julio 2024.","Tenable, OT Security: State of Industrial Exposure Report 2025.","Ponemon Institute, The State of Cybersecurity in the OT/ICS Environment 2025.","Cohesity, Critical Infrastructure Data Protection Survey 2025.","OEA, Ciberseguridad en Infraestructura Crítica de América Latina y el Caribe 2025.","CISA, OT/ICS Advisory AA24-165A: Software Supply Chain Attacks, 2024.","CISA, Advisory AA24-242A: Ransomware on Electric Sector, 2024.","IEC 62443-3-3:2013 System Security Requirements and Security Levels.","IEC 62443-2-1:2010 Security Management System for Industrial Automation.","IEC 62351:2024 Security for Power Systems Communication.","NIST SP 800-82 Revision 3: Guide to Operational Technology Security, septiembre 2023.","NERC CIP Standards: Critical Infrastructure Protection, actualización 2024.","ANEEL Brasil, Resolução Normativa sobre Segurança Cibernética, 2024.","MinTIC / CREG Colombia, CONPES 3995 y Marco de Ciberseguridad, DNP 2020.","Ley 21.663 de Chile, Ley Marco sobre Ciberseguridad e Infraestructura Crítica, 2024.","Waterfall Security, Unidirectional Gateways for Electric Utilities, 2025.","Fortinet, OT Security Reference Architecture for Electric Utilities, 2025.","ICS-CERT (CISA), Multiple Advisories on Electric Sector ICS Vulnerabilities 2024–2025."].map((ref, i) => (
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
              style={{ background: `linear-gradient(135deg, ${A} 0%, #0A7570 100%)`, boxShadow: `0 4px 20px ${A}40` }}
            >
              Hablar con un especialista en ciberseguridad OT
              <ChevronRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
