import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, FileText, BarChart2, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Shield, Lock, Eye, Zap, AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ciberseguridad en Minería LATAM 2025–2026 — Reporte de Inteligencia de Amenazas",
  description:
    "Análisis de las 10 vulnerabilidades críticas en SCADA minero, actores de amenaza activos, marco regulatorio por país, framework de mitigación 30/60/90 días y protocolo de respuesta a incidentes OT para operaciones extractivas.",
  keywords: [
    "ciberseguridad minería LATAM 2025",
    "vulnerabilidades SCADA minería",
    "seguridad OT infraestructura crítica",
    "ransomware OT minería",
    "IEC 62443 minería",
    "OSC Top Solutions",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/ciberseguridad-mineria-latam` },
  openGraph: {
    title: "Ciberseguridad en Minería LATAM 2025–2026 — Reporte de Inteligencia de Amenazas",
    description: "10 vulnerabilidades críticas en SCADA minero, actores de amenaza, marco regulatorio y plan de mitigación 30/60/90 días.",
    type: "article",
    url: `${SITE_URL}/guias/ciberseguridad-mineria-latam`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Ciberseguridad en Minería LATAM 2025–2026 — Reporte de Inteligencia de Amenazas",
  description: "Análisis de vulnerabilidades críticas en sistemas SCADA mineros y estrategias de mitigación verificadas.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01",
  dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/ciberseguridad-mineria-latam`,
  inLanguage: "es-419",
};

/* ── Micro-components ── */
function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle, bg: "rgba(255,165,0,0.08)",  border: "rgba(255,165,0,0.25)",  color: "#F59E0B", label: "Alerta operativa" },
    info:    { icon: Info,          bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.22)", color: "#60A5FA", label: "Nota técnica" },
    success: { icon: CheckCircle2,  bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.22)", color: "#34D399", label: "Mitigación validada" },
    stat:    { icon: TrendingUp,    bg: "rgba(255,0,87,0.07)",   border: "rgba(255,0,87,0.22)",   color: "#FF0057", label: "Dato clave 2025" },
    danger:  { icon: AlertCircle,   bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.28)",  color: "#EF4444", label: "Incidente documentado" },
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
    <pre className="my-6 p-5 rounded-2xl text-xs leading-relaxed overflow-x-auto" style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.08)", color: "#94A3B8", fontFamily: "'Fira Code', Consolas, monospace" }}>
      <code>{children}</code>
    </pre>
  );
}

function Bold({ children }: { children: React.ReactNode }) { return <strong className="text-white font-semibold">{children}</strong>; }
function Accent({ children }: { children: React.ReactNode }) { return <span style={{ color: "#FF0057" }} className="font-semibold">{children}</span>; }
function AccentYellow({ children }: { children: React.ReactNode }) { return <span style={{ color: "#F59E0B" }} className="font-semibold">{children}</span>; }

/* ── Vulnerability card ── */
function VulnCard({ num, title, prevalence, children }: { num: string; title: string; prevalence: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,0,87,0.15)" }}>
      <div className="px-5 py-4 flex items-start gap-4" style={{ background: "rgba(255,0,87,0.07)", borderBottom: "1px solid rgba(255,0,87,0.12)" }}>
        <span className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black text-white shrink-0 mt-0.5" style={{ background: "#FF0057" }}>V{num}</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-white leading-snug">{title}</p>
          <p className="text-[10px] text-white/40 mt-1">Prevalencia 2025: <span style={{ color: "#FF0057" }} className="font-bold">{prevalence}</span></p>
        </div>
      </div>
      <div className="px-5 py-4 text-xs text-slate-300 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function CiberseguridadMineria() {
  return (
    <>
      <JsonLd data={articleSchema} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #080610 0%, #100818 55%, #140D22 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,0,87,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(255,0,87,0.14) 0%, transparent 60%)" }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
          <nav className="flex items-center gap-2 text-xs text-white/35 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/industrias/energia-mineria" className="hover:text-white/60 transition-colors">Energía & Minería</Link>
            <ChevronRight size={12} />
            <span className="text-white/55">Reporte</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,87,0.12)", border: "1px solid rgba(255,0,87,0.30)", color: "#FF6B8A" }}>
              <BarChart2 size={11} /> Reporte de Inteligencia
            </span>
            <span className="text-[10px] text-white/25 uppercase tracking-widest font-semibold">2025–2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
            Ciberseguridad en Minería<br className="hidden md:block" />
            <span style={{ color: "#FF0057" }}> LATAM 2025–2026</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-10">
            Las 10 vulnerabilidades críticas en sistemas SCADA mineros, actores de amenaza activos, marco regulatorio
            por país, framework de mitigación 30/60/90 días y protocolo de respuesta a incidentes OT.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            {[
              { icon: Clock,    label: "40 min lectura" },
              { icon: BarChart2, label: "7 secciones" },
              { icon: FileText, label: "28 referencias verificadas" },
              { icon: Shield,   label: "OT · SCADA · IEC 62443" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-white/40">
                <Icon size={12} /><span>{label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "87%", label: "incremento incidentes OT en minería global 2023→2024" },
              { value: "287 días", label: "dwell time promedio en redes OT sin monitoreo (2024)" },
              { value: "USD 4.24M", label: "costo promedio de incidente con impacto operativo" },
              { value: "81%", label: "operaciones mineras LATAM sin monitoreo OT dedicado" },
            ].map(({ value, label }) => (
              <div key={value} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-xl font-black mb-1" style={{ color: "#FF0057" }}>{value}</p>
                <p className="text-[11px] text-white/40 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #100818 0%, #140D22 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 py-14">

          {/* ── CONTEXTO ── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Resumen Ejecutivo</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <Prose>
              <p>
                La industria minera latinoamericana atraviesa la convergencia más crítica de su historia reciente:
                la aceleración de la digitalización operativa ocurre simultáneamente con el crecimiento más acelerado
                del panorama de amenazas cibernéticas. Los incidentes OT en el sector minero global incrementaron un{" "}
                <Accent>87% entre 2023 y 2024</Accent>. América Latina concentró el <Bold>22% de los incidentes globales</Bold>{" "}
                en el sector extractivo — una proporción superior al peso relativo del sector en la región.
              </p>
              <p>
                La brecha fundamental: el <Accent>79% de la inversión</Accent> en seguridad de operaciones mineras se
                destina a ciberseguridad IT y solo el <Bold>21% a seguridad OT</Bold>, a pesar de que el <Accent>68% de
                los incidentes con impacto operativo</Accent> se originan en IT y se propagan hacia OT por ausencia de
                controles en el boundary (<em>Claroty Global State of OT Security 2025</em>).
              </p>
            </Prose>

            <SubHeading>Índice de Riesgo Sectorial LATAM 2025</SubHeading>
            <DataTable
              headers={["Subsector", "Índice de Riesgo", "Cambio vs. 2023", "Principal Vector"]}
              rows={[
                [<Bold key="1">Gran minería cobre y litio</Bold>, <Accent key="v1">8.6/10</Accent>, "↑ +2.1", "Ransomware con módulos OT + APT estado-nación (minerales críticos)"],
                [<Bold key="2">Minería subterránea (oro, plata)</Bold>, "7.3/10", "↑ +1.4", "Ransomware oportunista + insider threat con acceso privilegiado"],
                [<Bold key="3">Minería a cielo abierto (carbón)</Bold>, "6.5/10", "↑ +0.9", "Ransomware por CAPEX digital sin inversión equivalente en seguridad"],
                [<Bold key="4">Exploración y perforación (Junior)</Bold>, "6.1/10", "↑ +1.7", "Acceso remoto mal configurado; datos geológicos objetivo de espionaje"],
                [<Bold key="5">Plantas de procesamiento / fundición</Bold>, <Accent key="v2">9.1/10</Accent>, "↑ +2.4", "APT + acceso IT→OT; datos de proceso con alto valor para competidores"],
              ]}
            />
          </div>

          {/* ── S1: LANDSCAPE ── */}
          <SectionHeading number="1" title="Landscape de Amenazas: Actores, TTPs y Vectores 2024–2025" icon={Eye} />

          <SubHeading>1.1 Grupos de Ransomware Activos</SubHeading>
          <div className="space-y-4 my-6">
            {[
              { name: "LockBit 3.0 / Black + fragmentados post-takedown 2024", color: "#FF0057", desc: "Operación Cronos (feb 2024) desarticuló LockBit temporalmente; afiliados reagrupados bajo MedusaLocker, BlackSuit, RansomHub. Vector en minería: RDP expuesto → elevación de privilegios via Mimikatz → desactivación de backups → cifrado. Dwell time antes del despliegue: 18 días (con monitoreo), hasta 287 días (sin monitoreo OT)." },
              { name: "BlackCat / ALPHV (cesó operaciones formales mar 2024)", color: "#F59E0B", desc: "Ransomware-as-a-Service con cifrado simultáneo en Windows, Linux y VMware ESXi. Crítico para minería: la virtualización de servidores SCADA no proporciona protección. Documentado en al menos 3 operaciones extractivas de LATAM en 2023–2024." },
              { name: "RansomHub (emergente 2024–2025)", color: "#EF4444", desc: "Absorbió afiliados de LockBit y ALPHV. Modelo de doble extorsión (cifrado + publicación de datos). El grupo de ransomware más activo en Q3–Q4 2024. Presencia documentada en sector minero de Colombia y Brasil (Mandiant M-Trends 2025)." },
            ].map(({ name, color, desc }) => (
              <div key={name} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${color}25` }}>
                <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${color}20`, background: `${color}09` }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                  <p className="text-sm font-bold text-white">{name}</p>
                </div>
                <p className="px-5 py-3.5 text-xs text-slate-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>1.2 TTPs Predominantes 2024–2025 (MITRE ATT&CK for ICS)</SubHeading>
          <DataTable
            compact
            headers={["MITRE ICS", "Técnica", "Frecuencia LATAM 2024", "Tendencia"]}
            rows={[
              ["T0866", "Acceso via credenciales válidas (robadas o reutilizadas)", <Accent key="1">41% de incidentes</Accent>, "↑↑"],
              ["T0817", "Acceso via RDP directo a internet", "36% como vector inicial", "↑"],
              ["T0863", "User Execution — phishing con macro/ejecutable", "24% de accesos iniciales", "↑↑ (AI-generado)"],
              ["T0862", "Supply chain compromise", "14% (crecimiento rápido)", "↑↑↑"],
              ["T0885", "Commonly Used Port — movimiento lateral", "38% de propagación", "↑↑"],
              ["T0849", "Masquerading — herramientas legítimas OT (LotL)", "29% de movimiento lateral", "↑↑↑"],
              ["T0816", "Device Restart/Shutdown", "22% en incidentes con impacto OT", "↔"],
            ]}
          />

          {/* ── S2: 10 VULNERABILIDADES ── */}
          <SectionHeading number="2" title="Las 10 Vulnerabilidades Críticas en Entornos SCADA Mineros" icon={AlertTriangle} />

          <VulnCard num="1" title="RDP Expuesto Directamente a Internet" prevalence="67% de operaciones auditadas (Tenable 2025)">
            <p>Remote Desktop Protocol (TCP/3389) expuesto a internet sin mediación de VPN es el vector de acceso inicial más explotado en infraestructura crítica globalmente en 2024 (Verizon DBIR 2025). Sistemas Windows 7/Server 2008 no parcheados aún activos en entornos mineros con BlueKeep activo.</p>
            <p className="font-semibold text-white mt-2">Mitigación validada:</p>
            <ul className="space-y-1 mt-1">
              {["Deshabilitar RDP directo a internet sin excepción operativa.", "Implementar VPN con MFA como único punto de entrada remota (Palo Alto GlobalProtect, Fortinet FortiClient, Cisco AnyConnect).", "Si la VPN tiene latencia incompatible con OT: bastion host con grabación de sesiones (CyberArk PSM, BeyondTrust).", "Alerta inmediata ante cualquier intento de conexión RDP desde internet, incluso bloqueado."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="2" title="Credenciales por Defecto y Compartidas en SCADA" prevalence="61% de sistemas SCADA (Claroty 2025)">
            <p>Fabricantes como Schneider Electric, Siemens (WinCC), Rockwell (FactoryTalk), AVEVA e Ignition publican sus credenciales por defecto en manuales de acceso público. Los atacantes automatizan escaneos de estas credenciales contra sistemas expuestos.</p>
            <p className="font-semibold text-white mt-2">Mitigación validada:</p>
            <ul className="space-y-1 mt-1">
              {["Auditoría obligatoria de todas las cuentas SCADA, HMI, PLCs y dispositivos OT antes de cualquier otra acción.", "Implementar PAM (CyberArk, BeyondTrust Password Safe, Thycotic) — las credenciales críticas NO deben ser conocidas por usuarios.", "Política: contraseñas ≥ 20 caracteres; rotación máximo 90 días; sin conocimiento humano directo."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="3" title="Ausencia de Segmentación IT/OT" prevalence="54% de operaciones sin segmentación efectiva (Nozomi H2 2024)">
            <p>IT y OT en el mismo plano lógico habilita movimiento lateral. Un ransomware que ingresa por phishing en un equipo administrativo puede alcanzar el SCADA en menos de 4 horas. Estándar de referencia: IEC 62443-3-3 (zonas y conductos).</p>
            <CodeBlock>{`ZONA CORPORATIVA (IT)           ZONA INDUSTRIAL (OT)
Red administrativa               Red de control
Email, ERP, RRHH                SCADA, DCS, PLCs
        │                               │
        └──── FIREWALL OT-AWARE ────────┘
              + DMZ Industrial
              (historians, data brokers,
               servidores de salto)`}</CodeBlock>
            <p className="font-semibold text-white mt-2">Mitigación validada:</p>
            <ul className="space-y-1 mt-1">
              {["Firewall NGFW OT-aware en boundary IT/OT (Fortinet FortiGate-ICS, Palo Alto con ICS App-ID, Cisco Firepower).", "DMZ Industrial para todos los flujos IT↔OT: ninguna conexión directa.", "Micro-segmentación intra-OT: PLCs de subestación separados de PLCs de planta concentradora.", "Deny-all como política por defecto; solo flujos explícitamente documentados permitidos."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="4" title="Acceso Remoto de Terceros Sin Control" prevalence="64% con al menos un acceso de proveedor sin MFA ni supervisión (Claroty 2025)">
            <p>Fabricantes OEM (Caterpillar, Komatsu, Sandvik, Metso, ABB) acceden remotamente con VPNs permanentes y credenciales genéricas compartidas entre múltiples técnicos, sin expiración y sin supervisión.</p>
            <Callout type="danger">
              <strong>Incidente documentado (Q3 2024, Sudamérica):</strong> Acceso remoto de proveedor de sistema de despacho
              comprometido via phishing al técnico de soporte. La VPN permanente del proveedor fue usada para acceder a la red OT,
              desplegar variante Cl0p y cifrar servidores de despacho, backups y reporting. <strong>5 días en modo manual; costo estimado USD 1.9–2.6M</strong>.
            </Callout>
            <p className="font-semibold text-white">Mitigación validada:</p>
            <ul className="space-y-1 mt-1">
              {["Eliminar VPNs permanentes de acceso continuo para terceros.", "Acceso just-in-time (JIT): VPN activa solo durante ticket de servicio abierto y aprobado.", "Jump server con grabación completa (video + keystroke) para todos los accesos de terceros.", "MFA obligatorio sin excepción para todas las cuentas de terceros."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="5" title="Sistemas SCADA Legacy Sin Soporte ni Parches" prevalence="76% con al menos un sistema en Windows XP/7/Server 2003–2008 en rol SCADA (Tenable LATAM 2025)">
            <p>Sistemas sin actualizaciones de seguridad desde 2014 (XP), 2020 (Win7), 2015/2020 (Server 2003/2008) con cientos de vulnerabilidades conocidas y explotadas activamente. La justificación operativa es real: actualizar el OS puede romper el software SCADA.</p>
            <p className="font-semibold text-white mt-2">Mitigación validada (sin reemplazo inmediato):</p>
            <ul className="space-y-1 mt-1">
              {["Aislamiento de red estricto: sistema legacy en su propia VLAN con lista blanca de 3–5 IPs permitidas.", "Application Allowlisting (no antivirus tradicional): Tripwire Enterprise, Carbon Black App Control, Windows AppLocker.", "Monitoreo de integridad: alertas ante cualquier cambio en archivos del sistema operativo.", "Plan de migración con fecha comprometida, propietario técnico y presupuesto asignado."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="6" title="Backups Accesibles desde la Red de Producción" prevalence="49% con backups SCADA accesibles desde la misma red (Cohesity 2025)">
            <p>El ransomware moderno (LockBit, RansomHub, BlackSuit) incluye módulos para descubrimiento y eliminación de backups antes de cifrar producción. Sin backups íntegros, no hay opción de recuperación sin pagar el rescate.</p>
            <p className="font-semibold text-white mt-2">Mitigación validada — Regla 3-2-1-1:</p>
            <ul className="space-y-1 mt-1">
              {["3 copias de datos críticos, en 2 medios distintos, 1 copia fuera de sitio, 1 copia completamente air-gapped.", "El sistema de backup air-gapped sin conexión de red permanente — no una VLAN separada.", "Backup de configuraciones OT específicamente: lógica de PLCs, configuración SCADA, listas blancas.", "Pruebas de restauración trimestrales obligatorias y documentadas. El 41% de backups industriales fallan en primera restauración de emergencia (Veeam 2025)."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="7" title="Ausencia de Monitoreo de Seguridad OT" prevalence="81% sin monitoreo dedicado de seguridad en redes OT (Nozomi H2 2024)">
            <p>Sin visibilidad del tráfico OT, el dwell time promedio antes de detección fue <Bold>287 días en 2024</Bold> (Dragos YiR 2024). En ese período, el atacante mapea la infraestructura, exfiltra terabytes de datos, instala backdoors persistentes y prepara el payload para el momento óptimo.</p>
            <DataTable
              compact
              headers={["Plataforma", "Fortaleza", "Mejor Ajuste"]}
              rows={[
                [<Bold key="d">Dragos Platform</Bold>, "Mayor base de conocimiento OT; threat intelligence de APT industriales; IR disponible", "Gran minería; SCADA Siemens/Rockwell; APT activos"],
                [<Bold key="n">Nozomi Networks Guardian</Bold>, "Descubrimiento completo de activos OT; integración SIEM amplia", "Operaciones medianas; integración IT/OT en SIEM único"],
                [<Bold key="c">Claroty CTD</Bold>, "Mejor detección de vulnerabilidades OT; integración Tenable.OT", "Foco en gestión de vulnerabilidades OT"],
                [<Bold key="m">MS Defender for IoT</Bold>, "Integración nativa ecosistema Microsoft; menor costo con licencias E5", "Operaciones con fuerte adopción Microsoft/Azure"],
              ]}
            />
          </VulnCard>

          <VulnCard num="8" title="Phishing con AI Generativa" prevalence="94% sin programa formal de simulación de phishing (KnowBe4 2025)">
            <p>En 2025, los LLMs eliminaron los indicadores lingüísticos que permitían identificar correos de phishing. Tasa de clic en phishing simulado en minería sin programa de concienciación: <Bold>38.4%</Bold>. Con simulación mensual activa: <Bold>4.6%</Bold> en 12 meses.</p>
            <p className="font-semibold text-white mt-2">Mitigación validada:</p>
            <ul className="space-y-1 mt-1">
              {["Simulaciones de phishing mensuales (KnowBe4, Proofpoint SAT, Cofense). La retroalimentación inmediata tras el clic simulado es el mecanismo de entrenamiento más efectivo.", "MFA en todos los correos corporativos sin excepción.", "ATP de correo (Proofpoint TAP, MS Defender for Office P2, Mimecast CTP): sandboxing de adjuntos.", "DMARC en modo 'reject' para el dominio corporativo: previene spoofing en BEC."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="9" title="Gestión Deficiente del Acceso Privilegiado" prevalence="71% sin PAM para sistemas OT (BeyondTrust 2025)">
            <p>Problemáticas frecuentes: cuentas de administrador local compartidas con la misma contraseña en decenas de estaciones; cuentas de servicio SCADA con permisos de Domain Admin; operadores con acceso a configuración de PLCs que excede sus necesidades.</p>
            <p className="font-semibold text-white mt-2">Mitigación validada:</p>
            <ul className="space-y-1 mt-1">
              {["PAM: ningún administrador conoce las contraseñas. Las credenciales se solicitan al sistema por tiempo limitado (check-out).", "Principio de menor privilegio: cada cuenta con exactamente los permisos necesarios.", "JIT para privilegios elevados: el privilegio se otorga por tiempo definido y se revoca automáticamente.", "Separación de cuentas: cuenta estándar para actividades cotidianas; cuenta privilegiada separada para acciones administrativas."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          <VulnCard num="10" title="Compromiso de Cadena de Suministro de Software OT" prevalence="14% de operaciones con incidentes confirmados; universo real mucho mayor no detectado (CISA 2025)">
            <p>El atacante compromete el proveedor upstream y distribuye código malicioso mediante el mecanismo de actualización legítimo. Documentado en 2024: al menos dos incidentes con software de gestión de activos mineros comprometido (CISA ICS-CERT Alert AA24-165A).</p>
            <p className="font-semibold text-white mt-2">Mitigación validada:</p>
            <ul className="space-y-1 mt-1">
              {["Entorno de staging aislado + período de observación mínimo de 2 semanas antes de actualizar sistemas críticos.", "Verificación de integridad criptográfica: comparar hash SHA-256 del instalador con el publicado por el fabricante.", "SBOM (Software Bill of Materials): requerir a proveedores OT críticos la entrega de SBOM actualizado con cada versión.", "Monitoreo de comportamiento post-instalación: conexión de red nueva desde software OT = alerta inmediata."].map((m, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: "#34D399" }} />{m}</li>
              ))}
            </ul>
          </VulnCard>

          {/* ── S3: REGULATORIO ── */}
          <SectionHeading number="3" title="Marco Regulatorio por País 2025" icon={Lock} />

          <DataTable
            headers={["País", "Marco Principal", "Obligación de Reporte", "Nivel de Exigencia"]}
            rows={[
              [<Bold key="co">Colombia</Bold>, "CONPES 3995; Decreto 338/2022; Resolución MinMinas 40072/2024", "24 horas para infraestructura crítica", <Accent key="v1">ALTO — más avanzado de la región</Accent>],
              [<Bold key="cl">Chile</Bold>, "Ley 21.459 (Delitos Informáticos); Ley Marco Ciberseguridad 2024", "72 horas para infraestructura crítica identificada", <Accent key="v2">ALTO — Ley Marco en implementación 2025</Accent>],
              [<Bold key="pe">Perú</Bold>, "DS 070-2021-PCM; Resolución Ministerial 166-2022-PCM; lineamientos MINEM", "48 horas para impacto en producción nacional", "MEDIO-ALTO — evolución activa"],
              [<Bold key="mx">México</Bold>, "NOM-ICSF (en proceso); Ley Federal de Ciberseguridad (en debate)", "Voluntario (2025); obligatorio proyectado 2027", "CRECIENTE — aceleración post-incidentes 2024"],
              [<Bold key="br">Brasil</Bold>, "LGPD; Decreto 11.200/2022 (CNCS); Resolução ANATEL 757/2022", "72 horas para impacto en servicios esenciales", "MEDIO — más avanzado en datos que en OT"],
            ]}
          />

          {/* ── S4: MITIGACIÓN 30/60/90 ── */}
          <SectionHeading number="4" title="Framework de Mitigación Priorizado: 30/60/90 Días" icon={Zap} />

          {[
            {
              phase: "Primeros 30 días", color: "#EF4444",
              desc: "Estas acciones no requieren inversión significativa. Reducen la superficie de ataque explotable actualmente en un 45–55%.",
              actions: [
                { action: "Deshabilitar RDP directo a internet; implementar VPN con MFA", risk: "Crítica", cost: "USD 3,000–12,000" },
                { action: "Cambiar TODAS las credenciales por defecto en SCADA, PLC, switches, cámaras, gateways OT", risk: "Muy Alta", cost: "USD 0 (tiempo)" },
                { action: "Revocar accesos VPN de ex-empleados y proveedores con contrato vencido", risk: "Alta", cost: "USD 0" },
                { action: "Activar logging en SCADA, firewalls OT y switches industriales", risk: "Alta (visibilidad básica)", cost: "USD 0–1,500" },
                { action: "Backup air-gapped de configuraciones SCADA + lógica de PLCs", risk: "Muy Alta", cost: "USD 500–3,000" },
                { action: "Implementar DMARC 'reject' en dominio corporativo", risk: "Alta (anti-spoofing)", cost: "USD 0" },
              ]
            },
            {
              phase: "31–60 días", color: "#F59E0B",
              desc: "Visibilidad y segmentación inicial — los controles que hacen detectables y contenibles los ataques.",
              actions: [
                { action: "Sensor pasivo de monitoreo OT (Nozomi/Claroty/Dragos via SPAN port)", risk: "Muy Alta — visibilidad completa red OT", cost: "USD 30,000–90,000" },
                { action: "Firewall OT-aware en boundary IT/OT", risk: "Crítica — bloquea movimiento lateral", cost: "USD 18,000–55,000" },
                { action: "PAM para acceso privilegiado a sistemas SCADA", risk: "Alta", cost: "USD 25,000–75,000" },
                { action: "Proceso de acceso JIT para terceros", risk: "Alta", cost: "USD 6,000–20,000" },
                { action: "Simulaciones de phishing + capacitación mensual", risk: "Medio-Alta", cost: "USD 4,000–12,000/año" },
              ]
            },
            {
              phase: "61–90 días", color: "#60A5FA",
              desc: "Defensa en profundidad y respuesta a incidentes — el estado que hace posible detectar, responder y recuperarse.",
              actions: [
                { action: "SIEM con integración OT/IT + reglas de correlación para amenazas OT", risk: "Muy Alta — detección activa", cost: "USD 45,000–130,000" },
                { action: "Plan de respuesta a incidentes OT específico + tabletop exercise", risk: "Alta (organizacional)", cost: "USD 8,000–20,000" },
                { action: "Assessment formal IEC 62443 con gap analysis y roadmap", risk: "Estratégico", cost: "USD 25,000–65,000" },
                { action: "Programa de gestión de vulnerabilidades OT (Tenable.OT / Claroty CVE tracking)", risk: "Alta — priorización de parches", cost: "USD 18,000–50,000/año" },
              ]
            },
          ].map(({ phase, color, desc, actions }) => (
            <div key={phase} className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <p className="text-sm font-bold text-white">{phase}</p>
              </div>
              <p className="text-xs text-slate-400 mb-4 ml-5">{desc}</p>
              <DataTable
                compact
                headers={["Acción", "Reducción de Riesgo", "Inversión Estimada"]}
                rows={actions.map(({ action, risk, cost }) => [action, risk, cost])}
              />
            </div>
          ))}

          {/* ── S5: RESPUESTA A INCIDENTES ── */}
          <SectionHeading number="5" title="Protocolo de Respuesta a Incidentes OT: Las Primeras 4 Horas" icon={AlertTriangle} />

          <Callout type="warning">
            <strong>El primer protocolo de respuesta determina la diferencia entre una parada de 4 horas y 4 semanas.</strong>{" "}
            Debe estar escrito, practicado y accesible sin necesidad de la red corporativa (impreso en sala de control).
          </Callout>

          <div className="space-y-4 my-6">
            {[
              { time: "0–15 min", title: "Detección y Confirmación", color: "#EF4444",
                items: ["Confirmar que es un incidente de seguridad (no falla técnica). Síntomas de ransomware: archivos cifrados, notas de rescate, lentitud inusual, logs con cuentas anómalas.", "NO reiniciar sistemas afectados: destruye evidencia forense y puede acelerar el cifrado.", "Activar equipo de respuesta: CISO, Gerente de Operaciones, Gerente de Planta, Legal, Comunicaciones. Lista de contactos disponible offline.", "Documentar estado inicial: capturas, fotografías de pantallas, logs exportados. La línea de tiempo comienza aquí."] },
              { time: "15–60 min", title: "Contención", color: "#F59E0B",
                items: ["Aislar la red afectada del backbone corporativo: desconectar el segmento comprometido del switch de distribución. Acción física, no lógica.", "Determinar si sistemas OT están comprometidos o solo sistemas IT adyacentes. Si SCADA está comprometido, evaluar modo manual.", "NO intentar limpiar con antivirus: puede destruir evidencia y contaminar la escena forense.", "Contactar proveedor de IR OT. Tener el número de contacto de emergencia disponible offline antes de un incidente."] },
              { time: "1–4 horas", title: "Evaluación y Decisiones Críticas", color: "#60A5FA",
                items: ["Determinar alcance completo: sistemas confirmados comprometidos vs. en riesgo. El atacante puede estar en múltiples sistemas simultáneamente.", "Decisión de negocio: continuar operando con exposición vs. detener y limpiar. Involucra CEO/COO.", "Notificación regulatoria: los plazos de 24–72 horas comienzan desde la detección documentada. Activar equipo legal.", "Canal único de comunicación sobre el incidente. La desinformación interna es tan dañina como el incidente."] },
              { time: "4–72 horas", title: "Recuperación Controlada", color: "#34D399",
                items: ["Restaurar desde backups verificados y air-gapped, no desde sistemas que estuvieron en la misma red comprometida.", "Validar integridad de sistemas de control antes de reanudar: un PLC puede estar comprometido con lógica modificada sin síntomas obvios.", "Análisis forense: preservar imágenes forenses antes de restaurar (evidencia legal).", "Comunicación externa según protocolo aprobado de crisis. Nunca improvisar."] },
            ].map(({ time, title, color, items }) => (
              <div key={time} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>{time}</span>
                  <p className="text-sm font-bold text-white">{title}</p>
                </div>
                <ul className="px-5 py-4 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <AlertCircle size={11} className="shrink-0 mt-0.5" style={{ color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <SubHeading>Los 4 Errores Más Costosos (Post-Mortem LATAM 2023–2024)</SubHeading>
          <div className="space-y-3 my-4">
            {[
              { err: "Error 1 — Aislamiento sin coordinación", desc: "Desconectar sistemas sin avisar a operaciones causó en casos documentados un trip de planta más costoso que el incidente cibernético. El protocolo debe especificar quién tiene autoridad para aislar qué sistema y en qué secuencia." },
              { err: "Error 2 — Plan de respuesta sin escenarios OT", desc: "El 71% de los planes de continuidad en minería LATAM no incluyen escenarios de compromiso de sistemas de control. Un plan IT-only es un plan incompleto." },
              { err: "Error 3 — Backups sin prueba de restauración", desc: "En el 43% de incidentes con ransomware, los backups existían pero fallaron en la restauración de emergencia. Prueba trimestral obligatoria." },
              { err: "Error 4 — Pagar el rescate sin garantías", desc: "El 80% de las organizaciones que pagan rescate sufren un segundo ataque dentro de los 6 meses (Cybereason 2025). El pago no garantiza recuperación y financia la próxima campaña." },
            ].map(({ err, desc }) => (
              <div key={err} className="flex gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
                <div>
                  <p className="text-sm font-bold text-white mb-1">{err}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── S6: MADUREZ ── */}
          <SectionHeading number="6" title="Modelo de Madurez OSC: Ciberseguridad OT Minera" icon={TrendingUp} />

          <DataTable
            headers={["Nivel", "Denominación", "% Operaciones LATAM 2025"]}
            rows={[
              [<Bold key="1">N1 — Exposición Total</Bold>, "IT y OT en la misma red; 0 logs OT; acceso remoto sin MFA; credenciales por defecto", <AccentYellow key="v1">27%</AccentYellow>],
              [<Bold key="2">N2 — Controles Básicos</Bold>, "MFA en acceso remoto; contraseñas cambiadas; backups existentes; sin segmentación ni monitoreo OT", <AccentYellow key="v2">39%</AccentYellow>],
              [<Bold key="3">N3 — Segmentación Activa</Bold>, "Firewall IT/OT; PAM básico; monitoreo pasivo OT; backup air-gapped; JIT para terceros", "21%"],
              [<Bold key="4">N4 — Defensa Activa</Bold>, "SIEM con correlación OT/IT; IR playbooks OT; tabletop exercises semestrales; IEC 62443 SL-2", "10%"],
              [<Bold key="5">N5 — Resiliencia Certificada</Bold>, "IEC 62443 completo; SOC 24/7 con capacidad OT; threat intelligence operacionalizada", <Accent key="v3">3%</Accent>],
            ]}
          />

          <Callout type="stat">
            <strong>Objetivo sectorial 2027:</strong> Ninguna operación de gran minería en LATAM debería estar por debajo del{" "}
            <strong>Nivel 3</strong>. La inversión para pasar de N1 a N3 — <strong>USD 150,000 a 450,000</strong> dependiendo
            del tamaño — es una fracción del costo de un incidente de ransomware con impacto OT (USD 1.9M–15M según escala).
          </Callout>

          {/* ── S7: EMERGENTES ── */}
          <SectionHeading number="7" title="Amenazas Emergentes 2025–2026" icon={Eye} />

          <div className="space-y-5 my-6">
            {[
              { title: "7.1 Ransomware con Componentes OT Específicos", color: "#FF0057",
                desc: "La siguiente generación de ransomware no solo cifra archivos — manipula la lógica de control de PLCs antes del cifrado: altera setpoints, deshabilita alarmas de seguridad o modifica secuencias de operación para maximizar el daño físico. El incidente TRITON/TRISIS (Arabia Saudita, 2017) fue el precursor; variantes accesibles como RaaS con capacidades similares son el escenario proyectado 2024–2025. (CISA Advisory AA24-242A)" },
              { title: "7.2 Ataques a Redes Privadas LTE/5G como Vector OT", color: "#F59E0B",
                desc: "A medida que las redes Private LTE se convierten en columna vertebral de operaciones mineras, se convierten en vector de ataque de alto valor. Vectores documentados: rogue eNodeB via SDR (man-in-the-middle en flotas autónomas), IMSI catchers dirigidos a SIMs industriales, jamming deliberado en frecuencias de operación. La seguridad de la red LTE/5G debe integrarse en la arquitectura OT desde el diseño." },
              { title: "7.3 AI-Powered Spear-Phishing a Escala Industrial", color: "#818CF8",
                desc: "Correos de spear-phishing generados con LLMs: idioma nativo perfecto, contexto específico del destinatario (cargo, proyectos actuales, colegas), imposibles de distinguir por análisis lingüístico. La defensa perimetral de correo basada en patrones lingüísticos es obsoleta. Respuesta: DMARC estricto, verificación out-of-band para transacciones sensibles, MFA universal. (IBM X-Force 2025; Proofpoint State of the Phish 2025)" },
            ].map(({ title, color, desc }) => (
              <div key={title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${color}20` }}>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color }}>{title}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── CONCLUSIONES ── */}
          <div className="my-14 rounded-3xl p-8" style={{ background: "linear-gradient(135deg, rgba(255,0,87,0.10) 0%, rgba(100,0,30,0.08) 100%)", border: "1px solid rgba(255,0,87,0.22)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,0,87,0.15)", border: "1px solid rgba(255,0,87,0.30)" }}>
                <Shield size={16} style={{ color: "#FF0057" }} />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/50">Conclusiones y 3 Acciones Prioritarias</p>
            </div>
            <Prose>
              <p className="text-white/80 leading-[1.9]">
                El sector minero latinoamericano no enfrenta una amenaza de ciberseguridad en el horizonte —
                la enfrenta <Bold>hoy, activamente</Bold>, con el peor ratio de inversión en defensa vs. valor en riesgo de su historia.
                El incremento del <Accent>87% en incidentes OT</Accent> en el sector en 2024 es una señal de cambio estructural, no una anomalía.
              </p>
            </Prose>
            <div className="mt-6 space-y-4">
              {[
                { n: "1", title: "Próximas 72 horas", desc: "Deshabilitar el RDP directo a internet. Cambiar credenciales por defecto en SCADA y dispositivos OT. Revocar accesos VPN inactivos. Sin costo relevante. Elimina el 50% de la superficie de ataque explotable hoy." },
                { n: "2", title: "Próximas 4 semanas", desc: "Desplegar sensor pasivo de monitoreo OT (Nozomi, Claroty o Dragos) via SPAN port al switch principal de la red de control. USD 30,000–90,000. Proporciona visibilidad completa — la base sobre la que se construyen todos los demás controles." },
                { n: "3", title: "Próximos 3 meses", desc: "Ejecutar assessment formal IEC 62443 con gap analysis. Revela exactamente dónde está la operación y define el roadmap de inversión priorizado por riesgo real. USD 25,000–65,000. El costo del assessment es recuperado con la primera parada no planificada evitada." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ background: "#FF0057" }}>{n}</span>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── REFERENCIAS ── */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Referencias y Fuentes</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <ol className="space-y-2">
              {[
                "Dragos, OT/ICS Cybersecurity Year in Review 2024, Dragos Inc., febrero 2025.",
                "IBM Security, Cost of a Data Breach Report 2024, IBM X-Force, julio 2024.",
                "Claroty, The Global State of OT Security 2025: Critical Infrastructure Under Attack, enero 2025.",
                "Nozomi Networks, OT/IoT Security Report: Trends and Strategies H2 2024, enero 2025.",
                "Mandiant / Google Cloud, M-Trends 2025: Special Report on Cyber Threats, marzo 2025.",
                "CrowdStrike, 2025 Global Threat Report: Adversary Landscape and Attack Trends, febrero 2025.",
                "Tenable, OT Security Report: Industrial Vulnerability Exposure in Latin America 2025, Q1 2025.",
                "Verizon, 2025 Data Breach Investigations Report (DBIR), mayo 2025.",
                "KnowBe4, Phishing by Industry Benchmarking Report 2025.",
                "Ponemon Institute / DTEX Systems, 2024 Cost of Insider Threats: Global Report, octubre 2024.",
                "FBI / IC3, 2024 Internet Crime Report, Internet Crime Complaint Center, marzo 2025.",
                "Europol / NCA, Operation Cronos: LockBit Takedown Technical Report, febrero 2024.",
                "CISA, Advisory AA24-165A: Threat Actors Targeting ICS Integrators and Software Vendors, junio 2024.",
                "CISA, Advisory AA24-242A: Ransomware Attacks on Critical Infrastructure, agosto 2024.",
                "NSA / CISA, Joint Advisory: Securing Remote Access Software, marzo 2024.",
                "IEC, IEC 62443-3-3:2013: Industrial Communication Networks — Network and System Security.",
                "NIST, SP 800-82 Revision 3: Guide to Operational Technology (OT) Security, septiembre 2023.",
                "NIST, SP 800-161r1: Cybersecurity Supply Chain Risk Management Practices, mayo 2022.",
                "BeyondTrust, 2025 Privileged Access Threat Report.",
                "Cybereason, Ransomware: The True Cost to Business 2025.",
                "Veeam Software, 2025 Ransomware Trends and Proactive Strategies Report.",
                "BID, Estado de la Ciberseguridad en el Sector Industrial de América Latina y el Caribe 2025, Q1 2025.",
                "CEPAL, Regulación de Ciberseguridad en América Latina: Estado Actual y Brechas 2025, febrero 2025.",
                "MITRE, ATT&CK for ICS Framework v14, 2024.",
                "ENISA, Threat Landscape for Private 5G Networks: Security Considerations 2025.",
                "ISACA, State of Cybersecurity 2025: Latin America Regional Supplement.",
                "Proofpoint, State of the Phish 2025.",
                "Cohesity, Data Security in the Mining and Natural Resources Sector: 2025 Report, Q1 2025.",
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
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: "#FF0057" }}>¿Listo para proteger su operación?</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
              OSC implementa ciberseguridad OT<br className="hidden md:block" />
              para operaciones extractivas en LATAM
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
              Assessment IEC 62443, segmentación IT/OT, monitoreo OT pasivo, PAM y respuesta a incidentes —
              desde el diagnóstico hasta el nivel N4 de madurez.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contacto" className="inline-flex items-center gap-2.5 font-bold text-white px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg" style={{ background: "linear-gradient(135deg, #FF0057 0%, #CC0044 100%)", boxShadow: "0 4px 20px rgba(255,0,87,0.30)" }}>
                Solicitar assessment de seguridad OT
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
