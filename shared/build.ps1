#!/usr/bin/env pwsh

param (
    [switch] $dev
)

$command = "npm run dist"

if ($dev) {
    $command = "npm run dist-dev"
}

invoke-expression -Command "$command"

$loc = Get-Location
Set-Location -Path "../optimajet-builder-mobile/"
./build.ps1
Set-Location -Path $loc