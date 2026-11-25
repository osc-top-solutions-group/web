"use client";

import { AGENTE_HABILITADO } from "@/lib/entorno";

/** Evento con el que cualquier botón de la página abre el chat de NOVA (lo escucha `ChatWidget`). */
export const EVENTO_ABRIR_NOVA = "osc:abrir-nova";

/**
 * Botón que abre el chat del asistente NOVA (el mismo widget flotante).
 * En las imágenes sin el asistente habilitado (hoy: producción) se muestra
 * deshabilitado como "Próximamente", igual que los demás accesos pendientes.
 */
export function AbrirNova({ className, children }: { className: string; children: React.ReactNode }) {
  if (!AGENTE_HABILITADO) {
    return (
      <span aria-disabled="true" title="Disponible próximamente" className={`${className} cursor-not-allowed opacity-60`}>
        {children}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_NOVA))}
      className={`${className} cursor-pointer border-0`}
    >
      {children}
    </button>
  );
}
