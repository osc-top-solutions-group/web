"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2, MessageCircle, Send, X } from "lucide-react";

/**
 * Widget del agente conversacional OSC (Fase 1).
 *
 * Habla con el orquestador (`agente-orchestrator-api`) por ruta relativa
 * `/agente-api/chat`, resuelta por el balanceador — nunca contra una URL
 * `*.run.app`. El `session_id` lo genera el servidor y se conserva en
 * sessionStorage: la conversación sobrevive a la navegación entre páginas
 * pero no a cerrar la pestaña.
 *
 * Se monta en `SiteShell` cuando la ruta /agente-api/* exista en el balanceador.
 */

type Turno = { rol: "usuario" | "agente"; texto: string };

const SESSION_KEY = "agente-session-id";
const SALUDO =
  "¡Hola! Soy el asistente virtual de OSC. Puedo contarte sobre nuestras soluciones de conectividad, ciberseguridad y operaciones gestionadas, o ponerte en contacto con nuestro equipo. ¿En qué te ayudo?";

export default function ChatWidget() {
  const [abierto, setAbierto] = useState(false);
  const [turnos, setTurnos] = useState<Turno[]>([{ rol: "agente", texto: SALUDO }]);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "error">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turnos, abierto]);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const texto = mensaje.trim();
    if (!texto || estado === "enviando") return;

    setTurnos((t) => [...t, { rol: "usuario", texto }]);
    setMensaje("");
    setEstado("enviando");

    try {
      const res = await fetch("/agente-api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje: texto,
          ...(sessionStorage.getItem(SESSION_KEY)
            ? { session_id: sessionStorage.getItem(SESSION_KEY) }
            : {}),
        }),
      });
      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, data.session_id);
        setTurnos((t) => [...t, { rol: "agente", texto: data.respuesta }]);
        setEstado("idle");
      } else if (res.status === 429 && data.respuesta) {
        setTurnos((t) => [...t, { rol: "agente", texto: data.respuesta }]);
        setEstado("idle");
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
          className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {/* Encabezado */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "linear-gradient(135deg,#FF0057,#cc0047)" }}
          >
            <div className="text-sm font-bold text-white">Asistente OSC</div>
            <button
              type="button"
              aria-label="Cerrar chat"
              onClick={() => setAbierto(false)}
              className="text-white/80 transition-colors hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Conversación */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {turnos.map((t, i) => (
              <div key={i} className={t.rol === "usuario" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className="max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed"
                  style={
                    t.rol === "usuario"
                      ? { background: "linear-gradient(135deg,#FF0057,#cc0047)", color: "#fff" }
                      : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.9)" }
                  }
                >
                  {t.texto}
                </div>
              </div>
            ))}
            {estado === "enviando" && (
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Loader2 size={12} className="animate-spin" />
                Escribiendo…
              </div>
            )}
            {estado === "error" && (
              <div className="flex items-center gap-1.5 text-xs text-amber-400">
                <AlertCircle size={12} />
                No pudimos responder. Intenta de nuevo o usa el formulario de contacto.
              </div>
            )}
          </div>

          {/* Entrada */}
          <form
            onSubmit={enviar}
            className="flex items-center gap-2 px-3 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <input
              type="text"
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value);
                if (estado === "error") setEstado("idle");
              }}
              maxLength={2000}
              placeholder="Escribe tu mensaje…"
              className="flex-1 rounded-full px-4 py-2 text-sm text-white outline-none placeholder:text-white/25"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}
            />
            <button
              type="submit"
              disabled={estado === "enviando" || !mensaje.trim()}
              aria-label="Enviar mensaje"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#FF0057,#cc0047)" }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante */}
      <button
        type="button"
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente"}
        onClick={() => setAbierto((v) => !v)}
        className="flex h-13 w-13 items-center justify-center rounded-full p-3.5 text-white shadow-xl transition-transform hover:scale-105"
        style={{ background: "linear-gradient(135deg,#FF0057,#cc0047)" }}
      >
        {abierto ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
