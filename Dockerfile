# Etapa 1: Dependencias
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
#COPY package.json package-lock.json ./
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Etapa 2: Constructor (Builder)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Deshabilita la telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Etapa 3: Producción (Runner)
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

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