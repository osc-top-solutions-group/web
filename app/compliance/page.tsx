import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  Shield,
  Lock,
  Scale,
  ClipboardList,
  BookOpen,
  Users,
  Database,
  ShieldCheck,
  AlertTriangle,
  Gift,
  Phone,
  Flag,
  FileDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Políticas OSC – Compliance y Gestión de Calidad",
  description:
    "Conoce las normas, principios y políticas corporativas que rigen el Sistema de Gestión de Calidad de OSC Top Solutions. Transparencia, integridad y excelencia operativa en toda la región.",
};

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const pillars = [
  {
    id: "institucional",
    icon: Shield,
    accentColor: "#000086",
    accentLight: "#000086",
    label: "01",
    title: "Marco Institucional y Ético",
    subtitle: "Fundamentos que guían nuestro comportamiento diario y la excelencia operativa.",
    policies: [
      {
        icon: ClipboardList,
        title: "Política Integral y objetivos del SIG",
        description:
          "Nuestra hoja de ruta para garantizar los más altos estándares de calidad y mejora continua en todos nuestros procesos.",
      },
      {
        icon: BookOpen,
        title: "Código de ética y conducta regional",
        description:
          "Los principios fundamentales y valores que orientan nuestras acciones, interacciones y decisiones en cada país donde operamos.",
      },
      {
        icon: Users,
        title: "Política de Derechos Humanos",
        description:
          "Nuestro compromiso inquebrantable con el respeto, la equidad, la diversidad y la dignidad de todas las personas.",
      },
    ],
  },
  {
    id: "seguridad",
    icon: Lock,
    accentColor: "#FF0057",
    accentLight: "#FF0057",
    label: "02",
    title: "Seguridad y Protección de la Información",
    subtitle: "Resguardando los activos más valiosos de nuestra organización y de nuestros usuarios.",
    policies: [
      {
        icon: Database,
        title: "Política de tratamiento y protección de datos personales",
        description:
          "Lineamientos estrictos para garantizar la privacidad, confidencialidad y el uso responsable de la información de terceros.",
      },
      {
        icon: ShieldCheck,
        title: "Política de seguridad informática",
        description:
          "Protocolos y buenas prácticas para proteger nuestra infraestructura digital frente a amenazas y asegurar la continuidad del negocio.",
      },
    ],
  },
  {
    id: "transparencia",
    icon: Scale,
    accentColor: "#0891B2",
    accentLight: "#0891B2",
    label: "03",
    title: "Transparencia y Anticorrupción",
    subtitle: "Cero tolerancia a prácticas que pongan en riesgo la confianza y la legalidad de la empresa.",
    policies: [
      {
        icon: AlertTriangle,
        title: "Política Anticorrupción",
        description:
          "Mecanismos de prevención, control y sanción contra cualquier acto de corrupción, soborno o prácticas ilegales.",
      },
      {
        icon: Gift,
        title: "Política de no aceptación de regalos y/o donaciones",
        description:
          "Directrices claras para evitar conflictos de interés y garantizar que todas las relaciones comerciales se basen exclusivamente en el mérito y la transparencia.",
      },
    ],
  },
];

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function CompliancePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse,#000086 0%,transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-28 flex flex-col items-center text-center gap-6">
          {/* Badge */}
          <AnimatedSection delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-semibold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5 text-[#FF0057]" aria-hidden="true" />
              Sistema de Gestión de Calidad · SGC
            </span>
          </AnimatedSection>

          {/* Title */}
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl">
              Portal de{" "}
              <span className="text-[#FF0057]">Compliance</span>
              {" "}y Políticas Corporativas
            </h1>
          </AnimatedSection>

          {/* Description */}
          <AnimatedSection delay={0.2}>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Conoce el conjunto de normas, principios y políticas corporativas que rigen nuestro{" "}
              <strong className="text-white/70">Sistema de Gestión de Calidad</strong>. Este espacio está diseñado para asegurar la excelencia operativa, la transparencia y la integridad en toda la región.
            </p>
          </AnimatedSection>

          {/* Stats row */}
          <AnimatedSection delay={0.3}>
            <div className="mt-4 flex flex-wrap justify-center gap-8">
              {[
                { value: "3", label: "Pilares de compliance" },
                { value: "7", label: "Políticas corporativas" },
                { value: "16", label: "Países cubiertos" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-extrabold text-white">{value}</span>
                  <span className="text-white/35 text-xs uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PILLARS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {pillars.map((pillar, pi) => {
            const PillarIcon = pillar.icon;
            return (
              <div key={pillar.id} id={pillar.id}>
                {/* Pillar header */}
                <AnimatedSection delay={0}>
                  <div className="flex items-start gap-5 mb-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${pillar.accentColor}15`, border: `1px solid ${pillar.accentColor}25` }}
                    >
                      <PillarIcon className="w-6 h-6" style={{ color: pillar.accentColor }} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: pillar.accentColor }}>
                        {pillar.label}
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-tight">
                        {pillar.title}
                      </h2>
                      <p className="text-slate-500 text-sm mt-1.5 max-w-xl">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Policy cards */}
                <div className={`grid gap-5 ${pillar.policies.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {pillar.policies.map((policy, ci) => {
                    const PolicyIcon = policy.icon;
                    return (
                      <AnimatedSection key={policy.title} delay={ci * 0.08}>
                        <article
                          className="group relative bg-white rounded-2xl p-7 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 cursor-default h-full flex flex-col gap-4"
                        >
                          {/* Accent bar */}
                          <div
                            className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: pillar.accentColor }}
                            aria-hidden="true"
                          />
                          {/* Icon */}
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${pillar.accentColor}12`, border: `1px solid ${pillar.accentColor}20` }}
                          >
                            <PolicyIcon className="w-5 h-5" style={{ color: pillar.accentColor }} aria-hidden="true" />
                          </div>
                          {/* Content */}
                          <div className="flex flex-col gap-2 flex-1">
                            <h3 className="text-[#0F172A] font-bold text-base leading-snug">
                              {policy.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                              {policy.description}
                            </p>
                          </div>
                        </article>
                      </AnimatedSection>
                    );
                  })}
                </div>

                {/* Divider between pillars */}
                {pi < pillars.length - 1 && (
                  <div className="mt-20 border-t border-slate-200" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA — CANAL DE DENUNCIAS ─────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#FF0057" }}>
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 65%)" }} aria-hidden="true" />
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">

          {/* Text */}
          <AnimatedSection direction="up">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[11px] font-bold uppercase tracking-widest">
                Canal 100% confidencial
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mt-4 mb-4">
              ¿Tienes alguna duda o quieres reportar un incumplimiento?
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-xl">
              Tu voz es fundamental para mantener una cultura de integridad. Todos los reportes son tratados con absoluta confidencialidad y sin represalias.
            </p>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection direction="up">
            <a
              href="https://osctopsolutionsgroup.buk.co/partner_complaint/tickets/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white text-[#FF0057] font-extrabold text-base tracking-wide transition-all duration-200 shadow-2xl hover:scale-105 hover:shadow-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
            >
              <Flag className="w-4.5 h-4.5 shrink-0" aria-hidden="true" />
              Canal de Denuncias
            </a>
            <p className="text-white/50 text-xs mt-4">Disponible 24/7 · Sin represalias · Datos protegidos</p>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
}
