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

El prefijo `web_` los distingue de los formularios internos de la Intranet, que viven en la misma colección `formularios`. Todo envío lleva `origen: "web-corporativa"`.

> **Cuidado con `collectionGroup`.** Siete módulos internos usan también una subcolección `envios`. Cualquier consulta `collectionGroup('envios')` en el backend de la Intranet barrerá estos envíos públicos: filtrar por `origen`.

Todo el acceso es **de servidor**. `firestore.rules` deniega el acceso desde cliente; el Admin SDK omite las reglas por diseño y la autorización la hace el Route Handler.

## Endpoints

| Endpoint | Autorización |
|----------|-------------|
| `POST /api/contacto` | Pública. Validación en `lib/forms.ts` |
| `POST /api/subscribe` | Pública. 409 si el correo ya existe |
| `GET /api/subscribe` | `Authorization: Bearer $ADMIN_SECRET` |
| `GET /api/vcard/mauricio-rubio` | Pública, contenido estático |

El `GET` administrativo lee el secreto de la cabecera y **no** de la query string: los parámetros de URL quedan escritos de forma permanente en los logs del balanceador y de Cloud Run.

Como el sitio es público y anónimo, el Route Handler es el único control antes de escribir. Por eso todo campo tiene tope de longitud, el cuerpo tiene tope de 16 KB, `pais` se valida contra `COUNTRIES`, y el input del usuario nunca se propaga por spread hacia Firestore (un `{"estado":"aprobado"}` en el cuerpo se ignora).

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
