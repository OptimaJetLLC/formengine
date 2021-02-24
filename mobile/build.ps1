#!/usr/bin/env pwsh

param (
    [switch] $dev
)

$command = "npm run dist"

if ($dev) {
    $command = "npm run dist-dev"
}

npm install

invoke-expression -Command "$command"

Copy-Item ./build/optimajet-mobile-web.js ../../optimajet-admin/mobileframe/scripts/
Copy-Item ./build/optimajet-mobile-web.js ../../OptimaJet.DWKit.StarterApplication/wwwroot/mobileframe/scripts

Copy-Item ./build/optimajet-mobile-form.js ../../optimajet-app/optimajet-app-mobile/scripts/optimajet-mobile-form.js

Copy-Item ./src/theme/dwkitOrangeTheme.json ../../frontend/frontend-mobile/src/theme/dwkitOrangeTheme.json
Copy-Item ./src/theme/evaThemeMapping.json ../../frontend/frontend-mobile/src/theme/evaThemeMapping.json

$loc = Get-Location
Set-Location -Path "../../optimajet-app/optimajet-app-mobile"
./build.ps1

Set-Location -Path $loc