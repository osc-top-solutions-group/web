"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, KeyRound, Search } from "lucide-react";
import { COUNTRIES, HONEYPOT_FIELD, SEVERIDADES, CASO_DESCRIPCION_MIN } from "@/lib/forms";
import { DeclaracionDatos, usePoliticaDatos } from "@/components/ui/EnlacePoliticaDatos";

/*
 * Formularios del Centro de Servicio al Cliente, conectados a la mesa de
 * servicio (OSC One) a través de las rutas /api/caso/* de este sitio:
 *
 *   CaseForm    abre un caso de cliente y muestra su número.
 *   CaseLookup  consulta un caso: número → código que llega al correo
 *               registrado en el caso → vista del caso (./casos).
 *
 * La mesa todavía no recibe archivos por los canales de la web, así que el
 * formulario no los pide: es mejor no ofrecer un campo que se pierde.
 */

const CASOS_URL = "/osc-connect/centro-de-servicio/casos";
const ERROR_GENERICO = "No pudimos completar la operación. Por favor intente de nuevo.";

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-[#0f172a] placeholder:text-slate-400 focus:border-[#000086] focus:outline-none focus:ring-2 focus:ring-[#000086]/20";
const labelClass = "block text-sm font-semibold text-[#0f172a] mb-1.5";

async function enviar(url: string, cuerpo: unknown): Promise<{ ok: true; data: Record<string, unknown> } | { ok: false; error: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) return { ok: false, error: data?.error ?? ERROR_GENERICO };
    return { ok: true, data: data ?? {} };
  } catch {
    return { ok: false, error: "No hay conexión con el servidor. Revise su conexión e intente de nuevo." };
  }
}

/* ── Consultar un caso ─────────────────────────────────────────────────── */

export function CaseLookup() {
  const router = useRouter();
  const [caso, setCaso] = useState("");
  const [codigo, setCodigo] = useState("");
  const [paso, setPaso] = useState<"numero" | "codigo">("numero");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const inputClass =
    "flex-1 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[15px] text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30";
  const botonClass =
    "inline-flex items-center justify-center gap-2 rounded-full bg-[#e6004f] hover:bg-[#c20043] px-7 py-3 text-[15px] font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  async function pedirCodigo() {
    setEnviando(true);
    setError(null);
    const r = await enviar("/api/caso/consulta/codigo", { caso: caso.trim() });
    setEnviando(false);
    if (!r.ok) return setError(r.error);
    setPaso("codigo");
    setCodigo("");
    // Mismo mensaje exista o no el caso: no se confirma a quién pertenece un número.
    setAviso(
      `Si el caso existe, enviamos un código de 6 dígitos al correo con el que se registró. Vence en ${r.data.vigenciaMin ?? 10} minutos; revise también el correo no deseado.`,
    );
  }

  async function verificar() {
    setEnviando(true);
    setError(null);
    const r = await enviar("/api/caso/consulta/verificar", { caso: caso.trim(), codigo: codigo.trim() });
    if (!r.ok) {
      setEnviando(false);
      return setError(r.error);
    }
    router.push(`${CASOS_URL}?caso=${encodeURIComponent(String(r.data.caso ?? caso.trim()))}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (enviando) return;
        if (paso === "numero") {
          if (caso.trim()) void pedirCodigo();
        } else if (codigo.trim()) void verificar();
      }}
      className="w-full max-w-xl text-left"
    >
      {paso === "numero" ? (
        <>
          <label htmlFor="case-number" className="block text-sm font-semibold text-white mb-2">
            Consultar un caso abierto
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="case-number"
              type="text"
              value={caso}
              onChange={(e) => {
                setCaso(e.target.value);
                setError(null);
              }}
              placeholder="Ej.: SAC-000123"
              autoComplete="off"
              maxLength={20}
              required
              className={inputClass}
            />
            <button type="submit" disabled={enviando} className={botonClass}>
              <Search size={16} /> {enviando ? "Enviando…" : "Consultar"}
            </button>
          </div>
          <p className="mt-2.5 text-[13px] text-white/60">
            El número de caso llega en el correo de confirmación. Para proteger su información le
            enviaremos un código de verificación a ese mismo correo.
          </p>
        </>
      ) : (
        <>
          <label htmlFor="case-code" className="block text-sm font-semibold text-white mb-2">
            Código de verificación del caso {caso.trim().toUpperCase()}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="case-code"
              type="text"
              inputMode="numeric"
              pattern="[0-9 ]*"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value.replace(/[^\d]/g, "").slice(0, 6));
                setError(null);
              }}
              placeholder="6 dígitos"
              autoComplete="one-time-code"
              autoFocus
              required
              className={`${inputClass} tracking-[0.3em]`}
            />
            <button type="submit" disabled={enviando || codigo.length !== 6} className={botonClass}>
              <KeyRound size={16} /> {enviando ? "Verificando…" : "Ver mi caso"}
            </button>
          </div>
          {aviso && <p className="mt-2.5 text-[13px] text-white/70">{aviso}</p>}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
            <button
              type="button"
              disabled={enviando}
              onClick={() => void pedirCodigo()}
              className="font-semibold text-white underline underline-offset-2 hover:text-white/80 disabled:opacity-60"
            >
              Enviar un código nuevo
            </button>
            <button
              type="button"
              onClick={() => {
                setPaso("numero");
                setError(null);
                setAviso(null);
              }}
              className="text-white/70 underline underline-offset-2 hover:text-white"
            >
              Consultar otro número
            </button>
          </div>
        </>
      )}
      {error && (
        <p role="alert" className="mt-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90">
          {error}
        </p>
      )}
    </form>
  );
}

/* ── Abrir un caso ─────────────────────────────────────────────────────── */

const FORM_VACIO = {
  nombre: "", empresa: "", email: "", telefono: "", pais: "",
  contrato: "", servicio: "", descripcion: "",
};

export function CaseForm() {
  const [form, setForm] = useState(FORM_VACIO);
  const [severidad, setSeveridad] = useState<string>("P3");
  // Sin aceptar la política de datos vigente (QUALITA) no se abre el caso.
  const [consentimiento, setConsentimiento] = useState(false);
  const politica = usePoliticaDatos();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creado, setCreado] = useState<{ caso: string | null; email: string } | null>(null);
  // Anti-bots (ver `detectBot` en lib/forms.ts) e identificador del envío: si el
  // cliente reintenta o hace doble clic, la mesa devuelve el mismo caso.
  const [honeypot, setHoneypot] = useState("");
  const [sesion, setSesion] = useState(() => ({ iniciadoEn: Date.now(), envioId: crypto.randomUUID() }));

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function abrir(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setError(null);
    const r = await enviar("/api/caso", { ...form, severidad, consentimiento, politicaSha256: politica?.sha256, [HONEYPOT_FIELD]: honeypot, ...sesion });
    setEnviando(false);
    if (!r.ok) return setError(r.error);
    setCreado({ caso: typeof r.data.caso === "string" ? r.data.caso : null, email: form.email });
  }

  if (creado) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center">
        <CheckCircle2 size={44} className="mx-auto text-emerald-600" aria-hidden="true" />
        <h3 className="m-0 mt-3 text-xl font-bold text-[#0f172a]">
          {creado.caso ? <>Caso <span className="text-[#000086]">{creado.caso}</span> registrado</> : "Caso registrado"}
        </h3>
        <p className="m-0 mt-2 text-sm leading-relaxed text-slate-600">
          Enviamos la confirmación a <strong>{creado.email}</strong>. Conserve el número: con él puede
          consultar el estado de su caso en esta misma página.
          {severidad === "P1" && " Si es una falla crítica, llame también al NOC: el formulario no reemplaza la llamada."}
        </p>
        <button
          type="button"
          onClick={() => {
            setCreado(null);
            setForm(FORM_VACIO);
            setSeveridad("P3");
            setConsentimiento(false);
            setSesion({ iniciadoEn: Date.now(), envioId: crypto.randomUUID() });
          }}
          className="mt-5 text-sm font-semibold text-[#000086] underline underline-offset-2 hover:text-[#e6004f]"
        >
          Abrir otro caso
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={abrir} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-nombre" className={labelClass}>Nombre completo *</label>
          <input id="cf-nombre" name="nombre" required minLength={2} maxLength={120} autoComplete="name" value={form.nombre} onChange={cambiar} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-empresa" className={labelClass}>Empresa *</label>
          <input id="cf-empresa" name="empresa" required maxLength={160} autoComplete="organization" value={form.empresa} onChange={cambiar} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>Email corporativo *</label>
          <input id="cf-email" name="email" type="email" required maxLength={120} autoComplete="email" value={form.email} onChange={cambiar} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-telefono" className={labelClass}>Teléfono de contacto</label>
          <input id="cf-telefono" name="telefono" type="tel" maxLength={40} autoComplete="tel" value={form.telefono} onChange={cambiar} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-pais" className={labelClass}>País *</label>
          <select id="cf-pais" name="pais" required value={form.pais} onChange={cambiar} className={fieldClass}>
            <option value="" disabled>Seleccione…</option>
            {COUNTRIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-contrato" className={labelClass}>N.º de contrato o ID de sitio</label>
          <input id="cf-contrato" name="contrato" maxLength={80} value={form.contrato} onChange={cambiar} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-servicio" className={labelClass}>Servicio afectado *</label>
          <input id="cf-servicio" name="servicio" required maxLength={120} value={form.servicio} onChange={cambiar} className={fieldClass} />
        </div>
      </div>

      <fieldset className="border-0 p-0 m-0">
        <legend className={labelClass}>Severidad *</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SEVERIDADES.map(({ codigo, etiqueta }) => (
            <label
              key={codigo}
              className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm transition-colors ${
                severidad === codigo
                  ? "border-[#000086] bg-[#000086] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#000086]"
              }`}
            >
              <input
                type="radio"
                name="severidad"
                value={codigo}
                checked={severidad === codigo}
                onChange={() => setSeveridad(codigo)}
                className="sr-only"
              />
              <span className="font-bold">{codigo}</span> {etiqueta}
            </label>
          ))}
        </div>
        <p className="mt-2 text-[13px] text-slate-500">
          Si es P1, llame también al NOC: el formulario no reemplaza la llamada.
        </p>
      </fieldset>

      <div>
        <label htmlFor="cf-desc" className={labelClass}>Descripción *</label>
        <textarea
          id="cf-desc"
          name="descripcion"
          required
          minLength={CASO_DESCRIPCION_MIN}
          maxLength={4000}
          rows={4}
          value={form.descripcion}
          onChange={cambiar}
          placeholder="Qué ocurre, desde cuándo, en qué sitio y cómo afecta la operación."
          className={fieldClass}
        />
        <p className="mt-2 text-[13px] text-slate-500">
          Si necesitamos capturas o logs, el especialista se los pedirá por correo al atender el caso.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-600">
        <input
          type="checkbox"
          required
          checked={consentimiento}
          onChange={(e) => setConsentimiento(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#000086]"
        />
        <span>
          <DeclaracionDatos formulario="caso" politica={politica} className="font-semibold text-[#000086] underline underline-offset-2 hover:text-[#e6004f]" /> *
        </span>
      </label>

      {/* Honeypot: fuera de la vista y del orden de tabulación; un humano nunca lo llena. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Sitio web</label>
        <input id="cf-website" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#e6004f] hover:bg-[#c20043] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {enviando ? "Registrando…" : "Abrir caso"} <ArrowRight size={16} />
      </button>
      {error && (
        <p role="alert" className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </p>
      )}
    </form>
  );
}
