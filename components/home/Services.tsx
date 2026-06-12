"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ACCENT = "#FF0057";

const services = [
  {
    title: "Critical Infrastructure Security",
    description: "Seguridad convergente OT/IT: Zero Trust, gestión de terminales, protección perimetral y monitoreo automatizado para entornos industriales y corporativos.",
    href: "/soluciones/critical-infrastructure-security",
    num: "01",
  },
  {
    title: "AI-Powered Operations",
    description: "Videovigilancia con IA, gemelos digitales, comunicaciones operativas y plataformas de seguridad ciudadana para infraestructuras inteligentes.",
    href: "/soluciones/ai-powered-operations",
    num: "02",
  },
  {
    title: "Connectivity & Telecom Solutions",
    description: "Redes 4G/5G privadas, microondas, fibra óptica, IoT celular y satelital — con ciclo completo de ingeniería, despliegue, auditoría de calidad y operación NOC 24/7.",
    href: "/soluciones/connectivity-telecom",
    num: "03",
  },
  {
    title: "Managed Operations",
    description: "Workforce Management y BPO: talento especializado, gestión de proyectos PMO, centros de operaciones NOC/SOC y soporte TI sin carga administrativa.",
    href: "/soluciones/managed-operations",
    num: "04",
  },
];

export default function Services() {
  const reduced = useReducedMotion();

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#0F172A" }}
      aria-labelledby="services-heading"
    >
      {/* Subtle grid bg */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: ACCENT }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Portfolio de Soluciones
            </span>
          </div>
          <h2
            id="services-heading"
            className="text-4xl lg:text-5xl font-bold text-white mt-3 max-w-3xl mx-auto leading-tight"
          >
            Soluciones que garantizan{" "}
            <span style={{ color: ACCENT }}>resiliencia operativa</span>
          </h2>
          <p className="text-white/50 text-lg font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Cuatro pilares tecnológicos integrados que operamos end-to-end.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.07}>
              <motion.div
                className="h-full"
                whileHover={reduced ? undefined : { y: -6 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
              <Link
                href={service.href}
                className="group relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/30"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                aria-label={`Ver más sobre ${service.title}`}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}30)` }}
                />

                {/* Hover gradient fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}07 0%, transparent 60%)` }}
                />

                <div className="relative flex flex-col flex-1 p-7">
                  {/* Number */}
                  <span
                    className="text-[11px] font-black tabular-nums mb-6 tracking-widest"
                    style={{ color: `${ACCENT}50` }}
                  >
                    {service.num}
                  </span>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className="w-8 h-px mb-4 rounded-full transition-all duration-500 group-hover:w-14"
                    style={{ backgroundColor: ACCENT }}
                  />

                  {/* Description */}
                  <p className="text-white/45 text-sm font-light leading-relaxed flex-1 mb-8">
                    {service.description}
                  </p>

                  {/* CTA row */}
                  <div className="flex items-center justify-between mt-auto">
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 group-hover:tracking-[0.24em]"
                      style={{ color: `${ACCENT}90` }}
                    >
                      Ver más
                    </span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:bg-[#FF0057] group-hover:border-[#FF0057] group-hover:shadow-lg group-hover:shadow-[#FF0057]/30"
                      style={{ borderColor: `${ACCENT}25`, backgroundColor: `${ACCENT}10` }}
                    >
                      <ArrowUpRight
                        size={13}
                        className="transition-colors duration-300 group-hover:text-white"
                        style={{ color: ACCENT }}
                      />
                    </span>
                  </div>
                </div>

                {/* Bottom glow */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }}
                />
              </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
