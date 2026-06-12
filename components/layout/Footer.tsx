import Link from "next/link";
import Image from "next/image";


const footerLinks = {
  Soluciones: [
    { label: "Connectivity & Telecom",           href: "/soluciones/connectivity-telecom"              },
    { label: "AI-Powered Operations",            href: "/soluciones/ai-powered-operations"             },
    { label: "Critical Infrastructure Security", href: "/soluciones/critical-infrastructure-security"  },
    { label: "Managed Operations",               href: "/soluciones/managed-operations"                },
  ],
  Industrias: [
    { label: "Power Utilities",   href: "/industrias#utilities" },
    { label: "Energía & Minería", href: "/industrias#energia"   },
    { label: "Puertos",           href: "/industrias#puertos"   },
    { label: "Gobierno",          href: "/industrias#gobierno"  },
    { label: "Telecom",           href: "/industrias#telecom"   },
  ],
  Empresa: [
    { label: "Nosotros",      href: "/nosotros"    },
    { label: "Beyond Tech",   href: "/beyond-tech" },
    { label: "OSC Connect",   href: "/osc-connect" },
    { label: "Contacto",      href: "/contacto"    },
    { label: "Políticas OSC", href: "/compliance"  },
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/osctopsolutionsgroup/",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@osctopsolutionsgroup",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/OSCTopsolutionsgroup",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/osc-telecoms/",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/4QgBueN0xO1JsyfbFaD8qD?si=82118310010c416d",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">

        {/* Top row: Brand + Nav columns */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0">

          {/* Brand block */}
          <div className="lg:w-[280px] shrink-0 lg:pr-12">
            <Image
              src="/logo-footer.png"
              alt="OSC Top Solutions"
              width={180}
              height={48}
              className="h-11 w-auto object-contain mb-5"
            />
            <p className="text-white/40 text-xs leading-relaxed mb-5">
              Orquestamos soluciones end-to-end para garantizar la continuidad
              operativa en infraestructuras críticas en América.
            </p>
            <p className="text-[#FF0057] font-bold text-[10px] tracking-widest uppercase">
              BEYOND TECH. BEYOND LIMITS.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/40 hover:text-white text-sm whitespace-nowrap transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/8" />

        {/* Bottom bar: Subscribe | Social icons | Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ svg, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center text-white/40 hover:border-[#FF0057] hover:text-[#FF0057] hover:bg-[#FF0057]/8 transition-all duration-200"
              >
                {svg}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/20 text-xs shrink-0">
            © {new Date().getFullYear()} OSC Top Solutions. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
