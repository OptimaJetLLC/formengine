$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if (!$?)
  {
    throw "Build failed. " + $error[0]
  }
}

Push-Location $PSScriptRoot/private-sources
try
{
  npm install
  CheckExitCode
  npm run create-private-sources
  CheckExitCode
}
finally
{
  Pop-Location
}
