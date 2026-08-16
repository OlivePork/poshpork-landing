# Grant a screening licence and send the branded confirmation.
#
# Usage:
#   .\scripts\grant-licence.ps1 -Email "head@stmarys.ie" -Organisation "St Mary's Secondary School" -Type school
#   .\scripts\grant-licence.ps1 -Email "hr@acme.com" -Organisation "Acme Ltd" -Type organisation -Headcount 40
#   .\scripts\grant-licence.ps1 -Email "info@westlibrary.ie" -Organisation "West Library" -Type single
#
# Types:
#   single       one event, community rate (EUR 249), 3 months' access
#   school       two years, unlimited classroom use, one site (EUR 295)
#   organisation one event, EUR 12 a head (EUR 10 over 50), minimum EUR 249
#
# -Headcount is required for organisation, ignored otherwise.
# -InvoiceRef is optional and appears in the confirmation email.

param(
  [Parameter(Mandatory=$true)][string]$Email,
  [Parameter(Mandatory=$true)][string]$Organisation,
  [Parameter(Mandatory=$true)][ValidateSet("single","school","organisation")][string]$Type,
  [int]$Headcount,
  [string]$InvoiceRef
)

if ($Type -eq "organisation" -and $Headcount -lt 1) {
  Write-Host "Organisations are priced per person. Add -Headcount." -ForegroundColor Red
  exit 1
}

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
if ($Headcount -gt 0) { $payload.headcount = $Headcount }
if ($InvoiceRef)      { $payload.invoiceRef = $InvoiceRef }

$body = $payload | ConvertTo-Json

try {
  $r = Invoke-RestMethod -Uri "https://www.poshpork.com/api/admin/grant-licence" `
       -Method Post -ContentType "application/json" -Body $body
  Write-Host "Licence granted to $($r.organisation) ($($r.email))" -ForegroundColor Green
  Write-Host "Type: $($r.type)   Charged: $($r.amount)   Expires: $($r.expires)" -ForegroundColor Green
  if ($r.headcount) { Write-Host "Headcount: $($r.headcount)" -ForegroundColor Green }
} catch {
  Write-Host "Failed: $_" -ForegroundColor Red
}
