"use client";

import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

/*
 * TODO: conectar ambos formularios a la mesa de servicio (API de casos).
 * Mientras no exista el endpoint, se valida en el cliente y se informa al
 * usuario el canal alterno, sin simular que el caso fue creado.
 */
const PENDING_NOTICE =
  "Este formulario aún no está conectado a la mesa de servicio. Por ahora, use la línea NOC 24x7 o el correo de soporte para registrar su caso.";

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-[#0f172a] placeholder:text-slate-400 focus:border-[#000086] focus:outline-none focus:ring-2 focus:ring-[#000086]/20";
const labelClass = "block text-sm font-semibold text-[#0f172a] mb-1.5";

export function CaseLookup() {
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) setNotice(true);
      }}
      className="w-full max-w-xl text-left"
    >
      <label htmlFor="case-number" className="block text-sm font-semibold text-white mb-2">
        Consultar un caso abierto
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="case-number"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setNotice(false);
          }}
          placeholder="OSC-######"
          autoComplete="off"
          className="flex-1 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[15px] text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e6004f] hover:bg-[#c20043] px-7 py-3 text-[15px] font-semibold text-white transition-colors"
        >
          <Search size={16} /> Consultar
        </button>
      </div>
      <p className="mt-2.5 text-[13px] text-white/60">
        El número de caso llega en el correo de confirmación.
      </p>
      {notice && (
        <p role="status" className="mt-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90">
          {PENDING_NOTICE}
        </p>
      )}
    </form>
  );
}

export function CaseForm() {
  const [severity, setSeverity] = useState("P3");
  const [notice, setNotice] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setNotice(true);
      }}
      className="grid gap-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-empresa" className={labelClass}>Empresa *</label>
          <input id="cf-empresa" name="empresa" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>Email corporativo *</label>
          <input id="cf-email" name="email" type="email" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-contrato" className={labelClass}>N.º de contrato o ID de sitio</label>
          <input id="cf-contrato" name="contrato" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-servicio" className={labelClass}>Servicio afectado *</label>
          <input id="cf-servicio" name="servicio" required className={fieldClass} />
        </div>
      </div>

      <fieldset className="border-0 p-0 m-0">
        <legend className={labelClass}>Severidad *</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            ["P1", "Crítico"],
            ["P2", "Alto"],
            ["P3", "Medio"],
            ["P4", "Bajo"],
          ].map(([code, label]) => (
            <label
              key={code}
              className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm transition-colors ${
                severity === code
                  ? "border-[#000086] bg-[#000086] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#000086]"
              }`}
            >
              <input
                type="radio"
                name="severidad"
                value={code}
                checked={severity === code}
                onChange={() => setSeverity(code)}
                className="sr-only"
              />
              <span className="font-bold">{code}</span> {label}
            </label>
          ))}
        </div>
        <p className="mt-2 text-[13px] text-slate-500">
          Si es P1, llame también al NOC: el formulario no reemplaza la llamada.
        </p>
      </fieldset>

      <div>
        <label htmlFor="cf-desc" className={labelClass}>Descripción *</label>
        <textarea id="cf-desc" name="descripcion" required rows={4} className={fieldClass} />
      </div>
      <div>
        <label htmlFor="cf-adjuntos" className={labelClass}>Adjuntos (capturas, logs)</label>
        <input
          id="cf-adjuntos"
          name="adjuntos"
          type="file"
          multiple
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#000086]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#000086] hover:file:bg-[#000086]/20"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#e6004f] hover:bg-[#c20043] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors"
      >
        Abrir caso <ArrowRight size={16} />
      </button>
      {notice && (
        <p role="status" className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {PENDING_NOTICE}
        </p>
      )}
    </form>
  );
}
