"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, ArrowDownRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════════════ */
const ACCENT = "#FF0057";
const DARK   = "#0F172A";
const NAVY   = "#000086";
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════ */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal]   = useState(0);
  const ref             = useRef<HTMLSpanElement>(null);
  const started         = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      let t0 = 0;
      const dur = 1800;
      const tick = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */

const stats = [
  { to: 300, suffix: "+", label: "Ingenieros",      sub: "en el equipo"         },
  { to: 16,  suffix: "",  label: "Países",           sub: "de operación"         },
  { to: 3,   suffix: "",  label: "NOCs 24/7",        sub: "Bogotá · Lima · CDMX" },
  { to: 30,  suffix: "+", label: "Años",             sub: "sin detenernos"       },
];


const valores = [
  {
    title: "La operación del cliente, primero",
    body:  "Cuando algo falla a las 3 AM, hay alguien de OSC que ya está levantado. No porque se lo pedimos — porque así somos.",
    ej:    "On-call rotativo en NOC con cobertura 24/7/365. Sin excepción.",
  },
  {
    title: "Entendemos OT y IT de verdad",
    body:  "No somos consultores que leen papers sobre sistemas industriales. Somos arquitectos que operan PLCs, SCADA, IEC 61850 y redes reales todos los días.",
    ej:    "Arquitectos certificados en redes industriales, no solo en cloud.",
  },
  {
    title: "Junto al cliente, no detrás de un ticket",
    body:  "Cuando hay un despliegue crítico, hay un ingeniero OSC en sitio. La ingeniería embebida no es un diferenciador de ventas — es como trabajamos.",
    ej:    "Residentes en sitio durante despliegues críticos de alto riesgo.",
  },
  {
    title: "Los datos no mienten, las opiniones sí",
    body:  "MTTR, uptime, MTBF, NPS técnico — todo documentado y auditado. Si no puedes medirlo, no puedes mejorar. Y mejorar es obligatorio.",
    ej:    "Tablero ejecutivo mensual auditado con KPIs contractuales.",
  },
  {
    title: "Seguridad desde el diseño",
    body:  "La seguridad no es un parche al final del proyecto. Cada arquitectura pasa por revisión antes de llegar a campo. Sin excepciones.",
    ej:    "Revisión obligatoria de Security Architect en pre-producción.",
  },
  {
    title: "Aprendemos de cada falla",
    body:  "El post-mortem no es castigo — es la forma en que crecemos. Cada Sev-1 genera documentación disponible para todo el equipo. 400+ y contando.",
    ej:    "400+ post-mortems documentados. 100% de Sev-1 cubiertos.",
  },
];

const habitos = [
  {
    title: "Siempre hay alguien",
    body:  "Tres NOC regionales en Bogotá, Lima y CDMX. La infraestructura crítica no tiene horario de oficina — y nosotros tampoco.",
    kpi:   "< 30 min respuesta crítica",
  },
  {
    title: "Decisiones cerca del campo",
    body:  "Tech leads regionales con autonomía real. El escalamiento no puede tardar más que el incidente. Punto.",
    kpi:   "< 30 min escalamiento",
  },
  {
    title: "Si no está escrito, no ocurrió",
    body:  "Documentamos todo. Cada incidente Sev-1 genera un post-mortem estructurado disponible para todo el equipo.",
    kpi:   "400+ post-mortems",
  },
  {
    title: "Practicamos antes de necesitarlo",
    body:  "Drills de failover y contingencia cada 90 días. El peor momento para ensayar es durante una emergencia real.",
    kpi:   "Drills cada 90 días",
  },
  {
    title: "El NPS técnico es nuestro",
    body:  "No es un indicador de marketing. Es la métrica del equipo de ingeniería — porque la relación con el cliente es responsabilidad nuestra.",
    kpi:   "NPS técnico > 80",
  },
];

const benefits = [
  { wide: true,  title: "Responsabilidad real desde el primer día",  body: "Operarás infraestructura que sostiene ciudades, puertos, minas y gobiernos en 16 países. Tu trabajo tiene impacto medible en millones de personas — no en una demo." },
  { wide: false, title: "Certificaciones 100% cubiertas, sin límite", body: "Fortinet, Nokia, Ericsson, Cisco, Palo Alto, CrowdStrike. Sin burocracia ni techo anual: lo que necesites para crecer, lo cubrimos." },
  { wide: false, title: "Proyectos en 16 países, crecimiento lateral", body: "Colombia, Perú, Panamá, México y más. Acceso real a verticales distintos: minería, puertos, utilities, energía, gobierno." },
  { wide: true,  title: "Aprendes de quien ya lo vivió",              body: "Tech leads y engineering managers con 20+ años en infraestructura crítica real. No aprenderás de quien vende SLAs — aprenderás de quien los opera y defiende." },
  { wide: false, title: "On-call profesional, no heroísmo solitario",  body: "Rotación clara, compensación por standby y equipo regional de respaldo. El descanso no se negocia — es parte del sistema operativo." },
  { wide: true,  title: "Tú decides cómo crecer",                     body: "Staff Engineer, Tech Lead, VP Engineering o Arquitecto Principal. Dos caminos claros: profundidad técnica o liderazgo. Sin presión, con dirección." },
];

const pidItems = [
  "Revisión trimestral 1:1 con tu manager directo",
  "Budget anual para certificaciones técnicas, sin techo",
  "LinkedIn Learning · Coursera · A Cloud Guru incluidos",
  "Congresos pagados: Cisco Live, Black Hat y más",
  "Rotación regional disponible cada 12–18 meses",
];

const testimonials = [
  {
    quote: "Lo que más me sorprendió de OSC fue que el aprendizaje no viene de un curso — viene de resolver lo que nadie más ha resuelto antes. Aquí el trabajo te hace crecer aunque no lo estés buscando.",
    name: "Ingeniero de Red",
    role: "NOC · Bogotá",
    tenure: "4 años en OSC",
  },
  {
    quote: "Pasé de gestionar proyectos locales a liderar despliegues en tres países en menos de dos años. El crecimiento en OSC no es una promesa — es el resultado natural de lo que haces.",
    name: "Arquitecto de Soluciones",
    role: "Operaciones · Lima",
    tenure: "3 años en OSC",
  },
  {
    quote: "Las certificaciones me las pagaron sin preguntar dos veces. CCNP, NSE 7 y AWS SAA — todas mientras trabajaba en proyectos reales de infraestructura crítica.",
    name: "Network Engineer",
    role: "Bogotá · Colombia",
    tenure: "5 años en OSC",
  },
  {
    quote: "Desde el primer mes tuve responsabilidad real sobre infraestructura crítica. Nadie me pidió que esperara. Eso no se aprende en ningún bootcamp ni en ninguna consultoría.",
    name: "Security Analyst",
    role: "SOC · Ciudad de México",
    tenure: "2 años en OSC",
  },
  {
    quote: "El on-call en OSC es diferente: hay un equipo detrás, protocolos claros y rotación justa. No es heroísmo individual — es ingeniería bien organizada.",
    name: "NOC Analyst",
    role: "Operaciones · Panamá",
    tenure: "18 meses en OSC",
  },
];

/* ═══════════════════════════════════════════════════════
   SHARED VARIANTS
═══════════════════════════════════════════════════════ */

const FU = {
  hidden:  { opacity: 0, y: 40 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease, delay: d },
  }),
};

const SG = (delay = 0.09) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay } },
});

const CV = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/* ═══════════════════════════════════════════════════════
   TESTIMONIAL CAROUSEL
═══════════════════════════════════════════════════════ */
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setCurrent((c) => (c + 1) % testimonials.length),
      5000
    );
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (i: number) => { setCurrent(i); resetTimer(); };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: `linear-gradient(145deg, #04101f 0%, #0a1a2e 100%)` }}
    >
      {/* subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.04]" />
      {/* breathing glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}07 0%, transparent 60%)` }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* accent line */}
        <motion.div
          className="h-[2px] mx-auto mb-10 rounded-full"
          style={{ background: ACCENT, width: 0 }}
          whileInView={{ width: "3rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease }}
        />

        {/* label */}
        <motion.p
          className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8"
          style={{ color: `${ACCENT}99` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Voces del equipo
        </motion.p>

        {/* quote — animated on change */}
        <div className="min-h-[96px] flex flex-col justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              className="text-white/75 text-lg md:text-xl font-light leading-relaxed italic"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease }}
            >
              &ldquo;{testimonials[current].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* attribution */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`attr-${current}`}
            className="flex flex-col items-center gap-0.5 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <p className="font-semibold text-white text-[13px] tracking-wide">
              {testimonials[current].name}
              <span className="text-white/35 font-normal"> · {testimonials[current].role}</span>
            </p>
            <p className="text-white/30 text-[11px]">{testimonials[current].tenure}</p>
          </motion.div>
        </AnimatePresence>

        {/* dot navigation */}
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              className="flex items-center justify-center p-1 cursor-pointer"
            >
              <motion.div
                className="rounded-full"
                style={{
                  height: "5px",
                  background: i === current ? ACCENT : "rgba(255,255,255,0.18)",
                }}
                animate={{ width: i === current ? "22px" : "5px" }}
                transition={{ duration: 0.3, ease }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function CarreraClient() {
  return (
    <>
      {/* ╔═══════════════════════════════════╗
          ║  01 · HERO                        ║
          ╚═══════════════════════════════════╝ */}
      <section
        className="relative min-h-screen flex items-center pt-36 pb-24 overflow-hidden"
        style={{ background: "#04101f" }}
      >
        {/* ── Hero background photo ───────────────────── */}
        <div className="absolute inset-0">
          <Image
            src="/Carrera Herobanner.png"
            alt="Ingenieros OSC operando infraestructura crítica"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          {/* dark gradient overlay — ensures text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(100deg,
                rgba(4,16,31,0.93) 0%,
                rgba(4,16,31,0.80) 45%,
                rgba(4,16,31,0.45) 75%,
                rgba(4,16,31,0.30) 100%)`,
            }}
          />
        </div>

        <div className="absolute inset-0 grid-bg opacity-[0.03]" />

        {/* breathing glows */}
        <motion.div
          className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ACCENT}0B 0%, transparent 65%)`, transform: "translate(35%,-35%)" }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${NAVY}50 0%, transparent 65%)`, transform: "translate(-30%,30%)" }}
          animate={{ scale: [1, 1.09, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          {/* breadcrumb */}
          <motion.nav
            className="flex items-center gap-1.5 text-white/25 text-xs mb-14"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white/55 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-white/45">Carrera en OSC</span>
          </motion.nav>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* ── LEFT: headline ─────────────── */}
            <div className="lg:col-span-7">
              <motion.p
                className="text-[10px] font-bold uppercase tracking-[0.35em] mb-7"
                style={{ color: ACCENT }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease }}
              >
                Beyond Tech · Beyond Limits
              </motion.p>

              <div className="overflow-hidden mb-1">
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[0.98] tracking-tight"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.28, duration: 0.8, ease }}
                >
                  Operamos lo que
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-1">
                <motion.div
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-[0.98] tracking-tight"
                  style={{ color: ACCENT }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.38, duration: 0.8, ease }}
                >
                  no puede fallar.
                </motion.div>
              </div>
              <div className="overflow-hidden mb-9">
                <motion.p
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white/20 leading-[0.98] tracking-tight"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.48, duration: 0.8, ease }}
                >
                  Tu carrera tampoco.
                </motion.p>
              </div>

              <motion.p
                className="text-white/55 text-lg font-light leading-relaxed max-w-xl mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6, ease }}
              >
                Somos 300+ ingenieros operando redes críticas, ciberseguridad OT/IT y NOC 24/7 en 16 países de América. Si quieres que tu trabajo tenga impacto real — y tu carrera, dirección — estás en el lugar correcto.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.55, ease }}
              >
                <motion.a
                  href="https://osctopsolutionsgroup.zohorecruit.com/jobs/Careers"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-full text-sm"
                  style={{ background: ACCENT, boxShadow: `0 4px 28px ${ACCENT}40` }}
                  whileHover={{ scale: 1.04, boxShadow: `0 8px 40px ${ACCENT}60` }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  Ver vacantes abiertas <ArrowRight size={15} />
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center gap-2 border text-white/80 hover:text-white font-semibold px-8 py-4 rounded-full text-sm transition-colors duration-200"
                    style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}
                  >
                    Cuéntanos tu historia <ArrowDownRight size={15} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* ── RIGHT: stat cards ──────────── */}
            <motion.div
              className="lg:col-span-5 grid grid-cols-2 gap-3 hidden lg:grid"
              initial="hidden"
              animate="visible"
              variants={SG(0.12)}
            >
              {stats.map(({ to, suffix, label, sub }) => (
                <motion.div
                  key={label}
                  className="rounded-2xl p-6 flex flex-col border"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                  variants={{
                    hidden:  { opacity: 0, y: 30, scale: 0.94 },
                    visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease, delay: 0.85 } },
                  }}
                  whileHover={{
                    borderColor: `${ACCENT}40`,
                    background: "rgba(255,0,87,0.04)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <p className="text-4xl font-black mb-1 leading-none" style={{ color: ACCENT }}>
                    <Counter to={to} suffix={suffix} />
                  </p>
                  <p className="text-white font-semibold text-sm mb-0.5">{label}</p>
                  <p className="text-white/35 text-xs font-light">{sub}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* mobile stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-14 rounded-2xl overflow-hidden lg:hidden"
            style={{ background: "rgba(255,255,255,0.07)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease }}
          >
            {stats.map(({ to, suffix, label }) => (
              <div key={label} className="flex flex-col items-center py-7 px-4 text-center" style={{ background: "rgba(255,255,255,0.022)" }}>
                <p className="text-3xl font-bold mb-1" style={{ color: ACCENT }}><Counter to={to} suffix={suffix} /></p>
                <p className="text-white/38 text-[11px] font-medium leading-snug">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════╗
          ║  02 · VALORES                     ║
          ╚═══════════════════════════════════╝ */}
      <section className="py-28 bg-[#F8FAFC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* header */}
          <div className="grid lg:grid-cols-[2fr_3fr] gap-16 items-end mb-16">
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={FU} custom={0}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: ACCENT }}>
                Valores
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
                Los principios que operamos,{" "}
                <span style={{ color: ACCENT }}>no decoramos.</span>
              </h2>
            </motion.div>
            <motion.p
              className="text-slate-500 text-lg font-light leading-relaxed"
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={FU} custom={0.1}
            >
              Estos seis principios no están en un póster de la oficina. Los vivimos cuando algo falla a las 3 AM y hay que resolverlo — y cuando el cliente llama sin previo aviso un viernes.
            </motion.p>
          </div>

          {/* cards grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={SG(0.09)}
          >
            {valores.map(({ title, body, ej }) => (
              <motion.div
                key={title}
                variants={CV}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
              >
                <article
                  className="bg-white rounded-2xl p-8 h-full flex flex-col border border-slate-100 hover:shadow-xl transition-shadow duration-300"
                  style={{ borderTop: `2px solid ${ACCENT}` }}
                >
                  <h3 className="text-[#0F172A] font-bold text-[17px] leading-snug mb-3">{title}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-1 mb-6">{body}</p>
                  <div className="rounded-xl px-4 py-3" style={{ background: `${ACCENT}07`, borderLeft: `3px solid ${ACCENT}` }}>
                    <p className="text-[9px] font-black uppercase tracking-[0.22em] mb-1" style={{ color: ACCENT }}>En la práctica</p>
                    <p className="text-slate-600 text-[12px] font-medium leading-snug">{ej}</p>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════╗
          ║  03 · CÓMO TRABAJAMOS             ║
          ╚═══════════════════════════════════╝ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,134,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-[2fr_3fr] gap-16 items-end mb-16">
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={FU} custom={0}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: ACCENT }}>Cómo trabajamos</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
                Hábitos que defendemos{" "}
                <span style={{ color: ACCENT }}>cuando nadie mira.</span>
              </h2>
            </motion.div>
            <motion.p
              className="text-slate-500 text-lg font-light leading-relaxed"
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={FU} custom={0.1}
            >
              Más que reglas, son compromisos. Lo que diferencia a un equipo ordinario de uno que opera lo que no puede detenerse — a las 2 AM, un domingo, en campo.
            </motion.p>
          </div>

          <div className="flex flex-col divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-white">
            {habitos.map(({ title, body, kpi }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5, ease }}
              >
                <motion.div
                  className="grid md:grid-cols-[1fr_2fr_auto] items-center gap-6 px-8 py-7"
                  whileHover={{ backgroundColor: "#F8FAFC" }}
                  transition={{ duration: 0.15 }}
                >
                  <h3 className="text-[#0F172A] font-bold text-[15px] leading-snug">{title}</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">{body}</p>
                  <motion.code
                    className="text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap self-center"
                    style={{ background: `${ACCENT}09`, color: ACCENT, fontFamily: "monospace" }}
                    whileHover={{ background: `${ACCENT}18`, transition: { duration: 0.15 } }}
                  >
                    {kpi}
                  </motion.code>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════╗
          ║  04 · TESTIMONIALS CAROUSEL       ║
          ╚═══════════════════════════════════╝ */}
      <TestimonialCarousel />

      {/* ╔═══════════════════════════════════╗
          ║  05 · POR QUÉ TRABAJAR AQUÍ       ║
          ╚═══════════════════════════════════╝ */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, #060d1e 0%, #0b1a32 100%)` }}
      >
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ACCENT}09 0%, transparent 65%)`, transform: "translate(35%,-35%)" }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* header */}
          <div className="grid lg:grid-cols-[2fr_3fr] gap-16 items-end mb-16">
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={FU} custom={0}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: ACCENT }}>
                Por qué trabajar aquí
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Seis razones que hacen{" "}
                <span style={{ color: ACCENT }}>la diferencia.</span>
              </h2>
            </motion.div>
            <motion.p
              className="text-white/40 text-base font-light leading-relaxed"
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={FU} custom={0.1}
            >
              Buscamos ingenieros y líderes que quieran que su trabajo importe. A cambio, ofrecemos lo que realmente necesitas para crecer — no lo que suena bien en un jobpost.
            </motion.p>
          </div>

          {/* bento */}
          <motion.div
            className="grid lg:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-16"
            style={{ background: "rgba(255,255,255,0.07)" }}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={SG(0.08)}
          >
            {benefits.map(({ wide, title, body }) => (
              <motion.article
                key={title}
                className={wide ? "lg:col-span-2" : "lg:col-span-1"}
                variants={CV}
              >
                <motion.div
                  className="flex flex-col h-full p-8 lg:p-10 cursor-default"
                  style={{ backgroundColor: "rgba(6,13,30,0.92)" }}
                  whileHover={{ backgroundColor: "rgba(255,0,87,0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="h-[2px] mb-7 rounded-full"
                    style={{ background: ACCENT, width: "2rem" }}
                    whileHover={{ width: "3.5rem" }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className={`text-white font-semibold leading-snug mb-3 ${wide ? "text-lg" : "text-[15px]"}`}>
                    {title}
                  </h3>
                  <p className="text-white/38 text-sm font-light leading-relaxed">{body}</p>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            <motion.a
              href="https://osctopsolutionsgroup.zohorecruit.com/jobs/Careers"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-10 py-4 rounded-full text-sm"
              style={{ background: ACCENT, boxShadow: `0 4px 32px ${ACCENT}45` }}
              whileHover={{ scale: 1.05, boxShadow: `0 8px 44px ${ACCENT}60` }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              Quiero ver las vacantes <ArrowRight size={15} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════╗
          ║  06 · CRECIMIENTO                 ║
          ╚═══════════════════════════════════╝ */}
      <section className="py-28 bg-[#F8FAFC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* left — sticky */}
            <motion.div
              className="lg:sticky lg:top-32"
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={FU} custom={0}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: ACCENT }}>
                Crecimiento
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-6">
                Tu carrera es tuya.{" "}
                <span style={{ color: ACCENT }}>Nosotros la impulsamos.</span>
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-10">
                Cada persona en OSC tiene un plan de crecimiento personalizado. No es un documento en un cajón — es una conversación real con tu manager cada trimestre, donde tú decides hacia dónde ir.
              </p>
              <motion.div
                className="inline-flex items-center gap-5 rounded-2xl px-7 py-5 border cursor-default"
                style={{ background: `${ACCENT}07`, borderColor: `${ACCENT}20` }}
                whileHover={{ scale: 1.02, borderColor: `${ACCENT}40`, transition: { duration: 0.2 } }}
              >
                <p className="text-3xl font-black leading-none" style={{ color: ACCENT }}>
                  <Counter to={100} suffix="%" />
                </p>
                <p className="text-sm text-slate-600 font-medium leading-snug">
                  de certificaciones cubiertas<br />
                  <span className="text-slate-400 font-light text-xs">sin límite anual · sin excepciones</span>
                </p>
              </motion.div>
            </motion.div>

            {/* right — animated list */}
            <div className="flex flex-col gap-3">
              {pidItems.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-5 bg-white rounded-2xl px-6 py-5 border border-slate-100 cursor-default"
                  style={{ borderLeft: `3px solid ${ACCENT}` }}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.09, duration: 0.5, ease }}
                  whileHover={{ x: 6, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", transition: { duration: 0.18 } }}
                >
                  <span className="text-[11px] font-black tabular-nums shrink-0" style={{ color: `${ACCENT}40` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#0F172A] text-sm font-medium leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════╗
          ║  07 · CTA FINAL                   ║
          ╚═══════════════════════════════════╝ */}
      <section className="py-28 relative overflow-hidden" style={{ background: ACCENT }}>
        <div className="absolute inset-0 grid-bg opacity-[0.07]" />
        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.2) 0%, transparent 65%)", transform: "translate(35%,-35%)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 65%)", transform: "translate(-30%,30%)" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease }}
            >
              <p className="text-white/55 text-[10px] font-bold uppercase tracking-[0.3em] mb-5">Únete al equipo</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                ¿Listo para construir algo que realmente importa?
              </h2>
              <p className="text-white/70 text-lg font-light leading-relaxed">
                Si buscas un trabajo donde lo que haces tiene consecuencias reales — donde la infraestructura que operas sostiene ciudades enteras — queremos conocerte.
              </p>
            </motion.div>

            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.18 }}>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 bg-white font-bold px-10 py-4 rounded-full text-sm shadow-2xl"
                  style={{ color: ACCENT }}
                >
                  Cuéntanos tu historia <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
