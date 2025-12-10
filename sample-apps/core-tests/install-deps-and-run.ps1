#!/usr/bin/env pwsh

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
    npm run pack

    Move-Item $PackageArchive $PSScriptRoot/

    Set-Location $PSScriptRoot
#     RemoveIfExists "./node_modules/.cache"

#     npm install $PackageArchive --force

    # Update and install tgz in test apps
    $TestApps = @("test-app-lite", "test-app-full")
    $PackageArchivePath = Join-Path $PSScriptRoot $PackageArchive
    foreach ($App in $TestApps)
    {
      $AppPath = Join-Path $PSScriptRoot $App
      if (Test-Path $AppPath)
      {
        UpdateTestAppPackageJson $AppPath $PackageArchive
        Set-Location $AppPath
        RemoveIfExists "./node_modules/.cache"
        npm install $PackageArchivePath --force
      }
    }
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

function UpdateTestAppPackageJson($AppPath, $PackageArchive)
{
  $PackageJsonPath = Join-Path $AppPath "package.json"
  if (Test-Path $PackageJsonPath)
  {
    $Content = Get-Content $PackageJsonPath | ConvertFrom-Json
    $ArchiveName = Split-Path $PackageArchive -Leaf
    $Content.dependencies."@react-form-builder/core" = "file:../$ArchiveName"
    $Content | ConvertTo-Json -Depth 10 | Out-File $PackageJsonPath
  }
}

Push-Location $PSScriptRoot
try
{
  RemoveFromPackageJson "@react-form-builder/core"

  InstallLocalPackage $PSScriptRoot/../../src/packages/core
  npm run test
}
finally
{
  Pop-Location
}
