import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  /* ── Title template — page titles auto-append " | OSC" ── */
  title: {
    default: "Integrador Tecnológico Infraestructura Crítica LATAM | OSC",
    template: "%s | OSC Top Solutions",
  },
  description:
    "OSC integra conectividad, ciberseguridad OT/IT y operaciones gestionadas en 16 países. ISO 27001 + IEC 62443 vigentes 2027. +2,000 clientes y +33,000 nodos operativos en América Latina.",
  keywords: [
    "integrador tecnológico infraestructura crítica LATAM",
    "ciberseguridad OT infraestructura crítica",
    "redes privadas 5G LATAM",
    "managed services NOC SOC LATAM",
    "digital twin infraestructura crítica",
    "ISO 27001 IEC 62443",
    "OSC Top Solutions",
  ].join(", "),
  authors: [{ name: "OSC Top Solutions Group" }],
  creator: "OSC Top Solutions Group",
  metadataBase: new URL("https://osc-web-xi.vercel.app"),
  alternates: {
    canonical: "/",
    languages: { "es-419": "/" },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Integrador Tecnológico Infraestructura Crítica LATAM | OSC",
    description:
      "OSC integra conectividad, ciberseguridad OT/IT y operaciones gestionadas en 16 países. ISO 27001 + IEC 62443. +2,000 clientes en América Latina.",
    type: "website",
    locale: "es_419",
    siteName: "OSC Top Solutions Group",
    url: "https://osc-web-xi.vercel.app",
    images: [
      {
        url: "/banner-1.jpg",
        width: 1200,
        height: 630,
        alt: "OSC Top Solutions — Integrador tecnológico para infraestructuras críticas en América Latina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrador Tecnológico Infraestructura Crítica LATAM | OSC",
    description:
      "Conectividad, ciberseguridad OT/IT y operaciones gestionadas en 16 países. ISO 27001 + IEC 62443.",
    images: ["/banner-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`h-full antialiased ${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-[#1A1A1A] text-white font-sans">
        {/* Skip to main content — accessibility */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
