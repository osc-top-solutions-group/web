import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, LifeBuoy } from "lucide-react";
import { CaseLookup } from "../centro-de-servicio/CaseForms";
import { AbrirNova } from "@/components/agente/AbrirNova";
import { SolicitudForm } from "./SolicitudForm";

export const metadata: Metadata = {
  title: "Radicar una solicitud – OSC Connect",
  description:
    "PQRS, certificados laborales, proveedores, información comercial, cotizaciones y otras solicitudes: radique en línea, reciba su número y consulte el estado cuando quiera.",
};

const container = "max-w-[1200px] mx-auto px-6";

const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

const pasos = [
  { title: "Elija qué necesita", text: "Cada solicitud llega directo al área que la atiende." },
  { title: "Reciba su número", text: "Se lo mostramos al instante y se lo enviamos por correo." },
  { title: "Consulte el estado", text: "Con el número y un código que llega a su correo." },
];

export default function SolicitudesPage() {
  return (
    <>
      {/* Hero + consulta */}
      <section className="bg-[#0b1030] text-white pt-36 pb-24" style={gridBg}>
        <div className={`${container} grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16`}>
          <div className="flex flex-col items-start gap-6">
            <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Link href="/osc-connect" className="no-underline text-white/60 hover:text-white">OSC Connect</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="text-white/90">Radicar una solicitud</span>
            </nav>
            <span className="rounded-full border border-white/[0.22] px-4 py-[7px] text-xs font-semibold tracking-[0.18em] text-slate-300">
              ● SOLICITUDES EN LÍNEA
            </span>
            <h1 className="m-0 font-extrabold leading-[1.06] tracking-[-0.02em] text-[clamp(34px,4.4vw,56px)]">
              Su solicitud, <span className="text-[#ff2d74]">con número y seguimiento.</span>
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-[1.65] text-slate-300">
              PQRS, certificados laborales, proveedores, información comercial y cualquier otro
              requerimiento. Radique en línea y consulte el estado cuando quiera.
            </p>
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 rounded-full bg-[#e6004f] px-7 py-3.5 text-[15px] font-semibold text-white no-underline shadow-lg shadow-[#e6004f]/25 transition-colors hover:bg-[#c20043]"
            >
              Radicar una solicitud <ArrowRight size={16} />
            </a>
          </div>

          <div
            id="consultar"
            className="scroll-mt-28 rounded-3xl border border-white/[0.14] bg-white/[0.06] p-7 sm:p-9 backdrop-blur-sm shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          >
            <CaseLookup />
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="border-b border-slate-200 bg-[#f5f6fb] py-20">
        <div className={`${container} grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]`}>
          <div
            id="formulario"
            className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="h-1.5 bg-gradient-to-r from-[#000086] via-[#3b3fd1] to-[#e6004f]" aria-hidden="true" />
            <div className="p-8 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Formulario de solicitud</span>
              <h2 className="m-0 mt-2 text-2xl font-bold text-[#0f172a]">Radicar una solicitud</h2>
              <p className="m-0 mb-7 mt-2 text-sm leading-relaxed text-slate-600">
                Seleccione el tipo de solicitud y complete los datos. Los campos con * son obligatorios.
              </p>
              <SolicitudForm />
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#000086] text-white">
                <LifeBuoy size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 className="m-0 mt-5 text-xl font-bold text-[#0f172a]">¿Es cliente con un servicio activo?</h2>
              <p className="m-0 mt-2 text-[15px] leading-[1.7] text-slate-600">
                Las fallas, cambios y requerimientos sobre un servicio contratado se atienden en el
                Centro de Servicio al Cliente, con severidad y tiempos de respuesta.
              </p>
              <Link
                href="/osc-connect/centro-de-servicio#formulario"
                className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-[#000086] no-underline hover:text-[#e6004f]"
              >
                Ir al Centro de Servicio <ArrowRight size={15} />
              </Link>
            </div>

            <div
              className="rounded-3xl p-8 text-white shadow-[0_30px_60px_rgba(0,0,60,0.25)]"
              style={{ background: "linear-gradient(135deg, #000086 0%, #00005e 100%)" }}
            >
              <h2 className="m-0 text-xl font-bold">¿Prefiere conversar?</h2>
              <p className="m-0 mt-2 text-[15px] leading-[1.7] text-[#dfe2ff]">
                NOVA, nuestro asistente virtual, resuelve dudas y radica la misma solicitud por usted, 24/7.
              </p>
              <AbrirNova className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[#000086] transition-colors hover:bg-white/90">
                Conversar con NOVA <ArrowRight size={15} />
              </AbrirNova>
            </div>

            <ol className="m-0 grid list-none gap-5 rounded-3xl border border-slate-200 bg-white p-8">
              {pasos.map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#000086] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="m-0 text-[15px] font-bold text-[#0f172a]">{p.title}</p>
                    <p className="m-0 mt-1 text-sm leading-relaxed text-slate-600">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
