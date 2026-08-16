# Grant a screening licence and send the branded confirmation.
#
# Usage:
#   .\scripts\grant-licence.ps1 -Email "head@stmarys.ie" -Organisation "St Mary's Secondary School" -Type school
#   .\scripts\grant-licence.ps1 -Email "hr@acme.com" -Organisation "Acme Ltd" -Type organisation -InvoiceRef "INV-2026-014"
#
# Types:
#   single       one event, access for 3 months
#   school       two years, unlimited classroom use, one site
#   organisation twelve months, unlimited internal viewing, renewable

param(
  [Parameter(Mandatory=$true)][string]$Email,
  [Parameter(Mandatory=$true)][string]$Organisation,
  [Parameter(Mandatory=$true)][ValidateSet("single","school","organisation")][string]$Type,
  [string]$InvoiceRef
)

$secret = $env:POSHPORK_ADMIN_SECRET
if (-not $secret) {
  Write-Host "POSHPORK_ADMIN_SECRET is not set." -ForegroundColor Red
  Write-Host 'Set it once with: setx POSHPORK_ADMIN_SECRET "your-secret"'
  Write-Host "Then open a new terminal."
  exit 1
}

$payload = @{
  secret       = $secret
  email        = $Email
  organisation = $Organisation
  type         = $Type
}
if ($InvoiceRef) { $payload.invoiceRef = $InvoiceRef }

$body = $payload | ConvertTo-Json

try {
  $r = Invoke-RestMethod -Uri "https://www.poshpork.com/api/admin/grant-licence" `
       -Method Post -ContentType "application/json" -Body $body
  Write-Host "Licence granted to $($r.organisation) ($($r.email))" -ForegroundColor Green
  Write-Host "Type: $($r.type)   Expires: $($r.expires)" -ForegroundColor Green
} catch {
  Write-Host "Failed: $_" -ForegroundColor Red
}
