"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Clock, Inbox, ListChecks, LogOut, MessageSquareText, RefreshCw } from "lucide-react";

/*
 * Vista de casos para clientes y demás solicitantes externos: el caso
 * consultado, su conversación pública e historial y, si la persona tiene más,
 * el resto de sus casos. Los datos vienen de la mesa de servicio (OSC One) por
 * /api/caso/consulta, con la sesión que deja el código de verificación.
 *
 * Fase actual: solo lectura. Responder y adjuntar documentos desde aquí queda
 * para una fase posterior.
 */

const CENTRO_URL = "/osc-connect/centro-de-servicio";
const CONSULTAR_URL = `${CENTRO_URL}#consultar`;

interface ResumenCaso {
  consecutivo: string;
  asunto: string;
  estado: string;
  esperando_respuesta: boolean;
  tipo: string;
  area: string;
  creado_en: string | null;
  actualizado_en: string | null;
}

interface DetalleCaso extends ResumenCaso {
  descripcion: string;
  pais: string | null;
  solicitante: string;
  mensajes: { de: "solicitante" | "osc"; texto: string; fecha: string | null }[];
  eventos: { tipo: string; estado: string; fecha: string | null }[];
}

type Carga<T> =
  | { fase: "cargando" }
  | { fase: "listo"; datos: T }
  | { fase: "sin-sesion" }
  | { fase: "error"; mensaje: string };

const ESTADOS: Record<string, { etiqueta: string; clases: string }> = {
  abierta: { etiqueta: "Recibido", clases: "bg-sky-100 text-sky-800" },
  en_proceso: { etiqueta: "En atención", clases: "bg-indigo-100 text-indigo-800" },
  en_espera: { etiqueta: "En espera", clases: "bg-amber-100 text-amber-800" },
  resuelta: { etiqueta: "Resuelto", clases: "bg-emerald-100 text-emerald-800" },
  cerrada: { etiqueta: "Cerrado", clases: "bg-slate-200 text-slate-700" },
  cancelada: { etiqueta: "Cancelado", clases: "bg-rose-100 text-rose-800" },
};

function estadoDe(c: Pick<ResumenCaso, "estado" | "esperando_respuesta">) {
  if (c.estado === "en_espera" && c.esperando_respuesta) {
    return { etiqueta: "Esperando su respuesta", clases: "bg-amber-100 text-amber-900" };
  }
  return ESTADOS[c.estado] ?? { etiqueta: c.estado, clases: "bg-slate-200 text-slate-700" };
}

const formato = new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" });
const fecha = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : formato.format(d);
};

async function consultar<T>(caso?: string): Promise<Carga<T>> {
  try {
    const res = await fetch(`/api/caso/consulta${caso ? `?caso=${encodeURIComponent(caso)}` : ""}`, { cache: "no-store" });
    const data = await res.json().catch(() => null);
    if (res.status === 401) return { fase: "sin-sesion" };
    if (!res.ok || !data) return { fase: "error", mensaje: data?.error ?? "No pudimos consultar la información. Intente de nuevo." };
    return { fase: "listo", datos: data as T };
  } catch {
    return { fase: "error", mensaje: "No hay conexión con el servidor. Revise su conexión e intente de nuevo." };
  }
}

function Pill({ caso }: { caso: Pick<ResumenCaso, "estado" | "esperando_respuesta"> }) {
  const e = estadoDe(caso);
  return <span className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ${e.clases}`}>{e.etiqueta}</span>;
}

export default function CasosClient() {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const [detalle, setDetalle] = useState<Carga<{ caso: DetalleCaso }>>({ fase: "cargando" });
  const [lista, setLista] = useState<Carga<{ casos: ResumenCaso[] }>>({ fase: "cargando" });
  const [verTodos, setVerTodos] = useState(false);

  const abrir = useCallback(async (consecutivo: string) => {
    setSeleccionado(consecutivo);
    setDetalle({ fase: "cargando" });
    window.history.replaceState(null, "", `?caso=${encodeURIComponent(consecutivo)}`);
    setDetalle(await consultar<{ caso: DetalleCaso }>(consecutivo));
  }, []);

  useEffect(() => {
    let vigente = true;
    const pedido = new URLSearchParams(window.location.search).get("caso");
    void (async () => {
      const casos = await consultar<{ casos: ResumenCaso[] }>();
      if (!vigente) return;
      setLista(casos);
      const primero = pedido ?? (casos.fase === "listo" ? casos.datos.casos[0]?.consecutivo : undefined);
      if (casos.fase === "sin-sesion") return setDetalle({ fase: "sin-sesion" });
      if (!primero) return setDetalle({ fase: "error", mensaje: "No hay casos registrados con su correo." });
      if (!pedido) setVerTodos(true);
      await abrir(primero);
    })();
    return () => {
      vigente = false;
    };
  }, [abrir]);

  async function salir() {
    await fetch("/api/caso/consulta", { method: "DELETE" }).catch(() => null);
    window.location.assign(CONSULTAR_URL);
  }

  const casos = lista.fase === "listo" ? lista.datos.casos : [];
  const sinSesion = detalle.fase === "sin-sesion" || lista.fase === "sin-sesion";
  const caso = detalle.fase === "listo" ? detalle.datos.caso : null;

  // Conversación e hitos en una sola línea de tiempo.
  const linea = caso
    ? [
        ...caso.mensajes.map((m) => ({ clase: "mensaje" as const, fecha: m.fecha, de: m.de, texto: m.texto })),
        ...caso.eventos
          .filter((e) => e.tipo !== "creacion")
          .map((e) => ({
            clase: "evento" as const,
            fecha: e.fecha,
            de: "osc" as const,
            texto: e.tipo === "reapertura" ? "El caso se reabrió" : `El caso pasó a «${estadoDe({ estado: e.estado, esperando_respuesta: false }).etiqueta}»`,
          })),
      ].sort((a, b) => (a.fecha ?? "").localeCompare(b.fecha ?? ""))
    : [];

  return (
    <>
      <section className="bg-[#0b1030] pt-36 pb-14 text-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
            <Link href="/osc-connect" className="text-white/60 no-underline hover:text-white">OSC Connect</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href={CENTRO_URL} className="text-white/60 no-underline hover:text-white">Centro de Servicio</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-white/90">Mis casos</span>
          </nav>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h1 className="m-0 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
              {caso ? <>Caso <span className="text-[#ff2d74]">{caso.consecutivo}</span></> : "Mis casos"}
            </h1>
            {!sinSesion && (
              <button
                type="button"
                onClick={() => void salir()}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <LogOut size={15} /> Cerrar consulta
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f6fb] py-12">
        <div className="mx-auto max-w-[1200px] px-6">
          {sinSesion ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
              <Clock size={40} className="mx-auto text-[#000086]" aria-hidden="true" />
              <h2 className="m-0 mt-4 text-xl font-bold text-[#0f172a]">Su consulta venció</h2>
              <p className="m-0 mt-2 text-sm leading-relaxed text-slate-600">
                Por seguridad, la consulta de casos dura 30 minutos. Escriba de nuevo su número de caso y le
                enviaremos otro código de verificación a su correo.
              </p>
              <Link
                href={CONSULTAR_URL}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e6004f] px-7 py-3 text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#c20043]"
              >
                <ArrowLeft size={16} /> Consultar un caso
              </Link>
            </div>
          ) : (
            <div className={`grid items-start gap-8 ${verTodos && casos.length > 1 ? "lg:grid-cols-[1fr_340px]" : ""}`}>
              <div className="min-w-0 space-y-6">
                {detalle.fase === "cargando" && (
                  <div role="status" className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
                    Consultando el caso…
                  </div>
                )}
                {detalle.fase === "error" && (
                  <div role="alert" className="rounded-3xl border border-amber-300 bg-amber-50 p-8 text-sm text-amber-900">
                    <p className="m-0">{detalle.mensaje}</p>
                    {seleccionado && (
                      <button
                        type="button"
                        onClick={() => void abrir(seleccionado)}
                        className="mt-3 inline-flex items-center gap-1.5 font-semibold underline underline-offset-2"
                      >
                        <RefreshCw size={14} /> Reintentar
                      </button>
                    )}
                  </div>
                )}
                {caso && (
                  <>
                    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
                      <div className="h-1.5 bg-gradient-to-r from-[#000086] via-[#3b3fd1] to-[#e6004f]" aria-hidden="true" />
                      <div className="p-7 sm:p-9">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h2 className="m-0 min-w-0 flex-1 break-words text-xl font-bold leading-snug text-[#0f172a]">{caso.asunto}</h2>
                          <Pill caso={caso} />
                        </div>
                        <dl className="m-0 mt-6 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                          {[
                            ["Tipo de solicitud", caso.tipo],
                            ["Lo atiende", caso.area],
                            ["Registrado", fecha(caso.creado_en)],
                            ["Última actualización", fecha(caso.actualizado_en)],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{k}</dt>
                              <dd className="m-0 mt-1 break-words text-[#0f172a]">{v || "—"}</dd>
                            </div>
                          ))}
                        </dl>
                        <h3 className="m-0 mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Descripción</h3>
                        <p className="m-0 mt-2 whitespace-pre-wrap break-words text-[15px] leading-[1.7] text-slate-700">{caso.descripcion}</p>
                      </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_40px_rgba(15,23,42,0.06)] sm:p-9">
                      <h2 className="m-0 flex items-center gap-2 text-lg font-bold text-[#0f172a]">
                        <MessageSquareText size={18} className="text-[#000086]" aria-hidden="true" /> Conversación e historial
                      </h2>
                      {linea.length === 0 ? (
                        <p className="m-0 mt-4 text-sm text-slate-500">
                          Aún no hay respuestas. Le avisaremos por correo cuando un especialista actualice su caso.
                        </p>
                      ) : (
                        <ol className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                          {linea.map((x, i) =>
                            x.clase === "evento" ? (
                              <li key={i} className="flex items-center gap-3 text-[13px] text-slate-500">
                                <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
                                <span>{x.texto} · {fecha(x.fecha)}</span>
                                <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
                              </li>
                            ) : (
                              <li
                                key={i}
                                className={`max-w-[88%] rounded-2xl px-4 py-3 ${
                                  x.de === "solicitante" ? "self-end rounded-br-md bg-[#000086] text-white" : "self-start rounded-bl-md bg-slate-100 text-[#0f172a]"
                                }`}
                              >
                                <p className={`m-0 text-xs font-semibold ${x.de === "solicitante" ? "text-white/70" : "text-[#000086]"}`}>
                                  {x.de === "solicitante" ? "Usted" : "Equipo OSC"} · {fecha(x.fecha)}
                                </p>
                                <p className="m-0 mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed">{x.texto}</p>
                              </li>
                            ),
                          )}
                        </ol>
                      )}
                      <p className="m-0 mt-6 rounded-xl bg-[#f5f6fb] px-4 py-3 text-[13px] text-slate-600">
                        Por ahora esta vista es de consulta. Para agregar información a su caso escriba al asistente
                        virtual de este sitio o llame al NOC indicando el número {caso.consecutivo}.
                      </p>
                    </article>
                  </>
                )}

                {casos.length > 1 && !verTodos && (
                  <button
                    type="button"
                    onClick={() => setVerTodos(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#000086] bg-white px-6 py-3 text-[15px] font-semibold text-[#000086] transition-colors hover:bg-[#000086] hover:text-white"
                  >
                    <ListChecks size={16} /> Ver todos mis casos ({casos.length})
                  </button>
                )}
              </div>

              {verTodos && casos.length > 1 && (
                <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.06)] lg:sticky lg:top-28">
                  <h2 className="m-0 flex items-center gap-2 text-base font-bold text-[#0f172a]">
                    <Inbox size={17} className="text-[#000086]" aria-hidden="true" /> Mis casos ({casos.length})
                  </h2>
                  <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
                    {casos.map((c) => (
                      <li key={c.consecutivo}>
                        <button
                          type="button"
                          onClick={() => void abrir(c.consecutivo)}
                          aria-current={c.consecutivo === seleccionado ? "true" : undefined}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                            c.consecutivo === seleccionado ? "border-[#000086] bg-[#000086]/5" : "border-slate-200 hover:border-[#000086]"
                          }`}
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-[#000086]">{c.consecutivo}</span>
                            <Pill caso={c} />
                          </span>
                          <span className="mt-1.5 block truncate text-sm text-[#0f172a]">{c.asunto}</span>
                          <span className="mt-0.5 block text-xs text-slate-500">{fecha(c.creado_en)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
