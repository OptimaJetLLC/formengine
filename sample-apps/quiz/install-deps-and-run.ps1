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
    npm install $PackageArchive --force
    #    RemoveIfExists $PackageArchive
  }
  finally
  {
    Pop-Location
  }
}

function RemoveFromPackageJson($Dependency)
{
  $Filename = "package.json"
  $Content = Get-Content $Filename | ConvertFrom-Json
  $Dependencies = $Content.dependencies.PSObject.Properties
  $Dependencies.Remove($Dependency)
  $Content | ConvertTo-Json | Out-File $Filename
}

Push-Location $PSScriptRoot
try
{
  RemoveFromPackageJson "@react-form-builder/core"
  RemoveFromPackageJson "@react-form-builder/components-rsuite"

  InstallLocalPackage $PSScriptRoot/../../packages/core
  InstallLocalPackage $PSScriptRoot/../../packages/views/rsuite
  npm run start
}
finally
{
  Pop-Location
}
