"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ACCENT = "#FF0057";

const industries = [
  {
    label: "Power Utilities",
    desc:  "Redes eléctricas, subestaciones y plantas de generación con operación ininterrumpida.",
    href:  "/industrias/power-utilities",
    num:   "01",
  },
  {
    label: "Energía & Minería",
    desc:  "Conectividad y seguridad para operaciones remotas en entornos de alta exigencia.",
    href:  "/industrias/energia-mineria",
    num:   "02",
  },
  {
    label: "Puertos",
    desc:  "Automatización, videovigilancia e integración logística para terminales portuarios.",
    href:  "/industrias/puertos",
    num:   "03",
  },
  {
    label: "Gobierno",
    desc:  "Ciudades inteligentes, seguridad ciudadana e infraestructura de comunicaciones públicas.",
    href:  "/industrias/gobierno",
    num:   "04",
  },
  {
    label: "Telecom",
    desc:  "Redes 4G/5G privadas, backhaul de microondas y gestión de espectro para operadores.",
    href:  "/industrias/telecoms",
    num:   "05",
  },
];

export default function Industries() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-gray-200 bg-gray-50">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Verticales
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight max-w-xl">
                Operamos donde el fallo{" "}
                <span className="text-gradient">no es una opción</span>
              </h2>
            </div>
            <p className="text-[#475569] text-base font-light max-w-sm leading-relaxed lg:text-right">
              Cinco verticales críticas. Un solo integrador con 30 años de experiencia comprobada en América.
            </p>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {industries.map((ind, i) => (
            <AnimatedSection key={ind.label} delay={i * 0.07}>
              <motion.div
                className="h-full"
                whileHover={reduced ? undefined : { y: -6 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
              <Link
                href={ind.href}
                className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent line — reveals on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}30)` }}
                />

                <div className="flex flex-col flex-1 p-7">

                  {/* Number */}
                  <span
                    className="text-[11px] font-black tabular-nums mb-6 tracking-widest transition-colors duration-300"
                    style={{ color: `${ACCENT}55` }}
                  >
                    {ind.num}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-[#0F172A] text-lg leading-snug mb-3 group-hover:text-[#FF0057] transition-colors duration-300">
                    {ind.label}
                  </h3>

                  {/* Divider */}
                  <div
                    className="w-8 h-px mb-4 rounded-full transition-all duration-500 group-hover:w-14"
                    style={{ backgroundColor: ACCENT }}
                  />

                  {/* Description */}
                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-1 mb-8">
                    {ind.desc}
                  </p>

                  {/* CTA row */}
                  <div className="flex items-center justify-between mt-auto">
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 group-hover:tracking-[0.24em]"
                      style={{ color: ACCENT }}
                    >
                      Ver más
                    </span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:bg-[#FF0057] group-hover:border-[#FF0057] group-hover:shadow-lg group-hover:shadow-[#FF0057]/25"
                      style={{ borderColor: `${ACCENT}25`, backgroundColor: `${ACCENT}06` }}
                    >
                      <ArrowUpRight
                        size={13}
                        className="transition-colors duration-300 group-hover:text-white"
                        style={{ color: ACCENT }}
                      />
                    </span>
                  </div>
                </div>
              </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
