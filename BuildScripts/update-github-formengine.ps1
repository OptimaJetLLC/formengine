$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if (!$?)
  {
    throw "Build failed. " + $error[0]
  }
}

function RemoveIfExists($Path)
{
  if (Test-Path $Path)
  {
    Write-Host "Removing" $Path
    Remove-Item $Path -Force -Recurse
  }
}

function GetVersion()
{
  $Path = "$( $PSScriptRoot )/version.txt"
  $Values = Get-Content $Path | Out-String | ConvertFrom-StringData
  return $Values.NpmVersion
}

$ArchiveFolder = "$( $PSScriptRoot )/../.archives"
$ArchivePath = "$( $ArchiveFolder )/formengine.zip"
if (!(Test-Path $ArchivePath))
{
  throw "Archive '$( $ArchivePath )' doesn't exists"
}

$GitRepository = "https://optimajet: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@github.com/optimajet/formengine"
$LocalRepository = "$( $ArchiveFolder )/GH-formengine"
RemoveIfExists $LocalRepository

git clone $GitRepository $LocalRepository

Get-ChildItem "$( $LocalRepository )" -Force | ForEach-Object {
  Write-Host $_.FullName
  Write-Host $_.Name
  if (!($_.Name -eq ".git"))
  {
    Remove-Item $_.FullName -Force -Recurse -ErrorAction SilentlyContinue
  }
}
Write-Host "Extracting archive" $ArchivePath "to" $LocalRepository
Expand-Archive -DestinationPath $LocalRepository -Path $ArchivePath -Force

Push-Location $LocalRepository
try
{
  $Version = GetVersion

  # Update version
  npm install
  CheckExitCode
  $Cmd = "npm install @react-form-builder/core@$( $Version ) @react-form-builder/designer@$( $Version ) @react-form-builder/components-rsuite@$( $Version )"
  Invoke-Expression $Cmd
  CheckExitCode

  RemoveIfExists node_modules

  git add --all
  git config --global user.email "support@optimajet.com"
  git config --global user.name "optimajet"
  git commit -m "Version $( $Version ) (autocommit)"
  git push -u $GitRepository master
}
finally
{
  Pop-Location
}

RemoveIfExists $LocalRepository
