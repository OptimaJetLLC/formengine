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

function GetPackageData($Path)
{
  $PackageJsonPath = "$( $Path )/package.json"
  if (!(Test-Path $PackageJsonPath))
  {
    throw "File '$( $PackageJsonPath )' not found"
  }

  $Json = Get-Content $PackageJsonPath | Out-String | ConvertFrom-Json
  return $Json.name, $Json.version
}

function ArchiveLocalPackage($Path, $DestPath)
{
  Push-Location $DestPath
  try
  {
    $PackageData = GetPackageData $Path
    $PackageName = $PackageData[0]
    $PackageVersion = $PackageData[1]
    $FullPackageName = "$( $PackageName )-$( $PackageVersion )"
    $PackageArchive = "$( $FullPackageName ).tgz".replace("@", "").replace("/", "-")
    RemoveIfExists $PackageArchive

    Set-Location $Path
    npm run bundle
    CheckExitCode

    Move-Item $PackageArchive $DestPath/
  }
  finally
  {
    Pop-Location
  }
}

$ArchivePath = "$( $PSScriptRoot )/../.archives"
RemoveIfExists $ArchivePath
New-Item -ItemType Directory -Force -Path $ArchivePath | Out-Null

Push-Location $PSScriptRoot/..
try
{
  npm install
  CheckExitCode
}
finally
{
  Pop-Location
}

$PackagesToArchive = (
"$( $PSScriptRoot )/../packages/core",
"$( $PSScriptRoot )/../packages/designer",
"$( $PSScriptRoot )/../packages/views/rsuite"
)

foreach ($Package in $PackagesToArchive)
{
  ArchiveLocalPackage $Package $ArchivePath
}
