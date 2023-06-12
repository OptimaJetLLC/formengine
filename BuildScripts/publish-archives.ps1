$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if ($LASTEXITCODE -ne 0)
  {
    throw "Build failed. Last exit code $LASTEXITCODE"
  }
}

$ArchivePath = "$( $PSScriptRoot )/../.archives"

if (!(Test-Path $ArchivePath))
{
  throw "Cannot find archive folder $( $ArchivePath )"
}

$Path = "$( $PSScriptRoot )/version.txt"
$VersionData = Get-Content $Path | Out-String | ConvertFrom-StringData
$Version = $VersionData['NpmVersion']
$PublishTag = $VersionData['NpmPublishTag']

$PackagesToPublish = (
"react-form-builder-core",
"react-form-builder-builder",
"react-form-builder-viewer",
"react-form-builder-components-rsuite"
)

Push-Location $ArchivePath
try
{
  # Check that all packages are present
  foreach ($Package in $PackagesToPublish)
  {
    $PackageName = "$( $Package )-$( $Version ).tgz"
    if (!(Test-Path $PackageName))
    {
      throw "Cannot find archive $( $PackageName )"
    }
  }

  # Publish all packages one by one
  foreach ($Package in $PackagesToPublish)
  {
    $PackageName = "$( $Package )-$( $Version ).tgz"
    Write-Host "Publishing NPM package $( $PackageName )"
    npm publish $PackageName --access public --tag $PublishTag
    CheckExitCode
  }
}
finally
{
  Pop-Location
}
