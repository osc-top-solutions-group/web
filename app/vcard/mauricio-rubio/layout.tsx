import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mauricio Rubio — CEO OSC Top Solutions Group",
  description: "Contacto digital de Mauricio Rubio, CEO de OSC Top Solutions Group. Integrador tecnológico líder en infraestructuras críticas en América Latina.",
  robots: { index: false, follow: false },
};

export default function VCardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
