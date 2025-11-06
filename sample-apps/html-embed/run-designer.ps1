#!/usr/bin/env pwsh

$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if (!$?)
  {
    throw "Build failed. " + $error[0]
  }
}

Push-Location $PSScriptRoot/../../src/packages/designer-bundle
try
{
  npm install
  CheckExitCode
  npm run build
  CheckExitCode

  Invoke-Item $PSScriptRoot/designer.html
}
finally
{
  Pop-Location
}
