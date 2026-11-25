"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  COUNTRIES,
  HONEYPOT_FIELD,
  SOLICITUDES,
  CAMPOS_SOLICITUD,
  OPCIONES_SOLICITUD,
  CASO_DESCRIPCION_MIN,
  type CampoSolicitud,
} from "@/lib/forms";
import { EnlacePoliticaDatos, usePoliticaDatos } from "@/components/ui/EnlacePoliticaDatos";

/*
 * Formulario general de solicitudes: el visitante elige qué necesita y el
 * formulario pide los datos de ese tipo (los mismos que reúne el asistente NOVA).
 * Se radica en la mesa de servicio por POST /api/solicitud y devuelve el número
 * de radicado, que se consulta con código en el Centro de Servicio.
 *
 * Sin adjuntos: la mesa no recibe archivos por los canales de la web.
 */

const CONSULTA_URL = "/osc-connect/centro-de-servicio#consultar";

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-[#0f172a] placeholder:text-slate-400 focus:border-[#000086] focus:outline-none focus:ring-2 focus:ring-[#000086]/20";
const labelClass = "block text-sm font-semibold text-[#0f172a] mb-1.5";

const DATOS_VACIOS: Record<CampoSolicitud, string> = {
  empresa: "", cargo: "", servicio_interes: "", tipo_pqrs: "", tipo_documento: "",
  numero_documento: "", tipo_certificado: "", dirigido_a: "", nit: "", referencia: "",
};
const BASE_VACIA = { nombre: "", email: "", telefono: "", pais: "", descripcion: "" };

const AYUDA_DESCRIPCION: Record<string, string> = {
  pqrs: "Cuéntenos qué ocurrió, cuándo y con qué servicio o área.",
  "certificado-laboral": "Opcional: fechas aproximadas de vinculación o cualquier dato que ayude a ubicar su registro.",
  "solicitud-proveedor": "Qué ofrece su empresa, o el detalle de la factura o pago que consulta.",
  prospecto: "Su operación, el reto que quiere resolver y en qué sitios.",
  cotizacion: "Alcance, cantidades, sitios y fecha en que necesita la cotización.",
  "otra-solicitud": "Describa su solicitud con el mayor detalle posible.",
};

export function SolicitudForm() {
  const [tipoId, setTipoId] = useState<string>("");
  const [base, setBase] = useState(BASE_VACIA);
  const [datos, setDatos] = useState(DATOS_VACIOS);
  const [consentimiento, setConsentimiento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creado, setCreado] = useState<{ caso: string | null; email: string } | null>(null);
  // Anti-bots (ver `detectBot` en lib/forms.ts) e identificador del envío: un reintento no radica dos veces.
  const [honeypot, setHoneypot] = useState("");
  const [sesion, setSesion] = useState(() => ({ iniciadoEn: Date.now(), envioId: crypto.randomUUID() }));

  // Política de datos vigente en QUALITA: es la que se enlaza y la que queda registrada en la solicitud.
  const politica = usePoliticaDatos();

  const tipo = SOLICITUDES.find((s) => s.id === tipoId) ?? null;

  const cambiarBase = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setBase((f) => ({ ...f, [e.target.name]: e.target.value }));
  const cambiarDato = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDatos((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function radicar(e: React.FormEvent) {
    e.preventDefault();
    if (enviando || !tipo) return;
    setEnviando(true);
    setError(null);
    // Solo viajan los datos del tipo elegido.
    const propios = Object.fromEntries([...tipo.requeridos, ...tipo.opcionales].map((c) => [c, datos[c]]));
    try {
      const res = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: tipo.id, ...base, ...propios, consentimiento, [HONEYPOT_FIELD]: honeypot, ...sesion }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) setError(data?.error ?? "No pudimos radicar la solicitud. Por favor intente de nuevo.");
      else setCreado({ caso: typeof data?.caso === "string" ? data.caso : null, email: base.email });
    } catch {
      setError("No hay conexión con el servidor. Revise su conexión e intente de nuevo.");
    }
    setEnviando(false);
  }

  if (creado) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center">
        <CheckCircle2 size={44} className="mx-auto text-emerald-600" aria-hidden="true" />
        <h3 className="m-0 mt-3 text-xl font-bold text-[#0f172a]">
          {creado.caso ? <>Solicitud <span className="text-[#000086]">{creado.caso}</span> radicada</> : "Solicitud radicada"}
        </h3>
        <p className="m-0 mt-2 text-sm leading-relaxed text-slate-600">
          Enviamos la confirmación a <strong>{creado.email}</strong>. Conserve el número: con él puede{" "}
          <Link href={CONSULTA_URL} className="font-semibold text-[#000086] hover:text-[#e6004f]">
            consultar el estado de su solicitud
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setCreado(null);
            setBase(BASE_VACIA);
            setDatos(DATOS_VACIOS);
            setConsentimiento(false);
            setTipoId("");
            setSesion({ iniciadoEn: Date.now(), envioId: crypto.randomUUID() });
          }}
          className="mt-5 text-sm font-semibold text-[#000086] underline underline-offset-2 hover:text-[#e6004f]"
        >
          Radicar otra solicitud
        </button>
      </div>
    );
  }

  const campoDato = (campo: CampoSolicitud, obligatorio: boolean) => {
    const def = CAMPOS_SOLICITUD[campo];
    const opciones = OPCIONES_SOLICITUD[campo];
    const id = `sf-${campo}`;
    return (
      <div key={campo} className={campo === "dirigido_a" || campo === "servicio_interes" || campo === "tipo_certificado" ? "sm:col-span-2" : undefined}>
        <label htmlFor={id} className={labelClass}>{def.etiqueta}{obligatorio ? " *" : ""}</label>
        {opciones ? (
          <select id={id} name={campo} required={obligatorio} value={datos[campo]} onChange={cambiarDato} className={fieldClass}>
            <option value="" disabled={obligatorio}>Seleccione…</option>
            {opciones.map((o) => (
              <option key={o.id} value={o.id}>{o.etiqueta}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={campo}
            required={obligatorio}
            maxLength={def.max}
            autoComplete={campo === "empresa" ? "organization" : campo === "cargo" ? "organization-title" : "off"}
            value={datos[campo]}
            onChange={cambiarDato}
            className={fieldClass}
          />
        )}
      </div>
    );
  };

  return (
    <form onSubmit={radicar} className="grid gap-6">
      <fieldset className="m-0 border-0 p-0">
        <legend className={labelClass}>¿Qué necesita? *</legend>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLICITUDES.map((s) => (
            <label
              key={s.id}
              className={`cursor-pointer rounded-xl border px-4 py-3 transition-colors ${
                tipoId === s.id
                  ? "border-[#000086] bg-[#000086] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#000086]"
              }`}
            >
              <input
                type="radio"
                name="tipo"
                value={s.id}
                required
                checked={tipoId === s.id}
                onChange={() => {
                  setTipoId(s.id);
                  setError(null);
                }}
                className="sr-only"
              />
              <span className="block text-[15px] font-bold">{s.etiqueta}</span>
              <span className={`mt-0.5 block text-[13px] leading-snug ${tipoId === s.id ? "text-white/80" : "text-slate-500"}`}>
                {s.ayuda}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {tipo && (
        <>
          {tipo.id === "certificado-laboral" && (
            <p className="m-0 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-900">
              Este trámite es para personas que <strong>ya no tienen vínculo vigente</strong> con OSC. Si es
              colaborador activo, genere su certificado en QUALITA (Talento Humano › Mi perfil).
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sf-nombre" className={labelClass}>Nombre completo *</label>
              <input id="sf-nombre" name="nombre" required minLength={2} maxLength={120} autoComplete="name" value={base.nombre} onChange={cambiarBase} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="sf-email" className={labelClass}>Correo electrónico *</label>
              <input id="sf-email" name="email" type="email" required maxLength={120} autoComplete="email" value={base.email} onChange={cambiarBase} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="sf-telefono" className={labelClass}>Teléfono de contacto</label>
              <input id="sf-telefono" name="telefono" type="tel" maxLength={40} autoComplete="tel" value={base.telefono} onChange={cambiarBase} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="sf-pais" className={labelClass}>País *</label>
              <select id="sf-pais" name="pais" required value={base.pais} onChange={cambiarBase} className={fieldClass}>
                <option value="" disabled>Seleccione…</option>
                {COUNTRIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            {tipo.requeridos.map((c) => campoDato(c, true))}
            {tipo.opcionales.map((c) => campoDato(c, false))}
          </div>

          <div>
            <label htmlFor="sf-desc" className={labelClass}>
              {tipo.descripcionObligatoria ? "Descripción *" : "Información adicional"}
            </label>
            <textarea
              id="sf-desc"
              name="descripcion"
              required={tipo.descripcionObligatoria}
              minLength={tipo.descripcionObligatoria ? CASO_DESCRIPCION_MIN : undefined}
              maxLength={4000}
              rows={4}
              value={base.descripcion}
              onChange={cambiarBase}
              placeholder={AYUDA_DESCRIPCION[tipo.id]}
              className={fieldClass}
            />
            <p className="mt-2 text-[13px] text-slate-500">
              Si necesitamos documentos de soporte, quien atienda su solicitud se los pedirá por correo.
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
              Autorizo a OSC Top Solutions Group a tratar mis datos personales para atender esta solicitud, según su{" "}
              <EnlacePoliticaDatos politica={politica} className="font-semibold text-[#000086] underline underline-offset-2 hover:text-[#e6004f]" />. *
            </span>
          </label>

          {/* Honeypot: fuera de la vista y del orden de tabulación; un humano nunca lo llena. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="sf-website">Sitio web</label>
            <input id="sf-website" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="inline-flex items-center justify-center gap-2 self-start justify-self-start rounded-full bg-[#e6004f] hover:bg-[#c20043] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {enviando ? "Radicando…" : "Radicar solicitud"} <ArrowRight size={16} />
          </button>
        </>
      )}

      {error && (
        <p role="alert" className="m-0 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </p>
      )}
    </form>
  );
}
