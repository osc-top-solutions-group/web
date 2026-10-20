"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "@/components/agente/ChatWidget";
import { AGENTE_HABILITADO } from "@/lib/entorno";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Rutas que traen su propio encabezado y pie. La landing de captación va acá
  // a propósito: la navegación completa del sitio le daría al visitante diez
  // salidas en lugar de un formulario.
  const standalone =
    pathname?.startsWith("/vcard") || pathname?.startsWith("/frente-critico");

  if (standalone) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      {/* Asistente virtual (botón flotante). Solo en las páginas con navegación
          completa; la landing y la vCard quedan sin widget a propósito.
          Se muestra únicamente en imágenes construidas con AGENTE_HABILITADO=1
          (hoy: QA). Producción lo activa cuando el orquestador esté publicado. */}
      {AGENTE_HABILITADO && <ChatWidget />}
    </>
  );
}
