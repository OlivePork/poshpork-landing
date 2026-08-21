# Set a venue up: create the staff account, grant film access, link it to
# the venue record, and email them everything they need to run a screening.
#
# The venue row must already exist in Supabase. Create it there first.
#
# Usage:
#   .\scripts\grant-venue.ps1 -Slug "son-mir"
#   .\scripts\grant-venue.ps1 -Slug "son-mir" -Email "reception@sonmir.com"
#
# -Email is optional. Without it, the contact_email on the venue row is used.

param(
  [Parameter(Mandatory=$true)][string]$Slug,
  [string]$Email
)

$secret = $env:POSHPORK_ADMIN_SECRET
if (-not $secret) {
  Write-Host "POSHPORK_ADMIN_SECRET is not set." -ForegroundColor Red
  Write-Host 'Set it once with: setx POSHPORK_ADMIN_SECRET "your-secret"'
  Write-Host "Then open a new terminal."
  exit 1
}

$payload = @{ secret = $secret; slug = $Slug }
if ($Email) { $payload.email = $Email }

$body = $payload | ConvertTo-Json

try {
  $r = Invoke-RestMethod -Uri "https://www.poshpork.com/api/admin/grant-venue" `
       -Method Post -ContentType "application/json" -Body $body
  Write-Host "$($r.venue) is set up." -ForegroundColor Green
  Write-Host "Staff account: $($r.email)" -ForegroundColor Green
  Write-Host "Lobby screen:  https://www.poshpork.com$($r.screen)" -ForegroundColor Green
  Write-Host "Guest page:    https://www.poshpork.com/v/$($r.slug)" -ForegroundColor Green
} catch {
  Write-Host "Failed: $_" -ForegroundColor Red
}
