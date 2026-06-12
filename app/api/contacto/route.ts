import { NextRequest, NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  const { nombre, empresa, rol, email, telefono, pais, mensaje } = await req.json();

  if (!nombre || !empresa || !rol || !email || !pais) {
    return NextResponse.json({ error: "Campos requeridos incompletos" }, { status: 400 });
  }

  const supabase = createAnonClient();
  const { error } = await supabase.from("contact_submissions").insert({
    nombre,
    empresa,
    rol,
    email,
    telefono: telefono || null,
    pais,
    mensaje: mensaje || null,
  });

  if (error) {
    console.error("contact_submissions insert error:", error);
    return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
