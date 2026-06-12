import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CtaFinal from "@/components/home/CtaFinal";
import { Zap, Mountain, Anchor, Building2, Radio, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industrias – OSC Top Solutions",
  description: "Soluciones especializadas para Power Utilities, Energía & Minería, Puertos, Gobierno y Telecom.",
};

const industries = [
  {
    id: "utilities",
    slug: "power-utilities",
    icon: Zap,
    name: "Power Utilities",
    color: "#FF0057",
    problem: "La falta de visibilidad sobre activos críticos representa un impacto directo en la estabilidad del sistema nacional, el cumplimiento regulatorio y la seguridad de las personas.",
    solution: "Resiliencia de infraestructura crítica con visibilidad total en subestaciones, Smart Grid, ciberseguridad OT/IT y comunicaciones de misión crítica.",
    results: ["99.99% uptime de red de comunicaciones", "Smart Metering y control distribuido", "Ciberseguridad OT/IT convergente"],
  },
  {
    id: "energia",
    slug: "energia-mineria",
    icon: Mountain,
    name: "Energía & Minería",
    color: "#0F172A",
    problem: "En entornos geográficos adversos, la falta de comunicación genera riesgos significativos y tiempos de inactividad que impactan negativamente el EBITDA.",
    solution: "Seguridad y productividad autónoma con redes LTE/5G privadas, video intelligence para detección de riesgos y mantenimiento predictivo.",
    results: ["Conectividad garantizada en zonas remotas", "12+ redes LTE/5G implementadas en LATAM", "Mantenimiento predictivo con IoT"],
  },
  {
    id: "puertos",
    slug: "puertos",
    icon: Anchor,
    name: "Puertos",
    color: "#FF0057",
    problem: "Cada minuto de falla en la coordinación de muelles y patios se traduce en costos adicionales, congestión y pérdida de competitividad en el comercio exterior.",
    solution: "Eficiencia logística con trazabilidad completa en tiempo real de contenedores, redes 4G LTE privadas y backbone IP MPLS para comercio exterior.",
    results: ["100% trazabilidad de activos en movimiento", "Redes 4G LTE privadas en terminales", "Integración con sistemas TOS y ERP"],
  },
  {
    id: "gobierno",
    slug: "gobierno",
    icon: Building2,
    name: "Gobierno",
    color: "#0F172A",
    problem: "La ausencia de evidencia y la incapacidad de responder a las crisis causa erosión institucional y fallas en los servicios esenciales para los ciudadanos.",
    solution: "Seguridad ciudadana y gobernabilidad con centros de mando C4/C5, video analítica urbana y comunicaciones de emergencia con autonomía institucional.",
    results: ["Reducción de tiempos de respuesta a incidentes", "1,800 km de fibra óptica en Bolivia", "Centros C4/C5 unificados"],
  },
  {
    id: "telecom",
    slug: "telecoms",
    icon: Radio,
    name: "Telecoms",
    color: "#FF0057",
    problem: "El incumplimiento de SLAs y el lento time-to-market impactan directamente los ingresos y la reputación de marca frente a la competencia.",
    solution: "Disponibilidad y escalabilidad garantizada: primera red 5G SA en LATAM, NOC 130K+ actividades/año (ISO 9001) y despliegue acelerado de redes.",
    results: ["Primera 5G Stand Alone en LATAM", "130,000+ actividades NOC anuales (ISO 9001)", "Despliegue en 145+ sitios urbanos y rurales"],
  },
];

export default function IndustriasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-white grid-bg">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,134,0.05) 0%, transparent 65%)", transform: "translate(20%,-20%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#0F172A] max-w-3xl mb-6">
              Expertos en los sectores{" "}
              <span className="text-gradient">más exigentes</span>
            </h1>
            <p className="text-[#475569] text-xl font-light max-w-2xl">
              Cada industria tiene desafíos únicos. Nosotros tenemos soluciones
              diseñadas específicamente para cada uno de ellos.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries — alternating white / surface */}
      {industries.map((ind, idx) => (
        <section
          key={ind.id}
          id={ind.id}
          className={`py-24 ${idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Label */}
              <AnimatedSection direction="left" className="lg:col-span-3">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${ind.color}10`, border: `1px solid ${ind.color}30` }}
                >
                  <ind.icon size={28} style={{ color: ind.color }} />
                </div>
                <h2 className="text-3xl font-bold text-[#0F172A] mb-2">{ind.name}</h2>
              </AnimatedSection>

              {/* Problem */}
              <AnimatedSection delay={0.1} className="lg:col-span-4">
                <div className="bg-white border border-orange-100 rounded-2xl p-6 h-full shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={16} className="text-orange-400" />
                    <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
                      Desafío
                    </span>
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed">{ind.problem}</p>
                </div>
              </AnimatedSection>

              {/* Solution & Results */}
              <AnimatedSection delay={0.2} className="lg:col-span-5">
                <div
                  className="rounded-2xl p-6 h-full shadow-sm flex flex-col"
                  style={{
                    background: `linear-gradient(135deg, ${ind.color}08, transparent)`,
                    border: `1px solid ${ind.color}20`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 size={16} style={{ color: ind.color }} />
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: ind.color }}
                    >
                      Solución OSC
                    </span>
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed mb-6">
                    {ind.solution}
                  </p>
                  <ul className="space-y-2 flex-1">
                    {ind.results.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-slate-600">
                        <span style={{ color: ind.color }} className="shrink-0 font-bold mt-0.5">→</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <Link
                      href={`/industrias/${ind.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-3 transition-all duration-200"
                      style={{ color: ind.color }}
                    >
                      Ver soluciones para {ind.name} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      <CtaFinal />
    </>
  );
}
