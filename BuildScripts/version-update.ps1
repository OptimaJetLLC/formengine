$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if ($LASTEXITCODE -ne 0)
  {
    throw "Build failed. Last exit code $LASTEXITCODE"
  }
}

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
