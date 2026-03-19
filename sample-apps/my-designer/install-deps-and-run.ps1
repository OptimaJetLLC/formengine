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
    RemoveIfExists "./node_modules/.cache"

    npm install $PackageArchive --force
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
  RemoveFromPackageJson "@react-form-builder/designer"
  RemoveFromPackageJson "@react-form-builder/indexed-db-form-storage"
  RemoveFromPackageJson "@react-form-builder/components-fast-qr"
  RemoveFromPackageJson "@react-form-builder/components-google-map"
  RemoveFromPackageJson "@react-form-builder/components-material-ui"
  RemoveFromPackageJson "@react-form-builder/components-rich-text"
  RemoveFromPackageJson "@react-form-builder/components-rsuite"
  RemoveFromPackageJson "@react-form-builder/components-rsuite-table"
  RemoveFromPackageJson "@react-form-builder/components-signature"
  RemoveFromPackageJson "@react-form-builder/components-uploader"

  InstallLocalPackage $PSScriptRoot/../../src/packages/core
  InstallLocalPackage $PSScriptRoot/../../src/packages/designer
  InstallLocalPackage $PSScriptRoot/../../src/packages/indexed-db-form-storage
  InstallLocalPackage $PSScriptRoot/../../src/packages/views/fast-qr
  InstallLocalPackage $PSScriptRoot/../../src/packages/views/google-map
  InstallLocalPackage $PSScriptRoot/../../src/packages/views/material-ui
  InstallLocalPackage $PSScriptRoot/../../src/packages/views/rich-text
  InstallLocalPackage $PSScriptRoot/../../src/packages/views/rsuite
  InstallLocalPackage $PSScriptRoot/../../src/packages/views/rsuite-table
  InstallLocalPackage $PSScriptRoot/../../src/packages/views/signature
  InstallLocalPackage $PSScriptRoot/../../src/packages/views/uploader
  npm run start
}
finally
{
  Pop-Location
}
