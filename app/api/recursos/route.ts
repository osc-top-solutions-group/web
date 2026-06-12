import { NextRequest, NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase/client";
import { createServerClient } from "@/lib/supabase/server";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function POST(req: NextRequest) {
  const { nombre, email, empresa, recurso, tipo } = await req.json();

  if (!nombre || !email || !recurso) {
    return NextResponse.json({ error: "Campos requeridos incompletos" }, { status: 400 });
  }

  const anon = createAnonClient();
  const { error: dbError } = await anon.from("resource_leads").insert({
    nombre,
    email,
    empresa: empresa || null,
    recurso,
    tipo: tipo || "recursos",
  });

  if (dbError) {
    console.error("resource_leads insert error:", dbError);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }

  const server = createServerClient();
  const path = `${tipo ?? "recursos"}/${slugify(recurso)}.pdf`;
  const { data, error: storageError } = await server.storage
    .from("recursos")
    .createSignedUrl(path, 3600);

  if (storageError) {
    // Lead was captured — return success even if signed URL fails
    console.error("storage signedUrl error:", storageError);
    return NextResponse.json({ ok: true, downloadUrl: null });
  }

  return NextResponse.json({ ok: true, downloadUrl: data.signedUrl });
}
