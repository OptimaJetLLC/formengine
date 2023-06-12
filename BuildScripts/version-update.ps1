$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if ($LASTEXITCODE -ne 0)
  {
    throw "Build failed. Last exit code $LASTEXITCODE"
  }
}

$Path = "$( $PSScriptRoot )/version.txt"
$VersionData = Get-Content $Path | Out-String | ConvertFrom-StringData

Push-Location $PSScriptRoot/..
try
{
  npx lerna version $VersionData['NpmVersion'] --preid $VersionData['NpmPublishTag'] --no-git-tag-version --yes
  CheckExitCode
}
finally
{
  Pop-Location
}
