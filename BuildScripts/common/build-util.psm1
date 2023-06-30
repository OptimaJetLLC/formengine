<#
 .Synopsis
  Check last error code, throws exception if last error code is false
#>
function CheckExitCode()
{
  if ($LASTEXITCODE -ne 0)
  {
    throw "Build failed. Last exit code $LASTEXITCODE"
  }
}

Export-ModuleMember -Function CheckExitCode
