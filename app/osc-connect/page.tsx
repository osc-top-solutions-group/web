import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardList, ShieldAlert } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "OSC Connect – OSC Top Solutions",
  description:
    "El ecosistema digital de OSC: Centro de Servicio al Cliente, OSC Nexus, Supplier Connection y Careers.",
};

const SERVICE_CENTER_URL = "/osc-connect/centro-de-servicio";
const SERVICE_CASE_URL = "/osc-connect/centro-de-servicio#consultar";

const audiences = [
  { label: "Soy cliente", href: "#clientes" },
  { label: "Soy colaborador", href: "#nexus" },
  { label: "Soy proveedor", href: "#proveedores" },
  { label: "Busco empleo", href: "#careers" },
];

const serviceFeatures = [
  { icon: ShieldAlert, text: "Reporte de fallas críticas 24x7 con el NOC" },
  { icon: ClipboardList, text: "Apertura y seguimiento de casos" },
  { icon: BookOpen, text: "Historial, reportes y base de conocimiento" },
];

const portals = [
  {
    id: "nexus",
    eyebrow: "Colaboradores",
    title: "OSC Nexus",
    description:
      "Portal interno para colaboradores de OSC: recursos, comunicados internos, herramientas de gestión y la comunidad OSC.",
    features: [
      "Documentos y políticas corporativas",
      "Comunicados y novedades internas",
      "Herramientas de gestión de proyectos",
      "Directorio de colaboradores",
    ],
    cta: "Acceder a Nexus",
    href: "https://intranet.osctopsolutionsgroup.com/",
  },
  {
    id: "proveedores",
    eyebrow: "Proveedores",
    title: "Supplier Connection",
    description:
      "Plataforma para proveedores y socios tecnológicos de OSC: contratos, documentación y comunicación directa.",
    features: [
      "Registro y homologación de proveedores",
      "Gestión de órdenes de compra",
      "Documentación contractual",
      "Seguimiento de pagos y facturas",
    ],
    cta: "Portal de proveedores",
    href: "https://portal-proveedores.osctopsolutionsgroup.com/",
  },
  {
    id: "careers",
    eyebrow: "Talento",
    title: "Careers",
    description:
      "Construya su carrera en la empresa que lidera la transformación tecnológica de infraestructuras críticas en América.",
    features: ["Oportunidades en 16 países", "Desarrollo profesional acelerado"],
    cta: "Ver vacantes",
    href: "https://osctopsolutionsgroup.zohorecruit.com/jobs/Careers",
  },
];

const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

export default function OscConnectPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0b1030] text-white pt-40 pb-[270px]" style={gridBg}>
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center gap-[22px]">
          <span className="rounded-full border border-white/[0.22] px-4 py-[7px] text-xs font-semibold tracking-[0.18em] text-slate-300">
            ● OSC CONNECT
          </span>
          <h1 className="m-0 font-extrabold leading-[1.06] tracking-[-0.02em] text-[clamp(38px,4.6vw,62px)]">
            El ecosistema digital <span className="text-[#ff2d74]">de OSC</span>
          </h1>
          <p className="m-0 text-lg leading-[1.6] text-slate-300 max-w-[680px]">
            Cuatro portales para conectar a clientes, colaboradores, proveedores y talento con el
            mundo OSC. Elija el suyo.
          </p>
          <nav aria-label="Portales" className="flex flex-wrap justify-center gap-2.5 mt-1.5">
            {audiences.map((a, i) => (
              <a
                key={a.href}
                href={a.href}
                className={`rounded-full text-sm font-semibold no-underline transition-colors ${
                  i === 0
                    ? "bg-white text-[#000086] px-5 py-[11px] hover:bg-white/90"
                    : "border border-white/40 text-white px-5 py-2.5 hover:bg-white/10"
                }`}
              >
                {a.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Portales */}
      <section className="relative pb-24">
        {/* El blanco arranca bajo el hero para que el azul oscuro quede detrás de la tarjeta */}
        <div className="absolute inset-x-0 bottom-0 top-[210px] bg-white" aria-hidden="true" />
        <div className="relative max-w-[1200px] mx-auto px-6 -mt-[210px] flex flex-col gap-6">
          {/* Centro de Servicio al Cliente */}
          <AnimatedSection direction="none">
            <article
              id="clientes"
              className="scroll-mt-28 relative overflow-hidden rounded-3xl text-white p-6 sm:p-12 shadow-[0_30px_60px_rgba(0,0,60,0.3)] ring-1 ring-white/10"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(99,102,255,0.28) 0%, transparent 60%), linear-gradient(135deg, #000086 0%, #00005e 100%)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: "linear-gradient(90deg, #e6004f 0%, #e6004f 18%, transparent 60%)" }}
                aria-hidden="true"
              />
              <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#c7cbff]">
                      CLIENTES
                    </span>
                    <span className="bg-[#e6004f] text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full">
                      NUEVO
                    </span>
                  </div>
                  <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.01em] text-[clamp(28px,3vw,40px)]">
                    Centro de Servicio al Cliente
                  </h2>
                  <p className="m-0 text-base leading-[1.7] text-[#dfe2ff] max-w-[520px]">
                    Para empresas con servicios activos de OSC. Reporte incidentes, abra solicitudes
                    y siga sus casos desde el canal que prefiera: todo llega al mismo caso.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Link
                      href={SERVICE_CENTER_URL}
                      className="inline-flex items-center gap-2 bg-[#e6004f] hover:bg-[#c20043] text-white no-underline font-semibold text-[15px] px-7 py-3.5 rounded-full shadow-lg shadow-[#e6004f]/25 transition-colors"
                    >
                      Ir al Centro de Servicio <ArrowRight size={16} />
                    </Link>
                    <Link
                      href={SERVICE_CASE_URL}
                      className="inline-flex items-center border border-white/40 hover:bg-white/10 text-white no-underline font-semibold text-[15px] px-6 py-[13px] rounded-full transition-colors"
                    >
                      Consultar un caso
                    </Link>
                  </div>
                </div>

                <ul className="m-0 p-0 list-none flex flex-col gap-3">
                  {serviceFeatures.map((f) => (
                    <li
                      key={f.text}
                      className="flex items-center gap-4 rounded-2xl border border-white/[0.14] bg-white/[0.06] backdrop-blur-sm px-5 py-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                        <f.icon size={20} strokeWidth={1.75} />
                      </span>
                      <span className="text-[15px] font-medium leading-snug">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </AnimatedSection>

          {/* Colaboradores · Proveedores · Talento */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
            {portals.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.12}>
                <article
                  id={p.id}
                  className="scroll-mt-28 h-full bg-white border border-slate-200 rounded-[20px] p-8 flex flex-col gap-3.5"
                >
                  <span className="text-xs font-semibold tracking-[0.16em] text-slate-600 uppercase">
                    {p.eyebrow}
                  </span>
                  <h2 className="m-0 text-2xl font-bold text-[#0f172a]">{p.title}</h2>
                  <p className="m-0 text-[15px] leading-[1.6] text-slate-600">{p.description}</p>
                  <ul className="m-0 p-0 list-none flex flex-col gap-2 text-sm text-slate-700 flex-1">
                    {p.features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start border-2 border-[#000086] text-[#000086] hover:text-[#e6004f] hover:border-[#e6004f] no-underline font-semibold text-sm px-5 py-[11px] rounded-full transition-colors"
                  >
                    {p.cta} →
                  </a>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-slate-200 bg-[#f5f6fb]">
        <div className="max-w-[1200px] mx-auto px-6 py-14 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <strong className="text-[22px] text-[#0f172a]">¿Aún no es cliente de OSC?</strong>
            <span className="text-[15px] text-slate-600">
              Hable con un experto sobre su próximo proyecto.
            </span>
          </div>
          <Link
            href="/contacto"
            className="bg-[#e6004f] hover:bg-[#c20043] text-white no-underline font-semibold px-[26px] py-3.5 rounded-full transition-colors"
          >
            Ir a Contacto →
          </Link>
        </div>
      </section>
    </>
  );
}
