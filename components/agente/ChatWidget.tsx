"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AlertCircle, ArrowRight, Loader2, RotateCcw, Send, X } from "lucide-react";

/**
 * Widget del asistente virtual OSC (Fase 1), con el diseño de la mascota robot:
 * paleta azul/violeta con borde neón, botón flotante con la mascota y una
 * burbuja de invitación ("¿Tienes una pregunta? Estoy aquí para ayudarte.").
 *
 * Habla con el orquestador (`agente-orchestrator-api`, proyecto GCP
 * agente-ai-511121) por ruta relativa `/agente-api/chat`; `proxy.ts` la reenvía
 * en tiempo de ejecución al origen definido en AGENTE_API_ORIGIN, así que el
 * navegador nunca cambia de origen: sin CORS ni cambios de CSP. Nunca se usa una
 * URL `*.run.app`.
 *
 * El `session_id` lo genera el servidor y se conserva en sessionStorage: la
 * conversación sobrevive a la navegación entre páginas pero no a cerrar la
 * pestaña. "Nueva conversación" lo descarta.
 *
 * No hay operadores humanos: el asistente informa con la base de conocimiento
 * o radica la solicitud en la Mesa de Servicios (ESM) y devuelve el radicado.
 * Las correcciones posteriores van al mismo ticket.
 */

type Turno = { rol: "usuario" | "agente"; texto: string };

const SESSION_KEY = "agente-session-id";
const TEASER_KEY = "agente-teaser-visto";
const SALUDO =
  "¡Hola! Soy el asistente virtual de OSC. Puedo contarte sobre nuestras soluciones de conectividad, ciberseguridad y operaciones gestionadas, o radicar tu solicitud para que el área responsable te responda por correo. Atiendo en español, English y português. ¿En qué te ayudo?";
const AVISO =
  "Asistente automatizado. Los datos que compartas se tratan según nuestra política de datos personales.";

/* Paleta del diseño: azul profundo → violeta, con acento neón rosa/magenta. */
const GRADIENTE = "linear-gradient(135deg,#1E1BB8 0%,#5B2BE0 55%,#8A2BFF 100%)";
const BORDE_NEON = "0 0 0 2px rgba(236,72,255,0.55), 0 0 18px rgba(168,85,247,0.45)";
const AZUL_TEXTO = "#1E1BB8";

/** Convierte URLs y enlaces [texto](url) en <a>; el resto es texto plano. */
function renderTexto(texto: string) {
  const partes: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)|(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(texto))) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    const href = m[2] ?? m[3];
    const label = m[1] ?? m[3];
    const externo = /^https?:\/\//.test(href) && !href.startsWith("https://osctopsolutionsgroup.com");
    partes.push(
      <a
        key={`${m.index}-${href}`}
        href={href}
        target={externo ? "_blank" : undefined}
        rel={externo ? "noopener noreferrer" : undefined}
        className="font-medium underline underline-offset-2"
        style={{ color: AZUL_TEXTO }}
      >
        {label}
      </a>,
    );
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [turnos, setTurnos] = useState<Turno[]>([{ rol: "agente", texto: SALUDO }]);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "error" | "cerrada">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // La burbuja de invitación aparece a los pocos segundos, una vez por pestaña.
  useEffect(() => {
    let visto = false;
    try {
      visto = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {
      /* ignorar */
    }
    if (visto) return;
    const t = setTimeout(() => setTeaser(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const ocultarTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      /* ignorar */
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turnos, abierto, estado]);

  useEffect(() => {
    if (abierto) inputRef.current?.focus();
  }, [abierto]);

  const abrir = () => {
    ocultarTeaser();
    setAbierto(true);
  };

  const leerSesion = () => {
    try {
      return sessionStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
  };
  const guardarSesion = (id: string) => {
    try {
      sessionStorage.setItem(SESSION_KEY, id);
    } catch {
      /* sessionStorage no disponible: la sesión vive solo en memoria del widget */
    }
  };
  const olvidarSesion = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignorar */
    }
  };

  const nuevaConversacion = () => {
    olvidarSesion();
    setTurnos([{ rol: "agente", texto: SALUDO }]);
    setEstado("idle");
    setMensaje("");
    inputRef.current?.focus();
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const texto = mensaje.trim();
    if (!texto || estado === "enviando" || estado === "cerrada") return;

    setTurnos((t) => [...t, { rol: "usuario", texto }]);
    setMensaje("");
    setEstado("enviando");

    try {
      const sesion = leerSesion();
      const res = await fetch("/agente-api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          mensaje: texto,
          pagina: pathname ?? undefined,
          ...(sesion ? { session_id: sesion } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && typeof data.respuesta === "string") {
        if (data.session_id) guardarSesion(data.session_id);
        setTurnos((t) => [...t, { rol: "agente", texto: data.respuesta }]);
        setEstado("idle");
      } else if (res.status === 429 && typeof data.respuesta === "string") {
        setTurnos((t) => [...t, { rol: "agente", texto: data.respuesta }]);
        setEstado("cerrada");
      } else if (res.status === 400 && data.error === "Sesión no encontrada") {
        olvidarSesion();
        setEstado("error");
      } else {
        setEstado("error");
      }
    } catch {
      setEstado("error");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {abierto && (
        <div
          role="dialog"
          aria-label="Asistente virtual de OSC"
          className="flex h-[32rem] w-[23rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          style={{ boxShadow: `${BORDE_NEON}, 0 24px 48px rgba(30,27,184,0.25)` }}
        >
          {/* Encabezado */}
          <div className="flex items-center justify-between px-4 py-3" style={{ background: GRADIENTE }}>
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/15">
                <Image src="/agente/mascota-sm.webp" alt="" width={40} height={40} priority={false} />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-bold text-white">Asistente OSC</div>
                <div className="text-[11px] text-white/75">Español · English · Português</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Nueva conversación"
                title="Nueva conversación"
                onClick={nuevaConversacion}
                className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                aria-label="Cerrar chat"
                onClick={() => setAbierto(false)}
                className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Conversación */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
            style={{ background: "linear-gradient(180deg,#F6F5FF 0%,#FFFFFF 100%)" }}
            aria-live="polite"
          >
            {turnos.map((t, i) => (
              <div key={i} className={t.rol === "usuario" ? "flex justify-end" : "flex items-end gap-2"}>
                {t.rol === "agente" && (
                  <Image src="/agente/mascota-sm.webp" alt="" width={24} height={24} className="mb-1 shrink-0 rounded-full" />
                )}
                <div
                  className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm leading-relaxed"
                  style={
                    t.rol === "usuario"
                      ? { background: GRADIENTE, color: "#fff", borderBottomRightRadius: 6 }
                      : { background: "#fff", color: "#1f2340", border: "1px solid #E6E3FF", borderBottomLeftRadius: 6 }
                  }
                >
                  {t.rol === "agente" ? renderTexto(t.texto) : t.texto}
                </div>
              </div>
            ))}
            {estado === "enviando" && (
              <div className="flex items-center gap-2 text-xs" style={{ color: "#6B6A99" }}>
                <Loader2 size={12} className="animate-spin" />
                Escribiendo…
              </div>
            )}
            {estado === "error" && (
              <div className="flex items-center gap-1.5 text-xs text-amber-600">
                <AlertCircle size={12} />
                <span>
                  No pudimos responder. Intenta de nuevo o usa el{" "}
                  <a href="/contacto" className="underline">
                    formulario de contacto
                  </a>
                  .
                </span>
              </div>
            )}
          </div>

          {/* Entrada */}
          <form onSubmit={enviar} className="flex items-center gap-2 px-3 pt-3 pb-1" style={{ borderTop: "1px solid #ECEAFF" }}>
            <input
              ref={inputRef}
              type="text"
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value);
                if (estado === "error") setEstado("idle");
              }}
              maxLength={2000}
              disabled={estado === "cerrada"}
              placeholder={estado === "cerrada" ? "Conversación finalizada" : "Escribe tu mensaje…"}
              aria-label="Mensaje para el asistente"
              className="flex-1 rounded-full px-4 py-2 text-sm outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(138,43,255,0.35)] disabled:opacity-50"
              style={{ background: "#F3F1FF", border: "1px solid #DAD5FF", color: "#1f2340" }}
            />
            <button
              type="submit"
              disabled={estado === "enviando" || estado === "cerrada" || !mensaje.trim()}
              aria-label="Enviar mensaje"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: GRADIENTE }}
            >
              <Send size={14} />
            </button>
          </form>
          <p className="px-4 pb-2 text-[10px] leading-snug" style={{ color: "#8D8BB5" }}>
            {AVISO}
          </p>
        </div>
      )}

      {/* Burbuja de invitación (diseño "¿Tienes una pregunta?") */}
      {!abierto && teaser && (
        <div
          className="relative flex max-w-[calc(100vw-6rem)] items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 shadow-xl"
          style={{ boxShadow: BORDE_NEON }}
          role="status"
        >
          <button
            type="button"
            aria-label="Ocultar invitación"
            onClick={ocultarTeaser}
            className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] shadow"
            style={{ color: AZUL_TEXTO, border: "1px solid #DAD5FF" }}
          >
            <X size={11} />
          </button>
          <div className="leading-tight">
            <div className="text-sm font-extrabold" style={{ color: AZUL_TEXTO }}>
              ¿Tienes una pregunta?
            </div>
            <div className="text-xs" style={{ color: "#3A3780" }}>
              Estoy aquí para ayudarte.
            </div>
          </div>
          <button
            type="button"
            aria-label="Abrir asistente"
            onClick={abrir}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
            style={{ background: GRADIENTE }}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Botón flotante con la mascota */}
      <button
        type="button"
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente"}
        aria-expanded={abierto}
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105"
        style={{ background: GRADIENTE, boxShadow: `${BORDE_NEON}, 0 12px 28px rgba(30,27,184,0.35)` }}
      >
        {abierto ? (
          <X size={24} className="text-white" />
        ) : (
          <Image src="/agente/mascota.webp" alt="" width={64} height={64} className="h-16 w-16 object-contain" priority={false} />
        )}
      </button>
    </div>
  );
}
