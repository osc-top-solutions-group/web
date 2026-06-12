import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Redis client — se conecta automáticamente via env vars
// UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN
function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// POST /api/subscribe — guardar email
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ message: "Email inválido" }, { status: 400 });
    }

    const redis = getRedis();
    if (!redis) {
      // Modo sin base de datos: log temporal
      console.log(`[SUBSCRIBE] Nuevo suscriptor: ${email}`);
      return NextResponse.json({ message: "Suscrito exitosamente" }, { status: 200 });
    }

    // Verificar si ya existe
    const exists = await redis.sismember("osc:subscribers", email);
    if (exists) {
      return NextResponse.json({ message: "Este email ya está suscrito" }, { status: 409 });
    }

    // Guardar en set + hash con metadata
    await redis.sadd("osc:subscribers", email);
    await redis.hset(`osc:subscriber:${email}`, {
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Suscrito exitosamente" }, { status: 200 });
  } catch (err) {
    console.error("[SUBSCRIBE ERROR]", err);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

// GET /api/subscribe — listar todos los suscriptores (solo admin)
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ subscribers: [], count: 0 });
  }

  const emails = (await redis.smembers("osc:subscribers")) as string[];

  const subscribers = await Promise.all(
    emails.map(async (email) => {
      const data = await redis.hgetall(`osc:subscriber:${email}`);
      return data ?? { email };
    })
  );

  // Ordenar por fecha de suscripción (más reciente primero)
  subscribers.sort((a: any, b: any) =>
    new Date(b.subscribedAt ?? 0).getTime() - new Date(a.subscribedAt ?? 0).getTime()
  );

  return NextResponse.json({ subscribers, count: subscribers.length });
}
