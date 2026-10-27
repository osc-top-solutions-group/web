<#
  Despliegue de la web corporativa en Cloud Run (intranet-428417), por entorno.
  Ejecutar desde la raíz del repo, en PowerShell (no en Git Bash: MSYS reescribe
  las rutas /projects/... como rutas de Windows), con gcloud autenticado.

    .\deploy.ps1                      # QA (por defecto): web-corporativa-service-qa
    .\deploy.ps1 -Entorno qa -SinAgente
    .\deploy.ps1 -Entorno qa -SoloDesplegar -Tag 3891ccd-qa   # reutiliza una imagen ya construida
    .\deploy.ps1 -Entorno prod        # solo desde main y con el árbol limpio

  Producción se publica normalmente sola: el disparador de Cloud Build
  "rmgpgab-web-corporativa-service-…" construye el Dockerfile (sin build-args =
  valores de producción) en cada push a main. Este script con -Entorno prod es
  la vía manual equivalente (rollback, hotfix sin push, etc.).

  Qué hace:
    1. Verifica rama/árbol (prod: main + sin cambios; qa: cualquier rama, avisa si está sucio).
    2. Construye la imagen con cloudbuild.yaml → etiqueta <sha>-<entorno>. El entorno
       va horneado en la imagen (NEXT_PUBLIC_ENTORNO, NEXT_PUBLIC_SITE_URL,
       NEXT_PUBLIC_AGENTE_HABILITADO): una imagen de QA nunca sirve producción.
    3. Crea el secreto ADMIN_SECRET del entorno si no existe (web-corporativa-admin-secret[-qa]).
    4. Despliega el servicio con las variables de runtime (AGENTE_API_ORIGIN) y etiquetas
       app/entorno/commit. QA queda detrás de IAP (solo el agente de IAP puede invocarlo);
       prod sin comprobación de invocador, como hoy.

  La primera vez en QA, después de este script, ejecutar .\infra\aprovisionar-qa.ps1
  (NEG, backend service con IAP, host web-qa.* en el balanceador compartido).
#>
param(
  [ValidateSet("qa", "prod")]
  [string]$Entorno = "qa",
  # Origen del orquestador del asistente (proxy.ts reenvía /agente-api/* aquí).
  # Por defecto: https://agente[-qa].osctopsolutionsgroup.com (balanceador propio
  # del proyecto agente-ai-511121; nunca una URL *.run.app, que no es alcanzable
  # con ingress interno).
  [string]$AgenteOrigen = "",
  # No mostrar el widget del asistente (imagen con AGENTE_HABILITADO=0).
  [switch]$SinAgente,
  # Saltar la construcción y desplegar la imagen con la etiqueta -Tag (o la del SHA actual).
  [switch]$SoloDesplegar,
  [string]$Tag = "",
  [string]$Project = "intranet-428417",
  [string]$Region = "us-central1",
  [string]$Dominio = "osctopsolutionsgroup.com"
)

$ErrorActionPreference = "Stop"

# Comprueba si un recurso existe sin que PowerShell 5.1 convierta el "NOT_FOUND"
# de gcloud en un error fatal (con ErrorActionPreference=Stop, redirigir stderr
# de un ejecutable nativo lanza NativeCommandError).
function Existe-Gcloud([string[]]$Argumentos) {
  $prev = $ErrorActionPreference; $ErrorActionPreference = "Continue"
  try { $null = & gcloud @Argumentos --verbosity none 2>&1; return ($LASTEXITCODE -eq 0) }
  finally { $ErrorActionPreference = $prev }
}

$sufijo   = if ($Entorno -eq "prod") { "" } else { "-$Entorno" }
$servicio = "web-corporativa-service$sufijo"
$sa       = "sa-web-corporativa@$Project.iam.gserviceaccount.com"
$hostWeb  = if ($Entorno -eq "prod") { $Dominio } else { "web-$Entorno.$Dominio" }
$siteUrl  = "https://$hostWeb"
$secreto  = "web-corporativa-admin-secret$sufijo"
$repoAR   = "$Region-docker.pkg.dev/$Project/cloud-run-source-deploy"

if (-not $AgenteOrigen) {
  $AgenteOrigen = if ($Entorno -eq "prod") { "https://agente.$Dominio" } else { "https://agente-$Entorno.$Dominio" }
}
$agenteHabilitado = if ($SinAgente) { "0" } else { "1" }

# ── 1. Rama y árbol de trabajo ────────────────────────────────────────────────
$rama  = (git rev-parse --abbrev-ref HEAD).Trim()
$sha   = (git rev-parse --short HEAD).Trim()
$sucio = (git status --porcelain).Length -gt 0

if ($Entorno -eq "prod" -and $rama -ne "main") { throw "Producción se despliega solo desde main (rama actual: $rama)" }
if ($Entorno -eq "prod" -and $sucio)           { throw "Hay cambios sin commit. Producción se despliega con el árbol limpio." }

if ($Tag) {
  $tag = $Tag
} else {
  $tag = "$sha-$Entorno"
  if ($sucio -and -not $SoloDesplegar) {
    Write-Warning "Árbol con cambios sin commit: la imagen se etiqueta como sucia."
    $tag += "-sucio-" + (Get-Date -Format "yyyyMMddHHmm")
  }
}
$imagen = "${repoAR}/${servicio}:$tag"

Write-Host "`nEntorno   : $Entorno" -ForegroundColor Cyan
Write-Host "Servicio  : $servicio"
Write-Host "Host      : $siteUrl"
Write-Host "Imagen    : $imagen"
Write-Host "Agente    : $(if ($SinAgente) { 'deshabilitado' } else { $AgenteOrigen })"
Write-Host "Rama/SHA  : $rama @ $sha`n"

# ── 2. Imagen (Cloud Build, build-args por entorno) ───────────────────────────
if ($SoloDesplegar) {
  Write-Host "== Sin construir: se despliega la imagen existente $tag ==" -ForegroundColor Cyan
} else {
  Write-Host "== Construyendo la imagen ==" -ForegroundColor Cyan
  gcloud builds submit --config cloudbuild.yaml --project $Project `
    --substitutions "_IMAGEN=$imagen,_ENTORNO=$Entorno,_SITE_URL=$siteUrl,_AGENTE_HABILITADO=$agenteHabilitado"
  if ($LASTEXITCODE -ne 0) { throw "Falló la construcción de la imagen" }
}

# ── 3. Secreto ADMIN_SECRET del entorno ───────────────────────────────────────
if (-not (Existe-Gcloud @("secrets", "describe", $secreto, "--project", $Project))) {
  if ($Entorno -eq "prod") { throw "No existe el secreto $secreto en $Project" }
  Write-Host "== Creando el secreto $secreto con un valor aleatorio ==" -ForegroundColor Cyan
  $bytes = New-Object byte[] 32
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  $valor = [Convert]::ToBase64String($bytes)
  $tmp = New-TemporaryFile
  [IO.File]::WriteAllText($tmp.FullName, $valor)
  gcloud secrets create $secreto --project $Project --replication-policy automatic --data-file $tmp.FullName | Out-Null
  Remove-Item $tmp.FullName
  gcloud secrets add-iam-policy-binding $secreto --project $Project `
    --member "serviceAccount:$sa" --role roles/secretmanager.secretAccessor --quiet | Out-Null
  Write-Host "   Valor (guardar en el gestor de contraseñas del área): $valor" -ForegroundColor Yellow
}

# ── 4. Cloud Run ──────────────────────────────────────────────────────────────
Write-Host "`n== Desplegando $servicio ==" -ForegroundColor Cyan
$maxInst = if ($Entorno -eq "prod") { 100 } else { 3 }
# --set-env-vars reemplaza TODAS las variables: pasar siempre el conjunto completo.
$vars = @("AGENTE_API_ORIGIN=$(if ($SinAgente) { '' } else { $AgenteOrigen })")

# Token compartido con el orquestador del asistente (header x-agente-origen, ver proxy.ts).
# Lo crea infra\aprovisionar.ps1 del repo del agente en ambos proyectos; si aún no existe
# el servicio se despliega sin él (el límite de tasa del orquestador será por IP de salida).
$secretoToken = "web-corporativa-agente-token$sufijo"
$secretos = "ADMIN_SECRET=${secreto}:latest"
if (Existe-Gcloud @("secrets", "describe", $secretoToken, "--project", $Project)) {
  $secretos += ",AGENTE_ORIGEN_TOKEN=${secretoToken}:latest"
} else {
  Write-Warning "No existe el secreto ${secretoToken}; el asistente no recibirá el token de origen (ver repo del agente, infra\aprovisionar.ps1)."
}

# QA: nadie entra sin pasar por el balanceador + IAP (solo el agente de IAP invoca).
# Prod: público, como hoy (invoker IAM desactivado; la política de la organización
# no admite allUsers, por eso no se usa --allow-unauthenticated).
$auth = if ($Entorno -eq "prod") { "--no-invoker-iam-check" } else { "--no-allow-unauthenticated" }

gcloud run deploy $servicio --image $imagen --region $Region --project $Project --platform managed `
  --service-account $sa --port 3000 --cpu 1 --memory 512Mi --cpu-boost `
  --min-instances 0 --max-instances $maxInst `
  --ingress internal-and-cloud-load-balancing $auth `
  --labels "app=web-corporativa,entorno=$Entorno,commit=$sha" `
  --set-env-vars ($vars -join ",") `
  --update-secrets $secretos
if ($LASTEXITCODE -ne 0) { throw "Falló el despliegue de $servicio" }

if ($Entorno -ne "prod") {
  $numero = gcloud projects describe $Project --format "value(projectNumber)"
  gcloud run services add-iam-policy-binding $servicio --region $Region --project $Project `
    --member "serviceAccount:service-$numero@gcp-sa-iap.iam.gserviceaccount.com" --role roles/run.invoker --quiet | Out-Null
}

Write-Host "`nListo: $servicio ($tag)." -ForegroundColor Green
if ($Entorno -ne "prod") {
  if (-not (Existe-Gcloud @("compute", "backend-services", "describe", "web-corporativa-backend$sufijo", "--global", "--project", $Project))) {
    Write-Host "Primer despliegue de $Entorno`: falta el balanceador. Ejecutar .\infra\aprovisionar-qa.ps1 -Entorno $Entorno" -ForegroundColor Yellow
  } else {
    Write-Host "URL: $siteUrl (acceso por IAP)"
  }
} else {
  Write-Host "Registrar el despliegue en la hoja de despliegues (fecha, SHA, quién autorizó, resultado)."
}

# Que el código de salida sea el del despliegue y no el de la última comprobación.
exit 0
