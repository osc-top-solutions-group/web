# Etapa 1: Dependencias
FROM node:22.23.4-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
#COPY package.json package-lock.json ./
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Etapa 2: Constructor (Builder)
FROM node:22.23.4-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Deshabilita la telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED 1
# Entorno horneado en la imagen (ver lib/entorno.ts). Los valores por defecto
# son los de PRODUCCIÓN: el disparador de Cloud Build de main no pasa build-args.
# QA se construye con deploy.ps1 -Entorno qa (cloudbuild.yaml), que fija:
#   ENTORNO=qa, SITE_URL=https://web-qa.osctopsolutionsgroup.com, AGENTE_HABILITADO=1
# Las NEXT_PUBLIC_* se resuelven en `next build`: por eso van aquí y no en Cloud Run.
ARG ENTORNO=prod
ARG SITE_URL=""
ARG AGENTE_HABILITADO=0
ENV NEXT_PUBLIC_ENTORNO=$ENTORNO
ENV NEXT_PUBLIC_SITE_URL=$SITE_URL
ENV NEXT_PUBLIC_AGENTE_HABILITADO=$AGENTE_HABILITADO
RUN npm run build

# Etapa 3: Producción (Runner)
# Node 22 LTS en las tres etapas: es lo que exige firebase-admin (>=22), lo que
# pide Next 16 (>=20.9) y el estándar del stack (doc 02 §2). Antes esta etapa
# usaba node:18, incompatible con ambos.
FROM node:22.23.4-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
# Mismo entorno que el builder, por si algún módulo del servidor lo lee en runtime.
ARG ENTORNO=prod
ENV NEXT_PUBLIC_ENTORNO=$ENTORNO

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
# El modo standalone crea esta carpeta que contiene todo lo necesario
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]