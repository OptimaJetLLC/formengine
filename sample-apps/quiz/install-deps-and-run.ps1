$ErrorActionPreference = "Stop"

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

function InstallLocalPackage($Path)
{
  Push-Location $PSScriptRoot
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

    Move-Item $PackageArchive $PSScriptRoot/

    Set-Location $PSScriptRoot
    RemoveIfExists "./node_modules/.cache"

    npm uninstall $PackageName
    npm install $PackageArchive
    #    RemoveIfExists $PackageArchive
  }
  finally
  {
    Pop-Location
  }
}

Push-Location $PSScriptRoot
try
{
  InstallLocalPackage $PSScriptRoot/../../packages/core
  InstallLocalPackage $PSScriptRoot/../../packages/form-builder
  InstallLocalPackage $PSScriptRoot/../../packages/form-viewer
  InstallLocalPackage $PSScriptRoot/../../packages/views/rsuite
  npm run start
}
finally
{
  Pop-Location
}
