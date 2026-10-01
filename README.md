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
| `ADMIN_SECRET` | Solo para `GET /api/subscribe` | Sin ella el endpoint responde 503 |

No hay credenciales de base de datos: la identidad la da la service account del servicio.

## Despliegue

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
