import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WD44GWZQ');`,
          }}
        />
        <Script
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WYRMMQVMJZ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WYRMMQVMJZ');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#1A1A1A] text-white font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WD44GWZQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
