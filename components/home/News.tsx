"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ACCENT = "#FF0057";

const news = [
  {
    date: "Mar 2026",
    tag: "MWC 2026",
    title: "OSC Top Solutions Group en MWC 2026: \"Hay que aprovechar esta era, la más importante de la transformación industrial\"",
    outlet: "TeleSemana",
    href: "https://www.telesemana.com/blog/2026/03/04/osc-top-solutions-group-en-mwc-2026-hay-que-aprovechar-esta-era-la-mas-importante-de-la-transformacion-industrial/",
    image: "https://www.telesemana.com/wp-content/uploads/2026/03/MWC-2026-Rivera-Gonzalez-OSC-e1772641310715.jpg",
  },
  {
    date: "Mar 2026",
    tag: "Conectividad",
    title: "OSC e IPT optimizan el tráfico satelital",
    outlet: "CTO Perú",
    href: "https://ctoperu.pe/articulo/44451/osc-e-ipt-optimizan-el-trafico-satelital/",
    image: null,
  },
  {
    date: "Mar 2026",
    tag: "Innovación",
    title: "Cómo IA y Edge elevan productividad del sector extractivo",
    outlet: "Radar Tecnológico",
    href: "https://radartecnologico.com/44309/tecnologia/como-ia-y-edge-elevan-productividad-del-sector-extractivo/",
    image: "https://radartecnologico.com/wp-content/uploads/2026/03/Como-IA-y-Edge-elevan-productividad-del-sector-extractivo.avif",
  },
  {
    date: "Feb 2026",
    tag: "Telecom",
    title: "Redes privadas 5G, la apuesta de OSC Top Solutions Group para transformar industrias críticas",
    outlet: "ITenLINEA",
    href: "https://itenlinea.com/redes-privadas-5g-la-apuesta-de-osc-top-solutions-group-para-transformar-industrias-criticas/",
    image: "https://itenlinea.com/wp-content/uploads/2026/02/OSC-1.webp",
  },
  {
    date: "Feb 2026",
    tag: "Negocio",
    title: "OSC Top Solutions Group creció más de 40% en ventas y 25% en ingresos operacionales en 2025",
    outlet: "Portafolio",
    href: "https://www.portafolio.co/tecnologia/la-compania-osc-top-solutions-group-crecio-mas-de-40-en-ventas-y-25-en-ingresos-operacionales-en-487793",
    image: "https://imagenes.portafolio.co/files/image_1200_675/uploads/2025/01/22/6791ad2ce5604.jpeg",
  },
  {
    date: "Mar 2026",
    tag: "Liderazgo",
    title: "El liderazgo femenino no es una cuota: es una ventaja competitiva en la economía actual",
    outlet: "ACIS",
    href: "https://www.acis.org.co/blog/noticias-2/el-liderazgo-femenino-no-es-una-cuota-es-una-ventaja-competitiva-en-la-economia-actual-6748",
    image: "https://www.acis.org.co/web/image/blog.post/6748/author_avatar/El%20liderazgo%20femenino%20no%20es%20una%20cuota:%20es%20una%20ventaja%20competitiva%20en%20la%20econom%C3%ADa%20actual?unique=797b339",
  },
];

export default function News() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="news-heading">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-gray-200 bg-gray-50">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Últimas Noticias
                </span>
              </div>
              <h2
                id="news-heading"
                className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight max-w-2xl"
              >
                OSC en los{" "}
                <span className="text-gradient">medios especializados</span>
              </h2>
            </div>
            <Link
              href="/beyond-tech"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#0F172A] transition-colors duration-200 shrink-0"
            >
              Ver todas las noticias
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.08}>
              <motion.div
                className="h-full"
                whileHover={reduced ? undefined : { y: -6 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden h-full flex flex-col hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 cursor-pointer"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}30)` }}
                />

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #FF0057 0%, #0F172A 100%)" }}
                    >
                      <span className="text-white/15 text-7xl font-black select-none tracking-tighter">OSC</span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.10) 50%, transparent 100%)" }}
                  />
                  {/* Tag */}
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">

                  {/* Date */}
                  <span className="text-[10px] font-bold uppercase tracking-[0.20em] text-slate-400 mb-3 block">
                    {item.date}
                  </span>

                  {/* Divider */}
                  <div
                    className="w-8 h-px mb-4 rounded-full transition-all duration-500 group-hover:w-14"
                    style={{ backgroundColor: ACCENT }}
                  />

                  {/* Title */}
                  <h3 className="text-[#0F172A] font-bold text-[15px] leading-snug flex-1 mb-6 group-hover:text-[#FF0057] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 group-hover:text-[#0F172A] transition-colors duration-300">
                      {item.outlet}
                    </span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#FF0057] group-hover:border-[#FF0057]"
                      style={{ borderColor: `${ACCENT}25`, backgroundColor: `${ACCENT}08` }}
                    >
                      <ArrowUpRight size={13} className="text-white" />
                    </span>
                  </div>
                </div>
              </a>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
