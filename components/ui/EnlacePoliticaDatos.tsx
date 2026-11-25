"use client";

import { useEffect, useState } from "react";
import {
  DECLARACION_INICIO, FINALIDAD_DATOS, RESPONSABLE_DATOS, tituloPolitica,
  type FormularioConsentimiento,
} from "@/lib/consentimiento";

export interface PoliticaVigente {
  codigo: string;
  nombre: string;
  version: string;
  sha256: string;
  pdf: string;
}

/** Versión vigente de la política de datos (QUALITA). `null` mientras carga o si no está disponible. */
export function usePoliticaDatos(): PoliticaVigente | null {
  const [politica, setPolitica] = useState<PoliticaVigente | null>(null);
  useEffect(() => {
    let vigente = true;
    fetch("/api/politica-datos")
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (vigente && p && typeof p.pdf === "string" && typeof p.version === "string") setPolitica(p);
      })
      .catch(() => {
        /* sin política en línea: queda el enlace a /compliance */
      });
    return () => {
      vigente = false;
    };
  }, []);
  return politica;
}

/**
 * Enlace a la política de tratamiento de datos personales VIGENTE, tal como
 * está aprobada en QUALITA (se abre el PDF en otra pestaña). Si QUALITA no
 * responde, enlaza a la página de políticas del sitio.
 */
export function EnlacePoliticaDatos({ politica, className }: { politica: PoliticaVigente | null; className?: string }) {
  if (!politica) {
    return (
      <a href="/compliance" target="_blank" rel="noopener" className={className}>
        Política de tratamiento de datos personales
      </a>
    );
  }
  return (
    <a href={politica.pdf} target="_blank" rel="noopener" className={className} title={`${politica.nombre} · ${politica.codigo}`}>
      Política de tratamiento de datos personales (versión {politica.version})
    </a>
  );
}

/**
 * Texto de la casilla de aceptación, con la política enlazada. Es el mismo texto
 * que el servidor guarda como evidencia (`declaracionDatos` en lib/consentimiento.ts):
 * si cambia aquí, cambia allá.
 */
export function DeclaracionDatos({
  formulario, politica, className,
}: { formulario: FormularioConsentimiento; politica: PoliticaVigente | null; className?: string }) {
  return (
    <>
      {DECLARACION_INICIO}
      <a href={politica ? politica.pdf : "/compliance"} target="_blank" rel="noopener" className={className}>
        {tituloPolitica(politica)}
      </a>{" "}
      de {RESPONSABLE_DATOS}. {FINALIDAD_DATOS[formulario]}
    </>
  );
}
