$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if ($LASTEXITCODE -ne 0)
  {
    throw "Build failed. Last exit code $LASTEXITCODE"
  }
}

function RemoveIfExists($Path)
{
  if (Test-Path $Path)
  {
    Remove-Item $Path -Force -Recurse
  }
}

RemoveIfExists $PSScriptRoot/../packages/apps/demo/dist

Push-Location $PSScriptRoot/../packages/apps/demo
try
{
  npm install
  CheckExitCode
  npm run update-release-date
  CheckExitCode
  npm run build
  CheckExitCode

  $ArchiveFolder = "$( $PSScriptRoot )/../.archives"
  if (!(Test-Path $ArchiveFolder)) {
    New-Item -ItemType Directory -Force -Path $ArchiveFolder | Out-Null
  }

  Compress-Archive -DestinationPath "$( $ArchiveFolder )/demo.zip" -Path "dist/*" -Force
}
finally
{
  Pop-Location
}
