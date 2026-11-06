import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Angélica D'Haro — Chief Business Development and Investment Officer OSC Top Solutions Group",
  description: "Contacto digital de Angélica D'Haro, Chief Business Development and Investment Officer de OSC Top Solutions Group. Integrador tecnológico líder en infraestructuras críticas en América Latina.",
  robots: { index: false, follow: false },
};

export default function VCardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
