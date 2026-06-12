"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 30,    prefix: "",  suffix: " años", label: "Operación continua"  },
  { value: 16,    prefix: "",  suffix: "",       label: "Países"              },
  { value: 2000,  prefix: "+", suffix: "",       label: "Clientes"            },
  { value: 33000, prefix: "+", suffix: "",       label: "Nodos gestionados"   },
];

function Counter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setCount(target); return; }
    const duration = 1400;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, reduced]);

  const formatted = count >= 1000
    ? count.toLocaleString("de-DE")
    : count.toString();

  return (
    <span ref={ref} aria-label={`${prefix}${target.toLocaleString()}${suffix}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function Stats() {
  const reduced = useReducedMotion();

  return (
    <section className="py-0 bg-white relative overflow-hidden" aria-label="Métricas clave">
      <div className="w-full" style={{ background: "#0F172A" }}>
        {/* Top accent line */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #FF0057 30%, #FF0057 70%, transparent)" }} />

        <div className="max-w-7xl mx-auto px-6 py-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-white/8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col items-center justify-center text-center px-8 py-10 group${
                  i < stats.length - 1 ? " lg:border-r lg:border-white/8" : ""
                }`}
              >
                {/* Number */}
                <p
                  className="text-4xl xl:text-5xl font-bold text-white leading-none whitespace-nowrap mb-3"
                  style={{ fontFamily: "'Inter', 'DM Sans', ui-sans-serif, system-ui, sans-serif", letterSpacing: "-0.02em" }}
                >
                  <Counter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>

                {/* Red accent divider */}
                <div
                  className="w-8 h-[3px] rounded-full mb-3 transition-all duration-300 group-hover:w-14"
                  style={{ backgroundColor: "#FF0057" }}
                />

                {/* Label */}
                <p
                  className="text-white text-base font-medium leading-snug"
                  style={{ fontFamily: "'Inter', 'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }} />
      </div>
    </section>
  );
}
