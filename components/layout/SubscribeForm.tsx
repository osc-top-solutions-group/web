"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "exists">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setStatus("exists");
        setMessage("Este email ya está suscrito");
      } else if (res.ok) {
        setStatus("success");
        setMessage("¡Gracias por suscribirte!");
        setEmail("");
        // Reset después de 4 segundos
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setMessage(data.message || "Algo salió mal. Intenta de nuevo.");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Intenta de nuevo.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2.5 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-medium px-5 py-2.5 rounded-full">
        <Check size={14} />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      {/* Input container */}
      <div
        className="flex items-center gap-2.5 rounded-full px-4 py-2.5 transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,0,87,0.5)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
      >
        <Mail size={14} style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="tu@empresa.com"
          required
          className="bg-transparent text-white text-sm outline-none placeholder:text-white/25 w-44"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === "loading" || !email}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg,#FF0057,#cc0047)" }}
      >
        {status === "loading" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <>
            Suscribir
            <ArrowRight size={13} />
          </>
        )}
      </button>

      {/* Error / exists message */}
      {(status === "error" || status === "exists") && (
        <div className="flex items-center gap-1.5 text-xs text-amber-400">
          <AlertCircle size={12} />
          {message}
        </div>
      )}
    </form>
  );
}
