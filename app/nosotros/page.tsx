import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CtaFinal from "@/components/home/CtaFinal";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, ORG_ID, CERTIFICATIONS, ORG_NAME, ORG_LOGO, ORG_EMAIL, ORG_LINKEDIN, AREA_SERVED } from "@/lib/seo";

function LinkedInIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "30 Años Integrando Infraestructura Crítica LATAM | OSC",
  description:
    "Desde 1994, OSC opera en 16 países con +2,000 clientes, +33,000 nodos y 42 alianzas tecnológicas. ISO 27001, IEC 62443 e ISO 9001 certificados hasta 2027. Equipo directivo en Bogotá.",
  keywords: [
    "OSC Top Solutions Group empresa",
    "integrador tecnológico LATAM 30 años",
    "infraestructura crítica América Latina",
    "ISO 27001 IEC 62443 certificado",
    "equipo directivo OSC",
  ].join(", "),
  alternates: { canonical: `${SITE_URL}/nosotros` },
  openGraph: {
    title: "30 Años Integrando Infraestructura Crítica en LATAM | OSC Top Solutions",
    description:
      "Desde 1994 — 16 países, +2,000 clientes, ISO 27001 + IEC 62443 + ISO 9001. Equipo directivo en Bogotá.",
    type: "website",
    url: `${SITE_URL}/nosotros`,
  },
};

const capabilities = [
  { value: "30 años",    label: "Operación continua",       bar: 100 },
  { value: "16",         label: "Países",                   bar: 64  },
  { value: "+2,000",     label: "Clientes",                 bar: 80  },
  { value: "+33,000",    label: "Nodos gestionados",        bar: 92  },
  { value: "+5,000",     label: "Kilómetros de Fibra óptica", bar: 78  },
  { value: "+12,000",    label: "Sitios NOC-SOC 24/7",      bar: 85  },
  { value: "42",         label: "Alianzas tecnológicas",    bar: 55  },
  { value: "+5,000",     label: "Proyectos Ejecutados",     bar: 70  },
];

const ceo = {
  name: "Mauricio Rubio O.",
  photo: "/Fotos Equipo/Mauricio Rubio.png",
  linkedin: "https://www.linkedin.com/in/mauricio-rubio-6a78a598/",
};

const directiveTeam = [
  {
    name: "Santiago Rivera",
    area: "Managing Director",
    initials: "SR",
    photo: "/Fotos Equipo/Santiago Rivera.png",
    linkedin: "https://www.linkedin.com/in/santiago-rivera-gonzalez/",
  },
  {
    name: "Angélica D'Haro",
    area: "Chief Business Development and Investment Officer",
    initials: "AD",
    photo: "/Fotos Equipo/Angelica D´Haro.png",
    linkedin: "https://www.linkedin.com/in/ang%C3%A9lica-d%C2%B4haro-42aa9120/",
  },
];

const territoryManagers = [
  { name: "Walter Castro",          area: "Territory Manager Centro América y El Caribe", initials: "WC", photo: "/Fotos Equipo/Walter Castro.png",       linkedin: "https://www.linkedin.com/in/eng-mba-walter-castro/" },
  { name: "Telmo Paredes",          area: "Territory Manager Ecuador",                    initials: "TP", photo: "/Fotos Equipo/Telmo Paredes.png",       linkedin: "https://www.linkedin.com/in/telmo-paredes-s-8baa66100/" },
  { name: "Mauricio Pardo Bascur",  area: "Territory Manager Chile",                      initials: "MP", photo: "/Fotos Equipo/Mauricio Pardo.png",      linkedin: "https://www.linkedin.com/in/mauricio-pardo-bascur-438ab517/" },
  { name: "Eleonora García",        area: "Territory Manager Colombia",                   initials: "EG", photo: "/Fotos Equipo/Eleonora Garcia.png",     linkedin: "https://www.linkedin.com/in/eleonora-garcia-bautista/" },
  { name: "Erick Pilco",            area: "Territory Manager Perú",                       initials: "EP", photo: "/Fotos Equipo/Erick Pilco.png",         linkedin: "https://www.linkedin.com/in/erick-pilco-mba/" },
  { name: "Camilo Lozano",          area: "Territory Manager México",                     initials: "CL", photo: "/Fotos Equipo/Camilo Lozano.png",          linkedin: "https://www.linkedin.com/in/camilo-lozano-12300239/" },
];

const regionalTeam = [
  { name: "Andrés Gallego",       area: "Chief Commercial & Marketing Officer",                 initials: "AG", photo: "/Fotos Equipo/Andres Gallego.png",         linkedin: "https://www.linkedin.com/in/andr%C3%A9s-gallego-garzon/" },
  { name: "Rafael Rolón",         area: "Chief Financial Officer",                              initials: "RR", photo: "/Fotos Equipo/Rafael Rolon.png",           linkedin: "https://www.linkedin.com/in/rafael-rolon-ramirez-a0354a131/" },
  { name: "Rodrigo Santamaría",   area: "Chief Operations Officer",                             initials: "RS", photo: "/Fotos Equipo/Rodrigo SantaMaria.png",     linkedin: "https://www.linkedin.com/in/rodrigo-santamaria-vanegas-b2716227/" },
  { name: "Luz Ángela Martínez",  area: "Chief Human Resources Officer",                        initials: "LM", photo: "/Fotos Equipo/Luz Angela Martinez.png",    linkedin: "https://www.linkedin.com/in/luz-angela-martinez-prieto-50646a22/" },
  { name: "Freidman Duarte",      area: "Chief Purchasing & Logistics Officer",                 initials: "FD", photo: "/Fotos Equipo/Freidman Duarte.png",        linkedin: "https://www.linkedin.com/in/freidmanduarte/" },
  { name: "Héctor Tamayo",        area: "Global Product Manager",                               initials: "HT", photo: "/Fotos Equipo/Hector Tamayo.png",          linkedin: "https://www.linkedin.com/in/hectortamayogrisales/" },
  { name: "David Rojas",          area: "Global Presales Manager",                              initials: "DR", photo: "/Fotos Equipo/David Rojas.png",             linkedin: "https://www.linkedin.com/in/davidrp88/" },
  { name: "Alexander Ayala",      area: "Global Marketing Manager",                             initials: "AA", photo: "/Fotos Equipo/Alexander Ayala.png",        linkedin: "https://www.linkedin.com/in/ayalaalexander/" },
];

/* ─── JSON-LD ─── */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: ORG_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: ORG_LOGO },
  foundingDate: "1994",
  description:
    "Integrador y operador tecnológico especializado en infraestructuras críticas en América Latina. 30 años de experiencia, 16 países, +2,000 clientes.",
  areaServed: AREA_SERVED,
  hasCredential: CERTIFICATIONS,
  contactPoint: { "@type": "ContactPoint", email: ORG_EMAIL, contactType: "customer service" },
  sameAs: [ORG_LINKEDIN],
  employee: [
    { "@type": "Person", name: "Mauricio Rubio O.",   jobTitle: "Chief Executive Officer",                          sameAs: "https://www.linkedin.com/in/mauricio-rubio-6a78a598/" },
    { "@type": "Person", name: "Santiago Rivera",     jobTitle: "Managing Director",                                sameAs: "https://www.linkedin.com/in/santiago-rivera-gonzalez/" },
    { "@type": "Person", name: "Angélica D'Haro",    jobTitle: "Chief Business Development and Investment Officer", sameAs: "https://www.linkedin.com/in/ang%C3%A9lica-d%C2%B4haro-42aa9120/" },
    { "@type": "Person", name: "Andrés Gallego",     jobTitle: "Chief Commercial & Marketing Officer",             sameAs: "https://www.linkedin.com/in/andr%C3%A9s-gallego-garzon/" },
    { "@type": "Person", name: "Rafael Rolón",       jobTitle: "Chief Financial Officer",                          sameAs: "https://www.linkedin.com/in/rafael-rolon-ramirez-a0354a131/" },
    { "@type": "Person", name: "Rodrigo Santamaría", jobTitle: "Chief Operations Officer",                         sameAs: "https://www.linkedin.com/in/rodrigo-santamaria-vanegas-b2716227/" },
  ],
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/nosotros/#page`,
  url: `${SITE_URL}/nosotros`,
  name: "Nosotros — OSC Top Solutions Group",
  description:
    "Historia, equipo directivo, capacidades y presencia de OSC Top Solutions Group en América Latina.",
  about: { "@id": ORG_ID },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",     item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Nosotros", item: `${SITE_URL}/nosotros` },
    ],
  },
};

export default function NosotrosPage() {
  return (
    <>
      <JsonLd data={[orgSchema, aboutSchema]} />
      {/* ── Hero Banner — imagen de fondo ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "680px" }}>
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/HeroBanner Nosotros.png')" }}
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,18,40,0.88) 0%, rgba(10,18,40,0.70) 55%, rgba(10,18,40,0.30) 100%)" }} />
        {/* Tono rojo sutil en esquina superior */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(255,0,87,0.12) 0%, transparent 65%)", transform: "translate(20%,-20%)" }} />

        <div className="relative pt-44 pb-28 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-7 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0057] animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/70">Beyond Tech · Quiénes Somos</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.08] mb-7">
              Más de 30 años<br />
              <span style={{ color: "#FF0057" }}>orquestando</span><br />
              <span style={{ color: "#FF0057" }}>tecnología</span>
            </h1>
            <p className="text-white/65 text-xl font-light max-w-2xl leading-relaxed">
              OSC es un integrador y operador tecnológico especializado en infraestructuras críticas en América. Pasamos de implementar tecnología a orquestar resultados.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BEYOND TECH — Sección editorial unificada
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="relative max-w-6xl mx-auto px-6 py-24">

          {/* ── Bloque superior: título + filosofía (2 cols) ── */}
          <AnimatedSection>
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start mb-20">

              {/* Izquierda — identidad Beyond Tech */}
              <div className="lg:sticky lg:top-32">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-gray-200 bg-gray-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF0057] animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-gray-400">Nuestro Propósito</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-[#0F172A] leading-none mb-5 tracking-tight">
                  Beyond<br /><span style={{ color: "#FF0057" }}>Tech</span>
                </h2>
                <div className="w-12 h-[3px] rounded-full" style={{ backgroundColor: "#FF0057" }} />
              </div>

              {/* Derecha — descripción + Quiénes Somos + quote */}
              <div className="flex flex-col gap-8">

                {/* Quiénes Somos */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Quiénes Somos</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] leading-snug mb-5">
                    Transformando la tecnología en{" "}
                    <span style={{ color: "#FF0057" }}>soluciones de alto impacto</span>
                  </h3>
                  <p className="text-[#475569] text-base font-light leading-relaxed mb-4">
                    En OSC Top Solutions Group, nos consolidamos como un Integrador que trasciende la implementación tecnológica convencional. Nos encontramos en un punto de inflexión donde nuestra experiencia y crecimiento exponencial nos permiten actuar como un socio estratégico, capaz de transformar visiones complejas en resultados tangibles en toda América.
                  </p>
                  <p className="text-[#475569] text-base font-light leading-relaxed">
                    Más que un proveedor de infraestructura, somos un aliado diseñado para resolver desafíos de operación desde una perspectiva integral. Nuestra agilidad operativa y excelencia técnica garantizan el éxito en proyectos de gran escala, asegurando siempre la continuidad.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100" />

                {/* Filosofía Beyond Tech */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Nuestra Filosofía</p>
                  <p className="text-[#0F172A] text-lg font-light leading-relaxed mb-6">
                    Nuestra filosofía guía cada acción: entregar soluciones que no solo resuelven problemas inmediatos, sino que impulsan un crecimiento sostenible y duradero para nuestros clientes.
                  </p>
                  {/* Pull quote */}
                  <div className="relative pl-6 border-l-[3px]" style={{ borderColor: "#FF0057" }}>
                    <div className="absolute -left-[2px] top-0 w-[3px] h-full rounded-full" style={{ background: "linear-gradient(to bottom, #FF0057, rgba(255,0,87,0.15))" }} />
                    <p className="text-[#0F172A]/60 text-base font-light leading-relaxed italic">
                      "Beyond Tech no es solo lo que hacemos, es nuestro propósito: convertir la tecnología en un habilitador de cambio real para las personas, las comunidades y los negocios."
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </AnimatedSection>

          {/* ── Separador pilares ── */}
          <AnimatedSection delay={0.05}>
            <div className="flex items-center gap-5 mb-12">
              <div className="h-px flex-1 bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#FF0057" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-400">Los 5 pilares de Beyond Tech</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#FF0057" }} />
              </div>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </AnimatedSection>

          {/* ── Grid de pilares ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200">
            {[
              { num: "01", title: "Visión Estratégica",           desc: "Planificamos y diseñamos estrategias que anticipan los desafíos del mañana, guiando a las empresas hacia un futuro exitoso." },
              { num: "02", title: "Innovación Disruptiva",        desc: "Transformamos necesidades básicas en proyectos que trascienden y desafían el status quo de las industrias." },
              { num: "03", title: "Talento con Propósito",        desc: "Nuestros expertos no solo dominan la tecnología, sino que conectan esta con la estrategia empresarial de cada cliente." },
              { num: "04", title: "Flexibilidad y Adaptabilidad", desc: "Soluciones que se ajustan rápidamente a mercados dinámicos y a los objetivos financieros de nuestros clientes." },
              { num: "05", title: "Excelencia Prime",             desc: "Operamos bajo los más altos estándares internacionales, garantizando intervenciones técnicas de máxima calidad." },
            ].map((pillar, i) => (
              <AnimatedSection key={pillar.num} delay={i * 0.07}>
                <div className="group relative h-full bg-white hover:bg-[#FF0057] transition-colors duration-300 p-7 flex flex-col gap-4">
                  {/* Número */}
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF0057] group-hover:text-white/70 transition-colors duration-300">
                    {pillar.num}
                  </span>
                  {/* Línea acento */}
                  <div className="w-8 h-[2px] rounded-full bg-[#FF0057] group-hover:bg-white/40 group-hover:w-12 transition-all duration-300" />
                  {/* Título */}
                  <h4 className="text-[#0F172A] font-bold text-base leading-snug group-hover:text-white transition-colors duration-300">
                    {pillar.title}
                  </h4>
                  {/* Descripción */}
                  <p className="text-[#64748B] text-sm font-light leading-relaxed flex-1 group-hover:text-white/80 transition-colors duration-300">
                    {pillar.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* Cobertura */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-14">

            {/* Left — texto */}
            <AnimatedSection direction="left" className="lg:w-[40%] flex-shrink-0 flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 bg-[#FF0057]/10 border border-[#FF0057]/25 rounded-full px-4 py-1.5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF0057] animate-pulse" />
                <span className="text-[#FF0057]/80 text-[11px] font-bold uppercase tracking-[0.2em]">Presencia Regional</span>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Operamos en toda{" "}
                  <span className="text-[#FF0057]">América</span>
                </h2>
                <div className="w-12 h-[3px] rounded-full bg-[#FF0057]" />
                <p className="text-white/50 text-base font-light leading-relaxed">
                  Operamos en 16 países, garantizando la integridad de su operación. Reducimos riesgos y aseguramos la máxima disponibilidad de su infraestructura mediante un despliegue especializado y de alto impacto.
                </p>
              </div>
            </AnimatedSection>

            {/* Right — Globo con contenedor estricto */}
            <AnimatedSection delay={0.15} className="flex-1 flex items-center justify-center">
              <div
                className="relative flex items-center justify-center"
                style={{ width: 420, height: 420 }}
              >
                {/* Glow suave detrás del globo */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center, rgba(255,0,87,0.12) 0%, transparent 68%)" }}
                />
                <InteractiveGlobe size={420} className="relative z-10" />
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Capacidades */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(255,0,87,0.05) 0%, transparent 70%)", transform: "translate(20%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,0,134,0.08) 0%, transparent 70%)", transform: "translate(-20%,30%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Nuestra experiencia y{" "}
              <span className="text-[#FF0057]">capacidad de ejecución</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <AnimatedSection key={cap.label} delay={i * 0.07}>
                <div className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300 overflow-hidden h-full flex flex-col min-h-[180px]">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl bg-white/0 group-hover:bg-[#FF0057]/60 transition-all duration-500" />

                  {/* Value */}
                  <p className="text-[#FF0057] font-black text-4xl lg:text-5xl leading-none mb-3 tabular-nums">
                    {cap.value}
                  </p>

                  {/* Label */}
                  <p className="text-white font-semibold text-base mb-auto">{cap.label}</p>

                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-6">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF0057] to-[#ff4d87] transition-all duration-1000 delay-300"
                      style={{ width: `${cap.bar}%` }}
                    />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gobierno Corporativo */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
              El equipo que lidera <span className="text-gradient">la operación</span>
            </h2>
          </AnimatedSection>

          {/* CEO — destacado solo, sin título */}
          <AnimatedSection className="flex justify-center mb-12">
            <a
              href={ceo.linkedin} target="_blank" rel="noopener noreferrer"
              className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
              style={{ width: 200, aspectRatio: "3/4" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ceo.photo}
                alt={ceo.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                <p className="text-white font-semibold text-xs leading-snug">{ceo.name}</p>
                <p className="text-white/60 text-[10px] mt-0.5 leading-tight">CEO &amp; Founder</p>
              </div>
              <div className="absolute inset-0 bg-[#0077B5]/92 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <LinkedInIcon size={28} />
                <span className="text-white text-[10px] font-semibold">LinkedIn</span>
              </div>
            </a>
          </AnimatedSection>

          {/* Primera Línea — Equipo Directivo */}
          <AnimatedSection className="mb-4">
            <h3 className="text-lg lg:text-xl font-light text-[#0F172A] text-center mb-8 uppercase" style={{ letterSpacing: "0.12em" }}>
              <span className="text-gradient">Equipo Directivo</span>
            </h3>
          </AnimatedSection>
          <div className="max-w-[480px] mx-auto grid grid-cols-2 gap-5 mb-20">
            {directiveTeam.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.05}>
                <a
                  href={member.linkedin} target="_blank" rel="noopener noreferrer"
                  className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                  style={{ aspectRatio: "3/4" }}
                >
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#0F172A] flex items-center justify-center">
                      <span className="text-white font-black text-4xl opacity-30">{member.initials}</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                    <p className="text-white font-semibold text-xs leading-snug">{member.name}</p>
                    <p className="text-white/60 text-[10px] mt-0.5 leading-tight">{member.area}</p>
                  </div>
                  <div className="absolute inset-0 bg-[#0077B5]/92 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <LinkedInIcon size={28} />
                    <span className="text-white text-[10px] font-semibold">LinkedIn</span>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* Segunda Línea — Equipo Regional */}
          <AnimatedSection className="mb-4">
            <h3 className="text-lg lg:text-xl font-light text-[#0F172A] text-center mb-8 uppercase" style={{ letterSpacing: "0.12em" }}>
              <span className="text-gradient">Equipo Regional</span>
            </h3>
          </AnimatedSection>
          <div className="max-w-[1060px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-20">
            {regionalTeam.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.05}>
                <a
                  href={member.linkedin} target="_blank" rel="noopener noreferrer"
                  className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                  style={{ aspectRatio: "3/4" }}
                >
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#0F172A] flex items-center justify-center">
                      <span className="text-white font-black text-4xl opacity-30">{member.initials}</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                    <p className="text-white font-semibold text-xs leading-snug">{member.name}</p>
                    <p className="text-white/60 text-[10px] mt-0.5 leading-tight">{member.area}</p>
                  </div>
                  <div className="absolute inset-0 bg-[#0077B5]/92 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <LinkedInIcon size={28} />
                    <span className="text-white text-[10px] font-semibold">LinkedIn</span>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* Tercera Línea — Territory Managers */}
          <AnimatedSection className="mb-4">
            <h3 className="text-lg lg:text-xl font-light text-[#0F172A] text-center mb-8 uppercase" style={{ letterSpacing: "0.12em" }}>
              <span className="text-gradient">Territory Managers</span>
            </h3>
          </AnimatedSection>
          <div className="max-w-[1060px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {territoryManagers.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.05}>
                <a
                  href={member.linkedin} target="_blank" rel="noopener noreferrer"
                  className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* Photo or initials */}
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#0F172A] flex items-center justify-center">
                      <span className="text-white font-black text-4xl opacity-30">{member.initials}</span>
                    </div>
                  )}

                  {/* Bottom gradient + text */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                    <p className="text-white font-semibold text-xs leading-snug">{member.name}</p>
                    <p className="text-white/60 text-[10px] mt-0.5 leading-tight">{member.area}</p>
                  </div>

                  {/* LinkedIn hover */}
                  <div className="absolute inset-0 bg-[#0077B5]/92 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <LinkedInIcon size={28} />
                    <span className="text-white text-[10px] font-semibold">LinkedIn</span>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-slate-200 bg-white w-fit mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0057]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Alianzas tecnológicas</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
              En OSC creemos en el{" "}
              <span className="text-gradient">valor de la colaboración</span>
            </h2>
            <p className="text-slate-400 text-base font-light mt-4 max-w-xl mx-auto leading-relaxed">
              Trabajamos con los líderes tecnológicos globales para entregar soluciones de clase mundial.
            </p>
          </AnimatedSection>

          {/* Logo grid */}
          <AnimatedSection delay={0.08}>
            <div
              className="rounded-3xl overflow-hidden border border-slate-200/70"
              style={{ boxShadow: "0 1px 24px 0 rgba(15,23,42,0.05)" }}
            >
              {/* 4 filas de 9 — desktop */}
              <div className="hidden lg:grid lg:grid-cols-9 divide-x divide-y divide-slate-100">
                {[
                  "/Logo partners/ANTUBAY.png",
                  "/Logo partners/CLIPP.jpg",
                  "/Logo partners/COMCORE.png",
                  "/Logo partners/CONDORTECH.png",
                  "/Logo partners/cotel.png",
                  "/Logo partners/druid.png",
                  "/Logo partners/EASYMETERING.png",
                  "/Logo partners/ENLINE.png",
                  "/Logo partners/EVIDEN.png",
                  "/Logo partners/FORTINET.png",
                  "/Logo partners/Geosystem.png",
                  "/Logo partners/genetec.png",
                  "/Logo partners/gold data.png",
                  "/Logo partners/grupo union.webp",
                  "/Logo partners/hexagon.png",
                  "/Logo partners/iafis.webp",
                  "/Logo partners/ifx.png",
                  "/Logo partners/iss.png",
                  "/Logo partners/istc.png",
                  "/Logo partners/itron.png",
                  "/Logo partners/jsc Ingenium.png",
                  "/Logo partners/lumu.png",
                  "/Logo partners/milestone.jpg",
                  "/Logo partners/nokia.png",
                  "/Logo partners/nozomi.png",
                  "/Logo partners/powerfleet.png",
                  "/Logo partners/provision.png",
                  "/Logo partners/silice.png",
                  "/Logo partners/thermal radal.jpg",
                  "/Logo partners/traki.png",
                  "/Logo partners/ubiik.png",
                  "/Logo partners/Verkada.png",
                  "/Logo partners/vhive.png",
                  "/Logo partners/whip solutions.jpg",
                  "/Logo partners/whitesky.png",
                  "/Logo partners/wesco.jpg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="group bg-white hover:bg-slate-50 transition-colors duration-200 flex items-center justify-center"
                    style={{ height: 100, padding: "0 28px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="max-w-full object-contain grayscale group-hover:grayscale-0 opacity-45 group-hover:opacity-95 transition-all duration-300"
                      style={{ maxHeight: 38, maxWidth: 120 }}
                    />
                  </div>
                ))}
              </div>

              {/* Tablet: 5 cols */}
              <div className="hidden sm:grid lg:hidden sm:grid-cols-5 divide-x divide-y divide-slate-100">
                {[
                  "/Logo partners/ANTUBAY.png",
                  "/Logo partners/CLIPP.jpg",
                  "/Logo partners/COMCORE.png",
                  "/Logo partners/CONDORTECH.png",
                  "/Logo partners/cotel.png",
                  "/Logo partners/druid.png",
                  "/Logo partners/EASYMETERING.png",
                  "/Logo partners/ENLINE.png",
                  "/Logo partners/EVIDEN.png",
                  "/Logo partners/FORTINET.png",
                  "/Logo partners/Geosystem.png",
                  "/Logo partners/genetec.png",
                  "/Logo partners/gold data.png",
                  "/Logo partners/grupo union.webp",
                  "/Logo partners/hexagon.png",
                  "/Logo partners/iafis.webp",
                  "/Logo partners/ifx.png",
                  "/Logo partners/iss.png",
                  "/Logo partners/istc.png",
                  "/Logo partners/itron.png",
                  "/Logo partners/jsc Ingenium.png",
                  "/Logo partners/lumu.png",
                  "/Logo partners/milestone.jpg",
                  "/Logo partners/nokia.png",
                  "/Logo partners/nozomi.png",
                  "/Logo partners/powerfleet.png",
                  "/Logo partners/provision.png",
                  "/Logo partners/silice.png",
                  "/Logo partners/thermal radal.jpg",
                  "/Logo partners/traki.png",
                  "/Logo partners/ubiik.png",
                  "/Logo partners/Verkada.png",
                  "/Logo partners/vhive.png",
                  "/Logo partners/whip solutions.jpg",
                  "/Logo partners/whitesky.png",
                  "/Logo partners/wesco.jpg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="group bg-white hover:bg-slate-50 transition-colors duration-200 flex items-center justify-center"
                    style={{ height: 96, padding: "0 20px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="max-w-full object-contain grayscale group-hover:grayscale-0 opacity-45 group-hover:opacity-95 transition-all duration-300"
                      style={{ maxHeight: 36, maxWidth: 110 }}
                    />
                  </div>
                ))}
              </div>

              {/* Mobile: 2 cols */}
              <div className="grid sm:hidden grid-cols-2 divide-x divide-y divide-slate-100">
                {[
                  "/Logo partners/ANTUBAY.png",
                  "/Logo partners/CLIPP.jpg",
                  "/Logo partners/COMCORE.png",
                  "/Logo partners/CONDORTECH.png",
                  "/Logo partners/cotel.png",
                  "/Logo partners/druid.png",
                  "/Logo partners/EASYMETERING.png",
                  "/Logo partners/ENLINE.png",
                  "/Logo partners/EVIDEN.png",
                  "/Logo partners/FORTINET.png",
                  "/Logo partners/Geosystem.png",
                  "/Logo partners/genetec.png",
                  "/Logo partners/gold data.png",
                  "/Logo partners/grupo union.webp",
                  "/Logo partners/hexagon.png",
                  "/Logo partners/iafis.webp",
                  "/Logo partners/ifx.png",
                  "/Logo partners/iss.png",
                  "/Logo partners/istc.png",
                  "/Logo partners/itron.png",
                  "/Logo partners/jsc Ingenium.png",
                  "/Logo partners/lumu.png",
                  "/Logo partners/milestone.jpg",
                  "/Logo partners/nokia.png",
                  "/Logo partners/nozomi.png",
                  "/Logo partners/powerfleet.png",
                  "/Logo partners/provision.png",
                  "/Logo partners/silice.png",
                  "/Logo partners/thermal radal.jpg",
                  "/Logo partners/traki.png",
                  "/Logo partners/ubiik.png",
                  "/Logo partners/Verkada.png",
                  "/Logo partners/vhive.png",
                  "/Logo partners/whip solutions.jpg",
                  "/Logo partners/whitesky.png",
                  "/Logo partners/wesco.jpg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="group bg-white hover:bg-slate-50 transition-colors duration-200 flex items-center justify-center"
                    style={{ height: 100, padding: "0 24px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="max-w-full object-contain grayscale group-hover:grayscale-0 opacity-45 group-hover:opacity-95 transition-all duration-300"
                      style={{ maxHeight: 36, maxWidth: 130 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>


        </div>
      </section>


<CtaFinal />
    </>
  );
}
