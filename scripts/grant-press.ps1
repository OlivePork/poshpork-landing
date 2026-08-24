    # Grant press access and send the branded invitation.
    #
    # Usage:
    #   .\scripts\grant-press.ps1 -Email "reporter@nyt.com" -Outlet "The New York Times"

    param(
    [Parameter(Mandatory=$true)][string]$Email,
    [Parameter(Mandatory=$true)][string]$Outlet
    )

    $secret = $env:POSHPORK_ADMIN_SECRET
    if (-not $secret) {
    Write-Host "POSHPORK_ADMIN_SECRET is not set." -ForegroundColor Red
    Write-Host 'Set it once with: setx POSHPORK_ADMIN_SECRET "your-secret"'
    Write-Host "Then open a new terminal."
    exit 1
    }

    $body = @{ secret = $secret; email = $Email; outlet = $Outlet } | ConvertTo-Json

    try {
    $r = Invoke-RestMethod -Uri "https://www.poshpork.com/api/admin/grant-press" `
        -Method Post -ContentType "application/json" -Body $body
    Write-Host "Access granted and email sent to $($r.email) ($($r.outlet))" -ForegroundColor Green
    } catch {
    Write-Host "Failed: $_" -ForegroundColor Red
    }