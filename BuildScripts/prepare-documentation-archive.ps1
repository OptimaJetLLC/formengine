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

RemoveIfExists $PSScriptRoot/../documentation/website/build

Push-Location $PSScriptRoot/../documentation/website
try
{
  npm install
  CheckExitCode
  npm run build
  CheckExitCode

  $ArchiveFolder = "$( $PSScriptRoot )/../.archives"
  if (!(Test-Path $ArchiveFolder)) {
    New-Item -ItemType Directory -Force -Path $ArchiveFolder | Out-Null
  }

  Compress-Archive -DestinationPath "$( $ArchiveFolder )/documentation.zip" -Path "build/*" -Force
}
finally
{
  Pop-Location
}
