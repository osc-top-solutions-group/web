"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

const offices = [
  { country: "Colombia",   city: "Bogotá",           address: "Cra. 70 D No. 52-81" },
  { country: "USA",        city: "Dallas, Texas",    address: "2267 Larson Lane Ste 160" },
  { country: "USA",        city: "Denver, Colorado", address: "4800 Dahlia Street OSC, CO 80216" },
  { country: "Perú",       city: "Lima",             address: "Av. Juan De Aliaga No 455, Magdalena Del Mar" },
  { country: "Bolivia",    city: "Santa Cruz",       address: "Av. San Martín 4to anillo, Ed. Tacuaral piso 3, Of. 305B" },
  { country: "México",     city: "Ciudad de México", address: "Calzada Gral. Mariano Escobedo 498, Col. Anzures, C.P 11590" },
  { country: "Chile",      city: "Santiago",         address: "Pedro de Valdivia 555, Of. 406, Providencia" },
  { country: "Costa Rica", city: "San José",         address: "Trans. 24, Plaza Ventura, local # 9" },
  { country: "Ecuador",    city: "Quito",            address: "José Padilla N3-30 y Nuñez de Vela, Ed. Platinium 2do Piso" },
];

const countries = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia",
  "Costa Rica", "Ecuador", "El Salvador", "Estados Unidos",
  "Guatemala", "Honduras", "México", "Nicaragua", "Panamá",
  "Perú", "Uruguay",
];

const inputClass =
  "w-full bg-[#F8FAFC] border border-gray-200 focus:border-[#FF0057] focus:bg-white rounded-xl px-4 py-3 text-[#0F172A] placeholder-slate-400 text-sm outline-none transition-all";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", empresa: "", rol: "", email: "",
    telefono: "", pais: "", mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("server error");
      setSent(true);
    } catch {
      alert("Ocurrió un error al enviar. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-white grid-bg">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,134,0.05) 0%, transparent 65%)", transform: "translate(20%,-20%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#0F172A] max-w-3xl mb-6">
              Identifiquemos los{" "}
              <span className="text-gradient">riesgos no gestionados</span>{" "}
              de su operación
            </h1>
            <p className="text-[#475569] text-xl font-light max-w-2xl">
              Nuestros expertos en infraestructuras críticas están listos para
              diseñar su modelo de operación ideal.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">

          {/* ── Form ── */}
          <AnimatedSection direction="left">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 size={56} className="text-[#FF0057] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">¡Mensaje enviado!</h3>
                  <p className="text-slate-500">
                    Nuestro equipo se comunicará con usted en las próximas 24 horas.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-1">
                    Hablemos de su proyecto
                  </h2>
                  <p className="text-slate-400 text-sm mb-6">
                    Complete el formulario y un experto OSC lo contactará en menos de 24 h.
                  </p>

                  {/* Row 1 — Nombre + Empresa */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-slate-600 text-sm font-semibold mb-1.5">
                        Nombre completo <span className="text-[#FF0057]">*</span>
                      </label>
                      <input
                        id="nombre" name="nombre" type="text"
                        value={form.nombre} onChange={handleChange}
                        placeholder="Juan Pérez" required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-slate-600 text-sm font-semibold mb-1.5">
                        Empresa <span className="text-[#FF0057]">*</span>
                      </label>
                      <input
                        id="empresa" name="empresa" type="text"
                        value={form.empresa} onChange={handleChange}
                        placeholder="Nombre de su organización" required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Row 2 — Rol */}
                  <div>
                    <label htmlFor="rol" className="block text-slate-600 text-sm font-semibold mb-1.5">
                      Cargo / Rol <span className="text-[#FF0057]">*</span>
                    </label>
                    <input
                      id="rol" name="rol" type="text"
                      value={form.rol} onChange={handleChange}
                      placeholder="CTO, Director de Operaciones, Gerente TI…" required
                      className={inputClass}
                    />
                  </div>

                  {/* Row 3 — Email + Teléfono */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-slate-600 text-sm font-semibold mb-1.5">
                        Email corporativo <span className="text-[#FF0057]">*</span>
                      </label>
                      <input
                        id="email" name="email" type="email"
                        value={form.email} onChange={handleChange}
                        placeholder="juan@empresa.com" required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-slate-600 text-sm font-semibold mb-1.5">
                        Número de contacto
                      </label>
                      <input
                        id="telefono" name="telefono" type="tel"
                        value={form.telefono} onChange={handleChange}
                        placeholder="+57 300 000 0000"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Row 4 — País */}
                  <div>
                    <label htmlFor="pais" className="block text-slate-600 text-sm font-semibold mb-1.5">
                      País <span className="text-[#FF0057]">*</span>
                    </label>
                    <select
                      id="pais" name="pais"
                      value={form.pais} onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Seleccione su país</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="mensaje" className="block text-slate-600 text-sm font-semibold mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje" name="mensaje"
                      value={form.mensaje} onChange={handleChange}
                      placeholder="Cuéntenos sobre su infraestructura y los desafíos que enfrenta..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-[#FF0057] hover:bg-[#cc0047] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Enviar mensaje <Send size={16} /></>
                    )}
                  </motion.button>

                  <p className="text-slate-400 text-xs text-center">
                    Al enviar acepta nuestra política de privacidad. Sin spam, nunca.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* ── Info + Offices ── */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="space-y-8">

              {/* Contact info */}
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-5">Información de contacto</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail,   label: "Email general", value: "comunicaciones@osctopsolutionsgroup.com" },
                    { icon: MapPin, label: "Presencia",     value: "16 países en América Latina y EE.UU." },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FF0057]/8 border border-[#FF0057]/15 flex items-center justify-center shrink-0">
                        <item.icon size={16} className="text-[#FF0057]" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-0.5">{item.label}</p>
                        <p className="text-[#0F172A] font-semibold text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offices */}
              <div className="border-t border-gray-100 pt-7">
                <h3 className="text-xl font-bold text-[#0F172A] mb-5">Oficinas regionales</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {offices.map((office, i) => (
                    <div
                      key={`${office.country}-${i}`}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#FF0057]/25 hover:shadow-sm transition-all duration-200"
                    >
                      <p className="text-[#FF0057] text-xs font-bold uppercase tracking-wider mb-1">
                        {office.country}
                      </p>
                      <p className="text-[#0F172A] font-semibold text-sm">{office.city}</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{office.address}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
