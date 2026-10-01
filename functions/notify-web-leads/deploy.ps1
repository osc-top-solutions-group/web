<#
  Despliegue de las notificaciones de leads de la web pública.
  Ejecutar desde la raíz del repo, con gcloud autenticado en intranet-428417.

    .\functions\notify-web-leads\deploy.ps1            # todo
    .\functions\notify-web-leads\deploy.ps1 -Solo fc   # solo notify-web-frente-critico
    .\functions\notify-web-leads\deploy.ps1 -Solo sweep

  Qué crea / actualiza:
    1. notify-web-contacto        (ya existe: se actualiza con el código nuevo y --retry)
    2. notify-web-frente-critico  (nuevo trigger sobre formularios/web_frente_critico/envios)
    3. resend-pending-leads       (HTTP privada) + job de Cloud Scheduler cada 10 min
    4. Regla de Cloud Armor: tope de POST a /api/* por IP (anti-abuso de formularios)

  Los tres despliegues usan la MISMA service account sa-notificaciones-web@,
  que ya tiene datastore.user, eventarc.eventReceiver y tokenCreator sobre sí
  misma. No hace falta ningún rol nuevo salvo run.invoker para el Scheduler (paso 3).
#>
param(
  [ValidateSet("all", "contacto", "fc", "sweep", "armor")]
  [string]$Solo = "all",
  [string]$NotifyTo = "alexander.ayala@osctopsolutionsgroup.com",
  # Destinatario específico de Frente Crítico; por defecto el mismo. Puede ser un grupo (leads@...).
  [string]$NotifyToFrenteCritico = ""
)

$ErrorActionPreference = "Stop"
$Project = "intranet-428417"
$Region  = "us-central1"
$Sa      = "sa-notificaciones-web@$Project.iam.gserviceaccount.com"
$Source  = "functions/notify-web-leads"
$Sender  = "soporte.sistemas@osctopsolutionsgroup.com"

$envVars = "SA_EMAIL=$Sa,MAIL_SENDER=$Sender,NOTIFY_TO=$NotifyTo"
if ($NotifyToFrenteCritico) { $envVars += ",NOTIFY_TO_WEB_FRENTE_CRITICO=$NotifyToFrenteCritico" }

function Deploy-Trigger([string]$Name, [string]$Modulo) {
  Write-Host "`n== $Name (trigger formularios/$Modulo/envios) ==" -ForegroundColor Cyan
  gcloud functions deploy $Name `
    --gen2 --runtime nodejs22 --region $Region --project $Project `
    --source $Source --entry-point notifyLead `
    --trigger-event-filters="type=google.cloud.firestore.document.v1.created" `
    --trigger-event-filters="database=(default)" `
    --trigger-event-filters-path-pattern="document=formularios/$Modulo/envios/{docId}" `
    --trigger-location $Region --trigger-service-account $Sa --retry `
    --service-account $Sa --ingress-settings internal-only `
    --max-instances 3 --memory 256Mi --timeout 60s `
    --set-env-vars $envVars
  if ($LASTEXITCODE -ne 0) { throw "Falló el despliegue de $Name" }
}

if ($Solo -in "all", "contacto") { Deploy-Trigger "notify-web-contacto" "web_contacto" }
if ($Solo -in "all", "fc")       { Deploy-Trigger "notify-web-frente-critico" "web_frente_critico" }

if ($Solo -in "all", "sweep") {
  Write-Host "`n== resend-pending-leads (HTTP privada, la invoca Cloud Scheduler) ==" -ForegroundColor Cyan
  gcloud functions deploy resend-pending-leads `
    --gen2 --runtime nodejs22 --region $Region --project $Project `
    --source $Source --entry-point resendPendingLeads `
    --trigger-http --no-allow-unauthenticated `
    --service-account $Sa --ingress-settings internal-only `
    --max-instances 1 --memory 256Mi --timeout 300s `
    --set-env-vars $envVars
  if ($LASTEXITCODE -ne 0) { throw "Falló el despliegue de resend-pending-leads" }

  $url = gcloud functions describe resend-pending-leads --gen2 --region $Region --project $Project --format "value(serviceConfig.uri)"

  # Scheduler llama con un token OIDC de la misma SA: hace falta run.invoker sobre el servicio.
  gcloud run services add-iam-policy-binding resend-pending-leads `
    --region $Region --project $Project `
    --member "serviceAccount:$Sa" --role roles/run.invoker | Out-Null

  $jobExists = gcloud scheduler jobs describe resend-pending-leads --location $Region --project $Project --format "value(name)" 2>$null
  $verb = if ($jobExists) { "update" } else { "create" }
  gcloud scheduler jobs $verb http resend-pending-leads `
    --location $Region --project $Project `
    --schedule "*/10 * * * *" --time-zone "America/Bogota" `
    --uri $url --http-method POST `
    --oidc-service-account-email $Sa --oidc-token-audience $url `
    --attempt-deadline 300s `
    --description "Reintenta la notificación de leads web con notificado == false"
  if ($LASTEXITCODE -ne 0) { throw "Falló el job de Scheduler" }
}

if ($Solo -in "all", "armor") {
  Write-Host "`n== Cloud Armor: política dedicada del sitio público ==" -ForegroundColor Cyan
  # web-corporativa-backend hoy usa `default-security-policy-for-intranet-api-backend`,
  # COMPARTIDA con intranet-api y proveedores-api. Una regla sobre /api/* ahí
  # afectaría a esas aplicaciones, así que el sitio público recibe su propia
  # política: mismo throttle base (500 req/min/IP) + tope específico para los
  # formularios: 10 POST/min/IP y ban de 10 min al que pase de 30. Un humano
  # nunca envía 10 formularios en un minuto.
  $policy = "web-corporativa-security-policy"
  $policyExists = gcloud compute security-policies describe $policy --project $Project --format "value(name)" 2>$null
  if (-not $policyExists) {
    gcloud compute security-policies create $policy --project $Project `
      --description "Sitio público osctopsolutionsgroup.com (web-corporativa-backend)"
    if ($LASTEXITCODE -ne 0) { throw "Falló la creación de la política" }
    gcloud compute security-policies rules create 2147483646 `
      --security-policy $policy --project $Project `
      --src-ip-ranges "*" --action throttle `
      --rate-limit-threshold-count 500 --rate-limit-threshold-interval-sec 60 `
      --conform-action allow --exceed-action deny-403 --enforce-on-key IP `
      --description "Throttle base: 500 req/min por IP (igual que la política compartida)"
    if ($LASTEXITCODE -ne 0) { throw "Falló la regla base" }
  }
  $exists = gcloud compute security-policies rules describe 1000 --security-policy $policy --project $Project --format "value(priority)" 2>$null
  $verb = if ($exists) { "update" } else { "create" }
  gcloud compute security-policies rules $verb 1000 `
    --security-policy $policy --project $Project `
    --expression "request.method == 'POST' && request.path.startsWith('/api/')" `
    --action rate-based-ban `
    --rate-limit-threshold-count 10 --rate-limit-threshold-interval-sec 60 `
    --ban-threshold-count 30 --ban-threshold-interval-sec 60 --ban-duration-sec 600 `
    --conform-action allow --exceed-action deny-429 --enforce-on-key IP `
    --description "Formularios web: max 10 POST/min por IP; ban 10 min si supera 30"
  if ($LASTEXITCODE -ne 0) { throw "Falló la regla de Cloud Armor" }

  # Cuelga la política dedicada del backend del sitio público (reemplaza la compartida).
  gcloud compute backend-services update web-corporativa-backend --global --project $Project `
    --security-policy $policy
  if ($LASTEXITCODE -ne 0) { throw "Falló al asociar la política al backend" }
}

Write-Host "`nListo." -ForegroundColor Green
