"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
    </>
  );
}
