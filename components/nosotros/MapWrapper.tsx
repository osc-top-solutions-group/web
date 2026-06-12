"use client";

import dynamic from "next/dynamic";

const AmericaMap = dynamic(() => import("@/components/nosotros/AmericaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-3xl border border-[#0F172A]/10 bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Cargando mapa...</p>
      </div>
    </div>
  ),
});

export default function MapWrapper() {
  return <AmericaMap />;
}
