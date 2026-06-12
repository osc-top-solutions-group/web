"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ACCENT = "#FF0057";

const cases = [
  {
    tag: "Telecom",
    title: "Red 5G Stand Alone LATAM",
    description: "Desplegamos la primera red 5G SA de alta disponibilidad para operaciones críticas en múltiples países de América Latina.",
    result: "99.99% uptime garantizado",
    num: "01",
    image: "/red-5g.jpg",
  },
  {
    tag: "Puertos",
    title: "Infraestructura Portuaria Inteligente",
    description: "Implementamos trazabilidad en tiempo real y conectividad robusta para uno de los mayores puertos de la región.",
    result: "40% reducción en tiempos de espera",
    num: "02",
    image: "/portuaria-inteligente.jpg",
  },
  {
    tag: "Conectividad",
    title: "Expansión Fibra Óptica",
    description: "Tendido y operación de más de 5,000 km de fibra óptica para conectar zonas remotas de infraestructura crítica.",
    result: "+5,000 km de red operativa",
    num: "03",
    image: "/fibra-optica.jpg",
  },
];

export default function Cases() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="cases-heading">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              {/* Label */}
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-gray-200 bg-gray-50">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Casos de Éxito
                </span>
              </div>
              <h2
                id="cases-heading"
                className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight max-w-2xl"
              >
                La conexión está en el{" "}
                <span className="text-gradient">core de nuestra estrategia</span>
              </h2>
            </div>
            <Link
              href="/beyond-tech"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#0F172A] transition-colors duration-200 shrink-0"
            >
              Ver todos los casos
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.09}>
              <motion.div
                className="h-full"
                whileHover={reduced ? undefined : { y: -6 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
              <article className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden h-full flex flex-col hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}30)` }}
                />

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.15) 55%, transparent 100%)" }}
                  />
                  {/* Tag */}
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white">
                    {item.tag}
                  </span>
                  {/* Number */}
                  <span className="absolute bottom-4 right-4 text-4xl font-black leading-none select-none text-white/15 tabular-nums">
                    {item.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-[#0F172A] font-bold text-xl leading-snug mb-3 group-hover:text-[#FF0057] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className="w-8 h-px mb-4 rounded-full transition-all duration-500 group-hover:w-14"
                    style={{ backgroundColor: ACCENT }}
                  />

                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-1 mb-6">
                    {item.description}
                  </p>

                  {/* Metric */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black tabular-nums" style={{ color: ACCENT }}>↗</span>
                      <span className="text-sm font-semibold text-[#0F172A]">{item.result}</span>
                    </div>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#FF0057] group-hover:border-[#FF0057]"
                      style={{ borderColor: `${ACCENT}25`, backgroundColor: `${ACCENT}08` }}
                    >
                      <ArrowUpRight size={13} className="text-white" />
                    </span>
                  </div>
                </div>
              </article>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
