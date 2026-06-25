import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Network, Truck, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OSC Connect – OSC Top Solutions",
  description: "OSC Nexus, Supplier Connection y Careers. El ecosistema digital de OSC.",
};

const portals = [
  {
    icon: Network,
    title: "OSC Nexus",
    subtitle: "Intranet Corporativaa",
    description: "Portal interno para colaboradores de OSC. Accede a recursos, comunicados internos, herramientas de gestión y la comunidad OSC.",
    features: [
      "Documentos y políticas corporativas",
      "Comunicados y novedades internas",
      "Herramientas de gestión de proyectos",
      "Directorio de colaboradores",
    ],
    cta: "Acceder a Nexus",
    href: "https://intranet.osctopsolutionsgroup.com/",
    color: "#FF0057",
  },
  {
    icon: Truck,
    title: "Supplier Connection",
    subtitle: "Portal de Proveedores",
    description: "Plataforma para proveedores y socios tecnológicos de OSC. Gestión de contratos, documentación y comunicación directa.",
    features: [
      "Registro y homologación de proveedores",
      "Gestión de órdenes de compra",
      "Documentación contractual",
      "Seguimiento de pagos y facturas",
    ],
    cta: "Portal Proveedores",
    href: "https://vendors.osctsg.com/auth/login",
    color: "#0F172A",
  },
  {
    icon: Users,
    title: "Careers",
    subtitle: "Únete a OSC",
    description: "Construya su carrera en la empresa que lidera la transformación tecnológica de infraestructuras críticas en América.",
    features: [
      "Oportunidades en 16 países",
      "Desarrollo profesional acelerado",
      "Cultura de innovación continua",
      "Beneficios competitivos regionales",
    ],
    cta: "Ver oportunidades",
    href: "https://osctopsolutionsgroup.zohorecruit.com/jobs/Careers",
    color: "#FF0057",
  },
];

export default function OscConnectPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-10 overflow-hidden bg-white grid-bg">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,134,0.05) 0%, transparent 65%)", transform: "translate(20%,-20%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#0F172A] max-w-3xl mb-6">
              El ecosistema digital{" "}
              <span className="text-gradient">de OSC</span>
            </h1>
            <p className="text-[#475569] text-xl font-light max-w-2xl">
              Tres portales diseñados para conectar a colaboradores,
              proveedores y talentos con el mundo OSC.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Portals */}
      <section className="pt-10 pb-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,134,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-7">
            {portals.map((portal, i) => (
              <AnimatedSection key={portal.title} delay={i * 0.15}>
                <div className="group relative bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer">

                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, ${portal.color} 0%, ${portal.color}55 60%, transparent 100%)` }}
                  />

                  {/* Ghost icon watermark */}
                  <div
                    className="absolute bottom-0 right-0 pointer-events-none"
                    style={{ color: `${portal.color}07`, transform: "translate(20%, 20%)" }}
                  >
                    <portal.icon size={180} />
                  </div>

                  {/* Header */}
                  <div className="relative px-8 pt-10 pb-8">
                    {/* Subtitle pill */}
                    <span
                      className="inline-block text-[10px] font-black uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-4"
                      style={{ background: `${portal.color}10`, color: portal.color, border: `1px solid ${portal.color}20` }}
                    >
                      {portal.subtitle}
                    </span>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#0F172A] leading-snug">
                      {portal.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                      {portal.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="mx-8 h-px bg-gradient-to-r from-gray-100 via-gray-100 to-transparent" />

                  {/* Features */}
                  <div className="relative px-8 py-7 flex-1 flex flex-col">
                    <ul className="space-y-3.5 flex-1 mb-8">
                      {portal.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-slate-500">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: `${portal.color}12` }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: portal.color }}
                            />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={portal.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${portal.color} 0%, ${portal.color}cc 100%)`,
                        color: "white",
                        boxShadow: `0 4px 20px ${portal.color}25`,
                      }}
                    >
                      {portal.cta}
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
