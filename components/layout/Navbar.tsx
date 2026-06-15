"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, ChevronRight,
  Wifi, Brain, Shield, Radio, Briefcase,
  Zap, Mountain, Anchor, Building2,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const solucionesData = {
  categories: [
    {
      id: "critical-infrastructure-security",
      icon: Shield,
      color: "#FF0057",
      title: "Critical Infrastructure Security",
      tagline: "Seguridad convergente OT/IT",
      href: "/soluciones/critical-infrastructure-security",
      items: [
        { label: "Gestión de terminales (TI/OT)", desc: "Control y visibilidad de endpoints críticos" },
        { label: "Protección básica 4G/5G",        desc: "Seguridad en redes celulares privadas"      },
        { label: "Zero Trust y Gestión de acceso", desc: "Arquitectura de confianza cero"             },
        { label: "Seguridad Perimetral (TI/OT)",   desc: "Protección convergente de entornos OT/IT"  },
        { label: "Red Automatizada Monitoreo",     desc: "Vigilancia continua y respuesta automática" },
      ],
    },
    {
      id: "ai-powered-operations",
      icon: Brain,
      color: "#0F172A",
      title: "AI-Powered Operations",
      tagline: "Datos operativos en decisiones estratégicas",
      href: "/soluciones/ai-powered-operations",
      items: [
        { label: "Videovigilancia",                    desc: "Cámaras con IA para detección de eventos"    },
        { label: "Gemelos Digitales",                  desc: "Réplica digital de infraestructuras críticas" },
        { label: "Seguimiento de Activos",             desc: "Trazabilidad en tiempo real de recursos"     },
        { label: "Comunicaciones Operativas (PTT/PTV)", desc: "Push-to-Talk y Push-to-Video para campo"   },
        { label: "Análisis de Video Avanzado",         desc: "Procesamiento inteligente de video"         },
        { label: "Plataformas de Seguridad Ciudadana", desc: "Centros de monitoreo urbano integrados"     },
      ],
    },
    {
      id: "connectivity-telecom",
      icon: Wifi,
      color: "#FF0057",
      title: "Connectivity & Telecom Solutions",
      tagline: "Redes críticas, ingeniería y operación end-to-end",
      href: "/soluciones/connectivity-telecom",
      items: [
        { label: "Redes 4G y 5G Privadas",                       desc: "Redes privadas de alta disponibilidad"         },
        { label: "Redes de microondas",                          desc: "Bandas con licencia y libres"                  },
        { label: "Redes IP / MPLS / Segment Routing",            desc: "WAN gestionada con QoS garantizado"            },
        { label: "Conectividad Satelital Multi-Órbita",          desc: "Cobertura en zonas remotas sin infraestructura" },
        { label: "Redes ópticas (DWDM/OTN)",                    desc: "Fibra de alta capacidad y baja latencia"        },
        { label: "Operación de la red (NOC 24/7)",               desc: "NOC proactivo con SLA garantizados"            },
        { label: "Diseño e Ingeniería de red",                   desc: "Arquitectura técnica y detalle constructivo"   },
        { label: "Auditoría de Calidad 4G/5G",                   desc: "Pruebas de rendimiento y certificación"        },
        { label: "Despliegue de Fibra óptica",                   desc: "Tendido e integración de redes de fibra"       },
        { label: "Viabilidad y estudios de sitio",               desc: "Relevamiento técnico previo al despliegue"     },
      ],
    },
    {
      id: "managed-operations",
      icon: Briefcase,
      color: "#FF0057",
      title: "Managed Operations",
      tagline: "Talento y operación sin carga administrativa",
      href: "/soluciones/managed-operations",
      items: [
        { label: "Gestión Integral de Talento", desc: "Selección, contratación y gestión del rendimiento"  },
        { label: "Personal Especializado",       desc: "Perfiles técnicos por proyecto o tiempo parcial"   },
        { label: "Centros de Operaciones",       desc: "Tercerización de NOC (Red) y SOC (Seguridad)"      },
        { label: "Gestión de Proyectos (PMO)",   desc: "Auditorías de servicio y supervisión de nodos"     },
        { label: "Soporte y Transformación",     desc: "Soporte TI, Smart Support y desarrollo de software" },
        { label: "Servicios Corporativos",       desc: "Contact Center como Servicio y gestión de gastos"  },
      ],
    },
  ],
};

const industriasData = {
  sectors: [
    { icon: Zap,       color: "#FF0057", label: "Power Utilities",  desc: "Distribución eléctrica y redes de energía",    href: "/industrias/power-utilities" },
    { icon: Mountain,  color: "#0F172A", label: "Energía & Minería", desc: "Operaciones remotas en entornos hostiles",     href: "/industrias/energia-mineria"  },
    { icon: Anchor,    color: "#FF0057", label: "Puertos",           desc: "Logística y trazabilidad portuaria",           href: "/industrias/puertos"          },
    { icon: Building2, color: "#0F172A", label: "Gobierno",          desc: "Seguridad ciudadana e infraestructura pública",href: "/industrias/gobierno"         },
    { icon: Radio,     color: "#FF0057", label: "Telecoms",          desc: "Operadores y proveedores de red",              href: "/industrias/telecoms"         },
  ],
  stats: [
    { value: "16", label: "Países" },
    { value: "+2K", label: "Clientes" },
    { value: "30", label: "Años" },
  ],
};

/* ─────────────────────────────────────────
   MEGA MENU — SOLUCIONES
───────────────────────────────────────── */
function MegaMenuSoluciones({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(solucionesData.categories[0].id);
  const activeCategory = solucionesData.categories.find((c) => c.id === active)!;

  return (
    <div className="flex w-full" style={{ minWidth: 0 }}>
      {/* Left — category tabs */}
      <div className="w-44 shrink-0 bg-gray-50 rounded-l-2xl p-3 border-r border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-3">
          Áreas de solución
        </p>
        <ul className="space-y-1">
          {solucionesData.categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={cat.href}
                onMouseEnter={() => setActive(cat.id)}
                onClick={onClose}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all duration-150 group cursor-pointer ${
                  active === cat.id
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-500 hover:bg-white hover:text-gray-900"
                }`}
              >
                <span className="text-xs font-semibold leading-tight">{cat.title}</span>
                {active === cat.id && (
                  <ChevronRight size={11} className="ml-auto text-gray-400 shrink-0" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right — items grid */}
      <div className="flex-1 p-4 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
          >
            {/* Category header */}
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">{activeCategory.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{activeCategory.tagline}</p>
              </div>
              <span className="text-[10px] text-gray-300 tabular-nums font-medium ml-4 shrink-0">
                {activeCategory.items.length} servicios
              </span>
            </div>

            {/* Items — responsive grid */}
            <div className="grid grid-cols-3 xl:grid-cols-5 gap-x-2 gap-y-2">
              {activeCategory.items.map((item) => (
                <div
                  key={item.label}
                  className="group/item flex flex-col gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150 cursor-default"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-200 group-hover/item:scale-125"
                    style={{ backgroundColor: "#FF0057" }}
                  />
                  <p className="text-xs font-semibold text-gray-800 leading-snug group-hover/item:text-[#FF0057] transition-colors duration-150">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MEGA MENU — NOSOTROS
───────────────────────────────────────── */
const nosotrosLinks = [
  { label: "Nuestro propósito", desc: "Misión, valores y cultura OSC",           href: "/nosotros#proposito" },
  { label: "Partners",          desc: "Ecosistema de socios tecnológicos",        href: "/nosotros#partners"  },
  { label: "Nuestro equipo",    desc: "Líderes y especialistas de la región",     href: "/nosotros#equipo"    },
  { label: "OSC 30 años",       desc: "Historia e hitos de la compañía",          href: "/nosotros#30anos"    },
  { label: "Noticias",          desc: "Últimas novedades del sector",             href: "/nosotros#noticias"  },
];

function MegaMenuNosotros({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex w-full" style={{ minWidth: 0 }}>
      {/* Left — gray intro panel */}
      <div className="w-44 shrink-0 bg-gray-50 rounded-l-2xl p-3 border-r border-gray-100 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-3">Compañía</p>
          <div className="px-2">
            <p className="text-sm font-bold text-gray-900 leading-snug mb-2">
              30 años construyendo infraestructura crítica
            </p>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Presencia en 16 países. Más de 2,000 clientes en América.
            </p>
          </div>
        </div>
        <Link
          href="/nosotros"
          onClick={onClose}
          className="mx-2 mb-1 inline-flex items-center gap-1.5 text-[#FF0057] hover:text-[#d4004a] text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 group"
        >
          Ver todo <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Right — grid */}
      <div className="flex-1 p-4 min-w-0">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold text-gray-900">Nosotros</p>
            <p className="text-xs text-gray-400 mt-0.5">Conoce quiénes somos y cómo operamos</p>
          </div>
          <span className="text-[10px] text-gray-300 tabular-nums font-medium ml-4 shrink-0">
            {nosotrosLinks.length} secciones
          </span>
        </div>

        <div className="grid grid-cols-3 xl:grid-cols-5 gap-x-2 gap-y-2">
          {nosotrosLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="group/item flex flex-col gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-gray-300 group-hover/item:bg-[#FF0057] transition-colors duration-200 group-hover/item:scale-125" />
              <p className="text-xs font-semibold text-gray-800 leading-snug group-hover/item:text-[#FF0057] transition-colors duration-150">
                {link.label}
              </p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                {link.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MEGA MENU — INDUSTRIAS
───────────────────────────────────────── */
function MegaMenuIndustrias({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full" style={{ minWidth: 0 }}>
      <div className="flex gap-0">

        {/* Left — dark intro panel */}
        <div
          className="w-48 shrink-0 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden"
          style={{ background: "linear-gradient(150deg, #0A0F1E 0%, #0F172A 60%, #0A1020 100%)" }}
        >
          {/* Radial glow top-right */}
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,0,87,0.18) 0%, transparent 70%)" }}
          />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          {/* Bottom left glow */}
          <div
            className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,0,134,0.25) 0%, transparent 70%)" }}
          />

          {/* Content */}
          <div className="relative">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 mb-4 border"
              style={{ background: "rgba(255,0,87,0.12)", borderColor: "rgba(255,0,87,0.25)" }}
            >
              <span className="w-1 h-1 rounded-full bg-[#FF0057] animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF0057]">Industrias</span>
            </div>

            <p className="text-sm font-bold text-white leading-snug mb-3">
              Operamos donde el fallo{" "}
              <span style={{ color: "#FF0057" }}>no es una opción</span>
            </p>
            <p className="text-[10px] text-white/40 leading-relaxed">
              Soluciones end-to-end para los sectores más exigentes de América.
            </p>
          </div>

          {/* Stats */}
          <div className="relative mt-6 space-y-0 divide-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {industriasData.stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center justify-between py-2.5">
                <span
                  className="text-xl font-black tabular-nums"
                  style={{ color: i === 0 ? "#FF0057" : i === 1 ? "#FF0057" : "#FF0057" }}
                >
                  {stat.value}
                </span>
                <span className="text-[9px] text-white/35 uppercase tracking-[0.18em] font-bold text-right">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — sectors grid */}
        <div className="flex-1 p-4 min-w-0">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">Sectores industriales</p>
              <p className="text-xs text-gray-400 mt-0.5">Verticales críticas donde OSC opera end-to-end</p>
            </div>
            <span className="text-[10px] text-gray-300 tabular-nums font-medium ml-4 shrink-0">
              {industriasData.sectors.length} sectores
            </span>
          </div>

          <div className="grid grid-cols-3 xl:grid-cols-5 gap-2">
            {industriasData.sectors.map((sector, i) => {
              const Icon = sector.icon;
              const num = String(i + 1).padStart(2, "0");
              return (
                <Link
                  key={sector.label}
                  href={sector.href}
                  onClick={onClose}
                  className="group/card relative flex flex-col gap-3 p-3.5 rounded-2xl border border-gray-100 hover:border-[#FF0057]/25 hover:shadow-lg hover:shadow-[#FF0057]/05 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden bg-white"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300"
                    style={{ background: "linear-gradient(90deg, #FF0057, #FF005730)" }}
                  />

                  {/* Number + Icon row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tabular-nums text-gray-200">{num}</span>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 group-hover/card:scale-110"
                      style={{ background: "rgba(255,0,87,0.07)", border: "1px solid rgba(255,0,87,0.12)" }}
                    >
                      <Icon size={13} style={{ color: "#FF0057" }} />
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-xs font-bold text-gray-800 leading-snug group-hover/card:text-[#FF0057] transition-colors duration-200">
                    {sector.label}
                  </p>

                  {/* Desc */}
                  <p className="text-[10px] text-gray-400 leading-relaxed flex-1">
                    {sector.desc}
                  </p>

                  {/* Bottom arrow */}
                  <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                    <span className="text-[10px] font-bold text-[#FF0057]">Ver sector</span>
                    <ArrowRight size={9} className="text-[#FF0057] group-hover/card:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
const simpleNavItems = [
  { label: "Beyond Tech",    href: "/beyond-tech"   },
  { label: "Carrera",        href: "/carrera"        },
  { label: "Inversionistas", href: "/inversionistas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1280) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setOpenMenu(null);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-black/8" : ""
      } bg-white border-b border-gray-100`}
    >
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-[#FF0057] via-[#0F172A] to-[#FF0057]" />

      <nav className="max-w-7xl mx-auto px-4 xl:px-6 flex items-center h-[68px] xl:h-[72px] gap-3 xl:gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center z-10 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0057] rounded-sm"
          aria-label="OSC Top Solutions — Inicio"
          onClick={closeMenu}
        >
          <Image src="/logo-30anos.png" alt="OSC Top Solutions 30 Años" width={220} height={60} className="h-[38px] xl:h-[46px] w-auto object-contain" priority />
        </Link>

        {/* Desktop Nav — centered */}
        <ul className="hidden xl:flex items-center gap-0.5 flex-1 justify-center" role="menubar">

          {/* 1 · Soluciones y Servicios */}
          <li className="relative" onMouseEnter={() => setOpenMenu("soluciones")} onMouseLeave={closeMenu}>
            <button
              aria-haspopup="true" aria-expanded={openMenu === "soluciones"}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF0057] ${
                openMenu === "soluciones" ? "text-[#FF0057] bg-gray-50" : "text-gray-700 hover:text-[#FF0057] hover:bg-gray-50"
              }`}
            >
              Soluciones y Servicios
              <ChevronDown size={12} className={`transition-transform duration-200 ${openMenu === "soluciones" ? "rotate-180 text-[#FF0057]" : ""}`} />
            </button>
            <AnimatePresence>
              {openMenu === "soluciones" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-black/10 overflow-hidden"
                  style={{ width: "min(860px, calc(100vw - 2rem))", maxWidth: "calc(100vw - 2rem)" }}>
                  <div className="p-4"><MegaMenuSoluciones onClose={closeMenu} /></div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* 2 · Industrias */}
          <li className="relative" onMouseEnter={() => setOpenMenu("industrias")} onMouseLeave={closeMenu}>
            <button
              aria-haspopup="true" aria-expanded={openMenu === "industrias"}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF0057] ${
                openMenu === "industrias" ? "text-[#FF0057] bg-gray-50" : "text-gray-700 hover:text-[#FF0057] hover:bg-gray-50"
              }`}
            >
              Industrias
              <ChevronDown size={12} className={`transition-transform duration-200 ${openMenu === "industrias" ? "rotate-180 text-[#FF0057]" : ""}`} />
            </button>
            <AnimatePresence>
              {openMenu === "industrias" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-black/10 overflow-hidden"
                  style={{ width: "min(820px, calc(100vw - 2rem))", maxWidth: "calc(100vw - 2rem)" }}>
                  <div className="p-4"><MegaMenuIndustrias onClose={closeMenu} /></div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* 3 · Beyond Tech */}
          <li>
            <Link href="/beyond-tech"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#FF0057] hover:bg-gray-50 rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#FF0057]">
              Beyond Tech
            </Link>
          </li>

          {/* 4 · Carrera */}
          <li>
            <Link href="/carrera"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#FF0057] hover:bg-gray-50 rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#FF0057]">
              Carrera
            </Link>
          </li>

          {/* 5 · Nosotros */}
          <li className="relative" onMouseEnter={() => setOpenMenu("nosotros")} onMouseLeave={closeMenu}>
            <button
              aria-haspopup="true" aria-expanded={openMenu === "nosotros"}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF0057] ${
                openMenu === "nosotros" ? "text-[#FF0057] bg-gray-50" : "text-gray-700 hover:text-[#FF0057] hover:bg-gray-50"
              }`}
            >
              Nosotros
              <ChevronDown size={12} className={`transition-transform duration-200 ${openMenu === "nosotros" ? "rotate-180 text-[#FF0057]" : ""}`} />
            </button>
            <AnimatePresence>
              {openMenu === "nosotros" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-black/10 overflow-hidden"
                  style={{ width: "min(760px, calc(100vw - 2rem))", maxWidth: "calc(100vw - 2rem)" }}>
                  <div className="p-4"><MegaMenuNosotros onClose={closeMenu} /></div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* 6 · Inversionistas */}
          <li>
            <Link href="/inversionistas"
              className="px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#FF0057] hover:opacity-80"
              style={{ color: "#FF0057" }}>
              Inversionistas
            </Link>
          </li>

        </ul>

        {/* CTA */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <Link
            href="/contacto"
            className="bg-[#FF0057] hover:bg-[#d4004a] text-white text-sm font-semibold px-5 py-1.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#FF0057]/30 w-[130px] inline-flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0057] whitespace-nowrap"
          >
            Contacto
          </Link>
          <span className="text-gray-300 font-light select-none">|</span>
          <Link
            href="/osc-connect"
            className="text-white text-sm font-semibold px-5 py-1.5 rounded-full transition-all duration-200 hover:opacity-90 hover:shadow-lg w-[130px] inline-flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000086] whitespace-nowrap"
            style={{ background: "#000086", boxShadow: "none" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,134,0.35)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
          >
            OSC Connect
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="xl:hidden ml-auto text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="xl:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">

              {/* 1 · Soluciones accordion */}
              <div>
                <button onClick={() => setMobileExpanded(mobileExpanded === "sol" ? null : "sol")}
                  className="w-full flex items-center justify-between py-3 text-gray-700 font-medium border-b border-gray-100 cursor-pointer">
                  Soluciones y Servicios
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${mobileExpanded === "sol" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "sol" && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="pb-3 space-y-0">
                        {solucionesData.categories.map((cat) => (
                          <div key={cat.id} className="pl-4 py-2">
                            <Link href={cat.href} onClick={() => setMobileOpen(false)}
                              className="text-[10px] font-bold uppercase tracking-widest mb-1.5 block hover:opacity-70 transition-opacity"
                              style={{ color: cat.color }}>{cat.title}</Link>
                            {cat.items.map((item) => (
                              <p key={item.label} className="block py-1.5 text-sm text-gray-500">{item.label}</p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2 · Industrias accordion */}
              <div>
                <button onClick={() => setMobileExpanded(mobileExpanded === "ind" ? null : "ind")}
                  className="w-full flex items-center justify-between py-3 text-gray-700 font-medium border-b border-gray-100 cursor-pointer">
                  Industrias
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${mobileExpanded === "ind" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "ind" && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="pl-4 pb-3 space-y-1">
                        {industriasData.sectors.map((s) => (
                          <Link key={s.label} href={s.href} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 py-2 text-sm text-gray-500 hover:text-[#FF0057]">
                            <s.icon size={14} style={{ color: s.color }} />{s.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3 · Beyond Tech */}
              <Link href="/beyond-tech" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 text-gray-700 hover:text-[#FF0057] font-medium border-b border-gray-100 transition-colors">
                Beyond Tech
              </Link>

              {/* 4 · Carrera */}
              <Link href="/carrera" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 text-gray-700 hover:text-[#FF0057] font-medium border-b border-gray-100 transition-colors">
                Carrera
              </Link>

              {/* 5 · Nosotros accordion */}
              <div>
                <button onClick={() => setMobileExpanded(mobileExpanded === "nos" ? null : "nos")}
                  className="w-full flex items-center justify-between py-3 text-gray-700 font-medium border-b border-gray-100 cursor-pointer">
                  Nosotros
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${mobileExpanded === "nos" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "nos" && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="pl-4 pb-3 space-y-0">
                        {nosotrosLinks.map((link) => (
                          <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm text-gray-500 hover:text-[#FF0057]">{link.label}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 6 · Inversionistas */}
              <Link href="/inversionistas" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 text-gray-700 hover:text-[#FF0057] font-medium border-b border-gray-100 transition-colors">
                Inversionistas
              </Link>

              <div className="pt-4 pb-2 flex items-center gap-3">
                <Link href="/contacto" onClick={() => setMobileOpen(false)}
                  className="flex-1 block text-center bg-[#FF0057] hover:bg-[#d4004a] text-white font-semibold py-3.5 rounded-full transition-colors">
                  Contacto
                </Link>
                <Link href="/osc-connect" onClick={() => setMobileOpen(false)}
                  className="flex-1 block text-center text-white font-semibold py-3.5 rounded-full transition-colors hover:opacity-90"
                  style={{ background: "#000086" }}>
                  OSC Connect
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
