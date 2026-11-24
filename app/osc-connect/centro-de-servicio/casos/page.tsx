import type { Metadata } from "next";
import CasosClient from "./CasosClient";

export const metadata: Metadata = {
  title: "Mis casos – Centro de Servicio al Cliente",
  description: "Consulte el estado, la conversación y el historial de sus casos con OSC.",
  robots: { index: false, follow: false },
};

/*
 * Esta página muestra datos del cliente (sus casos), así que va bajo la CSP
 * estricta (ver STRICT_OVERRIDES en proxy.ts) y por eso se renderiza
 * dinámicamente: Next.js necesita el nonce de cada petición.
 */
export const dynamic = "force-dynamic";

export default function CasosPage() {
  return <CasosClient />;
}
