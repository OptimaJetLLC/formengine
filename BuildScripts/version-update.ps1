#!/usr/bin/env pwsh

$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if ($LASTEXITCODE -ne 0)
  {
    throw "Build failed. Last exit code $LASTEXITCODE"
  }
}

# Update the version in all npm packages
Push-Location $PSScriptRoot/version-update
try
{
  npm install
  CheckExitCode
  npm run version:update
  CheckExitCode
}
finally
{
  Pop-Location
}

# Updating the version in the public example on GitHub
Push-Location $PSScriptRoot/../src/packages/apps/formengine
try
{
  $Data = Get-Content $PSScriptRoot/version.txt | Out-String | ConvertFrom-StringData
  npm version $Data.NpmVersion --allow-same-version
  CheckExitCode
}
finally
{
  Pop-Location
}

# Update the build time for the demo, to force IndexedDB updates in the public demo
Push-Location $PSScriptRoot/../src/packages/apps/demo
try
{
  npm run update-release-date
  CheckExitCode
}
finally
{
  Pop-Location
}
