<#
.SYNOPSIS
    Wrapper script to fetch and execute Safe Endpoint Validation.

.DESCRIPTION
    Downloads the latest Invoke-SafeEndpointValidation.ps1 script and executes it.

    SECURITY NOTE: This script downloads and executes code from the internet.
    For production use, you should:
    1. Host the script in YOUR OWN trusted repository (Azure Blob, S3, internal web server)
    2. Verify the script hash before execution
    3. Use your organization's approved code signing certificate

.PARAMETER ScriptUrl
    URL to fetch the validation script from.
    Default: GitHub raw URL (for demo purposes only)

.PARAMETER Categories
    Which test categories to run. Default: All

.PARAMETER SkipFunctionalTests
    Skip tests that perform actions (EICAR download, DNS queries)

.PARAMETER TrustSource
    Bypass the security warning. Use only in controlled environments.

.EXAMPLE
    # Run from your trusted internal source
    .\Invoke-SafeEndpointValidation-Wrapper.ps1 -ScriptUrl "https://yourblobstorage.blob.core.windows.net/scripts/Invoke-SafeEndpointValidation.ps1"

.EXAMPLE
    # Run all tests (demo mode, accepts default GitHub source)
    .\Invoke-SafeEndpointValidation-Wrapper.ps1 -TrustSource

.EXAMPLE
    # Run only credential protection tests
    .\Invoke-SafeEndpointValidation-Wrapper.ps1 -Categories "Credentials" -TrustSource

.NOTES
    For Rewst/RMM integration:
    - Set ScriptUrl to your organization's hosted copy
    - Capture stdout as JSON for workflow processing
    - Consider running with -SkipFunctionalTests in sensitive environments
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [string]$ScriptUrl = "https://raw.githubusercontent.com/YOURUSERNAME/rightofboom2026/main/public/scripts/Invoke-SafeEndpointValidation.ps1",

    [Parameter(Mandatory=$false)]
    [ValidateSet("All", "Antivirus", "ASR", "Credentials", "Network", "Encryption", "LocalSecurity", "RemoteAccess", "Logging")]
    [string[]]$Categories = @("All"),

    [Parameter(Mandatory=$false)]
    [switch]$SkipFunctionalTests,

    [Parameter(Mandatory=$false)]
    [switch]$TrustSource,

    [Parameter(Mandatory=$false)]
    [string]$ExpectedHash = ""
)

$ErrorActionPreference = "Stop"

# Helper: treat "All" as the default category selection
function Is-DefaultCategories {
    param([string[]]$Value)
    return ($Value.Count -eq 1 -and $Value[0] -eq "All")
}

# ============================================================================
# SECURITY CHECK
# ============================================================================

if (-not $TrustSource -and $ScriptUrl -match "github\.com|raw\.githubusercontent\.com") {
    Write-Warning @"

╔══════════════════════════════════════════════════════════════════════════════╗
║  SECURITY WARNING: Downloading script from public GitHub                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  This script will download and execute code from:                             ║
║  $ScriptUrl
║                                                                               ║
║  For PRODUCTION use, you should:                                              ║
║                                                                               ║
║  1. HOST YOUR OWN COPY of the script in a trusted location:                   ║
║     - Azure Blob Storage with SAS token                                       ║
║     - AWS S3 with presigned URL                                               ║
║     - Internal web server                                                     ║
║     - Your RMM's script repository                                            ║
║                                                                               ║
║  2. VERIFY the script hash matches expected value                             ║
║                                                                               ║
║  3. SIGN the script with your organization's code signing certificate         ║
║                                                                               ║
║  To proceed anyway (demo/lab only), use: -TrustSource                         ║
║                                                                               ║
╚══════════════════════════════════════════════════════════════════════════════╝

"@
    exit 1
}

# ============================================================================
# DOWNLOAD SCRIPT
# ============================================================================

Write-Host "[*] Downloading validation script from: $ScriptUrl" -ForegroundColor Cyan

try {
    # Use TLS 1.2
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    $webClient = New-Object System.Net.WebClient
    $scriptContent = $webClient.DownloadString($ScriptUrl)

    if ([string]::IsNullOrWhiteSpace($scriptContent)) {
        throw "Downloaded script is empty"
    }

    Write-Host "[+] Downloaded $($scriptContent.Length) bytes" -ForegroundColor Green

} catch {
    Write-Error "Failed to download script: $($_.Exception.Message)"
    exit 1
} finally {
    if ($webClient) { $webClient.Dispose() }
}

# ============================================================================
# OPTIONAL: VERIFY HASH
# ============================================================================

if ($ExpectedHash) {
    $actualHash = [System.BitConverter]::ToString(
        [System.Security.Cryptography.SHA256]::Create().ComputeHash(
            [System.Text.Encoding]::UTF8.GetBytes($scriptContent)
        )
    ).Replace("-", "")

    if ($actualHash -ne $ExpectedHash.ToUpper()) {
        Write-Error @"
HASH MISMATCH - Script may have been tampered with!
Expected: $ExpectedHash
Actual:   $actualHash
Aborting execution.
"@
        exit 1
    }

    Write-Host "[+] Script hash verified: $actualHash" -ForegroundColor Green
}

# ============================================================================
# EXECUTE SCRIPT
# ============================================================================

Write-Host "[*] Executing validation script..." -ForegroundColor Cyan
Write-Host ""

# Build parameters to pass
$params = @{}
if (-not (Is-DefaultCategories -Value $Categories)) {
    $params["Categories"] = $Categories
}
if ($SkipFunctionalTests) {
    $params["SkipFunctionalTests"] = $true
}

# Create script block and execute
$scriptBlock = [scriptblock]::Create($scriptContent)

try {
    $result = & $scriptBlock @params

    # Output the JSON result
    $result

} catch {
    # Return error as JSON for workflow processing
    @{
        metadata = @{
            hostname = $env:COMPUTERNAME
            timestamp = (Get-Date -Format "o")
            error = $true
        }
        summary = @{
            totalTests = 0
            passed = 0
            failed = 0
            score = 0
            grade = "ERROR"
        }
        error = @{
            message = $_.Exception.Message
            scriptLine = $_.InvocationInfo.ScriptLineNumber
            stackTrace = $_.ScriptStackTrace
        }
    } | ConvertTo-Json -Depth 5

    exit 1
}
