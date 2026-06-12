"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";

export default function CtaFinal() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#FF0057" }}>
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />
      {/* White glow top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: "radial-gradient(ellipse,#fff 0%,transparent 65%)", transform: "translate(20%,-30%)" }}
        aria-hidden="true"
      />
      {/* White glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(ellipse,#fff 0%,transparent 65%)", transform: "translate(-20%,20%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <AnimatedSection>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-7">
            <span className="w-10 h-px bg-white/40" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-[0.22em]">
              El siguiente paso es suyo
            </span>
            <span className="w-10 h-px bg-white/40" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight">
            ¿Dónde están los riesgos{" "}
            <span className="underline decoration-white/40 decoration-4 underline-offset-4">
              no gestionados
            </span>{" "}
            en su operación?
          </h2>

          {/* Subtext */}
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Hablemos. Nuestros expertos identifican brechas operativas y diseñan soluciones a medida para infraestructuras críticas.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.04 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2.5 bg-white text-[#FF0057] font-extrabold px-10 py-4 rounded-full transition-all duration-200 hover:bg-slate-50 hover:shadow-2xl text-base"
              >
                <CalendarCheck size={18} aria-hidden="true" />
                Hablar con un experto
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={reduced ? undefined : { scale: 1.04 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href="/soluciones"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base backdrop-blur-sm"
              >
                Ver soluciones
              </Link>
            </motion.div>
          </div>

          {/* Trust line */}
          <p className="mt-10 text-white/45 text-xs uppercase tracking-widest font-medium">
            16 países · 30 años de trayectoria · +2,000 clientes
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
