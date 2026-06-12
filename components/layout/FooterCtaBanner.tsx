"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterCtaBanner() {
  const pathname = usePathname();

  // Hide on individual solution, industry, and carrera pages
  if (
    pathname.startsWith("/soluciones/") ||
    pathname.startsWith("/industrias/") ||
    pathname === "/carrera"
  ) {
    return null;
  }

  return (
    <div className="bg-[#FF0057]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">
            16 países · 30 años · +2,000 clientes
          </p>
          <h3 className="text-2xl font-bold text-white">
            La infraestructura crítica de América confía en OSC
          </h3>
        </div>
        <Link
          href="/contacto"
          className="shrink-0 bg-white text-[#FF0057] font-bold px-8 py-3 rounded-full hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Hablar con un experto →
        </Link>
      </div>
    </div>
  );
}
