import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CtaFinal from "@/components/home/CtaFinal";
import { Wifi, Brain, Shield, Briefcase, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Soluciones & Servicios – OSC Top Solutions",
  description:
    "Connectivity & Telecom Solutions, Smart Solutions, Cross Protection y Managed Services para infraestructuras críticas.",
};

const solutions = [
  {
    id: "critical-infrastructure-security",
    slug: "critical-infrastructure-security",
    icon: Shield,
    category: "Critical Infrastructure Security",
    title: "Seguridad convergente OT/IT",
    description:
      "Protegemos infraestructuras críticas con soluciones de ciberseguridad diseñadas para entornos donde la continuidad operativa es no negociable.",
    items: [
      "Gestión de terminales (TI/OT)",
      "Protección básica 4G/5G",
      "Zero Trust y Gestión de acceso",
      "Seguridad Perimetral (TI/OT)",
      "Red Automatizada Monitoreo",
    ],
    color: "#FF0057",
  },
  {
    id: "ai-powered-operations",
    slug: "ai-powered-operations",
    icon: Brain,
    category: "AI-Powered Operations",
    title: "Inteligencia operativa en tiempo real",
    description:
      "Transformamos datos operativos en conocimiento accionable mediante plataformas de analítica avanzada, video inteligente y representación digital de activos críticos.",
    items: [
      "Videovigilancia",
      "Control de Acceso",
      "Gemelos Digitales",
      "Seguimiento de Activos",
      "Comunicaciones Operativas (PTT/PTV)",
      "Optimización del tráfico IP",
      "Análisis de Video Avanzado",
      "Plataformas de Seguridad Ciudadana",
      "Cámaras como Sensores",
      "Centros de datos modulares",
      "Monitoreo del personal de campo",
    ],
    color: "#0F172A",
  },
  {
    id: "connectivity-telecom",
    slug: "connectivity-telecom",
    icon: Wifi,
    category: "Connectivity & Telecom Solutions",
    title: "Redes críticas, ingeniería y operación end-to-end",
    description:
      "Diseñamos, desplegamos y operamos redes resilientes con múltiples tecnologías de transporte — 4G/5G, microondas, fibra y satélite — con NOC 24/7 y un único punto de responsabilidad desde el diseño hasta la operación.",
    items: [
      "Redes 4G y 5G Privadas",
      "Redes de microondas",
      "Redes IP / MPLS / Segment Routing",
      "Conectividad Satelital Multi-Órbita",
      "Redes ópticas (DWDM/OTN)",
      "Operación de la red (NOC 24/7)",
      "Diseño e Ingeniería de detalle",
      "Auditoría de Calidad 4G/5G",
      "Despliegue de Fibra óptica",
      "Viabilidad y estudios de sitio",
    ],
    color: "#FF0057",
  },
];

const managedServices = {
  id: "managed-operations",
  slug: "managed-operations",
  icon: Briefcase,
  category: "Managed Operations",
  title: "Gestión que escala con su operación",
  description:
    "Transformamos la complejidad tecnológica en ventaja competitiva al unir talento especializado con una gestión ágil que asegura escalabilidad inmediata y sin carga administrativa.",
  subcategories: [
    {
      name: "Workforce Management",
      color: "#FF0057",
      items: [
        {
          name: "Gestión Integral de Talento",
          desc: "Selección, contratación, incorporación y gestión del rendimiento.",
        },
        {
          name: "Personal Especializado",
          desc: "Provisión de perfiles técnicos por proyecto o a tiempo parcial.",
        },
        {
          name: "Administración",
          desc: "Contratación y gestión de personal, coordinando servicios para su área de RRHH sin carga.",
        },
      ],
    },
    {
      name: "BPO Services",
      color: "#0F172A",
      items: [
        {
          name: "Centros de Operaciones",
          desc: "Tercerización de NOC (Red) y SOC (Seguridad), incluyendo Mesa de Ayuda NOC.",
        },
        {
          name: "Gestión de Proyectos (PMO)",
          desc: "Oficina de gestión de proyectos, auditorías de servicio y supervisión de nodos.",
        },
        {
          name: "Soporte y Transformación",
          desc: "Soporte TI, Smart Support, y desarrollo de software.",
        },
        {
          name: "Operaciones en Sitio",
          desc: "Servicios de logística, logística inversa y gestión de acceso a sitios.",
        },
        {
          name: "Servicios Corporativos",
          desc: "Contact Center como Servicio y gestión de gastos.",
        },
      ],
    },
  ],
};

export default function SolucionesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-white grid-bg">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,134,0.05) 0%, transparent 65%)", transform: "translate(20%,-20%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#0F172A] max-w-3xl mb-6">
              Tecnología que{" "}
              <span className="text-gradient">orquesta resultados</span>
            </h1>
            <p className="text-[#475569] text-xl font-light max-w-2xl">
              Cuatro pilares tecnológicos integrados para garantizar la
              continuidad, seguridad y eficiencia de infraestructuras críticas.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Solutions — alternating white / surface */}
      {solutions.map((sol, idx) => (
        <section
          key={sol.id}
          id={sol.id}
          className={`py-20 ${idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div
              className={`grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start ${
                idx % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Left — label + title + desc */}
              <AnimatedSection
                direction={idx % 2 === 0 ? "left" : "right"}
                className={idx % 2 === 1 ? "lg:col-start-2" : ""}
              >
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6"
                  style={{ color: sol.color }}
                >
                  <span className="w-8 h-px" style={{ backgroundColor: sol.color }} />
                  {sol.category}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">
                  {sol.title}
                </h2>
                <p className="text-slate-500 font-light leading-relaxed mb-6">
                  {sol.description}
                </p>
                {sol.slug && (
                  <Link
                    href={`/soluciones/${sol.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                    style={{ color: sol.color === "#0F172A" ? "#FF0057" : sol.color }}
                  >
                    Ver solución completa <ArrowUpRight size={14} />
                  </Link>
                )}
              </AnimatedSection>

              {/* Right — service tags grid */}
              <AnimatedSection
                direction={idx % 2 === 0 ? "right" : "left"}
                delay={0.15}
                className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <div className="flex flex-wrap gap-2.5">
                  {sol.items.map((item) => (
                    <div
                      key={item}
                      className="group flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-default"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                        style={{ backgroundColor: sol.color }}
                      />
                      <span className="text-[#0F172A] text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Managed Services — full-width with subcategories */}
      <section id={managedServices.id} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <AnimatedSection className="mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6 text-[#FF0057]">
              <span className="w-8 h-px bg-[#FF0057]" />
              {managedServices.category}
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A]">
                {managedServices.title}
              </h2>
              <div>
                <p className="text-slate-500 font-light leading-relaxed mb-4">
                  {managedServices.description}
                </p>
                <Link
                  href={`/soluciones/${managedServices.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF0057] transition-colors duration-200 hover:text-[#cc0047]"
                >
                  Ver solución completa <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Subcategories */}
          <div className="space-y-10">
            {managedServices.subcategories.map((sub, subIdx) => (
              <AnimatedSection key={sub.name} delay={subIdx * 0.1}>
                {/* Subcategory header */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      color: sub.color,
                      backgroundColor: sub.color + "12",
                    }}
                  >
                    {sub.name}
                  </span>
                  <span className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Items grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sub.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: sub.color }}
                        />
                        <div>
                          <p
                            className="font-semibold text-sm mb-1"
                            style={{ color: "#0F172A" }}
                          >
                            {item.name}
                          </p>
                          <p className="text-slate-500 text-sm font-light leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
