<#
  Aprovisionamiento (una sola vez) del ambiente de pruebas de la web corporativa
  en el balanceador compartido de intranet-428417. Idempotente: los recursos
  que ya existen se dejan como están. Ejecutar en PowerShell con una cuenta con
  permisos de Compute/IAP en el proyecto, DESPUÉS del primer .\deploy.ps1 -Entorno qa
  (el NEG serverless necesita que el servicio de Cloud Run exista).

    .\infra\aprovisionar-qa.ps1
    .\infra\aprovisionar-qa.ps1 -MiembrosIap "user:alguien@osctopsolutionsgroup.com"

  Patrón "opción A" de la Arquitectura de Desarrollos In House (doc 06): subdominio
  propio detrás del balanceador existente, con IAP. Mismo esquema que esm-qa,
  portal-proveedores-qa, constructor-qa y sgc-qa:

    Cloud Run        web-corporativa-service-qa
    NEG serverless   web-corporativa-neg-qa
    Backend service  web-corporativa-backend-qa   (IAP + Cloud Armor)
    URL map          intranet-url-map → host web-qa.osctopsolutionsgroup.com → web-corporativa-matcher-qa
    TLS              comodín *.osctopsolutionsgroup.com (Certificate Manager, osc-cert-map): no hace falta certificado
    DNS              GoDaddy (manual): CNAME web-qa → osctopsolutionsgroup.com

  Lo que NO hace (manual):
    - El registro DNS en GoDaddy (se imprime al final).
    - Crear el grupo aplicaciones-qa-osc@ en Workspace si no existe (pasar -MiembrosIap mientras tanto).
#>
param(
  [ValidateSet("qa")]
  [string]$Entorno = "qa",
  [string]$Project = "intranet-428417",
  [string]$Region = "us-central1",
  [string]$Dominio = "osctopsolutionsgroup.com",
  [string]$UrlMap = "intranet-url-map",
  [string]$PoliticaArmor = "default-security-policy-for-intranet-api-backend",
  # Quién puede entrar a QA por IAP. Grupo estándar de las aplicaciones de pruebas.
  [string[]]$MiembrosIap = @("group:aplicaciones-qa-osc@$Dominio")
)

$ErrorActionPreference = "Stop"
$sufijo   = "-$Entorno"
$servicio = "web-corporativa-service$sufijo"
$neg      = "web-corporativa-neg$sufijo"
$bs       = "web-corporativa-backend$sufijo"
$matcher  = "web-corporativa-matcher$sufijo"
$hostWeb  = "web-$Entorno.$Dominio"

function Paso($t) { Write-Host "`n== $t" -ForegroundColor Cyan }

# Comprueba si un recurso existe sin que PowerShell 5.1 convierta el "NOT_FOUND"
# de gcloud en un error fatal (con ErrorActionPreference=Stop, redirigir stderr
# de un ejecutable nativo lanza NativeCommandError).
function Existe-Gcloud([string[]]$Args) {
  $prev = $ErrorActionPreference; $ErrorActionPreference = "Continue"
  try { $null = & gcloud @Args --verbosity none 2>&1; return ($LASTEXITCODE -eq 0) }
  finally { $ErrorActionPreference = $prev }
}

Paso "0. Servicio de Cloud Run"
if (-not (Existe-Gcloud @("run", "services", "describe", $servicio, "--region", $Region, "--project", $Project))) {
  throw "No existe $servicio. Ejecutar primero .\deploy.ps1 -Entorno $Entorno"
}
$numero = gcloud projects describe $Project --format "value(projectNumber)"

Paso "1. NEG serverless $neg"
if (Existe-Gcloud @("compute", "network-endpoint-groups", "describe", $neg, "--region", $Region, "--project", $Project)) {
  Write-Host "   ya existe"
} else {
  gcloud compute network-endpoint-groups create $neg --region $Region --project $Project `
    --network-endpoint-type serverless --cloud-run-service $servicio
}

Paso "2. Backend service $bs (IAP habilitado, Cloud Armor)"
if (Existe-Gcloud @("compute", "backend-services", "describe", $bs, "--global", "--project", $Project)) {
  Write-Host "   ya existe"
} else {
  gcloud compute backend-services create $bs --global --project $Project `
    --load-balancing-scheme EXTERNAL_MANAGED --protocol HTTP --iap=enabled
  gcloud compute backend-services add-backend $bs --global --project $Project `
    --network-endpoint-group $neg --network-endpoint-group-region $Region
}
# Misma política de borde que producción (tope de peticiones por IP sobre /api/*).
gcloud compute backend-services update $bs --global --project $Project --security-policy $PoliticaArmor | Out-Null

Paso "3. Host $hostWeb en $UrlMap"
$hosts = gcloud compute url-maps describe $UrlMap --project $Project --format "value(hostRules.hosts)"
if ($hosts -match [regex]::Escape($hostWeb)) {
  Write-Host "   ya existe la regla de host"
} else {
  # Copia de seguridad del mapa compartido antes de tocarlo (se versiona junto al resto de infra).
  $respaldo = "infra/respaldo-url-map-$(Get-Date -Format 'yyyyMMdd-HHmmss').yaml"
  gcloud compute url-maps export $UrlMap --global --project $Project --destination $respaldo
  Write-Host "   respaldo en $respaldo"
  gcloud compute url-maps add-path-matcher $UrlMap --global --project $Project `
    --path-matcher-name $matcher --default-service $bs --new-hosts $hostWeb
}

Paso "4. IAP: quién puede entrar"
foreach ($m in $MiembrosIap) {
  gcloud iap web add-iam-policy-binding --project $Project --resource-type backend-services --service $bs `
    --member $m --role roles/iap.httpsResourceAccessor --quiet | Out-Null
  Write-Host "   $m"
}
# Solo el agente de IAP puede invocar el servicio (deploy.ps1 ya lo hace; se repite por idempotencia).
gcloud run services add-iam-policy-binding $servicio --region $Region --project $Project `
  --member "serviceAccount:service-$numero@gcp-sa-iap.iam.gserviceaccount.com" --role roles/run.invoker --quiet | Out-Null

Paso "5. TLS y DNS"
$mapa = gcloud compute target-https-proxies describe intranet-https-proxy --project $Project --format "value(certificateMap)"
if ($mapa) {
  Write-Host "   El proxy usa Certificate Manager ($($mapa.Split('/')[-1])) con el comodín *.$Dominio`: no hace falta certificado."
} else {
  Write-Warning "El proxy no tiene mapa de certificados: crear un certificado gestionado para $hostWeb y añadirlo a intranet-https-proxy."
}
$ip = gcloud compute forwarding-rules list --global --project $Project --filter "target~intranet-https-proxy" --format "value(IPAddress)" | Select-Object -First 1
Write-Host @"

   PENDIENTE (manual, GoDaddy): registro DNS
     CNAME  web-$Entorno  →  $Dominio          (o registro A → $ip)

   Cuando propague: https://$hostWeb (pide cuenta de Google de OSC; acceso vía IAP).
   Para desactivar: no se borra el servicio, se quita el host del URL map
   (gcloud compute url-maps remove-path-matcher $UrlMap --path-matcher-name $matcher).
"@
