import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArrowLeft, Clock, BarChart2, ChevronRight,
  AlertTriangle, CheckCircle2, Info, TrendingUp,
  Shield, Activity, Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ciberseguridad en Infraestructura Gubernamental LATAM 2025–2026 — Reporte | OSC",
  description:
    "Panorama de amenazas al sector gubernamental latinoamericano: +94% incidentes en 2024, 312 días de permanencia de atacantes, 10 vulnerabilidades más críticas, modelo de madurez N1–N5, marco regulatorio por país y protocolo de respuesta a incidentes para gobiernos.",
  keywords: [
    "ciberseguridad infraestructura gubernamental LATAM",
    "ransomware gobierno latinoamerica 2025",
    "vulnerabilidades sistemas gobierno America Latina",
    "CISO gobierno publico ciberseguridad",
    "IRP respuesta incidentes gobierno",
    "OSC Top Solutions gobierno",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/guias/ciberseguridad-infraestructura-gubernamental-latam` },
  openGraph: {
    title: "Ciberseguridad en Infraestructura Gubernamental LATAM 2025–2026",
    description: "+94% incidentes en 2024, 10 vulnerabilidades críticas y modelo de madurez para gobiernos latinoamericanos.",
    type: "article",
    url: `${SITE_URL}/guias/ciberseguridad-infraestructura-gubernamental-latam`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Ciberseguridad en Infraestructura Gubernamental LATAM — Reporte de Inteligencia 2025–2026",
  description: "Estado actual de las vulnerabilidades en sistemas gubernamentales y estrategias de protección para infraestructura crítica del Estado.",
  author: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  publisher: { "@type": "Organization", name: "OSC Top Solutions Group", url: SITE_URL },
  datePublished: "2025-01-01", dateModified: "2026-01-01",
  url: `${SITE_URL}/guias/ciberseguridad-infraestructura-gubernamental-latam`,
  inLanguage: "es-419",
};

const A = "#E11D48";
const AL = "#FB7185";

function Callout({ type, children }: { type: "warning" | "info" | "success" | "stat" | "danger"; children: React.ReactNode }) {
  const cfg = {
    warning: { icon: AlertTriangle, bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", color: "#F59E0B", label: "Alerta de seguridad" },
    info:    { icon: Info,          bg: "rgba(225,29,72,0.07)",  border: "rgba(225,29,72,0.22)",  color: AL,        label: "Nota técnica" },
    success: { icon: CheckCircle2,  bg: "rgba(225,29,72,0.07)",  border: "rgba(225,29,72,0.22)",  color: AL,        label: "Mitigación efectiva" },
    stat:    { icon: TrendingUp,    bg: "rgba(255,0,87,0.07)",   border: "rgba(255,0,87,0.22)",   color: "#FF0057", label: "Dato crítico 2025" },
    danger:  { icon: AlertTriangle, bg: "rgba(239,68,68,0.09)",  border: "rgba(239,68,68,0.30)",  color: "#EF4444", label: "Incidente documentado" },
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

function VulnCard({ num, title, prevalence, mitigations }: { num: string; title: string; prevalence: string; mitigations: string[] }) {
  return (
    <div className="my-6 rounded-2xl border overflow-hidden" style={{ borderColor: `${A}30`, background: `${A}06` }}>
      <div className="flex items-start gap-4 px-5 py-4 border-b" style={{ borderColor: `${A}20` }}>
        <span className="text-2xl font-black" style={{ color: `${AL}50` }}>{num}</span>
        <div>
          <p className="font-bold text-white text-sm">{title}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: AL }}>Prevalencia 2025: {prevalence}</p>
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: `${AL}80` }}>Mitigación recomendada</p>
        <ul className="space-y-1.5">
          {mitigations.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: AL }} />{m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ReporteCiberseguridadGubernamental() {
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
              <span style={{ color: AL }}>Reporte</span>
            </nav>
            <Link href="/industrias/gobierno" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: `${AL}80` }}>
              <ArrowLeft size={14} /><span>Volver a Gobierno</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] font-black uppercase tracking-widest" style={{ background: `${A}15`, color: AL, border: `1px solid ${A}30` }}>
              <BarChart2 size={11} />Reporte de Inteligencia · 2025–2026
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Ciberseguridad en<br /><span style={{ color: AL }}>Infraestructura Gubernamental LATAM</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
              Estado actual de las vulnerabilidades en sistemas de gobierno latinoamericanos: 10 vulnerabilidades críticas, incidentes documentados en 2024, modelo de madurez N1–N5 y estrategias de protección priorizadas por presupuesto.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Clock size={13} />6 min de lectura</span>
              <span className="flex items-center gap-1.5"><BarChart2 size={13} />18 páginas</span>
              <span className="flex items-center gap-1.5"><Lock size={13} />Ciberseguridad Gubernamental</span>
              <span>28 fuentes verificadas</span>
            </div>
          </div>
        </div>

        {/* KPI STRIP */}
        <div className="border-y border-white/08" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "+94%", l: "Crecimiento de incidentes en entidades gov. LATAM en 2024 vs 2023", ctx: "OEA Reporte Ciberseguridad LATAM 2025" },
              { v: "312d", l: "Tiempo promedio de permanencia de un atacante en redes gubernamentales", ctx: "vs 194 días promedio global (Mandiant 2025)" },
              { v: "USD 2.8M", l: "Costo promedio de un incidente significativo en entidad gov. LATAM", ctx: "+38% vs 2023 (IBM X-Force 2025)" },
              { v: "61%", l: "De sistemas críticos gov. sin parches de seguridad actualizados", ctx: "Tenable Gov Exposure Report 2025" },
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

          <SectionHeading number="01" title="Resumen Ejecutivo: Una Crisis Activa, No Futura" />
          <p className="text-slate-300 leading-relaxed mb-4">
            Los gobiernos latinoamericanos son el objetivo de ciberataques más atacado de la región en 2024–2025. El sector gobierno fue el <strong>segundo más atacado en LATAM (19% de todos los incidentes)</strong>, solo detrás del sector financiero (<em>IBM X-Force Threat Intelligence Index 2025</em>). A diferencia del sector financiero, el sector público latinoamericano opera con presupuestos de ciberseguridad que representan el <strong>0.02–0.08% del gasto total</strong>, niveles que la OCDE califica como "críticamente insuficientes".
          </p>
          <DataTable
            headers={["Indicador", "Valor 2025", "Cambio vs. 2023", "Fuente"]}
            rows={[
              ["Incidentes significativos en entidades gov. LATAM (2024)", "1,847 reportados", "+94%", "OEA Reporte Ciberseguridad LATAM 2025"],
              ["Entidades gov. con al menos 1 incidente serio en 2024", "68%", "↑ desde 51%", "BID Ciberseguridad Pública 2025"],
              ["Costo promedio de incidente en entidad gov. LATAM", "USD 2.8M", "+38% vs. 2023", "IBM X-Force 2025"],
              ["% de entidades con CISO o responsable formal", "34%", "↑ desde 21%", "ISACA LATAM Survey 2025"],
              ["% de sistemas críticos gov. sin parches actualizados", "61%", "—", "Tenable Gov Exposure Report 2025"],
              ["Tiempo promedio de detección de intrusión (sector gov.)", "312 días", "Vs. 194 días promedio global", "Mandiant M-Trends 2025"],
              ["% de entidades con plan de respuesta a incidentes", "28%", "—", "OEA 2025"],
              ["Inversión en ciberseguridad como % del presupuesto TIC", "6.8%", "Vs. recomendación OCDE 15–20%", "OCDE LATAM Digital 2025"],
            ]}
          />

          <SectionHeading number="02" title="Actores de Amenaza con Impacto Documentado" />

          <SubHeading title="Grupos de Ransomware — La Amenaza Más Frecuente" />
          <Callout type="danger">
            Los grupos de ransomware modernos evalúan la <strong>capacidad de pago, la criticidad de los datos y la urgencia política de recuperación</strong> antes de atacar. Los gobiernos locales y nacionales son objetivos de alta prioridad: datos de millones de ciudadanos como activo de extorsión, presión política para pagar y recuperar servicios rápidamente, y históricamente bajos niveles de defensa.
          </Callout>
          <DataTable
            headers={["País / Entidad", "Fecha", "Grupo", "Impacto", "Costo Estimado"]}
            rows={[
              ["Costa Rica (CCSS)", "Junio 2024", "Rhysida", "Interrupción en 1,000+ centros de salud", "USD 350M+ (acumulado con 2022)"],
              ["Ecuador (Registro Civil)", "Septiembre 2024", "LockBit 3.0", "Datos de 18M ciudadanos; servicios de cédula interrumpidos", "USD 4.8M estimado"],
              ["Colombia (INVIMA y otras)", "Noviembre 2024", "RansomHub", "BD de vigilancia sanitaria cifradas; impacto en aprobaciones", "USD 2.1M estimado"],
              ["México (Pemex subsidiarias)", "Marzo 2024", "Cl0p (MOVEit)", "Datos contractuales y financieros exfiltrados", "USD 8.4M estimado"],
              ["Chile (Municipios RM, x3)", "Q2–Q3 2024", "BlackBasta + variante", "Sistemas de atención ciudadana bloqueados; datos de contribuyentes expuestos", "USD 1.2M–3.4M por municipio"],
              ["Perú (RENIEC — parcial)", "Agosto 2024", "Grupo sin identificar", "Acceso no autorizado a registros biométricos", "Bajo investigación"],
            ]}
          />

          <SubHeading title="Grupos APT Estado-Nación — La Amenaza Más Sofisticada" />
          <DataTable
            headers={["TTP", "Descripción", "Vector de Acceso", "Tendencia"]}
            rows={[
              ["Spear-phishing con AI", "Correos indistinguibles de comunicaciones legítimas entre cancillerías", "Acceso inicial 71% de los casos APT", "↑↑↑"],
              ["Watering hole en portales regionales", "Compromiso de portales CEPAL, OEA, SELA visitados por funcionarios objetivo", "Acceso inicial 18%", "↑↑"],
              ["Supply chain via software gubernamental", "Backdoors en ERP/GRP gubernamental usados en múltiples países", "Acceso con mayor persistencia", "↑↑↑"],
              ["Explotación de VPN y RDP sin parchear", "CVEs conocidos en Fortinet, Citrix, Pulse", "Acceso directo 11%", "↔"],
              ["Living-off-the-Land (LotL)", "Uso de herramientas del SO (PowerShell, WMI) para evitar detección", "Movimiento lateral post-acceso", "↑↑↑"],
            ]}
          />

          <SectionHeading number="03" title="Las Diez Vulnerabilidades Más Críticas" />

          <VulnCard num="V1" title="Exposición Directa de Paneles de Administración a Internet" prevalence="58% de entidades gov. LATAM"
            mitigations={[
              "Inventario completo de todos los servicios expuestos a internet (scan con Shodan o Censys del AS propio).",
              "Regla fundamental: ningún panel de administración accesible desde internet sin VPN con MFA.",
              "Implementar WAF (Web Application Firewall) delante de todas las aplicaciones web públicas.",
              "Parchar urgente todas las vulnerabilidades críticas (CVSS ≥ 9.0) en sistemas expuestos.",
              "CVEs activos relevantes: CVE-2024-21762 (Fortinet FortiOS SSL VPN, CVSS 9.8); CVE-2023-3519 (Citrix ADC, CVSS 9.8).",
            ]}
          />

          <VulnCard num="V2" title="Falta de MFA en Cuentas de Alto Privilegio" prevalence="66% sin MFA en cuentas de administrador"
            mitigations={[
              "MFA obligatorio para TODAS las cuentas con acceso privilegiado, sin excepción.",
              "Para entidades sin presupuesto enterprise: Microsoft Authenticator o Google Authenticator son gratuitos y válidos.",
              "Implementar políticas de contraseñas NIST SP 800-63B: longitud sobre complejidad; 14+ caracteres.",
              "PAM (Privileged Access Management) para sistemas críticos: registro de cada acceso privilegiado.",
            ]}
          />

          <VulnCard num="V3" title="Software Sin Actualizar y Deuda Técnica Acumulada" prevalence="61% de sistemas críticos con vulnerabilidades sin parchar"
            mitigations={[
              "Programa de gestión de vulnerabilidades: escaneo mensual; priorización por criticidad (CVSS + exposición).",
              "Vulnerability SLA: CVSS ≥ 9.0 en sistemas expuestos → parche en 72 horas; CVSS 7.0–9.0 → 30 días.",
              "Para sistemas que no pueden parchearse: compensating controls (segmentación, application allowlisting, monitoreo intensivo).",
              "Plan de modernización plurianual: cada sistema legacy debe tener dueño, fecha de migración y presupuesto.",
            ]}
          />

          <VulnCard num="V4" title="Sin Segmentación de Red — Acceso Lateral Irrestricto" prevalence="71% de entidades con red plana"
            mitigations={[
              "Segmentación mínima: sistemas críticos en VLANs separadas con firewall entre ellas.",
              "Principio de menor privilegio a nivel de red: ningún equipo tiene acceso por defecto a sistemas que no necesita.",
              "Zero Trust progresivo: comenzar con micro-segmentación de los activos más críticos.",
              "Herramientas open-source: pfSense con VLANs + ACLs; Wazuh para detección de movimiento lateral.",
            ]}
          />

          <VulnCard num="V5" title="Backup Inadecuado — La Diferencia entre Pagar y No Pagar" prevalence="54% sin backup completo y probado de sistemas críticos"
            mitigations={[
              "Regla 3-2-1-1: 3 copias, 2 medios diferentes, 1 offsite, 1 air-gapped (sin conexión a la red de producción).",
              "Backup automatizado con replicación offsite para todos los sistemas críticos.",
              "Prueba de restauración OBLIGATORIA y documentada cada trimestre.",
              "Definir RTO (Recovery Time Objective) y RPO (Recovery Point Objective) por sistema crítico.",
            ]}
          />

          <VulnCard num="V6" title="Phishing Sin Concienciación ni Controles Técnicos" prevalence="91% sin programa formal de concienciación"
            mitigations={[
              "Programa de concienciación mensual con simulaciones de phishing (KnowBe4, Proofpoint o GoPhish open-source).",
              "Protección técnica de correo: DMARC en modo 'reject' + DKIM + SPF; gateway con sandbox de adjuntos.",
              "MFA en todas las cuentas de correo corporativo.",
              "Política de 'reporta lo sospechoso': botón de reporte en el cliente de correo; incentivo positivo para reportar.",
            ]}
          />

          <VulnCard num="V7" title="Sin Monitoreo de Seguridad — Ciegos ante el Ataque" prevalence="78% sin SIEM o capacidad equivalente"
            mitigations={[
              "Básico (< USD 50K/año): Windows Event Log centralizado + Sysmon en endpoints críticos + Wazuh SIEM (open-source).",
              "Intermedio (USD 50–200K/año): Splunk SIEM (cloud) o Microsoft Sentinel; EDR en todos los endpoints.",
              "Avanzado (> USD 200K/año): SOC 24/7 (propio o tercerizado); SOAR; threat intelligence feeds; XDR integrado.",
              "NOTA: Wazuh open-source + servidor < USD 5,000 es infinitamente mejor que sin monitoreo.",
            ]}
          />

          <VulnCard num="V8" title="Cadena de Suministro de TI Sin Control" prevalence="83% sin proceso de validación de seguridad para software y proveedores"
            mitigations={[
              "Proceso de evaluación de seguridad para todo software nuevo: política de actualizaciones, historial CVEs, disponibilidad de SBOM.",
              "Cláusulas contractuales: notificación de incidentes en < 24 horas; derecho de auditoría; responsabilidad por brechas.",
              "Inventario de software activo con versiones: sin shadow IT.",
              "Proceso de validación de actualizaciones antes de producción: staging environment con prueba de 2 semanas.",
            ]}
          />

          <VulnCard num="V9" title="Datos de Ciudadanos Sin Cifrar ni Clasificar" prevalence="67% de BD gubernamentales con datos sensibles sin cifrado en reposo"
            mitigations={[
              "Clasificación de datos: inventario de todos los datos; clasificación por nivel de sensibilidad (público, interno, confidencial, secreto).",
              "Cifrado en reposo de todos los datos clasificados como confidencial o superior: AES-256 mínimo.",
              "Cifrado en tránsito: TLS 1.3 para todas las transmisiones de datos sensibles; eliminar HTTP, TLS 1.0/1.1.",
              "Tokenización o anonimización en entornos de desarrollo (los datos de producción nunca en ambientes de desarrollo).",
            ]}
          />

          <VulnCard num="V10" title="Sin Plan de Respuesta a Incidentes" prevalence="72% sin plan documentado y probado"
            mitigations={[
              "Roles y contactos: quién lidera la respuesta, quién decide pagar/no pagar, quién comunica externamente. Imprimir y guardar offline.",
              "Clasificación de incidentes: criterios de severidad; umbrales de escalación.",
              "Procedimientos de contención y erradicación: qué aislar, en qué orden, cómo restaurar desde backup.",
              "Tabletop Exercise semestral con facilitador externo. Invaluable para identificar brechas en el plan de respuesta.",
            ]}
          />

          <SectionHeading number="04" title="Marco de Inversión: Priorizar con Presupuesto Limitado" />
          <SubHeading title="Los 10 Controles CIS más Relevantes para Gobiernos LATAM" />
          <DataTable
            headers={["CIS Control", "Descripción", "Complejidad", "Reducción de Riesgo"]}
            rows={[
              ["CIS 1: Inventario de activos", "Conocer todos los dispositivos y software en la red", "Bajo (herramientas open-source)", "Alto: no puedes proteger lo que no conoces"],
              ["CIS 4: Configuración segura", "Hardening según benchmarks CIS", "Medio (tiempo de configuración)", "Muy Alto: elimina la mayoría de vulnerabilidades de configuración"],
              ["CIS 5: Gestión de cuentas", "IAM, MFA, least privilege, revisión periódica de accesos", "Medio (CIS IG2 requiere PAM)", "Muy Alto: mitiga el vector más explotado"],
              ["CIS 11: Recuperación de datos", "Backup automatizado + prueba regular + air-gapped", "Bajo-Medio", "Crítico: diferencia entre pagar rescate o recuperarse"],
              ["CIS 12: Gestión de red", "Segmentación básica + firewall + DNS filtering", "Medio", "Alto: limita el movimiento lateral"],
              ["CIS 13: Monitoreo y defensa", "Centralización de logs + alertas básicas", "Bajo (Wazuh open source)", "Alto: detecta intrusiones antes de daño completo"],
              ["CIS 14: Concienciación", "Capacitación + simulaciones de phishing", "Muy Bajo", "Alto: reduce el vector humano"],
              ["CIS 17: Gestión de respuesta", "Plan + roles + ejercicios tabletop", "Bajo", "Alto: reduce el costo de los incidentes que ocurren"],
              ["CIS 18: Pentesting", "Pentest anual de sistemas críticos", "Medio-Alto", "Alto: identifica vulnerabilidades antes que los atacantes"],
            ]}
          />

          <SubHeading title="Controles Recomendados por Tamaño de Entidad" />
          <DataTable
            headers={["Entidad", "Controles Prioritarios"]}
            rows={[
              ["Municipio pequeño (< 100K hab.)", "MFA + backup + concienciación + SOC tercerizado"],
              ["Municipio mediano (100K–500K hab.)", "SIEM básico + segmentación + IR plan"],
              ["Ciudad grande (> 500K hab.) / Gov. departamental", "SOC parcial + pentest anual + Zero Trust inicial"],
              ["Gobierno nacional (ministerios)", "SOC 24/7 + threat intelligence + NDR/XDR"],
            ]}
          />

          <SectionHeading number="05" title="Marco Regulatorio de Ciberseguridad para el Sector Público LATAM 2025" />
          <DataTable
            headers={["País", "Marco Principal", "Obligaciones para Entidades Públicas", "Estado 2025"]}
            rows={[
              ["Colombia", "CONPES 3995; Decreto 338/2022; Resolución MinTIC 2021", "MSPI obligatorio; reportes a ColCERT en < 6h; evaluaciones de riesgo anuales", "Marco avanzado; cumplimiento heterogéneo"],
              ["Chile", "Ley Marco de Ciberseguridad (Ley 21.663, 2024); CSIRT-GOB", "Notificación en 3h para incidentes críticos; designación de encargado de ciberseguridad", "Ley más completa de la región; en implementación"],
              ["Brasil", "Decreto 11.856/2023 (PNCS); ANPD LGPD; CTIR.GOV", "Reportes de incidentes a CTIR.GOV; LGPD aplica a datos de ciudadanos", "Marco robusto pero fragmentado entre agencias"],
              ["México", "Política Nacional de Ciberseguridad 2017 (en actualización); CNCS", "Sin obligaciones formales por ley para entidades subnacionales aún", "En proceso legislativo; brechas de cumplimiento grandes"],
              ["Perú", "DS 016-2021-PCM; RM 166-2022-PCM", "Implementación de controles mínimos; registro de incidentes", "Marco básico; implementación incipiente"],
              ["Ecuador", "Ley de Seguridad de la Información (en tramitación 2025); EcuCERT", "Provisional; reportes voluntarios a EcuCERT", "Marco más débil de países grandes; urge legislación"],
            ]}
          />

          <SectionHeading number="06" title="Respuesta a Incidentes: El Protocolo para Gobiernos" />
          <SubHeading title="Las Primeras 4 Horas de un Ransomware Gubernamental" />
          {[
            { t: "Minutos 0–30: Detección y Activación", items: ["Confirmar que es ransomware (vs. falla técnica): notas de rescate, archivos cifrados, comportamiento anómalo del sistema.", "NO reiniciar los sistemas afectados: destruye evidencia forense y puede acelerar el cifrado.", "Activar el equipo de respuesta: CISO (o jefe de TI), Secretario/a de área, Asesor Legal, Comunicaciones.", "Aislar físicamente los sistemas afectados de la red (desconectar cables Ethernet; no solo deshabilitar en software).", "Documentar todo desde el inicio: capturas de pantalla, hora de cada acción."] },
            { t: "Minutos 30–120: Contención y Evaluación", items: ["Identificar el alcance: ¿qué sistemas están afectados? ¿qué datos podrían haber sido exfiltrados?", "Aislar segmentos de red adicionales en riesgo.", "Evaluar estado de backups: ¿íntegros? ¿cuándo fue el último backup completo? ¿accesibles desde la red comprometida?", "Contactar proveedor de respuesta a incidentes (si hay contrato previo) o CSIRT/CERT nacional.", "Iniciar proceso de notificación regulatoria (plazos: 3h en Chile, 6h en Colombia)."] },
            { t: "Horas 2–4: Decisiones Críticas", items: ["¿Pagar o no pagar? Esta decisión requiere asesoría legal y conocimiento del estado de backups. La mayoría de expertos recomienda NO pagar: no garantiza recuperación, financia grupos criminales y convierte a la entidad en objetivo recurrente.", "Comunicación interna controlada: un canal único de información sobre el incidente.", "Preparar comunicación pública: los ciudadanos afectados tienen derecho a saber si sus datos fueron comprometidos."] },
          ].map(({ t, items }) => (
            <div key={t} className="mb-4 rounded-2xl border overflow-hidden" style={{ borderColor: `${A}30`, background: `${A}06` }}>
              <div className="px-5 py-3 border-b" style={{ borderColor: `${A}20`, background: `${A}10` }}>
                <p className="font-bold text-white text-sm">{t}</p>
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

          <SubHeading title="4 Lecciones de Incidentes Reales en Gobiernos LATAM" />
          <ul className="space-y-4 mb-6">
            {[
              { n: "1", t: "La transparencia inicial reduce el daño reputacional", d: "Los gobiernos que comunicaron rápida y honestamente el alcance (Costa Rica 2022; Ecuador Registro Civil 2024) experimentaron menor daño reputacional de largo plazo que los que intentaron minimizar o demorar la comunicación." },
              { n: "2", t: "Los backups offline son la diferencia entre 3 días y 3 semanas de recuperación", d: "Las entidades con backups air-gapped íntegros recuperaron operaciones críticas en 48–96 horas. Las que dependían de backups online (cifrados con todo lo demás) tardaron 2–8 semanas con impacto masivo en servicios ciudadanos." },
              { n: "3", t: "La continuidad de operaciones manual es subestimada", d: "Las entidades con procedimientos documentados de operación manual mantuvieron servicios mínimos. Las que no los tenían paralizaron toda la atención al ciudadano." },
              { n: "4", t: "El primer responder técnico determina el costo total", d: "Las decisiones técnicas en las primeras 2 horas determinan el costo total del incidente. Una respuesta incorrecta puede multiplicar el tiempo de recuperación por 3–5." },
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

          <SectionHeading number="07" title="Modelo de Madurez de Ciberseguridad Gubernamental" />
          <DataTable
            headers={["Nivel", "Denominación", "Descripción", "% Entidades Gov. LATAM (2025)"]}
            rows={[
              ["N1 — Reactivo", "Sin programa de seguridad", "Sin CISO; sin backups regulares; actúa solo tras incidente; ausencia total de cultura de seguridad", "41%"],
              ["N2 — Inicial", "Controles mínimos", "Antivirus + firewall básico; CISO designado (a tiempo parcial); backup periódico (no probado)", "29%"],
              ["N3 — Definido", "Programa básico consistente", "MFA en cuentas críticas; SIEM básico; plan de IR documentado; capacitación anual; backups probados", "18%"],
              ["N4 — Gestionado", "Programa maduro", "SOC (propio o tercerizado); gestión formal de vulnerabilidades; pentest anual; CISO dedicado; métricas", "9%"],
              ["N5 — Optimizado", "Referente nacional/regional", "Threat intelligence operacionalizada; Zero Trust en implementación; gestión de riesgo integrada", "3%"],
            ]}
          />
          <Callout type="success">
            <strong>Objetivo 2027 para gobiernos nacionales y ciudades {'>'} 500K hab.:</strong> Nivel N3 mínimo. El costo de elevar de N1 a N3 — <strong>USD 150,000–500,000</strong> según tamaño — es una fracción del costo de un solo incidente de ransomware (<strong>USD 2.8M promedio</strong>). El cálculo es simple: invertir o pagar.
          </Callout>
          <Callout type="info">
            <strong>La brecha no es principalmente tecnológica — es de capital humano y cultura organizacional.</strong> Las tres inversiones de mayor retorno a largo plazo: (1) CISO gubernamental real con experiencia técnica, autoridad y presupuesto propio. (2) Formación continua del equipo técnico: CompTIA Security+, CISSP/CISM, CEH/OSCP. (3) Tabletop exercises semestrales: USD 10,000–30,000 con facilitador externo. Ningún documento reemplaza la coordinación que genera un simulacro.
          </Callout>

          {/* Referencias */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <details className="group">
              <summary className="cursor-pointer text-sm font-bold text-white/50 hover:text-white/80 transition-colors flex items-center gap-2 list-none">
                <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] group-open:rotate-90 transition-transform">▶</span>
                Ver 28 fuentes y referencias
              </summary>
              <ol className="mt-6 space-y-2">
                {[
                  "IBM Security, \"X-Force Threat Intelligence Index 2025\", IBM, febrero 2025.",
                  "OEA, \"Reporte de Ciberseguridad en América Latina y el Caribe 2025\", OEA/CICTE, 2025.",
                  "BID, \"Ciberseguridad en el Sector Público Latinoamericano: Estado Actual y Recomendaciones 2025\", BID, Q1 2025.",
                  "OCDE, \"Digital Government Security Review: Latin America 2025\", OECD Publishing, 2025.",
                  "Mandiant / Google Cloud, \"M-Trends 2025: Threat Intelligence Report\", Mandiant, marzo 2025.",
                  "CrowdStrike, \"Global Threat Report 2025\" (capítulo América Latina), CrowdStrike Intelligence, febrero 2025.",
                  "ESET, \"LATAM Threat Landscape Report 2025\", ESET Research, 2025.",
                  "Dragos, \"OT/ICS Cybersecurity Year in Review 2024\" (sección LATAM), Dragos Inc., febrero 2025.",
                  "Tenable, \"State of Government Cyber Exposure 2025\", Tenable Research, 2025.",
                  "ISACA, \"State of Cybersecurity 2025: Latin America Regional Supplement — Government Sector\", ISACA, 2025.",
                  "Gartner, \"Government Security Operations: Market and Maturity Report 2025\", Gartner Research, 2025.",
                  "Center for Internet Security (CIS), \"CIS Controls v8.1: Implementation Guide for Government Agencies\", CIS, 2025.",
                  "CISA, \"Software Supply Chain Risk Management: Guidance for Government Entities\", CISA, 2024.",
                  "Cisco Talos, \"Government Security Assessment: Latin America 2025\", Cisco Talos Intelligence, 2025.",
                  "Shodan, \"Government Internet Exposure Report: Latin American Agencies\", Shodan Research, 2025.",
                  "Imperva, \"Government Data Security Report 2025\", Imperva Research, 2025.",
                  "Cohesity, \"Data Protection Survey: Government Sector 2025\", Cohesity, Q1 2025.",
                  "OCDE, \"Recommendations on Cybersecurity in Elections 2024\", OECD, 2024.",
                  "Carter Center, \"Digital Security in Elections: A Practitioner's Guide 2025\", Carter Center Democracy Programme, 2025.",
                  "Experian, \"Dark Web Pricing Guide: Value of Personal Data by Category 2025\", Experian, 2025.",
                  "INTERPOL, \"Financial Cybercrime Report 2024: Public Sector Targeting\", INTERPOL Cybercrime Programme, 2024.",
                  "NIST, \"SP 800-63B: Digital Identity Guidelines — Authentication and Lifecycle Management\", NIST, actualización 2024.",
                  "CEPAL, \"Regulación de Ciberseguridad en Sector Público de América Latina 2025\", CEPAL, marzo 2025.",
                  "Ley 21.663 de Chile, \"Ley Marco sobre Ciberseguridad e Infraestructura Crítica de la Información\", Diario Oficial de Chile, 2024.",
                  "Decreto 11.856/2023 de Brasil, \"Política Nacional de Cibersegurança\", Diário Oficial da União, 2023.",
                  "CONPES 3995, \"Política Nacional de Confianza y Seguridad Digital\", DNP Colombia, 2020.",
                  "Decreto 338/2022, \"Sistema de Seguridad Digital del Estado Colombiano\", Presidencia de la República de Colombia, 2022.",
                  "BID Incidentes Críticos Sector Público 2025; reportes de prensa verificados; comunicados oficiales de las entidades afectadas.",
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
              <Shield size={11} />Especialistas en Ciberseguridad Gubernamental
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">¿Dónde está su entidad<br />en el modelo de madurez?</h2>
            <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Realizamos evaluaciones de madurez de ciberseguridad para entidades gubernamentales y diseñamos planes de mejora priorizados por impacto y presupuesto disponible.
            </p>
            <Link href="/contacto" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5" style={{ background: A, color: "#fff" }}>
              Hablar con un especialista en ciberseguridad gubernamental
              <Activity size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
