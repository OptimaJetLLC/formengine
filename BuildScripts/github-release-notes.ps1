$ErrorActionPreference = "Stop"

function CheckExitCode()
{
  if (!$?)
  {
    throw "Build failed. " + $error[0]
  }
}

function GetVersion()
{
  $Path = "$( $PSScriptRoot )/version.txt"
  $Values = Get-Content $Path | Out-String | ConvertFrom-StringData
  return $Values.NpmVersion
}

function RemoveIfExists($Path)
{
  if (Test-Path $Path)
  {
    Write-Host "Removing" $Path
    Remove-Item $Path -Force -Recurse
  }
}

# These parameters are specific to the product
$Owner = "optimajet"
$Repository = "formengine"
$Product = "Form Builder"

$Version = GetVersion

$NotesFilename = "$( $PSScriptRoot )/github-release-notes/notes-$( $Version ).md"
if (!(Test-Path $NotesFilename))
{
  throw "Cannot find release notes file: $( $NotesFilename )"
}
$NotesBody = Get-Content -Raw $NotesFilename

$ReleaseJson = @{
  "owner" = $Owner;
  "repo" = $Repository;
  "tagName" = $Version;
  "name" = "$( $Product ) $( $Version )";
  "body" = $NotesBody;
}

$Filename = "$( $PSScriptRoot )/github/release.json"
RemoveIfExists $Filename
$ReleaseJson | ConvertTo-Json | Out-File $Filename

Push-Location "$( $PSScriptRoot )/github"
try
{
  npm install
  CheckExitCode
  npm run create-release
  CheckExitCode
}
finally
{
  Pop-Location
}
