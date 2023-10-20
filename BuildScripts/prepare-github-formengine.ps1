$ErrorActionPreference = "Stop"

function RemoveIfExists($Path)
{
  if (Test-Path $Path)
  {
    Write-Host "Removing" $Path
    Remove-Item $Path -Force -Recurse
  }
}

function CreateFolder($Path)
{
  if (!(Test-Path $Path))
  {
    Write-Host "Creating folder" $Path
    New-Item $Path -ItemType Directory | Out-Null
  }
}

# Check prerequisites
$ArchiveFolder = "$( $PSScriptRoot )/../.archives"
CreateFolder $ArchiveFolder

# Create folder for GitHub project
$ProjectFolder = "$( $ArchiveFolder )/formengine"
RemoveIfExists $ProjectFolder
Copy-Item $PSScriptRoot/../sample-apps/formengine $ArchiveFolder -Recurse

$ExcludedItems = (
".idea",
"node_modules"
)

foreach ($Item in $ExcludedItems)
{
  RemoveIfExists "$( $ProjectFolder )/$( $Item )"
}

# Create archive
Compress-Archive -DestinationPath "$( $ArchiveFolder )/formengine.zip" -Path "$( $ProjectFolder )/*" -Force
RemoveIfExists $ProjectFolder
