import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  ChevronRight,
  FileText,
  LifeBuoy,
  Mail,
  MessageSquareText,
  Search,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { CaseForm, CaseLookup } from "./CaseForms";
import { AbrirNova } from "@/components/agente/AbrirNova";

export const metadata: Metadata = {
  title: "Centro de Servicio al Cliente – OSC Connect",
  description:
    "Un caso. Cualquier canal. Una sola respuesta. Reporte, solicite y haga seguimiento a sus casos con OSC desde el canal que prefiera.",
};

/* El asistente NOVA se abre con <AbrirNova> (el mismo chat flotante del sitio). */
const SUPPORT_EMAIL = "soporte@osctopsolutionsgroup.com"; // por confirmar

function ActionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Disponible próximamente"
        className={`${className} opacity-60 cursor-not-allowed`}
      >
        {children}
      </span>
    );
  }
  const external = /^(https?:|tel:|mailto:)/.test(href);
  return external ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const intents = [
  { icon: ShieldAlert, title: "Reportar una falla crítica", sub: "Servicio caído o en riesgo", href: "#formulario", alert: true },
  { icon: Wrench, title: "Hacer una solicitud", sub: "Cambio, ajuste o nuevo requerimiento", href: "#formulario" },
  { icon: Search, title: "Consultar un caso", sub: "Ver estado o agregar información", href: "#consultar" },
  { icon: LifeBuoy, title: "Resolver una duda", sub: "Uso, configuración o facturación", href: "#nova" },
];

const channels = [
  {
    icon: Bot,
    title: "NOVA · Agente IA",
    tag: "24/7",
    text: "Abre casos, consulta su estado y resuelve dudas frecuentes. Si hace falta, lo pasa a una persona con todo el contexto.",
    cta: "Conversar con NOVA",
    href: "",
    nova: true,
  },
  {
    icon: FileText,
    title: "Formulario de caso",
    tag: "24/7 · respuesta según severidad",
    text: "Para solicitudes con detalle técnico, sitio y servicio afectado. Recibe el número de caso al instante.",
    cta: "Abrir un caso",
    href: "#formulario",
  },
  {
    icon: Mail,
    title: "Correo de soporte",
    tag: "Crea el caso automáticamente",
    text: `Escriba a ${SUPPORT_EMAIL} y reciba su número de caso por respuesta.`,
    cta: "Escribir a soporte",
    href: `mailto:${SUPPORT_EMAIL}`,
  },
];

const steps = [
  { title: "Usted elige el canal", text: "NOVA, formulario, correo, NOC o portal." },
  { title: "Se crea un caso único", text: "Recibe su número de caso por correo." },
  { title: "Se clasifica por severidad", text: "P1 a P4 define el tiempo de respuesta." },
  { title: "Lo atiende un especialista", text: "Del equipo de la solución contratada." },
  { title: "Cierre y encuesta", text: "Usted confirma la solución y califica la atención." },
];

const levels = [
  { level: "Nivel 1", who: "Mesa de servicio y NOC", text: "Recibe, clasifica y resuelve la mayoría de los casos.", bar: "bg-[#7c83ff]" },
  { level: "Nivel 2", who: "Especialistas de la solución", text: "Toman los casos técnicos complejos o recurrentes.", bar: "bg-[#3b3fd1]" },
  { level: "Nivel 3", who: "Gerente de cuenta y Dirección de Operaciones", text: "Interviene si se vence el tiempo acordado o el impacto lo exige.", bar: "bg-[#000086]" },
];

const faqs = [
  { q: "¿En qué se diferencia de Contacto?", a: "El Centro de Servicio es para clientes con servicios activos. Contacto es para conversar sobre proyectos nuevos con un experto comercial." },
  { q: "¿Necesito mi número de contrato?", a: "Ayuda a ubicar su servicio más rápido. Si no lo tiene a mano, NOVA o la mesa lo identifican con su correo corporativo." },
  { q: "¿Puedo cambiar de canal a mitad de un caso?", a: "Sí. Indique su número de caso en cualquier canal y verá el mismo historial." },
  { q: "¿Cómo califico la atención?", a: "Al cerrar el caso recibe una encuesta corta por correo." },
];

const chat = [
  { me: false, t: "Hola, soy NOVA. ¿Es cliente de OSC o busca una nueva solución?" },
  { me: true, t: "Soy cliente. Una cámara del perímetro no transmite desde esta mañana." },
  { me: false, t: "Entendido. ¿En qué sitio está y está afectando la operación?" },
  { me: true, t: "Subestación Norte. Otras cámaras cubren la zona." },
  { me: false, t: "Registré el caso SAC-[NÚMERO] con severidad P3. Le envié la confirmación a su correo; un especialista lo contactará dentro del tiempo acordado." },
];

const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

const container = "max-w-[1200px] mx-auto px-6";
const btn = "inline-flex items-center gap-2 rounded-full text-[15px] font-semibold no-underline transition-colors";

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className={`mb-12 grid gap-4 ${text ? "lg:grid-cols-2 lg:items-end lg:gap-16" : ""}`}>
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-[3px] w-8 rounded-full bg-[#e6004f]" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</span>
        </div>
        <h2 className="m-0 text-[clamp(26px,3vw,38px)] font-bold leading-[1.12] tracking-[-0.01em] text-[#0f172a]">
          {title}
        </h2>
      </div>
      {text && <p className="m-0 text-base leading-[1.7] text-slate-600 lg:max-w-[480px]">{text}</p>}
    </div>
  );
}

export default function CentroDeServicioPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0b1030] text-white pt-36 pb-40" style={gridBg}>
        <div className={`${container} grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16`}>
          <div className="flex flex-col items-start gap-6">
            <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Link href="/osc-connect" className="no-underline text-white/60 hover:text-white">OSC Connect</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span>Clientes</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="text-white/90">Centro de Servicio</span>
            </nav>
            <span className="rounded-full border border-white/[0.22] px-4 py-[7px] text-xs font-semibold tracking-[0.18em] text-slate-300">
              ● CENTRO DE SERVICIO AL CLIENTE
            </span>
            <h1 className="m-0 font-extrabold leading-[1.06] tracking-[-0.02em] text-[clamp(34px,4.4vw,56px)]">
              Un caso. Cualquier canal. <span className="text-[#ff2d74]">Una sola respuesta.</span>
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-[1.65] text-slate-300">
              Para clientes con servicios activos de OSC. Reporte, solicite y haga seguimiento desde
              el canal que prefiera: todo llega al mismo caso y nadie le pide repetir la historia.
            </p>
          </div>

          <div
            id="consultar"
            className="scroll-mt-28 rounded-3xl border border-white/[0.14] bg-white/[0.06] p-7 sm:p-9 backdrop-blur-sm shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          >
            <CaseLookup />
          </div>
        </div>
      </section>

      {/* ¿Qué necesita hoy? (se superpone al hero) */}
      <section className="relative pb-20">
        <div className="absolute inset-x-0 bottom-0 top-24 bg-white" aria-hidden="true" />
        <div className={`${container} relative -mt-24`}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-5">
            {intents.map((i) => (
              <a
                key={i.title}
                href={i.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 no-underline shadow-[0_20px_40px_rgba(15,23,42,0.10)] transition-all hover:-translate-y-1 hover:shadow-[0_26px_50px_rgba(15,23,42,0.16)]"
              >
                <span
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                    i.alert ? "bg-[#e6004f] text-white" : "bg-[#000086] text-white"
                  }`}
                >
                  <i.icon size={22} strokeWidth={1.75} />
                </span>
                <p className="m-0 text-[17px] font-bold leading-snug text-[#0f172a]">{i.title}</p>
                <p className="m-0 mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{i.sub}</p>
                <ArrowRight
                  size={18}
                  className="mt-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#e6004f]"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Canales */}
      <section id="canales" className="scroll-mt-28 border-y border-slate-200 bg-[#f5f6fb] py-24">
        <div className={container}>
          <SectionHeader
            eyebrow="Canales de servicio"
            title="Elija el canal. El caso es el mismo."
            text="Todos los canales están conectados a la misma mesa de servicio. Puede empezar con NOVA y terminar por correo sin perder el historial."
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
            {channels.map((c, i) => (
              <article
                key={c.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-xl"
              >
                <span
                  className="absolute right-6 top-4 select-none text-6xl font-extrabold leading-none text-slate-100"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <span className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#000086]/10 text-[#000086]">
                  <c.icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="relative m-0 text-xl font-bold text-[#0f172a]">{c.title}</h3>
                <p className="relative m-0 mt-1.5 text-[13px] font-semibold text-[#000086]">{c.tag}</p>
                <p className="relative m-0 mt-4 flex-1 text-[15px] leading-[1.7] text-slate-600">{c.text}</p>
                {"nova" in c ? (
                  <AbrirNova className={`${btn} relative mt-6 self-start bg-transparent p-0 text-[#000086] hover:text-[#e6004f]`}>
                    {c.cta} <ArrowRight size={15} />
                  </AbrirNova>
                ) : (
                  <ActionLink
                    href={c.href}
                    className={`${btn} relative mt-6 self-start text-[#000086] hover:text-[#e6004f]`}
                  >
                    {c.cta} <ArrowRight size={15} />
                  </ActionLink>
                )}
                <span
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#e6004f] transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-white py-24">
        <div className={container}>
          <SectionHeader eyebrow="Cómo funciona" title="De cualquier canal a un solo caso" />
          <div className="relative">
            <div
              className="absolute left-[10%] right-[10%] top-[19px] hidden h-px bg-slate-300 lg:block"
              aria-hidden="true"
            />
            <ol className="relative m-0 grid list-none gap-8 p-0 lg:grid-cols-5 lg:gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 lg:flex-col lg:items-center lg:gap-5 lg:text-center">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#000086] text-sm font-bold text-white ring-8 ring-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="m-0 text-base font-bold text-[#0f172a]">{s.title}</p>
                    <p className="m-0 mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className="m-0 mt-12 rounded-2xl bg-[#f5f6fb] px-6 py-5 text-center text-[15px] text-slate-700">
            Si cambia de canal, el caso lo sigue: NOVA, el correo, el portal y el NOC ven el mismo historial.
          </p>
        </div>
      </section>

      {/* Formulario + NOVA */}
      <section className="border-y border-slate-200 bg-[#f5f6fb] py-24">
        <div className={`${container} grid items-start gap-8 lg:grid-cols-2`}>
          <div
            id="formulario"
            className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="h-1.5 bg-gradient-to-r from-[#000086] via-[#3b3fd1] to-[#e6004f]" aria-hidden="true" />
            <div className="p-8 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Formulario de caso</span>
              <h2 className="m-0 mt-2 text-2xl font-bold text-[#0f172a]">Abrir un caso</h2>
              <p className="m-0 mb-7 mt-2 text-sm leading-relaxed text-slate-600">
                Exclusivo para clientes. ¿PQRS, certificados, proveedores u otro trámite?{" "}
                <Link href="/osc-connect/solicitudes" className="font-semibold text-[#000086] hover:text-[#e6004f]">
                  Radique una solicitud
                </Link>
                . ¿Busca un proyecto nuevo?{" "}
                <Link href="/contacto" className="font-semibold text-[#000086] hover:text-[#e6004f]">
                  Use Contacto
                </Link>
                .
              </p>
              <CaseForm />
            </div>
          </div>

          <div
            id="nova"
            className="scroll-mt-28 overflow-hidden rounded-3xl text-white shadow-[0_30px_60px_rgba(0,0,60,0.25)]"
            style={{ background: "linear-gradient(135deg, #000086 0%, #00005e 100%)" }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-8 py-5 sm:px-10">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <Bot size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="m-0 text-base font-bold">NOVA · Asistente de servicio</p>
                  <p className="m-0 flex items-center gap-2 text-[13px] text-white/70">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" /> En línea · 24/7
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">Ejemplo</span>
            </div>
            <div className="px-8 py-7 sm:px-10">
              <div className="flex flex-col gap-3 text-[15px] leading-relaxed">
                {chat.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[88%] rounded-2xl px-4 py-3 ${
                      m.me
                        ? "self-end rounded-br-md bg-[#e6004f] text-white"
                        : "self-start rounded-bl-md bg-white/10 text-white/90"
                    }`}
                  >
                    {m.t}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {["Consultar mi caso", "Hablar con una persona", "Es una falla crítica"].map((c) => (
                  <span key={c} className="rounded-full border border-white/25 px-4 py-2 text-[13px] font-semibold text-white/90">
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white/50">
                <MessageSquareText size={16} aria-hidden="true" /> Mensaje para NOVA
              </div>
              <AbrirNova className={`${btn} mt-6 bg-white px-6 py-3 text-[#000086] hover:bg-white/90`}>
                Conversar con NOVA <ArrowRight size={15} />
              </AbrirNova>
            </div>
          </div>
        </div>
      </section>

      {/* Escalamiento */}
      <section className="bg-white py-24">
        <div className={container}>
          <SectionHeader eyebrow="Escalamiento" title="Si su caso no avanza, sabe a quién acudir" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
            {levels.map((l) => (
              <article key={l.level} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8">
                <span className={`absolute inset-y-0 left-0 w-1.5 ${l.bar}`} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#000086]">{l.level}</span>
                <h3 className="m-0 mt-3 text-xl font-bold leading-snug text-[#0f172a]">{l.who}</h3>
                <p className="m-0 mt-3 text-[15px] leading-[1.7] text-slate-600">{l.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-slate-200 bg-[#f5f6fb] py-24">
        <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20`}>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#e6004f]" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Preguntas frecuentes</span>
            </div>
            <h2 className="m-0 text-[clamp(26px,3vw,38px)] font-bold leading-[1.12] tracking-[-0.01em] text-[#0f172a]">
              Antes de abrir un caso
            </h2>
          </div>
          <div className="divide-y divide-slate-300 border-y border-slate-300">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-[#0f172a] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-[#000086] transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="m-0 mt-3 max-w-[560px] text-[15px] leading-[1.7] text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-white py-20">
        <div className={container}>
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-12 text-white shadow-[0_30px_60px_rgba(0,0,60,0.25)] sm:px-14"
            style={{
              background:
                "radial-gradient(ellipse 60% 90% at 100% 0%, rgba(99,102,255,0.28) 0%, transparent 60%), linear-gradient(135deg, #000086 0%, #00005e 100%)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "linear-gradient(90deg, #e6004f 0%, #e6004f 18%, transparent 60%)" }} aria-hidden="true" />
            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="m-0 text-[clamp(22px,2.6vw,32px)] font-bold leading-[1.15]">
                  ¿Busca un nuevo proyecto para su operación?
                </h2>
                <p className="m-0 mt-2 text-base text-[#dfe2ff]">Nuestro equipo comercial lo atiende en Contacto.</p>
              </div>
              <Link
                href="/contacto"
                className={`${btn} bg-[#e6004f] px-8 py-4 text-white shadow-lg shadow-[#e6004f]/25 hover:bg-[#c20043]`}
              >
                Hablar con un experto <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
