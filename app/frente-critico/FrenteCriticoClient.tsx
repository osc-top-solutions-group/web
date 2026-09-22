"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Clock, MessageSquare, ShieldCheck, FileText, BarChart3, Send, Check, AlertCircle } from "lucide-react";
import { COUNTRIES, SECTORES, HORIZONTES } from "@/lib/forms";
import styles from "./page.module.css";

/**
 * Landing de captación de prioridades operativas.
 *
 * Queda fuera de `SiteShell` (ver el arreglo `standalone` allí): trae su propio
 * encabezado y pie porque la navegación completa del sitio le daría al visitante
 * salidas en lugar de un formulario.
 */

const FRENTES = [
  { nombre: "Continuidad",  texto: "La operación se detiene y el tiempo de recuperación no es predecible ni medible." },
  { nombre: "Visibilidad",  texto: "Hay datos en todas partes, pero nadie ve el estado real de los activos en un solo lugar." },
  { nombre: "Capacidad",    texto: "La infraestructura llegó a su techo y la expansión compite con el presupuesto operativo." },
  { nombre: "Resiliencia",  texto: "Un evento aislado —clima, corte, incidente— arrastra al resto de la operación con él." },
] as const;

const VACIO = {
  nombre: "", email: "", empresa: "", cargo: "",
  pais: "", sector: "", prioridad: "", horizonte: "", telefono: "",
};

type Campo = keyof typeof VACIO | "consent";

/** Etiqueta y mensaje por campo obligatorio. El orden define el del resumen de errores. */
const REGLAS: { campo: Campo; label: string; msg: string }[] = [
  { campo: "nombre",    label: "Nombre y apellido",       msg: "Indíquenos su nombre para saber a quién responder." },
  { campo: "email",     label: "Correo corporativo",      msg: "Escriba un correo válido, por ejemplo nombre@suempresa.com." },
  { campo: "empresa",   label: "Empresa",                 msg: "Indique la empresa de la operación." },
  { campo: "pais",      label: "País de la operación",    msg: "Seleccione el país de la operación." },
  { campo: "sector",    label: "Sector",                  msg: "Seleccione el sector de la operación." },
  { campo: "prioridad", label: "Prioridad más crítica",   msg: "Describa el frente crítico, aunque sea en una línea." },
  { campo: "horizonte", label: "Horizonte de atención",   msg: "Elija el horizonte de atención." },
  { campo: "consent",   label: "Autorización de contacto", msg: "Necesitamos su autorización para poder contactarle." },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FrenteCriticoClient() {
  const [form, setForm] = useState(VACIO);
  const [consent, setConsent] = useState(false);
  const [errores, setErrores] = useState<Partial<Record<Campo, string>>>({});
  const [fallidos, setFallidos] = useState<typeof REGLAS>([]);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const prioridadRef = useRef<HTMLTextAreaElement>(null);
  const resumenRef = useRef<HTMLDivElement>(null);
  const exitoRef = useRef<HTMLHeadingElement>(null);

  const set = (campo: keyof typeof VACIO, valor: string) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  const validar = (campo: Campo): string => {
    const regla = REGLAS.find((r) => r.campo === campo);
    if (!regla) return "";
    if (campo === "consent") return consent ? "" : regla.msg;
    const v = form[campo as keyof typeof VACIO].trim();
    if (!v) return regla.msg;
    if (campo === "email" && !EMAIL_RE.test(v)) return regla.msg;
    return "";
  };

  /** Al elegir un frente, siembra la respuesta abierta para que no arranque en blanco. */
  const usarFrente = (nombre: string) => {
    setForm((f) => {
      let resto = f.prioridad;
      for (const fr of FRENTES) {
        if (resto.startsWith(`${fr.nombre} — `)) resto = resto.slice(fr.nombre.length + 3);
      }
      return { ...f, prioridad: `${nombre} — ${resto}` };
    });
    const el = prioridadRef.current;
    if (el) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => {
        el.focus({ preventScroll: true });
        el.setSelectionRange(el.value.length, el.value.length);
      }, 450);
    }
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEnvio(null);

    const nuevos: Partial<Record<Campo, string>> = {};
    const malos: typeof REGLAS = [];
    for (const regla of REGLAS) {
      const msg = validar(regla.campo);
      if (msg) {
        nuevos[regla.campo] = msg;
        malos.push(regla);
      }
    }
    setErrores(nuevos);
    setFallidos(malos);

    if (malos.length) {
      window.setTimeout(() => resumenRef.current?.focus(), 0);
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/frente-critico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          empresa: form.empresa,
          cargo: form.cargo || null,
          email: form.email,
          telefono: form.telefono || null,
          pais: form.pais,
          sector: form.sector,
          horizonte: form.horizonte,
          prioridad: form.prioridad,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "No pudimos registrar su prioridad.");
      }
      setEnviado(true);
      window.setTimeout(() => exitoRef.current?.focus(), 0);
    } catch (err) {
      setErrorEnvio(
        err instanceof Error
          ? `${err.message} Vuelva a intentarlo, o escríbanos a contacto@osctopsolutionsgroup.com.`
          : "No pudimos registrar su prioridad. Vuelva a intentarlo en unos minutos.",
      );
    } finally {
      setEnviando(false);
    }
  };

  const Error_ = ({ campo }: { campo: Campo }) =>
    errores[campo] ? (
      <p className={styles.err} id={`e-${campo}`} role="alert">
        <AlertCircle size={13} aria-hidden="true" />
        <span>{errores[campo]}</span>
      </p>
    ) : null;

  const clase = (campo: Campo, base = styles.fld) =>
    errores[campo] ? `${base} ${styles.invalid}` : base;

  return (
    <div className={styles.page}>
      <a className={styles.srOnly} href="#formulario">Saltar al formulario</a>

      <header className={styles.hdr}>
        <div className={`${styles.wrap} ${styles.hdrIn}`}>
          <span className={styles.logo}>
            <Image src="/logo-30anos.png" width={900} height={243} alt="OSC Top Solutions Group — 30 años" priority />
          </span>
          <a className={styles.btn} href="#formulario">
            Compartir mi prioridad <span className={styles.arw} aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={`${styles.wrap} ${styles.band} ${styles.heroInner}`}>
            <div>
              <p className={styles.eyebrow}>Diagnóstico de prioridades operativas</p>
              <h1>¿Cuál es hoy el frente más crítico de su operación?</h1>
              <p className={styles.lede}>
                Descríbalo en una línea. Recibirá una lectura inicial de su contexto
                —continuidad, capacidad, resiliencia— escrita por alguien del equipo de
                OSC que conoce su sector.
              </p>
              <div className={styles.heroCta}>
                <a className={`${styles.btn} ${styles.btnLg}`} href="#formulario">
                  Compartir mi prioridad <span className={styles.arw} aria-hidden="true">→</span>
                </a>
                <p className={styles.heroMicro}>
                  <b>Toma 1 minuto</b>Respuesta en 48 horas hábiles
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.assure}>
          <div className={`${styles.wrap} ${styles.assureGrid}`}>
            <div className={styles.assureItem}>
              <Clock size={17} aria-hidden="true" />
              <span><b>Toma 1 minuto.</b><span>Siete campos y una respuesta abierta.</span></span>
            </div>
            <div className={styles.assureItem}>
              <MessageSquare size={17} aria-hidden="true" />
              <span><b>Respuesta en 48 horas hábiles.</b><span>Por correo, de una persona del equipo.</span></span>
            </div>
            <div className={styles.assureItem}>
              <ShieldCheck size={17} aria-hidden="true" />
              <span><b>Sin presentación comercial.</b><span>Un intercambio técnico, no una demo.</span></span>
            </div>
          </div>
        </section>

        <section className={`${styles.tension} ${styles.band}`}>
          <div className={styles.wrap}>
            <div className={styles.secHead}>
              <h2>¿En qué frente está hoy la presión?</h2>
              <p>
                Estas son las cuatro tensiones que más vemos en operaciones críticas. Elija la
                suya para empezar el formulario con ese frente, o escriba el suyo tal cual si es otro.
              </p>
            </div>
            <div className={styles.tGrid}>
              {FRENTES.map((f) => (
                <button
                  key={f.nombre}
                  type="button"
                  className={styles.tCard}
                  aria-pressed={form.prioridad.startsWith(`${f.nombre} — `)}
                  onClick={() => usarFrente(f.nombre)}
                >
                  <h3>{f.nombre}</h3>
                  <p>{f.texto}</p>
                  <span className={styles.tPick}>Usar este frente <span aria-hidden="true">→</span></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.formSec} ${styles.band}`} id="formulario">
          <div className={styles.wrap}>
            <div className={styles.formIntro}>
              <h2>Comparta su prioridad</h2>
              <p>
                Usamos sus datos solo para responderle. Los campos marcados con{" "}
                <span className={styles.req}>*</span> son necesarios para poder hacerlo; el resto es opcional.
              </p>
            </div>

            <div className={styles.card}>
              {!enviado ? (
                <>
                  {fallidos.length > 0 && (
                    <div className={styles.summary} ref={resumenRef} tabIndex={-1}>
                      <AlertCircle size={18} aria-hidden="true" />
                      <div>
                        <h3>
                          {fallidos.length === 1
                            ? "Falta un dato para poder responderle"
                            : `Faltan ${fallidos.length} datos para poder responderle`}
                        </h3>
                        <ul>
                          {fallidos.map((r) => (
                            <li key={r.campo}>
                              <a
                                href={`#${r.campo}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  document.getElementById(r.campo)?.focus();
                                }}
                              >
                                {r.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {errorEnvio && (
                    <div className={styles.summary} role="alert">
                      <AlertCircle size={18} aria-hidden="true" />
                      <div><h3>{errorEnvio}</h3></div>
                    </div>
                  )}

                  <form onSubmit={enviar} noValidate>
                    <div className={styles.fGrid}>
                      <div className={clase("nombre")}>
                        <label htmlFor="nombre">Nombre y apellido <span className={styles.req} aria-hidden="true">*</span></label>
                        <input id="nombre" type="text" autoComplete="name" maxLength={120} required
                          placeholder="Ingrese su nombre" aria-describedby="e-nombre"
                          aria-invalid={!!errores.nombre}
                          value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
                        <Error_ campo="nombre" />
                      </div>

                      <div className={clase("email")}>
                        <label htmlFor="email">Correo corporativo <span className={styles.req} aria-hidden="true">*</span></label>
                        <input id="email" type="email" autoComplete="email" inputMode="email" maxLength={254} required
                          placeholder="nombre@suempresa.com" aria-describedby="e-email"
                          aria-invalid={!!errores.email}
                          value={form.email} onChange={(e) => set("email", e.target.value)} />
                        <Error_ campo="email" />
                      </div>

                      <div className={clase("empresa")}>
                        <label htmlFor="empresa">Empresa <span className={styles.req} aria-hidden="true">*</span></label>
                        <input id="empresa" type="text" autoComplete="organization" maxLength={160} required
                          placeholder="Ingrese su empresa" aria-describedby="e-empresa"
                          aria-invalid={!!errores.empresa}
                          value={form.empresa} onChange={(e) => set("empresa", e.target.value)} />
                        <Error_ campo="empresa" />
                      </div>

                      <div className={styles.fld}>
                        <label htmlFor="cargo">Cargo <span className={styles.opt}>(opcional)</span></label>
                        <input id="cargo" type="text" autoComplete="organization-title" maxLength={120}
                          placeholder="Ingrese su cargo"
                          value={form.cargo} onChange={(e) => set("cargo", e.target.value)} />
                      </div>

                      <div className={clase("pais")}>
                        <label htmlFor="pais">País de la operación <span className={styles.req} aria-hidden="true">*</span></label>
                        <select id="pais" required aria-describedby="e-pais" aria-invalid={!!errores.pais}
                          value={form.pais} onChange={(e) => set("pais", e.target.value)}>
                          <option value="">Seleccione su país</option>
                          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <Error_ campo="pais" />
                      </div>

                      <div className={clase("sector")}>
                        <label htmlFor="sector">Sector <span className={styles.req} aria-hidden="true">*</span></label>
                        <select id="sector" required aria-describedby="e-sector" aria-invalid={!!errores.sector}
                          value={form.sector} onChange={(e) => set("sector", e.target.value)}>
                          <option value="">Seleccione su sector</option>
                          {SECTORES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <Error_ campo="sector" />
                      </div>

                      <div className={clase("prioridad", `${styles.fld} ${styles.fFull}`)}>
                        <span className={styles.lblRow}>
                          <label htmlFor="prioridad">
                            ¿Cuál es hoy la prioridad más crítica de su operación? <span className={styles.req} aria-hidden="true">*</span>
                          </label>
                          <span className={styles.count} aria-hidden="true">{form.prioridad.length} / 4000</span>
                        </span>
                        <textarea id="prioridad" ref={prioridadRef} maxLength={4000} required
                          aria-describedby="h-prioridad e-prioridad" aria-invalid={!!errores.prioridad}
                          placeholder="Ej.: las paradas no programadas en la línea 3 nos cuestan turnos completos y no logramos anticiparlas."
                          value={form.prioridad} onChange={(e) => set("prioridad", e.target.value)} />
                        <p className={styles.hint} id="h-prioridad">
                          Una o dos frases bastan. Entre más concreto, más útil será la lectura que reciba.
                        </p>
                        <Error_ campo="prioridad" />
                      </div>

                      <div className={clase("horizonte")}>
                        <fieldset aria-describedby="e-horizonte">
                          <legend className={styles.leg}>
                            Horizonte de atención <span className={styles.req} aria-hidden="true">*</span>
                          </legend>
                          <div className={styles.radios}>
                            {HORIZONTES.map((h, i) => (
                              <label key={h} className={styles.radio}>
                                <input type="radio" name="horizonte" value={h}
                                  id={i === 0 ? "horizonte" : undefined}
                                  checked={form.horizonte === h}
                                  onChange={(e) => set("horizonte", e.target.value)} />
                                {h}
                              </label>
                            ))}
                          </div>
                        </fieldset>
                        <Error_ campo="horizonte" />
                      </div>

                      <div className={styles.fld}>
                        <label htmlFor="telefono">Teléfono o WhatsApp <span className={styles.opt}>(opcional)</span></label>
                        <input id="telefono" type="tel" autoComplete="tel" inputMode="tel" maxLength={40}
                          placeholder="+593 99 999 9999"
                          value={form.telefono} onChange={(e) => set("telefono", e.target.value)} />
                      </div>

                      <div className={styles.fFull}>
                        <label className={styles.consent} htmlFor="consent">
                          <input id="consent" type="checkbox" required aria-describedby="e-consent"
                            aria-invalid={!!errores.consent}
                            checked={consent}
                            onChange={(e) => {
                              setConsent(e.target.checked);
                              if (errores.consent) setErrores((x) => ({ ...x, consent: undefined }));
                            }} />
                          <span>
                            Autorizo a OSC Top Solutions Group a contactarme para responder a esta consulta.
                            No compartimos sus datos con terceros ni lo inscribimos en listas de correo.{" "}
                            <a href="/compliance">Políticas de privacidad</a>.
                          </span>
                        </label>
                        <Error_ campo="consent" />
                      </div>
                    </div>

                    <div className={styles.submitRow}>
                      <button type="submit" className={styles.btn} disabled={enviando}>
                        {enviando ? "Enviando…" : "Enviar prioridad"}
                        {enviando
                          ? <span className={styles.spinner} aria-hidden="true" />
                          : <Send size={15} aria-hidden="true" />}
                      </button>
                      <p className={styles.submitNote}>
                        Le responde el equipo técnico, no un ejecutivo comercial.
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                <div className={styles.done}>
                  <div className={styles.doneMark}>
                    <Check size={28} aria-hidden="true" />
                  </div>
                  <h3 ref={exitoRef} tabIndex={-1}>Recibimos su prioridad</h3>
                  <p>
                    {form.nombre.trim().split(/\s+/)[0]}, le escribiremos dentro de las próximas
                    48 horas hábiles, con una lectura inicial de su contexto.
                  </p>
                  <div className={styles.recap}>
                    <dl>
                      <dt>Responderemos a</dt><dd>{form.email}</dd>
                      <dt>Horizonte</dt><dd>{form.horizonte}</dd>
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={`${styles.deliver} ${styles.band}`}>
          <div className={styles.wrap}>
            <div className={styles.secHead}>
              <h2>Qué recibirá exactamente</h2>
              <p>Responde el equipo técnico de OSC Top Solutions Group, no un ejecutivo comercial.</p>
            </div>
            <div className={styles.dGrid}>
              <article className={styles.dCard}>
                <FileText size={20} aria-hidden="true" />
                <h3>Una lectura inicial de su contexto</h3>
                <p>Qué entendimos de su frente crítico y qué preguntas haríamos antes de cualquier propuesta.</p>
              </article>
              <article className={styles.dCard}>
                <BarChart3 size={20} aria-hidden="true" />
                <h3>Referencias comparables</h3>
                <p>Qué hemos visto resolver este mismo frente en operaciones de su sector y su región.</p>
              </article>
              <article className={styles.dCard}>
                <MessageSquare size={20} aria-hidden="true" />
                <h3>Una conversación de 30 minutos</h3>
                <p>Solo si usted la pide, y con quien conoce el dominio. Usted decide si hay siguiente paso.</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={`${styles.wrap} ${styles.sGrid}`}>
            <div><div className={styles.sNum}>30</div><div className={styles.sLbl}>años operando infraestructura crítica</div></div>
            <div><div className={styles.sNum}>16</div><div className={styles.sLbl}>países en Latinoamérica y Estados Unidos</div></div>
            <div><div className={styles.sNum}>4</div><div className={styles.sLbl}>unidades de negocio integradas</div></div>
            <div><div className={styles.sNum}>5</div><div className={styles.sLbl}>verticales críticas atendidas</div></div>
          </div>
        </section>
      </main>

      <footer className={styles.foot}>
        <div className={`${styles.wrap} ${styles.footIn}`}>
          <div>
            <span className={styles.logo}>
              <Image src="/logo-footer.png" width={900} height={243} alt="OSC Top Solutions Group — 30 años" />
            </span>
            <p className={styles.footTag}>Beyond Tech. Beyond Limits.</p>
          </div>
          <div className={styles.footR}>
            <a href="https://www.osctopsolutionsgroup.com" target="_blank" rel="noopener noreferrer">
              www.osctopsolutionsgroup.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
