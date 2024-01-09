$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if (!$?)
  {
    throw "Build failed. " + $error[0]
  }
}

Push-Location $PSScriptRoot/../../packages/viewer-bundle
try
{
  npm install
  CheckExitCode
  npm run build
  CheckExitCode

  Invoke-Item $PSScriptRoot/viewer.html
}
finally
{
  Pop-Location
}
