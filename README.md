# Web Corporativa OSC

Sitio público de [osctopsolutionsgroup.com](https://osctopsolutionsgroup.com). Next.js 16 (App Router) desplegado en Cloud Run dentro del proyecto `intranet-428417`.

A diferencia del resto de los desarrollos in house, este sitio **no lleva IAP** (es público) y **no separa frontend y backend** en dos servicios: los Route Handlers de Next.js cumplen el rol del backend en el mismo contenedor. Ver `G:\Mi unidad\Arquitectura Desarrollos In House OSC` para el estándar general.

## Desarrollo local

```bash
npm install
gcloud auth application-default login   # credenciales para Firestore (una sola vez)
npm run dev
```

Sin ADC configurado el sitio carga, pero los endpoints de formularios responden 500.

## Capa de datos

**Firestore** (base `(default)`, `us-central1`), mediante `firebase-admin` con Application Default Credentials. No hay llaves JSON en el repositorio.

| Ruta | Contenido |
|------|-----------|
| `formularios/web_contacto/envios/{autoId}` | Leads del formulario de contacto |
| `formularios/web_suscriptores/envios/{email}` | Suscriptores del newsletter (el correo es el ID, así la deduplicación es atómica) |
| `formularios/web_frente_critico/envios/{autoId}` | Leads de la landing `/frente-critico` (incluye `sector`, `horizonte`, `prioridad` y `consentimiento`) |

El prefijo `web_` los distingue de los formularios internos de la Intranet, que viven en la misma colección `formularios`. Todo envío lleva `origen` (`web-corporativa` o `landing-frente-critico`).

> **Cuidado con `collectionGroup`.** Siete módulos internos usan también una subcolección `envios`. Cualquier consulta `collectionGroup('envios')` en el backend de la Intranet barrerá estos envíos públicos: filtrar por `origen`.

Todo el acceso es **de servidor**: la autorización la hace el Route Handler, no las reglas de seguridad.

Las reglas de Firestore y de Storage del proyecto están en **deny-all** y se administran en la consola de Firebase, no desde este repositorio. Son **globales por base de datos**, compartidas con la Intranet y `cuentas-estrategicas`, así que un archivo de reglas versionado aquí sería configuración de todo el proyecto viviendo en el repo de una sola aplicación — editarlo y desplegarlo reescribiría las reglas de las demás. Si en algún momento hay que versionarlas, van junto a los demás exports de infraestructura (doc 07 §6), no acá.

Deny-all no limita a esta aplicación: el Admin SDK omite las reglas por diseño. Lo que garantiza es que ningún SDK cliente pueda tocar la base. Hoy ningún desarrollo de OSC usa el SDK cliente — los tres backends usan `firebase-admin`.

## Endpoints

| Endpoint | Autorización |
|----------|-------------|
| `POST /api/contacto` | Pública. Validación en `lib/forms.ts` |
| `POST /api/frente-critico` | Pública. Validación en `lib/forms.ts`; exige `consentimiento: true` |
| `POST /api/subscribe` | Pública. 409 si el correo ya existe |
| `GET /api/subscribe` | `Authorization: Bearer $ADMIN_SECRET` |
| `GET /api/vcard/mauricio-rubio` | Pública, contenido estático |

El `GET` administrativo lee el secreto de la cabecera y **no** de la query string: los parámetros de URL quedan escritos de forma permanente en los logs del balanceador y de Cloud Run.

Como el sitio es público y anónimo, el Route Handler es el único control antes de escribir. Por eso todo campo tiene tope de longitud, el cuerpo tiene tope de 16 KB, `pais` se valida contra `COUNTRIES`, y el input del usuario nunca se propaga por spread hacia Firestore (un `{"estado":"aprobado"}` en el cuerpo se ignora). Los campos de una línea se limpian de caracteres de control (CR/LF): `nombre`, `empresa` y `email` terminan en cabeceras del correo de notificación.

### Anti-bots

Sin CAPTCHA (fricción cero para el visitante). Tres capas, de la más barata a la más cara:

1. **Honeypot.** Ambos formularios llevan un campo `website` fuera de pantalla y sin tab. Cualquier valor no vacío = bot.
2. **Tiempo de llenado.** El cliente envía `iniciadoEn` (epoch ms al montar el formulario). Menos de 3 s o más de 12 h = bot. Un POST directo sin cargar la página no lo trae.
3. **Cloud Armor.** Política dedicada `web-corporativa-security-policy`: 10 `POST /api/*` por minuto por IP y ban de 10 min a partir de 30. Se crea con `functions/notify-web-leads/deploy.ps1 -Solo armor`.

A un bot detectado por 1 o 2 se le responde `{ ok: true }` igual que a un humano, pero no se guarda nada; queda un `console.warn` con el motivo y la IP. Si en el futuro hace falta CAPTCHA, `detectBot` en `lib/forms.ts` es el punto de entrada.

## Notificación de leads

La web **no envía correo**: solo escribe el lead con `notificado: false`. El correo lo envía la Cloud Function de `functions/notify-web-leads/` (un solo código, tres despliegues):

| Función | Disparador | Qué hace |
|---------|-----------|----------|
| `notify-web-contacto` | Firestore `created` en `formularios/web_contacto/envios/{id}` | Correo al instante |
| `notify-web-frente-critico` | Firestore `created` en `formularios/web_frente_critico/envios/{id}` | Correo al instante |
| `resend-pending-leads` | Cloud Scheduler cada 10 min (HTTP privada, OIDC) | Reintenta todo lead con `notificado == false` de más de 5 min |

Garantía de entrega: si el trigger falla, Eventarc reintenta (`--retry`); si aun así no sale, el barrido lo recoge cada 10 min hasta lograrlo, y el job de Scheduler queda en rojo mientras haya fallos. Cada intento fallido deja `notificacionError` y `notificacionIntentos` en el documento. Antes de enviar, la función reclama el documento en una transacción (`notificandoDesde`), así trigger y barrido nunca duplican un correo.

Destinatarios: `NOTIFY_TO` (por defecto) y `NOTIFY_TO_WEB_FRENTE_CRITICO` (opcional, si Frente Crítico lo atiende otra persona o un grupo). Se fijan como parámetros de `deploy.ps1`.

Para forzar la notificación de un documento concreto (por ejemplo uno anterior a este mecanismo, sin el campo `notificado`):

```powershell
$url = gcloud functions describe resend-pending-leads --gen2 --region us-central1 --format "value(serviceConfig.uri)"
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" "$url?doc=formularios/web_frente_critico/envios/<docId>"
```

La función corre con `sa-notificaciones-web@` (roles: `datastore.user`, `eventarc.eventReceiver`, `iam.serviceAccountTokenCreator` sobre sí misma) y envía por Gmail API con delegación de dominio desde `soporte.sistemas@`, sin llaves JSON.

## Variables de entorno

| Variable | Requerida | Notas |
|----------|-----------|-------|
| `GOOGLE_CLOUD_PROJECT` | No | Por defecto `intranet-428417`. En Cloud Run se detecta solo |
| `ADMIN_SECRET` | Solo para `GET /api/subscribe` | Sin ella el endpoint responde 503. Secreto `web-corporativa-admin-secret[-qa]` |
| `AGENTE_API_ORIGIN` | Solo si el widget del asistente está activo | Origen del orquestador al que `proxy.ts` reenvía `/agente-api/*` en runtime (`https://agente[-qa].osctopsolutionsgroup.com`). Vacía: el widget recibe 503 |

Y tres que **no son de runtime** sino de construcción (`ARG` del `Dockerfile`, resueltas en `next build`; ver § Ambientes):

| Build-arg | Por defecto | Qué fija |
|-----------|-------------|----------|
| `ENTORNO` | `prod` | `NEXT_PUBLIC_ENTORNO`: módulos de Firestore `web_*_qa`, sin GTM/GA4, `noindex` |
| `SITE_URL` | vacío = `https://osctopsolutionsgroup.com` | `NEXT_PUBLIC_SITE_URL`: canonical, `og:url`, sitemap |
| `AGENTE_HABILITADO` | `0` | `NEXT_PUBLIC_AGENTE_HABILITADO`: muestra el botón flotante del asistente |

No hay credenciales de base de datos: la identidad la da la service account del servicio.

## Ambientes y despliegue

Dos ambientes sobre el mismo proyecto `intranet-428417` y el mismo balanceador compartido (`intranet-url-map`), con el patrón de la Arquitectura de Desarrollos In House que ya usan `esm-qa`, `portal-proveedores-qa`, `constructor-qa` y `sgc-qa`: cada recurso de pruebas lleva el sufijo `-qa` y su propio subdominio.

| | QA (pruebas) | Producción |
|---|---|---|
| URL | `https://web-qa.osctopsolutionsgroup.com` (IAP: grupo `aplicaciones-qa-osc@`) | `https://osctopsolutionsgroup.com` (pública) |
| Cloud Run | `web-corporativa-service-qa` (máx. 3 instancias) | `web-corporativa-service` |
| NEG / backend service | `web-corporativa-neg-qa` / `web-corporativa-backend-qa` | `web-corporativa-neg` / `web-corporativa-backend` |
| Path matcher | `web-corporativa-matcher-qa` | `web-corporativa-matcher` |
| Imagen | `cloud-run-source-deploy/web-corporativa-service-qa:<sha>-qa` | la que construye el disparador de Cloud Build |
| Firestore | misma base `(default)`, módulos `web_contacto_qa`, `web_suscriptores_qa`, `web_frente_critico_qa` | `web_contacto`, `web_suscriptores`, `web_frente_critico` |
| Correo de leads | **no sale**: las funciones `notify-web-*` y el barrido solo escuchan los módulos de producción | sí |
| Analítica (GTM/GA4) | no se carga | sí |
| Indexación | `noindex` (metadata + `X-Robots-Tag` + `robots.txt` cerrado) | sí |
| Asistente virtual | widget visible, `AGENTE_API_ORIGIN=https://agente-qa.osctopsolutionsgroup.com` | widget oculto hasta activar `AGENTE_HABILITADO=1` en el disparador |
| Secreto `ADMIN_SECRET` | `web-corporativa-admin-secret-qa` | `web-corporativa-admin-secret` |
| Despliegue | `.\deploy.ps1 -Entorno qa`, desde cualquier rama | push a `main` (disparador) o `.\deploy.ps1 -Entorno prod` solo desde `main` con el árbol limpio |

Las service accounts (`sa-web-corporativa@`, `sa-notificaciones-web@`) son las mismas en ambos ambientes. TLS lo cubre el comodín `*.osctopsolutionsgroup.com` de Certificate Manager (`osc-cert-map`), así que un subdominio nuevo no necesita certificado; el DNS vive en GoDaddy y se crea a mano.

**Por qué el entorno va horneado en la imagen.** Las `NEXT_PUBLIC_*` se resuelven en `next build` y las páginas de marketing se prerenderizan, así que no hay forma de que una sola imagen sirva QA y producción cambiando variables de Cloud Run. `deploy.ps1` construye con `cloudbuild.yaml` pasando `ENTORNO`, `SITE_URL` y `AGENTE_HABILITADO` como build-args y etiqueta la imagen `<sha>-<entorno>`. El disparador de Cloud Build de `main` no pasa build-args: los valores por defecto del `Dockerfile` son los de producción, así que producción no cambia. Todo lo que depende del entorno en el código sale de `lib/entorno.ts`; lo único de runtime es `AGENTE_API_ORIGIN` (`proxy.ts`), que se puede cambiar sin reconstruir.

### Levantar QA por primera vez

```powershell
.\deploy.ps1 -Entorno qa                 # imagen + servicio + secreto (crea web-corporativa-admin-secret-qa)
.\infra\aprovisionar-qa.ps1              # NEG, backend service con IAP, host en intranet-url-map, miembros IAP
# GoDaddy: CNAME web-qa → osctopsolutionsgroup.com (lo imprime el script). Esperar propagación.
```

Si el grupo `aplicaciones-qa-osc@` aún no existe en Workspace, pasar personas: `.\infra\aprovisionar-qa.ps1 -MiembrosIap "user:a@osctopsolutionsgroup.com","user:b@..."`.

### Probar el asistente virtual en QA

1. En el repo del agente (`Agente AI - ChatBot`): `.\infra\aprovisionar.ps1 -Entorno qa` y `.\deploy-backend.ps1 -Entorno qa`, más su balanceador y el DNS `agente-qa`. Hasta que `https://agente-qa.osctopsolutionsgroup.com/agente-api/health` responda, el widget de QA mostrará "Asistente no disponible" (503 de `proxy.ts`).
2. `.\deploy.ps1 -Entorno qa` (el origen por defecto ya es `agente-qa`). Para apuntar a otro origen: `-AgenteOrigen https://...`; para ocultar el widget: `-SinAgente`.
3. Abrir `https://web-qa.osctopsolutionsgroup.com` con la cuenta de OSC. El navegador habla con `/agente-api/chat` en el mismo origen; la cookie de IAP acompaña la petición y `proxy.ts` la reenvía al orquestador.

Para pasar el asistente a producción: publicar el orquestador de prod, fijar `AGENTE_API_ORIGIN=https://agente.osctopsolutionsgroup.com` en `web-corporativa-service` y añadir `--build-arg AGENTE_HABILITADO=1` al paso `docker build` del disparador de Cloud Build (o desplegar con `.\deploy.ps1 -Entorno prod`, que ya lo pasa).

### Probar la notificación de leads en QA

Por diseño un envío en QA no manda correo. Si hace falta probar la Cloud Function, desplegarla una vez contra el módulo de pruebas y borrarla al terminar:

```powershell
# en functions/notify-web-leads/deploy.ps1 la función Deploy-Trigger recibe el módulo:
# Deploy-Trigger "notify-web-contacto-qa" "web_contacto_qa"   (con NOTIFY_TO a un buzón de pruebas)
```

### Limpieza de QA

Los documentos de `formularios/web_*_qa/envios` se pueden borrar sin riesgo desde la consola. Para apagar el ambiente sin destruirlo: quitar el host del URL map (`gcloud compute url-maps remove-path-matcher intranet-url-map --path-matcher-name web-corporativa-matcher-qa`) y bajar `--max-instances` a 0 o borrar el servicio.

## Despliegue de producción

El servicio se despliega **desde fuente**. Al haber un `Dockerfile` en la raíz, Cloud Build lo usa en lugar de los buildpacks, así que lo que corre en producción es la etapa `runner` de ese Dockerfile (`node server.js` sobre la salida `standalone`):

```powershell
gcloud run deploy web-corporativa-service `
  --source . --region us-central1 --project intranet-428417 `
  --service-account sa-web-corporativa@intranet-428417.iam.gserviceaccount.com
```

`sa-web-corporativa@` tiene exactamente dos roles: `roles/datastore.user` y `roles/logging.logWriter`.

Rollback:

```powershell
gcloud run services update-traffic web-corporativa-service `
  --to-revisions <REVISION>=100 --region us-central1
```

Las tres etapas del Dockerfile usan **Node 22 LTS**. No bajarlo: `firebase-admin` declara `engines.node >= 22` y Next 16 pide `>= 20.9`. La etapa `runner` usaba `node:18-alpine`, incompatible con ambos — un contenedor así arranca bien y falla recién al procesar el primer formulario.
