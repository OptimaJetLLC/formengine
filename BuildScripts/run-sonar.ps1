Import-Module $PSScriptRoot/common/build-util

$ErrorActionPreference = "Stop"

$SonarUrl = "https://sonar.optimajet.com"

function AnalyseTypeScript($Token, $Path, $ProjectKey)
{
  Write-Host "The analysis of $( $ProjectKey ) begins"
  Push-Location $PSScriptRoot/..
  try
  {
    docker run `
            --rm `
            -e SONAR_HOST_URL="$( $SonarUrl )" `
            -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=$( $ProjectKey ) -Dsonar.scm.provider=git -Dsonar.sourceEncoding=UTF-8 -Dsonar.projectBaseDir=$( $Path )" `
            -e SONAR_TOKEN="$( $Token )" `
            -v "${PWD}:/usr/src" `
            sonarsource/sonar-scanner-cli
    CheckExitCode
  }
  finally
  {
    Pop-Location
    Write-Host "The analysis of $( $ProjectKey ) ends"
  }
}

function GetEnvVariableExists($Variable)
{
  $Result = [Environment]::GetEnvironmentVariable($Variable)
  if (!$Result)
  {
    throw "Environment variable $( $Variable ) doesn't exists!"
  }
  return $Result
}

$TypeScriptToken = GetEnvVariableExists "SONAR_TOKEN_TYPESCRIPT"

AnalyseTypeScript $TypeScriptToken "./" "FB"
