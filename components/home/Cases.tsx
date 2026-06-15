"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, X, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ACCENT = "#FF0057";

type Step = { label: string; title: string; desc: string };
type Case = {
  id: string;
  tag: string;
  tagColor: string;
  num: string;
  title: string;
  subtitle: string;
  image: string;
  metric: string;
  reto: { context: string; objective: string; challenge: string };
  solucion: { approach: string; implemented: string; tech: string };
  steps: Step[];
  results: string[];
  quote: string;
};

const cases: Case[] = [
  {
    id: "cfe",
    tag: "Energía",
    tagColor: "#FF0057",
    num: "01",
    title: "CFE — Monitoreo Perimetral Predictivo",
    subtitle: "Subestaciones de transmisión blindadas contra intrusiones y fallas térmicas.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80&auto=format&fit=crop",
    metric: "Alertas tempranas automáticas 24/7",
    reto: {
      context: "Infraestructura eléctrica crítica distribuida en zonas de alta vulnerabilidad geográfica sin supervisión continua.",
      objective: "Blindar el perímetro de activos estratégicos y erradicar pérdidas financieras por sabotaje.",
      challenge: "Robo sistemático de mallas de tierra de cobre y riesgos de explosiones por sobrecalentamiento electromagnético.",
    },
    solucion: {
      approach: "Diseño modular basado en Edge Computing para eliminar la latencia en alertas críticas.",
      implemented: "Ecosistema unificado de videovigilancia térmica automatizada y analítica inteligente de comportamiento.",
      tech: "Radares térmicos integrados a cámaras PTZ, análisis termográfico de alta tensión y megafonía disuasoria LPR.",
    },
    steps: [
      { label: "01", title: "Descubrimiento", desc: "Auditoría técnica en subestaciones remotas para mapear puntos ciegos y riesgos térmicos." },
      { label: "02", title: "Diseño", desc: "Modelado de zonas críticas perimetrales y blindaje electromagnético para hardware de red." },
      { label: "03", title: "Implementación", desc: "Despliegue e interconexión de sensores, radares térmicos y servidores locales Edge Computing." },
      { label: "04", title: "Evolución", desc: "Optimización continua de algoritmos de detección analítica y automatización de protocolos de respuesta." },
    ],
    results: [
      "Mitigación drástica de interrupciones en el suministro eléctrico regional.",
      "Alertas tempranas descentralizadas e instantáneas ante brechas de seguridad.",
      "Registro perimetral automatizado y no invasivo bajo resguardo total continuo.",
    ],
    quote: "\"La automatización del monitoreo térmico perimetral transformó nuestra capacidad reactiva en un blindaje predictivo absoluto. OSC entregó ingeniería de misión crítica impecable.\"",
  },
  {
    id: "claro",
    tag: "Telecom",
    tagColor: "#000086",
    num: "02",
    title: "Claro — NOC Automatizado 24×7",
    subtitle: "Reingeniería operativa de gestión de incidentes hacia un modelo proactivo basado en datos.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop",
    metric: "SLA 0 incumplimientos · Satisfacción 10/10",
    reto: {
      context: "Operación crítica de red masiva con soporte técnico reactivo y falta de visibilidad unificada de los datos.",
      objective: "Centralizar la monitorización operativa de red bajo estrictos estándares mundiales de calidad y eficiencia.",
      challenge: "Tareas repetitivas manuales en más de 10,000 routers e incidentes reportados sin control mediante grupos de WhatsApp.",
    },
    solucion: {
      approach: "Transición de un modelo operativo de soporte reactivo a un esquema proactivo guiado por datos bajo estándares ITIL.",
      implemented: "Intervención integral y soporte ininterrumpido 24×7 del NOC con gestión bajo normas ISO 9001.",
      tech: "Softwares de automatización de red, tableros analíticos centralizados en Power BI y consolas unificadas Core/Acceso.",
    },
    steps: [
      { label: "01", title: "Descubrimiento", desc: "Auditoría de los flujos de gestión de incidentes y mapeo de procesos burocráticos repetitivos manuales." },
      { label: "02", title: "Diseño", desc: "Diseño del ecosistema de automatización de configuraciones de red y modelado de tableros de control de datos." },
      { label: "03", title: "Implementación", desc: "Despliegue del centro de operaciones unificado 24×7 e integración de flujos de automatización permanentes." },
      { label: "04", title: "Evolución", desc: "Evolución cultural del equipo técnico hacia analistas proactivos orientados a la anticipación de fallas." },
    ],
    results: [
      "Reducción absoluta a cero (0) de los incumplimientos en los SLA de la red.",
      "Calificación de excelencia operativa perfecta de 10/10 otorgada por la dirección.",
      "Despliegue permanente de 8 automatizaciones de alta escala, eliminando la burocracia manual.",
    ],
    quote: "\"La transición operativa gestionada por OSC superó todas nuestras expectativas métricas. Lograr un SLA impecable y un 10/10 de satisfacción valida su liderazgo técnico.\"",
  },
  {
    id: "cotas",
    tag: "Conectividad",
    tagColor: "#0F172A",
    num: "03",
    title: "COTAS — Backbone Fibra Interoceánica",
    subtitle: "1,800 km de fibra óptica transcontinental para romper el aislamiento digital boliviano.",
    image: "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=800&q=80&auto=format&fit=crop",
    metric: "1,800 km de fibra interoceánica activa",
    reto: {
      context: "Dependencia absoluta de terceros países para el tránsito internacional de datos, elevando costos de conectividad.",
      objective: "Proveer una ruta internacional alternativa, soberana, de alta capacidad y con latencia óptima hacia el mundo.",
      challenge: "Limitaciones financieras y cambiarias severas en la región que restringían proyectos de infraestructura masiva.",
    },
    solucion: {
      approach: "Cooperación estratégica transfronteriza y despliegue de infraestructura de transporte DWDM de alta eficiencia.",
      implemented: "Despliegue de un Backbone de Fibra Óptica Interoceánica cruzando fronteras reguladas.",
      tech: "Infraestructura de red óptica de larga distancia extendida a lo largo de más de 1,800 km a través de Perú y Brasil.",
    },
    steps: [
      { label: "01", title: "Descubrimiento", desc: "Análisis de viabilidad geopolítica y mapeo de interconexiones con redes troncales de cables submarinos." },
      { label: "02", title: "Diseño", desc: "Ingeniería de detalle de la ruta transcontinental DWDM y optimización de puntos de amplificación óptica." },
      { label: "03", title: "Implementación", desc: "Construcción y tendido de 1,800 km de fibra óptica robustecida bajo estrictos controles con los países vecinos." },
      { label: "04", title: "Evolución", desc: "Activación de servicios de transporte internacional de datos e integración a los nodos de contenido mundial." },
    ],
    results: [
      "Ruta de alta velocidad independiente conectando de forma directa con cables submarinos.",
      "Introducción de competencia estratégica en el mercado mayorista boliviano.",
      "Acceso directo y democratizado a nodos de contenido global de alta velocidad.",
    ],
    quote: "\"El despliegue de este backbone rompió paradigmas históricos de conectividad para el país. Un logro estratégico impecable de la mano de OSC.\"",
  },
  {
    id: "gold-data",
    tag: "Data Centers",
    tagColor: "#0F172A",
    num: "04",
    title: "Gold Data — Datacontenedores Resilientes",
    subtitle: "450 km de ruta troncal con nodos modulares antisísmicos y autonomía energética de 6 horas.",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=800&q=80&auto=format&fit=crop",
    metric: "Disponibilidad ininterrumpida Tier III/IV",
    reto: {
      context: "Creciente demanda de conectividad de alta confiabilidad para hiperescaladores y corporaciones globales.",
      objective: "Asegurar una disponibilidad continua equivalente a estándares internacionales Tier III y Tier IV.",
      challenge: "Ruta de 450 km expuesta a alta sismicidad, delincuencia física y redes de alimentación eléctrica inestables.",
    },
    solucion: {
      approach: "Diseño de micro-centros de datos hiper-redundantes aislados por completo de condiciones externas críticas.",
      implemented: "Despliegue de Datacontenedores de alta supervivencia distribuidos de forma estratégica en la ruta troncal.",
      tech: "Fibra subterránea, contenedores antisísmicos, alimentación -48V, UPS de 6 horas, paneles solares y respaldo satelital.",
    },
    steps: [
      { label: "01", title: "Descubrimiento", desc: "Estudios geológicos, de seguridad y de estabilidad de la red eléctrica en los 450 km de la traza." },
      { label: "02", title: "Diseño", desc: "Cálculo estructural de los datacontenedores de alta densidad y diseño de la matriz energética cuádruple." },
      { label: "03", title: "Implementación", desc: "Instalación física de módulos blindados, tendido de fibra óptica subterránea y acoplamiento híbrido." },
      { label: "04", title: "Evolución", desc: "Implementación de sensores IoT de micro-gestión ambiental y auditorías de tolerancia a fallas." },
    ],
    results: [
      "Supervivencia y disponibilidad ininterrumpida de red frente a fallas externas.",
      "Blindaje estructural antisísmico y contra sabotaje de nodos críticos.",
      "Soporte energético robusto autónomo continuo por más de 6 horas.",
    ],
    quote: "\"Nuestros clientes Big Tech demandan una disponibilidad impecable. Con la ingeniería modular de OSC, la ruta de 450 km opera con absoluta resiliencia.\"",
  },
  {
    id: "mineria",
    tag: "Minería",
    tagColor: "#FF0057",
    num: "05",
    title: "Minería 4.0 — Red Privada LTE/4.9G",
    subtitle: "Red unificada para automatización de flota pesada en superficie y túneles subterráneos.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80&auto=format&fit=crop",
    metric: "Flota autónoma sin tiempos muertos",
    reto: {
      context: "Entornos operativos hostiles de misión crítica que demandan la automatización total de maquinaria sin interrupciones.",
      objective: "Unificar todas las capas de producción, seguridad y operación bajo una única red de comunicaciones convergente.",
      challenge: "Conectividad omnipresente en túneles profundos y el alto riesgo operativo de frenar la producción durante la migración.",
    },
    solucion: {
      approach: "Implementación de redes celulares privadas escalables diseñadas para soportar ecosistemas de Industria 4.0.",
      implemented: "Red Privada unificada LTE/4.9G con habilitación transparente hacia capacidades avanzadas en la nube 5G.",
      tech: "Espectro de frecuencia dedicado 1800MHz, macro sitios, celdas pequeñas, ePC industrial, sistemas AHS/ADS y plataforma NDAC.",
    },
    steps: [
      { label: "01", title: "Descubrimiento", desc: "Auditoría de redes inalámbricas en mina activa y perfiles de conectividad requeridos por maquinaria pesada." },
      { label: "02", title: "Diseño", desc: "Modelado de cobertura dual (cielo abierto y túneles) e ingeniería de canales de frecuencia dedicados." },
      { label: "03", title: "Implementación", desc: "Instalación de macro celdas robustecidas e integración nativa con sistemas de acarreo y perforación autónoma." },
      { label: "04", title: "Evolución", desc: "Migración hacia la plataforma en la nube industrial 5G automatizada para control remoto en tiempo real." },
    ],
    results: [
      "Convergencia de redes logrando unificar capas de seguridad, operación y producción.",
      "Flota pesada operando con navegación autónoma precisa libre de tiempos muertos.",
      "Evolución fluida de conectividad hacia entornos 5G Cloud sin frenar la mina.",
    ],
    quote: "\"Poder orquestar camiones y perforadoras autónomas en superficie y subterráneo bajo una sola red estable es el santo grial de la minería moderna. Excelente ejecución de OSC.\"",
  },
  {
    id: "puertos",
    tag: "Puertos",
    tagColor: "#FF0057",
    num: "06",
    title: "Puertos Altamira & Manzanillo — Red 4G LTE",
    subtitle: "100% de cobertura inalámbrica industrial eliminando caídas logísticas en grúas portuarias.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80&auto=format&fit=crop",
    metric: "100% cobertura · Cero caídas logísticas",
    reto: {
      context: "Operación portuaria de alta exigencia comercial con caídas de comunicación constantes en maquinaria pesada de carga.",
      objective: "Asegurar una cobertura inalámbrica del 100% libre de puntos ciegos y garantizar la trazabilidad de activos en tiempo real.",
      challenge: "Bloqueo de ondas de radio por la presencia masiva de contenedores metálicos y condiciones climáticas marítimas adversas.",
    },
    solucion: {
      approach: "Red con topología robustecida integrada de forma nativa a los sistemas core logísticos de los operadores de patio.",
      implemented: "Despliegue integral de una Red Privada 4G LTE de alta disponibilidad con analítica inteligente de video.",
      tech: "Antenas industriales en superpostes, Core LTE dedicado, software logístico My Jack y Traffic Control, y cámaras con IA.",
    },
    steps: [
      { label: "01", title: "Descubrimiento", desc: "Simulación radioeléctrica predictiva y análisis de refracción electromagnética en patios portuarios." },
      { label: "02", title: "Diseño", desc: "Diseño arquitectónico de la red privada inalámbrica y acoplamiento con sistemas de control vehicular internos." },
      { label: "03", title: "Implementación", desc: "Instalación física de infraestructura de transmisión robustecida y configuración de terminales en grúas portuarias." },
      { label: "04", title: "Evolución", desc: "Integración de video analítica perimetral con IA para control automatizado de acceso de personas y vehículos." },
    ],
    results: [
      "100% de continuidad operativa inalámbrica garantizada en grúas portuarias.",
      "Trazabilidad absoluta y en tiempo real de contenedores eliminando puntos ciegos.",
      "Optimización logística inmediata con eliminación de retrasos en la transmisión.",
    ],
    quote: "\"La red privada 4G LTE de OSC eliminó por completo las caídas logísticas en nuestras grúas de izaje. Controlar el movimiento en tiempo real blindó la operación.\"",
  },
];

function CaseModal({ item, onClose }: { item: Case; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-44 shrink-0 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <span
            className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full text-white"
            style={{ background: item.tagColor }}
          >
            {item.tag}
          </span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X size={14} />
          </button>
          <div className="absolute bottom-4 left-4 right-16">
            <h2 className="text-white font-extrabold text-lg leading-snug">{item.title}</h2>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6">

          {/* Reto */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 mb-3">✔ Reto</p>
            <div className="space-y-2">
              {[
                { label: "Contexto", value: item.reto.context },
                { label: "Objetivo", value: item.reto.objective },
                { label: "Desafío", value: item.reto.challenge },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 w-16 shrink-0 pt-0.5">{label}</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Solución */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 mb-3">💡 Solución</p>
            <div className="space-y-2">
              {[
                { label: "Enfoque", value: item.solucion.approach },
                { label: "Solución", value: item.solucion.implemented },
                { label: "Tech", value: item.solucion.tech },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 w-16 shrink-0 pt-0.5">{label}</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* 4 pasos */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 mb-3">🔄 Nuestro Enfoque</p>
            <div className="grid grid-cols-2 gap-3">
              {item.steps.map((s) => (
                <div key={s.label} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[9px] font-black tabular-nums" style={{ color: ACCENT }}>{s.label}</span>
                  <p className="text-[#0F172A] font-bold text-xs mt-0.5 mb-1">{s.title}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Resultados */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 mb-3">📈 Resultados</p>
            <ul className="space-y-2">
              {item.results.map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: ACCENT }} />
                  <p className="text-slate-600 text-sm leading-relaxed">{r}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div
            className="rounded-2xl p-5"
            style={{ background: `${item.tagColor}08`, border: `1px solid ${item.tagColor}18` }}
          >
            <p className="text-slate-500 text-sm leading-relaxed italic">{item.quote}</p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Cases() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Case | null>(null);

  return (
    <>
      <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="cases-heading">
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Header */}
          <AnimatedSection className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-gray-200 bg-gray-50">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Casos de Éxito</span>
                </div>
                <h2 id="cases-heading" className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight max-w-2xl">
                  Resultados que{" "}
                  <span className="text-gradient">definen el estándar</span>
                </h2>
                <p className="text-slate-400 text-sm mt-3 max-w-md">
                  Proyectos reales. Métricas verificables. Impacto sostenido en infraestructuras críticas de LATAM.
                </p>
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

          {/* Cards — 3-col grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.07}>
                <motion.button
                  className="w-full text-left h-full"
                  whileHover={reduced ? undefined : { y: -5 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  onClick={() => setActive(item)}
                  aria-label={`Ver caso de éxito: ${item.title}`}
                >
                  <article className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden h-full flex flex-col hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 cursor-pointer">

                    {/* Top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      style={{ background: `linear-gradient(90deg, ${item.tagColor}, ${item.tagColor}30)` }}
                    />

                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: 200 }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.15) 55%, transparent 100%)" }} />
                      <span
                        className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full text-white"
                        style={{ background: item.tagColor }}
                      >
                        {item.tag}
                      </span>
                      <span className="absolute bottom-4 right-4 text-4xl font-black leading-none select-none text-white/15 tabular-nums">
                        {item.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-[#0F172A] font-bold text-base leading-snug mb-2 group-hover:text-[#FF0057] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="w-8 h-px mb-3 rounded-full transition-all duration-500 group-hover:w-12" style={{ backgroundColor: item.tagColor }} />
                      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5 line-clamp-2">
                        {item.subtitle}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black" style={{ color: ACCENT }}>↗</span>
                          <span className="text-xs font-semibold text-[#0F172A] leading-tight">{item.metric}</span>
                        </div>
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{ background: `${item.tagColor}15`, color: item.tagColor }}
                        >
                          <ChevronRight size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                </motion.button>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {active && <CaseModal item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
